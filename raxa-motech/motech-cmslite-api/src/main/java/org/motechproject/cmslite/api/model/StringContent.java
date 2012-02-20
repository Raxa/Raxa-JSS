package org.motechproject.cmslite.api.model;

import org.codehaus.jackson.annotate.JsonProperty;
import org.ektorp.support.TypeDiscriminator;

@TypeDiscriminator("doc.type === 'StringContent'")
public class StringContent extends Content {
    @JsonProperty
    private String value;

    public StringContent() {
    }

    public StringContent(String language, String name, String format, String value) {
        super(language, name, format);
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
}
