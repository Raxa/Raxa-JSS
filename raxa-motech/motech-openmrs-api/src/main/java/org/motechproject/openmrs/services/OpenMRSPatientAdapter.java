package org.motechproject.openmrs.services;

import ch.lambdaj.function.convert.Converter;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.motechproject.mrs.model.Attribute;
import org.motechproject.mrs.model.MRSFacility;
import org.motechproject.mrs.model.MRSPatient;
import org.motechproject.mrs.model.MRSPerson;
import org.motechproject.mrs.services.MRSPatientAdapter;
import org.motechproject.openmrs.IdentifierType;
import org.motechproject.openmrs.helper.PatientHelper;
import org.openmrs.*;
import org.openmrs.api.PatientService;
import org.openmrs.api.PersonService;
import org.openmrs.api.UserService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

import static ch.lambdaj.Lambda.convert;

public class OpenMRSPatientAdapter implements MRSPatientAdapter {

    @Autowired
    PatientService patientService;

    @Autowired
    PersonService personService;

    @Autowired
    UserService userService;

    @Autowired
    OpenMRSFacilityAdapter facilityAdapter;
    @Autowired
    OpenMRSPersonAdapter personAdapter;

    @Autowired
    PatientHelper patientHelper;
    @Autowired
    private OpenMRSConceptAdapter openMrsConceptAdapter;

    @Override
    public MRSPatient getPatient(String patientId) {
        org.openmrs.Patient openMrsPatient = getOpenMrsPatient(patientId);
        return (openMrsPatient == null) ? null : getMrsPatient(openMrsPatient);
    }

    @Override
    @Deprecated
    /**
     * The caller should instead get Patient and get the age from that
     */
    public Integer getAgeOfPatientByMotechId(String motechId) {
        Patient patient = getOpenmrsPatientByMotechId(motechId);
        return (patient != null) ? patient.getAge() :null;
    }

    @Override
    public MRSPatient getPatientByMotechId(String motechId) {
        final Patient patient = getOpenmrsPatientByMotechId(motechId);
        return (patient != null) ? getMrsPatient(patient) : null;
    }

    Patient getOpenmrsPatientByMotechId(String motechId) {
        PatientIdentifierType motechIdType = patientService.getPatientIdentifierTypeByName(IdentifierType.IDENTIFIER_MOTECH_ID.getName());
        List<PatientIdentifierType> idTypes = new ArrayList<PatientIdentifierType>();
        idTypes.add(motechIdType);
        List<org.openmrs.Patient> patients = patientService.getPatients(null, motechId, idTypes, true);
        return (CollectionUtils.isNotEmpty(patients)) ? patients.get(0) : null;
    }

    @Override
    public MRSPatient savePatient(MRSPatient patient) {
        final org.openmrs.Patient openMRSPatient = patientHelper.buildOpenMrsPatient(patient,
                getPatientIdentifierType(IdentifierType.IDENTIFIER_MOTECH_ID),
                facilityAdapter.getLocation(patient.getFacility().getId()), getAllPersonAttributeTypes());

        return getMrsPatient(patientService.savePatient(openMRSPatient));
    }

    @Override
    public String updatePatient(MRSPatient patient) {
        Patient openMrsPatient = getOpenmrsPatientByMotechId(patient.getMotechId());

        MRSPerson person = patient.getPerson();
        if (StringUtils.isNotEmpty(person.getPreferredName())) {
            if (openMrsPatient.getNames().size() == 2) {
                for (PersonName name : openMrsPatient.getNames()) {
                    if (name.isPreferred()) {
                        name.setGivenName(person.getPreferredName());
                    } else {
                        name.setGivenName(person.getFirstName());
                    }
                    name.setMiddleName(person.getMiddleName());
                    name.setFamilyName(person.getLastName());
                }
            } else {
                PersonName personName = openMrsPatient.getPersonName();
                personName.setGivenName(person.getFirstName());
                personName.setMiddleName(person.getMiddleName());
                personName.setFamilyName(person.getLastName());
                PersonName preferredName = new PersonName(person.getPreferredName(), person.getMiddleName(), person.getLastName());
                preferredName.setPreferred(true);
                openMrsPatient.addName(preferredName);
            }
        } else {
            PersonName personName = openMrsPatient.getPersonName();
            personName.setGivenName(person.getFirstName());
            personName.setMiddleName(person.getMiddleName());
            personName.setFamilyName(person.getLastName());
        }

        openMrsPatient.setBirthdate(person.getDateOfBirth());
        openMrsPatient.setBirthdateEstimated(person.getBirthDateEstimated());
        openMrsPatient.setGender(person.getGender());

        for (Attribute attribute : person.getAttributes()) {
            PersonAttribute personAttribute = openMrsPatient.getAttribute(attribute.name());
            if (personAttribute != null) {
                openMrsPatient.removeAttribute(personAttribute);
            }
            openMrsPatient.addAttribute(new PersonAttribute(personService.getPersonAttributeTypeByName(attribute.name()), attribute.value()));
        }
        Set<PersonAddress> addresses = openMrsPatient.getAddresses();
        if (!addresses.isEmpty()) {
            PersonAddress address = addresses.iterator().next();
            address.setAddress1(person.getAddress());
        } else {
            final String address = person.getAddress();
            PersonAddress personAddress = new PersonAddress();
            personAddress.setAddress1(address);
            openMrsPatient.addAddress(personAddress);
        }
        openMrsPatient.getPatientIdentifier().setLocation(facilityAdapter.getLocation(patient.getFacility().getId()));
        openMrsPatient.setDead(person.isDead());
        openMrsPatient.setDeathDate(person.deathDate());

        final Patient savedPatient = patientService.savePatient(openMrsPatient);
        if (savedPatient != null) {
            return savedPatient.getPatientIdentifier().getIdentifier();
        } else {
            return null;
        }
    }

    public MRSPatient getMrsPatient(org.openmrs.Patient patient) {
        final PatientIdentifier patientIdentifier = patient.getPatientIdentifier();
        MRSFacility mrsFacility = (patientIdentifier != null) ? facilityAdapter.convertLocationToFacility(patientIdentifier.getLocation()) : null;
        String motechId = (patientIdentifier != null) ? patientIdentifier.getIdentifier() : null;
        MRSPerson mrsPerson = personAdapter.openMRSToMRSPerson(patient);
        return new MRSPatient(String.valueOf(patient.getId()), motechId, mrsPerson, mrsFacility);
    }

    public PatientIdentifierType getPatientIdentifierType(IdentifierType identifierType) {
        return patientService.getPatientIdentifierTypeByName(identifierType.getName());
    }

    private List<PersonAttributeType> getAllPersonAttributeTypes() {
        return personService.getAllPersonAttributeTypes(false);
    }

    public org.openmrs.Patient getOpenMrsPatient(String patientId) {
        return patientService.getPatient(Integer.parseInt(patientId));
    }

    @Override
    public List<MRSPatient> search(String name, String id) {
        List<MRSPatient> patients = convert(patientService.getPatients(name, id, Arrays.asList(patientService.getPatientIdentifierTypeByName(IdentifierType.IDENTIFIER_MOTECH_ID.getName())), false),
                new Converter<Patient, MRSPatient>() {
                    @Override
                    public MRSPatient convert(Patient patient) {
                        return getMrsPatient(patient);
                    }
                });
        Collections.sort(patients, new Comparator<MRSPatient>() {
            @Override
            public int compare(MRSPatient personToBeCompared1, MRSPatient personToBeCompared2) {
                if (personToBeCompared1.getPerson().getFirstName() == null && personToBeCompared2.getPerson().getFirstName() == null) {
                    return personToBeCompared1.getMotechId().compareTo(personToBeCompared2.getMotechId());
                } else {
                    if (personToBeCompared1.getPerson().getFirstName() == null) {
                        return -1;
                    } else if (personToBeCompared2.getPerson().getFirstName() == null) {
                        return 1;
                    } else {
                        return personToBeCompared1.getPerson().getFirstName().compareTo(personToBeCompared2.getPerson().getFirstName());
                    }
                }
            }
        });
        return patients;
    }

    @Override
    public void savePatientCauseOfDeathObservation(String patientId, String conceptName, Date dateOfDeath, String comment) {
        Patient patient = getOpenMrsPatient(patientId);
        patient.setDead(true);
        Concept concept = openMrsConceptAdapter.getConceptByName(conceptName);
        patient.setCauseOfDeath(concept);
        patientService.savePatient(patient);
        patientService.saveCauseOfDeathObs(patient, dateOfDeath, concept, comment);
    }
}
