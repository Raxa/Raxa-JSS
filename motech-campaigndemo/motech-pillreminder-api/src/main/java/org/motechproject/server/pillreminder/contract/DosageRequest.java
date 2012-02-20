package org.motechproject.server.pillreminder.contract;

import java.util.List;

public class DosageRequest {
    private int startHour;
    private int startMinute;
    private List<MedicineRequest> medicineRequests;

    public DosageRequest(int startHour, int startMinute, List<MedicineRequest> medicineRequests) {
        this.startHour = startHour;
        this.startMinute = startMinute;
        this.medicineRequests = medicineRequests;
    }

    public List<MedicineRequest> getMedicineRequests() {
        return medicineRequests;
    }

    public int getStartMinute() {
        return startMinute;
    }

    public int getStartHour() {
        return startHour;
    }
}
