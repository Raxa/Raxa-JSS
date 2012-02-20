package org.motechproject.openmrs.builder;

import org.openmrs.Person;
import org.openmrs.Role;
import org.openmrs.User;

import java.util.Set;

public class UserBuilder extends AbstractBuilder<User> {

    private Integer userId;
    private Person person;
    private String systemId;
    private String username;
    private String secretQuestion;
    private Set<Role> roles;

    public UserBuilder userId(Integer userId) {
        this.userId = userId;
        return this;
    }

    public UserBuilder person(Person person) {
        this.person = person;
        return this;
    }

    public UserBuilder systemId(String systemId) {
        this.systemId = systemId;
        return this;
    }

    public UserBuilder username(String username) {
        this.username = username;
        return this;
    }

    public UserBuilder secretQuestion(String secretQuestion) {
        this.secretQuestion = secretQuestion;
        return this;
    }

    public UserBuilder roles(Set<Role> roles) {
        this.roles = roles;
        return this;
    }

    public User build() {
        return generate(new User());
    }

}
