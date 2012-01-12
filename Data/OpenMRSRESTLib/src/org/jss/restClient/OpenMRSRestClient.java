/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jss.restClient;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONStringer;
import org.restlet.data.ChallengeScheme;
import org.restlet.data.MediaType;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.resource.ClientResource;

/**
 *
 * @author manorlev-tov
 */
public class OpenMRSRestClient implements RestClient {

    private String baseUri;
    private String username;
    private String password;
    private ClientResource cr = new ClientResource("");

    public OpenMRSRestClient(String openMRSUri, String username, String password) {
        this.baseUri = (openMRSUri.substring(openMRSUri.length() - 1).equals("/")) ? openMRSUri + "ws/rest/v1/" : openMRSUri + "/ws/rest/v1/";
        this.username = username;
        this.password = password;
    }

    private JSONObject getUri(String uri)
            throws IOException, JSONException {
        cr.setReference(uri);
        cr.setChallengeResponse(ChallengeScheme.HTTP_BASIC, username, password);
        Representation entity = cr.get();
        JSONObject json = new JsonRepresentation(entity).getJsonObject();
        return json;
    }

    private JSONArray getUriArray(String uri)
                throws IOException, JSONException {
        cr.setReference(uri);
        cr.setChallengeResponse(ChallengeScheme.HTTP_BASIC, username, password);
        Representation entity = cr.get();
        return (new JsonRepresentation(entity).getJsonArray());
    }

    private Representation deleteUri(String uri)
            throws IOException, JSONException {
        cr.setReference(uri);
        cr.setChallengeResponse(ChallengeScheme.HTTP_BASIC, username, password);
        return cr.delete();
    }

    private Representation postUri(String uri, JSONStringer js) {
        cr.setReference(uri);
        cr.setChallengeResponse(ChallengeScheme.HTTP_BASIC, username, password);
        Representation entity = new JsonRepresentation(js);
        entity.setSize(js.toString().length());
        entity.setMediaType(MediaType.APPLICATION_JSON);
        return cr.post(entity);
    }

    public JSONObject getObjectByUUID(String object, String uuid)
            throws IOException, JSONException {
        return getUri(baseUri + object + "/" + uuid);
    }

    public JSONArray getObjectAll(String object)
            throws IOException, JSONException {
        return getUriArray(baseUri + object + "?all");

    }

    public JSONObject getSubObjectByUUID(String parentObject, String parentUuid, String object, String uuid)
            throws IOException, JSONException {
        return getUri(baseUri + parentObject + "/" + parentUuid + "/" + object + "/" + uuid);
    }

    public ArrayList<JSONObject> getObjectBySearch(String object, String searchString)
            throws IOException, JSONException {
        searchString = URLEncoder.encode(searchString, "UTF-8");
        ArrayList<JSONObject> result = new ArrayList<JSONObject>();
        JSONArray ja = getUri(baseUri + object + "?q=" + searchString).getJSONArray("results");
        if (ja != null) {
            for (int x = 0; x < ja.length(); x++) {
                result.add(ja.getJSONObject(x));
            }
        }
        return result;
    }

    public ArrayList<JSONObject> getObjectByPatient(String object, String patientUuid)
            throws IOException, JSONException {
        ArrayList<JSONObject> result = new ArrayList<JSONObject>();
        JSONArray ja = getUri(baseUri + object + "?patient=" + patientUuid).getJSONArray("results");
        if (ja != null) {
            for (int x = 0; x < ja.length(); x++) {
                result.add(ja.getJSONObject(x));
            }
        }
        return result;
    }
    
    public ArrayList<JSONObject> getObservationsByEncounter(String encounterUuid) throws IOException, JSONException{
        ArrayList<JSONObject> result = new ArrayList<JSONObject>();
        JSONArray ja = getUri(baseUri + "obs?encounter=" + encounterUuid).getJSONArray("results");
        if (ja != null) {
            for (int x = 0; x < ja.length(); x++) {
                result.add(ja.getJSONObject(x));
            }
        }        
        return result;
    }

    public Representation deleteObjectByUUID(String object, String uuid)
            throws IOException, JSONException {
        return deleteUri(baseUri + object + "/" + uuid);
    }

    public Representation postObjectByUUID(String object, String uuid, JSONStringer js) {
        return postUri(baseUri + object + "/" + uuid, js);
    }

    public Representation postSubObjectByUUID(String parentObject, String parentUuid, String object, String uuid, JSONStringer js) {
        return postUri(baseUri + parentObject + "/" + parentUuid + "/" + object + "/" + uuid, js);
    }

    public Representation createNewObject(String object, JSONStringer js) {
        return postUri(baseUri + object, js);
    }

    public Representation createNewSubObject(String parentObject, String parentUuid, String object, JSONStringer js) {
        return postUri(baseUri + parentObject + "/" + parentUuid + "/" + object, js);
    }
}