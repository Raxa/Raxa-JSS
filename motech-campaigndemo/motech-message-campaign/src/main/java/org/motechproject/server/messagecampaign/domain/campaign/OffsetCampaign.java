package org.motechproject.server.messagecampaign.domain.campaign;

import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.server.messagecampaign.contract.CampaignRequest;
import org.motechproject.server.messagecampaign.domain.message.OffsetCampaignMessage;
import org.motechproject.server.messagecampaign.scheduler.MessageCampaignScheduler;
import org.motechproject.server.messagecampaign.scheduler.OffsetProgramScheduler;

import java.util.List;

public class OffsetCampaign extends Campaign<OffsetCampaignMessage> {

    private List<OffsetCampaignMessage> messages;

    protected String maxDuration;

    @Override
    public List<OffsetCampaignMessage> messages() {
        return this.messages;
    }

    @Override
    public MessageCampaignScheduler getScheduler(MotechSchedulerService schedulerService, CampaignRequest enrollRequest) {
        return new OffsetProgramScheduler(schedulerService, enrollRequest, this);
    }

    @Override
    public void setMessages(List<OffsetCampaignMessage> messages) {
        this.messages = messages;
    }

    public String maxDuration() {
        return maxDuration;
    }

    public void maxDuration(String maxDuration) {
        this.maxDuration = maxDuration;
    }
}
