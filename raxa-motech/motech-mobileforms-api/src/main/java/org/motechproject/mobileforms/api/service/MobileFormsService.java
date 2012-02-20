package org.motechproject.mobileforms.api.service;

import org.motechproject.mobileforms.api.vo.Study;

import java.util.List;
import java.util.Map;

public interface MobileFormsService {
    List<Object[]> getAllFormGroups();
    Study getForms(Integer formGroupIndex);
    Map<Integer,String> getFormIdMap();
}
