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
import org.motechproject.metrics.MetricsAgent;
import org.motechproject.model.MotechEvent;

import java.util.*;

import static org.mockito.Mockito.*;

/**
 *
 */
public class AppointmentDeletedEventHandlerTest {

    @InjectMocks
    AppointmentDeletedEventHandler appointmentDeletedEventHandler = new AppointmentDeletedEventHandler();

    @Mock
    private ReminderService reminderService;

    @Mock
    private MetricsAgent metricsAgent;

    @Before
    public void initMocks() {
        MockitoAnnotations.initMocks(this);
     }

    @Test
    public void testHandle() throws Exception {
        String appointmentId = "1a";

        Map<String, Object> params = new HashMap<String, Object>();
        params.put(EventKeys.APPOINTMENT_ID_KEY, appointmentId);

        MotechEvent motechEvent = new MotechEvent("", params);

        Reminder r = new Reminder();
        List<Reminder> reminders = new ArrayList<Reminder>();
        reminders.add(r);

        when(reminderService.findByAppointmentId(appointmentId)).thenReturn(reminders);

        appointmentDeletedEventHandler.handle(motechEvent);

        verify(reminderService, times(1)).removeReminder(r);
    }

    @Test
    public void testHandle_DeleteMultiple() throws Exception {
        String appointmentId = "1a";

        Map<String, Object> params = new HashMap<String, Object>();
        params.put(EventKeys.APPOINTMENT_ID_KEY, appointmentId);

        MotechEvent motechEvent = new MotechEvent("", params);

        Reminder r = new Reminder();
        Reminder r2 = new Reminder();
        List<Reminder> reminders = new ArrayList<Reminder>();
        reminders.add(r);
        reminders.add(r2);

        when(reminderService.findByAppointmentId(appointmentId)).thenReturn(reminders);

        appointmentDeletedEventHandler.handle(motechEvent);

        verify(reminderService, times(2)).removeReminder(any(Reminder.class));
    }

    @Test
    public void testHandle_NoAptKey() throws Exception {
        Map<String, Object> params = new HashMap<String, Object>();

        MotechEvent motechEvent = new MotechEvent("", params);

        Reminder r = new Reminder();
        List<Reminder> reminders = new ArrayList<Reminder>();
        reminders.add(r);

        when(reminderService.findByAppointmentId(null)).thenReturn(Collections.<Reminder>emptyList());

        appointmentDeletedEventHandler.handle(motechEvent);

        verify(reminderService, times(0)).removeReminder(any(Reminder.class));
    }
}
