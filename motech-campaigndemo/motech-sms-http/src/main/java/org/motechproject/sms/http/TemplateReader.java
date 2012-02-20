package org.motechproject.sms.http;


import com.google.gson.reflect.TypeToken;
import org.motechproject.dao.MotechJsonReader;
import org.springframework.stereotype.Component;

@Component
public class TemplateReader {

    public SmsSendTemplate getTemplate(String filename) {
        return (SmsSendTemplate) new MotechJsonReader().readFromFile(filename, new TypeToken<SmsSendTemplate>() {
        }.getType());
    }
}
