package org.motechproject.ivr.kookoo.domain;

import org.joda.time.DateTime;
import org.junit.Test;
import org.motechproject.ivr.model.CallDetailRecord;
import org.motechproject.ivr.event.CallEvent;
import org.motechproject.util.DateUtil;

import static junit.framework.Assert.assertEquals;

public class KookooCallDetailRecordTest {
    @Test
    public void appendToLastEvent() {
        DateTime now = DateUtil.now();
        CallDetailRecord callDetailRecord = new CallDetailRecord(now.minusMinutes(2).toDate(), now.toDate(), now.minusMinutes(1).toDate(), CallDetailRecord.Disposition.ANSWERED, 60);
        KookooCallDetailRecord kookooCallDetailRecord = new KookooCallDetailRecord(callDetailRecord, "dfdsf");
        CallEvent callEvent = new CallEvent("NewCall");
        kookooCallDetailRecord.addCallEvent(callEvent);
        String customDataKey = "foo";
        String customDataValue = "bar";
        kookooCallDetailRecord.appendToLastEvent(customDataKey, customDataValue);
        assertEquals(1, callEvent.getData().getAll(customDataKey).size());
    }
}
