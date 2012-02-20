package org.motechproject.server.event;

import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.motechproject.gateway.OutboundEventGateway;
import org.motechproject.gateway.StubOutboundEventGateway;
import org.motechproject.metrics.MetricsAgent;
import org.motechproject.metrics.impl.MultipleMetricsAgentImpl;
import org.motechproject.model.MotechEvent;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.util.Arrays.asList;
import static junit.framework.Assert.assertEquals;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

public class ServerEventRelayIT {
    EventListenerRegistry registry;

    ServerEventRelay eventRelay;
    OutboundEventGateway outboundEventGateway;
    MotechEvent motechEvent;

    @Before
    public void setUp() throws Exception {
        MetricsAgent metricsAgent = new MultipleMetricsAgentImpl();
        registry = new EventListenerRegistry(metricsAgent);
        outboundEventGateway = Mockito.mock(StubOutboundEventGateway.class);
        eventRelay = new ServerEventRelay(outboundEventGateway, registry, metricsAgent);

        // Create the scheduled event message object
        Map<String, Object> messageParameters = new HashMap<String, Object>();
        messageParameters.put("test", "value");
        motechEvent = new MotechEvent("org.motechproject.server.someevent", messageParameters);
    }

    @Test
    public void testRelayToSingleListener() throws Exception {
        // Register a single listener for an event
        SampleEventListener sel = mock(SampleEventListener.class);
        registry.registerListener(sel, "org.motechproject.server.someevent");

        eventRelay.relayEvent(motechEvent);

        verify(sel).handle(motechEvent);
    }

    @Test
    public void testSplittingRelay() throws Exception {
        ArgumentCaptor<MotechEvent> argument = ArgumentCaptor.forClass(MotechEvent.class);
        String firstListener;
        String secondListener;

        // Register a single listener for an event
        SampleEventListener sel = mock(SampleEventListener.class);
        stub(sel.getIdentifier()).toReturn("SampleEventListener");
        registry.registerListener(sel, "org.motechproject.server.someevent");

        FooEventListener fel = mock(FooEventListener.class);
        stub(fel.getIdentifier()).toReturn("FooEventListener");
        registry.registerListener(fel, "org.motechproject.server.someevent");

        List<String> registeredListeners = asList(sel.getIdentifier(), fel.getIdentifier());

        eventRelay.relayEvent(motechEvent);

        verify(outboundEventGateway, times(2)).sendEventMessage(argument.capture());
        MotechEvent event = argument.getAllValues().get(0);
        firstListener = (String) event.getParameters().get("message-destination");
        assertTrue(event.getParameters().containsKey("message-destination"));
        assertTrue(registeredListeners.contains(firstListener));
        assertEvent(createEvent(motechEvent, firstListener), event);

        event = argument.getAllValues().get(1);
        secondListener = (String) event.getParameters().get("message-destination");
        assertTrue(event.getParameters().containsKey("message-destination"));
        assertTrue(registeredListeners.contains(secondListener));
        assertEvent(createEvent(motechEvent, secondListener), event);

        assertFalse(firstListener.equals(secondListener));
    }

    private MotechEvent createEvent(MotechEvent motechEvent, String destination) {
        Map params =  new HashMap();
        params.put("message-destination", destination);
        params.put("original-parameters", motechEvent.getParameters());
        return motechEvent.copy(motechEvent.getSubject(), params);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testRelayNullEvent() throws Exception {
        eventRelay.relayEvent(null);
    }

    @Test
    public void testRelaySpecificDestinationEvent() throws Exception {
        // Register a single listener for an event
        SampleEventListener sel = mock(SampleEventListener.class);
        stub(sel.getIdentifier()).toReturn("SampleEventListener");
        registry.registerListener(sel, "org.motechproject.server.someevent");

        FooEventListener fel = mock(FooEventListener.class);
        stub(fel.getIdentifier()).toReturn("FooEventListener");
        registry.registerListener(fel, "org.motechproject.server.someevent");

        // Create my own event so I don't pollute the main one with a new param
        // This event is the same as the one created in  setUp only it is augmented like a split relayed event
        Map<String, Object> originalParameters = new HashMap<String, Object>();
        originalParameters.put("test", "value");

        Map<String, Object> messageParameters = new HashMap<String, Object>();
        messageParameters.put("original-parameters", originalParameters);
        messageParameters.put("message-destination", "FooEventListener");
        MotechEvent _motechEvent = new MotechEvent("org.motechproject.server.someevent", messageParameters);

        eventRelay.relayEvent(_motechEvent);

        verify(fel).handle(motechEvent);
        verify(sel, never()).handle(any(MotechEvent.class));
    }

    private void assertEvent(MotechEvent expected, MotechEvent copy) {
        assertEquals(expected.getSubject(), copy.getSubject());
        assertEquals(expected.getParameters(), copy.getParameters());
        assertEquals(expected.isLastEvent(), copy.isLastEvent());
        assertEventTime(copy, expected.getEndTime());
    }

    private void assertEventTime(MotechEvent copy, Date endDate) {
        assertEquals(endDate, copy.getEndTime());
        if (endDate != null)
            assertNotSame(endDate, copy.getEndTime());
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
