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

import org.junit.Test;
import org.motechproject.model.MotechEvent;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static org.junit.Assert.*;

/**
 * Created by IntelliJ IDEA.
 * User: rob
 * Date: 2/28/11
 * Time: 10:35 AM
 * To change this template use File | Settings | File Templates.
 */
public class TestMotechScheduledEvent {
    private String uuidStr = UUID.randomUUID().toString();
    private String uuidStr2 = UUID.randomUUID().toString();

    @Test(expected = IllegalArgumentException.class)
    public void newTest() throws Exception{
        MotechEvent motechEvent;
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("JobID", uuidStr);
        motechEvent = new MotechEvent(null, params);
    }

    @Test
    public void testGetParameters() {
        MotechEvent motechEvent = new MotechEvent("testEvent", null);
        Map<String, Object> params = motechEvent.getParameters();

        assertNotNull("Expecting param object", params);

        HashMap hashMap = new HashMap();
        hashMap.put("One", new Integer(1));

        MotechEvent nonNullParams = new MotechEvent("testEvent", hashMap);
        params = nonNullParams.getParameters();

        assertTrue(params.equals(hashMap));
//        assertFalse(params == hashMap);  // not wrapped collection anymore.
    }

    @Test
    public void equalsTest() throws Exception{
        MotechEvent motechEvent = new MotechEvent("testEvent", null);
        MotechEvent motechEventSame = new MotechEvent("testEvent", null);
        MotechEvent motechEventDifferentJobId = new MotechEvent("testEvent", null);
        MotechEvent scheduledEventDifferentEventType = new MotechEvent("testEvent2", null);

        HashMap hashMap = new HashMap();
        hashMap.put("One", new Integer(1));

        MotechEvent nonNullParams = new MotechEvent("testEvent", hashMap);
        MotechEvent nonNullParams2 = new MotechEvent("testEvent", hashMap);

        assertTrue(motechEvent.equals(motechEvent));
        assertTrue(motechEvent.equals(motechEventSame));
        assertTrue(nonNullParams.equals(nonNullParams2));

        assertFalse(motechEvent.equals(null));
        assertFalse(motechEvent.equals(uuidStr));
        assertFalse(motechEvent.equals(scheduledEventDifferentEventType));

        assertFalse(motechEvent.equals(nonNullParams));
        assertFalse(nonNullParams.equals(motechEvent));
    }
}
