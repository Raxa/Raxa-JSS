package org.motechproject.server.pillreminder.builder;

import org.motechproject.server.pillreminder.contract.DosageResponse;
import org.motechproject.server.pillreminder.contract.MedicineResponse;
import org.motechproject.server.pillreminder.domain.Dosage;
import org.motechproject.server.pillreminder.domain.Medicine;

import java.util.ArrayList;
import java.util.List;

public class DosageResponseBuilder {

    private MedicineResponseBuilder medicineResponseBuilder = new MedicineResponseBuilder();

    public DosageResponse createFrom(Dosage dosage) {
        List<MedicineResponse> medicines = new ArrayList<MedicineResponse>();
        for (Medicine medicine : dosage.getMedicines()) {
            medicines.add(medicineResponseBuilder.createFrom(medicine));
        }
        return new DosageResponse(dosage.getId(), dosage.getDosageTime(), dosage.getStartDate(), dosage.getEndDate(), dosage.getResponseLastCapturedDate(), medicines);
    }
}
