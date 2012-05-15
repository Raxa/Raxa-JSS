/*
 * Accesses raxacore_patient_list from PatientList
 */
package org.raxa.module.raxacore.db.hibernate;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.openmrs.EncounterType;
import org.openmrs.Patient;
import org.openmrs.api.db.DAOException;
import org.raxa.module.raxacore.PatientList;
import org.raxa.module.raxacore.db.PatientListDAO;

public class HibernatePatientListDAO implements PatientListDAO {
	
	protected final Log log = LogFactory.getLog(getClass());
	
	/**
	 * Hibernate session factory
	 */
	private SessionFactory sessionFactory;
	
	/**
	 * Set session factory
	 *
	 * @param sessionFactory
	 */
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	
	/*
	 * Blank constructor
	 */

	/**
	 * @see org.raxa.module.db.PatientListDAO#savePatientList(org.raxa.module.raxacore.PatientList)
	 */
	@Override
	public PatientList savePatientList(PatientList patientList) throws DAOException {
		sessionFactory.getCurrentSession().saveOrUpdate(patientList);
		return patientList;
	}
	
	/**
	 * @see org.raxa.module.db.PatientListDAO#deletePatientList(org.raxa.module.raxacore.PatientList)
	 */
	@Override
	public void deletePatientList(PatientList patientList) throws DAOException {
		sessionFactory.getCurrentSession().delete(patientList);
	}
	
	/**
	 * @see org.raxa.module.db.PatientListDAO#getPatientList(Integer)
	 */
	@Override
	public PatientList getPatientList(Integer patientListId) throws DAOException {
		return (PatientList) sessionFactory.getCurrentSession().get(PatientList.class, patientListId);
	}
	
	/**
	 * @see org.raxa.module.db.PatientListDAO#getPatientListByEncounterType(EncounterType)
	 */
	@Override
	public List<PatientList> getPatientListByEncounterType(EncounterType encounterType) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PatientList.class);
		//criteria.add(Restrictions.eq("uuid", uuid));
		List<PatientList> patients = new ArrayList<PatientList>();
		patients.addAll(criteria.list());
		for (int i = 0; i < patients.size(); i++) {

		}
		
		return patients;
		
		/*
		 * 1. For all PatientLists:
		 * 2. Get patients in list
		 * 3. If list.length>0, check list[0]'s encountertypes
		 * 4. If one of those encountertypes===this encounterType, add to return List<PatientList>
		 */
	}
	
	/**
	 * @see org.raxa.module.db.PatientListDAO#getPatientListByUuid(String)
	 */
	@Override
	public PatientList getPatientListByUuid(String uuid) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PatientList.class);
		criteria.add(Restrictions.eq("uuid", uuid));
		criteria.add(Restrictions.eq("retired", false));
		return (PatientList) criteria.uniqueResult();
	}
	
	/**
	 * @see org.raxa.module.db.PatientListDAO#getPatientListByName(String)
	 */
	@Override
	public PatientList getPatientListByName(String name) {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PatientList.class);
		criteria.add(Restrictions.eq("name", name));
		criteria.add(Restrictions.eq("retired", false));
		return (PatientList) criteria.uniqueResult();
	}
	
	/**
	 * @see org.raxa.module.db.PatientListDAO#updatePatientList(Integer)
	 */
	@Override
	public PatientList updatePatientList(PatientList patientList) throws DAOException {
		sessionFactory.getCurrentSession().update(patientList);
		return patientList;
	}
}
