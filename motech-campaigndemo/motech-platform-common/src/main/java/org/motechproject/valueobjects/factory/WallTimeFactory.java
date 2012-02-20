package org.motechproject.valueobjects.factory;

import org.motechproject.valueobjects.ParseException;
import org.motechproject.valueobjects.WallTime;
import org.motechproject.valueobjects.WallTimeUnit;

import java.util.StringTokenizer;

public class WallTimeFactory {
    public static WallTime create(String userReadableForm) {
        String inLowerCase = userReadableForm.trim().toLowerCase();
        StringTokenizer tokenizer = new StringTokenizer(inLowerCase);
        if (tokenizer.countTokens() == 0) return null;
        if (tokenizer.countTokens() > 2) {
            throw new ParseException(String.format("Could not parse: \"%s\" to time interval", inLowerCase));
        }
        String valueInString = tokenizer.nextToken();
        String timeUnit = tokenizer.nextToken();

        WallTimeUnit[] values = WallTimeUnit.values();
        for (WallTimeUnit wallTimeUnit : values) {
            if (timeUnit.contains(wallTimeUnit.toString().toLowerCase())) {
                return new WallTime(Integer.parseInt(valueInString), wallTimeUnit);
            }
        }
        throw new ParseException(String.format("Could not parse %s into time.", userReadableForm));
    }
}
