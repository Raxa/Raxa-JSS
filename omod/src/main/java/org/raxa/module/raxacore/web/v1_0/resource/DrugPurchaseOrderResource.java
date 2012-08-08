package org.raxa.module.raxacore.web.v1_0.resource;

import java.util.List;
import org.openmrs.annotation.Handler;
import org.openmrs.api.context.Context;
import org.openmrs.module.webservices.rest.web.RequestContext;
import org.openmrs.module.webservices.rest.web.RestConstants;
import org.openmrs.module.webservices.rest.web.annotation.Resource;
import org.openmrs.module.webservices.rest.web.annotation.PropertyGetter;
import org.openmrs.module.webservices.rest.web.representation.DefaultRepresentation;
import org.openmrs.module.webservices.rest.web.representation.FullRepresentation;
import org.openmrs.module.webservices.rest.web.representation.Representation;
import org.openmrs.module.webservices.rest.web.resource.impl.DelegatingResourceDescription;
import org.openmrs.module.webservices.rest.web.resource.impl.MetadataDelegatingCrudResource;
import org.openmrs.module.webservices.rest.web.resource.impl.NeedsPaging;
import org.openmrs.module.webservices.rest.web.response.ResourceDoesNotSupportOperationException;
import org.openmrs.module.webservices.rest.web.response.ResponseException;
import org.raxa.module.raxacore.DrugPurchaseOrder;
import org.raxa.module.raxacore.DrugPurchaseOrderService;

/**
 * {@link Resource} for DrugPurchaseOrder, supporting standard CRUD operations
 */
@Resource("drugpurchaseorder")
@Handler(supports = DrugPurchaseOrder.class, order = 0)
public class DrugPurchaseOrderResource extends MetadataDelegatingCrudResource<DrugPurchaseOrder> {
	
	private DrugPurchaseOrderService getDrugPurchaseOrderService() {
		return Context.getService(DrugPurchaseOrderService.class);
	}
	
	@PropertyGetter("drugpurchaseorder")
	public DrugPurchaseOrder getDrugPurchaseOrderByUuid(String uuid) {
		return getDrugPurchaseOrderService().getDrugPurchaseOrderByUuid(uuid);
	}
	
	@Override
	public DelegatingResourceDescription getRepresentationDescription(Representation rep) {
		if (rep instanceof DefaultRepresentation) {
			DelegatingResourceDescription description = new DelegatingResourceDescription();
			description.addProperty("uuid");
			description.addProperty("name");
			description.addProperty("providerId");
			description.addLink("full", ".?v=" + RestConstants.REPRESENTATION_FULL);
			return description;
		} else if (rep instanceof FullRepresentation) {
			DelegatingResourceDescription description = new DelegatingResourceDescription();
			description.addProperty("uuid");
			description.addProperty("name");
			description.addProperty("providerId");
			
			return description;
		}
		return null;
		
	}
	
	@Override
	public DelegatingResourceDescription getCreatableProperties() {
		DelegatingResourceDescription description = new DelegatingResourceDescription();
		description.addRequiredProperty("name");
		description.addRequiredProperty("ProviderId");
		return description;
	}
	
	@Override
	public DrugPurchaseOrder newDelegate() {
		return new DrugPurchaseOrder();
	}
	
	@Override
	public DrugPurchaseOrder save(DrugPurchaseOrder drugOrder) {
		return getDrugPurchaseOrderService().saveDrugPurchaseOrder(drugOrder);
	}
	
	public DrugPurchaseOrder getByUniqueId(String uuid) {
		return getDrugPurchaseOrderService().getDrugPurchaseOrderByUuid(uuid);
	}
	
	protected NeedsPaging<DrugPurchaseOrder> doGetAll(RequestContext context) throws ResponseException {
		return new NeedsPaging<DrugPurchaseOrder>(getDrugPurchaseOrderService().getAllDrugPurchaseOrders(), context);
	}
	
	@Override
	public void purge(DrugPurchaseOrder t, RequestContext rc) throws ResponseException {
		throw new UnsupportedOperationException("Not supported yet.");
	}
	
}
