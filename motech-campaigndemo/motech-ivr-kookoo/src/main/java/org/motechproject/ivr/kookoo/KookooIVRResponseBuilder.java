package org.motechproject.ivr.kookoo;

import com.ozonetel.kookoo.CollectDtmf;
import com.ozonetel.kookoo.Dial;
import com.ozonetel.kookoo.Response;
import org.apache.commons.lang.StringUtils;
import org.motechproject.ivr.message.IVRMessage;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

//TODO: This class should be renamed to KookooIVRResponse, as it represents the response which is implemented as builder
public class KookooIVRResponseBuilder {
    private boolean isHangUp;
    private int dtmfLength;
    private List<String> playTexts = new ArrayList<String>();
    private List<String> playAudios = new ArrayList<String>();
    private String sid;
    private String language;
    private String phoneNumber;

    public KookooIVRResponseBuilder() {
    }

    public KookooIVRResponseBuilder withDefaultLanguage() {
        return language("en");
    }

    public KookooIVRResponseBuilder language(String code) {
        this.language = code;
        return this;
    }

	public KookooIVRResponseBuilder withPlayTexts(String... playTexts) {
        Collections.addAll(this.playTexts, playTexts);
        return this;
    }

	public KookooIVRResponseBuilder withPlayAudios(String... playAudios) {
        Collections.addAll(this.playAudios, playAudios);
        return this;
    }

	public KookooIVRResponseBuilder collectDtmfLength(Integer dtmfLength) {
        this.dtmfLength = dtmfLength;
        return this;
    }

	public KookooIVRResponseBuilder withHangUp() {
        this.isHangUp = true;
        return this;
    }

    public KookooIVRResponseBuilder withSid(String sid) {
        this.sid = sid;
        return this;
    }

	public String create(IVRMessage ivrMessage) {
        if (StringUtils.isEmpty(language)) withDefaultLanguage();
        Response response = new Response();
        if (StringUtils.isNotBlank(sid)) response.setSid(sid);

        if (isCollectDTMF()) {
            CollectDtmf collectDtmf = KookooCollectDtmfFactory.create();
            if(dtmfLength > 0) collectDtmf.setMaxDigits(dtmfLength);
            for (String playText : playTexts) collectDtmf.addPlayText(ivrMessage.getText(playText));
            for (String playAudio : playAudios) collectDtmf.addPlayAudio(ivrMessage.getWav(playAudio, language));

            response.addCollectDtmf(collectDtmf);
        } else {
            for (String playText : playTexts)
                response.addPlayText(ivrMessage.getText(playText));
            for (String playAudio : playAudios)
                response.addPlayAudio(ivrMessage.getWav(playAudio, language));
            if (StringUtils.isNotEmpty(phoneNumber)){
                Dial dial = new Dial();
                dial.setNumber(phoneNumber);
                response.addDial(dial);
            }
        }

        if (isHangUp) response.addHangup();
        return response.getXML();
    }

	public boolean isHangUp() {
        return isHangUp;
    }

	public boolean isCollectDTMF() {
        return dtmfLength > 0;
    }

    public boolean isNotEmpty() {
        return playAudios.size() != 0 || playTexts.size() != 0;
    }

    public boolean isEmpty() {
        return !isNotEmpty();
    }

	public List<String> getPlayTexts() {
        return playTexts;
    }

	public List<String> getPlayAudios() {
        return playAudios;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public KookooIVRResponseBuilder withPhoneNumber(String phoneNumber) {
        if (StringUtils.isNotEmpty(phoneNumber)) {
            this.phoneNumber = phoneNumber;
        }
        return this;
    }

    public String sid() {
        return sid;
    }
}
