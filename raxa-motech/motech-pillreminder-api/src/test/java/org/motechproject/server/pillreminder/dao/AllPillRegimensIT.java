package org.motechproject.server.pillreminder.dao;

import org.joda.time.LocalDate;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.motechproject.model.Time;
import org.motechproject.server.pillreminder.domain.DailyScheduleDetails;
import org.motechproject.server.pillreminder.domain.Dosage;
import org.motechproject.server.pillreminder.domain.Medicine;
import org.motechproject.server.pillreminder.domain.PillRegimen;
import org.motechproject.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.HashSet;
import java.util.Set;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/testPillReminderAPIApplicationContext.xml"})
public class AllPillRegimensIT {
    @Autowired
    private AllPillRegimens allPillRegimens;

    private LocalDate startDate;
    private LocalDate endDate;

    @Before
    public void setUp() {
        startDate = DateUtil.newDate(2011, 1, 1);
        endDate = DateUtil.newDate(2011, 3, 1);
    }

    @Test
    public void shouldSaveThePillRegimenWithoutDosage() {
        PillRegimen pillRegimen = new PillRegimen("1234", null, new DailyScheduleDetails(20, 5));

        allPillRegimens.add(pillRegimen);

        assertNotNull(pillRegimen.getId());
        allPillRegimens.remove(pillRegimen);
    }

    @Test
    public void shouldSaveThePillRegimenWithDosages() {
        PillRegimen pillRegimen = setUpPillRegimen();
        allPillRegimens.add(pillRegimen);
        assertNotNull(pillRegimen.getId());

        PillRegimen pillRegimenFromDB = allPillRegimens.get(pillRegimen.getId());
        DailyScheduleDetails scheduleDetailsFromDB = pillRegimenFromDB.getScheduleDetails();
        assertEquals(5, scheduleDetailsFromDB.getPillWindowInHours());
        assertEquals(20, scheduleDetailsFromDB.getRepeatIntervalInMinutes());

        Object[] dosagesFromDB = pillRegimenFromDB.getDosages().toArray();
        assertEquals(1, dosagesFromDB.length);

        Set<Medicine> medicinesFromDB = ((Dosage) dosagesFromDB[0]).getMedicines();
        assertEquals(2, medicinesFromDB.toArray().length);

        allPillRegimens.remove(pillRegimen);
    }

    @Test
    public void shouldGetPillRegimenByExternalId() {
        PillRegimen pillRegimen = new PillRegimen("1234", null, new DailyScheduleDetails(20, 5));
        allPillRegimens.add(pillRegimen);
        PillRegimen returnedRegimen = allPillRegimens.findByExternalId("1234");
        assertNotNull(returnedRegimen);
        assertEquals(returnedRegimen.getExternalId(), "1234");
    }

    @Test
    public void addOrReplace() {
        String externalId = "1234";
        allPillRegimens.removeAll("externalId", externalId);
        PillRegimen pillRegimen = new PillRegimen(externalId, null, new DailyScheduleDetails(20, 5));
        allPillRegimens.add(pillRegimen);
        allPillRegimens.addOrReplace(pillRegimen);
    }

    @Test
    public void shouldFindAndUpdateDosageCurrentDate() {
        PillRegimen pillRegimen = setUpPillRegimen();
        Dosage[] dosages =  pillRegimen.getDosages().toArray(new Dosage[0]);
        String dosageId = dosages[0].getId();

        allPillRegimens.add(pillRegimen);
        String regimenId = pillRegimen.getId();

        allPillRegimens.updateLastCapturedDate(regimenId, dosageId, DateUtil.today());

        PillRegimen dbRegimen = allPillRegimens.get(regimenId);
        Dosage dbDosage = dbRegimen.getDosage(dosageId);
        assertEquals(DateUtil.today(), dbDosage.getResponseLastCapturedDate());
    }

    private PillRegimen setUpPillRegimen() {
        Medicine medicine = new Medicine("m1", startDate, endDate);
        Medicine medicine2 = new Medicine("m2", startDate, startDate.plusMonths(3));
        Set<Medicine> medicines = new HashSet<Medicine>();
        medicines.add(medicine);
        medicines.add(medicine2);

        Dosage dosage = new Dosage(new Time(9, 5), medicines);
        Set<Dosage> dosages = new HashSet<Dosage>();
        dosages.add(dosage);
        return new PillRegimen("1234", dosages, new DailyScheduleDetails(20, 5));
    }
}
