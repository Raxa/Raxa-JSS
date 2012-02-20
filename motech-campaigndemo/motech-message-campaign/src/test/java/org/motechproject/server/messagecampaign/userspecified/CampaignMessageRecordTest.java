package org.motechproject.server.messagecampaign.userspecified;

import org.junit.Test;
import org.mockito.Mockito;
import org.motechproject.model.DayOfWeek;
import org.motechproject.server.messagecampaign.domain.message.RepeatingCampaignMessage;
import org.motechproject.server.messagecampaign.domain.message.RepeatingMessageMode;
import org.springframework.test.annotation.ExpectedException;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;
import static junit.framework.Assert.assertEquals;
import static org.mockito.Mockito.when;
import static org.motechproject.server.messagecampaign.builder.CampaignMessageRecordBuilder.*;
import static org.motechproject.server.messagecampaign.domain.message.RepeatingMessageMode.*;

public class CampaignMessageRecordTest {

    @Test
    public void shouldValidateRecordReturnTrue_IfRepeatIntervalIsSet_AndApplicableDaysOrCalendarWeekIsNotSet() {

        assertEquals(true, createRepeatingMessageRecordWithInterval("Message 1", "message-key", "1 Weeks").validate());
        assertEquals(true, createRepeatingMessageRecordWithInterval("Message 1", "message-key", "2 Days").validate());
    }

    @Test
    public void shouldValidateRecordReturnTrue_IfApplicableDaysOrCalendarWeekIsSet_AndRepeatIntervalIsNotSet() {

        CampaignMessageRecord record = createRepeatingMessageRecordWithWeekApplicableDays("Message 1", "message-key", asList("Mon", "Wed", "Fri"));
        assertEquals(true, record.validate());
        record = createRepeatingMessageRecordWithCalendarWeek("Message 1", "message-key", "Sun", asList("Mon", "Wed", "Fri"));
        assertEquals(true, record.validate());
    }

    @Test
    public void shouldValidateRecordReturnFalse_IfRepeatIntervalIsSet_AndApplicableDaysOrCalendarWeekIsSet() {

        CampaignMessageRecord record = new CampaignMessageRecord().weekDaysApplicable(asList("Mon", "Wed", "Fri"))
                                            .repeatInterval("1 Weeks");
        assertEquals(false, record.validate());
    }

    @Test
    public void shouldValidateRecordReturnFalse_IfRepeatInterval_AndApplicableDaysAndCalendarWeekIsNotSet() {

        CampaignMessageRecord record = new CampaignMessageRecord();
        assertEquals(false, record.validate());
    }

    @Test
    public void shouldValidateRecordReturnFalse_IfRepeatInterval_AndApplicableDaysAndCalendarWeekIsSet() {

        CampaignMessageRecord record = new CampaignMessageRecord().weekDaysApplicable(asList("Mon", "Wed", "Fri"));
                    record.calendarStartOfWeek("Sun").repeatInterval("1 Weeks");
        assertEquals(false, record.validate());
    }

    @Test
    public void shouldReturnModeBasedOnScheduleParameter() {

        CampaignMessageRecord record = createRepeatingMessageRecordWithInterval("n", "msgKey", "9 Weeks");
        RepeatingCampaignMessage message = record.createRepeatingCampaignMessageFromRecord();
        assertMessage(REPEAT_INTERVAL, record, days(record.weekDaysApplicable()), message);

        record = createRepeatingMessageRecordWithWeekApplicableDays("n", "msgKey", asList("Friday"));
        message = record.createRepeatingCampaignMessageFromRecord();
        assertMessage(WEEK_DAYS_SCHEDULE, record, days(record.weekDaysApplicable()), message);

        record = createRepeatingMessageRecordWithCalendarWeek("n", "msgKey", "Sunday", asList("Friday"));
        message = record.createRepeatingCampaignMessageFromRecord();
        assertMessage(CALENDAR_WEEK_SCHEDULE, record, days(record.weekDaysApplicable()), message);

        record = createRepeatingMessageRecordWithCalendarWeek("n", "msgKey", "Sunday", null);
        message = record.createRepeatingCampaignMessageFromRecord();
        assertMessage(CALENDAR_WEEK_SCHEDULE, record, asList(DayOfWeek.values()), message);
    }

    @Test
    @ExpectedException(IllegalArgumentException.class)
    public void shouldthrowIllegalArguementException_WhenBothIntervalAndApplicableDaysArePresent(){
        CampaignMessageRecord mock = Mockito.mock(CampaignMessageRecord.class);
        when(mock.validate()).thenReturn(false);
        mock.createRepeatingCampaignMessageFromRecord();
    }

    private void assertMessage(RepeatingMessageMode mode, CampaignMessageRecord record, List<DayOfWeek> expectedApplicableDays, RepeatingCampaignMessage actualMessage) {
        assertEquals(mode, actualMessage.mode());
        assertEquals(record.repeatInterval(), actualMessage.repeatInterval());
        assertEquals(record.messageKey(), actualMessage.messageKey());
        assertEquals(record.calendarStartOfWeek(), actualMessage.calendarStartOfWeek());
        assertEquals(expectedApplicableDays, actualMessage.weekDaysApplicable());
    }

    private List<DayOfWeek> days(List<String> days) {
      if(!CollectionUtils.isEmpty(days)) {
          List<DayOfWeek> applicableDays = new ArrayList<DayOfWeek>();
          for (String day : days) applicableDays.add(DayOfWeek.valueOf(day));
          return applicableDays;
      }
      return null;
    }
}
