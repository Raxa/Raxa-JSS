package org.motechproject.mobileforms.api.parser;

import org.junit.Before;
import org.junit.Test;
import org.motechproject.mobileforms.api.domain.TestForm;

import java.util.Map;

import static org.junit.Assert.assertEquals;

public class FormDataParserTest {

    private FormDataParser parser;

    @Before
    public void setUp(){
      parser = new FormDataParser();
    }

    @Test
    public void shouldConvertFormXMLToDataString(){
         String xml = "<?xml version='1.0' encoding='UTF-8' ?>" +
                 "<patientreg description-template=\"${/patientreg/lastname}$ in ${/patientreg/continent}$\" id=\"1\" name=\"Patient Registration\" " +
                 "xmlns:xf=\"http://www.w3.org/2002/xforms\" " +
                 "xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" " +
                 "xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">" +
                 "<patientid>123</patientid>" +
                 "<country>uganda</country>" +
                 "<district>mbale</district>" +
                 "<formType>data</formType>" +
                 "<formName>patientreg</formName>" +
                 "</patientreg>";

        Map map = parser.parse(xml);
        assertEquals("uganda",map.get("country"));
        assertEquals("patientreg",map.get("formName"));
        assertEquals("data", map.get("formType"));
    }
}
