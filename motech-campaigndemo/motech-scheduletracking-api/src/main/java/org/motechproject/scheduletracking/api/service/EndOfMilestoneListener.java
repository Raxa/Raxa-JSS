package org.motechproject.scheduletracking.api.service;

import org.motechproject.model.MotechEvent;
import org.motechproject.scheduletracking.api.domain.Enrollment;
import org.motechproject.scheduletracking.api.events.DefaultmentCaptureEvent;
import org.motechproject.scheduletracking.api.events.constants.EventSubject;
import org.motechproject.scheduletracking.api.repository.AllEnrollments;
import org.motechproject.server.event.annotations.MotechListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EndOfMilestoneListener {

    private AllEnrollments allEnrollments;

    @Autowired
    public EndOfMilestoneListener(AllEnrollments allEnrollments) {
        this.allEnrollments = allEnrollments;
    }

    @MotechListener(subjects = EventSubject.DEFAULTMENT_CAPTURE)
    public void handle(MotechEvent motechEvent) {
        DefaultmentCaptureEvent event = new DefaultmentCaptureEvent(motechEvent);
        Enrollment enrollment = allEnrollments.get(event.getEnrollmentId());
        enrollment.setStatus(Enrollment.EnrollmentStatus.Defaulted);
        allEnrollments.update(enrollment);
    }
}
