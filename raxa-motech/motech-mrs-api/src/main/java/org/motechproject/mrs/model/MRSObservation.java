package org.motechproject.mrs.model;

import java.util.*;

public class MRSObservation<T> {

    private String id;
    private Date date;
    private String conceptName;
    private T value;
    private Set<MRSObservation> dependantObservations;

    public MRSObservation(Date date, String conceptName, T value) {
        this.date = date;
        this.conceptName = conceptName;
        this.value = value;
    }

    public MRSObservation(String id, Date date, String conceptName, T value) {
        this(date, conceptName, value);
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public Date getDate() {
        return date;
    }

    public String getConceptName() {
        return conceptName;
    }

    public T getValue() {
        return value;
    }

    public Set<MRSObservation> getDependantObservations() {
        return dependantObservations;
    }

    public void setDependantObservations(Set<MRSObservation> dependantObservations) {
        this.dependantObservations = dependantObservations;
    }

    public void addDependantObservation(MRSObservation mrsObservation) {
        if (this.dependantObservations == null) {
            dependantObservations = new HashSet<MRSObservation>();
        }
        dependantObservations.add(mrsObservation);
    }

    @Override
    public String toString() {
        return "MRSObservation{" +
                "id='" + id + '\'' +
                ", date=" + date +
                ", conceptName='" + conceptName + '\'' +
                ", value=" + value +
                '}';
    }
}