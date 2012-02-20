package org.motechproject.openmrs;

import org.motechproject.openmrs.security.OpenMRSSession;
import org.motechproject.openmrs.security.OpenMRSSecurityUser;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

public class OpenMRSTestAuthenticationProvider {
    public static void login(String userName, String password) {
        OpenMRSSecurityUser mrsUser = OpenMRSSession.login(userName, password);
        SecurityContextHolder.getContext().setAuthentication(new TestingAuthenticationToken(mrsUser, null));
    }
}

