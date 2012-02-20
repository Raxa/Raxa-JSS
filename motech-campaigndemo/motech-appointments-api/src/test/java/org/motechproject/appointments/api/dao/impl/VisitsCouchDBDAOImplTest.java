package org.motechproject.appointments.api.dao.impl;

import org.ektorp.CouchDbConnector;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.motechproject.appointments.api.model.Visit;

import java.util.List;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;

public class VisitsCouchDBDAOImplTest
{
    @Mock
    CouchDbConnector couchDbConnector;

    @InjectMocks
    VisitsCouchDBDAOImpl visitsDAO;

    @Before
    public void setUp() {
        couchDbConnector = mock(CouchDbConnector.class);
        visitsDAO = new VisitsCouchDBDAOImpl(couchDbConnector);
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddVisit() {
        Visit v = new Visit();
        v.setAppointmentId("aID");

        visitsDAO.addVisit(v);

        verify(couchDbConnector).create(v);
    }

    @Test
    public void testUpdateVisit() {
        Visit v = new Visit();
        v.setAppointmentId("aID");

        visitsDAO.updateVisit(v);

        verify(couchDbConnector).update(v);
    }

    @Test
    public void testRemoveVisit() {
        Visit v = new Visit();

        visitsDAO.removeVisit(v);

        verify(couchDbConnector).delete(v);
    }

    @Test
    public void testRemoveVisitById() {
        Visit v = new Visit();
        v.setId("rID");

        when(visitsDAO.getVisit("rID")).thenReturn(v);

        visitsDAO.removeVisit(v.getId());

        verify(couchDbConnector).delete(v);
    }

    @Test
    public void testFindByExternalId() {
        List<Visit> list = visitsDAO.findByExternalId("eID");

        assertTrue(list.isEmpty());
    }

    @Test
    public void testFindByAppointmentId() {
        List<Visit> list = visitsDAO.findByAppointmentId("aID");

        assertTrue(list.isEmpty());
    }
}
