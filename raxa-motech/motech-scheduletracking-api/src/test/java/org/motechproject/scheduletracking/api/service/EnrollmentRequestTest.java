package org.motechproject.scheduletracking.api.service;

import org.joda.time.LocalDate;
import org.junit.Test;
import org.motechproject.model.Time;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class EnrollmentRequestTest {
    @Test
    public void shouldReturnFalseIfStartingMilestoneNotProvided() {
        EnrollmentRequest enrollmentRequest = new EnrollmentRequest("externalId", "scheduleName", new Time(10, 10), LocalDate.now());
        assertFalse("Starting milestone not expected, but was provided!", enrollmentRequest.enrollIntoMilestone());
    }

    @Test
    public void shouldReturnTrueIfStartingMilestoneProvided() {
        EnrollmentRequest enrollmentRequest = new EnrollmentRequest("externalId", "scheduleName", new Time(10, 10), LocalDate.now(), "Milestone");
        assertTrue("Starting milestone expected, but was not provided!", enrollmentRequest.enrollIntoMilestone());
    }

    @Test
    public void shouldReturnFalseIfEmptyStartingMilestoneProvided() {
        EnrollmentRequest enrollmentRequest = new EnrollmentRequest("externalId", "scheduleName", new Time(10, 10), LocalDate.now(), "");
        assertFalse("Starting milestone not expected, but was provided!", enrollmentRequest.enrollIntoMilestone());
    }

    @Test
    public void shouldReturnFalseIfNullStartingMilestoneProvided() {
        EnrollmentRequest enrollmentRequest = new EnrollmentRequest("externalId", "scheduleName", new Time(10, 10), LocalDate.now(), null);
        assertFalse("Starting milestone not expected, but was provided!", enrollmentRequest.enrollIntoMilestone());
    }

}
