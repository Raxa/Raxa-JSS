package org.motechproject.openmrs;

import org.hibernate.SessionFactory;
import org.openmrs.api.context.ServiceContext;
import org.springframework.beans.factory.FactoryBean;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

import java.lang.reflect.Field;

@Component
public class OpenMRSSessionFactory implements FactoryBean {
    @Override
    public Object getObject() throws Exception {
        try {
            Field field = org.openmrs.api.context.Context.class.getDeclaredField("serviceContext");
            field.setAccessible(true);
            ServiceContext serviceContext = (ServiceContext) field.get(null);

            Field fieldAppContext = ServiceContext.class.getDeclaredField("applicationContext");
            fieldAppContext.setAccessible(true);
            ApplicationContext context = (ApplicationContext) fieldAppContext.get(serviceContext);

            return context.getBean(SessionFactory.class);
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public Class<?> getObjectType() {
        return SessionFactory.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }
}
