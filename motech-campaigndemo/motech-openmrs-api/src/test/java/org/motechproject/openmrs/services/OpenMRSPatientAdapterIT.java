package org.motechproject.openmrs.services;

import org.joda.time.LocalDate;
import org.junit.Test;
import org.motechproject.mrs.model.Attribute;
import org.motechproject.mrs.model.MRSFacility;
import org.motechproject.mrs.model.MRSPatient;
import org.motechproject.mrs.model.MRSPerson;
import org.motechproject.openmrs.OpenMRSIntegrationTestBase;
import org.motechproject.openmrs.util.PatientTestUtil;
import org.openmrs.Patient;
import org.openmrs.api.LocationService;
import org.openmrs.api.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;

public class OpenMRSPatientAdapterIT extends OpenMRSIntegrationTestBase {

    @Autowired
    private LocationService locationService;

    @Autowired
    private PatientService patientService;

    @Test
    @Transactional(readOnly = true)
    public void shouldSaveAPatientAndRetrieve() {

        final String first = "First";
        final String middle = "Middle";
        final String last = "Last";
        final String address1 = "a good street in ghana";
        final Date birthDate = new LocalDate(1970, 3, 11).toDate();
        final String gender = "M";
        Boolean birthDateEstimated = true;
        String motechId = "1234567";

        final MRSFacility savedFacility = facilityAdapter.saveFacility(new MRSFacility("name", "country", "region", "district", "province"));

        MRSPerson mrsPerson = new MRSPerson().firstName(first).middleName(middle).lastName(last).dateOfBirth(birthDate).birthDateEstimated(birthDateEstimated)
                .gender(gender).address(address1);
        final MRSPatient patient = new MRSPatient(motechId, mrsPerson, savedFacility);
        final MRSPatient savedPatient = patientAdapter.savePatient(patient);

        new PatientTestUtil().verifyReturnedPatient(first, middle, last, address1, birthDate, birthDateEstimated, gender, savedFacility, savedPatient, motechId);
    }

    @Test
    @Transactional(readOnly = true)
    public void shouldUpdateAPatient() {

        final String first = "First";
        final String middle = "Middle";
        final String last = "Last";
        final String address1 = "a good street in ghana";
        final Date birthDate = new LocalDate(1970, 3, 11).toDate();
        final String gender = "M";
        Boolean birthDateEstimated = true;
        String motechId = "1234567";

        final MRSPatient savedPatient = createMRSPatient(first, middle, last, address1, birthDate, gender, birthDateEstimated, motechId);

        final String updatedMiddleName = "new middle name";
        MRSPerson mrsPersonUpdated = new MRSPerson().firstName(first).middleName(updatedMiddleName).lastName(last).dateOfBirth(birthDate).birthDateEstimated(birthDateEstimated)
                .gender(gender).address("address changed").addAttribute(new Attribute("Insured", "true")).addAttribute(new Attribute("NHIS Number", "123465"));

        final MRSFacility changedFacility = facilityAdapter.saveFacility(new MRSFacility("name", "country", "region", null, null));
        final MRSPatient updatedPatient = new MRSPatient(savedPatient.getId(), "1234567", mrsPersonUpdated, changedFacility);
        final String updatedMotechId = patientAdapter.updatePatient(updatedPatient);

        assertThat(savedPatient.getMotechId(), is(equalTo(updatedMotechId)));
        assertThat(patientAdapter.getPatientByMotechId(savedPatient.getMotechId()).getPerson().getMiddleName(), is(equalTo(updatedMiddleName)));
    }

    private MRSPatient createMRSPatient(String first, String middle, String last, String address1, Date birthDate, String gender, Boolean birthDateEstimated, String motechId) {
        final MRSFacility savedFacility = facilityAdapter.saveFacility(new MRSFacility("name", "country", "region", "district", "province"));

        MRSPerson mrsPerson = new MRSPerson().firstName(first).middleName(middle).lastName(last).dateOfBirth(birthDate).birthDateEstimated(birthDateEstimated)
                .gender(gender).address(address1).addAttribute(new Attribute("Insured", "true"));
        final MRSPatient patient = new MRSPatient(motechId, mrsPerson, savedFacility);
        return patientAdapter.savePatient(patient);
    }

    @Test
    @Transactional(readOnly = true)
    public void shouldSearchPatientsByNameOrId() {
//        Should also handle when name is null in the DB for production records
        final String motechId1 = "423546";
        final String firstName1 = "Allan";
        final String middleName1 = "Ben";
        final String lastName1 = "Doug";

        final String motechId2 = "12356";
        final String firstName2 = "Ashley";
        final String middleName2 = "Brit";
        final String lastName2 = "Cathey";

        final String motechId3 = "7890";
        final String firstName3 = null;
        final String middleName3 = "nullFirstNameCheck1";
        final String lastName3 = "Douglas";

        final String motechId4 = "7891";
        final String firstName4 = null;
        final String middleName4 = "nullFirstNameCheck1";
        final String lastName4 = "Catherina";

        final String address = "a good street in ghana";
        final Date birthDate = new LocalDate(1970, 3, 11).toDate();
        final String gender = "M";
        Boolean birthDateEstimated = true;

        final MRSFacility savedFacility = facilityAdapter.saveFacility(new MRSFacility("name", "country", "region", "district", "province"));

        createPatientInOpenMrs(motechId1, firstName1, middleName1, lastName1, address, birthDate, gender, birthDateEstimated, savedFacility);
        createPatientInOpenMrs(motechId2, firstName2, middleName2, lastName2, address, birthDate, gender, birthDateEstimated, savedFacility);
        createPatientInOpenMrs(motechId3, firstName3, middleName3, lastName3, address, birthDate, gender, birthDateEstimated, savedFacility);
        createPatientInOpenMrs(motechId4, firstName4, middleName4, lastName4, address, birthDate, gender, birthDateEstimated, savedFacility);

        List<MRSPatient> returnedPatients = patientAdapter.search("A", null);

        new PatientTestUtil().verifyReturnedPatient(firstName1, middleName1, lastName1, address, birthDate, birthDateEstimated, gender, savedFacility, returnedPatients.get(0), motechId1);
        new PatientTestUtil().verifyReturnedPatient(firstName2, middleName2, lastName2, address, birthDate, birthDateEstimated, gender, savedFacility, returnedPatients.get(1), motechId2);
        assertThat(returnedPatients.size(), is(equalTo(2)));

        assertThat(patientAdapter.search("x", null), is(equalTo(Arrays.<MRSPatient>asList())));

        returnedPatients = patientAdapter.search("All", null);
        assertThat(returnedPatients.size(), is(equalTo(1)));
        new PatientTestUtil().verifyReturnedPatient(firstName1, middleName1, lastName1, address, birthDate, birthDateEstimated, gender, savedFacility, returnedPatients.get(0), motechId1);

        returnedPatients = patientAdapter.search("A", null);
        assertThat(returnedPatients.size(), is(equalTo(2)));

        returnedPatients = patientAdapter.search(null, "423546");
        assertThat(returnedPatients.size(), is(equalTo(1)));
        new PatientTestUtil().verifyReturnedPatient(firstName1, middleName1, lastName1, address, birthDate, birthDateEstimated, gender, savedFacility, returnedPatients.get(0), motechId1);

        returnedPatients = patientAdapter.search(null, "23");
        assertThat(returnedPatients.size(), is(equalTo(0)));

        assertThat(patientAdapter.search(null, "0000"), is(equalTo(Arrays.<MRSPatient>asList())));

        returnedPatients = patientAdapter.search("Ashley", "12356");
        assertThat(returnedPatients.size(), is(equalTo(1)));
        new PatientTestUtil().verifyReturnedPatient(firstName2, middleName2, lastName2, address, birthDate, birthDateEstimated, gender, savedFacility, returnedPatients.get(0), motechId2);

        //Both First Name Are null
        returnedPatients = patientAdapter.search("nullFirstNameCheck", null);
        assertThat(returnedPatients.size(), is(equalTo(2)));

        //One of the first name is null
        returnedPatients = patientAdapter.search("Doug", null);
        assertThat(returnedPatients.size(), is(equalTo(2)));
        returnedPatients = patientAdapter.search("Cath", null);
        assertThat(returnedPatients.size(), is(equalTo(2)));

        returnedPatients = patientAdapter.search("A", "123");
        assertThat(returnedPatients.size(), is(equalTo(0)));

        assertThat(patientAdapter.search("x", "0000"), is(equalTo(Arrays.<MRSPatient>asList())));
    }

    @Test
    @Transactional(readOnly = true)
    public void shouldSaveCauseOfDeath() {
        final String first = "First";
        final String middle = "Middle";
        final String last = "Last";
        final String address1 = "a good street in ghana";
        final Date birthDate = new LocalDate(1970, 3, 11).toDate();
        final String gender = "M";
        Boolean birthDateEstimated = true;
        String motechId = "1234567";

        final MRSPatient savedPatient = createMRSPatient(first, middle, last, address1, birthDate, gender, birthDateEstimated, motechId);

        Date dateOfDeath = new Date();
        patientAdapter.savePatientCauseOfDeathObservation(savedPatient.getId(), "NONE", dateOfDeath, null);

        Patient actualPatient = patientService.getPatient(Integer.valueOf(savedPatient.getId()));
        assertThat(actualPatient.isDead(), is(true));
    }


    private MRSPatient createPatientInOpenMrs(String motechId, String firstName, String middleName, String lastName, String address, Date birthDate, String gender, Boolean birthDateEstimated, MRSFacility savedFacility) {

        MRSPerson mrsPerson = new MRSPerson().firstName(firstName).middleName(middleName).lastName(lastName).dateOfBirth(birthDate).birthDateEstimated(birthDateEstimated)
                .gender(gender).address(address);
        final MRSPatient patient = new MRSPatient(motechId, mrsPerson, savedFacility);
        return patientAdapter.savePatient(patient);
    }
}
