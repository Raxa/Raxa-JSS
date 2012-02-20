package org.motechproject.server.messagecampaign.userspecified;

import org.junit.Test;
import org.motechproject.server.messagecampaign.builder.CampaignMessageRecordBuilder;
import org.motechproject.server.messagecampaign.builder.CampaignRecordBuilder;
import org.motechproject.server.messagecampaign.domain.campaign.*;
import org.motechproject.server.messagecampaign.domain.message.AbsoluteCampaignMessage;
import org.motechproject.server.messagecampaign.domain.message.CronBasedCampaignMessage;
import org.motechproject.server.messagecampaign.domain.message.OffsetCampaignMessage;
import org.motechproject.server.messagecampaign.domain.message.RepeatingCampaignMessage;
import org.motechproject.util.DateUtil;
import org.motechproject.valueobjects.factory.WallTimeFactory;

import java.util.List;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertTrue;

public class CampaignRecordTest {

    private CampaignRecord campaignRecord;
    private CampaignMessageRecord messageRecord;


    @Test
    public void testBuildAbsoluteCampaign() {
        messageRecord = CampaignMessageRecordBuilder.createAbsoluteCampaignMessageRecord("Message 1", "message-key");
        campaignRecord = CampaignRecordBuilder.absoluteCampaignRecord("Campaign 1", messageRecord);

        Campaign campaign =  campaignRecord.build();
        assertTrue(campaign instanceof AbsoluteCampaign);
        AbsoluteCampaign absoluteCampaign = (AbsoluteCampaign) campaign;
        assertEquals(campaignRecord.name(), absoluteCampaign.name());
        assertEquals(CampaignType.ABSOLUTE, absoluteCampaign.type());
        List<AbsoluteCampaignMessage> messages = absoluteCampaign.messages();
        assertEquals(1, messages.size());

        AbsoluteCampaignMessage message = messages.get(0);
        assertEquals(messageRecord.name(), message.name());
        assertEquals(messageRecord.formats(), message.formats());
        assertEquals(messageRecord.languages(), message.languages());
        assertEquals(messageRecord.messageKey(), message.messageKey());
        assertEquals(DateUtil.newDate(messageRecord.date()), message.date());
    }

    @Test
    public void testBuildOffsetCampaign() {
        messageRecord = CampaignMessageRecordBuilder.createOffsetCampaignMessageRecord("Message 1", "message-key");
        campaignRecord = CampaignRecordBuilder.offsetCampaignRecord("Campaign 1", messageRecord);

        Campaign campaign = campaignRecord.build();
        assertTrue(campaign instanceof OffsetCampaign);
        OffsetCampaign offsetCampaign = (OffsetCampaign) campaign;
        assertEquals(campaignRecord.name(), offsetCampaign.name());
        assertEquals(CampaignType.OFFSET, offsetCampaign.type());
        assertEquals(campaignRecord.maxDuration(), offsetCampaign.maxDuration());
        List<OffsetCampaignMessage> messages = offsetCampaign.messages();
        assertEquals(1, messages.size());

        OffsetCampaignMessage message = messages.get(0);
        assertEquals(messageRecord.name(), message.name());
        assertEquals(messageRecord.formats(), message.formats());
        assertEquals(messageRecord.languages(), message.languages());
        assertEquals(messageRecord.messageKey(), message.messageKey());
        assertEquals(messageRecord.timeOffset(), message.timeOffset());

    }

    @Test
    public void testBuildRepeatingCampaign() {
        messageRecord = CampaignMessageRecordBuilder.createRepeatingMessageRecordWithInterval("Message 1", "message-key", "1 Weeks");
        campaignRecord = CampaignRecordBuilder.repeatingCampaignRecord("Campaign 1", messageRecord);

        Campaign campaign = campaignRecord.build();
        assertTrue(campaign instanceof RepeatingCampaign);
        RepeatingCampaign repeatingCampaign = (RepeatingCampaign) campaign;
        assertEquals(campaignRecord.name(), repeatingCampaign.name());
        assertEquals(campaignRecord.maxDuration(), repeatingCampaign.maxDuration());
        assertEquals(CampaignType.REPEATING, repeatingCampaign.type());
        List<RepeatingCampaignMessage> messages = repeatingCampaign.messages();
        assertEquals(1, messages.size());

        RepeatingCampaignMessage message = messages.get(0);
        assertEquals(messageRecord.name(), message.name());
        assertEquals(messageRecord.formats(), message.formats());
        assertEquals(messageRecord.languages(), message.languages());
        assertEquals(messageRecord.messageKey(), message.messageKey());
        assertEquals(WallTimeFactory.create(messageRecord.repeatInterval()).inDays(), message.repeatIntervalInDaysForOffset());

    }

    @Test
    public void testBuildCronBasedCampaign() {
        messageRecord = CampaignMessageRecordBuilder.createCronBasedCampaignMessageRecord("Message 1", "message-key");
        campaignRecord = CampaignRecordBuilder.cronBasedCampaignRecord("Campaign 1", messageRecord);

        Campaign campaign = campaignRecord.build();
        assertTrue(campaign instanceof CronBasedCampaign);
        CronBasedCampaign cronBasedCampaign = (CronBasedCampaign) campaign;
        assertEquals(campaignRecord.name(), cronBasedCampaign.name());
        assertEquals(CampaignType.CRON, cronBasedCampaign.type());
        List<CronBasedCampaignMessage> messages = cronBasedCampaign.messages();
        assertEquals(1, messages.size());

        CronBasedCampaignMessage message = messages.get(0);
        assertEquals(messageRecord.name(), message.name());
        assertEquals(messageRecord.formats(), message.formats());
        assertEquals(messageRecord.languages(), message.languages());
        assertEquals(messageRecord.messageKey(), message.messageKey());
        assertEquals(messageRecord.cron(), message.cron());

    }
}
