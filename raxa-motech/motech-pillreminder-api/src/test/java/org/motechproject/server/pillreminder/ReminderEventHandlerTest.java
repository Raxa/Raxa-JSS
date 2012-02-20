package org.motechproject.server.pillreminder;


import org.joda.time.LocalTime;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.motechproject.gateway.OutboundEventGateway;
import org.motechproject.model.MotechEvent;
import org.motechproject.model.RepeatingSchedulableJob;
import org.motechproject.model.Time;
import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.server.pillreminder.builder.SchedulerPayloadBuilder;
import org.motechproject.server.pillreminder.builder.testbuilder.DosageBuilder;
import org.motechproject.server.pillreminder.builder.testbuilder.PillRegimenBuilder;
import org.motechproject.server.pillreminder.dao.AllPillRegimens;
import org.motechproject.server.pillreminder.domain.DailyScheduleDetails;
import org.motechproject.server.pillreminder.domain.Dosage;
import org.motechproject.server.pillreminder.domain.PillRegimen;
import org.motechproject.testing.utils.BaseUnitTest;
import org.motechproject.util.DateUtil;

import java.util.HashMap;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertNotNull;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

public class ReminderEventHandlerTest extends BaseUnitTest {
    @Mock
    OutboundEventGateway outboundEventGateway;
    @Mock
    AllPillRegimens allPillRegimens;
    @Mock
    MotechSchedulerService schedulerService;

    ReminderEventHandler pillReminderEventHandler;
    LocalTime reminderStartTime = new LocalTime(10, 25);
    int pillWindow = 1;
    int retryInterval = 10;


    @Before
    public void setUp() {
        initMocks(this);
        pillReminderEventHandler = new ReminderEventHandler(outboundEventGateway, allPillRegimens, schedulerService);
    }

    @Test
    public void shouldRaiseEventsForEachPillWindow() {
        int pillWindow = 1;
        String externalId = "externalId";
        String dosageId = "dosageId";
        int retryInterval = 10;

        Dosage dosage = buildDosageNotYetTaken(dosageId);
        PillRegimen pillRegimen = buildPillRegimen(externalId, pillWindow, dosage, retryInterval);

        when(allPillRegimens.findByExternalId(externalId)).thenReturn(pillRegimen);

        MotechEvent motechEvent = buildMotechEvent(externalId, dosageId);
        pillReminderEventHandler.handleEvent(motechEvent);

        verify(allPillRegimens, atLeastOnce()).findByExternalId(externalId);
        verify(outboundEventGateway, only()).sendEventMessage(Matchers.<MotechEvent>any());
    }

    @Test
    public void shouldRaiseEventWithInformationAboutTheNumberOfTimesItHasBeenRaisedIncludingCurrentEvent() {
        mockCurrentDate(dateTime(DateUtil.today(), reminderStartTime.plusMinutes(25)));
        String externalId = "externalId";
        String dosageId = "dosageId";
        ArgumentCaptor<MotechEvent> event = ArgumentCaptor.forClass(MotechEvent.class);

        Dosage dosage = buildDosageNotYetTaken(dosageId);
        PillRegimen pillRegimen = buildPillRegimen(externalId, pillWindow, dosage, retryInterval);
        when(allPillRegimens.findByExternalId(externalId)).thenReturn(pillRegimen);

        MotechEvent motechEvent = buildMotechEvent(externalId, dosageId);
        pillReminderEventHandler.handleEvent(motechEvent);

        verify(allPillRegimens, atLeastOnce()).findByExternalId(externalId);
        verify(outboundEventGateway, times(1)).sendEventMessage(event.capture());

        assertNotNull(event.getValue().getParameters());
        assertEquals(2, event.getValue().getParameters().get(EventKeys.PILLREMINDER_TIMES_SENT));
    }

    @Test
    public void shouldRaiseEventWithInformationAboutTheNumberOfTimesItWillBeRaisedForEveryPillWindow() {
        mockCurrentDate(dateTime(DateUtil.today(), reminderStartTime));
        String externalId = "externalId";
        String dosageId = "dosageId";
        ArgumentCaptor<MotechEvent> event = ArgumentCaptor.forClass(MotechEvent.class);

        Dosage dosage = buildDosageNotYetTaken(dosageId);
        PillRegimen pillRegimen = buildPillRegimen(externalId, pillWindow, dosage, retryInterval);

        when(allPillRegimens.findByExternalId(externalId)).thenReturn(pillRegimen);

        MotechEvent motechEvent = buildMotechEvent(externalId, dosageId);
        pillReminderEventHandler.handleEvent(motechEvent);

        verify(allPillRegimens, atLeastOnce()).findByExternalId(externalId);
        verify(outboundEventGateway, times(1)).sendEventMessage(event.capture());

        assertNotNull(event.getValue().getParameters());
        assertEquals(6, event.getValue().getParameters().get(EventKeys.PILLREMINDER_TOTAL_TIMES_TO_SEND));
    }

    @Test
    public void shouldRaiseEventWithInformationAboutTheRetryIntervalTime() {
        int pillWindow = 0;
        String externalId = "externalId";
        String dosageId = "dosageId";
        ArgumentCaptor<MotechEvent> event = ArgumentCaptor.forClass(MotechEvent.class);

        Dosage dosage = buildDosageNotYetTaken(dosageId);
        PillRegimen pillRegimen = buildPillRegimen(externalId, pillWindow, dosage, retryInterval);

        when(allPillRegimens.findByExternalId(externalId)).thenReturn(pillRegimen);

        MotechEvent motechEvent = buildMotechEvent(externalId, dosageId);
        pillReminderEventHandler.handleEvent(motechEvent);

        verify(allPillRegimens, atLeastOnce()).findByExternalId(externalId);
        verify(outboundEventGateway, times(1)).sendEventMessage(event.capture());

        assertNotNull(event.getValue().getParameters());
        assertEquals(retryInterval, event.getValue().getParameters().get(EventKeys.PILLREMINDER_RETRY_INTERVAL));
    }

    @Test
    public void shoulNotRaiseEventWhenDosageIsAlreadyTakenForCurrentPillWindow() {
        int pillWindow = 0;
        String externalId = "externalId";
        String dosageId = "dosageId";
        int retryInterval = 4;

        Dosage dosage = buildDosageTaken(dosageId);

        PillRegimen pillRegimen = buildPillRegimen(externalId, pillWindow, dosage, retryInterval);

        when(allPillRegimens.findByExternalId(externalId)).thenReturn(pillRegimen);

        MotechEvent motechEvent = buildMotechEvent(externalId, dosageId);
        pillReminderEventHandler.handleEvent(motechEvent);

        verify(allPillRegimens, atLeastOnce()).findByExternalId(externalId);
        verify(outboundEventGateway, never()).sendEventMessage(Matchers.<MotechEvent>any());
    }

    @Test
    public void shouldScheduleRepeatRemindersForFirstCall() {
        mockCurrentDate(dateTime(DateUtil.today(), reminderStartTime));
        String externalId = "externalId";
        String dosageId = "dosageId";

        Dosage dosage = buildDosageNotYetTaken(dosageId);

        PillRegimen pillRegimen = buildPillRegimen(externalId, pillWindow, dosage, retryInterval);

        when(allPillRegimens.findByExternalId(externalId)).thenReturn(pillRegimen);

        MotechEvent motechEvent = buildMotechEvent(externalId, dosageId);
        pillReminderEventHandler.handleEvent(motechEvent);

        ArgumentCaptor<RepeatingSchedulableJob> captor = ArgumentCaptor.forClass(RepeatingSchedulableJob.class);
        verify(schedulerService).safeScheduleRepeatingJob(captor.capture());

        assertEquals(10, captor.getValue().getStartTime().getHours());
        assertEquals(35, captor.getValue().getStartTime().getMinutes());
        assertEquals(dosage.getId(), captor.getValue().getMotechEvent().getParameters().get(MotechSchedulerService.JOB_ID_KEY));
    }

    @Test
    public void shouldNotScheduleRepeatRemindersForReminderCalls() {
        int pillWindow = 1;
        String externalId = "externalId";
        String dosageId = "dosageId";
        int retryInterval = 4;

        Dosage dosage = buildDosageNotYetTaken(dosageId);

        PillRegimen pillRegimen = buildPillRegimen(externalId, pillWindow, dosage, retryInterval);

        when(allPillRegimens.findByExternalId(externalId)).thenReturn(pillRegimen);

        MotechEvent motechEvent = buildMotechEvent(externalId, dosageId);

        pillReminderEventHandler.handleEvent(motechEvent);

        verify(schedulerService, never()).scheduleRepeatingJob(Matchers.<RepeatingSchedulableJob>any());
    }

    private MotechEvent buildMotechEvent(String externalId, String dosageId) {
        HashMap eventParams = new SchedulerPayloadBuilder().withDosageId(dosageId).withExternalId(externalId).payload();
        return new MotechEvent(EventKeys.PILLREMINDER_REMINDER_EVENT_SUBJECT, eventParams);
    }

    private Dosage buildDosageNotYetTaken(String dosageId) {
        return DosageBuilder.newDosage()
                .withDosageTime(new Time(reminderStartTime))
                .withResponseLastCapturedDate(DateUtil.today().minusDays(1))
                .withId(dosageId)
                .build();
    }

    private Dosage buildDosageTaken(String dosageId) {
        return DosageBuilder.newDosage()
                .withDosageTime(new Time(10, 25))
                .withResponseLastCapturedDate(DateUtil.today())
                .withId(dosageId)
                .build();
    }

    private PillRegimen buildPillRegimen(String externalId, int pillWindow, Dosage dosage, int retryInterval) {
        return PillRegimenBuilder.newPillRegimen()
                .withExternalId(externalId)
                .withScheduleDetails(new DailyScheduleDetails(retryInterval, pillWindow))
                .withSingleDosage(dosage)
                .build();
    }
}
