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

import org.apache.commons.codec.EncoderException;
import org.apache.commons.codec.net.URLCodec;
import org.asteriskjava.live.AsteriskServer;
import org.asteriskjava.live.DefaultAsteriskServer;
import org.asteriskjava.live.ManagerCommunicationException;
import org.asteriskjava.live.NoSuchChannelException;
import org.asteriskjava.live.OriginateCallback;
import org.motechproject.ivr.model.CallInitiationException;
import org.motechproject.ivr.service.CallRequest;
import org.motechproject.ivr.service.IVRService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Asterisk specific implementation of the IVR Service interface
 *
 * Date: 07/03/11
 *
 */
public class IVRServiceAsteriskImpl implements IVRService
{
	public static final String VXML_URL = "vxml.url";
	public static final String VXML_TIMEOUT = "vxml.timeout";

    private final String asteriskApplication = "Agi";

    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final URLCodec urlCodec = new URLCodec();

    private AsteriskServer asteriskServer;
    private String agiUrl;
    private long timeout;
    private String vxmlBaseURL;


    public IVRServiceAsteriskImpl(String asteriskServerHost, String asteriskUserName, String asteriskUserPassword) {
        asteriskServer = new DefaultAsteriskServer(asteriskServerHost, asteriskUserName, asteriskUserPassword);
    }

    public IVRServiceAsteriskImpl(String asteriskServerHost, int asteriskServerPort, String asteriskUserName, String asteriskUserPassword) {
        asteriskServer = new DefaultAsteriskServer(asteriskServerHost, asteriskServerPort, asteriskUserName, asteriskUserPassword);
    }

    @Override
    public void initiateCall(CallRequest callRequest)
    {

        if (callRequest == null) {
            throw new IllegalArgumentException("CallRequest can not be null");
        }

        OriginateCallback asteriskCallBack = new MotechAsteriskCallBackImpl(callRequest);
        try {

            String destinationPhone = callRequest.getPhone();

            String encodedVxmlUrl;
            try {
                encodedVxmlUrl = urlCodec.encode(getVxmlUrl());
            } catch (EncoderException e) {
                String errorMessage = "Invalid Voice XML URL: " + getVxmlUrl();
                log.error(errorMessage);
                throw new IllegalArgumentException(errorMessage);
            }

            String data = agiUrl + encodedVxmlUrl;

            log.info("Initiating call to: " + destinationPhone + " VXML URL: " + data);

            asteriskServer.originateToApplicationAsync(destinationPhone, asteriskApplication,
                                                       data, getTimeOut(), asteriskCallBack);
        } catch (ManagerCommunicationException e) {
            String errorMessage = "Can not initiate call: " + e.getMessage();
            throw new CallInitiationException(errorMessage, e);
        } catch (NoSuchChannelException e) {
            String errorMessage = "Can not initiate call: " + e.getMessage();
            throw new CallInitiationException(errorMessage, e); //TODO - check what actually causes that exception
        }
    }

    private String getVxmlUrl() {
    	//TODO: construct the vxml url.
    	return vxmlBaseURL;
	}

	private long getTimeOut() {
    	return timeout;
	}

	public void setAgiUrl(String agiUrl) {
        this.agiUrl = agiUrl;
    }

    /**
     * This method is for Unit Test support only
     */
     void setAsteriskServer(AsteriskServer asteriskServer) {
        this.asteriskServer = asteriskServer;
    }

    AsteriskServer getAsteriskServer() {
        return asteriskServer;
    }

	public void setTimeout(long timeout) {
		this.timeout = timeout;
	}

	public void setVxmlBaseURL(String vxmlBaseURL) {
		this.vxmlBaseURL = vxmlBaseURL;
	}
}
