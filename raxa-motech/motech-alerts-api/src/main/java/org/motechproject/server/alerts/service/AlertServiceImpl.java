package org.motechproject.server.alerts.service;

import org.ektorp.DocumentNotFoundException;
import org.motechproject.server.alerts.dao.AllAlerts;
import org.motechproject.server.alerts.domain.Alert;
import org.motechproject.server.alerts.domain.AlertCriteria;
import org.motechproject.server.alerts.domain.AlertStatus;
import org.motechproject.server.alerts.domain.AlertType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

public class AlertServiceImpl implements AlertService {

    private AllAlerts allAlerts;
    private AlertFilter alertFilter;

    final Logger logger = LoggerFactory.getLogger(AlertServiceImpl.class);

    @Autowired
    public AlertServiceImpl(AllAlerts allAlerts, AlertFilter alertFilter) {
        this.allAlerts = allAlerts;
        this.alertFilter = alertFilter;
    }

    @Override
    public void create(String entityId, String name, String description, AlertType type, AlertStatus status, int priority, Map<String, String> data) {
        allAlerts.add(new Alert(entityId, name, description, type, status, priority, data));
    }

    @Override
    public List<Alert> search(AlertCriteria alertCriteria) {
        return alertFilter.search(alertCriteria);
    }

    @Override
    public void changeStatus(String id, AlertStatus status) {
        Alert alert = get(id);
        alert.setStatus(status);
        allAlerts.update(alert);
    }

    @Override
    public void setData(String id, String key, String value) {
        Alert alert = get(id);
        final Map<String, String> data = alert.getData();
        data.put(key, value);
        allAlerts.update(alert);
    }

    public Alert get(String id) {
        try {
            return allAlerts.get(id);
        } catch (DocumentNotFoundException e) {
            logger.error(String.format("No Alert found for the given id: %s.", id), e);
            return null;
        }
    }
}
