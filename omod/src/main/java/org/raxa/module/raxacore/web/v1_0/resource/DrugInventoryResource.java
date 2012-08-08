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
import org.raxa.module.raxacore.DrugInventory;
import org.raxa.module.raxacore.DrugInventoryService;
import org.raxa.module.raxacore.DrugPurchaseOrder;
import org.raxa.module.raxacore.PatientList;
import org.raxa.module.raxacore.PatientListService;

/**
 * {@link Resource} for PatientList, supporting standard CRUD operations
 * This resource is currently not used because of serialization issue in OpenMRS core (TRUNK-2205)
 */
@Resource("druginventory")
@Handler(supports = DrugInventory.class, order = 0)
public class DrugInventoryResource extends MetadataDelegatingCrudResource<DrugInventory> {
	
	private DrugInventoryService getDrugInventoryService() {
		return Context.getService(DrugInventoryService.class);
	}
	
	@PropertyGetter("druginventory")
	public List<DrugInventory> getAllDrugInventoryList() {
		return getDrugInventoryService().getAllDrugDrugInventories();
	}
	
	@Override
	public DelegatingResourceDescription getRepresentationDescription(Representation rep) {
		// TODO Auto-generated method stub
		if (rep instanceof DefaultRepresentation) {
			DelegatingResourceDescription description = new DelegatingResourceDescription();
			description.addProperty("uuid");
			description.addProperty("druId");
			description.addProperty("quantity");
			description.addLink("full", ".?v=" + RestConstants.REPRESENTATION_FULL);
			return description;
		} else if (rep instanceof FullRepresentation) {
			DelegatingResourceDescription description = new DelegatingResourceDescription();
			description.addProperty("uuid");
			description.addProperty("drugId");
			description.addProperty("quantity");
			
			return description;
		}
		return null;
	}
	
	@Override
	public DelegatingResourceDescription getCreatableProperties() {
		DelegatingResourceDescription description = new DelegatingResourceDescription();
		description.addRequiredProperty("drugId");
		description.addRequiredProperty("quantity");
		return description;
	}
	
	@Override
	public DrugInventory newDelegate() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public DrugInventory save(DrugInventory drugInventory) {
		// TODO Auto-generated method stub
		return getDrugInventoryService().saveDrugInventory(drugInventory);
	}
	
	@Override
	public DrugInventory getByUniqueId(String uuid) {
		return getDrugInventoryService().getDrugInventoryByUuid(uuid);
	}
	
	protected NeedsPaging<DrugInventory> doGetAll(RequestContext context) throws ResponseException {
		return new NeedsPaging<DrugInventory>(getDrugInventoryService().getAllDrugDrugInventories(), context);
	}
	
	@Override
	public void purge(DrugInventory arg0, RequestContext arg1) throws ResponseException {
		throw new UnsupportedOperationException("Not supported yet.");
		
	}
	
	/**
	 * Getter for the patients property on patient list resource
	 * @param patientList
	 * @return 
	 */
}
