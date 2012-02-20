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
package org.motechproject.ivr;

import org.junit.Test;
import org.motechproject.ivr.service.CallRequest;

import static org.junit.Assert.assertEquals;

/**
 *
 */
public class TestInitiateCallData {

    private static final String CALLBACK_URL = "http://10.0.1.29:8080/m/module/ar/vxml/ar?r=1";

	@Test
    public void TestConstructor() {
        String phone = "1001";
        int timeOut = Integer.MAX_VALUE;

        CallRequest callRequest = new CallRequest(phone, timeOut, CALLBACK_URL);

        assertEquals(phone, callRequest.getPhone());
    }

    @Test(expected = IllegalArgumentException.class)
    public void TestConstructorNullPhone() {
        String phone = null;
        int timeOut = Integer.MAX_VALUE;

        CallRequest callRequest = new CallRequest(phone, timeOut, CALLBACK_URL);
    }
    @Test(expected = IllegalArgumentException.class)
	public void TestConstructorNullVxmlUrl() {
	    String phone = "1001";
	    CallRequest callRequest = new CallRequest(phone, Integer.MAX_VALUE, null);
	 }
}
