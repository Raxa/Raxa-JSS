package org.motechproject.server.messagecampaign.dao;

import com.google.gson.reflect.TypeToken;
import org.motechproject.dao.MotechJsonReader;
import org.motechproject.model.DayOfWeek;
import org.motechproject.server.messagecampaign.domain.campaign.Campaign;
import org.motechproject.server.messagecampaign.domain.message.CampaignMessage;
import org.motechproject.server.messagecampaign.domain.message.RepeatingCampaignMessage;
import org.motechproject.server.messagecampaign.userspecified.CampaignRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import static ch.lambdaj.Lambda.*;
import static org.hamcrest.Matchers.equalTo;

@Component
public class AllMessageCampaigns {

    public static final String MESSAGECAMPAIGN_DEFINITION_FILE = "messagecampaign.definition.file";
    public static List<Campaign> campaigns = new ArrayList<Campaign>();
    private Properties properties;
    private MotechJsonReader motechJsonReader;

    public AllMessageCampaigns(Properties properties, MotechJsonReader motechJsonReader) {
        this.properties = properties;
        this.motechJsonReader = motechJsonReader;
    }

    @Autowired
    public AllMessageCampaigns(@Qualifier(value = "messageCampaignProperties") Properties properties) {
        this(properties, new MotechJsonReader());
    }

    public Campaign get(String campaignName) {
        List<Campaign> campaign = select(readCampaignsFromJSON(), having(on(Campaign.class).name(), equalTo(campaignName)));
        return CollectionUtils.isEmpty(campaign) ? null : campaign.get(0);
    }

    private List<Campaign> readCampaignsFromJSON() {
        if (CollectionUtils.isEmpty(campaigns)) {
            List<CampaignRecord> campaignRecords = (List<CampaignRecord>) motechJsonReader.readFromFile(definitionFile(),
                    new TypeToken<List<CampaignRecord>>() {
                    }.getType());

            for (CampaignRecord campaignRecord : campaignRecords) {
                campaigns.add(campaignRecord.build());
            }
        }

        return campaigns;
    }

    public CampaignMessage get(String campaignName, String messageKey) {
        Campaign campaign = get(campaignName);
        if (campaign != null) {
            for (Object message : campaign.messages()) {
                CampaignMessage campaignMessage = (CampaignMessage) message;
                if (campaignMessage.messageKey().equals(messageKey)) {
                    return campaignMessage;
                }
            }
        }
        return null;
    }

    private String definitionFile() {
        return this.properties.getProperty(MESSAGECAMPAIGN_DEFINITION_FILE);
    }

    public List<DayOfWeek> getApplicableDaysForRepeatingCampaign(String campaignName, String messageName) {
        Campaign campaign = get(campaignName);
        if (campaign != null) {
            for (Object message : campaign.messages()) {
                RepeatingCampaignMessage campaignMessage = (RepeatingCampaignMessage) message;
                if (campaignMessage.name().equals(messageName))
                    return campaignMessage.weekDaysApplicable();
            }
        }
        return null;
    }

    public CampaignMessage getCampaignMessageByMessageName(String campaignName, String messageName) {
        Campaign campaign = get(campaignName);
        if (campaign != null) {
            for (Object message : campaign.messages()) {
                CampaignMessage campaignMessage = (CampaignMessage) message;
                if (campaignMessage.name().equals(messageName)) {
                    return campaignMessage;
                }
            }
        }
        return null;
    }
}