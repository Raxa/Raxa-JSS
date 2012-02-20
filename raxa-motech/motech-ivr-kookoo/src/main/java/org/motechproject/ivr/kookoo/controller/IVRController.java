package org.motechproject.ivr.kookoo.controller;

import org.apache.log4j.Logger;
import org.motechproject.ivr.event.IVREvent;
import org.motechproject.ivr.kookoo.KooKooIVRContext;
import org.motechproject.ivr.kookoo.KookooRequest;
import org.motechproject.ivr.kookoo.extensions.CallFlowController;
import org.motechproject.ivr.kookoo.service.KookooCallDetailRecordsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping("/ivr")
public class IVRController {
    Logger logger = Logger.getLogger(this.getClass());
    private CallFlowController callFlowController;
    private KookooCallDetailRecordsService kookooCallDetailRecordsService;

    @Autowired
    public IVRController(CallFlowController callFlowController, KookooCallDetailRecordsService kookooCallDetailRecordsService) {
        this.callFlowController = callFlowController;
        this.kookooCallDetailRecordsService = kookooCallDetailRecordsService;
    }

    @RequestMapping(value = "reply", method = RequestMethod.GET)
    public String reply(KookooRequest kookooRequest, HttpServletRequest request, HttpServletResponse response) {
        KooKooIVRContext kooKooIVRContext = new KooKooIVRContext(kookooRequest, request, response);
        return reply(kooKooIVRContext);
    }

    String reply(KooKooIVRContext ivrContext) {
        try {
            logger.info(ivrContext.allCookies());
            ivrContext.setDefaults();
            IVREvent ivrEvent = Enum.valueOf(IVREvent.class, ivrContext.ivrEvent());
            switch (ivrEvent) {
                case NewCall:
                    ivrContext.initialize();
                    String kooKooCallDetailRecordId = kookooCallDetailRecordsService.create(ivrContext.callId(), ivrContext.callerId(), ivrContext.callDirection());
                    ivrContext.callDetailRecordId(kooKooCallDetailRecordId);
                    break;
                case Disconnect:
                case Hangup:
                    if (ivrContext.isValidSession()) {
                        kookooCallDetailRecordsService.close(ivrContext.callDetailRecordId(), ivrContext.externalId(), ivrEvent);
                        ivrContext.invalidateSession();
                    }
                    String url = AllIVRURLs.springTransferUrlToEmptyResponse();
                    logger.info(String.format("Transferring to %s", url));
                    return url;
                case GotDTMF:
                    kookooCallDetailRecordsService.appendEvent(ivrContext.callDetailRecordId(), ivrEvent, ivrContext.userInput());
            }
            String url = callFlowController.urlFor(ivrContext);
            if (AllIVRURLs.DECISION_TREE_URL.equals(url)) {
                String treeName = callFlowController.decisionTreeName(ivrContext);
                ivrContext.treeName(treeName);
            }

            String transferURL = AllIVRURLs.springTransferUrl(url, ivrContext.ivrEvent().toLowerCase());
            logger.info(String.format("Transferring to %s", transferURL));
            return transferURL;
        } catch (Exception e) {
            logger.error("Failed to handled incoming request", e);
            String url = AllIVRURLs.springTransferUrlToUnhandledError();
            logger.info(String.format("Transferring to %s", url));
            return url;
        }
    }
}
