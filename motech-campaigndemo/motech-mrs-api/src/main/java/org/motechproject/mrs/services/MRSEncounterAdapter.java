package org.motechproject.mrs.services;

import java.util.List;

import org.motechproject.mrs.model.MRSEncounter;


public interface MRSEncounterAdapter {
    public MRSEncounter createEncounter(MRSEncounter MRSEncounter);
    
    public List<MRSEncounter> getAllEncountersByPatientMotechId(String motechId);

    public MRSEncounter getLatestEncounterByPatientMotechId(String motechId, String encounterType);
}
