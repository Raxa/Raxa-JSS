/**
 * The contents of this file are subject to the OpenMRS Public License
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

import org.openmrs.module.webservices.forms.web.controller.FormFieldController;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import junit.framework.Assert;

import org.apache.commons.beanutils.PropertyUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.openmrs.FormField;
import org.openmrs.api.FormService;
import org.openmrs.api.context.Context;
import org.openmrs.module.webservices.rest.SimpleObject;
import org.openmrs.web.test.BaseModuleWebContextSensitiveTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

/**
 * Tests functionality of {@link FormFieldController}.
 */
public class FormFieldControllerTest extends BaseModuleWebContextSensitiveTest {

	String formUuid = "d9218f76-6c39-45f4-8efa-4c5c6c199f50";

	String formFieldUuid = "1c822b7b-7840-463d-ba70-e0c8338a4c2d";

	private FormService service;

	private FormFieldController controller;

	private MockHttpServletRequest request;

	private HttpServletResponse response;

	@Before
	public void before() throws Exception {
		this.service = Context.getFormService();
		this.controller = new FormFieldController();
		this.request = new MockHttpServletRequest();
		this.response = new MockHttpServletResponse();
	}

	@Test
	public void shouldGetAFormField() throws Exception {
		Object result = controller.retrieve(formUuid, formFieldUuid, request);
		Assert.assertNotNull(result);
		Assert.assertEquals(false, PropertyUtils
				.getProperty(result, "required"));
		Assert.assertEquals(10.0f, PropertyUtils.getProperty(result,
				"sortWeight"));
		Assert.assertNull(PropertyUtils.getProperty(result, "auditInfo"));
		Assert.assertNotNull(PropertyUtils.getProperty(result, "uuid"));
	}

	@Test
	public void shouldListFormFieldsForForm() throws Exception {
		List<Object> result = controller.getAll(formUuid, request, response);
		Assert.assertNotNull(result);
		Assert.assertEquals(3, result.size());
	}

	@Test
	public void shouldAddFormFieldToForm() throws Exception {
		int before = service.getFormByUuid(formUuid).getFormFields().size();
		String json = "{ \"fieldNumber\":10, \"field\":\"e1ddea4d-744a-40cc-bb2e-4efea462708d\", \"minOccurs\":2, \"sortWeight\":11.0}";
		SimpleObject post = new ObjectMapper().readValue(json,
				SimpleObject.class);
		controller.create(formUuid, post, request, response);
		int after = service.getFormByUuid(formUuid).getFormFields().size();
		Assert.assertEquals(before + 1, after);
	}

	@Test
	public void shouldEditSortWeight() throws Exception {
		String json = "{ \"sortWeight\":100.0 }";
		SimpleObject post = new ObjectMapper().readValue(json,
				SimpleObject.class);
		FormField formField = service.getFormFieldByUuid(formFieldUuid);
		Assert.assertEquals(10.0f, formField.getSortWeight());
		controller.update(formUuid, formFieldUuid, post, request, response);
		formField = service.getFormFieldByUuid(formFieldUuid);
		Assert.assertNotNull(formField);
		Assert.assertEquals(100.0f, formField.getSortWeight());
	}

	@Test
	public void shouldRetireFormField() throws Exception {
		FormField formField = service.getFormFieldByUuid(formFieldUuid);
		Assert.assertFalse(formField.isRequired());
		controller.delete(formUuid, formFieldUuid, "unit test", request,
				response);
		formField = service.getFormFieldByUuid(formFieldUuid);
		Assert.assertTrue(formField.isRetired());
		Assert.assertEquals("unit test", formField.getRetireReason());
	}

	@Test
	public void shouldPurgeFormField() throws Exception {
		Number before = (Number) Context.getAdministrationService().executeSQL(
				"select count(*) from form_field where form_id = 1", true).get(
				0).get(0);

		controller.purge(formUuid, formFieldUuid, request, response);
		Context.flushSession();
		Number after = (Number) Context.getAdministrationService().executeSQL(
				"select count(*) from form_field where form_id = 1", true).get(
				0).get(0);
		Assert.assertEquals(before.intValue() - 1, after.intValue());
		Assert.assertNull(service.getFormFieldByUuid(formFieldUuid));
	}
}
