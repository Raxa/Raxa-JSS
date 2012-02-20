package org.motechproject.openmrs.util;

import org.openmrs.Location;

import static junit.framework.Assert.assertEquals;

public class FacilityTestUtil {

    public void assertEqualsForOpenMrsLocation(Location location1, Location location2) {
        assertEquals(location1.getStateProvince(), location2.getStateProvince());
        assertEquals(location1.getName(), location2.getName());
        assertEquals(location1.getCountry(), location2.getCountry());
        assertEquals(location1.getCountyDistrict(), location2.getCountyDistrict());
        assertEquals(location1.getAddress6(), location2.getAddress6());
    }
}
