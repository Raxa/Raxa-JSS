package org.motechproject.server.messagecampaign;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EventKeys {
	private final static Logger log = LoggerFactory.getLogger(EventKeys.class);

    public final static String SCHEDULE_JOB_ID_KEY = "JobID";
    public final static String CAMPAIGN_NAME_KEY = "CampaignName";
    public final static String MESSAGE_NAME_KEY = "MessageName";
    public final static String MESSAGE_FORMATS = "MessageFormats";
    public final static String MESSAGE_LANGUAGES = "MessageLanguages";
    public final static String EXTERNAL_ID_KEY = "ExternalID";
    public static final String MESSAGE_KEY = "MessageKey";
    public static final String REPEATING_START_OFFSET = "RepeatingStartOffset";
    public static final String START_DATE = "ReferenceStartDate";

    public final static String BASE_SUBJECT = "org.motechproject.server.messagecampaign.";
    public final static String MESSAGE_CAMPAIGN_SEND_EVENT_SUBJECT = BASE_SUBJECT + "send-campaign-message";
    public final static String MESSAGE_CAMPAIGN_FIRED_EVENT_SUBJECT = BASE_SUBJECT + "fired-campaign-message";

}
