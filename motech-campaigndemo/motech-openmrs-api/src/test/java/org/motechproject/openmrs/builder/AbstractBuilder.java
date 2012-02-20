package org.motechproject.openmrs.builder;

import java.lang.reflect.Field;

public abstract class AbstractBuilder<E> {

    public <E> E generate(E domain) {
        try {
            Field[] builderFields = this.getClass().getDeclaredFields();
            for (Field builderField : builderFields) {
                builderField.setAccessible(true);
                Field domainField = domain.getClass().getDeclaredField(builderField.getName());
                domainField.setAccessible(true);
                domainField.set(domain, builderField.get(this));
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return domain;
    }

    public abstract <E> E build();
}