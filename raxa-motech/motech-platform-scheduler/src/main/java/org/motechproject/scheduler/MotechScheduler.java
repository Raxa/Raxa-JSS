package org.motechproject.scheduler;

import org.motechproject.model.MotechEvent;
import org.motechproject.model.CronSchedulableJob;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.AbstractApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.HashMap;
import java.util.Map;

/**
 * Main class that can bootstrap a Motech Scheduler
 *
 * @author Igor (iopushnyev@2paths.com)
 */
public class MotechScheduler {

    private final static Logger log = LoggerFactory.getLogger(MotechSchedulerServiceImpl.class);

    private final static String SCHEDULE_TEST_INPUT_PARAM = "-t";
    private final static String UNSCHEDULE_TEST_INPUT_PARAM = "-c";

    private final static String TEST_EVENT_NAME = "testEvent";
    public static final String SUBJECT = "test";

    /**
     *
     * @param args
     */
    public static void main(String[] args) {

        AbstractApplicationContext ctx
                = new ClassPathXmlApplicationContext(new String[]{"/applicationPlatformScheduler.xml"});

        // add a shutdown hook for the above context...
        ctx.registerShutdownHook();

        log.info("Motech Scheduler started...");

        try {
            if (args.length > 0) {
                MotechScheduler motechScheduler = ctx.getBean(MotechScheduler.class);
                if (SCHEDULE_TEST_INPUT_PARAM.equals(args[0])) {
                    motechScheduler.scheduleTestEvent();
                } else if (UNSCHEDULE_TEST_INPUT_PARAM.equals(args[0])) {
                    motechScheduler.unscheduleTestEvent();
                } else {
                    log.warn("Unknown parameter: " + args[0] + "- ignored");
                }
            }
        } catch (Exception e) {
            log.error("Error: ", e);
        }
    }


     @Autowired
     private MotechSchedulerService schedulerService;

    private void scheduleTestEvent() {

        Map<String, Object> params = new HashMap<String, Object>();
        params.put(MotechSchedulerService.JOB_ID_KEY, TEST_EVENT_NAME);
        MotechEvent motechEvent = new MotechEvent(SUBJECT, params);
        CronSchedulableJob cronSchedulableJob = new CronSchedulableJob(motechEvent, "0/5 * * * * ?");

        try {
            log.info("Scheduling test job: " + cronSchedulableJob);
            schedulerService.scheduleJob(cronSchedulableJob);
        } catch (Exception e) {
            log.warn("Can not schedule test job. " + e.getMessage());
        }
    }

    private void unscheduleTestEvent() {
        try {
            log.info("Unscheduling the test job: " + TEST_EVENT_NAME);
            schedulerService.unscheduleJob(SUBJECT, TEST_EVENT_NAME);
        } catch (Exception e) {
            log.warn("Can not unschedule the test job: " + TEST_EVENT_NAME +" " + e.getMessage());
        }
    }

}
