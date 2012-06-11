package org.raxa.module.raxacore.web.v1_0.controller;

import org.openmrs.module.webservices.rest.web.RestConstants;
import org.openmrs.module.webservices.rest.web.v1_0.controller.BaseCrudController;
import org.raxa.module.raxacore.web.v1_0.resource.PatientListResource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Controller for REST web service access to the PatientList resource. Supports
 * CRUD on the resource itself, and listing and addition of some subresources.
 */
@Controller
@RequestMapping(value = "/rest/raxacore/patientlist")
public class PatientListController extends BaseCrudController<PatientListResource> {

	/*@RequestMapping(method = RequestMethod.GET, params="encounterType")
	@WSDoc("Saves the parameters as searchQuery for the patient list")
	@ResponseBody
	public SimpleObject saveSearchQuery(@RequestParam("") String searchQuery, HttpServletRequest request,
	        HttpServletResponse response) throws ResponseException {
		PatientListResource plr = getResource();
	            plr.setProperty(getResource().newDelegate(), "searchQuery", searchQuery);
		RequestContext context = RestUtil.getRequestContext(request);
		return new SimpleObject();
	}*/
}
