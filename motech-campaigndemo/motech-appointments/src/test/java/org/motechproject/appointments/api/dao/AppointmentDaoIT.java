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
package org.motechproject.appointments.api.dao;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.motechproject.appointments.api.model.Appointment;
import org.motechproject.appointments.api.model.Visit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Date;
import java.util.List;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertNotNull;

/**
 * Appointment DAO test
 * @author yyonkov
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"/applicationAppointments.xml"})
public class AppointmentDaoIT {

	@Autowired
	private AppointmentsDAO appointmentsDAO;

    @Autowired
    private RemindersDAO remindersDAO;

	@Test
	public void testAddAppointment() {
        Date now = new Date();

        Visit visit = new Visit();
        visit.setVisitDate(now);

		Appointment app = new Appointment();
        app.setDueDate(now);
        app.setExternalId("foo");
        app.setScheduledDate(now);

        appointmentsDAO.addAppointment(app);

        assertNotNull(app.getId());

        appointmentsDAO.removeAppointment(app);
	}

    @Test
    public void testFindByExternalId() {
        Appointment app1 = new Appointment();
        app1.setExternalId("foo");
        app1.setTitle("Appointment 1");
        appointmentsDAO.addAppointment(app1);

        Appointment app2 = new Appointment();
        app2.setTitle("Appointment 2");
        app2.setExternalId("foo");
        appointmentsDAO.addAppointment(app2);

        List<Appointment> list = appointmentsDAO.findByExternalId("foo");

        assertEquals(2, list.size());

        appointmentsDAO.removeAppointment(app1);
        appointmentsDAO.removeAppointment(app2);
    }
}
