package org.motechproject.server.messagecampaign.scheduler;

import org.apache.log4j.Logger;
import org.motechproject.gateway.OutboundEventGateway;
import org.motechproject.model.MotechEvent;
import org.motechproject.server.event.annotations.MotechListener;
import org.motechproject.server.messagecampaign.EventKeys;
import org.motechproject.server.messagecampaign.dao.AllMessageCampaigns;
import org.motechproject.server.messagecampaign.domain.message.CampaignMessage;
import org.motechproject.server.messagecampaign.domain.message.RepeatingCampaignMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.Map;

import static org.apache.commons.lang.StringUtils.replace;
import static org.motechproject.server.messagecampaign.EventKeys.MESSAGE_KEY;

@Component
public class RepeatingProgramScheduleHandler {

    private OutboundEventGateway outboundEventGateway;
    private static final Logger log = Logger.getLogger(RepeatingProgramScheduleHandler.class);
    private AllMessageCampaigns allMessageCampaigns;

    public static final String OFFSET = "{Offset}";
    public static final String WEEK_DAY = "{WeekDay}";

    @Autowired
    public RepeatingProgramScheduleHandler(OutboundEventGateway outboundEventGateway, AllMessageCampaigns allMessageCampaigns) {
        this.outboundEventGateway = outboundEventGateway;
        this.allMessageCampaigns = allMessageCampaigns;
    }

    @MotechListener(subjects = {RepeatingProgramScheduler.INTERNAL_REPEATING_MESSAGE_CAMPAIGN_SUBJECT})
    public void handleEvent(MotechEvent event) {
        log.info("handled internal repeating campaign event and forwarding: " + event.getParameters().hashCode());

        Map<String, Object> params = event.getParameters();
        RepeatingCampaignMessage repeatingCampaignMessage = (RepeatingCampaignMessage) getCampaignMessage(event);
        Integer startIntervalOffset = (Integer) params.get(EventKeys.REPEATING_START_OFFSET);
        Date startDate = (Date) params.get(EventKeys.START_DATE);

        Integer offset = repeatingCampaignMessage.offset(startDate, startIntervalOffset);

        replaceMessageKeyParams(params, OFFSET, offset.toString());
        String nextApplicableDay = repeatingCampaignMessage.applicableWeekDayInNext24Hours();
        if (nextApplicableDay != null) {
            replaceMessageKeyParams(params, WEEK_DAY, nextApplicableDay);
            outboundEventGateway.sendEventMessage(event.copy(EventKeys.MESSAGE_CAMPAIGN_SEND_EVENT_SUBJECT, event.getParameters()));
        }
    }

    private void replaceMessageKeyParams(Map<String, Object> parameters, String parameterName, String value) {
        parameters.put(MESSAGE_KEY, replace(parameters.get(MESSAGE_KEY).toString(), parameterName, value));
    }

    private CampaignMessage getCampaignMessage(MotechEvent motechEvent) {
        String campaignName = (String) motechEvent.getParameters().get(EventKeys.CAMPAIGN_NAME_KEY);
        String messageKey = (String) motechEvent.getParameters().get(EventKeys.MESSAGE_KEY);
        return allMessageCampaigns.get(campaignName, messageKey);
    }
}
