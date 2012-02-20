package org.motechproject.appointments.api;

import org.ektorp.CouchDbConnector;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.motechproject.appointments.api.dao.impl.AppointmentsCouchDBDAOImpl;
import org.motechproject.appointments.api.model.Appointment;
import org.motechproject.event.EventRelay;
import org.motechproject.model.MotechEvent;

import java.util.List;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

public class AppointmentServiceTest
{
    @Mock
    EventRelay eventRelay;

    @Mock
    CouchDbConnector couchDbConnector;

    @Mock
    AppointmentsCouchDBDAOImpl appointmentsDAO;

    @InjectMocks
    AppointmentService appointmentService;

    @Before
    public void setUp() {
        couchDbConnector = mock(CouchDbConnector.class);
        appointmentsDAO = new AppointmentsCouchDBDAOImpl(couchDbConnector);

        appointmentService = new AppointmentService();
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddAppointment() {
        Appointment a = new Appointment();

        ArgumentCaptor<MotechEvent> argument = ArgumentCaptor.forClass(MotechEvent.class);

        appointmentService.addAppointment(a);

        verify(appointmentsDAO).addAppointment(a);
        verify(eventRelay).sendEventMessage(argument.capture());

        MotechEvent event = argument.getValue();

        assertTrue(EventKeys.APPOINTMENT_CREATED_SUBJECT.equals(event.getSubject()));
    }

    @Test
    public void testUpdateAppointment() {
        Appointment a = new Appointment();

        ArgumentCaptor<MotechEvent> argument = ArgumentCaptor.forClass(MotechEvent.class);

        appointmentService.updateAppointment(a);

        verify(appointmentsDAO).updateAppointment(a);
        verify(eventRelay).sendEventMessage(argument.capture());

        MotechEvent event = argument.getValue();

        assertTrue(EventKeys.APPOINTMENT_UPDATED_SUBJECT.equals(event.getSubject()));
    }

    @Test
    public void testRemoveAppointment() {
        Appointment a = new Appointment();

        ArgumentCaptor<MotechEvent> argument = ArgumentCaptor.forClass(MotechEvent.class);

        appointmentService.removeAppointment(a);

        verify(appointmentsDAO).removeAppointment(a);
        verify(eventRelay).sendEventMessage(argument.capture());

        MotechEvent event = argument.getValue();

        assertTrue(EventKeys.APPOINTMENT_DELETED_SUBJECT.equals(event.getSubject()));
    }

    @Test
    public void testRemoveAppointmentById() {
        Appointment a = new Appointment();
        a.setId("aID");

        ArgumentCaptor<MotechEvent> argument = ArgumentCaptor.forClass(MotechEvent.class);
        when(appointmentsDAO.getAppointment("aID")).thenReturn(a);

        appointmentService.removeAppointment(a.getId());

        verify(appointmentsDAO).removeAppointment(a);
        verify(eventRelay).sendEventMessage(argument.capture());

        MotechEvent event = argument.getValue();

        assertTrue(EventKeys.APPOINTMENT_DELETED_SUBJECT.equals(event.getSubject()));
    }

    @Test
    public void testFindByExternalId() {
        List<Appointment> list = appointmentService.findByExternalId("eID");

        assertTrue(list.isEmpty());
    }
}
