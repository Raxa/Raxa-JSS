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
package org.motechproject.server.decisiontree.service;

import org.junit.Before;
import org.junit.Test;
import org.motechproject.decisiontree.model.AudioPrompt;
import org.motechproject.decisiontree.model.Node;
import org.motechproject.decisiontree.model.Transition;
import org.motechproject.decisiontree.model.Tree;
import org.motechproject.server.decisiontree.TreeNodeLocator;

import static junit.framework.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

public class TreeNodeLocatorTest {

    Tree tree;

    TreeNodeLocator locator;

    @Before
    public void setUp() {
        tree = new Tree().setName("tree1").setRootNode(
                new Node().setTransitions(new Object[][]{
                        {"1", new Transition().setName("t1").setDestinationNode(new Node().setTransitions(new Object[][]{
                                {"1", new Transition().setName("sick1").setDestinationNode(new Node())},
                                {"2", new Transition().setName("sick2").setDestinationNode(new Node())},
                                {"3", new Transition().setName("sick3").setDestinationNode(new Node())},
                        }))},
                        {"2", new Transition().setName("ill").setDestinationNode(new Node())}
                }));
        locator = new TreeNodeLocator();
    }

    @Test
    public void testFindNode() {
        assertNotNull(locator.findNode(tree, "/"));
        assertNotNull(locator.findNode(tree, "/1/2"));
        assertNotNull(locator.findNode(tree, "/1/2/"));
        assertNotNull(locator.findNode(tree, "//1/2"));
        assertNotNull(locator.findNode(tree, "//1/2/"));
        assertNull(locator.findNode(tree, "/2/1/2/"));
        assertNull(locator.findNode(tree, "3"));
    }

    @Test(expected = IllegalArgumentException.class)
    public void testTreeNull() {
        locator.findNode(null, "");
    }

    @Test(expected = IllegalArgumentException.class)
    public void testPathNull() {
        locator.findNode(tree, null);
    }

    @Test
    public void addPrompts() {
        final Node rootNode = tree.getRootNode();
        rootNode.setPrompts(new AudioPrompt());
        rootNode.addPrompts(new AudioPrompt());

        assertEquals(2, rootNode.getPrompts().size());
    }
}
