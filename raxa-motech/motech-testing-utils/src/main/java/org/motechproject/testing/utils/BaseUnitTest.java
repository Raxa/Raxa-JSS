package org.motechproject.testing.utils;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.LocalDate;
import org.joda.time.LocalTime;
import org.junit.After;
import org.motechproject.util.DateTimeSourceUtil;
import org.motechproject.util.datetime.DateTimeSource;
import org.motechproject.util.datetime.DefaultDateTimeSource;

public class BaseUnitTest {
    static final DateTimeSource dateTimeSource = new DefaultDateTimeSource();

    protected void mockCurrentDate(final DateTime currentDate) {
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

    protected DateTime date(int year, int monthOfYear, int dayOfMonth) {
        return new DateTime(year, monthOfYear, dayOfMonth, 0, 0);
    }

    protected DateTime dateTime(int year, int monthOfYear, int dayOfMonth, LocalTime localTime) {
        return new DateTime(year, monthOfYear, dayOfMonth, localTime.getHourOfDay(), localTime.getMinuteOfHour());
    }

    protected DateTime dateTime(LocalDate localDate, LocalTime localTime) {
        return new DateTime(localDate.getYear(), localDate.getMonthOfYear(), localDate.getDayOfMonth(), localTime.getHourOfDay(), localTime.getMinuteOfHour());
    }

    protected void resetDateTimeSource() {
        DateTimeSourceUtil.SourceInstance = dateTimeSource;
    }

    @After
    public final void tearDown() {
        resetDateTimeSource();
    }
}
