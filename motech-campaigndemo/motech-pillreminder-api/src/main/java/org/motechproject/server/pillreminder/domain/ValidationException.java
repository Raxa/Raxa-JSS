package org.motechproject.server.pillreminder.domain;

public class ValidationException extends RuntimeException{
    public ValidationException(String message) {
        super(message);
    }
}
