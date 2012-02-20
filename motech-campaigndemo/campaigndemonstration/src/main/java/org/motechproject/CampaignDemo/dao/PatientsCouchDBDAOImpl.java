package org.motechproject.CampaignDemo.dao;


import org.ektorp.CouchDbConnector;
import org.ektorp.support.GenerateView;
import org.ektorp.support.View;
import org.motechproject.CampaignDemo.model.Patient;
import org.motechproject.dao.MotechBaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;

/**
 * See platform documentation for couch set up
 * @author Russell
 *
 */
@Component
public class PatientsCouchDBDAOImpl extends MotechBaseRepository<Patient> implements PatientDAO
{

    @Autowired
    public PatientsCouchDBDAOImpl(@Qualifier("patientDatabase") CouchDbConnector db) {
        super(Patient.class, db);
    }

	public void addPatient(Patient patient) {
		db.create(patient);
	}

	public void updatePatient(Patient patient) {
		db.update(patient);
	}

	public Patient getPatient(String externalid) {
        Patient patient = db.get(Patient.class, externalid);
        return patient;
	}

	public void removePatient(String externalid) {
		List<Patient> patientList = findByExternalid(externalid);
		if (patientList.size() == 0) {
			return;
		}
        Patient patient = patientList.get(0);
        if (patient == null) {
        	return;
        }
        removePatient(patient);
	}
	
	@GenerateView
	public List<Patient> findByExternalid(String externalid) {
        List<Patient> ret = queryView("by_externalid", externalid);
        if (null == ret) {
            ret  = Collections.<Patient>emptyList();
        }

        return ret;
	}

	public void removePatient(Patient patient) {
		db.delete(patient);
	}
	
    @View(name = "findAllPatients", map = "function(doc) {if (doc.type == 'PATIENT') {emit(null, doc._id);}}")
	public List<Patient> findAllPatients() {
		List<Patient> ret = queryView("findAllPatients");
		if (null == ret) {
			ret = Collections.<Patient>emptyList();
			
		}
		
		return ret;
	}
	
	
}
