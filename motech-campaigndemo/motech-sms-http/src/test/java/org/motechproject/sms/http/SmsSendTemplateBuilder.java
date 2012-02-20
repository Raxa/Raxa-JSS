package org.motechproject.sms.http;

import javax.xml.ws.Response;
import java.util.Map;

public class SmsSendTemplateBuilder {

    private SmsSendTemplate smsSendTemplate = new SmsSendTemplate();

    public static class RequestBuilder {

        private SmsSendTemplate.Request request = new SmsSendTemplate.Request();

        public static RequestBuilder create() {
            return new RequestBuilder();
        }

        public RequestBuilder withUrlPath(String urlPath) {
            request.urlPath = urlPath;
            return this;
        }

        public RequestBuilder withQueryParameters(Map<String, String> queryParameters) {
            request.queryParameters = queryParameters;
            return this;
        }

        public SmsSendTemplate.Request build() {
            return request;
        }
    }

    public static class ResponseBuilder {

        private SmsSendTemplate.Response response = new SmsSendTemplate.Response();

        public ResponseBuilder withSuccess(String success) {
            response.success = success;
            return this;
        }

        public static ResponseBuilder create() {
            return new ResponseBuilder();
        }

        public SmsSendTemplate.Response build() {
            return response;
        }
    }

    public SmsSendTemplateBuilder withRequest(SmsSendTemplate.Request request) {
        smsSendTemplate.request = request;
        return this;
    }

    public SmsSendTemplateBuilder withResponse(SmsSendTemplate.Response response) {
        smsSendTemplate.response = response;
        return this;
    }

    public static SmsSendTemplateBuilder create() {
        return new SmsSendTemplateBuilder();
    }

    public SmsSendTemplate build() {
        return smsSendTemplate;
    }
}
