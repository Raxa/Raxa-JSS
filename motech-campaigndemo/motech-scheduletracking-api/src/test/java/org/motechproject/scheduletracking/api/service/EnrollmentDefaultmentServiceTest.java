package org.motechproject.scheduletracking.api.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.motechproject.model.RepeatingSchedulableJob;
import org.motechproject.model.Time;
import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.scheduletracking.api.domain.*;
import org.motechproject.scheduletracking.api.events.DefaultmentCaptureEvent;
import org.motechproject.scheduletracking.api.events.constants.EventSubject;
import org.motechproject.scheduletracking.api.repository.AllTrackedSchedules;
import org.motechproject.valueobjects.WallTime;
import org.motechproject.valueobjects.WallTimeUnit;

import static junit.framework.Assert.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.motechproject.scheduletracking.api.utility.DateTimeUtil.wallTimeOf;
import static org.motechproject.scheduletracking.api.utility.DateTimeUtil.weeksAfter;
import static org.motechproject.scheduletracking.api.utility.DateTimeUtil.weeksAgo;
import static org.motechproject.util.DateUtil.newDateTime;

public class EnrollmentDefaultmentServiceTest {

    private EnrollmentDefaultmentService enrollmentDefaultmentService;

    @Mock
    private AllTrackedSchedules allTrackedSchedules;
    @Mock
    private MotechSchedulerService schedulerService;

    @Before
    public void setup() {
        initMocks(this);
        enrollmentDefaultmentService = new EnrollmentDefaultmentService(allTrackedSchedules, schedulerService);
    }

    @Test
    public void shouldScheduleJobAtEndOfMilestoneToCaptureDefaultmentState() {
        Milestone milestone = new Milestone("milestone", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        milestone.addAlert(WindowName.earliest, new Alert(new WallTime(1, WallTimeUnit.Day), 3, 0));
        milestone.addAlert(WindowName.due, new Alert(new WallTime(1, WallTimeUnit.Week), 2, 1));
        Schedule schedule = new Schedule("my_schedule");
        schedule.addMilestones(milestone);
        when(allTrackedSchedules.getByName("my_schedule")).thenReturn(schedule);
        Enrollment enrollment = new Enrollment("entity_1", "my_schedule", "milestone", weeksAgo(0), weeksAgo(0), new Time(8, 10));
        enrollment.setId("enrollment_1");

        enrollmentDefaultmentService.scheduleJobToCaptureDefaultment(enrollment);

        ArgumentCaptor<RepeatingSchedulableJob> repeatJobCaptor = ArgumentCaptor.forClass(RepeatingSchedulableJob.class);
        verify(schedulerService).scheduleRepeatingJob(repeatJobCaptor.capture());

        RepeatingSchedulableJob job = repeatJobCaptor.getValue();
        DefaultmentCaptureEvent event = new DefaultmentCaptureEvent(job.getMotechEvent());
        assertEquals(String.format("%s.%s.enrollment_1", EventSubject.BASE_SUBJECT, EnrollmentDefaultmentService.DEFAULTMENT_CAPTURE), event.getJobId());
        assertEquals(weeksAfter(4).toDate(), job.getStartTime());
        assertEquals(1, job.getRepeatCount().intValue());
    }

    @Test
    public void shouldUnscheduleDefaultmentCaptureJob() {
        Enrollment enrollment = new Enrollment("entity_1", "my_schedule", "milestone", weeksAgo(0), weeksAgo(0), new Time(8, 10));
        enrollment.setId("enrollment_1");

        enrollmentDefaultmentService.unscheduleDefaultmentCaptureJob(enrollment);

        verify(schedulerService).unscheduleAllJobs(String.format("%s.%s.enrollment_1", EventSubject.BASE_SUBJECT, EnrollmentDefaultmentService.DEFAULTMENT_CAPTURE));
    }
}
