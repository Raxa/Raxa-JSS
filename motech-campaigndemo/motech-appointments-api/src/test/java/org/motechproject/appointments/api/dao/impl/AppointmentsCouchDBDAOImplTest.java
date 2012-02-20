package org.motechproject.appointments.api.dao.impl;

import org.ektorp.CouchDbConnector;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.motechproject.appointments.api.model.Appointment;
import org.motechproject.model.MotechEvent;

import java.util.List;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

public class AppointmentsCouchDBDAOImplTest
{
    @Mock
    CouchDbConnector couchDbConnector;

    @InjectMocks
    AppointmentsCouchDBDAOImpl appointmentsDAO;

    @Before
    public void setUp() {
        couchDbConnector = mock(CouchDbConnector.class);
        appointmentsDAO = new AppointmentsCouchDBDAOImpl(couchDbConnector);
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddAppointment() {
        Appointment a = new Appointment();

        ArgumentCaptor<MotechEvent> argument = ArgumentCaptor.forClass(MotechEvent.class);

        appointmentsDAO.addAppointment(a);

        verify(couchDbConnector).create(a);
    }

    @Test
    public void testUpdateAppointment() {
        Appointment a = new Appointment();

        appointmentsDAO.updateAppointment(a);

        verify(couchDbConnector).update(a);
    }

    @Test
    public void testRemoveAppointment() {
        Appointment a = new Appointment();

        appointmentsDAO.removeAppointment(a);

        verify(couchDbConnector).delete(a);
    }

    @Test
    public void testRemoveAppointmentById() {
        Appointment a = new Appointment();
        a.setId("aID");

        when(appointmentsDAO.getAppointment("aID")).thenReturn(a);

        appointmentsDAO.removeAppointment(a.getId());

        verify(couchDbConnector).delete(a);
    }

    @Test
    public void testFindByExternalId() {
        List<Appointment> list = appointmentsDAO.findByExternalId("eID");

        assertTrue(list.isEmpty());
    }
}
