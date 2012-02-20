package org.motechproject.sms.api.service;


import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.motechproject.context.EventContext;
import org.motechproject.event.EventRelay;
import org.motechproject.model.MotechEvent;
import org.motechproject.sms.api.MessageSplitter;
import org.motechproject.sms.api.constants.EventKeys;
import org.powermock.api.mockito.PowerMockito;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static junit.framework.Assert.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest(EventContext.class)
public class SmsServiceImplTest {

    @Mock
    private EventContext eventContext;
    @Mock
    private EventRelay eventRelay;

    private SmsService smsService;

    @Before
    public void setup() {
        initMocks(this);

        PowerMockito.mockStatic(EventContext.class);
        when(EventContext.getInstance()).thenReturn(eventContext);
        when(eventContext.getEventRelay()).thenReturn(eventRelay);

        smsService = new SmsServiceImpl(new MessageSplitter());
    }

    @Test
    public void shouldRaiseASendSmsEventWithMessageAndRecipient() {
        smsService.sendSMS("9876543210", "This is a test message");

        ArgumentCaptor<MotechEvent> motechEventArgumentCaptor = ArgumentCaptor.forClass(MotechEvent.class);
        verify(eventRelay).sendEventMessage(motechEventArgumentCaptor.capture());

        MotechEvent eventMessageSent = motechEventArgumentCaptor.getValue();
        assertEquals("This is a test message", (String) eventMessageSent.getParameters().get(EventKeys.MESSAGE));
        assertEquals(Arrays.asList("9876543210"), eventMessageSent.getParameters().get(EventKeys.RECIPIENTS));
    }

    @Test
    public void shouldRaiseASendSmsEventWithMessageMulitpleRecipients() {
        ArrayList<String> recipients = new ArrayList<String>() {{
            add("123");
            add("456");
            add("789");
        }};
        smsService.sendSMS(recipients, "This is a test message");

        ArgumentCaptor<MotechEvent> motechEventArgumentCaptor = ArgumentCaptor.forClass(MotechEvent.class);
        verify(eventRelay).sendEventMessage(motechEventArgumentCaptor.capture());

        MotechEvent eventMessageSent = motechEventArgumentCaptor.getValue();
        assertEquals("This is a test message", (String) eventMessageSent.getParameters().get(EventKeys.MESSAGE));
        assertEquals(recipients, eventMessageSent.getParameters().get(EventKeys.RECIPIENTS));
    }

    @Test
    public void shouldRaiseASendSmsEventWithMessageAndRecipientAndScheduledDeliveryTime() {
        smsService.sendSMS("123", "This is a test message", new DateTime(2011, 12, 23, 13, 50, 0, 0));

        ArgumentCaptor<MotechEvent> motechEventArgumentCaptor = ArgumentCaptor.forClass(MotechEvent.class);
        verify(eventRelay).sendEventMessage(motechEventArgumentCaptor.capture());

        MotechEvent eventMessageSent = motechEventArgumentCaptor.getValue();
        assertEquals("This is a test message", (String) eventMessageSent.getParameters().get(EventKeys.MESSAGE));
        assertEquals(Arrays.asList("123"), eventMessageSent.getParameters().get(EventKeys.RECIPIENTS));
        assertEquals(new DateTime(2011, 12, 23, 13, 50, 0, 0), eventMessageSent.getParameters().get(EventKeys.DELIVERY_TIME));
    }

    @Test
    public void shouldRaiseASendSmsEventWithMessageAndMultipleRecipientsAndScheduledDeliveryTime() {
        ArrayList<String> recipients = new ArrayList<String>() {{
            add("123");
            add("456");
            add("789");
        }};
        smsService.sendSMS(recipients, "This is a test message", new DateTime(2011, 12, 23, 13, 50, 0, 0));

        ArgumentCaptor<MotechEvent> motechEventArgumentCaptor = ArgumentCaptor.forClass(MotechEvent.class);
        verify(eventRelay).sendEventMessage(motechEventArgumentCaptor.capture());

        MotechEvent eventMessageSent = motechEventArgumentCaptor.getValue();
        assertEquals("This is a test message", (String) eventMessageSent.getParameters().get(EventKeys.MESSAGE));
        assertEquals(recipients, eventMessageSent.getParameters().get(EventKeys.RECIPIENTS));
        assertEquals(new DateTime(2011, 12, 23, 13, 50, 0, 0), eventMessageSent.getParameters().get(EventKeys.DELIVERY_TIME));
    }

    @Test
    public void shouldRaiseTwoEventsIfMessageLengthIs170() {
        smsService.sendSMS("123", "This is a 160+ characters long message. All documentation is kept in javadocs because it guarantees consistency between what is on the web and what is in the source code.", new DateTime(2011, 12, 23, 13, 50, 0, 0));

        ArgumentCaptor<MotechEvent> motechEventArgumentCaptor = ArgumentCaptor.forClass(MotechEvent.class);
        verify(eventRelay, times(2)).sendEventMessage(motechEventArgumentCaptor.capture());

        List<MotechEvent> events = motechEventArgumentCaptor.getAllValues();
        assertEquals("Msg 1 of 2: This is a 160+ characters long message. All documentation is kept in javadocs because it guarantees consistency between what is on the web and wh...", events.get(0).getParameters().get(EventKeys.MESSAGE));
        assertEquals("Msg 2 of 2: at is in the source code.", events.get(1).getParameters().get(EventKeys.MESSAGE));
    }
}
