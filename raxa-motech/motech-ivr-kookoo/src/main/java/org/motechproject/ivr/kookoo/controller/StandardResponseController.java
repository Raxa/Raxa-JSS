package org.motechproject.ivr.kookoo.controller;

import org.apache.log4j.Logger;
import org.motechproject.ivr.event.IVREvent;
import org.motechproject.ivr.kookoo.IVRException;
import org.motechproject.ivr.kookoo.KooKooIVRContext;
import org.motechproject.ivr.kookoo.KookooRequest;
import org.motechproject.ivr.kookoo.KookooResponseFactory;
import org.motechproject.ivr.kookoo.service.KookooCallDetailRecordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping(AllIVRURLs.STANDARD_RESPONSE_CONTROLLER)
public class StandardResponseController {
    Logger logger = Logger.getLogger(this.getClass());
    private KookooCallDetailRecordsService kookooCallDetailRecordsService;

    @Autowired
    public StandardResponseController(KookooCallDetailRecordsService kookooCallDetailRecordsService) {
        this.kookooCallDetailRecordsService = kookooCallDetailRecordsService;
    }

    @RequestMapping(value = AllIVRURLs.HANGUP_RESPONSE, method = RequestMethod.GET)
    @ResponseBody
    public String hangup(KookooRequest kookooRequest, HttpServletRequest request, HttpServletResponse response) {
        KooKooIVRContext ivrContext = new KooKooIVRContext(kookooRequest, request, response);
        return hangup(ivrContext);
    }

    public String hangup(KooKooIVRContext ivrContext) {
        try {
            prepareForHangup(ivrContext);
            return KookooResponseFactory.hangUpResponseWith(ivrContext.callId()).create(null);
        } catch (Exception e) {
            logger.error("Failed to even send hang-up response", e);
            throw new IVRException("Failed to even send hang-up response", e);
        }
    }

    public void prepareForHangup(KooKooIVRContext ivrContext) {
        kookooCallDetailRecordsService.close(ivrContext.callDetailRecordId(), ivrContext.externalId(), IVREvent.Hangup);
        ivrContext.invalidateSession();
    }

    @RequestMapping(value = AllIVRURLs.EMPTY_RESPONSE, method = RequestMethod.GET)
    @ResponseBody
    public String empty(@ModelAttribute KookooRequest ivrRequest) {
        try {
            return KookooResponseFactory.empty(ivrRequest.getSid()).create(null);
        } catch (Exception e) {
            logger.error("Failed to send empty response", e);
            throw new IVRException("Failed to send empty response", e);
        }
    }
}