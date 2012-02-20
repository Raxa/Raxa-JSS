package org.motechproject.server.pillreminder.builder;

import org.joda.time.LocalDate;
import org.junit.Test;
import org.motechproject.model.Time;
import org.motechproject.server.pillreminder.contract.DosageRequest;
import org.motechproject.server.pillreminder.contract.MedicineRequest;
import org.motechproject.server.pillreminder.domain.Dosage;
import org.motechproject.server.pillreminder.domain.Medicine;
import org.motechproject.util.DateUtil;

import java.util.Arrays;

import static org.junit.Assert.assertEquals;

public class DosageBuilderTest {

    private DosageBuilder builder = new DosageBuilder();

    @Test
    public void shouldBuildADosageFromRequest() {
        LocalDate startDate = DateUtil.today();
        LocalDate endDate = startDate.plusDays(2);
        MedicineRequest medicineRequest = new MedicineRequest("m1", startDate, endDate);

        DosageRequest dosageRequest = new DosageRequest(9, 5, Arrays.asList(medicineRequest));

        Dosage dosage = builder.createFrom(dosageRequest);

        assertEquals(new Time(9, 5), dosage.getDosageTime());
        assertEquals(1, dosage.getMedicines().size());
        for (Medicine medicine : dosage.getMedicines()) {
            assertEquals("m1", medicine.getName());
            assertEquals(startDate, medicine.getStartDate());
            assertEquals(endDate, medicine.getEndDate());
        }
    }
}
