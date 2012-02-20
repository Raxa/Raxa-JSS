package org.motechproject.util.datetime;

import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.joda.time.LocalDate;

public interface DateTimeSource {
    DateTimeZone timeZone();
    DateTime now();
    LocalDate today();
}
