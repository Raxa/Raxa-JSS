package org.motechproject.openmrs.security;

import org.motechproject.mrs.security.InvalidCredentialsException;
import org.motechproject.mrs.security.MRSAuthenticationProvider;
import org.motechproject.mrs.security.MRSSecurityUser;
import org.openmrs.api.context.ContextAuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

public class OpenMRSAuthenticationProvider extends MRSAuthenticationProvider {

    @Override
    protected MRSSecurityUser retrieveUser(String userName, UsernamePasswordAuthenticationToken authentication) throws InvalidCredentialsException {
        try {
            return OpenMRSSession.login(userName, (String) authentication.getCredentials());
        } catch (ContextAuthenticationException e) {
            throw new InvalidCredentialsException();
        }
    }
}