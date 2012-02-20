package org.motechproject.server.messagecampaign.scheduler;

import org.joda.time.DateTime;
import org.joda.time.DateTimeFieldType;
import org.joda.time.LocalDate;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.motechproject.model.CronSchedulableJob;
import org.motechproject.model.RepeatingSchedulableJob;
import org.motechproject.model.Time;
import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.server.messagecampaign.builder.CampaignBuilder;
import org.motechproject.server.messagecampaign.builder.CampaignMessageBuilder;
import org.motechproject.server.messagecampaign.builder.EnrollRequestBuilder;
import org.motechproject.server.messagecampaign.contract.CampaignRequest;
import org.motechproject.server.messagecampaign.domain.campaign.RepeatingCampaign;
import org.motechproject.server.messagecampaign.domain.message.RepeatingCampaignMessage;
import org.motechproject.util.DateUtil;

import java.util.Date;
import java.util.List;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.motechproject.server.messagecampaign.EventKeys.REPEATING_START_OFFSET;
import static org.motechproject.server.messagecampaign.scheduler.RepeatingProgramScheduler.DEFAULT_INTERVAL_OFFSET;

public class RepeatingProgramSchedulerTest {

    private MotechSchedulerService schedulerService;

    @Before
    public void setUp() {
        schedulerService = mock(MotechSchedulerService.class);
        initMocks(this);
    }

    @Test
    public void shouldScheduleJobsForTwoWeekMaxDurationWithCalendarDayOfWeekAsMonday() {
        Integer startOffset = 1;
        Time reminderTime = new Time(8, 30);
        RepeatingCampaign campaign = new CampaignBuilder().defaultRepeatingCampaign("2 Weeks");
        CampaignRequest request = defaultBuilder().withReferenceDate(new LocalDate(2011, 11, 22)).withReminderTime(reminderTime).withStartOffset(startOffset).build();

        RepeatingProgramScheduler repeatingProgramScheduler = new RepeatingProgramScheduler(schedulerService, request, campaign);
        repeatingProgramScheduler.start();
        ArgumentCaptor<CronSchedulableJob> capture = ArgumentCaptor.forClass(CronSchedulableJob.class);
        verify(schedulerService, times(4)).safeScheduleJob(capture.capture());

        Date startJobDate = DateUtil.newDateTime(request.referenceDate(), reminderTime).toDate();
        Date jobEndDateForRepeatInterval1 = date(2011, 12, 5);
        Date jobEndDateForRepeatInterval2 = date(2011, 12, 5);
        Date jobEndDateForWeekSchedule = date(2011, 12, 5);
        Date jobEndDateForCalWeekSchedule = date(2011, 12, 4);

        List<CronSchedulableJob> jobs = capture.getAllValues();
        assertJob(jobs.get(0), "testCampaign.12345.child-info-week-{Offset}-1", "child-info-week-{Offset}-1",
                startJobDate, jobEndDateForRepeatInterval1, DEFAULT_INTERVAL_OFFSET);
        assertJob(jobs.get(1), "testCampaign.12345.child-info-week-{Offset}-2", "child-info-week-{Offset}-2",
                startJobDate, jobEndDateForRepeatInterval2, DEFAULT_INTERVAL_OFFSET);
        assertJob(jobs.get(2), "testCampaign.12345.child-info-week-{Offset}-{WeekDay}", "child-info-week-{Offset}-{WeekDay}",
                startJobDate, jobEndDateForWeekSchedule, startOffset);
        assertJob(jobs.get(3), "testCampaign.12345.child-info-week-{Offset}-{WeekDay}", "child-info-week-{Offset}-{WeekDay}",
                startJobDate, jobEndDateForCalWeekSchedule, startOffset);
    }

    @Test
    public void shouldScheduleJobsForOneWeekMaxDurationWithCalendarDayOfWeekAsMonday() {
        Integer startOffset = 1;
        Time reminderTime = new Time(9, 30);
        RepeatingCampaign campaign = new CampaignBuilder().defaultRepeatingCampaign("1 Weeks");
        CampaignRequest request = defaultBuilder().withReferenceDate(new LocalDate(2011, 11, 22)).withReminderTime(reminderTime).withStartOffset(startOffset).build();

        RepeatingProgramScheduler repeatingProgramScheduler = new RepeatingProgramScheduler(schedulerService, request, campaign);

        repeatingProgramScheduler.start();
        ArgumentCaptor<CronSchedulableJob> capture = ArgumentCaptor.forClass(CronSchedulableJob.class);
        verify(schedulerService, times(4)).safeScheduleJob(capture.capture());

        Date startJobDate = DateUtil.newDateTime(request.referenceDate(), reminderTime).toDate();
        Date jobEndDateForRepeatInterval1 = date(2011, 11, 28);
        Date jobEndDateForRepeatInterval2 = date(2011, 11, 28);
        Date jobEndDateForWeekSchedule = date(2011, 11, 28);
        Date jobEndDateForCalWeekSchedule = date(2011, 11, 27);

        List<CronSchedulableJob> jobs = capture.getAllValues();
        assertJob(jobs.get(0), "testCampaign.12345.child-info-week-{Offset}-1", "child-info-week-{Offset}-1",
                startJobDate, jobEndDateForRepeatInterval1, DEFAULT_INTERVAL_OFFSET);
        assertJob(jobs.get(1), "testCampaign.12345.child-info-week-{Offset}-2", "child-info-week-{Offset}-2",
                startJobDate, jobEndDateForRepeatInterval2, DEFAULT_INTERVAL_OFFSET);
        assertJob(jobs.get(2), "testCampaign.12345.child-info-week-{Offset}-{WeekDay}", "child-info-week-{Offset}-{WeekDay}",
                startJobDate, jobEndDateForWeekSchedule, startOffset);
        assertJob(jobs.get(3), "testCampaign.12345.child-info-week-{Offset}-{WeekDay}", "child-info-week-{Offset}-{WeekDay}",
                startJobDate, jobEndDateForCalWeekSchedule, startOffset);
    }

    @Test
    public void shouldScheduleJobsForFiveWeeksAsMaxDurationWithCalendarDayOfWeekAsMonday() {
        Integer startOffset = 2;
        Time reminderTime = new Time(21, 30);
        CampaignRequest request = defaultBuilder().withReferenceDate(new LocalDate(2011, 11, 22)).withReminderTime(reminderTime).withStartOffset(startOffset).build();
        RepeatingCampaign campaign = new CampaignBuilder().defaultRepeatingCampaign("5 Weeks");

        RepeatingProgramScheduler repeatingProgramScheduler = new RepeatingProgramScheduler(schedulerService, request, campaign);
        repeatingProgramScheduler.start();

        ArgumentCaptor<CronSchedulableJob> capture = ArgumentCaptor.forClass(CronSchedulableJob.class);
        verify(schedulerService, times(4)).safeScheduleJob(capture.capture());

        Date startJobDate = DateUtil.newDateTime(request.referenceDate(), reminderTime).toDate();
        Date jobEndDateForRepeatInterval1 = date(2011, 12, 26);
        Date jobEndDateForRepeatInterval2 = date(2011, 12, 26);
        Date jobEndDateForWeekSchedule = date(2011, 12, 19);
        Date jobEndDateForCalWeekSchedule = date(2011, 12, 18);

        List<CronSchedulableJob> jobs = capture.getAllValues();
        assertJob(jobs.get(0), "testCampaign.12345.child-info-week-{Offset}-1", "child-info-week-{Offset}-1",
                startJobDate, jobEndDateForRepeatInterval1, DEFAULT_INTERVAL_OFFSET);
        assertJob(jobs.get(1), "testCampaign.12345.child-info-week-{Offset}-2", "child-info-week-{Offset}-2",
                startJobDate, jobEndDateForRepeatInterval2, DEFAULT_INTERVAL_OFFSET);
        assertJob(jobs.get(2), "testCampaign.12345.child-info-week-{Offset}-{WeekDay}", "child-info-week-{Offset}-{WeekDay}",
                startJobDate, jobEndDateForWeekSchedule, startOffset);
        assertJob(jobs.get(3), "testCampaign.12345.child-info-week-{Offset}-{WeekDay}", "child-info-week-{Offset}-{WeekDay}",
                startJobDate, jobEndDateForCalWeekSchedule, startOffset);
    }

    @Test
    public void shouldSetOffsetTo1_ForCampaignMessageWithRepeatInterval() {

        final RepeatingCampaignMessage messageWeeks = new CampaignMessageBuilder().repeatingCampaignMessageForInterval("OM1", "1 Weeks", "child-info-week-{Offset}-1");
        final RepeatingCampaignMessage messageDays = new CampaignMessageBuilder().repeatingCampaignMessageForInterval("OM1", "10 Days", "child-info-week-{Offset}-1");
        RepeatingCampaign campaign = new CampaignBuilder().repeatingCampaign("C", "2 Weeks", asList(messageWeeks, messageDays));

        int startOffset = 2;
        CampaignRequest request = defaultBuilder().withReferenceDate(new LocalDate(2011, 11, 28)).withStartOffset(startOffset).build();
        RepeatingProgramScheduler repeatingProgramScheduler = new RepeatingProgramScheduler(schedulerService, request, campaign);
        repeatingProgramScheduler.start();

        ArgumentCaptor<CronSchedulableJob> capture = ArgumentCaptor.forClass(CronSchedulableJob.class);
        verify(schedulerService, times(2)).safeScheduleJob(capture.capture());

        List<CronSchedulableJob> jobs = capture.getAllValues();
        assertEquals(jobs.get(0).getMotechEvent().getParameters().get(REPEATING_START_OFFSET), 1);
        assertEquals(jobs.get(1).getMotechEvent().getParameters().get(REPEATING_START_OFFSET), 1);
    }

    @Test
    public void shouldNotThrowError_ForCampaignMessageStartAndEndDaysAreSameBasedOnWeekOffsetAndReferenceDate() {

        Time reminderTime = new Time(9, 30);
        final RepeatingCampaignMessage weekDays = new CampaignMessageBuilder().repeatingCampaignMessageForDaysApplicable("OM1", asList("Monday", "Friday"), "child-info-week-{Offset}-{WeekDay}");
        final RepeatingCampaignMessage calendarWeek = new CampaignMessageBuilder().repeatingCampaignMessageForCalendarWeek("OM1", "Tuesday", asList("Wednesday", "Friday"), "child-info-week-{Offset}-{WeekDay}");
        RepeatingCampaign campaign = new CampaignBuilder().repeatingCampaign("testCampaign", "2 Weeks", asList(weekDays, calendarWeek));

        int startOffset = 2;
        Date calendarWeekEndDate_Monday = DateUtil.newDateTime(new LocalDate(2011, 11, 28), reminderTime).toDate();
        CampaignRequest request = defaultBuilder().withReferenceDate(new LocalDate(calendarWeekEndDate_Monday)).withReminderTime(reminderTime).withStartOffset(startOffset).build();
        RepeatingProgramScheduler repeatingProgramScheduler = new RepeatingProgramScheduler(schedulerService, request, campaign);
        repeatingProgramScheduler.start();

        ArgumentCaptor<CronSchedulableJob> capture = ArgumentCaptor.forClass(CronSchedulableJob.class);
        verify(schedulerService, times(2)).safeScheduleJob(capture.capture());

        List<CronSchedulableJob> jobs = capture.getAllValues();
        assertJob(jobs.get(0), "testCampaign.12345.child-info-week-{Offset}-{WeekDay}", "child-info-week-{Offset}-{WeekDay}",
                calendarWeekEndDate_Monday, date(2011, 12, 4), startOffset);
        assertJob(jobs.get(1), "testCampaign.12345.child-info-week-{Offset}-{WeekDay}", "child-info-week-{Offset}-{WeekDay}",
                calendarWeekEndDate_Monday, date(2011, 11, 28), startOffset);
    }

    @Test
    public void shouldThrowError_ForCampaignMessageOffsetIsMoreThanMaxDuration() {

        final RepeatingCampaignMessage weekDays = new CampaignMessageBuilder().repeatingCampaignMessageForDaysApplicable("OM1", asList("Monday", "Friday"), "child-info-week-{Offset}-{WeekDay}");
        final RepeatingCampaignMessage calendarWeek = new CampaignMessageBuilder().repeatingCampaignMessageForCalendarWeek("OM1", "Tuesday", asList("Wednesday", "Friday"), "child-info-week-{Offset}-{WeekDay}");
        RepeatingCampaign campaign = new CampaignBuilder().repeatingCampaign("testCampaign", "2 Weeks", asList(weekDays, calendarWeek));

        int startOffset = 3;
        LocalDate calendarWeekEndDate_Monday = new LocalDate(2011, 11, 28);
        CampaignRequest request = defaultBuilder().withReferenceDate(calendarWeekEndDate_Monday).withStartOffset(startOffset).build();
        try {
            RepeatingProgramScheduler repeatingProgramScheduler = new RepeatingProgramScheduler(schedulerService, request, campaign);
            repeatingProgramScheduler.start();
            Assert.fail("should fail because of date");
        } catch (IllegalArgumentException e) {
            assertEquals("startDate (2011-11-28) is after endDate (2011-11-27) for - (" + request.toString() + ")", e.getMessage());
        }

        ArgumentCaptor<RepeatingSchedulableJob> capture = ArgumentCaptor.forClass(RepeatingSchedulableJob.class);
        verify(schedulerService, never()).scheduleRepeatingJob(capture.capture());
    }

    private void assertJob(CronSchedulableJob actualJob, String expectedJobId, String messageKey, Date jobStartDate, Date jobEndDate, Integer startOffset) {
        assertDate(jobStartDate, actualJob.getStartTime());
        assertDate(jobEndDate, actualJob.getEndTime());
        assertEquals(RepeatingProgramScheduler.INTERNAL_REPEATING_MESSAGE_CAMPAIGN_SUBJECT, actualJob.getMotechEvent().getSubject());
        assertMotechEvent(actualJob, expectedJobId, messageKey, startOffset);
        DateTime dateTime = new DateTime(jobStartDate);
        int hour = dateTime.get(DateTimeFieldType.hourOfDay());
        int min = dateTime.get(DateTimeFieldType.minuteOfHour());
        int sec = dateTime.get(DateTimeFieldType.secondOfMinute());
        assertEquals(actualJob.getCronExpression(), buildCronExpression(hour, min, sec));
    }

    private String buildCronExpression(int hour, int min, int sec) {
        return "" + sec + " " + min + " " + hour + " 1/1 * ? *";
    }


    private void assertDate(Date expectedDate, Date actualDate) {
        DateTime expectedDateTime = DateUtil.newDateTime(expectedDate);
        DateTime actualDateTime = DateUtil.newDateTime(actualDate);
        assertEquals(expectedDateTime, actualDateTime);
    }

    private void assertMotechEvent(CronSchedulableJob repeatingSchedulableJob, String expectedJobId, Object messageKey, Integer startOffset) {
        assertEquals(expectedJobId, repeatingSchedulableJob.getMotechEvent().getParameters().get("JobID"));
        assertEquals("testCampaign", repeatingSchedulableJob.getMotechEvent().getParameters().get("CampaignName"));
        assertEquals("12345", repeatingSchedulableJob.getMotechEvent().getParameters().get("ExternalID"));
        assertEquals(messageKey, repeatingSchedulableJob.getMotechEvent().getParameters().get("MessageKey"));
        assertEquals(startOffset, repeatingSchedulableJob.getMotechEvent().getParameters().get("RepeatingStartOffset"));
    }

    private EnrollRequestBuilder defaultBuilder() {
        return new EnrollRequestBuilder().withDefaults();
    }

    private Date date(int year, int month, int day) {
        return new LocalDate(year, month, day).toDate();
    }
}
