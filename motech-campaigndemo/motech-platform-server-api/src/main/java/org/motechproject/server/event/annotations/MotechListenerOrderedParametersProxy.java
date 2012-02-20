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

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.motechproject.model.MotechEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.ReflectionUtils;

/**
 * Dispatches ordered parameters MotechEvent {"0":Obj0, "1":Obj1, .... "n":ObjN} to appropriate method signature at runtime
 * NOTE: It might be better append the method signature to the end of the subjects 
 * @author yyonkov
 *
 */
public class MotechListenerOrderedParametersProxy extends MotechListenerAbstractProxy {
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	public MotechListenerOrderedParametersProxy(String name, Object bean, Method method) {
		super(name, bean, method);
	}

	/* (non-Javadoc)
	 * @see org.motechproject.server.event.annotations.MotechListenerAbstractProxy#callHandler(org.motechproject.model.MotechEvent)
	 */
	@Override
	public void callHandler(MotechEvent event) {
		Map<String, Object> params = event.getParameters();
		List<Object> args = new ArrayList<Object>();
		int i = 0;
		for(Class<?> t : method.getParameterTypes()) {
			Object param = params.get(Integer.toString(i));
			if( param!=null && t.isAssignableFrom(param.getClass())) {
				args.add(param);
				i++;
			} else if ( params.containsKey(Integer.toString(i)) && !t.isPrimitive() && param==null) {
				args.add(param);
				i++;				
			} else {
				logger.warn(String.format("Method: %s parameter: #%d of type: %s is not available in the event: %s. Handler skiped...", method.toGenericString(), i, t.getName(), event));
				return;
			}
		}
		ReflectionUtils.invokeMethod(method,bean,args.toArray());
	}
}
