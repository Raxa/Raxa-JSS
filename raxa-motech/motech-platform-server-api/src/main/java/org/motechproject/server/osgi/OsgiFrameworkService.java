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

import org.apache.commons.lang.StringUtils;
import org.osgi.framework.Bundle;
import org.osgi.framework.BundleContext;
import org.osgi.framework.launch.Framework;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.ServletContext;
import java.io.File;
import java.net.URL;
import java.util.*;

/**
 * 
 * @author Ricky Wang
 */
public class OsgiFrameworkService implements ApplicationContextAware {

    private static Logger logger = LoggerFactory.getLogger(OsgiFrameworkService.class);

    private ApplicationContext applicationContext;

    private String internalBundleFolder;

    private String externalBundleFolder;

	@Autowired
    private Framework osgiFramework;

    private List<BundleLoader> bundleLoaders;
    
    private Map<String, ClassLoader> bundleClassLoaderLookup = new HashMap<String, ClassLoader>();

	public static final String BUNDLE_ACTIVATOR_HEADER = "Bundle-Activator";

    /**
     * Initialize and start the OSGi framework
     */
    public void start() {
        try {
            ServletContext servletContext = ((WebApplicationContext) applicationContext).getServletContext();

            osgiFramework.init();

            BundleContext bundleContext = osgiFramework.getBundleContext();

            // This is mandatory for Felix http servlet bridge
            servletContext.setAttribute(BundleContext.class.getName(), bundleContext);

            // install bundles
            ArrayList<Bundle> bundles = new ArrayList<Bundle>();
            for (URL url : findBundles(servletContext)) {
                logger.debug("Installing bundle [" + url + "]");
                Bundle bundle = bundleContext.installBundle(url.toExternalForm());
                bundles.add(bundle);
                storeClassCloader(bundle);
            }

            for (Bundle bundle : bundles) {
                // custom bundle loaders
                if (bundleLoaders != null) {
                    for (BundleLoader loader : bundleLoaders) {
                        loader.loadBundle(bundle);
                    }
                }
                bundle.start();
            }

            osgiFramework.start();
            logger.info("OSGi framework started");
        } catch (Throwable e) {
            logger.error("Failed to start OSGi framework", e);
            throw new RuntimeException(e);
        }
    }

    /**
     * Stop the OSGi framework.
     */
    public void stop() {
        try {
            if (osgiFramework != null) {
                osgiFramework.stop();
                logger.info("OSGi framework stopped");
            }
        } catch (Throwable e) {
            logger.error("Error stopping OSGi framework", e);
            throw new RuntimeException(e);
        }
    }
    
    /**
     * The current OSGi (4.2) doesn't provide a standard way to retrieve the bundle ClassLoader.
     * So we have to use this as a workaround. 
     * 
     * @param bundleSymbolicName
     * @return The ClassLoader of the bundle
     */
    public ClassLoader getClassLoaderBySymbolicName(String bundleSymbolicName){
        return bundleClassLoaderLookup.get(bundleSymbolicName);
    }
    
    /**
     * 
     * @return
     */
    public Map<String, ClassLoader> getBundleClassLoaderLookup() {
		return bundleClassLoaderLookup;
	}    
    
    /**
     * @param bundle
     * @throws Exception
     */
    private void storeClassCloader(Bundle bundle) throws Exception {
        String key = bundle.getSymbolicName();
        String activator = (String)bundle.getHeaders().get(BUNDLE_ACTIVATOR_HEADER);
        if (activator != null) {
            @SuppressWarnings("rawtypes")
            Class activatorClass = bundle.loadClass(activator);
            if (activatorClass != null) {
                bundleClassLoaderLookup.put(key, activatorClass.getClassLoader());
            }
        }
    }

    private List<URL> findBundles(ServletContext servletContext) throws Exception {
    	List<URL> list = findInternalBundles(servletContext);
    	list.addAll(findExternalBundles());
    	return list;
    }
    
    /**
     * Find built-in/mandatory bundles
     * 
     * @param servletContext
     * @return
     * @throws Exception
     */
    private List<URL> findInternalBundles(ServletContext servletContext) throws Exception {
        List<URL> list = new ArrayList<URL>();
        if (StringUtils.isNotBlank(internalBundleFolder)) {
	        @SuppressWarnings("unchecked")
	        Set<String> paths = servletContext.getResourcePaths(internalBundleFolder);
	        if (paths != null) {
	            for (String path : paths) {
	                if (path.endsWith(".jar")) {
	                    URL url = servletContext.getResource(path);
	                    if (url != null) {
	                        list.add(url);
	                    }
	                }
	            }
	        }
        }
        return list;
    }
    
    /**
     * Find external/optional bundles
     * 
     * @return
     * @throws Exception
     */
    private List<URL> findExternalBundles() throws Exception {
    	List<URL> list = new ArrayList<URL>();
    	if (StringUtils.isNotBlank(externalBundleFolder)) {
	    	File folder = new File(externalBundleFolder);
	    	
			if (!folder.exists()) {
				folder.mkdirs();
			}
			
	    	File[] files = folder.listFiles();
			for (File file : files) {
				if (file.getAbsolutePath().endsWith(".jar")) {
					URL url = file.toURI().toURL();
					if (url != null) {
						list.add(url);
					}
				}
			}
    	}
    	return list;
    }

    @Override
    public void setApplicationContext(ApplicationContext ctx) throws BeansException {
        applicationContext = ctx;
    }

    public void setInternalBundleFolder(String bundleFolder) {
        this.internalBundleFolder = bundleFolder;
    }

    public void setExternalBundleFolder(String externalBundleFolder) {
		this.externalBundleFolder = externalBundleFolder;
	}

    public void setOsgiFramework(Framework osgiFramework) {
        this.osgiFramework = osgiFramework;
    }

    public void setBundleLoaders(List<BundleLoader> bundleLoaders) {
        this.bundleLoaders = bundleLoaders;
    }

}