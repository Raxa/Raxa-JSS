/**
 * MOTECH PLATFORM OPENSOURCE LICENSE AGREEMENT
 *
 * Copyright (c) 2011 Grameen Foundation USA.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Grameen Foundation USA, nor its respective contributors
 * may be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY GRAMEEN FOUNDATION USA AND ITS CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL GRAMEEN FOUNDATION USA OR ITS CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
 * OF SUCH DAMAGE.
 */
package org.motechproject.server.outbox;

import java.util.HashMap;
import java.util.Map;

import org.motechproject.context.Context;
import org.motechproject.gateway.MotechSchedulerGateway;
import org.motechproject.ivr.model.CallInitiationException;
import org.motechproject.model.CronSchedulableJob;
import org.motechproject.model.MotechEvent;
import org.motechproject.outbox.api.EventKeys;
import org.motechproject.server.event.annotations.MotechListener;
import org.motechproject.ivr.service.CallRequest;
import org.motechproject.ivr.service.IVRService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 
 */
public class OutboxExecutionHandler {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	private MotechSchedulerGateway schedulerGateway = Context.getInstance().getMotechSchedulerGateway();
    private IVRService ivrService = Context.getInstance().getIvrService();

    //TODO: move this out to config somewhere
    private static final String HOST_IP = "10.0.1.6";
    private static final String OUTBOX_VXML_BASE_URL = "http://" + HOST_IP + "/motech-platform-server/module/outbox/vxml/outboxMessage";

   	int timeOut = 20000;

	@MotechListener(subjects={EventKeys.EXECUTE_OUTBOX_SUBJECT})
	public void execute(MotechEvent event) {

        String partyId = EventKeys.getPartyID(event);
        if (partyId == null) {
            logger.error("Can not handle Event: " + event.getSubject() +
                     ". The event is invalid - missing the " + EventKeys.PARTY_ID_KEY + " parameter");
            return;
        }

        String phoneNumber = EventKeys.getPhoneNumberKey(event);
        if (phoneNumber == null) {
            logger.error("Can not handle Event: " + event.getSubject() +
                     ". The event is invalid - missing the " + EventKeys.PHONE_NUMBER_KEY + " parameter");
            return;
        }
        
        String language = EventKeys.getLanguageKey(event);
        if (language == null) {
            logger.error("Can not handle Event: " + event.getSubject() +
                    ". The event is invalid - missing the " + EventKeys.LANGUAGE_KEY + " parameter");
           return;
        }        

        try {
            String vxmlUrl = OUTBOX_VXML_BASE_URL + "?pId=" + partyId + "&ln=" + language;
            CallRequest callRequest = new CallRequest(phoneNumber, timeOut, vxmlUrl);

            Map<String, Object> messageParameters = new HashMap<String, Object>();
            messageParameters.put(EventKeys.PARTY_ID_KEY, partyId);
            MotechEvent incompleteEvent = new MotechEvent(EventKeys.INCOMPLETE_OUTBOX_CALL_SUBJECT,
                                                          messageParameters);

            callRequest.setOnBusyEvent(incompleteEvent);
            callRequest.setOnFailureEvent(incompleteEvent);
            callRequest.setOnNoAnswerEvent(incompleteEvent);

            MotechEvent successEvent = new MotechEvent(EventKeys.COMPLETED_OUTBOX_CALL_SUBJECT,
                                                       messageParameters);

            callRequest.setOnSuccessEvent(successEvent);

            ivrService.initiateCall(callRequest);
        } catch (CallInitiationException e) {
            logger.warn("Unable to initiate call to partyId=" + partyId + " e: " + e.getMessage());
        }
	}

	@MotechListener(subjects={EventKeys.SCHEDULE_EXECUTION_SUBJECT})
	public void schedule(MotechEvent event) {

        Integer callHour = EventKeys.getCallHourKey(event);
        if (callHour == null) {
            logger.error("Can not handle Event: " + event.getSubject() +
                     ". The event is invalid - missing the " + EventKeys.CALL_HOUR_KEY + " parameter");
            return;
        }

        Integer callMinute = EventKeys.getCallMinuteKey(event);
        if (callMinute == null) {
            logger.error("Can not handle Event: " + event.getSubject() +
                     ". The event is invalid - missing the " + EventKeys.CALL_MINUTE_KEY + " parameter");
            return;
        }

        String partyId = EventKeys.getPartyID(event);
        if (partyId == null) {
            logger.error("Can not handle Event: " + event.getSubject() +
                     ". The event is invalid - missing the " + EventKeys.PARTY_ID_KEY + " parameter");
            return;
        }

        String phoneNumber = EventKeys.getPhoneNumberKey(event);
        if (phoneNumber == null) {
            logger.error("Can not handle Event: " + event.getSubject() +
                     ". The event is invalid - missing the " + EventKeys.PHONE_NUMBER_KEY + " parameter");
            return;
        }

        MotechEvent reminderEvent = new MotechEvent(EventKeys.EXECUTE_OUTBOX_SUBJECT, event.getParameters());
		CronSchedulableJob cronSchedulableJob = new CronSchedulableJob(reminderEvent, String.format("0 %d %d * * ?", callMinute, callHour));

    	schedulerGateway.scheduleJob(cronSchedulableJob);		
	}

	@MotechListener(subjects={EventKeys.UNSCHEDULE_EXECUTION_SUBJECT})
	public void unschedule(MotechEvent event) {

        String jobId = EventKeys.getScheduleJobIdKey(event);
        if (jobId == null) {
            logger.error("Can not handle Event: " + event.getSubject() +
                     ". The event is invalid - missing the " + EventKeys.SCHEDULE_JOB_ID_KEY + " parameter");
            return;
        }

		schedulerGateway.unscheduleJob(jobId);		
	}
}
