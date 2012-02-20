package org.motechproject.cmslite.api.model;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;
import org.ektorp.AttachmentInputStream;
import org.ektorp.support.TypeDiscriminator;

import java.io.InputStream;

@TypeDiscriminator("doc.type === 'StreamContent'")
public class StreamContent extends Content {
    private InputStream inputStream;
    @JsonProperty
    private String checksum;
    @JsonProperty
    private String contentType;

    public StreamContent() {
    }

    public StreamContent(String language, String name, String format, InputStream inputStream, String checksum, String contentType) {
        super(language, name, format);
        this.inputStream = inputStream;
        this.checksum = checksum;
        this.contentType = contentType;
    }

    @JsonIgnore
    public InputStream getInputStream() {
        return inputStream;
    }

    public String getChecksum() {
        return checksum;
    }

    public void setInputStream(AttachmentInputStream inputStream) {
        this.inputStream = inputStream;
    }

    public String getContentType() {
        return contentType;
    }

    public void setChecksum(String checksum) {
        this.checksum = checksum;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }
}