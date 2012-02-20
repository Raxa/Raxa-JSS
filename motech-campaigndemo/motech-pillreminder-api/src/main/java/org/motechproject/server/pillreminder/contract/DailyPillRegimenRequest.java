package org.motechproject.server.pillreminder.contract;

import java.util.List;

public class DailyPillRegimenRequest {
    private int pillWindowInHours;
    private String externalId;
    private List<DosageRequest> dosageRequests;
    protected int reminderRepeatIntervalInMinutes;

    public DailyPillRegimenRequest(String externalId, int pillWindowInHours, int reminderRepeatIntervalInMinutes, List<DosageRequest> dosageRequests) {
        this.externalId = externalId;
        this.dosageRequests = dosageRequests;
        this.reminderRepeatIntervalInMinutes = reminderRepeatIntervalInMinutes;
        this.pillWindowInHours = pillWindowInHours;
    }

    public int getPillWindowInHours() {
        return pillWindowInHours;
    }

    public String getExternalId() {
        return externalId;
    }

    public List<DosageRequest> getDosageRequests() {
        return dosageRequests;
    }

    public int getReminderRepeatIntervalInMinutes() {
        return reminderRepeatIntervalInMinutes;
    }
}