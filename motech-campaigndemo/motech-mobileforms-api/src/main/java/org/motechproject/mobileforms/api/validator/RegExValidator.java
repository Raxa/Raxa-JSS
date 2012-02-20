package org.motechproject.mobileforms.api.validator;

import org.motechproject.mobileforms.api.domain.FormError;
import org.motechproject.mobileforms.api.validator.annotations.RegEx;

import java.util.regex.Pattern;

public class RegExValidator implements FieldValidator<RegEx> {

    @Override
    public FormError validate(Object fieldValue, String fieldName, Class fieldType, RegEx regEx) {
        if (fieldValue != null) {
            if (fieldType == String.class) {
                Pattern pattern = Pattern.compile(regEx.pattern());
                if (!pattern.matcher((String) fieldValue).matches()) {
                    return new FormError(fieldName, "wrong format");
                }
            } else {
                return new FormError(fieldName, "Pattern match validation cannot be applied to " + fieldName + " as it is not a string");
            }
        }
        return null;
    }
}
