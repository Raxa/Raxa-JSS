package org.raxa.module.raxacore.impl;

/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.openmrs.Encounter;
import org.openmrs.EncounterType;
import org.openmrs.Patient;
import org.openmrs.annotation.Authorized;
import org.openmrs.api.OpenmrsService;
import org.openmrs.api.context.Context;
import org.openmrs.api.impl.BaseOpenmrsService;
import org.openmrs.util.OpenmrsDateFormat;
import org.raxa.module.raxacore.PatientList;
import org.raxa.module.raxacore.PatientListService;
import org.raxa.module.raxacore.db.PatientListDAO;

/*
 * Implements PatientListService.java
 * Note the PatientList query must be in the form of:
 * "?encounterType=<uuid>&startDate=2012-05-07&endDate=2012-05-08&inlist=<uuidForList>&notinlist=<uuidForList>"
 */
public class PatientListServiceImpl implements PatientListService {

    private PatientListDAO dao;

    @Override
    public void setPatientListDAO(PatientListDAO dao) {
        this.dao = dao;
    }

    @Override
    public PatientList savePatientList(PatientList patientList) {
        return dao.savePatientList(patientList);
    }

    @Override
    public PatientList getPatientList(Integer id) {
        return dao.getPatientList(id);
    }

    @Override
    public List<PatientList> getPatientListByName(String name) {
        return dao.getPatientListByName(name);
    }

    @Override
    public PatientList getPatientListByUuid(String uuid) {
        return dao.getPatientListByUuid(uuid);
    }

    @Override
    public List<PatientList> getPatientListByEncounterType(EncounterType encounterType) {
        return dao.getPatientListByEncounterType(encounterType);
    }

    private Date getDateFromString(String str) {

        String[] supportedFormats = {"yyyy-MM-dd'T'HH:mm:ss.SSSZ", "yyyy-MM-dd'T'HH:mm:ss.SSS", "yyyy-MM-dd'T'HH:mm:ssZ",
            "yyyy-MM-dd'T'HH:mm:ss", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd"};
        for (int i = 0; i < supportedFormats.length; i++) {
            try {
                Date date = new SimpleDateFormat(supportedFormats[i]).parse(str);
                return date;
            } catch (ParseException ex) {
            }
        }
        return null;
    }

    @Override
    public List<Patient> getPatientsInList(PatientList patientList) {
        List<Patient> patients = new ArrayList<Patient>();

        String query = patientList.getSearchQuery();
        //"?encounterType=<uuid>&startDate=2012-05-07&endDate=2012-05-08&inlist=<uuidForList>&notinlist=<uuidForList>"
        EncounterType encType = null;
        Date startDate = null;
        Date endDate = null;
        String[] queryFields = query.split("&");
        //if we have an encountertype in our search query, set it
        for (Integer i = 0; i < queryFields.length; i++) {
            if (queryFields[i].indexOf("?encounterType=") != -1) {
                encType = Context.getEncounterService().getEncounterTypeByUuid(queryFields[i].substring(15));
            } else if (queryFields[i].indexOf("startDate=") != -1) {
                startDate = getDateFromString(queryFields[i].substring(10));
            } else if (queryFields[i].indexOf("endDate=") != -1) {
                endDate = getDateFromString(queryFields[i].substring(8));
            }
        }

        List<EncounterType> encTypes = new ArrayList<EncounterType>();
        encTypes.add(encType);
        List<Encounter> encounters = Context.getEncounterService().getEncounters(null, null, startDate, endDate, null,
                encTypes, null, Boolean.FALSE);
        for (Integer j = 0; j < encounters.size(); j++) {
            //just in case we have an encounter for the same type with the same patient, check if already exists
            if (!patients.contains(encounters.get(j).getPatient())) {
                patients.add(encounters.get(j).getPatient());
            }
        }
        return patients;
    }

    @Override
    public PatientList updatePatientList(PatientList patientList) {
        return dao.updatePatientList(patientList);
    }

    @Override
    public void deletePatientList(PatientList patientList) {
        dao.deletePatientList(patientList);
    }

    @Override
    public void onStartup() {
        System.out.print("Starting patient list service");
    }

    @Override
    public void onShutdown() {
        System.out.print("Stopping patient list service");
    }
}
