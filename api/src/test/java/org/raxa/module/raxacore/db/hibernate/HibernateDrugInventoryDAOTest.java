package org.raxa.module.raxacore.db.hibernate;

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
import java.util.Date;
import java.util.List;
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;
import org.openmrs.EncounterType;
import org.openmrs.api.context.Context;
import org.openmrs.test.BaseModuleContextSensitiveTest;
import org.raxa.module.raxacore.DrugInventory;
import org.raxa.module.raxacore.PatientList;
import org.raxa.module.raxacore.db.DrugInventoryDAO;
import org.raxa.module.raxacore.db.PatientListDAO;

public class HibernateDrugInventoryDAOTest extends BaseModuleContextSensitiveTest {
	
	private static final String TEST_DATA_PATH = "org/raxa/module/raxacore/include/";
	
	private static final String MODULE_TEST_DATA_XML = TEST_DATA_PATH + "moduleTest2.xml";
	
	private DrugInventoryDAO dao = null;
	
	@Before
	public void setUp() throws Exception {
		executeDataSet(MODULE_TEST_DATA_XML);
		dao = (DrugInventoryDAO) applicationContext
		        .getBean("org.raxa.module.raxacore.db.hibernate.HibernateDrugInventoryDAO");
	}
	
	@Test
	public void testSaveDrugInventory() {
		DrugInventory dInventory = new DrugInventory();
		//NOTE: never set Id, will be generated automatically (when saving)
		dInventory.setName("TestList3");
		dInventory.setDescription("Third Test List");
		dInventory.setCreator(Context.getUserContext().getAuthenticatedUser());
		dInventory.setDateCreated(new java.util.Date());
		dInventory.setUuid("68547121-1b70-465c-99ee-c9dfd95e7d30");
		dInventory.setRetired(Boolean.FALSE);
		dInventory.setBatch("batch 1");
		dInventory.setQuantity(10);
		dInventory.setStatus("true");
		dInventory.setDrugId(1);
		dInventory.setExpiryDate(new Date(2012 - 1 - 1));
		dInventory.setValue(20);
		dInventory.setProviderId(12);
		dInventory.setLocationId(13);
		dInventory.setDrugPurchaseOrderId(14);
		
		dInventory.setDrugInventoryId(14);
		
		dao.saveDrugInventory(dInventory);
		List<DrugInventory> result = (List<DrugInventory>) dao
		        .getDrugInventoryByUuid("68547121-1b70-465c-99ee-c9dfd95e7d30");
		String uuid = result.get(0).getUuid();
		assertEquals(uuid, "TestList3");
	}
	
}
