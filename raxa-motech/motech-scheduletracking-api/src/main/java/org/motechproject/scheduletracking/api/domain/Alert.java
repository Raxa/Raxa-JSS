package org.motechproject.scheduletracking.api.domain;

import org.motechproject.valueobjects.WallTime;

public class Alert {

    private WallTime interval;
    private int repeatCount;
    private int index;

    public int getIndex() {
        return index;
    }

    public Alert(WallTime interval, int repeatCount, int index) {
        this.interval = interval;
        this.repeatCount = repeatCount;
        this.index = index;
    }

    public WallTime getInterval() {
        return interval;
    }

    public int getRepeatCount() {
        return repeatCount;
    }
}
