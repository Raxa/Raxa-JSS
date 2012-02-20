package org.motechproject.sms.api;

import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static junit.framework.Assert.assertEquals;

public class MessageSplitterTest {

    MessageSplitter messageSplitter;

    @Before
    public void setup() {
        messageSplitter = new MessageSplitter();
    }

    @Test
    public void shouldNotSplitMessageIfLessThanUnitLength() {
        List<String> parts = messageSplitter.split("very short message", 20, "(%d/%d):", "..");
        assertEquals(1, parts.size());
        assertEquals("very short message", parts.get(0));
    }

    @Test
    public void shouldSplitMessageInto2Parts() {
        List<String> parts = messageSplitter.split("this message is longer than 30 characters.", 30, "(%d/%d):", "..");
        assertEquals(2, parts.size());
        assertEquals("(1/2):this message is longer..", parts.get(0));
        assertEquals("(2/2): than 30 characters.", parts.get(1));
    }

    @Test
    public void shouldSplitMessageInto3Parts() {
        List<String> parts = messageSplitter.split("this message should be split into six parts.", 16, "(%d/%d):", "..");
        assertEquals(6, parts.size());
        assertEquals("(1/6):this mes..", parts.get(0));
        assertEquals("(2/6):sage sho..", parts.get(1));
        assertEquals("(3/6):uld be s..", parts.get(2));
        assertEquals("(4/6):plit int..", parts.get(3));
        assertEquals("(5/6):o six pa..", parts.get(4));
        assertEquals("(6/6):rts.", parts.get(5));
    }
}
