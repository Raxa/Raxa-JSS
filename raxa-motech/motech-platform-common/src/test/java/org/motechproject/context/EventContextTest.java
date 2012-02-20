package org.motechproject.context;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.motechproject.event.EventRelay;

import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.mock;

public class EventContextTest
{
    @Mock
    EventRelay eventRelay;

    @InjectMocks
    EventContext eventContext;

    @Before
    public void initMocks() {
        eventContext = mock(EventContext.class);
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSetGetEventRelay() throws Exception {
        EventContext context = EventContext.getInstance();
        EventRelay before = context.getEventRelay();

        context.setEventRelay(null);

        EventRelay after = context.getEventRelay();

        assertNull(after);
    }
}
