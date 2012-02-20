package org.motechproject.openmrs.omod.listener;

import org.openmrs.module.ModuleActivator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class OmodActivator implements ModuleActivator {

    private static final Logger log = LoggerFactory.getLogger(OmodActivator.class);

    @Override
    public void willRefreshContext() {
        log.info("will refresh module context");
    }

    @Override
    public void contextRefreshed() {
        log.info("module context refreshed");
    }

    @Override
    public void willStart() {
        log.info("will start module");
    }

    @Override
    public void started() {
        log.info("started module");
    }

    @Override
    public void willStop() {
        log.info("will stop module");
    }

    @Override
    public void stopped() {
        log.info("will stop module");
    }
}
