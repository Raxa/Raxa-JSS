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
import org.raxa.module.raxacore.DrugInventory;
import org.raxa.module.raxacore.DrugInventoryService;
import org.raxa.module.raxacore.db.DrugInventoryDAO;
import org.raxa.module.raxacore.db.DrugPurchaseOrderDAO;

public class DrugInventoryServiceImpl implements DrugInventoryService {
	
	private DrugInventoryDAO dao;
	
	private Log log = LogFactory.getLog(this.getClass());
	
	public void setDrugInventoryDAO(DrugInventoryDAO dao) {
		this.dao = dao;
		
	}
	
	@Override
	public void onShutdown() {
		
		log.info("Stopping drug inventory service");
	}
	
	@Override
	public void onStartup() {
		
		log.info("Starting drug inventory service");
	}
	
	@Override
	public DrugInventory saveDrugInventory(DrugInventory drugInventory) {
		
		return dao.saveDrugInventory(drugInventory);
	}
	
	@Override
	public DrugInventory getDrugInventoryByUuid(String uuid) {
		
		return dao.getDrugInventoryByUuid(uuid);
	}
	
	@Override
	public List<DrugInventory> getAllDrugDrugInventories() {
		
		return dao.getAllDrugInventories();
	}
	
	@Override
	public List<DrugInventory> getAllDrugInventoriesByStatus(String status) {
		
		return dao.getAllDrugInventoriesByStatus(status);
	}
	
	@Override
	public DrugInventory updateDrugInventory(DrugInventory drugInventory) {
		
		return dao.updateDrugInventory(drugInventory);
	}
	
	@Override
	public void deleteDrugInventory(DrugInventory drugInventory) {
		
		dao.deleteDrugInventory(drugInventory);
	}
	
	@Override
	public List<DrugInventory> getDrugInventoryByProvider(Integer providerId) {
		
		return dao.getDrugInventoryByProvider(providerId);
	}
	
}
