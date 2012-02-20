package org.motechproject.scheduler.builder;

import junit.framework.Assert;
import org.junit.Test;
import org.motechproject.model.DayOfWeek;
import org.motechproject.model.Time;

public class WeeklyCronJobExpressionBuilderTest {
    @Test
    public void shouldBuildCronExpressionForAParticularDayOfWeek() {
        WeeklyCronJobExpressionBuilder weeklyCronJobExpressionBuilder = new WeeklyCronJobExpressionBuilder(DayOfWeek.Friday);
        Assert.assertEquals("0 0 0 ? * 6", weeklyCronJobExpressionBuilder.build());
    }

    @Test
    public void shouldBuildCronExpressionForAParticularDayAndTime() {
        WeeklyCronJobExpressionBuilder weeklyCronJobExpressionBuilder = new WeeklyCronJobExpressionBuilder(DayOfWeek.Monday);
        Assert.assertEquals("0 30 10 ? * 2", weeklyCronJobExpressionBuilder.withTime(new Time(10, 30)).build());
    }
}