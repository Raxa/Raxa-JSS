package org.motechproject.ivr.kookoo.controller;

import org.junit.Test;

import static junit.framework.Assert.assertEquals;

public class AllIVRURLsTest {
    @Test
    public void springTransferUrl() {
        assertEquals("forward:/ivr/foo/newcall", AllIVRURLs.springTransferUrl("/ivr/foo", "newcall"));
        assertEquals("forward:/ivr/foo/newcall", AllIVRURLs.springTransferUrl("ivr/foo", "newcall"));
    }
}
