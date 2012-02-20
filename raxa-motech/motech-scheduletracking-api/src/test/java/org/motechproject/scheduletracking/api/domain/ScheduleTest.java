package org.motechproject.scheduletracking.api.domain;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.motechproject.scheduletracking.api.utility.DateTimeUtil.wallTimeOf;

public class ScheduleTest {

	@Test
	public void shouldGetMilestoneByName() {
        Milestone secondMilestone = new Milestone("Second Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Milestone firstMilestone = new Milestone("First Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Schedule schedule = new Schedule("Yellow Fever Vaccination");
        schedule.addMilestones(firstMilestone, secondMilestone);

        assertEquals(firstMilestone, schedule.getMilestone("First Shot"));
		assertEquals(secondMilestone, schedule.getMilestone("Second Shot"));
	}

    @Test
    public void shouldReturnIdealMilestoneAsOfGivenDays() {
        Milestone secondMilestone = new Milestone("Second Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Milestone firstMilestone = new Milestone("First Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Schedule schedule = new Schedule("Yellow Fever Vaccination");
        schedule.addMilestones(firstMilestone, secondMilestone);

        assertEquals(firstMilestone, schedule.getIdealMilestoneAsOf(0));
        assertEquals(firstMilestone, schedule.getIdealMilestoneAsOf(10));
        assertEquals(firstMilestone, schedule.getIdealMilestoneAsOf(28));
        assertEquals(secondMilestone, schedule.getIdealMilestoneAsOf(29));
    }

    @Test
    public void shouldReturnIdealMilestoneStartOffset() {
        Milestone secondMilestone = new Milestone("Second Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Milestone firstMilestone = new Milestone("First Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Schedule schedule = new Schedule("Yellow Fever Vaccination");
        schedule.addMilestones(firstMilestone, secondMilestone);

        assertEquals(0, schedule.getIdealStartOffsetOfMilestoneInDays("First Shot"));
        assertEquals(28, schedule.getIdealStartOffsetOfMilestoneInDays("Second Shot"));
    }

    @Test
    public void shouldReturnNextMilestone() {
        Milestone secondMilestone = new Milestone("Second Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Milestone firstMilestone = new Milestone("First Shot", wallTimeOf(1), wallTimeOf(2), wallTimeOf(3), wallTimeOf(4));
        Schedule schedule = new Schedule("Yellow Fever Vaccination");
        schedule.addMilestones(firstMilestone, secondMilestone);

        assertEquals("Second Shot", schedule.getNextMilestoneName("First Shot"));
        assertEquals(null, schedule.getNextMilestoneName("Second Shot"));
    }
}