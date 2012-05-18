package org.raxa.module.raxacore.impl;

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
import org.junit.AfterClass;
import static org.junit.Assert.*;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openmrs.Encounter;
import org.openmrs.EncounterType;
import org.openmrs.Patient;
import org.openmrs.User;
import org.openmrs.api.APIAuthenticationException;
import org.openmrs.api.context.Context;
import org.openmrs.test.BaseModuleContextSensitiveTest;
import org.raxa.module.raxacore.PatientList;
import org.raxa.module.raxacore.PatientListService;

/*
 * Testing the methods in PatientListServiceImpl
 */
public class PatientListServiceImplTest extends BaseModuleContextSensitiveTest {
	
	private static final String TEST_DATA_PATH = "org/raxa/module/raxacore/include/";
	
	private static final String MODULE_TEST_DATA_XML = TEST_DATA_PATH + "moduleTestData.xml";
	
	private PatientListService s = null;
	
	@BeforeClass
	public static void beforeStartTest() {
		Context.openSession();
	}
	
	@AfterClass
	public static void afterStartTest() {
		Context.closeSession();
	}
	
	@Before
	public void setUp() throws Exception {
		executeDataSet(MODULE_TEST_DATA_XML);
		s = Context.getService(PatientListService.class);
		//removing system developer role to test our privileges
		Context.getUserContext().getAuthenticatedUser().removeRole(Context.getUserService().getRole("System Developer"));
		Context.getUserContext().addProxyPrivilege("View Users");
	}
	
	/**
	 * Test of savePatientList method, of class PatientListServiceImpl.
	 */
	@Test
	public void testSavePatientList() throws Exception {
		PatientList pList = new PatientList();
		//NOTE: never set Id, will be generated automatically (when saving)
		pList.setName("TestList3");
		pList.setDescription("Third Test List");
		pList.setCreator(Context.getUserContext().getAuthenticatedUser());
		pList.setDateCreated(new java.util.Date());
		pList.setUuid("68547121-1b70-465c-99ee-c9dfd95e7d30");
		pList.setRetired(Boolean.FALSE);
		pList.setSearchQuery("test Query");
		try {
			s.savePatientList(pList);
			//if we don't throw exception fail - no privileges required!
			fail("No privileges required for savePatientList");
		}
		catch (APIAuthenticationException e) {
			Context.getUserContext().addProxyPrivilege("Add Patient Lists");
			Context.getUserContext().addProxyPrivilege("View Patient Lists");
			Context.getUserContext().addProxyPrivilege("View Users");
			s.savePatientList(pList);
		}
		List<PatientList> result = s.getPatientListByName("TestList3");
		String name = result.get(0).getName();
		assertEquals(name, "TestList3");
		//removing proxy privileges for next test
		Context.getUserContext().removeProxyPrivilege("Add Patient Lists");
		Context.getUserContext().removeProxyPrivilege("View Patient Lists");
		Context.getUserContext().removeProxyPrivilege("View Users");
	}
	
	/**
	 * Test of getPatientList method, of class PatientListServiceImpl.
	 */
	@Test
	public void testGetPatientList() {
		Integer patientListId = 1;
		PatientList result = null;
		try {
			result = s.getPatientList(patientListId);
			//if we don't throw exception fail - no privileges required!
			fail("No privileges required for getPatientList");
		}
		catch (APIAuthenticationException e) {
			Context.getUserContext().addProxyPrivilege("View Patient Lists");
			result = s.getPatientList(patientListId);
		}
		String name = result.getName();
		assertEquals("TestList1", name);
		//removing proxy privileges for next test
		Context.getUserContext().removeProxyPrivilege("View Patient Lists");
	}
	
	/**
	 * Test of getPatientListByName method, of class PatientListServiceImpl.
	 */
	@Test
	public void testGetPatientListByName() {
		String name = "TestList1";
		String result = null;
		try {
			result = s.getPatientListByName(name).get(0).getName();
			//if we don't throw exception fail - no privileges required!
			fail("No privileges required for getPatientListByName");
		}
		catch (APIAuthenticationException e) {
			Context.getUserContext().addProxyPrivilege("View Patient Lists");
			result = s.getPatientListByName(name).get(0).getName();
		}
		assertEquals(name, result);
		//removing proxy privileges for next test
		Context.getUserContext().removeProxyPrivilege("View Patient Lists");
	}
	
	/**
	 * Test of getPatientListByUuid method, of class PatientListServiceImpl.
	 */
	@Test
	public void testGetPatientListByUuid() {
		String uuid = "68547121-1b70-465e-99ee-c9dfd95e7d30";
		String result = null;
		try {
			result = s.getPatientListByUuid(uuid).getName();
			//if we don't throw exception fail - no privileges required!
			fail("No privileges required for getPatientListByUuid");
		}
		catch (APIAuthenticationException e) {
			Context.getUserContext().addProxyPrivilege("View Patient Lists");
			result = s.getPatientListByUuid(uuid).getName();
		}
		assertEquals("TestList2", result);
		//removing proxy privileges for next test
		Context.getUserContext().removeProxyPrivilege("View Patient Lists");
	}
	
	/**
	 * Test of getPatientListByEncounterType method, of class PatientListServiceImpl.
	 */
	@Test
	public void testGetPatientListByEncounterType() {
		Context.getUserContext().addProxyPrivilege("View Encounter Types");
		EncounterType encounterType = Context.getEncounterService().getEncounterTypeByUuid(
		    "61ae96f4-6afe-4351-b6f8-cd4fc383cce1");
		String result = null;
		try {
			result = s.getPatientListByEncounterType(encounterType).get(0).getName();
			//if we don't throw exception fail - no privileges required!
			fail("No privileges required for getPatientListByEncounterType");
		}
		catch (APIAuthenticationException e) {
			Context.getUserContext().addProxyPrivilege("View Patient Lists");
			result = s.getPatientListByEncounterType(encounterType).get(0).getName();
		}
		assertEquals("TestList1", result);
		//removing proxy privileges for next test
		Context.getUserContext().removeProxyPrivilege("View Patient Lists");
	}
	
	/**
	 * Test of getEncountersInPatientList method, of class PatientListServiceImpl.
	 */
	@Test
	public void testGetEncountersInPatientList() {
		PatientList p = new PatientList();
		p.setCreator(new User());
		p.setName("GetPatientsTestList");
		p.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383cce1"
		        + "&startDate=2000-01-01T00:00:00&endDate=2012-01-02T00:00:00");
		List<Encounter> encs = null;
		try {
			encs = s.getEncountersInPatientList(p);
			//if we don't throw exception fail - no privileges required!
			fail("No privileges required for getPatientsInList");
		}
		catch (APIAuthenticationException e) {
			Context.getUserContext().addProxyPrivilege("View Patients");
			Context.getUserContext().addProxyPrivilege("View Patient Lists");
			Context.getUserContext().addProxyPrivilege("View Encounters");
			Context.getUserContext().addProxyPrivilege("View Encounter Types");
			encs = s.getEncountersInPatientList(p);
		}
		//testing encounterType
		assertEquals(encs.size() > 0, Boolean.TRUE);
		//setting start + end dates same time, should return nothing
		p.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383cce1"
		        + "&startDate=2012-01-02T00:00:0&endDate=2012-01-01T00:00:00");
		encs = s.getEncountersInPatientList(p);
		assertEquals(encs.size(), 0);
		//removing proxy privileges for next test
		Context.getUserContext().removeProxyPrivilege("View Patients");
		Context.getUserContext().removeProxyPrivilege("View Patient Lists");
		Context.getUserContext().removeProxyPrivilege("View Encounters");
		Context.getUserContext().removeProxyPrivilege("View Encounter Types");
	}
	
	/**
	 * Test of getPatientsInList method, of class PatientListServiceImpl.
	 */
	@Test
	public void testGetPatientsInList() {
		PatientList p = new PatientList();
		p.setCreator(new User());
		p.setName("GetPatientsTestList");
		p.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383cce1"
		        + "&startDate=2000-01-01T00:00:00&endDate=2012-01-02T00:00:00");
		List<Patient> pList = null;
		try {
			pList = s.getPatientsInList(p);
			//if we don't throw exception fail - no privileges required!
			fail("No privileges required for getPatientsInList");
		}
		catch (APIAuthenticationException e) {
			Context.getUserContext().addProxyPrivilege("View Patients");
			Context.getUserContext().addProxyPrivilege("View Patient Lists");
			Context.getUserContext().addProxyPrivilege("View Encounters");
			Context.getUserContext().addProxyPrivilege("View Encounter Types");
			pList = s.getPatientsInList(p);
		}
		//testing encounterType
		assertEquals(pList.size() > 0, Boolean.TRUE);
		//setting start + end dates same time, should return nothing
		p.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383cce1"
		        + "&startDate=2012-01-02T00:00:0&endDate=2012-01-01T00:00:00");
		pList = s.getPatientsInList(p);
		assertEquals(pList.size(), 0);
		//removing proxy privileges for next test
		Context.getUserContext().removeProxyPrivilege("View Patients");
		Context.getUserContext().removeProxyPrivilege("View Patient Lists");
		Context.getUserContext().removeProxyPrivilege("View Encounters");
		Context.getUserContext().removeProxyPrivilege("View Encounter Types");
	}
	
	/**
	 * Test of updatePatientList method, of class PatientListServiceImpl.
	 */
	@Test
	public void testUpdatePatientList() {
		Context.getUserContext().addProxyPrivilege("View Patient Lists");
		PatientList patientList = s.getPatientList(1);
		patientList.setName("NewNameList");
		try {
			s.updatePatientList(patientList);
			//if we don't throw exception fail - no privileges required!
			fail("No privileges required for updatePatientList");
		}
		catch (APIAuthenticationException e) {
			Context.getUserContext().addProxyPrivilege("Edit Patient Lists");
			s.updatePatientList(patientList);
		}
		String name = s.getPatientList(1).getName();
		assertEquals(name, "NewNameList");
		//removing proxy privileges for next test
		Context.getUserContext().removeProxyPrivilege("Edit Patient Lists");
	}
	
	/**
	 * Test of deletePatientList method, of class PatientListServiceImpl.
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
		try {
			s.deletePatientList(pList);
			//if we don't throw exception fail - no privileges required!
			fail("No privileges required for deletePatientList");
		}
		catch (APIAuthenticationException e) {
			Context.getUserContext().addProxyPrivilege("Delete Patient Lists");
			Context.getUserContext().addProxyPrivilege("View Patient Lists");
			s.deletePatientList(pList);
		}
		PatientList result = s.getPatientList(2);
		assertEquals(null, result);
		//removing proxy privileges for next test
		Context.getUserContext().removeProxyPrivilege("Delete Patient Lists");
		Context.getUserContext().removeProxyPrivilege("View Patient Lists");
	}
}
