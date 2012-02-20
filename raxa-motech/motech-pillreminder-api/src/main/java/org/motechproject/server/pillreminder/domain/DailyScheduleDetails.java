package org.motechproject.server.pillreminder.domain;

public class DailyScheduleDetails {
    private int pillWindowInHours;
    private int repeatIntervalInMinutes;

    protected DailyScheduleDetails() {
    }

    public DailyScheduleDetails(int repeatIntervalInMinutes, int pillWindowInHours) {
        this.repeatIntervalInMinutes = repeatIntervalInMinutes;
        this.pillWindowInHours = pillWindowInHours;
    }

    public int getPillWindowInHours() {
        return pillWindowInHours;
    }

    public void setPillWindowInHours(int pillWindowInHours) {
        this.pillWindowInHours = pillWindowInHours;
    }

    public int getRepeatIntervalInMinutes() {
        return repeatIntervalInMinutes;
    }

    public void setRepeatIntervalInMinutes(int repeatIntervalInMinutes) {
        this.repeatIntervalInMinutes = repeatIntervalInMinutes;
    }
}
