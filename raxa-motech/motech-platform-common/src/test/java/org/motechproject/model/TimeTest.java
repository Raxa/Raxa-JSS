package org.motechproject.model;

import org.junit.Test;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static junit.framework.Assert.assertEquals;
import static junit.framework.Assert.assertFalse;
import static junit.framework.Assert.assertTrue;

public class TimeTest {
    @Test
    public void parseTime() {
        assertEquals(new Time(10, 12), Time.parseTime("10:12", ":"));
    }

    @Test
    public void compareTo() {
        List<Time> times = new ArrayList<Time>();
        times.add(new Time(12, 25));
        times.add(new Time(10, 10));
        times.add(new Time(11, 20));
        times.add(new Time(10, 30));

        Collections.sort(times);
        assertEquals(new Time(10, 10), times.get(0));
        assertEquals(new Time(12, 25), times.get(3));
    }

    @Test
    public void shouldTestIfCurrentTimeLessThanGivenTime() {

        assertFalse(new Time(5, 0).le(new Time(4, 59)));
        assertTrue(new Time(5, 0).le(new Time(5, 0)));
        assertTrue(new Time(5, 0).le(new Time(5, 1)));
    }
    
    @Test
    public void shouldTestIfCurrentTimeGreaterThanGivenTime() {

        assertTrue(new Time(5, 0).ge(new Time(4, 59)));
        assertTrue(new Time(5, 0).ge(new Time(5, 0)));
        assertFalse(new Time(4, 0).ge(new Time(5, 0)));
    }
}
