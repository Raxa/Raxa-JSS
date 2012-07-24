package org.raxa.module.raxacore.db.hibernate;

import java.util.List;
import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;
import org.openmrs.EncounterType;
import org.openmrs.api.context.Context;
import org.openmrs.test.BaseModuleContextSensitiveTest;
import org.raxa.module.raxacore.DrugPurchaseOrder;
import org.raxa.module.raxacore.PatientList;
import org.raxa.module.raxacore.db.DrugPurchaseOrderDAO;

public class HibernateDrugPurchaseOrderDAOTest extends BaseModuleContextSensitiveTest {
	
	private static final String TEST_DATA_PATH = "org/raxa/module/raxacore/include/";
	
	private static final String MODULE_TEST_DATA_XML = TEST_DATA_PATH + "moduleTest3.xml";
	
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
		//NOTE: never set Id, will be generated automatically (when saving)
		dpOrder.setName("TestList3");
		dpOrder.setDescription("Third Test List");
		dpOrder.setCreator(Context.getUserContext().getAuthenticatedUser());
		dpOrder.setDateCreated(new java.util.Date());
		dpOrder.setUuid("68547121-1b70-465c-99ee-c9dfd95e7d30");
		dpOrder.setRetired(Boolean.FALSE);
		dpOrder.setProviderId(new Integer(3));
		dpOrder.setLocationId(new Integer(1));
		dao.saveDrugPurchaseOrder(dpOrder);
		DrugPurchaseOrder result = dao.getDrugPurchaseOrderByUuid("68547121-1b70-465c-99ee-c9dfd95e7d30");
		String name = result.getUuid();
		assertEquals(name, "68547121-1b70-465c-99ee-c9dfd95e7d30");
		
	}
}
