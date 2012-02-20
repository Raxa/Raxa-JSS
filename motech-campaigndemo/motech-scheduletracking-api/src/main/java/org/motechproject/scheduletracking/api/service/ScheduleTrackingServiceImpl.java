package org.motechproject.scheduletracking.api.service;

import org.motechproject.scheduletracking.api.domain.*;
import org.motechproject.scheduletracking.api.repository.AllEnrollments;
import org.motechproject.scheduletracking.api.repository.AllTrackedSchedules;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import static org.motechproject.util.DateUtil.today;
import static org.motechproject.util.DateUtil.now;

@Component
public class ScheduleTrackingServiceImpl implements ScheduleTrackingService {

    private AllTrackedSchedules allTrackedSchedules;
    private AllEnrollments allEnrollments;
    private EnrollmentService enrollmentService;

    @Autowired
    public ScheduleTrackingServiceImpl(AllTrackedSchedules allTrackedSchedules, AllEnrollments allEnrollments, EnrollmentService enrollmentService) {
        this.allTrackedSchedules = allTrackedSchedules;
        this.allEnrollments = allEnrollments;
        this.enrollmentService = enrollmentService;
    }

    @Override
    public void enroll(EnrollmentRequest enrollmentRequest) {
        if (allEnrollments.findActiveByExternalIdAndScheduleName(enrollmentRequest.getExternalId(), enrollmentRequest.getScheduleName()) != null)
            throw new ActiveEnrollmentExistsException("entity already has an active enrollment. unenroll the entity before enrolling in the same schedule.");

        Schedule schedule = allTrackedSchedules.getByName(enrollmentRequest.getScheduleName());
        if (schedule == null)
            throw new ScheduleTrackingException("No schedule with name: %s", enrollmentRequest.getScheduleName());

        String startingMilestoneName;
        if (enrollmentRequest.enrollIntoMilestone())
            startingMilestoneName = enrollmentRequest.getStartingMilestoneName();
        else
            startingMilestoneName = schedule.getFirstMilestone().getName();

        enrollmentService.enroll(new Enrollment(enrollmentRequest.getExternalId(), enrollmentRequest.getScheduleName(), startingMilestoneName, enrollmentRequest.getReferenceDate(), now(), enrollmentRequest.getPreferredAlertTime()));
    }

    @Override
    public void fulfillCurrentMilestone(String externalId, String scheduleName) {
        Enrollment activeEnrollment = allEnrollments.findActiveByExternalIdAndScheduleName(externalId, scheduleName);
        if (activeEnrollment == null)
            throw new InvalidEnrollmentException("entity is not currently actively enrolled into the schedule.");
    	enrollmentService.fulfillCurrentMilestone(activeEnrollment);
    }

    @Override
    public void unenroll(String externalId, String scheduleName) {
        Enrollment activeEnrollment = allEnrollments.findActiveByExternalIdAndScheduleName(externalId, scheduleName);
        if (activeEnrollment == null)
            throw new InvalidEnrollmentException("entity is not currently enrolled into the schedule.");
        enrollmentService.unenroll(activeEnrollment);
    }
}
