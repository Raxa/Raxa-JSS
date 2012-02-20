package org.motechproject.openmrs.services;

import org.joda.time.LocalDate;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.motechproject.mrs.model.*;
import org.openmrs.*;
import org.openmrs.api.EncounterService;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.*;

import static junit.framework.Assert.assertNull;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;


public class OpenMRSEncounterAdapterTest {
    OpenMRSEncounterAdapter encounterAdapter;
    @Mock
    private OpenMRSUserAdapter mockOpenMrsUserAdapter;
    @Mock
    private OpenMRSFacilityAdapter mockOpenMrsFacilityAdapter;
    @Mock
    private OpenMRSPatientAdapter mockOpenMrsPatientAdapter;
    @Mock
    private OpenMRSObservationAdapter mockOpenMrsObservationAdapter;
    @Mock
    private EncounterService mockEncounterService;
    @Mock
    private OpenMRSPersonAdapter mockOpenMRSPersonAdapter;

    @Before
    public void setUp() {
        initMocks(this);
        encounterAdapter = new OpenMRSEncounterAdapter();
        ReflectionTestUtils.setField(encounterAdapter, "openMRSUserAdapter", mockOpenMrsUserAdapter);
        ReflectionTestUtils.setField(encounterAdapter, "openMRSFacilityAdapter", mockOpenMrsFacilityAdapter);
        ReflectionTestUtils.setField(encounterAdapter, "openMRSPatientAdapter", mockOpenMrsPatientAdapter);
        ReflectionTestUtils.setField(encounterAdapter, "openMRSObservationAdapter", mockOpenMrsObservationAdapter);
        ReflectionTestUtils.setField(encounterAdapter, "encounterService", mockEncounterService);
        ReflectionTestUtils.setField(encounterAdapter, "openMRSPersonAdapter", mockOpenMRSPersonAdapter);
    }

    @Test
    public void shouldConvertMrsEncounterToOpenMrsEncounter() {
        String staffId = "333";
        String facilityId = "99";
        String patientId = "199";
        String providerId = "100";
        MRSUser staff = new MRSUser().id(staffId);
        MRSFacility facility = new MRSFacility(facilityId);
        MRSPatient patient = new MRSPatient(patientId);
        Set<MRSObservation> observations = Collections.EMPTY_SET;

        String encounterType = "encounterType";
        String encounterId = "100";

        Date encounterDate = Calendar.getInstance().getTime();
        MRSPerson provider = new MRSPerson().id(providerId);
        MRSEncounter mrsEncounter = new MRSEncounter(encounterId, provider, staff, facility, encounterDate, patient, observations, encounterType);

        Location expectedLocation = mock(Location.class);
        when(mockOpenMrsFacilityAdapter.getLocation(facilityId)).thenReturn(expectedLocation);

        org.openmrs.Patient expectedPatient = mock(org.openmrs.Patient.class);
        when(mockOpenMrsPatientAdapter.getOpenMrsPatient(patientId)).thenReturn(expectedPatient);

        org.openmrs.User expectedCreator = mock(org.openmrs.User.class);
        Person expectedPerson = mock(Person.class);
        when(mockOpenMrsUserAdapter.getOpenMrsUserById(staffId)).thenReturn(expectedCreator);
        when(expectedCreator.getPerson()).thenReturn(expectedPerson);

        Person expectedProvider = mock(Person.class);
        when(mockOpenMRSPersonAdapter.getPersonById(providerId)).thenReturn(expectedProvider);

        EncounterType expectedEncounterType = mock(EncounterType.class);
        when(mockEncounterService.getEncounterType(encounterType)).thenReturn(expectedEncounterType);

        Set<Obs> expectedObservations = new HashSet<Obs>();
        Encounter expectedEncounter = mock(Encounter.class);

        when(mockOpenMrsObservationAdapter.createOpenMRSObservationsForEncounter(observations, expectedEncounter, expectedPatient, expectedLocation, expectedCreator)).thenReturn(expectedObservations);

        Encounter returnedEncounter = encounterAdapter.mrsToOpenMRSEncounter(mrsEncounter);

        assertThat(returnedEncounter.getLocation(), is(equalTo(expectedLocation)));
        assertThat(returnedEncounter.getPatient(), is(equalTo(expectedPatient)));
        assertThat(returnedEncounter.getCreator(), is(equalTo(expectedCreator)));
        assertThat(returnedEncounter.getProvider(), is(equalTo(expectedProvider)));
        assertThat(returnedEncounter.getEncounterDatetime(), is(equalTo(encounterDate)));
        assertThat(returnedEncounter.getEncounterType(), is(equalTo(expectedEncounterType)));
        assertThat(returnedEncounter.getObs(), is(equalTo(expectedObservations)));
    }

    @Test
    public void shouldConvertOpenMRSEncounterToMRSEncounter() {

        String encounterTypeName = "ANCVisit";
        EncounterType openMrsEncounterType = new EncounterType(encounterTypeName, "Ghana Antenatal Care (ANC) Visit");
        HashSet<Obs> openMrsObservations = new HashSet<Obs>();
        org.openmrs.Patient mockOpenMRSPatient = mock(org.openmrs.Patient.class);
        org.openmrs.User mockOpenMRSUser = mock(org.openmrs.User.class);
        Location mockLocation = mock(Location.class);
        int encounterId = 12;
        Date encounterDate = new LocalDate(2011, 12, 12).toDate();
        MRSFacility mrsfacility = mock(MRSFacility.class);
        MRSPatient mrspatient = mock(MRSPatient.class);


        Set<MRSObservation> mrsObservations = new HashSet<MRSObservation>() {{
            MRSObservation mockObservation = mock(MRSObservation.class);
            add(mockObservation);
        }};
        Integer providerId = 1;
        String systemId = "admin";
        when(mockOpenMRSUser.getSystemId()).thenReturn(systemId);
        Person mockOpenMRSPerson = mock(Person.class);
        when(mockOpenMRSPerson.getId()).thenReturn(providerId);
        Encounter openMrsEncounter = createOpenMRSEncounter(encounterDate, openMrsEncounterType, openMrsObservations, mockOpenMRSPatient, mockOpenMRSUser, mockLocation, encounterId);
         openMrsEncounter.setProvider(mockOpenMRSPerson);
        openMrsEncounter.setCreator(mockOpenMRSUser);
        when(mockOpenMrsFacilityAdapter.convertLocationToFacility(mockLocation)).thenReturn(mrsfacility);
        when(mockOpenMrsPatientAdapter.getMrsPatient(mockOpenMRSPatient)).thenReturn(mrspatient);
        when(mockOpenMrsObservationAdapter.convertOpenMRSToMRSObservations(openMrsObservations)).thenReturn(mrsObservations);

        MRSEncounter mrsEncounter = encounterAdapter.openmrsToMrsEncounter(openMrsEncounter);

        assertThat(mrsEncounter.getId(), is(equalTo(Integer.toString(encounterId))));
        assertThat(mrsEncounter.getEncounterType(), is(equalTo(encounterTypeName)));
        assertThat(mrsEncounter.getCreator().getSystemId(), is(equalTo(systemId)));
        assertThat(mrsEncounter.getProvider().getId(), is(equalTo(providerId.toString())));
        assertThat(mrsEncounter.getPatient(), is(equalTo(mrspatient)));
        assertThat(mrsEncounter.getDate(), is(equalTo(encounterDate)));
        assertThat(mrsEncounter.getFacility(), is(equalTo(mrsfacility)));
        assertThat(mrsEncounter.getObservations(), is(equalTo(mrsObservations)));
    }

    private Encounter createOpenMRSEncounter(Date encounterDate, EncounterType openMrsEncounterType, HashSet<Obs> openMrsObservations, org.openmrs.Patient mockOpenMRSPatient, org.openmrs.User mockOpenMRSUser, Location mockLocation, int encounterId) {
        Encounter openMrsEncounter = new Encounter();
        openMrsEncounter.setId(encounterId);
        openMrsEncounter.setObs(openMrsObservations);
        openMrsEncounter.setEncounterType(openMrsEncounterType);
        openMrsEncounter.setCreator(mockOpenMRSUser);
        openMrsEncounter.setLocation(mockLocation);
        openMrsEncounter.setPatient(mockOpenMRSPatient);
        openMrsEncounter.setEncounterDatetime(encounterDate);
        return openMrsEncounter;
    }

    @Test
    public void shouldSaveAnEncounter() {
        OpenMRSEncounterAdapter encounterAdapterSpy = spy(encounterAdapter);
        Encounter openMrsEncounter = mock(Encounter.class);
        MRSEncounter mrsEncounter = mock(MRSEncounter.class);
        Encounter savedOpenMrsEncounter = mock(Encounter.class);
        MRSEncounter savedMrsEncounter = mock(MRSEncounter.class);

        doReturn(openMrsEncounter).when(encounterAdapterSpy).mrsToOpenMRSEncounter(mrsEncounter);
        when(mockEncounterService.saveEncounter(openMrsEncounter)).thenReturn(savedOpenMrsEncounter);
        doReturn(savedMrsEncounter).when(encounterAdapterSpy).openmrsToMrsEncounter(savedOpenMrsEncounter);

        MRSEncounter returnedMRSEncounterAfterSaving = encounterAdapterSpy.createEncounter(mrsEncounter);
        assertThat(returnedMRSEncounterAfterSaving, is(equalTo(savedMrsEncounter)));
    }

    @Test
    public void shouldFetchLatestEncounterForMotechId() {
        String encounterType = "Encounter Type";
        String motechId = "1234567";
        encounterAdapter.getLatestEncounterByPatientMotechId(motechId, encounterType);
        verify(mockEncounterService).getEncountersByPatientIdentifier(motechId);
    }

    @Test
    public void shouldFetchTheLatestEncounterIfThereAreMoreThanOneEncounters() {
        String encounterName = "Encounter Type";
        String motechId = "1234567";
        Encounter encounter1 = new Encounter(1);
        EncounterType encounterType1 = new EncounterType();
        encounterType1.setName(encounterName);
        encounter1.setEncounterType(encounterType1);
        Date encounterDatetime1 = new Date(1999, 11, 2);
        encounter1.setEncounterDatetime(encounterDatetime1);
        encounter1.setCreator(new User(12));
        encounter1.setProvider(new Person());
        Encounter encounter2 = new Encounter(2);
        encounter2.setEncounterType(encounterType1);
        encounter2.setEncounterDatetime(new Date(1998, 11, 6));

        when(mockEncounterService.getEncountersByPatientIdentifier(motechId)).thenReturn(Arrays.asList(encounter1, encounter2));
        MRSEncounter actualEncounter = encounterAdapter.getLatestEncounterByPatientMotechId(motechId, encounterName);

        assertThat(actualEncounter.getDate(), is(equalTo(encounterDatetime1)));
    }

    @Test
    public void shouldReturnNullIfEncounterIsNotFound() {
        final String motechId = "1332";
        final String encounterName = "patientRegistration";
        when(mockEncounterService.getEncountersByPatientIdentifier(motechId)).thenReturn(Collections.<Encounter>emptyList());
        MRSEncounter patientRegistration = encounterAdapter.getLatestEncounterByPatientMotechId(motechId, encounterName);
        assertNull(patientRegistration);
    }
}
