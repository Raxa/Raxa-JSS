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

import org.apache.commons.lang.StringEscapeUtils;
import org.motechproject.outbox.api.VoiceOutboxService;
import org.motechproject.outbox.api.model.OutboundVoiceMessage;
import org.motechproject.outbox.api.model.OutboundVoiceMessageStatus;
import org.motechproject.outbox.api.model.VoiceMessageType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Spring MVC controller implementation provides method to handle HTTP requests and generate
 * VXML documents based on stored in outbox objects and the corresponding Velocity template
 *
 * @author Igor (iopushnyev@2paths.com)
 */
public class VxmlOutboxController extends MultiActionController {

    private Logger logger = LoggerFactory.getLogger((this.getClass()));

    public static final String NO_MESSAGE_TEMPLATE_NAME = "nomsg";
    public static final String NO_SAVED_MESSAGE_TEMPLATE_NAME = "noSavedMsg";
    public static final String ERROR_MESSAGE_TEMPLATE_NAME = "msgError";
    public static final String MESSAGE_MENU_TEMPLATE_NAME = "msgMenu";
    public static final String SAVED_MESSAGE_MENU_TEMPLATE_NAME = "savedMsgMenu";
    public static final String MESSAGE_SAVED_CONFIRMATION_TEMPLATE_NAME = "msgSavedConf";
    public static final String MESSAGE_REMOVED_CONFIRMATION_TEMPLATE_NAME = "msgRemovedConf";
    public static final String SAVE_MESSAGE_ERROR_TEMPLATE_NAME = "saveMsgError";
    public static final String REMOVE_SAVED_MESSAGE_ERROR_TEMPLATE_NAME = "removeSavedMsgError";

     public static final String MESSAGE_ID_PARAM = "mId";
     
    public static final String LANGUAGE_PARAM = "ln";

    @Autowired
    VoiceOutboxService voiceOutboxService;

    /**
     * Handles Appointment Reminder HTTP requests and generates a VXML document based on a Velocity template.
     * The HTTP request may contain an optional 'mId' parameter with value of ID of the message for which
     * VXML document will be generated. If the "mId" parameter is not passed the next pending voice message
     * will be obtained from the outbox and a VXML document will be generated for that message
     * <p/>
     * <p/>
     * URL to request appointment reminder VoiceXML:
     * http://<host>:<port>/<motech-platform-server>/module/outbox/vxml/outboxMessage?mId=<messageId>
     */
    public ModelAndView outboxMessage(HttpServletRequest request, HttpServletResponse response) {
        logger.info("Generate appointment reminder VXML");

        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");



        //Interim implementation. Party ID will be obtained from the Authentication context
        //String partyId = "1";
        String partyId = request.getParameter("pId");

        String messageId = request.getParameter(MESSAGE_ID_PARAM);
        String language = request.getParameter(LANGUAGE_PARAM);

        if(language == null) {
            language = "en";
        }

        String contextPath = request.getContextPath();

        ModelAndView mav = new ModelAndView();
        mav.addObject("contextPath", contextPath);
        mav.addObject("language", language);
        mav.addObject("escape", new StringEscapeUtils());


        logger.debug("Message ID: " + messageId);

        OutboundVoiceMessage voiceMessage = null;

        if (messageId != null) {
            logger.info("Generating VXML for the voice message ID: " + messageId);

            try {
                voiceMessage = voiceOutboxService.getMessageById(messageId);
            } catch (Exception e) {
                logger.error("Can not get message by ID: " + messageId +
                        " " + e.getMessage(), e);
                logger.warn("Generating a VXML with the error message...");
                mav.setViewName(ERROR_MESSAGE_TEMPLATE_NAME);
                return mav;
            }
        } else {
            logger.info("Generating VXML for the next voice message in outbox... ");
            try {
                voiceMessage = voiceOutboxService.getNextPendingMessage(partyId);
            } catch (Exception e) {
                logger.error("Can not obtain next message from the outbox of the party ID: " + partyId +
                        " " + e.getMessage(), e);
                logger.warn("Generating a VXML with the error message...");
                mav.setViewName(ERROR_MESSAGE_TEMPLATE_NAME);
                return mav;
            }
        }

        if (voiceMessage == null) {

            logger.info("There are no more messages in the outbox of the party ID: " + partyId);
            mav.setViewName(NO_MESSAGE_TEMPLATE_NAME);
            mav.addObject("partyId", partyId);
            return mav;
        }

        VoiceMessageType voiceMessageType = voiceMessage.getVoiceMessageType();

        if (voiceMessageType == null) {
            logger.error("Invalid Outbound voice message: " + voiceMessage + " Voice message type can not be null.");
            mav.setViewName(ERROR_MESSAGE_TEMPLATE_NAME);
            mav.addObject("partyId", partyId);
            return mav;
        }

         logger.debug(voiceMessage.toString());

        String templateName = voiceMessageType.getTemplateName();
        if (templateName == null) {
            templateName = voiceMessageType.getVoiceMessageTypeName();
        }

        mav.setViewName(templateName);
        mav.addObject("message", voiceMessage);

        return mav;

    }

    public ModelAndView messageMenu(HttpServletRequest request, HttpServletResponse response) {
        logger.info("Generating the message menu VXML...");

        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");

        ModelAndView mav = new ModelAndView();

        String messageId = request.getParameter(MESSAGE_ID_PARAM);
        String language = request.getParameter(LANGUAGE_PARAM);

        logger.info("Message ID: " + messageId);

        if (messageId == null) {
            logger.error("Invalid request - missing parameter: " + MESSAGE_ID_PARAM);
            mav.setViewName(ERROR_MESSAGE_TEMPLATE_NAME);
            return mav;
        }

        OutboundVoiceMessage voiceMessage;

         try {
                voiceMessage = voiceOutboxService.getMessageById(messageId);
            } catch (Exception e) {
                logger.error("Can not get message by ID: " + messageId +
                        " " + e.getMessage(), e);
                logger.warn("Generating a VXML with the error message...");
                mav.setViewName(ERROR_MESSAGE_TEMPLATE_NAME);
                return mav;
            }

        if (voiceMessage == null) {

            logger.error("Can not get message by ID: " + messageId + "service returned null");
                logger.warn("Generating a VXML with the error message...");
                mav.setViewName(ERROR_MESSAGE_TEMPLATE_NAME);
                return mav;
        }


        if (voiceMessage.getStatus() == OutboundVoiceMessageStatus.SAVED) {

            mav.setViewName(SAVED_MESSAGE_MENU_TEMPLATE_NAME);
        } else {
            try {
                voiceOutboxService.setMessageStatus(messageId, OutboundVoiceMessageStatus.PLAYED);
            } catch (Exception e) {
                logger.error("Can not set message status to " + OutboundVoiceMessageStatus.PLAYED + " to the message ID: " + messageId, e);
            }
            mav.setViewName(MESSAGE_MENU_TEMPLATE_NAME);
        }

        String contextPath = request.getContextPath();

         logger.debug(voiceMessage.toString());
        logger.debug(mav.getViewName());

        mav.addObject("contextPath", contextPath);
        mav.addObject("message", voiceMessage);
        mav.addObject("language", language);
        mav.addObject("escape", new StringEscapeUtils());
        return mav;

    }

    public ModelAndView save(HttpServletRequest request, HttpServletResponse response) {
        logger.info("Saving messageL...");

        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");

        String messageId = request.getParameter(MESSAGE_ID_PARAM);
        String language = request.getParameter(LANGUAGE_PARAM);

        ModelAndView mav = new ModelAndView();

        String contextPath = request.getContextPath();


        mav.setViewName(MESSAGE_SAVED_CONFIRMATION_TEMPLATE_NAME);
        mav.addObject("contextPath", contextPath);
        mav.addObject("language", language);
        mav.addObject("escape", new StringEscapeUtils());



        logger.info("Message ID: " + messageId);

        if (messageId == null) {
            logger.error("Invalid request - missing parameter: " + MESSAGE_ID_PARAM);
            mav.setViewName(ERROR_MESSAGE_TEMPLATE_NAME);
            return mav;
        }


        try {
            voiceOutboxService.saveMessage(messageId);
        } catch (Exception e) {
            logger.error("Can not mark the message with ID: " + messageId + " as saved in the outbox", e);
            mav.setViewName(SAVE_MESSAGE_ERROR_TEMPLATE_NAME);
            return mav;
        }

         //TODO - get party ID proper way from security principal or authentication context when it is available
        String partyId;
        try {
            OutboundVoiceMessage message =  voiceOutboxService.getMessageById(messageId);
            partyId = message.getPartyId();
        } catch (Exception e) {
            logger.error("Can not obtain message ID: " + messageId + " to get party ID");
            mav.setViewName(ERROR_MESSAGE_TEMPLATE_NAME);
            return mav;
        }

        mav.addObject("days", voiceOutboxService.getNumDayskeepSavedMessages());
        mav.addObject("partyId", partyId);
        return mav;

    }

     /**
     * Handles Outbox HTTP requests to remove saved in the outbox message and generates a VXML document
      * with message remove confirmation. The generated VXML document based on the msgRemovedConf.vm  Velocity template.
      *
      * The message will not be physically removed. The message status will be set to PLAYED.
      *
     * <p/>
     * <p/>
     * URL to request a saved VoiceXML message from outbox :
     * http://<host>:<port>/<motech-platform-server>/module/outbox/vxml/remove?mId=$message.id&ln=$language>
     */
     public ModelAndView remove(HttpServletRequest request, HttpServletResponse response) {
        logger.info("Removing saved message message...");

        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");

        String messageId = request.getParameter(MESSAGE_ID_PARAM);
        String language = request.getParameter(LANGUAGE_PARAM);

         String contextPath = request.getContextPath();

         ModelAndView mav = new ModelAndView();
        mav.setViewName(MESSAGE_REMOVED_CONFIRMATION_TEMPLATE_NAME);
        mav.addObject("contextPath", contextPath);
        mav.addObject("language", language);
        mav.addObject("escape", new StringEscapeUtils());

        logger.info("Message ID: " + messageId);

        if (messageId == null) {
            logger.error("Invalid request - missing parameter: " + MESSAGE_ID_PARAM);
            mav.setViewName(ERROR_MESSAGE_TEMPLATE_NAME);
            return mav;
        }

        try {
            voiceOutboxService.setMessageStatus(messageId, OutboundVoiceMessageStatus.PLAYED);
        } catch (Exception e) {
            logger.error("Can not mark the message with ID: " + messageId + " as PLAYED in the outbox", e);
            mav.setViewName(REMOVE_SAVED_MESSAGE_ERROR_TEMPLATE_NAME);
            return mav;
        }

          //TODO - get party ID proper way from security principal or authentication context when it is available
        String partyId;
        try {
            OutboundVoiceMessage message =  voiceOutboxService.getMessageById(messageId);
            partyId = message.getPartyId();
        } catch (Exception e) {
            logger.error("Can not obtain message ID: " + messageId + " to get party ID");
            mav.setViewName(ERROR_MESSAGE_TEMPLATE_NAME);
            return mav;
        }

         logger.debug("partyId: " + partyId);

        mav.addObject("partyId", partyId);
        return mav;

    }


    /**
     * Handles Outbox HTTP requests and generates a VXML document based on a Velocity template and data saved in the outbox.
     * <p/>
     * <p/>
     * URL to request a saved VoiceXML message from outbox :
     * http://<host>:<port>/<motech-platform-server>/module/outbox/vxml/savedMessage>
     */
    public ModelAndView savedMessage(HttpServletRequest request, HttpServletResponse response) {
        logger.info("Generate VXML for the next saved in the outbox message");

        response.setContentType("text/plain");
        response.setCharacterEncoding("UTF-8");

        //Interim implementation. Party ID will be obtained from the Authentication context
        //String partyId = "1";
        String partyId = request.getParameter("pId");


        String language = request.getParameter(LANGUAGE_PARAM);

        String contextPath = request.getContextPath();

        ModelAndView mav = new ModelAndView();
        mav.addObject("contextPath", contextPath);
        mav.addObject("language", language);
        mav.addObject("escape", new StringEscapeUtils());

        logger.debug("Party ID: " + partyId);

        OutboundVoiceMessage voiceMessage = null;


            logger.info("Generating VXML for the next saved voice message in outbox... ");
            try {
                voiceMessage = voiceOutboxService.getNextSavedMessage(partyId);
            } catch (Exception e) {
                logger.error("Can not obtain next saved message from the outbox of the party ID: " + partyId +
                        " " + e.getMessage(), e);
                logger.warn("Generating a VXML with the error message...");
                mav.setViewName(ERROR_MESSAGE_TEMPLATE_NAME);
                return mav;
            }

        if (voiceMessage == null) {

            logger.info("There are no more messages in the outbox of the party ID: " + partyId);
            mav.setViewName(NO_SAVED_MESSAGE_TEMPLATE_NAME);
            mav.addObject("partyId", partyId);
            return mav;
        }

        VoiceMessageType voiceMessageType = voiceMessage.getVoiceMessageType();

        if (voiceMessageType == null) {
            logger.error("Invalid Outbound voice message: " + voiceMessage + " Voice message type can not be null.");
            mav.setViewName(ERROR_MESSAGE_TEMPLATE_NAME);
            mav.addObject("partyId", partyId);
            return mav;
        }


        String templateName = voiceMessageType.getTemplateName();
        if (templateName == null) {
            templateName = voiceMessageType.getVoiceMessageTypeName();
        }

        mav.setViewName(templateName);
        mav.addObject("message", voiceMessage);

        return mav;

    }

}
