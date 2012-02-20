package org.motechproject.server.messagecampaign.service;

import org.motechproject.server.messagecampaign.EventKeys;
import org.motechproject.server.messagecampaign.domain.campaign.Campaign;
import org.motechproject.server.messagecampaign.domain.campaign.CampaignType;
import org.motechproject.server.messagecampaign.scheduler.MessageCampaignScheduler;

import java.util.Map;
import java.util.HashMap;

public class CampaignTypeHandlersRegistery {
    private static Map<CampaignType, String> map = new HashMap();

    static {
        map.put(CampaignType.REPEATING, MessageCampaignScheduler.INTERNAL_REPEATING_MESSAGE_CAMPAIGN_SUBJECT);
    }

    public static String subjectFor(Campaign campaign) {
        if (map.containsKey(campaign.type())) return map.get(campaign.type());
        return EventKeys.MESSAGE_CAMPAIGN_SEND_EVENT_SUBJECT;
    }
}
