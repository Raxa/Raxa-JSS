package org.motechproject.mobileforms.api.domain;

public class FormError {
    private String parameter;
    private String error;

    public FormError(String parameter, String error) {
        this.parameter = parameter;
        this.error = error;
    }

    public String getParameter() {
        return parameter;
    }

    public String getError() {
        return error;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof FormError)) return false;

        FormError formError = (FormError) o;

        if (error != null ? !error.equals(formError.error) : formError.error != null) return false;
        if (parameter != null ? !parameter.equals(formError.parameter) : formError.parameter != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = parameter != null ? parameter.hashCode() : 0;
        result = 31 * result + (error != null ? error.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "FormError{" +
                "parameter='" + parameter + '\'' +
                ", error='" + error + '\'' +
                '}';
    }
}
