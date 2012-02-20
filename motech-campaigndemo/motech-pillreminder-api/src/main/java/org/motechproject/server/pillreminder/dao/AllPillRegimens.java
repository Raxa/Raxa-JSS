package org.motechproject.server.pillreminder.dao;

import org.ektorp.CouchDbConnector;
import org.ektorp.ViewQuery;
import org.ektorp.support.GenerateView;
import org.joda.time.LocalDate;
import org.motechproject.dao.MotechBaseRepository;
import org.motechproject.server.pillreminder.domain.Dosage;
import org.motechproject.server.pillreminder.domain.PillRegimen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AllPillRegimens extends MotechBaseRepository<PillRegimen> {
    @Autowired
    public AllPillRegimens(@Qualifier("pillReminderDbConnector") CouchDbConnector db) {
        super(PillRegimen.class, db);
    }

    @GenerateView
    public PillRegimen findByExternalId(String externalID) {
        ViewQuery q = createQuery("by_externalId").key(externalID).includeDocs(true);
        List<PillRegimen> regimens = db.queryView(q, PillRegimen.class);
        return regimens.isEmpty() ? null : regimens.get(0);
    }

    public void updateLastCapturedDate(String regimenId, String dosageId, LocalDate lastCapturedDate) {
        PillRegimen pillRegimen = get(regimenId);
        Dosage dosage = pillRegimen.getDosage(dosageId);
        dosage.updateResponseLastCapturedDate(lastCapturedDate);
        update(pillRegimen);
    }

    public void addOrReplace(PillRegimen pillRegimen) {
        addOrReplace(pillRegimen, "externalId", pillRegimen.getExternalId());
    }
}
