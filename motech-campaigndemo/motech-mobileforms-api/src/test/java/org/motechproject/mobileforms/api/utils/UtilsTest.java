package org.motechproject.mobileforms.api.utils;

import org.junit.Test;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;

public class UtilsTest {

    @Test
    public void shouldGetTheContentsOfAXFormFileGivenFileNameAndGroupName(){
        String newLine = System.getProperty("line.separator");
        String expectedFileContent = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>" + newLine +
                "<xf:xforms xmlns:xf=\"http://www.w3.org/2002/xforms\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" id=\"7\">" + newLine +
                "  <xf:model>" + newLine +
                "    <xf:instance id=\"death\">" + newLine +
                "      <death id=\"7\" name=\"Client Death\">" + newLine +
                "        <staffId/>" + newLine +
                "      </death>" + newLine +
                "    </xf:instance>" + newLine +
                "    <xf:bind id=\"staffId\" nodeset=\"/death/staffId\" required=\"true()\" type=\"xsd:int\" constraint=\". &lt; 2147483647\" message=\"Number too large. Keep under 2147483647\"/>" + newLine +
                "  </xf:model>" + newLine +
                "</xf:xforms>";

        assertThat(new IOUtils().getFileContent("ClientDeath-2.xml", "GroupNameII"), is(equalTo(expectedFileContent)));
    }

    @Test
    public void shouldReturnSha1HashedStringGivenAPasswordAndSalt(){
        // retaining the hashing with bug (leading zero missing for single digit hex) to be consistent with the mobile client code
        assertThat(new Encoder().sha("ghs", "7357658437bd298b4a48b7357489357"), is(equalTo("6f6347e4b28216556ec7dfa14d7dfadb873a15")));
    }

}
