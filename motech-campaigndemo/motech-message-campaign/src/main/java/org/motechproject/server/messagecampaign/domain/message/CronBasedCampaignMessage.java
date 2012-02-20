package org.motechproject.server.messagecampaign.domain.message;

public class CronBasedCampaignMessage extends CampaignMessage {
    private String cron;

    public String cron() {
        return this.cron;
    }

    public void cron(String cron) {
        this.cron = cron;
    }
}
