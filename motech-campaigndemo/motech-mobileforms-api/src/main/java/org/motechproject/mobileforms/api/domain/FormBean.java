package org.motechproject.mobileforms.api.domain;

import java.io.Serializable;
import java.util.List;

import static org.springframework.util.CollectionUtils.isEmpty;

public class FormBean implements Serializable{
    private String studyName;
    private String formname;
    private String xmlContent;
    private String validator;
    private String formtype;
    private List<FormError> formErrors;

    public FormBean() {
    }

    public FormBean(String xmlContent) {
        this.xmlContent = xmlContent;
    }

    public void setValidator(String validator){
        this.validator = validator;
    }

    public void setFormname(String formname){
        this.formname = formname;
    }

    public String getValidator() {
        return validator;
    }

    public String getFormname() {
        return formname;
    }

    public String getStudyName() {
        return studyName;
    }

    public void setStudyName(String studyName) {
        this.studyName = studyName;
    }

    public String getXmlContent() {
        return xmlContent;
    }

    public void setXmlContent(String xmlContent) {
        this.xmlContent = xmlContent;
    }

    public String getFormtype() {
        return formtype;
    }

    public void setFormtype(String formtype) {
        this.formtype = formtype;
    }

    public List<FormError> getFormErrors() {
        return formErrors;
    }

    public void setFormErrors(List<FormError> formErrors) {
        this.formErrors = formErrors;
    }

    public Boolean hasErrors(){
        return !isEmpty(formErrors);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FormBean)) return false;

        FormBean formBean = (FormBean) o;

        if (formErrors != null ? !formErrors.equals(formBean.formErrors) : formBean.formErrors != null) return false;
        if (formname != null ? !formname.equals(formBean.formname) : formBean.formname != null) return false;
        if (formtype != null ? !formtype.equals(formBean.formtype) : formBean.formtype != null) return false;
        if (studyName != null ? !studyName.equals(formBean.studyName) : formBean.studyName != null) return false;
        if (validator != null ? !validator.equals(formBean.validator) : formBean.validator != null) return false;
        if (xmlContent != null ? !xmlContent.equals(formBean.xmlContent) : formBean.xmlContent != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = studyName != null ? studyName.hashCode() : 0;
        result = 31 * result + (formname != null ? formname.hashCode() : 0);
        result = 31 * result + (xmlContent != null ? xmlContent.hashCode() : 0);
        result = 31 * result + (validator != null ? validator.hashCode() : 0);
        result = 31 * result + (formtype != null ? formtype.hashCode() : 0);
        result = 31 * result + (formErrors != null ? formErrors.hashCode() : 0);
        return result;
    }
}
