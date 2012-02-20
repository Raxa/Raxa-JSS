package org.motechproject;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * LayerSupertype for entire motech project. Used optionally through the motech project.
 */
public class MotechObject {
    private Logger logger;

    protected Logger logger() {
        if (logger == null) logger = LoggerFactory.getLogger(this.getClass());
        return logger;
    }

    protected void logInfo(String templateMessage, Object ... params) {
        logger().info(String.format(templateMessage, params));
    }

    protected void logError(String templateMessage, Object ... params) {
        logger().error(String.format(templateMessage, params));
    }

    protected void logError(String message) {
        logger().error(message);
    }

    protected void logError(String message, Exception e) {
        logger().error(message, e);
    }

    protected void assertArgumentNotNull(String objectName, Object object) {
        if (object == null) {
            String message = String.format("%s cannot be null", objectName);
            logError(message);
            throw new IllegalArgumentException(message);
        }
    }

    protected void assertArgumentNotEmpty(String objectName, String argument) {
        if (StringUtils.isEmpty(argument)) {
            String message = String.format("%s cannot be empty", objectName);
            logError(message);
            throw new IllegalArgumentException(message);
        }
    }
}
