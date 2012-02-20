package org.motechproject.server.pillreminder.domain;

import org.joda.time.LocalDate;
import org.junit.Test;
import org.motechproject.util.DateUtil;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class MedicineTest {

    @Test
    public void shouldTestEquality() {
        LocalDate startDate = DateUtil.today();
        LocalDate endDate = startDate.plusDays(2);
        Medicine medicine = new Medicine("m1", startDate, endDate);

        assertFalse(medicine.equals(null));
        assertFalse(medicine.equals(""));
        assertFalse(medicine.equals(new Medicine()));
        assertFalse(medicine.equals(new Medicine("m2", startDate, endDate)));

        assertTrue(medicine.equals(medicine));
        assertTrue(medicine.equals(new Medicine("m1", startDate, endDate)));

        //Important case: medicine objects are same if they have the same names
        assertTrue(medicine.equals(new Medicine("m1", startDate, startDate.plusDays(5))));
    }

    @Test(expected = ValidationException.class)
    public void shouldValidateMedicineEndDateToBeLaterThanStartDate() {
        LocalDate startDate = DateUtil.today();
        LocalDate endDate = startDate.minusDays(12);
        Medicine medicine = new Medicine("medicine", startDate, endDate);

        medicine.validate();
    }
}
