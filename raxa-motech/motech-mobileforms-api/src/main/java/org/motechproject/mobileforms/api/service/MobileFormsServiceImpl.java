package org.motechproject.mobileforms.api.service;

import org.motechproject.mobileforms.api.domain.FormBean;
import org.motechproject.mobileforms.api.repository.AllMobileForms;
import org.motechproject.mobileforms.api.domain.Form;
import org.motechproject.mobileforms.api.domain.FormGroup;
import org.motechproject.mobileforms.api.vo.Study;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static ch.lambdaj.Lambda.extract;
import static ch.lambdaj.Lambda.on;
import static ch.lambdaj.Lambda.project;

@Service
public class MobileFormsServiceImpl implements MobileFormsService {

    private AllMobileForms allMobileForms;

    @Autowired
    public MobileFormsServiceImpl(AllMobileForms allMobileForms) {
        this.allMobileForms = allMobileForms;
    }

    @Override
    public List<Object[]> getAllFormGroups() {
        return extractStudyNamesWithIndex(allMobileForms.getAllFormGroups());
    }

    @Override
    public Study getForms(Integer formGroupIndex) {
        FormGroup formGroup = allMobileForms.getFormGroup(formGroupIndex);
        return new Study(formGroup.getName(), project(formGroup.getForms(), FormBean.class, on(Form.class).content()));
    }

    @Override
    public Map<Integer, String> getFormIdMap() {
        Map<Integer, String> formIdMap = new HashMap<Integer, String>();
        for (FormGroup formGroup : allMobileForms.getAllFormGroups())
            for (Form form : formGroup.getForms())
                formIdMap.put(form.id(), form.content());
        return formIdMap;
    }

    private List<Object[]> extractStudyNamesWithIndex(List<FormGroup> allFormGroups) {
        List<String> studyNames = extract(allFormGroups, on(FormGroup.class).getName());
        List<Object[]> studyNamesWithIndex = new ArrayList<Object[]>();
        for (int i = 0; i < studyNames.size(); i++)
            studyNamesWithIndex.add(new Object[]{i, studyNames.get(i)});
        return studyNamesWithIndex;
    }

}
