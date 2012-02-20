package org.motechproject.ScheduleTrackingDemo.controllers;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.motechproject.ScheduleTracking.model.Patient;
import org.motechproject.ScheduleTrackingDemo.OpenMrsClient;
import org.motechproject.ScheduleTrackingDemo.DAO.MRSPatientDAO;
import org.motechproject.mrs.model.MRSEncounter;
import org.motechproject.mrs.model.MRSObservation;
import org.motechproject.openmrs.advice.ApiSession;
import org.motechproject.openmrs.advice.LoginAsAdmin;
import org.motechproject.openmrs.services.OpenMRSEncounterAdapter;
import org.motechproject.openmrs.services.OpenMRSObservationAdapter;
import org.motechproject.openmrs.services.OpenMRSPatientAdapter;
import org.motechproject.scheduletracking.api.domain.Enrollment;
import org.motechproject.scheduletracking.api.domain.InvalidEnrollmentException;
import org.motechproject.scheduletracking.api.domain.Milestone;
import org.motechproject.scheduletracking.api.domain.Schedule;
import org.motechproject.scheduletracking.api.repository.AllEnrollments;
import org.motechproject.scheduletracking.api.repository.AllTrackedSchedules;
import org.motechproject.scheduletracking.api.service.EnrollmentRequest;
import org.motechproject.scheduletracking.api.service.ScheduleTrackingService;
import org.motechproject.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;


public class EnrollController extends MultiActionController {
	
	@Autowired
	MRSPatientDAO patientDAO;

	@Autowired
	private ScheduleTrackingService scheduleTrackingService; 

	@Autowired
	private AllTrackedSchedules allSchedules;

	@Autowired
	AllEnrollments allEnrollments;

	@Autowired
	private OpenMrsClient openMrsClient;

	@Autowired
	private OpenMRSObservationAdapter observationAdapter;

	@Autowired
	private OpenMRSEncounterAdapter encounterAdapter;
	
	@Autowired
	private OpenMRSPatientAdapter patientAdapter;


	public ModelAndView start(HttpServletRequest request, HttpServletResponse response) {

		String externalID = request.getParameter("externalID");
		String scheduleName = request.getParameter("scheduleName");

		if (patientDAO.getPatient(externalID) != null && 
				patientAdapter.getPatientByMotechId(externalID) != null) { //do not let users that aren't in both databases register
			Schedule schedule = allSchedules.getByName(scheduleName);

			if (schedule == null) return new ModelAndView("scheduleTrackingPage");

			String lastConceptFulfilled = "";
			String checkConcept;

			for (Milestone milestone : schedule.getMilestones()) {
				checkConcept = milestone.getData().get("conceptName");
				if (checkConcept != null) {
					if (openMrsClient.hasConcept(externalID, checkConcept)) {
						System.out.println(lastConceptFulfilled);
						lastConceptFulfilled = checkConcept;
						System.out.println(lastConceptFulfilled);
					}
				}
			}

			EnrollmentRequest enrollmentRequest;

			if (lastConceptFulfilled.equals("")) { //enroll in new schedule
				enrollmentRequest = new EnrollmentRequest(externalID, scheduleName, null, DateUtil.now());
			} else { //start at the next milestone
				Enrollment enrollment = allEnrollments.findActiveByExternalIdAndScheduleName(externalID, scheduleName);
				if (enrollment == null) {
					enrollmentRequest = new EnrollmentRequest(externalID, scheduleName, null, DateUtil.now(), schedule.getNextMilestoneName(lastConceptFulfilled));
				} else { //Enrollment already exists, but now re-enrolling to whatever their latest last milestone fulfillment was, based on OpenMRS
					scheduleTrackingService.unenroll(externalID, scheduleName);
					enrollmentRequest = new EnrollmentRequest(externalID, scheduleName, null, DateUtil.now(), schedule.getNextMilestoneName(lastConceptFulfilled));
				}
			}

			scheduleTrackingService.enroll(enrollmentRequest);			
			
		}
		
		List<Patient> patientList = patientDAO.findAllPatients();
		
		Map<String, Object> modelMap = new TreeMap<String, Object>();
		modelMap.put("patients", patientList); //List of patients is for display purposes only
		
		ModelAndView mv = new ModelAndView("scheduleTrackingPage", modelMap);

		return mv;

	}

	public ModelAndView stop(HttpServletRequest request, HttpServletResponse response) {

		String externalID = request.getParameter("externalID");
		String scheduleName = request.getParameter("scheduleName");

		try {
			scheduleTrackingService.unenroll(externalID, scheduleName);
		} catch (InvalidEnrollmentException e) {

		}

		List<Patient> patientList = patientDAO.findAllPatients();
		
		Map<String, Object> modelMap = new TreeMap<String, Object>();
		modelMap.put("patients", patientList); //List of patients is for display purposes only
		
		ModelAndView mv = new ModelAndView("scheduleTrackingPage", modelMap);

		return mv;
	}



	/**
	 * For testing purposes only
	 * @param request
	 * @param response
	 * @return
	 */
	public ModelAndView fulfill(HttpServletRequest request, HttpServletResponse response) {

		String externalID = request.getParameter("externalID");
		String scheduleName = request.getParameter("scheduleName");

		EnrollmentRequest enrollmentRequest = new EnrollmentRequest(externalID, scheduleName, null, DateUtil.now());

		scheduleTrackingService.fulfillCurrentMilestone(externalID, scheduleName);

		List<Patient> patientList = patientDAO.findAllPatients();
		
		Map<String, Object> modelMap = new TreeMap<String, Object>();
		modelMap.put("patients", patientList); //List of patients is for display purposes only
		
		ModelAndView mv = new ModelAndView("scheduleTrackingPage", modelMap);

		return mv;

	}

	/**
	 * For testing purposes
	 * @param request
	 * @param response
	 * @return
	 */
	public ModelAndView obs(HttpServletRequest request, HttpServletResponse response) {
		String externalID = request.getParameter("externalID");
		String conceptName = request.getParameter("conceptName");

		openMrsClient.printValues(externalID, conceptName);

		openMrsClient.lastTimeFulfilledDateTimeObs(externalID, conceptName);


		List<Patient> patientList = patientDAO.findAllPatients();
		
		Map<String, Object> modelMap = new TreeMap<String, Object>();
		modelMap.put("patients", patientList); //List of patients is for display purposes only
		
		ModelAndView mv = new ModelAndView("scheduleTrackingPage", modelMap);

		return mv;
	}

	public ModelAndView scheduleTracking(HttpServletRequest request, HttpServletResponse response) {
		
		List<Patient> patientList = patientDAO.findAllPatients();
		
		Map<String, Object> modelMap = new TreeMap<String, Object>();
		modelMap.put("patients", patientList); //List of patients is for display purposes only
		
		ModelAndView mv = new ModelAndView("scheduleTrackingPage", modelMap);

		return mv;
	}
}




