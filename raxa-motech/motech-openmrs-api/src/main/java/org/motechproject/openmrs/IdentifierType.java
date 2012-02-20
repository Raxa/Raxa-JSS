package org.motechproject.openmrs;

public enum IdentifierType {

    IDENTIFIER_FACILITY_ID("MoTeCH Facility Id"),
    IDENTIFIER_COMMUNITY_ID("MoTeCH Community Id"),
    IDENTIFIER_MOTECH_ID("MoTeCH Id"),
    IDENTIFIER_STAFF_ID("MoTeCH Staff Id");

    private String name;

    IdentifierType(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}
