package org.motechproject.server.alerts.service;

import org.motechproject.server.alerts.dao.AllAlerts;
import org.motechproject.server.alerts.domain.Alert;
import org.motechproject.server.alerts.domain.AlertCriteria;
import org.motechproject.server.alerts.domain.Criterion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.List;

@Component
public class AlertFilter {

    private AllAlerts allAlerts;

    @Autowired
    public AlertFilter(final AllAlerts allAlerts) {
        this.allAlerts = allAlerts;
    }

    public List<Alert> search(AlertCriteria alertCriteria) {
        List<Criterion> filters = alertCriteria.getFilters();
        if (CollectionUtils.isEmpty(filters))
            return allAlerts.getAll();
        Criterion primaryCriterion = filters.get(0);
        List<Alert> filtered = primaryCriterion.fetch(allAlerts, alertCriteria);
        for (Criterion secondaryCriterion : filters.subList(1, filters.size()))
            filtered = secondaryCriterion.filter(filtered, alertCriteria);
        return filtered;
    }
}
