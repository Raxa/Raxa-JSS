package org.motechproject.mobileforms.api.validator;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.motechproject.mobileforms.api.domain.FormError;
import org.motechproject.mobileforms.api.validator.annotations.RegEx;

import static junit.framework.Assert.assertNull;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class RegExValidatorTest {

    @Mock
    RegEx regEx;

    @Before
    public void setUp() throws Exception {
        initMocks(this);
        when(regEx.pattern()).thenReturn("^(some value|SOME VALUE)$");

    }

    @Test
    public void shouldNotReturnErrorIfFieldValueIsNull(){
        assertNull(new RegExValidator().validate(null, "FirstName", String.class, regEx));
    }

    @Test
    public void shouldReturnNullIfFieldValueMatchesRegularExpression() throws IllegalAccessException, InstantiationException, NoSuchFieldException {
        assertThat(new RegExValidator().validate("some value", "name", String.class, regEx), is(equalTo(null)));
        assertThat(new RegExValidator().validate("SOME VALUE", "name", String.class, regEx), is(equalTo(null)));
    }

    @Test
    public void shouldReturnErrorIfFieldValueDoesNotMatchRegularExpression(){
        assertThat(new RegExValidator().validate("SOME OTHER VALUE", "name", String.class, regEx), is(equalTo(new FormError("name", "wrong format"))));
    }

    @Test
    public void shouldReturnErrorIfRegularExpressionValidatorIsAnnotatedOnNonStringField(){
        assertThat(new RegExValidator().validate(100, "name", Integer.class, regEx), is(equalTo(new FormError("name", "Pattern match validation cannot be applied to name as it is not a string"))));
    }

}
