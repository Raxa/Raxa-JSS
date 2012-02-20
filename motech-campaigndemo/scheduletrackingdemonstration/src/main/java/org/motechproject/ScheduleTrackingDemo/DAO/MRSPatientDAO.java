package org.motechproject.ScheduleTrackingDemo.DAO;

import org.motechproject.ScheduleTracking.model.Patient;
import org.motechproject.dao.BaseDao;

import java.util.List;

/**
 * DAO for adding, updating, removing, and accessing patients in CouchDB
 * Patients associate an external ID with a phone number in order for Voxeo IVR
 * calls to be placed for campaign messages
 * @author Russell Gillen
 */

public interface MRSPatientDAO extends BaseDao<Patient> {

    public void addPatient(Patient patient);
    public void updatePatient(Patient patient);
    public Patient getPatient(String externalid);
    public void removePatient(String externalid);
    public void removePatient (Patient patient);
    public List<Patient> findByExternalid (String externalid);
	public List<Patient> findAllPatients();

}
