package org.motechproject.server.messagecampaign.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.server.messagecampaign.contract.CampaignRequest;
import org.motechproject.server.messagecampaign.dao.AllMessageCampaigns;
import org.motechproject.server.messagecampaign.domain.MessageCampaignException;
import org.motechproject.server.messagecampaign.domain.campaign.AbsoluteCampaign;
import org.motechproject.server.messagecampaign.scheduler.MessageCampaignScheduler;

import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

public class MessageCampaignServiceImplTest {
    private MessageCampaignServiceImpl messageCampaignService;
    @Mock
    private AllMessageCampaigns allMessageCampaigns;
    @Mock
    private MotechSchedulerService schedulerService;
    @Mock
    private MessageCampaignScheduler scheduler;

    @Before
    public void setUp() {
        initMocks(this);
        messageCampaignService = new MessageCampaignServiceImpl(allMessageCampaigns, schedulerService);
    }

    @Test
    public void shouldCallCampaignSchedulerToStart() {
        String campaignName = "campaign-name";
        CampaignRequest campaignRequest = new CampaignRequest();
        campaignRequest.setCampaignName(campaignName);
        AbsoluteCampaign absoluteCampaign = mock(AbsoluteCampaign.class);

        when(allMessageCampaigns.get(campaignName)).thenReturn(absoluteCampaign);
        when(absoluteCampaign.getScheduler(schedulerService,campaignRequest)).thenReturn(scheduler);

        messageCampaignService.startFor(campaignRequest);

        verify(absoluteCampaign).getScheduler(schedulerService,campaignRequest);
        verify(scheduler).start();
    }

    @Test
    public void shouldCallCampaignSchedulerToStop() {
         String campaignName = "campaign-name";
        CampaignRequest campaignRequest = new CampaignRequest();
        campaignRequest.setCampaignName(campaignName);
        AbsoluteCampaign absoluteCampaign = mock(AbsoluteCampaign.class);

        when(allMessageCampaigns.get(campaignName)).thenReturn(absoluteCampaign);
        when(absoluteCampaign.getScheduler(schedulerService,campaignRequest)).thenReturn(scheduler);

        messageCampaignService.stopFor(campaignRequest, "foo");

        verify(absoluteCampaign).getScheduler(schedulerService,campaignRequest);
        verify(scheduler).stop("foo");
    }

    @Test(expected = MessageCampaignException.class)
    public void enrollWithUnknownCampaignTest() {
        String campaignName = "non-existent-campaign-name";
        CampaignRequest enrollRequest = new CampaignRequest();
        enrollRequest.setCampaignName(campaignName);

        when(allMessageCampaigns.get(campaignName)).thenReturn(null);

        messageCampaignService.startFor(enrollRequest);
    }
}
