package org.motechproject.openmrs.omod.domain;

import java.util.Map;

public class OmodEvent {
    private String subject;
    private Map<String, Object> parameters;

    public OmodEvent(String subject, Map<String, Object> parameters) {
        this.subject = subject;
        this.parameters = parameters;
    }

    public String getSubject() {
        return subject;
    }

    public Map<String, Object> getParameters() {
        return parameters;
    }
}
