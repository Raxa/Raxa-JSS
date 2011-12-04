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

import org.openmrs.Form;
import org.openmrs.api.context.Context;
import org.openmrs.module.webservices.forms.web.resource.FormResource;
import org.openmrs.module.webservices.rest.web.representation.Representation;
import org.openmrs.module.webservices.rest.web.resource.impl.BaseDelegatingResourceTest;

public class FormResourceTest
		extends
			BaseDelegatingResourceTest<FormResource, Form> {

	@Override
	public Form newObject() {
		return Context.getFormService().getFormByUuid(getUuidProperty());
	}

	@Override
	public void validateDefaultRepresentation() throws Exception {
		super.validateDefaultRepresentation();
		assertPropEquals("name", getObject().getName());
		assertPropEquals("version", getObject().getVersion());
		assertPropEquals("build", getObject().getBuild());
		assertPropEquals("published", getObject().getPublished());
		assertPropEquals("description", getObject().getDescription());
		assertPropPresent("encounterType");
		assertPropPresent("formFields");
		assertPropEquals("template", getObject().getTemplate());
		assertPropEquals("xslt", getObject().getXslt());
		assertPropEquals("retired", getObject().getRetired());
	}

	@Override
	public void validateFullRepresentation() throws Exception {
		super.validateFullRepresentation();
		assertPropEquals("name", getObject().getName());
		assertPropEquals("version", getObject().getVersion());
		assertPropEquals("build", getObject().getBuild());
		assertPropEquals("published", getObject().getPublished());
		assertPropEquals("description", getObject().getDescription());
		assertPropPresent("encounterType");
		assertPropPresent("formFields");
		assertPropEquals("template", getObject().getTemplate());
		assertPropEquals("xslt", getObject().getXslt());
		assertPropEquals("retired", getObject().getRetired());
	}

	@Override
	public String getDisplayProperty() {
		return "Basic Form";
	}

	@Override
	public String getUuidProperty() {
		return ResourceTestConstants.FORM_UUID;
	}

}
