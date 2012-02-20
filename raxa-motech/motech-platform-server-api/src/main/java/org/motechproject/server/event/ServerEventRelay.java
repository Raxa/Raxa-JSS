package org.motechproject.server.event;

import org.motechproject.event.EventRelay;
import org.motechproject.gateway.OutboundEventGateway;
import org.motechproject.metrics.MetricsAgent;
import org.motechproject.model.MotechEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

/**
 * This class handled incoming scheduled events and relays those events to the appropriate event listeners
 */
public class ServerEventRelay implements EventRelay
{
    //private final Logger log = LoggerFactory.getLogger(this.getClass());

	@Autowired
	private EventListenerRegistry eventListenerRegistry;

	@Autowired
    private OutboundEventGateway outboundEventGateway;

    @Autowired
    private MetricsAgent metricsAgent;

    private static final String MESSAGE_DESTINATION = "message-destination";
    private static final String ORIGINAL_PARAMETERS = "original-parameters";

    public ServerEventRelay() {
    }

    public ServerEventRelay(OutboundEventGateway outboundEventGateway, EventListenerRegistry eventListenerRegistry, MetricsAgent metricsAgent) {
        this.outboundEventGateway = outboundEventGateway;
        this.eventListenerRegistry = eventListenerRegistry;
        this.metricsAgent = metricsAgent;
    }

    // @TODO either relayEvent should be made private, or this method moved out to it's own class.
    public void sendEventMessage(MotechEvent event) {
        //log.info("Sending event: " + event.getSubject());

        Set<EventListener> listeners = eventListenerRegistry.getListeners( event.getSubject() );
        Map<String, String> parameters = new HashMap<String, String>();
        parameters.put("subject", event.getSubject());
        parameters.put("listeners", String.format("%d", listeners.size()));

        if (!listeners.isEmpty()) {
            outboundEventGateway.sendEventMessage(event);
            metricsAgent.logEvent("motech.event.published", parameters);
        } else {
            metricsAgent.logEvent("motech.event.not-published", parameters);
        }
    }

    /**
     * Relay an event to all the listeners of that event.
     *
     * @param event event being relayed
     */
    public void relayEvent(MotechEvent event) {

        // Retrieve a list of listeners for the given event type
    	if (eventListenerRegistry == null) {
            String errorMessage = "eventListenerRegistry == null";
            //log.error(errorMessage);
            throw new IllegalStateException(errorMessage);
    	}

        if (event == null) {
            String errorMessage = "Invalid request to relay null event";
            //log.warn(errorMessage);
            throw new IllegalArgumentException(errorMessage);
        }

        Set<EventListener> listeners = eventListenerRegistry.getListeners( event.getSubject() );

        // Is this message destine for a specific listener?
        if (event.getParameters().containsKey(MESSAGE_DESTINATION)) {

        	String messageDestination = (String) event.getParameters().get(MESSAGE_DESTINATION);

        	for (EventListener listener : listeners) {
                if (listener.getIdentifier().equals(messageDestination)) {
  		            MotechEvent _event = event.copy(event.getSubject(),
                                                         (Map<String, Object>)event.getParameters().get(ORIGINAL_PARAMETERS));

                    String timer = listener.getIdentifier() + ".handler." + event.getSubject();
                    metricsAgent.startTimer(timer);
                    metricsAgent.logEvent(_event.getSubject());
        			listener.handle(_event);
                    metricsAgent.stopTimer(timer);

        			break;
        		}
        	} // END while( iter.hasNext() )
        	
        } else {
        	
        	// Is there a single listener?
	        if (listeners.size() > 1) {
	        	// We need to split the message for each listener to ensure the work units
	        	// are completed individually. Therefore, if a message fails it will be
	        	// re-distributed to another server without being lost
	        	splitEvent(event, listeners);
	        } else {
                // Is there a way to get at a Sets elements other than an iterator?  I know there is only one
                for (EventListener listener : listeners) {
                    String timer = listener.getIdentifier() + ".handler." + event.getSubject();
                    metricsAgent.startTimer(timer);
                    metricsAgent.logEvent(event.getSubject());
                    listener.handle(event);
                    metricsAgent.stopTimer(timer);
                }
	        } // END IF/ELSE if (listeners.size() > 1)
        } // END IF/ELSE if (event.getParameters().containsKey(MESSAGE_DESTINATION))

        Map<String, String> parameters = new HashMap<String, String>();
        parameters.put("event", event.getSubject());
        parameters.put("listeners", String.format("%d", listeners.size()));
        metricsAgent.logEvent("motech.event-relay.relayEvent", parameters);
    }
    
    /**
     * Split a given message into multiple messages with specific message destination
     * parameters. Message destinations will route the message to the specific message
     * listener.
     * @param event Event message to be split
     * @param listeners A list of listeners for this given message that will be used as message destinations
     */
    private void splitEvent(MotechEvent event, Set<EventListener> listeners) {
    	MotechEvent enrichedEventMessage;
    	Map<String, Object> parameters;

    	for( EventListener listener : listeners) {
    		parameters = new HashMap<String, Object>();
    		parameters.put(MESSAGE_DESTINATION, listener.getIdentifier());
            parameters.put(ORIGINAL_PARAMETERS, event.getParameters());
    		enrichedEventMessage = event.copy(event.getSubject(), parameters);
    		
    		outboundEventGateway.sendEventMessage(enrichedEventMessage);
    	}
    }

}
