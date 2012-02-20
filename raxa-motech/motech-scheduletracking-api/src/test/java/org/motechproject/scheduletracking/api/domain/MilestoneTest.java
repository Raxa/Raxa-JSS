package org.motechproject.scheduletracking.api.domain;

import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static ch.lambdaj.Lambda.extract;
import static ch.lambdaj.Lambda.on;
import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.mockito.Mockito.mock;
import static org.motechproject.scheduletracking.api.utility.DateTimeUtil.wallTimeOf;

public class MilestoneTest {
    private Milestone milestone;

    @Before
    public void setUp() {
        milestone = new Milestone("M1", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
    }

    @Test
    public void shouldCreateMilestoneWindows() {
        assertNotNull(milestone.getMilestoneWindow(WindowName.earliest));
        assertNotNull(milestone.getMilestoneWindow(WindowName.due));
        assertNotNull(milestone.getMilestoneWindow(WindowName.late));
        assertNotNull(milestone.getMilestoneWindow(WindowName.max));
    }

    @Test
    public void shouldReturnMilestoneWindows() {
        List<MilestoneWindow> windows = milestone.getMilestoneWindows();
        assertArrayEquals(new WindowName[]{WindowName.earliest, WindowName.due, WindowName.late, WindowName.max}, extract(windows, on(MilestoneWindow.class).getName()).toArray());
    }

    @Test
    public void shouldAddAlertUnderTheMilestone() {
        Alert alert1 = new Alert(null, 0, 0);
        Alert alert2 = new Alert(null, 0, 1);
        milestone.addAlert(WindowName.late, alert1);
        milestone.addAlert(WindowName.max, alert2);
        assertArrayEquals(new Alert[]{alert1, alert2}, milestone.getAlerts().toArray());
    }

    @Test
    public void shouldReturnMaximumDurationOfMilestone() {
        assertEquals(28, milestone.getMaximumDurationInDays());
    }
}
