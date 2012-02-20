package org.motechproject.ScheduleTrackingDemo.listeners;

import java.util.List;
import java.util.Map;

import org.motechproject.ScheduleTracking.model.Patient;
import org.motechproject.ScheduleTrackingDemo.OpenMrsClient;
import org.motechproject.ScheduleTrackingDemo.DAO.MRSPatientDAO;
import org.motechproject.cmslite.api.model.ContentNotFoundException;
import org.motechproject.cmslite.api.model.StringContent;
import org.motechproject.cmslite.api.service.CMSLiteService;
import org.motechproject.ivr.service.CallRequest;
import org.motechproject.ivr.service.IVRService;
import org.motechproject.model.MotechEvent;
import org.motechproject.scheduletracking.api.domain.InvalidEnrollmentException;
import org.motechproject.scheduletracking.api.domain.MilestoneFulfillmentException;
import org.motechproject.scheduletracking.api.domain.NoMoreMilestonesToFulfillException;
import org.motechproject.scheduletracking.api.events.MilestoneEvent;
import org.motechproject.scheduletracking.api.events.constants.EventSubject;
import org.motechproject.scheduletracking.api.service.ScheduleTrackingService;
import org.motechproject.server.event.annotations.MotechListener;
import org.motechproject.sms.api.service.SmsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class MilestoneListener {

	private static Logger logger = LoggerFactory
			.getLogger(MilestoneListener.class);

	private static final String SMS_FORMAT = "SMS";
	private static final String IVR_FORMAT = "IVR";

	@Autowired
	private IVRService voxeoService;

	@Autowired
	private OpenMrsClient openmrsClient;

	@Autowired
	private ScheduleTrackingService scheduleTrackingService;

	@Autowired
	private MRSPatientDAO patientDAO;

	@Autowired
	private CMSLiteService cmsliteService;
	
	@Autowired
	private SmsService smsService;

	@MotechListener(subjects = { EventSubject.MILESTONE_ALERT })
	public void execute(MotechEvent event) {
		logger.debug("Handled milestone event");
		MilestoneEvent mEvent = new MilestoneEvent(event);
		System.out.println("For: " + mEvent.getExternalId() + " --- " + mEvent.getMilestoneName() + " --- " + mEvent.getScheduleName() + " --- " + mEvent.getWindowName());
		String milestoneConceptName = (String) event.getParameters().get("conceptName");

		if (milestoneConceptName == null) return; //This method does not handle events without conceptName
		
		boolean hasFulfilledMilestone = openmrsClient.hasConcept(
				mEvent.getExternalId(), milestoneConceptName);

		if (hasFulfilledMilestone && mEvent.getReferenceDate().minusDays(1).isBefore(openmrsClient.lastTimeFulfilledDateTimeObs(mEvent.getExternalId(), milestoneConceptName))) {
			logger.debug("Fulfilling milestone for: " + mEvent.getExternalId()
					+ " with schedule: " + mEvent.getScheduleName());
			
			try {
				scheduleTrackingService.fulfillCurrentMilestone(
						mEvent.getExternalId(), mEvent.getScheduleName());
			} catch (InvalidEnrollmentException e) {
				
			} catch (MilestoneFulfillmentException e2) {
				
			} catch (NoMoreMilestonesToFulfillException e3) {
				
			}
		} else if (!mEvent.getWindowName().equals("max")){ //Place calls and/or text messages, but not for the max alerts
			
			List<Patient> patientList = patientDAO.findByExternalid(mEvent.getExternalId());
			
			if (patientList.size() > 0) {
				
				String IVRFormat = (String) event.getParameters().get("IVRFormat");
				String SMSFormat = (String) event.getParameters().get("SMSFormat");
				String language = (String) event.getParameters().get("language");
				String messageName = (String) event.getParameters().get("messageName");
				

				if ("true".equals(IVRFormat) && language != null && messageName != null) {
					this.placeCall(patientList.get(0), language, messageName, mEvent.getWindowName());
				}
				if ("true".equals(SMSFormat) && language != null && messageName != null) {
					this.sendSMS(patientList.get(0), language, messageName, mEvent.getWindowName());
				}
			}
		}
	}

	@MotechListener(subjects = { EventSubject.DEFAULTMENT_CAPTURE })
	public void defaulted(MotechEvent event) {
		MilestoneEvent mEvent = new MilestoneEvent(event);
		List<Patient> patientList = patientDAO.findByExternalid(mEvent.getExternalId());
		
		if (patientList.size() > 0) {
			this.placeCall(patientList.get(0), "en", "defaulted-demo-message", "");
			this.sendSMS(patientList.get(0), "en", "defaulted-demo-message", "");
			
		}
		logger.debug("Handled milestone event"); //Currently do nothing with defaultment event
	}

	private void placeCall(Patient patient, String language, String messageName, String windowName) {
		if (cmsliteService.isStringContentAvailable(language, messageName + windowName, IVR_FORMAT)) {
			StringContent content = null;
			try {
				content = cmsliteService.getStringContent(language, messageName + windowName, IVR_FORMAT);
			} catch (ContentNotFoundException e) {
				e.printStackTrace();
			}
			if (content != null) {
				System.out.println("Calling");
				CallRequest request = new CallRequest(patient.getPhoneNum(), 119, content.getValue());
				voxeoService.initiateCall(request);
			}
		} else {
			logger.error("No IVR content available");
		}
	}

	private void sendSMS(Patient patient, String language, String messageName, String windowName) {
		if (cmsliteService.isStringContentAvailable(language, messageName + windowName, SMS_FORMAT)) {
			StringContent content = null;
			try {
				content = cmsliteService.getStringContent(language, messageName + windowName, SMS_FORMAT);
			} catch (ContentNotFoundException e) {
			}
			smsService.sendSMS(patient.getPhoneNum(), content.getValue());
		} else { //no content, don't send SMS
			logger.error("No SMS content available");
		}

	}

}
