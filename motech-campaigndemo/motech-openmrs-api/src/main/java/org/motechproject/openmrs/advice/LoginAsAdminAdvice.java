package org.motechproject.openmrs.advice;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.motechproject.openmrs.security.OpenMRSSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

@Order(1)
@Aspect
public class LoginAsAdminAdvice {
    @Value("#{openmrsProperties['openmrs.admin.username']}")
    private String userName;

    @Value("#{openmrsProperties['openmrs.admin.password']}")
    private String password;

    @Pointcut("@annotation(org.motechproject.openmrs.advice.LoginAsAdmin)")
    private void loginAsAdmin() {
    }

    @Around("loginAsAdmin()")
    public Object loginAsAdminAndInvoke(ProceedingJoinPoint pjp) throws Throwable {
        SecurityContext securityContext = SecurityContextHolder.getContext();
        try {
            securityContext.setAuthentication(new UsernamePasswordAuthenticationToken(OpenMRSSession.login(userName, password), password));
            return pjp.proceed();
        } finally {
            securityContext.setAuthentication(null);
        }
    }
}
