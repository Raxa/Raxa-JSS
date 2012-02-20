package org.motechproject.scheduletracking.api.domain.userspecified;

import java.util.ArrayList;
import java.util.List;

public class ScheduleRecord {
    private String name;
    private String totalDuration;
    private List<MilestoneRecord> milestones = new ArrayList<MilestoneRecord>();

    public ScheduleRecord(String name, String totalDuration) {
        this.name = name;
        this.totalDuration = totalDuration;
    }

    public String name() {
        return name;
    }

    public List<MilestoneRecord> milestoneRecords() {
        return milestones;
    }

    public String totalDuration() {
        return totalDuration;
    }
}
