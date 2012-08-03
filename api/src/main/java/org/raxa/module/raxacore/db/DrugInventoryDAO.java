package org.raxa.module.raxacore.db;

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

import java.util.List;
import org.openmrs.api.db.DAOException;
import org.raxa.module.raxacore.DrugInventory;

public interface DrugInventoryDAO {
	
	public DrugInventory saveDrugInventory(DrugInventory drugInventory) throws DAOException;
	
	public void deleteDrugInventory(DrugInventory drugInventory) throws DAOException;
	
	public DrugInventory getDrugInventoryByUuid(String uuid);
	
	public List<DrugInventory> getAllDrugInventories() throws DAOException;
	
	public List<DrugInventory> getAllDrugInventoriesByStatus(String status);
	
	public DrugInventory updateDrugInventory(DrugInventory drugInventory);
	
	public List<DrugInventory> getDrugInventoryByProvider(Integer providerId);
	
}
