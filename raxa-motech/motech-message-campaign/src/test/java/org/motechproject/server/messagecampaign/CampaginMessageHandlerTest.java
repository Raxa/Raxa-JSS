package org.motechproject.server.messagecampaign;

import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.motechproject.gateway.OutboundEventGateway;
import org.motechproject.model.MotechEvent;
import org.motechproject.server.messagecampaign.builder.CampaignMessageBuilder;
import org.motechproject.server.messagecampaign.dao.AllMessageCampaigns;
import org.motechproject.server.messagecampaign.domain.message.CampaignMessage;

import java.util.Arrays;
import java.util.HashMap;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertNotNull;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

public class CampaginMessageHandlerTest {
    @Mock
    private OutboundEventGateway outboundEventGateway;
    @Mock
    private AllMessageCampaigns allMessageCampaigns;
    private CampaignMessageHandler campaginMessageHandler;

    @Before
    public void setUp() {
        initMocks(this);
        campaginMessageHandler = new CampaignMessageHandler(outboundEventGateway, allMessageCampaigns);
    }

    @Test
    public void shouldFireEventForEachCampaignMessageScheduled() {
        CampaignMessage campaignMessage = new CampaignMessageBuilder().repeatingCampaignMessageForInterval("message-name", "2 Weeks", "message-key");
        ArgumentCaptor<MotechEvent> event = ArgumentCaptor.forClass(MotechEvent.class);

        when(allMessageCampaigns.get("campaign-name", "message-key")).thenReturn(campaignMessage);

        campaginMessageHandler.handleEvent(getMotechEvent());

        verify(outboundEventGateway, times(1)).sendEventMessage(event.capture());
        assertNotNull(event.getValue().getParameters());
        assertEquals("campaign-name", event.getValue().getParameters().get(EventKeys.CAMPAIGN_NAME_KEY));
        assertEquals("job-id", event.getValue().getParameters().get(EventKeys.SCHEDULE_JOB_ID_KEY));
        assertEquals("external-id", event.getValue().getParameters().get(EventKeys.EXTERNAL_ID_KEY));
        assertEquals("message-key", event.getValue().getParameters().get(EventKeys.MESSAGE_KEY));
        assertEquals("message-name", event.getValue().getParameters().get(EventKeys.MESSAGE_NAME_KEY));
        assertEquals(Arrays.asList("IVR"), event.getValue().getParameters().get(EventKeys.MESSAGE_FORMATS));
        assertEquals(Arrays.asList("en"), event.getValue().getParameters().get(EventKeys.MESSAGE_LANGUAGES));
    }

    private MotechEvent getMotechEvent() {
        HashMap<String, Object> parameters = new HashMap<String, Object>();
        parameters.put(EventKeys.CAMPAIGN_NAME_KEY, "campaign-name");
        parameters.put(EventKeys.MESSAGE_KEY, "message-key");
        parameters.put(EventKeys.SCHEDULE_JOB_ID_KEY, "job-id");
        parameters.put(EventKeys.EXTERNAL_ID_KEY, "external-id");
        return new MotechEvent(EventKeys.MESSAGE_CAMPAIGN_SEND_EVENT_SUBJECT, parameters);
    }
}
