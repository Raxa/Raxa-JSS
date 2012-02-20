package org.motechproject.mobileforms.api.domain;

import java.util.Date;

public class RegisterClientBean extends FormBean{
    private String registrationMode;
    private String motechId;
    private String motherMotechId;
    private PatientType registrantType;
    private String firstName;
    private String middleName;
    private String lastName;
    private String prefferedName;
    private Date dateOfBirth;
    private Boolean estimatedBirthDate;
    private String sex;
    private Boolean insured;
    private String nhis;
    private Date nhisExpires;
    private String region;
    private String district;
    private String subDistrict;
    private String facilityId;
    private String address;
    private String sender;
    private Boolean enroll;
    private String staffId;
    private Date date;

    public String getRegistrationMode() {
        return registrationMode;
    }

    public void setRegistrationMode(String registrationMode) {
        this.registrationMode = registrationMode;
    }

    public String getMotechId() {
        return motechId;
    }

    public void setMotechId(String motechId) {
        this.motechId = motechId;
    }

    public String getMotherMotechId() {
        return motherMotechId;
    }

    public void setMotherMotechId(String motherMotechId) {
        this.motherMotechId = motherMotechId;
    }

    public PatientType getRegistrantType() {
        return registrantType;
    }

    public void setRegistrantType(PatientType registrantType) {
        this.registrantType = registrantType;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPrefferedName() {
        return prefferedName;
    }

    public void setPrefferedName(String prefferedName) {
        this.prefferedName = prefferedName;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public Boolean getEstimatedBirthDate() {
        return estimatedBirthDate;
    }

    public void setEstimatedBirthDate(Boolean estimatedBirthDate) {
        this.estimatedBirthDate = estimatedBirthDate;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Boolean getInsured() {
        return insured;
    }

    public void setInsured(Boolean insured) {
        this.insured = insured;
    }

    public String getNhis() {
        return nhis;
    }

    public void setNhis(String nhis) {
        this.nhis = nhis;
    }

    public Date getNhisExpires() {
        return nhisExpires;
    }

    public void setNhisExpires(Date nhisExpires) {
        this.nhisExpires = nhisExpires;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getSubDistrict() {
        return subDistrict;
    }

    public void setSubDistrict(String subDistrict) {
        this.subDistrict = subDistrict;
    }

    public String getFacilityId() {
        return facilityId;
    }

    public void setFacilityId(String facilityId) {
        this.facilityId = facilityId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public Boolean getEnroll() {
        return enroll;
    }

    public void setEnroll(Boolean enroll) {
        this.enroll = enroll;
    }

    public String getStaffId() {
        return staffId;
    }

    public void setStaffId(String staffId) {
        this.staffId = staffId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
