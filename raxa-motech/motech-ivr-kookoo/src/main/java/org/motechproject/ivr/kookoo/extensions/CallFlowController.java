package org.motechproject.ivr.kookoo.extensions;

import org.motechproject.decisiontree.model.Tree;
import org.motechproject.ivr.kookoo.KooKooIVRContext;

public interface CallFlowController {
    public String urlFor(KooKooIVRContext kooKooIVRContext);

    public String decisionTreeName(KooKooIVRContext kooKooIVRContext);

    Tree getTree(String treeName, KooKooIVRContext kooKooIVRContext);

    void treeComplete(String treeName, KooKooIVRContext kooKooIVRContext);
}
