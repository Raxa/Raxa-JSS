package org.motechproject.openmrs.services;

import org.motechproject.mrs.model.*;
import org.motechproject.mrs.services.MRSEncounterAdapter;
import org.openmrs.*;
import org.openmrs.api.EncounterService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

import static ch.lambdaj.Lambda.on;
import static ch.lambdaj.Lambda.sort;

public class OpenMRSEncounterAdapter implements MRSEncounterAdapter {
    @Autowired
    private EncounterService encounterService;
    @Autowired
    private OpenMRSUserAdapter openMRSUserAdapter;
    @Autowired
    private OpenMRSFacilityAdapter openMRSFacilityAdapter;
    @Autowired
    private OpenMRSPatientAdapter openMRSPatientAdapter;
    @Autowired
    private OpenMRSObservationAdapter openMRSObservationAdapter;
    @Autowired
    private OpenMRSPersonAdapter openMRSPersonAdapter;


    public OpenMRSEncounterAdapter() {
    }

    @Override
    public MRSEncounter createEncounter(MRSEncounter mrsEncounter) {
        Encounter savedEncounter = encounterService.saveEncounter(mrsToOpenMRSEncounter(mrsEncounter));
        return openmrsToMrsEncounter(savedEncounter);
    }

    @Override
    public MRSEncounter getLatestEncounterByPatientMotechId(String motechId, String encounterType) {
        final List<Encounter> encounters = encounterService.getEncountersByPatientIdentifier(motechId);
        final ArrayList<Encounter> encountersByType = new ArrayList<Encounter>();
        for (Encounter encounter : encounters) {
            if (encounterType.equals(encounter.getEncounterType().getName())) {
                encountersByType.add(encounter);
            }
        }
        if (encountersByType.isEmpty()) {
            return null;
        }
        if (encountersByType.size() == 1) {
            return openmrsToMrsEncounter(encountersByType.get(0));
        }
        final List<Object> sortedEncounters = sort(encountersByType,
                on(Encounter.class).getEncounterDatetime());
        return openmrsToMrsEncounter((Encounter) sortedEncounters.get(sortedEncounters.size() - 1));
    }

    MRSEncounter openmrsToMrsEncounter(Encounter openMrsEncounter) {
        String id = Integer.toString(openMrsEncounter.getEncounterId());
        String encounterType = openMrsEncounter.getEncounterType().getName();
        Date date = openMrsEncounter.getEncounterDatetime();
        MRSFacility facility = openMRSFacilityAdapter.convertLocationToFacility(openMrsEncounter.getLocation());
        MRSPatient patient = openMRSPatientAdapter.getMrsPatient(openMrsEncounter.getPatient());
        Set<MRSObservation> observations = openMRSObservationAdapter.convertOpenMRSToMRSObservations(openMrsEncounter.getObs());
        MRSUser creator = new MRSUser().systemId(openMrsEncounter.getCreator().getSystemId()).id(openMrsEncounter.getCreator().getId().toString());
        MRSPerson provider = new MRSPerson().id(String.valueOf(openMrsEncounter.getProvider().getId()));
        return new MRSEncounter(id, provider, creator, facility, date, patient, observations, encounterType);
    }

    Encounter mrsToOpenMRSEncounter(MRSEncounter mrsEncounter) {
        org.openmrs.Encounter openMrsEncounter = new org.openmrs.Encounter();
        EncounterType openMrsEncounterType = encounterService.getEncounterType(mrsEncounter.getEncounterType());
        Patient patient = openMRSPatientAdapter.getOpenMrsPatient(mrsEncounter.getPatient().getId());
        User creator = openMRSUserAdapter.getOpenMrsUserById(mrsEncounter.getCreator().getId());
        Location location = openMRSFacilityAdapter.getLocation(mrsEncounter.getFacility().getId());
        Person provider = openMRSPersonAdapter.getPersonById(mrsEncounter.getProvider().getId());
        openMrsEncounter.setEncounterType(openMrsEncounterType);
        openMrsEncounter.setEncounterDatetime(mrsEncounter.getDate());
        openMrsEncounter.setPatient(patient);
        openMrsEncounter.setLocation(location);
        openMrsEncounter.setCreator(creator);
        openMrsEncounter.setProvider(provider);
        if (mrsEncounter.getObservations() != null) {
            openMrsEncounter.setObs(openMRSObservationAdapter.createOpenMRSObservationsForEncounter(mrsEncounter.getObservations(), openMrsEncounter, patient, location, creator));
        }
        return openMrsEncounter;
    }

	@Override
	public List<MRSEncounter> getAllEncountersByPatientMotechId(String motechId) {
		
		Patient openMRSpatient = openMRSPatientAdapter.getOpenmrsPatientByMotechId(motechId);
		List<Encounter> openMRSEncounters = encounterService.getEncountersByPatient(openMRSpatient);
		List<MRSEncounter> MRSEncounters = new ArrayList<MRSEncounter>();
		
		for (Encounter openMrsEncounter : openMRSEncounters) {
	        MRSEncounters.add(openmrsToMrsEncounter(openMrsEncounter));
		}
		return MRSEncounters;
	}

}
