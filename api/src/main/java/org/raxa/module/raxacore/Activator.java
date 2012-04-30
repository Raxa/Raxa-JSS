package org.raxa.module.raxacore;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.openmrs.module.BaseModuleActivator;
import org.openmrs.module.ModuleActivator;

/**
 * {@link ModuleActivator} for the raxacore module
 */
public class Activator extends BaseModuleActivator {
	
	private Log log = LogFactory.getLog(this.getClass());
	
	@Override
	public void started() {
		log.info("Started the RaxaEMR Core module");
	}
	
	@Override
	public void stopped() {
		log.info("Stopped the RaxaEMR Core module");
	}
}
