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

/**
 * Schedulable Job - a data carrier class for a scheduled job that can be fired set number of times
 *
 */
public class RepeatingSchedulableJob implements Serializable {

    private static final long serialVersionUID = 1L;

    private MotechEvent motechEvent;
	private Date startTime;
    private Date endTime;
    private Integer repeatCount;
    private long repeatInterval;

    public RepeatingSchedulableJob(MotechEvent motechEvent,
                                   Date startTime, Date endTime,
                                   Integer repeatCount, long repeatInterval) {
        this.motechEvent = motechEvent;
		this.startTime = startTime;
		this.endTime = endTime;
        this.repeatCount = repeatCount;
        this.repeatInterval = repeatInterval;
    }

    public RepeatingSchedulableJob(MotechEvent motechEvent,
                                   Date startTime, Date endTime,
                                   long repeatInterval) {
        this.motechEvent = motechEvent;
		this.startTime = startTime;
		this.endTime = endTime;
        this.repeatCount = null;
        this.repeatInterval = repeatInterval;
    }

    public MotechEvent getMotechEvent()
    {
        return motechEvent;
    }

    public void setMotechEvent(MotechEvent motechEvent)
    {
        this.motechEvent = motechEvent;
    }

    public Date getStartTime()
    {
        return startTime;
    }

    public void setStartTime(Date startTime)
    {
        this.startTime = startTime;
    }

    public Date getEndTime()
    {
        return endTime;
    }

    public void setEndTime(Date endTime)
    {
        this.endTime = endTime;
    }

    public Integer getRepeatCount()
    {
        return repeatCount;
    }

    public void setRepeatCount(int repeatCount)
    {
        this.repeatCount = repeatCount;
    }

    public long getRepeatInterval()
    {
        return repeatInterval;
    }

    public void setRepeatInterval(long repeatInterval)
    {
        this.repeatInterval = repeatInterval;
    }

	@Override
	public String toString() {
		return "RepeatingSchedulableJob [motechEvent=" + motechEvent
				+ ", startTime=" + startTime + ", endTime=" + endTime
				+ ", repeatCount=" + repeatCount + ", repeatInterval="
				+ repeatInterval + "]";
	}
    
}
