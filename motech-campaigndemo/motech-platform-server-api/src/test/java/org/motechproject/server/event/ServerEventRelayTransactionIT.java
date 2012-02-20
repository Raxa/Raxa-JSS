package org.motechproject.server.event;

import org.apache.activemq.command.ActiveMQQueue;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.motechproject.gateway.OutboundEventGateway;
import org.motechproject.model.MotechEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.jms.connection.CachingConnectionFactory;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.jms.JMSException;
import java.util.Properties;

import static junit.framework.Assert.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/testPlatformServerApplicationContext.xml"})
public class ServerEventRelayTransactionIT {
    @Autowired
    OutboundEventGateway outboundEventGateway;
    @Autowired
    ApplicationContext applicationContext;
    @Autowired
    CachingConnectionFactory cachingConnectionFactory;
    @Autowired
    EventHandlerForServerEventRelayTransactionIT handler;

    @Autowired @Qualifier("activeMQProperties")
    Properties activeMQProperties;

    ActiveMQQueueExplorer queueExplorer;
    private ActiveMQQueue eventQueue;
    private int redeliveryDelayInMillis;

    @Before
    public void setUp() throws JMSException {
        handler.setupForFailure(false);
        queueExplorer = new ActiveMQQueueExplorer(cachingConnectionFactory);
        ActiveMQQueue schedulerQueue = (ActiveMQQueue) applicationContext.getBean("schedulerQueue");
        eventQueue = (ActiveMQQueue) applicationContext.getBean("eventQueue");
        queueExplorer.clear(schedulerQueue);
        queueExplorer.clear(eventQueue);
        redeliveryDelayInMillis = Integer.parseInt(activeMQProperties.getProperty("redeliveryDelayInMillis"));
    }

    @Test
    public void sucessfulHandlingOfEventShouldDestroyTheEvent() throws Exception {
        int numberOfMessagesInQueue = queueExplorer.queueSize(eventQueue);
        MotechEvent motechEvent = new MotechEvent(EventHandlerForServerEventRelayTransactionIT.SUCCESSFUL_EVENT_SUBJECT);
        outboundEventGateway.sendEventMessage(motechEvent);
        Thread.sleep(redeliveryDelayInMillis);
        assertEquals(0, queueExplorer.queueSize(eventQueue) - numberOfMessagesInQueue);
    }

    @Test
    public void failureToHandleEventShouldNotDestroyTheEvent() throws Exception {
        handler.setupForFailure(true);
        MotechEvent motechEvent = new MotechEvent(EventHandlerForServerEventRelayTransactionIT.FAILING_EVENT_SUBJECT);
        outboundEventGateway.sendEventMessage(motechEvent);
        Thread.sleep(redeliveryDelayInMillis);
        assertEquals(1, queueExplorer.queueSize(eventQueue));
    }

    @Test
    public void failedMessagesAreRedelivered() throws Exception {
        handler.setupForFailure(true);
        MotechEvent motechEvent = new MotechEvent(EventHandlerForServerEventRelayTransactionIT.FAILING_EVENT_SUBJECT);
        outboundEventGateway.sendEventMessage(motechEvent);
        Thread.sleep(redeliveryDelayInMillis * 2);
        int retries = handler.retries();
        assertEquals(Integer.toString(retries), true, retries >= 2);
    }

    @Test
    public void failedMessageOnceHandledCorrectlySecondTime() throws Exception {
        handler.setupForFailure(true);
        MotechEvent motechEvent = new MotechEvent(EventHandlerForServerEventRelayTransactionIT.FAILING_EVENT_SUBJECT);
        outboundEventGateway.sendEventMessage(motechEvent);
        Thread.sleep(redeliveryDelayInMillis);
        handler.setupForFailure(false);
        Thread.sleep(redeliveryDelayInMillis * 2);
        assertEquals(true, handler.retries() <= 1);
    }

    @After
    public void tearDown() throws JMSException {
        if (queueExplorer != null) queueExplorer.close();
    }
}
