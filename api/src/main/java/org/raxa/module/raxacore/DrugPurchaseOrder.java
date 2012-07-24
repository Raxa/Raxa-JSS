package org.raxa.module.raxacore;

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

import java.io.Serializable;
import java.util.Date;

import org.openmrs.BaseOpenmrsMetadata;

public class DrugPurchaseOrder extends BaseOpenmrsMetadata implements Serializable {
	
	private Integer drugPurchaseOrderId;
	
	private boolean received;
	
	private Integer providerId;
	
	private Integer locationId;
	
	private Date drugPurchaseOrderDate;
	
	public DrugPurchaseOrder() {
		
	}
	
	public Integer getId() {
		// TODO Auto-generated method stub
		return getDrugPurchaseOrder();
	}
	
	public void setId(Integer arg0) {
		setDrugPurchaseOrder(arg0);
		
	}
	
	public Integer getDrugPurchaseOrder() {
		return drugPurchaseOrderId;
	}
	
	public void setDrugPurchaseOrder(Integer drugPurchaseOrderId) {
		this.drugPurchaseOrderId = drugPurchaseOrderId;
	}
	
	public boolean isReceived() {
		return received;
	}
	
	public void setReceived(boolean received) {
		this.received = received;
	}
	
	public Integer getProviderId() {
		return providerId;
	}
	
	public void setProviderId(Integer providerId) {
		this.providerId = providerId;
	}
	
	public Integer getLocationId() {
		return locationId;
	}
	
	public void setLocationId(Integer locationId) {
		this.locationId = locationId;
	}
	
	public Date getDrugPurchaseOrderDate() {
		return drugPurchaseOrderDate;
	}
	
	public void setDrugPurchaseOrderDate(Date drugPurchaseOrderDate) {
		this.drugPurchaseOrderDate = drugPurchaseOrderDate;
	}
	
}
