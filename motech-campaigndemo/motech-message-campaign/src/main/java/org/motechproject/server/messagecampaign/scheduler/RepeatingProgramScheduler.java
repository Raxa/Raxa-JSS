package org.motechproject.server.messagecampaign.scheduler;

import org.joda.time.LocalDate;
import org.motechproject.model.CronSchedulableJob;
import org.motechproject.model.MotechEvent;
import org.motechproject.model.Time;
import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.server.messagecampaign.EventKeys;
import org.motechproject.server.messagecampaign.contract.CampaignRequest;
import org.motechproject.server.messagecampaign.domain.campaign.RepeatingCampaign;
import org.motechproject.server.messagecampaign.domain.message.RepeatingCampaignMessage;
import org.motechproject.server.messagecampaign.domain.message.RepeatingMessageMode;
import org.motechproject.util.DateUtil;
import org.motechproject.valueobjects.WallTime;

import java.util.Date;
import java.util.Map;

import static java.lang.String.format;
import static org.motechproject.valueobjects.factory.WallTimeFactory.create;

public class RepeatingProgramScheduler extends MessageCampaignScheduler<RepeatingCampaignMessage, RepeatingCampaign> {
    public static final int DEFAULT_INTERVAL_OFFSET = 1;

    public RepeatingProgramScheduler(MotechSchedulerService schedulerService, CampaignRequest enrollRequest, RepeatingCampaign campaign) {
        super(schedulerService, enrollRequest, campaign);
    }

    @Override
    protected void scheduleJobFor(RepeatingCampaignMessage message) {
        WallTime maxDuration = create(campaign.maxDuration());
        LocalDate startDate = referenceDate();
        LocalDate endDate = startDate.plusDays(message.duration(maxDuration, campaignRequest));

        if (startDate.compareTo(endDate) > 0)
            throw new IllegalArgumentException(format("startDate (%s) is after endDate (%s) for - (%s)", startDate, endDate, campaignRequest));

        Map<String, Object> params = jobParams(message.messageKey());
        params.put(EventKeys.REPEATING_START_OFFSET, startOffset(message));
        params.put(EventKeys.START_DATE, startDate.toDate());
        scheduleRepeatingJob(startDate, campaignRequest.reminderTime(), endDate, params);
    }

    private void scheduleRepeatingJob(LocalDate startDate, Time reminderTime, LocalDate endDate, Map<String, Object> params) {
        MotechEvent motechEvent = new MotechEvent(INTERNAL_REPEATING_MESSAGE_CAMPAIGN_SUBJECT, params);
        Date startDateAsDate = startDate == null ? null : DateUtil.newDateTime(startDate, reminderTime).withMillisOfSecond(0).toDate();
        Date endDateAsDate = endDate == null ? null : endDate.toDate();
        CronSchedulableJob schedulableJob = new CronSchedulableJob(motechEvent, cronExpressionFor(reminderTime), startDateAsDate, endDateAsDate);
        schedulerService.safeScheduleJob(schedulableJob);
    }

    private String cronExpressionFor(Time reminderTime) {
        return String.format("0 %d %d 1/1 * ? *", reminderTime.getMinute(), reminderTime.getHour());
    }

    private int startOffset(RepeatingCampaignMessage message) {
        Integer offset = campaignRequest.startOffset();
        return isRepeatingIntervalMode(message) ? DEFAULT_INTERVAL_OFFSET : (offset == null ? DEFAULT_INTERVAL_OFFSET : offset);
    }

    private boolean isRepeatingIntervalMode(RepeatingCampaignMessage message) {
        return message.mode().equals(RepeatingMessageMode.REPEAT_INTERVAL);
    }
}
