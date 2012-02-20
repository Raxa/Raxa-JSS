package org.motechproject.mobileforms.api.domain;

import org.fcitmuk.epihandy.ResponseHeader;
import org.junit.Before;
import org.junit.Test;
import org.motechproject.mobileforms.api.vo.Study;

import java.io.ByteArrayOutputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.util.Arrays;

import static org.junit.Assert.assertTrue;

public class FormOutputTest {
    private FormOutput formOutput;

    @Before
    public void setUp() {
        formOutput = new FormOutput();
    }

    @Test
    public void shouldWriteSuccessCumErrorCounts() throws IOException {

        FormBean formBean1 = new FormBean("xml1");
        formBean1.setStudyName("study1");
        formBean1.setFormname("form1");
        FormBean formBean2 = new FormBean("xml2");
        formBean2.setStudyName("study2");
        formBean2.setFormname("form2");
        formBean2.setFormErrors(Arrays.asList(new FormError("field_name", "error")));
        Study study = new Study("study", Arrays.asList(formBean1, formBean2));

        ByteArrayOutputStream actualByteStream = new ByteArrayOutputStream();

        formOutput.addStudy(study);
        formOutput.writeFormErrors(new DataOutputStream(actualByteStream));

        ByteArrayOutputStream expectedByteStream = new ByteArrayOutputStream();
        DataOutputStream expectedDataOutputStream = new DataOutputStream(expectedByteStream);
        expectedDataOutputStream.writeByte(ResponseHeader.STATUS_SUCCESS);
        expectedDataOutputStream.writeInt(1);
        expectedDataOutputStream.writeInt(1);

        expectedDataOutputStream.writeByte(0);
        expectedDataOutputStream.writeShort(1);
        expectedDataOutputStream.writeUTF("Errors:field_name=error");

        assertTrue(Arrays.equals(expectedByteStream.toByteArray(), actualByteStream.toByteArray()));

    }
}
