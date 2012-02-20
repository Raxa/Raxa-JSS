package org.motechproject.server.messagecampaign.scheduler;

import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.motechproject.model.CronSchedulableJob;
import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.server.messagecampaign.builder.CampaignBuilder;
import org.motechproject.server.messagecampaign.builder.EnrollRequestBuilder;
import org.motechproject.server.messagecampaign.contract.CampaignRequest;
import org.motechproject.server.messagecampaign.domain.campaign.CronBasedCampaign;
import org.motechproject.util.DateUtil;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

public class CronBasedProgramSchedulerTest {

    private MotechSchedulerService schedulerService;

    @Before
    public void setUp() {
        schedulerService = mock(MotechSchedulerService.class);
        initMocks(this);
    }

    @Test
    public void shouldScheduleJobs() {
        CampaignRequest request = new EnrollRequestBuilder().withDefaults().build();
        CronBasedCampaign campaign = new CampaignBuilder().defaultCronBasedCampaign();

        CronBasedProgramScheduler cronBasedProgramScheduler = new CronBasedProgramScheduler(schedulerService, request, campaign);

        cronBasedProgramScheduler.start();
        ArgumentCaptor<CronSchedulableJob> capture = ArgumentCaptor.forClass(CronSchedulableJob.class);
        verify(schedulerService, times(2)).scheduleJob(capture.capture());

        List<CronSchedulableJob> allJobs = capture.getAllValues();
        assertEquals(campaign.messages().get(0).cron(), allJobs.get(0).getCronExpression());
        assertEquals(DateUtil.today(), DateUtil.newDate(allJobs.get(0).getStartTime()));
        assertEquals("org.motechproject.server.messagecampaign.send-campaign-message", allJobs.get(0).getMotechEvent().getSubject());
        assertMotechEvent(allJobs.get(0), "testCampaign.12345.cron-message1", "cron-message1");

        assertEquals(campaign.messages().get(1).cron(), allJobs.get(1).getCronExpression());
        assertEquals(DateUtil.today(), DateUtil.newDate(allJobs.get(1).getStartTime()));
        assertEquals("org.motechproject.server.messagecampaign.send-campaign-message", allJobs.get(1).getMotechEvent().getSubject());
        assertMotechEvent(allJobs.get(1), "testCampaign.12345.cron-message2", "cron-message2");
    }

    private void assertMotechEvent(CronSchedulableJob cronSchedulableJob, String expectedJobId, String messageKey) {
        assertEquals(expectedJobId, cronSchedulableJob.getMotechEvent().getParameters().get("JobID"));
        assertEquals("testCampaign", cronSchedulableJob.getMotechEvent().getParameters().get("CampaignName"));
        assertEquals("12345", cronSchedulableJob.getMotechEvent().getParameters().get("ExternalID"));
        assertEquals(messageKey, cronSchedulableJob.getMotechEvent().getParameters().get("MessageKey"));
    }
}
