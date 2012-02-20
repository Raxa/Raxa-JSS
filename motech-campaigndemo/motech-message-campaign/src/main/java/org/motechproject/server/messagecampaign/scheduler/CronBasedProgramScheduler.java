package org.motechproject.server.messagecampaign.scheduler;

import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.server.messagecampaign.contract.CampaignRequest;
import org.motechproject.server.messagecampaign.domain.campaign.CronBasedCampaign;
import org.motechproject.server.messagecampaign.domain.message.CronBasedCampaignMessage;

public class CronBasedProgramScheduler extends MessageCampaignScheduler<CronBasedCampaignMessage, CronBasedCampaign> {

    public CronBasedProgramScheduler(MotechSchedulerService schedulerService, CampaignRequest enrollRequest, CronBasedCampaign campaign) {
        super(schedulerService, enrollRequest, campaign);
    }

    @Override
    protected void scheduleJobFor(CronBasedCampaignMessage message) {
        scheduleJobOn(message.cron(), referenceDate(), jobParams(message.messageKey()));
    }
}
