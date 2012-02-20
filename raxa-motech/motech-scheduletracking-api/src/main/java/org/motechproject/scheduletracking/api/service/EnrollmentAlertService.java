package org.motechproject.scheduletracking.api.service;

import org.joda.time.DateTime;
import org.joda.time.Days;
import org.joda.time.LocalDate;
import org.joda.time.Minutes;
import org.motechproject.model.MotechEvent;
import org.motechproject.model.RepeatingSchedulableJob;
import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.scheduletracking.api.domain.*;
import org.motechproject.scheduletracking.api.events.MilestoneEvent;
import org.motechproject.scheduletracking.api.events.constants.EventSubject;
import org.motechproject.scheduletracking.api.repository.AllEnrollments;
import org.motechproject.scheduletracking.api.repository.AllTrackedSchedules;
import org.motechproject.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import static org.motechproject.util.DateUtil.today;
import static org.motechproject.util.DateUtil.now;

@Component
public class EnrollmentAlertService {

	public static final String JOB_ID_PREFIX = "milestone.alert";
    private int MILLIS_IN_A_DAY = 24 * 60 * 60 * 1000;
    private int MILLIS_IN_A_MINUTE = 60 * 1000;
    public static final String MILESTONE_ALERTS = "milestone_alerts";

    private AllTrackedSchedules allTrackedSchedules;
    private MotechSchedulerService schedulerService;

    @Autowired
    public EnrollmentAlertService(AllTrackedSchedules allTrackedSchedules, MotechSchedulerService schedulerService) {
        this.allTrackedSchedules = allTrackedSchedules;
        this.schedulerService = schedulerService;
    }

    public void scheduleAlertsForCurrentMilestone(Enrollment enrollment) {
        Schedule schedule = allTrackedSchedules.getByName(enrollment.getScheduleName());
        Milestone currentMilestone = schedule.getMilestone(enrollment.getCurrentMilestoneName());
        if (currentMilestone == null)
            return;
        for (MilestoneWindow window : currentMilestone.getMilestoneWindows()) {
            if (!window.hasElapsedInMinutes(getCurrentMilestoneStartDate(enrollment))) {
                for (Alert alert : window.getAlerts())
                    scheduleAlertJob(alert, enrollment, schedule, currentMilestone, window);
            }
        }
    }

    private void scheduleAlertJob(Alert alert, Enrollment enrollment, Schedule schedule, Milestone milestone, MilestoneWindow milestoneWindow) {
        MotechEvent event = new MilestoneEvent(enrollment.getExternalId(), schedule.getName(), milestone.getName(), milestoneWindow.getName().toString(), enrollment.getReferenceDate()).toMotechEvent();
        event.getParameters().put(MotechSchedulerService.JOB_ID_KEY, String.format("%s.%s.%d", JOB_ID_PREFIX, enrollment.getId(), alert.getIndex()));
        event.getParameters().putAll(milestone.getData());
        
        DateTime startTime = getJobStartDate(enrollment, milestoneWindow);
        RepeatingSchedulableJob job = new RepeatingSchedulableJob(event, startTime.toDate(), null, numberOfAlertsToRaise(alert, enrollment, milestoneWindow), alert.getInterval().inMinutes() * MILLIS_IN_A_MINUTE);
        schedulerService.safeScheduleRepeatingJob(job);
    }

    private int numberOfAlertsToRaise(Alert alert, Enrollment enrollment, MilestoneWindow milestoneWindow) {
        DateTime startDateOfWindow = getStartDateOfWindow(enrollment, milestoneWindow);
        DateTime endDateOfWindow = startDateOfWindow.plusMinutes(milestoneWindow.getWindowEndInMinutes() - milestoneWindow.getStart().inMinutes());
        //int daysToEndOfWindow = Days.daysBetween(today, endDateOfWindow).getDays();
        int minutesToEndOfWindow = Minutes.minutesBetween(startDateOfWindow, endDateOfWindow).getMinutes();
        int maximumAlerts = alert.getRepeatCount();
        return maximumAlerts <= minutesToEndOfWindow? maximumAlerts : minutesToEndOfWindow;
    }

    private DateTime getJobStartDate(Enrollment enrollment, MilestoneWindow milestoneWindow) {
        DateTime startDateOfWindow = getStartDateOfWindow(enrollment, milestoneWindow);
        return startDateOfWindow;
        //DateTime today = now();
        //return (startDateOfWindow.isAfter(today))? startDateOfWindow : today;
    }

    private DateTime getStartDateOfWindow(Enrollment enrollment, MilestoneWindow milestoneWindow) {
        return getCurrentMilestoneStartDate(enrollment).plusMinutes(milestoneWindow.getStart().inMinutes());
    }

    DateTime getCurrentMilestoneStartDate(Enrollment enrollment) {
        Schedule schedule = allTrackedSchedules.getByName(enrollment.getScheduleName());
        if (enrollment.getCurrentMilestoneName().equals(schedule.getFirstMilestone().getName()))
            return enrollment.getReferenceDate();
        return (enrollment.getFulfillments().isEmpty())? enrollment.getEnrollmentDate() : enrollment.getLastFulfilledDate();
    }

    public void unscheduleAllAlerts(Enrollment enrollment) {
    	schedulerService.unscheduleAllJobs(String.format("%s-%s.%s", EventSubject.MILESTONE_ALERT, JOB_ID_PREFIX, enrollment.getId()));
    }
}
