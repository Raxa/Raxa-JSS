package org.motechproject.server.decisiontree.service;


import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.motechproject.decisiontree.dao.TreeDao;
import org.motechproject.decisiontree.model.ITreeCommand;
import org.motechproject.decisiontree.model.Node;
import org.motechproject.decisiontree.model.Transition;
import org.motechproject.decisiontree.model.Tree;
import org.motechproject.server.decisiontree.TreeNodeLocator;

import java.util.Arrays;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;


public class DecisionTreeServiceTest {

    @Mock
    private TreeDao treeDao;

    @Mock
    private TreeNodeLocator treeNodeLocator;

    private DecisionTreeService decisionTreeService;

    private Tree pillReminderTree;
    private Node rootNode;
    private Node nextNode;

    @Before
    public void SetUp() {
        initMocks(this);
        nextNode = new Node()
                .setTreeCommands(new NextCommand());
        rootNode = new Node()
                .setTreeCommands(new RootNodeCommand())
                .setTransitions(new Object[][]{
                        {"1", new Transition()
                                .setName("pillTakenOnTime")
                                .setDestinationNode(nextNode)

                        }
                });

        pillReminderTree = new Tree()
                .setName("PillReminderTree")
                .setRootNode(rootNode);

        when(treeDao.findByName(pillReminderTree.getName())).thenReturn(Arrays.asList(pillReminderTree));
        decisionTreeService = new DecisionTreeServiceImpl(treeDao, treeNodeLocator);
    }

    @Test
    public void shouldFetchCommandForRootNode() {
        when(treeNodeLocator.findNode(pillReminderTree, "")).thenReturn(rootNode);
        Node nextNode = decisionTreeService.getNode(pillReminderTree.getName(), "");
        assertEquals(RootNodeCommand.class, nextNode.getTreeCommands().get(0).getClass());
    }

    @Test
    public void shouldFetchNextCommand() {
        when(treeNodeLocator.findNode(pillReminderTree, "/1")).thenReturn(nextNode);
        Node nextNode = decisionTreeService.getNode(pillReminderTree.getName(), "/1");
        assertEquals(NextCommand.class, nextNode.getTreeCommands().get(0).getClass());
    }

    private class RootNodeCommand implements ITreeCommand {
        public String[] execute(Object obj) {
            return null;
        }
    }

    private class NextCommand implements ITreeCommand {
        public String[] execute(Object obj) {
            return null;
        }
    }
}
