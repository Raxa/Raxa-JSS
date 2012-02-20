package org.motechproject.server.messagecampaign.scheduler;

import org.joda.time.DateTime;
import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.motechproject.gateway.OutboundEventGateway;
import org.motechproject.model.MotechEvent;
import org.motechproject.model.Time;
import org.motechproject.server.messagecampaign.EventKeys;
import org.motechproject.server.messagecampaign.builder.CampaignMessageBuilder;
import org.motechproject.server.messagecampaign.dao.AllMessageCampaigns;
import org.motechproject.server.messagecampaign.domain.message.CampaignMessage;
import org.motechproject.server.messagecampaign.domain.message.RepeatingCampaignMessage;
import org.motechproject.testing.utils.BaseUnitTest;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static java.util.Arrays.asList;
import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertNotNull;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.motechproject.server.messagecampaign.scheduler.RepeatingProgramScheduleHandler.OFFSET;
import static org.motechproject.server.messagecampaign.scheduler.RepeatingProgramScheduleHandler.WEEK_DAY;
import static org.motechproject.server.messagecampaign.scheduler.RepeatingProgramScheduler.INTERNAL_REPEATING_MESSAGE_CAMPAIGN_SUBJECT;

public class RepeatingProgramScheduleHandlerTest extends BaseUnitTest {
    @Mock
    AllMessageCampaigns allMessageCampaigns;
    @Mock
    OutboundEventGateway outboundEventGateway;
    RepeatingProgramScheduleHandler handler;

    String campaignName = "campaign-name";

    @Before
    public void setUp() {
        initMocks(this);
        handler = new RepeatingProgramScheduleHandler(outboundEventGateway, allMessageCampaigns);
    }

    @Test
    public void shouldHandleEventForRepeatCampaignScheduleAndUpdateMessageKey() {

        String jobMessageKey = "message-key-" + OFFSET;
        CampaignMessage campaignMessage = new CampaignMessageBuilder().repeatingCampaignMessageForInterval(campaignName, "2 Weeks", jobMessageKey).deliverTime(new Time(10, 30));
        int repeatIntervalInDays = ((RepeatingCampaignMessage) campaignMessage).repeatIntervalInDaysForOffset();
        when(allMessageCampaigns.get(campaignName, jobMessageKey)).thenReturn(campaignMessage);

        DateTime today = date(2011, 11, 14);
        Date nov112011 = today.toDate();
        Date may102012 = date(2012, 5, 10).toDate();

        MotechEvent motechEvent = getMotechEvent(nov112011, may102012, jobMessageKey, 1);
        motechEvent.getParameters();
        callHandleEvent(today, motechEvent);
        assertHandleEvent("message-key-1");

        callHandleEvent(today.plusDays(repeatIntervalInDays - 1), getMotechEvent(nov112011, may102012, jobMessageKey, 3));
        assertHandleEvent("message-key-1");

        callHandleEvent(today.plusDays(repeatIntervalInDays * 2), getMotechEvent(nov112011, may102012, jobMessageKey, 1));
        assertHandleEvent("message-key-3");

        callHandleEvent(today.plusDays(repeatIntervalInDays * 2 + 1), getMotechEvent(nov112011, may102012, jobMessageKey, 4));
        assertHandleEvent("message-key-3");

        callHandleEvent(today.plusDays(repeatIntervalInDays * 3), getMotechEvent(nov112011, may102012, jobMessageKey, 1));
        assertHandleEvent("message-key-4");
    }

    @Test
    public void shouldHandleEventForRepeatCampaignScheduleBasedOnWeeksDaysApplicableAndUpdateMessageKey() {

        String jobMessageKey = "message-key-" + OFFSET + "-" + WEEK_DAY;
        CampaignMessage campaignMessage = new CampaignMessageBuilder().repeatingCampaignMessageForDaysApplicable(campaignName,
                asList("Monday", "Wednesday", "Friday", "Saturday"), jobMessageKey);
        int repeatIntervalAs7 = ((RepeatingCampaignMessage) campaignMessage).repeatIntervalInDaysForOffset();
        when(allMessageCampaigns.get(campaignName, jobMessageKey)).thenReturn(campaignMessage);

        DateTime today = date(2011, 11, 16);
        Date nov162011 = today.toDate();
        Date may102012 = date(2012, 5, 10).toDate();
        assertEquals(7, repeatIntervalAs7);

        callHandleEvent(today, getMotechEvent(nov162011, may102012, jobMessageKey, 1));
        assertHandleEvent("message-key-1-Wednesday");

        callHandleEvent(today.plusDays(1), getMotechEvent(nov162011, may102012, jobMessageKey, 2));
        assertHandleEvent_ThatItDoesntProceed();

        callHandleEvent(today.plusDays(2), getMotechEvent(nov162011, may102012, jobMessageKey, 2));
        assertHandleEvent("message-key-2-Friday");

        callHandleEvent(today.plusDays(3), getMotechEvent(nov162011, may102012, jobMessageKey, 2));
        assertHandleEvent("message-key-2-Saturday");

        callHandleEvent(today.plusDays(11), getMotechEvent(nov162011, may102012, jobMessageKey, 5));
        assertHandleEvent_ThatItDoesntProceed();

        callHandleEvent(today.plusDays(repeatIntervalAs7 * 3), getMotechEvent(nov162011, may102012, jobMessageKey, 5));
        assertHandleEvent("message-key-8-Wednesday");
    }

    @Test
    public void shouldHandleEventForRepeatCampaignScheduleBasedOnCalendarWeeksDaysApplicableAndUpdateMessageKey() {

        String jobMessageKey = "message-key-" + OFFSET + "-" + WEEK_DAY;
        CampaignMessage campaignMessage = new CampaignMessageBuilder().repeatingCampaignMessageForCalendarWeek(campaignName,
                "Monday", asList("Monday", "Friday", "Sunday"), jobMessageKey);
        int repeatIntervalAs7 = ((RepeatingCampaignMessage) campaignMessage).repeatIntervalInDaysForOffset();
        when(allMessageCampaigns.get(campaignName, jobMessageKey)).thenReturn(campaignMessage);

        DateTime today = date(2011, 11, 18);
        Date nov182011 = today.toDate();
        Date may102012 = date(2012, 5, 10).toDate();
        assertEquals(7, repeatIntervalAs7);

        callHandleEvent(today, getMotechEvent(nov182011, may102012, jobMessageKey, 1));
        assertHandleEvent("message-key-1-Friday");

        callHandleEvent(today.plusDays(1), getMotechEvent(nov182011, may102012, jobMessageKey, 1));
        assertHandleEvent_ThatItDoesntProceed();

        callHandleEvent(today.plusDays(2), getMotechEvent(nov182011, may102012, jobMessageKey, 3));
        assertHandleEvent("message-key-3-Sunday");

        callHandleEvent(today.plusDays(3), getMotechEvent(nov182011, may102012, jobMessageKey, 4));
        assertHandleEvent("message-key-5-Monday");

        DateTime todayMockAs29Nov = today.plusDays(11);
        callHandleEvent(todayMockAs29Nov, getMotechEvent(nov182011, may102012, jobMessageKey, 1));
        assertHandleEvent_ThatItDoesntProceed();

        callHandleEvent(todayMockAs29Nov.plusDays(3), getMotechEvent(nov182011, may102012, jobMessageKey, 2));
        assertHandleEvent("message-key-4-Friday");

        callHandleEvent(today.plusDays(repeatIntervalAs7 * 4), getMotechEvent(nov182011, may102012, jobMessageKey, 1));
        assertHandleEvent("message-key-5-Friday");
    }

    private void callHandleEvent(DateTime todayMockTime, MotechEvent inputEvent) {
        reset(outboundEventGateway);
        mockCurrentDate(todayMockTime);
        handler.handleEvent(inputEvent);
    }

    private void assertHandleEvent(String expectedMsgKey) {
        assertHandleEvent(expectedMsgKey, true);
    }

    private void assertHandleEvent_ThatItDoesntProceed() {
        assertHandleEvent(null, false);
    }

    private void assertHandleEvent(String expectedMsgKey, boolean shouldFireToEventGateway) {
        ArgumentCaptor<MotechEvent> event = ArgumentCaptor.forClass(MotechEvent.class);
        if (shouldFireToEventGateway) {
            verify(outboundEventGateway, times(1)).sendEventMessage(event.capture());
            assertOffsetForMessage(event, expectedMsgKey);
        } else
            verify(outboundEventGateway, never()).sendEventMessage(event.capture());
    }

    private void assertOffsetForMessage(ArgumentCaptor<MotechEvent> event, String messageKey) {
        Map<String, Object> params = event.getValue().getParameters();
        assertNotNull(params);
        assertEquals(EventKeys.MESSAGE_CAMPAIGN_SEND_EVENT_SUBJECT, event.getValue().getSubject());
        assertEquals(campaignName, params.get(EventKeys.CAMPAIGN_NAME_KEY));
        assertEquals("job-id", params.get(EventKeys.SCHEDULE_JOB_ID_KEY));
        assertEquals("external-id", params.get(EventKeys.EXTERNAL_ID_KEY));
        assertEquals(messageKey, params.get(EventKeys.MESSAGE_KEY));
    }

    private MotechEvent getMotechEvent(Date startTime, Date endTime, String messageKey, int startOffset) {
        HashMap<String, Object> parameters = new HashMap<String, Object>();
        parameters.put(EventKeys.START_DATE, startTime);
        parameters.put(EventKeys.CAMPAIGN_NAME_KEY, campaignName);
        parameters.put(EventKeys.MESSAGE_KEY, messageKey);
        parameters.put(EventKeys.SCHEDULE_JOB_ID_KEY, "job-id");
        parameters.put(EventKeys.EXTERNAL_ID_KEY, "external-id");
        parameters.put(EventKeys.REPEATING_START_OFFSET, startOffset);
        return new MotechEvent(INTERNAL_REPEATING_MESSAGE_CAMPAIGN_SUBJECT, parameters)
                .setEndTime(endTime);
    }
}
