package org.motechproject.scheduletracking.api.domain;

import org.motechproject.valueobjects.WallTime;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Milestone implements Serializable {

    private String name;
    private Map<String, String> data = new HashMap<String, String>();

    private List<MilestoneWindow> windows = new ArrayList<MilestoneWindow>();

    public Milestone(String name, WallTime earliest, WallTime due, WallTime late, WallTime max) {
        this.name = name;
        createMilestoneWindows(earliest, due, late, max);
    }

    private void createMilestoneWindows(WallTime earliest, WallTime due, WallTime late, WallTime max) {
        windows.add(new MilestoneWindow(WindowName.earliest, new WallTime(0, earliest.getUnit()), earliest));
        windows.add(new MilestoneWindow(WindowName.due, earliest, due));
        windows.add(new MilestoneWindow(WindowName.late, due, late));
        windows.add(new MilestoneWindow(WindowName.max, late, max));
    }

    public List<MilestoneWindow> getMilestoneWindows() {
        return windows;
    }

    public MilestoneWindow getMilestoneWindow(WindowName windowName) {
        for (MilestoneWindow window : windows)
            if (window.getName().equals(windowName))
                return window;
        return null;
    }

    public String getName() {
        return name;
    }

    public void setData(Map<String, String> data) {
        this.data = data;
    }

    public Map<String, String> getData() {
        return data;
    }

    public void addAlert(WindowName windowName, Alert... alertList) {
        getMilestoneWindow(windowName).addAlerts(alertList);
    }

    public List<Alert> getAlerts() {
        List<Alert> alerts = new ArrayList<Alert>();
        for (MilestoneWindow window : windows)
            alerts.addAll(window.getAlerts());
        return alerts;
    }

    public int getMaximumDurationInDays() {
        int days = 0;
        for (MilestoneWindow window : windows)
            days += window.getEnd().inDays() - window.getStart().inDays();
        return days;
    }

	public int getMaximumDurationInMinutes() {
		int minutes = 0;
		for (MilestoneWindow window: windows) 
			minutes += window.getEnd().inMinutes() - window.getStart().inMinutes();
		return minutes;
	}
}
