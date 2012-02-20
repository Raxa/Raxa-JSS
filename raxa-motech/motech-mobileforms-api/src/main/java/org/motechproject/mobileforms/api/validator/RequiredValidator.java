package org.motechproject.mobileforms.api.validator;

import org.apache.commons.lang.StringUtils;
import org.motechproject.mobileforms.api.domain.FormError;
import org.motechproject.mobileforms.api.validator.annotations.Required;

public class RequiredValidator implements FieldValidator<Required>{

    @Override
    public FormError validate(Object fieldValue, String fieldName, Class fieldType, Required annotation) {
        if (fieldValue == null || fieldType == String.class && StringUtils.isEmpty((String) fieldValue)) {
            return new FormError(fieldName, "is mandatory");
        }
        return null;
    }
}
