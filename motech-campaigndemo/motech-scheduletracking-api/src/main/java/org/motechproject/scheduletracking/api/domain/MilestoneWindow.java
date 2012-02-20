package org.motechproject.scheduletracking.api.domain;

import org.joda.time.DateTime;
import org.joda.time.Days;
import org.joda.time.LocalDate;
import org.joda.time.Minutes;
import org.joda.time.Period;
import org.motechproject.util.DateUtil;
import org.motechproject.valueobjects.WallTime;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MilestoneWindow implements Serializable {

    private WindowName name;

    private WallTime start;
    private WallTime end;

    private List<Alert> alerts = new ArrayList<Alert>();

    public MilestoneWindow(WindowName name, WallTime start, WallTime end) {
        this.name = name;
        this.start = start;
        this.end = end;
    }

    public WindowName getName() {
        return name;
    }

    public void addAlerts(Alert... alertsList) {
        alerts.addAll(Arrays.asList(alertsList));
    }

    public List<Alert> getAlerts() {
        return alerts;
    }

    public WallTime getStart() {
        return start;
    }

    public WallTime getEnd() {
        return end;
    }

    public boolean hasElapsed(LocalDate milestoneStartDate) {
        int daysSinceStartOfMilestone = Days.daysBetween(milestoneStartDate, DateUtil.today()).getDays();
        int endOffsetInDays = getWindowEndInDays();
        return daysSinceStartOfMilestone >= endOffsetInDays;
    }
    
    public boolean hasElapsedInMinutes(DateTime milestoneStartDate) {
    	int minutesSinceStartOfMilestone = Minutes.minutesBetween(milestoneStartDate, DateUtil.now()).getMinutes();
    	int endOffsetInMinutes = getWindowEndInMinutes();
    	return minutesSinceStartOfMilestone >= endOffsetInMinutes;
    }

    public int getWindowEndInMinutes() {
		return end == null? toMinutes(start.asPeriod()) + 1 : toMinutes(end.asPeriod());
	}

	public int getWindowEndInDays() {
        return end == null? toDays(start.asPeriod()) + 1 : toDays(end.asPeriod());
    }

    private static int toDays(Period period) {
        return period.toStandardDays().getDays();
    }
    
    private static int toMinutes(Period period) {
    	return period.toStandardMinutes().getMinutes();
    }
 }
