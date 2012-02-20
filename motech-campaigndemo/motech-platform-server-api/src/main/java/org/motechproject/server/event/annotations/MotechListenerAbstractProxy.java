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
package org.motechproject.server.event.annotations;

import org.motechproject.MotechException;
import org.motechproject.model.MotechEvent;
import org.motechproject.server.event.EventListener;
import org.slf4j.LoggerFactory;

import java.lang.reflect.Method;

/**
 * Event Listener Proxy base abstract class
 * @author yyonkov
 *
 */
public abstract class MotechListenerAbstractProxy implements EventListener {
    
	protected final String name;
	protected final Object bean;
	protected final Method method;
	
	/**
	 * @param name
	 * @param bean
	 * @param method
	 */
	public MotechListenerAbstractProxy(String name, Object bean, Method method) {
		this.name = name;
		this.bean = bean;
		this.method = method;
	}

	/**
	 * Needs to be implemented by concrete Proxies
	 * @param event
	 * @return 
	 */
	public abstract void callHandler(MotechEvent event);
	
	/* (non-Javadoc)
	 * @see org.motechproject.server.event.EventListener#handle(org.motechproject.model.MotechEvent)
	 */
	@Override
	public void handle(MotechEvent event) {
		try {
			callHandler(event);
		} catch (Exception e) {
			LoggerFactory.getLogger(bean.getClass()).error(e.toString());
            throw new MotechException("Failed to handle event", e);
		}
	}
	/* (non-Javadoc)
	 * @see org.motechproject.server.event.EventListener#getIdentifier()
	 */
	@Override
	public String getIdentifier() {
		return this.name;
	}

}
