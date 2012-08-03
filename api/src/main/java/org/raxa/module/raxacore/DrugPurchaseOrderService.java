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
import org.raxa.module.raxacore.db.DrugPurchaseOrderDAO;
import org.springframework.transaction.annotation.Transactional;

public interface DrugPurchaseOrderService extends OpenmrsService {
	
	DrugPurchaseOrder saveDrugPurchaseOrder(DrugPurchaseOrder drugPurchaseOrder);
	
	DrugPurchaseOrder getDrugPurchaseOrderByUuid(String uuid);
	
	List<DrugPurchaseOrder> getAllDrugPurchaseOrders();
	
	List<DrugPurchaseOrder> getAllDrugPurchaseOrdersNotReceived();
	
	DrugPurchaseOrder updateDrugPurchaseOrder(DrugPurchaseOrder drugPurchaseOrder);
	
	void deleteDrugPurchaseOrder(DrugPurchaseOrder drugPurchaseOrder);
	
	List<DrugPurchaseOrder> getDrugPurchaseOrderByProvider(Integer providerId);
	
}
