package org.motechproject.appointments.api.context;

import org.motechproject.appointments.api.AppointmentService;
import org.motechproject.appointments.api.ReminderService;
import org.motechproject.appointments.api.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AppointmentsContext
{
    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private ReminderService reminderService;

    @Autowired
    private VisitService visitService;

    public AppointmentService getAppointmentService()
    {
        return appointmentService;
    }

    public void setAppointmentService(AppointmentService appointmentService)
    {
        this.appointmentService = appointmentService;
    }

    public ReminderService getReminderService()
    {
        return reminderService;
    }

    public void setReminderService(ReminderService reminderService)
    {
        this.reminderService = reminderService;
    }

    public VisitService getVisitService()
    {
        return visitService;
    }

    public void setVisitService(VisitService visitService)
    {
        this.visitService = visitService;
    }

    public static AppointmentsContext getInstance(){
		return instance;
	}

	private static AppointmentsContext instance = new AppointmentsContext();

	private AppointmentsContext(){}
}
