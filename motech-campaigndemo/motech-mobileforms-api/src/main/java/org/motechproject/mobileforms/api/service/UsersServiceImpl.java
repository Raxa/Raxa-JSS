package org.motechproject.mobileforms.api.service;

import org.motechproject.mobileforms.api.utils.Encoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

@Service
public class UsersServiceImpl implements UsersService {
    public static final String FORMS_USER_ACCOUNTS = "forms.user.accounts";
    private Properties properties;
    private Encoder encoder;

    @Autowired
    public UsersServiceImpl(@Qualifier(value = "mobileFormsProperties") Properties properties, Encoder encoder) {
        this.properties = properties;
        this.encoder = encoder;
    }

    @Override
    public List<Object[]> getUsers(){
        String[] userAccounts = properties.getProperty(FORMS_USER_ACCOUNTS).split(",");
        List<Object[]> users = new ArrayList<Object[]>();
        for (int i=0; i < userAccounts.length; i++) {
            String[] userDetails = userAccounts[i].split("\\|");
            String userName = userDetails[0];
            String password = userDetails[1];
            String salt = userDetails[2];
            users.add(new Object[]{i+1, userName, encoder.sha(password, salt), salt});
        }
        return users;
    }
}
