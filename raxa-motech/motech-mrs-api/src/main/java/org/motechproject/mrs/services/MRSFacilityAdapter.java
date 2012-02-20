package org.motechproject.mrs.services;

import org.motechproject.mrs.model.MRSFacility;

import java.util.List;

public interface MRSFacilityAdapter {
    MRSFacility saveFacility(MRSFacility facility);

    List<MRSFacility> getFacilities();

    List<MRSFacility> getFacilities(String locationName);

    MRSFacility getFacility(String facilityId);
}
