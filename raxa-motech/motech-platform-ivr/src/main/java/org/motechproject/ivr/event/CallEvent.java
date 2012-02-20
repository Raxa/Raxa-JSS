package org.motechproject.ivr.event;

import org.joda.time.DateTime;
import org.motechproject.util.DateUtil;

public class CallEvent {
    private String name;
    private DateTime timeStamp;
    private CallEventCustomData callEventCustomData = new CallEventCustomData();

    private CallEvent(){
    }

    public CallEvent(String name) {
        this(name, DateUtil.now());
    }

    private CallEvent(String name, DateTime timeStamp) {
        this.name = name;
        this.timeStamp = timeStamp;
    }

    public static CallEvent newDialEvent() {
        return new CallEvent("Dial", DateUtil.now());
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public DateTime getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(DateTime timeStamp) {
        this.timeStamp = timeStamp;
    }

    public CallEventCustomData getData() {
        return callEventCustomData;
    }

    public void setData(CallEventCustomData callEventCustomData) {
        this.callEventCustomData = callEventCustomData;
    }

    public void appendData(String key, String value) {
        callEventCustomData.add(key, value);
    }
}
