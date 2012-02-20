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

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.motechproject.model.MotechEvent;
import org.springframework.util.Assert;
import org.springframework.util.ReflectionUtils;

/**
 * @author yyonkov
 *
 */
public class MotechListenerNamedParametersProxy extends MotechListenerAbstractProxy {

	/**
	 * @param name
	 * @param bean
	 * @param method
	 */
	public MotechListenerNamedParametersProxy(String name, Object bean, Method method) {
		super(name, bean, method);
	}

	/* (non-Javadoc)
	 * @see org.motechproject.server.event.annotations.MotechListenerAbstractProxy#callHandler(org.motechproject.model.MotechEvent)
	 */
	@Override
	public void callHandler(MotechEvent event) {
		List<Object> args = new ArrayList<Object>();
		Class<?>[] paramTypes = method.getParameterTypes();
		Annotation[][] paramAnnotations = method.getParameterAnnotations();
		Assert.isTrue(paramTypes.length==paramAnnotations.length);
		for(int i = 0; i<paramTypes.length; i++) {
			Class<?> t = paramTypes[i];
			Assert.notEmpty(paramAnnotations[i], "MotechParam(name) annotation is required for each parameter.");
			//TODO now assuming only MotechParam annotation is present...
			Assert.isAssignable(MotechParam.class, paramAnnotations[i][0].getClass());
			MotechParam annotation = (MotechParam)paramAnnotations[i][0];
			Object arg = event.getParameters().get(annotation.value());
			Assert.notNull(arg, String.format("parameter #%d with name:\"%s\" not found or null prameter passed.",i,annotation.value()));
			Assert.isAssignable(t, arg.getClass(), String.format("Parameter #%d expected subtypes of %s passed %s.", i, t.getName(), arg.getClass().getName()));
			args.add(arg);
		}
		ReflectionUtils.invokeMethod(method,bean,args.toArray());
		
	}
}
