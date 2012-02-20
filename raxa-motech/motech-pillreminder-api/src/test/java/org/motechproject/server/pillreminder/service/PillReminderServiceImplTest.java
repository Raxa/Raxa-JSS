package org.motechproject.server.pillreminder.service;

import org.joda.time.LocalDate;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentMatcher;
import org.mockito.Mock;
import org.motechproject.model.Time;
import org.motechproject.server.pillreminder.contract.DailyPillRegimenRequest;
import org.motechproject.server.pillreminder.contract.DosageRequest;
import org.motechproject.server.pillreminder.contract.MedicineRequest;
import org.motechproject.server.pillreminder.contract.PillRegimenResponse;
import org.motechproject.server.pillreminder.dao.AllPillRegimens;
import org.motechproject.server.pillreminder.domain.DailyScheduleDetails;
import org.motechproject.server.pillreminder.domain.Dosage;
import org.motechproject.server.pillreminder.domain.Medicine;
import org.motechproject.server.pillreminder.domain.PillRegimen;
import org.motechproject.util.DateUtil;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.argThat;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

public class PillReminderServiceImplTest {
    PillReminderServiceImpl service;
    @Mock
    private AllPillRegimens allPillRegimens;
    @Mock
    private PillRegimenJobScheduler pillRegimenJobScheduler;

    @Before
    public void setUp() {
        initMocks(this);
        service = new PillReminderServiceImpl(allPillRegimens, pillRegimenJobScheduler);
    }

    @Test
    public void shouldCreateAPillRegimenFromRequestAndPersist() {
        LocalDate startDate = DateUtil.today();
        LocalDate endDate = startDate.plusDays(2);
        String externalId = "123";

        MedicineRequest medicineRequest1 = new MedicineRequest("m1", startDate, endDate);
        MedicineRequest medicineRequest2 = new MedicineRequest("m2", startDate.plusDays(1), startDate.plusDays(4));
        List<MedicineRequest> medicineRequests = asList(medicineRequest1, medicineRequest2);

        DosageRequest dosageRequest = new DosageRequest(9, 5, medicineRequests);
        DailyPillRegimenRequest dailyPillRegimenRequest = new DailyPillRegimenRequest(externalId, 5, 20, asList(dosageRequest));

        service.createNew(dailyPillRegimenRequest);

        verify(allPillRegimens).addOrReplace(argThat(new PillRegimenArgumentMatcher()));
        verify(pillRegimenJobScheduler).scheduleDailyJob(argThat(new PillRegimenArgumentMatcher()));
    }

    @Test
    public void shouldRenewAPillRegimenFromRequest() {
        String externalId = "123";
        LocalDate startDate = DateUtil.today();
        LocalDate endDate = startDate.plusDays(2);

        MedicineRequest medicineRequest1 = new MedicineRequest("m1", startDate, endDate);
        MedicineRequest medicineRequest2 = new MedicineRequest("m2", startDate.plusDays(1), startDate.plusDays(4));
        List<MedicineRequest> medicineRequests = asList(medicineRequest1, medicineRequest2);

        DosageRequest dosageRequest = new DosageRequest(9, 5, medicineRequests);
        DailyPillRegimenRequest dailyPillRegimenRequest = new DailyPillRegimenRequest(externalId, 5, 20, asList(dosageRequest));
        Set<Dosage> dosages = new HashSet<Dosage>() {{
            final Dosage dosage = new Dosage(new Time(10, 30), null);
            dosage.setId("dosage");
            add(dosage);
        }};

        PillRegimen pillRegimen = new PillRegimen(externalId, dosages, new DailyScheduleDetails(20, 2));

        when(allPillRegimens.findByExternalId(externalId)).thenReturn(pillRegimen);

        service.renew(dailyPillRegimenRequest);

        verify(pillRegimenJobScheduler).unscheduleJobs(pillRegimen);
        verify(allPillRegimens).safeRemove(pillRegimen);
        verify(allPillRegimens).addOrReplace(argThat(new PillRegimenArgumentMatcher()));
        verify(pillRegimenJobScheduler).scheduleDailyJob(argThat(new PillRegimenArgumentMatcher()));
    }

    @Test
    public void shouldUnschedulePillReminderJobs() {
        String externalId = "123";
        LocalDate startDate = DateUtil.today();
        LocalDate endDate = startDate.plusDays(2);

        MedicineRequest medicineRequest1 = new MedicineRequest("m1", startDate, endDate);
        MedicineRequest medicineRequest2 = new MedicineRequest("m2", startDate.plusDays(1), startDate.plusDays(4));
        List<MedicineRequest> medicineRequests = asList(medicineRequest1, medicineRequest2);

        DosageRequest dosageRequest = new DosageRequest(9, 5, medicineRequests);
        DailyPillRegimenRequest dailyPillRegimenRequest = new DailyPillRegimenRequest(externalId, 5, 20, asList(dosageRequest));
        Set<Dosage> dosages = new HashSet<Dosage>() {{
            final Dosage dosage = new Dosage(new Time(10, 30), null);
            dosage.setId("dosage");
            add(dosage);
        }};

        PillRegimen pillRegimen = new PillRegimen(externalId, dosages, new DailyScheduleDetails(20, 2));

        when(allPillRegimens.findByExternalId(externalId)).thenReturn(pillRegimen);

        service.remove(externalId);

        verify(pillRegimenJobScheduler).unscheduleJobs(pillRegimen);
    }

    @Test
    public void shouldCallAllPillRegimensToUpdateDosageDate() {
        LocalDate today = DateUtil.today();
        service.dosageStatusKnown("pillRegimenId", "dosageId", today);
        verify(allPillRegimens).updateLastCapturedDate("pillRegimenId", "dosageId", today);
    }

    @Test
    public void shouldGetPillRegimenGivenAnExternalId() {
        String dosageId = "dosageId";
        String pillRegimenId = "pillRegimenId";
        String patientId = "patientId";

        Dosage dosage = new Dosage(new Time(20, 05), new HashSet<Medicine>());
        dosage.setId(dosageId);

        HashSet<Dosage> dosages = new HashSet<Dosage>();
        dosages.add(dosage);

        PillRegimen pillRegimen = new PillRegimen("patientId", dosages, new DailyScheduleDetails(15, 2));
        pillRegimen.setId(pillRegimenId);
        when(allPillRegimens.findByExternalId(patientId)).thenReturn(pillRegimen);

        PillRegimenResponse pillRegimenResponse = service.getPillRegimen(patientId);
        assertEquals(pillRegimenId, pillRegimenResponse.getPillRegimenId());
        assertEquals(dosageId, pillRegimenResponse.getDosages().get(0).getDosageId());
    }

    private class PillRegimenArgumentMatcher extends ArgumentMatcher<PillRegimen> {
        @Override
        public boolean matches(Object o) {
            PillRegimen pillRegimen = (PillRegimen) o;
            return pillRegimen.getExternalId().equals("123") && pillRegimen.getDosages().size() == 1;
        }
    }


}
