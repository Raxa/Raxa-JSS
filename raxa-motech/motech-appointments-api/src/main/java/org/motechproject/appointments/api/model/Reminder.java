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
package org.motechproject.appointments.api.model;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.ektorp.support.TypeDiscriminator;
import org.motechproject.model.MotechBaseDataObject;

import java.util.Date;

@TypeDiscriminator("doc.type === 'Reminder'")
public class Reminder extends MotechBaseDataObject
{
    public enum intervalUnits {SECONDS, MINUTES, HOURS, DAYS, WEEKS};

    private String appointmentId;
    private String externalId;
    private boolean enabled = true;
    private Date startDate;
    private Date endDate;
    private int intervalCount;
    private intervalUnits units;
    private int repeatCount;
    private String jobId;

    public String getAppointmentId()
    {
        return appointmentId;
    }

    public void setAppointmentId(String appointmentId)
    {
        this.appointmentId = appointmentId;
    }

    public String getExternalId()
    {
        return externalId;
    }

    public void setExternalId(String externalId)
    {
        this.externalId = externalId;
    }

    public boolean getEnabled()
    {
        return enabled;
    }

    public void setEnabled(boolean enabled)
    {
        this.enabled = enabled;
    }

    public Date getStartDate()
    {
        return startDate;
    }

    public void setStartDate(Date startDate)
    {
        this.startDate = startDate;
    }

    public Date getEndDate()
    {
        return endDate;
    }

    public void setEndDate(Date endDate)
    {
        this.endDate = endDate;
    }

    public int getIntervalCount()
    {
        return intervalCount;
    }

    public void setIntervalCount(int intervalCount)
    {
        this.intervalCount = intervalCount;
    }

    public intervalUnits getUnits()
    {
        return units;
    }

    public void setUnits(intervalUnits units)
    {
        this.units = units;
    }

    public int getRepeatCount()
    {
        return repeatCount;
    }

    public void setRepeatCount(int repeatCount)
    {
        this.repeatCount = repeatCount;
    }

    public String getJobId()
    {
        return jobId;
    }

    public void setJobId(String jobId)
    {
        this.jobId = jobId;
    }

    @JsonIgnore
    public long getIntervalSeconds() {
        long ret = -1;

        if (intervalUnits.SECONDS == units) {
            ret = intervalCount;
        }

        if (intervalUnits.MINUTES == units) {
            ret = (intervalCount * 60);
        }

        if (intervalUnits.HOURS == units) {
            ret = (intervalCount * 60 * 60);
        }

        if (intervalUnits.DAYS == units) {
            ret = (intervalCount * 60 * 60 * 24);
        }

        if (intervalUnits.WEEKS == units) {
            ret = (intervalCount * 60 * 60 * 24 * 7);
        }

        return ret;
    }
}