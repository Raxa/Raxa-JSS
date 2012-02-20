package org.motechproject.cmslite.api.service;

import org.motechproject.cmslite.api.model.*;
import org.springframework.stereotype.Component;

@Component
public interface CMSLiteService {
    StreamContent getStreamContent(String language, String name, String format) throws ContentNotFoundException;

    StringContent getStringContent(String language, String name, String format) throws ContentNotFoundException;

    void addContent(Content content) throws CMSLiteException;

    boolean isStreamContentAvailable(String language, String name, String format);

    boolean isStringContentAvailable(String language, String name, String format);
}