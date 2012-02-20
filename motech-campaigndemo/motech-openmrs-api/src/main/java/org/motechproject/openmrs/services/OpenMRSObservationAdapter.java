package org.motechproject.openmrs.services;

import org.apache.commons.collections.CollectionUtils;
import org.motechproject.mrs.model.MRSObservation;
import org.motechproject.openmrs.IdentifierType;
import org.openmrs.*;
import org.openmrs.api.ConceptService;
import org.openmrs.api.ObsService;
import org.openmrs.api.PatientService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.apache.commons.lang.math.NumberUtils.isNumber;

public class OpenMRSObservationAdapter {

    @Autowired
    OpenMRSConceptAdapter conceptAdapter;

    @Autowired
    ObsService obsService;
    
    @Autowired
    PatientService patientService;
    
    @Autowired
    ConceptService conceptService;

    <T> Obs createOpenMRSObservationForEncounter(MRSObservation<T> mrsObservation, Encounter encounter, Patient patient, Location location, User staff) {
        Obs openMrsObservation = new Obs();
        openMrsObservation.setConcept(conceptAdapter.getConceptByName(mrsObservation.getConceptName()));
        openMrsObservation.setPerson(patient);
        openMrsObservation.setLocation(location);
        openMrsObservation.setCreator(staff);
        openMrsObservation.setEncounter(encounter);
        openMrsObservation.setObsDatetime(mrsObservation.getDate());
        if (mrsObservation.getDependantObservations() != null && !mrsObservation.getDependantObservations().isEmpty()) {
            for (MRSObservation observation : mrsObservation.getDependantObservations()) {
                openMrsObservation.addGroupMember(createOpenMRSObservationForEncounter(observation, encounter, patient, location, staff));
            }
        }
        writeValueToOpenMRSObservation(mrsObservation.getValue(), openMrsObservation);
        return openMrsObservation;
    }

    <T> void writeValueToOpenMRSObservation(T value, Obs openMRSObservation) {
        if ((value instanceof Number) && isNumber(value.toString())) {
            openMRSObservation.setValueNumeric(Double.parseDouble(value.toString()));
        } else if (value instanceof String) {
            openMRSObservation.setValueText((String) value);
        } else if (value instanceof Boolean) {
            openMRSObservation.setValueNumeric(Boolean.TRUE.equals(value) ? 1.0 : 0.0);
        } else if (value instanceof Date) {
            openMRSObservation.setValueDatetime((Date) value);
        } else if (value instanceof Concept) {
            openMRSObservation.setValueCoded((Concept) value);
        } else if (value != null) {
            throw new IllegalArgumentException("Invalid value of the createMRSObservation- " + value);
        }
    }

    Set<Obs> createOpenMRSObservationsForEncounter(Set<MRSObservation> mrsObservations, Encounter encounter, Patient patient, Location facility, User staff) {
        Set<Obs> openMrsObservations = new HashSet<Obs>();
        for (MRSObservation observation : mrsObservations) {
            openMrsObservations.add(createOpenMRSObservationForEncounter(observation, encounter, patient, facility, staff));
        }
        return openMrsObservations;
    }

    MRSObservation saveObservation(MRSObservation mrsObservation, Encounter encounter, Patient patient, Location facility, User creator) {
        return convertOpenMRSToMRSObservation(obsService.saveObs(createOpenMRSObservationForEncounter(mrsObservation, encounter, patient, facility, creator), null));
    }

    Set<MRSObservation> convertOpenMRSToMRSObservations(Set<Obs> openMrsObservations) {
        Set<MRSObservation> mrsObservations = new HashSet<MRSObservation>();
        for (Obs obs : openMrsObservations) {
            mrsObservations.add(convertOpenMRSToMRSObservation(obs));
        }
        return mrsObservations;
    }

    MRSObservation convertOpenMRSToMRSObservation(Obs obs) {
        ConceptDatatype datatype = obs.getConcept().getDatatype();
        if (datatype.isAnswerOnly())
            return createMRSObservation(obs, null);
        else if (datatype.isBoolean())
            return createMRSObservation(obs, obs.getValueAsBoolean());
        else if (datatype.isDateTime())
            return createMRSObservation(obs, obs.getValueDatetime());
        else if (datatype.isNumeric())
            return createMRSObservation(obs, obs.getValueNumeric());
        else if (datatype.isText())
            return createMRSObservation(obs, obs.getValueText());
        else if (datatype.isCoded())
            return createMRSObservation(obs, obs.getValueCoded());
        else
            throw new IllegalArgumentException("Invalid value of the createMRSObservation from DB-" + obs);
    }

    private MRSObservation createMRSObservation(Obs obs, Object value) {
        final MRSObservation mrsObservation = new MRSObservation(Integer.toString(obs.getId()), obs.getObsDatetime(),
                obs.getConcept().getName().getName(), value);
        if (obs.hasGroupMembers()) {
            for (Obs observation : obs.getGroupMembers()) {
                mrsObservation.addDependantObservation(convertOpenMRSToMRSObservation(observation));
            }
        }
        return mrsObservation;
    }
    
    public List<MRSObservation> getMRSObservationsByMotechPatientIdAndConceptName(String motechId, String conceptName) {
    	
        PatientIdentifierType motechIdType = patientService.getPatientIdentifierTypeByName(IdentifierType.IDENTIFIER_MOTECH_ID.getName());
        List<PatientIdentifierType> idTypes = new ArrayList<PatientIdentifierType>();
        idTypes.add(motechIdType);
        List<org.openmrs.Patient> patients = patientService.getPatients(null, motechId, idTypes, true);
        Patient patient = (CollectionUtils.isNotEmpty(patients)) ? patients.get(0) : null;
    	
    	Concept concept = conceptService.getConceptByName(conceptName);
    	
    	List<Obs> openMrsObsList = obsService.getObservationsByPersonAndConcept(patient, concept);
    	
    	List<MRSObservation> mrsObsList = new ArrayList<MRSObservation>();
    	
    	for (Obs openMRSObservation : openMrsObsList) {
    		mrsObsList.add(convertOpenMRSToMRSObservation(openMRSObservation));
    	}
    	
    	return mrsObsList;
    }
    

}