package org.motechproject;

public class MotechException extends RuntimeException {
    public MotechException(String s, Throwable throwable) {
        super(s, throwable);
    }

    public MotechException(String message){
        super(message);
    }
}
