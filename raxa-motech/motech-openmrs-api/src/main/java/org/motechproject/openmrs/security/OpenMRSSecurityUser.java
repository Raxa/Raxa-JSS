package org.motechproject.openmrs.security;

import org.motechproject.mrs.security.MRSSecurityUser;
import org.openmrs.Role;
import org.openmrs.User;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.List;

public class OpenMRSSecurityUser extends MRSSecurityUser {

    private String password;

    public OpenMRSSecurityUser(User user, String password) {
        super(user.getSystemId(), authoritiesFor(user));
        this.password = password;
    }

    private static List<GrantedAuthority> authoritiesFor(User user) {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        for (final Role role : user.getRoles()) {
            authorities.add(new GrantedAuthority() {
                @Override
                public String getAuthority() {
                    return role.getRole();
                }
            });
        }
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }
}
