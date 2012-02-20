package org.motechproject.appointments.api.dao.impl;

import org.ektorp.CouchDbConnector;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.motechproject.appointments.api.model.Reminder;

import java.util.List;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

public class RemindersCouchDBDAOImplTest
{
    @Mock
    CouchDbConnector couchDbConnector;

    @InjectMocks
    RemindersCouchDBDAOImpl remindersDAO;

    @Before
    public void setUp() {
        couchDbConnector = mock(CouchDbConnector.class);
        remindersDAO = new RemindersCouchDBDAOImpl(couchDbConnector);
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddReminder() {
        Reminder r = new Reminder();
        r.setAppointmentId("aID");

        remindersDAO.addReminder(r);

        verify(couchDbConnector).create(r);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testAddReminder_NoAptId() {
        Reminder r = new Reminder();

        remindersDAO.addReminder(r);
    }

    @Test
    public void testUpdateReminder() {
        Reminder r = new Reminder();
        r.setAppointmentId("aID");

        remindersDAO.updateReminder(r);

        verify(couchDbConnector).update(r);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testUpdateReminder_NoAptId() {
        Reminder r = new Reminder();

        remindersDAO.updateReminder(r);
    }

    @Test
    public void testRemoveReminder() {
        Reminder r = new Reminder();

        remindersDAO.removeReminder(r);

        verify(couchDbConnector).delete(r);
    }

    @Test
    public void testRemoveReminderById() {
        Reminder r = new Reminder();
        r.setId("rID");

        when(remindersDAO.getReminder("rID")).thenReturn(r);

        remindersDAO.removeReminder(r.getId());

        verify(couchDbConnector).delete(r);
    }

    @Test
    public void testFindByExternalId() {
        List<Reminder> list = remindersDAO.findByExternalId("eID");

        assertTrue(list.isEmpty());
    }

    @Test
    public void testFindByAppointmentId() {
        List<Reminder> list = remindersDAO.findByAppointmentId("aID");

        assertTrue(list.isEmpty());
    }
}
