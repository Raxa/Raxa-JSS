package org.motechproject.mobileforms.api.validator;

import org.junit.Test;
import org.motechproject.mobileforms.api.domain.FormError;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;

public class RequiredValidatorTest {
    @Test
    public void shouldReturnNullIfFieldHasANonNullValue(){
        assertThat(new RequiredValidator().validate("some value", "name", String.class, null), is(equalTo(null)));
    }

    @Test
    public void shouldReturnFieldErrorIfANullValueIsPassed(){
        assertThat(new RequiredValidator().validate(null, "name", String.class, null), is(equalTo(new FormError("name", "is mandatory"))));
    }

    @Test
    public void shouldReturnFieldErrorIfAEmptyStringIsPassed(){
        assertThat(new RequiredValidator().validate("", "name", String.class, null), is(equalTo(new FormError("name", "is mandatory"))));
    }
}
