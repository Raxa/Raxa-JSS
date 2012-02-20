package org.motechproject.server.messagecampaign.builder;

import org.joda.time.LocalDate;
import org.motechproject.server.messagecampaign.domain.message.*;

import java.util.Arrays;
import java.util.List;

public class CampaignMessageBuilder {

    public AbsoluteCampaignMessage absoluteCampaignMessage(String name, LocalDate date, String messageKey) {
        AbsoluteCampaignMessage absoluteCampaignMessage = new AbsoluteCampaignMessage();
        absoluteCampaignMessage.name(name);
        absoluteCampaignMessage.date(date);
        absoluteCampaignMessage.messageKey(messageKey);
        return absoluteCampaignMessage;
    }

    public CronBasedCampaignMessage cronBasedCampaignMessage(String name, String cron, String messageKey) {
        CronBasedCampaignMessage cronBasedCampaignMessage = new CronBasedCampaignMessage();
        cronBasedCampaignMessage.name(name);
        cronBasedCampaignMessage.cron(cron);
        cronBasedCampaignMessage.messageKey(messageKey);
        return cronBasedCampaignMessage;
    }

    public OffsetCampaignMessage offsetCampaignMessage(String name, String timeOffset, String messageKey) {
        OffsetCampaignMessage offsetCampaignMessage = new OffsetCampaignMessage();
        offsetCampaignMessage.name(name);
        offsetCampaignMessage.timeOffset(timeOffset);
        offsetCampaignMessage.messageKey(messageKey);
        return offsetCampaignMessage;
    }

    public RepeatingCampaignMessage repeatingCampaignMessageForInterval(String name, String repeatInterval, String messageKey) {
        RepeatingCampaignMessage repeatingCampaignMessage = new RepeatingCampaignMessage(repeatInterval, "0:0");
        repeatingCampaignParams(name, messageKey, repeatingCampaignMessage);
        return repeatingCampaignMessage.mode(RepeatingMessageMode.REPEAT_INTERVAL);
    }

    private RepeatingCampaignMessage repeatingCampaignParams(String name, String messageKey, RepeatingCampaignMessage repeatingCampaignMessage) {
        repeatingCampaignMessage.name(name);
        repeatingCampaignMessage.formats(Arrays.asList("IVR"));
        repeatingCampaignMessage.languages(Arrays.asList("en"));
        repeatingCampaignMessage.messageKey(messageKey);
        return repeatingCampaignMessage;
    }

    public RepeatingCampaignMessage repeatingCampaignMessageForDaysApplicable(String name, List<String> weekDays,String messageKey) {
        return repeatingCampaignMessageForCalendarWeek(name, null, weekDays, messageKey).mode(RepeatingMessageMode.WEEK_DAYS_SCHEDULE);
    }

    public RepeatingCampaignMessage repeatingCampaignMessageForCalendarWeek(String name, String calendarStartOfWeek, List<String> weekDays,String messageKey) {
        RepeatingCampaignMessage repeatingCampaignMessage = new RepeatingCampaignMessage(calendarStartOfWeek, weekDays, "0:0");
        repeatingCampaignParams(name, messageKey, repeatingCampaignMessage);
        return repeatingCampaignMessage.mode(RepeatingMessageMode.CALENDAR_WEEK_SCHEDULE);
    }
}
