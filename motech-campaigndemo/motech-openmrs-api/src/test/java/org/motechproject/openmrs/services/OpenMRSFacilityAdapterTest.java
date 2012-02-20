package org.motechproject.openmrs.services;

import org.junit.Before;
import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.motechproject.mrs.model.MRSFacility;
import org.openmrs.Location;
import org.openmrs.api.LocationService;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertNull;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

public class OpenMRSFacilityAdapterTest {

    @Mock
    LocationService mockLocationService;

    OpenMRSFacilityAdapter mrsFacilityAdapter = new OpenMRSFacilityAdapter();

    @Before
    public void setUp() {
        initMocks(this);
        ReflectionTestUtils.setField(mrsFacilityAdapter, "locationService", mockLocationService);
    }

    @Test
    public void testSaveLocation() {
        String name = "name";
        String country = "country";
        String region = "region";
        String district = "district";
        String province = "province";
        MRSFacility facility = new MRSFacility(name, country, region, district, province);
        Location location = mock(Location.class);
        when(mockLocationService.saveLocation(Matchers.<Location>any())).thenReturn(location);

        mrsFacilityAdapter.saveFacility(facility);

        ArgumentCaptor<Location> locationCaptor = ArgumentCaptor.forClass(Location.class);
        verify(mockLocationService).saveLocation(locationCaptor.capture());
        Location actualLocation = locationCaptor.getValue();
        assertEquals(province, actualLocation.getStateProvince());
        assertEquals(name, actualLocation.getName());
        assertEquals(country, actualLocation.getCountry());
        assertEquals(district, actualLocation.getCountyDistrict());
        assertEquals(region, actualLocation.getAddress6());
    }

    static Location createALocation(String id, String name, String country, String region, String district, String province){
        Location location = new Location();
        location.setId(Integer.parseInt(id));
        location.setName(name);
        location.setCountry(country);
        location.setAddress6(region);
        location.setCountyDistrict(district);
        location.setStateProvince(province);
        return location;
    }

    @Test
    public void testGetFacilities() {
        String locationId = "100";
        String name = "name";
        String country = "country";
        String region = "region";
        String district = "district";
        String province = "province";

        List<Location> locations = Arrays.asList(this.createALocation(locationId, name, country, region, district, province));
        when(mockLocationService.getAllLocations()).thenReturn(locations);
        List<MRSFacility> returnedFacilities = mrsFacilityAdapter.getFacilities();
        assertEquals(Arrays.asList(new MRSFacility(locationId, name, country, region, district, province)), returnedFacilities);
    }

    @Test
    public void testGetAFacilityByName() {
        String locationId = "100";
        String name = "name";
        String country = "country";
        String region = "region";
        String district = "district";
        String province = "province";

        Location location = this.createALocation(locationId, name, country, region, district, province);
        when(mockLocationService.getLocations(name)).thenReturn(Arrays.asList(location));
        final List<MRSFacility> facilities = mrsFacilityAdapter.getFacilities(name);
        assertEquals(Arrays.asList(new MRSFacility(locationId, name, country, region, district, province)), facilities);
    }

    @Test
    public void testGetAFacilityByNameForANonExistentFacililty() {
        String name = "name";
        when(mockLocationService.getLocation(name)).thenReturn(null);
        assertEquals(Collections.EMPTY_LIST, mrsFacilityAdapter.getFacilities(name));
    }

    @Test
    public void shouldGetALocation(){
        Integer locationId = 1000;
        Location location = mock(Location.class);
        when(mockLocationService.getLocation(locationId)).thenReturn(location);
        assertThat(mrsFacilityAdapter.getLocation(locationId.toString()), is(equalTo(location)));
    }

    @Test
    public void shouldGetAFacility() {
        Integer locationId = 1000;
        String name = "name";
        String country = "country";
        String region = "region";
        String district = "district";
        String province = "province";
        final MRSFacility facility = new MRSFacility(locationId.toString(), name, country, region, district, province);
        Location location = OpenMRSFacilityAdapterTest.createALocation(locationId.toString(), name, country, region, district, province);
        when(mockLocationService.getLocation(locationId)).thenReturn(location);
        assertThat(mrsFacilityAdapter.getFacility(locationId.toString()), is(equalTo(facility)));
    }
    
    @Test
    public void shouldReturnNullIfLocationWasNotFound() {
        String locationId = "1000";
        when(mockLocationService.getLocation(Integer.parseInt(locationId))).thenReturn(null);
        assertThat(mrsFacilityAdapter.getFacility(locationId), is(equalTo(null)));
    }

    @Test
    public void shouldReturnNullIfQueriedWithNullFacilityId() {
        assertNull(mrsFacilityAdapter.getFacility(null));
    }
}
