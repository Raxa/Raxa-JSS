package org.raxa.module.raxacore.db.hibernate;

import java.util.List;
import org.hibernate.SessionFactory;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;
import org.openmrs.EncounterType;
import org.openmrs.test.BaseContextSensitiveTest;
import org.raxa.module.raxacore.PatientList;
import org.raxa.module.raxacore.db.PatientListDAO;

public class HibernatePatientListDAOTest extends BaseContextSensitiveTest {
	
	private PatientListDAO dao = null;
	
	public HibernatePatientListDAOTest() {
	}
	
	@BeforeClass
	public static void setUpClass() {
	}
	
	@AfterClass
	public static void tearDownClass() {
	}
	
	@Before
	public void setUp() throws Exception {
		executeDataSet("org/raxa/module/raxacore/db/hibernate/include/HibernatePatientListDAOTest-initialData.xml");
		
		if (dao == null) // fetch the dao from the spring application context
		{
			dao = (PatientListDAO) applicationContext.getBean("patientListDAO");
		}
	}
	
	/**
	 * Test of setSessionFactory method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testSetSessionFactory() {
		System.out.println("setSessionFactory");
		/*
		SessionFactory sessionFactory = null;
		HibernatePatientListDAO instance = new HibernatePatientListDAO();
		instance.setSessionFactory(sessionFactory);
		*/// TODO review the generated test code and remove the default call to fail.
		fail("The test case is a prototype.");
	}
	
	/**
	 * Test of savePatientList method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testSavePatientList() {
		System.out.println("savePatientList");
		PatientList patientList = new PatientList();
		
		HibernatePatientListDAO instance = new HibernatePatientListDAO();
		PatientList expResult = null;
		PatientList result = instance.savePatientList(patientList);
		//assertEquals(expResult, result);
		//fail("The test case is a prototype.");
	}
	
	/**
	 * Test of deletePatientList method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testDeletePatientList() {
		System.out.println("deletePatientList");
		PatientList patientList = null;
		//dao.deletePatientList(patientList);
		// TODO review the generated test code and remove the default call to fail.
		//fail("The test case is a prototype.");
	}
	
	/**
	 * Test of getPatientList method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testGetPatientList() {
		System.out.println("getPatientList");
		Integer patientListId = 1;
		//HibernatePatientListDAO instance = new HibernatePatientListDAO();
		//PatientList expResult = null;
		PatientList result = dao.getPatientList(patientListId);
		System.out.println("the name is:" + result.getName());
		//assertEquals(expResult, result);
		// TODO review the generated test code and remove the default call to fail.
		//fail("The test case is a prototype.");
	}
	
	/**
	 * Test of getPatientListByEncounterType method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testGetPatientListByEncounterType() {
		System.out.println("getPatientListByEncounterType");
		EncounterType encounterType = null;
		//HibernatePatientListDAO instance = new HibernatePatientListDAO();
		//List expResult = null;
		//List result = instance.getPatientListByEncounterType(encounterType);
		//assertEquals(expResult, result);
		// TODO review the generated test code and remove the default call to fail.
		//fail("The test case is a prototype.");
	}
	
	/**
	 * Test of getPatientListByUuid method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testGetPatientListByUuid() {
		System.out.println("getPatientListByUuid");
		String uuid = "68547121-1b70-465d-99ee-c9dfd95e7d30";
		PatientList result = dao.getPatientListByUuid(uuid);
		System.out.println(result);
		//System.out.println("the uuid is:" + result.getUuid());
		//assertEquals(expResult, result);
		// TODO review the generated test code and remove the default call to fail.
		//fail("The test case is a prototype.");
	}
	
	/**
	 * Test of getPatientListByName method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testGetPatientListByName() {
		System.out.println("getPatientListByName");
		String name = "TestList1";
		//HibernatePatientListDAO instance = new HibernatePatientListDAO();
		//PatientList expResult = null;
		PatientList result = dao.getPatientListByName(name);
		System.out.println(result.getName());
		//assertEquals(expResult, result);
		// TODO review the generated test code and remove the default call to fail.
		//fail("The test case is a prototype.");
	}
	
	/**
	 * Test of updatePatientList method, of class HibernatePatientListDAO.
	 */
	@Test
	public void testUpdatePatientList() {
		System.out.println("updatePatientList");
		PatientList patientList = null;
		//PatientList result = dao.updatePatientList(patientList);
		//assertEquals(expResult, result);
		// TODO review the generated test code and remove the default call to fail.
		//fail("The test case is a prototype.");
	}
}
