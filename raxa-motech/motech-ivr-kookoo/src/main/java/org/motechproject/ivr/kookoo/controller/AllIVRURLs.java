package org.motechproject.ivr.kookoo.controller;

public class AllIVRURLs {
    public static final String STANDARD_RESPONSE_CONTROLLER = "/ivr/standardresponse";
    public static final String DECISION_TREE_URL = "/ivr/decisiontree";

    public static final String HANGUP_RESPONSE = "hangup";
    public static final String EMPTY_RESPONSE = "empty";

    public static String springTransferUrl(String url, String event) {
        return toForwardURL(url, event);
    }

    private static String toForwardURL(String url, String event) {
        return String.format("forward:/%s/%s", url, event).replaceAll("//", "/");
    }

    public static String springTransferUrlToUnhandledError() {
        return toForwardURL(STANDARD_RESPONSE_CONTROLLER, HANGUP_RESPONSE);
    }

    public static String springTransferUrlToEmptyResponse() {
        return toForwardURL(STANDARD_RESPONSE_CONTROLLER, EMPTY_RESPONSE);
    }
}
