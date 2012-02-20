package org.motechproject.server.pillreminder.contract;

import java.util.List;

public class PillRegimenResponse {
    private String pillRegimenId;
    private String externalId;
    private int reminderRepeatWindowInHours;
    private int reminderRepeatIntervalInMinutes;
    private List<DosageResponse> dosages;

    public PillRegimenResponse(String pillRegimenId, String externalId, int reminderRepeatWindowInHours, int reminderRepeatIntervalInMinutes, List<DosageResponse> dosages) {
        this.pillRegimenId = pillRegimenId;
        this.externalId = externalId;
        this.reminderRepeatWindowInHours = reminderRepeatWindowInHours;
        this.reminderRepeatIntervalInMinutes = reminderRepeatIntervalInMinutes;
        this.dosages = dosages;
    }

    public String getPillRegimenId() {
        return pillRegimenId;
    }

    public String getExternalId() {
        return externalId;
    }

    public int getReminderRepeatWindowInHours() {
        return reminderRepeatWindowInHours;
    }

    public int getReminderRepeatIntervalInMinutes() {
        return reminderRepeatIntervalInMinutes;
    }

    public List<DosageResponse> getDosages() {
        return dosages;
    }
}
