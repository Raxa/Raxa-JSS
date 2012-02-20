package org.motechproject.decisiontree.model;

import org.junit.Test;

import static junit.framework.Assert.assertEquals;

public class TreeTest {
    @Test
    public void nextNodeAtTheTop() {
        Tree tree = new Tree().setName("tree1").setRootNode(
                    new Node().setTransitions(new Object[][]{
                            {"1", new Transition().setName("t1").setDestinationNode(new Node().setTransitions(new Object[][]{
                                    {"1", new Transition().setName("sick1").setDestinationNode(new Node())},
                                    {"2", new Transition().setName("sick2").setDestinationNode(new Node())},
                                    {"3", new Transition().setName("sick3").setDestinationNode(new Node())},
                            }))},
                            {"2", new Transition().setName("ill").setDestinationNode(new Node())}
                    }));
        Node node = tree.nextNode("", "");
        assertEquals(tree.getRootNode(), node);
    }
}
