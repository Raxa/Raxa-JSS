package org.motechproject.valueobjects;

import org.joda.time.Period;

public class WallTime {
    private int value;
    private WallTimeUnit unit;

    public WallTime() {
    }

    public WallTime(int value, WallTimeUnit unit) {
        this.value = value;
        this.unit = unit;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        WallTime wallTime = (WallTime) o;

        return value == wallTime.value && unit == wallTime.unit;
    }

    @Override
    public int hashCode() {
        int result = value;
        result = 31 * result + (unit != null ? unit.hashCode() : 0);
        return result;
    }

    public int getValue() {
        return value;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public WallTimeUnit getUnit() {
        return unit;
    }

    public void setUnit(WallTimeUnit unit) {
        this.unit = unit;
    }

    public int inMinutes() {
        return this.unit.minutes * value;
    }
    
    public int inDays() {
    	return (this.unit.minutes * value)/1440;
    }

    public Period asPeriod() {
        return unit.toPeriod(value);
    }
}
