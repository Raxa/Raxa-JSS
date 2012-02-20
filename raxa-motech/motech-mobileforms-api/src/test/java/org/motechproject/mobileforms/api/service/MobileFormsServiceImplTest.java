package org.motechproject.mobileforms.api.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.motechproject.mobileforms.api.domain.FormBean;
import org.motechproject.mobileforms.api.repository.AllMobileForms;
import org.motechproject.mobileforms.api.domain.Form;
import org.motechproject.mobileforms.api.domain.FormGroup;
import org.motechproject.mobileforms.api.vo.Study;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static junit.framework.Assert.assertEquals;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class MobileFormsServiceImplTest {

    private MobileFormsService mobileFormsService;

    @Mock
    private AllMobileForms allMobileForms;

    @Before
    public void setUp() {
        initMocks(this);
        mobileFormsService = new MobileFormsServiceImpl(allMobileForms);
    }

    @Test
    public void shouldFetchTheListOfFromGroupsAvailable() {

        String groupOneName = "Group-1";
        String groupTwoName = "Group-2";
        when(allMobileForms.getAllFormGroups()).thenReturn(Arrays.asList(new FormGroup(groupOneName, Arrays.asList(new Form("Form-1", "Form-1.xml"))),
                new FormGroup(groupTwoName, Arrays.asList(new Form("From-2", "Form-2.xml")))));

        List<Object[]> returnedFormGroups = mobileFormsService.getAllFormGroups();

        assertThat(returnedFormGroups.size(), is(equalTo(2)));

        assertThat((Integer) returnedFormGroups.get(0)[0], is(equalTo(0)));
        assertThat((String) returnedFormGroups.get(0)[1], is(equalTo(groupOneName)));

        assertThat((Integer) returnedFormGroups.get(1)[0], is(equalTo(1)));
        assertThat((String) returnedFormGroups.get(1)[1], is(equalTo(groupTwoName)));
    }

    @Test
    public void shouldReturnContextOfFormsThatBelongsToTheGroupGivenTheIndexOfTheGroup() {
        String formOneContent = "Form-1-content";
        String formTwoContent = "Form-2-content";
        String formThreeContent = "Form-3-content";
        String formGroupOneName = "FormGroup-1";
        String formGroupTwoName = "FormGroup-2";

        when(allMobileForms.getFormGroup(0)).thenReturn(new FormGroup(formGroupOneName, Arrays.asList(new Form("From-1", "Form-1.xml", formOneContent, null, null, null), new Form("Form-2", "Form-2.xml", formTwoContent, null, null, null))));
        when(allMobileForms.getFormGroup(1)).thenReturn(new FormGroup(formGroupTwoName, Arrays.asList(new Form("From-3", "Form-3.xml", formThreeContent, null, null, null))));

        assertThat(mobileFormsService.getForms(0), is(equalTo(new Study(formGroupOneName, Arrays.asList(new FormBean(formOneContent), new FormBean(formTwoContent))))));
        assertThat(mobileFormsService.getForms(1), is(equalTo(new Study(formGroupTwoName, Arrays.asList(new FormBean(formThreeContent))))));

    }

    @Test
    public void shouldReturnFormDefinitionMap() {
        Form form1 = makeTestForm(1,"f1_content");
        Form form2 = makeTestForm(2,"f2_content");
        Form form3 = makeTestForm(3,"f3_content");
        Form form4 = makeTestForm(4,"f4_content");
        FormGroup group1 = new FormGroup("g1", Arrays.asList(form1, form2));
        FormGroup group2 = new FormGroup("g2", Arrays.asList(form3, form4));
        when(allMobileForms.getAllFormGroups()).thenReturn(Arrays.asList(group1, group2));

        Map<Integer, String> formDefinitionMap = mobileFormsService.getFormIdMap();

        assertEquals("f1_content", formDefinitionMap.get(1));
        assertEquals("f2_content", formDefinitionMap.get(2));
        assertEquals("f3_content", formDefinitionMap.get(3));
        assertEquals("f4_content", formDefinitionMap.get(4));
    }

    private Form makeTestForm(Integer formId, String content) {
        Form form = mock(Form.class);
        when(form.id()).thenReturn(formId);
        when(form.content()).thenReturn(content);
        return form;
    }
}
