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
package org.motechproject.server.event;

import org.junit.Before;
import org.junit.Test;
import org.motechproject.model.MotechEvent;

import java.util.Set;

import static org.junit.Assert.*;

public class EventListenerTreeTest
{
    private EventListenerTree tree;
    private EventListener el = new SampleEventListener();

    private String EVENT1 = "org.motechproject.server.some-event";
    private String EVENT2 = "org.motechproject.server.some-other-event";
    private String WILDCARD_EVENT = "org.motechproject.server.*";

    @Before
    public void setUp() {
        tree = new EventListenerTree();
    }

    @Test
    public void testGetSubject_NoListeners() {
        assertEquals("", tree.getSubject());
    }

    @Test
    public void testAddListener_SingleListener() {
        tree.addListener(el, EVENT1);

        assertTrue(tree.hasListener(EVENT1));
        assertFalse(tree.hasListener(EVENT2));
    }

    @Test
    public void testAddListener_DoubleListener() {
        tree.addListener(el, EVENT1);

        assertTrue(tree.hasListener(EVENT1));
        Set<EventListener> listeners = tree.getListeners(EVENT1);

        assertNotNull(listeners);
		assertTrue(listeners.size() == 1);
		assertEquals(listeners.iterator().next(), el);
    }

    @Test
    public void testAddListener_WildcardListener() {
        tree.addListener(el, WILDCARD_EVENT);

        assertTrue(tree.hasListener(EVENT1));
        assertTrue(tree.hasListener(EVENT2));
        Set<EventListener> listeners = tree.getListeners(EVENT1);

        assertNotNull(listeners);
		assertTrue(listeners.size() == 1);
		assertEquals(listeners.iterator().next(), el);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testAddListener_InvalidSubjectWildcardInMiddle() {
        tree.addListener(el, "org.motechproject.*.event");
    }

    @Test(expected = IllegalArgumentException.class)
    public void testAddListener_InvalidSubjectEmptyPath() {
        tree.addListener(el, "org.motechproject..event");
    }

    @Test(expected = IllegalArgumentException.class)
    public void testAddListener_InvalidSubjectWildcard() {
        tree.addListener(el, "org.motechproject.event*");
    }

    @Test(expected = IllegalArgumentException.class)
    public void testAddListener_Nullsubject() {
        tree.addListener(el, null);
    }

    @Test
    public void getListenerCount_Simple() {
        tree.addListener(el, EVENT1);

        assertEquals(1, tree.getListenerCount(EVENT1));
        assertEquals(0, tree.getListenerCount(EVENT2));
    }

    @Test
    public void getListenerCount_Wildcard() {
        tree.addListener(el, WILDCARD_EVENT);

        assertEquals(1, tree.getListenerCount(EVENT1));
        assertEquals(1, tree.getListenerCount(EVENT2));
    }

    @Test
    public void getListenerCount_Multiple() {
        tree.addListener(el, WILDCARD_EVENT);
        tree.addListener(new FooEventListener(), EVENT1);

        assertEquals(2, tree.getListenerCount(EVENT1));
        assertEquals(1, tree.getListenerCount(EVENT2));
    }

    class FooEventListener implements EventListener {

        @Override
        public void handle(MotechEvent event) {
        }

        @Override
        public String getIdentifier() {
            return "FooEventListener";
        }
    }
}

