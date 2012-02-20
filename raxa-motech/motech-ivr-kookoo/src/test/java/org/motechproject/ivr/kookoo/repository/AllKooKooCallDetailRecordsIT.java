package org.motechproject.ivr.kookoo.repository;

import org.ektorp.CouchDbConnector;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.motechproject.ivr.event.CallEvent;
import org.motechproject.ivr.event.IVREvent;
import org.motechproject.ivr.kookoo.domain.KookooCallDetailRecord;
import org.motechproject.ivr.model.CallDetailRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import static org.junit.Assert.assertNotNull;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/ivrKookooRepositories.xml"})
public class AllKooKooCallDetailRecordsIT {

    @Autowired
    private AllKooKooCallDetailRecords allKooKooCallDetailRecords;

    @Autowired
    @Qualifier("kookooIvrDbConnector")
    private CouchDbConnector ivrKookooCouchDbConnector;

    @Test
    public void shouldFindCallDetailRecordByCallId() {
        CallDetailRecord callDetailRecord = CallDetailRecord.newIncomingCallRecord("phoneNumber");
        CallEvent callEvent = new CallEvent(IVREvent.GotDTMF.toString());
        callEvent.appendData(IVREvent.GotDTMF.toString(), "1234");
        callDetailRecord.addCallEvent(callEvent);
        KookooCallDetailRecord kookooCallDetailRecord = new KookooCallDetailRecord(callDetailRecord, "dfdsfds");
        allKooKooCallDetailRecords.add(kookooCallDetailRecord);
        KookooCallDetailRecord result = allKooKooCallDetailRecords.get(kookooCallDetailRecord.getId());
        assertNotNull(result);
        ivrKookooCouchDbConnector.delete(kookooCallDetailRecord);
    }
}
