package org.motechproject.cmslite.api.web;

public class ResourceQuery {
    private String language;
    private String name;
    private String type;
    private String format;

    public ResourceQuery(String language, String name, String type, String format) {
        this.language = language;
        this.name = name;
        this.type = type;
        this.format = format;
    }
    
    public String getFormat() {
    	return format;
    }
    
    public void setFormat(String format) {
    	this.format = format;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
