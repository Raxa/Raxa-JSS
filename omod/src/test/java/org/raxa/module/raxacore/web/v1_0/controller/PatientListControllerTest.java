/**
 * The contents of this file are subject to the OpenMRS Public License Version
 * 1.0 (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at http://license.openmrs.org
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for
 * the specific language governing rights and limitations under the License.
 *
 * Copyright (C) OpenMRS, LLC. All Rights Reserved.
 */
package org.raxa.module.raxacore.web.v1_0.controller;

import javax.servlet.http.HttpServletResponse;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openmrs.api.context.Context;
import org.openmrs.module.webservices.rest.SimpleObject;
import org.openmrs.module.webservices.rest.test.Util;
import org.openmrs.module.webservices.rest.web.v1_0.controller.BaseCrudControllerTest;
import org.raxa.module.raxacore.PatientListService;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.web.context.request.WebRequest;

public class PatientListControllerTest extends BaseCrudControllerTest {
	
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
	 * @see PatientListController#createPatientList(SimpleObject,WebRequest)
	 * @verifies create a new PatientList
	 */
	/*@Test
	public void createLocationAttributeType_shouldCreateANewPatientList() throws Exception {
		int before = service.getAllPatientList(false).size();
		String json = "{ \"name\":\"Test PatientList\",\"description\":\"Test List of Patients\"}";
		SimpleObject post = new ObjectMapper().readValue(json, SimpleObject.class);
		Object patientList = new PatientListController().create(post, request, response);
		Util.log("Created Patient List", patientList);
		Assert.assertEquals(before + 1, service.getAllPatientList(false).size());
	}*/

	/**
	 * @see PatientListController#getPatientList(PatientList ,WebRequest)
	 * @verifies get a default representation of a location attribute type
	 */
	/*@Test
	public void getPatientList_shouldGetADefaultRepresentationOfAPatientList() throws Exception {
		Object result = new PatientListController().retrieve("68547121-1b70-465d-99ee-c9dfd95e7d30", emptyRequest());
		Assert.assertNotNull(result);
		Util.log("PatientList fetched (default)", result);
		Assert.assertEquals("68547121-1b70-465d-99ee-c9dfd95e7d30", PropertyUtils.getProperty(result, "uuid"));
		Assert.assertEquals("TestList1", PropertyUtils.getProperty(result, "name"));
		Assert.assertNull(PropertyUtils.getProperty(result, "auditInfo"));
	}*/

	/**
	 * @see PatientListController#getPatientList(String,WebRequest)
	 * @verifies get a full representation of a patient list
	 */
	/*@Test
	public void getPatientList_shouldGetAFullRepresentationOfAPatientList() throws Exception {
		MockHttpServletRequest req = new MockHttpServletRequest();
		req.addParameter(RestConstants.REQUEST_PROPERTY_FOR_REPRESENTATION, RestConstants.REPRESENTATION_FULL);
		Object result = new PatientListController().retrieve("68547121-1b70-465d-99ee-c9dfd95e7d30", req);
		Util.log("PatientList fetched (full)", result);
		Assert.assertNotNull(result);
		Assert.assertEquals("68547121-1b70-465d-99ee-c9dfd95e7d30", PropertyUtils.getProperty(result, "uuid"));
		Assert.assertNotNull(PropertyUtils.getProperty(result, "auditInfo"));
	}*/

	/**
	 * @see
	 * LocationAttributeTypeController#updateLocationAttributeType(LocationAttributeType,SimpleObject,WebRequest)
	 * @verifies change a property on a location
	 */
	/*@Test
	 public void updateLocationAttributeType_shouldChangeAPropertyOnALocationAttributeType() throws Exception {
	 SimpleObject post = new ObjectMapper().readValue("{\"description\":\"Updated description\"}", SimpleObject.class);
	 Object editedLocationAttributeType = new LocationAttributeTypeController().update(
	 Rest19ExtTestConstants.LOCATION_ATTRIBUTE_TYPE_UUID, post, emptyRequest(), new MockHttpServletResponse());
	 Util.log("Edited location", editedLocationAttributeType);
	 Assert
	 .assertEquals("Updated description", Context.getLocationService().getLocationAttributeType(1)
	 .getDescription());
	 }*/
	/**
	 * @see
	 * LocationAttributeTypeController#retireLocationAttributeType(LocationAttributeType,String,WebRequest)
	 * @verifies void a location attribute type
	 */
	/*@Test
	 public void retireLocationAttributeType_shouldRetireALocationAttributeType() throws Exception {
	 LocationAttributeType locationAttributeType = Context.getLocationService().getLocationAttributeType(1);
	 Assert.assertFalse(locationAttributeType.isRetired());
	 new LocationAttributeTypeController().delete(Rest19ExtTestConstants.LOCATION_ATTRIBUTE_TYPE_UUID, "test",
	 emptyRequest(), new MockHttpServletResponse());
	 locationAttributeType = Context.getLocationService().getLocationAttributeType(1);
	 Assert.assertTrue(locationAttributeType.isRetired());
	 Assert.assertEquals("test", locationAttributeType.getRetireReason());
	 }*/
	/**
	 * @see
	 * PatientListController#findPatientList(String,WebRequest,HttpServletResponse)
	 * @verifies return no results if there are no matching location(s)
	 */
	/*@Test
	public void findPatientList_shouldReturnNoResultsIfThereAreNoMatchingPatientList() throws Exception {
		List<Object> results = (List<Object>) new PatientListController().search("zzzznotype", emptyRequest(),
		    new MockHttpServletResponse()).get("results");
		Assert.assertEquals(0, results.size());
	}*/

	/**
	 * @see
	 * PatientListController#findPatientList(String,WebRequest,HttpServletResponse)
	 * @verifies find matching patient list
	 */
	/*@Test
	public void findPatientList_shouldFindMatchingPatientList() throws Exception {
		List<Object> results = (List<Object>) new PatientListController().search("TestList2", emptyRequest(),
		    new MockHttpServletResponse()).get("results");
		Assert.assertEquals(1, results.size());
		Util.log("Found " + results.size() + " PatientList(s)", results);
		SimpleObject result = (SimpleObject) results.get(0);
		Assert.assertEquals("68547121-1b70-465e-99ee-c9dfd95e7d30", PropertyUtils.getProperty(result, "uuid"));
		Assert.assertNotNull(PropertyUtils.getProperty(result, "links"));
		Assert.assertNotNull(PropertyUtils.getProperty(result, "display"));
	}*/

	@Test
	public void shouldGetAllNonRetiredPatientList() throws Exception {
		SimpleObject result = controller.getAll(request, response);
		Assert.assertNotNull(result);
		Assert.assertEquals(2, Util.getResultsSize(result));
	}
	
	/**
	 * @see org.openmrs.module.webservices.rest.web.v1_0.controller.BaseCrudControllerTest#getURI()
	 */
	@Override
	public String getURI() {
		return "raxacore/patientlist";
	}
	
	/**
	 * @see org.openmrs.module.webservices.rest.web.v1_0.controller.BaseCrudControllerTest#getUuid()
	 */
	@Override
	public String getUuid() {
		return "68547121-1b70-465d-99ee-c9dfd95e7d30";
	}
	
	@Override
	public long getAllCount() {
		return 2;
	}
}
