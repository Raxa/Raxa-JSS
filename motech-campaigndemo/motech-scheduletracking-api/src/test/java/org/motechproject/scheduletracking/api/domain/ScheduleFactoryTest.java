package org.motechproject.scheduletracking.api.domain;

import org.junit.Before;
import org.junit.Test;
import org.motechproject.scheduletracking.api.domain.userspecified.ScheduleRecord;
import org.motechproject.scheduletracking.api.repository.TrackedSchedulesJsonReader;
import org.motechproject.scheduletracking.api.repository.TrackedSchedulesJsonReaderImpl;
import org.motechproject.util.DateUtil;

import java.util.List;
import java.util.Map;

import static org.hamcrest.Matchers.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

public class ScheduleFactoryTest {

	private Schedule schedule;
	private ScheduleRecord scheduleRecord;

	@Before
	public void setUp() {
		TrackedSchedulesJsonReader jsonReader = new TrackedSchedulesJsonReaderImpl("/simple-schedule.json");
		scheduleRecord = jsonReader.records().get(0);
        schedule = new ScheduleFactory().build(scheduleRecord);
	}

    @Test
    public void shouldCreateTheSchedule() {
        assertNotNull(schedule);
        assertEquals(scheduleRecord.name(), schedule.getName());
    }

	@Test
	public void shouldAddMilestonesToTheSchedule() {
        List<Milestone> milestones = schedule.getMilestones();
        Milestone firstMilestone = milestones.get(0);
        Milestone secondMilestone = milestones.get(1);

        assertEquals(2, milestones.size());
        assertEquals("IPTI 1", firstMilestone.getName());
        assertEquals("Bar", firstMilestone.getData().get("Foo"));
        assertEquals("IPTI 2", secondMilestone.getName());
	}

	@Test
	public void shouldAddAlertsToTheWindows() {
        List<Milestone> milestones = schedule.getMilestones();
        Milestone firstMilestone = milestones.get(0);
        Milestone secondMilestone = milestones.get(1);
        assertEquals(2, firstMilestone.getAlerts().size());
        assertEquals(0, secondMilestone.getAlerts().size());
        assertEquals(0, firstMilestone.getAlerts().get(0).getIndex());
        assertEquals(1, firstMilestone.getAlerts().get(1).getIndex());
    }
}
