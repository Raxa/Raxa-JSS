package org.motechproject.openmrs.services;

import org.junit.Test;
import org.motechproject.mrs.model.MRSFacility;
import org.motechproject.mrs.services.MRSFacilityAdapter;
import org.motechproject.openmrs.OpenMRSIntegrationTestBase;
import org.openmrs.api.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

import static ch.lambdaj.Lambda.*;
import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertNotNull;
import static org.hamcrest.Matchers.equalTo;

public class OpenMRSFacilityAdapterIT extends OpenMRSIntegrationTestBase {
    @Autowired
    MRSFacilityAdapter mrsFacilityAdapter;

    @Autowired
    LocationService mrsLocationService;

    @Test
    @Transactional(readOnly = true)
    public void testSaveLocation() {
        MRSFacility facility = new MRSFacility("my facility", "ghana", "region", "district", "kaseena");
        final MRSFacility savedFacility = mrsFacilityAdapter.saveFacility(facility);
        assertNotNull(savedFacility);
        assertEquals(facility.getCountry(), savedFacility.getCountry());
        assertEquals(facility.getCountyDistrict(), savedFacility.getCountyDistrict());
        assertEquals(facility.getRegion(), savedFacility.getRegion());
        assertEquals(facility.getStateProvince(), savedFacility.getStateProvince());
        assertEquals(facility.getName(), savedFacility.getName());
    }

    @Test
    @Transactional(readOnly = true)
    public void testGetLocations() {
        int size = mrsFacilityAdapter.getFacilities().size();
        String facilityName = "my facility";
        MRSFacility facility = new MRSFacility(facilityName, "ghana", "region", "district", "kaseena");
        final MRSFacility savedFacility = mrsFacilityAdapter.saveFacility(facility);
        List<MRSFacility> facilities = mrsFacilityAdapter.getFacilities();
        int alteredSize = facilities.size();
        List<MRSFacility> addedFacilities = select(facilities, having(on(MRSFacility.class).getName(), equalTo(facilityName)));
        assertEquals(size + 1, alteredSize);
        assertEquals(Arrays.asList(savedFacility), addedFacilities);

    }

    @Test
    @Transactional(readOnly = true)
    public void testGetLocationsByName() {
        String facilityName = "my facility";
        MRSFacility facility = new MRSFacility(facilityName, "ghana", "region", "district", "kaseena");
        final MRSFacility savedFacility = mrsFacilityAdapter.saveFacility(facility);
        final List<MRSFacility> facilities = mrsFacilityAdapter.getFacilities(facilityName);
        assertEquals(Arrays.asList(savedFacility), facilities);
    }
}
