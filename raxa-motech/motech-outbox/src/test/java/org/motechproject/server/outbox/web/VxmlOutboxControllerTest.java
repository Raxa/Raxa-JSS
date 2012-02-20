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
package org.motechproject.server.outbox.web;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.*;
import org.mockito.runners.MockitoJUnitRunner;
import org.motechproject.outbox.api.VoiceOutboxService;
import org.motechproject.outbox.api.model.OutboundVoiceMessage;
import org.motechproject.outbox.api.model.OutboundVoiceMessageStatus;
import org.motechproject.outbox.api.model.VoiceMessageType;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.*;

/**
 *
 */
@RunWith(MockitoJUnitRunner.class)
public class VxmlOutboxControllerTest {


    @InjectMocks
    VxmlOutboxController vxmlOutboxController = new VxmlOutboxController();

    @Mock
    private VoiceOutboxService voiceOutboxService;

    @Mock
    private HttpServletRequest request;

    @Mock
    HttpServletResponse response;

    @Before
    public void initMocks() {

        MockitoAnnotations.initMocks(this);
    }


    @Test
    public void testNextOutboxMessage() {

        String voiceMessageTypeName = "voicemessagetypename";

        OutboundVoiceMessage voiceMessage = new OutboundVoiceMessage();
        VoiceMessageType voiceMessageType = new VoiceMessageType();
        voiceMessageType.setVoiceMessageTypeName(voiceMessageTypeName);
        voiceMessage.setVoiceMessageType(voiceMessageType);


        when(voiceOutboxService.getNextPendingMessage(anyString())).thenReturn(voiceMessage);

        ModelAndView modelAndView = vxmlOutboxController.outboxMessage(request, response);

        Assert.assertEquals(voiceMessageTypeName, modelAndView.getViewName());


    }

    @Test
    public void testNextOutboxMessageException() {


        when(voiceOutboxService.getNextPendingMessage(anyString())).thenThrow(new RuntimeException());

        ModelAndView modelAndView = vxmlOutboxController.outboxMessage(request, response);

        Assert.assertEquals(VxmlOutboxController.ERROR_MESSAGE_TEMPLATE_NAME, modelAndView.getViewName());


    }

    @Test
    public void testNextOutboxMessageNoMessage() {


        ModelAndView modelAndView = vxmlOutboxController.outboxMessage(request, response);

        Assert.assertEquals(VxmlOutboxController.NO_MESSAGE_TEMPLATE_NAME, modelAndView.getViewName());


    }

    @Test
    public void testNextOutboxMessageInvalidMessageNoMessageType() {


        OutboundVoiceMessage voiceMessage = new OutboundVoiceMessage();


        when(voiceOutboxService.getNextPendingMessage(anyString())).thenReturn(voiceMessage);

        ModelAndView modelAndView = vxmlOutboxController.outboxMessage(request, response);

        Assert.assertEquals(VxmlOutboxController.ERROR_MESSAGE_TEMPLATE_NAME, modelAndView.getViewName());


    }

    @Test
    public void testOutboxMessage() {

        String messageId = "mID";
        String voiceMessageTypeName = "voicemessagetypename";

        OutboundVoiceMessage voiceMessage = new OutboundVoiceMessage();
        VoiceMessageType voiceMessageType = new VoiceMessageType();
        voiceMessageType.setVoiceMessageTypeName(voiceMessageTypeName);
        voiceMessage.setVoiceMessageType(voiceMessageType);

        Mockito.when(request.getParameter("mId")).thenReturn(messageId);
        when(voiceOutboxService.getMessageById(messageId)).thenReturn(voiceMessage);

        ModelAndView modelAndView = vxmlOutboxController.outboxMessage(request, response);

        Assert.assertEquals(voiceMessageTypeName, modelAndView.getViewName());

    }

    @Test
    public void testOutboxMessageException() {

        String messageId = "mID";
        String voiceMessageTypeName = "voicemessagetypename";


        Mockito.when(request.getParameter("mId")).thenReturn(messageId);
        when(voiceOutboxService.getMessageById(messageId)).thenThrow(new RuntimeException());

        ModelAndView modelAndView = vxmlOutboxController.outboxMessage(request, response);

        Assert.assertEquals(VxmlOutboxController.ERROR_MESSAGE_TEMPLATE_NAME, modelAndView.getViewName());

    }

    @Test
    public void testSavedMessage() {

        String partyId = "1";
        String voiceMessageTypeName = "voicemessagetypename";

        OutboundVoiceMessage voiceMessage = new OutboundVoiceMessage();
        VoiceMessageType voiceMessageType = new VoiceMessageType();
        voiceMessageType.setVoiceMessageTypeName(voiceMessageTypeName);
        voiceMessage.setVoiceMessageType(voiceMessageType);

        when(request.getParameter("pId")).thenReturn(partyId);
        when(voiceOutboxService.getNextSavedMessage(partyId)).thenReturn(voiceMessage);

        ModelAndView modelAndView = vxmlOutboxController.savedMessage(request, response);

        Assert.assertEquals(voiceMessageTypeName, modelAndView.getViewName());

    }

    @Test
    public void testSavedMessageException() {


        when(voiceOutboxService.getNextSavedMessage(anyString())).thenThrow(new RuntimeException());

        ModelAndView modelAndView = vxmlOutboxController.savedMessage(request, response);

        Assert.assertEquals(VxmlOutboxController.ERROR_MESSAGE_TEMPLATE_NAME, modelAndView.getViewName());

    }

    @Test
    public void testSavedMessageNoMessage() {

        String partyId = "1";
        when(voiceOutboxService.getNextSavedMessage(partyId)).thenReturn(null);

        ModelAndView modelAndView = vxmlOutboxController.savedMessage(request, response);

        Assert.assertEquals(VxmlOutboxController.NO_SAVED_MESSAGE_TEMPLATE_NAME, modelAndView.getViewName());

    }

    @Test
        public void testSavedMessageInvalidNoMessageType() {

            String partyId = "1";

            OutboundVoiceMessage voiceMessage = new OutboundVoiceMessage();

            when(request.getParameter("pId")).thenReturn(partyId);
            when(voiceOutboxService.getNextSavedMessage(partyId)).thenReturn(voiceMessage);

            ModelAndView modelAndView = vxmlOutboxController.savedMessage(request, response);

            Assert.assertEquals(VxmlOutboxController.ERROR_MESSAGE_TEMPLATE_NAME, modelAndView.getViewName());

        }



    @Test
    public void testMessageMenu() {

        String messageId = "mID";

        OutboundVoiceMessage voiceMessage = new OutboundVoiceMessage();
        voiceMessage.setStatus(OutboundVoiceMessageStatus.PENDING);

        when(request.getParameter("mId")).thenReturn(messageId);
        when(voiceOutboxService.getMessageById(messageId)).thenReturn(voiceMessage);

        ModelAndView modelAndView = vxmlOutboxController.messageMenu(request, response);

        Assert.assertEquals(VxmlOutboxController.MESSAGE_MENU_TEMPLATE_NAME, modelAndView.getViewName());
        verify(voiceOutboxService).setMessageStatus(messageId, OutboundVoiceMessageStatus.PLAYED);
    }

    @Test
    public void testSavedMessageMenu() {

        String messageId = "mID";

        OutboundVoiceMessage voiceMessage = new OutboundVoiceMessage();
        voiceMessage.setStatus(OutboundVoiceMessageStatus.SAVED);

        when(request.getParameter("mId")).thenReturn(messageId);
        when(voiceOutboxService.getMessageById(messageId)).thenReturn(voiceMessage);

        ModelAndView modelAndView = vxmlOutboxController.messageMenu(request, response);

        Assert.assertEquals(VxmlOutboxController.SAVED_MESSAGE_MENU_TEMPLATE_NAME, modelAndView.getViewName());
        verify(voiceOutboxService, times(0)).setMessageStatus(anyString(), Matchers.<OutboundVoiceMessageStatus>any());
    }

    @Test
    public void testMessageMenuNoMessageId() {

        String messageId = "mID";

        Mockito.when(request.getParameter("mId")).thenReturn(null);

        ModelAndView modelAndView = vxmlOutboxController.messageMenu(request, response);

        Assert.assertEquals(VxmlOutboxController.ERROR_MESSAGE_TEMPLATE_NAME, modelAndView.getViewName());
    }

    @Test
    public void testMessageMenuException() {

        String messageId = "mID";

        Mockito.when(request.getParameter("mId")).thenReturn(messageId);
        when(voiceOutboxService.getMessageById(anyString())).thenThrow(new RuntimeException());

        ModelAndView modelAndView = vxmlOutboxController.messageMenu(request, response);

        Assert.assertEquals(VxmlOutboxController.ERROR_MESSAGE_TEMPLATE_NAME, modelAndView.getViewName());
    }

    @Test
    public void testMessageMenuNoMessage() {

        String messageId = "mID";

        Mockito.when(request.getParameter("mId")).thenReturn(messageId);
        when(voiceOutboxService.getMessageById(messageId)).thenReturn(null);

        ModelAndView modelAndView = vxmlOutboxController.messageMenu(request, response);

        Assert.assertEquals(VxmlOutboxController.ERROR_MESSAGE_TEMPLATE_NAME, modelAndView.getViewName());
    }


    @Test
    public void testSaveOutboxMessage() {

        String messageId = "mID";
        String voiceMessageTypeName = "voicemessagetypename";

        OutboundVoiceMessage voiceMessage = new OutboundVoiceMessage();
        VoiceMessageType voiceMessageType = new VoiceMessageType();
        voiceMessageType.setVoiceMessageTypeName(voiceMessageTypeName);
        voiceMessage.setVoiceMessageType(voiceMessageType);

        Mockito.when(request.getParameter("mId")).thenReturn(messageId);
        when(voiceOutboxService.getMessageById(messageId)).thenReturn(new OutboundVoiceMessage());

        ModelAndView modelAndView = vxmlOutboxController.save(request, response);
        verify(voiceOutboxService).saveMessage(messageId);
        Assert.assertEquals(VxmlOutboxController.MESSAGE_SAVED_CONFIRMATION_TEMPLATE_NAME, modelAndView.getViewName());

    }

    @Test
    public void testSaveOutboxMessageException() {

        String messageId = "mID";


        Mockito.when(request.getParameter(VxmlOutboxController.MESSAGE_ID_PARAM)).thenReturn(messageId);
        when(voiceOutboxService.getMessageById(messageId)).thenReturn(new OutboundVoiceMessage());
        doThrow(new RuntimeException()).when(voiceOutboxService).saveMessage(messageId);

        ModelAndView modelAndView = vxmlOutboxController.save(request, response);

        Assert.assertEquals(VxmlOutboxController.SAVE_MESSAGE_ERROR_TEMPLATE_NAME, modelAndView.getViewName());
        verify(voiceOutboxService).saveMessage(messageId);

    }

    @Test
    public void testSaveOutboxMessageNoMessageId() {

        Mockito.when(request.getParameter(VxmlOutboxController.MESSAGE_ID_PARAM)).thenReturn(null);

        ModelAndView modelAndView = vxmlOutboxController.save(request, response);

        Assert.assertEquals(VxmlOutboxController.ERROR_MESSAGE_TEMPLATE_NAME, modelAndView.getViewName());
        verify(voiceOutboxService, times(0)).saveMessage(anyString());
    }

    @Test
       public void testRemoveOutboxMessage() {

           String messageId = "mID";


           when(request.getParameter("mId")).thenReturn(messageId);
           when(voiceOutboxService.getMessageById(messageId)).thenReturn(new OutboundVoiceMessage());

           ModelAndView modelAndView = vxmlOutboxController.remove(request, response);
           verify(voiceOutboxService).setMessageStatus(messageId, OutboundVoiceMessageStatus.PLAYED);
           Assert.assertEquals(VxmlOutboxController.MESSAGE_REMOVED_CONFIRMATION_TEMPLATE_NAME, modelAndView.getViewName());

       }



    @Test
    public void testRemoveOutboxMessageException() {

        String messageId = "mID";


        Mockito.when(request.getParameter(VxmlOutboxController.MESSAGE_ID_PARAM)).thenReturn(messageId);
        doThrow(new RuntimeException()).when(voiceOutboxService).setMessageStatus(anyString(), Matchers.<OutboundVoiceMessageStatus>any());

        ModelAndView modelAndView = vxmlOutboxController.remove(request, response);

        Assert.assertEquals(VxmlOutboxController.REMOVE_SAVED_MESSAGE_ERROR_TEMPLATE_NAME, modelAndView.getViewName());

    }

    @Test
    public void testRemoveOutboxMessageNoMessageId() {

        Mockito.when(request.getParameter(VxmlOutboxController.MESSAGE_ID_PARAM)).thenReturn(null);

        ModelAndView modelAndView = vxmlOutboxController.remove(request, response);

        Assert.assertEquals(VxmlOutboxController.ERROR_MESSAGE_TEMPLATE_NAME, modelAndView.getViewName());
        verify(voiceOutboxService, times(0)).setMessageStatus(anyString(), Matchers.<OutboundVoiceMessageStatus>any());
    }

}
