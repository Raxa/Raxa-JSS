package org.motechproject.sms.api.service;

import org.apache.log4j.Logger;
import org.joda.time.DateTime;
import org.motechproject.context.EventContext;
import org.motechproject.event.EventRelay;
import org.motechproject.model.MotechEvent;
import org.motechproject.sms.api.MessageSplitter;
import org.motechproject.sms.api.constants.EventKeys;
import org.motechproject.sms.api.constants.EventSubject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

@Service
public class SmsServiceImpl implements SmsService {

    private EventRelay eventRelay;
    private MessageSplitter messageSplitter;
    private static final Logger log = Logger.getLogger(SmsServiceImpl.class);

    private static final int PART_MESSAGE_SIZE = 160;
	private static final String PART_MESSAGE_HEADER_TEMPLATE = "Msg %d of %d: ";
	private static final String PART_MESSAGE_FOOTER = "...";

    @Autowired
    public SmsServiceImpl(MessageSplitter messageSplitter) {
        this.messageSplitter = messageSplitter;
        this.eventRelay = EventContext.getInstance().getEventRelay();
	}

	@Override
	public void sendSMS(String recipient, String message) {
		raiseSendSmsEvent(Arrays.asList(recipient), message, null);
	}

	@Override
	public void sendSMS(List<String> recipients, String message) {
		raiseSendSmsEvent(recipients, message, null);
	}

	@Override
	public void sendSMS(String recipient, String message, DateTime deliveryTime) {
		raiseSendSmsEvent(Arrays.asList(recipient), message, deliveryTime);
	}

	@Override
	public void sendSMS(ArrayList<String> recipients, String message, DateTime deliveryTime) {
		raiseSendSmsEvent(recipients, message, deliveryTime);
	}

	private void raiseSendSmsEvent(final List<String> recipients, final String message, final DateTime deliveryTime) {
        for (String partMessage : messageSplitter.split(message, PART_MESSAGE_SIZE, PART_MESSAGE_HEADER_TEMPLATE, PART_MESSAGE_FOOTER)) {
            log.info(String.format("Putting event on relay to send message %s to number %s", partMessage, recipients));
            HashMap<String, Object> parameters = new HashMap<String, Object>();
            parameters.put(EventKeys.RECIPIENTS, recipients);
            parameters.put(EventKeys.MESSAGE, partMessage);
            parameters.put(EventKeys.DELIVERY_TIME, deliveryTime);
            eventRelay.sendEventMessage(new MotechEvent(EventSubject.SEND_SMS, parameters));
        }
	}
}