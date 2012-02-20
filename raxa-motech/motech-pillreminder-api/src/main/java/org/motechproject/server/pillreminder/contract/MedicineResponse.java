package org.motechproject.server.pillreminder.contract;

import org.joda.time.LocalDate;

public class MedicineResponse {
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;

    public MedicineResponse(String name, LocalDate startDate, LocalDate endDate) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getName() {
        return name;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }
}
