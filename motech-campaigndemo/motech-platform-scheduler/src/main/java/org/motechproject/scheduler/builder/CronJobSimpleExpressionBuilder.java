package org.motechproject.scheduler.builder;

import org.motechproject.model.Time;

public class CronJobSimpleExpressionBuilder {

    private Time startTime;

    private final String CRON_JOB_EXPR = "0 %d %d %s * ?";
    private int dayOfMonth;

    public CronJobSimpleExpressionBuilder(Time startTime) {
        this.startTime = startTime;
    }

    public CronJobSimpleExpressionBuilder withRepeatIntervalInDays(int repeatIntervalInDays) {
        this.dayOfMonth = repeatIntervalInDays;
        return this;
    }

    public String build() {
        String day = dayOfMonth == 0 ? "*" : "*/" + dayOfMonth;
        return String.format(CRON_JOB_EXPR, startTime.getMinute(), startTime.getHour(), day);
    }
}
