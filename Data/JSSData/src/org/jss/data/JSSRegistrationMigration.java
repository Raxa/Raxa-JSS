/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jss.data;

import au.com.bytecode.opencsv.CSVReader;
import com.healthmarketscience.jackcess.Database;
import com.healthmarketscience.jackcess.Table;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import org.json.JSONException;
import org.jss.restClient.OpenMRSDataClient;
import org.jss.restClient.OpenMRSRestClient;
import org.jss.restClient.SubCenterLocation;

/**
 *
 * @author manorlev-tov
 */
public class JSSRegistrationMigration {

    private File mdbFile;
    private OpenMRSDataClient client;
    private Map<String, String> attributes = new HashMap<String, String>();
    private Map<Integer, String> casteIDs;
    private Map<Integer, String[]> locationIDs;

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args)
            throws Exception {
        JSSRegistrationMigration j = new JSSRegistrationMigration(new OpenMRSDataClient(new OpenMRSRestClient("http://localhost:8000/openmrs-standalone/", "admin", "Lasdfe3#"), true),
                new File("/Users/manorlev-tov/Downloads/db1.mdb"));
        j.migrateData();
    }

    public JSSRegistrationMigration(OpenMRSDataClient client, File mdbFile) throws IOException, JSONException {
        this.mdbFile = mdbFile;
        this.client = client;
        populateAttributes();
    }

    private void populateAttributes() {
        attributes.put("FHNAME", "FHFirstName");
        attributes.put("EDUCATION", "Education");
        attributes.put("OCCUPATION", "Occupation");
    }

    public void migrateData()
            throws IOException, JSONException {
        Table registrationData = Database.open(mdbFile).getTable("RegistrationMaster");
        for (Map<String, Object> row : registrationData) {
            SubCenterLocation regLocation;
            String registrationNumber;
            String regEntry = (String) row.get("REG_NO");
            String RegEntryLocation = regEntry.substring(regEntry.lastIndexOf("/") + 1);
            if (RegEntryLocation.startsWith("B") || RegEntryLocation.startsWith("b")) {
                regLocation = SubCenterLocation.BAMHANI;
            } else if (RegEntryLocation.startsWith("SH") || RegEntryLocation.startsWith("Sh") || RegEntryLocation.startsWith("sh")) {
                regLocation = SubCenterLocation.SHIVTARAI;
            } else if (RegEntryLocation.startsWith("SE") || RegEntryLocation.startsWith("Se") || RegEntryLocation.startsWith("se")) {
                regLocation = SubCenterLocation.SEMARIYA;
            } else {
                regLocation = SubCenterLocation.GANIYARI;
            }
            registrationNumber = regEntry.substring(0, regEntry.indexOf("/"));
            
            String patientUuid = client.addPatient((String) row.get("FNAME"), (String) row.get("LNAME"), Util.pad(registrationNumber), regLocation, (String) row.get("P_SEX"), (Date) row.get("P_DOB"));
            for (Map.Entry<String, String> attribute : attributes.entrySet()) {
                String value = (String) row.get(attribute.getKey());
                if (!client.isNull(value)) {
                    client.addPersonAttribute(patientUuid, attribute.getValue(), value);
                }
            }

            // Add Caste
            String casteValue = getCasteName((Integer) row.get("CasteID"));
            if (!client.isNull(casteValue)) {
                client.addPersonAttributeConcept(patientUuid, "Caste", casteValue);
            }

            // Add Location
            String[] locationArray = getLocationArray((Integer) row.get("VillageID"));
            if (locationArray != null) {
                client.addPersonAddress(patientUuid,
                        locationArray[0],
                        locationArray[1],
                        locationArray[2],
                        locationArray[3]);
            } else {
                client.addPersonAddress(patientUuid,
                        (String) row.get("VILLAGE"),
                        (String) row.get("Tahsil"),
                        (String) row.get("CITY"),
                        "Chhattisgarh");
            }
            
            //Is this a TB Patient?
            if (!((String)row.get("P_TB")).equals("0")){
                client.addPersonAttributeConcept(patientUuid, "REGISTRY TYPE", "TUBERCULOSIS");
            }
            
            // Add weight observation
            String weight = (String)row.get("P_WEIGHT");
            if (!client.isNull(weight)) {
                client.addRegistrationObservation(patientUuid, (Date)row.get("REG_DATE"), regLocation, "WEIGHT (KG)", weight);
            }
        }
    }

    private void loadCasteIDs() throws FileNotFoundException, IOException {
        casteIDs = new HashMap<Integer, String>();
        CSVReader csvReader = new CSVReader(new InputStreamReader(new FileInputStream("castes.csv")));
        String[] line;
        while ((line = csvReader.readNext()) != null) {
            casteIDs.put(Integer.valueOf(line[0]), line[1]);
        }
    }

    private String getCasteName(Integer casteID) throws FileNotFoundException, IOException {
        if (casteIDs == null) {
            loadCasteIDs();
        }
        return casteIDs.get(casteID);
    }

    private void loadLocationIDs() throws FileNotFoundException, IOException {
        locationIDs = new HashMap<Integer, String[]>();
        CSVReader csvReader = new CSVReader(new InputStreamReader(new FileInputStream("locations.csv")));
        String[] line;
        csvReader.readNext();
        while ((line = csvReader.readNext()) != null) {
            if (line.length == 10) {
                String idString = line[9];
                if (!client.isNull(idString)) {
                    String[] locationArray = new String[4];
                    locationArray[0] = line[7].trim();
                    locationArray[1] = line[5].trim();
                    locationArray[2] = line[3].trim();
                    locationArray[3] = line[0].trim();
                    locationIDs.put(Integer.valueOf(idString), locationArray);
                }
            }
        }
    }

    private String[] getLocationArray(Integer villageID) throws FileNotFoundException, IOException {
        if (locationIDs == null) {
            loadLocationIDs();
        }
        return locationIDs.get(villageID);
    }
 }
