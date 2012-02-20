package org.motechproject.server.event;

import org.motechproject.model.MotechEvent;
import org.motechproject.server.event.annotations.MotechListener;
import org.springframework.stereotype.Component;

@Component
public class EventHandlerForServerEventRelayTransactionIT {
    public static final String FAILING_EVENT_SUBJECT = "FailingEventSubject";
    public static final String SUCCESSFUL_EVENT_SUBJECT = "SuccessfulEventSubject";

    private boolean doThrowException;
    private int retries;

    public EventHandlerForServerEventRelayTransactionIT setupForFailure(boolean doThrowException) {
        this.doThrowException = doThrowException;
        retries = 0;
        return this;
    }

    @MotechListener(subjects = {FAILING_EVENT_SUBJECT})
    public void canFail(MotechEvent motechEvent) {
        retries++;
        if (doThrowException) throw new RuntimeException();
    }

    public int retries() {
        return retries;
    }

    @MotechListener(subjects = {SUCCESSFUL_EVENT_SUBJECT})
    public void wouldPass(MotechEvent motechEvent) {
    }
}
