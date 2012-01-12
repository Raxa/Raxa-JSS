/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package org.jss.data;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.json.JSONException;
import org.jss.restClient.OpenMRSDataClient;
import org.jss.restClient.OpenMRSRestClient;
import org.jss.restClient.SubCenterLocation;

/**
 *
 * @author manorlev-tov
 */
public class JSSCancerRegistrationMigration {

    private OpenMRSDataClient client;
    private Map<String, String> headerConceptMap = new HashMap<String, String>();
    private Map<String, String> codeMap = new HashMap<String, String>();
    private File cancerRegistrationExcelFile;

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) throws IOException, JSONException {
        JSSCancerRegistrationMigration crm = new JSSCancerRegistrationMigration(new OpenMRSDataClient(new OpenMRSRestClient("http://localhost:8000/openmrs-standalone/", "admin", "Lasdfe3#"), true),
                new File("/Users/manorlev-tov/Desktop/OpenMRS/cancer register09-11.xls"));
        crm.run();
    }

    public JSSCancerRegistrationMigration(OpenMRSDataClient client, File cancerRegistrationExcelFile) {
        this.client = client;
        this.cancerRegistrationExcelFile = cancerRegistrationExcelFile;
        populateHeaderMap();
        populateCodeMap();
    }

    public void run()
            throws IOException, JSONException {
        int registrationNumberColumn = 0;
        int registrationDateColumn = 0;
        InputStream is = new FileInputStream(cancerRegistrationExcelFile);
        Workbook wb = new HSSFWorkbook(is);
        int numberOfSheets = wb.getNumberOfSheets();
        for (int x = 0; x < numberOfSheets; x++) {
            Sheet sheet = wb.getSheetAt(x);
            Map<Integer, String> headers = new HashMap<Integer, String>();
            for (Iterator<Row> rit = sheet.rowIterator(); rit.hasNext();) {
                Row row = rit.next();
                if (cellContainsValue(row.getCell(0))) //          !row.getCell(row.getFirstCellNum()).getStringCellValue().equals(""))
                {
                    if (headers.isEmpty()) {
                        for (Iterator<Cell> cit = row.cellIterator(); cit.hasNext();) {
                            Cell cell = cit.next();
                            String conceptName = headerConceptMap.get(cell.getStringCellValue().trim());
                            if (conceptName != null) {
                                headers.put(cell.getColumnIndex(), conceptName);
                            } else {
                                if (cell.getStringCellValue().equals("registration no.")) {
                                    registrationNumberColumn = cell.getColumnIndex();
                                } else if (cell.getStringCellValue().equals("regi.date")) {
                                    registrationDateColumn = cell.getColumnIndex();
                                }
                            }
                        }
                    } else {
                        String registrationNumber = Util.pad(String.valueOf((int) row.getCell(registrationNumberColumn).getNumericCellValue()));
                        String patientUuid = client.getPatientUuidByRegistrationNumber(registrationNumber);
                        Date registrationDate = row.getCell(registrationDateColumn).getDateCellValue();
                        if (registrationNumber != null) {
                            for (Map.Entry<Integer, String> e : headers.entrySet()) {
                                if (cellContainsValue(row.getCell(e.getKey()))) {
                                    String value = row.getCell(e.getKey()).getStringCellValue().trim();
                                    if (e.getValue().equals("CANCER CODE")) {
                                        if (codeMap.containsKey(value)) {
                                            value = codeMap.get(value);
                                        } else {
                                            value = "";
                                        }
                                        if (!value.isEmpty()) {
                                            client.addCodedRegistrationObservation(patientUuid, registrationDate, SubCenterLocation.GANIYARI, e.getValue(), value);
                                        }
                                    } else {
                                        if (!value.isEmpty()) {
                                            client.addRegistrationObservation(patientUuid, registrationDate, SubCenterLocation.GANIYARI, e.getValue(), value);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            }
        }

    

    private boolean cellContainsValue(Cell cell) {
        if (cell == null) {
            return false;
        } else {
            return (!cell.toString().trim().equals(""));
        }
    }

    private void populateHeaderMap() {
        headerConceptMap.put("code", "CANCER CODE");
        headerConceptMap.put("diagnosis", "DIAGNOSIS");
        headerConceptMap.put("advice", "ADVICE");
        headerConceptMap.put("follow up", "FOLLOW UP PROCEDURE");
        headerConceptMap.put("next date", "NEXT DATE");
    }

    private void populateCodeMap() {
        codeMap.put("ped", "NEURO PEDIATRIC");
        codeMap.put("b", "BREAST");
        codeMap.put("bone", "BONE");
        codeMap.put("c", "CHRONIC MYELOGENOUS LEUKEMIA");
        codeMap.put("cml", "CHRONIC MYELOGENOUS LEUKEMIA");
        codeMap.put("g", "GASTROINTESTINAL");
        codeMap.put("gi", "GASTROINTESTINAL");
        codeMap.put("Gi", "GASTROINTESTINAL");
        codeMap.put("gu", "GENITOURINARY");
        codeMap.put("gu", "GENITOURINARY");
        codeMap.put("gu prost", "GENITOURINARY");
        codeMap.put("headneck", "HEADNECK");
        codeMap.put("hemat", "HEMATOLOGY");
        codeMap.put("neu.ped", "NEURO PEDIATRIC");
        codeMap.put("NHL", "NON HODGKINS LYMPHOMA");
        codeMap.put("o", "ORAL");
        codeMap.put("or", "ORAL");
        codeMap.put("ov", "OVARY");
        codeMap.put("par", "PAR");
        codeMap.put("ped", "NEURO PEDIATRIC");
        codeMap.put("ped neuro", "NEURO PEDIATRIC");
        codeMap.put("ped tum", "PED TUM");
        codeMap.put("penis", "PENIS");
        codeMap.put("Resp.tract", "RESPERATORY TRACT");
        codeMap.put("salivery", "SALIVERY");
        codeMap.put("skin", "SKIN");
        codeMap.put("st", "STOMACH");
        codeMap.put("third", "THIRD");
        codeMap.put("thyr", "THYROID");
        codeMap.put("tum", "TUM");
        codeMap.put("urin", "URINARY");
    }
}
