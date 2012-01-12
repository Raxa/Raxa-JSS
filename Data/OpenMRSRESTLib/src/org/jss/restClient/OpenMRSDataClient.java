/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jss.restClient;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import org.apache.commons.lang3.StringEscapeUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONStringer;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;

/**
 *
 * @author manorlev-tov
 */
public class OpenMRSDataClient {

    private final OpenMRSRestClient client;
    private final BaseData baseData;
    private final boolean verbose;
    private final SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");

    public OpenMRSDataClient(OpenMRSRestClient client)
            throws IOException, JSONException {
        this(client, false);
    }

    public OpenMRSDataClient(OpenMRSRestClient client, boolean verbose)
            throws IOException, JSONException {
        this.client = client;
        this.verbose = verbose;
        this.baseData = new BaseData(client);
    }

    public void addPersonAttributeType(String name, String description, String format, boolean searchable)
            throws JSONException, IOException {
        // only add if it does not already exist
        if (client.getObjectBySearch("personattributetype", StringEscapeUtils.escapeHtml3(name)).isEmpty()) {
            JSONStringer jsRequest = new JSONStringer();
            jsRequest.object();
            jsRequest.key("name").value(name);
            jsRequest.key("description").value(description);
            jsRequest.key("format").value(format);
            jsRequest.key("searchable").value(searchable);
            jsRequest.endObject();
            createAndPrintResult("personattributetype", jsRequest);
        }
    }

    public void addPersonAddress(String personUuid, String stateName, String districtName, String tahsilName, String villageName)
            throws IOException, JSONException {
        JSONObject location = baseData.getLocationJson(stateName, districtName, tahsilName, villageName);
        if (location != null) {
            JSONStringer jsRequest = new JSONStringer();
            jsRequest.object();
            jsRequest.key("cityVillage").value(location.getString("cityVillage"));
            jsRequest.key("address1").value(location.getString("address1"));
            jsRequest.key("countyDistrict").value(location.getString("countyDistrict"));
            jsRequest.key("stateProvince").value(location.getString("stateProvince"));
            jsRequest.key("address2").value(location.getString("address1"));
            jsRequest.key("address3").value(location.getString("address1"));
            jsRequest.key("address5").value(location.getString("address1"));
            jsRequest.key("address6").value(location.getString("address1"));
            jsRequest.key("country").value("India");
            jsRequest.key("preferred").value(true);
        }
    }

    public void addPersonAttributeConcept(String personUuid, String name, String value)
            throws IOException, JSONException {
        addPersonAttribute(personUuid, name, baseData.getConceptUuid(value));
    }

    public void addPersonAttribute(String personUuid, String name, String value)
            throws IOException, JSONException {
        String attributeTypeUuid = baseData.getPersonAttributeTypeUuid(name);
        JSONObject personJson = client.getObjectByUUID("person", personUuid);

        // Does attributeType already exist for this person
        boolean exists = false;
        JSONArray attributes = personJson.getJSONArray("attributes");
        for (int x = 0; x < attributes.length(); x++) {
            JSONObject attribute = attributes.getJSONObject(x);
            String display = attribute.getString("display");
            if (display.equals(name + " = " + value)) {
                exists = true;
                break;
            }
        }

        if (!exists) {
            JSONStringer jsRequest = new JSONStringer();
            jsRequest.object();
            jsRequest.key("attributeType").value(attributeTypeUuid);
            jsRequest.key("value").value(value);
            jsRequest.endObject();
            createAndPrintResult("person", personUuid, "attributes", jsRequest);
        }
    }

    public void addConcept(String name, ConceptDatatype type, ConceptClass conceptClass, boolean set)
            throws JSONException, IOException {

        if (client.getObjectBySearch("concept", StringEscapeUtils.escapeHtml3(name)).isEmpty()) {
            JSONStringer jsRequest = new JSONStringer();
            jsRequest.object();
            jsRequest.key("name").value(name);
            jsRequest.key("datatype").value(type);
            jsRequest.key("datatype").value(type.getName());
            jsRequest.key("conceptClass").value(conceptClass.name());
            jsRequest.key("set").value(set);
            jsRequest.endObject();
            createAndPrintResult("concept", jsRequest);
        }
    }

    private String createAndPrintResult(String type, String parentUuid, String subType, JSONStringer js) throws IOException, JSONException {
        return printResult(client.createNewSubObject(type, parentUuid, subType, js));
    }

    private String createAndPrintResult(String type, JSONStringer js) throws IOException, JSONException {
        return printResult(client.createNewObject(type, js));
    }

    private String printResult(Representation r) throws IOException, JSONException {
        JSONObject jo = (new JsonRepresentation(r).getJsonObject());
        if (verbose) {
            String output = "Added " + jo.get("uuid");
            if (!jo.isNull("name")) {
                output = output + ":" + jo.getString("name");
            }
            System.out.println(output);
        }
        return jo.getString("uuid");
    }

    public boolean isNull(String value) {
        if (value == null) {
            return true;
        } else {
            return value.isEmpty() || value.equalsIgnoreCase("null") || value.equals("None");
        }
    }

    public String addLocationState(String stateName)
            throws JSONException, IOException {
        String result = "";
        result = baseData.getLocation(stateName, null, null, null);
        if (result == null) {
            JSONStringer jsRequest = new JSONStringer();
            jsRequest.object();
            jsRequest.key("name").value(stateName);
            jsRequest.key("stateProvince").value(stateName);
            jsRequest.key("country").value("India");
            jsRequest.key("description").value("State");
            jsRequest.endObject();
            return createAndPrintResult("location", jsRequest);
        }
        return result;
    }

    public String addLocationDistrict(String parent, String districtName, String districtID, String stateName)
            throws JSONException, IOException {

        String result = "";
        result = baseData.getLocation(stateName, districtName, null, null);

        if (result == null) {
            JSONStringer jsRequest = new JSONStringer();
            jsRequest.object();
            jsRequest.key("parentLocation").value(parent);
            jsRequest.key("name").value(districtName);
            jsRequest.key("countyDistrict").value(districtName);
            jsRequest.key("stateProvince").value(stateName);
            jsRequest.key("address6").value(districtID);
            jsRequest.key("country").value("India");
            jsRequest.key("description").value("District");
            jsRequest.endObject();
            return createAndPrintResult("location", jsRequest);
        }
        return result;
    }

    public String addLocationTahsil(String parent, String tahsilName, String tahsilID, String districtName, String districtID, String stateName)
            throws JSONException, IOException {

        String result = "";
        result = baseData.getLocation(stateName, districtName, tahsilName, null);

        if (result == null) {
            JSONStringer jsRequest = new JSONStringer();
            jsRequest.object();
            jsRequest.key("parentLocation").value(parent);
            jsRequest.key("name").value(tahsilName);
            jsRequest.key("address2").value(tahsilName);
            jsRequest.key("address5").value(tahsilID);
            jsRequest.key("countyDistrict").value(districtName);
            jsRequest.key("stateProvince").value(stateName);
            jsRequest.key("address6").value(districtID);
            jsRequest.key("country").value("India");
            jsRequest.key("description").value("Tahsil");
            jsRequest.endObject();
            return createAndPrintResult("location", jsRequest);
        }
        return result;
    }

    public String addLocationVillage(String parent, String villageName, String villageID, String gramPanchayat, String tahsilName, String tahsilID, String districtName, String districtID, String stateName)
            throws JSONException, IOException {
        String result = baseData.getLocation(stateName, districtName, tahsilName, villageName);

        if (result == null) {
            JSONStringer jsRequest = new JSONStringer();
            jsRequest.object();
            jsRequest.key("parentLocation").value(parent);
            jsRequest.key("name").value(villageName);
            jsRequest.key("cityVillage").value(villageName);
            if (!gramPanchayat.isEmpty()) {
                jsRequest.key("address1").value(gramPanchayat);
            }
            jsRequest.key("address3").value(villageID);
            jsRequest.key("address2").value(tahsilName);
            jsRequest.key("address5").value(tahsilID);
            jsRequest.key("countyDistrict").value(districtName);
            jsRequest.key("stateProvince").value(stateName);
            jsRequest.key("address6").value(districtID);
            jsRequest.key("country").value("India");
            jsRequest.key("description").value("Village");
            jsRequest.endObject();
            return createAndPrintResult("location", jsRequest);
        }
        return result;
    }

    public String JssRegistrationIdentifierType() throws IOException, JSONException {
        JSONStringer jsRequest = new JSONStringer();
        jsRequest.object();
        jsRequest.key("name").value("JSS Registration Number");
        jsRequest.key("display").value("JSS Registration Number");
        jsRequest.key("required").value(true);
        jsRequest.key("checkDigit").value(true);
        jsRequest.endObject();
        return createAndPrintResult("patientidentifierattributetype", jsRequest);
    }

    public String addPatient(String firstName, String lastName, String jssRegistrationNumber, SubCenterLocation registrationLocation, String gender, Date birthdate)
            throws IOException, JSONException {
        return addPerson(firstName, lastName, jssRegistrationNumber, registrationLocation, gender, birthdate, true);
    }
    
    public String addNonPatient(String firstName, String lastName, String gender, Date birthdate)
            throws IOException, JSONException {
        return addPerson(firstName, lastName, "", SubCenterLocation.GANIYARI, gender, birthdate, false);
    }
    
    public String addPerson(String firstName, String lastName, String jssRegistrationNumber, SubCenterLocation registrationLocation, String gender, Date birthdate, boolean patient)
            throws IOException, JSONException {
        ArrayList<JSONObject> patients = client.getObjectBySearch("patient", jssRegistrationNumber);
        if (patients.isEmpty()) {
            JSONStringer jsRequest = new JSONStringer();
            jsRequest.object();
            if (patient) {
                jsRequest.key("preferredIdentifier").object();
                jsRequest.key("identifier").value(jssRegistrationNumber);
                jsRequest.key("identifierType").value(baseData.getJssRegistrationIdentiferUuid());
                jsRequest.key("location").value(baseData.getLocationUuid(registrationLocation));
                jsRequest.endObject();
            }
            jsRequest.key("preferredName").object();
            jsRequest.key("givenName").value(firstName);
            jsRequest.key("familyName").value(lastName);
            jsRequest.endObject();
            if (birthdate != null){
              jsRequest.key("birthdate").value(dateFormatter.format(birthdate));
            }
            jsRequest.key("gender").value(gender);
            jsRequest.endObject();
            return createAndPrintResult((patient) ? "patient" : "person", jsRequest);
        } else {
            return patients.get(0).getString("uuid");
        }
    }
    
    public String addEncounterType(String name, String description)
            throws IOException, JSONException {
//        ArrayList<JSONObject> encounterTypes = client.getObjectBySearch("encountertype", name.replace(" ", "%20"));
        ArrayList<JSONObject> encounterTypes = client.getObjectBySearch("encountertype", name);
        if (encounterTypes.isEmpty()){
            JSONStringer jsRequest = new JSONStringer();
            jsRequest.object();
            jsRequest.key("name").value(name);
            jsRequest.key("description").value(description);
            jsRequest.endObject();
            return createAndPrintResult("encountertype", jsRequest);
        } else {
            return encounterTypes.get(0).getString("uuid");
        }        
    }

    public void addCodedRegistrationObservation(String patientUuid, Date observationDate, SubCenterLocation subCenterLocation, String concept, String value) throws IOException, JSONException{
       ArrayList<JSONObject> values = client.getObjectBySearch("concept", value);
       for (JSONObject valueJson : values) {
           if (valueJson.getString("display").equalsIgnoreCase(value)) {
               value = valueJson.getString("uuid");
               break;
           }
       }
       addRegistrationObservation(patientUuid, observationDate, subCenterLocation, concept, value);
    }
            
    public void addRegistrationObservation(String patientUuid, Date observationDate, SubCenterLocation subCenterLocation, String concept, String value)
            throws IOException, JSONException {
        // Does registration encounter already exist?
        String encounterUuid="";
        boolean exists = false;
        ArrayList<JSONObject> encounters = client.getObjectByPatient("encounter", patientUuid);
        for (JSONObject encounter : encounters){
            JSONObject encounterType = encounter.getJSONObject("encounterType");
            if (encounterType.getString("display").equals(baseData.getJSSREGISTRATIONENCOUNTERYTYPENAME())){
                encounterUuid = encounter.getString("uuid");
                break;
            }
        }
        
        if (encounterUuid.isEmpty()){
            // Add encounter with registration encounter type
            JSONStringer jsRequest = new JSONStringer();
            jsRequest.object();
            jsRequest.key("location").value(baseData.getLocationUuid(subCenterLocation));
            jsRequest.key("encounterType").value(baseData.getJssRegistrationEncounterTypeUuid());
            jsRequest.key("patient").value(patientUuid);
            jsRequest.key("encounterDatetime").value(dateFormatter.format(observationDate));
            jsRequest.key("provider").value(baseData.getJssRegistrationProviderUuid());
            jsRequest.endObject();
            encounterUuid = createAndPrintResult("encounter", jsRequest);
        }

        // Check to see if observation exists
        ArrayList<JSONObject> observations = client.getObservationsByEncounter(encounterUuid);
        for (JSONObject observation : observations) {
            JSONObject conceptJson = observation.getJSONObject("concept");
            if (conceptJson.getString("display").equalsIgnoreCase(concept)){
                exists = true;
                break;
            }
        }
        if (!exists){
            // Add observation
            JSONStringer jsRequest = new JSONStringer();
            jsRequest = new JSONStringer();
            jsRequest.object();
            jsRequest.key("encounter").value(encounterUuid);
            jsRequest.key("location").value(baseData.getLocationUuid(subCenterLocation));
            jsRequest.key("person").value(patientUuid);
            jsRequest.key("obsDatetime").value(dateFormatter.format(observationDate));
            jsRequest.key("concept").value(baseData.getConceptUuid(concept));
            jsRequest.key("value").value(value);
            jsRequest.endObject();
            createAndPrintResult("obs", jsRequest);
        }
    }

    public String getPatientUuidByRegistrationNumber(String searchString) throws IOException, JSONException {
        ArrayList<JSONObject> results = client.getObjectBySearch("patient", searchString);
        return results.get(0).getString("uuid");
    }
    
}
