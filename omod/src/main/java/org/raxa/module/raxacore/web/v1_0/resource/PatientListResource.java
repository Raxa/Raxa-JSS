package org.raxa.module.raxacore.web.v1_0.resource;

/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

import java.util.List;
import org.openmrs.Patient;
import org.openmrs.annotation.Handler;
import org.openmrs.api.context.Context;
import org.openmrs.module.webservices.rest.web.RequestContext;
import org.openmrs.module.webservices.rest.web.RestConstants;
import org.openmrs.module.webservices.rest.web.annotation.PropertyGetter;
import org.openmrs.module.webservices.rest.web.annotation.Resource;
import org.openmrs.module.webservices.rest.web.representation.DefaultRepresentation;
import org.openmrs.module.webservices.rest.web.representation.FullRepresentation;
import org.openmrs.module.webservices.rest.web.representation.Representation;
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
	
	@PropertyGetter("patients")
	public List<Patient> getPatients(PatientList patientList) {
		return getPatientListService().getPatientsInPatientList(patientList);
	}
	
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
			description.addProperty("uuid");
			description.addProperty("display", findMethod("getDisplayString"));
			description.addProperty("name");
			description.addProperty("description");
			description.addProperty("searchQuery");
			description.addProperty("patients", Representation.REF);
			description.addProperty("retired");
			description.addSelfLink();
			description.addLink("full", ".?v=" + RestConstants.REPRESENTATION_FULL);
			return description;
		} else if (rep instanceof FullRepresentation) {
			DelegatingResourceDescription description = new DelegatingResourceDescription();
			description.addProperty("uuid");
			description.addProperty("display", findMethod("getDisplayString"));
			description.addProperty("name");
			description.addProperty("description");
			description.addProperty("searchQuery");
			description.addProperty("patients", Representation.DEFAULT);
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
		return getPatientListService().getPatientListByUuid(uuid);
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
		return getPatientListService().savePatientList(patientList);
	}
	
	@Override
	protected NeedsPaging<PatientList> doGetAll(RequestContext context) throws ResponseException {
		return new NeedsPaging<PatientList>(getPatientListService().getAllPatientList(false), context);
	}
	
	@Override
	protected NeedsPaging<PatientList> doSearch(String query, RequestContext context) {
		return new NeedsPaging<PatientList>(getPatientListService().getPatientListByName(query), context);
	}
	
	@Override
	public String getDisplayString(PatientList delegate) {
		if (delegate.getName() == null) {
			return "";
		}
		return delegate.getName() + " - " + delegate.getDescription();
	}
	
	@Override
	public String getResourceVersion() {
		return "1.0";
	}
}
