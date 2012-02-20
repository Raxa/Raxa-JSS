package org.motechproject.mrs.model;

public class MRSUser {
    private String id;
    private String systemId;
    private String securityRole;
    private String userName;

    private MRSPerson person;

    public MRSUser id(String id) {
        this.id = id;
        return this;
    }

    public MRSUser userName(String userName) {
        this.userName = userName;
        return this;
    }

    public MRSUser securityRole(String securityRole) {
        this.securityRole = securityRole;
        return this;
    }

    public String getUserName() {
        return userName;
    }

    public String getSecurityRole() {
        return securityRole;
    }

    public String getId() {
        return id;
    }

    public String getSystemId() {
        return systemId;
    }

    public MRSUser systemId(String systemId) {
        this.systemId = systemId;
        return this;
    }

    public MRSPerson getPerson() {
        return person;
    }

    public MRSUser person(MRSPerson person) {
        this.person = person;
        return this;
    }

}
