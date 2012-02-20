package org.motechproject.mrs.model;

import org.apache.commons.collections.CollectionUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static ch.lambdaj.Lambda.having;
import static ch.lambdaj.Lambda.on;
import static ch.lambdaj.Lambda.select;
import static org.hamcrest.Matchers.equalTo;

public class MRSPerson {

    private String id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String preferredName;
    private String address;
    private Date dateOfBirth;
    private Boolean birthDateEstimated;
    private String gender;
    private boolean dead;
    private List<Attribute> attributes = new ArrayList<Attribute>();
    private Date deathDate;

    public MRSPerson preferredName(String preferredName) {
        this.preferredName = preferredName;
        return this;
    }

    public MRSPerson address(String address) {
        this.address = address;
        return this;
    }

    public MRSPerson dateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        return this;
    }

    public MRSPerson birthDateEstimated(Boolean birthDateEstimated) {
        this.birthDateEstimated = birthDateEstimated;
        return this;
    }

    public String getGender() {
        return gender;
    }

    public MRSPerson gender(String gender) {
        this.gender = gender;
        return this;
    }

    public String getId() {
        return id;
    }

    public MRSPerson id(String id) {
        this.id = id;
        return this;
    }

    public MRSPerson firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public MRSPerson middleName(String middleName) {
        this.middleName = middleName;
        return this;
    }

    public MRSPerson lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public MRSPerson dead(Boolean dead){
        this.dead = dead;
        return this;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getFullName() {
        return firstName + " " + middleName + " " + lastName;
    }

    public List<Attribute> getAttributes() {
        return attributes;
    }

    public MRSPerson addAttribute(Attribute attribute) {
        attributes.add(attribute);
        return this;
    }

    public MRSPerson attributes(List<Attribute> attributes) {
        this.attributes = attributes;
        return this;
    }

    public MRSPerson deathDate(Date deathDate) {
        this.deathDate = deathDate;
        return this;
    }

    public String attrValue(String key) {
        List<Attribute> filteredItems = select(attributes, having(on(Attribute.class).name(), equalTo(key)));
        return CollectionUtils.isNotEmpty(filteredItems) ? filteredItems.get(0).value() : null;
    }

    public String getPreferredName() {
        return preferredName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public String getAddress() {
        return address;
    }

    public Boolean getBirthDateEstimated() {
        return birthDateEstimated;
    }

    public Boolean isDead() {
        return dead;
    }

    public Date deathDate() {
        return deathDate;
    }
}
