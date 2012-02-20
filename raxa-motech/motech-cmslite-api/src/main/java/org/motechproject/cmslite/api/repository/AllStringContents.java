package org.motechproject.cmslite.api.repository;

import org.ektorp.ComplexKey;
import org.ektorp.CouchDbConnector;
import org.ektorp.ViewQuery;
import org.ektorp.support.View;
import org.motechproject.cmslite.api.model.CMSLiteException;
import org.motechproject.cmslite.api.model.StringContent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.List;

@Repository
public class AllStringContents extends BaseContentRepository<StringContent> {
    @Autowired
	protected AllStringContents(CouchDbConnector db) {
        super(StringContent.class, db);
    }

    @View(name = "by_language_and_name", map = "function(doc) { if (doc.type=='StringContent') { emit([doc.language, doc.name, doc.format], doc); } }")
    @Override
    public StringContent getContent(String language, String name, String format) {
        ViewQuery query = createQuery("by_language_and_name").key(ComplexKey.of(language, name, format));
        List<StringContent> result = db.queryView(query, StringContent.class);

        if (result == null || result.isEmpty()) return null;
        return result.get(0);
    }

    @Override
    public boolean isContentAvailable(String language, String name, String format) {
        ViewQuery query = createQuery("by_language_and_name").key(ComplexKey.of(language, name, format));
        return db.queryView(query).getSize() > 0;
    }

    @Override
    public void addContent(StringContent content) throws CMSLiteException {
        StringContent contentFromDB = null;
        try {
            contentFromDB = getContent(content.getLanguage(), content.getName(), content.getFormat());
            boolean create = contentFromDB == null;

            createOrUpdateContent(content, contentFromDB, create);
        } catch (Exception e) {
            throw new CMSLiteException(e.getMessage(), e);
        }
    }

    private void createOrUpdateContent(StringContent stringContent, StringContent stringContentFromDB, boolean resourceDoesNotExist) throws IOException {
        if (resourceDoesNotExist)
            db.create(stringContent);
        else {
            stringContentFromDB.setValue(stringContent.getValue());
            db.update(stringContentFromDB);
        }
    }
}
