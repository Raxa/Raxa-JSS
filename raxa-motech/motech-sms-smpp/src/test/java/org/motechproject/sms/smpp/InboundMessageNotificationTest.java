package org.motechproject.sms.smpp;

import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.motechproject.event.EventRelay;
import org.motechproject.model.MotechEvent;
import org.motechproject.sms.smpp.constants.EventSubject;
import org.smslib.AGateway;
import org.smslib.InboundMessage;
import org.smslib.Message;

import static junit.framework.Assert.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.motechproject.sms.smpp.constants.EventDataKey.*;

public class InboundMessageNotificationTest {
    private InboundMessageNotification inboundMessageNotification;

    @Mock
    EventRelay eventRelay;
	@Mock
	AGateway gateway;

    @Before
    public void setup() {
        initMocks(this);
        inboundMessageNotification = new InboundMessageNotification(eventRelay);
    }

    @Test
    public void shouldNotRespondToNonInboundMessages() {
	    int dontCare = 0;
	    InboundMessage message = new InboundMessage(new DateTime(2011, 11, 23, 10, 20, 0, 0).toDate(), "sender", "yoohoo", dontCare, null);
        inboundMessageNotification.process(gateway, Message.MessageTypes.STATUSREPORT, message);

        verify(eventRelay, times(0)).sendEventMessage(Matchers.<MotechEvent>any());
    }

    @Test
    public void shouldRaiseEventWhenAnInboundSmsIsReceived() {
	    int dontCare = 0;
	    InboundMessage message = new InboundMessage(new DateTime(2011, 11, 23, 10, 20, 0, 0).toDate(), "sender", "yoohoo", dontCare, null);
        inboundMessageNotification.process(gateway, Message.MessageTypes.INBOUND, message);

        ArgumentCaptor<MotechEvent> eventCaptor = ArgumentCaptor.forClass(MotechEvent.class);
        verify(eventRelay).sendEventMessage(eventCaptor.capture());

        MotechEvent event = eventCaptor.getValue();
        assertEquals(EventSubject.INBOUND_SMS, event.getSubject());
        assertEquals("sender", event.getParameters().get(SENDER));
        assertEquals("yoohoo", event.getParameters().get(INBOUND_MESSAGE));
        assertEquals(new DateTime(2011, 11, 23, 10, 20, 0, 0), event.getParameters().get(TIMESTAMP));
    }
}
