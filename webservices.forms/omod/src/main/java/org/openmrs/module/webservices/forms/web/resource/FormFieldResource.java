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

import java.util.List;
import java.util.ArrayList;

import org.openmrs.Form;
import org.openmrs.FormField;
import org.openmrs.annotation.Handler;
import org.openmrs.api.context.Context;
import org.openmrs.module.webservices.rest.SimpleObject;
import org.openmrs.module.webservices.rest.web.ConversionUtil;
import org.openmrs.module.webservices.rest.web.RequestContext;
import org.openmrs.module.webservices.rest.web.RestConstants;
import org.openmrs.module.webservices.rest.web.annotation.Resource;
import org.openmrs.module.webservices.rest.web.annotation.SubResource;
import org.openmrs.module.webservices.rest.web.representation.DefaultRepresentation;
import org.openmrs.module.webservices.rest.web.representation.FullRepresentation;
import org.openmrs.module.webservices.rest.web.representation.Representation;
import org.openmrs.module.webservices.rest.web.resource.impl.DelegatingResourceDescription;
import org.openmrs.module.webservices.rest.web.resource.impl.DelegatingSubResource;
import org.openmrs.module.webservices.rest.web.response.ResponseException;

/**
 * {@link Resource} for FormFieldAttributes, supporting standard CRUD operations
 */
@SubResource(parent = FormResource.class, path = "formFields")
@Handler(supports = FormField.class, order = 0)
public class FormFieldResource
		extends
			DelegatingSubResource<FormField, Form, FormResource> {

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.BaseDelegatingResource#getRepresentationDescription(org.openmrs.module.webservices.rest.web.representation.Representation)
	 */
	@Override
	public DelegatingResourceDescription getRepresentationDescription(
			Representation rep) {
		if (rep instanceof DefaultRepresentation) {
			DelegatingResourceDescription description = new DelegatingResourceDescription();
			description.addProperty("uuid");
			description.addProperty("field", Representation.DEFAULT);
			description.addProperty("parent", Representation.REF);
			description.addProperty("fieldNumber");
			description.addProperty("fieldPart");
			description.addProperty("pageNumber");
			description.addProperty("minOccurs");
			description.addProperty("maxOccurs");
			description.addProperty("required");
			description.addProperty("sortWeight");
			description.addSelfLink();
			description.addLink("full", ".?v="
					+ RestConstants.REPRESENTATION_FULL);
			return description;
		} else if (rep instanceof FullRepresentation) {
			DelegatingResourceDescription description = new DelegatingResourceDescription();
			description.addProperty("uuid");
			description.addProperty("field", Representation.DEFAULT);
			description.addProperty("parent", Representation.FULL);
			description.addProperty("fieldNumber");
			description.addProperty("fieldPart");
			description.addProperty("pageNumber");
			description.addProperty("minOccurs");
			description.addProperty("maxOccurs");
			description.addProperty("required");
			description.addProperty("sortWeight");
			description.addProperty("creator", Representation.REF);
			description.addProperty("dateCreated");
			description.addProperty("changedBy", Representation.REF);
			description.addProperty("dateChanged");
			description.addSelfLink();
			return description;
		}
		return null;
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingSubResource#getParent(java.lang.Object)
	 */
	@Override
	public Form getParent(FormField instance) {
		return instance.getForm();
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.BaseDelegatingResource#newDelegate()
	 */
	@Override
	public FormField newDelegate() {
		return new FormField();
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingSubResource#setParent(java.lang.Object,
	 *      java.lang.Object)
	 */
	@Override
	public void setParent(FormField instance, Form form) {
		instance.setForm(form);
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.BaseDelegatingResource#getByUniqueId(java.lang.String)
	 */
	@Override
	public FormField getByUniqueId(String uniqueId) {
		return Context.getFormService().getFormFieldByUuid(uniqueId);
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingSubResource#doGetAll(java.lang.Object,
	 *      org.openmrs.module.webservices.rest.web.RequestContext)
	 */
	@Override
	public List<FormField> doGetAll(Form parent, RequestContext context)
			throws ResponseException {
		return new ArrayList<FormField>(parent.getFormFields());
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.BaseDelegatingResource#save(java.lang.Object)
	 */
	@Override
	protected FormField save(FormField delegate) {
		// make sure it has not already been added to the form
		boolean needToAdd = true;
		for (FormField pa : delegate.getForm().getFormFields()) {
			if (pa.equals(delegate)) {
				needToAdd = false;
				break;
			}
		}
		if (needToAdd)
			delegate.getForm().addFormField(delegate);

		Context.getFormService().saveForm(delegate.getForm());

		return delegate;
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingCrudResource#delete(java.lang.Object,
	 *      java.lang.String, org.openmrs.module.webservices.rest.web.RequestContext)
	 */
	@Override
	protected void delete(FormField delegate, String reason,
			RequestContext context) throws ResponseException {
		delegate.setRetired(true);
		delegate.setRetireReason(reason);
		Context.getFormService().saveForm(delegate.getForm());
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingCrudResource#purge(java.lang.Object,
	 *      org.openmrs.module.webservices.rest.web.RequestContext)
	 */
	public void purge(FormField delegate, RequestContext context)
			throws ResponseException {
		delegate.getForm().removeFormField(delegate);
		Context.getFormService().saveForm(delegate.getForm());

	}

	/**
	 * Gets the display string for a formField attribute.
	 * 
	 * @param ff the formField attribute.
	 * @return attribute type + value (for concise display purposes)
	 */
	public String getDisplayString(FormField ff) {
		if (ff.getFormFieldId() == null)
			return "";
		//		return ff.getField().getName();
		return ff.getName();
	}
}
