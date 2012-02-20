package org.motechproject.openmrs.model;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Password {
    private final Logger logger = LoggerFactory.getLogger(Password.class);
    private Integer length;

    private static final char[] PASSWORD_CHARS = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
            'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
            'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
            'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8',
            '9', '0'};
    private static final char[] PASSWORD_LOWER_CHARS = {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
            'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z'};

    private static final char[] PASSWORD_UPPER_CHARS = {'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
            'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
            'W', 'X', 'Y', 'Z'};
    private static final char[] PASSWORD_NUMBER_CHARS = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'};

    public Password(Integer length) {
        this.length = length;
    }

    public String create() {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < length - 3; i++) {
            sb.append(PASSWORD_CHARS[((int) (Math.random() * PASSWORD_CHARS.length))]);
        }
        sb.append(PASSWORD_NUMBER_CHARS[((int) (Math.random() * PASSWORD_NUMBER_CHARS.length))]);
        sb.append(PASSWORD_LOWER_CHARS[((int) (Math.random() * PASSWORD_NUMBER_CHARS.length))]);
        sb.append(PASSWORD_UPPER_CHARS[((int) (Math.random() * PASSWORD_NUMBER_CHARS.length))]);
        logger.info("password: " + sb.toString());
        return sb.toString();
    }

}
