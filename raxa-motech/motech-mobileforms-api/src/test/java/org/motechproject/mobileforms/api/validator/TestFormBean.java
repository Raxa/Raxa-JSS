package org.motechproject.mobileforms.api.validator;

import org.motechproject.mobileforms.api.domain.FormBean;
import org.motechproject.mobileforms.api.validator.annotations.MaxLength;
import org.motechproject.mobileforms.api.validator.annotations.RegEx;
import org.motechproject.mobileforms.api.validator.annotations.Required;

public class TestFormBean extends FormBean {

    private static final String FIRST_NAME_PATTERN = "[A-Z,a-z, ]+";
    @Required
    @RegEx(pattern = FIRST_NAME_PATTERN)
    @MaxLength(size = 15)
    private String firstName;

    private String lastName;

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public TestFormBean setFirstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public TestFormBean setLastName(String lastName) {
        this.lastName = lastName;
        return this;
    }
}
