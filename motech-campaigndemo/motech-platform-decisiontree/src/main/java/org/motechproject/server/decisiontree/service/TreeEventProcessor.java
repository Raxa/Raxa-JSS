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
package org.motechproject.server.decisiontree.service;

import java.util.List;
import java.util.Map;

import org.motechproject.context.EventContext;
import org.motechproject.decisiontree.model.Action;
import org.motechproject.decisiontree.model.Node;
import org.motechproject.decisiontree.model.Transition;
import org.motechproject.event.EventRelay;
import org.motechproject.model.MotechEvent;
import org.springframework.util.Assert;

/**
 * Responsible for emitting Tree events
 * 
 * @author yyonkov
 * 
 */
public class TreeEventProcessor {
	private EventRelay eventRelay = EventContext.getInstance().getEventRelay();

	private void sendActions(List<Action> actions, Map<String, Object> params) {
		for (Action action : actions) {
			eventRelay.sendEventMessage(new MotechEvent(action.getEventId(), params));
		}
	}

	public void sendActionsBefore(Node node, String path, Map<String, Object> params) {
		Assert.notNull(node, "Node must not be null");
		Assert.notNull(node, "Path must not be null");
		Assert.notNull(params, "Params must not be null");
		params.put("treePath", path);
		sendActions(node.getActionsBefore(), params);
	}

	public void sendActionsAfter(Node node, String path, Map<String, Object> params) {
		Assert.notNull(node, "Node must not be null");
		Assert.notNull(node, "Path must not be null");
		Assert.notNull(params, "Params must not be null");
		params.put("treePath", path);
		sendActions(node.getActionsAfter(), params);
	}

	public void sendTransitionActions(Transition transition, Map<String, Object> params) {
		Assert.notNull(transition, "Transition must not be null");
		Assert.notNull(params, "Params must not be null");
		params.put("transitionName", transition.getName());
		sendActions(transition.getActions(), params);
	}
}
