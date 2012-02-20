package org.motechproject.server.messagecampaign.builder;

import org.motechproject.server.messagecampaign.domain.campaign.AbsoluteCampaign;
import org.motechproject.server.messagecampaign.domain.campaign.CronBasedCampaign;
import org.motechproject.server.messagecampaign.domain.campaign.OffsetCampaign;
import org.motechproject.server.messagecampaign.domain.campaign.RepeatingCampaign;
import org.motechproject.server.messagecampaign.domain.message.AbsoluteCampaignMessage;
import org.motechproject.server.messagecampaign.domain.message.CronBasedCampaignMessage;
import org.motechproject.server.messagecampaign.domain.message.OffsetCampaignMessage;
import org.motechproject.server.messagecampaign.domain.message.RepeatingCampaignMessage;
import org.motechproject.util.DateUtil;

import java.util.LinkedList;
import java.util.List;

import static java.util.Arrays.asList;

public class CampaignBuilder {


    public AbsoluteCampaign defaultAbsoluteCampaign() {
        AbsoluteCampaign campaign = new AbsoluteCampaign();
        campaign.setName("testCampaign");

        final AbsoluteCampaignMessage absoluteCampaignMessage1 = new CampaignMessageBuilder().absoluteCampaignMessage("AM1", DateUtil.today().plusDays(1), "random-1");
        final AbsoluteCampaignMessage absoluteCampaignMessage2 = new CampaignMessageBuilder().absoluteCampaignMessage("AM2", DateUtil.today().plusDays(2), "random-2");

        LinkedList<AbsoluteCampaignMessage> campaignMessages = new LinkedList<AbsoluteCampaignMessage>() {{
            add(absoluteCampaignMessage1);
            add(absoluteCampaignMessage2);
        }};

        campaign.setMessages(campaignMessages);
        return campaign;
    }

    public CronBasedCampaign defaultCronBasedCampaign() {
        CronBasedCampaign campaign = new CronBasedCampaign();
        campaign.setName("testCampaign");

        final CronBasedCampaignMessage campaignMessage1 = new CampaignMessageBuilder().cronBasedCampaignMessage("CM1", "0 11 11 11 11 ?", "cron-message1");
        final CronBasedCampaignMessage campaignMessage2 = new CampaignMessageBuilder().cronBasedCampaignMessage("CM2", "0 11 11 11 12 ?", "cron-message2");

        LinkedList<CronBasedCampaignMessage> campaignMessages = new LinkedList<CronBasedCampaignMessage>() {{
            add(campaignMessage1);
            add(campaignMessage2);
        }};

        campaign.setMessages(campaignMessages);
        return campaign;
    }

    public OffsetCampaign defaultOffsetCampaign() {
        OffsetCampaign campaign = new OffsetCampaign();
        campaign.setName("testCampaign");

        final OffsetCampaignMessage offsetCampaignMessage1 = new CampaignMessageBuilder().offsetCampaignMessage("OM1", "1 Week", "child-info-week-1");
        final OffsetCampaignMessage offsetCampaignMessage2 = new CampaignMessageBuilder().offsetCampaignMessage("OM2", "2 Weeks", "child-info-week-1a");

        LinkedList<OffsetCampaignMessage> campaignMessages = new LinkedList<OffsetCampaignMessage>() {{
            add(offsetCampaignMessage1);
            add(offsetCampaignMessage2);
        }};

        campaign.setMessages(campaignMessages);
        return campaign;
    }

    public RepeatingCampaign defaultRepeatingCampaign(String maxDuration ) {

        final RepeatingCampaignMessage repeatingCampaignMessage1 = new CampaignMessageBuilder().repeatingCampaignMessageForInterval("OM1", "1 Week", "child-info-week-{Offset}-1");
        final RepeatingCampaignMessage repeatingCampaignMessage2 = new CampaignMessageBuilder().repeatingCampaignMessageForInterval("OM2", "12 Days", "child-info-week-{Offset}-2");
        final RepeatingCampaignMessage repeatingCampaignMessage3 = new CampaignMessageBuilder().repeatingCampaignMessageForDaysApplicable("OM2", asList("Monday", "Wednesday"), "child-info-week-{Offset}-{WeekDay}");
        final RepeatingCampaignMessage repeatingCampaignMessage_CalendarWeek = new CampaignMessageBuilder().repeatingCampaignMessageForCalendarWeek("OM2", "Monday",
                asList("Monday", "Wednesday"), "child-info-week-{Offset}-{WeekDay}");

        LinkedList<RepeatingCampaignMessage> campaignMessages = new LinkedList<RepeatingCampaignMessage>() {{
            add(repeatingCampaignMessage1);
            add(repeatingCampaignMessage2);
            add(repeatingCampaignMessage3);
            add(repeatingCampaignMessage_CalendarWeek);
        }};
        return repeatingCampaign("testCampaign", maxDuration, campaignMessages);
    }

    public RepeatingCampaign repeatingCampaign(String campaingName, String duration, List<RepeatingCampaignMessage> messages) {
        RepeatingCampaign campaign = new RepeatingCampaign();
        campaign.setName(campaingName);
        campaign.maxDuration(duration);
        campaign.setMessages(messages);
        return campaign;
    }

}
