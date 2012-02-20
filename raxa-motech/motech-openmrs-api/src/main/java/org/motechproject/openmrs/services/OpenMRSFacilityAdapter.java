package org.motechproject.openmrs.services;

import org.apache.commons.lang.StringUtils;
import org.motechproject.mrs.model.MRSFacility;
import org.motechproject.mrs.services.MRSFacilityAdapter;
import org.openmrs.Location;
import org.openmrs.api.LocationService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class OpenMRSFacilityAdapter implements MRSFacilityAdapter {
    @Autowired
    private LocationService locationService;

    @Override
    public MRSFacility saveFacility(MRSFacility facility) {
        String facilityId = facility.getId();
        Location location = new Location();
        if(facilityId != null) {
            location = locationService.getLocation(Integer.parseInt(facilityId));
        }

        location.setName(facility.getName());
        location.setCountry(facility.getCountry());
        location.setAddress6(facility.getRegion());
        location.setStateProvince(facility.getStateProvince());
        location.setCountyDistrict(facility.getCountyDistrict());

        Location savedLocation = this.locationService.saveLocation(location);
        return convertLocationToFacility(savedLocation);
    }

    @Override
    public List<MRSFacility> getFacilities() {
        List<Location> locations = locationService.getAllLocations();
        List<MRSFacility> facilities = new ArrayList<MRSFacility>();
        for (Location location : locations) {
            facilities.add(convertLocationToFacility(location));
        }
        return facilities;
    }

    @Override
    public List<MRSFacility> getFacilities(String locationName) {
        final List<Location> locations = locationService.getLocations(locationName);
        final ArrayList<MRSFacility> facilities = new ArrayList<MRSFacility>();
        for (Location location : locations) {
            facilities.add(convertLocationToFacility(location));
        }
        return facilities;
    }

    @Override
    public MRSFacility getFacility(String facilityId) {
        if(StringUtils.isEmpty(facilityId)) return null;
        final Location location = getLocation(facilityId);
        return (location != null) ? convertLocationToFacility(location) : null;
    }

    Location getLocation(String facilityId) {
        return locationService.getLocation(Integer.parseInt(facilityId));
    }

    MRSFacility convertLocationToFacility(Location savedLocation) {
        return new MRSFacility(String.valueOf(savedLocation.getId()), savedLocation.getName(), savedLocation.getCountry(),
                savedLocation.getAddress6(), savedLocation.getCountyDistrict(), savedLocation.getStateProvince());
    }
}
