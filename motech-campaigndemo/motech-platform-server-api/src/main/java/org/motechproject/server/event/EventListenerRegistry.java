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

import org.motechproject.context.EventContext;
import org.motechproject.event.*;
import org.motechproject.metrics.MetricsAgent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;


/**
 * This class acts as a registry for all scheduled event listeners. One can register themselves to listen for
 * a specific set of event types.
 */
public class EventListenerRegistry {
    //private final Logger log = LoggerFactory.getLogger(this.getClass());

    private EventListenerTree listenerTree = new EventListenerTree();

    @Autowired
    private MetricsAgent metricsAgent;

    public EventListenerRegistry() {
    }

    public EventListenerRegistry(MetricsAgent metricsAgent) {
        this.metricsAgent = metricsAgent;
    }

    /**
     * Register an event listener to be notified when events of a given type are received via the Server JMS Event Queue
     *
     * @param listener the listener instance
     * @param subjects the event types that a listener is interested in
     */
    public void registerListener(org.motechproject.server.event.EventListener listener, List<String> subjects) {

        if (listener == null) {
            String errorMessage = "Invalid attempt to register a null EventListener";
            //log.error(errorMessage);
            throw new IllegalArgumentException(errorMessage);
        }

        if (subjects == null) {
            String errorMessage = "Invalid attempt to register for null subjects";
            //log.error(errorMessage);
            throw new IllegalArgumentException(errorMessage);
        }

        // Add the listener to the  list of those interested in each event type
        for (String subject : subjects) {
            registerListener(listener, subject);
        }
    }

    public void registerListener(org.motechproject.server.event.EventListener listener, String subject) {
        if (listener == null) {
            String errorMessage = "Invalid attempt to register a null EventListener";
            //log.error(errorMessage);
            throw new IllegalArgumentException(errorMessage);
        }

        if (subject == null) {
            String errorMessage = "Invalid attempt to register for null subject";
            //log.error(errorMessage);
            throw new IllegalArgumentException(errorMessage);
        }

        String timer = "motech.listener-registry.addListener";
        metricsAgent.startTimer(timer);
        listenerTree.addListener(listener, subject);
        metricsAgent.stopTimer(timer);
    }

    /**
     * Retrieve a list of event listeners for a given event type. If there are no listeners, an empty list is
     * returned.
     * @param subject The event type that you are seeking listeners for
     * @return A list of scheduled event listeners that are interested in that event
     */
    public Set<org.motechproject.server.event.EventListener> getListeners(String subject) {
        String timer = "motech.listener-registry.getListeners";
        metricsAgent.startTimer(timer);
        Set<org.motechproject.server.event.EventListener> ret = listenerTree.getListeners(subject);
        metricsAgent.stopTimer(timer);

        return ret;
    }

    /**
     * See if a particular subject has any listeners
     * @param subject
     * @return
     */
    public boolean hasListener(String subject) {
        String timer = "motech.listener-registry.hasListener";

        metricsAgent.startTimer(timer);
        boolean ret = listenerTree.hasListener(subject);
        metricsAgent.stopTimer(timer);

        return ret;
    }

    /**
     * Get the count of listeners for a particular subject
     * @param subject
     * @return
     */
    public int getListenerCount(String subject) {
        String timer = "motech.listener-registry.hasListener";

        metricsAgent.startTimer(timer);
        int ret = listenerTree.getListenerCount(subject);
        metricsAgent.stopTimer(timer);

        return ret;
    }
}
