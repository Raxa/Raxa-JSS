package org.motechproject.server.voxeo.domain;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * Created by IntelliJ IDEA.
 * User: rob
 * Date: 8/31/11
 * Time: 3:18 PM
 * To change this template use File | Settings | File Templates.
 */
public class PhoneCallEvent
{
    public enum Status {
	    ALERTING, CONNECTED, DIALOG_STARTED, DIALOG_EXIT, DISCONNECTED, PROGRESSING, FAILED, UNKNOWN;
    }

    public enum Reason {
        BAD_NUMBER("badnumber"), BUSY("busy"), REJECTED("rejected"), TIMEOUT("timeout"), UNKNOWN("unknown"), UNREACHABLE("unreachable"), UNAUTHORIZED("unauthorized");

        private String text;

        Reason(String text) {
            this.text = text;
        }

        public String getText() {
            return this.text;
        }

        public static Reason fromString(String text) {
            if (text != null) {
                for (Reason b : Reason.values()) {
                    if (text.equalsIgnoreCase(b.text)) {
                      return b;
                    }
                }
            }
            return null;
        }
    }

    @JsonProperty
    private Status status;
    @JsonProperty
    private Reason reason;
    @JsonProperty
    private String callerId;
    @JsonProperty
    private Long timestamp;

    public Status getStatus()
    {
        return status;
    }

    public void setStatus(Status status)
    {
        this.status = status;
    }

    public Reason getReason()
    {
        return reason;
    }

    public void setReason(Reason reason)
    {
        this.reason = reason;
    }

    public String getCallerId()
    {
        return callerId;
    }

    public void setCallerId(String callerId)
    {
        this.callerId = callerId;
    }

    public Long getTimestamp()
    {
        return timestamp;
    }

    public void setTimestamp(Long timestamp)
    {
        this.timestamp = timestamp;
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o)
        {
            return true;
        }
        if (o == null || getClass() != o.getClass())
        {
            return false;
        }

        PhoneCallEvent phoneCallEvent = (PhoneCallEvent) o;

        if (callerId != null ? !callerId.equals(phoneCallEvent.callerId) : phoneCallEvent.callerId != null)
        {
            return false;
        }
        if (reason != null ? !reason.equals(phoneCallEvent.reason) : phoneCallEvent.reason != null)
        {
            return false;
        }
        if (status != null ? !status.equals(phoneCallEvent.status) : phoneCallEvent.status != null)
        {
            return false;
        }
        if (timestamp != null ? !timestamp.equals(phoneCallEvent.timestamp) : phoneCallEvent.timestamp != null)
        {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode()
    {
        int result = status != null ? status.hashCode() : 0;
        result = 31 * result + (reason != null ? reason.hashCode() : 0);
        result = 31 * result + (callerId != null ? callerId.hashCode() : 0);
        result = 31 * result + (timestamp != null ? timestamp.hashCode() : 0);
        return result;
    }
}