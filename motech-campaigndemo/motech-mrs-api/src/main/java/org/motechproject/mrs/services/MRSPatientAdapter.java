package org.motechproject.mrs.services;

import org.motechproject.mrs.model.MRSPatient;

import java.util.Date;
import java.util.List;

public interface MRSPatientAdapter {
    MRSPatient savePatient(MRSPatient patient);

    String updatePatient(MRSPatient patient);

    MRSPatient getPatient(String patientId);

    MRSPatient getPatientByMotechId(String motechId);

    List<MRSPatient> search(String name, String id);

    Integer getAgeOfPatientByMotechId(String motechId);

    void savePatientCauseOfDeathObservation(String patientId, String conceptName, Date dateOfDeath, String comment);
}
