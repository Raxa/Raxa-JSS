package org.openmrs.module.webservices.forms.web.resource;

import java.util.Collection;
import java.util.List;
import java.util.Set;

import org.openmrs.EncounterType;
import org.openmrs.Field;
import org.openmrs.Form;
import org.openmrs.FormField;
import org.openmrs.annotation.Handler;
import org.openmrs.api.context.Context;
import org.openmrs.api.FormService;
import org.openmrs.module.webservices.rest.web.RestUtil;
import org.openmrs.module.webservices.rest.web.annotation.PropertyGetter;
import org.openmrs.module.webservices.rest.web.annotation.PropertySetter;
import org.openmrs.module.webservices.rest.web.RequestContext;
import org.openmrs.module.webservices.rest.web.RestConstants;
import org.openmrs.module.webservices.rest.web.annotation.Resource;
import org.openmrs.module.webservices.rest.web.representation.DefaultRepresentation;
import org.openmrs.module.webservices.rest.web.representation.FullRepresentation;
import org.openmrs.module.webservices.rest.web.representation.Representation;
import org.openmrs.module.webservices.rest.web.resource.impl.NeedsPaging;
import org.openmrs.module.webservices.rest.web.resource.impl.DelegatingCrudResource;
import org.openmrs.module.webservices.rest.web.resource.impl.DelegatingResourceDescription;
import org.openmrs.module.webservices.rest.web.resource.impl.MetadataDelegatingCrudResource;
import org.openmrs.module.webservices.rest.web.resource.impl.ServiceSearcher;
import org.openmrs.module.webservices.rest.web.response.ResponseException;

@Resource("form")
@Handler(supports = Form.class, order = 0)
public class FormResource extends MetadataDelegatingCrudResource<Form> {

	/**
	 * @see DelegatingCrudResource#getRepresentationDescription(Representation)
	 */
	@Override
	public DelegatingResourceDescription getRepresentationDescription(
			Representation rep) {
		if (rep instanceof DefaultRepresentation) {
			DelegatingResourceDescription description = new DelegatingResourceDescription();
			description.addProperty("name");
			description.addProperty("uuid");
			description.addProperty("version");
			description.addProperty("build");
			description.addProperty("published");
			description.addProperty("description");
			description.addProperty("encounterType", Representation.REF);
			description.addProperty("formFields", Representation.REF);
			description.addProperty("template");
			description.addProperty("xslt");
			description.addProperty("retired");
			description.addSelfLink();
			description.addLink("full", ".?v="
					+ RestConstants.REPRESENTATION_FULL);
			return description;
		} else if (rep instanceof FullRepresentation) {
			DelegatingResourceDescription description = new DelegatingResourceDescription();
			description.addProperty("uuid");
			description.addProperty("name");
			description.addProperty("version");
			description.addProperty("build");
			description.addProperty("published");
			description.addProperty("description");
			description.addProperty("encounterType", Representation.FULL);
			description.addProperty("formFields", Representation.DEFAULT);
			description.addProperty("template");
			description.addProperty("xslt");
			description.addProperty("retired");
			description.addProperty("auditInfo", findMethod("getAuditInfo"));
			description.addSelfLink();
			return description;
		}
		return null;
	}

	/**
	 * @see DelegatingCrudResource#newDelegate()
	 */
	@Override
	public Form newDelegate() {
		return new Form();
	}

	/**
	 * @see DelegatingCrudResource#save(java.lang.Object)
	 */
	@Override
	public Form save(Form form) {
		return Context.getFormService().saveForm(form);
	}

	/**
	 * Fetches a form by uuid, if no match is found, it tries to look up one with a matching
	 * name with the assumption that the passed parameter is a form name
	 * 
	 * @see DelegatingCrudResource#getByUniqueId(java.lang.String)
	 */
	@Override
	public Form getByUniqueId(String uuid) {
		Form form = Context.getFormService().getFormByUuid(uuid);
		//We assume the caller was fetching by name
		if (form == null)
			form = Context.getFormService().getForm(uuid);

		return form;
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingCrudResource#purge(java.lang.Object,
	 *      org.openmrs.module.webservices.rest.web.RequestContext)
	 */
	@Override
	public void purge(Form form, RequestContext context)
			throws ResponseException {
		if (form == null)
			return;
		Context.getFormService().purgeForm(form);
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingCrudResource#doGetAll(org.openmrs.module.webservices.rest.web.RequestContext)
	 */
	@Override
	protected List<Form> doGetAll(RequestContext context) {
		return Context.getFormService().getAllForms(false);
	}

	/**
	 * @see org.openmrs.module.webservices.rest.web.resource.impl.DelegatingCrudResource#doSearch(java.lang.String,
	 *      org.openmrs.module.webservices.rest.web.RequestContext)
	 */
	@Override
	protected NeedsPaging<Form> doSearch(String query, RequestContext context) {
		return new NeedsPaging<Form>(Context.getFormService().getForms(query,
				true), context);
	}

}
