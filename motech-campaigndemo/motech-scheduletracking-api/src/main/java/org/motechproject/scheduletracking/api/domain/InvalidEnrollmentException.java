package org.motechproject.scheduletracking.api.domain;

public class InvalidEnrollmentException extends RuntimeException {

    public InvalidEnrollmentException(String s, String ... args) {
        super(String.format(s, args));
    }
}
