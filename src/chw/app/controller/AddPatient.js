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
Ext.define('chw.controller.AddPatient', {
    extend: 'Ext.app.Controller',
    requires: ['chw.view.newPatient', 'chw.model.encounterpost','chw.store.Location','chw.model.NewPatient', 'chw.store.NewPatients', 'chw.store.IdentifierType', 'chw.store.encounterpost'],
    config: {

        control: {
            "button[action=newPatient]": {
                tap: function () {
                    Ext.getCmp('viewPort').setActiveItem(PAGES.newPatient)
                    this.savePerson();
                }
            }
        },
    },

    //////// vv COPIED DIRECTLY FROM SCREENER CONTROLLER "Application.js" vv ////////
    // TODO: Refactor to share code across OPD and screener.
    // - Put shared views, models, stores in a "RaxaEmr.Common" namespace
    //      and access identically from chw, OPD and screener.
    // - Move screener to Raxa.Screener namespace
    
    // TODO: For now, move this to a new controller in chw called NewPatient, note that it was shared with 
    //  Screener, and aim to refactor ASAP.

    // Adds new person to the NewPersons store
    savePerson: function () {

        var formp = Ext.getCmp('newPatient').saveForm();
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
            var newPatientParam = Ext.encode(newPatient);
            Ext.Ajax.request({
                scope:this,
                url: HOST + '/ws/rest/v1/person',
                method: 'POST',
                params: newPatientParam,
                disableCaching: false,
                headers: Util.getBasicAuthHeaders(),
                success: function (response) {
                    var personJSON = JSON.parse(response.responseText);
                    myRecord = personJSON;
                    this.getidentifierstype(personJSON.uuid);
                },
                failure: function (response) {
                    Ext.Msg.alert('Error','Unable to write to server. Please re-create the patient');
                }
            });
        }
        else {
            Ext.Msg.alert ("Error","Please Enter all the mandatory fields");
        }
    },

        // Get IdentifierType using IdentifierType store 
    getidentifierstype: function (personUuid) {
        var identifiers = Ext.create('chw.store.IdentifierType')
        identifiers.load({
            scope: this,
            callback: function(records, operation, success){
                if(success){
                    this.getlocation(personUuid,identifiers.getAt(0).getData().uuid)
                }
                else{
                    Ext.Msg.alert("Error", Util.getMessageLoadError());
                }
            }
        });
    },
    // Get Location using Location store
    getlocation: function (personUuid, identifierType) {
        var locations = Ext.create('chw.store.Location')
        locations.load({
            scope: this,
            callback: function(records, operation, success){
                if(success){
                    this.makePatient(personUuid,identifierType,locations.getAt(0).getData().uuid)
                }
                else{
                    Ext.Msg.alert("Error", Util.getMessageLoadError());
                }
            }
        });
    },

    sendEncounterData: function (personUuid, encountertype, location, provider) {
        //funciton to get the date in required format of the openMRS, since the default extjs4 format is not accepted
        var t = Util.Datetime(new Date(), Util.getUTCGMTdiff());
        
        // creates the encounter json object
        // the 3 fields "encounterDatetime, patient, encounterType" are obligatory fields rest are optional
        var jsonencounter = Ext.create('chw.model.encounterpost', {
            encounterDatetime: t,
            patient: personUuid, 
            encounterType: encountertype,
            //location: location,
            provider: provider
        });
        // Create encounter
        var store = Ext.create('chw.store.encounterpost');
        store.add(jsonencounter);
        store.sync();
        return store;
    },

    // Creates a new patient using NewPatients store 
    makePatient: function (personUuid, identifierType, location) {
        var patient = Ext.create('chw.model.NewPatient', {
            person: personUuid,
            identifiers: [{
                identifier: Util.getPatientIdentifier().toString(),
                identifierType: identifierType,
                location: location,
                preferred: true
            }]
        });

        var PatientStore = Ext.create('chw.store.NewPatients')
        PatientStore.add(patient);
        PatientStore.sync();
        PatientStore.on('write',function () {
            Ext.Msg.alert('Patient Created');
            Ext.getCmp('newPatient').reset();

            // TODO: https://raxaemr.atlassian.net/browse/TODO-67
            // Need to add location to OpenMRS for screenerUuidlocation
            this.sendEncounterData(personUuid, localStorage.regUuidencountertype, localStorage.screenerUuidlocation, localStorage.loggedInUser);
            // NOTE.. This next line is the only change from Screener to OPD
            // In OPD, we want to automatically assign this patient to the current doctor's list
            this.assignPatient(personUuid, localStorage.loggedInUser);
        }, this);
    },
    // Assigns patient, pops-open the patient-list so you can select that patient
    assignPatient: function (patient, provider) {
        var encounterSent = this.sendEncounterData(patient, localStorage.screenerUuidencountertype, localStorage.waitingUuidlocation, provider);
    },    
});