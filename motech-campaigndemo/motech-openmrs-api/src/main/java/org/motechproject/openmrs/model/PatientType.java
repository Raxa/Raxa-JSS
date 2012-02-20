package org.motechproject.openmrs.model;

public enum PatientType {
    PREGNANT_MOTHER("Pregnant mother"), CHILD_UNDER_FIVE("Child (age less than 5)"), OTHER("Other");

    private String userFriendlyName;

    PatientType(String userFriendlyName) {
        this.userFriendlyName = userFriendlyName;
    }

    public String getUserFriendlyName() {
        return userFriendlyName;
    }


}
