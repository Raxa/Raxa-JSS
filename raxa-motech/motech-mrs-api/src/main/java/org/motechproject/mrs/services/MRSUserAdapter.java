package org.motechproject.mrs.services;

import org.motechproject.mrs.exception.UserAlreadyExistsException;
import org.motechproject.mrs.model.MRSUser;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Map;

public interface MRSUserAdapter {
    void changeCurrentUserPassword(String currentPassword, String newPassword);
    Map saveUser(MRSUser mrsUser) throws UserAlreadyExistsException;
    String setNewPasswordForUser(String emailID) throws UsernameNotFoundException;
    List<MRSUser> getAllUsers();
    MRSUser getUserByUserName(String id);
    Map updateUser(MRSUser mrsUser);
}
