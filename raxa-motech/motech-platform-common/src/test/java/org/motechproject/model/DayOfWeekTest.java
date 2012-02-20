package org.motechproject.model;

import org.junit.Test;
import org.motechproject.util.DateUtil;

import static junit.framework.Assert.assertEquals;

public class DayOfWeekTest {
    @Test
    public void shouldGetValueOfDays() {
        assertEquals(1, DayOfWeek.Monday.getValue());
        assertEquals(2, DayOfWeek.Tuesday.getValue());
        assertEquals(3, DayOfWeek.Wednesday.getValue());
        assertEquals(4, DayOfWeek.Thursday.getValue());
        assertEquals(5, DayOfWeek.Friday.getValue());
        assertEquals(6, DayOfWeek.Saturday.getValue());
        assertEquals(7, DayOfWeek.Sunday.getValue());
    }

    @Test
    public void shouldReturnDayOfWeekForTheSpecifiedNumber() {
        assertEquals(DayOfWeek.Monday, DayOfWeek.getDayOfWeek(1));
        assertEquals(DayOfWeek.Tuesday, DayOfWeek.getDayOfWeek(2));
        assertEquals(DayOfWeek.Wednesday, DayOfWeek.getDayOfWeek(3));
        assertEquals(DayOfWeek.Thursday, DayOfWeek.getDayOfWeek(4));
        assertEquals(DayOfWeek.Friday, DayOfWeek.getDayOfWeek(5));
        assertEquals(DayOfWeek.Saturday, DayOfWeek.getDayOfWeek(6));
        assertEquals(DayOfWeek.Sunday, DayOfWeek.getDayOfWeek(7));
    }

    @Test
    public void shouldReturnDayOfWeekForTheSpecifiedDate() {
        DayOfWeek dayOfWeek = DayOfWeek.getDayOfWeek(DateUtil.newDate(2011, 10, 5));
        assertEquals(DayOfWeek.Wednesday, dayOfWeek);
    }

    @Test(expected = IllegalArgumentException.class)
    public void shouldThrowExceptionWhenSpecifiedNonExistingDay() {
        DayOfWeek.getDayOfWeek(8);
    }
}