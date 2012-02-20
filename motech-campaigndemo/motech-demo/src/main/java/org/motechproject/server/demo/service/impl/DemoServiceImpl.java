package org.motechproject.server.demo.service.impl;

import org.motechproject.context.Context;
import org.motechproject.gateway.MotechSchedulerGateway;
import org.motechproject.model.MotechEvent;
import org.motechproject.model.RunOnceSchedulableJob;
import org.motechproject.server.demo.EventKeys;
import org.motechproject.server.demo.service.DemoService;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class DemoServiceImpl implements DemoService
{
    private MotechSchedulerGateway schedulerGateway = Context.getInstance().getMotechSchedulerGateway();

	@Override
	public void schedulePhoneCall(String phoneNumber, Date callTime) {

        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put(EventKeys.PHONE_KEY, phoneNumber);

        MotechEvent callEvent = new MotechEvent(EventKeys.CALL_EVENT_SUBJECT, parameters);

        RunOnceSchedulableJob schedulableJob = new RunOnceSchedulableJob(callEvent, callTime);
        schedulerGateway.scheduleRunOnceJob(schedulableJob);
	}
}
