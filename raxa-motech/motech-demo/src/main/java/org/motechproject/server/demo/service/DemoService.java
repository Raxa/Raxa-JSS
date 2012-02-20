package org.motechproject.server.demo.service;

import java.util.Date;

/**
 * Interface to authentication service
 * @author Ricky
 */
public interface DemoService
{
	
	/**
	 * @param phoneNumber
	 * @return
	 */
	public void schedulePhoneCall(String phoneNumber, Date callTime);

}
