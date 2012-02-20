package org.motechproject.server.alerts.domain;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.motechproject.server.alerts.dao.AllAlerts;
import org.motechproject.util.DateUtil;

import java.util.ArrayList;
import java.util.List;

import static junit.framework.Assert.assertEquals;
import static org.mockito.Mockito.when;
import static org.mockito.MockitoAnnotations.initMocks;

public class CriterionTest {
    @Mock
    private AllAlerts allAlerts;
    private AlertCriteria alertCriteria;

    @Before
    public void setUp() {
        initMocks(this);
        alertCriteria = new AlertCriteria();
    }

    @Test
    public void fetchAlerts_GivenADateRangeCriteria() {
        DateTime fromDate = DateUtil.newDateTime(new LocalDate(2010, 10, 10), 0, 0, 0);
        DateTime toDate = DateUtil.newDateTime(new LocalDate(2010, 10, 20), 0, 0, 0);
        alertCriteria.byDateRange(fromDate, toDate);

        ArrayList<Alert> expectedAlerts = new ArrayList<Alert>() {{
            add(new Alert());
        }};
        when(allAlerts.findByDateTime(fromDate, toDate)).thenReturn(expectedAlerts);

        List<Alert> actualAlerts = Criterion.dateRange.fetch(allAlerts, alertCriteria);
        assertEquals(expectedAlerts.size(), actualAlerts.size());
    }

    @Test
    public void filterAlerts_GivenADateRangeCriteria() {
        final DateTime dayOne = DateUtil.newDateTime(new LocalDate(2010, 10, 1), 0, 0, 0);
        final DateTime dayTwo = DateUtil.newDateTime(new LocalDate(2010, 10, 2), 0, 0, 0);
        final DateTime dayThree = DateUtil.newDateTime(new LocalDate(2010, 10, 3), 0, 0, 0);

        alertCriteria.byDateRange(dayTwo, dayThree);

        ArrayList<Alert> allAlerts = new ArrayList<Alert>() {{
            add(new Alert(){{ setDateTime(dayOne); }});
            add(new Alert(){{ setDateTime(dayTwo); }});
            add(new Alert(){{ setDateTime(dayThree); }});
        }};

        List<Alert> filteredAlerts = Criterion.dateRange.filter(allAlerts, alertCriteria);
        assertEquals(2, filteredAlerts.size());
        assertEquals(dayTwo, filteredAlerts.get(0).getDateTime());
        assertEquals(dayThree, filteredAlerts.get(1).getDateTime());
    }
}
