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
import java.util.List;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.Test;
import org.openmrs.EncounterType;
import org.openmrs.api.context.Context;
import org.openmrs.test.BaseModuleContextSensitiveTest;
import org.raxa.module.raxacore.PatientList;
import org.raxa.module.raxacore.db.PatientListDAO;

public class HibernatePatientListDAOTest extends BaseModuleContextSensitiveTest {
	
	private static final String TEST_DATA_PATH = "org/raxa/module/raxacore/include/";
	
	private static final String MODULE_TEST_DATA_XML = TEST_DATA_PATH + "moduleTestData.xml";
	
	private PatientListDAO dao = null;
	
	@Before
	public void setUp() throws Exception {
		executeDataSet(MODULE_TEST_DATA_XML);
		dao = (HibernatePatientListDAO) applicationContext
		        .getBean("org.raxa.module.raxacore.db.hibernate.HibernatePatientListDAO");
	}
	
	/**
	 * Test of savePatientList method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testSavePatientList() {
		PatientList pList = new PatientList();
		//NOTE: never set Id, will be generated automatically (when saving)
		pList.setName("TestList3");
		pList.setDescription("Third Test List");
		pList.setCreator(Context.getUserContext().getAuthenticatedUser());
		pList.setDateCreated(new java.util.Date());
		pList.setUuid("68547121-1b70-465c-99ee-c9dfd95e7d30");
		pList.setRetired(Boolean.FALSE);
		pList.setSearchQuery("test Query");
		dao.savePatientList(pList);
		List<PatientList> result = dao.getPatientListByName("TestList3");
		String name = result.get(0).getName();
		assertEquals(name, "TestList3");
	}
	
	/**
	 * Test of deletePatientList method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testDeletePatientList() {
		PatientList pList = new PatientList();
		pList.setId(2);
		pList.setName("TestList2");
		pList.setDescription("Second Test List");
		pList.setCreator(Context.getUserContext().getAuthenticatedUser());
		pList.setDateCreated(new java.util.Date());
		pList.setUuid("68547121-1b70-465e-99ee-c9dfd95e7d30");
		pList.setRetired(Boolean.FALSE);
		pList.setSearchQuery("");
		dao.deletePatientList(pList);
		PatientList result = dao.getPatientList(2);
		assertEquals(null, result);
	}
	
	/**
	 * Test of getPatientList method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testGetPatientList() {
		Integer patientListId = 1;
		PatientList result = dao.getPatientList(patientListId);
		String name = result.getName();
		assertEquals("TestList1", name);
	}
	
	/**
	 * Test of getPatientListByEncounterType method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testGetPatientListByEncounterType() {
		EncounterType encounterType = new EncounterType();
		encounterType.setName("Registration");
		encounterType.setUuid("61ae96f4-6afe-4351-b6f8-cd4fc383cce1");
		encounterType.setDescription("Patient has been registered");
		encounterType.setRetired(Boolean.FALSE);
		String name = dao.getPatientListByEncounterType(encounterType).get(0).getName();
		assertEquals("TestList1", name);
	}
	
	/**
	 * Test of getPatientListByUuid method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testGetPatientListByUuid() {
		String uuid = "68547121-1b70-465e-99ee-c9dfd95e7d30";
		String result = dao.getPatientListByUuid(uuid).getName();
		assertEquals("TestList2", result);
	}
	
	/**
	 * Test of getPatientListByName method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testGetPatientListByName() {
		String name = "TestList1";
		String result = dao.getPatientListByName(name).get(0).getName();
		assertEquals(name, result);
	}
	
	/**
	 * Test of updatePatientList method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testUpdatePatientList() {
		PatientList patientList = dao.getPatientList(1);
		patientList.setName("NewNameList");
		dao.updatePatientList(patientList);
		String name = dao.getPatientList(1).getName();
		assertEquals(name, "NewNameList");
	}
	
	/**
	 * Test of getAllPatientList method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testGetAllPatientList_shouldReturnUnretiredPatientList() {
		List<PatientList> allPatientList = dao.getAllPatientList(false);
		assertEquals(allPatientList.size(), 2);
	}
	
	/**
	 * Test of getAllPatientList method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testGetAllPatientList_shouldReturnAllPatientListIncludingRetired() {
		List<PatientList> allPatientList = dao.getAllPatientList(true);
		assertEquals(allPatientList.size(), 3);
	}
	
}
