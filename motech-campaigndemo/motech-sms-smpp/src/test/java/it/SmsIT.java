package it;

import org.joda.time.DateTime;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.motechproject.event.EventRelay;
import org.motechproject.model.MotechEvent;
import org.motechproject.sms.api.constants.EventKeys;
import org.motechproject.sms.api.constants.EventSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Arrays;
import java.util.HashMap;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:testApplicationSmsSmpp.xml"})
public class SmsIT {

    @Autowired
    private EventRelay eventRelay;

    @Test
    @Ignore("run with smpp simulator; config in smpp.properties")
    public void shouldSendSms() throws Exception {
        HashMap<String, Object> data = new HashMap<String, Object>();
        data.put(EventKeys.RECIPIENTS, Arrays.asList("*-/*-/-!@#@"));
        data.put(EventKeys.MESSAGE, "goo bar");
        data.put(EventKeys.DELIVERY_TIME, DateTime.now().plusMinutes(1));

        eventRelay.sendEventMessage(new MotechEvent(EventSubject.SEND_SMS, data));
	    Thread.sleep(100000000);
    }
}