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

import junitx.util.PrivateAccessor;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Matchers;
import org.motechproject.metrics.impl.MultipleMetricsAgentImpl;
import org.motechproject.model.MotechEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.junit.Assert.*;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.*;

public class EventListenerRegistryTest {
	private EventListenerRegistry registry;

    @Before
    public void setUp() {
        registry = new EventListenerRegistry(new MultipleMetricsAgentImpl());
    }

    @Test(expected = IllegalArgumentException.class)
    public void testNullEventListenerRegistration() {
        EventListener sel = null;
        registry.registerListener(sel, "org.motechproject.server.someevent");
    }

    @Test(expected = IllegalArgumentException.class)
    public void testNullEventTypeRegistration() {
        EventListener sel = new SampleEventListener();

        registry.registerListener(sel, (String)null);
    }

    @Test
    public void testEmptyEventListRegistration() throws NoSuchFieldException{
        List<String> subjects = new ArrayList<String>();
		EventListener sel = new SampleEventListener();

        EventListenerTree mockTree = mock(EventListenerTree.class);
        PrivateAccessor.setField(registry, "listenerTree", mockTree);

        registry.registerListener(sel, subjects);

        verify(mockTree, times(0)).addListener(Matchers.<EventListener>anyObject(), anyString());
    }

	@Test
	public void testRegisterSingleListener() {
		EventListener sel = new SampleEventListener();
		registry.registerListener(sel, "org.motechproject.server.someevent");

        Set<EventListener> listeners = registry.getListeners("org.motechproject.server.someevent");
		assertNotNull(listeners);
		assertTrue(listeners.size() == 1);
		assertEquals(listeners.iterator().next(), sel);
	}

    @Test
    public void testHasListener_Yes() {
        EventListener sel = new SampleEventListener();
        registry.registerListener(sel, "org.motechproject.server.someevent");

        assertTrue(registry.hasListener("org.motechproject.server.someevent"));
    }

    @Test
    public void testHasListener_YesWildcard() {
        EventListener sel = new SampleEventListener();
        registry.registerListener(sel, "org.motechproject.server.*");

        assertTrue(registry.hasListener("org.motechproject.server.someevent"));
    }

    @Test
	public void testHasListener_NoEmpty() {
		EventListener sel = new SampleEventListener();

        assertFalse(registry.hasListener("org.motechproject.server.someevent"));
	}

    @Test
    public void testHasListener_No() {
        EventListener sel = new SampleEventListener();
        registry.registerListener(sel, "org.motechproject.server.someevent");

        assertFalse(registry.hasListener("org.motechproject.client.otherevent"));
    }

    @Test
	public void testRegisterMultipleListener() {

		EventListener sel = new SampleEventListener();
        EventListener sel2 = new FooEventListener();

		registry.registerListener(sel, "org.motechproject.server.someevent");
        registry.registerListener(sel2, "org.motechproject.server.someevent");

        Set<EventListener> el = registry.getListeners("org.motechproject.server.someevent");
		assertNotNull(el);
		assertTrue(el.size() == 2);
		assertTrue(el.contains(sel));
        assertTrue(el.contains(sel2));
	}

    @Test
	public void testRegisterForMultipleEvents() {
		List<String> et = new ArrayList<String>();
		et.add("org.motechproject.server.someevent");
        et.add("org.motechproject.server.someotherevent");

		EventListener sel = new SampleEventListener();

		registry.registerListener(sel, et);

        Set<EventListener> el = registry.getListeners(et.get(0));
		assertNotNull(el);
		assertTrue(el.size() == 1);
		assertTrue(el.contains(sel));

        el = registry.getListeners(et.get(1));
		assertNotNull(el);
		assertTrue(el.size() == 1);
		assertTrue(el.contains(sel));
	}

    @Test
	public void testRegisterTwice() {

		EventListener sel = new SampleEventListener();

		registry.registerListener(sel, "org.motechproject.server.someevent");
    	registry.registerListener(sel, "org.motechproject.server.someevent");

        Set<EventListener> el = registry.getListeners("org.motechproject.server.someevent");
		assertNotNull(el);
		assertTrue(el.size() == 1);
		assertTrue(el.contains(sel));
	}


    @Test
	public void testRegisterForSameEventTwice() {
		List<String> et = new ArrayList<String>();
		et.add("org.motechproject.server.someevent");
        et.add("org.motechproject.server.someevent");

		EventListener sel = new SampleEventListener();

		registry.registerListener(sel, et);

        Set<EventListener> el = registry.getListeners(et.get(0));
		assertNotNull(el);
		assertTrue(el.size() == 1);
		assertTrue(el.contains(sel));

        el = registry.getListeners(et.get(1));
		assertNotNull(el);
		assertTrue(el.size() == 1);
		assertTrue(el.contains(sel));
	}

	@Test
	public void testGetListeners() {
		List<String> et = new ArrayList<String>();
		et.add("org.motechproject.server.someevent");
		EventListener sel = new SampleEventListener();
		registry.registerListener(sel, et);

        Set<EventListener> el = registry.getListeners("org.motechproject.server.someevent");
		assertNotNull(el);
		assertEquals(1, el.size());
		assertEquals(el.iterator().next(), sel);
	}
	
	@Test
	public void testGetEmptyListenerList() {
		List<String> et = new ArrayList<String>();
		et.add("org.motechproject.server.someevent");

		assertEquals(0, registry.getListeners(et.get(0)).size());
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

