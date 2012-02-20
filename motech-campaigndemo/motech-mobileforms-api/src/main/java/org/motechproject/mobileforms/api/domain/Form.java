package org.motechproject.mobileforms.api.domain;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Form {
    private Integer id;
    private String name;
    private String bean;
    private String content;
    private String fileName;
    private String studyName;
    private String validator;

    public static final String XF_XFORMS_ID = "<xf:xforms.*?id=\"(.*?)\"";

    public Form(String name, String fileName) {
        this.name = name;
        this.fileName = fileName;
    }

    public Form(String name, String fileName, String content, String bean, String validator, String studyName) {
        this(name, fileName);
        this.content = content;
        this.bean = bean;
        this.validator = validator;
        this.studyName = studyName;
        this.id = extractId(content);
    }

    public String name() {
        return name;
    }

    public String fileName() {
        return fileName;
    }

    public Integer id() {
        return id;
    }

    public String content() {
        return content;
    }

    public String bean() {
        return bean;
    }

    public String validator() {
        return validator;
    }

    private Integer extractId(String content) {
        Matcher matcher = Pattern.compile(XF_XFORMS_ID, Pattern.CASE_INSENSITIVE).matcher(content);
        Integer formId = null;
        if (matcher.find()) {
            String formIdString = matcher.group(1);
            formId = Integer.valueOf(formIdString);
        }
        return formId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Form)) return false;
        Form form = (Form) o;
        if (content != null ? !content.equals(form.content) : form.content != null) return false;
        if (fileName != null ? !fileName.equals(form.fileName) : form.fileName != null) return false;
        if (name != null ? !name.equals(form.name) : form.name != null) return false;
        return true;
    }

    @Override
    public int hashCode() {
        int result = name != null ? name.hashCode() : 0;
        result = 31 * result + (fileName != null ? fileName.hashCode() : 0);
        result = 31 * result + (content != null ? content.hashCode() : 0);
        return result;
    }

    public String studyName() {
        return studyName;
    }
}
