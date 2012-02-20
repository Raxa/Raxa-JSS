package org.motechproject.mobileforms.api.validator;

import org.junit.Test;
import org.motechproject.mobileforms.api.domain.FormError;

import java.util.Arrays;
import java.util.Collections;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertThat;

public class FormValidatorTest {

    @Test
    public void shouldReturnErrorIfInvalidValidationAnnotationHasBeenConfiguredToTheFormBeanField() {
        TestFormBeanWithInvalidValidatorAnnotation formBean = new TestFormBeanWithInvalidValidatorAnnotation("FamilyName");
        assertThat(new TestFormValidator().validate(formBean), hasItem(new FormError("familyName", "Server exception, contact your administrator")));
    }

    @Test
    public void shouldReturnNoErrorsIfAllFieldsAreValid() {
        assertThat(new TestFormValidator().validate(new TestFormBean().setFirstName("First Name")), is(equalTo(Collections.<FormError>emptyList())));
    }

    @Test
    public void shouldCheckIfAttributesAnnotatedAsRequiredHaveAValue() {
        assertThat(new TestFormValidator().validate(new TestFormBean()), hasItem(new FormError("firstName", "is mandatory")));
    }

    @Test
    public void shouldCheckIfAttributesAnnotatedWithRegularExpressionGetValidatedAgainstThePattern() {
        assertThat(new TestFormValidator().validate(new TestFormBean().setFirstName("First 1 name")), is(equalTo(Arrays.asList(new FormError("firstName", "wrong format")))));
    }

    @Test
    public void shouldCheckIfAttributesAnnotatedWithMaxLengthGetValidatedAgainstMaxAllowedLength() {
        assertThat(new TestFormValidator().validate(new TestFormBean().setFirstName("very looooooooooonnnnnnnnnngggggggg name")), hasItem(new FormError("firstName", "too long")));
    }
}



