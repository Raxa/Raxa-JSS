package org.motechproject.openmrs.model;

import org.junit.Test;

import static junit.framework.Assert.assertTrue;

public class PasswordTest {

    @Test
    public void shouldGeneratePasswordWithUpperCaseLowerCaseAndNumberCharacterCombination() {
        Password password = new Password(9);
        for (int i = 0; i < 15; i++) {
            assertPassword(password.create());
        }
    }

    private void assertPassword(String word) {
        boolean upperCase = false;
        boolean lowerCase = false;
        boolean digit = false;
        for (int i = 0; i < word.length(); i++) {
            if (Character.isDigit(word.charAt(i))) digit = true;
            if (Character.isUpperCase(word.charAt(i))) upperCase = true;
            if (Character.isLowerCase(word.charAt(i))) lowerCase = true;
        }
        assertTrue(lowerCase);
        assertTrue(upperCase);
        assertTrue(digit);
    }
}
