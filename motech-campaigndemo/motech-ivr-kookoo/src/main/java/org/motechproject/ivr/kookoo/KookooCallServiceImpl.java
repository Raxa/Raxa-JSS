package org.motechproject.ivr.kookoo;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.methods.GetMethod;
import org.json.JSONObject;
import org.motechproject.ivr.service.CallRequest;
import org.motechproject.ivr.service.IVRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.Properties;
import java.util.logging.Logger;

@Service
public class KookooCallServiceImpl implements IVRService {
    public static final String OUTBOUND_URL = "kookoo.outbound.url";
    public static final String API_KEY = "kookoo.api.key";

    public static final String API_KEY_KEY = "api_key";
    public static final String URL_KEY = "url";
    public static final String PHONE_NUMBER_KEY = "phone_no";
    public static final String CUSTOM_DATA_KEY = "dataMap";
    public static final String IS_OUTBOUND_CALL = "is_outbound_call";

    private Properties properties;

    private HttpClient httpClient;
    private Logger log = Logger.getLogger(this.getClass().getName());

    @Autowired
    public KookooCallServiceImpl(@Qualifier("ivrProperties") Properties properties) {
        this(properties, new HttpClient());
    }

    KookooCallServiceImpl(Properties properties, HttpClient httpClient) {
        this.properties = properties;
        this.httpClient = httpClient;
    }

    @Override
    public void initiateCall(CallRequest callRequest) {
        if (callRequest == null) throw new IllegalArgumentException("Missing call request");

        try {
            callRequest.getPayload().put(IS_OUTBOUND_CALL, "true");
            JSONObject json = new JSONObject(callRequest.getPayload());
            String applicationUrl = String.format("%s?%s=%s", callRequest.getCallBackUrl(), CUSTOM_DATA_KEY, json.toString());
            applicationUrl = URLEncoder.encode(applicationUrl, "UTF-8");

            GetMethod getMethod = new GetMethod(properties.get(OUTBOUND_URL).toString());
            getMethod.setQueryString(new NameValuePair[]{
                    new NameValuePair(API_KEY_KEY, properties.get(API_KEY).toString()),
                    new NameValuePair(URL_KEY, applicationUrl),
                    new NameValuePair(PHONE_NUMBER_KEY, callRequest.getPhone())
            });
            log.info(String.format("Dialing %s", getMethod.getURI()));
            httpClient.executeMethod(getMethod);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
