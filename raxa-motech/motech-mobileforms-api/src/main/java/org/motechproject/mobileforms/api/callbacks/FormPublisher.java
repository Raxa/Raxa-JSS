package org.motechproject.mobileforms.api.callbacks;

import org.motechproject.context.EventContext;
import org.motechproject.event.EventRelay;
import org.motechproject.mobileforms.api.domain.FormBean;
import org.motechproject.model.MotechEvent;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class FormPublisher {

    public static final String FORM_BEAN = "formBean";
    public static final String FORM_VALIDATION_SUCCESSFUL = "form.validation.successful";

    private EventRelay eventRelay;

    public FormPublisher() {
        this.eventRelay = EventContext.getInstance().getEventRelay();
    }

    public void publish(FormBean formBean) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put(FORM_BEAN, formBean);
        String eventSubject = FORM_VALIDATION_SUCCESSFUL + "." + formBean.getStudyName() + "." + formBean.getFormname();
        MotechEvent motechEvent = new MotechEvent(eventSubject, params);
        eventRelay.sendEventMessage(motechEvent);
    }

}
