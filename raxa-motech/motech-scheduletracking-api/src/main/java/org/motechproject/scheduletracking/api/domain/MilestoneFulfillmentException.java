package org.motechproject.scheduletracking.api.domain;

public class MilestoneFulfillmentException extends RuntimeException {

    public MilestoneFulfillmentException(String s, String ... args) {
        super(String.format(s, args));
    }
}
