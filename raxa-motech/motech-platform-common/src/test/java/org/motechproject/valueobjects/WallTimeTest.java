package org.motechproject.valueobjects;

import org.junit.Test;

public class WallTimeTest {
    @Test
    public void periodElapsedSince() {
        WallTime wallTime = new WallTime(1, WallTimeUnit.Week);
        wallTime.asPeriod();
    }
}
