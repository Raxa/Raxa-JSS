package org.motechproject.server.messagecampaign.builder;

import org.joda.time.LocalDate;
import org.motechproject.model.Time;
import org.motechproject.server.messagecampaign.contract.CampaignRequest;

public class EnrollRequestBuilder {

    private String campaignName;
    private Time reminderTime;
    private String externalId;
    private LocalDate referenceDate;
    private Integer startOffset;

    public EnrollRequestBuilder withDefaults() {
        campaignName = "testCampaign";
        reminderTime = new Time(9, 30);
        externalId = "12345";
        return this;
    }

    public EnrollRequestBuilder withReferenceDate(LocalDate date) {
        this.referenceDate = date;
        return this;
    }
    public EnrollRequestBuilder withStartOffset(int offset) {
        this.startOffset = offset;
        return this;
    }

    public EnrollRequestBuilder withReminderTime(Time reminderTime) {
        this.reminderTime = reminderTime;
        return this;
    }

    public CampaignRequest build() {
        CampaignRequest request = new CampaignRequest();
        request.setCampaignName(this.campaignName);
        request.setExternalId(this.externalId);
        request.setReminderTime(this.reminderTime);
        request.setReferenceDate(this.referenceDate);
        request.setStartOffset(this.startOffset);
        return request;
    }
}
