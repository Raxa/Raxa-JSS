package org.motechproject.scheduletracking.api.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Schedule implements Serializable {

    private String name;
    private List<Milestone> milestones = new ArrayList<Milestone>();

    public Schedule(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void addMilestones(Milestone... milestonesList) {
        milestones.addAll(Arrays.asList(milestonesList));
    }

    public Milestone getFirstMilestone() {
        return milestones.get(0);
    }

    public List<Milestone> getMilestones() {
        return milestones;
    }

    public Milestone getMilestone(String milestoneName) {
        for (Milestone milestone : milestones)
            if (milestone.getName().equals(milestoneName))
                return milestone;
        return null;
    }

    public Milestone getIdealMilestoneAsOf(int daysIntoSchedule) {
        int idealDaysIntoSchedule = 0;
        for (Milestone milestone : milestones) {
            idealDaysIntoSchedule += milestone.getMaximumDurationInDays();
            if (daysIntoSchedule <= idealDaysIntoSchedule)
                return milestone;
        }
        return null;
    }
    
    public Milestone getIdealMilestoneAsOfMinuteBased(int minutesIntoSchedule) {
    	int idealMinutesIntoSchedule = 0;
    	for (Milestone milestone: milestones) {
    		idealMinutesIntoSchedule += milestone.getMaximumDurationInMinutes();
    		if (minutesIntoSchedule <= idealMinutesIntoSchedule) 
    			return milestone;
    	}
    	return null;
    }

    public int getIdealStartOffsetOfMilestoneInDays(String milestoneName) {
        int offset = 0;
        for (Milestone milestone : milestones) {
            if (milestone.getName().equals(milestoneName))
                break;
            offset += milestone.getMaximumDurationInDays();
        }
        return offset;
    }
    
    public int getIdealStartOffsetOfMilestoneInMinutes(String milestoneName) {
    	int offset = 0;
    	for (Milestone milestone: milestones) {
    		if (milestone.getName().equals(milestoneName))
    			break;
    		offset += milestone.getMaximumDurationInMinutes();
    	}
    	return offset;
    }

    public String getNextMilestoneName(String currentMilestoneName) {
        int currentIndex = milestones.indexOf(getMilestone(currentMilestoneName));
        if (currentIndex < milestones.size() - 1)
            return milestones.get(currentIndex + 1).getName();
        return null;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Schedule schedule = (Schedule) o;

        if (name != null ? !name.equals(schedule.name) : schedule.name != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return name != null ? name.hashCode() : 0;
    }
}
