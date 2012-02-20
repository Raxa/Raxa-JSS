package org.motechproject.valueobjects;

import org.joda.time.Days;
import org.joda.time.Hours;
import org.joda.time.Minutes;
import org.joda.time.Period;
import org.joda.time.Weeks;

public enum WallTimeUnit {
	
    Week(10080) {
        public Period toPeriod(int unit) {
            return Weeks.weeks(unit).toPeriod();
        }
    }, Day(1440) {
        public Period toPeriod(int unit) {
            return Days.days(unit).toPeriod();
        }
    }, Hour(60) {
		public Period toPeriod(int unit) {
			return Hours.hours(unit).toPeriod();
		}
    	
    }, Minute(1) {
		public Period toPeriod(int unit) {
			return Minutes.minutes(unit).toPeriod();
		}
    	
    };

    public int minutes;

    WallTimeUnit(int minutes) {
        this.minutes = minutes;
    }

    public abstract Period toPeriod(int unit);
}
