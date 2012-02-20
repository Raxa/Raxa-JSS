package org.motechproject.server.alerts.domain;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;
import org.ektorp.support.TypeDiscriminator;
import org.joda.time.DateTime;
import org.motechproject.model.MotechBaseDataObject;
import org.motechproject.util.DateUtil;

import java.util.Map;

@TypeDiscriminator("doc.type == 'Alert'")
public class Alert extends MotechBaseDataObject implements Comparable<Alert> {

    private String id;
    private String externalId;
    private String name;
    private AlertType alertType;
    private DateTime dateTime;
    private int priority;
    private AlertStatus status;
    private String description;
    private Map<String, String> data;


    public Alert() {
    }

    public Alert(String externalId, String name, String description, AlertType alertType, AlertStatus status, int priority, Map<String, String> data) {
        this(externalId, alertType, status, priority, data);
        this.name = name;
        this.description = description;
    }

    public Alert(String externalId, AlertType alertType, AlertStatus status, int priority, Map<String, String> data) {
        this.externalId = externalId;
        this.alertType = alertType;
        this.status = status;
        this.priority = priority;
        this.dateTime = DateUtil.now();
        this.data = data;
    }

    public String getId() {
        return id;
    }

    public String getExternalId() {
        return externalId;
    }

    public String getName() {
        return name;
    }

    public AlertType getAlertType() {
        return alertType;
    }

    public DateTime getDateTime() {
        return DateUtil.setTimeZone(dateTime);
    }

    @JsonIgnore
    public long getDateTimeInMillis() {
        return getDateTime().getMillis();
    }

    public int getPriority() {
        return priority;
    }

    public AlertStatus getStatus() {
        return status;
    }

    public String getDescription() {
        return description;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setExternalId(String externalId) {
        this.externalId = externalId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDateTime(DateTime dateTime) {
        this.dateTime = dateTime;
    }

    public void setPriority(int priority) {
        this.priority = priority;
    }

    public void setStatus(AlertStatus status) {
        this.status = status;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setAlertType(AlertType alertType) {
        this.alertType = alertType;
    }

    @Override
    public int hashCode() {
        return this.getId().hashCode();
    }

    @Override
    public boolean equals(Object that) {
        if (that == null || that.getClass() != this.getClass()) return false;
        return this.getId().equals(((Alert) that).getId());
    }

    @Override
    public int compareTo(Alert o) {
        return new Integer(this.priority).compareTo(new Integer(o.priority));
    }

    public Map<String, String> getData() {
        return data;
    }

    public void setData(Map<String, String> data) {
        this.data = data;
    }
}
