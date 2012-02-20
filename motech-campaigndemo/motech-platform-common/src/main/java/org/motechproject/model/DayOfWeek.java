package org.motechproject.model;

import org.joda.time.LocalDate;

public enum DayOfWeek {
    Monday(1),
    Tuesday(2),
    Wednesday(3),
    Thursday(4),
    Friday(5),
    Saturday(6),
    Sunday(7);

    private int value;

    private DayOfWeek(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

    public static DayOfWeek getDayOfWeek(int dayOfWeek) throws IllegalArgumentException {
        for (DayOfWeek day : DayOfWeek.values()) {
            if (day.getValue() == dayOfWeek)
                return day;
        }

        throw new IllegalArgumentException("Not a valid day");
    }

    public static DayOfWeek getDayOfWeek(LocalDate date) {
        return DayOfWeek.getDayOfWeek(date.dayOfWeek().get());
    }
}