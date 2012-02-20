package org.motechproject.outbox.api;


import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.mockito.internal.verification.VerificationModeFactory;
import org.mockito.runners.MockitoJUnitRunner;
import org.motechproject.event.EventRelay;
import org.motechproject.model.MotechEvent;
import org.motechproject.outbox.api.dao.OutboundVoiceMessageDao;
import org.motechproject.outbox.api.model.OutboundVoiceMessage;
import org.motechproject.outbox.api.model.OutboundVoiceMessageStatus;

import javax.management.RuntimeErrorException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertNull;
import static junit.framework.Assert.assertTrue;
import static org.mockito.Mockito.*;


/**
 * Voice Outbox Service Unit tests
 */
@RunWith(MockitoJUnitRunner.class)
public class VoiceOutboxServiceTest {
    private static final int MAX_MESSAGES_PENDING = 15;

	@InjectMocks
    VoiceOutboxServiceImpl voiceOutboxService = new VoiceOutboxServiceImpl();
    @Mock
    OutboundVoiceMessageDao outboundVoiceMessageDao;
    @Mock
    EventRelay eventRelay;

    @Before
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
        voiceOutboxService.setNumDayskeepSavedMessages(10);
        voiceOutboxService.setMaxNumberOfPendingMessages(MAX_MESSAGES_PENDING);
    }

    @Test
     public void testAddMessage() {
        String partyId = "pid";
        
        OutboundVoiceMessage outboundVoiceMessage = new OutboundVoiceMessage();
        outboundVoiceMessage.setPartyId(partyId);

        voiceOutboxService.addMessage(outboundVoiceMessage);

        when(outboundVoiceMessageDao.get(null)).thenThrow(new NullPointerException("Argument cannot be null"));
        verify(outboundVoiceMessageDao).add(outboundVoiceMessage);
     }

    @Test(expected = IllegalArgumentException.class)
     public void testAddMessageNullMessage() {

        voiceOutboxService.addMessage(null);

        verify(outboundVoiceMessageDao, times(0)).add(null);
     }

    @Test
    public void testGetNextPendingMessage() {

        String partyId = "pid";

        OutboundVoiceMessage  outboundVoiceMessage1 = new OutboundVoiceMessage();
        OutboundVoiceMessage  outboundVoiceMessage2 = new OutboundVoiceMessage();


        List<OutboundVoiceMessage> pendingVoiceMessages = new ArrayList<OutboundVoiceMessage>();
        pendingVoiceMessages.add(outboundVoiceMessage1);
        pendingVoiceMessages.add(outboundVoiceMessage2);

        when(outboundVoiceMessageDao.getPendingMessages(partyId)).thenReturn(pendingVoiceMessages);

        assertEquals(outboundVoiceMessage1, voiceOutboxService.getNextPendingMessage(partyId));

    }

    @Test(expected = IllegalArgumentException.class)
    public void testGetNextPendingMessageNullPartyId() {

        voiceOutboxService.getNextPendingMessage(null);

        verify(outboundVoiceMessageDao, times(0)).getPendingMessages(null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testGetNextPendingMessageEmptyPartyId() {

        voiceOutboxService.getNextPendingMessage("");

        verify(outboundVoiceMessageDao, times(0)).getPendingMessages(anyString());

    }

    @Test
    public void testGetNextPendingMessageNoMessages() {

        String partyId = "pid";

        when(outboundVoiceMessageDao.getPendingMessages(partyId)).thenReturn(new ArrayList<OutboundVoiceMessage>());

        assertNull(voiceOutboxService.getNextPendingMessage(partyId));
    }

    @Test
    public void testGetMessageById() {

        String messageId = "msgId";
        OutboundVoiceMessage message = new OutboundVoiceMessage();

        when(outboundVoiceMessageDao.get(messageId)).thenReturn(message);

        assertEquals(message, voiceOutboxService.getMessageById(messageId));

    }


    @Test
    public void testGetNextSavedMessage() {

        String partyId = "pid";

        OutboundVoiceMessage  outboundVoiceMessage1 = new OutboundVoiceMessage();
        OutboundVoiceMessage  outboundVoiceMessage2 = new OutboundVoiceMessage();


        List<OutboundVoiceMessage> pendingVoiceMessages = new ArrayList<OutboundVoiceMessage>();
        pendingVoiceMessages.add(outboundVoiceMessage1);
        pendingVoiceMessages.add(outboundVoiceMessage2);

        when(outboundVoiceMessageDao.getSavedMessages(partyId)).thenReturn(pendingVoiceMessages);

        assertEquals(outboundVoiceMessage1, voiceOutboxService.getNextSavedMessage(partyId));

    }

    @Test(expected = IllegalArgumentException.class)
    public void testGetNextSavedMessageNullPartyId() {

        voiceOutboxService.getNextSavedMessage(null);

        verify(outboundVoiceMessageDao, times(0)).getSavedMessages(null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testGetNextSavedMessageEmptyPartyId() {

        voiceOutboxService.getNextSavedMessage("");

        verify(outboundVoiceMessageDao, times(0)).getSavedMessages(anyString());

    }

    @Test
    public void testGetNextSavedMessageNoMessages() {

        String partyId = "pid";

        when(outboundVoiceMessageDao.getSavedMessages(partyId)).thenReturn(new ArrayList<OutboundVoiceMessage>());

        assertNull(voiceOutboxService.getNextSavedMessage(partyId));
    }


    @Test(expected = IllegalArgumentException.class)
    public void testGetMessageByIdNullId() {

        voiceOutboxService.getMessageById(null);

        verify(outboundVoiceMessageDao, times(0)).get(Matchers.<String>anyObject());
    }


    @Test(expected = IllegalArgumentException.class)
    public void testGetMessageByIdEmptyId() {

        voiceOutboxService.getMessageById("");

        verify(outboundVoiceMessageDao, times(0)).get(Matchers.<String>anyObject());
    }

    @Test
    public void testRemoveMessage() {

        String messageId = "msgId";
        OutboundVoiceMessage message = new OutboundVoiceMessage();

        when(outboundVoiceMessageDao.get(messageId)).thenReturn(message);

        voiceOutboxService.removeMessage(messageId);

        verify(outboundVoiceMessageDao, times(1)).safeRemove(message);

    }

    @Test(expected = IllegalArgumentException.class)
    public void testRemoveMessageNullMessageId() {

        voiceOutboxService.removeMessage(null);

        verify(outboundVoiceMessageDao, times(0)).getPendingMessages(anyString());
    }

    @Test(expected = IllegalArgumentException.class)
     public void testRemoveMessageEmptyMessageId() {

         voiceOutboxService.removeMessage("");

        verify(outboundVoiceMessageDao, times(0)).getPendingMessages(anyString());
    }

    @Test
     public void testRemoveMessageMessageNotExist() {
        //TODO - implement
    }

    @Test
    public void testSetMessageStatus() {

        String messageId = "msgId";

        when(outboundVoiceMessageDao.get(messageId)).thenReturn(new OutboundVoiceMessage());

        voiceOutboxService.setMessageStatus(messageId, OutboundVoiceMessageStatus.PLAYED);
        verify(outboundVoiceMessageDao).update(Matchers.<OutboundVoiceMessage>anyObject());

    }

    @Test(expected = IllegalArgumentException.class)
    public void testSetMessageStatusNullMessageId() {

        voiceOutboxService.setMessageStatus(null, OutboundVoiceMessageStatus.PLAYED);
        verify(outboundVoiceMessageDao, times(0)).update(Matchers.<OutboundVoiceMessage>anyObject());
    }

    @Test(expected = IllegalArgumentException.class)
    public void testSetMessageStatusEmptyMessageId() {

        voiceOutboxService.setMessageStatus("", OutboundVoiceMessageStatus.PLAYED);
        verify(outboundVoiceMessageDao, times(0)).update(Matchers.<OutboundVoiceMessage>anyObject());
    }

    @Test
    public void testGetNumberPendingMessages() {

         String partyId = "pid";

        when(outboundVoiceMessageDao.getPendingMessagesCount(partyId)).thenReturn(2);

        assertEquals(2, voiceOutboxService.getNumberPendingMessages(partyId));
    }

     @Test
    public void testGetNumberPendingMessagesNoMessages() {

         String partyId = "pid";

        when(outboundVoiceMessageDao.getPendingMessages(partyId)).thenReturn(new ArrayList<OutboundVoiceMessage>());

        assertEquals(0, voiceOutboxService.getNumberPendingMessages(partyId));
    }

    @Test(expected = IllegalArgumentException.class)
    public void testGetNumberPendingMessagesNullPartyId() {

        voiceOutboxService.getNumberPendingMessages(null);

        verify(outboundVoiceMessageDao, times(0)).getPendingMessages(null);

    }

    @Test(expected = IllegalArgumentException.class)
    public void testGetNumberPendingMessagesEmptyPartyId() {

        voiceOutboxService.getNumberPendingMessages("");

        verify(outboundVoiceMessageDao, times(0)).getPendingMessages(anyString());

    }

    @Test
    public void testSaveMessage() {

         String messageId = "msgId";

        OutboundVoiceMessage message = new OutboundVoiceMessage();

        when(outboundVoiceMessageDao.get(messageId)).thenReturn(message);

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, voiceOutboxService.getNumDayskeepSavedMessages());

        voiceOutboxService.saveMessage(messageId);
        verify(outboundVoiceMessageDao).update(message);
        assertEquals(OutboundVoiceMessageStatus.SAVED, message.getStatus());
        System.out.println(calendar.getTime().getTime() - message.getExpirationDate().getTime());
        assertTrue(message.getExpirationDate().getTime() - calendar.getTime().getTime() < 1000);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testSaveMessageNoMessageId() {

        voiceOutboxService.saveMessage(null);
        verify(outboundVoiceMessageDao, times(0)).update(Matchers.<OutboundVoiceMessage>any());
    }

    @Test
    public void testMaxPendingMessagesReached() {
    	String partyId = "001";
        OutboundVoiceMessage outboundVoiceMessage = new OutboundVoiceMessage();
        outboundVoiceMessage.setPartyId(partyId);
        
        when(outboundVoiceMessageDao.getPendingMessagesCount(partyId)).thenReturn(MAX_MESSAGES_PENDING);
        voiceOutboxService.addMessage(outboundVoiceMessage);
        
        verify(outboundVoiceMessageDao).add(outboundVoiceMessage);

        ArgumentCaptor<MotechEvent> argument = ArgumentCaptor.<MotechEvent>forClass(MotechEvent.class);
        verify(eventRelay).sendEventMessage(argument.capture());
        assertEquals(argument.getValue().getSubject(), EventKeys.OUTBOX_MAX_PENDING_MESSAGES_EVENT_SUBJECT);
        assertEquals(EventKeys.getPartyID(argument.getValue()), partyId);
    }
    
    @Test
    public void testMaxPendingMessagesMoreAndLess() {
    	String partyId = "001";
        OutboundVoiceMessage outboundVoiceMessage = new OutboundVoiceMessage();
        outboundVoiceMessage.setPartyId(partyId);
        
        // LESS
        when(outboundVoiceMessageDao.getPendingMessagesCount(partyId)).thenReturn(MAX_MESSAGES_PENDING-1);
        voiceOutboxService.addMessage(outboundVoiceMessage);

        // MORE
        when(outboundVoiceMessageDao.getPendingMessagesCount(partyId)).thenReturn(MAX_MESSAGES_PENDING+1);
        voiceOutboxService.addMessage(outboundVoiceMessage);

        verify(outboundVoiceMessageDao, times(2)).add(outboundVoiceMessage);
        verify(eventRelay, never()).sendEventMessage(any(MotechEvent.class));
    }

    @Test
    public void getTheFirstMessage() {
        OutboundVoiceMessage outboundVoiceMessage = new OutboundVoiceMessage();
        String partyId = "123";
        when(outboundVoiceMessageDao.getPendingMessages(partyId)).thenReturn(Arrays.asList(outboundVoiceMessage));
        OutboundVoiceMessage nextMessage = voiceOutboxService.nextMessage(null, partyId);
        assertEquals(outboundVoiceMessage, nextMessage);
    }

    @Test
    public void markMessageAsRead() {
        String partyId = "123";
        OutboundVoiceMessage currentMessage = mock(OutboundVoiceMessage.class);
        String currentMessageId = "1";

        OutboundVoiceMessage outboundVoiceMessage = new OutboundVoiceMessage();
        outboundVoiceMessage.setId("2");

        when(outboundVoiceMessageDao.get(currentMessageId)).thenReturn(currentMessage);
        when(outboundVoiceMessageDao.getPendingMessages(partyId)).thenReturn(Arrays.asList(outboundVoiceMessage));

        OutboundVoiceMessage nextMessage = voiceOutboxService.nextMessage(currentMessageId, partyId);

        InOrder inOrder = inOrder(currentMessage, outboundVoiceMessageDao);
        assertEquals(outboundVoiceMessage, nextMessage);
        inOrder.verify(currentMessage).setStatus(OutboundVoiceMessageStatus.PLAYED);
        inOrder.verify(outboundVoiceMessageDao).update(currentMessage);
        inOrder.verify(outboundVoiceMessageDao).getPendingMessages(partyId);
    }
}