package org.motechproject.cmslite.api.repository;

import org.ektorp.AttachmentInputStream;
import org.ektorp.CouchDbConnector;
import org.junit.After;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.motechproject.cmslite.api.model.CMSLiteException;
import org.motechproject.cmslite.api.model.StreamContent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.InputStream;

import static junit.framework.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/applicationCmsLiteApi.xml")
public class AllStreamContentsIT {
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
    public void shouldAddStreamContent() throws CMSLiteException {
        String pathToFile = "/testResource.png";
        InputStream inputStreamToResource = this.getClass().getResourceAsStream(pathToFile);
        englishContent = new StreamContent("en", "test", "ivr", inputStreamToResource, "checksum", "image/png");

        allStreamContents.addContent(englishContent);

        StreamContent streamContent = couchDbConnector.get(StreamContent.class, englishContent.getId());
        assertNotNull(streamContent);
        assertEquals(englishContent.getName(), streamContent.getName());
        assertEquals(englishContent.getLanguage(), streamContent.getLanguage());
        assertEquals(englishContent.getChecksum(), streamContent.getChecksum());
    }

    @Test
    public void shouldUpdateStreamContentAttachment() throws CMSLiteException {
        InputStream inputStreamToResource1 = this.getClass().getResourceAsStream("/background.wav");
        StreamContent file1 = new StreamContent("en", "test", "ivr", inputStreamToResource1, "checksum1", "audio/x-wav");
        allStreamContents.addContent(file1);
        StreamContent streamContent1 = couchDbConnector.get(StreamContent.class, file1.getId());
        assertNotNull(streamContent1);
        assertEquals(file1.getName(), streamContent1.getName());
        assertEquals(file1.getLanguage(), streamContent1.getLanguage());
        assertEquals(file1.getChecksum(), streamContent1.getChecksum());

        String id1 = file1.getId();
        InputStream inputStreamToResource = this.getClass().getResourceAsStream("/10.wav");
        StreamContent file2 = new StreamContent("en", "test", "ivr", inputStreamToResource, "checksum2", "audio/x-wav");
        allStreamContents.addContent(file2);
        StreamContent streamContent = couchDbConnector.get(StreamContent.class, id1);
        assertNotNull(streamContent);
        assertEquals(file2.getName(), streamContent.getName());
        assertEquals(file2.getLanguage(), streamContent.getLanguage());
        assertEquals(file2.getChecksum(), streamContent.getChecksum());

        couchDbConnector.delete(streamContent);
    }

    @Test
    public void shouldReturnTrueIfStreamContentAvailable(){
        createStreamContent();
        assertTrue(allStreamContents.isContentAvailable(englishContent.getLanguage(), englishContent.getName(), englishContent.getFormat()));
    }

    @Test
    public void shouldReturnFalseIfStreamContentNotAvailable(){
        assertFalse(allStreamContents.isContentAvailable("en", "unknownContent", "ivr"));
    }

    @Test
    public void shouldGetStreamContent() {
        createStreamContent();

        StreamContent streamContent = allStreamContents.getContent(englishContent.getLanguage(), englishContent.getName(), englishContent.getFormat());
        assertNotNull(streamContent);
        assertEquals(englishContent.getName(), streamContent.getName());
        assertEquals(englishContent.getLanguage(), streamContent.getLanguage());
        assertEquals(englishContent.getChecksum(), streamContent.getChecksum());
        assertNotNull(englishContent.getInputStream());
    }

    private void createStreamContent() {
        String pathToFile = "/testResource.png";
        InputStream inputStreamToResource = this.getClass().getResourceAsStream(pathToFile);
        englishContent = new StreamContent("en", "test", "IVR", inputStreamToResource, "checksum", "image/png");

        couchDbConnector.create(englishContent);
        AttachmentInputStream attachmentInputStream = new AttachmentInputStream(englishContent.getId(), inputStreamToResource, englishContent.getContentType());
        couchDbConnector.createAttachment(englishContent.getId(), englishContent.getRevision(), attachmentInputStream);
    }
}
