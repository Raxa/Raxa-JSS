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

import org.asteriskjava.live.AsteriskChannel;
import org.asteriskjava.live.Disposition;
import org.asteriskjava.live.LiveException;
import org.asteriskjava.live.OriginateCallback;
import org.motechproject.context.EventContext;
import org.motechproject.event.EventRelay;
import org.motechproject.ivr.event.IVREventDelegate;
import org.motechproject.ivr.model.CallDetailRecord;
import org.motechproject.model.MotechEvent;
import org.motechproject.ivr.service.CallRequest;

import java.util.Map;

/**
 *  Motech specific implementation of the Asterisk-Java call-back interface
 *   see org.asteriskjava.live.OriginateCallback.java for details
 *
 */
public class MotechAsteriskCallBackImpl implements OriginateCallback {

    private EventRelay eventRelay = EventContext.getInstance().getEventRelay();

    private CallRequest callRequest;

    public MotechAsteriskCallBackImpl(CallRequest callRequest) {
        this.callRequest = callRequest;
    }

    @Override
    public void onDialing(AsteriskChannel asteriskChannel) {}

    @Override
    public void onSuccess(AsteriskChannel asteriskChannel) {
        MotechEvent event = callRequest.getOnSuccessEvent();

        if (event != null) {
            org.asteriskjava.live.CallDetailRecord aCDR = asteriskChannel.getCallDetailRecord();
            CallDetailRecord cdr = new CallDetailRecord(aCDR.getStartDate(), aCDR.getEndDate(), aCDR.getAnswerDate(),
                                                        translateDisposition(aCDR.getDisposition()), aCDR.getDuration());

            Map<String, Object> parameters = event.getParameters();
            parameters.put(IVREventDelegate.CALL_DETAIL_RECORD_KEY, cdr);

            eventRelay.sendEventMessage(event);
        }
    }

    @Override
    public void onNoAnswer(AsteriskChannel asteriskChannel) {
        MotechEvent event = callRequest.getOnNoAnswerEvent();

        if (event != null) {
            org.asteriskjava.live.CallDetailRecord aCDR = asteriskChannel.getCallDetailRecord();
            CallDetailRecord cdr = new CallDetailRecord(aCDR.getStartDate(), aCDR.getEndDate(), aCDR.getAnswerDate(),
                                                    translateDisposition(aCDR.getDisposition()), aCDR.getDuration());

            eventRelay.sendEventMessage(event);
        }

    }

    @Override
    public void onBusy(AsteriskChannel asteriskChannel) {
        MotechEvent event = callRequest.getOnBusyEvent();

        if (event != null) {
            org.asteriskjava.live.CallDetailRecord aCDR = asteriskChannel.getCallDetailRecord();
            CallDetailRecord cdr = new CallDetailRecord(aCDR.getStartDate(), aCDR.getEndDate(), aCDR.getAnswerDate(),
                                                    translateDisposition(aCDR.getDisposition()), aCDR.getDuration());

            eventRelay.sendEventMessage(event);
        }

    }

    @Override
    public void onFailure(LiveException e) {
        MotechEvent event = callRequest.getOnFailureEvent();

        if (event != null) {
            CallDetailRecord cdr = new CallDetailRecord(CallDetailRecord.Disposition.FAILED, e.getMessage());

            eventRelay.sendEventMessage(event);
        }

    }

    private CallDetailRecord.Disposition translateDisposition(Disposition disposition) {
        CallDetailRecord.Disposition ret = CallDetailRecord.Disposition.UNKNOWN;

        if (disposition == Disposition.BUSY) {
            ret = CallDetailRecord.Disposition.BUSY;
        }

        if (disposition == Disposition.ANSWERED) {
            ret = CallDetailRecord.Disposition.ANSWERED;
        }

        if (disposition == Disposition.NO_ANSWER) {
            ret = CallDetailRecord.Disposition.NO_ANSWER;
        }

        if (disposition == Disposition.FAILED) {
            ret = CallDetailRecord.Disposition.FAILED;
        }

        return ret;
    }
}
