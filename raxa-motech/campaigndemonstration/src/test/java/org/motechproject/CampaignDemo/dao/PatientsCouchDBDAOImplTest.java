package org.motechproject.CampaignDemo.dao;

import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.ektorp.CouchDbConnector;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.motechproject.CampaignDemo.model.Patient;


public class PatientsCouchDBDAOImplTest {
    @Mock
    CouchDbConnector couchDbConnector;

    @InjectMocks
    PatientsCouchDBDAOImpl patientDAO;

    @Before
    public void setUp() {
        couchDbConnector = mock(CouchDbConnector.class);
        patientDAO = new PatientsCouchDBDAOImpl(couchDbConnector);
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAddPatient() {
        Patient patient= new Patient("123", "456");
        
        patientDAO.addPatient(patient);
        
        verify(couchDbConnector).create(patient);
    }

    @Test
    public void testUpdatePatient() {
        Patient patient = new Patient("123", "456");

        patientDAO.updatePatient(patient);

        verify(couchDbConnector).update(patient);
    }

    @Test
    public void testRemoveAppointment() {
        Patient patient = new Patient("123", "456");

        patientDAO.removePatient(patient);

        verify(couchDbConnector).delete(patient);
    }

    @Test
    public void testRemoveAppointmentById() {
    	
    	List<Patient> patientList = new ArrayList<Patient>();
    	
    	Patient patient = new Patient("123", "456");
    	
    	patientList.add(patient);
    	
        when(patientDAO.findByExternalid("123")).thenReturn(patientList);
        
        patientDAO.removePatient(patient.getExternalid());

        verify(couchDbConnector).delete(patientList.get(0));
    }

    @Test
    public void testFindByExternalId() {
        List<Patient> list = patientDAO.findByExternalid("123");

        assertTrue(list.isEmpty());
    }
}
