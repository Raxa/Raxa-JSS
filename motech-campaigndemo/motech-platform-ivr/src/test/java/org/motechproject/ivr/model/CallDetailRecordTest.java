package org.motechproject.ivr.model;

import org.junit.Test;
import org.motechproject.ivr.event.CallEvent;
import org.motechproject.ivr.model.CallDetailRecord;

import static junit.framework.Assert.assertEquals;

public class CallDetailRecordTest {
    @Test
    public void lastCallEvent() {
        CallDetailRecord callDetailRecord = CallDetailRecord.newIncomingCallRecord("43435");
        assertEquals(null, callDetailRecord.lastCallEvent());
        String eventName = "Foo";
        callDetailRecord.addCallEvent(new CallEvent(eventName));
        assertEquals(eventName, callDetailRecord.lastCallEvent().getName());
    }
}
