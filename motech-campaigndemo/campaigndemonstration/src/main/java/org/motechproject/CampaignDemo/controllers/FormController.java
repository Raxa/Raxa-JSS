package org.motechproject.CampaignDemo.controllers;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

/**
 * Spring controller for displaying the initial demo form page
 * @author Russell Gillen
 */

public class FormController extends MultiActionController {

	
	public ModelAndView cronCampaign(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("cronFormPage");
	}
	
	public ModelAndView offsetCampaign(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("formPage");
	}
	
	public ModelAndView openMRSPatients(HttpServletRequest request, HttpServletResponse response) {
		return new ModelAndView("patientPage");
	}
}
