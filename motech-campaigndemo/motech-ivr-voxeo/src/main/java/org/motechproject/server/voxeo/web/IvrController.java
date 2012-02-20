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
package org.motechproject.server.voxeo.web;

import org.ektorp.UpdateConflictException;
import org.motechproject.context.EventContext;
import org.motechproject.event.EventRelay;
import org.motechproject.ivr.event.IVREventDelegate;
import org.motechproject.ivr.model.CallDetailRecord;
import org.motechproject.model.MotechEvent;
import org.motechproject.ivr.service.CallRequest;
import org.motechproject.server.voxeo.dao.AllPhoneCalls;
import org.motechproject.server.voxeo.domain.PhoneCall;
import org.motechproject.server.voxeo.domain.PhoneCallEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.Map;

/**
 * Spring MVC controller implementation provides method to handle HTTP requests and generate
 * IVR entry VXML documents
 *
 */
public class IvrController extends MultiActionController
{
    private EventRelay eventRelay = EventContext.getInstance().getEventRelay();

    @Autowired
    private AllPhoneCalls allPhoneCalls;

    private Logger logger = LoggerFactory.getLogger((this.getClass()));

	public ModelAndView incoming(HttpServletRequest request, HttpServletResponse response) {
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");
        
		ModelAndView mav = new ModelAndView();

		String sessionId = request.getParameter("session.id");
		String status = request.getParameter("status");
        String callerId = request.getParameter("application.callerId");
        String timestamp = request.getParameter("timestamp");

		logger.info("Recording event for inbound call from " + callerId + " [sessionId: " + sessionId + ", status: " + status + ", timestamp: " + timestamp + "]");

        // See if I can load a CallDetailRecord for this session
        PhoneCall phoneCall = allPhoneCalls.findBySessionId(sessionId);

        if (null == phoneCall) {
            phoneCall = new PhoneCall();
            phoneCall.setId(sessionId);
            phoneCall.setSessionId(sessionId);
            phoneCall.setDirection(PhoneCall.Direction.INCOMING);

            CallRequest callRequest = new CallRequest();
            phoneCall.setCallRequest(callRequest);

            try {
                allPhoneCalls.add(phoneCall);
            } catch (UpdateConflictException e) {
                // I eat this exception since it means there was a race condition and the document has already been created.
                // I can continue with the new version
                phoneCall = allPhoneCalls.findBySessionId(sessionId);
            }
        }

        PhoneCallEvent event = new PhoneCallEvent();
        event.setCallerId(callerId);
        event.setStatus(PhoneCallEvent.Status.valueOf(status));
        event.setTimestamp(new Long(timestamp));

        phoneCall.addEvent(event);

        updateState(phoneCall, event);

        // TODO: I should retry a couple of times with exponential backoff. Or move events to a seperate document
        try {
            allPhoneCalls.update(phoneCall);
        } catch (UpdateConflictException e) {
            // I eat this exception since it means there was a race condition and the document has already been created.
            // I can continue with the new version
            phoneCall = allPhoneCalls.findBySessionId(sessionId);
            phoneCall.addEvent(event);
            allPhoneCalls.update(phoneCall);
        }

        return mav;
    }

    public ModelAndView outgoing(HttpServletRequest request, HttpServletResponse response) {
        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");

		ModelAndView mav = new ModelAndView();


		String sessionId = request.getParameter("session.id");
        String externalId = request.getParameter("externalId");
		String status = request.getParameter("status");
        String reason = request.getParameter("reason");
        String callerId = "1234567890";
        //String callerId = request.getParameter("application.callerId").substring(4);
        String timestamp = request.getParameter("timestamp");

		logger.info("Recording event for outgoing call to " + callerId + " [externalId: " + externalId + "sessionId: " + sessionId + ", status: " + status + ", timestamp: " + timestamp + "]");

        // See if I can load a CallDetailRecord for this session
        PhoneCall phoneCall = allPhoneCalls.get(externalId);

        if (null == phoneCall) {
            // This shouldn't happen
            phoneCall = new PhoneCall();
            phoneCall.setStartDate(new Date());
            phoneCall.setSessionId(sessionId);
            phoneCall.setDirection(PhoneCall.Direction.OUTGOING);
            phoneCall.setId(externalId);

            logger.error("Outgoing call without a phone call record. (externalId: " + externalId);
        }

        PhoneCallEvent event = new PhoneCallEvent();
        event.setCallerId(callerId);
        event.setStatus(PhoneCallEvent.Status.valueOf(status));
        event.setTimestamp(new Long(timestamp));
        event.setReason(PhoneCallEvent.Reason.fromString(reason));

        phoneCall.addEvent(event);

        updateState(phoneCall, event);

        // TODO: I should retry a couple of times with exponential backoff. Or move events to a seperate document
        try {
            allPhoneCalls.update(phoneCall);
        } catch (UpdateConflictException e) {
            // I eat this exception since it means there was a race condition and the document has already been created.
            // I can continue with the new version
            phoneCall = allPhoneCalls.findBySessionId(externalId);
            phoneCall.addEvent(event);
            allPhoneCalls.update(phoneCall);
        }

        return null;
    }

    private void updateState(PhoneCall phoneCall, PhoneCallEvent event)
    {
        MotechEvent motechEvent = null;

        System.out.println("Updating event status: " + event.getStatus());
        switch (event.getStatus()) {
            case ALERTING:
                phoneCall.setStartDate(new Date(event.getTimestamp()));
                break;

            case CONNECTED:
                phoneCall.setAnswerDate(new Date(event.getTimestamp()));
                break;

            case DIALOG_EXIT:
            case DISCONNECTED:
                phoneCall.setDisposition(CallDetailRecord.Disposition.ANSWERED);

                motechEvent = phoneCall.getCallRequest().getOnSuccessEvent();
                phoneCall.setEndDate(new Date(event.getTimestamp()));
                break;

            case FAILED:
                phoneCall.setEndDate(new Date(event.getTimestamp()));
                switch (event.getReason()) {
                    case BUSY:
                        phoneCall.setDisposition(CallDetailRecord.Disposition.BUSY);
                        motechEvent = phoneCall.getCallRequest().getOnBusyEvent();
                        break;

                    case TIMEOUT:
                        phoneCall.setDisposition(CallDetailRecord.Disposition.NO_ANSWER);
                        motechEvent = phoneCall.getCallRequest().getOnNoAnswerEvent();
                        break;

                    default:
                        phoneCall.setDisposition(CallDetailRecord.Disposition.FAILED);
                        motechEvent = phoneCall.getCallRequest().getOnFailureEvent();
                }
                break;
        }

        if (null != motechEvent) {
            CallDetailRecord cdr = new CallDetailRecord(phoneCall.getStartDate(), phoneCall.getEndDate(), phoneCall.getAnswerDate(),
                                                    phoneCall.getDisposition(), phoneCall.getDuration());

            Map<String, Object> parameters = motechEvent.getParameters();
            parameters.put(IVREventDelegate.CALL_DETAIL_RECORD_KEY, cdr);

            eventRelay.sendEventMessage(motechEvent);
        }
    }
}