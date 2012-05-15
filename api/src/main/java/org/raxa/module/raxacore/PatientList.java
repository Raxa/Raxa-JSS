package org.raxa.module.raxacore;

import java.io.Serializable;
import org.openmrs.BaseOpenmrsMetadata;

/**
 * PatientList stores the data needed to lists patients for registration, screener, etc.
 */
public class PatientList extends BaseOpenmrsMetadata implements Serializable {
	
	private Integer patientListId;
	
	private String searchQuery;
	
	public PatientList() {
		
	}
	
	/** Sets id
	 * 
	 * @param id: id to set
	 */
	@Override
	public void setId(Integer id) {
		setPatientListId(id);
	}
	
	/** Gets id
	 * 
	 * @return the patientListId
	 */
	@Override
	public Integer getId() {
		return getPatientListId();
	}
	
	/** Compares two PatientList objects for similarity
	 * 
	 * @param obj PatientList object to compare to
	 * @return boolean true/false whether or not they are the same objects
	 * @see java.lang.Object#equals(java.lang.Object)
	 * @should equal PatientList with same patientListId
	 * @should not equal PatientList with different patientListId
	 * @should not equal on null
	 * @should have equal patientList objects with no patientListIds
	 * @should not have equal PatientList objects when one has null patientListId
	 */
	@Override
	public boolean equals(Object obj) {
		if (obj instanceof PatientList) {
			PatientList pList = (PatientList) obj;
			if (this.getPatientListId() != null && pList.getPatientListId() != null)
				return (this.getPatientListId().equals(pList.getPatientListId()));
		}
		return this == obj;
	}
	
	/**
	 * @see java.lang.Object#hashCode()
	 * @should have same hashcode when equal
	 * @should have different hash code when not equal
	 * @should get hash code with null attributes
	 */
	@Override
	public int hashCode() {
		if (this.getPatientListId() == null)
			return super.hashCode();
		return this.getPatientListId().hashCode();
	}
	
	/**
	 * @return the searchQuery
	 */
	public String getSearchQuery() {
		return searchQuery;
	}
	
	/**
	 * @param searchQuery the searchQuery to set
	 */
	public void setSearchQuery(String searchQuery) {
		this.searchQuery = searchQuery;
	}
	
	/**
	 * @return the patientListId
	 */
	public Integer getPatientListId() {
		return patientListId;
	}
	
	/**
	 * @param patientListId the patientListId to set
	 */
	public void setPatientListId(Integer patientListId) {
		this.patientListId = patientListId;
	}
	
}
