package org.raxa.module.raxacore.db.hibernate;

import java.util.ArrayList;
import java.util.List;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.openmrs.EncounterType;
import org.openmrs.api.db.DAOException;
import org.raxa.module.raxacore.PatientList;
import org.raxa.module.raxacore.db.PatientListDAO;

/**
 * Accesses raxacore_patient_list from PatientList
 */
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
		//getting all the PatientLists that contain the encounterType's uuid. the % is for wildcards
		//TODO: add in validator to check if the encountertype uuid exists 
		criteria.add(Restrictions.like("searchQuery", "%" + encounterType.getUuid() + "%"));
		List<PatientList> patients = new ArrayList<PatientList>();
		patients.addAll(criteria.list());
		return patients;
	}
	
	/**
	 * @see org.raxa.module.db.PatientListDAO#getPatientListByUuid(String)
	 */
	@Override
	public PatientList getPatientListByUuid(String uuid) throws DAOException {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PatientList.class);
		criteria.add(Restrictions.eq("uuid", uuid));
		criteria.add(Restrictions.eq("retired", false));
		return (PatientList) criteria.uniqueResult();
	}
	
	/**
	 * @see org.raxa.module.db.PatientListDAO#getPatientListByName(String)
	 */
	@Override
	public List<PatientList> getPatientListByName(String name) throws DAOException {
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PatientList.class);
		criteria.add(Restrictions.like("name", name));
		criteria.add(Restrictions.like("retired", false));
		List<PatientList> patients = new ArrayList<PatientList>();
		patients.addAll(criteria.list());
		return patients;
		
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
