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
package org.motechproject.model;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Motech Scheduled Event data carrier class,
 * Instance of this class with event specific data will be send by Motech Scheduler when a scheduled event is fired
 * <p/>
 * This class is immutable
 *
 * @author Igor (iopushnyev@2paths.com)
 *         Date: 16/02/11
 */
public final class MotechEvent implements Serializable {

    private static final long serialVersionUID = 2L;

    public static final String EVENT_TYPE_KEY_NAME = "eventType";

    private String subject;
    private Map<String, Object> parameters;
    private Date endTime;
    private boolean isLastEvent;

    /**
     * Constructor with subject only (parameters can be added interactively)
     * @param subject - event destination
     * @throws IllegalArgumentException
     */
    public MotechEvent(String subject) {
        if (subject == null) {
            throw new IllegalArgumentException("subject can not be null");
        }

        if (subject.indexOf("*") != -1) {
            throw new IllegalArgumentException("subject can not contain wildcard: " + subject);
        }

        if (subject.indexOf("..") != -1) {
            throw new IllegalArgumentException("subject can not contain empty path segment: " + subject);
        }

        this.subject = subject;
    }

    /**
     * Constructor
     * @param subject    - event type: Pill Reminder, Appointment Reminder ...
     * @param parameters - a Map<String, Object> of additional parameters
     * @throws IllegalArgumentException
     */
    public MotechEvent(String subject, Map<String, Object> parameters) {
        this(subject);
        this.parameters = parameters;
    }

    public String getSubject() {
        return subject;
    }

    /**
     * Sets empty HashMap if parameters=null
     * @return
     */
    public Map<String, Object> getParameters() {
        return parameters != null ? parameters : (parameters = new HashMap<String, Object>());
    }

    public Date getEndTime() {
        return endTime;
    }

    public MotechEvent setEndTime(Date endDate) {
        this.endTime = endDate;
        return this;
    }

    public boolean isLastEvent() {
        return isLastEvent;
    }

    public MotechEvent setLastEvent(boolean lastEvent) {
        isLastEvent = lastEvent;
        return this;
    }

    public MotechEvent copy(String subject, Map<String, Object> parameters) {
        MotechEvent event = new MotechEvent(subject, parameters);
        event.setEndTime(clone(this.endTime));
        event.setLastEvent(isLastEvent());
        return event;
    }

    private Date clone(Date date) {
        return date != null ? (Date) date.clone() : null;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MotechEvent that = (MotechEvent) o;

        if (!subject.equals(that.subject)) return false;
        if (parameters != null ? !parameters.equals(that.parameters) : that.parameters != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = 31 * subject.hashCode();
        result = 31 * result + (parameters != null ? parameters.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "MotechEvent{" +
                "subject='" + subject + '\'' +
                ", parameters=" + parameters +
                '}';
    }
}
