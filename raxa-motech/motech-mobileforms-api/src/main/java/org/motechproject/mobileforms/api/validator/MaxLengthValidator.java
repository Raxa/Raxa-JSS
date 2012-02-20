package org.motechproject.mobileforms.api.validator;

import org.motechproject.mobileforms.api.domain.FormError;
import org.motechproject.mobileforms.api.validator.annotations.MaxLength;

public class MaxLengthValidator implements FieldValidator<MaxLength> {
    @Override
    public FormError validate(Object fieldValue, String fieldName, Class fieldType, MaxLength annotation) {
        if (fieldValue != null) {
            if (fieldType == String.class) {
                return validateLength(fieldName, (String) fieldValue, annotation.size());
            } else if (fieldValue instanceof Number) {
                return validateLength(fieldName, String.valueOf(fieldValue), annotation.size());
            } else {
                return new FormError(fieldName, "Length validation cannot be applied to " + fieldName + " as it is not a string or a number");
            }
        }
        return null;
    }


    private FormError validateLength(String fieldName, String fieldValue, int length) {
        return (fieldValue.length() > length) ? new FormError(fieldName, "too long") : null;
    }
}
