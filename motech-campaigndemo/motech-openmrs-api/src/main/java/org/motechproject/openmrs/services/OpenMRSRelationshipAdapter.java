package org.motechproject.openmrs.services;

import org.openmrs.Person;
import org.openmrs.Relationship;
import org.openmrs.RelationshipType;
import org.openmrs.api.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OpenMRSRelationshipAdapter {

    @Autowired
    PersonService personService;
    static final String PARENT_CHILD_RELATIONSHIP = "Parent/Child";
    static final String REASON = "Removed in web or mobile form";

    public Relationship createMotherChildRelationship(String motherId, String childId) {
        RelationshipType parentChildRelationshipType = getRelationshipTypeByName(PARENT_CHILD_RELATIONSHIP);
        Relationship relationship = new Relationship(personService.getPerson(Integer.valueOf(motherId)),
                personService.getPerson(Integer.valueOf(childId)), parentChildRelationshipType);
        return personService.saveRelationship(relationship);
    }

    public Relationship voidRelationship(String childId) {
        Relationship relationship = getMotherRelationship(childId);
        relationship = personService.voidRelationship(relationship, REASON);
        return personService.saveRelationship(relationship);
    }

    public Relationship updateMotherRelationship(String motherId, String childId) {
        Relationship motherRelationship = getMotherRelationship(childId);
        Person updatedMother = personService.getPerson(Integer.valueOf(motherId));
        motherRelationship.setPersonA(updatedMother);
        return personService.saveRelationship(motherRelationship);
    }

    public Relationship getMotherRelationship(String childId) {
        RelationshipType parentChildType = getRelationshipTypeByName(PARENT_CHILD_RELATIONSHIP);
        List<Relationship> parentRelations
                = personService.getRelationships(null, personService.getPerson(Integer.valueOf(childId)), parentChildType);
        return (!parentRelations.isEmpty()) ? parentRelations.get(0) : null;
    }

    private RelationshipType getRelationshipTypeByName(String relationshipType) {
        return personService.getRelationshipTypeByName(relationshipType);
    }
}
