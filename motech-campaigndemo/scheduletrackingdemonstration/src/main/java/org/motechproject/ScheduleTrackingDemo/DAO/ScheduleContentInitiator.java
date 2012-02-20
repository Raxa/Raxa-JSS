package org.motechproject.ScheduleTrackingDemo.DAO;

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

public class ScheduleContentInitiator {

	/**
	 * Defined in the motech-cmslite-api module, available from applicationCmsLiteApi.xml import
	 */
	@Autowired
	private CMSLiteService cmsliteService;
	
	@Autowired
	@Qualifier(value = "scheduleMessages")
	private Properties properties;
	
	public void bootstrap() throws CMSLiteException {     
        for (int i = 1; i <= 4; i++) {
            InputStream demoMessageStream = this.getClass().getResourceAsStream("/duedemoconcept" + i + ".wav");
            StreamContent demoFile = new StreamContent("en", "DemoConceptQuestion" + i + "Due", "IVR", demoMessageStream, "checksum" + i, "audio/wav");
            InputStream demoMessageStream2 = this.getClass().getResourceAsStream("/latedemoconcept" + i + ".wav");
            StreamContent demoFile2 = new StreamContent("en", "DemoConceptQuestion" + i + "Late", "IVR", demoMessageStream2, "checksum" + i, "audio/wav");
            
            try {
            	cmsliteService.addContent(demoFile);
            	cmsliteService.addContent(demoFile2);
            } catch (CMSLiteException e) {
            	
            }
            cmsliteService.addContent(new StringContent("en", "DemoConceptQuestion" + i + "due", "IVR", "english/due" + i + ".xml"));
            cmsliteService.addContent(new StringContent("en", "DemoConceptQuestion" + i + "due", "SMS", getDemoDueMessage(i)));
            cmsliteService.addContent(new StringContent("en", "DemoConceptQuestion" + i + "late", "IVR", "english/late" + i + ".xml"));
            cmsliteService.addContent(new StringContent("en", "DemoConceptQuestion" + i + "late", "SMS", getDemoLateMessage(i)));
        
        }
		
        InputStream inputStreamToResource1 = this.getClass().getResourceAsStream("/defaulteddemoschedule.wav");
        StreamContent cron = new StreamContent("en", "defaultedDemoSchedule", "IVR", inputStreamToResource1, "checksum1", "audio/wav");
        cmsliteService.addContent(cron);
        cmsliteService.addContent(new StringContent("en", "defaulted-demo-message", "IVR", "english/defaulted.xml"));
        cmsliteService.addContent(new StringContent("en", "defaulted-demo-message", "SMS", "You have defaulted on your Demo Concept Schedule. Please visit your doctor for more information."));
        
	}

	private String getDemoDueMessage(int messageNumber) {
	        return this.properties.getProperty("DemoConceptQuestion" + messageNumber + "Due");
	}
	
	private String getDemoLateMessage(int messageNumber) {
		return this.properties.getProperty("DemoConceptQuestion" + messageNumber + "Late");
	}
	
}
