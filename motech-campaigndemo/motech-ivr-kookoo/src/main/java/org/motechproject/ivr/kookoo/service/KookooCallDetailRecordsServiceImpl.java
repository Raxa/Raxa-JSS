package org.motechproject.ivr.kookoo.service;

import org.apache.commons.lang.StringUtils;
import org.motechproject.context.EventContext;
import org.motechproject.event.EventRelay;
import org.motechproject.ivr.event.CallEvent;
import org.motechproject.ivr.event.IVREvent;
import org.motechproject.ivr.kookoo.KookooIVRResponseBuilder;
import org.motechproject.ivr.kookoo.domain.KookooCallDetailRecord;
import org.motechproject.ivr.kookoo.eventlogging.CallEventConstants;
import org.motechproject.ivr.kookoo.repository.AllKooKooCallDetailRecords;
import org.motechproject.ivr.model.CallDetailRecord;
import org.motechproject.ivr.model.CallDirection;
import org.motechproject.model.MotechEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class KookooCallDetailRecordsServiceImpl implements KookooCallDetailRecordsService {

    private AllKooKooCallDetailRecords allKooKooCallDetailRecords;
    private AllKooKooCallDetailRecords allCallDetailRecords;
    private EventRelay eventRelay;

    public static final String CLOSE_CALL_SUBJECT = "close_call";
    public static final String CALL_ID = "call_id";
    public static final String EXTERNAL_ID = "external_id";

    @Autowired
    public KookooCallDetailRecordsServiceImpl(AllKooKooCallDetailRecords allKooKooCallDetailRecords, AllKooKooCallDetailRecords allCallDetailRecords) {
        this.allKooKooCallDetailRecords = allKooKooCallDetailRecords;
        this.allCallDetailRecords = allCallDetailRecords;
        this.eventRelay = EventContext.getInstance().getEventRelay();
    }

    public KookooCallDetailRecord get(String callDetailRecordId) {
        return allKooKooCallDetailRecords.get(callDetailRecordId);
    }

    public String create(String vendorCallId, String callerId, CallDirection callDirection) {
        CallDetailRecord callDetailRecord = CallDirection.Inbound.equals(callDirection) ? CallDetailRecord.newIncomingCallRecord(callerId) :
                CallDetailRecord.newOutgoingCallRecord(callerId);
        KookooCallDetailRecord kookooCallDetailRecord = new KookooCallDetailRecord(callDetailRecord, vendorCallId);
        kookooCallDetailRecord.addCallEvent(new CallEvent(IVREvent.NewCall.toString()));
        allCallDetailRecords.add(kookooCallDetailRecord);
        return kookooCallDetailRecord.getId();
    }

    @Override
    public void appendEvent(String callDetailRecordId, IVREvent callEvent, String userInput) {
        if (IVREvent.GotDTMF.equals(callEvent) && StringUtils.isEmpty(userInput)) return;

        KookooCallDetailRecord kookooCallDetailRecord = appendToCallDetailRecord(callDetailRecordId, callEvent);
        if (!StringUtils.isEmpty(userInput)) {
            kookooCallDetailRecord.appendToLastEvent(CallEventConstants.DTMF_DATA, userInput);
        }
        allKooKooCallDetailRecords.update(kookooCallDetailRecord);
    }

    private KookooCallDetailRecord appendToCallDetailRecord(String callDetailRecordId, IVREvent ivrEvent) {
        KookooCallDetailRecord callDetailRecord = get(callDetailRecordId);
        CallEvent callEvent = new CallEvent(ivrEvent.toString());
        callDetailRecord.addCallEvent(callEvent);
        return callDetailRecord;
    }

    @Override
    public void appendToLastCallEvent(String callDetailRecordID, KookooIVRResponseBuilder ivrResponseBuilder, String response) {
        KookooCallDetailRecord callDetailRecord = get(callDetailRecordID);
        if (ivrResponseBuilder.isEmpty()) return;
        callDetailRecord.appendToLastEvent(CallEventConstants.CUSTOM_DATA_LIST, response);
        allKooKooCallDetailRecords.update(callDetailRecord);
    }

    @Override
    public void close(String callDetailRecordId, String externalId, IVREvent event) {
        KookooCallDetailRecord kookooCallDetailRecord = appendToCallDetailRecord(callDetailRecordId, event);
        kookooCallDetailRecord.close();
        allKooKooCallDetailRecords.update(kookooCallDetailRecord);
        raiseCloseCallEvent(callDetailRecordId, externalId);
    }

    private void raiseCloseCallEvent(String callDetailRecordId, String externalId) {
        Map<String, Object> data = new HashMap<String, Object>();
        data.put(CALL_ID, callDetailRecordId);
        data.put(EXTERNAL_ID, externalId);
        eventRelay.sendEventMessage(new MotechEvent(CLOSE_CALL_SUBJECT, data));
    }
}
