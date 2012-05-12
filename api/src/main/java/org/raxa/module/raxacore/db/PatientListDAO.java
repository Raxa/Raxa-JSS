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
	 */
	public PatientList getPatientList(Integer patientListId) throws DAOException;
	
	/**
	 * Find {@link PatientList} matching an EncounterType
	 * @param encounterType 
	 */
	public List<PatientList> getPatientListByEncounterType(EncounterType encounterType);
	
	/**
	 * Find {@link PatientList} matching a uuid
	 * 
	 * @param uuid
	 * @return {@link PatientList}
	 */
	public PatientList getPatientListByUuid(String uuid);
	
	/**
	 * Find {@link PatientList} matching a name
	 * 
	 * @param name
	 * @return {@link PatientList}
	 */
	public PatientList getPatientListByName(String name);
	
	/**
	 * Get a list of {@link Patient} by PatientList
	 * 
	 * @param patientList
	 * @return list of {@link Patient}
	 */
	List<Patient> getPatientsInList(PatientList patientList);
	
	/**
	 * Update PatientList
	 * @return {@link PatientList}
	 */
	PatientList updatePatientList(PatientList patientList) throws DAOException;
	
}
