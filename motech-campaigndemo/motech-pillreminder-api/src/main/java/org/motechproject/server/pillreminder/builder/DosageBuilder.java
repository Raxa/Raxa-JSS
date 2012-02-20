package org.motechproject.server.pillreminder.builder;

import org.motechproject.model.Time;
import org.motechproject.server.pillreminder.contract.DosageRequest;
import org.motechproject.server.pillreminder.contract.MedicineRequest;
import org.motechproject.server.pillreminder.domain.Dosage;
import org.motechproject.server.pillreminder.domain.Medicine;

import java.util.HashSet;
import java.util.Set;

public class DosageBuilder {

    public Dosage createFrom(DosageRequest dosageRequest) {
        Set<Medicine> medicines = new HashSet<Medicine>();
        Time dosageTime = new Time(dosageRequest.getStartHour(), dosageRequest.getStartMinute());
        for (MedicineRequest medicineRequest : dosageRequest.getMedicineRequests()) {
            medicines.add(new MedicineBuilder().createFrom(medicineRequest));
        }
        return new Dosage(dosageTime, medicines);
    }
}
