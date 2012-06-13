package org.raxa.module.raxacore.web.v1_0.controller;

/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openmrs.api.context.Context;
import org.openmrs.module.webservices.rest.SimpleObject;
import org.openmrs.module.webservices.rest.test.Util;
import org.openmrs.test.BaseModuleContextSensitiveTest;
import org.raxa.module.raxacore.PatientList;
import org.raxa.module.raxacore.PatientListService;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

public class PatientListControllerTest extends BaseModuleContextSensitiveTest {
	
	private static final String TEST_DATA_PATH = "org/raxa/module/raxacore/include/";
	
	private static final String MODULE_TEST_DATA_XML = TEST_DATA_PATH + "moduleTestData.xml";
	
	private MockHttpServletRequest request = null;
	
	private MockHttpServletResponse response = null;
	
	private PatientListController controller = null;
	
	private PatientListService service = null;
	
	@Before
	public void before() throws Exception {
		executeDataSet(MODULE_TEST_DATA_XML);
		this.request = new MockHttpServletRequest();
		this.response = new MockHttpServletResponse();
		this.controller = new PatientListController();
		this.service = Context.getService(PatientListService.class);
	}
	
	/**
	 * @see PatientListController#retirePatientList(String,String,HttpServletRequest, HttpServletResponse)
	 * @verifies void a location attribute type
	 */
	@Test
	public void retirePatientList_shouldRetireAPatientList() throws Exception {
		PatientList pl1 = service.getPatientListByUuid(getUuid());
		Assert.assertFalse(pl1.isRetired());
		controller.retirePatientList(getUuid(), "testing", request, response);
		PatientList pl2 = service.getPatientListByUuid(getUuid());
		Assert.assertTrue(pl2.isRetired());
		Assert.assertEquals("testing", pl2.getRetireReason());
	}
	
	/**
	 * @see PatientListController#getPatientsInPatientList(String, HttpServletRequest)
	 * @verifies get a default representation of a patient list by its uuid
	 */
	@Test
	public void getPatientsInPatientList_shouldGetPatientsInPatientList() throws Exception {
		HashMap<String, String> hashMap = new HashMap<String, String>();
		hashMap.put("encounterType", "61ae96f4-6afe-4351-b6f8-cd4fc383cce1");
		hashMap.put("startDate", "2008-01-01T00:00:00.0");
		hashMap.put("endDate", "2012-01-02T00:00:00.0");
		String result = controller.getPatientsInPatientList(hashMap, request);
		SimpleObject patientList = SimpleObject.parseJson(result);
		Util.log("PatientList fetched (default)", patientList);
		Assert.assertNotNull(result);
		Assert.assertEquals(2, ((ArrayList) patientList.get("patients")).size());
	}
	
	/**
	 * @see PatientListController#updatePatientList(String, SimpleObject, HttpServletRequest, HttpServletResponse)
	 * @verifies a new patient list is created
	 */
	@Test
	public void updatePatientList_shouldSaveANewPatientList() throws Exception {
		int before = service.getAllPatientList(false).size();
		String json = "{ \"name\":\"Test PatientList\",\"description\":\"Test List of Patients\"}";
		SimpleObject post = new ObjectMapper().readValue(json, SimpleObject.class);
		controller.updatePatientList(getUuid(), post, request, response);
		Assert.assertEquals(before, service.getAllPatientList(false).size());
		String result = controller.getAllPatientListByUuid(getUuid(), request);
		SimpleObject updatedPatientList = SimpleObject.parseJson(result);
		Util.log("Updated Patient List", updatedPatientList);
		Assert.assertEquals(getUuid(), updatedPatientList.get("uuid"));
		Assert.assertEquals("Test PatientList", updatedPatientList.get("name"));
	}
	
	/**
	 * @see PatientListController#createNewPatientList(SimpleObject, HttpServletRequest, HttpServletResponse)
	 * @verifies a new patient list is created
	 */
	@Test
	public void createNewPatientList_shouldSaveANewPatientList() throws Exception {
		int before = service.getAllPatientList(false).size();
		String json = "{ \"name\":\"Test PatientList\",\"description\":\"Test List of Patients\"}";
		SimpleObject post = new ObjectMapper().readValue(json, SimpleObject.class);
		Object patientList = controller.createNewPatientList(post, request, response);
		Util.log("Created Patient List", patientList);
		Assert.assertEquals(before + 1, service.getAllPatientList(false).size());
	}
	
	/**
	 * @see PatientListController#getPatientListsByName(String,HttpServletRequest)
	 * @verifies return no results because no matching patientlist name
	 */
	@Test
	public void getPatientListsByName_shouldReturnNoResultsIfThereAreNoMatchingPatientList() throws Exception {
		String results = controller.getPatientListsByName("zzzznotype", request);
		Assert.assertEquals(0, ((ArrayList) SimpleObject.parseJson(results).get("results")).size());
	}
	
	/**
	 * @see PatientListController#getPatientListsByName(String,HttpServletRequest)
	 * @verifies find matching patient list
	 */
	@Test
	public void getPatientListsByName_shouldFindMatchingPatientList() throws Exception {
		String results = controller.getPatientListsByName("TestList2", request);
		LinkedHashMap patientList = (LinkedHashMap) ((ArrayList) SimpleObject.parseJson(results).get("results")).get(0);
		Util.log("Found PatientList(s)", patientList);
		Assert.assertEquals("68547121-1b70-465e-99ee-c9dfd95e7d30", patientList.get("uuid"));
		Assert.assertEquals("TestList2", patientList.get("name"));
		Assert.assertNull(patientList.get("searchQuery"));
		Assert.assertNull(patientList.get("auditInfo"));
	}
	
	/**
	 * @see PatientListController#getAllPatientListByUuidFull(String, String, HttpServletRequest)
	 * @verifies get the full representation of a patient list by its uuid
	 */
	@Test
	public void getPatientListByUuidFull_shouldGetAFullRepresentationOfAPatientList() throws Exception {
		String result = controller.getAllPatientListByUuidFull(getUuid(), "full", request);
		SimpleObject patientList = SimpleObject.parseJson(result);
		Assert.assertNotNull(result);
		Util.log("PatientList fetched (full)", result);
		Assert.assertEquals("68547121-1b70-465d-99ee-c9dfd95e7d30", patientList.get("uuid"));
		Assert.assertEquals("TestList1", patientList.get("name"));
		Assert.assertNotNull(patientList.get("searchQuery"));
		Assert.assertNotNull(patientList.get("auditInfo"));
	}
	
	/**
	 * @see PatientListController#getAllPatientListByUuid(String, HttpServletRequest)
	 * @verifies get a default representation of a patient list by its uuid
	 */
	@Test
	public void getPatientListByUuid_shouldGetADefaultRepresentationOfAPatientList() throws Exception {
		String result = controller.getAllPatientListByUuid(getUuid(), request);
		SimpleObject patientList = SimpleObject.parseJson(result);
		Assert.assertNotNull(result);
		Util.log("PatientList fetched (default)", result);
		Assert.assertEquals("68547121-1b70-465d-99ee-c9dfd95e7d30", patientList.get("uuid"));
		Assert.assertEquals("TestList1", patientList.get("name"));
		Assert.assertNull(patientList.get("searchQuery"));
		Assert.assertNull(patientList.get("auditInfo"));
	}
	
	/**
	 * @see PatientListController#getAllPatientLists(HttpServletRequest, HttpServletResponse)
	 * @verifies get all the PatientList in the system
	 */
	@Test
	public void shouldGetAll() throws Exception {
		String allPatientLists = controller.getAllPatientLists(request, response);
		Util.log("All Patient lists", allPatientLists);
		Assert.assertEquals(2, ((ArrayList) SimpleObject.parseJson(allPatientLists).get("results")).size());
	}
	
	/**
	 * @see org.openmrs.module.webservices.rest.web.v1_0.controller.BaseCrudControllerTest#getUuid()
	 */
	public String getUuid() {
		return "68547121-1b70-465d-99ee-c9dfd95e7d30";
	}
}
