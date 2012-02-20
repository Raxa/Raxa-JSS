package org.motechproject.scheduler.builder;

import org.junit.Test;
import org.motechproject.model.Time;

import static junit.framework.Assert.assertEquals;

public class CronJobExpressionBuilderTest {
    @Test
    public void testBuild_case1() {
        String cronJobExpression = new CronJobExpressionBuilder(new Time(9, 5), 5, 20).build();
        assertEquals("0 5/20 9-14 * * ?", cronJobExpression);
    }

    @Test
    public void testBuild_case2() {
        String cronJobExpression = new CronJobExpressionBuilder(new Time(9, 0), 4, 30).build();
        assertEquals("0 0/30 9-13 * * ?", cronJobExpression);
    }

    @Test
    public void testBuild_case3() {
        String cronJobExpression = new CronJobExpressionBuilder(new Time(9, 15), 3, 15).build();
        assertEquals("0 15/15 9-12 * * ?", cronJobExpression);
    }

    @Test
    public void testBuild_SetEndHourAsTwentyThreeIfReminderWindowExtendsBeyondTheCurrentDay() {
        String cronJobExpression = new CronJobExpressionBuilder(new Time(9, 15), 21, 15).build();
        assertEquals("0 15/15 9-23 * * ?", cronJobExpression);
    }
}
