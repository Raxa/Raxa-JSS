package org.raxa.module.raxacore.web.v1_0.controller;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.openmrs.Provider;
import org.openmrs.api.context.Context;
import org.openmrs.module.webservices.rest.SimpleObject;
import org.openmrs.module.webservices.rest.web.RestUtil;
import org.openmrs.module.webservices.rest.web.annotation.WSDoc;
import org.openmrs.module.webservices.rest.web.response.ResponseException;
import org.openmrs.module.webservices.rest.web.v1_0.controller.BaseRestController;
import org.raxa.module.raxacore.DrugPurchaseOrder;
import org.raxa.module.raxacore.DrugPurchaseOrderService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Controller for REST web service access to the DrugPurchaseOrder resource.
 */

@Controller
@RequestMapping(value = "/rest/v1/raxacore/drugpurchaseorder")
public class DrugPurchaseOrderController extends BaseRestController {
	
	DrugPurchaseOrderService service;
	
	SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
	
	Gson gson = new GsonBuilder().serializeNulls().create();
	
	private static final String[] REF = { "uuid", "name", "providerId" };
	
	public void initDrugPurchaseOrderController() {
		service = Context.getService(DrugPurchaseOrderService.class);
	}
	
	//<editor-fold defaultstate="collapsed" desc="getResourceVersion">
	/**
	 * Returns the Resource Version
	 */
	private String getResourceVersion() {
		return "1.0";
	}
	
	//</editor-fold>
	
	//<editor-fold defaultstate="collapsed" desc="POST - Without Params">
	/**
	 * Create new  drug purchase order  by POST'ing atleast name and providerId property
	 * in the request body.
	 * 
	 * @param post the body of the POST request
	 * @param request
	 * @param response
	 * @return 201 response status and DrugPurchaseOrder object
	 * @throws ResponseException 
	 */
	@RequestMapping(method = RequestMethod.POST)
	@WSDoc("Save New DrugPurchaseOrder")
	@ResponseBody
	public Object creatnewDrugPurchaseOrder(@RequestBody SimpleObject post, HttpServletRequest request,
	        HttpServletResponse response) throws ResponseException {
		initDrugPurchaseOrderController();
		
		DrugPurchaseOrder drugOrder = new DrugPurchaseOrder();
		drugOrder.setName(post.get("name").toString());
		drugOrder.setProvider(Context.getProviderService().getProvider(Integer.parseInt(post.get("providerId").toString())));
		//drugOrder.setProviderId(new Integer(1));
		
		drugOrder.setProviderId(Integer.parseInt(post.get("providerId").toString()));
		//drugOrder.setDateCreated(new Date());
		
		//drugOrder.setCreator(Context.getUserContext().getAuthenticatedUser());
		
		//drugOrder.setReceived(false);
		
		//
		//drugOrder.setRetired(false);
		
		if (post.get("locationId") != null) {
			drugOrder.setLocationId(Integer.parseInt(post.get("locationId").toString()));
		}
		
		DrugPurchaseOrder created = null;
		SimpleObject obj = new SimpleObject();
		
		created = service.saveDrugPurchaseOrder(drugOrder);
		
		System.out.println("uuid is" + drugOrder.getUuid());
		
		obj.add("uuid", created.getUuid());
		obj.add("name", created.getName());
		obj.add("providerId", created.getProviderId());
		
		return RestUtil.created(response, obj);
		
	}
	
	//</editor-fold>
	
	//<editor-fold defaultstate="collapsed" desc="GET by uuid - DEFAULT REP">
	/**
	 * Get the DrugPurchaseOrder 
	 * 
	 * @param uuid
	 * @param request
	 * @return
	 * @throws ResponseException 
	 */
	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
	@WSDoc("Gets DrugPurchaseOrder for the uuid path")
	@ResponseBody()
	public String getDrugPuchaseOrderByUuid(@PathVariable("uuid") String uuid, HttpServletRequest request)
	        throws ResponseException {
		initDrugPurchaseOrderController();
		DrugPurchaseOrder drugOrder = service.getDrugPurchaseOrderByUuid(uuid);
		SimpleObject obj = new SimpleObject();
		obj.add("uuid", drugOrder.getUuid());
		obj.add("name", drugOrder.getName());
		obj.add("providerId", drugOrder.getProviderId());
		
		return gson.toJson(obj);
	}
	
}
