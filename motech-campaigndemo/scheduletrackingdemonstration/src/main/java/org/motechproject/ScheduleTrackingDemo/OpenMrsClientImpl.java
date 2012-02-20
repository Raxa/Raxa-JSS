package org.motechproject.ScheduleTrackingDemo;

import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Set;

import org.joda.time.DateTime;
import org.motechproject.mrs.model.MRSEncounter;
import org.motechproject.mrs.model.MRSObservation;
import org.motechproject.openmrs.advice.ApiSession;
import org.motechproject.openmrs.advice.LoginAsAdmin;
import org.motechproject.openmrs.services.OpenMRSEncounterAdapter;
import org.motechproject.openmrs.services.OpenMRSObservationAdapter;
import org.motechproject.openmrs.services.OpenMRSPatientAdapter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class OpenMrsClientImpl implements OpenMrsClient {
	private static Logger logger = LoggerFactory.getLogger(OpenMrsClientImpl.class);
	private OpenMRSEncounterAdapter encounterAdapter;
	private OpenMRSPatientAdapter patientAdapter;
	private OpenMRSObservationAdapter observationAdapter;

	@Autowired
	public OpenMrsClientImpl(OpenMRSEncounterAdapter encounterAdapter, OpenMRSPatientAdapter patientAdapter, OpenMRSObservationAdapter observationAdapter) {
		this.encounterAdapter = encounterAdapter;
		this.patientAdapter = patientAdapter;
		this.observationAdapter = observationAdapter;
	}
	
	@LoginAsAdmin
	@ApiSession
	public boolean hasConcept(String patientId, String conceptName) {
		logger.debug(conceptName);
		List<MRSObservation> observationList = observationAdapter.getMRSObservationsByMotechPatientIdAndConceptName(patientId, conceptName);
		
		boolean found = false;
		if (observationList.size() > 0) {
			found = true;
			logger.debug("Found:" + found);
		} else {
			logger.debug("No encounter found for: " + patientId);
		}
		return found;
		
	}
	
	@LoginAsAdmin
	@ApiSession
	public void printValues(String externalID, String conceptName) {
		List<MRSObservation> mrsObservations = observationAdapter.getMRSObservationsByMotechPatientIdAndConceptName(externalID, conceptName);
		
		System.out.println("***** OBSERVATIONS *****");
		for (MRSObservation mrsObservation : mrsObservations) {
			System.out.println(mrsObservation.toString());
		}
		System.out.println("***** ENCOUNTERS *****");
		List<MRSEncounter> mrsEncounters = encounterAdapter.getAllEncountersByPatientMotechId(externalID);
		for (MRSEncounter mrsEncounter : mrsEncounters) {
			for (MRSObservation mrsObservation : mrsEncounter.getObservations())  {
				System.out.println("Belongs to: " + mrsObservation.toString());
			}
		}
	}
	
	@LoginAsAdmin
	@ApiSession
	public DateTime lastTimeFulfilledDateTimeObs(String patientId, String conceptName) {
		List<MRSObservation> mrsObservations = observationAdapter.getMRSObservationsByMotechPatientIdAndConceptName(patientId, conceptName);
		Collections.sort(mrsObservations, new dateComparator());
		
		for (MRSObservation mrsObservation : mrsObservations) {
			System.out.println("Hopefully in order?");
			System.out.println(mrsObservation.getValue().toString());
		}
		if (mrsObservations.size() > 0) {
		Date date = (Date) mrsObservations.get(0).getValue();
		Date date2 = (Date) mrsObservations.get(mrsObservations.size() - 1).getValue();
		DateTime dateTime = new DateTime(date);
		DateTime dateTime2 = new DateTime(date2);
		System.out.println("First is: " + dateTime.toString());
		System.out.println("Last is: " + dateTime2.toString());
		return dateTime;
		}
		return new DateTime();
		
	}
	
	private class dateComparator implements Comparator<MRSObservation>{

		@Override
		public int compare(MRSObservation o1, MRSObservation o2) {
			DateTime time1 = new DateTime((Date) o1.getValue());
			DateTime time2 = new DateTime((Date) o2.getValue());

			if (time1.isBefore(time2)) {
				return -1;
			} else if (time1.isAfter(time2)) {
				return 1;
			} 
			return 0;
		}
		
	}
}
