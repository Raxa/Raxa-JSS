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

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.mockito.runners.MockitoJUnitRunner;
import org.motechproject.event.EventRelay;
import org.motechproject.model.MotechEvent;
import org.motechproject.ivr.service.CallRequest;
import org.motechproject.server.voxeo.dao.AllPhoneCalls;
import org.motechproject.server.voxeo.domain.PhoneCall;
import org.motechproject.server.voxeo.domain.PhoneCallEvent;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

/**
 *
 */
@RunWith(MockitoJUnitRunner.class)
public class IvrControllerTest
{

    @InjectMocks
    IvrController ivrController = new IvrController();

    @Mock
    private HttpServletRequest request;

    @Mock
    HttpServletResponse response;

    @Mock
    private EventRelay eventRelay;

    @Mock
    private AllPhoneCalls allPhoneCalls;

    String sessionId = "12e64ab9d5faf166cd1aff16362016bb";
    String callerId = "1234567890";
    String callerIdOutgoing = "tel:2061234567";
    String timestamp = "1314827421379";

    @Before
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
     }

    /*
    When an alerting event comes in it is expected that we will
        - Create a new record for the call
        - Associate an event with it
        - Set the call start time
     */
    @Test
    public void testIncomingAlerting () {

        String status = "ALERTING";

        setIncomingRequestParameters(sessionId, status, callerId, timestamp);

        Mockito.when(allPhoneCalls.findBySessionId(sessionId)).thenReturn(null);

        ivrController.incoming(request, response);

        verify(allPhoneCalls, times(1)).findBySessionId(sessionId);

        ArgumentCaptor<PhoneCall> argumentCall = ArgumentCaptor.forClass(PhoneCall.class);
        verify(allPhoneCalls, times(1)).add(argumentCall.capture());
        PhoneCall call = argumentCall.getValue();

        PhoneCallEvent event = call.getEvent(PhoneCallEvent.Status.ALERTING);
        assertNotNull(event);

        verify(allPhoneCalls, times(1)).update(call);
        verify(eventRelay, never()).sendEventMessage(Matchers.<MotechEvent>anyObject());

        assertEquals(sessionId, call.getSessionId());
        assertEquals(sessionId, call.getId());
        assertEquals(PhoneCall.Direction.INCOMING, call.getDirection());

        assertEquals(callerId, event.getCallerId());
        assertEquals(PhoneCallEvent.Status.valueOf(status), event.getStatus());
        assertEquals(new Long(timestamp), event.getTimestamp());

        assertEquals(new Date(new Long(timestamp)), call.getStartDate());
        assertNull(call.getAnswerDate());
        assertNull(call.getDuration());
        assertNull(call.getEndDate());
    }

    /*
    When a connected event comes in it is expected that we will
        - Load an existing record for the call
        - Associate an event with it
        - Set the call answer time

        This is functionally the same as ALERTING, just sets a different time.
     */
    @Test
    public void testIncomingConnected() {

        String status = "CONNECTED";

        setIncomingRequestParameters(sessionId, status, callerId, timestamp);
        PhoneCall phoneCall = new PhoneCall();
        phoneCall.setId(sessionId);
        phoneCall.setSessionId(sessionId);
        phoneCall.setDirection(PhoneCall.Direction.INCOMING);

        Mockito.when(allPhoneCalls.findBySessionId(sessionId)).thenReturn(phoneCall);

        ivrController.incoming(request, response);

        verify(allPhoneCalls, times(1)).findBySessionId(sessionId);

        verify(allPhoneCalls, times(1)).update(phoneCall);
        verify(allPhoneCalls, never()).add(Matchers.<PhoneCall>anyObject());
        verify(eventRelay, never()).sendEventMessage(Matchers.<MotechEvent>anyObject());

        assertEquals(new Date(new Long(timestamp)), phoneCall.getAnswerDate());
    }

    /*
    When a connected event comes in it is expected that we will
        - Load an existing record for the call
        - Associate an event with it
        - Set the call answer time

        This is functionally the same as ALERTING, just sets a different time.
     */
    @Test
    public void testIncomingDisconnectedNoCDREvent() {

        String status = "DISCONNECTED";

        setIncomingRequestParameters(sessionId, status, callerId, timestamp);
        PhoneCall phoneCall = new PhoneCall();
        phoneCall.setId(sessionId);
        phoneCall.setSessionId(sessionId);
        phoneCall.setDirection(PhoneCall.Direction.INCOMING);
        phoneCall.setStartDate(new Date(new Long(timestamp)));

        CallRequest callRequest = new CallRequest();
        phoneCall.setCallRequest(callRequest);

        Mockito.when(allPhoneCalls.findBySessionId(sessionId)).thenReturn(phoneCall);

        ivrController.incoming(request, response);

        verify(allPhoneCalls, times(1)).findBySessionId(sessionId);

        verify(allPhoneCalls, times(1)).update(phoneCall);
        verify(allPhoneCalls, never()).add(Matchers.<PhoneCall>anyObject());
        verify(eventRelay, never()).sendEventMessage(Matchers.<MotechEvent>anyObject());

        assertEquals(new Date(new Long(timestamp)), phoneCall.getEndDate());
        assertEquals(new Integer(0), phoneCall.getDuration());
    }

    @Test
    public void testIncomingDisconnectedCDREvent() {

        String status = "DISCONNECTED";

        setIncomingRequestParameters(sessionId, status, callerId, timestamp);
        PhoneCall phoneCall = new PhoneCall();
        phoneCall.setId(sessionId);
        phoneCall.setSessionId(sessionId);
        phoneCall.setDirection(PhoneCall.Direction.INCOMING);
        phoneCall.setStartDate(new Date(new Long(timestamp)));

        CallRequest callRequest = new CallRequest("1001", 0, "http://localhost");
        callRequest.setOnSuccessEvent(new MotechEvent("subject"));
        phoneCall.setCallRequest(callRequest);

        Mockito.when(allPhoneCalls.findBySessionId(sessionId)).thenReturn(phoneCall);

        ivrController.incoming(request, response);

        verify(allPhoneCalls, times(1)).findBySessionId(sessionId);

        verify(allPhoneCalls, times(1)).update(phoneCall);
        verify(allPhoneCalls, never()).add(Matchers.<PhoneCall>anyObject());
        verify(eventRelay, times(1)).sendEventMessage(Matchers.<MotechEvent>anyObject());

        assertEquals(new Date(new Long(timestamp)), phoneCall.getEndDate());
        assertEquals(new Integer(0), phoneCall.getDuration());
    }

    @Test
    public void testOutgoingConnected() {

        String status = "CONNECTED";
        String externalId = "id";

        setOutgoingRequestParameters(sessionId, externalId, status, null, callerIdOutgoing, timestamp);
        PhoneCall phoneCall = new PhoneCall();
        phoneCall.setId(externalId);
        phoneCall.setSessionId(sessionId);
        phoneCall.setDirection(PhoneCall.Direction.OUTGOING);
        phoneCall.setStartDate(new Date(new Long(timestamp)));

        CallRequest callRequest = new CallRequest("1001", 0, "http://localhost");
        callRequest.setOnSuccessEvent(new MotechEvent("subject"));
        phoneCall.setCallRequest(callRequest);

        Mockito.when(allPhoneCalls.get(externalId)).thenReturn(phoneCall);

        ivrController.outgoing(request, response);

        PhoneCallEvent event = phoneCall.getEvent(PhoneCallEvent.Status.CONNECTED);
        assertNotNull(event);

        verify(allPhoneCalls, times(1)).update(phoneCall);
        verify(eventRelay, never()).sendEventMessage(Matchers.<MotechEvent>anyObject());

        assertEquals(sessionId, phoneCall.getSessionId());
        assertEquals(externalId, phoneCall.getId());
        assertEquals(PhoneCall.Direction.OUTGOING, phoneCall.getDirection());

        assertEquals(callerId, event.getCallerId());
        assertEquals(PhoneCallEvent.Status.valueOf(status), event.getStatus());
        assertEquals(new Long(timestamp), event.getTimestamp());

        assertEquals(new Date(new Long(timestamp)), phoneCall.getStartDate());
        assertEquals(new Date(new Long(timestamp)), phoneCall.getAnswerDate());
        assertNull(phoneCall.getDuration());
        assertNull(phoneCall.getEndDate());
    }

    @Test
    public void testOutgoingFailedBusy() {

        String status = "FAILED";
        String reason = "busy";
        String externalId = "id";

        setOutgoingRequestParameters(sessionId, externalId, status, reason, callerIdOutgoing, timestamp);
        PhoneCall phoneCall = new PhoneCall();
        phoneCall.setId(externalId);
        phoneCall.setSessionId(sessionId);
        phoneCall.setDirection(PhoneCall.Direction.OUTGOING);
        phoneCall.setStartDate(new Date(new Long(timestamp)));

        CallRequest callRequest = new CallRequest("1001", 0, "http://localhost");
        callRequest.setOnBusyEvent(new MotechEvent("subject"));
        phoneCall.setCallRequest(callRequest);

        Mockito.when(allPhoneCalls.get(externalId)).thenReturn(phoneCall);

        ivrController.outgoing(request, response);

        PhoneCallEvent event = phoneCall.getEvent(PhoneCallEvent.Status.FAILED);
        assertNotNull(event);

        verify(allPhoneCalls, times(1)).update(phoneCall);
        verify(eventRelay, times(1)).sendEventMessage(Matchers.<MotechEvent>anyObject());

        assertEquals(sessionId, phoneCall.getSessionId());
        assertEquals(externalId, phoneCall.getId());
        assertEquals(PhoneCall.Direction.OUTGOING, phoneCall.getDirection());

        assertEquals(callerId, event.getCallerId());
        assertEquals(PhoneCallEvent.Status.valueOf(status), event.getStatus());
        assertEquals(new Long(timestamp), event.getTimestamp());

        assertEquals(new Date(new Long(timestamp)), phoneCall.getStartDate());
        assertNull(phoneCall.getAnswerDate());
        assertNotNull(phoneCall.getDuration());
        assertNotNull(phoneCall.getEndDate());
    }

    private void setIncomingRequestParameters(String sessionId, String status, String callerId, String timestamp) {
        Mockito.when(request.getParameter("session.id")).thenReturn(sessionId);
        Mockito.when(request.getParameter("status")).thenReturn(status);
        Mockito.when(request.getParameter("application.callerId")).thenReturn(callerId);
        Mockito.when(request.getParameter("timestamp")).thenReturn(timestamp);
    }

    private void setOutgoingRequestParameters(String sessionId, String externalId, String status, String reason, String callerId, String timestamp) {
        Mockito.when(request.getParameter("session.id")).thenReturn(sessionId);
        Mockito.when(request.getParameter("externalId")).thenReturn(externalId);
        Mockito.when(request.getParameter("status")).thenReturn(status);
        Mockito.when(request.getParameter("reason")).thenReturn(reason);
        Mockito.when(request.getParameter("application.callerId")).thenReturn(callerId);
        Mockito.when(request.getParameter("timestamp")).thenReturn(timestamp);
    }
}