package org.motechproject.openmrs.services;

import ch.lambdaj.Lambda;
import ch.lambdaj.function.matcher.LambdaJMatcher;
import org.apache.commons.lang.builder.EqualsBuilder;
import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.junit.Test;
import org.motechproject.mrs.exception.UserAlreadyExistsException;
import org.motechproject.mrs.model.*;
import org.motechproject.mrs.services.MRSEncounterAdapter;
import org.motechproject.openmrs.OpenMRSIntegrationTestBase;
import org.openmrs.api.ConceptService;
import org.openmrs.api.EncounterService;
import org.openmrs.api.PatientService;
import org.openmrs.api.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static junit.framework.Assert.assertEquals;
import static org.apache.commons.collections.CollectionUtils.isNotEmpty;
import static org.junit.Assert.assertTrue;
import static org.motechproject.openmrs.services.OpenMRSUserAdapter.USER_KEY;

public class OpenMRSEncounterAdapterIT extends OpenMRSIntegrationTestBase {

    @Autowired
    MRSEncounterAdapter mrsEncounterAdapter;
    @Autowired
    EncounterService encounterService;
    @Autowired
    PatientService patientService;
    @Autowired
    UserService userService;
    @Autowired
    ConceptService conceptService;

    MRSFacility facility;
    MRSPatient patientAlan;

    public void doOnceBefore() {
        facility = facilityAdapter.saveFacility(new MRSFacility("name", "country", "region", "district", "province"));
    }

    @Test
    @Transactional(readOnly = true)
    public void shouldSaveEncounterWithObservationsAndReturn() throws UserAlreadyExistsException {

        MRSPerson personCreator = new MRSPerson().firstName("SampleTest");
        MRSPerson personJohn = new MRSPerson().firstName("John");
        patientAlan = createPatient(facility);
        MRSUser userCreator = createUser(new MRSUser().userName("UserSuper").systemId("1000015").securityRole("Provider").person(personCreator));
        MRSUser userJohn = createUser(new MRSUser().userName("UserJohn").systemId("1000027").securityRole("Provider").person(personJohn));
        MRSPerson provider = userJohn.getPerson();

        Set<MRSObservation> observations = new HashSet<MRSObservation>();
        observations.add(new MRSObservation(new Date(), "GRAVIDA", Double.valueOf("100.0")));
        observations.add(new MRSObservation(new Date(), "SERIAL NUMBER", "free text data serail number"));
        observations.add(new MRSObservation(new Date(), "NEXT ANC DATE", new DateTime(2012, 11, 10, 1, 10).toDate()));
        observations.add(new MRSObservation(new Date(), "PREGNANCY STATUS", false));
        final String encounterType = "PEDSRETURN";
        MRSEncounter expectedEncounter = new MRSEncounter(provider.getId(), userCreator.getId(), facility.getId(), new Date(), patientAlan.getId(), observations, encounterType);
        MRSEncounter actualMRSEncounter = mrsEncounterAdapter.createEncounter(expectedEncounter);
        compareEncounters(expectedEncounter, actualMRSEncounter);

        final MRSEncounter mrsEncounter = mrsEncounterAdapter.getLatestEncounterByPatientMotechId(patientAlan.getMotechId(), encounterType);
        compareEncounters(expectedEncounter, mrsEncounter);
    }

    private void compareEncounters(MRSEncounter expectedEncounter, MRSEncounter actualMRSEncounter) {
        assertEquals(expectedEncounter.getDate(), actualMRSEncounter.getDate());
        assertEquals(expectedEncounter.getCreator().getId(), actualMRSEncounter.getCreator().getId());
        assertEquals(expectedEncounter.getProvider().getId(), actualMRSEncounter.getProvider().getId());
        assertEquals(expectedEncounter.getFacility().getId(), actualMRSEncounter.getFacility().getId());
        assertEquals(expectedEncounter.getEncounterType(), actualMRSEncounter.getEncounterType());
        assertEquals(expectedEncounter.getPatient().getId(), actualMRSEncounter.getPatient().getId());
        assertObservation(expectedEncounter.getObservations(), actualMRSEncounter.getObservations());
    }

    private MRSPatient createPatient(MRSFacility facility) {
        final String first = "AlanTest";
        final String middle = "Wilkinson";
        final String last = "no";
        final String address1 = "a good street in ghana";
        final Date birthDate = new LocalDate(1970, 3, 11).toDate();
        final String gender = "M";
        Boolean birthDateEstimated = true;
        String patientSystemId = "1000004";

        MRSPerson mrsPerson = new MRSPerson().firstName(first).lastName(last).middleName(middle).preferredName("prefName").
                birthDateEstimated(birthDateEstimated).dateOfBirth(birthDate).address(address1).gender(gender);
        final MRSPatient patient = new MRSPatient(patientSystemId, mrsPerson, facility);
        return patientAdapter.savePatient(patient);
    }

    private void assertObservation(Set<MRSObservation> expectedSet, Set<MRSObservation> actualSet) {
        assertEquals(expectedSet.size(), actualSet.size());
        for (MRSObservation actual : actualSet) {
            assertTrue("Observation not same" + actual + " - expected set is " + expectedSet, isObservationPresent(expectedSet, actual));
        }
    }

    private boolean isObservationPresent(Set<MRSObservation> expectedSet, final MRSObservation actual) {
        List<MRSObservation> mrsObservations = Lambda.select(expectedSet, new LambdaJMatcher<MRSObservation>() {

            @Override
            public boolean matches(Object o) {
                MRSObservation expected = (MRSObservation) o;
                return assertObservation(expected, actual);
            }
        });
        return isNotEmpty(mrsObservations) && mrsObservations.get(0) != null;
    }

    private boolean assertObservation(MRSObservation expected, MRSObservation actual) {
        return new EqualsBuilder().append(expected.getConceptName(), actual.getConceptName())
                .append(expected.getDate(), actual.getDate())
                .append(expected.getValue(), actual.getValue()).isEquals();
    }

    private MRSUser createUser(MRSUser userCreator) throws UserAlreadyExistsException {
        userCreator = (MRSUser) userAdapter.saveUser(userCreator).get(USER_KEY);
        return userCreator;
    }
}
