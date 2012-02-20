package org.motechproject.scheduletracking.api.domain;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.annotate.JsonProperty;
import org.ektorp.support.TypeDiscriminator;
import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.motechproject.model.MotechBaseDataObject;
import org.motechproject.model.Time;
import org.motechproject.util.DateUtil;

import java.util.LinkedList;
import java.util.List;

@TypeDiscriminator("doc.type === 'Enrollment'")
public class Enrollment extends MotechBaseDataObject {


    public enum EnrollmentStatus {
        Active, Defaulted, Completed, Unenrolled;

    }
    @JsonProperty
    private DateTime enrollmentDate;
    private String externalId;

    private String scheduleName;

    private String currentMilestoneName;

    private DateTime referenceDate;
    private Time preferredAlertTime;
    private EnrollmentStatus status;
    private List<MilestoneFulfillment> fulfillments = new LinkedList<MilestoneFulfillment>();
    // For ektorp
    private Enrollment() {
    }
    public Enrollment(String externalId, String scheduleName, String currentMilestoneName, DateTime referenceDate, DateTime enrollmentDate, Time preferredAlertTime) {
        this.externalId = externalId;
        this.scheduleName = scheduleName;
        this.currentMilestoneName = currentMilestoneName;
        this.enrollmentDate = enrollmentDate;
        this.referenceDate = referenceDate;
        this.preferredAlertTime = preferredAlertTime;
        this.status = EnrollmentStatus.Active;
    }

    public String getScheduleName() {
        return scheduleName;
    }

    public String getExternalId() {
        return externalId;
    }

    public DateTime getReferenceDate() {
        return referenceDate;
    }

    public DateTime getEnrollmentDate() {
        return enrollmentDate;
    }

    public Time getPreferredAlertTime() {
        return preferredAlertTime;
    }

    public String getCurrentMilestoneName() {
        return currentMilestoneName;
    }

    public List<MilestoneFulfillment> getFulfillments() {
        return fulfillments;
    }

    @JsonIgnore
    public DateTime getLastFulfilledDate() {
        if (fulfillments.isEmpty())
            return null;
        return fulfillments.get(fulfillments.size() - 1).getDateFulfilled();
    } 

    @JsonIgnore
    public boolean isActive() {
        return status.equals(EnrollmentStatus.Active);
    }
   

    @JsonIgnore
    public boolean isCompleted() {
        return status.equals(EnrollmentStatus.Completed);
    }

    @JsonIgnore
    public boolean isDefaulted() {
        return status.equals(EnrollmentStatus.Defaulted);
    }

    public void setCurrentMilestoneName(String currentMilestoneName) {
        this.currentMilestoneName = currentMilestoneName;
    }

    public EnrollmentStatus getStatus() {
    	return status;
    }
    
    public void setStatus(EnrollmentStatus status) {
        this.status = status;
    }

    // ektorp methods follow
    private String getType() {
        return type;
    }

    private void setScheduleName(String scheduleName) {
        this.scheduleName = scheduleName;
    }

    private void setType(String type) {
        this.type = type;
    }

    private void setExternalId(String externalId) {
        this.externalId = externalId;
    }

    private void setReferenceDate(DateTime referenceDate) {
        this.referenceDate = referenceDate;
    }

    public void setPreferredAlertTime(Time preferredAlertTime) {
        this.preferredAlertTime = preferredAlertTime;
    }
}