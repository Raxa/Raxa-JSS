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
package org.motechproject.server.ruleengine;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.motechproject.server.osgi.OsgiFrameworkService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Load rule files from the file system
 * 
 * @author Ricky Wang
 */
public class FilesystemRuleLoader {

    private static Logger logger = LoggerFactory.getLogger(FilesystemRuleLoader.class);

    private String internalRuleFolder;

    private String externalRuleFolder;

	@Autowired
    private KnowledgeBaseManager knowledgeBaseManager;
    
    @Autowired
    private OsgiFrameworkService osgiFrameworkService;

    /**
     * Load rule files from the internal and external rule folders
     * @throws Exception
     */
	public void load() throws Exception {
    	List<File> ruleFiles = new ArrayList<File>();
    	if (internalRuleFolder != null) {
    		File[] internalRuleFiles = new File(URLDecoder.decode(getClass().getResource(internalRuleFolder).getFile(), "UTF-8")).listFiles();
    		ruleFiles.addAll(Arrays.asList(internalRuleFiles));
		}

        if (externalRuleFolder != null) {
        	File folder  = new File(externalRuleFolder);
			if (!folder.exists()) {
				folder.mkdirs();
			} else {
				File[] externalRuleFiles = folder.listFiles();
	        	ruleFiles.addAll(Arrays.asList(externalRuleFiles));
			}
		}
        
        Map<String, ClassLoader> bundleClassLoaderLookup = osgiFrameworkService.getBundleClassLoaderLookup();
        List<ClassLoader> classLoaders = new ArrayList<ClassLoader>();
        classLoaders.add(Thread.currentThread().getContextClassLoader());
        classLoaders.addAll(bundleClassLoaderLookup.values());
        
        for (File file : ruleFiles) {
            if (file.getName().toLowerCase().endsWith(".drl")) {
                try {
                    knowledgeBaseManager.addOrUpdateRule(file, classLoaders.toArray(new ClassLoader[classLoaders.size()]));
                } catch (IOException e) {
                    logger.error("Failed to load the rule file [" + file.getName() + "]", e);
                    throw new RuntimeException(e);
                }
            }
        }
    }

    public void setInternalRuleFolder(String ruleFolder) {
        this.internalRuleFolder = ruleFolder;
    }

    public void setExternalRuleFolder(String externalRuleFolder) {
    	this.externalRuleFolder = externalRuleFolder;
    }

    public void setKnowledgeBaseManager(KnowledgeBaseManager knowledgeBaseManager) {
        this.knowledgeBaseManager = knowledgeBaseManager;
    }
    
    public void setOsgiFrameworkService(OsgiFrameworkService osgiFrameworkService) {
    	this.osgiFrameworkService = osgiFrameworkService;
    }
}
