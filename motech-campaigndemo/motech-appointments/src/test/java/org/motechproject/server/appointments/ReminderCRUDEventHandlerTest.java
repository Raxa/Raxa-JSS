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
package org.motechproject.server.appointments;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.motechproject.appointments.api.EventKeys;
import org.motechproject.appointments.api.ReminderService;
import org.motechproject.appointments.api.model.Reminder;
import org.motechproject.gateway.MotechSchedulerGateway;
import org.motechproject.metrics.MetricsAgent;
import org.motechproject.model.MotechEvent;
import org.motechproject.model.RepeatingSchedulableJob;
import org.motechproject.model.RunOnceSchedulableJob;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static org.mockito.Mockito.*;

public class ReminderCRUDEventHandlerTest
{

    @InjectMocks
    ReminderCRUDEventHandler reminderCRUDEventHandler = new ReminderCRUDEventHandler();

    @Mock
    private ReminderService reminderService;

    @Mock
    private MotechSchedulerGateway schedulerGateway;

    @Mock
    private MetricsAgent metricsAgent;

    @Before
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
     }

    @Test
    public void testHandle_Delete() throws Exception {
        reminderCRUDEventHandler.delete("foo");
        verify(schedulerGateway, times(1)).unscheduleJob("foo");
    }

    @Test(expected=IllegalArgumentException.class)
    public void testHandle_DeleteNoJobId() throws Exception {
        reminderCRUDEventHandler.delete(null);
        verify(schedulerGateway, times(0)).unscheduleJob("foo");
    }

    @Test
    public void testHandle_Created() throws Exception {

        Reminder r = new Reminder();
        when(reminderService.getReminder("foo")).thenReturn(r);

        reminderCRUDEventHandler.create("foo");

        verify(reminderService, times(1)).updateReminder(r);
    }

    @Test(expected=IllegalArgumentException.class)
    public void testHandle_CreatedNoReminderId() throws Exception {
        reminderCRUDEventHandler.create("");
    }

    @Test
    public void testHandle_UpdateNoReminderId() throws Exception {
        Map<String, Object> params = new HashMap<String, Object>();

        MotechEvent motechEvent = new MotechEvent("updated", params);

        reminderCRUDEventHandler.update(motechEvent);

        verify(schedulerGateway, times(0)).scheduleRunOnceJob(any(RunOnceSchedulableJob.class));
        verify(schedulerGateway, times(0)).scheduleRepeatingJob(any(RepeatingSchedulableJob.class));
        verify(schedulerGateway, times(0)).unscheduleJob(anyString());
    }

    @Test
    public void testHandle_UpdateDisabled() throws Exception {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(EventKeys.REMINDER_ID_KEY, "foo");
        params.put(EventKeys.JOB_ID_KEY, "bar");

        MotechEvent motechEvent = new MotechEvent("updated", params);

        Reminder r = new Reminder();
        r.setEnabled(false);
        when(reminderService.getReminder("foo")).thenReturn(r);

        reminderCRUDEventHandler.update(motechEvent);

        verify(schedulerGateway, times(1)).unscheduleJob("bar");
    }

    @Test
    public void testHandle_UpdateDisabledNoJobId() throws Exception {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(EventKeys.REMINDER_ID_KEY, "foo");

        MotechEvent motechEvent = new MotechEvent("updated", params);

        Reminder r = new Reminder();
        r.setEnabled(false);
        when(reminderService.getReminder("foo")).thenReturn(r);

        reminderCRUDEventHandler.update(motechEvent);

        verify(schedulerGateway, times(0)).unscheduleJob(anyString());
    }

    @Test
    public void testHandle_UpdateEnabledNoReminderId() throws Exception {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(EventKeys.REMINDER_ID_KEY, "foo");

        MotechEvent motechEvent = new MotechEvent("updated", params);

        Reminder r = new Reminder();
        r.setEnabled(true);
        when(reminderService.getReminder("foo")).thenReturn(r);

        reminderCRUDEventHandler.update(motechEvent);

        verify(schedulerGateway, times(0)).scheduleRunOnceJob(any(RunOnceSchedulableJob.class));
        verify(schedulerGateway, times(0)).scheduleRepeatingJob(any(RepeatingSchedulableJob.class));
    }

    @Test
    public void testHandle_UpdateEnabledNullAptId() throws Exception {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(EventKeys.REMINDER_ID_KEY, "foo");

        MotechEvent motechEvent = new MotechEvent("updated", params);

        Reminder r = new Reminder();
        r.setEnabled(true);
        r.setStartDate(new Date());

        when(reminderService.getReminder("foo")).thenReturn(r);

        reminderCRUDEventHandler.update(motechEvent);

        verify(schedulerGateway, times(0)).scheduleRunOnceJob(any(RunOnceSchedulableJob.class));
        verify(schedulerGateway, times(0)).scheduleRepeatingJob(any(RepeatingSchedulableJob.class));
    }

    @Test
    public void testHandle_UpdateEnabledNoUnits() throws Exception {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(EventKeys.REMINDER_ID_KEY, "foo");
        params.put(EventKeys.APPOINTMENT_ID_KEY, "bar");

        MotechEvent motechEvent = new MotechEvent("updated", params);

        Reminder r = new Reminder();
        r.setEnabled(true);
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, 1);
        r.setStartDate(cal.getTime());

        when(reminderService.getReminder("foo")).thenReturn(r);

        reminderCRUDEventHandler.update(motechEvent);

        verify(schedulerGateway, times(1)).scheduleRunOnceJob(any(RunOnceSchedulableJob.class));
        verify(schedulerGateway, times(0)).scheduleRepeatingJob(any(RepeatingSchedulableJob.class));
    }

    @Test
    public void testHandle_UpdateEnabledRepeating() throws Exception {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(EventKeys.REMINDER_ID_KEY, "foo");
        params.put(EventKeys.APPOINTMENT_ID_KEY, "bar");

        MotechEvent motechEvent = new MotechEvent("updated", params);

        Reminder r = new Reminder();
        r.setEnabled(true);
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, 1);
        r.setStartDate(cal.getTime());
        cal.add(Calendar.DATE, 1);
        r.setEndDate(cal.getTime());
        r.setIntervalCount(1);
        r.setUnits(Reminder.intervalUnits.HOURS);
        r.setRepeatCount(7);

        when(reminderService.getReminder("foo")).thenReturn(r);

        reminderCRUDEventHandler.update(motechEvent);

        verify(schedulerGateway, times(0)).scheduleRunOnceJob(any(RunOnceSchedulableJob.class));
        verify(schedulerGateway, times(1)).scheduleRepeatingJob(any(RepeatingSchedulableJob.class));
    }
}
