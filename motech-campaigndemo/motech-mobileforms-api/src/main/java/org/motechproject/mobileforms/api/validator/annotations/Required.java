package org.motechproject.mobileforms.api.validator.annotations;

import org.motechproject.mobileforms.api.validator.RequiredValidator;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@ValidationMarker(handler = RequiredValidator.class)
public @interface Required {
}
