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

import org.openmrs.module.webservices.forms.web.resource.FormResource;
import org.openmrs.module.webservices.forms.web.controller.FormController;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.beanutils.PropertyUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.openmrs.Concept;
import org.openmrs.Form;
import org.openmrs.EncounterType;
import org.openmrs.api.context.Context;
import org.openmrs.module.webservices.rest.SimpleObject;
import org.openmrs.module.webservices.rest.test.Util;
import org.openmrs.module.webservices.rest.web.RestConstants;
import org.openmrs.web.test.BaseModuleWebContextSensitiveTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.web.context.request.WebRequest;

public class FormControllerTest extends BaseModuleWebContextSensitiveTest {

	private MockHttpServletRequest emptyRequest() {
		return new MockHttpServletRequest();
	}

	/**
	 * @see FormController#createForm(SimpleObject,WebRequest)
	 * @verifies create a new Form
	 */
	@Test
	public void createForm_shouldCreateANewForm() throws Exception {
		int before = Context.getFormService().getForms("", true).size();
		String json = "{ \"name\":\"TestForm\", \"version\":\"1\", \"build\":12, \"published\":false, \"description\":\"junit test form\", \"encounterType\":\"ADULTINITIAL\", \"template\":null,\"xslt\":\"<?xml version=\\\"1.0\\\" encoding=\\\"UTF-8\\\"?>\" }";
		SimpleObject post = new ObjectMapper().readValue(json,
				SimpleObject.class);
		Object newForm = new FormController().create(post, emptyRequest(),
				new MockHttpServletResponse());
		Util.log("Created form", newForm);
		Assert.assertEquals(before + 1, Context.getFormService().getForms("",
				true).size());
	}

	/**
	 * @see FormController#createForm(SimpleObject,WebRequest)
	 * @verifies create a new Form
	 */
	@Test
	public void createForm_shouldCreateANewFormWithFormFields()
			throws Exception {
		int before = Context.getFormService().getForms("", true).size();
		String json = "{ \"name\":\"TestForm\", \"version\":\"1\", \"build\":12, \"published\":false, \"description\":\"junit test form\", \"encounterType\":\"ADULTINITIAL\", \"template\":null,\"xslt\":\"<?xml version=\\\"1.0\\\" encoding=\\\"UTF-8\\\"?>\", ";
		json += "\"formFields\": [";
		json += "{ \"fieldNumber\":1, \"field\":\"Some concept\" } ";
		json += "] }";
		SimpleObject post = new ObjectMapper().readValue(json,
				SimpleObject.class);
		Object newForm = new FormController().create(post, emptyRequest(),
				new MockHttpServletResponse());
		Util.log("Created form", newForm);
		Assert.assertEquals(before + 1, Context.getFormService().getForms("",
				true).size());
	}

	/**
	 * @see FormController#getForm(Form,WebRequest)
	 * @verifies get a default representation of a form
	 */
	@Test
	public void getForm_shouldGetADefaultRepresentationOfAForm()
			throws Exception {
		Object result = new FormController().retrieve(
				"d9218f76-6c39-45f4-8efa-4c5c6c199f50", emptyRequest());
		Assert.assertNotNull(result);
		Util.log("Form fetched (default)", result);
		Assert.assertEquals("d9218f76-6c39-45f4-8efa-4c5c6c199f50",
				PropertyUtils.getProperty(result, "uuid"));
		Assert.assertNotNull(PropertyUtils.getProperty(result, "name"));
		Assert.assertNull(PropertyUtils.getProperty(result, "auditInfo"));
	}

	/**
	 * @see FormController#getForm(String,WebRequest)
	 * @verifies get a full representation of a form
	 */
	@Test
	public void getForm_shouldGetAFullRepresentationOfAForm() throws Exception {
		MockHttpServletRequest req = new MockHttpServletRequest();
		req.addParameter(RestConstants.REQUEST_PROPERTY_FOR_REPRESENTATION,
				RestConstants.REPRESENTATION_FULL);
		Object result = new FormController().retrieve(
				"d9218f76-6c39-45f4-8efa-4c5c6c199f50", req);
		Util.log("Form fetched (full)", result);
		Assert.assertNotNull(result);
		Assert.assertEquals("d9218f76-6c39-45f4-8efa-4c5c6c199f50",
				PropertyUtils.getProperty(result, "uuid"));
		Assert.assertNotNull(PropertyUtils.getProperty(result, "auditInfo"));
	}

	/**
	 * @see FormController#updateForm(Form,SimpleObject,WebRequest)
	 * @verifies change a property on a form
	 */
	@Test
	public void updateForm_shouldChangeAPropertyOnAForm() throws Exception {
		SimpleObject post = new ObjectMapper().readValue("{\"version\":\"2\"}",
				SimpleObject.class);
		Object editedForm = new FormController().update(
				"d9218f76-6c39-45f4-8efa-4c5c6c199f50", post, emptyRequest(),
				new MockHttpServletResponse());
		Util.log("Edited form", editedForm);
		Assert.assertEquals("2", Context.getFormService().getFormByUuid(
				"d9218f76-6c39-45f4-8efa-4c5c6c199f50").getVersion());
	}

	/**
	 * @see FormController#retireForm(Form,String,WebRequest)
	 * @verifies void a form
	 */
	@Test
	public void retireForm_shouldRetireAForm() throws Exception {
		Form form = Context.getFormService().getFormByUuid(
				"d9218f76-6c39-45f4-8efa-4c5c6c199f50");
		Assert.assertFalse(form.isRetired());
		new FormController().delete("d9218f76-6c39-45f4-8efa-4c5c6c199f50",
				"test delete", emptyRequest(), new MockHttpServletResponse());
		form = Context.getFormService().getFormByUuid(
				"d9218f76-6c39-45f4-8efa-4c5c6c199f50");
		Assert.assertTrue(form.isRetired());
		Assert.assertEquals("test delete", form.getRetireReason());
	}

	/**
	 * @see FormController#findForm(String,WebRequest,HttpServletResponse)
	 * @verifies return no results if there are no matching form(s)
	 */
	@Test
	public void findForms_shouldReturnNoResultsIfThereAreNoMatchingForms()
			throws Exception {
		List<Object> results = (List<Object>) new FormController().search(
				"noForm", emptyRequest(), new MockHttpServletResponse()).get(
				"results");
		Assert.assertEquals(0, results.size());
	}

	/**
	 * @see FormController#findForms(String,WebRequest,HttpServletResponse)
	 * @verifies find matching forms
	 */
	@Test
	public void findForms_shouldFindMatchingForms() throws Exception {
		List<Object> results = (List<Object>) new FormController().search(
				"Basic Form", emptyRequest(), new MockHttpServletResponse())
				.get("results");
		Assert.assertEquals(1, results.size());
		Util.log("Found " + results.size() + " form(s)", results);
		Object result = results.get(0);
		Assert.assertEquals("d9218f76-6c39-45f4-8efa-4c5c6c199f50",
				PropertyUtils.getProperty(result, "uuid"));
		Assert.assertNotNull(PropertyUtils.getProperty(result, "links"));
		Assert.assertNotNull(PropertyUtils.getProperty(result, "display"));
	}
}
