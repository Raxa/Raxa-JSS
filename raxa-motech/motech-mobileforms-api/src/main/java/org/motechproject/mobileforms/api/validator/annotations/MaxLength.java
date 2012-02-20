package org.motechproject.mobileforms.api.validator.annotations;

import org.motechproject.mobileforms.api.validator.MaxLengthValidator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@ValidationMarker(handler = MaxLengthValidator.class)
public @interface MaxLength {
    int size();
}
