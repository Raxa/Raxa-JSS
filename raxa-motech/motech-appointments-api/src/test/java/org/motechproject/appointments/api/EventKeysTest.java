package org.motechproject.appointments.api;

import org.junit.Test;
import org.motechproject.appointments.api.EventKeys;
import org.motechproject.model.MotechEvent;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;

/**
 */
public class EventKeysTest
{

    @Test
    public void testGetAppointmentId_ValidId() throws Exception {

        String appointmentId = "1a";

        Map<String, Object> params = new HashMap<String, Object>();
        params.put(EventKeys.APPOINTMENT_ID_KEY, appointmentId);

        MotechEvent motechEvent = new MotechEvent("", params);

        String _aptId = EventKeys.getAppointmentId(motechEvent);

        assertEquals(appointmentId, _aptId);
    }

    @Test
    public void testGetAppointmentId_NoId() throws Exception {

        Map<String, Object> params = new HashMap<String, Object>();

        MotechEvent motechEvent = new MotechEvent("", params);

        String _aptId = EventKeys.getAppointmentId(motechEvent);

        assertNull(_aptId);
    }

    @Test
    public void testGetAppointmentId_InvalidId() throws Exception {

        Map<String, Object> params = new HashMap<String, Object>();
        params.put(EventKeys.APPOINTMENT_ID_KEY, new Integer(0));

        MotechEvent motechEvent = new MotechEvent("", params);

        String _aptId = EventKeys.getAppointmentId(motechEvent);

        assertNull(_aptId);
    }
}
