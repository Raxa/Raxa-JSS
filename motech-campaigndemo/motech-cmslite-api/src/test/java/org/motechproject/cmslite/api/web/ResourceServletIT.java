package org.motechproject.cmslite.api.web;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.motechproject.cmslite.api.repository.AllStreamContents;
import org.motechproject.cmslite.api.repository.AllStringContents;
import org.motechproject.cmslite.api.model.CMSLiteException;
import org.motechproject.cmslite.api.model.StreamContent;
import org.motechproject.cmslite.api.model.StringContent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;

import static org.junit.Assert.fail;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/applicationCmsLiteApi.xml")
public class ResourceServletIT {

    public static final String CONTEXT_PATH = "/tama";
    public static final String NAME = "background.wav";
    public static final String SERVLET_PATH = "/wav";
    public static final String LANGUAGE = "en";
    public static final String FORMAT = "format";
    public static String STREAM_REQUEST_URI = CONTEXT_PATH + SERVLET_PATH + "/stream/" + LANGUAGE + "/" + FORMAT + "/" + NAME;
    public static String STRING_REQUEST_URI = CONTEXT_PATH + SERVLET_PATH + "/string/" + LANGUAGE + "/" + FORMAT + "/" + NAME;

    @Mock
    HttpServletRequest httpServletRequest;
    @Mock
    HttpServletResponse httpServletResponse;
    @Mock
    ServletOutputStream servletOutputStream;
    @Mock
    ServletInputStream servletInputStream;
    @Mock
    PrintWriter printWriter;
    @Autowired
    AllStreamContents allStreamContents;
    @Autowired
    AllStringContents allStringContents;

    private ResourceServlet resourceServlet;

    @Before
    public void setUp() throws IOException {
        initMocks(this);
        resourceServlet = new ResourceServlet();

        when(httpServletRequest.getContextPath()).thenReturn(CONTEXT_PATH);
        when(httpServletRequest.getServletPath()).thenReturn(SERVLET_PATH);
        when(httpServletResponse.getOutputStream()).thenReturn(servletOutputStream);
        when(httpServletRequest.getInputStream()).thenReturn(servletInputStream);
    }

    @Test
    public void shouldGetStreamContent() throws IOException, ServletException {
        String pathToFile = "/" + NAME;
        addStreamContent(pathToFile);
        when(httpServletRequest.getRequestURI()).thenReturn(STREAM_REQUEST_URI);

        resourceServlet.doGet(httpServletRequest, httpServletResponse);
        verify(httpServletResponse).setStatus(HttpServletResponse.SC_OK);
        verify(httpServletResponse).setHeader("Content-Type", "audio/x-wav");
        verify(httpServletResponse).setHeader("Accept-Ranges", "bytes");
        verify(httpServletResponse).setContentLength(240044); // Length of the wav file
        verify(servletOutputStream).flush();
        verify(servletOutputStream).close();
    }

    @Test
    public void shouldGetStringContent() throws IOException, ServletException {
        addStringContent("stringContent");
        when(httpServletRequest.getRequestURI()).thenReturn(STRING_REQUEST_URI);
        when(httpServletResponse.getWriter()).thenReturn(printWriter);

        resourceServlet.doGet(httpServletRequest, httpServletResponse);
        verify(httpServletResponse).setStatus(HttpServletResponse.SC_OK);
        verify(httpServletResponse).setHeader("Content-Type", "text/plain");
        verify(httpServletResponse).setContentLength(13); // Length of the string text
        verify(printWriter).print("stringContent");
        verify(printWriter).flush();
        verify(printWriter).close();
    }

    private void addStringContent(String stringValue) {
        StringContent stringContent = new StringContent(LANGUAGE, NAME, FORMAT, stringValue);
        try {
            allStringContents.addContent(stringContent);
        } catch (CMSLiteException e) {
            e.printStackTrace();
            fail();
        }
    }

    private void addStreamContent(String pathToFile) {
        InputStream inputStreamToResource = this.getClass().getResourceAsStream(pathToFile);
        try {
            StreamContent streamContent = new StreamContent(LANGUAGE, NAME, FORMAT, inputStreamToResource, "checksum", "audio/x-wav");
            allStreamContents.addContent(streamContent);
        } catch (CMSLiteException e) {
            e.printStackTrace();
            fail();
        }
    }
}
