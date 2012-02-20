package org.motechproject.server.event.annotations;

import org.motechproject.context.Context;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.support.AopUtils;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.stereotype.Component;
import org.springframework.util.ReflectionUtils;

import java.lang.reflect.Method;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

/**
 * Responsible for registering handlers based on annotations
 *
 * @author yyonkov
 */
@Component
public class EventAnnotationBeanPostProcessor implements BeanPostProcessor {
    //private final Logger logger = LoggerFactory.getLogger(this.getClass());

    /* (non-Javadoc)
      * @see org.springframework.beans.factory.config.BeanPostProcessor#postProcessBeforeInitialization(java.lang.Object, java.lang.String)
      */
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        return bean;
    }

    /* (non-Javadoc)
      * @see org.springframework.beans.factory.config.BeanPostProcessor#postProcessAfterInitialization(java.lang.Object, java.lang.String)
      */
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        processAnnotations(bean, beanName);
        return bean;
    }

    private void processAnnotations(final Object bean, final String beanName) {
        ReflectionUtils.doWithMethods(bean.getClass(), new ReflectionUtils.MethodCallback() {

            @Override
            public void doWith(Method method) throws IllegalArgumentException, IllegalAccessException {
                MotechListener annotation;
                Method methodOfOriginalClassIfProxied = ReflectionUtils.findMethod(AopUtils.getTargetClass(bean), method.getName(), method.getParameterTypes());
                if (methodOfOriginalClassIfProxied != null && (annotation = methodOfOriginalClassIfProxied.getAnnotation(MotechListener.class)) != null) {
                    final List<String> subjects = Arrays.asList(annotation.subjects());
                    MotechListenerAbstractProxy proxy = null;
                    switch (annotation.type()) {
                        case ORDERED_PARAMETERS:
                            proxy = new MotechListenerOrderedParametersProxy(beanName, bean, method);
                            break;
                        case MOTECH_EVENT:
                            proxy = new MotechListenerEventProxy(beanName, bean, method);
                            break;
                        case NAMED_PARAMETERS:
                            proxy = new MotechListenerNamedParametersProxy(beanName, bean, method);
                            break;
                    }
                    //logger.info(String.format("Registering listener type(%20s) bean: %s , method: %s, for subjects: %s", annotation.type().toString(), beanName, method.toGenericString(), subjects));
                    Context.getInstance().getEventListenerRegistry().registerListener(proxy, subjects);
                }
            }
        });
    }

    /**
     * Registers event handlers (hack because we are running spring embedded in an OSGi module)
     */
    public static void registerHandlers(Map<String, Object> beans) {
        EventAnnotationBeanPostProcessor processor = new EventAnnotationBeanPostProcessor();
        for (Map.Entry<String, Object> entry : beans.entrySet()) {
            processor.postProcessAfterInitialization(entry.getValue(), entry.getKey());
        }
    }
}
