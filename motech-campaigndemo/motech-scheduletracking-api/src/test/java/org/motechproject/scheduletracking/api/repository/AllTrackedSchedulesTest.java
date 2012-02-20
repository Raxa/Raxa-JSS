package org.motechproject.scheduletracking.api.repository;

import org.junit.Test;
import org.motechproject.scheduletracking.api.domain.Schedule;
import org.motechproject.scheduletracking.api.domain.ScheduleFactory;
import org.motechproject.scheduletracking.api.domain.userspecified.ScheduleRecord;

import java.util.List;

import static org.junit.Assert.*;
import static org.mockito.Mockito.*;

public class AllTrackedSchedulesTest {

    private ScheduleFactory scheduleFactory = new ScheduleFactory();

    @Test
    // what is this testing?
    public void getSchedule() {
        TrackedSchedulesJsonReader trackedSchedulesJsonReader = mock(TrackedSchedulesJsonReader.class);
        List<ScheduleRecord> records = trackedSchedulesJsonReader.records();
        AllTrackedSchedules allTrackedSchedules = new AllTrackedSchedules(trackedSchedulesJsonReader, scheduleFactory);
        Schedule schedule = allTrackedSchedules.getByName("foo");
        assertNull(schedule);
    }
}
