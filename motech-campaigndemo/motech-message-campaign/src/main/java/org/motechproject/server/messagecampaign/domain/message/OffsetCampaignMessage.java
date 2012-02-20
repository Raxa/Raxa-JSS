package org.motechproject.server.messagecampaign.domain.message;

public class OffsetCampaignMessage extends CampaignMessage {

    private String timeOffset;

    public String timeOffset() {
        return timeOffset;
    }

    public void timeOffset(String timeOffset) {
        this.timeOffset = timeOffset;
    }
}
