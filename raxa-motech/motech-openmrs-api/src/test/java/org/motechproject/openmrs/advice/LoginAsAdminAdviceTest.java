package org.motechproject.openmrs.advice;

import org.aspectj.lang.ProceedingJoinPoint;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.motechproject.openmrs.security.OpenMRSSecurityUser;
import org.motechproject.openmrs.security.OpenMRSSession;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;
import static org.powermock.api.mockito.PowerMockito.mockStatic;

@RunWith(PowerMockRunner.class)
@PrepareForTest({OpenMRSSession.class, SecurityContextHolder.class})
public class LoginAsAdminAdviceTest {

    @Test
    public void shouldAutenticateAsAdminAndInvokeTheCallee() throws Throwable {
        mockStatic(OpenMRSSession.class);
        mockStatic(SecurityContextHolder.class);
        String userName = "userName";
        String password = "password";
        LoginAsAdminAdvice loginAsAdminAdvice = new LoginAsAdminAdvice();
        ReflectionTestUtils.setField(loginAsAdminAdvice, "userName", userName);
        ReflectionTestUtils.setField(loginAsAdminAdvice, "password", password);

        ProceedingJoinPoint pjp = mock(ProceedingJoinPoint.class);
        Object expectedObjectToBeReturned = new Object();
        when(pjp.proceed()).thenReturn(expectedObjectToBeReturned);

        OpenMRSSecurityUser openMRSSecurityUser = mock(OpenMRSSecurityUser.class);
        PowerMockito.when(OpenMRSSession.login(userName, password)).thenReturn(openMRSSecurityUser);

        SecurityContext context = mock(SecurityContext.class);
        PowerMockito.when(SecurityContextHolder.getContext()).thenReturn(context);

        Object actualObjectReturned = loginAsAdminAdvice.loginAsAdminAndInvoke(pjp);
        ArgumentCaptor<UsernamePasswordAuthenticationToken> authenticationTokenArgumentCaptor = ArgumentCaptor.forClass(UsernamePasswordAuthenticationToken.class);
        verify(context, times(2)).setAuthentication(authenticationTokenArgumentCaptor.capture());

        List<UsernamePasswordAuthenticationToken> adminCredentials = authenticationTokenArgumentCaptor.getAllValues();
        assertThat(((OpenMRSSecurityUser)adminCredentials.get(0).getPrincipal()), is(equalTo(openMRSSecurityUser)));
        assertThat(adminCredentials.get(1), is(equalTo(null)));

        assertThat(actualObjectReturned, is(expectedObjectToBeReturned));

    }
}
