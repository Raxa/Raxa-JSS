package org.motechproject.server.alerts.service;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.motechproject.server.alerts.dao.AllAlerts;
import org.motechproject.server.alerts.domain.Alert;
import org.motechproject.server.alerts.domain.AlertCriteria;
import org.motechproject.server.alerts.domain.AlertStatus;
import org.motechproject.server.alerts.domain.AlertType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import static ch.lambdaj.Lambda.extract;
import static ch.lambdaj.Lambda.on;
import static junit.framework.Assert.assertEquals;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"/applicationContextAlert.xml"})
public class AlertFilterIT {

    @Autowired
    private AlertFilter alertFilter;
    @Autowired
    private AllAlerts allAlerts;

    private List<Alert> createdAlerts;

    @Before
    public void setup() {
        createdAlerts = new ArrayList<Alert>();
    }

    @After
    public void teardown() {
        for (Alert alert : createdAlerts)
            allAlerts.remove(allAlerts.get(alert.getId()));
    }

    @Test
    public void shouldSearchByPrimaryCriterion() {
        createAlert("entity_id1", AlertType.CRITICAL, AlertStatus.CLOSED, 3, null);
        createAlert("entity_id2", AlertType.CRITICAL, AlertStatus.CLOSED, 3, null);
        createAlert("entity_id1", AlertType.MEDIUM, AlertStatus.READ, 2, null);
        createAlert("entity_id1", AlertType.MEDIUM, AlertStatus.NEW, 1, null);
        List<Alert> alerts = alertFilter.search(new AlertCriteria().byExternalId("entity_id1"));
        assertEquals(Arrays.asList("entity_id1", "entity_id1", "entity_id1"), extract(alerts, on(Alert.class).getExternalId()));
    }

    @Test
    public void shouldSearchByOneSecondaryCriterion() {
        createAlert("entity_id1", AlertType.CRITICAL, AlertStatus.CLOSED, 3, null);
        createAlert("entity_id2", AlertType.CRITICAL, AlertStatus.CLOSED, 3, null);
        createAlert("entity_id1", AlertType.MEDIUM, AlertStatus.READ, 2, null);
        createAlert("entity_id1", AlertType.MEDIUM, AlertStatus.NEW, 1, null);
        List<Alert> alerts = alertFilter.search(new AlertCriteria().byExternalId("entity_id1").byType(AlertType.MEDIUM));
        assertEquals(Arrays.asList("entity_id1", "entity_id1"), extract(alerts, on(Alert.class).getExternalId()));
        assertEquals(Arrays.asList(AlertType.MEDIUM, AlertType.MEDIUM), extract(alerts, on(Alert.class).getAlertType()));
    }

    @Test
    public void shouldSearchByTwoSecondaryCriteria() {
        createAlert("entity_id1", AlertType.CRITICAL, AlertStatus.NEW, 3, null);
        createAlert("entity_id2", AlertType.CRITICAL, AlertStatus.CLOSED, 3, null);
        createAlert("entity_id1", AlertType.MEDIUM, AlertStatus.READ, 2, null);
        createAlert("entity_id1", AlertType.MEDIUM, AlertStatus.NEW, 1, null);
        List<Alert> alerts = alertFilter.search(new AlertCriteria().byExternalId("entity_id1").byType(AlertType.MEDIUM).byStatus(AlertStatus.NEW));
        assertEquals(Arrays.asList("entity_id1"), extract(alerts, on(Alert.class).getExternalId()));
        assertEquals(Arrays.asList(AlertType.MEDIUM), extract(alerts, on(Alert.class).getAlertType()));
        assertEquals(Arrays.asList(AlertStatus.NEW), extract(alerts, on(Alert.class).getStatus()));
    }

    @Test
    public void shouldSearchByNoCriteria() {
        createAlert("entity_id1", AlertType.CRITICAL, AlertStatus.CLOSED, 3, null);
        createAlert("entity_id2", AlertType.CRITICAL, AlertStatus.CLOSED, 3, null);
        List<Alert> alerts = alertFilter.search(new AlertCriteria());
        assertEquals(Arrays.asList("entity_id1", "entity_id2"), extract(alerts, on(Alert.class).getExternalId()));
    }

    private Alert createAlert(String externalId, AlertType critical, AlertStatus aNew, int priority, HashMap<String, String> alertData) {
        Alert alert = new Alert(externalId, critical, aNew, priority, alertData);
        allAlerts.add(alert);
        createdAlerts.add(alert);
        return alert;
    }
}
