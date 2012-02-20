package org.motechproject.openmrs.security;

import org.motechproject.mrs.security.MRSSecurityUser;
import org.openmrs.api.context.Context;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;


public class OpenMRSSession {

    public void open() {
        Context.openSession();
    }

    public void authenticate() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        MRSSecurityUser principal = (MRSSecurityUser) authentication.getPrincipal();
        Context.authenticate(principal.getUsername(), principal.getPassword());
    }

    public void close() {
        Context.closeSession();
    }

    public static OpenMRSSecurityUser login(String userName, String password) {
        Context.openSession();
        Context.authenticate(userName, password);
        OpenMRSSecurityUser openMRSUser = new OpenMRSSecurityUser(Context.getAuthenticatedUser(), password);
        Context.closeSession();
        return openMRSUser;
    }
}
