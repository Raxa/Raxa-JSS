package org.motechproject.server.messagecampaign.domain.campaign;

import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.server.messagecampaign.contract.CampaignRequest;
import org.motechproject.server.messagecampaign.domain.message.CampaignMessage;
import org.motechproject.server.messagecampaign.scheduler.MessageCampaignScheduler;

import java.util.List;

public abstract class Campaign<T extends CampaignMessage> {
    private String name;
    private CampaignType type;
    private List<CampaignMessage> messages;

    public String name() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public CampaignType type() {
        return type;
    }

    public void setType(CampaignType type) {
        this.type = type;
    }

    public abstract void setMessages(List<T> messages);

    public abstract List<T> messages();

    public abstract MessageCampaignScheduler getScheduler(MotechSchedulerService motechSchedulerService, CampaignRequest enrollRequest);

}
