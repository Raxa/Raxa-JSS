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

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.runners.MockitoJUnitRunner;
import org.motechproject.context.Context;
import org.motechproject.gateway.MotechSchedulerGateway;
import org.motechproject.model.CronSchedulableJob;
import org.motechproject.model.MotechEvent;
import org.motechproject.outbox.api.EventKeys;
import org.motechproject.ivr.service.CallRequest;
import org.motechproject.ivr.service.IVRService;

import static org.mockito.Matchers.any;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class OutboxExecutionHandlerTest
{
	@InjectMocks
	private OutboxExecutionHandler outboxExecutionHandler = new OutboxExecutionHandler();

	@Mock
	private Context context;

    @Mock
    IVRService ivrServiceMock;

	@Mock
	private MotechSchedulerGateway motechSchedulerGateway;   

	@Before
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
    }

	@Test
	public void testExecute() {
		MotechEvent event = new MotechEvent("", null);
		event.getParameters().put(EventKeys.PHONE_NUMBER_KEY, "SIP/1000");
		event.getParameters().put(EventKeys.PARTY_ID_KEY, "pID");
		event.getParameters().put(EventKeys.LANGUAGE_KEY, "en");

        when(context.getIvrService()).thenReturn(ivrServiceMock);

		outboxExecutionHandler.execute(event);

		verify(ivrServiceMock).initiateCall(any(CallRequest.class));
	}

	@Test
	public void testExecute_NoPhone() {
		MotechEvent event = new MotechEvent("", null);
		event.getParameters().put(EventKeys.PARTY_ID_KEY, "pID");

        when(context.getIvrService()).thenReturn(ivrServiceMock);

		outboxExecutionHandler.execute(event);

		verify(ivrServiceMock, times(0)).initiateCall(any(CallRequest.class));
	}

	@Test
	public void testExecute_NoPartyID() {
		MotechEvent event = new MotechEvent("", null);
		event.getParameters().put(EventKeys.PHONE_NUMBER_KEY, "SIP/1000");

        when(context.getIvrService()).thenReturn(ivrServiceMock);

		outboxExecutionHandler.execute(event);

		verify(ivrServiceMock, times(0)).initiateCall(any(CallRequest.class));
	}
	
	@Test
	public void testSchedule() {
		MotechEvent event = new MotechEvent("", null);
		event.getParameters().put(EventKeys.CALL_HOUR_KEY, 12);
		event.getParameters().put(EventKeys.CALL_MINUTE_KEY, 0);
		event.getParameters().put(EventKeys.PHONE_NUMBER_KEY, "SIP/1000");
		event.getParameters().put(EventKeys.PARTY_ID_KEY, "pID");

		when(context.getMotechSchedulerGateway()).thenReturn(motechSchedulerGateway);

		outboxExecutionHandler.schedule(event);

		verify(motechSchedulerGateway).scheduleJob(any(CronSchedulableJob.class));
	}

	@Test
	public void testSchedule_NoPhone() {
		MotechEvent event = new MotechEvent("", null);
		event.getParameters().put(EventKeys.CALL_HOUR_KEY, 12);
		event.getParameters().put(EventKeys.CALL_MINUTE_KEY, 0);
		event.getParameters().put(EventKeys.PARTY_ID_KEY, "pID");

		when(context.getMotechSchedulerGateway()).thenReturn(motechSchedulerGateway);

		outboxExecutionHandler.schedule(event);

		verify(motechSchedulerGateway, times(0)).scheduleJob(any(CronSchedulableJob.class));
	}

    @Test
    public void testSchedule_NoParty() {
        MotechEvent event = new MotechEvent("", null);
        event.getParameters().put(EventKeys.CALL_HOUR_KEY, 12);
        event.getParameters().put(EventKeys.CALL_MINUTE_KEY, 0);
        event.getParameters().put(EventKeys.PHONE_NUMBER_KEY, "SIP/1000");

        when(context.getMotechSchedulerGateway()).thenReturn(motechSchedulerGateway);

        outboxExecutionHandler.schedule(event);

        verify(motechSchedulerGateway, times(0)).scheduleJob(any(CronSchedulableJob.class));
    }

    @Test
    public void testSchedule_NoHour() {
        MotechEvent event = new MotechEvent("", null);
        event.getParameters().put(EventKeys.CALL_MINUTE_KEY, 0);
        event.getParameters().put(EventKeys.PHONE_NUMBER_KEY, "SIP/1000");
        event.getParameters().put(EventKeys.PARTY_ID_KEY, "pID");

        when(context.getMotechSchedulerGateway()).thenReturn(motechSchedulerGateway);

        outboxExecutionHandler.schedule(event);

        verify(motechSchedulerGateway, times(0)).scheduleJob(any(CronSchedulableJob.class));
    }

    @Test
    public void testSchedule_InvalidHour() {
        MotechEvent event = new MotechEvent("", null);
        event.getParameters().put(EventKeys.CALL_HOUR_KEY, "foo");
        event.getParameters().put(EventKeys.CALL_MINUTE_KEY, 0);
        event.getParameters().put(EventKeys.PHONE_NUMBER_KEY, "SIP/1000");
        event.getParameters().put(EventKeys.PARTY_ID_KEY, "pID");

        when(context.getMotechSchedulerGateway()).thenReturn(motechSchedulerGateway);

        outboxExecutionHandler.schedule(event);

        verify(motechSchedulerGateway, times(0)).scheduleJob(any(CronSchedulableJob.class));
    }

    @Test
    public void testSchedule_NoMinute() {
        MotechEvent event = new MotechEvent("", null);
        event.getParameters().put(EventKeys.CALL_HOUR_KEY, 12);
        event.getParameters().put(EventKeys.PHONE_NUMBER_KEY, "SIP/1000");
        event.getParameters().put(EventKeys.PARTY_ID_KEY, "pID");

        when(context.getMotechSchedulerGateway()).thenReturn(motechSchedulerGateway);

        outboxExecutionHandler.schedule(event);

        verify(motechSchedulerGateway, times(0)).scheduleJob(any(CronSchedulableJob.class));
    }

    @Test
    public void testSchedule_InvalideMinute() {
        MotechEvent event = new MotechEvent("", null);
        event.getParameters().put(EventKeys.CALL_HOUR_KEY, 12);
        event.getParameters().put(EventKeys.CALL_MINUTE_KEY, "foo");
        event.getParameters().put(EventKeys.PHONE_NUMBER_KEY, "SIP/1000");
        event.getParameters().put(EventKeys.PARTY_ID_KEY, "pID");

        when(context.getMotechSchedulerGateway()).thenReturn(motechSchedulerGateway);

        outboxExecutionHandler.schedule(event);

        verify(motechSchedulerGateway, times(0)).scheduleJob(any(CronSchedulableJob.class));
    }	
    
	@Test
	public void testUnschedule() {
		MotechEvent event = new MotechEvent("", null);
		event.getParameters().put(EventKeys.SCHEDULE_JOB_ID_KEY, "JobId");

		when(context.getMotechSchedulerGateway()).thenReturn(motechSchedulerGateway);

		outboxExecutionHandler.unschedule(event);

		verify(motechSchedulerGateway).unscheduleJob("JobId");
	}

	@Test
	public void testUnschedule_NoPhone() {
		MotechEvent event = new MotechEvent("", null);

		when(context.getMotechSchedulerGateway()).thenReturn(motechSchedulerGateway);

		outboxExecutionHandler.unschedule(event);

		verify(motechSchedulerGateway, times(0)).unscheduleJob(anyString());
	}    
}
