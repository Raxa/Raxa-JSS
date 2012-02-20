package org.motechproject.ivr.event;

import org.junit.Test;
import org.motechproject.ivr.event.CallEventCustomData;

import static junit.framework.Assert.assertEquals;

public class CallEventCustomDataTest {
    @Test
    public void add() {
        CallEventCustomData callEventCustomData = new CallEventCustomData();
        String key1 = "key1";
        String key2 = "key2";
        callEventCustomData.add(key1, "bar");
        callEventCustomData.add(key1, "bar");
        callEventCustomData.add(key2, "baz");
        assertEquals(2, callEventCustomData.getAll(key1).size());
        assertEquals(1, callEventCustomData.getAll(key2).size());
    }

    @Test
    public void getFirst() {
        CallEventCustomData callEventCustomData = new CallEventCustomData();
        assertEquals(null, callEventCustomData.getFirst("foo"));
    }

    @Test
    public void update() {
        CallEventCustomData callEventCustomData = new CallEventCustomData();
        String key = "foo";
        callEventCustomData.add(key, "bar");
        callEventCustomData.update(key, "baz");
        assertEquals("baz", callEventCustomData.getFirst(key));
    }
}
