package org.motechproject.ivr.kookoo.controller;

import org.apache.commons.lang.StringUtils;
import org.motechproject.decisiontree.model.ITreeCommand;
import org.motechproject.decisiontree.model.NodeInfo;
import org.motechproject.decisiontree.model.Tree;
import org.motechproject.ivr.kookoo.KooKooIVRContext;
import org.motechproject.ivr.kookoo.KookooIVRResponseBuilder;
import org.motechproject.ivr.kookoo.domain.DecisionTreeBasedResponseBuilder;
import org.motechproject.ivr.kookoo.extensions.CallFlowController;
import org.motechproject.ivr.kookoo.service.KookooCallDetailRecordsService;
import org.motechproject.ivr.message.IVRMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping(AllIVRURLs.DECISION_TREE_URL)
public class DecisionTreeBasedIVRController extends SafeIVRController {
    private CallFlowController callFlowController;

    @Autowired
    public DecisionTreeBasedIVRController(CallFlowController callFlowController, IVRMessage ivrMessage, KookooCallDetailRecordsService callDetailRecordsService, StandardResponseController standardResponseController) {
        super(ivrMessage, callDetailRecordsService, standardResponseController);
        this.callFlowController = callFlowController;
    }

    @Override
    public KookooIVRResponseBuilder gotDTMF(KooKooIVRContext kooKooIVRContext) {
        String currentTreeName = kooKooIVRContext.treeName();
        String userInput = kooKooIVRContext.userInput();
        String currentPosition = kooKooIVRContext.currentTreePosition();
        Tree tree = callFlowController.getTree(currentTreeName, kooKooIVRContext);

        NodeInfo nodeInfo = tree.nextNodeInfo(currentPosition, userInput);
        boolean retryOnIncorrectUserAction = StringUtils.isNotEmpty(currentPosition) && StringUtils.isEmpty(userInput);
        if (nodeInfo.node() == null) {
            nodeInfo = tree.currentNodeInfo(currentPosition);
            retryOnIncorrectUserAction = true;
        }
        if (!retryOnIncorrectUserAction) {
            List<ITreeCommand> treeCommands = nodeInfo.node().getTreeCommands();
            for (ITreeCommand command : treeCommands) {
                command.execute(kooKooIVRContext);
            }
        }
        kooKooIVRContext.currentDecisionTreePath(nodeInfo.path());

        DecisionTreeBasedResponseBuilder decisionTreeBasedResponseBuilder = new DecisionTreeBasedResponseBuilder();
        KookooIVRResponseBuilder ivrResponseBuilder = decisionTreeBasedResponseBuilder.ivrResponse(nodeInfo.node(), kooKooIVRContext, new KookooIVRResponseBuilder(), retryOnIncorrectUserAction);
        if (!ivrResponseBuilder.isCollectDTMF()){
            kooKooIVRContext.currentDecisionTreePath("");
            callFlowController.treeComplete(currentTreeName, kooKooIVRContext);
        }
        return ivrResponseBuilder.withSid(kooKooIVRContext.callId()).language(kooKooIVRContext.preferredLanguage());
    }
}