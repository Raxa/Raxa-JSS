package org.raxa.module.raxacore.web.v1_0.controller;

/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
import com.google.common.base.Joiner;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.openmrs.Drug;
import org.openmrs.User;
import org.openmrs.api.context.Context;
import org.openmrs.module.webservices.rest.SimpleObject;
import org.openmrs.module.webservices.rest.web.RestUtil;
import org.openmrs.module.webservices.rest.web.annotation.WSDoc;
import org.openmrs.module.webservices.rest.web.response.ResponseException;
import org.openmrs.module.webservices.rest.web.v1_0.controller.BaseRestController;
import org.raxa.module.raxacore.DrugInventory;
import org.raxa.module.raxacore.DrugInventoryService;
import org.raxa.module.raxacore.PatientList;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Controller for REST web service access to the PatientList resource.
 */
@Controller
@RequestMapping(value = "/rest/v1/raxacore/druginventory")
public class DrugInventoryController extends BaseRestController {
	
	DrugInventoryService service;
	
	Gson gson = new GsonBuilder().serializeNulls().create();
	
	private static final String[] REF = { "uuid", "drugId", "quantity" };
	
	public void initDrugInventoryController() {
		service = Context.getService(DrugInventoryService.class);
	}
	
	private String getResourceVersion() {
		return "1.0";
	}
	
	@RequestMapping(method = RequestMethod.POST)
	@WSDoc("Save DrugInventory")
	@ResponseBody
	public Object saveDrugInventory(@RequestBody SimpleObject post, HttpServletRequest request, HttpServletResponse response)
	        throws ResponseException {
		initDrugInventoryController();
		DrugInventory drugInventory = new DrugInventory();
		//drugInventory.setName(post.get("name").toString());
		//drugInventory.setDescription(post.get("description").toString());
		//drugInventory.setUuid(post.get("uuid").toString());
		drugInventory.setDrugId(Integer.parseInt(post.get("drugId").toString()));
		drugInventory.setQuantity(Integer.parseInt(post.get("quantity").toString()));
		//drugInventory.setDateCreated(new Date());
		//drugInventory.setCreator(new User());
		//drugInventory.setRetired(false);
		drugInventory.setDrug(new Drug(Integer.parseInt(post.get("drugId").toString())));
		if (post.get("originalQuantity") != null) {
			drugInventory.setOriginalQuantity(Integer.parseInt(post.get("originalQuantity").toString()));
		}
		if (post.get("expiryDate") != null) {
			drugInventory.setExpiryDate(new Date(post.get("expiryDate").toString()));
		}
		if (post.get("batch") != null) {
			drugInventory.setBatch(post.get("batch").toString());
		}
		if (post.get("value") != null) {
			drugInventory.setValue(Integer.parseInt(post.get("value").toString()));
		}
		if (post.get("status") != null) {
			drugInventory.setStatus(post.get("status").toString());
		}
		if (post.get("providerId") != null) {
			drugInventory.setProviderId(Integer.parseInt(post.get("providerId").toString()));
		}
		if (post.get("locationId") != null) {
			drugInventory.setLocationId(Integer.parseInt(post.get("locationId").toString()));
		}
		if (post.get("drugPurchaseOrderId") != null) {
			drugInventory.setDrugPurchaseOrderId(Integer.parseInt(post.get("drugPurchaseOrderId").toString()));
		}
		DrugInventory created;
		SimpleObject obj = obj = new SimpleObject();
		;
		try {
			created = service.saveDrugInventory(drugInventory);
			
			obj.add("uuid", created.getUuid());
			obj.add("drugId", created.getDrugId());
			obj.add("quantity", created.getQuantity());
		}
		catch (Exception e) {
			System.out.println("helllloooooo errroorr ocuuured");
			e.printStackTrace();
		}
		return RestUtil.created(response, obj);
		
	}
	
	@RequestMapping(value = "/{uuid}", method = RequestMethod.GET)
	@WSDoc("Gets drug inventory for the uuid path")
	@ResponseBody()
	public String getDrugInventoryByUuid(@PathVariable("uuid") String uuid, HttpServletRequest request)
	        throws ResponseException {
		initDrugInventoryController();
		DrugInventory drugInventory = service.getDrugInventoryByUuid(uuid);
		SimpleObject obj = new SimpleObject();
		obj.add("uuid", drugInventory.getUuid());
		obj.add("drugId", drugInventory.getDrugId());
		obj.add("quantity", drugInventory.getQuantity());
		return gson.toJson(obj);
	}
}
