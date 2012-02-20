package org.motechproject.openmrs.util;

import org.motechproject.mrs.model.MRSFacility;
import org.motechproject.mrs.model.MRSPatient;
import org.motechproject.mrs.model.MRSPerson;
import org.openmrs.*;

import java.util.Date;
import java.util.HashSet;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;

public class PatientTestUtil {

    private FacilityTestUtil facilityTestUtil = new FacilityTestUtil();

    public org.openmrs.Patient setUpOpenMRSPatient(Person person, String first, String middle, String last, String address1, Date birthdate, boolean birthdateEstimated, String gender, MRSFacility facility, String motechId) {
        PersonName personName = new PersonName(first, middle, last);
        person.addName(personName);
        setAddress(person, address1);
        final org.openmrs.Patient patient = new org.openmrs.Patient(person);
        patient.setBirthdate(birthdate);
        patient.setBirthdateEstimated(birthdateEstimated);
        patient.setGender(gender);
        patient.addIdentifier(new PatientIdentifier(motechId, null, new Location(Integer.parseInt(facility.getId()))));
        return patient;
    }

    private void setAddress(Person person, String address1) {
        final PersonAddress address = new PersonAddress();
        address.setAddress1(address1);
        final HashSet<PersonAddress> addresses = new HashSet<PersonAddress>();
        addresses.add(address);
        person.setAddresses(addresses);
    }

    public void verifyReturnedPatient(String first, String middle, String last, String address1, Date birthdate, Boolean birthDateEstimated, String gender, MRSFacility facility, MRSPatient actualPatient, String motechId) {
        MRSPerson actualMRSPerson = actualPatient.getPerson();
        assertThat(actualMRSPerson.getFirstName(), is(first));
        assertThat(actualMRSPerson.getLastName(), is(last));
        assertThat(actualMRSPerson.getMiddleName(), is(middle));
        assertThat(actualMRSPerson.getAddress(), is(address1));
        assertThat(actualMRSPerson.getDateOfBirth(), is(birthdate));
        assertThat(actualMRSPerson.getGender(), is(gender));
        assertThat(actualPatient.getFacility(), is(equalTo(facility)));
    }

    public void assertEqualsForOpenMrsPatient(Patient openMrsPatient1, Patient openMRSPatient2) {
        assertThat(openMrsPatient1.getPersonName().getGivenName(), is(equalTo(openMRSPatient2.getPersonName().getGivenName())));
        assertThat(openMrsPatient1.getPersonName().getMiddleName(), is(equalTo(openMRSPatient2.getPersonName().getMiddleName())));
        assertThat(openMrsPatient1.getPersonName().getFamilyName(), is(equalTo(openMRSPatient2.getPersonName().getFamilyName())));
        assertThat(openMrsPatient1.getPersonAddress().getAddress1(), is(equalTo(openMRSPatient2.getPersonAddress().getAddress1())));
        assertThat(openMrsPatient1.getBirthdate(), is(equalTo(openMRSPatient2.getBirthdate())));
        assertThat(openMrsPatient1.getBirthdateEstimated(), is(equalTo(openMRSPatient2.getBirthdateEstimated())));
        assertThat(openMrsPatient1.getGender(), is(equalTo(openMRSPatient2.getGender())));
        assertThat(openMrsPatient1.getPatientIdentifier().getIdentifier(), is(equalTo(openMRSPatient2.getPatientIdentifier().getIdentifier())));
        facilityTestUtil.assertEqualsForOpenMrsLocation(openMrsPatient1.getPatientIdentifier().getLocation(), openMRSPatient2.getPatientIdentifier().getLocation());
    }
}
