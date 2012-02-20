package org.motechproject.scheduletracking.api.domain;

public class ScheduleTrackingException extends RuntimeException {
	private static final long serialVersionUID = -2008327669924952744L;

	public ScheduleTrackingException(String s, String ... args) {
        super(String.format(s, args));
    }
}
