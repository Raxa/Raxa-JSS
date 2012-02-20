package org.motechproject.cmslite.api.repository;

import org.ektorp.CouchDbConnector;
import org.motechproject.cmslite.api.model.CMSLiteException;
import org.motechproject.cmslite.api.model.Content;
import org.motechproject.dao.MotechBaseRepository;

public abstract class BaseContentRepository<T extends Content> extends MotechBaseRepository<T> {
    protected BaseContentRepository(Class<T> type, CouchDbConnector db) {
        super(type, db);
    }

    public abstract T getContent(String language, String name, String format);

    public abstract void addContent(T content) throws CMSLiteException;

    public abstract boolean isContentAvailable(String language, String name, String format);
}
