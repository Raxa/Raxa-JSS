package org.raxa.module.raxacore;

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
import org.openmrs.Encounter;
import org.openmrs.EncounterType;
import org.openmrs.Patient;
import org.openmrs.annotation.Authorized;
import org.openmrs.api.OpenmrsService;
import org.openmrs.util.PrivilegeConstants;
import org.raxa.module.raxacore.db.PatientListDAO;

/*
 * Interface for interacting with the PatientList
 */
public interface PatientListService extends OpenmrsService {
	
	/**
	 * Sets Patient List DAO
	 *
	 * @param dao
	 */
	public void setPatientListDAO(PatientListDAO dao);
	
	/**
	 * Saves PatientList
	 *
	 * @param patientList
	 * @return PatientList
	 */
	@Authorized( { "Add Patient Lists" })
	public PatientList savePatientList(PatientList patientList);
	
	/**
	 * Gets a PatientList by Id
	 *
	 * @param id
	 * @return PatientLists
	 */
	@Authorized( { "View Patient Lists" })
	public PatientList getPatientList(Integer id);
	
	/**
	 * Gets a PatientList by Name
	 *
	 * @param name
	 * @return list of PatientLists
	 */
	@Authorized( { "View Patient Lists" })
	public List<PatientList> getPatientListByName(String name);
	
	/**
	 * Gets PatientList by uuid
	 *
	 * @param uuid
	 * @return PatientList
	 */
	@Authorized( { "View Patient Lists" })
	public PatientList getPatientListByUuid(String uuid);
	
	/**
	 * Gets PatientLists by EncounterType
	 *
	 * @param encounterType
	 * @return list of PatientLists
	 */
	@Authorized(value = { "View Patient Lists", PrivilegeConstants.VIEW_ENCOUNTER_TYPES }, requireAll = true)
	public List<PatientList> getPatientListByEncounterType(EncounterType encounterType);
	
	/**
	 * Gets all patients in PatientList
	 *
	 * @param patientList
	 * @return list of Patients
	 */
	@Authorized(value = { "View Patient Lists", PrivilegeConstants.VIEW_PATIENTS }, requireAll = true)
	public List<Patient> getPatientsInPatientList(PatientList patientList);
	
	/**
	 * Gets all the encounters in PatientList
	 *
	 * @param patientList
	 * @return list of Encounters
	 */
	@Authorized(value = { "View Patient Lists", PrivilegeConstants.VIEW_ENCOUNTERS }, requireAll = true)
	public List<Encounter> getEncountersInPatientList(PatientList patientList);
	
	/**
	 * Updates PatientList
	 *
	 * @param patientList
	 * @return PatientList
	 */
	@Authorized( { "Edit Patient Lists" })
	PatientList updatePatientList(PatientList patientList);
	
	/**
	 * Deletes PatientList
	 *
	 * @param patientList
	 */
	@Authorized( { "Delete Patient Lists" })
	public void deletePatientList(PatientList patientList);
}
