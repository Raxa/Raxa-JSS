package org.motechproject.scheduletracking.api.domain;

public class ActiveEnrollmentExistsException extends RuntimeException {

    public ActiveEnrollmentExistsException(String s, String ... args) {
        super(String.format(s, args));
    }
}
