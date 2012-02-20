package org.motechproject.mobileforms.api.domain;

import ch.lambdaj.function.convert.Converter;
import org.fcitmuk.epihandy.ResponseHeader;
import org.motechproject.mobileforms.api.vo.Study;

import java.io.DataOutputStream;
import java.io.IOException;
import java.util.*;

import static ch.lambdaj.Lambda.convert;
import static ch.lambdaj.Lambda.join;

public class FormOutput {
    private List<Study> studies = new ArrayList<Study>();

    public void addStudy(Study study){
        studies.add(study);
    }

    public void writeFormErrors(DataOutputStream dataOutput) throws IOException {
        int success = 0;
        int failures = 0;
        List<FormErrorVO> errors = new ArrayList<FormErrorVO>();

        for (int studyIndex = 0; studyIndex < studies.size(); studyIndex++) {
            List<FormBean> forms = studies.get(studyIndex).forms();
            for (int formIndex = 0; formIndex < forms.size(); formIndex++) {
                FormBean formBean = forms.get(formIndex);
                if (formBean.hasErrors()) {
                    errors.add(new FormErrorVO(studyIndex, formIndex, formBean.getFormErrors()));
                    failures++;
                } else {
                    success++;
                }
            }
        }

        dataOutput.writeByte(ResponseHeader.STATUS_SUCCESS);
        dataOutput.writeInt(success);
        dataOutput.writeInt(failures);

        for (FormErrorVO error : errors) {
            dataOutput.writeByte((byte) error.getStudyIndex());
            dataOutput.writeShort((short) error.getFormIndex());
            dataOutput.writeUTF(error.getMessage());
        }

    }

    private class FormErrorVO {
        private int studyIndex;
        private int formIndex;
        private List<FormError> formErrors;

        public FormErrorVO(int studyIndex, int formIndex, List<FormError> formErrors) {
            this.studyIndex = studyIndex;
            this.formIndex = formIndex;
            this.formErrors = formErrors;
        }


        public int getStudyIndex() {
            return studyIndex;
        }

        public int getFormIndex() {
            return formIndex;
        }

        public String getMessage() {
            return "Errors:" + join(convert(formErrors, new Converter<FormError, String>() {
                @Override
                public String convert(FormError formError) {
                    return formError.getParameter() + "=" + formError.getError();
                }
            }), "\n");
        }
    }
}
