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

import org.asteriskjava.live.AsteriskServer;
import org.asteriskjava.live.ManagerCommunicationException;
import org.asteriskjava.live.NoSuchChannelException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Matchers;
import org.mockito.Mockito;
import org.motechproject.ivr.model.CallInitiationException;
import org.motechproject.ivr.service.CallRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.assertNotNull;
import static org.mockito.Matchers.anyLong;
import static org.mockito.Mockito.mock;


/**
 * IVR Service Unit Tests
 *
 */

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/testIVRAppContext.xml"})
public class TestIVRService {

    private static final String CALLBACK_URL = "http://localhost";
	@Autowired
    private IVRServiceAsteriskImpl ivrService;

    @Test
    public void testInitiateCall() throws Exception {

        AsteriskServer asteriskServerMock = mock(AsteriskServer.class);
        ivrService.setAsteriskServer(asteriskServerMock);

        CallRequest callRequest = new CallRequest("1001", Integer.MAX_VALUE, CALLBACK_URL);

        ivrService.initiateCall(callRequest);

        Mockito.verify(asteriskServerMock, Mockito.times(1))
                .originateToApplicationAsync(Matchers.eq(callRequest.getPhone()),
                        Mockito.anyString(),
                        Mockito.anyString(),
                        anyLong(),
                        Mockito.any(MotechAsteriskCallBackImpl.class));

    }

    @Test (expected = CallInitiationException.class)
    public void testInitiateCallManagerException() throws Exception {

        CallRequest callRequest = new CallRequest("1001", Integer.MAX_VALUE, CALLBACK_URL);

        AsteriskServer asteriskServerMock = mock(AsteriskServer.class);
        Mockito.doThrow(new ManagerCommunicationException("", new Exception())).when(asteriskServerMock)
                .originateToApplicationAsync(
                        Matchers.eq(callRequest.getPhone()),
                        Mockito.anyString(),
                        Mockito.anyString(),
                        anyLong(),
                        Mockito.any(MotechAsteriskCallBackImpl.class));

        ivrService.setAsteriskServer(asteriskServerMock);

        ivrService.initiateCall(callRequest);

        Mockito.verify(asteriskServerMock, Mockito.times(1))
                .originateToApplicationAsync(Matchers.eq(callRequest.getPhone()),
                        Mockito.anyString(),
                        Mockito.anyString(),
                        anyLong(),
                        Mockito.any(MotechAsteriskCallBackImpl.class));

    }

@Test (expected = CallInitiationException.class)
    public void testInitiateCallChannelException() throws Exception {

        CallRequest callRequest = new CallRequest("0000", Integer.MAX_VALUE, CALLBACK_URL);

        AsteriskServer asteriskServerMock = mock(AsteriskServer.class);
        Mockito.doThrow(new NoSuchChannelException("no channel")).when(asteriskServerMock)
                .originateToApplicationAsync(
                        Matchers.eq(callRequest.getPhone()),
                        Mockito.anyString(),
                        Mockito.anyString(),
                        anyLong(),
                        Mockito.any(MotechAsteriskCallBackImpl.class));

        ivrService.setAsteriskServer(asteriskServerMock);

        ivrService.initiateCall(callRequest);

        Mockito.verify(asteriskServerMock, Mockito.times(1))
                .originateToApplicationAsync(Matchers.eq(callRequest.getPhone()),
                        Mockito.anyString(),
                        Mockito.anyString(),
                        anyLong(),
                        Mockito.any(MotechAsteriskCallBackImpl.class));

    }


    @Test(expected = IllegalArgumentException.class)
    public void testInitiateCallNullCallData() throws Exception {

        AsteriskServer asteriskServerMock = mock(AsteriskServer.class);
        ivrService.setAsteriskServer(asteriskServerMock);

         ivrService.initiateCall(null);

     }

    @Test
    public void testConstructorWithPort() throws Exception {

        String asteriskServerHost = "host";
        int asteriskServerPort=99;
        String asteriskUserName="user";
        String asteriskUserPassword="password";

        IVRServiceAsteriskImpl ivrServiceAsterisk =
                new IVRServiceAsteriskImpl(asteriskServerHost, asteriskServerPort, asteriskUserName, asteriskUserPassword);

        AsteriskServer asteriskServer = ivrService.getAsteriskServer();

        assertNotNull(asteriskServer);

     }


}
