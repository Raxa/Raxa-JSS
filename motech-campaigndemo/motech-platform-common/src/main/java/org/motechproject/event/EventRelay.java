package org.motechproject.event;

import org.motechproject.model.MotechEvent;

public interface EventRelay
{
    public void sendEventMessage(MotechEvent motechEvent);
}
