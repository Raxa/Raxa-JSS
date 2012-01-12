/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jss.data;

import org.jss.restClient.ConceptClass;
import org.jss.restClient.ConceptDatatype;
import au.com.bytecode.opencsv.CSVReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Date;
import org.json.JSONException;
import org.jss.restClient.OpenMRSRestClient;
import org.jss.restClient.OpenMRSDataClient;

/**
 *
 * @author manorlev-tov
 */
public class JSSSetupData {

    private OpenMRSDataClient client;

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args)
            throws Exception {
        //        client = new OpenMRSDataClient(new OpenMRSRestClient("http://raxaemr.jelastic.servint.net/openmrs", "admin", "Hello123"));
        JSSSetupData sd = new JSSSetupData(new OpenMRSDataClient(new OpenMRSRestClient("http://localhost:8000/openmrs-standalone/", "admin", "Lasdfe3#")));
        sd.run();
    }

    public JSSSetupData(OpenMRSDataClient client) {
        this.client = client;

    }
    
    public void run()
            throws JSONException, IOException{
//        setUpPersonAttributes();
        setUpConcepts();
//
//        setUpLocations("locations.csv");
//        setUpCastes("castes.csv");
//        setUpJssLegacyMetaData();
        
    }

    public void setUpPersonAttributes()
            throws JSONException, IOException {
        //TODO: Add concept foreign keys
        client.addPersonAttributeType("FHFirstName", "Father/Husband First Name", "java.lang.String", false);
        client.addPersonAttributeType("FHLastName", "Father/Husband Last Name", "java.lang.String", false);
        client.addPersonAttributeType("Contact Number", "Phone number for contacting the individual", "java.lang.String", false);
        client.addPersonAttributeType("Contact number person", "The person who is available at the contact number", "java.lang.String", false);
        client.addPersonAttributeType("Contact number type", "Contact Number Type (Landline or cellphone)", "org.openmrs.Concept", false);
        client.addPersonAttributeType("Contact at given number", "Can the individual be contacted at the given number", "java.lang.Boolean", false);
        client.addPersonAttributeType("Caste", "The Caste of the individual", "org.openmrs.Concept", false);
        client.addPersonAttributeType("Referral", "Who referred the individual", "org.openmrs.Concept", false);
        client.addPersonAttributeType("Referal subcenter", "Which subcenter referred the individual", "org.openmrs.Concept", false);
        client.addPersonAttributeType("Referal doctor", "Which doctor referred the individual", "java.lang.String", false);
        client.addPersonAttributeType("Complaint", "The individual's complaint", "java.lang.String", false);
        client.addPersonAttributeType("Registry Type", "The type of registration", "org.openmrs.Concept", false);
        client.addPersonAttributeType("Accompanying person UUID", "The UUID of the accompanying person", "java.lang.String", false);
        client.addPersonAttributeType("Patient Status", "The status of the patient", "org.openmrs.Concept", false);
        client.addPersonAttributeType("Education", "How much eduction the person has", "java.lang.String", false);
        client.addPersonAttributeType("Occupation", "The person's occupation", "java.lang.String", false);


    }

    public void setUpConcepts()
            throws JSONException, IOException {
        client.addConcept("CONTACT NUMBER TYPE", ConceptDatatype.CODED, ConceptClass.QUESTION, false);
        client.addConcept("LANDLINE", ConceptDatatype.NA, ConceptClass.MISC, false);
        client.addConcept("CELLPHONE", ConceptDatatype.NA, ConceptClass.MISC, false);

        client.addConcept("REFERRAL", ConceptDatatype.CODED, ConceptClass.QUESTION, false);
        client.addConcept("SELF", ConceptDatatype.NA, ConceptClass.MISC, false);
        client.addConcept("DOCTOR", ConceptDatatype.NA, ConceptClass.MISC, false);
        client.addConcept("SUB CENTER", ConceptDatatype.NA, ConceptClass.MISC, false);

        client.addConcept("SUB CENTER", ConceptDatatype.CODED, ConceptClass.QUESTION, false);

        client.addConcept("REGISTRY TYPE", ConceptDatatype.CODED, ConceptClass.QUESTION, false);
        client.addConcept("TB", ConceptDatatype.NA, ConceptClass.MISC, false);
        client.addConcept("DIABETES", ConceptDatatype.NA, ConceptClass.MISC, false);
        client.addConcept("RHUEMATIC HEART DISEASE", ConceptDatatype.NA, ConceptClass.MISC, false);
        client.addConcept("HIV", ConceptDatatype.NA, ConceptClass.MISC, false);
        client.addConcept("CANCER", ConceptDatatype.NA, ConceptClass.MISC, false);

        client.addConcept("PATIENT STATUS", ConceptDatatype.CODED, ConceptClass.QUESTION, false);
        client.addConcept("SCREENING ROOM", ConceptDatatype.NA, ConceptClass.MISC, false);
        client.addConcept("OPD", ConceptDatatype.NA, ConceptClass.MISC, false);
        client.addConcept("IPD", ConceptDatatype.NA, ConceptClass.MISC, false);
        client.addConcept("SURGERY", ConceptDatatype.NA, ConceptClass.MISC, false);
        client.addConcept("DISCHARGED", ConceptDatatype.NA, ConceptClass.MISC, false);
        client.addConcept("TUM", ConceptDatatype.NA, ConceptClass.MISC, false);
        client.addConcept("PAR", ConceptDatatype.NA, ConceptClass.MISC, false);
        client.addConcept("PED TUM", ConceptDatatype.NA, ConceptClass.MISC, false);

        client.addConcept("CANCER CODE", ConceptDatatype.CODED, ConceptClass.QUESTION, true);
        client.addConcept("BONE", ConceptDatatype.CODED, ConceptClass.QUESTION, true);
        client.addConcept("HEADNECK", ConceptDatatype.CODED, ConceptClass.QUESTION, true);
        client.addConcept("PENIS", ConceptDatatype.NA, ConceptClass.MISC, true);
        client.addConcept("URINARY", ConceptDatatype.NA, ConceptClass.MISC, true);
        client.addConcept("THYROID", ConceptDatatype.NA, ConceptClass.MISC, true);
        client.addConcept("THIRD", ConceptDatatype.NA, ConceptClass.MISC, true);
        client.addConcept("STOMACH", ConceptDatatype.NA, ConceptClass.MISC, true);
        client.addConcept("SALIVERY", ConceptDatatype.NA, ConceptClass.MISC, true);  
        client.addConcept("NEURO PEDIATRIC", ConceptDatatype.NA, ConceptClass.MISC, true);
        client.addConcept("TUMOR", ConceptDatatype.NA, ConceptClass.MISC, true);
        client.addConcept("GASTROINTESTINAL", ConceptDatatype.NA, ConceptClass.MISC, true);
        client.addConcept("SKIN", ConceptDatatype.NA, ConceptClass.MISC, true);
        client.addConcept("CERVIX", ConceptDatatype.NA, ConceptClass.MISC, true);
        client.addConcept("ORAL", ConceptDatatype.NA, ConceptClass.MISC, true);
        client.addConcept("RESPERATORY TRACT", ConceptDatatype.NA, ConceptClass.MISC, true);
        client.addConcept("OVARY", ConceptDatatype.NA, ConceptClass.MISC, true);
        client.addConcept("BREAST", ConceptDatatype.NA, ConceptClass.MISC, true);
        client.addConcept("HEMATOLOGY", ConceptDatatype.NA, ConceptClass.MISC, true);
        client.addConcept("NON HODGKINS LYMPHOMA", ConceptDatatype.NA, ConceptClass.MISC, true);
        client.addConcept("GENITOURINARY", ConceptDatatype.NA, ConceptClass.MISC, true);
        client.addConcept("CHRONIC MYELOGENOUS LEUKEMIA", ConceptDatatype.NA, ConceptClass.MISC, true);

        client.addConcept("DIAGNOSIS", ConceptDatatype.TEXT, ConceptClass.DIAGNOSIS, true);
        client.addConcept("ADVICE", ConceptDatatype.TEXT, ConceptClass.QUESTION, true);
        client.addConcept("FOLLOW UP PROCEDURE", ConceptDatatype.TEXT, ConceptClass.PROCEDURE, true);
        client.addConcept("NEXT DATE", ConceptDatatype.DATE, ConceptClass.MISC, true);
    }

    public void setUpLocations(String locationFilePath)
            throws FileNotFoundException, IOException, JSONException {

        final String STATENAME = "Chhattisgarh";
        CSVReader csvReader = new CSVReader(new InputStreamReader(new FileInputStream(locationFilePath)));
        String[] line;

        // ingore header row
        csvReader.readNext();
        // File format is VillageName,VillageID,GramPanch,TahsilName,TahsilID,District,DistrictID,StateName,StateID
        // ordered by TahsilID, VillageID
        String currentStateUuid = client.addLocationState(STATENAME);
        String currentDistrictUuid = "";
        String currentTahsilUuid = "";
        while ((line = csvReader.readNext()) != null) {
            if (client.isNull(line[4])) {
                //If there is no Tahsil info, this is a DÏistrict
                currentDistrictUuid = client.addLocationDistrict(currentStateUuid, line[5].trim(), line[6].trim(), STATENAME);
            } else if (client.isNull(line[1])) {
                //If there is no Village info, this is a Tahsil
                currentTahsilUuid = client.addLocationTahsil(currentDistrictUuid, line[3].trim(), line[4].trim(), line[5].trim(), line[6].trim(), STATENAME);
            } else {
                //This must be a village
                client.addLocationVillage(currentTahsilUuid, line[0].trim(), line[1].trim(), (client.isNull(line[2])) ? "" : line[2].trim(), line[3].trim(), line[4].trim(), line[5].trim(), line[6].trim(), STATENAME);
            }
        }
    }

    private void setUpCastes(String casteFilePath) throws FileNotFoundException, IOException, JSONException {
        CSVReader csvReader = new CSVReader(new InputStreamReader(new FileInputStream(casteFilePath)));
        String[] line;
        while ((line = csvReader.readNext()) != null) {
            client.addConcept(line[1], ConceptDatatype.NA, ConceptClass.MISC, true);
        }
    }

    private void setUpJssLegacyMetaData() throws IOException, JSONException{
//        client.addEncounterType("JSS Registration Encounter", "An encounter wit the JSS Registration team in which vitals are measured");
        client.addNonPatient("JSS Registration", "Generic Provider", "M", new Date());
    }
}
