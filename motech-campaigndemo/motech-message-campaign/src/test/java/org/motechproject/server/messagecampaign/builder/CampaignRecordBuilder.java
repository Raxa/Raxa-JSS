package org.motechproject.server.messagecampaign.builder;

import org.motechproject.server.messagecampaign.domain.campaign.CampaignType;
import org.motechproject.server.messagecampaign.userspecified.CampaignMessageRecord;
import org.motechproject.server.messagecampaign.userspecified.CampaignRecord;

import java.util.ArrayList;
import java.util.List;

public class CampaignRecordBuilder {

    public static CampaignRecord absoluteCampaignRecord(String name, CampaignMessageRecord absoluteCampaignMessageRecord) {
        List<CampaignMessageRecord> campaignMessageRecords = new ArrayList<CampaignMessageRecord>();
        campaignMessageRecords.add(absoluteCampaignMessageRecord);
        return new CampaignRecord().name(name).type(CampaignType.ABSOLUTE).messages(campaignMessageRecords);
    }

    public static CampaignRecord offsetCampaignRecord(String name, CampaignMessageRecord offsetCampaignMessageRecord) {
        List<CampaignMessageRecord> campaignMessageRecords = new ArrayList<CampaignMessageRecord>();
        campaignMessageRecords.add(offsetCampaignMessageRecord);
        return new CampaignRecord().name(name).type(CampaignType.OFFSET).maxDuration("2 Weeks").messages(campaignMessageRecords);
    }

    public static CampaignRecord repeatingCampaignRecord(String name, CampaignMessageRecord repeatingCampaignMessageRecord) {
        List<CampaignMessageRecord> campaignMessageRecords = new ArrayList<CampaignMessageRecord>();
        campaignMessageRecords.add(repeatingCampaignMessageRecord);
        return new CampaignRecord().name(name).type(CampaignType.REPEATING).maxDuration("2 Weeks").messages(campaignMessageRecords);
    }

    public static CampaignRecord cronBasedCampaignRecord(String name, CampaignMessageRecord cronBasedMessageRecord) {
        List<CampaignMessageRecord> campaignMessageRecords = new ArrayList<CampaignMessageRecord>();
        campaignMessageRecords.add(cronBasedMessageRecord);
        return new CampaignRecord().name(name).type(CampaignType.CRON).messages(campaignMessageRecords);
    }
}
