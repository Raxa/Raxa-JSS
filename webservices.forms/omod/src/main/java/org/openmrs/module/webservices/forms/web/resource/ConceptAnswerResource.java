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

import org.openmrs.Concept;
import org.openmrs.ConceptAnswer;
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
import org.openmrs.module.webservices.rest.web.v1_0.resource.ConceptResource;

/**
 * {@link Resource} for FormFieldAttributes, supporting standard CRUD operations
 */
@SubResource(parent = ConceptResource.class, path = "conceptAnswer")
@Handler(supports = ConceptAnswer.class, order = 0)
public class ConceptAnswerResource
		extends
			DelegatingSubResource<ConceptAnswer, Concept, ConceptResource> {

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
			description.addProperty("answerConcept");
			description.addProperty("answerDrug");
			description.addProperty("sortWeight");
			description.addProperty("creator", Representation.REF);
			description.addProperty("dateCreated");
			description.addSelfLink();
			description.addLink("full", ".?v="
					+ RestConstants.REPRESENTATION_FULL);
			return description;
		} else if (rep instanceof FullRepresentation) {
			DelegatingResourceDescription description = new DelegatingResourceDescription();
			description.addProperty("uuid");
			description.addProperty("concept", Representation.REF);
			description.addProperty("answerConcept");
			description.addProperty("answerDrug");
			description.addProperty("sortWeight");
			description.addProperty("creator", Representation.REF);
			description.addProperty("dateCreated");
			description.addSelfLink();
			return description;
		}
		return null;
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingSubResource#getParent(java.lang.Object)
	 */
	@Override
	public Concept getParent(ConceptAnswer instance) {
		return instance.getConcept();
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.BaseDelegatingResource#newDelegate()
	 */
	@Override
	public ConceptAnswer newDelegate() {
		return new ConceptAnswer();
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingSubResource#setParent(java.lang.Object,
	 *      java.lang.Object)
	 */
	@Override
	public void setParent(ConceptAnswer instance, Concept concept) {
		instance.setConcept(concept);
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.BaseDelegatingResource#getByUniqueId(java.lang.String)
	 */
	@Override
	public ConceptAnswer getByUniqueId(String uniqueId) {
		return Context.getConceptService().getConceptAnswerByUuid(uniqueId);
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingSubResource#doGetAll(java.lang.Object,
	 *      org.openmrs.module.webservices.rest.web.RequestContext)
	 */
	@Override
	public List<ConceptAnswer> doGetAll(Concept parent, RequestContext context)
			throws ResponseException {
		return new ArrayList<ConceptAnswer>(parent.getAnswers());
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.BaseDelegatingResource#save(java.lang.Object)
	 */
	@Override
	protected ConceptAnswer save(ConceptAnswer delegate) {
		// make sure it has not already been added to the form
		boolean needToAdd = true;
		for (ConceptAnswer ca : delegate.getConcept().getAnswers()) {
			if (ca.equals(delegate)) {
				needToAdd = false;
				break;
			}
		}
		if (needToAdd)
			delegate.getConcept().addAnswer(delegate);

		Context.getConceptService().saveConcept(delegate.getConcept());

		return delegate;
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingCrudResource#delete(java.lang.Object,
	 *      java.lang.String, org.openmrs.module.webservices.rest.web.RequestContext)
	 */
	@Override
	protected void delete(ConceptAnswer delegate, String reason,
			RequestContext context) throws ResponseException {
		//		Concept parent = delegate.getConcept();
		//		parent.removeAnswer(delegate);
		//		Context.getConceptService().saveConcept(parent);
		delegate.getConcept().removeAnswer(delegate);
		Context.getConceptService().saveConcept(delegate.getConcept());
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingCrudResource#purge(java.lang.Object,
	 *      org.openmrs.module.webservices.rest.web.RequestContext)
	 */
	public void purge(ConceptAnswer delegate, RequestContext context)
			throws ResponseException {
		delegate.getConcept().removeAnswer(delegate);
		Context.getConceptService().saveConcept(delegate.getConcept());
	}

	/**
	 * Gets the display string for a formField attribute.
	 * 
	 * @param ff the formField attribute.
	 * @return attribute type + value (for concise display purposes)
	 */
	public String getDisplayString(ConceptAnswer ca) {
		if (ca.getConceptAnswerId() == null)
			return "";
		return ca.toString();
	}
}
