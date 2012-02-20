package org.motechproject.scheduletracking.api.service;

public interface ScheduleTrackingService {
    void enroll(EnrollmentRequest enrollmentRequest);
    void fulfillCurrentMilestone(String externalId, String scheduleName);
    void unenroll(String externalId, String scheduleName);
}
