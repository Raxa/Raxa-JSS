/*
 * Interface for accessing raxacore_patient_list
 */
package org.raxa.module.raxacore.db;

import java.util.List;
import org.openmrs.EncounterType;
import org.openmrs.Patient;
import org.openmrs.api.db.DAOException;
import org.raxa.module.raxacore.PatientList;

public interface PatientListDAO {
	
	/**
	 * Saves a PatientList
	 * 
	 * @param PatientList to be saved
	 * @throws DAOException
	 * @should save a patient list
	 */
	public PatientList savePatientList(PatientList patientList) throws DAOException;
	
	/**
	 * Purge a PatientList from database.
	 * 
	 * @param PatientList object to be purged
	 */
	public void deletePatientList(PatientList patientList) throws DAOException;
	
	/**
	 * Get patientList by internal identifier
	 * 
	 * @param patientListId patientList id
	 * @return patientList with given internal identifier
	 * @throws DAOException
	 * @should get a patient list
	 */
	public PatientList getPatientList(Integer patientListId) throws DAOException;
	
	/**
	 * Find {@link PatientList} matching an EncounterType
	 * @param encounterType 
	 * @should get a patient list by EncounterType
	 */
	public List<PatientList> getPatientListByEncounterType(EncounterType encounterType);
	
	/**
	 * Find {@link PatientList} matching a uuid
	 * 
	 * @param uuid
	 * @return {@link PatientList}
	 * @should get a patient list by uuid
	 */
	public PatientList getPatientListByUuid(String uuid);
	
	/**
	 * Find {@link PatientList} matching a name
	 * 
	 * @param name
	 * @return List of PatientLists
	 * @should get a patient list by name
	 */
	public List<PatientList> getPatientListByName(String name);
	
	/**
	 * Update PatientList
	 * @return {@link PatientList}
	 * @should update a PatientList
	 */
	PatientList updatePatientList(PatientList patientList) throws DAOException;
	
}
