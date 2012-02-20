package org.motechproject.server.messagecampaign.domain.campaign;

import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.server.messagecampaign.contract.CampaignRequest;
import org.motechproject.server.messagecampaign.domain.message.AbsoluteCampaignMessage;
import org.motechproject.server.messagecampaign.scheduler.AbsoluteProgramScheduler;
import org.motechproject.server.messagecampaign.scheduler.MessageCampaignScheduler;

import java.util.List;

public class AbsoluteCampaign extends Campaign<AbsoluteCampaignMessage> {

    protected List<AbsoluteCampaignMessage> messages;

    @Override
    public List<AbsoluteCampaignMessage> messages() {
        return this.messages;
    }

    @Override
    public MessageCampaignScheduler getScheduler(MotechSchedulerService motechSchedulerService, CampaignRequest enrollRequest) {
        return new AbsoluteProgramScheduler(motechSchedulerService, enrollRequest, this);
    }

    @Override
    public void setMessages(List<AbsoluteCampaignMessage> messages) {
        this.messages = messages;
    }
}
