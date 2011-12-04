/* The contents of this file are subject to the OpenMRS Public License
 * Version 1.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://license.openmrs.org
 *
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific language governing rights and limitations
 * under the License.
 *
 * Copyright (C) OpenMRS, LLC.  All Rights Reserved.
 */
package org.openmrs.module.webservices.forms.web.controller;

import java.util.List;
import java.util.Set;

import org.openmrs.module.webservices.forms.web.resource.FieldResource;
import org.openmrs.module.webservices.forms.web.controller.FieldController;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.PropertyUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.openmrs.Concept;
import org.openmrs.Field;
import org.openmrs.EncounterType;
import org.openmrs.api.context.Context;
import org.openmrs.module.webservices.rest.SimpleObject;
import org.openmrs.module.webservices.rest.test.Util;
import org.openmrs.module.webservices.rest.web.RestConstants;
import org.openmrs.web.test.BaseModuleWebContextSensitiveTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.web.context.request.WebRequest;

//import org.openmrs.module.webservices.rest.web;

public class FieldControllerTest extends BaseModuleWebContextSensitiveTest {

	private MockHttpServletRequest emptyRequest() {
		return new MockHttpServletRequest();
	}

	/**
	 * @see FieldController#createField(SimpleObject,WebRequest)
	 * @verifies create a new Field
	 */
	@Test
	public void createField_shouldCreateANewField() throws Exception {
		int before = Context.getFormService().getAllFields(false).size();
		String json = "{\"name\":\"Test field\", \"description\":\"Test field for unit test\", \"fieldType\":\"Concept\", \"concept\":\"WEIGHT (KG)\", \"tableName\":\"TestTable\", \"attributeName\":\"\", \"defaultValue\": \"Test\", \"selectMultiple\":false}";
		SimpleObject post = new ObjectMapper().readValue(json,
				SimpleObject.class);
		Object newField = new FieldController().create(post, emptyRequest(),
				new MockHttpServletResponse());
		Util.log("Created field", newField);
		Assert.assertEquals(before + 1, Context.getFormService().getAllFields(
				false).size());
	}

	/**
	 * @see FieldController#getField(Field,WebRequest)
	 * @verifies get a default representation of a field
	 */
	@Test
	public void getField_shouldGetADefaultRepresentationOfAField()
			throws Exception {
		Object result = new FieldController().retrieve(
				"db016b7d-39a5-4911-89da-0eefbfef7cb2", emptyRequest());
		Assert.assertNotNull(result);
		Util.log("Field fetched (default)", result);
		Assert.assertEquals("db016b7d-39a5-4911-89da-0eefbfef7cb2",
				PropertyUtils.getProperty(result, "uuid"));
		Assert.assertNotNull(PropertyUtils.getProperty(result, "name"));
		Assert.assertNull(PropertyUtils.getProperty(result, "auditInfo"));
	}

	/**
	 * @see FieldController#getField(String,WebRequest)
	 * @verifies get a full representation of a field
	 */
	@Test
	public void getField_shouldGetAFullRepresentationOfAField()
			throws Exception {
		MockHttpServletRequest req = new MockHttpServletRequest();
		req.addParameter(RestConstants.REQUEST_PROPERTY_FOR_REPRESENTATION,
				RestConstants.REPRESENTATION_FULL);
		Object result = new FieldController().retrieve(
				"db016b7d-39a5-4911-89da-0eefbfef7cb2", req);
		Util.log("Field fetched (full)", result);
		Assert.assertNotNull(result);
		Assert.assertEquals("db016b7d-39a5-4911-89da-0eefbfef7cb2",
				PropertyUtils.getProperty(result, "uuid"));
		Assert.assertNotNull(PropertyUtils.getProperty(result, "auditInfo"));
	}

	/**
	 * @see FieldController#updateField(Field,SimpleObject,WebRequest)
	 * @verifies change a property on a field
	 */
	@Test
	public void updateField_shouldChangeAPropertyOnAField() throws Exception {
		SimpleObject post = new ObjectMapper().readValue(
				"{\"description\":\"Change for junit test\"}",
				SimpleObject.class);
		Object editedField = new FieldController().update(
				"db016b7d-39a5-4911-89da-0eefbfef7cb2", post, emptyRequest(),
				new MockHttpServletResponse());
		Util.log("Edited field", editedField);
		Assert.assertEquals("Change for junit test", Context.getFormService()
				.getFieldByUuid("db016b7d-39a5-4911-89da-0eefbfef7cb2")
				.getDescription());
	}

	/**
	 * @see FieldController#retireField(Field,String,WebRequest)
	 * @verifies void a field
	 */
	@Test
	public void retireField_shouldRetireAField() throws Exception {
		Field field = Context.getFormService().getFieldByUuid(
				"db016b7d-39a5-4911-89da-0eefbfef7cb2");
		Assert.assertFalse(field.isRetired());
		new FieldController().delete("db016b7d-39a5-4911-89da-0eefbfef7cb2",
				"test delete", emptyRequest(), new MockHttpServletResponse());
		field = Context.getFormService().getFieldByUuid(
				"db016b7d-39a5-4911-89da-0eefbfef7cb2");
		Assert.assertTrue(field.isRetired());
		Assert.assertEquals("test delete", field.getRetireReason());
	}

	/**
	 * @see FieldController#findField(String,WebRequest,HttpServletResponse)
	 * @verifies return no results if there are no matching field(s)
	 */
	@Test
	public void findFields_shouldReturnNoResultsIfThereAreNoMatchingFields()
			throws Exception {
		List<Object> results = (List<Object>) new FieldController().search(
				"noField", emptyRequest(), new MockHttpServletResponse()).get(
				"results");
		Assert.assertEquals(0, results.size());
	}

	/**
	 * @see FieldController#findFields(String,WebRequest,HttpServletResponse)
	 * @verifies find matching fields
	 */
	@Test
	public void findFields_shouldFindMatchingFields() throws Exception {
		List<Object> results = (List<Object>) new FieldController().search(
				"Some concept", emptyRequest(), new MockHttpServletResponse())
				.get("results");
		Assert.assertEquals(1, results.size());
		Object result = results.get(0);
		Assert.assertEquals("db016b7d-39a5-4911-89da-0eefbfef7cb2",
				PropertyUtils.getProperty(result, "uuid"));
		Assert.assertNotNull(PropertyUtils.getProperty(result, "links"));
		Assert.assertNotNull(PropertyUtils.getProperty(result, "display"));
	}
}
