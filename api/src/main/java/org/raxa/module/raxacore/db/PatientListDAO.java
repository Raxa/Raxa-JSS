package org.raxa.module.raxacore.db;

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
import org.openmrs.EncounterType;
import org.openmrs.api.db.DAOException;
import org.raxa.module.raxacore.PatientList;

/**
 * Interface for accessing raxacore_patient_list
 */
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
