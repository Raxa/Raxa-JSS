package org.motechproject.scheduletracking.api.service;

import org.motechproject.scheduletracking.api.domain.*;
import org.motechproject.scheduletracking.api.repository.AllEnrollments;
import org.motechproject.scheduletracking.api.repository.AllTrackedSchedules;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import static org.motechproject.util.DateUtil.today;
import static org.motechproject.util.DateUtil.now;

@Component
public class EnrollmentService {

    private AllTrackedSchedules allTrackedSchedules;
    private AllEnrollments allEnrollments;
    private EnrollmentAlertService enrollmentAlertService;
    private EnrollmentDefaultmentService enrollmentDefaultmentService;

    @Autowired
    public EnrollmentService(AllTrackedSchedules allTrackedSchedules, AllEnrollments allEnrollments, EnrollmentAlertService enrollmentAlertService, EnrollmentDefaultmentService enrollmentDefaultmentService) {
        this.allTrackedSchedules = allTrackedSchedules;
        this.allEnrollments = allEnrollments;
        this.enrollmentAlertService = enrollmentAlertService;
        this.enrollmentDefaultmentService = enrollmentDefaultmentService;
    }

    public void enroll(Enrollment enrollment) {
        allEnrollments.add(enrollment);
        enrollmentAlertService.scheduleAlertsForCurrentMilestone(enrollment);
        enrollmentDefaultmentService.scheduleJobToCaptureDefaultment(enrollment);
    }

    public void fulfillCurrentMilestone(Enrollment enrollment) {
        Schedule schedule = allTrackedSchedules.getByName(enrollment.getScheduleName());
        if (enrollment.getFulfillments().size() >= schedule.getMilestones().size())
            throw new NoMoreMilestonesToFulfillException("all milestones in the schedule have been fulfilled.");
        if (enrollment.isDefaulted())
            throw new MilestoneFulfillmentException("cannot fulfill milestone for a defaulted enrollment.");
        enrollmentAlertService.unscheduleAllAlerts(enrollment);
        enrollmentDefaultmentService.unscheduleDefaultmentCaptureJob(enrollment);

        enrollment.getFulfillments().add(new MilestoneFulfillment(enrollment.getCurrentMilestoneName(), now()));
        String nextMilestoneName = schedule.getNextMilestoneName(enrollment.getCurrentMilestoneName());
        enrollment.setCurrentMilestoneName(nextMilestoneName);
        if (nextMilestoneName == null)
            enrollment.setStatus(Enrollment.EnrollmentStatus.Completed);
        else {
        enrollmentAlertService.scheduleAlertsForCurrentMilestone(enrollment);
        enrollmentDefaultmentService.scheduleJobToCaptureDefaultment(enrollment);
        }
        allEnrollments.update(enrollment);
    }

    public void unenroll(Enrollment enrollment) {
        enrollmentAlertService.unscheduleAllAlerts(enrollment);
        enrollmentDefaultmentService.unscheduleDefaultmentCaptureJob(enrollment);
        enrollment.setStatus(Enrollment.EnrollmentStatus.Unenrolled);
        allEnrollments.update(enrollment);
    }
}
