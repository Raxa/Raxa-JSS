package org.motechproject.outbox.api;


import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;
import org.motechproject.MotechObject;
import org.motechproject.context.EventContext;
import org.motechproject.event.EventRelay;
import org.motechproject.model.MotechEvent;
import org.motechproject.outbox.api.dao.OutboundVoiceMessageDao;
import org.motechproject.outbox.api.model.OutboundVoiceMessage;
import org.motechproject.outbox.api.model.OutboundVoiceMessageStatus;
import org.motechproject.util.DateUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;

import java.util.Calendar;
import java.util.List;

//TODO: The API of VoiceOutboxService is anemic (exposes the domain model, just a wrapper over the dao)
public class VoiceOutboxServiceImpl extends MotechObject implements VoiceOutboxService {

    final Logger log = LoggerFactory.getLogger(VoiceOutboxServiceImpl.class);
    private int numDayskeepSavedMessages;

    /**
     * Should be configurable externally.
     * if pendingMessages > maxNumberOfPendingMessages we need to emit event
     */
    private int maxNumberOfPendingMessages = Integer.MAX_VALUE;

    @Autowired(required = false)
    private EventRelay eventRelay = EventContext.getInstance().getEventRelay();

    @Autowired
    private OutboundVoiceMessageDao outboundVoiceMessageDao;

    @Override
    @SuppressWarnings("unchecked")
    public void addMessage(OutboundVoiceMessage outboundVoiceMessage) {
        assertArgumentNotNull("OutboundVoiceMessage", outboundVoiceMessage);
        logInfo("Add message: %s", outboundVoiceMessage);

        outboundVoiceMessage.setStatus(OutboundVoiceMessageStatus.PENDING);
        outboundVoiceMessage.setCreationTime(DateUtil.now().toDate());
        outboundVoiceMessageDao.add(outboundVoiceMessage);

        //sends max-pending-messages event if needed
        String pId = outboundVoiceMessage.getPartyId();
        Assert.hasText(pId, "VoiceMessage must have a valid partyId");
        int msgNum = outboundVoiceMessageDao.getPendingMessagesCount(pId);
        if (maxNumberOfPendingMessages == msgNum) {
            log.warn(String.format("Max number (%d) of pending messages reached!", msgNum));
            eventRelay.sendEventMessage(new MotechEvent(EventKeys.OUTBOX_MAX_PENDING_MESSAGES_EVENT_SUBJECT, ArrayUtils.toMap(new Object[][]{{EventKeys.PARTY_ID_KEY, pId}})));
        }
    }

    @Override
    public OutboundVoiceMessage getNextPendingMessage(String partyId) {
        assertArgumentNotEmpty("PartyId", partyId);
        logInfo("Get next pending message for the party ID: %s", partyId);
        List<OutboundVoiceMessage> pendingVoiceMessages = outboundVoiceMessageDao.getPendingMessages(partyId);
        return pendingVoiceMessages.size() > 0 ? pendingVoiceMessages.get(0) : null;
    }

    @Override
    public OutboundVoiceMessage getNextSavedMessage(String partyId) {
        assertArgumentNotEmpty("PartyID", partyId);
        logInfo(String.format("Get next saved message for the party ID: %s", partyId));
        List<OutboundVoiceMessage> savedVoiceMessages = outboundVoiceMessageDao.getSavedMessages(partyId);
        return savedVoiceMessages.size() > 0 ? savedVoiceMessages.get(0) : null;
    }

    @Override
    public OutboundVoiceMessage getMessageById(String outboundVoiceMessageId) {
        assertArgumentNotEmpty("OutboundVoiceMessageId", outboundVoiceMessageId);
        logInfo("Get message by ID: %s", outboundVoiceMessageId);
        return outboundVoiceMessageDao.get(outboundVoiceMessageId);
    }

    @Override
    public void removeMessage(String outboundVoiceMessageId) {
        assertArgumentNotEmpty("OutboundVoiceMessageId", outboundVoiceMessageId);
        logInfo("Remove message ID: %s", outboundVoiceMessageId);
        OutboundVoiceMessage outboundVoiceMessage = getMessageById(outboundVoiceMessageId);
        outboundVoiceMessageDao.safeRemove(outboundVoiceMessage);
    }

    @Override
    public void setMessageStatus(String outboundVoiceMessageId, OutboundVoiceMessageStatus status) {
        assertArgumentNotEmpty("OutboundVoiceMessageId", outboundVoiceMessageId);
        logInfo("Set status: %s to the message ID: %s", status, outboundVoiceMessageId);
        OutboundVoiceMessage outboundVoiceMessage = outboundVoiceMessageDao.get(outboundVoiceMessageId);
        outboundVoiceMessage.setStatus(status);
        outboundVoiceMessageDao.update(outboundVoiceMessage);
    }

    @Override
    public void saveMessage(String outboundVoiceMessageId) {
        assertArgumentNotEmpty("OutboundVoiceMessageId", outboundVoiceMessageId);
        logInfo("Save in the outbox message ID: %s", outboundVoiceMessageId);

        OutboundVoiceMessage outboundVoiceMessage = getMessageById(outboundVoiceMessageId);
        outboundVoiceMessage.setStatus(OutboundVoiceMessageStatus.SAVED);

        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, numDayskeepSavedMessages);
        outboundVoiceMessage.setExpirationDate(calendar.getTime());
        outboundVoiceMessageDao.update(outboundVoiceMessage);
    }

    @Override
    public int getNumberPendingMessages(String partyId) {
        logInfo("Get number of pending messages for the party ID: %s", partyId);
        assertArgumentNotEmpty("PartyID", partyId);
        return outboundVoiceMessageDao.getPendingMessagesCount(partyId);
    }

    @Override
    public int getNumDayskeepSavedMessages() {
        return numDayskeepSavedMessages;
    }

    @Override
    public void setNumDayskeepSavedMessages(int numDayskeepSavedMessages) {
        this.numDayskeepSavedMessages = numDayskeepSavedMessages;
    }

    @Override
    public void setMaxNumberOfPendingMessages(int maxNumberOfPendingMessages) {
        this.maxNumberOfPendingMessages = maxNumberOfPendingMessages;
    }

    @Override
    public int getMaxNumberOfPendingMessages() {
        return this.maxNumberOfPendingMessages;
    }

    @Override
    public OutboundVoiceMessage nextMessage(String lastMessageId, String partyId) {
        if (StringUtils.isNotEmpty(lastMessageId))
            setMessageStatus(lastMessageId, OutboundVoiceMessageStatus.PLAYED);
        return getNextPendingMessage(partyId);
    }
}
