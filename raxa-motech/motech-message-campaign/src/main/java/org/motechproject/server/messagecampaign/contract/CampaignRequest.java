package org.motechproject.server.messagecampaign.contract;

import org.joda.time.LocalDate;
import org.motechproject.model.Time;

public class CampaignRequest {
    private String externalId;
    private String campaignName;
    private Time reminderTime;
    private LocalDate referenceDate;
    private Integer startOffset;

    public CampaignRequest() {
    }

    public CampaignRequest(String externalId, String campaignName, Time reminderTime, LocalDate referenceDate) {
        this(externalId, campaignName, reminderTime, referenceDate, null);
    }

    public CampaignRequest(String externalId, String campaignName, Time reminderTime, LocalDate referenceDate, Integer startOffset) {
        this.externalId = externalId;
        this.campaignName = campaignName;
        this.reminderTime = reminderTime;
        this.referenceDate = referenceDate;
        this.startOffset = startOffset;
    }

    public void setCampaignName(String campaignName) {
        this.campaignName = campaignName;
    }

    public void setExternalId(String externalId) {
        this.externalId = externalId;
    }

    public String campaignName() {
        return this.campaignName;
    }

    public String externalId() {
        return this.externalId;
    }

    public void setReminderTime(Time reminderTime) {
        this.reminderTime = reminderTime;
    }

    public Time reminderTime() {
        return this.reminderTime;
    }

    public LocalDate referenceDate() {
        return referenceDate;
    }

    public void setReferenceDate(LocalDate referenceDate) {
        this.referenceDate = referenceDate;
    }

    public Integer startOffset() {
        return startOffset;
    }

    public void setStartOffset(Integer startOffset) {
        this.startOffset =startOffset;
    }

    @Override
    public String toString() {
        return "CampaignRequest{" +
                "externalId='" + externalId + '\'' +
                ", campaignName='" + campaignName + '\'' +
                ", reminderTime=" + reminderTime +
                ", referenceDate=" + referenceDate +
                ", startOffset=" + startOffset +
                '}';
    }
}
