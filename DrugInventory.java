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

public class DrugInventory extends BaseOpenmrsMetadata implements Serializable {
	
	private Integer drugInventoryId;
	
	private String drugInventoryName;
	
	private String drugInventoryDescription;
	
	private Integer drugId;
	
	private Integer quantity;
	
	private Date expiryDate;
	
	private String batch;
	
	private Integer value;
	
	private String status;
	
	private Integer providerId;
	
	private Integer locationId;
	
	private Integer drugPurchaseOrderId;
	
	public DrugInventory() {
		
	}
	
	public Integer getId() {
		// TODO Auto-generated method stub
		return getDrugInventoryId();
	}
	
	public void setId(Integer arg0) {
		// TODO Auto-generated method stub
		setDrugInventoryId(arg0);
	}
	
	public Integer getDrugInventoryId() {
		return drugInventoryId;
	}
	
	public void setDrugInventoryId(Integer drugInventoryId) {
		this.drugInventoryId = drugInventoryId;
	}
	
	public String getDrugInventoryName() {
		return drugInventoryName;
	}
	
	public void setDrugInventoryName(String drugInventoryName) {
		this.drugInventoryName = drugInventoryName;
	}
	
	public String getDrugInventoryDescription() {
		return drugInventoryDescription;
	}
	
	public void setDrugInventoryDescription(String drugInventoryDescription) {
		this.drugInventoryDescription = drugInventoryDescription;
	}
	
	public Integer getDrugId() {
		return drugId;
	}
	
	public void setDrugId(Integer drugd) {
		this.drugId = drugId;
	}
	
	public Integer getQuantity() {
		return quantity;
	}
	
	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}
	
	public Date getExpiryDate() {
		return expiryDate;
	}
	
	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}
	
	public String getBatch() {
		return batch;
	}
	
	public void setBatch(String batch) {
		this.batch = batch;
	}
	
	public Integer getValue() {
		return value;
	}
	
	public void setValue(Integer value) {
		this.value = value;
	}
	
	public String getStatus() {
		return status;
	}
	
	public void setStatus(String status) {
		this.status = status;
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
	
	public Integer getDrugPurchaseOrderId() {
		return drugPurchaseOrderId;
	}
	
	public void setDrugPurchaseOrderId(Integer drugPurchaseOrderId) {
		this.drugPurchaseOrderId = drugPurchaseOrderId;
	}
	
}
