package org.motechproject.sms.http;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpMethod;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.motechproject.model.MotechEvent;
import org.motechproject.sms.api.constants.EventKeys;
import org.motechproject.sms.api.constants.EventSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Properties;

import static junit.framework.Assert.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/applicationSmsHttp.xml"})
public class SmsSendByHttpIT {

    private SmsSendHandler smsSendHandler;

    @Autowired
    private TemplateReader templateReader;
    @Autowired
    private Properties properties;
    @Mock
    private HttpClient mockHttpClient;
    @Autowired
    private HttpClient httpClient;

    @Before
    public void setup() {
        initMocks(this);
    }

    @Test
    public void shouldUseSmsHttpTemplateFileForGeneratingRequest() throws IOException, SmsDeliveryFailureException {
        smsSendHandler = new SmsSendHandler(templateReader, mockHttpClient, properties);

        MotechEvent motechEvent = new MotechEvent(EventSubject.SEND_SMS, new HashMap<String, Object>() {{
            put(EventKeys.RECIPIENTS, Arrays.asList("123", "456"));
            put(EventKeys.MESSAGE, "foobar");
        }});
        smsSendHandler.handle(motechEvent);

        ArgumentCaptor<HttpMethod> argumentCaptor = ArgumentCaptor.forClass(HttpMethod.class);
        verify(mockHttpClient).executeMethod(argumentCaptor.capture());
        assertEquals("http://smshost.com/sms/send?recipients=123+456&message=foobar", argumentCaptor.getValue().getURI().getURI());
    }

    @Test
    @Ignore("use template for kookoo in sms-http-template.json")
    public void shouldSendSmsThroughKookoo() throws IOException, SmsDeliveryFailureException {
        smsSendHandler = new SmsSendHandler(templateReader, httpClient, properties);

        MotechEvent motechEvent = new MotechEvent(EventSubject.SEND_SMS, new HashMap<String, Object>() {{
            put(EventKeys.RECIPIENTS, Arrays.asList("9686202448"));
            put(EventKeys.MESSAGE, "business analyst");
        }});
        smsSendHandler.handle(motechEvent);
    }
}
