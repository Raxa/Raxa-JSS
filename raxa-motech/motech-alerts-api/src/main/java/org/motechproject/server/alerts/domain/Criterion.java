package org.motechproject.server.alerts.domain;

import ch.lambdaj.Lambda;
import org.motechproject.server.alerts.dao.AllAlerts;

import java.util.List;

import static ch.lambdaj.Lambda.having;
import static ch.lambdaj.Lambda.on;
import static org.hamcrest.Matchers.*;


public enum Criterion  {
    externalId {
        @Override
        public List<Alert> fetch(AllAlerts allAlerts, AlertCriteria criteria) {
            return allAlerts.findByExternalId(criteria.externalId());
        }
        @Override
        public List<Alert> filter(List<Alert> alerts, AlertCriteria alertCriteria) {
            return Lambda.filter(having(on(Alert.class).getExternalId(), equalTo(alertCriteria.externalId())), alerts);
        }

    },

    alertStatus {
        @Override
        public List<Alert> fetch(AllAlerts allAlerts, AlertCriteria criteria) {
            return allAlerts.findByStatus(criteria.alertStatus());
        }

        @Override
        public List<Alert> filter(List<Alert> alerts, AlertCriteria alertCriteria) {
            return Lambda.filter(having(on(Alert.class).getStatus(), equalTo(alertCriteria.alertStatus())), alerts);
        }
    },

    alertType {
        @Override
        public List<Alert> fetch(AllAlerts allAlerts, AlertCriteria criteria) {
            return allAlerts.findByAlertType(criteria.alertType());
        }

        @Override
        public List<Alert> filter(List<Alert> alerts, AlertCriteria alertCriteria) {
            return Lambda.filter(having(on(Alert.class).getAlertType(), equalTo(alertCriteria.alertType())), alerts);
        }
    },

    alertPriority {
        @Override
        public List<Alert> fetch(AllAlerts allAlerts, AlertCriteria criteria) {
            return allAlerts.findByPriority(criteria.alertPriority());
        }

        @Override
        public List<Alert> filter(List<Alert> alerts, AlertCriteria alertCriteria) {
            return Lambda.filter(having(on(Alert.class).getPriority(), equalTo(alertCriteria.alertPriority())), alerts);
        }
    },

    dateRange {
        @Override
        public List<Alert> fetch(AllAlerts allAlerts, AlertCriteria criteria) {
            return allAlerts.findByDateTime(criteria.fromDate(), criteria.toDate());
        }

        @Override
        public List<Alert> filter(List<Alert> alerts, AlertCriteria alertCriteria) {
            List<Alert> greaterThanFromDateAlerts = Lambda.filter(having(on(Alert.class).getDateTimeInMillis(), greaterThanOrEqualTo(alertCriteria.fromDate().getMillis())), alerts);
            return Lambda.filter(having(on(Alert.class).getDateTimeInMillis(), lessThanOrEqualTo(alertCriteria.toDate().getMillis())), greaterThanFromDateAlerts);
        }
    };

    public abstract List<Alert> fetch(AllAlerts allAlerts, AlertCriteria criteria);

    public abstract List<Alert> filter(List<Alert> alerts, AlertCriteria alertCriteria);
}


