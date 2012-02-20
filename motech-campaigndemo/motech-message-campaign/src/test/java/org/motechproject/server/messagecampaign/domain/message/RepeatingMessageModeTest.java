package org.motechproject.server.messagecampaign.domain.message;

import org.junit.Assert;
import org.junit.Test;
import org.motechproject.server.messagecampaign.builder.CampaignMessageBuilder;
import org.motechproject.testing.utils.BaseUnitTest;

import java.util.Date;

import static java.lang.Integer.valueOf;
import static junit.framework.Assert.assertEquals;
import static org.motechproject.server.messagecampaign.domain.message.RepeatingMessageMode.CALENDAR_WEEK_SCHEDULE;
import static org.motechproject.util.DateUtil.newDate;
import static org.motechproject.util.DateUtil.newDateTime;

public class RepeatingMessageModeTest extends BaseUnitTest {

    @Test
    public void shouldReturnOffsetForCalendarWeekWithTuesdayAsStartOfWeek() {

        Date cycleStartDate = newDateTime(newDate(2011, 11, 2), 10, 11, 0).toDate();
        RepeatingCampaignMessage calendarStartAsTuesday = new CampaignMessageBuilder().repeatingCampaignMessageForCalendarWeek("mess", "Tuesday", null, "msg");

        int startIntervalOffset = 1;
        mockCurrentDate(date(2011, 11, 3));
        assertEquals(valueOf(startIntervalOffset), CALENDAR_WEEK_SCHEDULE.offset(calendarStartAsTuesday, cycleStartDate, startIntervalOffset));

        mockCurrentDate(date(2011, 11, 7));
        startIntervalOffset = 5;
        assertEquals(valueOf(startIntervalOffset), CALENDAR_WEEK_SCHEDULE.offset(calendarStartAsTuesday, cycleStartDate, startIntervalOffset));

        mockCurrentDate(date(2011, 11, 8));
        startIntervalOffset = 8;
        assertEquals(valueOf(1 + startIntervalOffset), CALENDAR_WEEK_SCHEDULE.offset(calendarStartAsTuesday, cycleStartDate, startIntervalOffset));

        mockCurrentDate(date(2011, 11, 14));
        startIntervalOffset = 8;
        assertEquals(valueOf(1 + startIntervalOffset), CALENDAR_WEEK_SCHEDULE.offset(calendarStartAsTuesday, cycleStartDate, startIntervalOffset));

        mockCurrentDate(date(2011, 11, 15));
        assertEquals(valueOf(2 + startIntervalOffset), CALENDAR_WEEK_SCHEDULE.offset(calendarStartAsTuesday, cycleStartDate, startIntervalOffset));

        mockCurrentDate(date(2011, 11, 18));
        assertEquals(valueOf(2 + startIntervalOffset), CALENDAR_WEEK_SCHEDULE.offset(calendarStartAsTuesday, cycleStartDate, startIntervalOffset));
    }

    @Test
    public void shouldReturnOffsetForCalendarWeekWithSundayAsStartOfWeek() {

        Date cycleStartDate = newDateTime(newDate(2011, 11, 2), 10, 11, 0).toDate();
        RepeatingCampaignMessage calendarStartAsSunday = new CampaignMessageBuilder().repeatingCampaignMessageForCalendarWeek("mess", "Sunday", null, "msg");

        int startIntervalOffset = 1;
        mockCurrentDate(date(2011, 11, 3));
        assertEquals(valueOf(startIntervalOffset), CALENDAR_WEEK_SCHEDULE.offset(calendarStartAsSunday, cycleStartDate, startIntervalOffset));

        startIntervalOffset = 8;

        mockCurrentDate(date(2011, 11, 7));
        assertEquals(valueOf(1 + startIntervalOffset), CALENDAR_WEEK_SCHEDULE.offset(calendarStartAsSunday, cycleStartDate, startIntervalOffset));

        mockCurrentDate(date(2011, 11, 8));
        assertEquals(valueOf(1 + startIntervalOffset), CALENDAR_WEEK_SCHEDULE.offset(calendarStartAsSunday, cycleStartDate, startIntervalOffset));

        mockCurrentDate(date(2011, 11, 13));
        assertEquals(valueOf(2 + startIntervalOffset), CALENDAR_WEEK_SCHEDULE.offset(calendarStartAsSunday, cycleStartDate, startIntervalOffset));

        mockCurrentDate(date(2011, 11, 19));
        assertEquals(valueOf(2 + startIntervalOffset), CALENDAR_WEEK_SCHEDULE.offset(calendarStartAsSunday, cycleStartDate, startIntervalOffset));

        mockCurrentDate(date(2011, 11, 21));
        assertEquals(valueOf(3 + startIntervalOffset), CALENDAR_WEEK_SCHEDULE.offset(calendarStartAsSunday, cycleStartDate, startIntervalOffset));
    }

    @Test
    public void shouldThrowIllegalArguementExceptionIfCyleStartDateIsAheadCurrentDay() {
        Date cycleStartDate = newDateTime(newDate(2011, 11, 2), 10, 11, 0).toDate();
        RepeatingCampaignMessage calendarStartAsTuesday = new CampaignMessageBuilder().repeatingCampaignMessageForCalendarWeek("mess", "Sunday", null, "msg");

        mockCurrentDate(date(2011, 11, 1));
        try {
            CALENDAR_WEEK_SCHEDULE.offset(calendarStartAsTuesday, cycleStartDate, 4);
            Assert.fail("should fail for the current date");
        } catch (IllegalArgumentException e) {
            assertEquals(e.getMessage(), "cycleStartDate cannot be in future");
        }
    }
}
