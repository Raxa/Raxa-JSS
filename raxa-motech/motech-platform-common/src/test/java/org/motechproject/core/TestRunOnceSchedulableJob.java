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
package org.motechproject.core;

import org.junit.Before;
import org.junit.Test;
import org.motechproject.model.MotechEvent;
import org.motechproject.model.RunOnceSchedulableJob;

import java.util.*;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

/**
 * Created by IntelliJ IDEA.
 * User: rob
 * Date: 3/1/11
 * Time: 1:07 PM
 * To change this template use File | Settings | File Templates.
 */
public class TestRunOnceSchedulableJob
{
    private String uuidStr = UUID.randomUUID().toString();
    private String uuidStr2 = UUID.randomUUID().toString();

    private MotechEvent motechEvent1;
    private MotechEvent motechEvent2;

    private Date currentDate;
    private Date yesterday;

    @Before
    public void setUp() {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("JobID", uuidStr);
        motechEvent1 = new MotechEvent("TestEvent", params);

        params = new HashMap<String, Object>();
        params.put("JobID", uuidStr2);
        motechEvent2 = new MotechEvent("TestEvent", params);

        Calendar cal = Calendar.getInstance();
        currentDate = cal.getTime();
        cal.add(Calendar.DATE, -1);
        yesterday = cal.getTime();
    }

    @Test(expected = IllegalArgumentException.class)
    public void newConstructor_NullEvent() throws Exception{
        new RunOnceSchedulableJob(null, currentDate);
    }

    @Test(expected = IllegalArgumentException.class)
    public void newConstructor_NullDate() throws Exception{
        new RunOnceSchedulableJob(motechEvent1, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void newConstructor_InvalidDate() throws Exception{
        new RunOnceSchedulableJob(motechEvent1, yesterday);
    }

    @Test
    public void equalsTest() throws Exception{
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, +1);
        Date date = cal.getTime();

        cal.add(Calendar.DATE, +1);
        Date date2 = cal.getTime();

        RunOnceSchedulableJob job1 = new RunOnceSchedulableJob(motechEvent1, date);
        RunOnceSchedulableJob job1Same = new RunOnceSchedulableJob(motechEvent1, date);
        RunOnceSchedulableJob job2 = new RunOnceSchedulableJob(motechEvent2, date);
        RunOnceSchedulableJob job3 = new RunOnceSchedulableJob(motechEvent1, date2);

        assertTrue(job1.equals(job1));
        assertTrue(job1.equals(job1Same));

        assertFalse(job1.equals(null));
        assertFalse(job1.equals(motechEvent1));

        // Same date, different event
        assertFalse(job1.equals(job2));

        // Same event different date
        assertFalse(job1.equals(job3));
    }
}
