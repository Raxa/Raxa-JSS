package org.motechproject.scheduletracking.api.events.constants;

public class EventSubject {

    public static final String BASE_SUBJECT = "org.motechproject.scheduletracking.api.";
    public static final String MILESTONE_ALERT = BASE_SUBJECT + "milestone.alert";
    public static final String DEFAULTMENT_CAPTURE = BASE_SUBJECT + "defaultment.capture";

    private EventSubject() {
	}
}
