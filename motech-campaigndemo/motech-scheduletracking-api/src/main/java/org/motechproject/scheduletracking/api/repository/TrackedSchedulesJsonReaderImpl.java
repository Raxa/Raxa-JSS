package org.motechproject.scheduletracking.api.repository;

import com.google.gson.reflect.TypeToken;
import org.motechproject.dao.MotechJsonReader;
import org.motechproject.scheduletracking.api.domain.userspecified.ScheduleRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.lang.reflect.Type;
import java.util.List;

@Component
public class TrackedSchedulesJsonReaderImpl implements TrackedSchedulesJsonReader {
    private String definitionFile;
    private MotechJsonReader motechJsonReader;

    private TrackedSchedulesJsonReaderImpl(String definitionFileName, MotechJsonReader motechJsonReader) {
        if (definitionFileName == null) throw new NullPointerException();
        this.definitionFile = definitionFileName;
        this.motechJsonReader = motechJsonReader;
    }

    @Autowired
    public TrackedSchedulesJsonReaderImpl(@Value("#{scheduletracking['trackedschedule.definition.file']}") String definitionFileName) {
        this(definitionFileName, new MotechJsonReader());
    }

    @Override
    public List<ScheduleRecord> records() {
        Type type = new TypeToken<List<ScheduleRecord>>() {
        }.getType();
        return (List<ScheduleRecord>) motechJsonReader.readFromFile(definitionFile, type);
    }
}
