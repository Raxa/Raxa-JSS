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
package org.motechproject.server.osgi;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.osgi.framework.Bundle;
import org.osgi.framework.launch.Framework;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.mock.web.MockServletContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.GenericWebApplicationContext;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/testPlatformServerApplicationContext.xml"})
public class OsgiFrameworkServiceTest {

    @Autowired
    private OsgiFrameworkService service;

    @Autowired
    private Framework framework;

    @Autowired
    private ApplicationContext applicationContext;

    @Test
    @Ignore
    public void startStopTest() throws Exception {
        service.setApplicationContext(getWebApplicationContext());

        assertEquals(Bundle.INSTALLED, framework.getState());

        service.start();
        assertEquals(Bundle.ACTIVE, framework.getState());

        // expect framework bundle + fake bundle
        Bundle[] bundles = framework.getBundleContext().getBundles();
        assertTrue(bundles.length > 1);
        for (Bundle bundle : bundles) {
            assertEquals(Bundle.ACTIVE, bundle.getState());
        }

        assertNotNull(service.getClassLoaderBySymbolicName("org.apache.felix.http.bridge"));

        service.stop();
        assertEquals(Bundle.STOPPING, framework.getState());
    }

    private WebApplicationContext getWebApplicationContext() {
        GenericWebApplicationContext wac = BeanUtils.instantiateClass(GenericWebApplicationContext.class);
        wac.setParent(applicationContext);
        wac.setServletContext(new MockServletContext());
        return wac;
    }
}
