package org.motechproject.openmrs.services;


import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.motechproject.mrs.model.MRSPerson;
import org.openmrs.*;
import org.openmrs.api.PersonService;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import static java.util.Arrays.asList;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class OpenMRSPersonAdapterTest {

    OpenMRSPersonAdapter openMRSPersonAdapter;

    public static final String PERSON_ATTRIBUTE_TYPE_EMAIL = "Email";
    public static final String PERSON_ATTRIBUTE_TYPE_PHONE_NUMBER = "Phone Number";
    public static final String PERSON_ATTRIBUTE_TYPE_STAFF_TYPE = "Staff Type";

    @Mock
    private PersonService mockPersonService;


    @Before
    public void setUp() {
        initMocks(this);
        openMRSPersonAdapter = new OpenMRSPersonAdapter(mockPersonService);

    }

    @Test
    public void shouldGetFirstName() {
        final PersonName firstName = new PersonName("firstname", "middlename", "familyname");
        final PersonName preferredName = new PersonName("preferredname", "middlename", "familyname");
        preferredName.setPreferred(true);
        assertThat(openMRSPersonAdapter.getFirstName(new HashSet<PersonName>() {{
            add(firstName);
            add(preferredName);
        }}), is(equalTo(firstName)));
    }

    @Test
    public void shouldGetPreferredNameIfFirstNameIsNotSet() {
        final PersonName preferredName = new PersonName("preferredname", "middlename", "familyname");
        preferredName.setPreferred(true);
        assertThat(openMRSPersonAdapter.getFirstName(new HashSet<PersonName>() {{ add(preferredName); }}), is(equalTo(preferredName)));
    }

    @Test
    public void shouldConvertOpenMRSPersonToMRSPersonWithoutPreferredName() {
        Person person = new Person();

        String expectedAddress = "Expected Patient Address";
        Set<PersonAddress> personAddresses = new HashSet<PersonAddress>();
        PersonAddress personAddress = new PersonAddress();
        personAddress.setAddress1(expectedAddress);
        personAddresses.add(personAddress);
        person.setAddresses(personAddresses);

        String gender = "F";
        String firstName = "FirstName";
        String middleName = "MiddleName";
        String familyName = "FamilyName";
        Date birthdate = new Date(2011, 12, 12);
        int patientId = 89;
        String address = "Address1";
        String email = "email";
        String phoneNo = "123423423";
        String staffType = "staffType";
        boolean preferred = true;
        boolean birthdateEstimated = true;
        boolean dead = true;
        Date deathDate = new Date();

        person.setId(patientId);
        personAddress.setAddress1(address);
        person.setGender(gender);
        person.setBirthdate(birthdate);
        person.setDeathDate(deathDate);

        person.addName(new PersonName(firstName, middleName, familyName));


        person.setBirthdateEstimated(birthdateEstimated);
        person.addAddress(personAddress);
        person.setDead(dead);

        person.setAttributes(personAttributes(staffType, phoneNo, email));

        MRSPerson mrsPerson = openMRSPersonAdapter.openMRSToMRSPerson(person);

        assertThat(mrsPerson.getFirstName(), is(equalTo(firstName)));
        assertThat(mrsPerson.getMiddleName(), is(equalTo(middleName)));
        assertThat(mrsPerson.getLastName(), is(equalTo(familyName)));
        assertThat(mrsPerson.getGender(), is(equalTo(gender)));
        assertThat(mrsPerson.getAddress(), is(equalTo(address)));
        assertThat(mrsPerson.getBirthDateEstimated(), is(equalTo(birthdateEstimated)));
        assertThat(mrsPerson.getDateOfBirth(), is(equalTo(birthdate)));
        assertThat(mrsPerson.attrValue(PERSON_ATTRIBUTE_TYPE_EMAIL), is(equalTo(email)));
        assertThat(mrsPerson.attrValue(PERSON_ATTRIBUTE_TYPE_PHONE_NUMBER), is(equalTo(phoneNo)));
        assertThat(mrsPerson.attrValue(PERSON_ATTRIBUTE_TYPE_STAFF_TYPE), is(equalTo(staffType)));
        assertThat(mrsPerson.isDead(), is(equalTo(dead)));
        assertThat(mrsPerson.deathDate(), is(equalTo(deathDate)));
    }

    @Test
    public void shouldGetPersonById() {
        String id = "10";
        Person person = mock(Person.class);
        when(mockPersonService.getPerson(Integer.valueOf(id))).thenReturn(person);
        Person openMRSPerson = openMRSPersonAdapter.getPersonById(id);
        assertThat(openMRSPerson, is(equalTo(person)));
    }
    

    private Set<PersonAttribute> personAttributes(String staffType, String phoneNo, String email) {
        return new HashSet<PersonAttribute>(asList(new PersonAttribute(personAttributeType(PERSON_ATTRIBUTE_TYPE_STAFF_TYPE), staffType),
                new PersonAttribute(personAttributeType(PERSON_ATTRIBUTE_TYPE_PHONE_NUMBER), phoneNo),
                new PersonAttribute(personAttributeType(PERSON_ATTRIBUTE_TYPE_EMAIL), email)));
    }

    private PersonAttributeType personAttributeType(String name) {
        PersonAttributeType attr = new PersonAttributeType((int) (Math.random() * 10000));
        attr.setName(name);
        return attr;
    }


}
