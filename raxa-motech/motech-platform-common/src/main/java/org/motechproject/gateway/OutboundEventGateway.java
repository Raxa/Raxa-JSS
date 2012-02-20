package org.motechproject.gateway;

import org.motechproject.model.MotechEvent;

public interface OutboundEventGateway {
	
    /**
     * Sends the given MotechEvent message as a payload to the message channel
     *  defined in the Spring Integration configuration file.
     *
     * @param motechEvent
     */
    public void sendEventMessage(MotechEvent motechEvent);
}
