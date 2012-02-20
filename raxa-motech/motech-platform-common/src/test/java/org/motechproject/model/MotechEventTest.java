package org.motechproject.model;

import org.junit.Test;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static junit.framework.Assert.assertEquals;
import static org.junit.Assert.assertNotSame;
import static org.motechproject.util.DateUtil.newDate;

/**
 * MotechEvent Tester.
 */
public class MotechEventTest {
    @Test(expected = IllegalArgumentException.class)
    public void testConstructor_NullSubject() throws Exception {
        MotechEvent event = new MotechEvent(null, null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testConstructor_WildcardSubject() throws Exception {
        MotechEvent event = new MotechEvent("org.motechproject.*", null);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testConstructor_EmptyPathSubject() throws Exception {
        MotechEvent event = new MotechEvent("org.motechproject..event", null);
    }

    @Test
    public void shouldCopyMotechEvent() {
        Date endDate = newDate(2011, 11, 20).toDate();

        MotechEvent event = new MotechEvent("subject", params("1", "2"))
                .setEndTime(endDate).setLastEvent(true);
        Map paramsToReplace = params("3", "4");
        MotechEvent copy = event.copy("newsubject", paramsToReplace);

        assertEvent(copy, endDate, paramsToReplace, true);
    }

    @Test
    public void shouldCopyMotechEventWithoutStartAndEndTime() {
        MotechEvent event = new MotechEvent("subject", params("1", "2"));
        Map paramsToReplace = params("3", "4");
        MotechEvent copy = event.copy("newsubject", paramsToReplace);

        assertEvent(copy, null, paramsToReplace, false);
    }

    private void assertEvent(MotechEvent copy, Date endDate, Map paramsToReplace, boolean isLastEvent) {
        assertEquals("newsubject", copy.getSubject());
        assertEquals(paramsToReplace, copy.getParameters());
        assertEquals(isLastEvent, copy.isLastEvent());
        assertEventTime(copy, endDate);
    }

    private void assertEventTime(MotechEvent copy, Date endDate) {
        assertEquals(endDate, copy.getEndTime());
        if (endDate != null)
            assertNotSame(endDate, copy.getEndTime());
    }

    private Map params(String val1, String val2) {
        Map map = new HashMap();
        map.put("A", val1);
        map.put("C", val2);
        return map;
    }
}
