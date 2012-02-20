package org.motechproject.mobileforms.api.repository;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.motechproject.dao.MotechJsonReader;
import org.motechproject.mobileforms.api.domain.Form;
import org.motechproject.mobileforms.api.domain.FormGroup;
import org.motechproject.mobileforms.api.utils.IOUtils;
import org.motechproject.mobileforms.api.utils.TestUtilities;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class AllMobileFormsTest {
    @Mock
    private IOUtils ioUtils;
    private AllMobileForms allMobileForms;
    private List<Form> formsOfGroupOne;
    private List<Form> formsOfGroupTwo;
    private FormGroup formGroupOne;
    private FormGroup formGroupTwo;

    @Before
    public void setup() {
        initMocks(this);
        allMobileForms = new AllMobileForms(TestUtilities.setupProperties("forms.config.file", "/forms-config.json"), new MotechJsonReader(), ioUtils);
        when(ioUtils.getFileContent("ClientDeath-1.xml", "GroupNameI")).thenReturn("<form>DummyForm1</form>");
        when(ioUtils.getFileContent("ANCVisit-1.xml", "GroupNameI")).thenReturn("<form>DummyForm2</form>");
        when(ioUtils.getFileContent("ClientDeath-2.xml", "GroupNameII")).thenReturn("<form>DummyForm3</form>");

        allMobileForms.initialize();
        formsOfGroupOne = Arrays.asList(new Form("MForm-I", "ClientDeath-1.xml", "<form>DummyForm1</form>", null, null, null),
                                        new Form("MForm-II", "ANCVisit-1.xml", "<form>DummyForm2</form>", null, null, null));
        formsOfGroupTwo = Arrays.asList(new Form("MForm-III", "ClientDeath-2.xml", "<form>DummyForm3</form>", null, null, null));
        formGroupOne = new FormGroup("GroupNameI", formsOfGroupOne);
        formGroupTwo = new FormGroup("GroupNameII", formsOfGroupTwo);
    }

    @Test
    public void shouldInitializeByLoadingAllFormsFromFileSystem(){
        List<FormGroup> expectedFormGroups = Arrays.asList(formGroupOne, formGroupTwo);
        assertThat(allMobileForms.getAllFormGroups(), is(equalTo(expectedFormGroups)));
    }

    @Test
    public void shouldReturnTheGroupGivenTheIndexOfListOfFormGroups(){
        assertThat(allMobileForms.getFormGroup(0), is(equalTo(formGroupOne)));
        assertThat(allMobileForms.getFormGroup(1), is(equalTo(formGroupTwo)));
    }
}
