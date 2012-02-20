package org.motechproject.openmrs.helper;

import org.apache.commons.collections.CollectionUtils;
import org.motechproject.mrs.model.Attribute;
import org.motechproject.mrs.model.MRSPatient;
import org.motechproject.mrs.model.MRSPerson;
import org.openmrs.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

import static ch.lambdaj.Lambda.*;
import static org.hamcrest.Matchers.equalTo;

@Component
public class PatientHelper {
    public Patient buildOpenMrsPatient(MRSPatient patient,
                                       PatientIdentifierType patientIdentifierType, Location location,
                                       List<PersonAttributeType> allPersonAttributeTypes) {

        final Patient openMRSPatient = new Patient(createPersonWithNames(patient));
        openMRSPatient.addIdentifier(new PatientIdentifier(patient.getMotechId(), patientIdentifierType, location));
        openMRSPatient.setGender(patient.getPerson().getGender());
        openMRSPatient.setBirthdate(patient.getPerson().getDateOfBirth());
        openMRSPatient.setBirthdateEstimated(patient.getPerson().getBirthDateEstimated());
        openMRSPatient.setDead(patient.getPerson().isDead());
        openMRSPatient.setDeathDate(patient.getPerson().deathDate());
        setPatientAddress(openMRSPatient, patient.getPerson().getAddress());
        setPersonAttributes(patient, openMRSPatient, allPersonAttributeTypes);
        return openMRSPatient;
    }

    private Person createPersonWithNames(MRSPatient patient) {
        final Person person = new Person();
        for (PersonName name : getAllNames(patient)) {
            person.addName(name);
        }
        return person;
    }

    private List<PersonName> getAllNames(MRSPatient patient) {
        final List<PersonName> personNames = new ArrayList<PersonName>();
        MRSPerson mrsPerson = patient.getPerson();
        personNames.add(new PersonName(mrsPerson.getFirstName(), mrsPerson.getMiddleName(), mrsPerson.getLastName()));
        return personNames;
    }

    private void setPatientAddress(Patient patient, String address) {
        if (address != null) {
            PersonAddress personAddress = new PersonAddress();
            personAddress.setAddress1(address);
            patient.addAddress(personAddress);
        }
    }

    private void setPersonAttributes(MRSPatient patient, Patient openMRSPatient,
                                     List<PersonAttributeType> allPersonAttributeTypes) {
        MRSPerson mrsPerson = patient.getPerson();
        if(CollectionUtils.isNotEmpty(mrsPerson.getAttributes())){
            for (Attribute attribute : mrsPerson.getAttributes()) {
                PersonAttributeType attributeType = (PersonAttributeType) selectUnique(allPersonAttributeTypes,
                        having(on(PersonAttributeType.class).getName(), equalTo(attribute.name())));
                openMRSPatient.addAttribute(new PersonAttribute(attributeType, attribute.value()));
            }
        }
    }
}
