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

import org.openmrs.module.webservices.forms.web.controller.FieldTypeController;

import org.apache.commons.beanutils.PropertyUtils;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Assert;
import org.junit.Test;
import org.openmrs.FieldType;
import org.openmrs.api.context.Context;
import org.openmrs.module.webservices.rest.SimpleObject;
import org.openmrs.module.webservices.rest.test.Util;
import org.openmrs.module.webservices.rest.web.RestConstants;
import org.openmrs.web.test.BaseModuleWebContextSensitiveTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.web.context.request.WebRequest;

public class FieldTypeControllerTest extends BaseModuleWebContextSensitiveTest {

	private MockHttpServletRequest emptyRequest() {
		return new MockHttpServletRequest();
	}

	/**
	 * @see FieldTypeController#createFieldType(SimpleObject,WebRequest)
	 * @verifies create a new FieldType
	 */
	@Test
	public void createFieldType_shouldCreateANewFieldType() throws Exception {
		int before = Context.getFormService().getAllFieldTypes(true).size();
		String json = "{ \"name\":\"Test FieldType\",\"description\":\"Test create\",\"isSet\":true}";
		SimpleObject post = new ObjectMapper().readValue(json,
				SimpleObject.class);
		Object newFieldType = new FieldTypeController().create(post,
				emptyRequest(), new MockHttpServletResponse());
		Util.log("Created fieldType", newFieldType);
		Assert.assertEquals(before + 1, Context.getFormService()
				.getAllFieldTypes(true).size());
	}

	/**
	 * @see FieldTypeController#getFieldType(FieldType,WebRequest)
	 * @verifies get a default representation of a fieldType
	 */
	@Test
	public void getFieldType_shouldGetADefaultRepresentationOfAFieldType()
			throws Exception {
		Object result = new FieldTypeController().retrieve(
				"abf16b7d-39a5-4911-89da-0eefbfef7cb4", emptyRequest());
		Assert.assertNotNull(result);
		Util.log("FieldType fetched (default)", result);
		Assert.assertEquals("abf16b7d-39a5-4911-89da-0eefbfef7cb4",
				PropertyUtils.getProperty(result, "uuid"));
		Assert.assertNotNull(PropertyUtils.getProperty(result, "name"));
		Assert.assertNull(PropertyUtils.getProperty(result, "auditInfo"));
	}

	/**
	 * @see FieldTypeController#getFieldType(String,WebRequest)
	 * @verifies get a full representation of a fieldType
	 */
	@Test
	public void getFieldType_shouldGetAFullRepresentationOfAFieldType()
			throws Exception {
		MockHttpServletRequest req = new MockHttpServletRequest();
		req.addParameter(RestConstants.REQUEST_PROPERTY_FOR_REPRESENTATION,
				RestConstants.REPRESENTATION_FULL);
		Object result = new FieldTypeController().retrieve(
				"abf16b7d-39a5-4911-89da-0eefbfef7cb4", req);
		Util.log("FieldType fetched (full)", result);
		Assert.assertNotNull(result);
		Assert.assertEquals("abf16b7d-39a5-4911-89da-0eefbfef7cb4",
				PropertyUtils.getProperty(result, "uuid"));
		Assert.assertNotNull(PropertyUtils.getProperty(result, "auditInfo"));
	}

	/**
	 * @see FieldTypeController#updateFieldType(FieldType,SimpleObject,WebRequest)
	 * @verifies change a property on a fieldType
	 */
	@Test
	public void updateFieldType_shouldChangeAPropertyOnAFieldType()
			throws Exception {
		SimpleObject post = new ObjectMapper().readValue("{\"isSet\":true}",
				SimpleObject.class);
		Object editedFieldType = new FieldTypeController().update(
				"abf16b7d-39a5-4911-89da-0eefbfef7cb4", post, emptyRequest(),
				new MockHttpServletResponse());
		Util.log("Edited fieldType", editedFieldType);
		Assert.assertEquals(true, Context.getFormService().getFieldTypeByUuid(
				"abf16b7d-39a5-4911-89da-0eefbfef7cb4").getIsSet());
	}

	/**
	 * @see FieldTypeController#retireFieldType(FieldType,String,WebRequest)
	 * @verifies void a fieldType
	 */
	@Test
	public void retireFieldType_shouldRetireAFieldType() throws Exception {
		FieldType fieldType = Context.getFormService().getFieldTypeByUuid(
				"abf16b7d-39a5-4911-89da-0eefbfef7cb4");
		Assert.assertFalse(fieldType.isRetired());
		new FieldTypeController().delete(
				"abf16b7d-39a5-4911-89da-0eefbfef7cb4", "test delete",
				emptyRequest(), new MockHttpServletResponse());
		fieldType = Context.getFormService().getFieldTypeByUuid(
				"abf16b7d-39a5-4911-89da-0eefbfef7cb4");
		Assert.assertTrue(fieldType.isRetired());
		Assert.assertEquals("test delete", fieldType.getRetireReason());
	}
}
