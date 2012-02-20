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
package org.motechproject.server.decisiontree;

import org.motechproject.context.Context;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.osgi.service.http.HttpService;
import org.osgi.util.tracker.ServiceTracker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.DispatcherServlet;

/**
 * 
 * @author Igor (iopushnyev@2paths.com)
 * 
 */
public class Activator implements BundleActivator {
	private static Logger logger = LoggerFactory.getLogger(Activator.class);
	private static final String CONTEXT_CONFIG_LOCATION = "applicationDecisionTree.xml";
	private static final String SERVLET_URL_MAPPING = "/tree";
	private ServiceTracker tracker;


	@Override
	public void start(BundleContext context) throws Exception {
		this.tracker = new ServiceTracker(context,
				HttpService.class.getName(), null) {
			
			@Override
			public Object addingService(ServiceReference ref) {
				Object service = super.addingService(ref);
				serviceAdded((HttpService) service);
				return service;
			}

			@Override
			public void removedService(ServiceReference ref, Object service) {
				serviceRemoved((HttpService) service);
				super.removedService(ref, service);
			}
		};
		this.tracker.open();
	}

	public void stop(BundleContext context) throws Exception {
		this.tracker.close();
	}

	private void serviceAdded(HttpService service) {
		try {
			DispatcherServlet dispatcherServlet = new DispatcherServlet();
			dispatcherServlet.setContextConfigLocation(CONTEXT_CONFIG_LOCATION);
			ClassLoader old = Thread.currentThread().getContextClassLoader();
			try {
				Thread.currentThread().setContextClassLoader(getClass().getClassLoader());
				service.registerServlet(SERVLET_URL_MAPPING, dispatcherServlet, null, null);
				logger.debug("Servlet registered");
			} finally {
				Thread.currentThread().setContextClassLoader(old);
			}

            // I need to access Context so maven-bundle-plugin lists it in my manifest.
            // If I don't actually need to reference it then this access should be removed and we should
            // explicitly list the dependency in the bundle plugin config
            Context context = Context.getInstance();
            logger.info("Using Context: " + context.toString());

        } catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	private void serviceRemoved(HttpService service) {
		service.unregister(SERVLET_URL_MAPPING);
		logger.debug("Servlet unregistered");
	}
}
