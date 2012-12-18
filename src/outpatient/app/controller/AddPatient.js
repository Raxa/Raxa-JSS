/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
Ext.define('RaxaEmr.Outpatient.controller.AddPatient', {
    extend: 'Ext.app.Controller',
    requires: ['Screener.view.NewPatient', 'Screener.model.encounterpost', 'Screener.store.encounterpost'],
    config: {
        // All the fields are accessed in the controller through the id of the components
        refs: { 
            addPatientButton: '#addPatientButton',
            savePatientButton: '#savePatientButton'
        },

        // To perform action on specific component, which are referenced through their ids above 
        control: { 
            addPatientButton: {
                tap: 'addPerson'
            },
            savePatientButton: {
                tap: 'savePerson'
            },
        }
    },

    init: function () {
    }, 

    launch: function () {
    },

    setScreenForPatient: function(patientName, patientAge) {
        var patientRecord = Ext.create('RaxaEmr.Outpatient.model.Patients', {
                age: patientAge,
                display: patientName,
            });
        Ext.getCmp('more').setRecord(patientRecord);
        Ext.getCmp('opdPatientDataEntry').setMasked(false);
        //Saving in global variable myRecord initiated in controller
        myRecord = patientRecord;
    },

    //////// vv COPIED DIRECTLY FROM SCREENER CONTROLLER "Application.js" vv ////////
    // TODO: Refactor to share code across OPD and screener.
    // - Put shared views, models, stores in a "RaxaEmr.Common" namespace
    //      and access identically from OPD and screener.
    // - Move screener to Raxa.Screener namespace
    
    // TODO: For now, move this to a new controller in OPD called NewPatient, note that it was shared with 
    //  Screener, and aim to refactor ASAP.

    // Adds new person to the NewPersons store
    savePerson: function () {
        // TODO: Temporarily using a mask while patient is added to backend. 
        // ideally, should just show patient details immediately
        var mask = function() {
            console.log('mask off');
            Ext.getCmp('opdPatientDataEntry').setMasked(false)
        }

        console.log('mask on');
        Ext.getCmp('opdPatientDataEntry').setMasked({
            xtype: 'loadmask',
            message: 'Adding patient...',
            modal: true
        });

        // Unmask after default time
        setTimeout(function(){
            Ext.getCmp('opdPatientDataEntry').setMasked(false);
        },Util.SAVE_LOAD_MASK_MAX_WAIT_TIME);

        var formp = Ext.getCmp('newPatient').saveForm();
        // Sets Patient Name & Age on Screen while patient is created in the backend
        this.setScreenForPatient(formp.givenname + ' ' + formp.familyname,formp.patientAge);

        if (formp.givenname && formp.familyname && formp.choice && (formp.patientAge || formp.dob  )) {
            var newPatient = {
                gender : formp.choice,
                names: [{
                    givenName: formp.givenname,
                    familyName: formp.familyname
                }] 
            };
            if ( formp.patientAge !== "" && formp.patientAge.length > 0  ) {
                newPatient.age = formp.patientAge ;   
            }
            if( formp.dob !== "" && formp.dob.length > 0 ) {
                newPatient.birthdate =  formp.dob;
            }
            var newPatientParam = Ext.encode(newPatient);
            console.log('newPatient');
            console.log(newPatient);
            console.log('newPatientParam');
            console.log(newPatientParam);
            Ext.Ajax.request({
                scope:this,
                url: HOST + '/ws/rest/v1/raxacore/patient',
                method: 'POST',
                params: newPatientParam,
                disableCaching: false,
                headers: Util.getBasicAuthHeaders(),
                success: function (response) {
                    console.log(response);
                    var personUuid = JSON.parse(response.responseText).uuid;
                    myRecord.data = new Object();
                    myRecord.data['uuid'] = personUuid;
                    // TODO: https://raxaemr.atlassian.net/browse/TODO-67
                    // Need to add location to OpenMRS for screenerUuidlocation
                    this.sendEncounterData(personUuid, localStorage.regUuidencountertype, localStorage.screenerUuidlocation, localStorage.loggedInUser);
                    // NOTE.. This next line is the only change from Screener to OPD
                    // In OPD, we want to automatically assign this patient to the current doctor's list
                    this.assignPatient(personUuid, localStorage.loggedInUser);
                },
                failure: function (response) {
                    Ext.Msg.alert('Error: unable to write to server. Enter all fields.')
                }
            });
            Ext.getCmp('newPatient').hide();
            Ext.getCmp('newPatient').reset();
        }
        else {
            Ext.Msg.alert ("Error","Please Enter all the mandatory fields");
        }
    },

    sendEncounterData: function (personUuid, encountertype, location, provider) {
        //funciton to get the date in required format of the openMRS, since the default extjs4 format is not accepted
        var t = Util.Datetime(new Date(), Util.getUTCGMTdiff());
        
        // creates the encounter json object
        // the 3 fields "encounterDatetime, patient, encounterType" are obligatory fields rest are optional
        var jsonencounter = Ext.create('Screener.model.encounterpost', {
            encounterDatetime: t,
            patient: personUuid, 
            encounterType: encountertype,
            //location: location,
            provider: provider
        });
       
        // Handle "Screener Vitals" encounters specially
        // Create observations linked to the encounter
        if (encountertype === localStorage.screenervitalsUuidencountertype)
        {
            var observations = jsonencounter.observations();    // Create set of observations
            
            var createObs = function (c, v) {
                // TODO: https://raxaemr.atlassian.net/browse/RAXAJSS-368
                // Validate before submitting an Obs
                observations.add({
                    obsDatetime : t,
                    person: personUuid,
                    concept: c,
                    value: v
                });
            };

            console.log("Creating Obs for uuid types...");
            v = Ext.getCmp("vitalsForm").getValues();
            createObs(localStorage.bloodoxygensaturationUuidconcept, v.bloodOxygenSaturationField[0]);
            createObs(localStorage.diastolicbloodpressureUuidconcept, v.diastolicBloodPressureField[0]);
            createObs(localStorage.respiratoryRateUuidconcept, v.respiratoryRateField[0]);
            createObs(localStorage.systolicbloodpressureUuidconcept, v.systolicBloodPressureField[0]);
            createObs(localStorage.temperatureUuidconcept, v.temperatureField[0]); 
            createObs(localStorage.pulseUuidconcept, v.pulseField[0]);
            observations.sync();
            console.log("... Complete! Created Obs for new uuid types");
        }

        // Create encounter
        var store = Ext.create('Screener.store.encounterpost');
        store.add(jsonencounter);
        store.sync();
        store.on('write', function () {
            // CHANGED from SCREENER: If a patient was assigned, open that patient
            var pStore = Ext.getStore('patientStore');
            if (encountertype === localStorage.screenerUuidencountertype) {
                console.log('was screenerUuidencountertype')
                pStore.on('load', function() {
                    console.log('was screenerUuidencountertype.. load event')
                    var record = pStore.getAt(pStore.getCount()-1)
                    var contactScreen = Ext.getCmp('more');
                    contactScreen.setRecord(record);
                    Ext.getCmp('opdPatientDataEntry').setMasked(false);
                }, this);
            }

            console.log('encounter was posted... loading');
            pStore.load();
        }, this);
        return store;
    },

    //////// ^^ COPIED DIRECTLY FROM SCREENER CONTROLLER "Application.js" ^^ ////////

    // MINOR REFACTORING OF WHAT WAS IN SCREENER "Application.js" //
    // Removed everything which relates to updating the UI //
    // Note: "Screener Vitals" encounter should be separated from "Screener" encounter in sendEncounterData()

    // Opens form for creating new patient
    addPerson: function () {
        if (!this.newPatient) {
            this.newPatient = Ext.create('Screener.view.NewPatient', {
                // Changed location of the popup
                modal: true,
                floating: true,
                left: (768-500) / 2,    // centered, based on screen width and modal width
                top: 60,    // enough to not overlap with toolbar
                width: 500,
            });
            Ext.Viewport.add(this.newPatient);
        }
        // Set new FIFO id so patients come and go in the queue!
        //this.getFormid().setValue(this.totalPatients);
        this.newPatient.show();
    },

    // Assigns patient, pops-open the patient-list so you can select that patient
    assignPatient: function (patient, provider) {
        var encounterSent = this.sendEncounterData(patient, localStorage.screenerUuidencountertype, localStorage.waitingUuidlocation, provider);
        
        // Show patient list, so user gets feedback that their patient was added successfully
        // TODO: Move this logic into view modification.. shouldn't be involved in the controller
        // Ext.getCmp('contact').show();
    },    
});
