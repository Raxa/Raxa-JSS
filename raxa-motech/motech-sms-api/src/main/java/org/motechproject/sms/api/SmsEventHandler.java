package org.motechproject.sms.api;

import org.motechproject.model.MotechEvent;

public interface SmsEventHandler {
    public void handle(MotechEvent event) throws Exception;
}