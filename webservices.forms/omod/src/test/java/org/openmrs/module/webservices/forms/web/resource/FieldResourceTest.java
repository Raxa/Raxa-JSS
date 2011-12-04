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
package org.openmrs.module.webservices.forms.web.resource;

import org.openmrs.Field;
import org.openmrs.api.context.Context;
import org.openmrs.module.webservices.forms.web.resource.FieldResource;
import org.openmrs.module.webservices.rest.web.representation.Representation;
import org.openmrs.module.webservices.rest.web.resource.impl.BaseDelegatingResourceTest;

public class FieldResourceTest
		extends
			BaseDelegatingResourceTest<FieldResource, Field> {

	@Override
	public Field newObject() {
		return Context.getFormService().getFieldByUuid(getUuidProperty());
	}

	@Override
	public void validateDefaultRepresentation() throws Exception {
		super.validateDefaultRepresentation();
		assertPropEquals("name", getObject().getName());
		assertPropEquals("description", getObject().getDescription());
		assertPropPresent("fieldType");
		assertPropPresent("concept");
		assertPropEquals("tableName", getObject().getTableName());
		assertPropEquals("defaultValue", getObject().getDefaultValue());
		assertPropEquals("selectMultiple", getObject().getSelectMultiple());
		assertPropPresent("fieldAnswers");
		assertPropEquals("retired", getObject().getRetired());
	}

	@Override
	public void validateFullRepresentation() throws Exception {
		super.validateFullRepresentation();
		assertPropEquals("name", getObject().getName());
		assertPropEquals("description", getObject().getDescription());
		assertPropPresent("fieldType");
		assertPropPresent("concept");
		assertPropEquals("tableName", getObject().getTableName());
		assertPropEquals("defaultValue", getObject().getDefaultValue());
		assertPropEquals("selectMultiple", getObject().getSelectMultiple());
		assertPropPresent("fieldAnswers");
		assertPropEquals("retired", getObject().getRetired());
	}

	@Override
	public String getDisplayProperty() {
		return "Some concept";
	}

	@Override
	public String getUuidProperty() {
		return ResourceTestConstants.FIELD_UUID;
	}

}
