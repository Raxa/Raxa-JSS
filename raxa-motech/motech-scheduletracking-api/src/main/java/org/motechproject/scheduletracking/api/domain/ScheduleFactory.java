package org.motechproject.scheduletracking.api.domain;

import org.motechproject.scheduletracking.api.domain.userspecified.AlertRecord;
import org.motechproject.scheduletracking.api.domain.userspecified.MilestoneRecord;
import org.motechproject.scheduletracking.api.domain.userspecified.ScheduleRecord;
import org.motechproject.scheduletracking.api.domain.userspecified.ScheduleWindowsRecord;
import org.motechproject.valueobjects.WallTime;
import org.motechproject.valueobjects.factory.WallTimeFactory;
import org.springframework.stereotype.Component;

@Component
public class ScheduleFactory {

    public Schedule build(ScheduleRecord scheduleRecord) {
        Schedule schedule = new Schedule(scheduleRecord.name());
        int alertIndex = 0;
        for (MilestoneRecord milestoneRecord : scheduleRecord.milestoneRecords()) {
            ScheduleWindowsRecord windowsRecord = milestoneRecord.scheduleWindowsRecord();
            Milestone milestone = new Milestone(milestoneRecord.name(), wallTime(windowsRecord.earliest()), wallTime(windowsRecord.due()), wallTime(windowsRecord.late()), wallTime(windowsRecord.max()));
            milestone.setData(milestoneRecord.data());
            for (AlertRecord alertRecord : milestoneRecord.alerts())
                milestone.addAlert(WindowName.valueOf(alertRecord.window()), new Alert(WallTimeFactory.create(alertRecord.interval()), Integer.parseInt(alertRecord.count()), alertIndex++));
            schedule.addMilestones(milestone);
        }
        return schedule;
    }

    private static WallTime wallTime(String userDefinedTime) {
        return WallTimeFactory.create(userDefinedTime);
    }
}
