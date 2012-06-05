/**
 * The contents of this file are subject to the OpenMRS Public License Version
 * 1.0 (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at http://license.openmrs.org
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for
 * the specific language governing rights and limitations under the License.
 *
 * Copyright (C) OpenMRS, LLC. All Rights Reserved.
 */
package org.raxa.module.raxacore.web.v1_0.resource;

import org.openmrs.annotation.Handler;
import org.openmrs.api.context.Context;
import org.openmrs.module.webservices.rest.web.RequestContext;
import org.openmrs.module.webservices.rest.web.RestConstants;
import org.openmrs.module.webservices.rest.web.annotation.Resource;
import org.openmrs.module.webservices.rest.web.representation.DefaultRepresentation;
import org.openmrs.module.webservices.rest.web.representation.FullRepresentation;
import org.openmrs.module.webservices.rest.web.representation.Representation;
import org.openmrs.module.webservices.rest.web.resource.api.PageableResult;
import org.openmrs.module.webservices.rest.web.resource.impl.DelegatingResourceDescription;
import org.openmrs.module.webservices.rest.web.resource.impl.MetadataDelegatingCrudResource;
import org.openmrs.module.webservices.rest.web.resource.impl.NeedsPaging;
import org.openmrs.module.webservices.rest.web.response.ResourceDoesNotSupportOperationException;
import org.openmrs.module.webservices.rest.web.response.ResponseException;
import org.raxa.module.raxacore.PatientList;
import org.raxa.module.raxacore.PatientListService;

/**
 * {@link Resource} for PatientList, supporting standard CRUD operations
 */
@Resource("patientlist")
@Handler(supports = PatientList.class, order = 0)
public class PatientListResource extends MetadataDelegatingCrudResource<PatientList> {
	
	private PatientListService getPatientListService() {
		return Context.getService(PatientListService.class);
	}
	
	/**
	 * @see
	 * org.openmrs.module.webservices.rest.web.resource.impl.DelegatingCrudResource#getRepresentationDescription(org.openmrs.module.webservices.rest.web.representation.Representation)
	 */
	@Override
	public DelegatingResourceDescription getRepresentationDescription(Representation rep) {
		if (rep instanceof DefaultRepresentation) {
			DelegatingResourceDescription description = new DelegatingResourceDescription();
			description.addProperty("name");
			description.addProperty("description");
			description.addProperty("display", findMethod("getDisplayString"));
			description.addProperty("searchQuery");
			description.addProperty("retired");
			description.addSelfLink();
			description.addLink("full", ".?v=" + RestConstants.REPRESENTATION_FULL);
			return description;
		} else if (rep instanceof FullRepresentation) {
			DelegatingResourceDescription description = new DelegatingResourceDescription();
			description.addProperty("name");
			description.addProperty("description");
			description.addProperty("display", findMethod("getDisplayString"));
			description.addProperty("searchQuery");
			description.addProperty("retired");
			description.addProperty("auditInfo", findMethod("getAuditInfo"));
			description.addSelfLink();
			return description;
		}
		return null;
	}
	
	/**
	 * @see
	 * org.openmrs.module.webservices.rest.web.resource.impl.BaseDelegatingResource#getCreatableProperties()
	 */
	@Override
	public DelegatingResourceDescription getCreatableProperties() {
		DelegatingResourceDescription description = new DelegatingResourceDescription();
		description.addRequiredProperty("name");
		description.addRequiredProperty("description");
		description.addProperty("searchQuery");
		return description;
	}
	
	/**
	 * @throws ResourceDoesNotSupportOperationException
	 * @see
	 * org.openmrs.module.webservices.rest.web.resource.impl.BaseDelegatingResource#getUpdatableProperties()
	 */
	@Override
	public DelegatingResourceDescription getUpdatableProperties() throws ResourceDoesNotSupportOperationException {
		DelegatingResourceDescription description = new DelegatingResourceDescription();
		description.addProperty("description");
		description.addProperty("searchQuery");
		return description;
	}
	
	@Override
	public PatientList getByUniqueId(String uuid) {
		return Context.getService(PatientListService.class).getPatientListByUuid(uuid);
	}
	
	@Override
	public void purge(PatientList t, RequestContext rc) throws ResponseException {
		// TODO: CANNOT PURGE LIST. Needs to be implemented through the service
		throw new ResourceDoesNotSupportOperationException();
	}
	
	@Override
	public PatientList newDelegate() {
		return new PatientList();
	}
	
	@Override
	public PatientList save(PatientList patientList) {
		return Context.getService(PatientListService.class).savePatientList(patientList);
	}
	
	@Override
	protected NeedsPaging<PatientList> doGetAll(RequestContext context) throws ResponseException {
		return new NeedsPaging<PatientList>(getPatientListService().getAllPatientList(false), context);
	}
	
	@Override
	protected NeedsPaging<PatientList> doSearch(String query, RequestContext context) {
		return new NeedsPaging<PatientList>(getPatientListService().getPatientListByName(query), context);
	}
	
}
