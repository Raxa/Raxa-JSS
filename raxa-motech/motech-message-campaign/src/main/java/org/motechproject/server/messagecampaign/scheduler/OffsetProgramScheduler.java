package org.motechproject.server.messagecampaign.scheduler;

import java.util.Date;

import org.joda.time.LocalDate;
import org.joda.time.LocalTime;
import org.joda.time.Minutes;
import org.joda.time.ReadablePeriod;
import org.motechproject.model.Time;
import org.motechproject.scheduler.MotechSchedulerService;
import org.motechproject.server.messagecampaign.contract.CampaignRequest;
import org.motechproject.server.messagecampaign.domain.campaign.OffsetCampaign;
import org.motechproject.server.messagecampaign.domain.message.OffsetCampaignMessage;
import org.motechproject.valueobjects.WallTime;
import org.motechproject.valueobjects.factory.WallTimeFactory;

public class OffsetProgramScheduler extends MessageCampaignScheduler<OffsetCampaignMessage, OffsetCampaign> {

    public OffsetProgramScheduler(MotechSchedulerService schedulerService, CampaignRequest enrollRequest, OffsetCampaign campaign) {
        super(schedulerService, enrollRequest, campaign);
    }

    @Override
    protected void scheduleJobFor(OffsetCampaignMessage offsetCampaignMessage) {
    	
    	//Time reminderTime = campaignRequest.reminderTime();    
        LocalDate jobDate = jobDate(referenceDate(), offsetCampaignMessage.timeOffset());
        Time theTime = new Time();
        LocalTime localTime = null;
        if (campaignRequest.startOffset() == null) { //No offset specified, proceed as if offset is 0
        	localTime = jobTime(offsetCampaignMessage.timeOffset(), 1);
        } else {
        	localTime = jobTime(offsetCampaignMessage.timeOffset(), campaignRequest.startOffset());
        }
        if (localTime == null) {
        	return;
        }
        theTime.setHour(localTime.getHourOfDay());
        theTime.setMinute(localTime.getMinuteOfHour());
        scheduleJobOn(theTime, jobDate, jobParams(offsetCampaignMessage.messageKey()));
    }

    private LocalDate jobDate(LocalDate referenceDate, String timeOffset) {
        WallTime wallTime = WallTimeFactory.create(timeOffset);
        int offSetMinutes = wallTime.inMinutes();
        LocalTime time = new LocalTime();
        LocalTime newTime = time.plusMinutes(offSetMinutes);
        
        LocalDate tempDate = referenceDate.plus(Minutes.minutes(offSetMinutes));
        
        return referenceDate.plus(Minutes.minutes(offSetMinutes));
        
    }
    
    private LocalTime jobTime(String timeOffset, int minutes) {
        WallTime wallTime = WallTimeFactory.create(timeOffset);
        int offSetMinutes = wallTime.inMinutes();
        if (offSetMinutes - minutes < 0) {
        	return null;
        } else if (offSetMinutes - minutes == 0){ //explicitly set so that start date is not in the past
        	LocalTime time = new LocalTime().plusMinutes(1);
        	return time;
        } else {
    	   LocalTime time = new LocalTime();
           LocalTime newTime = time.plusMinutes(offSetMinutes - minutes);
           return newTime;
        }
		
    }
}
