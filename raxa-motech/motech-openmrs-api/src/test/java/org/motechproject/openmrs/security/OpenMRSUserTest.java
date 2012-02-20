package org.motechproject.openmrs.security;

import org.junit.Test;
import org.openmrs.Role;
import org.openmrs.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;

import java.util.Collection;
import java.util.HashSet;

public class OpenMRSUserTest {
    @Test
    public void shouldHaveGrantedAuthoritiesForOpenMRSRoles() {
        User user = new User();
        user.setRoles(new HashSet<Role>(){{
            add(new Role("Provider"));
            add(new Role("System Developer"));
        }});
        Collection<GrantedAuthority> authorities = new OpenMRSSecurityUser(user, "password").getAuthorities();
        authorities.contains(new GrantedAuthorityImpl("System Developer"));
        authorities.contains(new GrantedAuthorityImpl("Provider"));
    }

}
