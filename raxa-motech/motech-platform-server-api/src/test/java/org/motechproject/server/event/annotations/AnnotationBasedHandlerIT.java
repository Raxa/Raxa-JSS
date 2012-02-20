package org.motechproject.server.event.annotations;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.motechproject.MotechException;
import org.motechproject.context.Context;
import org.motechproject.model.MotechEvent;
import org.motechproject.server.event.EventListenerRegistry;
import org.motechproject.server.event.ServerEventRelay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.util.Assert;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.*;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/testPlatformServerApplicationContext.xml"})
public class AnnotationBasedHandlerIT {

    static boolean test = false;

    @Autowired
    ServerEventRelay eventRelay;

    private void send(String dest, Object... objects) {
        Map<String, Object> params = new HashMap<String, Object>();
        int i = 0;
        for (Object obj : objects) {
            params.put(Integer.toString(i++), obj);
        }
        MotechEvent event = new MotechEvent(dest, params);
        eventRelay.relayEvent(event);
    }

    // Annotation based handler (needs a spring bean config.)
    @Component
    public static class MyHandler {
        @MotechListener(subjects = {"sub_a", "sub_b"})
        public void handleX(MotechEvent event) {
            test = true;
        }

        @MotechListener(subjects = {"sub_a", "sub_c"})
        public void handleY(MotechEvent event) {
            test = true;
        }

        @MotechListener(subjects = {"params"}, type = MotechListenerType.ORDERED_PARAMETERS)
        public void handleParams(Integer a, Integer b, String s) {
            test = true;
        }

        @MotechListener(subjects = {"exception"}, type = MotechListenerType.ORDERED_PARAMETERS)
        public void orderedParams(Integer a, Integer b, String s) {
            test = true;
            Assert.notNull(s, "s must not be null");
        }

        @MotechListener(subjects = {"named"}, type = MotechListenerType.NAMED_PARAMETERS)
        public void namedParams(@MotechParam("id") String id, @MotechParam("key") String key) {
            test = true;
		}
	}

	public static void clear() {
		test=false;
	}

	@Test
	public void testRegistry() {
		EventListenerRegistry registry = Context.getInstance().getEventListenerRegistry();
		assertEquals(2, registry.getListenerCount("sub_a"));
		assertEquals(1,registry.getListenerCount("sub_b"));
		assertEquals(1,registry.getListenerCount("sub_c"));
	}
	
	@Test
	public void testRelay() {
		MotechEvent e = new MotechEvent("sub_b", null);
		clear();
		eventRelay.relayEvent(e);
		assertTrue(test);
		
		e = new MotechEvent("sub_c", null);
		clear();
		eventRelay.relayEvent(e);
		assertTrue(test);
	}
	
	@Test
	public void testOrderedParams() {
		clear();
		send("params",23,44,null);
		assertTrue(test);
	}
	
	@Test (expected = MotechException.class)
	public void testExeption() {
		clear();
		send("exception", 1, 3, null);
		assertTrue(test);
	}

	@Test
	public void testNamedParamsHappy() {
		clear();
		MotechEvent event = new MotechEvent("named");
		event.getParameters().put("id", "id0012");
		event.getParameters().put("key", "2354");
		eventRelay.relayEvent(event);
		assertTrue(test);
	}

	@Test (expected = MotechException.class)
	public void testNamedParamsNotHappy() {
		clear();
		MotechEvent event = new MotechEvent("named");
		event.getParameters().put("id", "id0012");
		event.getParameters().put("key", 1);
		eventRelay.relayEvent(event);
		assertTrue(test);
		clear();
		event.getParameters().clear();
		event.getParameters().put("id", "id0012");
		eventRelay.relayEvent(event);
		assertTrue(test);
	}
}
