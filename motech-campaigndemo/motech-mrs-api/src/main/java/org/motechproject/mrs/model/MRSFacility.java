package org.motechproject.mrs.model;

public class MRSFacility {
    private String id;

    private String name;
    private String country;
    private String region;
    private String countyDistrict;
    private String stateProvince;
    public MRSFacility(String id) {
        this.id = id;
    }

    public MRSFacility(String name, String country, String region, String countyDistrict, String stateProvince) {
        this.name = name;
        this.country = country;
        this.region = region;
        this.countyDistrict = countyDistrict;
        this.stateProvince = stateProvince;
    }

    public MRSFacility(String id, String name, String country, String region, String countyDistrict, String stateProvince) {
        this(name, country, region, countyDistrict, stateProvince);
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public String getCountry() {
        return country;
    }

    public String getRegion() {
        return region;
    }

    public String getCountyDistrict() {
        return countyDistrict;
    }

    public String getStateProvince() {
        return stateProvince;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof MRSFacility)) return false;

        MRSFacility facility = (MRSFacility) o;

        if (country != null ? !country.equals(facility.country) : facility.country != null) return false;
        if (countyDistrict != null ? !countyDistrict.equals(facility.countyDistrict) : facility.countyDistrict != null)
            return false;
        if (id != null ? !id.equals(facility.id) : facility.id != null) return false;
        if (name != null ? !name.equals(facility.name) : facility.name != null) return false;
        if (region != null ? !region.equals(facility.region) : facility.region != null) return false;
        if (stateProvince != null ? !stateProvince.equals(facility.stateProvince) : facility.stateProvince != null)
            return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (country != null ? country.hashCode() : 0);
        result = 31 * result + (region != null ? region.hashCode() : 0);
        result = 31 * result + (countyDistrict != null ? countyDistrict.hashCode() : 0);
        result = 31 * result + (stateProvince != null ? stateProvince.hashCode() : 0);
        return result;
    }
}
