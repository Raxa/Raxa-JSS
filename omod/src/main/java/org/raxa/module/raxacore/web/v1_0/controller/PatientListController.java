package org.raxa.module.raxacore.web.v1_0.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.openmrs.module.webservices.rest.SimpleObject;
import org.openmrs.module.webservices.rest.web.RequestContext;
import org.openmrs.module.webservices.rest.web.RestConstants;
import org.openmrs.module.webservices.rest.web.RestUtil;
import org.openmrs.module.webservices.rest.web.annotation.WSDoc;
import org.openmrs.module.webservices.rest.web.response.ResponseException;
import org.openmrs.module.webservices.rest.web.v1_0.controller.BaseCrudController;
import org.raxa.module.raxacore.web.v1_0.resource.PatientListResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Controller for REST web service access to the PatientList resource. Supports
 * CRUD on the resource itself, and listing and addition of some subresources.
 */
@Controller
@RequestMapping(value = "/rest/" + RestConstants.VERSION_1 + "/patientlist")
public class PatientListController extends BaseCrudController<PatientListResource> {
	
	@RequestMapping(method = RequestMethod.GET, params = "patient")
	@WSDoc("Fetch all non-retired encounters for a patient with the given uuid")
	@ResponseBody
	public SimpleObject saveSearchQuery(@RequestParam("") String patientUniqueId, HttpServletRequest request,
	        HttpServletResponse response) throws ResponseException {
		PatientListResource plr = getResource();
		RequestContext context = RestUtil.getRequestContext(request);
		return new SimpleObject();
	}
}
