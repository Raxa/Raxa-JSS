package org.motechproject.CampaignDemo.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.motechproject.CampaignDemo.dao.PatientDAO;
import org.motechproject.server.messagecampaign.service.MessageCampaignService;
import org.springframework.web.servlet.ModelAndView;

@RunWith(MockitoJUnitRunner.class)
public class CampaignControllerTest
{
    private CampaignController campaignController;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;
    
    @Mock
    private MessageCampaignService service;
    
    @Mock
    private PatientDAO patientDAO;

    @Before
    public void initMocks() {
    	campaignController = new CampaignController(service, patientDAO);
     }
    
    @Test
    public void testStartCampaign () {

    	String requestId = "12345";
    	
    	Mockito.when(request.getParameter("externalId")).thenReturn(requestId);
    	
    	ModelAndView modelAndView = campaignController.start(request, response);
    	
    	Assert.assertEquals("formPage", modelAndView.getViewName());
    }
    
    @Test
    public void testStopCampaign() {

    	String requestId = "12345";
    	
    	Mockito.when(request.getParameter("externalId")).thenReturn(requestId);
    	
    	ModelAndView modelAndView = campaignController.stop(request, response);
    	
    	Assert.assertEquals("formPage", modelAndView.getViewName());
    }
    
    
    
}