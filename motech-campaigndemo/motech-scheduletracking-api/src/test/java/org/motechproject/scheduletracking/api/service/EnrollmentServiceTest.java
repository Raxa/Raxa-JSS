package org.motechproject.scheduletracking.api.service;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.motechproject.model.Time;
import org.motechproject.scheduletracking.api.domain.*;
import org.motechproject.scheduletracking.api.repository.AllEnrollments;
import org.motechproject.scheduletracking.api.repository.AllTrackedSchedules;
import org.motechproject.valueobjects.WallTime;
import org.motechproject.valueobjects.WallTimeUnit;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertTrue;
import static org.junit.Assert.assertFalse;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.motechproject.scheduletracking.api.utility.DateTimeUtil.*;
import static org.motechproject.util.DateUtil.newDateTime;

public class EnrollmentServiceTest {

    private EnrollmentService enrollmentService;

    @Mock
    private AllTrackedSchedules allTrackedSchedules;
    @Mock
    private AllEnrollments allEnrollments;
    @Mock
    private EnrollmentAlertService enrollmentAlertService;
    @Mock
    private EnrollmentDefaultmentService enrollmentDefaultmentService;

    @Before
    public void setup() {
        initMocks(this);
        enrollmentService = new EnrollmentService(allTrackedSchedules, allEnrollments, enrollmentAlertService, enrollmentDefaultmentService);
    }

    @Test
    public void shouldEnrollEntityIntoSchedule() {
        Milestone milestone = new Milestone("milestone", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        milestone.addAlert(WindowName.earliest, new Alert(new WallTime(1, WallTimeUnit.Day), 3, 0));
        milestone.addAlert(WindowName.due, new Alert(new WallTime(1, WallTimeUnit.Week), 2, 1));
        Schedule schedule = new Schedule("my_schedule");
        schedule.addMilestones(milestone);
        when(allTrackedSchedules.getByName("my_schedule")).thenReturn(schedule);

        Enrollment enrollment = new Enrollment("entity_1", "my_schedule", "milestone", weeksAgo(0), weeksAgo(0), new Time(8, 10));
        enrollmentService.enroll(enrollment);

        ArgumentCaptor<Enrollment> enrollmentArgumentCaptor = ArgumentCaptor.forClass(Enrollment.class);
        verify(allEnrollments).add(enrollmentArgumentCaptor.capture());

        enrollment = enrollmentArgumentCaptor.getValue();
        assertEquals("entity_1", enrollment.getExternalId());
        assertEquals("my_schedule", enrollment.getScheduleName());
        assertEquals("milestone", enrollment.getCurrentMilestoneName());

        verify(enrollmentAlertService).scheduleAlertsForCurrentMilestone(enrollment);
        verify(enrollmentDefaultmentService).scheduleJobToCaptureDefaultment(enrollment);
    }

    @Test
    public void shouldFulfillCurrentMilestoneInEnrollment() {
        Milestone firstMilestone = new Milestone("First Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Milestone secondMilestone = new Milestone("Second Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        secondMilestone.addAlert(WindowName.earliest, new Alert(wallTimeOf(1), 3, 0));
        Schedule schedule = new Schedule("Yellow Fever Vaccination");
        schedule.addMilestones(firstMilestone, secondMilestone);
        when(allTrackedSchedules.getByName("Yellow Fever Vaccination")).thenReturn(schedule);

        Enrollment enrollment = new Enrollment("ID-074285", "Yellow Fever Vaccination", "First Shot", weeksAgo(4), weeksAgo(4), new Time(8, 20));
        enrollmentService.fulfillCurrentMilestone(enrollment);

        assertEquals("Second Shot", enrollment.getCurrentMilestoneName());
        assertEquals(daysAgo(0), enrollment.getLastFulfilledDate());
    }

    @Test
    public void shouldScheduleJobsForNextMilestoneWhenCurrentMilestoneIsFulfilled() {
        Milestone firstMilestone = new Milestone("First Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Milestone secondMilestone = new Milestone("Second Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        secondMilestone.addAlert(WindowName.earliest, new Alert(wallTimeOf(1), 3, 0));
        Schedule schedule = new Schedule("Yellow Fever Vaccination");
        schedule.addMilestones(firstMilestone, secondMilestone);
        when(allTrackedSchedules.getByName("Yellow Fever Vaccination")).thenReturn(schedule);

        Enrollment enrollment = new Enrollment("ID-074285", "Yellow Fever Vaccination", "First Shot", weeksAgo(4), weeksAgo(4), new Time(8, 20));
        enrollment.setId("enrollment_1");
        enrollmentService.fulfillCurrentMilestone(enrollment);

        verify(enrollmentAlertService).unscheduleAllAlerts(enrollment);
        verify(enrollmentDefaultmentService).unscheduleDefaultmentCaptureJob(enrollment);

        ArgumentCaptor<Enrollment> updatedEnrollmentCaptor = ArgumentCaptor.forClass(Enrollment.class);
        verify(enrollmentAlertService).scheduleAlertsForCurrentMilestone(updatedEnrollmentCaptor.capture());
        assertEquals("Second Shot", updatedEnrollmentCaptor.getValue().getCurrentMilestoneName());

        verify(enrollmentDefaultmentService).scheduleJobToCaptureDefaultment(updatedEnrollmentCaptor.capture());
        assertEquals("Second Shot", updatedEnrollmentCaptor.getValue().getCurrentMilestoneName());
    }
    
    @Test(expected = MilestoneFulfillmentException.class)
    public void shouldNotFulfillADefaultedMilestone() {
        Milestone firstMilestone = new Milestone("First Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Milestone secondMilestone = new Milestone("Second Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        secondMilestone.addAlert(WindowName.earliest, new Alert(wallTimeOf(1), 3, 0));
        Schedule schedule = new Schedule("Yellow Fever Vaccination");
        schedule.addMilestones(firstMilestone, secondMilestone);
        when(allTrackedSchedules.getByName("Yellow Fever Vaccination")).thenReturn(schedule);

        Enrollment enrollment = new Enrollment("ID-074285", "Yellow Fever Vaccination", "First Shot", weeksAgo(4), weeksAgo(4), new Time(8, 20));
        enrollment.setStatus(Enrollment.EnrollmentStatus.Defaulted);
        enrollmentService.fulfillCurrentMilestone(enrollment);
    }

    @Test(expected = NoMoreMilestonesToFulfillException.class)
    public void shouldThrowExceptionIfAllMilestonesAreFulfilled() {
        Milestone firstMilestone = new Milestone("First Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Milestone secondMilestone = new Milestone("Second Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Schedule schedule = new Schedule("Yellow Fever Vaccination");
        schedule.addMilestones(firstMilestone, secondMilestone);
        when(allTrackedSchedules.getByName("Yellow Fever Vaccination")).thenReturn(schedule);

        Enrollment enrollment = new Enrollment("ID-074285", "Yellow Fever Vaccination", "First Shot", weeksAgo(4), weeksAgo(4), new Time(8, 20));
        enrollmentService.fulfillCurrentMilestone(enrollment);
        enrollmentService.fulfillCurrentMilestone(enrollment);
        enrollmentService.fulfillCurrentMilestone(enrollment);

        assertEquals(null, enrollment.getCurrentMilestoneName());
    }

    @Test
    public void shouldCompleteEnrollmentWhenAllMilestonesAreFulfilled() {
        Milestone firstMilestone = new Milestone("First Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Milestone secondMilestone = new Milestone("Second Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Schedule schedule = new Schedule("Yellow Fever Vaccination");
        schedule.addMilestones(firstMilestone, secondMilestone);
        when(allTrackedSchedules.getByName("Yellow Fever Vaccination")).thenReturn(schedule);

        Enrollment enrollment = new Enrollment("ID-074285", "Yellow Fever Vaccination", "First Shot", weeksAgo(4), weeksAgo(4), new Time(8, 20));
        enrollmentService.fulfillCurrentMilestone(enrollment);
        enrollmentService.fulfillCurrentMilestone(enrollment);

        assertTrue(enrollment.isCompleted());
    }

    @Test
    public void shouldUnenrollEntityFromTheSchedule() {
        Milestone milestone = new Milestone("milestone", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        milestone.addAlert(WindowName.earliest, new Alert(new WallTime(1, WallTimeUnit.Day), 3, 0));
        Schedule schedule = new Schedule("my_schedule");
        schedule.addMilestones(milestone);
        when(allTrackedSchedules.getByName("my_schedule")).thenReturn(schedule);

        Enrollment enrollment = new Enrollment("entity_1", "my_schedule", "milestone", weeksAgo(4), weeksAgo(4), new Time(8, 10));
        enrollment.setId("enrollment_1");
        enrollmentService.unenroll(enrollment);

        ArgumentCaptor<Enrollment> enrollmentCaptor = ArgumentCaptor.forClass(Enrollment.class);
        verify(allEnrollments).update(enrollmentCaptor.capture());

        enrollment = enrollmentCaptor.getValue();
        Assert.assertEquals("entity_1", enrollment.getExternalId());
        Assert.assertEquals("my_schedule", enrollment.getScheduleName());
        assertFalse(enrollment.isActive());

        verify(enrollmentAlertService).unscheduleAllAlerts(enrollment);
        verify(enrollmentDefaultmentService).unscheduleDefaultmentCaptureJob(enrollment);
    }
}
