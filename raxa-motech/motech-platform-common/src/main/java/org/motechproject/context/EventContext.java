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
package org.motechproject.context;

import org.motechproject.event.EventRelay;
import org.motechproject.model.MotechEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EventContext {
    private final Logger log = LoggerFactory.getLogger(this.getClass());
	
    @Autowired
    private EventRelay eventRelay;

    public EventRelay getEventRelay() {
        log.info("EventContext: " + this + " GetEventRelay: " + eventRelay);
        return eventRelay;
    }

    public void setEventRelay(EventRelay eventRelay) {
        log.info("EventContext: " + this + " SetEventRelay: " + eventRelay);
        this.eventRelay = eventRelay;
    }
    
    /**
     * Responsible for packing parameters in order with keys: 0,1,2 ... n
     * parameters can be unpacked in handlers using 
     * {@code 
     * 		@MotechListener(subjects={"destination"}, type=MotechListenerType.ORDERED_PARAMETERS)
     * 		public void handler(Type1 a, Type2 b ...) {}
     * }
     * @param destination
     * @param objs
     */
    public void send(String destination, Object... objs) {
    	MotechEvent event = new     MotechEvent(destination);
		int i = 0;
    	for(Object o : objs) {
    		event.getParameters().put(Integer.toString(i++), o);
    	}
    	eventRelay.sendEventMessage(event);
    }

	public static EventContext getInstance(){
        return instance;
	}
	
	private static EventContext instance = new EventContext();
	
	private EventContext(){}
}
