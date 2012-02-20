package org.motechproject.scheduletracking.api.domain;

public class NoMoreMilestonesToFulfillException extends RuntimeException {

    public NoMoreMilestonesToFulfillException(String s, String ... args) {
        super(String.format(s, args));
    }
}
