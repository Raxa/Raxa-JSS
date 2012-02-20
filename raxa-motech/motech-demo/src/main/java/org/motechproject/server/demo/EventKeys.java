package org.motechproject.server.demo;

import org.motechproject.model.MotechEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 */
public class EventKeys
{
	private final static Logger log = LoggerFactory.getLogger("org.motechproject.server.demo");

    public final static String PHONE_KEY = "PhoneNumber";

    public final static String BASE_SUBJECT = "org.motechproject.server.demo.";

    public final static String CALL_EVENT_SUBJECT = BASE_SUBJECT + "call";

    public static String getPhoneNumber(MotechEvent event)
    {
        return getStringValue(event, EventKeys.PHONE_KEY);
    }

    public static String getStringValue(MotechEvent event, String key)
    {
        String ret = null;
        try {
            ret = (String) event.getParameters().get(key);
        } catch (ClassCastException e) {
            log.warn("Event: " + event + " Key: " + key + " is not a String");
        }

        return ret;
    }
}
