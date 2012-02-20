package org.motechproject.mobileforms.api.callbacks;

import org.fcitmuk.epihandy.StudyData;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.motechproject.mobileforms.api.domain.Form;
import org.motechproject.mobileforms.api.domain.PatientType;
import org.motechproject.mobileforms.api.domain.RegisterClientBean;
import org.motechproject.mobileforms.api.domain.TestForm;
import org.motechproject.mobileforms.api.parser.FormDataParser;
import org.motechproject.mobileforms.api.repository.AllMobileForms;
import org.motechproject.mobileforms.api.utils.MapToBeanConvertor;
import org.motechproject.mobileforms.api.vo.Study;
import org.springframework.test.util.ReflectionTestUtils;

import java.lang.reflect.InvocationTargetException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class FormProcessorTest {
    private FormProcessor formProcessor;
    @Mock
    private FormDataParser formDataParser;
    @Mock
    private AllMobileForms allMobileForms;

    @Before
    public void setUp() {
        initMocks(this);
        formProcessor = new FormProcessor();
        ReflectionTestUtils.setField(formProcessor, "parser", formDataParser);
        ReflectionTestUtils.setField(formProcessor, "allMobileForms", allMobileForms);
        ReflectionTestUtils.setField(formProcessor, "marker", "formname");
        ReflectionTestUtils.setField(formProcessor, "mapToBeanConvertor", new MapToBeanConvertor());
    }

    @Test
    public void shouldMakeFormBeansOutOfFormXML() {
        formProcessor.start();
        Map map = new HashMap();
        map.put("formname", "formName");
        map.put("country", "india");
        map.put("district", "katpadi");
        map.put("patientid", "12");
        map.put("birthDate", "1990-06-03");


        when(formDataParser.parse("xml")).thenReturn(map);
        Form form = mock(Form.class);
        when(form.bean()).thenReturn("org.motechproject.mobileforms.api.domain.TestForm");
        when(form.validator()).thenReturn("validator");
        when(form.name()).thenReturn("formName");
        when(form.studyName()).thenReturn("studyName");
        when(allMobileForms.getFormByName("formName")).thenReturn(form);

        StudyData mockStudyData = mock(StudyData.class);
        formProcessor.processingStudy(mockStudyData);
        formProcessor.formProcessed(null, null, "xml");

        TestForm testForm = (TestForm) formProcessor.getStudies().get(0).forms().get(0);
        assertEquals("formName", testForm.getFormname());
        assertEquals("studyName", testForm.getStudyName());
        assertEquals("validator", testForm.getValidator());
        assertEquals("india", testForm.getCountry());
        assertEquals("katpadi", testForm.getDistrict());
        assertEquals(new Integer(12), testForm.getPatientid());
        assertEquals("xml", testForm.getXmlContent());
        assertEquals("1990-06-03", new SimpleDateFormat(MapToBeanConvertor.DATE_PATTERN).format(testForm.getBirthDate()));
    }

    @Test
    public void shouldRemoveEmptyStringValuesAndHandleEnumValueTypesWhilePopulatingBeanFromMap() throws InvocationTargetException, IllegalAccessException, ParseException {
        formProcessor.start();
        Map<String, String> formAttributes = new HashMap<String, String>();
        formAttributes.put("addHistory", "");
        formAttributes.put("nhisExpires", "");
        formAttributes.put("registrantType", "MOTHER");
        formAttributes.put("sender", "0944442452");
        formAttributes.put("estimatedBirthDate", "Y");
        formAttributes.put("enroll", "N");
        formAttributes.put("middleName", "M");
        formAttributes.put("lastName", "");
        formAttributes.put("facilityId", "39");
        formAttributes.put("registrationMode", "AUTO_GENERATE_ID");
        formAttributes.put("insured", "N");
        formAttributes.put("region", "ash");
        formAttributes.put("dateOfBirth", "2006-11-15");
        formAttributes.put("sex", "M");
        formAttributes.put("date", "2011-11-13");
        formAttributes.put("firstName", "Raman");
        formAttributes.put("formtype", "data_entry");
        formAttributes.put("staffId", "3");
        formAttributes.put("address", "Gh");
        formAttributes.put("formname", "registerPatient-jf");

        when(formDataParser.parse("xml")).thenReturn(formAttributes);
        Form form = mock(Form.class);
        when(form.bean()).thenReturn("org.motechproject.mobileforms.api.domain.RegisterClientBean");
        when(form.validator()).thenReturn("validator");
        when(form.name()).thenReturn("formname");
        when(form.studyName()).thenReturn("studyName");
        when(allMobileForms.getFormByName("registerPatient-jf")).thenReturn(form);

        StudyData mockStudyData = mock(StudyData.class);
        formProcessor.processingStudy(mockStudyData);
        formProcessor.formProcessed(null, null, "xml");

        RegisterClientBean registerClientBean = (RegisterClientBean) formProcessor.getStudies().get(0).forms().get(0);
        assertThat(registerClientBean.getSender(), is(equalTo("0944442452")));

        assertThat(registerClientBean.getNhisExpires(), is(equalTo(null)));
        assertThat(registerClientBean.getRegistrantType(), is(equalTo(PatientType.MOTHER)));
        assertThat(registerClientBean.getSender(), is(equalTo("0944442452")));
        assertThat(registerClientBean.getEstimatedBirthDate(), is(equalTo(true)));
        assertThat(registerClientBean.getEnroll(), is(equalTo(false)));
        assertThat(registerClientBean.getMiddleName(), is(equalTo("M")));
        assertThat(registerClientBean.getLastName(), is(equalTo(null)));
        assertThat(registerClientBean.getFacilityId(), is(equalTo("39")));
        assertThat(registerClientBean.getRegistrationMode(), is(equalTo("AUTO_GENERATE_ID")));
        assertThat(registerClientBean.getInsured(), is(equalTo(false)));
        assertThat(registerClientBean.getRegion(), is(equalTo("ash")));
        assertThat(registerClientBean.getDateOfBirth(), is(equalTo(new SimpleDateFormat(MapToBeanConvertor.DATE_PATTERN).parse("2006-11-15"))));
        assertThat(registerClientBean.getSex(), is(equalTo("M")));
        assertThat(registerClientBean.getDate(), is(equalTo(new SimpleDateFormat(MapToBeanConvertor.DATE_PATTERN).parse("2011-11-13"))));
        assertThat(registerClientBean.getFirstName(), is(equalTo("Raman")));
        assertThat(registerClientBean.getFormtype(), is(equalTo("data_entry")));
        assertThat(registerClientBean.getStaffId(), is(equalTo("3")));
        assertThat(registerClientBean.getAddress(), is(equalTo("Gh")));
        assertThat(registerClientBean.getFormname(), is(equalTo("registerPatient-jf")));
    }

    @Test
    public void shouldInitializeEmptyListToStudiesWhileBeforeParsingTheXml(){
        assertThat(formProcessor.getStudies(), is(equalTo(null)));
        formProcessor.start();
        assertThat(formProcessor.getStudies(), is(equalTo(Collections.<Study>emptyList())));
    }

}
