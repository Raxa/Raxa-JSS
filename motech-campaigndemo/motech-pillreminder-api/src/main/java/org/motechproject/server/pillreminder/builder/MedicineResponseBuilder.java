package org.motechproject.server.pillreminder.builder;

import org.motechproject.server.pillreminder.contract.MedicineResponse;
import org.motechproject.server.pillreminder.domain.Medicine;

public class MedicineResponseBuilder {
    public MedicineResponse createFrom(Medicine medicine) {
        return new MedicineResponse(medicine.getName(), medicine.getStartDate(), medicine.getEndDate());
    }
}
