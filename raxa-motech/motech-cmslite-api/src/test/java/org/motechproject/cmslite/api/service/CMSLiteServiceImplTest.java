package org.motechproject.cmslite.api.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.motechproject.cmslite.api.repository.AllStreamContents;
import org.motechproject.cmslite.api.repository.AllStringContents;
import org.motechproject.cmslite.api.model.CMSLiteException;
import org.motechproject.cmslite.api.model.ContentNotFoundException;
import org.motechproject.cmslite.api.model.StreamContent;
import org.motechproject.cmslite.api.model.StringContent;

import java.io.IOException;
import java.io.InputStream;

import static junit.framework.Assert.assertFalse;
import static junit.framework.Assert.assertTrue;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.fail;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

public class CMSLiteServiceImplTest {
    @Mock
    private AllStreamContents allStreamContents;
    @Mock
    private AllStringContents allStringContents;

    private CMSLiteService cmsLiteService;

    @Before
    public void setUp() {
        initMocks(this);

        cmsLiteService = new CMSLiteServiceImpl(allStreamContents, allStringContents);
    }

    @Test
    public void shouldReturnStreamContentIfContentExists() throws IOException, ContentNotFoundException {
        String language = "language";
        String name = "name";
        String format = "format";

        InputStream inputStreamToResource = mock(InputStream.class);
        StreamContent streamContent = new StreamContent(language, name, format, inputStreamToResource, "checksum", "audio/x-wav");

        when(allStreamContents.getContent(language, name, format)).thenReturn(streamContent);

        StreamContent content = cmsLiteService.getStreamContent(language, name, format);

        verify(allStreamContents).getContent(language, name, format);
        assertEquals(streamContent, content);
    }

    @Test
    public void shouldReturnStringContentIfContentExists() throws IOException, ContentNotFoundException {
        String language = "language";
        String name = "name";
        String format = "format";

        InputStream inputStreamToResource = mock(InputStream.class);
        StringContent stringContent = new StringContent(language, name, format, "value");

        when(allStringContents.getContent(language, name, format)).thenReturn(stringContent);

        StringContent content = cmsLiteService.getStringContent(language, name, format);

        verify(allStringContents).getContent(language, name, format);
        assertEquals(stringContent, content);
    }

    @Test(expected = ContentNotFoundException.class)
    public void shouldThrowExceptionIfStreamContentDoesNotExist() throws ContentNotFoundException {
        String language = "language";
        String name = "test1";
        String format = "format";

        when(allStreamContents.getContent(language, name, format)).thenReturn(null);

        cmsLiteService.getStreamContent(language, name, format);

        fail("Should have thrown ContentNotFoundException when query is null");
    }

    @Test(expected = ContentNotFoundException.class)
    public void shouldThrowExceptionIfStringContentDoesNotExist() throws ContentNotFoundException {
        String language = "language";
        String name = "test1";
        String format = "format";

        when(allStringContents.getContent(language, name, format)).thenReturn(null);

        cmsLiteService.getStringContent(language, name, format);

        fail("Should have thrown ContentNotFoundException when query is null");
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldThrowIllegalArgumentExceptionWhileGettingContentWhenBothLanguageAndNameAreNull() throws ContentNotFoundException {
        cmsLiteService.getStreamContent(null, null, null);
        verify(allStreamContents, never()).getContent(null, null, null);

        fail("Should have thrown IllegalArgumentException when query is null");
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldThrowIllegalArgumentExceptionWhileGettingContentWhenLanguageIsNull() throws ContentNotFoundException {
        cmsLiteService.getStringContent(null, "name", "format");
        verify(allStringContents, never()).getContent(null, "name", "format");

        fail("Should have thrown IllegalArgumentException when query is null");
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldThrowIllegalArgumentExceptionWhileGettingContentWhenNameIsNull() throws ContentNotFoundException {
        cmsLiteService.getStringContent("en", null, "format");
        verify(allStringContents, never()).getContent("en", null, "format");

        fail("Should have thrown IllegalArgumentException when query is null");
    }

    @Test
    public void shouldAddStreamContent() throws CMSLiteException {
        StreamContent streamContent = new StreamContent("language", "name", "format", null, "checksum", "audio/x-wav");
        cmsLiteService.addContent(streamContent);

        verify(allStreamContents).addContent(streamContent);
    }

    @Test
    public void shouldAddStringContent() throws CMSLiteException {
        StringContent stringContent = new StringContent("language", "name", "format", "value");
        cmsLiteService.addContent(stringContent);

        verify(allStringContents).addContent(stringContent);
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldThrowExceptionWhileAddingContentWhenContentIsNull() throws CMSLiteException {
        cmsLiteService.addContent(null);

        fail("Should have thrown IllegalArgumentException when content is null.");
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldThrowExceptionWhileAddingContentWhenLanguageIsNull
            () throws CMSLiteException {
        cmsLiteService.addContent(new StringContent(null, "name", "format", "value"));

        fail("Should have thrown IllegalArgumentException when language is null.");
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldThrowExceptionWhileAddingContentWhenNameIsNull
            () throws CMSLiteException {
        cmsLiteService.addContent(new StringContent("language", null, "format", "value"));

        fail("Should have thrown IllegalArgumentException when name is null.");
    }

    @Test
    public void shouldReturnTrueIfStreamContentAvailable() {
        when(allStreamContents.isContentAvailable("language", "name", "format")).thenReturn(true);
        assertTrue(cmsLiteService.isStreamContentAvailable("language", "name", "format"));
    }

    @Test
    public void shouldReturnFalseIfStreamContentDoesNotAvailable() {
        when(allStreamContents.isContentAvailable("language", "name", "format")).thenReturn(false);
        assertFalse(cmsLiteService.isStreamContentAvailable("language", "name", "format"));
    }

    @Test
    public void shouldReturnTrueIfStringContentAvailable(){
        when(allStringContents.isContentAvailable("language", "name", "format")).thenReturn(true);
        assertTrue(cmsLiteService.isStringContentAvailable("language", "name", "format"));
    }

    @Test
    public void shouldReturnFalseIfStringContentNotAvailable(){
        when(allStringContents.isContentAvailable("language", "name", "format")).thenReturn(false);
        assertFalse(cmsLiteService.isStringContentAvailable("language", "name", "format"));
    }

}
