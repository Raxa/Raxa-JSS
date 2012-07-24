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
import java.util.List;
import static org.junit.Assert.*;
import org.junit.Before;
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
	
	@Before
	public void setUp() throws Exception {
		executeDataSet(MODULE_TEST_DATA_XML);
		s = Context.getService(PatientListService.class);
		//removing system developer role to test our privileges
		
	}
	
	/**
	 * Test of savePatientList method, of class PatientListServiceImpl.
	 */
	@Test
	public void testSavePatientListShouldUsePrivileges() throws Exception {
		Context.getUserContext().getAuthenticatedUser().removeRole(Context.getUserService().getRole("System Developer"));
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
	}
	
	/**
	 * Test of savePatientList method, of class PatientListServiceImpl.
	 */
	@Test
	public void testSavePatientListShouldSavePatientList() throws Exception {
		PatientList pList = new PatientList();
		//NOTE: never set Id, will be generated automatically (when saving)
		pList.setName("TestList3");
		pList.setDescription("Third Test List");
		pList.setCreator(Context.getUserContext().getAuthenticatedUser());
		pList.setDateCreated(new java.util.Date());
		pList.setUuid("68547121-1b70-465c-99ee-c9dfd95e7d30");
		pList.setRetired(Boolean.FALSE);
		pList.setSearchQuery("test Query");
		s.savePatientList(pList);
		List<PatientList> result = s.getPatientListByName("TestList3");
		String name = result.get(0).getName();
		assertEquals(name, "TestList3");
	}
	
	/**
	 * Test of getPatientList method, of class PatientListServiceImpl.
	 */
	@Test
	public void testGetPatientListShouldUsePrivileges() {
		Context.getUserContext().getAuthenticatedUser().removeRole(Context.getUserService().getRole("System Developer"));
		Context.getUserContext().removeProxyPrivilege("View Patient Lists");
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
	}
	
	/**
	 * Test of getPatientList method, of class PatientListServiceImpl.
	 */
	@Test
	public void testGetPatientListShouldReturnPatientList() {
		Integer patientListId = 1;
		PatientList result = s.getPatientList(patientListId);
		String name = result.getName();
		assertEquals("TestList1", name);
	}
	
	/**
	 * Test of getPatientListByName method, of class PatientListServiceImpl.
	 */
	@Test
	public void testGetPatientListByNameShouldUsePrivileges() {
		Context.getUserContext().getAuthenticatedUser().removeRole(Context.getUserService().getRole("System Developer"));
		Context.getUserContext().removeProxyPrivilege("View Patient Lists");
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
	}
	
	/**
	 * Test of getPatientListByName method, of class PatientListServiceImpl.
	 */
	@Test
	public void testGetPatientListByNameShouldReturnPatientList() {
		String name = "TestList1";
		String result = s.getPatientListByName(name).get(0).getName();
		assertEquals(name, result);
	}
	
	/**
	 * Test of getPatientListByUuid method, of class PatientListServiceImpl.
	 */
	@Test
	public void testGetPatientListByUuidShouldUsePrivileges() {
		Context.getUserContext().getAuthenticatedUser().removeRole(Context.getUserService().getRole("System Developer"));
		Context.getUserContext().removeProxyPrivilege("View Patient Lists");
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
	}
	
	/**
	 * Test of getPatientListByUuid method, of class PatientListServiceImpl.
	 */
	@Test
	public void testGetPatientListByUuidShouldReturnPatientList() {
		String uuid = "68547121-1b70-465e-99ee-c9dfd95e7d30";
		String result = s.getPatientListByUuid(uuid).getName();
		assertEquals("TestList2", result);
	}
	
	/**
	 * Test of getPatientListByEncounterType method, of class
	 * PatientListServiceImpl.
	 */
	@Test
	public void testGetPatientListByEncounterTypeShouldReturnPatientList() {
		EncounterType encounterType = Context.getEncounterService().getEncounterTypeByUuid(
		    "61ae96f4-6afe-4351-b6f8-cd4fc383cce1");
		String result = s.getPatientListByEncounterType(encounterType).get(0).getName();
		assertEquals("TestList1", result);
	}
	
	/**
	 * Test of getPatientListByEncounterType method, of class
	 * PatientListServiceImpl.
	 */
	@Test
	public void testGetPatientListByEncounterTypeShouldUsePrivileges() {
		Context.getUserContext().getAuthenticatedUser().removeRole(Context.getUserService().getRole("System Developer"));
		Context.getUserContext().addProxyPrivilege("View Encounter Types");
		Context.getUserContext().removeProxyPrivilege("View Patient Lists");
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
	}
	
	/**
	 * Test of getEncountersInPatientList method, of class
	 * PatientListServiceImpl.
	 */
	@Test
	public void testGetEncountersInPatientListShouldReturnEncounters() {
		PatientList p = new PatientList();
		p.setCreator(new User());
		p.setName("GetPatientsTestList");
		p.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383cce1"
		        + "&startDate=2000-01-01T00:00:00&endDate=2012-01-02T00:00:00");
		List<Encounter> encs = s.getEncountersInPatientList(p);
		//testing encounterType
		assertEquals(encs.size() > 0, Boolean.TRUE);
		//setting start + end dates same time, should return nothing
		p.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383cce1"
		        + "&startDate=2012-01-02T00:00:0&endDate=2012-01-01T00:00:00");
		encs = s.getEncountersInPatientList(p);
		assertEquals(encs.size(), 0);
	}
	
	/**
	 * Test of getEncountersInPatientList method, of class
	 * PatientListServiceImpl.
	 */
	@Test
	public void testGetEncountersInPatientListShouldNotReturnEncountersWithInvalidDates() {
		PatientList p = new PatientList();
		p.setCreator(new User());
		p.setName("GetPatientsTestList");
		//setting start + end dates same time, should return nothing
		p.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383cce1"
		        + "&startDate=2012-01-02T00:00:0&endDate=2012-01-01T00:00:00");
		List<Encounter> encs = s.getEncountersInPatientList(p);
		assertEquals(encs.size(), 0);
	}
	
	/**
	 * Test notInList according to Encounters of getEncountersInPatientList method, of class
	 * PatientListServiceImpl.
	 */
	@Test
	public void testGetEncountersInPatientListShouldNotReturnEncountersAccordingToNotInList() {
		PatientList mainList = new PatientList();
		PatientList notInList1 = new PatientList();
		PatientList notInList2 = new PatientList();
		mainList.setName("GetPatientsTestList");
		notInList1.setName("TestPatientsNotInList");
		notInList2.setName("TestPatientsNotInList2");
		notInList1.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383cce1"
		        + "&startDate=2000-01-01T00:00:00&endDate=2008-08-16T00:00:00");
		notInList2.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383cce1"
		        + "&startDate=2008-08-16T00:00:00&endDate=2012-01-02T00:00:00");
		s.savePatientList(notInList1);
		s.savePatientList(notInList2);
		mainList.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383cce1"
		        + "&startDate=2000-01-01T00:00:00&endDate=2012-01-02T00:00:00&notInList=" + notInList1.getUuid() + ","
		        + notInList2.getUuid());
		List<Encounter> encs = s.getEncountersInPatientList(mainList);
		//now checking that notInList works
		assertEquals(encs.size(), 0);
	}
	
	/**
	 * Test notInList according to Patient of getEncountersInPatientList method, of class
	 * PatientListServiceImpl.
	 * All 3 lists have the same start and end dates.
	 * notInList1 has 1 encounter (type 2) with Patient #7.
	 * Without the notInList query, mainList would have had 2 encounters of type 1 with Patient #7.
	 * Because of notInList, mainList has all encounters of type 1 which are not associated with Patient #7.
	 * Since no such encounter exists in the dataset, the value should be 0.
	 */
	@Test
	public void testGetEncountersInPatientListShouldNotReturnPatientsAccordingToNotInList() {
		PatientList mainList = new PatientList();
		PatientList notInList1 = new PatientList();
		mainList.setName("GetPatientsTestList");
		notInList1.setName("TestPatientsNotInList");
		notInList1.setSearchQuery("?encounterType=07000be2-26b6-4cce-8b40-866d8435b613"
		        + "&startDate=2000-01-01T00:00:00&endDate=2012-01-02T00:00:00");
		s.savePatientList(notInList1);
		mainList.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383cce1"
		        + "&startDate=2000-01-01T00:00:00&endDate=2012-01-02T00:00:00&notInList=" + notInList1.getUuid());
		List<Encounter> encs = s.getEncountersInPatientList(mainList);
		//now checking that notInList works
		assertEquals(encs.size(), 0);
	}
	
	/**
	 * Test inList parts of getEncountersInPatientList method, of class
	 * PatientListServiceImpl.
	 */
	@Test
	public void testGetEncountersInPatientListShouldOnlyReturnEncountersAccordingToInList() {
		PatientList p = new PatientList();
		PatientList p2 = new PatientList();
		p.setCreator(Context.getUserContext().getAuthenticatedUser());
		p.setName("GetPatientsTestList");
		p2.setName("TestPatientsNotInList");
		//setting start + end dates for inList test
		p2.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383cce1"
		        + "&startDate=2008-08-14T00:00:0&endDate=2008-08-016T00:00:00");
		s.savePatientList(p2);
		p.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383cce1"
		        + "&startDate=2000-01-01T00:00:00&endDate=2012-01-02T00:00:00");
		Context.getUserContext().addProxyPrivilege("Add Patient Lists");
		List<Encounter> encs = s.getEncountersInPatientList(p);
		List<Encounter> encs2 = null;
		int originalLength = encs.size();
		p.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383cce1"
		        + "&startDate=2000-01-01T00:00:00&endDate=2012-01-02T00:00:00&inList=" + p2.getUuid());
		encs = s.getEncountersInPatientList(p);
		encs2 = s.getEncountersInPatientList(p2);
		assertEquals(encs.size(), originalLength - encs2.size());
	}
	
	/**
	 * Test of GetEncountersInPatientList method, of class PatientListServiceImpl given provider uuid.
	 */
	@Test
	public void testGetEncountersInPatientListShouldReturnEncountersOfRequiredProvider() {
		PatientList p = new PatientList();
		p.setCreator(new User());
		p.setName("GetPatientsTestList");
		p.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383ctyr"
		        + "&provider=3effc802-12dd-4539-87f6-4065ca8e992c");
		List<Encounter> encs = s.getEncountersInPatientList(p);
		//testing encounterType
		
		assertEquals(encs.size(), 1);
	}
	
	/**
	 * Test of getPatientsInPatientList method, of class PatientListServiceImpl.
	 */
	@Test
	public void testGetPatientsInPatientListShouldReturnPatients() {
		PatientList p = new PatientList();
		p.setCreator(new User());
		p.setName("GetPatientsTestList");
		p.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383cce1"
		        + "&startDate=2000-01-01T00:00:00&endDate=2012-01-02T00:00:00");
		List<Patient> pList = s.getPatientsInPatientList(p);
		//testing encounterType
		assertEquals(pList.size() > 0, Boolean.TRUE);
	}
	
	/**
	 * Test of getPatientsInPatientList method, of class PatientListServiceImpl.
	 */
	@Test
	public void testGetPatientsInPatientListShouldNotReturnPatientsWithInvalidDates() {
		PatientList p = new PatientList();
		p.setCreator(new User());
		p.setName("GetPatientsTestList");
		p.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383cce1"
		        + "&startDate=2012-01-02T00:00:0&endDate=2012-01-01T00:00:00");
		List<Patient> pList = s.getPatientsInPatientList(p);
		assertEquals(pList.size(), 0);
	}
	
	/**
	 * Test of getPatientsInPatientList method, of class PatientListServiceImpl.
	 */
	@Test
	public void testGetPatientsInPatientListShouldUsePrivileges() {
		Context.getUserContext().getAuthenticatedUser().removeRole(Context.getUserService().getRole("System Developer"));
		PatientList p = new PatientList();
		p.setCreator(new User());
		p.setName("GetPatientsTestList");
		p.setSearchQuery("?encounterType=61ae96f4-6afe-4351-b6f8-cd4fc383cce1"
		        + "&startDate=2000-01-01T00:00:00&endDate=2012-01-02T00:00:00");
		List<Patient> pList = null;
		try {
			pList = s.getPatientsInPatientList(p);
			//if we don't throw exception fail - no privileges required!
			fail("No privileges required for getPatientsInList");
		}
		catch (APIAuthenticationException e) {
			Context.getUserContext().addProxyPrivilege("View Patients");
			Context.getUserContext().addProxyPrivilege("View Patient Lists");
			Context.getUserContext().addProxyPrivilege("View Encounters");
			Context.getUserContext().addProxyPrivilege("View Encounter Types");
			pList = s.getPatientsInPatientList(p);
		}
	}
	
	/**
	 * Test of updatePatientList method, of class PatientListServiceImpl.
	 */
	@Test
	public void testUpdatePatientListShouldUsePrivileges() {
		Context.getUserContext().getAuthenticatedUser().removeRole(Context.getUserService().getRole("System Developer"));
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
	}
	
	/**
	 * Test of updatePatientList method, of class PatientListServiceImpl.
	 */
	@Test
	public void testUpdatePatientListShouldChangePatientList() {
		PatientList patientList = s.getPatientList(1);
		patientList.setName("NewNameList");
		s.updatePatientList(patientList);
		String name = s.getPatientList(1).getName();
		assertEquals(name, "NewNameList");
	}
	
	/**
	 * Test of deletePatientList method, of class PatientListServiceImpl.
	 */
	@Test
	public void testDeletePatientListShouldUsePrivileges() {
		Context.getUserContext().getAuthenticatedUser().removeRole(Context.getUserService().getRole("System Developer"));
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
	}
	
	/**
	 * Test of deletePatientList method, of class PatientListServiceImpl.
	 */
	@Test
	public void testDeletePatientListShouldDeletePatientList() {
		PatientList pList = new PatientList();
		pList.setId(2);
		pList.setName("TestList2");
		pList.setDescription("Second Test List");
		pList.setCreator(Context.getUserContext().getAuthenticatedUser());
		pList.setDateCreated(new java.util.Date());
		pList.setUuid("68547121-1b70-465e-99ee-c9dfd95e7d30");
		pList.setRetired(Boolean.FALSE);
		pList.setSearchQuery("");
		s.deletePatientList(pList);
		PatientList result = s.getPatientList(2);
		assertEquals(null, result);
	}
	
	/**
	 * Test of getAllPatientList method, of class PatientListService.
	 */
	@Test
	public void testGetAllPatientList_shouldReturnUnretiredPatientList() {
		List<PatientList> allPatientList = s.getAllPatientList(false);
		assertEquals(allPatientList.size(), 2);
	}
	
	/**
	 * Test of getAllPatientList method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testGetAllPatientList_shouldReturnAllPatientListIncludingRetired() {
		List<PatientList> allPatientList = s.getAllPatientList(true);
		assertEquals(allPatientList.size(), 3);
	}
}
