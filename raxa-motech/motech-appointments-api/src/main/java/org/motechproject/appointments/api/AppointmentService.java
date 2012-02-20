package org.motechproject.appointments.api;

import org.motechproject.appointments.api.dao.AppointmentsDAO;
import org.motechproject.appointments.api.model.Appointment;
import org.motechproject.context.EventContext;
import org.motechproject.event.EventRelay;
import org.motechproject.model.MotechEvent;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class AppointmentService
{
    @Autowired(required = false)
    private EventRelay eventRelay = EventContext.getInstance().getEventRelay();

    @Autowired
    private AppointmentsDAO appointmentsDAO;

    public void addAppointment(Appointment appointment)
    {
        appointmentsDAO.addAppointment(appointment);

        eventRelay.sendEventMessage(getSkinnyEvent(appointment, EventKeys.APPOINTMENT_CREATED_SUBJECT));
    }

    public void updateAppointment(Appointment appointment)
    {
        appointmentsDAO.updateAppointment(appointment);

        eventRelay.sendEventMessage(getSkinnyEvent(appointment, EventKeys.APPOINTMENT_UPDATED_SUBJECT));
    }

    public Appointment getAppointment(String appointmentId)
    {
        Appointment appointment = appointmentsDAO.getAppointment(appointmentId);
        return appointment;
    }

	public List<Appointment> findByExternalId(String externalId) {
        return appointmentsDAO.findByExternalId(externalId);
	}

    public void removeAppointment(String appointmentId)
    {
        Appointment appointment = getAppointment(appointmentId);

        removeAppointment(appointment);
    }

    public void removeAppointment(Appointment appointment)
    {
        MotechEvent event = getSkinnyEvent(appointment, EventKeys.APPOINTMENT_DELETED_SUBJECT);

        appointmentsDAO.removeAppointment(appointment);

        eventRelay.sendEventMessage(event);
    }

    private MotechEvent getSkinnyEvent(Appointment apt, String subject) {
        Map<String, Object> parameters = new HashMap<String, Object>();
        parameters.put(EventKeys.APPOINTMENT_ID_KEY, apt.getId());

        MotechEvent event = new MotechEvent(subject, parameters);

        return event;
    }

}
