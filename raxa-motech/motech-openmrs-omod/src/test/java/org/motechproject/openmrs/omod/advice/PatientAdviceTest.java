package org.motechproject.openmrs.omod.advice;

import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.motechproject.openmrs.omod.domain.OmodEvent;
import org.motechproject.openmrs.omod.service.OmodPublisher;
import org.openmrs.Patient;
import org.openmrs.api.PatientService;
import org.springframework.test.util.ReflectionTestUtils;

import java.lang.reflect.Method;

import static junit.framework.Assert.assertEquals;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.initMocks;

public class PatientAdviceTest {

    private PatientAdvice patientAdvice;
    @Mock
    private OmodPublisher publisher;

    @Before
    public void setUp() {
        initMocks(this);
        patientAdvice = new PatientAdvice();
        ReflectionTestUtils.setField(patientAdvice, "publisher", publisher);
    }

    @Test
    public void shouldPublishEventForPatientRelatedOperations() throws Throwable {
        Method method = PatientService.class.getDeclaredMethods()[0];
        String methodName = method.getName();
        Patient patient = mock(Patient.class);

        patientAdvice.afterReturning(patient, method, null, null);

        ArgumentCaptor<OmodEvent> captor = ArgumentCaptor.forClass(OmodEvent.class);
        verify(publisher).send(captor.capture());
        OmodEvent captured = captor.getValue();

        assertEquals(PatientAdvice.class.getName(), captured.getSubject());
        assertThat((String) captured.getParameters().get(BaseAdvice.ADVICE_EVENT_METHOD_INVOKED), is(equalTo(methodName)));
        assertThat((Patient) captured.getParameters().get(BaseAdvice.ADVICE_EVENT_RETURNED_VALUE), is(equalTo(patient)));
    }
}
