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

import org.openmrs.Field;
import org.openmrs.FieldAnswer;
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
 * {@link Resource} for FieldAnswers, supporting standard CRUD operations
 */
@SubResource(parent = FieldResource.class, path = "fieldAnswers")
@Handler(supports = FieldAnswer.class, order = 0)
public class FieldAnswerResource
		extends
			DelegatingSubResource<FieldAnswer, Field, FieldResource> {

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.BaseDelegatingResource#getRepresentationDescription(org.openmrs.module.webservices.rest.web.representation.Representation)
	 */
	@Override
	public DelegatingResourceDescription getRepresentationDescription(
			Representation rep) {
		if (rep instanceof DefaultRepresentation) {
			DelegatingResourceDescription description = new DelegatingResourceDescription();
			description.addProperty("uuid");
			description.addProperty("concept", Representation.REF);
			description.addProperty("dirty");
			description.addSelfLink();
			description.addLink("full", ".?v="
					+ RestConstants.REPRESENTATION_FULL);
			return description;
		} else if (rep instanceof FullRepresentation) {
			DelegatingResourceDescription description = new DelegatingResourceDescription();
			description.addProperty("uuid");
			description.addProperty("concept", Representation.REF);
			description.addProperty("dirty");
			description.addProperty("auditInfo", findMethod("getAuditInfo"));
			description.addSelfLink();
			return description;
		}
		return null;
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingSubResource#getParent(java.lang.Object)
	 */
	@Override
	public Field getParent(FieldAnswer instance) {
		return instance.getField();
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.BaseDelegatingResource#newDelegate()
	 */
	@Override
	public FieldAnswer newDelegate() {
		return new FieldAnswer();
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingSubResource#setParent(java.lang.Object,
	 *      java.lang.Object)
	 */
	@Override
	public void setParent(FieldAnswer instance, Field field) {
		instance.setField(field);
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.BaseDelegatingResource#getByUniqueId(java.lang.String)
	 */
	@Override
	public FieldAnswer getByUniqueId(String uniqueId) {
		return Context.getFormService().getFieldAnswerByUuid(uniqueId);
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingSubResource#doGetAll(java.lang.Object,
	 *      org.openmrs.module.webservices.rest.web.RequestContext)
	 */
	@Override
	public List<FieldAnswer> doGetAll(Field parent, RequestContext context)
			throws ResponseException {
		return new ArrayList<FieldAnswer>(parent.getAnswers());
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.BaseDelegatingResource#save(java.lang.Object)
	 */
	@Override
	protected FieldAnswer save(FieldAnswer delegate) {
		// make sure it has not already been added to the form
		boolean needToAdd = true;
		for (FieldAnswer pa : delegate.getField().getAnswers()) {
			if (pa.equals(delegate)) {
				needToAdd = false;
				break;
			}
		}
		if (needToAdd)
			delegate.getField().addAnswer(delegate);

		Context.getFormService().saveField(delegate.getField());

		return delegate;
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingCrudResource#delete(java.lang.Object,
	 *      java.lang.String, org.openmrs.module.webservices.rest.web.RequestContext)
	 */
	@Override
	protected void delete(FieldAnswer delegate, String reason,
			RequestContext context) throws ResponseException {
		delegate.getField().removeAnswer(delegate);
		Context.getFormService().saveField(delegate.getField());
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingCrudResource#purge(java.lang.Object,
	 *      org.openmrs.module.webservices.rest.web.RequestContext)
	 */
	@Override
	public void purge(FieldAnswer delegate, RequestContext context)
			throws ResponseException {
		delegate.getField().removeAnswer(delegate);
		Context.getFormService().saveField(delegate.getField());
	}

	/**
	 * Gets the display string for a fieldAnswer attribute.
	 * 
	 * @param fa the fieldAnswer attribute.
	 * @return attribute type + value (for concise display purposes)
	 */
	public String getDisplayString(FieldAnswer fa) {
		if (fa.getId() == null)
			return "";
		return fa.getConcept().getDisplayString();
	}
}
