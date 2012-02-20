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

import static org.junit.Assert.assertEquals;
import static org.mockito.Matchers.any;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;

import org.junit.Test;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;
import org.motechproject.server.ruleengine.KnowledgeBaseManager;
import org.osgi.framework.Bundle;


public class RuleBundleLoaderTest {

    @Test
    public void loadBundleTest() throws Exception {
        String ruleFolder = "/rules";
        String ruleFile = "test.drl";
        String bundleSymbolicName ="test.bundle";
        RuleBundleLoader loader = new RuleBundleLoader();

        ArrayList<URL> urls = new ArrayList<URL>();
        urls.add(this.getClass().getResource(ruleFolder + "/" + ruleFile));
        Bundle bundle = mock(Bundle.class);
        when(bundle.findEntries(ruleFolder, "*", false)).thenReturn(Collections.enumeration(urls));
        when(bundle.getSymbolicName()).thenReturn(bundleSymbolicName);
        
        KnowledgeBaseManager kbm = mock(KnowledgeBaseManager.class);

        doAnswer(new Answer() {
            public Object answer(InvocationOnMock invocation) {
                Object[] args = invocation.getArguments();
                System.out.println("test");
                BufferedReader br = new BufferedReader(new InputStreamReader((InputStream)args[2]));
                try {
                    assertEquals(br.readLine(), "//test");
                } catch (IOException e) {
                }
                return null;
            }})
        .when(kbm).addOrUpdateRule(eq(ruleFile), eq(bundleSymbolicName), any(InputStream.class));

        loader.setKnowledgeBaseManager(kbm);
        loader.loadBundle(bundle);
    }
}
