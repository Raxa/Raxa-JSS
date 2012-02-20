package org.motechproject.ivr.kookoo.service;

import org.motechproject.ivr.event.IVREvent;
import org.motechproject.ivr.kookoo.KookooIVRResponseBuilder;
import org.motechproject.ivr.kookoo.domain.KookooCallDetailRecord;
import org.motechproject.ivr.model.CallDirection;

public interface KookooCallDetailRecordsService {
    public KookooCallDetailRecord get(String callDetailRecordId);
    public String create(String vendorCallId, String callerId, CallDirection callDirection);
    public void appendEvent(String callDetailRecordId, IVREvent callEvent, String userInput);
    public void close(String callDetailRecordId, String externalId, IVREvent event);
    void appendToLastCallEvent(String callDetailRecordID, KookooIVRResponseBuilder ivrResponseBuilder, String response);
}
