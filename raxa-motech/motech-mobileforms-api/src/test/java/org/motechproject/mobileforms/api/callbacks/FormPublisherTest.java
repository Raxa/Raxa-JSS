package org.motechproject.mobileforms.api.callbacks;

import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.motechproject.event.EventRelay;
import org.motechproject.mobileforms.api.domain.FormBean;
import org.motechproject.model.MotechEvent;
import org.springframework.test.util.ReflectionTestUtils;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertTrue;
import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.initMocks;

public class FormPublisherTest {

    private FormPublisher publisher;
    @Mock
    private EventRelay eventRelay;

    @Before
    public void setUp() {
        initMocks(this);
        publisher = new FormPublisher();
        ReflectionTestUtils.setField(publisher, "eventRelay", eventRelay);
    }

    @Test
    public void shouldPublishFormBeanAsEventToRelay() {
        FormBean formBean = new FormBean();
        formBean.setStudyName("study1");
        formBean.setFormname("form1");

        publisher.publish(formBean);

        ArgumentCaptor<MotechEvent> captor = ArgumentCaptor.forClass(MotechEvent.class);
        verify(eventRelay).sendEventMessage(captor.capture());
        MotechEvent captured = captor.getValue();
        assertEquals("form.validation.successful.study1.form1",captured.getSubject());
        assertTrue(captured.getParameters().containsValue(formBean));
    }
}
