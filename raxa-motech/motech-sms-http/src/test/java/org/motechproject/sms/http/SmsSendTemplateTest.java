package org.motechproject.sms.http;

import org.apache.commons.httpclient.URIException;
import org.junit.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static junit.framework.Assert.assertEquals;
import static org.springframework.test.util.ReflectionTestUtils.setField;

public class SmsSendTemplateTest {

    @Test
    public void shouldGenerateRequestUrl() throws URIException {
        SmsSendTemplate.Request request = new SmsSendTemplate.Request();
        setField(request, "urlPath", "http://smshost.com/sms/send");
        Map<String, String> queryParameters = new HashMap<String, String>() {{
            put("to", "sucker");
        }};
        setField(request, "queryParameters", queryParameters);
        SmsSendTemplate smsSendTemplate = new SmsSendTemplate();
        ReflectionTestUtils.setField(smsSendTemplate, "request", request);

        assertEquals("http://smshost.com/sms/send?to=sucker", smsSendTemplate.generateRequestFor(null, null).getURI().getURI());
    }

    @Test
    public void shouldReplaceMessageVariableWithValue() throws URIException {
        SmsSendTemplate.Request request = new SmsSendTemplate.Request();
        setField(request, "urlPath", "http://smshost.com/sms/send");
        Map<String, String> queryParameters = new HashMap<String, String>() {{
            put("message", "$message");
        }};
        setField(request, "queryParameters", queryParameters);
        SmsSendTemplate smsSendTemplate = new SmsSendTemplate();
        setField(smsSendTemplate, "request", request);

        assertEquals("http://smshost.com/sms/send?message=foobar", smsSendTemplate.generateRequestFor(null, "foobar").getURI().getURI());
    }

    @Test
    public void shouldReplaceReciepientsVariableWithValue() throws URIException {
        SmsSendTemplate.Request request = new SmsSendTemplate.Request();
        setField(request, "urlPath", "http://smshost.com/sms/send");
        setField(request, "recipientsSeparator", ",");
        Map<String, String> queryParameters = new HashMap<String, String>() {{
            put("recipients", "$recipients");
        }};
        setField(request, "queryParameters", queryParameters);
        SmsSendTemplate smsSendTemplate = new SmsSendTemplate();
        setField(smsSendTemplate, "request", request);

        assertEquals("http://smshost.com/sms/send?recipients=123,456,789", smsSendTemplate.generateRequestFor(Arrays.asList("123", "456", "789"), null).getURI().getURI());
    }
}
