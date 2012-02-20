package org.motechproject.mobileforms.api.vo;

import org.motechproject.mobileforms.api.domain.FormBean;

import java.util.ArrayList;
import java.util.List;

public class Study {
    private String name;
    private List<FormBean> forms = new ArrayList<FormBean>();

    public Study() {
    }

    public Study(String name) {
        this.name = name;
    }

    public Study(String name, List<FormBean> forms) {
        this(name);
        this.forms = forms;
    }

    public String name() {
        return name;
    }

    public List<FormBean> forms() {
        return forms;
    }

    public void addForm(FormBean form) {
        forms.add(form);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Study)) return false;

        Study study = (Study) o;

        if (forms != null ? !forms.equals(study.forms) : study.forms != null) return false;
        if (name != null ? !name.equals(study.name) : study.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + (forms != null ? forms.hashCode() : 0);
        return result;
    }
}
