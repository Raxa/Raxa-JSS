package org.motechproject.server.messagecampaign.userspecified;

import org.motechproject.server.messagecampaign.domain.campaign.CampaignType;
import org.motechproject.server.messagecampaign.domain.message.*;
import org.motechproject.util.DateUtil;
import org.springframework.util.CollectionUtils;

import java.util.Date;
import java.util.List;

import static org.apache.commons.lang.StringUtils.isEmpty;
import static org.motechproject.server.messagecampaign.domain.message.RepeatingMessageMode.*;

public class CampaignMessageRecord {

    private String name;
    private List<String> formats;
    private List<String> languages;
    private List<String> weekDaysApplicable;
    private String calendarStartOfWeek;
    private String messageKey;
    private Date date;
    private String timeOffset;
    private String repeatInterval;
    private String cron;
    private String deliverTime;


    public CampaignMessage build(CampaignType type) {

        if (type == CampaignType.ABSOLUTE) {
            return buildAbsolute();
        }
        if (type == CampaignType.OFFSET) {
            return buildOffset();
        }
        if (type == CampaignType.REPEATING) {
            return buildRepeating();
        }
        if (type == CampaignType.CRON) {
            return buildCron();
        }
        throw new RuntimeException("Unknown campaign type");
    }

    private CampaignMessage buildCron() {
        CronBasedCampaignMessage message = new CronBasedCampaignMessage();
        message.name(name);
        message.formats(formats);
        message.languages(languages);
        message.messageKey(messageKey);
        message.cron(cron);
        return message;
    }

    private CampaignMessage buildRepeating() {
        return createRepeatingCampaignMessageFromRecord();
    }

    private RepeatingMessageMode findMode() {
        if (validate()) {
            if (!isEmpty(repeatInterval())) return REPEAT_INTERVAL;
            else if (!isEmpty(calendarStartOfWeek())) return CALENDAR_WEEK_SCHEDULE;
            else if (!CollectionUtils.isEmpty(weekDaysApplicable())) return WEEK_DAYS_SCHEDULE;
        }
        throw new IllegalArgumentException("expected repeatInterval or (calendarStartOfWeek, weekDaysApplicable) only");
    }

    public boolean validate() {
        return !isEmpty(repeatInterval()) ? (weekDaysApplicable() == null && calendarStartOfWeek() == null)
                : (weekDaysApplicable() != null || calendarStartOfWeek() != null);
    }

    public RepeatingCampaignMessage createRepeatingCampaignMessageFromRecord() {
        RepeatingMessageMode messageMode = this.findMode();
        if (messageMode.equals(REPEAT_INTERVAL)) {
            return buildDefaultValues(new RepeatingCampaignMessage(repeatInterval(), deliverTime));
        } else if (messageMode.equals(WEEK_DAYS_SCHEDULE)) {
            return buildDefaultValues(new RepeatingCampaignMessage(weekDaysApplicable(), deliverTime));
        } else if (messageMode.equals(CALENDAR_WEEK_SCHEDULE)) {
            return buildDefaultValues(new RepeatingCampaignMessage(calendarStartOfWeek(), weekDaysApplicable(), deliverTime));
        }
        return null;
    }

    public RepeatingCampaignMessage buildDefaultValues(RepeatingCampaignMessage message) {
        message.name(name())
                .formats(formats())
                .languages(languages())
                .messageKey(messageKey());
        return message;
    }

    private CampaignMessage buildAbsolute() {
        AbsoluteCampaignMessage message = new AbsoluteCampaignMessage();
        message.name(name);
        message.formats(formats);
        message.languages(languages);
        message.messageKey(messageKey);
        message.date(DateUtil.newDate(date));
        return message;
    }

    private CampaignMessage buildOffset() {
        OffsetCampaignMessage message = new OffsetCampaignMessage();
        message.name(name);
        message.formats(formats);
        message.languages(languages);
        message.messageKey(messageKey);
        message.timeOffset(timeOffset);
        return message;
    }

    public String name() {
        return name;
    }

    public List<String> formats() {
        return formats;
    }

    public List<String> languages() {
        return languages;
    }

    public String messageKey() {
        return messageKey;
    }

    public Date date() {
        return date;
    }

    public CampaignMessageRecord name(String name) {
        this.name = name;
        return this;
    }

    public CampaignMessageRecord formats(List<String> formats) {
        this.formats = formats;
        return this;
    }

    public CampaignMessageRecord languages(List<String> languages) {
        this.languages = languages;
        return this;
    }

    public CampaignMessageRecord messageKey(String messageKey) {
        this.messageKey = messageKey;
        return this;
    }

    public CampaignMessageRecord date(Date date) {
        this.date = date;
        return this;
    }

    public String timeOffset() {
        return timeOffset;
    }

    public CampaignMessageRecord repeatInterval(String repeatInterval) {
        this.repeatInterval = repeatInterval;
        return this;
    }

    public CampaignMessageRecord timeOffset(String timeOffset) {
        this.timeOffset = timeOffset;
        return this;
    }

    public CampaignMessageRecord weekDaysApplicable(List<String> weekDaysApplicable) {
        this.weekDaysApplicable = weekDaysApplicable;
        return this;
    }

    public CampaignMessageRecord calendarStartOfWeek(String calendarStartOfWeek) {
        this.calendarStartOfWeek = calendarStartOfWeek;
        return this;
    }

    public String repeatInterval() {
        return this.repeatInterval;
    }

    public void cron(String cron) {
        this.cron = cron;
    }

    public CampaignMessageRecord deliverTime(String deliverTime) {
        this.deliverTime = deliverTime;
        return this;
    }

    public String cron() {
        return cron;
    }

    public List<String> weekDaysApplicable() {
        return weekDaysApplicable;
    }

    public String calendarStartOfWeek() {
        return calendarStartOfWeek;
    }
}
