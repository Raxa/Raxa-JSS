package org.motechproject.server.messagecampaign.domain.message;

import org.joda.time.LocalDate;

public class AbsoluteCampaignMessage extends CampaignMessage {

    private LocalDate date;

    public LocalDate date() {
        return this.date;
    }

    public void date(LocalDate date) {
        this.date = date;
    }
}
