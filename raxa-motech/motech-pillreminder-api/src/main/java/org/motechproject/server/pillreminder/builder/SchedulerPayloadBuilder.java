package org.motechproject.server.pillreminder.builder;

import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.server.pillreminder.EventKeys;

import java.util.HashMap;

public class SchedulerPayloadBuilder {
    private HashMap<String, Object> params = new HashMap<String, Object>();

    public SchedulerPayloadBuilder withJobId(String id) {
        params.put(MotechSchedulerService.JOB_ID_KEY, id);
        return this;
    }

    public SchedulerPayloadBuilder withDosageId(String id) {
        params.put(EventKeys.DOSAGE_ID_KEY, id);
        return this;
    }

    public SchedulerPayloadBuilder withExternalId(String id) {
        params.put(EventKeys.EXTERNAL_ID_KEY, id);
        return this;
    }

    public HashMap<String, Object> payload() {
        return params;
    }
}
