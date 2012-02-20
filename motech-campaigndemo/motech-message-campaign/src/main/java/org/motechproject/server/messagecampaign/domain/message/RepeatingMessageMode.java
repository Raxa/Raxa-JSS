package org.motechproject.server.messagecampaign.domain.message;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.joda.time.Period;
import org.joda.time.PeriodType;
import org.motechproject.model.DayOfWeek;
import org.motechproject.model.Time;
import org.motechproject.server.messagecampaign.contract.CampaignRequest;
import org.motechproject.server.messagecampaign.scheduler.RepeatingProgramScheduler;
import org.motechproject.util.DateUtil;
import org.motechproject.valueobjects.WallTime;

import java.util.Date;

import static org.joda.time.DateTimeConstants.SUNDAY;
import static org.joda.time.Days.daysBetween;
import static org.motechproject.server.messagecampaign.domain.message.RepeatingCampaignMessage.WEEKLY_REPEAT_INTERVAL;
import static org.motechproject.server.messagecampaign.scheduler.RepeatingProgramScheduler.DEFAULT_INTERVAL_OFFSET;
import static org.motechproject.util.DateUtil.*;
import static org.motechproject.valueobjects.factory.WallTimeFactory.create;

public enum RepeatingMessageMode {

    REPEAT_INTERVAL {
        public boolean isApplicable(RepeatingCampaignMessage message) {
            return true;
        }

        public Integer repeatIntervalForOffSet(RepeatingCampaignMessage message) {
            return create(message.repeatInterval()).inDays();
        }

        public Integer offset(RepeatingCampaignMessage message, Date startTime, Integer startIntervalOffset) {
            return (daysBetween(newDate(startTime), today()).getDays() / repeatIntervalForOffSet(message)) + DEFAULT_INTERVAL_OFFSET;
        }

        public int duration(WallTime maxDuration, CampaignRequest campaignRequest, RepeatingCampaignMessage message) {
            return maxDuration.inDays() - 1;
        }

        @Override
        public String applicableWeekDayInNext24Hours(RepeatingCampaignMessage message) {
            return (message.isApplicable()) ? DateUtil.now().dayOfWeek().getAsText() : null;
        }

    }, WEEK_DAYS_SCHEDULE {
        public boolean isApplicable(RepeatingCampaignMessage message) {
            return isWeekDayApplicable(message);
        }

        public Integer repeatIntervalForOffSet(RepeatingCampaignMessage message) {
            return WEEKLY_REPEAT_INTERVAL;
        }

        public Integer offset(RepeatingCampaignMessage message, Date startTime, Integer startIntervalOffset) {
            return (daysBetween(newDate(startTime), today()).getDays() / repeatIntervalForOffSet(message)) + startIntervalOffset;
        }

        public int duration(WallTime maxDuration, CampaignRequest campaignRequest, RepeatingCampaignMessage message) {
            int elapsedOffsetInDays = (defaultOffsetIfNotSet(campaignRequest.startOffset()) - 1) * repeatIntervalForOffSet(message);
            return (maxDuration.inDays() - 1) - elapsedOffsetInDays;
        }

        @Override
        public String applicableWeekDayInNext24Hours(RepeatingCampaignMessage message) {
            return (message.isApplicable()) ? DateUtil.now().dayOfWeek().getAsText() : null;
        }

    }, CALENDAR_WEEK_SCHEDULE {
        public boolean isApplicable(RepeatingCampaignMessage message) {
            return isWeekDayApplicable(message);
        }

        public Integer repeatIntervalForOffSet(RepeatingCampaignMessage message) {
            return WEEKLY_REPEAT_INTERVAL;
        }

        public Integer offset(RepeatingCampaignMessage message, Date cycleStartDate, Integer startIntervalOffset) {

            LocalDate cycleStartLocalDate = DateUtil.newDate(cycleStartDate);
            LocalDate currentDate = DateUtil.today();

            if (cycleStartDate.compareTo(currentDate.toDate()) > 0)
                throw new IllegalArgumentException("cycleStartDate cannot be in future");

            int daysDiff = new Period(cycleStartLocalDate, currentDate, PeriodType.days()).getDays();
            if (daysDiff > 0) {
                int daysToFirstCalendarWeekEnd = daysToCalendarWeekEnd(cycleStartLocalDate, message.calendarStartDayOfWeek().getValue());
                int daysAfterFirstCalendarWeekEnd = daysDiff > daysToFirstCalendarWeekEnd ? daysDiff - daysToFirstCalendarWeekEnd : 0;
                int weeksAfterFirstSaturday = daysAfterFirstCalendarWeekEnd / 7 + (daysAfterFirstCalendarWeekEnd % 7 > 0 ? 1 : 0);
                return weeksAfterFirstSaturday + startIntervalOffset;
            }
            return startIntervalOffset;
        }

        public int duration(WallTime maxDuration, CampaignRequest campaignRequest, RepeatingCampaignMessage message) {
            int actualMaxDurationDaysToAdd = maxDuration.inDays() - 1;
            int elapsedOffset = (defaultOffsetIfNotSet(campaignRequest.startOffset()) - 1) * repeatIntervalForOffSet(message);
            int daysToNormalizeForFirstWeek = daysToSubtractForRegisteredWeek(campaignRequest.referenceDate(), message.calendarStartDayOfWeek().getValue());
            return actualMaxDurationDaysToAdd - daysToNormalizeForFirstWeek - elapsedOffset;
        }

        @Override
        public String applicableWeekDayInNext24Hours(RepeatingCampaignMessage message) {
            DateTime dateTime = calculateNextPossible(DateUtil.now(), message);
            DateTime nextPossibleDateLimit = DateUtil.now().plusDays(1).minusMinutes(1);
            if (dateTime.toDate().compareTo(DateUtil.now().toDate()) >= 0 && dateTime.isBefore(nextPossibleDateLimit))
                return dateTime.dayOfWeek().getAsText();
            return null;
        }

        private int daysToSubtractForRegisteredWeek(LocalDate startDate, int calendarStartDayOfWeek) {
            int daysToFirstWeekend = daysToCalendarWeekEnd(startDate, calendarStartDayOfWeek);
            // 0-6 based for daysToFirstWeekend
            return 6 - daysToFirstWeekend;
        }
    };

    private static int defaultOffsetIfNotSet(Integer offset) {
        return offset == null ? RepeatingProgramScheduler.DEFAULT_INTERVAL_OFFSET : offset;
    }

    private static boolean isWeekDayApplicable(RepeatingCampaignMessage message) {
        int currentDayOfWeek = DateUtil.now().dayOfWeek().get();
        for (DayOfWeek dayOfWeek : message.weekDaysApplicable())
            if (dayOfWeek.getValue() == currentDayOfWeek) return true;
        return false;
    }

    DateTime calculateNextPossible(DateTime fromDate, RepeatingCampaignMessage message) {
        int dayOfWeek = fromDate.getDayOfWeek();
        int noOfDaysToNearestCycleDate = 0;
        for (int currentDayOfWeek = dayOfWeek, dayCount = 0; dayCount <= SUNDAY; dayCount++) {
            if (message.weekDaysApplicable().contains(DayOfWeek.getDayOfWeek(currentDayOfWeek))) {
                noOfDaysToNearestCycleDate = dayCount;
                break;
            }
            if (currentDayOfWeek == SUNDAY) currentDayOfWeek = 1;
            else currentDayOfWeek++;
        }
        Time time = message.deliverTime();
        return fromDate.plusDays(noOfDaysToNearestCycleDate).withHourOfDay(time.getHour()).withMinuteOfHour(time.getMinute());
    }

    public abstract boolean isApplicable(RepeatingCampaignMessage repeatingCampaignMessage);

    public abstract Integer offset(RepeatingCampaignMessage repeatingCampaignMessage, Date startTime, Integer startIntervalOffset);

    public abstract Integer repeatIntervalForOffSet(RepeatingCampaignMessage repeatingCampaignMessage);

    public abstract int duration(WallTime maxDuration, CampaignRequest campaignRequest, RepeatingCampaignMessage message);

    public abstract String applicableWeekDayInNext24Hours(RepeatingCampaignMessage message);
}
