package org.motechproject.scheduletracking.api.domain.userspecified;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MilestoneRecord {
    private String name;
    private String referenceDate;
    private ScheduleWindowsRecord scheduleWindows;
    private List<AlertRecord> alerts = new ArrayList<AlertRecord>();
    private Map<String, String> data = new HashMap<String, String>();

    private MilestoneRecord() {
    }

    public MilestoneRecord(String name, String referenceDate, ScheduleWindowsRecord scheduleWindows) {
        this.name = name;
        this.referenceDate = referenceDate;
        this.scheduleWindows = scheduleWindows;
    }

    public String name() {
        return name;
    }

    public String referenceDate() {
        return referenceDate;
    }

    public ScheduleWindowsRecord scheduleWindowsRecord() {
        return scheduleWindows;
    }

    public List<AlertRecord> alerts() {
        return alerts;
    }

    public Map<String, String> data() {
        return data;
    }
}
