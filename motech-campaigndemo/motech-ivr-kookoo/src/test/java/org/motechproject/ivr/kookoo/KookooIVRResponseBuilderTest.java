package org.motechproject.ivr.kookoo;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.motechproject.ivr.message.IVRMessage;
import org.powermock.core.classloader.annotations.PrepareForTest;
import org.powermock.modules.junit4.PowerMockRunner;

import static org.junit.Assert.*;
import static org.mockito.Matchers.anyString;
import static org.mockito.MockitoAnnotations.initMocks;
import static org.powermock.api.mockito.PowerMockito.mockStatic;
import static org.powermock.api.mockito.PowerMockito.when;

@RunWith(PowerMockRunner.class)
@PrepareForTest({KookooResponseFactory.class})
public class KookooIVRResponseBuilderTest {

    private KookooIVRResponseBuilder builder;
    @Mock
    private IVRMessage messages;

    @Before
    public void setUp() {
        initMocks(this);
        builder = new KookooIVRResponseBuilder().withSid("sid");
        Mockito.when(messages.getWav(anyString(), anyString())).thenReturn("");
    }

    @Test
    public void shouldAddPlayTextOnlyIfItsNotEmpty() {
        when(messages.getText(anyString())).thenReturn("nova");

        String response = builder.withPlayTexts("nova").create(messages);
        assertTrue(response.contains("nova"));

        builder = new KookooIVRResponseBuilder().withSid("sid");
        response = builder.create(messages);
        assertFalse(response.contains("<playtext>"));
    }

    @Test
    public void shouldAddPlayAudioOnlyIfItsNotEmpty() {
        when(messages.getWav(anyString(), anyString())).thenReturn("nova");
        String response = builder.withPlayAudios("nova").create(messages);
        assertTrue(response.contains("nova"));

        builder = new KookooIVRResponseBuilder().withSid("sid");
        response = builder.create(messages);
        assertFalse(response.contains("<playaudio>"));
    }

    @Test
    public void shouldAddCollectDTMFWithCharacterLimit() {
        mockStatic(KookooResponseFactory.class);
        String response = new KookooIVRResponseBuilder().withSid("sid").collectDtmfLength(4).withPlayAudios("foo").create(messages);
        assertTrue(response.contains("l=\"4\""));
    }

    @Test
    public void shouldHangupOnlyOnlyWhenAskedFor() {
        String response = builder.withHangUp().withSid("sid").create(messages);
        assertTrue(response.contains("<hangup/>"));

        response = new KookooIVRResponseBuilder().withSid("12").create(messages);
        assertFalse(response.contains("<hangup/>"));
    }

    @Test
    public void shouldAddMultiplePlayAudios() {
        when(messages.getWav("wav1", "en")).thenReturn("wav1");
        when(messages.getWav("wav2", "en")).thenReturn("wav2");
        String response = builder.withPlayAudios("wav1").withPlayAudios("wav2").withSid("sid").create(messages);
        assertTrue(response, response.contains("<playaudio>wav1</playaudio>"));
        assertTrue(response, response.contains("<playaudio>wav2</playaudio>"));
    }

    @Test
    public void shouldAddMultiplePlayTexts() {
        when(messages.getText("txt1")).thenReturn("txt1");
        when(messages.getText("txt2")).thenReturn("txt2");
        String response = builder.withPlayTexts("txt1").withPlayTexts("txt2").withSid("sid").create(messages);
        assertTrue(response.contains("<playtext>txt1</playtext>"));
        assertTrue(response.contains("<playtext>txt2</playtext>"));
    }

    @Test
    public void transitionsWithoutAudioPromptsShouldImplyNoUserResponse() {
        builder = new KookooIVRResponseBuilder().withSid("sid");
        assertTrue(builder.isEmpty());
    }

    @Test
    public void transitionsWithDtmfLengthGreaterThanZeroShouldImplyDtmfEvent() {
        builder = new KookooIVRResponseBuilder().withSid("sid").collectDtmfLength(4);
        assertTrue(builder.isCollectDTMF());
        assertEquals(false, builder.isNotEmpty());
        assertEquals(true, builder.withPlayAudios("foo").isNotEmpty());
    }

    @Test
    public void donotCollectDTMFIfHangupIsSpecified() {
        builder.withHangUp().withPlayAudios("foo");
        assertEquals(false, builder.isCollectDTMF());
    }

    @Test
    public void collectDTMFIfResponseIsNotEmpty() {
        builder.withPlayAudios("foo");
        assertEquals(true, builder.isNotEmpty());
    }

    @Test
    public void shouldAddDialWhenPhoneNumberIsSet(){
        String response = builder.withPhoneNumber("1234567890").create(messages);
        assertTrue(response.contains("<dial>1234567890</dial>"));
    }
}
