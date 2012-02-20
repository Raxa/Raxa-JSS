package org.motechproject.cmslite.api.repository;

import org.ektorp.CouchDbConnector;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.motechproject.cmslite.api.model.CMSLiteException;
import org.motechproject.cmslite.api.model.StringContent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static junit.framework.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/applicationCmsLiteApi.xml")
public class AllStringContentsIT {
    @Autowired
    AllStringContents allStringContents;
    @Autowired
    @Qualifier("cmsLiteDatabase")
    protected CouchDbConnector couchDbConnector;
    private StringContent stringContent;

    @Before
    public void setUp() {
        stringContent = new StringContent("language", "name", "format", "value");
    }

    @Test
    public void shouldAddStringContent() throws CMSLiteException {
        allStringContents.addContent(stringContent);

        StringContent fetchedContent = couchDbConnector.get(StringContent.class, stringContent.getId());
        assertNotNull(fetchedContent);
        assertEquals(stringContent.getName(), fetchedContent.getName());
        assertEquals(stringContent.getLanguage(), fetchedContent.getLanguage());
        assertEquals(stringContent.getValue(), fetchedContent.getValue());

        couchDbConnector.delete(fetchedContent);
    }

    @Test
    public void shouldUpdateStringContent() throws CMSLiteException {
        allStringContents.addContent(stringContent);

        StringContent fetchedContent = couchDbConnector.get(StringContent.class, stringContent.getId());
        assertNotNull(fetchedContent);
        assertEquals(stringContent.getName(), fetchedContent.getName());
        assertEquals(stringContent.getLanguage(), fetchedContent.getLanguage());
        assertEquals(stringContent.getValue(), fetchedContent.getValue());

        StringContent newStringContent = new StringContent("language", "name", "format", "newValue");

        allStringContents.addContent(newStringContent);
        fetchedContent = couchDbConnector.get(StringContent.class, stringContent.getId());
        assertNotNull(fetchedContent);
        assertEquals(newStringContent.getName(), fetchedContent.getName());
        assertEquals(newStringContent.getLanguage(), fetchedContent.getLanguage());
        assertEquals(newStringContent.getValue(), fetchedContent.getValue());

        couchDbConnector.delete(fetchedContent);

    }

    @Test
    public void shouldGetStringContent() {
        couchDbConnector.create(stringContent);

        StringContent fetchedContent = allStringContents.getContent(stringContent.getLanguage(), stringContent.getName(), stringContent.getFormat());
        assertNotNull(fetchedContent);
        assertEquals(stringContent.getName(), fetchedContent.getName());
        assertEquals(stringContent.getLanguage(), fetchedContent.getLanguage());
        assertEquals(stringContent.getValue(), fetchedContent.getValue());

        couchDbConnector.delete(fetchedContent);
    }

    @Test
    public void shouldReturnTrueIfStringContentAvailable() throws CMSLiteException {
        allStringContents.addContent(stringContent);
        assertTrue(allStringContents.isContentAvailable(stringContent.getLanguage(), stringContent.getName(), stringContent.getFormat()));
        couchDbConnector.delete(stringContent);
    }

    @Test
    public void shouldReturnFalseIfStringContentNotAvailable() throws CMSLiteException {
        allStringContents.addContent(stringContent);
        assertFalse(allStringContents.isContentAvailable("en", "unknownContent", "IVR"));
	    couchDbConnector.delete(stringContent);
    }
}
