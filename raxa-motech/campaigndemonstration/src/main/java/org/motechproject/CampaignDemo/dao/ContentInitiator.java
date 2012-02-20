package org.motechproject.CampaignDemo.dao;

import java.io.InputStream;
import java.util.Properties;

import org.motechproject.cmslite.api.repository.AllStreamContents;
import org.motechproject.cmslite.api.repository.AllStringContents;
import org.motechproject.cmslite.api.service.CMSLiteService;
import org.motechproject.cmslite.api.model.CMSLiteException;
import org.motechproject.cmslite.api.model.StreamContent;
import org.motechproject.cmslite.api.model.StringContent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

/**
 * Class to initialize CMSlite content in the DB upon server startup
 * Currently, the content is the name of the voice XML file to be run by Voxeo
 * @author Russell Gillen
 *
 */

public class ContentInitiator {

	/**
	 * Defined in the motech-cmslite-api module, available from applicationCmsLiteApi.xml import
	 */
	@Autowired
	private CMSLiteService cmsliteService;
	
	@Autowired
	@Qualifier(value = "pregnancyMessages")
	private Properties properties;
	
	public void bootstrap() throws CMSLiteException {     
        for (int i = 5; i <= 40; i++) {
            InputStream ghanaMessageStream = this.getClass().getResourceAsStream("/week" + i + ".wav");
            StreamContent ghanaFile = new StreamContent("en", "ghanaPregnancyWeek" + i, "IVR", ghanaMessageStream, "checksum" + i, "audio/wav");
            try {
            	cmsliteService.addContent(ghanaFile);
            } catch (CMSLiteException e) {
            	
            }
            cmsliteService.addContent(new StringContent("en", "pregnancy-info-week-" + i, "IVR", "english/week" + i + ".xml"));
            cmsliteService.addContent(new StringContent("en", "pregnancy-info-week-" + i, "SMS", getPregnancyMessage(i)));
        }
		
        InputStream inputStreamToResource1 = this.getClass().getResourceAsStream("/cronmessage.wav");
        StreamContent cron = new StreamContent("en", "test", "IVR", inputStreamToResource1, "checksum1", "audio/wav");
        cmsliteService.addContent(cron);
        cmsliteService.addContent(new StringContent("en", "cron-message", "IVR", "english/cron.xml"));
        cmsliteService.addContent(new StringContent("en", "cron-message", "SMS", "This is an SMS cron message that will repeat every two minutes until you unenroll"));
        
	}

	private String getPregnancyMessage(int messageNumber) {
	        return this.properties.getProperty("messageWeek" + messageNumber);
	}
	
}
