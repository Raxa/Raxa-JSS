package org.motechproject.server.messagecampaign.domain.campaign;

public enum CampaignType {

    ABSOLUTE {
        @Override
        public Campaign instance() {
            return new AbsoluteCampaign();
        }
    }, OFFSET {
        @Override
        public Campaign instance() {
            return new OffsetCampaign();
        }
    }, REPEATING {
        @Override
        public Campaign instance() {
            return new RepeatingCampaign();
        }
    }, CRON {
        @Override
        public Campaign instance() {
            return new CronBasedCampaign();
        }
    };

    public abstract Campaign instance();

}
