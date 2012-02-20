package org.motechproject.server.pillreminder;

import org.joda.time.DateTime;
import org.motechproject.MotechObject;
import org.motechproject.gateway.OutboundEventGateway;
import org.motechproject.model.MotechEvent;
import org.motechproject.model.RepeatingSchedulableJob;
import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.server.event.annotations.MotechListener;
import org.motechproject.server.pillreminder.dao.AllPillRegimens;
import org.motechproject.server.pillreminder.domain.DailyScheduleDetails;
import org.motechproject.server.pillreminder.domain.Dosage;
import org.motechproject.server.pillreminder.domain.PillRegimen;
import org.motechproject.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

@Component
public class ReminderEventHandler extends MotechObject {
    private OutboundEventGateway outboundEventGateway;
    private AllPillRegimens allPillRegimens;
    private MotechSchedulerService schedulerService;

    @Autowired
    public ReminderEventHandler(OutboundEventGateway outboundEventGateway, AllPillRegimens allPillRegimens, MotechSchedulerService schedulerService) {
        this.outboundEventGateway = outboundEventGateway;
        this.allPillRegimens = allPillRegimens;
        this.schedulerService = schedulerService;
    }

    @MotechListener(subjects = {EventKeys.PILLREMINDER_REMINDER_EVENT_SUBJECT_SCHEDULER})
    public void handleEvent(MotechEvent motechEvent) {
        PillRegimen pillRegimen = getPillRegimen(motechEvent);
        Dosage dosage = getDosage(pillRegimen, motechEvent);

        if (!dosage.isTodaysDosageResponseCaptured()) {
            if (pillRegimen.isFirstReminderFor(dosage))
                scheduleRepeatReminders(motechEvent, pillRegimen, dosage);
            outboundEventGateway.sendEventMessage(createNewMotechEvent(dosage, pillRegimen, motechEvent, EventKeys.PILLREMINDER_REMINDER_EVENT_SUBJECT));
        }
    }

    private void scheduleRepeatReminders(MotechEvent motechEvent, PillRegimen pillRegimen, Dosage dosage) {
        DateTime dosageTime = dosage.todaysDosageTime();
        DailyScheduleDetails scheduleDetails = pillRegimen.getScheduleDetails();
        Date startTime = dosageTime.plusMinutes(scheduleDetails.getRepeatIntervalInMinutes()).toDate();
        Date endTime = dosageTime.plusHours(scheduleDetails.getPillWindowInHours()).plusMinutes(1).toDate();
        MotechEvent repeatingReminderEvent = createNewMotechEvent(dosage, pillRegimen, motechEvent, EventKeys.PILLREMINDER_REMINDER_EVENT_SUBJECT_SCHEDULER);

        repeatingReminderEvent.getParameters().put(MotechSchedulerService.JOB_ID_KEY, dosage.getId());
        RepeatingSchedulableJob retryRemindersJob = new RepeatingSchedulableJob(repeatingReminderEvent,
                startTime, endTime, scheduleDetails.getRepeatIntervalInMinutes() * 60 * 1000);
        schedulerService.safeScheduleRepeatingJob(retryRemindersJob);
    }

    private MotechEvent createNewMotechEvent(Dosage dosage, PillRegimen pillRegimen, MotechEvent eventRaisedByScheduler, String subject) {
        MotechEvent motechEvent = new MotechEvent(subject);
        Map<String, Object> eventParams = motechEvent.getParameters();
        eventParams.putAll(eventRaisedByScheduler.getParameters());
        eventParams.put(EventKeys.PILLREMINDER_TIMES_SENT, pillRegimen.numberOfTimesPillRemindersSentFor(dosage));
        eventParams.put(EventKeys.PILLREMINDER_TOTAL_TIMES_TO_SEND, pillRegimen.timesPillRemainderWillBeSent());
        eventParams.put(EventKeys.PILLREMINDER_RETRY_INTERVAL, pillRegimen.getScheduleDetails().getRepeatIntervalInMinutes());
        return motechEvent;
    }

    private PillRegimen getPillRegimen(MotechEvent motechEvent) {
        final String pillRegimenExternalId = (String) motechEvent.getParameters().get(EventKeys.EXTERNAL_ID_KEY);
        return allPillRegimens.findByExternalId(pillRegimenExternalId);
    }

    private Dosage getDosage(PillRegimen pillRegimen, MotechEvent motechEvent) {
        final String dosageId = (String) motechEvent.getParameters().get(EventKeys.DOSAGE_ID_KEY);
        return findDosage(dosageId, pillRegimen);
    }

    private Dosage findDosage(final String dosageId, PillRegimen pillRegimen) {
        for (Dosage dosage : pillRegimen.getDosages()) {
            if (dosage.getId().equals(dosageId)) return dosage;
        }
        return null;
    }
}
