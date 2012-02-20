package org.motechproject.sms.http;

import org.apache.commons.httpclient.HttpMethod;
import org.apache.commons.httpclient.NameValuePair;
import org.apache.commons.httpclient.URIException;
import org.apache.commons.httpclient.methods.GetMethod;
import org.apache.commons.httpclient.util.URIUtil;
import org.apache.commons.lang.StringUtils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

class SmsSendTemplate {

    public static final String MESSAGE_PLACEHOLDER = "$message";
    public static final String RECIPIENTS_PLACEHOLDER = "$recipients";

    static class Request {
        String urlPath;
        String recipientsSeparator;
        Map<String, String> queryParameters;
    }
    static class Response {
        String success;
    }

    Request request;

    Response response;

    public HttpMethod generateRequestFor(List<String> recipients, String message) {
        GetMethod getMethod = new GetMethod(request.urlPath);

        List<NameValuePair> queryStringValues = new ArrayList<NameValuePair>();
        for (String key : request.queryParameters.keySet()) {
            String value = placeHolderOrLiteral(request.queryParameters.get(key), recipients, message);
            queryStringValues.add(new NameValuePair(key, value));
        }
        getMethod.setQueryString(queryStringValues.toArray(new NameValuePair[queryStringValues.size()]));
        return getMethod;
    }

    private String placeHolderOrLiteral(String value, List<String> recipients, String message) {
        if (value.equals(MESSAGE_PLACEHOLDER))
            return message;
        if (value.equals(RECIPIENTS_PLACEHOLDER))
            return StringUtils.join(recipients.iterator(), request.recipientsSeparator);
        return value;
    }

    public Request getRequest() {
        return request;
    }

    public Response getResponse() {
        return response;
    }
}
