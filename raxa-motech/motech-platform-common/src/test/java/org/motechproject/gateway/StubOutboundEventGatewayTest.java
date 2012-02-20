package org.motechproject.gateway;

import junit.framework.Test;
import junit.framework.TestSuite;
import junit.framework.TestCase;

/**
 * StubOutboundEventGateway Tester.
 *
 * @author <Authors name>
 * @since <pre>04/26/2011</pre>
 * @version 1.0
 */
public class StubOutboundEventGatewayTest extends TestCase {
    public StubOutboundEventGatewayTest(String name) {
        super(name);
    }

    public void setUp() throws Exception {
        super.setUp();
    }

    public void tearDown() throws Exception {
        super.tearDown();
    }

    /**
     *
     * Method: sendEventMessage(MotechEvent motechEvent)
     *
     */
    public void testSendEventMessage() throws Exception {
        StubOutboundEventGateway stub = new StubOutboundEventGateway();
        stub.sendEventMessage(null);
        assert(true);
    }



    public static Test suite() {
        return new TestSuite(StubOutboundEventGatewayTest.class);
    }
}
