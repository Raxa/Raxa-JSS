package org.motechproject.server.pillreminder.service;

import org.motechproject.model.CronSchedulableJob;
import org.motechproject.model.MotechEvent;
import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.scheduler.builder.CronJobSimpleExpressionBuilder;
import org.motechproject.server.pillreminder.EventKeys;
import org.motechproject.server.pillreminder.ReminderEventHandler;
import org.motechproject.server.pillreminder.builder.SchedulerPayloadBuilder;
import org.motechproject.server.pillreminder.domain.Dosage;
import org.motechproject.server.pillreminder.domain.PillRegimen;
import org.motechproject.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

@Component
public class PillRegimenJobScheduler {
    private MotechSchedulerService schedulerService;

    @Autowired
    public PillRegimenJobScheduler(MotechSchedulerService schedulerService) {
        this.schedulerService = schedulerService;
    }

    public void scheduleDailyJob(PillRegimen pillRegimen) {
        for (Dosage dosage : pillRegimen.getDosages()) {
            CronSchedulableJob schedulableJob = getSchedulableDailyJob(pillRegimen.getId(), pillRegimen.getExternalId(), dosage);
            schedulerService.safeScheduleJob(schedulableJob);
        }
    }

    public void unscheduleJobs(PillRegimen regimen) {
        for (Dosage dosage : regimen.getDosages()) {
            schedulerService.safeUnscheduleJob(EventKeys.PILLREMINDER_REMINDER_EVENT_SUBJECT_SCHEDULER, dosage.getId());
            schedulerService.safeUnscheduleRepeatingJob(EventKeys.PILLREMINDER_REMINDER_EVENT_SUBJECT_SCHEDULER, dosage.getId());
        }
    }

    protected CronSchedulableJob getSchedulableDailyJob(String pillRegimenId, String externalId, Dosage dosage) {
        Map<String, Object> eventParams = new SchedulerPayloadBuilder()
                .withJobId(dosage.getId())
                .withDosageId(dosage.getId())
                .withExternalId(externalId)
                .payload();

        MotechEvent motechEvent = new MotechEvent(EventKeys.PILLREMINDER_REMINDER_EVENT_SUBJECT_SCHEDULER, eventParams);
        String cronJobExpression = new CronJobSimpleExpressionBuilder(dosage.getDosageTime()).build();
        Date endDate = dosage.getEndDate() == null ? null : dosage.getEndDate().toDate();
        Date startDate = DateUtil.newDateTime(dosage.getStartDate().toDate()).isBefore(DateUtil.now()) ? DateUtil.now().toDate() : dosage.getStartDate().toDate();
        return new CronSchedulableJob(motechEvent, cronJobExpression, startDate, endDate);
    }
}