package org.motechproject.util;

import org.junit.Test;

import static junit.framework.Assert.assertEquals;

public class SerializationUtilTest {
    @Test
    public void serializeAndDeserialize() {
        TestClassForSerializationUtilTest serializableObject = new TestClassForSerializationUtilTest(10);
        String serializedString = SerializationUtil.toString(serializableObject);
        serializableObject = (TestClassForSerializationUtilTest) SerializationUtil.toObject(serializedString);
        assertEquals(10, serializableObject.x());
    }
}
