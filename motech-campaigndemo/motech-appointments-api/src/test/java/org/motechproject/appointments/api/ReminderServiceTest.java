package org.motechproject.appointments.api;

import org.ektorp.CouchDbConnector;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.motechproject.appointments.api.dao.impl.RemindersCouchDBDAOImpl;
import org.motechproject.appointments.api.model.Reminder;
import org.motechproject.event.EventRelay;
import org.motechproject.model.MotechEvent;

import java.util.List;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

public class ReminderServiceTest
{
    @Mock
    EventRelay eventRelay;

    @Mock
    CouchDbConnector couchDbConnector;

    @Mock
    RemindersCouchDBDAOImpl remindersDAO;

    @InjectMocks
    ReminderService reminderService;

    @Before
    public void setUp() {
        couchDbConnector = mock(CouchDbConnector.class);
        remindersDAO = new RemindersCouchDBDAOImpl(couchDbConnector);

        reminderService = new ReminderService();
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddReminder() {
        Reminder r = new Reminder();
        r.setAppointmentId("aID");

        ArgumentCaptor<MotechEvent> argument = ArgumentCaptor.forClass(MotechEvent.class);

        reminderService.addReminder(r);

        verify(remindersDAO).addReminder(r);
        verify(eventRelay).sendEventMessage(argument.capture());

        MotechEvent event = argument.getValue();

        assertTrue(EventKeys.REMINDER_CREATED_SUBJECT.equals(event.getSubject()));
    }

    @Test(expected = IllegalArgumentException.class)
    public void testAddReminder_NoAptId() {
        Reminder r = new Reminder();

        reminderService.addReminder(r);
    }

    @Test
    public void testUpdateReminder() {
        Reminder r = new Reminder();
        r.setAppointmentId("aID");

        ArgumentCaptor<MotechEvent> argument = ArgumentCaptor.forClass(MotechEvent.class);

        reminderService.updateReminder(r);

        verify(remindersDAO).updateReminder(r);
        verify(eventRelay).sendEventMessage(argument.capture());

        MotechEvent event = argument.getValue();

        assertTrue(EventKeys.REMINDER_UPDATED_SUBJECT.equals(event.getSubject()));
    }

    @Test(expected = IllegalArgumentException.class)
    public void testUpdateReminder_NoAptId() {
        Reminder r = new Reminder();

        reminderService.updateReminder(r);
    }

    @Test
    public void testRemoveReminder() {
        Reminder r = new Reminder();

        ArgumentCaptor<MotechEvent> argument = ArgumentCaptor.forClass(MotechEvent.class);

        reminderService.removeReminder(r);

        verify(remindersDAO).removeReminder(r);
        verify(eventRelay).sendEventMessage(argument.capture());

        MotechEvent event = argument.getValue();

        assertTrue(EventKeys.REMINDER_DELETED_SUBJECT.equals(event.getSubject()));
    }

    @Test
    public void testRemoveReminderById() {
        Reminder r = new Reminder();
        r.setId("rID");

        ArgumentCaptor<MotechEvent> argument = ArgumentCaptor.forClass(MotechEvent.class);
        when(remindersDAO.getReminder("rID")).thenReturn(r);

        reminderService.removeReminder(r.getId());

        verify(remindersDAO).removeReminder(r);
        verify(eventRelay).sendEventMessage(argument.capture());

        MotechEvent event = argument.getValue();

        assertTrue(EventKeys.REMINDER_DELETED_SUBJECT.equals(event.getSubject()));
    }

    @Test
    public void testFindByExternalId() {
        List<Reminder> list = reminderService.findByExternalId("eID");

        assertTrue(list.isEmpty());
    }

    @Test
    public void testFindByAppointmentId() {
        List<Reminder> list = reminderService.findByAppointmentId("aID");

        assertTrue(list.isEmpty());
    }
}
