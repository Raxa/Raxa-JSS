package org.motechproject.server.pillreminder.domain;

import org.joda.time.LocalDate;

public class Medicine {
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;

    public static final String MEDICINE_END_DATE_CANNOT_BE_BEFORE_START_DATE = "Medicine end-date cannot be before start-date";

    public Medicine() {
    }

    public Medicine(String name, LocalDate startDate, LocalDate endDate) {
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Medicine medicine = (Medicine) o;
        if (!name.equals(medicine.name)) return false;
        return true;
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public void validate() {
        if (getEndDate() != null && getStartDate().isAfter(getEndDate()))
             throw(new ValidationException(MEDICINE_END_DATE_CANNOT_BE_BEFORE_START_DATE));
    }
}
