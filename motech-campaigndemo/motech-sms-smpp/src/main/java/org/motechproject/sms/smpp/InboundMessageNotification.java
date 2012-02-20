package org.motechproject.sms.smpp;

import org.apache.log4j.Logger;
import org.joda.time.DateTime;
import org.motechproject.event.EventRelay;
import org.motechproject.model.MotechEvent;
import org.motechproject.sms.smpp.constants.EventSubject;
import org.smslib.AGateway;
import org.smslib.IInboundMessageNotification;
import org.smslib.InboundMessage;
import org.smslib.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;

import static org.motechproject.sms.smpp.constants.EventDataKey.*;

@Component
public class InboundMessageNotification implements IInboundMessageNotification {
	private static final Logger log = Logger.getLogger(InboundMessageNotification.class);
	private EventRelay eventRelay;

	@Autowired
	public InboundMessageNotification(EventRelay eventRelay) {
		this.eventRelay = eventRelay;
	}

	@Override
	public void process(AGateway gateway, Message.MessageTypes msgType, InboundMessage msg) {
		log.info(String.format("Inbound notification from (%s) with message (%s) of type (%s) received from gateway (%s)", msg.getOriginator(), msg.getText(), msgType.toString(), gateway.getGatewayId()));

		if (!msgType.equals(Message.MessageTypes.INBOUND))
			return;

		HashMap<String, Object> data = new HashMap<String, Object>();
		data.put(SENDER, msg.getOriginator());
		data.put(INBOUND_MESSAGE, msg.getText());
		data.put(TIMESTAMP, new DateTime(msg.getDate()));
		eventRelay.sendEventMessage(new MotechEvent(EventSubject.INBOUND_SMS, data));
	}
}
