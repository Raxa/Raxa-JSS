package org.motechproject.server.messagecampaign;

import org.motechproject.gateway.OutboundEventGateway;
import org.motechproject.model.MotechEvent;
import org.motechproject.server.event.annotations.MotechListener;
import org.motechproject.server.messagecampaign.dao.AllMessageCampaigns;
import org.motechproject.server.messagecampaign.domain.message.CampaignMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CampaignMessageHandler {

    private OutboundEventGateway outboundEventGateway;
    private AllMessageCampaigns allMessageCampaigns;

    @Autowired
    public CampaignMessageHandler(OutboundEventGateway outboundEventGateway, AllMessageCampaigns allMessageCampaigns) {
        this.outboundEventGateway = outboundEventGateway;
        this.allMessageCampaigns = allMessageCampaigns;
    }

    @MotechListener(subjects = {EventKeys.MESSAGE_CAMPAIGN_SEND_EVENT_SUBJECT})
    public void handleEvent(MotechEvent motechEvent) {
        CampaignMessage campaignMessage = getCampaignMessage(motechEvent);
        outboundEventGateway.sendEventMessage(createNewMotechEvent(motechEvent, campaignMessage));
    }

    private CampaignMessage getCampaignMessage(MotechEvent motechEvent) {
        String campaignName = (String) motechEvent.getParameters().get(EventKeys.CAMPAIGN_NAME_KEY);
        String messageKey = (String) motechEvent.getParameters().get(EventKeys.MESSAGE_KEY);
        return allMessageCampaigns.get(campaignName, messageKey);
    }

    private MotechEvent createNewMotechEvent(MotechEvent eventRaisedByScheduler, CampaignMessage campaignMessage) {
        MotechEvent motechEvent = new MotechEvent(EventKeys.MESSAGE_CAMPAIGN_FIRED_EVENT_SUBJECT);
        motechEvent.getParameters().putAll(eventRaisedByScheduler.getParameters());
        motechEvent.getParameters().put(EventKeys.MESSAGE_NAME_KEY, campaignMessage.name());
        motechEvent.getParameters().put(EventKeys.MESSAGE_FORMATS, campaignMessage.formats());
        motechEvent.getParameters().put(EventKeys.MESSAGE_LANGUAGES, campaignMessage.languages());
        return motechEvent;
    }
}
