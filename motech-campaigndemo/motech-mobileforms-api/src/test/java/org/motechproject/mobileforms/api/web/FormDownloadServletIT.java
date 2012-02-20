package org.motechproject.mobileforms.api.web;

import com.jcraft.jzlib.ZInputStream;
import org.fcitmuk.epihandy.EpihandyXformSerializer;
import org.junit.Before;
import org.junit.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Arrays;
import java.util.List;

import static junit.framework.Assert.assertFalse;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.motechproject.mobileforms.api.utils.TestUtilities.*;

public class FormDownloadServletIT {

    private MockHttpServletRequest request;
    private MockHttpServletResponse response;

    @Before
    public void setUp() {
        initMocks(this);
        request = new MockHttpServletRequest();
        response = new MockHttpServletResponse();
    }

    @Test
    public void shouldReturnTheListOfFormGroups() {
        FormDownloadServlet servlet = new FormDownloadServlet();
        List<Byte[]> responseSentToMobile = null;
        EpihandyXformSerializer serializer = new EpihandyXformSerializer();
        ByteArrayOutputStream expectedGroups = new ByteArrayOutputStream();
        try {
            serializer.serializeStudies(expectedGroups, Arrays.asList(new Object[]{0, "GroupNameI"}, new Object[]{1, "GroupNameII"}));
        } catch (Exception e) {
            assertFalse("Encountered exception while setting up expected result, error while serializing data", true);
        }

        try {
            setupRequestWithActionAndOtherRequestParameters(request, "username", "password", FormDownloadServlet.ACTION_DOWNLOAD_STUDY_LIST, null);

            servlet.doPost(request, response);
            responseSentToMobile = readResponse(response);

            assertThat(response.getStatus(), is(equalTo(HttpServletResponse.SC_OK)));

        } catch (ServletException e) {
            assertFalse(true);
        } catch (IOException e) {
            assertFalse(true);
        }

        assertThat(responseSentToMobile.get(0)[0], is(equalTo(FormDownloadServlet.RESPONSE_SUCCESS)));
        assertThat(toPrimitive(responseSentToMobile.get(1)), is(equalTo(expectedGroups.toByteArray())));
    }

    @Test
    public void shouldReturnListOfUserAccountsTogetherWithTheListOfFormsOfTheGroup_GivenTheIndexOfTheGroup(){
        String motechUserSalt = "7357658437bd298b4a48b7357489357";
        String guyzbUserSalt = "135df6eacf3e3f21866ecff10378035edbf7";
        List<Object[]> expectedUserAccounts = Arrays.asList(new Object[]{1, "motech", "6f6347e4b28216556ec7dfa14d7dfadb873a15", motechUserSalt},
                                                            new Object[]{2, "guyzb", "730c0e85d51b5c293b6ec8f22579ec7b67c5d8", guyzbUserSalt});
        String newLine = System.getProperty("line.separator");
        String expectedFormContent = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>" + newLine +
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

        int groupIndex = 1;
        String expectedGroupName = "GroupNameII";
        EpihandyXformSerializer serializer = new EpihandyXformSerializer();
        ByteArrayOutputStream expectedSerializedFormsAndUsers = new ByteArrayOutputStream();
        try {
            serializer.serializeUsers(expectedSerializedFormsAndUsers, expectedUserAccounts);
            serializer.serializeForms(expectedSerializedFormsAndUsers, Arrays.asList(expectedFormContent), groupIndex, expectedGroupName);
        } catch (Exception e) {
            assertFalse("Encountered exception while setting up expected result, error while serializing data", true);
        }

        FormDownloadServlet servlet = new FormDownloadServlet();
        List<Byte[]> responseSentToMobile = null;
        try {
            setupRequestWithActionAndOtherRequestParameters(request, "username", "password", FormDownloadServlet.ACTION_DOWNLOAD_USERS_AND_FORMS, groupIndex);

            servlet.doPost(request, response);
            responseSentToMobile = readResponse(response);

            assertThat(response.getStatus(), is(equalTo(HttpServletResponse.SC_OK)));

        } catch (ServletException e) {
            assertFalse(true);
        } catch (IOException e) {
            assertFalse(true);
        }

        assertThat(responseSentToMobile.get(0)[0], is(equalTo(FormDownloadServlet.RESPONSE_SUCCESS)));
        assertThat(toPrimitive(responseSentToMobile.get(1)), is(equalTo(expectedSerializedFormsAndUsers.toByteArray())));
    }

    private List<Byte[]> readResponse(MockHttpServletResponse response) throws IOException {
        DataInputStream dataInputStream = new DataInputStream(new ZInputStream(new ByteArrayInputStream(response.getContentAsByteArray())));
        return slice(toObjectByteArray(readFully(dataInputStream)), 1);
    }


    private void setupRequestWithActionAndOtherRequestParameters(MockHttpServletRequest request, String userName, String password, byte actionCode, Integer groupIndex) throws IOException {
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        DataOutputStream dataOutputStream = new DataOutputStream(byteArrayOutputStream);
        dataOutputStream.writeUTF(userName);
        dataOutputStream.writeUTF(password);
        dataOutputStream.writeUTF("epihandyser");
        dataOutputStream.writeUTF("en");
        dataOutputStream.writeByte(actionCode);

        if (groupIndex != null) {
            dataOutputStream.writeInt(groupIndex);
        }
        request.setContent(byteArrayOutputStream.toByteArray());
    }
}
