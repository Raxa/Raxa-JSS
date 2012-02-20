package org.motechproject.openmrs.services;

import org.apache.commons.collections.CollectionUtils;
import org.motechproject.mrs.model.Attribute;
import org.motechproject.mrs.model.MRSPerson;
import org.openmrs.Person;
import org.openmrs.PersonAddress;
import org.openmrs.PersonAttribute;
import org.openmrs.PersonName;
import org.openmrs.api.PersonService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Set;

import static ch.lambdaj.Lambda.*;
import static org.hamcrest.Matchers.is;

public class OpenMRSPersonAdapter {

    private PersonService personService;


    @Autowired
    public OpenMRSPersonAdapter(PersonService personService) {
        this.personService = personService;
    }

    public MRSPerson openMRSToMRSPerson(Person person) {

        Set<PersonName> personNames = person.getNames();
        PersonName personName = getFirstName(personNames);

        final List<Attribute> attributes = project(person.getAttributes(), Attribute.class,
                on(PersonAttribute.class).getAttributeType().toString(), on(PersonAttribute.class).getValue());

        MRSPerson mrsPerson = new MRSPerson().firstName(personName.getGivenName()).middleName(personName.getMiddleName())
                .lastName(personName.getFamilyName()).birthDateEstimated(person.getBirthdateEstimated()).gender(person.getGender())
                .address(getAddress(person)).attributes(attributes).dateOfBirth(person.getBirthdate()).dead(person.isDead()).deathDate(person.getDeathDate());

        if (person.getId() != null) {
            mrsPerson.id(Integer.toString(person.getId()));
        }
        return mrsPerson;
    }

    private String getAddress(Person person) {
        String address = null;
        final Set<PersonAddress> addresses = person.getAddresses();
        if (!addresses.isEmpty()) {
            address = addresses.iterator().next().getAddress1();
        }
        return address;
    }

    public Person getPersonById(String id) {
        return personService.getPerson(Integer.valueOf(id));
    }

    public PersonName getFirstName(Set<PersonName> names) {
        List<PersonName> personNames = filter(having(on(PersonName.class).isPreferred(), is(false)), names);
        if(CollectionUtils.isEmpty(personNames))
            personNames = filter(having(on(PersonName.class).isPreferred(), is(true)), names);
        return personNames.get(0);
    }
}
