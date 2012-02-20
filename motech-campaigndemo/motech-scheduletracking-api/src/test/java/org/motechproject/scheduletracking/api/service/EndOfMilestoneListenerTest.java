package org.motechproject.scheduletracking.api.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.motechproject.model.MotechEvent;
import org.motechproject.model.Time;
import org.motechproject.scheduletracking.api.domain.Enrollment;
import org.motechproject.scheduletracking.api.events.DefaultmentCaptureEvent;
import org.motechproject.scheduletracking.api.repository.AllEnrollments;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.motechproject.scheduletracking.api.utility.DateTimeUtil.weeksAgo;

public class EndOfMilestoneListenerTest {

    private EndOfMilestoneListener endOfMilestoneListener;

    @Mock
    private AllEnrollments allEnrollments;

    @Before
    public void setup() {
        initMocks(this);
        endOfMilestoneListener = new EndOfMilestoneListener(allEnrollments);
    }

    @Test
    public void shouldDefaultEnrollmentAtTheCurrentMilestoneIfNotFulfilled() {
        Enrollment enrollment = new Enrollment("entity_1", "my_schedule", "first_milestone", weeksAgo(4), weeksAgo(4), new Time(8, 10));
        enrollment.setId("enrollment_1");
        when(allEnrollments.get("enrollment_1")).thenReturn(enrollment);

        MotechEvent event = new DefaultmentCaptureEvent("enrollment_1", "job_id").toMotechEvent();
        endOfMilestoneListener.handle(event);
        verify(allEnrollments).update(enrollment);
    }
}
