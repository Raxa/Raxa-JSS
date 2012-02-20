package org.motechproject.appointments.api;

import org.ektorp.CouchDbConnector;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.motechproject.appointments.api.dao.impl.VisitsCouchDBDAOImpl;
import org.motechproject.appointments.api.model.Visit;
import org.motechproject.event.EventRelay;
import org.motechproject.model.MotechEvent;

import java.util.List;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

public class VisitServiceTest
{
    @Mock
    EventRelay eventRelay;

    @Mock
    CouchDbConnector couchDbConnector;

    @Mock
    VisitsCouchDBDAOImpl visitsDAO;

    @InjectMocks
    VisitService visitService;

    @Before
    public void setUp() {
        couchDbConnector = mock(CouchDbConnector.class);
        visitsDAO = new VisitsCouchDBDAOImpl(couchDbConnector);

        visitService = new VisitService();
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddVisit() {
        Visit v = new Visit();
        v.setAppointmentId("aID");

        ArgumentCaptor<MotechEvent> argument = ArgumentCaptor.forClass(MotechEvent.class);

        visitService.addVisit(v);

        verify(visitsDAO).addVisit(v);
        verify(eventRelay).sendEventMessage(argument.capture());

        MotechEvent event = argument.getValue();

        assertTrue(EventKeys.VISIT_CREATED_SUBJECT.equals(event.getSubject()));
    }

    @Test
    public void testUpdateVisit() {
        Visit v = new Visit();
        v.setAppointmentId("aID");

        ArgumentCaptor<MotechEvent> argument = ArgumentCaptor.forClass(MotechEvent.class);

        visitService.updateVisit(v);

        verify(visitsDAO).updateVisit(v);
        verify(eventRelay).sendEventMessage(argument.capture());

        MotechEvent event = argument.getValue();

        assertTrue(EventKeys.VISIT_UPDATED_SUBJECT.equals(event.getSubject()));
    }

    @Test
    public void testRemoveVisit() {
        Visit v = new Visit();

        ArgumentCaptor<MotechEvent> argument = ArgumentCaptor.forClass(MotechEvent.class);

        visitService.removeVisit(v);

        verify(visitsDAO).removeVisit(v);
        verify(eventRelay).sendEventMessage(argument.capture());

        MotechEvent event = argument.getValue();

        assertTrue(EventKeys.VISIT_DELETED_SUBJECT.equals(event.getSubject()));
    }

    @Test
    public void testRemoveVisitById() {
        Visit v = new Visit();
        v.setId("rID");

        ArgumentCaptor<MotechEvent> argument = ArgumentCaptor.forClass(MotechEvent.class);
        when(visitsDAO.getVisit("rID")).thenReturn(v);

        visitService.removeVisit(v.getId());

        verify(visitsDAO).removeVisit(v);
        verify(eventRelay).sendEventMessage(argument.capture());

        MotechEvent event = argument.getValue();

        assertTrue(EventKeys.VISIT_DELETED_SUBJECT.equals(event.getSubject()));
    }

    @Test
    public void testFindByExternalId() {
        List<Visit> list = visitService.findByExternalId("eID");

        assertTrue(list.isEmpty());
    }

    @Test
    public void testFindByAppointmentId() {
        List<Visit> list = visitService.findByAppointmentId("aID");

        assertTrue(list.isEmpty());
    }
}
