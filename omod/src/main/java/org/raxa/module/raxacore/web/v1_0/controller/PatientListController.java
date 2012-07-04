package org.raxa.module.raxacore.web.v1_0.controller;

/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
import com.google.common.base.Joiner;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.openmrs.Encounter;
import org.openmrs.Obs;
import org.openmrs.Patient;
import org.openmrs.api.context.Context;
import org.openmrs.module.webservices.rest.SimpleObject;
import org.openmrs.module.webservices.rest.web.RestUtil;
import org.openmrs.module.webservices.rest.web.annotation.WSDoc;
import org.openmrs.module.webservices.rest.web.response.ResponseException;
import org.openmrs.module.webservices.rest.web.v1_0.controller.BaseRestController;
import org.raxa.module.raxacore.PatientList;
import org.raxa.module.raxacore.PatientListService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Controller for REST web service access to the PatientList resource.
 */
@Controller
@RequestMapping(value = "/rest/v1/raxacore/patientlist")
public class PatientListController extends BaseRestController {
	
	PatientListService service;
	
	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
	
	Gson gson = new GsonBuilder().serializeNulls().create();
	
	private static final String[] REF = { "uuid", "name", "description" };
	
	public void initPatientListController() {
		service = Context.getService(PatientListService.class);
	}
	
	//<editor-fold defaultstate="collapsed" desc="getResourceVersion">
	/**
	 * Returns the Resource Version
	 */
	private String getResourceVersion() {
		return "1.0";
	}
	
	//</editor-fold>
	
	//<editor-fold defaultstate="collapsed" desc="POST - Without Params">
	/**
	 * Create new patient list by POST'ing atleast name and description property
	 * in the request body.
	 * 
	 * @param post the body of the POST request
	 * @param request
	 * @param response
	 * @return 201 response status and PatientList object
	 * @throws ResponseException 
	 */
	@RequestMapping(method = RequestMethod.POST)
	@WSDoc("Save New PatientList")
	@ResponseBody
	public Object createNewPatientList(@RequestBody SimpleObject post, HttpServletRequest request,
	        HttpServletResponse response) throws ResponseException {
		initPatientListController();
		PatientList patientList = new PatientList();
		patientList.setName(post.get("name").toString());
		patientList.setDescription(post.get("description").toString());
		if (post.get("searchQuery") != null) {
			patientList.setSearchQuery(post.get("searchQuery").toString());
		}
		PatientList created = service.savePatientList(patientList);
		SimpleObject obj = new SimpleObject();
		obj.add("uuid", created.getUuid());
		obj.add("name", created.getName());
		obj.add("description", created.getDescription());
		return RestUtil.created(response, obj);
	}
	
	//</editor-fold>
	
	//<editor-fold defaultstate="collapsed" desc="POST - Update List">
	/**
	 * Updates the Patient List by making a POST call with uuid in URL
	 * and 
	 * 
	 * @param uuid the uuid for the patient list resource
	 * @param post
	 * @param request
	 * @param response
	 * @return 200 response status
	 * @throws ResponseException 
	 */
	@RequestMapping(value = "/{uuid}", method = RequestMethod.POST)
	@WSDoc("Updates an existing patient list")
	@ResponseBody
	public Object updatePatientList(@PathVariable("uuid") String uuid, @RequestBody SimpleObject post,
	        HttpServletRequest request, HttpServletResponse response) throws ResponseException {
		initPatientListController();
		PatientList patientList = service.getPatientListByUuid(uuid);
		patientList.setName(post.get("name").toString());
		patientList.setDescription(post.get("description").toString());
		if (post.get("searchQuery") != null) {
			patientList.setSearchQuery(post.get("searchQuery").toString());
		}
		PatientList created = service.updatePatientList(patientList);
		SimpleObject obj = new SimpleObject();
		obj.add("uuid", created.getUuid());
		obj.add("name", created.getName());
		obj.add("description", created.getDescription());
		return RestUtil.noContent(response);
	}
	
	//</editor-fold>
	
	//<editor-fold defaultstate="collapsed" desc="GET all">
	/**
	 * Get all the unretired patient lists (as REF representation) in the system
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws ResponseException 
	 */
	@RequestMapping(method = RequestMethod.GET)
	@WSDoc("Get All Unretired Patient Lists in the system")
	@ResponseBody()
	public String getAllPatientLists(HttpServletRequest request, HttpServletResponse response) throws ResponseException {
		initPatientListController();
		List<PatientList> allPatientList = service.getAllPatientList(false);
		ArrayList results = new ArrayList();
		for (PatientList patientList : allPatientList) {
			SimpleObject obj = new SimpleObject();
			obj.add("uuid", patientList.getUuid());
			obj.add("name", patientList.getName());
			obj.add("description", patientList.getDescription());
			results.add(obj);
		}
		return gson.toJson(new SimpleObject().add("results", results));
	}
	
	//</editor-fold>
	
	//<editor-fold defaultstate="collapsed" desc="GET - Search by name">
	/**
	 * Search PatientList by Name and get the resource as REF representation
	 * 
	 * @param query the string to search name of patientlist
	 * @param request
	 * @return
	 * @throws ResponseException 
	 */
	@RequestMapping(method = RequestMethod.GET, params = "q")
	@WSDoc("Gets Patient Lists by name")
	@ResponseBody()
	public String getPatientListsByName(@RequestParam("q") String query, HttpServletRequest request)
	        throws ResponseException {
		initPatientListController();
		List<PatientList> allPatientList = service.getPatientListByName(query);
		ArrayList results = new ArrayList();
		for (PatientList patientList : allPatientList) {
			SimpleObject obj = new SimpleObject();
			obj.add("uuid", patientList.getUuid());
			obj.add("name", patientList.getName());
			obj.add("description", patientList.getDescription());
			results.add(obj);
		}
		return gson.toJson(new SimpleObject().add("results", results));
	}
	
	//</editor-fold>
	
	//<editor-fold defaultstate="collapsed" desc="GET by uuid - DEFAULT REP">
	/**
	 * Get the Patientlist along with patients, encounters and obs (DEFAULT rep).
	 * Contains all encounters of the searched encounterType between the startDate
	 * and endDate
	 * 
	 * @param uuid
	 * @param request
	 * @return
	 * @throws ResponseException 
	 */
	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
	@WSDoc("Gets Patient Lists for the uuid path")
	@ResponseBody()
	public String getAllPatientListByUuid(@PathVariable("uuid") String uuid, HttpServletRequest request)
	        throws ResponseException {
		initPatientListController();
		PatientList patientList = service.getPatientListByUuid(uuid);
		SimpleObject obj = new SimpleObject();
		obj.add("uuid", patientList.getUuid());
		obj.add("name", patientList.getName());
		obj.add("description", patientList.getDescription());
		ArrayList patients = new ArrayList();
		List<Patient> patientsInPatientList = service.getPatientsInPatientList(patientList);
		for (Patient p : patientsInPatientList) {
			SimpleObject patient = new SimpleObject();
			patient.add("uuid", p.getUuid());
			patient.add("display", p.getPersonName().getFullName());
			patient.add("gender", p.getGender());
			patient.add("age", p.getAge());
			ArrayList encounters = new ArrayList();
			List<Encounter> encountersInPatientList = service.getEncountersInPatientList(patientList);
			for (Encounter e : encountersInPatientList) {
				if (e.getPatient().equals(p)) {
					SimpleObject encounter = new SimpleObject();
					encounter.add("uuid", e.getUuid());
					encounter.add("display", e.getEncounterType().getName() + " - " + e.getEncounterDatetime());
					encounter.add("encounterType", e.getEncounterType().getUuid());
					encounter.add("encounterDatetime", df.format(e.getEncounterDatetime()));
					ArrayList obsArray = new ArrayList();
					Set<Obs> obsAll = e.getObs();
					for (Obs o : obsAll) {
						SimpleObject obs = new SimpleObject();
						obs.add("uuid", o.getUuid());
						obs.add("display", o.getConcept().getName().getName() + " = "
						        + o.getValueAsString(request.getLocale()));
						obs.add("obsDatetime", df.format(o.getObsDatetime()));
						obs.add("value", o.getValueAsString(request.getLocale()));
						obsArray.add(obs);
					}
					encounter.add("obs", obsArray);
					encounters.add(encounter);
				}
			}
			patient.add("encounters", encounters);
			patients.add(patient);
		}
		obj.add("patients", patients);
		return gson.toJson(obj);
	}
	
	//</editor-fold>
	
	//<editor-fold defaultstate="collapsed" desc="GET by uuid - FULL REP">
	/**
	 * Get the patient list as FULL representation that shows patients, encounters and obs.
	 * Contains all encounters of the searched encounterType between the startDate
	 * and endDate. Contains patientList.searchQuery, encounter.provider and obs.comment
	 * and obs.order compared to DEFAULT rep
	 * 
	 * @param uuid
	 * @param rep
	 * @param request
	 * @return
	 * @throws ResponseException 
	 */
	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET, params = "v")
	@WSDoc("Gets Full representation of Patient Lists for the uuid path")
	@ResponseBody()
	public String getAllPatientListByUuidFull(@PathVariable("uuid") String uuid, @RequestParam("v") String rep,
	        HttpServletRequest request) throws ResponseException {
		initPatientListController();
		PatientList patientList = service.getPatientListByUuid(uuid);
		SimpleObject obj = new SimpleObject();
		obj.add("uuid", patientList.getUuid());
		obj.add("name", patientList.getName());
		obj.add("description", patientList.getDescription());
		obj.add("searchQuery", patientList.getSearchQuery());
		ArrayList patients = new ArrayList();
		List<Patient> patientsInPatientList = service.getPatientsInPatientList(patientList);
		for (Patient p : patientsInPatientList) {
			SimpleObject patient = new SimpleObject();
			patient.add("uuid", p.getUuid());
			patient.add("display", p.getPersonName().getFullName());
			patient.add("gender", p.getGender());
			patient.add("age", p.getAge());
			ArrayList encounters = new ArrayList();
			List<Encounter> encountersInPatientList = service.getEncountersInPatientList(patientList);
			for (Encounter e : encountersInPatientList) {
				if (e.getPatient().equals(p)) {
					SimpleObject encounter = new SimpleObject();
					encounter.add("uuid", e.getUuid());
					encounter.add("display", e.getEncounterType().getName() + " - " + e.getEncounterDatetime());
					encounter.add("encounterType", e.getEncounterType().getUuid());
					encounter.add("encounterDatetime", df.format(e.getEncounterDatetime()));
					if (e.getProvider() != null) {
						encounter.add("provider", e.getProvider().getUuid());
					} else {
						encounter.add("provider", null);
					}
					ArrayList obsArray = new ArrayList();
					Set<Obs> obsAll = e.getObs();
					for (Obs o : obsAll) {
						SimpleObject obs = new SimpleObject();
						obs.add("uuid", o.getUuid());
						obs.add("display", o.getConcept().getName().getName() + " = "
						        + o.getValueAsString(request.getLocale()));
						obs.add("obsDatetime", df.format(o.getObsDatetime()));
						obs.add("value", o.getValueAsString(request.getLocale()));
						obs.add("comment", o.getComment());
						if (o.getOrder() != null) {
							obs.add("order", o.getOrder().getUuid());
						} else {
							obs.add("order", null);
						}
						obsArray.add(obs);
					}
					encounter.add("obs", obsArray);
					encounters.add(encounter);
				}
			}
			patient.add("encounters", encounters);
			patients.add(patient);
		}
		obj.add("patients", patients);
		if (rep.equals("full")) {
			obj.add("retired", patientList.getRetired());
			if (patientList.getRetired()) {
				obj.add("retiredBy", patientList.getRetiredBy().getUuid());
				obj.add("retireReason", patientList.getRetireReason());
			}
			SimpleObject auditInfo = new SimpleObject();
			auditInfo.add("creator", patientList.getCreator().getUuid());
			auditInfo.add("dateCreated", df.format(patientList.getDateCreated()));
			if (patientList.getChangedBy() != null) {
				auditInfo.add("changedBy", patientList.getChangedBy().getUuid());
				auditInfo.add("dateChanged", df.format(patientList.getDateChanged()));
			}
			obj.add("auditInfo", auditInfo);
		}
		obj.add("resourceVersion", getResourceVersion());
		return gson.toJson(obj);
	}
	
	//</editor-fold>
	
	//<editor-fold defaultstate="collapsed" desc="GET - RETURN PATIENTS">
	/**
	 * This is the on-the-fly generated patient list, by passing the searchQuery
	 * as part of the resource URL as params. encounterType is required param.
	 * Gives the FULL rep for the Patient list resource.
	 * 
	 * @param params
	 * @param request
	 * @return
	 * @throws ResponseException 
	 */
	@RequestMapping(method = RequestMethod.GET, params = "encounterType")
	@WSDoc("Gets Patients Without Saving the Patient list")
	@ResponseBody()
	public String getPatientsInPatientList(@RequestParam Map<String, String> params, HttpServletRequest request)
	        throws ResponseException {
		initPatientListController();
		PatientList patientList = new PatientList();
		patientList.setSearchQuery("?" + Joiner.on("&").withKeyValueSeparator("=").join(params));
		SimpleObject obj = new SimpleObject();
		obj.add("uuid", patientList.getUuid());
		obj.add("name", patientList.getName());
		obj.add("description", patientList.getDescription());
		obj.add("searchQuery", patientList.getSearchQuery());
		ArrayList patients = new ArrayList();
		List<Patient> patientsInPatientList = service.getPatientsInPatientList(patientList);
		for (Patient p : patientsInPatientList) {
			SimpleObject patient = new SimpleObject();
			patient.add("uuid", p.getUuid());
			patient.add("display", p.getPersonName().getFullName());
			patient.add("gender", p.getGender());
			patient.add("age", p.getAge());
			ArrayList encounters = new ArrayList();
			List<Encounter> encountersInPatientList = service.getEncountersInPatientList(patientList);
			for (Encounter e : encountersInPatientList) {
				if (e.getPatient().equals(p)) {
					SimpleObject encounter = new SimpleObject();
					encounter.add("uuid", e.getUuid());
					encounter.add("display", e.getEncounterType().getName() + " - " + e.getEncounterDatetime());
					encounter.add("encounterType", e.getEncounterType().getUuid());
					encounter.add("encounterDatetime", df.format(e.getEncounterDatetime()));
					if (e.getProvider() != null) {
						encounter.add("provider", e.getProvider().getUuid());
					} else {
						encounter.add("provider", null);
					}
					ArrayList obsArray = new ArrayList();
					Set<Obs> obsAll = e.getObs();
					for (Obs o : obsAll) {
						SimpleObject obs = new SimpleObject();
						obs.add("uuid", o.getUuid());
						obs.add("display", o.getConcept().getName().getName() + " = "
						        + o.getValueAsString(request.getLocale()));
						obs.add("obsDatetime", df.format(o.getObsDatetime()));
						obs.add("value", o.getValueAsString(request.getLocale()));
						obs.add("comment", o.getComment());
						if (o.getOrder() != null) {
							obs.add("order", o.getOrder().getUuid());
						} else {
							obs.add("order", null);
						}
						obsArray.add(obs);
					}
					encounter.add("obs", obsArray);
					encounters.add(encounter);
				}
			}
			patient.add("encounters", encounters);
			patients.add(patient);
		}
		obj.add("patients", patients);
		obj.add("resourceVersion", getResourceVersion());
		return gson.toJson(obj);
	}
	
	//</editor-fold>
	
	//<editor-fold defaultstate="collapsed" desc="DELETE - Retire PatientList">
	/**
	 * Retires the patient list resource by making a DELETE call with the '!purge' param
	 * 
	 * @param uuid
	 * @param reason
	 * @param request
	 * @param response
	 * @return
	 * @throws ResponseException 
	 */
	@RequestMapping(value = "/{uuid}", method = RequestMethod.DELETE, params = "!purge")
	@WSDoc("Retires the Patient List")
	@ResponseBody
	public Object retirePatientList(@PathVariable("uuid") String uuid,
	        @RequestParam(value = "reason", defaultValue = "web service call") String reason, HttpServletRequest request,
	        HttpServletResponse response) throws ResponseException {
		initPatientListController();
		PatientList patientList = service.getPatientListByUuid(uuid);
		if (patientList != null) {
			patientList.setRetired(true);
			patientList.setRetireReason(reason);
			patientList.setRetiredBy(Context.getAuthenticatedUser());
			service.updatePatientList(patientList);
		}
		return RestUtil.noContent(response);
	}
	
	//</editor-fold>
	
	//<editor-fold defaultstate="collapsed" desc="DELETE - Purge PatientList">
	/**
	 * Purges (Complete Delete) the patient list resource by making a DELETE
	 * call and passing the 'purge' param
	 * 
	 * @param uuid
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/{uuid}", method = RequestMethod.DELETE, params = "purge")
	@ResponseBody
	public Object purgePatientList(@PathVariable("uuid") String uuid, HttpServletRequest request,
	        HttpServletResponse response) throws ResponseException {
		initPatientListController();
		PatientList patientList = service.getPatientListByUuid(uuid);
		if (patientList != null) {
			service.deletePatientList(patientList);
		}
		return RestUtil.noContent(response);
	}
	//</editor-fold>
}
