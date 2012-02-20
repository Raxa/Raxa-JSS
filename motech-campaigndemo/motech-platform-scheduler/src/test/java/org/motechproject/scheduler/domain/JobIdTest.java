package org.motechproject.scheduler.domain;

import org.junit.Test;
import org.motechproject.model.MotechEvent;
import org.motechproject.scheduler.MotechSchedulerService;

import static junit.framework.Assert.assertEquals;

public class JobIdTest {
    @Test
    public void value() {
        JobId jobId = new JobId("sub1", "id1");
        assertEquals("sub1-id1", jobId.value());
    }

    @Test
    public void repeatingId() {
        JobId jobId = new JobId("sub1", "id1");
        assertEquals("sub1-id1" + JobId.REPEAT_JOB_SUFFIX, jobId.repeatingId());
    }

    @Test
    public void initializeUsingMotechEvent() {
        MotechEvent motechEvent = new MotechEvent("sub1");
        motechEvent.getParameters().put(MotechSchedulerService.JOB_ID_KEY, "id1");
        JobId jobId = new JobId(motechEvent);
        assertEquals("sub1-id1", jobId.value());
    }
}
