package org.raxa.module.raxacore;

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
import org.openmrs.Encounter;
import org.openmrs.EncounterType;
import org.openmrs.Patient;
import org.openmrs.annotation.Authorized;
import org.openmrs.api.OpenmrsService;
import org.openmrs.util.PrivilegeConstants;
import org.raxa.module.raxacore.db.DrugInventoryDAO;
import org.springframework.transaction.annotation.Transactional;

public interface DrugInventoryService extends OpenmrsService {
	
	DrugInventory saveDrugInventory(DrugInventory drugInventory);
	
	DrugInventory getDrugInventoryByUuid(String uuid);
	
	List<DrugInventory> getAllDrugDrugInventories();
	
	List<DrugInventory> getAllDrugInventoriesByStatus(String status);
	
	DrugInventory updateDrugInventory(DrugInventory drugInventory);
	
	void deleteDrugInventory(DrugInventory drugInventory);
	
	List<DrugInventory> getDrugInventoryByProvider(Integer providerId);
	
}
