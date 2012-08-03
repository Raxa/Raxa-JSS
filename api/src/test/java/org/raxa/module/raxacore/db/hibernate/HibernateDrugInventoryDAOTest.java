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
import org.openmrs.Drug;
import org.openmrs.EncounterType;
import org.openmrs.Location;
import org.openmrs.Provider;
import org.openmrs.api.context.Context;
import org.openmrs.test.BaseModuleContextSensitiveTest;
import org.raxa.module.raxacore.DrugInventory;
import org.raxa.module.raxacore.DrugPurchaseOrder;
import org.raxa.module.raxacore.PatientList;
import org.raxa.module.raxacore.db.DrugInventoryDAO;
import org.raxa.module.raxacore.db.PatientListDAO;

public class HibernateDrugInventoryDAOTest extends BaseModuleContextSensitiveTest {
	
	private static final String TEST_DATA_PATH = "org/raxa/module/raxacore/include/";
	
	private static final String MODULE_TEST_DATA_XML = TEST_DATA_PATH + "moduleTestData.xml";
	
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
		
		
		dInventory.setName("TestList6");
		dInventory.setDescription("Third Test List");
		dInventory.setCreator(Context.getUserContext().getAuthenticatedUser());
		dInventory.setDateCreated(new java.util.Date());
		dInventory.setUuid("68547121-1b70-465c-99ee-c9dfd95e7d34");
		dInventory.setDateCreated(new java.util.Date());
		dInventory.setRetired(Boolean.FALSE);
		dInventory.setBatch("batch 1");
		dInventory.setQuantity(10);
		dInventory.setStatus("true");
		//dInventory.setDrugId(2);
		dInventory.setExpiryDate(new Date(2012 - 1 - 1));
		dInventory.setValue(20);
		dInventory.setProviderId(2);
		dInventory.setLocationId(1);
		dInventory.setDrugPurchaseOrderId(14);
		dInventory.setOriginalQuantity(20);
		
		dao.saveDrugInventory(dInventory);
		DrugInventory result = dao.getDrugInventoryByUuid("68547121-1b70-465c-99ee-c9dfd95e7d34");
		//DrugInventory result=dao.get
		String uuid = result.getUuid();
		assertEquals(uuid, "68547121-1b70-465c-99ee-c9dfd95e7d34");
	}
	
	@Test
	public void testDeleteDrugInventory() {
		DrugInventory dInventory=new DrugInventory();
		dInventory.setName("TestList6");
		dInventory.setDescription("Third Test List");
		dInventory.setCreator(Context.getUserContext().getAuthenticatedUser());
		dInventory.setDateCreated(new java.util.Date());
		dInventory.setUuid("68547121-1b70-465c-99ee-c9dfd95e7d34");
		dInventory.setDateCreated(new java.util.Date());
		dInventory.setRetired(Boolean.FALSE);
		dInventory.setBatch("batch 1");
		dInventory.setQuantity(10);
		dInventory.setStatus("true");
		//dInventory.setDrugId(2);
		dInventory.setExpiryDate(new Date(2012 - 1 - 1));
		dInventory.setValue(20);
		dInventory.setProviderId(2);
		dInventory.setLocationId(1);
		dInventory.setDrugPurchaseOrderId(14);
		dInventory.setOriginalQuantity(20);

		dao.deleteDrugInventory(dInventory);
		
		DrugInventory result=dao.getDrugInventoryByUuid("68547121-1b70-465c-99ee-c9dfd95e7d34");
		assertEquals(result,null);
		
	}
	
	@Test
	public void testGetDrugInventoryByUuid() {
		DrugInventory result=dao.getDrugInventoryByUuid("68547121-1b70-465c-99ee-c9dfd95e7d36");
		String name = result.getName();
		assertEquals(name, "TestList6");
		
	}
	
	@Test
	public void testGetAllDrugInventories() {
		
		List<DrugInventory> allDrugInventories = dao.getAllDrugInventories();
		assertEquals(allDrugInventories.size(), 1);
		
	}
	
	@Test
	public void testGetAllDrugInventoriesByStatus() {
		List<DrugInventory> allDrugInventories = dao.getAllDrugInventoriesByStatus("on the way");
		assertEquals(allDrugInventories.size(), 1);
	}
	
	@Test
	public void testUpdateDrugInventory() {
		DrugInventory dInventory=dao.getDrugInventoryByUuid("68547121-1b70-465c-99ee-c9dfd95e7d36");
		dInventory.setName("new test list");
		dao.updateDrugInventory(dInventory);
		String name=dao.getDrugInventoryByUuid("68547121-1b70-465c-99ee-c9dfd95e7d36").getName();
		assertEquals(name, "new test list");

		
	}
	
	@Test
	public void testGetDrugInventoryByProvider() {
		List<DrugInventory> result = dao.getDrugInventoryByProvider(13);
		assertEquals(result.size(), 1);
		
	}
	
}
