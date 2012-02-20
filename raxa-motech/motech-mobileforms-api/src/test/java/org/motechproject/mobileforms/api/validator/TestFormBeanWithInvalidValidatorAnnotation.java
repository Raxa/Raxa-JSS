package org.motechproject.mobileforms.api.validator;

import org.motechproject.mobileforms.api.domain.FormBean;

public class TestFormBeanWithInvalidValidatorAnnotation extends FormBean {
    @InvalidValidationMarker
    private String familyName;

    public TestFormBeanWithInvalidValidatorAnnotation(String familyName) {
        this.familyName = familyName;
    }

    public String getFamilyName() {
        return familyName;
    }
}
