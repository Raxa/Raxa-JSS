package org.motechproject.server.alerts.service;

import org.junit.Before;
import org.junit.Test;
import org.mockito.Matchers;
import org.mockito.Mock;
import org.motechproject.server.alerts.dao.AllAlerts;
import org.motechproject.server.alerts.domain.AlertCriteria;
import org.motechproject.server.alerts.domain.AlertStatus;
import org.motechproject.server.alerts.domain.AlertType;

import java.util.List;

import static junit.framework.Assert.assertEquals;
import static org.mockito.Matchers.anyInt;
import static org.mockito.Matchers.anyString;
import static org.mockito.Mockito.*;
import static org.mockito.MockitoAnnotations.initMocks;

public class AlertFilterTest {

    private AlertFilter alertFilter;

    @Mock
    private AllAlerts allAlerts;

    @Before
    public void setup() {
        initMocks(this);
        alertFilter = new AlertFilter(allAlerts);
    }

    @Test
    public void shouldMakeRepositoryCallForPrimaryCriteriaOnly() {
        alertFilter.search(new AlertCriteria().byStatus(AlertStatus.NEW).byType(AlertType.LOW).byExternalId("entity_id").byPriority(2));
        verify(allAlerts).findByStatus(AlertStatus.NEW);
        verify(allAlerts, times(0)).findByAlertType(Matchers.<AlertType>any());
        verify(allAlerts, times(0)).findByExternalId(anyString());
        verify(allAlerts, times(0)).findByPriority(anyInt());
    }

    @Test
    public void shouldSearchByPrimaryCriterion() {
        List alerts = mock(List.class);
        when(allAlerts.findByAlertType(AlertType.HIGH)).thenReturn(alerts);
        assertEquals(alerts, alertFilter.search(new AlertCriteria().byType(AlertType.HIGH)));
    }

    @Test
    public void shouldSearchByPrimaryCriterion_AsDateRange() {
        assertEquals(0, alertFilter.search(new AlertCriteria().byDateRange(null, null)).size());
    }
}
