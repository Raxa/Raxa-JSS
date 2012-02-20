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
package org.motechproject.appointments.api;

import org.motechproject.appointments.api.dao.VisitsDAO;
import org.motechproject.appointments.api.model.Visit;
import org.motechproject.context.EventContext;
import org.motechproject.event.EventRelay;
import org.motechproject.model.MotechEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class VisitService
{
    @Autowired(required = false)
    private EventRelay eventRelay = EventContext.getInstance().getEventRelay();

    @Autowired
    VisitsDAO visitsDAO;

    public void addVisit(Visit visit)
    {
        visitsDAO.addVisit(visit);

        eventRelay.sendEventMessage(getSkinnyEvent(visit, EventKeys.VISIT_CREATED_SUBJECT));
    }

    public void updateVisit(Visit visit)
    {
        visitsDAO.updateVisit(visit);

        eventRelay.sendEventMessage(getSkinnyEvent(visit, EventKeys.VISIT_UPDATED_SUBJECT));
    }

    public void removeVisit(String visitId)
    {
        Visit visit = getVisit(visitId);

        removeVisit(visit);
    }

    public void removeVisit(Visit visit)
    {
        MotechEvent event = getSkinnyEvent(visit, EventKeys.VISIT_DELETED_SUBJECT);

        visitsDAO.removeVisit(visit);

        eventRelay.sendEventMessage(event);
    }

    public Visit getVisit(String visitId)
    {
        Visit visit = visitsDAO.getVisit(visitId);
        return visit;
    }

    public List<Visit> findByAppointmentId(String appointmentId)
    {
        return visitsDAO.findByAppointmentId(appointmentId);
    }

    public List<Visit> findByExternalId(String externalId)
    {
        return  visitsDAO.findByExternalId(externalId);
    }

    private MotechEvent getSkinnyEvent(Visit visit, String subject) {
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put(EventKeys.APPOINTMENT_ID_KEY, visit.getAppointmentId());
        parameters.put(EventKeys.VISIT_ID_KEY, visit.getId());

        MotechEvent event = new MotechEvent(subject, parameters);

        return event;
    }
}
