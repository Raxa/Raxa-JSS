package org.motechproject.server.messagecampaign.builder;

import org.motechproject.server.messagecampaign.EventKeys;

import java.util.HashMap;

public class SchedulerPayloadBuilder {
    private HashMap<String, Object> params = new HashMap();

    public HashMap payload() {
        return params;
    }

    public SchedulerPayloadBuilder withJobId(String id) {
        params.put(EventKeys.SCHEDULE_JOB_ID_KEY, id);
        return this;
    }

    public SchedulerPayloadBuilder withCampaignName(String name) {
        params.put(EventKeys.CAMPAIGN_NAME_KEY, name);
        return this;
    }

    public SchedulerPayloadBuilder withExternalId(String id) {
        params.put(EventKeys.EXTERNAL_ID_KEY, id);
        return this;
    }

    public SchedulerPayloadBuilder withMessageKey(String messageKey) {
        params.put(EventKeys.MESSAGE_KEY, messageKey);
        return this;
    }
}
