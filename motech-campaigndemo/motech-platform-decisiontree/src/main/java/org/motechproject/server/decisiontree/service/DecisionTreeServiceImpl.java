package org.motechproject.server.decisiontree.service;

import org.motechproject.decisiontree.dao.TreeDao;
import org.motechproject.decisiontree.model.Node;
import org.motechproject.decisiontree.model.Tree;
import org.motechproject.server.decisiontree.TreeNodeLocator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 *
 */
public class DecisionTreeServiceImpl implements DecisionTreeService {

    private Logger logger = LoggerFactory.getLogger((this.getClass()));

    TreeDao treeDao;
    TreeNodeLocator treeNodeLocator;

    @Autowired
    public DecisionTreeServiceImpl(TreeDao treeDao, TreeNodeLocator treeNodeLocator) {
        this.treeDao = treeDao;
        this.treeNodeLocator = treeNodeLocator;
    }

    @Override
    public Node getNode(String treeName, String path) {
    	Node node = null;
    	List<Tree> trees = treeDao.findByName(treeName);
    	logger.info("Looking for tree by name: "+treeName+", found: "+trees.size());
    	if(trees.size()>0) {
    		node = treeNodeLocator.findNode(trees.get(0), path);
        	logger.info("Looking for node by path: "+path+", found: "+node);
    	}
        return node;
    }
}
