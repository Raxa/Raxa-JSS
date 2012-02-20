package org.motechproject.ivr.kookoo;

import org.motechproject.ivr.model.CallDirection;
import org.motechproject.ivr.event.IVREvent;
import org.motechproject.util.Cookies;

import javax.servlet.http.HttpServletRequest;

public class KooKooIVRContextForTest extends KooKooIVRContext {
    private String userInput;
    private String currentTreePosition;
    private String callId;
    private String treeName;
    private String externalId;
    private boolean sessionInvalidated;
    private IVREvent ivrEvent;
    private String callerId;
    private CallDirection callDirection;
    private String callDetailRecordId;
    private boolean isValidSession = true;

    @Override
    public HttpServletRequest httpRequest() {
        throw new RuntimeException("Please instead put the method in KooKooIVRContext to read/update the data from cookies. This method is only for creating wrappers around this.");
    }

    @Override
    public String userInput() {
        return userInput;
    }

    public KooKooIVRContextForTest userInput(String userInput) {
        this.userInput = userInput;
        return this;
    }

    @Override
    public String currentTreePosition() {
        return currentTreePosition;
    }

    @Override
    public void currentDecisionTreePath(String path) {
        currentTreePosition = path;
    }

    @Override
    public String callId() {
        return callId;
    }

    @Override
    public void callId(String callid) {
        this.callId = callid;
    }

    @Override
    public String preferredLanguage() {
        return "";
    }

    @Override
    public void callDetailRecordId(String callDetailRecordId) {
        this.callDetailRecordId = callDetailRecordId;
    }

    @Override
    public void treeName(String treeName) {
        this.treeName = treeName;
    }

    @Override
    public String treeName() {
        return treeName;
    }

    @Override
    public KookooRequest kooKooRequest() {
        throw new RuntimeException("Please instead put the method in KooKooIVRContext to get the data from KooKooRequest. This method is only for creating wrappers around this.");
    }

    @Override
    public Cookies cookies() {
        throw new RuntimeException("Please instead put the method in KooKooIVRContext to read/update the data from cookies. This method is only for creating wrappers around this.");
    }

    @Override
    public String externalId() {
        return externalId;
    }

    public KooKooIVRContextForTest externalId(String externalId) {
        this.externalId = externalId;
        return this;
    }

    @Override
    public void invalidateSession() {
        sessionInvalidated = true;
    }

    public boolean sessionInvalidated() {
        return sessionInvalidated;
    }

    @Override
    public String ivrEvent() {
        return ivrEvent.toString();
    }

    public KooKooIVRContextForTest ivrEvent(IVREvent ivrEvent) {
        this.ivrEvent = ivrEvent;
        return this;
    }

    @Override
    public String callerId() {
        return callerId;
    }

    public KooKooIVRContextForTest callerId(String callerId) {
        this.callerId = callerId;
        return this;
    }

    @Override
    public CallDirection callDirection() {
        return callDirection;
    }

    public KooKooIVRContextForTest callDirection(CallDirection callDirection) {
        this.callDirection = callDirection;
        return this;
    }

    @Override
    public String callDetailRecordId() {
        return callDetailRecordId;
    }

    @Override
    public void setDefaults() {
    }

    @Override
    public void initialize() {
    }

    @Override
    public String allCookies() {
        return "";
    }

    public KooKooIVRContextForTest isValidSession(boolean isValidSession) {
        this.isValidSession = isValidSession;
        return this;
    }

    @Override
    public boolean isValidSession() {
        return isValidSession;
    }
}
