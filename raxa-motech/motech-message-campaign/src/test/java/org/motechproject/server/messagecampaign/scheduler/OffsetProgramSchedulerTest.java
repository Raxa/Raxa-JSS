package org.motechproject.server.messagecampaign.scheduler;

import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.motechproject.model.RunOnceSchedulableJob;
import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.server.messagecampaign.builder.CampaignBuilder;
import org.motechproject.server.messagecampaign.builder.EnrollRequestBuilder;
import org.motechproject.server.messagecampaign.contract.CampaignRequest;
import org.motechproject.server.messagecampaign.domain.campaign.OffsetCampaign;
import org.motechproject.util.DateUtil;

import java.util.Date;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

public class OffsetProgramSchedulerTest {

    public static final String MESSAGE_CAMPAIGN_EVENT_SUBJECT = "org.motechproject.server.messagecampaign.send-campaign-message";
    private MotechSchedulerService schedulerService;

    @Before
    public void setUp() {
        schedulerService = mock(MotechSchedulerService.class);
        initMocks(this);
    }

    @Test
    public void shouldScheduleJobs() {
        CampaignRequest request = new EnrollRequestBuilder().withDefaults().build();
        OffsetCampaign campaign = new CampaignBuilder().defaultOffsetCampaign();

        OffsetProgramScheduler offsetProgramScheduler = new OffsetProgramScheduler(schedulerService, request, campaign);

        offsetProgramScheduler.start();
        ArgumentCaptor<RunOnceSchedulableJob> capture = ArgumentCaptor.forClass(RunOnceSchedulableJob.class);
        verify(schedulerService, times(2)).scheduleRunOnceJob(capture.capture());

        List<RunOnceSchedulableJob> allJobs = capture.getAllValues();

        Date startDate1 = DateUtil.newDateTime(DateUtil.today().plusDays(7), request.reminderTime().getHour(), request.reminderTime().getMinute(), 0).toDate();
        assertEquals(startDate1.toString(), allJobs.get(0).getStartDate().toString());
        assertEquals(MESSAGE_CAMPAIGN_EVENT_SUBJECT, allJobs.get(0).getMotechEvent().getSubject());
        assertMotechEvent(allJobs.get(0), "testCampaign.12345.child-info-week-1", "child-info-week-1");

        Date startDate2 = DateUtil.newDateTime(DateUtil.today().plusDays(14), request.reminderTime().getHour(), request.reminderTime().getMinute(), 0).toDate();
        assertEquals(startDate2.toString(), allJobs.get(1).getStartDate().toString());
        assertEquals(MESSAGE_CAMPAIGN_EVENT_SUBJECT, allJobs.get(1).getMotechEvent().getSubject());
        assertMotechEvent(allJobs.get(1), "testCampaign.12345.child-info-week-1a", "child-info-week-1a");
    }

    private void assertMotechEvent(RunOnceSchedulableJob runOnceSchedulableJob, String expectedJobId, String messageKey) {
        assertEquals(expectedJobId, runOnceSchedulableJob.getMotechEvent().getParameters().get("JobID"));
        assertEquals("testCampaign", runOnceSchedulableJob.getMotechEvent().getParameters().get("CampaignName"));
        assertEquals("12345", runOnceSchedulableJob.getMotechEvent().getParameters().get("ExternalID"));
        assertEquals(messageKey, runOnceSchedulableJob.getMotechEvent().getParameters().get("MessageKey"));
    }
}
