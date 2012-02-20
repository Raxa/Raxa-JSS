package org.motechproject.mobileforms.api.validator;

import org.hamcrest.MatcherAssert;
import org.hamcrest.Matchers;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.motechproject.mobileforms.api.domain.FormError;
import org.motechproject.mobileforms.api.validator.annotations.MaxLength;

import java.util.ArrayList;
import java.util.List;

import static junit.framework.Assert.assertNull;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class MaxLengthValidatorTest {

    private MaxLengthValidator lengthValidator;

    @Mock
    private MaxLength lengthAnnotation;

    @Before
    public void setUp() throws Exception {
        initMocks(this);
        lengthValidator = new MaxLengthValidator();
    }

    @Test
    public void shouldNotReturnErrorIfFieldValueIsNull(){
        assertNull(lengthValidator.validate(null, "FirstName", String.class, lengthAnnotation));
    }

    @Test
    public void shouldValidateThatTheLengthOfFieldValueIsLessThanMaxLength() {
        when(lengthAnnotation.size()).thenReturn(10);
        assertNull(lengthValidator.validate("Somevalue", "FirstName", String.class, lengthAnnotation));
        assertNull(lengthValidator.validate(100, "Age", Integer.class, lengthAnnotation));
    }

    @Test
    public void shouldReturnFormErrorWhenFieldValueIsGreaterThanRequiredLength() {
        when(lengthAnnotation.size()).thenReturn(4);
        assertThat(lengthValidator.validate("Value", "FirstName", String.class, lengthAnnotation), is(new FormError("FirstName", "too long")));
        assertThat(lengthValidator.validate(100000, "Age", Integer.class, lengthAnnotation), is(new FormError("Age", "too long")));
    }

    @Test
    public void shouldReturnErrorIfLengthValidatorIsAnnotatedOnNonStringOrOnNumericField(){
        MatcherAssert.assertThat(lengthValidator.validate(new ArrayList(), "name", List.class, lengthAnnotation), Matchers.is(equalTo(new FormError("name", "Length validation cannot be applied to name as it is not a string or a number"))));
    }

}
