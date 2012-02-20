package org.motechproject.util;

import java.io.Serializable;

public class TestClassForSerializationUtilTest implements Serializable {
    private int x;

    TestClassForSerializationUtilTest(int x) {
        this.x = x;
    }

    public int x() {
        return x;
    }
}
