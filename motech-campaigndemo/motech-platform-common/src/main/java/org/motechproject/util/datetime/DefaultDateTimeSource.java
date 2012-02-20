package org.motechproject.util.datetime;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.LocalDate;

import java.util.Calendar;
import java.util.TimeZone;

public class DefaultDateTimeSource implements DateTimeSource {
    private DateTimeZone timeZone;

    public DefaultDateTimeSource() {
        TimeZone tz = Calendar.getInstance().getTimeZone();
        this.timeZone = DateTimeZone.forTimeZone(tz);
    }

    @Override
    public DateTimeZone timeZone() {
        return timeZone;
    }

    @Override
    public DateTime now() {
        return new DateTime(timeZone);
    }

    @Override
    public LocalDate today() {
        return new LocalDate(timeZone);
    }
}