/**
 * MOTECH PLATFORM OPENSOURCE LICENSE AGREEMENT
 *
 * Copyright (c) 2011 Grameen Foundation USA.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Grameen Foundation USA, nor its respective contributors
 * may be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY GRAMEEN FOUNDATION USA AND ITS CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL GRAMEEN FOUNDATION USA OR ITS CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
 * OF SUCH DAMAGE.
 */
package org.motechproject.outbox.api.dao;

import org.apache.commons.lang.time.DateUtils;
import org.joda.time.DateTime;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.motechproject.outbox.api.dao.couchdb.OutboundVoiceMessageDaoImpl;
import org.motechproject.outbox.api.model.MessagePriority;
import org.motechproject.outbox.api.model.OutboundVoiceMessage;
import org.motechproject.outbox.api.model.OutboundVoiceMessageStatus;
import org.motechproject.outbox.api.model.VoiceMessageType;
import org.motechproject.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.*;

import static org.junit.Assert.*;

/**
 * @author yyonkov
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/applicationOutboxAPI.xml"})
public class OutboundVoiceMessageDaoIT {
    @Autowired
    private OutboundVoiceMessageDaoImpl outboundVoiceMessageDao;

    private String partyId1 = "0001";
    private String partyId2 = "0002";

    @Before
    public void setUp() {
        outboundVoiceMessageDao.removeAll();
        VoiceMessageType messageType = new VoiceMessageType();
        messageType.setVoiceMessageTypeName("Play something");
        messageType.setPriority(MessagePriority.HIGH);
        messageType.setTemplateName("appointmentReminder");

        // create messages
        DateTime now = DateUtil.now();
        for (int i = 0; i < 20; i++) {
            OutboundVoiceMessage msg = new OutboundVoiceMessage();
            msg.setVoiceMessageType(messageType);
            msg.setPartyId(i < 10 ? partyId1 : partyId2);
            msg.setCreationTime(now.plusDays(2).toDate());
            msg.setExpirationDate(now.plusDays(1 - 2 * (i & 2)).toDate());
            msg.setStatus((i & 1) > 0 ? OutboundVoiceMessageStatus.PENDING : OutboundVoiceMessageStatus.SAVED);
            outboundVoiceMessageDao.add(msg);
        }
    }

    @After
    public void tearDown() {
        outboundVoiceMessageDao.removeAll();
    }

    @Test
    public void shouldSaveTheListSpecifiedAsAParameter() {
        VoiceMessageType messageType = new VoiceMessageType();
        messageType.setVoiceMessageTypeName("Play something");
        messageType.setPriority(MessagePriority.HIGH);
        messageType.setTemplateName("playSequentially");

        String patientId = "Patient1";
        OutboundVoiceMessage messageWithAudioFiles = new OutboundVoiceMessage();
        messageWithAudioFiles.setPartyId(patientId);
        messageWithAudioFiles.setVoiceMessageType(messageType);

        HashMap<String, Object> parameters = new HashMap<String, Object>();
        List<String> sequenceOfFilesToPlay = Arrays.asList("file1.wav", "file2.wav", "file3.wav");
        parameters.put("audioFiles", sequenceOfFilesToPlay);
        messageWithAudioFiles.setParameters(parameters);
        messageWithAudioFiles.setStatus(OutboundVoiceMessageStatus.PENDING);
        messageWithAudioFiles.setExpirationDate(DateUtil.now().plusDays(10).toDate());

        outboundVoiceMessageDao.add(messageWithAudioFiles);

        List<OutboundVoiceMessage> messages = outboundVoiceMessageDao.getPendingMessages(patientId);
        assertEquals(1, messages.size());
        OutboundVoiceMessage message = messages.get(0);
        assertTrue(message.getParameters().containsKey("audioFiles"));
        assertEquals(message.getParameters().get("audioFiles"), sequenceOfFilesToPlay);
    }

    @Test
    public void testGetNextPendingMessage() {
        List<OutboundVoiceMessage> messages = outboundVoiceMessageDao.getPendingMessages(partyId1);
        assertNotNull(messages);
        assertEquals(3, messages.size());
        for (OutboundVoiceMessage m : messages) {
            assertEquals(OutboundVoiceMessageStatus.PENDING, m.getStatus());
            assertTrue(m.getExpirationDate().after(new Date()));
        }
    }

    @Test
    public void testGetSavedMessage() {
        List<OutboundVoiceMessage> messages = outboundVoiceMessageDao.getSavedMessages(partyId1);
        assertNotNull(messages);
        assertEquals(3, messages.size());
        for (OutboundVoiceMessage m : messages) {
            assertEquals(OutboundVoiceMessageStatus.SAVED, m.getStatus());
            assertTrue(m.getExpirationDate().after(new Date()));
//			System.out.println(m);
        }
    }

    @Test
    public void testGet() {
        int count = outboundVoiceMessageDao.getPendingMessagesCount(partyId1);
        System.out.println(count);
    }
}