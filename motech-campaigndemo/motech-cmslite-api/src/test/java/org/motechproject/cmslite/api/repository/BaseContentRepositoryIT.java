package org.motechproject.cmslite.api.repository;

import org.ektorp.AttachmentInputStream;
import org.ektorp.CouchDbConnector;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.motechproject.cmslite.api.model.ContentNotFoundException;
import org.motechproject.cmslite.api.model.StreamContent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.InputStream;

import static junit.framework.Assert.assertNull;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/applicationCmsLiteApi.xml")
public class BaseContentRepositoryIT {
    @Autowired
    AllStreamContents allStreamContents;
    @Autowired
    @Qualifier("cmsLiteDatabase")
    protected CouchDbConnector couchDbConnector;

    private StreamContent englishContent;

    @After
    public void tearDown() {
        if (englishContent != null && couchDbConnector.contains(englishContent.getId())) {
            StreamContent streamContent = couchDbConnector.get(StreamContent.class, englishContent.getId());
            couchDbConnector.delete(streamContent.getId(), streamContent.getRevision());
        }
    }

    @Test
    public void shouldReturnNullWhenNameOrLanguageIsNotPresentInTheDB() {
        StreamContent streamContent = allStreamContents.getContent("ger", "name", "format");
        assertNull(streamContent);
    }

    @Test
    public void shouldNotRetrieveAResourceIfCaseDoesNotMatch() {
        createStreamContent();

        StreamContent streamContent = allStreamContents.getContent("En", "test", "format");
        assertNull(streamContent);

        streamContent = allStreamContents.getContent("en", "Test", "format");
        assertNull(streamContent);
    }

    @Test
    public void shouldReturnNoResourceWhenNameIsNull() throws ContentNotFoundException {
        StreamContent streamContent = allStreamContents.getContent("en", null, "format");
        assertNull(streamContent);
    }

    @Test
    public void shouldReturnNoResourceWhenLanguageIsNull() throws ContentNotFoundException {
        StreamContent content = allStreamContents.getContent(null, "test", "format");
        assertNull(content);
    }

    private void createStreamContent() {
        String pathToFile = "/testResource.png";
        InputStream inputStreamToResource = this.getClass().getResourceAsStream(pathToFile);
        englishContent = new StreamContent("en", "test", "format", inputStreamToResource, "checksum", "image/png");

        couchDbConnector.create(englishContent);
        AttachmentInputStream attachmentInputStream = new AttachmentInputStream(englishContent.getId(), inputStreamToResource, englishContent.getContentType());
        couchDbConnector.createAttachment(englishContent.getId(), englishContent.getRevision(), attachmentInputStream);
    }
}
