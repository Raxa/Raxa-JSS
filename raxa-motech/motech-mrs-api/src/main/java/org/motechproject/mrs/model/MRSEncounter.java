package org.motechproject.mrs.model;

import java.util.Date;
import java.util.Set;

public class MRSEncounter {
    public String getId() {
        return id;
    }

    private String id;
    private MRSPerson provider;

    private MRSUser creator;

    private MRSFacility facility;
    private Date date;
    private Set<MRSObservation> observations;
    private MRSPatient patient;
    private String encounterType;
    public MRSEncounter() {
    }

    private MRSEncounter(MRSPerson provider, MRSUser creator, MRSFacility facility, Date date, MRSPatient patient, Set<MRSObservation> observations, String encounterType) {
        this.creator = creator;
        this.provider = provider;
        this.facility = facility;
        this.date = date;
        this.patient = patient;
        this.observations = observations;
        this.encounterType = encounterType;
    }

    public MRSEncounter(String id, MRSPerson provider, MRSUser staff, MRSFacility facility, Date date, MRSPatient patient, Set<MRSObservation> observations,String encounterType) {
        this(provider, staff, facility, date, patient, observations, encounterType);
        this.id = id;
    }

    public MRSEncounter(String providerId, String creatorId, String facilityId, Date date, String patientId, Set<MRSObservation> observations, String encounterType) {
        this(new MRSPerson().id(providerId) , new MRSUser().id(creatorId), new MRSFacility(facilityId), date, new MRSPatient(patientId), observations, encounterType);
    }

    public MRSUser getCreator() {
        return creator;
    }

    public MRSPerson getProvider() {
        return provider;
    }

    public MRSFacility getFacility() {
        return facility;
    }

    public Date getDate() {
        return date;
    }

    public MRSPatient getPatient() {
        return patient;
    }

    public Set<MRSObservation> getObservations() {
        return observations;
    }

    public String getEncounterType() {
        return encounterType;
    }
}
