/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jss.restClient;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.lang3.StringEscapeUtils;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author manorlev-tov
 */
public class BaseData {

    private final OpenMRSRestClient client;
    private String JSSREGISTRATIONIDENTIFIERNAME = "JSS Registration Number";
    private String JSSREGISTRATIONENCOUNTERYTYPENAME = "JSS Registration Encounter";
    private String JSSREGISTRATIONENPROVIDERNAME = "JSS Registration Generic Provider";
    private String jssRegistrationIdentiferUuid;
    private Map<SubCenterLocation, String> subCenterLocationUuids;
    private Map<String, String> personAttributeTypes = new HashMap<String, String>();
    private Map<String, String> concepts = new HashMap<String, String>();
    private String jssRegistrationEncounterTypeUuid;
    private String jssRegistrationProviderUuid;

    public String getJssRegistrationProviderUuid() throws IOException, JSONException {
        if (jssRegistrationProviderUuid == null) {
            ArrayList<JSONObject> results = client.getObjectBySearch("person", "JSS");
            for (JSONObject result : results) {
                if (result.getString("display").equals(JSSREGISTRATIONENPROVIDERNAME)) {
                    jssRegistrationProviderUuid = result.getString("uuid");
                    break;
                }
            }
        }
        return jssRegistrationProviderUuid;
    }

    public String getRegistrationObservationForPatient(String patientUuid, String conceptUuid) {
        return "";
    }
    
    public BaseData(OpenMRSRestClient client) {
        this.client = client;
    }

    public String getLocationUuid(SubCenterLocation subCenterLocation)
            throws IOException, JSONException {
        if (subCenterLocationUuids == null) {
            subCenterLocationUuids = new HashMap<SubCenterLocation, String>();
            for (SubCenterLocation location : SubCenterLocation.values()) {
                subCenterLocationUuids.put(location, getLocation(location.getState(), location.getDistrict(), location.getTahsil(), location.name()));
            }
        }
        return subCenterLocationUuids.get(subCenterLocation);
    }

    public String getConceptUuid(String conceptName)
            throws IOException, JSONException {
        if (!concepts.containsKey(conceptName)) {
            concepts.put(conceptName, getUuidFromSearch("concept", conceptName));
        }
        return concepts.get(conceptName);
    }

    public String getPersonAttributeTypeUuid(String personAttributeTypeName)
            throws IOException, JSONException {
        if (!personAttributeTypes.containsKey(personAttributeTypeName)) {
            personAttributeTypes.put(personAttributeTypeName, getUuidFromSearch("personattributetype", personAttributeTypeName));
        }
        return personAttributeTypes.get(personAttributeTypeName);
    }

    public String getLocation(String stateName, String districtName, String tahsilName, String villageName) throws IOException, JSONException {
        JSONObject result = getLocationJson(stateName, districtName, tahsilName, villageName);
        return result.getString("uuid");
    }

    public JSONObject getLocationJson(String stateName, String districtName, String tahsilName, String villageName)
            throws IOException, JSONException {
        if (villageName != null) {
            List<JSONObject> locations = client.getObjectBySearch("location", StringEscapeUtils.escapeHtml3(villageName));
            for (JSONObject location : locations) {
                JSONObject locationDescription = client.getObjectByUUID("location", location.getString("uuid"));
                if (locationDescription.getString("stateProvince").equalsIgnoreCase(stateName)
                        && locationDescription.getString("countyDistrict").equalsIgnoreCase(districtName)
                        && locationDescription.getString("address2").equalsIgnoreCase(tahsilName)
                        && locationDescription.getString("cityVillage").equalsIgnoreCase(villageName)) {
                    return locationDescription;
                }
            }
        } else if (tahsilName != null) {
            List<JSONObject> locations = client.getObjectBySearch("location", StringEscapeUtils.escapeHtml3(tahsilName));
            for (JSONObject location : locations) {
                JSONObject locationDescription = client.getObjectByUUID("location", location.getString("uuid"));
                if (locationDescription.getString("stateProvince").equals(stateName)
                        && locationDescription.getString("countyDistrict").equals(districtName)
                        && locationDescription.getString("address2").equals(tahsilName)
                        && locationDescription.isNull("cityVillage")) {
                    return locationDescription;
                }
            }
        } else if (districtName != null) {
            List<JSONObject> locations = client.getObjectBySearch("location", StringEscapeUtils.escapeHtml3(districtName));
            for (JSONObject location : locations) {
                JSONObject locationDescription = client.getObjectByUUID("location", location.getString("uuid"));
                if (locationDescription.getString("stateProvince").equals(stateName)
                        && locationDescription.getString("countyDistrict").equals(districtName)
                        && locationDescription.isNull("address2")
                        && locationDescription.isNull("cityVillage")) {
                    return locationDescription;
                }
            }
        } else {
            List<JSONObject> locations = client.getObjectBySearch("location", StringEscapeUtils.escapeHtml3(stateName));
            for (JSONObject location : locations) {
                JSONObject locationDescription = client.getObjectByUUID("location", location.getString("uuid"));
                if (locationDescription.getString("stateProvince").equals(stateName)
                        && locationDescription.isNull("countyDistrict")
                        && locationDescription.isNull("address2")
                        && locationDescription.isNull("cityVillage")) {
                    return locationDescription;
                }
            }
        }
        return (null);
    }

    public String getJssRegistrationIdentiferUuid()
            throws IOException, JSONException {
        if (jssRegistrationIdentiferUuid == null) {
            JSONArray ja = client.getObjectAll("patientidentifiertype");
            for (int x = 0; x < ja.length(); x++){
                JSONObject jo = ja.getJSONObject(x);
                if (jo.getString("display").equalsIgnoreCase(JSSREGISTRATIONIDENTIFIERNAME)) {
                    jssRegistrationIdentiferUuid = jo.getString("uuid");
                    break;
                }
            }
//            jssRegistrationIdentiferUuid = getUuidFromSearch("patientidentifiertype", JSSREGISTRATIONIDENTIFIERNAME);
        }
        return jssRegistrationIdentiferUuid;
    }

    
    
    public String getJssRegistrationEncounterTypeUuid() throws IOException, JSONException {
        if (jssRegistrationEncounterTypeUuid == null) {
            jssRegistrationEncounterTypeUuid = getUuidFromSearch("encountertype", JSSREGISTRATIONENCOUNTERYTYPENAME);
        }
        return jssRegistrationEncounterTypeUuid;
    }

    private String getUuidFromSearch(String object, String searchString) throws IOException, JSONException {
        ArrayList<JSONObject> results = client.getObjectBySearch(object, searchString);
        for (JSONObject result : results) {
            if (result.getString("display").equalsIgnoreCase(searchString)) {
                return result.getString("uuid");
            }
        }
        return "";
    }

    public String getJSSREGISTRATIONENCOUNTERYTYPENAME() {
        return JSSREGISTRATIONENCOUNTERYTYPENAME;
    }
}
