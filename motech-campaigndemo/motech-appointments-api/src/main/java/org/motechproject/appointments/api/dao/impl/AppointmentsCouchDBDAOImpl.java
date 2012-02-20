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
package org.motechproject.appointments.api.dao.impl;

import org.ektorp.CouchDbConnector;
import org.ektorp.support.GenerateView;
import org.motechproject.appointments.api.dao.AppointmentsDAO;
import org.motechproject.appointments.api.model.Appointment;
import org.motechproject.dao.MotechBaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.Collections;
import java.util.List;

public class AppointmentsCouchDBDAOImpl extends MotechBaseRepository<Appointment> implements AppointmentsDAO
{

    @Autowired
    public AppointmentsCouchDBDAOImpl(@Qualifier("appointmentsDatabase") CouchDbConnector db) {
        super(Appointment.class, db);
    }

    @Override
    public void addAppointment(Appointment appointment)
    {
        db.create(appointment);
    }

    @Override
    public void updateAppointment(Appointment appointment)
    {
        db.update(appointment);
    }

    @Override
    public Appointment getAppointment(String appointmentId)
    {
        Appointment appointment = db.get(Appointment.class, appointmentId);
        return appointment;
    }

    @Override
	@GenerateView
	public List<Appointment> findByExternalId(String externalId) {
        List<Appointment> ret = queryView("by_externalId", externalId);
        if (null == ret) {
            ret  = Collections.<Appointment>emptyList();
        }

        return ret;
	}

    @Override
    public void removeAppointment(String appointmentId)
    {
        Appointment appointment = getAppointment(appointmentId);

        removeAppointment(appointment);
    }

    @Override
    public void removeAppointment(Appointment appointment)
    {
        db.delete(appointment);
    }
}
