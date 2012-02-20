package org.motechproject.sms.api;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MessageSplitter {
    public List<String> split(String message, int unitCapacity, String headerTemplate, String footer) {
        List<String> parts = new ArrayList<String>();
        if (message.length() <= unitCapacity) {
            parts.add(message);
            return parts;
        }
        int unitTextLength = unitCapacity - (getHeaderLength(headerTemplate) + footer.length());
        int numberOfParts = getNumberOfParts(message, unitTextLength);
        for (int i = 0; i < numberOfParts; i++) {
            StringBuilder sb = new StringBuilder();
            sb.append(String.format(headerTemplate, i + 1, numberOfParts));
            sb.append(getPart(message, i, unitTextLength));
            if (i < numberOfParts - 1)
                sb.append(footer);
            parts.add(sb.toString());
        }
        return parts;
    }

    private int getNumberOfParts(String message, int unitTextLength) {
        return (int) Math.ceil(message.length() / (double) unitTextLength);
    }

    private String getPart(String message, int index, int unitLength) {
        int start = index * unitLength;
        int end = start + unitLength < message.length()? start + unitLength : message.length();
        return message.substring(start, end);
    }

    private int getHeaderLength(String headerTemplate) {
        return String.format(headerTemplate, 0, 0).length();
    }
}
