package org.motechproject.server.pillreminder.builder;

import org.motechproject.server.pillreminder.contract.MedicineRequest;
import org.motechproject.server.pillreminder.domain.Medicine;
public class MedicineBuilder {
    public Medicine createFrom(MedicineRequest medicineRequest) {
        return new Medicine(medicineRequest.getName(), medicineRequest.getStartDate(), medicineRequest.getEndDate());
    }
}
