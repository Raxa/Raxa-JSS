package org.motechproject.server.pillreminder.builder.testbuilder;

import org.joda.time.LocalDate;
import org.motechproject.model.Time;
import org.motechproject.server.pillreminder.domain.Dosage;

public class DosageBuilder {
    private Dosage dosage = new Dosage();

    public DosageBuilder withResponseLastCapturedDate(LocalDate responseLastCapturedDate) {
        dosage.setResponseLastCapturedDate(responseLastCapturedDate);
        return this;
    }

    public DosageBuilder withId(String id) {
        dosage.setId(id);
        return this;
    }

    public DosageBuilder withDosageTime(Time dosageTime) {
        dosage.setDosageTime(dosageTime);
        return this;
    }

    public Dosage build() {
        return dosage;
    }
    public static DosageBuilder newDosage() {
        return new DosageBuilder();
    }

}
