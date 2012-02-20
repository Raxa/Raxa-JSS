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

import java.io.InputStream;
import java.net.URL;
import java.net.URLConnection;
import java.util.Enumeration;

import org.apache.commons.io.FilenameUtils;
import org.motechproject.server.ruleengine.KnowledgeBaseManager;
import org.osgi.framework.Bundle;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Custom log4j configuration loader
 * 
 * Merge bundle specific configurations to the existing if a bundle contains
 * log4j.xml
 * 
 * @author Ricky Wang
 */
public class RuleBundleLoader implements BundleLoader {

    // default rule folder
    private String ruleFolder = "/rules";
    
    @Autowired
    private KnowledgeBaseManager knowledgeBaseManager;

    @SuppressWarnings("unchecked")
    @Override
    public void loadBundle(Bundle bundle) throws Exception {
        Enumeration<URL> e = bundle.findEntries(ruleFolder, "*", false);
        String symbolicName = bundle.getSymbolicName();
        if (e != null) {
            while(e.hasMoreElements()){
                URL url = e.nextElement();
                URLConnection conn = url.openConnection();
                InputStream inputStream = conn.getInputStream();
                knowledgeBaseManager.addOrUpdateRule(FilenameUtils.getName(url.getFile()), symbolicName, inputStream);
                inputStream.close();
            }
        }
    }

    public void setRuleFolder(String ruleFolder) {
        this.ruleFolder = ruleFolder;
    }

    public void setKnowledgeBaseManager(KnowledgeBaseManager knowledgeBaseManager) {
        this.knowledgeBaseManager = knowledgeBaseManager;
    }
    
}
