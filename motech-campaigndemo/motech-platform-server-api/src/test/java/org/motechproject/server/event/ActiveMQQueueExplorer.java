package org.motechproject.server.event;

import org.apache.activemq.ActiveMQConnectionFactory;
import org.apache.activemq.command.ActiveMQQueue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.jms.connection.CachingConnectionFactory;

import javax.jms.*;
import java.util.Enumeration;

public class ActiveMQQueueExplorer {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private Connection connection;
    private Session session;

    public ActiveMQQueueExplorer(CachingConnectionFactory cachingConnectionFactory) throws JMSException {
        try {
            ActiveMQConnectionFactory activeMQConnectionFactory = (ActiveMQConnectionFactory) cachingConnectionFactory.getTargetConnectionFactory();
            connection = activeMQConnectionFactory.createConnection();
            connection.start();
            session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
        } catch (JMSException e) {
            if (connection != null) connection.close();
        }
    }

    public int queueSize(ActiveMQQueue queue) throws JMSException {
        QueueBrowser browser = session.createBrowser(queue);
        int i = 0;
        try {
            Enumeration messages = browser.getEnumeration();
            while (messages.hasMoreElements()) {
                messages.nextElement();
                i++;
            }
        } finally {
            browser.close();
        }
        return i;
    }

    public void clear(ActiveMQQueue queue) throws JMSException {
        MessageConsumer consumer = null;
        try {
            int iterated = 0;
            int count = 0;
            consumer = session.createConsumer(queue);
            while (queueSize(queue) != 0) {
                iterated++;
                if (iterated > 100) throw new RuntimeException("Could not clear the queue");

                Message message = consumer.receive(1000);
                if (message != null) count++;
                logger.info("Cleared a message");
            }
            logger.info(String.format("Cleared %d messages", count));
        } finally {
            if (consumer != null) consumer.close();
        }
    }

    public void close() throws JMSException {
        connection.close();
    }
}
