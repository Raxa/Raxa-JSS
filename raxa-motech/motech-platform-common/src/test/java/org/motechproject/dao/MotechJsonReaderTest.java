package org.motechproject.dao;

import org.junit.Test;
import org.motechproject.MotechException;

public class MotechJsonReaderTest {
    @Test(expected = MotechException.class)
    public void shouldFailGracefullyWhenJsonFileIsNotFound(){
        MotechJsonReader reader = new MotechJsonReader();
        reader.readFromFile("this-file-does-not-exist.json", String.class);
    }
}
