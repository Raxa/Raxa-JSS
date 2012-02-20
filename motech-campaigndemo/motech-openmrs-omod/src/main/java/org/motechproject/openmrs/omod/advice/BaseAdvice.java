package org.motechproject.openmrs.omod.advice;

import org.motechproject.openmrs.omod.domain.OmodEvent;
import org.motechproject.openmrs.omod.service.OmodPublisher;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.AfterReturningAdvice;
import org.springframework.beans.factory.annotation.Autowired;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

public abstract class BaseAdvice implements AfterReturningAdvice {
    private static final Logger LOG = LoggerFactory.getLogger(BaseAdvice.class);

    public static final String ADVICE_EVENT_RETURNED_VALUE = "returnedValue";

    public static final String ADVICE_EVENT_METHOD_INVOKED = "methodInvoked";

    protected OmodPublisher publisher = new OmodPublisher();

    @Override
    public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
        String methodName = method.getName();
        Map params = new HashMap();
        params.put(ADVICE_EVENT_METHOD_INVOKED, methodName);
        params.put(ADVICE_EVENT_RETURNED_VALUE, returnValue);

        publisher.send(new OmodEvent(this.getClass().getName(), params));
        LOG.info("intercepting service: " + methodName + "|" + params);
    }
}
