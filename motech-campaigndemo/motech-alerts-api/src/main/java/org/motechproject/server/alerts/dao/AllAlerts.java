package org.motechproject.server.alerts.dao;

import org.ektorp.CouchDbConnector;
import org.ektorp.ViewQuery;
import org.ektorp.support.GenerateView;
import org.joda.time.DateTime;
import org.motechproject.dao.MotechBaseRepository;
import org.motechproject.server.alerts.domain.Alert;
import org.motechproject.server.alerts.domain.AlertStatus;
import org.motechproject.server.alerts.domain.AlertType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.List;

public class AllAlerts extends MotechBaseRepository<Alert> {
    @Autowired
    public AllAlerts(@Qualifier("alertDbConnector") CouchDbConnector db) {
        super(Alert.class, db);
    }

    @GenerateView
    public List<Alert> findByExternalId(String externalId) {
        return queryView("by_externalId", externalId);
    }

    @GenerateView
    public List<Alert> findByAlertType(AlertType alertType) {
        return queryView("by_alertType", alertType.toString());
    }

    @GenerateView
    public List<Alert> findByStatus(AlertStatus alertStatus) {
        return queryView("by_status", alertStatus.toString());
    }

    @GenerateView
    public List<Alert> findByPriority(int priority) {
        return queryView("by_priority", priority);
    }

    @GenerateView
    public List<Alert> findByDateTime(DateTime fromDate, DateTime toDate) {
        ViewQuery q = createQuery("by_dateTime").startKey(fromDate).endKey(toDate).includeDocs(true);
        return db.queryView(q, Alert.class);
    }
}