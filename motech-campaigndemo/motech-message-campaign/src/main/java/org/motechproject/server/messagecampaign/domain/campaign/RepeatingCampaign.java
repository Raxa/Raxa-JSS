package org.motechproject.server.messagecampaign.domain.campaign;

import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.server.messagecampaign.contract.CampaignRequest;
import org.motechproject.server.messagecampaign.domain.message.RepeatingCampaignMessage;
import org.motechproject.server.messagecampaign.scheduler.MessageCampaignScheduler;
import org.motechproject.server.messagecampaign.scheduler.RepeatingProgramScheduler;

import java.util.List;

public class RepeatingCampaign extends Campaign<RepeatingCampaignMessage> {

    private List<RepeatingCampaignMessage> messages;

    private String maxDuration;

    @Override
    public List<RepeatingCampaignMessage> messages() {
        return this.messages;
    }

    @Override
    public MessageCampaignScheduler getScheduler(MotechSchedulerService schedulerService, CampaignRequest enrollRequest) {
        return new RepeatingProgramScheduler(schedulerService, enrollRequest, this);
    }

    @Override
    public void setMessages(List<RepeatingCampaignMessage> messages) {
        this.messages = messages;
    }

    public void maxDuration(String maxDuration) {
        this.maxDuration = maxDuration;
    }

    public String maxDuration() {
        return maxDuration;
    }
}
