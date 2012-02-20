package org.motechproject.util;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.LocalDate;
import org.junit.After;
import org.junit.Test;
import org.motechproject.util.datetime.DateTimeSource;
import org.motechproject.util.datetime.DefaultDateTimeSource;

import java.util.Date;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.motechproject.model.DayOfWeek.Monday;
import static org.motechproject.model.DayOfWeek.Wednesday;
import static org.motechproject.util.DateUtil.*;

public class DateUtilTest {

    @Test
    public void shouldFindDaysToCalendarWeekEnd() {

        assertThat(daysToCalendarWeekEnd(newDate(2011, 11, 19), Wednesday.getValue()), is(3));
        assertThat(daysToCalendarWeekEnd(newDate(2011, 11, 20), Wednesday.getValue()), is(2));
        assertThat(daysToCalendarWeekEnd(newDate(2011, 11, 21), Wednesday.getValue()), is(1));
        assertThat(daysToCalendarWeekEnd(newDate(2011, 11, 22), Wednesday.getValue()), is(0));
        assertThat(daysToCalendarWeekEnd(newDate(2011, 11, 23), Wednesday.getValue()), is(6));
        assertThat(daysToCalendarWeekEnd(newDate(2011, 11, 24), Wednesday.getValue()), is(5));

        assertThat(daysToCalendarWeekEnd(newDate(2011, 11, 19), Monday.getValue()), is(1));
        assertThat(daysToCalendarWeekEnd(newDate(2011, 11, 20), Monday.getValue()), is(0));
        assertThat(daysToCalendarWeekEnd(newDate(2011, 11, 21), Monday.getValue()), is(6));
        assertThat(daysToCalendarWeekEnd(newDate(2011, 11, 22), Monday.getValue()), is(5));
        assertThat(daysToCalendarWeekEnd(newDate(2011, 11, 23), Monday.getValue()), is(4));
        assertThat(daysToCalendarWeekEnd(newDate(2011, 11, 24), Monday.getValue()), is(3));

    }

    @Test
    public void shouldReturnTheNumberOfYearsFromAGivenDate(){
        mockCurrentDate(new DateTime(2011, 9, 9, 9, 30, 0, 0));
        assertEquals(getDifferenceOfDatesInYears(new Date(108, 12, 12)),2);
    }

    @After
    public void tearDown() {
        DateTimeSourceUtil.SourceInstance = new DefaultDateTimeSource();
    }

    private void mockCurrentDate(final DateTime currentDate) {
        DateTimeSourceUtil.SourceInstance = new DateTimeSource() {

            @Override
            public DateTimeZone timeZone() {
                return currentDate.getZone();
            }

            @Override
            public DateTime now() {
                return currentDate;
            }

            @Override
            public LocalDate today() {
                return currentDate.toLocalDate();
            }
        };
    }
}
