package org.motechproject.scheduler.builder;


import org.motechproject.model.DayOfWeek;
import org.motechproject.model.Time;

public class WeeklyCronJobExpressionBuilder {
    private int quartzDayOfWeek;
    private int hour;
    private int minute;

    public WeeklyCronJobExpressionBuilder(DayOfWeek dayOfWeek) {
        quartzDayOfWeek = (dayOfWeek.getValue() % 7) + 1;
    }

    public WeeklyCronJobExpressionBuilder(int dayOfWeekNumber) {
        quartzDayOfWeek = dayOfWeekNumber;
    }

    public WeeklyCronJobExpressionBuilder withTime(Time time) {
        this.hour = time.getHour();
        this.minute = time.getMinute();
        return this;
    }

    public String build() {
        String CRON_JOB_EXPR = "0 %d %d ? * %d";

        return String.format(CRON_JOB_EXPR, minute, hour, quartzDayOfWeek);
    }
}
