package org.motechproject.sms.http;

import org.junit.Test;

import java.util.Map;

import static junit.framework.Assert.assertEquals;
import static org.springframework.test.util.ReflectionTestUtils.getField;

public class TemplateReaderTest {

    @Test
    public void shouldReadFromTemplate() {
        TemplateReader templateReader = new TemplateReader();
        SmsSendTemplate smsSendTemplate = templateReader.getTemplate("/sample-template.json");

        SmsSendTemplate.Request request = (SmsSendTemplate.Request) getField(smsSendTemplate, "request");
        assertEquals("http://smshost.com/sms/send", (String) getField(request, "urlPath"));

        Map<String, String> queryParameters = (Map<String, String>) getField(request, "queryParameters");
        assertEquals("$message", queryParameters.get("message"));

        SmsSendTemplate.Response response = (SmsSendTemplate.Response) getField(smsSendTemplate, "response");
        assertEquals("sent", (String) getField(response, "success"));
    }

}
