package org.motechproject.openmrs;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.motechproject.mrs.services.MRSFacilityAdapter;
import org.motechproject.mrs.services.MRSPatientAdapter;
import org.motechproject.mrs.services.MRSUserAdapter;
import org.motechproject.openmrs.security.OpenMRSSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TransactionConfiguration;

import java.util.ResourceBundle;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:testApplicationOpenmrsAPI.xml"})
@TransactionConfiguration(defaultRollback=true, transactionManager = "transactionManager")
public class OpenMRSIntegrationTestBase {
    @Autowired
    OpenMRSSession openMRSSession;

    @Autowired
    protected MRSUserAdapter userAdapter;

    @Autowired
    protected MRSPatientAdapter patientAdapter;

    @Autowired
    protected MRSFacilityAdapter facilityAdapter;

    boolean doOnce = false;

    @Before
    public final void setUpBefore() {
        setUp();
        if (!doOnce) {
            doOnceBefore();
            doOnce = true;
        }
    }

    public void doOnceBefore() {}

    public void setUp() {
        ResourceBundle resourceBundle = ResourceBundle.getBundle("openmrs");
        OpenMRSTestAuthenticationProvider.login(resourceBundle.getString("openmrs.admin.username"), resourceBundle.getString("openmrs.admin.password"));
        openMRSSession.open();
        openMRSSession.authenticate();
    }

    public void tearDown() {
        openMRSSession.close();
    }
}
