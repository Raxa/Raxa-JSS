package org.motechproject.scheduletracking.api.domain;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;

import java.io.Serializable;

public class MilestoneFulfillment implements Serializable {
    private String milestoneName;
    private DateTime dateFulfilled;

    private MilestoneFulfillment() {
    }

    public MilestoneFulfillment(String milestoneName, DateTime dateFulfilled) {
        this.milestoneName = milestoneName;
        this.dateFulfilled = dateFulfilled;
    }

    public DateTime getDateFulfilled() {
        return dateFulfilled;
    }

    public void setDateFulfilled(DateTime dateFulfilled) {
        this.dateFulfilled = dateFulfilled;
    }

    public String getMilestoneName() {
        return milestoneName;
    }

    public void setMilestoneName(String milestoneName) {
        this.milestoneName = milestoneName;
    }
}
