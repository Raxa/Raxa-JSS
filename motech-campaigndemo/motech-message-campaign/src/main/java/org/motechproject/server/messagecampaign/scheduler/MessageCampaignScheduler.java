package org.motechproject.server.messagecampaign.scheduler;

import org.joda.time.LocalDate;
import org.motechproject.model.*;
import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.server.messagecampaign.EventKeys;
import org.motechproject.server.messagecampaign.builder.SchedulerPayloadBuilder;
import org.motechproject.server.messagecampaign.contract.CampaignRequest;
import org.motechproject.server.messagecampaign.domain.campaign.Campaign;
import org.motechproject.server.messagecampaign.domain.message.CampaignMessage;
import org.motechproject.server.messagecampaign.service.CampaignTypeHandlersRegistery;
import org.motechproject.util.DateUtil;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.motechproject.server.messagecampaign.EventKeys.BASE_SUBJECT;

public abstract class MessageCampaignScheduler<T extends CampaignMessage, E extends Campaign<T>> {
    protected MotechSchedulerService schedulerService;
    protected CampaignRequest campaignRequest;
    protected E campaign;
    public final static String INTERNAL_REPEATING_MESSAGE_CAMPAIGN_SUBJECT = BASE_SUBJECT + "internal-repeating-campaign";

    protected MessageCampaignScheduler(MotechSchedulerService schedulerService, CampaignRequest campaignRequest, E campaign) {
        this.schedulerService = schedulerService;
        this.campaign = campaign;
        this.campaignRequest = campaignRequest;
    }

    public void start() {
        for (T message : campaign.messages())
            scheduleJobFor(message);
    }

    public void stop(String messageName) {
        MessageCampaignScheduledJobId jobId = new MessageCampaignScheduledJobId(campaign.name(), campaignRequest.externalId(), messageName);
        schedulerService.safeUnscheduleJob(CampaignTypeHandlersRegistery.subjectFor(campaign), jobId.value());
    }

    public void stop() {
        for (T message : campaign.messages()) {
            stop(message.messageKey());
        }
    }

    protected abstract void scheduleJobFor(T message);

    protected void scheduleJobOn(Time startTime, LocalDate startDate, Map<String, Object> params) {
        MotechEvent motechEvent = new MotechEvent(EventKeys.MESSAGE_CAMPAIGN_SEND_EVENT_SUBJECT, params);
        Date startDateTime = startDate == null ? null : DateUtil.newDateTime(startDate, startTime.getHour(), startTime.getMinute(), 0).toDate();
        RunOnceSchedulableJob runOnceSchedulableJob = new RunOnceSchedulableJob(motechEvent, startDateTime);
        schedulerService.scheduleRunOnceJob(runOnceSchedulableJob);
    }

    protected void scheduleJobOn(String cronJobExpression, LocalDate startDate, Map<String, Object> params) {
        MotechEvent motechEvent = new MotechEvent(EventKeys.MESSAGE_CAMPAIGN_SEND_EVENT_SUBJECT, params);
        Date startDateAsDate = startDate == null ? null : startDate.toDate();
        CronSchedulableJob schedulableJob = new CronSchedulableJob(motechEvent, cronJobExpression, startDateAsDate, null);
        schedulerService.scheduleJob(schedulableJob);
    }

    protected LocalDate referenceDate() {
        return campaignRequest.referenceDate() != null ? campaignRequest.referenceDate() : DateUtil.today();
    }

    protected HashMap jobParams(String messageKey) {
        String jobId = getJobId(messageKey);
        return new SchedulerPayloadBuilder()
                .withJobId(jobId)
                .withCampaignName(campaign.name())
                .withMessageKey(messageKey)
                .withExternalId(campaignRequest.externalId())
                .payload();
    }

    protected String getJobId(String messageKey) {
        MessageCampaignScheduledJobId jobId = new MessageCampaignScheduledJobId(campaign.name(), campaignRequest.externalId(), messageKey);
        return jobId.value();
    }
}

