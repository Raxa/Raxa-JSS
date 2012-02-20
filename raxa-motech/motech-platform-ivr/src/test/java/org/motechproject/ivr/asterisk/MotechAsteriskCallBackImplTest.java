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
package org.motechproject.ivr.asterisk;

import junitx.util.PrivateAccessor;
import org.asteriskjava.live.AsteriskChannel;
import org.asteriskjava.live.CallDetailRecord;
import org.asteriskjava.live.LiveException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.runners.MockitoJUnitRunner;
import org.motechproject.event.EventRelay;
import org.motechproject.model.MotechEvent;
import org.motechproject.ivr.service.CallRequest;

import static org.mockito.Mockito.*;

class MyServerEventRelay implements EventRelay {
	@Override
	public void sendEventMessage(MotechEvent motechEvent) {
		
	}
}

@RunWith(MockitoJUnitRunner.class)
public class MotechAsteriskCallBackImplTest {

    @Mock
    private MyServerEventRelay eventRelay;

    @Mock
    private AsteriskChannel asteriskChannel;

    @Mock
    private LiveException liveException;

    @Mock
    private CallDetailRecord asteriskCallDetailRecord;

    MotechEvent event;
    CallRequest callRequest;
    MotechAsteriskCallBackImpl motechAsteriskCallBack;

    @Before
    public void setUp() throws Exception {
        event = new MotechEvent("", null);

        callRequest = new CallRequest( "", 0, "http://localhost");

        motechAsteriskCallBack = new MotechAsteriskCallBackImpl(callRequest);

        when(asteriskChannel.getCallDetailRecord()).thenReturn(asteriskCallDetailRecord);

        PrivateAccessor.setField(motechAsteriskCallBack, "eventRelay", eventRelay);
    }

    @Test
    public void testOnBusy_Event() throws Exception {
        callRequest.setOnBusyEvent(event);

        motechAsteriskCallBack.onBusy(asteriskChannel);

        verify(eventRelay, times(1)).sendEventMessage(event);
    }

    @Test
    public void testOnBusy_NoEvent() throws Exception {
        motechAsteriskCallBack.onBusy(asteriskChannel);

        verify(eventRelay, times(0)).sendEventMessage(event);
    }

    @Test
    public void testOnSuccess_Event() throws Exception {
        callRequest.setOnSuccessEvent(event);

        motechAsteriskCallBack.onSuccess(asteriskChannel);

        verify(eventRelay, times(1)).sendEventMessage(event);
    }

    @Test
    public void testOnSuccess_NoEvent() throws Exception {
        motechAsteriskCallBack.onSuccess(asteriskChannel);

        verify(eventRelay, times(0)).sendEventMessage(event);
    }

    @Test
    public void testOnNoAnswer_Event() throws Exception {
        callRequest.setOnNoAnswerEvent(event);

        motechAsteriskCallBack.onNoAnswer(asteriskChannel);

        verify(eventRelay, times(1)).sendEventMessage(event);
    }

    @Test
    public void testOnNoAnswer_NoEvent() throws Exception {
        motechAsteriskCallBack.onNoAnswer(asteriskChannel);

        verify(eventRelay, times(0)).sendEventMessage(event);
    }

    @Test
    public void testOnFailure_Event() throws Exception {
        callRequest.setOnFailureEvent(event);

        motechAsteriskCallBack.onFailure(liveException);

        verify(eventRelay, times(1)).sendEventMessage(event);
    }

    @Test
    public void testOnFailure_NoEvent() throws Exception {
        motechAsteriskCallBack.onFailure(liveException);

        verify(eventRelay, times(0)).sendEventMessage(event);
    }
}
