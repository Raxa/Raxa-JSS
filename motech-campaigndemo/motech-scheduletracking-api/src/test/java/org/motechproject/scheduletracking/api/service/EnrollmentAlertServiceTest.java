package org.motechproject.scheduletracking.api.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.motechproject.model.RepeatingSchedulableJob;
import org.motechproject.model.Time;
import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.scheduletracking.api.domain.*;
import org.motechproject.scheduletracking.api.events.MilestoneEvent;
import org.motechproject.scheduletracking.api.events.constants.EventSubject;
import org.motechproject.scheduletracking.api.repository.AllTrackedSchedules;
import org.motechproject.valueobjects.WallTime;
import org.motechproject.valueobjects.WallTimeUnit;

import static junit.framework.Assert.assertEquals;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.motechproject.scheduletracking.api.utility.DateTimeUtil.*;
import static org.motechproject.util.DateUtil.newDateTime;

public class EnrollmentAlertServiceTest {

    private static final long MILLIS_IN_A_DAY = 24 * 60 * 60 * 1000L;
    private static final long MILLIS_IN_A_WEEK = MILLIS_IN_A_DAY * 7;

    private EnrollmentAlertService enrollmentAlertService;

    @Mock
    private AllTrackedSchedules allTrackedSchedules;
    @Mock
    private MotechSchedulerService schedulerService;

    @Before
    public void setup() {
        initMocks(this);
        enrollmentAlertService = new EnrollmentAlertService(allTrackedSchedules, schedulerService);
    }

    @Test
    public void shouldScheduleOneRepeatJobForEachAlertInTheFirstMilestone() {
        Milestone milestone = new Milestone("milestone", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        milestone.addAlert(WindowName.earliest, new Alert(new WallTime(1, WallTimeUnit.Day), 3, 0));
        milestone.addAlert(WindowName.due, new Alert(new WallTime(1, WallTimeUnit.Week), 2, 1));
        Schedule schedule = new Schedule("my_schedule");
        schedule.addMilestones(milestone);
        when(allTrackedSchedules.getByName("my_schedule")).thenReturn(schedule);
        Enrollment enrollment = new Enrollment("entity_1", "my_schedule", "milestone", weeksAgo(0), weeksAgo(0), new Time(8, 10));

        enrollmentAlertService.scheduleAlertsForCurrentMilestone(enrollment);

        ArgumentCaptor<RepeatingSchedulableJob> repeatJobCaptor = ArgumentCaptor.forClass(RepeatingSchedulableJob.class);
        verify(schedulerService, times(2)).safeScheduleRepeatingJob(repeatJobCaptor.capture());

        RepeatingSchedulableJob job = repeatJobCaptor.getAllValues().get(0);
        MilestoneEvent event = new MilestoneEvent(job.getMotechEvent());
        assertEquals(String.format("%s.%s.%s.0", EventSubject.BASE_SUBJECT, EnrollmentAlertService.MILESTONE_ALERTS, enrollment.getId()), job.getMotechEvent().getParameters().get(MotechSchedulerService.JOB_ID_KEY));
        assertEquals(newDateTime(weeksAgo(0), new Time(8, 10)).toDate(), job.getStartTime());
        assertEquals(MILLIS_IN_A_DAY, job.getRepeatInterval());
        assertEquals(3, job.getRepeatCount().intValue());

        assertEquals("entity_1", event.getExternalId());
        assertEquals("my_schedule", event.getScheduleName());
        assertEquals("milestone", event.getMilestoneName());
        assertEquals("earliest", event.getWindowName());

        job = repeatJobCaptor.getAllValues().get(1);
        event = new MilestoneEvent(job.getMotechEvent());
        assertEquals(String.format("%s.%s.%s.1", EventSubject.BASE_SUBJECT, EnrollmentAlertService.MILESTONE_ALERTS, enrollment.getId()), job.getMotechEvent().getParameters().get(MotechSchedulerService.JOB_ID_KEY));
        assertEquals(newDateTime(weeksAfter(1), new Time(8, 10)).toDate(), job.getStartTime());
        assertEquals(MILLIS_IN_A_WEEK, job.getRepeatInterval());
        assertEquals(2, job.getRepeatCount().intValue());

        assertEquals("entity_1", event.getExternalId());
        assertEquals("my_schedule", event.getScheduleName());
        assertEquals("milestone", event.getMilestoneName());
        assertEquals("due", event.getWindowName());
    }

    @Test
    public void shouldNotScheduleJobsForFutureMilestones() {
        Milestone firstMilestone = new Milestone("milestone_1", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Milestone secondMilestone = new Milestone("milestone_2", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        secondMilestone.addAlert(WindowName.earliest, new Alert(new WallTime(1, WallTimeUnit.Day), 3, 0));
        Schedule schedule = new Schedule("my_schedule");
        schedule.addMilestones(firstMilestone, secondMilestone);
        when(allTrackedSchedules.getByName("my_schedule")).thenReturn(schedule);
        Enrollment enrollment = new Enrollment("entity_1", "my_schedule", "milestone", weeksAgo(0), weeksAgo(0), new Time(8, 10));

        enrollmentAlertService.scheduleAlertsForCurrentMilestone(enrollment);

        verify(schedulerService, times(0)).scheduleRepeatingJob(Matchers.<RepeatingSchedulableJob>any());
    }

    @Test
    public void shouldNotScheduleJobsInThePast() {
        Milestone milestone = new Milestone("milestone_1", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        milestone.addAlert(WindowName.earliest, new Alert(new WallTime(1, WallTimeUnit.Day), 4, 0));
        Schedule schedule = new Schedule("my_schedule");
        schedule.addMilestones(milestone);
        when(allTrackedSchedules.getByName("my_schedule")).thenReturn(schedule);
        Enrollment enrollment = new Enrollment("entity_1", "my_schedule", "milestone_1", daysAgo(6), daysAgo(0), new Time(8, 10));

        enrollmentAlertService.scheduleAlertsForCurrentMilestone(enrollment);

        ArgumentCaptor<RepeatingSchedulableJob> repeatJobCaptor = ArgumentCaptor.forClass(RepeatingSchedulableJob.class);
        verify(schedulerService).safeScheduleRepeatingJob(repeatJobCaptor.capture());

        RepeatingSchedulableJob job = repeatJobCaptor.getValue();
        assertEquals(String.format("%s.%s.%s.0", EventSubject.BASE_SUBJECT, EnrollmentAlertService.MILESTONE_ALERTS, enrollment.getId()), job.getMotechEvent().getParameters().get(MotechSchedulerService.JOB_ID_KEY));
        assertEquals(newDateTime(daysAgo(0), new Time(8, 10)).toDate(), job.getStartTime());
        assertEquals(MILLIS_IN_A_DAY, job.getRepeatInterval());
        assertEquals(1, job.getRepeatCount().intValue());
    }

    @Test
    public void shouldNotScheduleJobsForPassedWindowInTheFirstMilestone() {
        Milestone milestone = new Milestone("milestone_1", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        milestone.addAlert(WindowName.earliest, new Alert(new WallTime(1, WallTimeUnit.Day), 4, 0));
        Schedule schedule = new Schedule("my_schedule");
        schedule.addMilestones(milestone);
        when(allTrackedSchedules.getByName("my_schedule")).thenReturn(schedule);
        Enrollment enrollment = new Enrollment("entity_1", "my_schedule", "milestone_1", weeksAgo(1), weeksAgo(0), new Time(8, 10));

        enrollmentAlertService.scheduleAlertsForCurrentMilestone(enrollment);
        verify(schedulerService, times(0)).scheduleRepeatingJob(Matchers.<RepeatingSchedulableJob>any());
    }

    @Test
    public void shouldNotScheduleJobsForPassedMilestones() {
        Milestone firstMilestone = new Milestone("milestone_1", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        firstMilestone.addAlert(WindowName.earliest, new Alert(new WallTime(1, WallTimeUnit.Day), 4, 0));
        Milestone secondMilestone = new Milestone("milestone_2", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        secondMilestone.addAlert(WindowName.earliest, new Alert(new WallTime(1, WallTimeUnit.Day), 2, 1));
        Schedule schedule = new Schedule("my_schedule");
        schedule.addMilestones(firstMilestone, secondMilestone);
        when(allTrackedSchedules.getByName("my_schedule")).thenReturn(schedule);
        Enrollment enrollment = new Enrollment("entity_1", "my_schedule", "milestone_2", weeksAgo(4), weeksAgo(0), new Time(8, 10));

        enrollmentAlertService.scheduleAlertsForCurrentMilestone(enrollment);

        ArgumentCaptor<RepeatingSchedulableJob> repeatJobCaptor = ArgumentCaptor.forClass(RepeatingSchedulableJob.class);
        verify(schedulerService).safeScheduleRepeatingJob(repeatJobCaptor.capture());

        RepeatingSchedulableJob job = repeatJobCaptor.getValue();
        assertEquals(String.format("%s.%s.%s.1", EventSubject.BASE_SUBJECT, EnrollmentAlertService.MILESTONE_ALERTS, enrollment.getId()), job.getMotechEvent().getParameters().get(MotechSchedulerService.JOB_ID_KEY));
        assertEquals(newDateTime(weeksAgo(0), new Time(8, 10)).toDate(), job.getStartTime());
        assertEquals(MILLIS_IN_A_DAY, job.getRepeatInterval());
        assertEquals(2, job.getRepeatCount().intValue());
    }

    @Test
    public void shouldReturnReferenceDateWhenCurrentMilestoneIsTheFirstMilestone() {
        Schedule schedule = new Schedule("Yellow Fever Vaccination");
        Milestone firstMilestone = new Milestone("First Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Milestone secondMilestone = new Milestone("Second Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        schedule.addMilestones(firstMilestone, secondMilestone);
        when(allTrackedSchedules.getByName("Yellow Fever Vaccination")).thenReturn(schedule);
        Enrollment enrollment = new Enrollment("ID-074285", "Yellow Fever Vaccination", "First Shot", weeksAgo(5), weeksAgo(3), new Time(8, 10));

        assertEquals(weeksAgo(5), enrollmentAlertService.getCurrentMilestoneStartDate(enrollment));
    }

    @Test
    public void shouldReturnEnrollmentDateWhenEnrolledIntoSecondMilestoneAndNoMilestonesFulfilled() {
        Schedule schedule = new Schedule("Yellow Fever Vaccination");
        Milestone firstMilestone = new Milestone("First Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Milestone secondMilestone = new Milestone("Second Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        schedule.addMilestones(firstMilestone, secondMilestone);
        when(allTrackedSchedules.getByName("Yellow Fever Vaccination")).thenReturn(schedule);
        Enrollment enrollment = new Enrollment("ID-074285", "Yellow Fever Vaccination", secondMilestone.getName(), weeksAgo(5), weeksAgo(3), null);

        assertEquals(weeksAgo(3), enrollmentAlertService.getCurrentMilestoneStartDate(enrollment));
    }

    @Test
    public void shouldUnenrollEntityFromTheSchedule() {
        Enrollment enrollment = new Enrollment("entity_1", "my_schedule", "milestone", weeksAgo(4), weeksAgo(4), new Time(8, 10));
        enrollment.setId("enrollment_1");
        enrollmentAlertService.unscheduleAllAlerts(enrollment);

        verify(schedulerService).unscheduleAllJobs(EventSubject.BASE_SUBJECT + ".enrollment_1");
    }
}
