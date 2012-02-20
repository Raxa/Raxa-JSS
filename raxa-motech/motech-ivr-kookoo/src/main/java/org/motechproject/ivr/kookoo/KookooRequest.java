package org.motechproject.ivr.kookoo;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.json.JSONObject;
import org.motechproject.ivr.model.CallDirection;
import org.motechproject.ivr.event.IVREvent;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

public class KookooRequest {
    private static final int LENGTH_OF_PHONE_NUMBER = 10;
    private Logger log = Logger.getLogger(KookooRequest.class);

    private static final String POUND_SYMBOL = "#";
    private String sid;
    private String cid;
    private String event;
    private String data;
    private String status;
    private Map<String, String> dataMap = new HashMap<String, String>();

    public KookooRequest() {
    }

    public KookooRequest(String sid, String cid, String event, String data, String status) {
        this.sid = sid;
        this.cid = cid;
        this.event = event;
        this.data = data;
        this.status = status;
    }

    public String getCid() {
        return StringUtils.isEmpty(cid) ? cid : cid.substring(cid.length() - LENGTH_OF_PHONE_NUMBER);
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    public String getParameter(String key) {
        return dataMap.get(key);
    }

    public void setParameter(String key, String value) {
        dataMap.put(key, value);
    }

    public String getEvent() {
        return event == null ? IVREvent.GotDTMF.toString() : event;
    }

    public void setEvent(String event) {
        this.event = event;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public String getData() {
        return data;
    }

    public String getInput() {
        return data.replace(POUND_SYMBOL, "");
    }

    public void setData(String data) {
        this.data = data;
    }

    public IVREvent callEvent() {
        return Enum.valueOf(IVREvent.class, this.event);
    }

    public CallDirection getCallDirection() {
        return dataMap != null && "true".equals(dataMap.get(KookooCallServiceImpl.IS_OUTBOUND_CALL)) ? CallDirection.Outbound : CallDirection.Inbound;
    }

    public void setDataMap(String jsonDataMap) {
        try {
            JSONObject jsonObject = new JSONObject(jsonDataMap);
            for (Iterator<String> i = jsonObject.keys(); i.hasNext(); ) {
                String key = i.next();
                dataMap.put(key, jsonObject.getString(key));
            }
        } catch (Exception ignore) {
            log.warn("Not able to read json data", ignore);
        }
    }

    public void setDefaults() {
        if (StringUtils.isEmpty(event)) {
            data = "";
            event = IVREvent.GotDTMF.toString();
        }
    }
}
