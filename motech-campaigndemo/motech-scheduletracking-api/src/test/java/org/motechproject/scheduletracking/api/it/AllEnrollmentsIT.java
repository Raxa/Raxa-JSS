package org.motechproject.scheduletracking.api.it;

import org.joda.time.LocalDate;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.motechproject.model.Time;
import org.motechproject.scheduletracking.api.domain.Enrollment;
import org.motechproject.scheduletracking.api.domain.Milestone;
import org.motechproject.scheduletracking.api.domain.Schedule;
import org.motechproject.scheduletracking.api.repository.AllEnrollments;
import org.motechproject.util.DateUtil;
import org.motechproject.valueobjects.WallTime;
import org.motechproject.valueobjects.WallTimeUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:testApplicationSchedulerTrackingAPI.xml")
public class AllEnrollmentsIT {

    @Autowired
    private AllEnrollments allEnrollments;

    private List<Enrollment> createdEnrollments;

    @Before
    public void setUp() {
        createdEnrollments = new ArrayList<Enrollment>();
    }

    @After
    public void tearDown() {
        for (Enrollment enrollment : createdEnrollments)
            allEnrollments.remove(enrollment);
    }

    @Test
    public void shouldAddEnrollment() {
        Milestone milestone = new Milestone("first_milestone", new WallTime(13, WallTimeUnit.Week), new WallTime(14, WallTimeUnit.Week), new WallTime(16, WallTimeUnit.Week), null);
        Schedule schedule = new Schedule("schedule_name");
        schedule.addMilestones(milestone);
        Enrollment enrollment = createEnrollment("1324324", "schedule_name", "first_milestone", DateUtil.today(), DateUtil.today(), new Time(DateUtil.now().toLocalTime()), Enrollment.EnrollmentStatus.Active);

        String enrollmentId = enrollment.getId();
        assertNotNull(enrollmentId);
        assertNotNull(allEnrollments.get(enrollmentId));
    }

    @Test
    public void shouldFindActiveEnrollmentByExternalIdAndScheduleName() {
        Milestone milestone = new Milestone("first_milestone", new WallTime(13, WallTimeUnit.Week), new WallTime(14, WallTimeUnit.Week), new WallTime(16, WallTimeUnit.Week), null);
        Schedule schedule = new Schedule("schedule_name");
        schedule.addMilestones(milestone);
        createEnrollment("entity_1", "schedule_name", "first_milestone", DateUtil.today(), DateUtil.today(), new Time(DateUtil.now().toLocalTime()), Enrollment.EnrollmentStatus.Unenrolled);

        assertNull(allEnrollments.findActiveByExternalIdAndScheduleName("entity_1", "schedule_name"));
    }

    private Enrollment createEnrollment(String externalId, String scheduleName, String milestoneName, LocalDate referenceDate, LocalDate enrollmentDate, Time preferredTime, Enrollment.EnrollmentStatus status) {
        Enrollment enrollment = new Enrollment(externalId, scheduleName, milestoneName, referenceDate, enrollmentDate, preferredTime);
        enrollment.setStatus(status);
        allEnrollments.add(enrollment);
        createdEnrollments.add(enrollment);
        return enrollment;
    }
}
