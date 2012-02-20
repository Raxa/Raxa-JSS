package org.motechproject.scheduletracking.api.domain;

import org.junit.Test;
import org.motechproject.valueobjects.WallTime;
import org.motechproject.valueobjects.WallTimeUnit;

import static org.junit.Assert.*;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;
import static org.motechproject.scheduletracking.api.utility.DateTimeUtil.daysAfter;
import static org.motechproject.scheduletracking.api.utility.DateTimeUtil.daysAgo;

public class MilestoneWindowTest {

    @Test
    public void shouldHaveMultipleAlerts() {
        MilestoneWindow window = new MilestoneWindow(WindowName.earliest, new WallTime(0, WallTimeUnit.Day), new WallTime(3, WallTimeUnit.Day));
        Alert alert1 = new Alert(null, 0, 0);
        Alert alert2 = new Alert(null, 0, 1);
        window.addAlerts(alert1, alert2);
        assertArrayEquals(new Alert[]{ alert1, alert2}, window.getAlerts().toArray());
    }

    @Test
    public void shouldReturnFalseIfNowFallsInTheWindow() {
        MilestoneWindow window = new MilestoneWindow(WindowName.earliest, new WallTime(0, WallTimeUnit.Day), new WallTime(3, WallTimeUnit.Day));
        assertFalse(window.hasElapsed(daysAgo(2)));
    }

    @Test
    public void shouldReturnFalseIfNowIsBeforeTheStartOfTheWindow() {
        MilestoneWindow window = new MilestoneWindow(WindowName.earliest, new WallTime(0, WallTimeUnit.Day), new WallTime(3, WallTimeUnit.Day));
        assertFalse(window.hasElapsed(daysAfter(4)));
    }

    @Test
    public void shouldReturnTrueIfNowIsAfterTheEndOfTheWindow() {
        MilestoneWindow window = new MilestoneWindow(WindowName.earliest, new WallTime(0, WallTimeUnit.Day), new WallTime(3, WallTimeUnit.Day));
        assertTrue(window.hasElapsed(daysAgo(4)));
    }

    @Test
    public void shouldReturnTrueIfNowIsOnTheEndOfTheWindow() {
        MilestoneWindow window = new MilestoneWindow(WindowName.earliest, new WallTime(0, WallTimeUnit.Day), new WallTime(3, WallTimeUnit.Day));
        assertTrue(window.hasElapsed(daysAgo(3)));
    }

    @Test
    public void shouldEndOnSameDayIfEndIsNull() {
        MilestoneWindow window = new MilestoneWindow(WindowName.earliest, new WallTime(0, WallTimeUnit.Day), null);
        assertEquals(1, window.getWindowEndInDays());
    }

    @Test
    public void shouldReturnEndOfWindowInDays() {
        MilestoneWindow window = new MilestoneWindow(WindowName.earliest, new WallTime(1, WallTimeUnit.Day), new WallTime(3, WallTimeUnit.Week));
        assertEquals(21, window.getWindowEndInDays());
    }
}
