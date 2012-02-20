package org.motechproject.cmslite.api.model;

import org.codehaus.jackson.annotate.JsonProperty;
import org.motechproject.model.MotechBaseDataObject;

public abstract class Content extends MotechBaseDataObject {
    @JsonProperty
    private String language;
    @JsonProperty
    private String name;
    @JsonProperty
    private String format;

    protected Content() {
    }

    protected Content(String language, String name, String format) {
        this.name = name;
        this.language = language;
        this.format = format;
    }

    public String getLanguage() {
        return language;
    }

    public String getName() {
        return name;
    }
    
    public String getFormat() {
    	return format;
    }
}