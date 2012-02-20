package org.motechproject.scheduler;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.SchedulerFactoryBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Date;
import java.util.UUID;

import static org.junit.Assert.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "/testPlatformSchedulerApplicationContext.xml")
public class SpringQuartzIT {

    @Autowired
    private SchedulerFactoryBean schedulerFactoryBean;

    String groupName = "group1";


    @Test
    public void scheduleUnscheduleTest() throws SchedulerException {

        String uuidStr = UUID.randomUUID().toString();

        JobDetail job = new JobDetail(uuidStr, groupName, MotechScheduledJob.class);
        job.getJobDataMap().put("eventType", "PillReminder");
        job.getJobDataMap().put("patientId", "001");

        Trigger trigger = new SimpleTrigger(uuidStr, groupName, new Date(new Date().getTime() + 3000));

        Scheduler scheduler = schedulerFactoryBean.getScheduler();

        scheduler.scheduleJob(job, trigger);

        scheduler = schedulerFactoryBean.getScheduler();


        String[] jobNames = scheduler.getJobNames(groupName);
        assertEquals(1, jobNames.length);

        String[] triggerNames = scheduler.getTriggerNames(groupName);
        assertEquals(1, triggerNames.length);


        scheduler.unscheduleJob(uuidStr, groupName);
        scheduler.deleteJob(uuidStr, groupName);

        jobNames = scheduler.getJobNames(groupName);
        assertEquals(0, jobNames.length);

        triggerNames = scheduler.getTriggerNames(groupName);
        assertEquals(0, triggerNames.length);

    }
}
