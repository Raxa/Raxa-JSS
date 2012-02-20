package org.motechproject.server.pillreminder.domain;

import org.ektorp.support.TypeDiscriminator;
import org.joda.time.DateTime;
import org.motechproject.model.MotechBaseDataObject;
import org.motechproject.model.Time;
import org.motechproject.util.DateUtil;

import java.util.Set;

@TypeDiscriminator("doc.type === 'PillRegimen'")
public class PillRegimen extends MotechBaseDataObject {
    private String externalId;
    private DailyScheduleDetails scheduleDetails;
    private Set<Dosage> dosages;

    public PillRegimen() {
    }

    public PillRegimen(String externalId, Set<Dosage> dosages, DailyScheduleDetails scheduleDetails) {
        this.externalId = externalId;
        this.dosages = dosages;
        this.scheduleDetails = scheduleDetails;
    }

    public String getExternalId() {
        return externalId;
    }

    public void setExternalId(String externalId) {
        this.externalId = externalId;
    }

    public Set<Dosage> getDosages() {
        return dosages;
    }

    public void setDosages(Set<Dosage> dosages) {
        this.dosages = dosages;
    }

    public DailyScheduleDetails getScheduleDetails() {
        return scheduleDetails;
    }

    public void setScheduleDetails(DailyScheduleDetails scheduleDetails) {
        this.scheduleDetails = scheduleDetails;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void validate() {
        for (Dosage dosage : dosages) {
            dosage.validate();
        }
    }

    public Dosage getDosage(String dosageId) {
        for (Dosage dosage : dosages)
            if (dosage.getId().equals(dosageId)) return dosage;
        return null;
    }

    public boolean isFirstReminderFor(Dosage dosage) {
        return numberOfTimesPillRemindersSentFor(dosage) == 0;
    }

    private int getOffsetOfCurrentTimeFromDosageStartTime(Time dosageStartTime, DateTime now) {
        int hourDiff = now.getHourOfDay() - dosageStartTime.getHour();
        if (hourDiff < 0) hourDiff += 24;
        return hourDiff * 60 + now.getMinuteOfHour() - dosageStartTime.getMinute();
    }

    public int numberOfTimesPillRemindersSentFor(Dosage dosage) {
        DailyScheduleDetails scheduleDetails = getScheduleDetails();
        Time dosageStartTime = dosage.getDosageTime();
        int minsSinceDosage = Math.min(getOffsetOfCurrentTimeFromDosageStartTime(dosageStartTime, DateUtil.now()), scheduleDetails.getPillWindowInHours() * 60);
        return (minsSinceDosage / scheduleDetails.getRepeatIntervalInMinutes());
    }

    public int timesPillRemainderWillBeSent() {
        DailyScheduleDetails scheduleDetails = getScheduleDetails();
        return (scheduleDetails.getPillWindowInHours() * 60) / scheduleDetails.getRepeatIntervalInMinutes();
    }
}