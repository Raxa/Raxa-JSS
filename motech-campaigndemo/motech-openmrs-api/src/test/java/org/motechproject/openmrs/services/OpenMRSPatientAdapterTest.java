package org.motechproject.openmrs.services;

import org.apache.commons.collections.ListUtils;
import org.joda.time.LocalDate;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InOrder;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.motechproject.mrs.model.Attribute;
import org.motechproject.mrs.model.MRSFacility;
import org.motechproject.mrs.model.MRSPatient;
import org.motechproject.mrs.model.MRSPerson;
import org.motechproject.openmrs.IdentifierType;
import org.motechproject.openmrs.helper.PatientHelper;
import org.motechproject.openmrs.util.PatientTestUtil;
import org.openmrs.*;
import org.openmrs.api.PatientService;
import org.openmrs.api.PersonService;
import org.openmrs.api.UserService;
import org.springframework.test.util.ReflectionTestUtils;

import java.text.SimpleDateFormat;
import java.util.*;

import static junit.framework.Assert.*;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

public class OpenMRSPatientAdapterTest {

    @Mock
    private PatientService mockPatientService;
    @Mock
    private UserService mockUserService;
    @Mock
    private PersonService mockPersonService;
    @Mock
    private OpenMRSFacilityAdapter mockFacilityAdapter;
    @Mock
    private OpenMRSConceptAdapter mockOpenMRSConceptAdapter;

    OpenMRSPatientAdapter openMRSPatientAdapter;
    PatientTestUtil patientTestUtil;
    @Mock
    private OpenMRSPersonAdapter mockPersonAdapter;

    @Before
    public void setUp() {
        initMocks(this);
        openMRSPatientAdapter = new OpenMRSPatientAdapter();
        patientTestUtil = new PatientTestUtil();
        ReflectionTestUtils.setField(openMRSPatientAdapter, "patientService", mockPatientService);
        ReflectionTestUtils.setField(openMRSPatientAdapter, "personService", mockPersonService);
        ReflectionTestUtils.setField(openMRSPatientAdapter, "userService", mockUserService);
        ReflectionTestUtils.setField(openMRSPatientAdapter, "facilityAdapter", mockFacilityAdapter);
        ReflectionTestUtils.setField(openMRSPatientAdapter, "patientHelper", new PatientHelper());
        ReflectionTestUtils.setField(openMRSPatientAdapter, "personAdapter", mockPersonAdapter);
        ReflectionTestUtils.setField(openMRSPatientAdapter, "openMrsConceptAdapter", mockOpenMRSConceptAdapter);
    }

    @Test
    public void shouldSaveAPatient() {
        final Person person = new Person();
        final String first = "First";
        final String middle = "Middle";
        final String last = "Last";
        final String address1 = "a good street in ghana";
        final Date birthDate = new LocalDate(1970, 3, 11).toDate();
        final boolean birthdateEstimated = true;
        final String gender = "male";
        String facilityId = "1000";
        final MRSFacility facility = new MRSFacility(facilityId, "name", "country", "region", "district", "province");
        String motechId = "1234567";
        final Location location = new Location(Integer.parseInt(facilityId));

        org.openmrs.Patient openMRSPatient = patientTestUtil.setUpOpenMRSPatient(person, first, middle, last, address1, birthDate, birthdateEstimated, gender, facility, motechId);

        when(mockPatientService.savePatient(Matchers.<org.openmrs.Patient>any())).thenReturn(openMRSPatient);
        when(mockFacilityAdapter.getLocation(facilityId)).thenReturn(location);
        when(mockFacilityAdapter.convertLocationToFacility(any(Location.class))).thenReturn(facility);

        MRSPerson mrsPerson = new MRSPerson().firstName(first).middleName(middle).lastName(last).birthDateEstimated(birthdateEstimated).dateOfBirth(birthDate).address(address1).gender(gender);
        when(mockPersonAdapter.openMRSToMRSPerson(openMRSPatient)).thenReturn(mrsPerson);

        MRSPatient mrsPatient = new MRSPatient(motechId, mrsPerson, facility);
        final MRSPatient actualPatient = openMRSPatientAdapter.savePatient(mrsPatient);

        verify(mockPersonAdapter).openMRSToMRSPerson(openMRSPatient);

        ArgumentCaptor<org.openmrs.Patient> openMrsPatientArgumentCaptor = ArgumentCaptor.forClass(org.openmrs.Patient.class);
        verify(mockPatientService).savePatient(openMrsPatientArgumentCaptor.capture());
        patientTestUtil.assertEqualsForOpenMrsPatient(openMrsPatientArgumentCaptor.getValue(), openMRSPatient);

        patientTestUtil.verifyReturnedPatient(first, middle, last, address1, birthDate, birthdateEstimated, gender, facility, actualPatient, motechId);
    }

    @Test
    public void shouldGetPatientById() {
        final Person person = new Person();
        final String first = "First";
        final String middle = "Middle";
        final String last = "Last";
        final String address1 = "a good street in ghana";
        final Date birthDate = new LocalDate(1970, 3, 11).toDate();
        final boolean birthDateEstimated = true;
        final String gender = "male";
        final MRSFacility facility = new MRSFacility("1000", "name", "country", "region", "district", "province");
        String motechId = "1234567";

        final org.openmrs.Patient openMRSPatient = patientTestUtil.setUpOpenMRSPatient(person, first, middle, last, address1, birthDate, birthDateEstimated, gender, facility, motechId);
        int patientId = 12;
        when(mockPatientService.getPatient(patientId)).thenReturn(openMRSPatient);
        when(mockFacilityAdapter.convertLocationToFacility(any(Location.class))).thenReturn(facility);

        MRSPerson mrsPerson = new MRSPerson().firstName(first).middleName(middle).lastName(last).birthDateEstimated(birthDateEstimated).dateOfBirth(birthDate).address(address1).gender(gender);
        when(mockPersonAdapter.openMRSToMRSPerson(openMRSPatient)).thenReturn(mrsPerson);

        MRSPatient returnedPatient = openMRSPatientAdapter.getPatient(String.valueOf(patientId));

        verify(mockPatientService).getPatient(patientId);
        verify(mockPersonAdapter).openMRSToMRSPerson(openMRSPatient);

        patientTestUtil.verifyReturnedPatient(first, middle, last, address1, birthDate, birthDateEstimated, gender, facility, returnedPatient, motechId);
    }

    @Test
    public void shouldGetPatientByMotechId() {
        final Person person = new Person();
        final String first = "First";
        final String middle = "Middle";
        final String last = "Last";
        final String address1 = "a good street in ghana";
        final Date birthDate = new LocalDate(1970, 3, 11).toDate();
        final boolean birthDateEstimated = true;
        final String gender = "male";
        final MRSFacility facility = new MRSFacility("1000", "name", "country", "region", "district", "province");
        String motechId = "11";
        PatientIdentifierType motechIdType = mock(PatientIdentifierType.class);

        final org.openmrs.Patient openMRSPatient = patientTestUtil.setUpOpenMRSPatient(person, first, middle, last, address1, birthDate, birthDateEstimated, gender, facility, motechId);
        List<PatientIdentifierType> idTypes = Arrays.asList(motechIdType);
        when(mockPatientService.getPatients(null, motechId, idTypes, true)).thenReturn(Arrays.asList(openMRSPatient));
        when(mockPatientService.getPatientIdentifierTypeByName(IdentifierType.IDENTIFIER_MOTECH_ID.getName())).thenReturn(motechIdType);
        when(mockFacilityAdapter.convertLocationToFacility(any(Location.class))).thenReturn(facility);

        MRSPerson mrsPerson = new MRSPerson().firstName(first).middleName(middle).lastName(last).birthDateEstimated(birthDateEstimated).dateOfBirth(birthDate).address(address1).gender(gender);
        when(mockPersonAdapter.openMRSToMRSPerson(openMRSPatient)).thenReturn(mrsPerson);

        MRSPatient returnedPatient = openMRSPatientAdapter.getPatientByMotechId(motechId);

        verify(mockPersonAdapter).openMRSToMRSPerson(openMRSPatient);
        patientTestUtil.verifyReturnedPatient(first, middle, last, address1, birthDate, birthDateEstimated, gender, facility, returnedPatient, motechId);
    }

    @Test
    public void shouldReturnNullGetPatientByMotechId() {
        String motechId = "11";
        PatientIdentifierType motechIdType = mock(PatientIdentifierType.class);

        List<PatientIdentifierType> idTypes = Arrays.asList(motechIdType);
        when(mockPatientService.getPatients(null, motechId, idTypes, true)).thenReturn(ListUtils.EMPTY_LIST);
        when(mockPatientService.getPatientIdentifierTypeByName(IdentifierType.IDENTIFIER_MOTECH_ID.getName())).thenReturn(motechIdType);
        assertNull(openMRSPatientAdapter.getPatientByMotechId(motechId));

    }

    @Test
    public void shouldReturnNullIfPatientByIdIsNotFound() {
        int patientId = 12;
        when(mockPatientService.getPatient(patientId)).thenReturn(null);
        assertNull(openMRSPatientAdapter.getPatient(String.valueOf(patientId)));
    }

    @Test
    public void shouldRetrieveOpenMrsIdentifierTypeGivenTheIdentifierName() {
        PatientIdentifierType patientIdentiferTypeMock = mock(PatientIdentifierType.class);
        when(mockPatientService.getPatientIdentifierTypeByName(IdentifierType.IDENTIFIER_MOTECH_ID.getName())).thenReturn(patientIdentiferTypeMock);
        assertThat(openMRSPatientAdapter.getPatientIdentifierType(IdentifierType.IDENTIFIER_MOTECH_ID), is(patientIdentiferTypeMock));
    }

    @Test
    public void shouldGetOpenMrsPatientById() {
        org.openmrs.Patient mrsPatient = mock(org.openmrs.Patient.class);
        Integer patientId = 1000;

        when(mockPatientService.getPatient(patientId)).thenReturn(mrsPatient);
        org.openmrs.Patient returnedPatient = openMRSPatientAdapter.getOpenMrsPatient(String.valueOf(patientId));
        assertThat(returnedPatient, is(equalTo(mrsPatient)));
    }

    @Test
    public void shouldGetAgeOfThePersonUsingMotechId() {
        String motechId = "1234567";
        Integer expectedAge = 4;
        Patient mockOpenMRSPatient = mock(Patient.class);
        OpenMRSPatientAdapter openMRSPatientAdapterSpy = spy(openMRSPatientAdapter);

        doReturn(mockOpenMRSPatient).when(openMRSPatientAdapterSpy).getOpenmrsPatientByMotechId(motechId);
        when(mockOpenMRSPatient.getAge()).thenReturn(expectedAge);
        Integer age = openMRSPatientAdapterSpy.getAgeOfPatientByMotechId(motechId);
        verify(mockOpenMRSPatient).getAge();
        assertEquals(age, expectedAge);
    }

    @Test
    public void shouldSearchByPatientNameOrId() {
        OpenMRSPatientAdapter openMRSPatientAdapterSpy = spy(openMRSPatientAdapter);
        String name = "name";
        String id = "1000";
        Patient openMrsPatient1 = mock(Patient.class);
        Patient openMrsPatient2 = mock(Patient.class);
        List<Patient> patientsMatchingSearchQuery = Arrays.asList(openMrsPatient1, openMrsPatient2);
        PatientIdentifierType identifierTypeMock = mock(PatientIdentifierType.class);
        when(mockPatientService.getPatientIdentifierTypeByName(IdentifierType.IDENTIFIER_MOTECH_ID.getName())).thenReturn(identifierTypeMock);
        when(mockPatientService.getPatients(name, id, Arrays.asList(identifierTypeMock), false)).thenReturn(patientsMatchingSearchQuery);

        MRSPatient mrsPatient1 = new MRSPatient(null, new MRSPerson().firstName("Zef"), null);
        MRSPatient mrsPatient2 = new MRSPatient(null, new MRSPerson().firstName("Abc"), null);
        doReturn(mrsPatient1).when(openMRSPatientAdapterSpy).getMrsPatient(openMrsPatient1);
        doReturn(mrsPatient2).when(openMRSPatientAdapterSpy).getMrsPatient(openMrsPatient2);

        List<MRSPatient> returnedPatients = openMRSPatientAdapterSpy.search(name, id);
        assertThat(returnedPatients, is(equalTo(Arrays.asList(mrsPatient2, mrsPatient1))));

    }

    @Test
    public void shouldSaveCauseOfDeath() {
        String patientId = "patientId";
        Patient patient = new Patient();
        Date dateOfDeath = mock(Date.class);
        Concept concept = mock(Concept.class);
        String conceptName = "NONE";

        openMRSPatientAdapter = spy(openMRSPatientAdapter);
        doReturn(patient).when(openMRSPatientAdapter).getOpenMrsPatient(patientId);
        when(mockOpenMRSConceptAdapter.getConceptByName(conceptName)).thenReturn(concept);

        openMRSPatientAdapter.savePatientCauseOfDeathObservation(patientId, conceptName, dateOfDeath, null);

        InOrder order = inOrder(mockPatientService);
        order.verify(mockPatientService).savePatient(patient);
        order.verify(mockPatientService).saveCauseOfDeathObs(patient, dateOfDeath, concept, null);
        assertThat(patient.getCauseOfDeath(), is(concept));
    }

    @Test
    public void shouldUpdateAPatient() {
        String firstName = "first";
        String middleName = "middle";
        String lastName = "last";
        String preferredName = "preferred";
        Date dateOfBirth = new Date();
        Boolean estimatedDate = false;
        Boolean insured = false;
        String nhisNumber = "1234";
        String gender = "male";
        String address = "address";
        String facilityName = "facility";
        String facilityCountry = "ghana";
        String facilityRegion = "region";
        String facilityDistrict = "district";
        String facilitySubDistrict = "province";
        final String motechId = "12";
        final String nhisNumberAttribute = "NHIS Number";
        final String nhisExpirationDateAttribute = "NHIS Expiration Date";
        final String insuredAttribute = "Insured";

        final String nhisExpiryDateString = new SimpleDateFormat("yyyy-MM-dd").format(new Date());
        final MRSPerson person = new MRSPerson().firstName(firstName).middleName(middleName).lastName(lastName)
                .gender(gender).address(address).dateOfBirth(dateOfBirth).birthDateEstimated(estimatedDate).preferredName(preferredName)
                .addAttribute(new Attribute(nhisNumberAttribute, nhisNumber)).addAttribute(new Attribute(nhisExpirationDateAttribute,
                        nhisExpiryDateString)).addAttribute(new Attribute(insuredAttribute, String.valueOf(insured)));
        String newFacilityId = "60";
        final MRSFacility mrsFacility = new MRSFacility(newFacilityId);
        Location location = new Location();
        location.setName(facilityName);
        location.setAddress6(facilityRegion);
        location.setStateProvince(facilitySubDistrict);
        location.setCountyDistrict(facilityDistrict);
        location.setCountry(facilityCountry);
        location.setName(facilityName);
        when(mockFacilityAdapter.getLocation(newFacilityId)).thenReturn(location);
        final MRSFacility mrsFacilityOld = new MRSFacility("61", facilityName + "Old", facilityCountry + "Old", facilityRegion + "Old", facilityDistrict + "Old", facilitySubDistrict + "Old");
        MRSPatient mrsPatient = new MRSPatient(motechId, person, mrsFacility);

        final org.openmrs.Patient mockPatient = patientTestUtil.setUpOpenMRSPatient(new Person(), "diffFirst", "diffMiddle", "diffLast", "diffAddress", new Date(2001, 10, 10), !estimatedDate, "female", mrsFacilityOld, motechId);

        final PersonAttributeType nhisAttributeType = new PersonAttributeType(1);
        nhisAttributeType.setName(nhisNumberAttribute);
        final PersonAttributeType insuredAttributeType = new PersonAttributeType(2);
        insuredAttributeType.setName(insuredAttribute);
        when(mockPersonService.getPersonAttributeTypeByName(nhisNumberAttribute)).thenReturn(nhisAttributeType);
        when(mockPersonService.getPersonAttributeTypeByName(insuredAttribute)).thenReturn(insuredAttributeType);
        final PersonAttributeType expirationDateAttributeType = new PersonAttributeType(3);
        expirationDateAttributeType.setName(nhisExpirationDateAttribute);
        when(mockPersonService.getPersonAttributeTypeByName(nhisExpirationDateAttribute)).thenReturn(expirationDateAttributeType);
        when(mockPatientService.getPatient(Integer.valueOf(mrsPatient.getMotechId()))).thenReturn(mockPatient);
        when(mockPatientService.getPatient(Integer.valueOf(mrsPatient.getMotechId()))).thenReturn(mockPatient);
        final OpenMRSPatientAdapter spyPatientAdapter = spy(openMRSPatientAdapter);
        doReturn(mockPatient).when(spyPatientAdapter).getOpenmrsPatientByMotechId(mrsPatient.getMotechId());
        spyPatientAdapter.updatePatient(mrsPatient);
        final ArgumentCaptor<Patient> captor = ArgumentCaptor.forClass(Patient.class);
        verify(mockPatientService).savePatient(captor.capture());

        final Patient actualPatient = captor.getValue();

        assertThat(actualPatient.getPatientIdentifier().getIdentifier(), is(motechId));
        assertThat(actualPatient.getGivenName(), is(preferredName));
        assertThat(actualPatient.getMiddleName(), is(middleName));
        assertThat(actualPatient.getFamilyName(), is(lastName));
        assertThat(actualPatient.getAddresses().iterator().next().getAddress1(), is(address));
        assertThat(actualPatient.getBirthdate(), is(dateOfBirth));
        assertThat(actualPatient.getGender(), is(gender));
        assertThat(actualPatient.isBirthdateEstimated(), is(estimatedDate));
        assertThat(actualPatient.getAttribute(nhisNumberAttribute).getValue(), is(nhisNumber));
        assertThat(actualPatient.getAttribute(nhisExpirationDateAttribute).getValue(), is(nhisExpiryDateString));
        assertThat(actualPatient.getAttribute(insuredAttribute).getValue(), is(String.valueOf(insured)));
        assertThat(actualPatient.getPatientIdentifier().getLocation().getCountry(), is(facilityCountry));
        assertThat(actualPatient.getPatientIdentifier().getLocation().getRegion(), is(facilityRegion));
        assertThat(actualPatient.getPatientIdentifier().getLocation().getCountyDistrict(), is(facilityDistrict));
        assertThat(actualPatient.getPatientIdentifier().getLocation().getStateProvince(), is(facilitySubDistrict));
        assertThat(actualPatient.getPatientIdentifier().getLocation().getName(), is(facilityName));

    }
}