package org.motechproject.server.messagecampaign.service;

import org.motechproject.server.messagecampaign.contract.CampaignRequest;

public interface MessageCampaignService {
    void startFor(CampaignRequest enrollRequest);
    void stopFor(CampaignRequest enrollRequest, String message);
    void stopAll(CampaignRequest enrollRequest);
}
