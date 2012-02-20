package org.motechproject.server.pillreminder.contract;

import org.joda.time.LocalDate;
import org.motechproject.model.Time;

import java.util.List;

public class DosageResponse {
    private String dosageId;
    private int dosageHour;
    private int dosageMinute;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate responseLastCapturedDate;
    private List<MedicineResponse> medicines;

    public DosageResponse(String dosageId, Time dosageTime, LocalDate startDate, LocalDate endDate, LocalDate responseLastCapturedDate, List<MedicineResponse> medicines) {
        this.dosageId = dosageId;
        this.dosageHour = dosageTime.getHour();
        this.dosageMinute = dosageTime.getMinute();
        this.startDate = startDate;
        this.endDate = endDate;
        this.responseLastCapturedDate = responseLastCapturedDate;
        this.medicines = medicines;
    }

    public String getDosageId() {
        return dosageId;
    }

    public int getDosageHour() {
        return dosageHour;
    }

    public int getDosageMinute() {
        return dosageMinute;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public LocalDate getResponseLastCapturedDate() {
        return responseLastCapturedDate;
    }

    public List<MedicineResponse> getMedicines() {
        return medicines;
    }
}
