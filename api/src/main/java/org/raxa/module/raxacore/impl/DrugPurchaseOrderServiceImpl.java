package org.raxa.module.raxacore.impl;

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

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.Encounter;
import org.openmrs.EncounterType;
import org.openmrs.Patient;
import org.openmrs.api.context.Context;
import org.raxa.module.raxacore.DrugPurchaseOrder;
import org.raxa.module.raxacore.DrugPurchaseOrderService;
import org.raxa.module.raxacore.db.DrugPurchaseOrderDAO;
import org.raxa.module.raxacore.db.PatientListDAO;

public class DrugPurchaseOrderServiceImpl implements DrugPurchaseOrderService {
	
	private DrugPurchaseOrderDAO dao;
	
	private Log log = LogFactory.getLog(this.getClass());
	
	public void setDrugPurchaseOrderDAO(DrugPurchaseOrderDAO dao) {
		this.dao = dao;
		
	}
	
	public void onShutdown() {
		
		log.info("Starting drug purchase order service");
	}
	
	public void onStartup() {
		
		log.info("Starting drug purchase order service");
	}
	
	public DrugPurchaseOrder saveDrugPurchaseOrder(DrugPurchaseOrder drugPurchaseOrder) {
		
		return dao.saveDrugPurchaseOrder(drugPurchaseOrder);
	}
	
	public DrugPurchaseOrder getDrugPurchaseOrderByUuid(String uuid) {
		
		return dao.getDrugPurchaseOrderByUuid(uuid);
	}
	
	public List<DrugPurchaseOrder> getAllDrugPurchaseOrders() {
		
		return dao.getAllDrugPurchaseOrders();
	}
	
	public List<DrugPurchaseOrder> getAllDrugPurchaseOrdersNotReceived() {
		
		return dao.getAllDrugPurchaseOrdersNotReceived();
	}
	
	public DrugPurchaseOrder updateDrugPurchaseOrder(DrugPurchaseOrder drugPurchaseOrder) {
		
		return dao.updateDrugPurchaseOrder(drugPurchaseOrder);
	}
	
	public void deleteDrugPurchaseOrder(DrugPurchaseOrder drugPurchaseOrder) {
		
		dao.deleteDrugPurchaseOrder(drugPurchaseOrder);
	}
	
	public List<DrugPurchaseOrder> getDrugPurchaseOrderByProvider(Integer providerId) {
		
		return dao.getDrugPurchaseOrderByProvider(providerId);
	}
	
}
