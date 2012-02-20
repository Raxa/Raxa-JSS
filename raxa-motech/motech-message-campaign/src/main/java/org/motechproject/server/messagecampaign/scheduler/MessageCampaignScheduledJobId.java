package org.motechproject.server.messagecampaign.scheduler;

public class MessageCampaignScheduledJobId {
    private String campaignName;
    private String externalId;
    private String messageKey;

    public MessageCampaignScheduledJobId(String campaignName, String externalId, String messageKey) {
        this.campaignName = campaignName;
        this.externalId = externalId;
        this.messageKey = messageKey;
    }

    public String value() {
        return String.format("%s.%s.%s", campaignName, externalId, messageKey);
    }
}
