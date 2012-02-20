package org.motechproject.mobileforms.api.validator;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.log4j.Logger;
import org.motechproject.MotechException;
import org.motechproject.mobileforms.api.domain.FormBean;
import org.motechproject.mobileforms.api.domain.FormError;
import org.motechproject.mobileforms.api.validator.annotations.ValidationMarker;

import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.motechproject.mobileforms.api.utils.CollectionUtils.addIfNotNull;

public abstract class FormValidator <V extends FormBean>{
    private static Logger log = Logger.getLogger(FormValidator.class);

    public List<FormError> validate(final V formBean) {

        List<FormError> formErrors = new ArrayList<FormError>();
        for (Field field : getInheritedFields(formBean.getClass())) {
            String fieldName = null;
            try {
                fieldName = field.getName();
                if (PropertyUtils.isReadable(formBean, fieldName)) {
                    Object value = PropertyUtils.getProperty(formBean, fieldName);
                    for (Annotation annotation : field.getAnnotations()) {
                        FormError formError = getValidationHandler(annotation).validate(value, fieldName, field.getType(), annotation);
                        addIfNotNull(formErrors, formError);
                    }
                }
            } catch (Exception e) {
                log.error("Encountered exception while validating form submitted from mobile: ", e);
                formErrors.add(new FormError(fieldName, "Server exception, contact your administrator"));
            }
        }
        return formErrors;
    }

    private FieldValidator getValidationHandler(Annotation annotation) {
        Annotation validationMarker = annotation.annotationType().getAnnotation(ValidationMarker.class);
        if (validationMarker == null) {
            throw new MotechException("Field validator has not been annotated with ValidationMarker, " + annotation.annotationType().getName());
        }
        try {
            Class<FieldValidator> fieldValidatorClass = (Class<FieldValidator>) validationMarker.annotationType().getMethod("handler").invoke(validationMarker);
            return fieldValidatorClass.newInstance();
        } catch (Exception e) {
            throw new MotechException("Exception while instantiating validation handler, this should never happen", e);
        }
    }

    public static List<Field> getInheritedFields(Class<?> type) {
       List<Field> fields = new ArrayList<Field>();
       for (Class<?> c = type; c != null && !c.equals(FormBean.class); c = c.getSuperclass()) {
           fields.addAll(Arrays.asList(c.getDeclaredFields()));
       }
       return fields;
   }
}
