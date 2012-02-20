package org.motechproject.ivr.kookoo;

import org.junit.Before;
import org.junit.Test;
import org.motechproject.ivr.model.CallDirection;
import org.motechproject.ivr.event.IVREvent;

import static junit.framework.Assert.assertEquals;

public class KookooRequestTest {
    private KookooRequest ivrRequest;

    @Before
    public void setUp() {
        ivrRequest = new KookooRequest("sid", "cid", "someEvent", "4#", "someStatus");
    }

    @Test
    public void shouldGetInputWithoutPoundSymbol() {
        assertEquals("4", ivrRequest.getInput());
    }

    @Test
    public void callDirectionShouldBeInbound_WhenThereIsNoTAMAData() {
        assertEquals(CallDirection.Inbound, ivrRequest.getCallDirection());
    }

    @Test
    public void getCallerId_For10Digit_Numbers() {
        String tenDigitNumber = "1234567890";
        KookooRequest kookooRequest = new KookooRequest("", tenDigitNumber, "", "", "");
        assertEquals("1234567890", kookooRequest.getCid());
    }

    @Test
    public void getCallerId_For11Digit_Numbers() {
        String elevenDigitNumber = "01234567890";
        KookooRequest kookooRequest = new KookooRequest("", elevenDigitNumber, "", "", "");
        assertEquals("1234567890", kookooRequest.getCid());
    }

    @Test
    public void getCallerId_ForNumbers_StartingWith_CountryCode() {
        String numberWithCountryCode = "+911234567890";
        KookooRequest kookooRequest = new KookooRequest("", numberWithCountryCode, "", "", "");
        assertEquals("1234567890", kookooRequest.getCid());
    }

    @Test
    public void callDirectionShouldBeInbound_WhenDirectionNotSpecifiedInTAMAData() {
        assertEquals(CallDirection.Inbound, ivrRequest.getCallDirection());
    }

    @Test
    public void callDirectionShouldBeOutbound_WhenDirectionSpecifiedInTAMAData() {
        ivrRequest.setParameter("hero", "batman");
        ivrRequest.setParameter("villain", "joker");
        ivrRequest.setParameter(KookooCallServiceImpl.IS_OUTBOUND_CALL, "true");
        assertEquals(CallDirection.Outbound, ivrRequest.getCallDirection());
    }

    @Test
    public void shouldReadDataMapFromJsonString() {
        String json = "{\"regimen_id\":\"23423423423\", \"dosage_id\":\"34324234\"}";
        ivrRequest.setDataMap(json);
        assertEquals("23423423423", ivrRequest.getParameter("regimen_id"));
        assertEquals("34324234", ivrRequest.getParameter("dosage_id"));
    }

    @Test
    public void setDefaults_ThisIsToHandleScenariosWhenKooKooCallsWithoutAnyParameters() {
        ivrRequest = new KookooRequest();
        ivrRequest.setDefaults();
        assertEquals(IVREvent.GotDTMF.toString(), ivrRequest.getEvent());
        assertEquals("", ivrRequest.getData());
    }
}
