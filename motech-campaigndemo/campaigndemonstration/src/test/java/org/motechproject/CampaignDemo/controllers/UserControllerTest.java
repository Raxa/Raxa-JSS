package org.motechproject.CampaignDemo.controllers;

import static org.mockito.Mockito.verify;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;
import org.motechproject.CampaignDemo.dao.PatientDAO;
import org.motechproject.CampaignDemo.model.Patient;
import org.motechproject.server.messagecampaign.service.MessageCampaignService;
import org.springframework.web.servlet.ModelAndView;

@RunWith(MockitoJUnitRunner.class)
public class UserControllerTest
{
    private UserController userController;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;
    
    @Mock
    private PatientDAO patientDAO;

    @Before
    public void initMocks() {
    	userController = new UserController(patientDAO);
     }
    
    @Test
    public void testAddUser () {

    	String requestId = "12345";
    	String phoneNum = "207";
    	
    	Mockito.when(request.getParameter("externalId")).thenReturn(requestId);
    	Mockito.when(request.getParameter("phoneNum")).thenReturn(phoneNum);
    	
    	ModelAndView modelAndView = userController.addCronUser(request, response);
    	
    	Assert.assertEquals("cronFormPage", modelAndView.getViewName());
    	verify(patientDAO).findByExternalid(Matchers.anyString());
    	verify(patientDAO, Mockito.atMost(1)).add(Matchers.any(Patient.class));
    	verify(patientDAO, Mockito.atMost(1)).update(Matchers.any(Patient.class));

    }
    
    @Test
    public void testRemoveUser() {

    	String requestId = "12345";
    	
    	Mockito.when(request.getParameter("externalId")).thenReturn(requestId);

    	
    	ModelAndView modelAndView = userController.removeCronUser(request, response);
    	
    	Assert.assertEquals("cronFormPage", modelAndView.getViewName());
    	verify(patientDAO).removePatient(Matchers.anyString());
    	verify(patientDAO, Mockito.atLeast(1)).removePatient(Matchers.any(String.class));
    	verify(patientDAO, Mockito.atMost(1)).removePatient(Matchers.any(String.class));

    }
    
    
    
}