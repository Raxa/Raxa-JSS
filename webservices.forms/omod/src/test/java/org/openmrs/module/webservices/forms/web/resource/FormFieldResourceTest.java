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

import org.openmrs.FormField;
import org.openmrs.api.context.Context;
import org.openmrs.module.webservices.forms.web.resource.FormFieldResource;
import org.openmrs.module.webservices.rest.web.representation.Representation;
import org.openmrs.module.webservices.rest.web.resource.impl.BaseDelegatingResourceTest;

public class FormFieldResourceTest
		extends
			BaseDelegatingResourceTest<FormFieldResource, FormField> {

	@Override
	public FormField newObject() {
		return Context.getFormService().getFormFieldByUuid(getUuidProperty());
	}

	@Override
	public void validateDefaultRepresentation() throws Exception {
		super.validateDefaultRepresentation();
		assertPropPresent("field");
		assertPropPresent("parent");
		assertPropEquals("fieldNumber", 1);
		assertPropEquals("fieldPart", "");
		assertPropEquals("required", false);
		assertPropEquals("sortWeight", 10.0f);
	}

	@Override
	public void validateFullRepresentation() throws Exception {
		super.validateFullRepresentation();
		assertPropPresent("field");
		assertPropPresent("parent");
		assertPropEquals("fieldNumber", 1);
		assertPropEquals("fieldPart", "");
		assertPropEquals("required", false);
		assertPropEquals("sortWeight", 10.0f);
		assertPropPresent("creator");
		assertPropPresent("dateCreated");
		assertPropPresent("changedBy");
		assertPropPresent("dateChanged");
	}

	@Override
	public String getDisplayProperty() {
		return null;
	}

	@Override
	public String getUuidProperty() {
		return ResourceTestConstants.FORM_FIELD_UUID;
	}

}
