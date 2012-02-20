package org.motechproject.scheduletracking.api.events;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.motechproject.model.MotechEvent;
import org.motechproject.scheduletracking.api.events.constants.EventDataKey;
import org.motechproject.scheduletracking.api.events.constants.EventSubject;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class MilestoneEvent {

    private String windowName;
    private String milestoneName;
    private String scheduleName;
    private String externalId;
    private DateTime referenceDate;

    private Map<String, String> data = new HashMap<String, String>();

    public MilestoneEvent(String externalId, String scheduleName, String milestoneName, String windowName, DateTime referenceDate) {
        this.scheduleName = scheduleName;
        this.milestoneName = milestoneName;
        this.windowName = windowName;
        this.externalId = externalId;
        this.referenceDate = referenceDate;
    }

    public MilestoneEvent(MotechEvent motechEvent) {
        this.scheduleName = (String) motechEvent.getParameters().get(EventDataKey.SCHEDULE_NAME);
        this.milestoneName = (String) motechEvent.getParameters().get(EventDataKey.MILESTONE_NAME);
        this.windowName = (String) motechEvent.getParameters().get(EventDataKey.WINDOW_NAME);
        this.externalId = (String) motechEvent.getParameters().get(EventDataKey.EXTERNAL_ID);
        this.referenceDate = (DateTime) motechEvent.getParameters().get(EventDataKey.REFERENCE_DATE);
    }

    public MotechEvent toMotechEvent() {
        HashMap<String, Object> parameters = new HashMap<String, Object>();
        parameters.put(EventDataKey.WINDOW_NAME, windowName);
        parameters.put(EventDataKey.MILESTONE_NAME, milestoneName);
        parameters.put(EventDataKey.SCHEDULE_NAME, scheduleName);
        parameters.put(EventDataKey.EXTERNAL_ID, externalId);
        parameters.put(EventDataKey.REFERENCE_DATE, referenceDate);
        Set<Map.Entry<String,String>> entries = data.entrySet();
        for (Map.Entry<String,String> entry : entries)
            parameters.put(entry.getKey(), entry.getValue());
        return new MotechEvent(EventSubject.MILESTONE_ALERT, parameters);
    }

    public String getWindowName() {
        return windowName;
    }

    public String getMilestoneName() {
        return milestoneName;
    }

    public String getScheduleName() {
        return scheduleName;
    }

    public String getExternalId() {
        return externalId;
    }

    public DateTime getReferenceDate() {
        return referenceDate;
    }

    public Map<String, String> getData() {
        return data;
    }
}
