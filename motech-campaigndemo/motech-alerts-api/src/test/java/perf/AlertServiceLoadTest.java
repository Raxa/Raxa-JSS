package perf;

import org.apache.http.client.methods.HttpDelete;
import org.apache.http.impl.client.DefaultHttpClient;
import org.ektorp.CouchDbConnector;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.motechproject.server.alerts.dao.AllAlerts;
import org.motechproject.server.alerts.domain.Alert;
import org.motechproject.server.alerts.domain.AlertStatus;
import org.motechproject.server.alerts.domain.AlertCriteria;
import org.motechproject.server.alerts.domain.AlertType;
import org.motechproject.server.alerts.service.AlertService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/applicationContextAlert.xml"})
public class AlertServiceLoadTest {

    @Autowired
    AlertService alertService;
    @Autowired
    AllAlerts allAlerts;
    @Autowired
    @Qualifier("alertDbConnector")
    CouchDbConnector couchDb;

    private List<Object> createAlertRecords;
    private Random random;
    int numberOfRecords;

    @Before
    public void setup() {
        createAlertRecords = new ArrayList<Object>();
        random = new Random();
    }

    @Test
    @Ignore
    public void getByLoadTest() {
        for (numberOfRecords = 100000; numberOfRecords <= 100000; numberOfRecords *= 10) {
            //setupAlerts(numberOfRecords);
            warm();
            System.out.println(numberOfRecords + " records setup.");
            for (int limit = 10; limit <= 10000; limit *= 10) {
                System.out.println("querying for " + limit + " records...");
                recordQueryExecution(numberOfRecords);
            }
        }
    }

    private void warm() {
        case_getAll();
        case_NoFiltering(numberOfRecords);
        case_FilterBasedOnOneParameter(numberOfRecords);
        case_FilterBasedOnTwoParameters(numberOfRecords);
        case_FilterBasedOnThreeParameters(numberOfRecords);
        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    private void recordQueryExecution(int limit) {
        System.out.println(String.format("allAlerts.getAll()                                 : %5d ms", case_getAll()));
        System.out.println(String.format("alertService.getBy() - filter based on 0 parameter : %5d ms", case_NoFiltering(limit)));
        System.out.println(String.format("alertService.getBy() - filter based on 1 parameter : %5d ms", case_FilterBasedOnOneParameter(limit)));
        System.out.println(String.format("alertService.getBy() - filter based on 2 parameters: %5d ms", case_FilterBasedOnTwoParameters(limit)));
        System.out.println(String.format("alertService.getBy() - filter based on 3 parameters: %5d ms", case_FilterBasedOnThreeParameters(limit)));
    }

    private long case_NoFiltering(int limit) {
        long start = System.currentTimeMillis();
        alertService.search(new AlertCriteria());
        return System.currentTimeMillis() - start;
    }

    private long case_FilterBasedOnOneParameter(int limit) {
        long start = System.currentTimeMillis();
        alertService.search(new AlertCriteria().byType(AlertType.HIGH));
        return System.currentTimeMillis() - start;
    }

    private long case_FilterBasedOnTwoParameters(int limit) {
        long start = System.currentTimeMillis();
        alertService.search(new AlertCriteria().byType(AlertType.LOW).byStatus(AlertStatus.NEW));
        return System.currentTimeMillis() - start;
    }

    private long case_FilterBasedOnThreeParameters(int limit) {
        long start = System.currentTimeMillis();
        alertService.search(new AlertCriteria().byType(AlertType.LOW).byStatus(AlertStatus.NEW));
        return System.currentTimeMillis() - start;
    }

    private long case_getAll() {
        long start = System.currentTimeMillis();
        allAlerts.getAll();
        return System.currentTimeMillis() - start;
    }

    private void recreateAlertsDb() {
        try {
            new DefaultHttpClient().execute(new HttpDelete("http://localhost:5984/motech-alert"));
            couchDb.createDatabaseIfNotExists();
            allAlerts.initStandardDesignDocument();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void setupAlerts(int n) {
        recreateAlertsDb();
        createAlertRecords.clear();
        while (n-- > 0) {
            Alert alert = new Alert(UUID.randomUUID().toString(), (AlertType) randomEnum(AlertType.class), (AlertStatus) randomEnum(AlertStatus.class), random.nextInt(10), null);
            createAlertRecords.add(alert);
        }
        if (numberOfRecords <= 10000)
            couchDb.executeBulk(createAlertRecords);
        else {
            for (int i = 0; i < numberOfRecords; i += 10000)
                couchDb.executeBulk(createAlertRecords.subList(i, i + 10000));
        }
    }

    private Object randomEnum(Class enumClass) {
        Object[] constants = enumClass.getEnumConstants();
        return constants[random.nextInt(constants.length)];
    }
}
