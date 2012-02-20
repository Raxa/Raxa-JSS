package org.motechproject.openmrs.advice;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.motechproject.openmrs.security.OpenMRSSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;


@Order(2)
@Aspect
public class ApiSessionAdvice {
    @Autowired
    private OpenMRSSession session;

    @Pointcut("@annotation(org.motechproject.openmrs.advice.ApiSession)")
    private void openmrsSession() {
    }

    @Around("openmrsSession()")
    public Object authorize(ProceedingJoinPoint pjp) throws Throwable {
        try {
            session.open();
            session.authenticate();
            return pjp.proceed();
        } finally {
            session.close();
        }
    }
}
