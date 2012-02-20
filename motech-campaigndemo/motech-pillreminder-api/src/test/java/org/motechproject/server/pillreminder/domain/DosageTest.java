package org.motechproject.server.pillreminder.domain;

import org.joda.time.LocalDate;
import org.junit.Test;
import org.motechproject.model.Time;
import org.motechproject.util.DateUtil;

import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.*;

public class DosageTest {
    @Test
    public void shouldGetStartDateWhichIsTheEarliestStartDateOfItsMedicines() {
        Set<Medicine> medicines = new HashSet<Medicine>();
        medicines.add(new Medicine("medicine1", getDate(2010, 10, 10), getDate(2011, 10, 10)));
        medicines.add(new Medicine("medicine2", getDate(2010, 11, 11), getDate(2011, 11, 11)));
        Dosage dosage = new Dosage(new Time(9, 5), medicines);

        assertEquals(getDate(2010, 10, 10), dosage.getStartDate());
    }

    @Test
    public void shouldGetEndDateWhichIsTheLatestEndDateOfItsMedicines() {
        Set<Medicine> medicines = new HashSet<Medicine>();
        medicines.add(new Medicine("medicine1", getDate(2010, 10, 10), getDate(2011, 10, 10)));
        medicines.add(new Medicine("medicine2", getDate(2010, 11, 11), getDate(2011, 11, 11)));
        Dosage dosage = new Dosage(new Time(9, 5), medicines);

        assertEquals(getDate(2011, 11, 11), dosage.getEndDate());
    }

    @Test
    public void shouldGetNullEndDateIfAllTheMedicinesHaveNullEndDates(){
        Set<Medicine> medicines = new HashSet<Medicine>();
        medicines.add(new Medicine("medicine1", getDate(2010, 10, 10), null));
        medicines.add(new Medicine("medicine2", getDate(2010, 11, 11), null));
        Dosage dosage = new Dosage(new Time(9, 5), medicines);

        assertNull(dosage.getEndDate());
    }

    @Test
    public void isDosageCapturedForToday(){
        Dosage dosage = new Dosage(new Time(9, 5), new HashSet<Medicine>());

        assertFalse(dosage.isTodaysDosageResponseCaptured());

        dosage.setResponseLastCapturedDate(DateUtil.today());
        assertTrue(dosage.isTodaysDosageResponseCaptured());
    }

    @Test
    public void isDosageCapturedForTodayIsFalse_WhenCapturedForYesterday(){
        Dosage dosage = new Dosage(new Time(9, 5), new HashSet<Medicine>());

        dosage.setResponseLastCapturedDate(DateUtil.today().minusDays(1));
        assertFalse(dosage.isTodaysDosageResponseCaptured());
    }

    @Test
    public void shouldUpdateDosageLastCapturedDate_WhenNewLastCapturedDateIsLaterThanKnownLastCapturedDate() {
        Dosage dosage = new Dosage(new Time(9, 5), new HashSet<Medicine>());

        assertFalse(dosage.isTodaysDosageResponseCaptured());

        dosage.updateResponseLastCapturedDate(DateUtil.today());
        assertTrue(dosage.isTodaysDosageResponseCaptured());
    }

    @Test
    public void shouldNotUpdateDosageLastCapturedDate_WhenNewLastCapturedDateIsEarlierThanKnownLastCapturedDate() {
        Dosage dosage = new Dosage(new Time(9, 5), new HashSet<Medicine>());

        dosage.updateResponseLastCapturedDate(DateUtil.today());
        assertTrue(dosage.isTodaysDosageResponseCaptured());

        dosage.updateResponseLastCapturedDate(DateUtil.today().minusDays(1));
        assertTrue(dosage.isTodaysDosageResponseCaptured());

    }

    @Test
    public void shouldGetEndDateWhichIsTheLatestEndDateOfItsMedicinesWhenSomeMedicinesHaveNullEndDates(){
        Set<Medicine> medicines = new HashSet<Medicine>();
        medicines.add(new Medicine("medicine1", getDate(2010, 10, 10), getDate(2011, 10, 10)));
        medicines.add(new Medicine("medicine2", getDate(2010, 11, 11), getDate(2011, 11, 11)));
        medicines.add(new Medicine("medicine2", getDate(2010, 11, 11), null));
        medicines.add(new Medicine("medicine2", getDate(2010, 11, 11), null));
        Dosage dosage = new Dosage(new Time(9, 5), medicines);

        assertEquals(getDate(2011, 11, 11), dosage.getEndDate());
    }

    private LocalDate getDate(Integer year, Integer month, Integer day) {
        return DateUtil.newDate(year, month, day);
    }
}
