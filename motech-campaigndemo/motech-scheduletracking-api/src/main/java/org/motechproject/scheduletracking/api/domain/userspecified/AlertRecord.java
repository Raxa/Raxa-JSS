package org.motechproject.scheduletracking.api.domain.userspecified;

public class AlertRecord {
    private String window;
    private String startOffset;
    private String interval;
    private String count;

    public String window() {
        return window;
    }

    public String startOffset() {
        return startOffset;
    }

    public String interval() {
        return interval;
    }

    public String count() {
        return count;
    }
}
