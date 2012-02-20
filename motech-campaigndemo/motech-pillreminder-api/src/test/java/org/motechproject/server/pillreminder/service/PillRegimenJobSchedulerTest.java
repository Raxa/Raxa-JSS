package org.motechproject.server.pillreminder.service;

import org.drools.lang.DRLParser.when_part_return;
import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.internal.exceptions.util.ScenarioPrinter;
import org.motechproject.model.CronSchedulableJob;
import org.motechproject.model.Time;
import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.server.pillreminder.EventKeys;
import org.motechproject.server.pillreminder.ReminderEventHandler;
import org.motechproject.server.pillreminder.domain.DailyScheduleDetails;
import org.motechproject.server.pillreminder.domain.Dosage;
import org.motechproject.server.pillreminder.domain.Medicine;
import org.motechproject.server.pillreminder.domain.PillRegimen;
import org.motechproject.util.DateUtil;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.quartz.SchedulerException;

import java.util.Date;
import java.util.HashSet;

import static junit.framework.Assert.assertEquals;
import static org.junit.Assert.*;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(PowerMockRunner.class)
@PrepareForTest(DateUtil.class)
public class PillRegimenJobSchedulerTest {

    private PillRegimen pillRegimen;

    @Mock
    private MotechSchedulerService schedulerService;

    private PillRegimenJobScheduler jobScheduler;
    private String pillRegimenId;
    private String externalId;
    private HashSet<Dosage> dosages;

    @Before
    public void setUp() {
        initMocks(this);

        pillRegimenId = "pillRegimenId";
        externalId = "externalId";

        final HashSet<Medicine> medicines = new HashSet<Medicine>() {{
            add(new Medicine("med1", DateUtil.today(), null));
        }};

        dosages = new HashSet<Dosage>() {{
            final Dosage dosage1 = new Dosage(new Time(10, 5), medicines);
            dosage1.setId("dosage1");
            final Dosage dosage2 = new Dosage(new Time(20, 5), medicines);
            dosage2.setId("dosage2");
            add(dosage1);
            add(dosage2);
        }};


        jobScheduler = new PillRegimenJobScheduler(schedulerService);
    }

    @Test
    public void shouldScheduleDailyJob() {
        pillRegimen = new PillRegimen(externalId, dosages, new DailyScheduleDetails(15, 2));
        pillRegimen.setId(pillRegimenId);
        jobScheduler.scheduleDailyJob(pillRegimen);
        verify(schedulerService, times(2)).safeScheduleJob(any(CronSchedulableJob.class));
    }

    @Test
    public void shouldUnscheduleJob() {
        pillRegimen = new PillRegimen(externalId, dosages, new DailyScheduleDetails(15, 2));
        pillRegimen.setId(pillRegimenId);
        jobScheduler.unscheduleJobs(pillRegimen);
        verify(schedulerService, times(1)).safeUnscheduleJob(EventKeys.PILLREMINDER_REMINDER_EVENT_SUBJECT_SCHEDULER, "dosage1");
        verify(schedulerService, times(1)).safeUnscheduleRepeatingJob(EventKeys.PILLREMINDER_REMINDER_EVENT_SUBJECT_SCHEDULER, "dosage1");
        verify(schedulerService, times(1)).safeUnscheduleJob(EventKeys.PILLREMINDER_REMINDER_EVENT_SUBJECT_SCHEDULER, "dosage2");
        verify(schedulerService, times(1)).safeUnscheduleRepeatingJob(EventKeys.PILLREMINDER_REMINDER_EVENT_SUBJECT_SCHEDULER, "dosage2");
    }

    @Test
    public void shouldSetUpCorrectCronExpressionForDailyJob() {
        final LocalDate today = DateUtil.today();
        pillRegimen = new PillRegimen(externalId, dosages, new DailyScheduleDetails(15, 2));
        pillRegimen.setId(pillRegimenId);
        final HashSet<Medicine> medicines = new HashSet<Medicine>() {{
            add(new Medicine("med1", today.minusDays(1), null));
        }};
        final Dosage dosage1 = new Dosage(new Time(10, 5), medicines);

        jobScheduler = new PillRegimenJobScheduler(schedulerService) {
            @Override
            public CronSchedulableJob getSchedulableDailyJob(String pillRegimenId, String externalId, Dosage dosage) {
                return super.getSchedulableDailyJob(pillRegimenId, externalId, dosage);
            }
        };
        

        final CronSchedulableJob schedulableJob = jobScheduler.getSchedulableDailyJob(pillRegimenId, externalId, dosage1);
        assertEquals(String.format("0 %d %d * * ?", 5, 10), schedulableJob.getCronExpression()) ;
        assertEquals(EventKeys.PILLREMINDER_REMINDER_EVENT_SUBJECT_SCHEDULER, schedulableJob.getMotechEvent().getSubject()) ;
        assertTrue(schedulableJob.getStartTime().getTime() > today.minusDays(1).toDate().getTime());
    }
}


