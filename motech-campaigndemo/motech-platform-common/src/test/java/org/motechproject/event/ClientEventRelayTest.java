package org.motechproject.event;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.motechproject.gateway.OutboundEventGateway;
import org.motechproject.gateway.StubOutboundEventGateway;
import org.motechproject.model.MotechEvent;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

public class ClientEventRelayTest {
    @InjectMocks
    ClientEventRelay clientEventRelay = new ClientEventRelay();

    @Mock
    private OutboundEventGateway outboundEventGateway;

    @Before
    public void initMocks() {
        outboundEventGateway = mock(StubOutboundEventGateway.class);
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testSendEventMessage() throws Exception {
        MotechEvent event = new MotechEvent("foo", null);

        clientEventRelay.sendEventMessage(new MotechEvent("foo", null));

        verify(outboundEventGateway).sendEventMessage(any(MotechEvent.class));
    }
}
