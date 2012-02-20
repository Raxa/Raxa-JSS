package org.motechproject.mobileforms.api.web;

import com.jcraft.jzlib.JZlib;
import com.jcraft.jzlib.ZOutputStream;
import org.fcitmuk.epihandy.EpihandyXformSerializer;
import org.motechproject.mobileforms.api.domain.FormBean;
import org.motechproject.mobileforms.api.domain.FormError;
import org.motechproject.mobileforms.api.domain.FormOutput;
import org.motechproject.mobileforms.api.vo.Study;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.IOException;
import java.util.List;

public class FormUploadServlet extends BaseFormServlet {

    private final Logger log = LoggerFactory.getLogger(FormUploadServlet.class);

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ZOutputStream zOutput = new ZOutputStream(response.getOutputStream(), JZlib.Z_BEST_COMPRESSION);
        DataInputStream dataInput = new DataInputStream(request.getInputStream());
        DataOutputStream dataOutput = new DataOutputStream(zOutput);
        FormOutput formOutput = getFormOutput();
        try {
            readParameters(dataInput);
            readActionByte(dataInput);
            List<Study> studies = extractBeans(dataInput);
            for (Study study : studies) {
                for (FormBean formBean : study.forms()) {
                    List<FormError> formErrors = getValidatorFor(formBean).validate(formBean);
                    if (formErrors.isEmpty())
                        formPublisher.publish(formBean);
                    else {
                        formBean.setFormErrors(formErrors);
                    }
                }
                formOutput.addStudy(study);
            }

            response.setContentType(APPLICATION_OCTET_STREAM);
            formOutput.writeFormErrors(dataOutput);
            response.setStatus(HttpServletResponse.SC_OK);
        } catch (Exception e) {
            log.error("Error in uploading form:", e);
            dataOutput.writeByte(RESPONSE_ERROR);
            throw new ServletException(FAILED_TO_SERIALIZE_DATA, e);
        } finally {
            dataOutput.flush();
            zOutput.finish();
            response.flushBuffer();
        }
    }

    private List<Study> extractBeans(DataInputStream dataInput) throws Exception {
        EpihandyXformSerializer serializer = serializer();
        serializer.addDeserializationListener(formProcessor);
        serializer.deserializeStudiesWithEvents(dataInput, mobileFormsService.getFormIdMap());
        return formProcessor.getStudies();
    }



}
