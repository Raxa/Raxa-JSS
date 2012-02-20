package org.motechproject.scheduler.domain;

import org.motechproject.model.MotechEvent;
import org.motechproject.scheduler.MotechSchedulerService;

public class JobId {
    public static final String REPEAT_JOB_SUFFIX = "-repeat";

    private String subject;
    private String id;

    public JobId(String subject, String id) {
        this.subject = subject;
        this.id = id;
    }

    public JobId(MotechEvent motechEvent) {
        this(motechEvent.getSubject(), (String) motechEvent.getParameters().get(MotechSchedulerService.JOB_ID_KEY));
    }

    public String value() {
        return String.format("%s-%s", subject, id);
    }

    @Override
    public String toString() {
        return value();
    }

    public String repeatingId() {
        return value() + REPEAT_JOB_SUFFIX;
    }
}
