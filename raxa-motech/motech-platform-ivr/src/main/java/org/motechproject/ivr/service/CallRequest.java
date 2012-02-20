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
package org.motechproject.ivr.service;

import org.codehaus.jackson.annotate.JsonProperty;
import org.motechproject.model.MotechEvent;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

/**
 * This class is used to request a call from the IVR system
 *
 * To receive events related to this call provide this class with the events to raise when the following
 * events within the IVR system happen.  The supplied event will be augmented with {@link org.motechproject.ivr.model.CallDetailRecord}
 * if one is available
 *
 * onSuccessEvent - Following the successful completion of the call
 * onBusyEvent - If the IVR system is unable to place the call because the line is busy
 * onNoAnswerEvent - If the IVR system is unable to complete the call because of no answer
 * onFailureEvent - It failed.  I'm sorry for you.  Why?  Not sure. Your guess is as good as mine,
 */
public class CallRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	@JsonProperty
    private String phone;
	@JsonProperty
    private int timeOut;
	@JsonProperty
    private String callBackUrl;
    
	@JsonProperty
    private Map<String, String> payload = new HashMap<String, String>();

	@JsonProperty
    private MotechEvent onSuccessEvent;
	@JsonProperty
    private MotechEvent onBusyEvent;
	@JsonProperty
    private MotechEvent onNoAnswerEvent;
	@JsonProperty
    private MotechEvent onFailureEvent;

    /**
     * Generate a call request for the IVR system
     *
     * @param phone
     * @param callBackUrl
     */
    public CallRequest(String phone, int timeOut, String callBackUrl) {
        if (phone == null) {
            throw new IllegalArgumentException("phone can not be null");
        }

        if (callBackUrl == null) {
        	throw new IllegalArgumentException("callBackUrl can not be null");
        }

        this.phone = phone;
        this.timeOut = timeOut;
        this.callBackUrl = callBackUrl;
    }

    public CallRequest(String phone, Map<String, String> params, String callBackUrl) {
        if (phone == null) {
            throw new IllegalArgumentException("phone can not be null");
        }
        if (callBackUrl == null) {
        	throw new IllegalArgumentException("callBackUrl can not be null");
        }

        this.phone = phone;
        this.timeOut = 0;

        if (params != null)
        	this.payload.putAll(params);

        this.callBackUrl = callBackUrl;
    }

    public CallRequest() {}

    public String getPhone() {
        return phone;
    }

    public MotechEvent getOnSuccessEvent()
    {
        return onSuccessEvent;
    }

    public void setOnSuccessEvent(MotechEvent onSuccessEvent)
    {
        this.onSuccessEvent = onSuccessEvent;
    }

    public MotechEvent getOnBusyEvent()
    {
        return onBusyEvent;
    }

    public void setOnBusyEvent(MotechEvent onBusyEvent)
    {
        this.onBusyEvent = onBusyEvent;
    }

    public MotechEvent getOnNoAnswerEvent()
    {
        return onNoAnswerEvent;
    }

    public void setOnNoAnswerEvent(MotechEvent onNoAnswerEvent)
    {
        this.onNoAnswerEvent = onNoAnswerEvent;
    }

    public MotechEvent getOnFailureEvent()
    {
        return onFailureEvent;
    }

    public void setOnFailureEvent(MotechEvent onFailureEvent)
    {
        this.onFailureEvent = onFailureEvent;
    }

	public Map<String, String> getPayload() {
		return payload;
	}

	public void setPayload(Map<String, String> payload) {
		this.payload = payload;
	}

    public String getCallBackUrl() {
		return callBackUrl;
	}

    public int getTimeOut()
    {
        return timeOut;
    }

    public void setTimeOut(int timeOut)
    {
        this.timeOut = timeOut;
    }
}