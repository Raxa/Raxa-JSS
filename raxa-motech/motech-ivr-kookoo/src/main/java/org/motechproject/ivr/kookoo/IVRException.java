package org.motechproject.ivr.kookoo;

public class IVRException extends RuntimeException {
    public IVRException(String format, String ... params) {
        super(String.format(format, params));
    }

    public IVRException(String s, Throwable throwable) {
        super(s, throwable);
    }
}
