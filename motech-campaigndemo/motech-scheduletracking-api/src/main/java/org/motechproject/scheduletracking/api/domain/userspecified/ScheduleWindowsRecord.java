package org.motechproject.scheduletracking.api.domain.userspecified;

public class ScheduleWindowsRecord {
    private String earliest;
    private String due;
    private String late;
    private String max;

    public ScheduleWindowsRecord() {
    }

    public ScheduleWindowsRecord(String earliest, String due, String late, String max) {
        this.earliest = earliest;
        this.due = due;
        this.late = late;
        this.max = max;
    }

    public String earliest() {
        return earliest;
    }

    public String due() {
        return due;
    }

    public String late() {
        return late;
    }

    public String max() {
        return max;
    }
}
