package org.motechproject.mobileforms.api.domain;

import org.junit.Test;

import static junit.framework.Assert.assertEquals;

public class FormTest {

    @Test
    public void ShouldInferFormIdFromContent() {
        Form form1 = new Form("f1","file1","<xf:xforms xmlns:xf=\"http://www.w3.org/2002/xforms\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" id=\"23\"></xf:xforms>", null, null, null);
        Form form2 = new Form("f2","file2","<xf:xforms xmlns:xf=\"http://www.w3.org/2002/xforms\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" id=\"26\"></xf:xforms>", null, null, null);

        assertEquals(new Integer(23),form1.id());
        assertEquals(new Integer(26),form2.id());
    }
}
