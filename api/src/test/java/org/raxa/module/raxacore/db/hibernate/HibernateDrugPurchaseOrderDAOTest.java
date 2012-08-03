package org.raxa.module.raxacore.db.hibernate;

import java.util.Date;
import java.util.List;
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;
import org.openmrs.EncounterType;
import org.openmrs.Location;
import org.openmrs.Provider;
import org.openmrs.api.context.Context;
import org.openmrs.test.BaseModuleContextSensitiveTest;
import org.raxa.module.raxacore.DrugPurchaseOrder;
import org.raxa.module.raxacore.PatientList;
import org.raxa.module.raxacore.db.DrugPurchaseOrderDAO;

public class HibernateDrugPurchaseOrderDAOTest extends BaseModuleContextSensitiveTest {
	
	private static final String TEST_DATA_PATH = "org/raxa/module/raxacore/include/";
	
	private static final String MODULE_TEST_DATA_XML = TEST_DATA_PATH + "moduleTestData.xml";
	
	private DrugPurchaseOrderDAO dao = null;
	
	@Before
	public void setUp() throws Exception {
		executeDataSet(MODULE_TEST_DATA_XML);
		dao = (HibernateDrugPurchaseOrderDAO) applicationContext
		        .getBean("org.raxa.module.raxacore.db.hibernate.HibernateDrugPurchaseOrderDAO");
	}
	
	@Test
	public void testsaveDrugPurchaseOrder() {
		DrugPurchaseOrder dpOrder = new DrugPurchaseOrder();
		
		Provider provider = new Provider(1);
		provider.setDateCreated(new Date());
		Location location = new Location(1);
		location.setDateCreated(new Date());
		
		//NOTE: never set Id, will be generated automatically (when saving)
		
		dpOrder.setName("TestList4");
		dpOrder.setDescription("Third Test List");
		dpOrder.setCreator(Context.getUserContext().getAuthenticatedUser());
		dpOrder.setDateCreated(new java.util.Date());
		dpOrder.setDrugPurchaseOrderDate(new Date());
		
		dpOrder.setUuid("68547121-1b70-465c-99ee-c9dfd95e7d30");
		dpOrder.setRetired(Boolean.FALSE);
		dpOrder.setProviderId(new Integer(3));
		dpOrder.setLocationId(new Integer(1));
		dpOrder.setProvider(provider);
		dpOrder.setLocation(location);
		
		dao.saveDrugPurchaseOrder(dpOrder);
		DrugPurchaseOrder result = dao.getDrugPurchaseOrderByUuid("68547121-1b70-465c-99ee-c9dfd95e7d30");
		
		String uuid = result.getUuid();
		assertEquals(uuid, "68547121-1b70-465c-99ee-c9dfd95e7d30");
		//assertEquals()
		
	}
	
	@Test
	public void testGetDrugPurchaseOrderByUuid() {
		
		DrugPurchaseOrder result = dao.getDrugPurchaseOrderByUuid("68547121-1b70-465c-99ee-c9dfd95e7d31");
		String name = result.getName();
		assertEquals(name, "TestList4");
		
	}
	
	@Test
	public void testGetAllDrugPurchaseOrders() {
		List<DrugPurchaseOrder> allDrugPurchaseOrders = dao.getAllDrugPurchaseOrders();
		assertEquals(allDrugPurchaseOrders.size(), 2);
	}
	
	@Test
	public void testGetAllDrugPurchaseOrdersNotReceived() {
		List<DrugPurchaseOrder> allDrugPurchaseOrders = dao.getAllDrugPurchaseOrders();
		int size = allDrugPurchaseOrders.size();
		
		for (DrugPurchaseOrder dpOrder : allDrugPurchaseOrders) {
			if (dpOrder.isReceived()) {
				size--;
			}
		}
		assertEquals(size, 1);
	}
	
	@Test
	public void testDeleteDrugPurchaseOrder() {
		DrugPurchaseOrder dpOrder = new DrugPurchaseOrder();
		
		Provider provider = new Provider(1);
		provider.setDateCreated(new Date());
		Location location = new Location(1);
		location.setDateCreated(new Date());
		
		//NOTE: never set Id, will be generated automatically (when saving)
		
		dpOrder.setName("TestList4");
		dpOrder.setDescription("Third Test List");
		dpOrder.setCreator(Context.getUserContext().getAuthenticatedUser());
		dpOrder.setDateCreated(new java.util.Date());
		dpOrder.setDrugPurchaseOrderDate(new Date());
		
		dpOrder.setUuid("68547121-1b70-465c-99ee-c9dfd95e7d30");
		dpOrder.setRetired(Boolean.FALSE);
		dpOrder.setProviderId(new Integer(3));
		dpOrder.setLocationId(new Integer(1));
		dpOrder.setProvider(provider);
		dpOrder.setLocation(location);
		
		dao.deleteDrugPurchaseOrder(dpOrder);
		DrugPurchaseOrder result = dao.getDrugPurchaseOrderByUuid("68547121-1b70-465c-99ee-c9dfd95e7d30");
		assertEquals(result, null);
	}
	
	@Test
	public void testGetDrugPurchaseOrderByProvider() {
		List<DrugPurchaseOrder> result = dao.getDrugPurchaseOrderByProvider(1);
		assertEquals(result.size(), 2);
	}
	
}
