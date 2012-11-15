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

// TODO: https://raxaemr.atlassian.net/browse/RAXAJSS-382
// Scope these appropriately - they shouldn't be fully global, just within this
// controller. e.g. var outpatientGlobals = {}
var form_num;
var lab_num;
var numberOfStoresWritten;
var NUMBER_OF_STORES_TO_WRITE = 3;

// Stores
var store_patientList;
var store_assignedPatientList;

Util.PAGES.SCREENER = {
    TOP_MENU: 0,
    ASSIGN_PATIENTS: 1,
    VITALS: 2,
    PHARMACY_ORDER: 3,
    LAB_ORDER: 4
};

/*
 * Main Controller for Screener Application
 */
Ext.define("Screener.controller.Application", {
    requires: [
    'Screener.store.AssignedPatientList',
    'Screener.store.Doctors',
    'Screener.store.drugConcept',
    'Screener.store.drugEncounter',
    'Screener.store.druglist',
    'Screener.store.encounterpost',
    'Screener.store.encounters',
    'Screener.store.IdentifierType',
    'Screener.store.Location',
    'Screener.store.NewPatients',   // Cant find this store
    'Screener.store.NewPersons',
    'Screener.store.PatientList',
    'Screener.store.Patients',
    'Screener.store.PatientSummary',
    'Screener.store.PostLists',
    'Screener.model.observation',	
    'Screener.view.PharmacyForm', 
    'Screener.view.PatientListView',
    'Screener.view.VitalsView',
    'Screener.view.VitalsForm',
    'Screener.view.Main',
    ],
    models: [
    'Screener.model.Person', 
    'Screener.model.PostList', 
    'Screener.model.Patients',
    'Screener.model.observation'
    ],
    extend: 'Ext.app.Controller',
    config: {
        // Here we name the elements we need from the page
        refs: {
            view: 'mainView',
            patientView: 'patientView',
            patientSummary: 'patientSummary',
            doctorSummary: 'doctorSummary',
            labOrderForm: 'labOrderForm',
            vitalsForm: 'vitalsForm',
            pharmacyForm: 'pharmacyForm',
            newPatient: 'newPatient',
            sortPanel: 'sortPanel',
            patientList: '#patientList', // Assign Patient page
            vitalsPatientList: '#vitalsPatientList',
            doctorList: '#doctorList',
            expandDoctorList: '#expandDoctorList',
            assignedPatientList: '#assignedPatientList',
            currentPatients: '#currentPatients',
            doctorStore: 'doctorStore',
            "'form'+form_num": 'form' + form_num,
            formid: '#formid',
            addPatientButton: 'patientListView #addPatientButton',
            showDoctorsButton: '#showDoctorsButton',
            savePatientButton: '#savePatientButton',
            submitVitalsButton: '#submitVitalsButton',
            assignButton: '#assignButton',
            removeButton: '#removeButton',
            sortButton: '#sortButton',
            refreshButton: '#refreshButton',
            drugSubmitButton: '#drugSubmitButton',
            addDrugFormButton: '#addDrugFormButton',
            addLabOrderButton: '#addLabOrderButton',
            removeDrugFormButton: '#removeDrugFormButton',
            removeLabOrderButton: '#removeLabOrderButton',
            sortByNameButton: '#sortByNameButton',
            sortByFIFOButton: '#sortByFIFOButton',
            sortByBMIButton: '#sortByBMIButton',
            removePatientButton: '#removePatientButton',
            removeAllPatientsButton: '#removeAllPatientsButton',
            patientListView: '#patientListViewId',
            PatientsWaiting: '#patientsWaiting',
            dob: '#dob',
            patientAge: '#patientAge'
        },
        // Now we define all our listening methods
        control: {
            dob: {
                change: 'onDateChange' 
            },
            patientAge: {
                change: 'onAgeChange' 
            },
            addDrugFormButton: {
                tap: 'addDrugForm'
            },
            addLabOrderButton: {
                tap: 'addLabOrder'
            },
            removeLabOrderButton: {
                tap: 'removeLabOrder'
            },
            addPatientButton: {
                tap: 'addPerson'
            },
            savePatientButton: {
                tap: 'savePerson'
            },
            submitVitalsButton: {
                tap: 'savePatientVitals'
            },
            showDoctorsButton: {
                tap: 'showDoctors'
            },
            assignButton: {
                tap: 'assignPatient'
            },
            removeButton: {
                tap: 'removePatient'
            },
            'patientListView button[action=sortList]': {
                tap: 'sortList'
            },
            'patientListView button[action=refreshList]': {
                tap: 'refreshList'
            },
            'patientListView button[action=sortByName]': {
                tap: 'sortByName'
            },
            drugSubmitButton: {
                tap: 'drugSubmit'
            },
            'patientListView button[action=sortByFIFO]': {
                tap: 'sortByFIFO'
            },
            'patientListView button[action=sortByBMI]': {
                tap: 'sortByBMI'
            },
            patientList: {
                itemtap: 'setCurrentPatient',
                itemtaphold: 'showPatientSummary'
            },
            doctorList: {
                itemtap: 'setCurrentDoctor',
                itemtaphold: 'showDoctorSummary'
            },
            expandDoctorList: {
                itemtap: 'expandCurrentDoctor'
            },
            currentPatients: {
                itemtap: 'currentPatientsTapped'
            },
            assignedPatientList: {
                itemtap: 'expandAssignedPatient'
            },
            removePatientButton: {
                tap: 'removePatient'
            },
            removeAllPatientsButton: {
                tap: 'removeAllPatients'
            },
            removeDrugFormButton: {
                tap: 'removeDrugForm'
            },
            view: {
                init: 'init'
            }
        }
    },

    // Called on startup
    
    
    init: function () {
        form_num = 0;
        lab_num = 0;
        store_patientList = Ext.create('Screener.store.PatientList', {
            storeId: 'patientStore'
        });
        store_assignedPatientList = Ext.create('Screener.store.AssignedPatientList', {
            storeId: 'assPatientStore'
        });
        this.preparePatientList();
    },

    // Updates the number of Patients Waiting in the left Title Bar
    updatePatientsWaitingTitle: function () {
        console.log("updatePatientsWaitingTitle");
        // 3 different views shares this title, all three view get updated with same title
        var patientsTitles = Ext.ComponentQuery.query('ListView #patientsWaiting');
        var patientWaitNumber = Ext.getStore('patientStore').getCount();
        /*var patientWaitNumber = 5;*/
        var i;
        for (i = 0; i < patientsTitles.length; i++) {
            patientsTitles[i].setTitle(patientWaitNumber + ' Patients Waiting');
        }
    },
    //this method sets locally(persist = false) the bmi and encounter time in patients model
    setComplaintBMITime: function (store_patientList) {
        for (var i = 0; i < store_patientList.getCount(); i++) {
            var currentPatientData = store_patientList.getAt(i).getData();
            var encounters = currentPatientData.encounters;
            var mostRecentEncounter = encounters[encounters.length - 1];
            var observations = mostRecentEncounter.obs;   

            // Update data (time, bmi, complaint) in patient list
            var COMPLAINT_DESCRIPTION = 'REGISTRATION COMPLAINT';
            var BMI_DESCRIPTION = 'BODY MASS INDEX';
                
            currentPatientData.complaint = this.getObsByDisplayName(observations, COMPLAINT_DESCRIPTION);
            currentPatientData.time = mostRecentEncounter.encounterDatetime;
            currentPatientData.bmi = this.getObsByDisplayName(observations, BMI_DESCRIPTION);
        }
        Ext.getStore('patientStore').sort('display');
    },
    //helper method - returns BMI value if it exists
    getObsByDisplayName: function (obs,displayName) {
        for (var i = 0; i < obs.length; i++) {
            if (obs[i].display.indexOf(displayName) != -1) {
                return obs[i].value;
            }
        }

        // TODO: What if NO bmi? needs to handle that case, too
        // Return null or NaN, ensure other methods handle this possibility
        return '-';
    },
    
    // This method sets the UI of sort buttons when pressed.
    // One button is set as "declined" (pressed) while the other two
    // are set to "normal" (not pressed).
    setSortButtonUi: function (string1_decline, string2_normal, string3_normal) {
        this.setCompQuery(string1_decline, 'decline');
        this.setCompQuery(string2_normal, 'normal');
        this.setCompQuery(string3_normal, 'normal');
    },
    // Queries a component and sets its UI type.
    // Used as a helper method for setSortButtonUi.
    setCompQuery: function (string1, uiType) {
        var i;
        for (i = 0; i < Ext.ComponentQuery.query(string1).length; i++) {
            Ext.ComponentQuery.query(string1)[i].setUi(uiType);
        }
    },

    // Creates an instance of PostList model for posting Registration and Screener List
    preparePatientList: function () {
        var d = new Date();
        var list_regEncounter = Ext.create('Screener.model.PostList', {
            name: "Registration Encounter",
            description: "Patients encountered Registration" + "startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d),
            searchQuery: "?encounterType=" + localStorage.regUuidencountertype + "&startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d)
        });
        var list_scrEncounter = Ext.create('Screener.model.PostList', {
            name: "Screener Encounter",
            description: "Patients encountered Screener on " + "startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d),
            searchQuery: "?encounterType=" + localStorage.screenerUuidencountertype + "&startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d)

        });
        var list_outEncounter = Ext.create('Screener.model.PostList', {
            name: "Outpatient Encounter",
            description: "Patients encountered Outpatient on " + "startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d),
            searchQuery: "?encounterType=" + localStorage.outUuidencountertype + "&startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d)

        });
        numberOfStoresWritten = 0;
        this.createList(list_regEncounter, list_scrEncounter, list_outEncounter, numberOfStoresWritten);
    },
    // Creates two different List of Patients Registered and Patients Screened within last 24 hours
    createList: function (list_reg, list_scr, list_out, k) {
        var store_reg = Ext.create('Screener.store.PostLists');
        var store_scr = Ext.create('Screener.store.PostLists');
        var store_out = Ext.create('Screener.store.PostLists');
        store_reg.add(list_reg);
        store_scr.add(list_scr);
        store_out.add(list_out);
        store_reg.sync();
        store_scr.sync();
        store_out.sync();

        this.listenerOnList(store_reg, store_reg, store_scr, store_out);
        this.listenerOnList(store_scr, store_reg, store_scr, store_out);
        this.listenerOnList(store_out, store_reg, store_scr, store_out);
        var a = [store_reg, store_scr, store_out];
        return a;
    },
    // Listens for stores to be written. Once all stores have been written,
    // creates the complete patient list to be displayed in Screener
    listenerOnList: function (store, store1, store2, store3) {
        store.on('write', function () {
            numberOfStoresWritten++;
            if (numberOfStoresWritten == NUMBER_OF_STORES_TO_WRITE) {
                this.finalPatientList(store1, store2, store3);
            }
        }, this);
    },
    // Creates List of Patients registered but not screened in last 24 hours
    finalPatientList: function (store_regEncounter, store_scrEncounter, store_outEncounter) {
        store_patientList.getProxy().setUrl(
            this.getPatientListUrl(
                store_regEncounter.getData().getAt(0).getData().uuid, 
                store_scrEncounter.getData().getAt(0).getData().uuid, 
                localStorage.regUuidencountertype
                )
            );
        store_assignedPatientList.getProxy().setUrl(
            this.getPatientListUrl(
                store_scrEncounter.getData().getAt(0).getData().uuid, 
                store_outEncounter.getData().getAt(0).getData().uuid, 
                localStorage.screenerUuidencountertype
                )
            );
        store_patientList.load({
            scope: this,
            callback: function(records, operation, success){
                if(success){
                    this.setComplaintBMITime(store_patientList);
                    // TODO: Add photos to patients in screener list
                    store_patientList.each(function (record) {
                        record.set('image', '/Raxa-JSS/src/screener/resources/pic.gif');
                    });
                }
                else{
                    Ext.Msg.alert("Error", Util.getMessageLoadError());
                }
            }
        });
        store_assignedPatientList.load();
        // TODO: Pass a function instead of string, to avoid implied "eval"
        // TODO: Does this actually refresh on the specified interval? tried
        // with 5000 and it doesnt work..
        /*setInterval(this.updatePatientsWaitingTitle, Util.getUiTime());*/
        /*setInterval('this.updatePatientsWaitingTitle', 5000);*/
        setInterval('this.updatePatientsWaitingTitle', Util.getUiTime());
        setInterval('Ext.getStore(\'patientStore\').load()', Util.getUiTime());
        return store_patientList;
    },
    // returns dynamically changed URL for getting patientList
    getPatientListUrl: function (inListUuid, notInListUuid, encountertype) {
        return (HOST + '/ws/rest/v1/raxacore/patientlist' + '?inList=' + inListUuid + '&notInList=' + notInListUuid + '&encounterType=' + encountertype);
    },

    //add new drug order form 
    addDrugForm: function () {
        form_num++;
        var endOfForm = 5;
        this.getPharmacyForm().insert(endOfForm, {
            xtype: 'drugStore',
            id: 'form' + form_num,
            width: '350px',
            height: '320px',
            scrollable: false
        });
    },
    // remove last drug order form
    removeDrugForm: function () {
        if (form_num > 0) {
            Ext.getCmp('form' + form_num).remove({
                autoDestroy: true
            });
            Ext.getCmp('form' + form_num).hide();
            form_num--;
        }
    },
    //function for posting the drug order
    /* steps - get the drugs form server using get call on drugs
     *       - get call on cencept to search for the concept related to drug with query as drug name selected
     *       - post the order with "concept", "patient", "drug", and most important "type" as "drugtype" */
    drugsubmit: function () {
        // one of the patient should be selected for posting drug order
        if (this.getPatientList().getSelection()[0] !== null) {
            //this is the array of stores for getting the drugs concept uuid
            var concept = [];
            // this is the array of object for drug orders
            var order = [];
            var numberOfLoadedConcepts = 0;
            for (i = 0; i <= form_num; i++) {
                // value of Url for get call is made here using name of drug
                var Url = HOST + '/ws/rest/v1/concept?q=';
                Url = Url + Ext.getCmp('form' + i).getAt(0).getAt(0)._value.data.text;
                concept.push(Ext.create('Screener.store.drugConcept'));
                // setting up the proxy for store with the above Url
                concept[i].setProxy({
                    type: 'rest',
                    url: Url,
                    headers: Util.getBasicAuthHeaders(),
                    reader: {
                        type: 'json',
                        rootProperty: 'results'
                    }
                });
                var startdate = new Date();
                // value of end date depending on the duration 
                var enddate;
                if (Ext.getCmp('form' + i).getValues().duration == "1w") {
                    enddate = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate() + 7);
                }
                if (Ext.getCmp('form' + i).getValues().duration == "1m") {
                    enddate = new Date(startdate.getFullYear(), startdate.getMonth() + 1, startdate.getDate());
                }
                if (Ext.getCmp('form' + i).getValues().duration == "2m") {
                    enddate = new Date(startdate.getFullYear(), startdate.getMonth() + 2, startdate.getDate());
                }
                // model for drug order is created here
                order.push({
                    patient: this.getPatientList().getSelection()[0].getData().uuid,
                    drug: Ext.getCmp('form' + i).getValues().drug,
                    startDate: startdate,
                    autoExpireDate: enddate,
                    dose: Ext.getCmp('form' + i).getValues().strength,
                    quantity: Ext.getCmp('form' + i).getValues().quantity,
                    frequency: Ext.getCmp('form' + i).getValues().frequency,
                    instructions: Ext.getCmp('form' + i).getValues().Instruction,
                    // type should be "drugorder" in order to post a drug order
                    type: 'drugorder'
                });
                if (order[i].instructions === "") {
                    order[i].instructions = "-";
                }
                // here it makes the get call for concept of related drug
                concept[i].load({
                    scope: this,
                    callback: function(records, operation, success){
                        if(success){
                            numberOfLoadedConcepts++;
                            // value of k is compared with the no of drug forms
                            if (numberOfLoadedConcepts == form_num + 1) {
                                for (var j = 0; j <= form_num; j++) {
                                    order[j].concept = concept[j].getAt(0).getData().uuid
                                }
                                var time = Util.Datetime(startdate, Util.getUTCGMTdiff());
                                // model for posting the encounter for given drug orders
                                var encounter = Ext.create('Screener.model.drugEncounter', {
                                    patient: this.getPatientList().getSelection()[0].getData().uuid,
                                    // this is the encounter for the prescription encounterType
                                    encounterType: localStorage.prescriptionUuidencountertype,
                                    encounterDatetime: time,
                                    orders: order
                                })
                                var encounterStore = Ext.create('Screener.store.drugEncounter')
                                encounterStore.add(encounter)
                                // make post call for encounter
                                encounterStore.sync()
                                encounterStore.on('write', function () {
                                    Ext.Msg.alert('Successful')
                                }, this)
                            }
                        }
                        else{
                            Ext.Msg.alert("Error", Util.getMessageLoadError());
                        }
                    }
                });
            }
        } else Ext.Msg.alert("please select a patient")
    },

    // Adds another lab order form
    addLabOrder: function () {
        lab_num++;
        var endOfForm = 6;
        this.getLabOrderForm().insert(endOfForm, {
            xtype: 'labStore',
            id: 'lab' + lab_num,
            width: '350px',
            height: '150px'
        });
    },
	
    // Removes last lab order form
    removeLabOrder: function () {
        if (lab_num > 0) {
            Ext.getCmp('lab' + lab_num).remove({
                autoDestroy: true
            });
            Ext.getCmp('lab' + lab_num).hide();
            lab_num--;
        }
    },
    // Opens form for creating new patient
    addPerson: function () {
        if (!this.newPatient) {
            this.newPatient = Ext.create('Screener.view.NewPatient');
            Ext.Viewport.add(this.newPatient);
        }
        // Set new FIFO id so patients come and go in the queue!
        //this.getFormid().setValue(this.totalPatients);
        this.newPatient.show();
    },
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
            if( formp.dob !== "" && formp.dob.length > 0 ) {
                newPatient.birthdate =  formp.dob;
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
                    this.getidentifierstype(JSON.parse(response.responseText).uuid);
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
      
    // Get IdentifierType using IdentifierType store 
    getidentifierstype: function (personUuid) {
        var identifiers = Ext.create('Screener.store.IdentifierType')
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
        var locations = Ext.create('Screener.store.Location')
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
    // Creates a new patient using NewPatients store 
    makePatient: function (personUuid, identifierType, location) {
        var patient = Ext.create('Screener.model.NewPatient', {
            person: personUuid,
            identifiers: [{
                identifier: Util.getPatientIdentifier().toString(),
                identifierType: identifierType,
                location: location,
                preferred: true
            }]
        });
        var PatientStore = Ext.create('Screener.store.NewPatients')
        PatientStore.add(patient);
        PatientStore.sync();
        PatientStore.on('write', function () {
            // TODO: https://raxaemr.atlassian.net/browse/TODO-67
            // Need to add location to OpenMRS for screenerUuidlocation
            this.sendEncounterData(personUuid, localStorage.regUuidencountertype, localStorage.screenerUuidlocation, localStorage.loggedInUser)
        }, this)
    },

    // Show screen with patient list
    showPatients: function () {
        if (Ext.getCmp('doctorSummary')) {
            Ext.getCmp('doctorSummary').hide();
        }
        
        this.navigate(Util.PAGES.SCREENER.ASSIGN_PATIENTS, Util.PAGES.SCREENER.TOP_MENU);

        // TODO: https://raxaemr.atlassian.net/browse/RAXAJSS-360
        // Deselect to prevent lists in other views from affecting
        /*this.getDoctorList().deselectAll();*/
        this.getPatientList().deselectAll();

        this.updatePatientsWaitingTitle();
        this.countPatients();
    },
    // Counts number of patients assigned to a doctor   
    countPatients: function () {
        //store = Ext.create('Screener.store.AssignedPatientList');
        var patientStore = Ext.getStore('assPatientStore');
        var docStore = Ext.create('Screener.store.Doctors');
        docStore.on('load', function () {
            patientStore.load();
            patientStore.on('load', function () {
                for (var i = 0; i < docStore.getData().length; i++) {
                    var count = 0;
                    var patients = patientStore.getData().items[0].getData().patients;
                    for (var j = 0; j < patients.length; j++) {
                        if (docStore.data.items[i].data.person != null) {
                            if (docStore.data.items[i].data.person.uuid == patients[j].encounters[0].provider) {
                                count = count + 1;
                            }
                        }
                    }
                    docStore.getAt(i).getData().numpatients = count
                }
                Ext.getCmp('doctorList').setStore(docStore)
                return docStore
            }, this)
        }, this)
    },
    // Show screen with pharmacy list
    showPharmacy: function () {
        this.navigate(Util.PAGES.SCREENER.PHARMACY_ORDER, Util.PAGES.SCREENER.TOP_MENU);
        
        // TODO: I'm not sure if we want to destroy other orders. Might we
        // instead preserve them in case nurse enters some, leaves page, and
        // then returns? Only on submit should they reset.
        while (form_num > 0) {
            Ext.getCmp('form' + form_num).remove({
                autoDestroy: true
            });
            Ext.getCmp('form' + form_num).hide();
            form_num--;
        }
        this.updatePatientsWaitingTitle();
    },
    showLab: function () {
        this.navigate(Util.PAGES.SCREENER.LAB_ORDER, Util.PAGES.SCREENER.TOP_MENU);
       
        // TODO: I'm not sure if we want to destroy other orders. Might we
        // instead preserve them in case nurse enters some, leaves page, and
        // then returns? Only on submit should they reset.
        while (lab_num > 0) {
            Ext.getCmp('lab' + lab_num).remove({
                autoDestroy: true
            });
            Ext.getCmp('lab' + lab_num).hide();
            lab_num--;
        }
        this.updatePatientsWaitingTitle();
    },
    showVitals: function () {
        this.navigate(Util.PAGES.SCREENER.VITALS, Util.PAGES.SCREENER.TOP_MENU);
       
        var vpl = this.getVitalsPatientList().getComponent("patientList"); 
        vpl.deselectAll();

        // TODO: https://raxaemr.atlassian.net/browse/RAXAJSS-366
        // Get most recent vitals

        // Update # of patients waiting
        this.updatePatientsWaitingTitle();
    },
    // opens form for patient summary
    showPatientSummary: function (list, item, index) {
        if (!this.patientSummary) {
            this.patientSummary = Ext.create('Screener.view.PatientSummary');
        }
        Ext.getCmp('name').setValue(Ext.getStore('patientStore').getData().all[item].data.display);
        Ext.Viewport.add(this.patientSummary);
        Ext.getCmp('patientSummary').setHidden(false);
        var uuid = Ext.getStore('patientStore').getData().all[item].data.uuid;
        var store = Ext.create('Screener.store.PatientSummary');
        store.getProxy().setUrl(HOST + '/ws/rest/v1/encounter?patient=' + uuid);
        store.load({
            callback: function (records, operation, success) {
                for (i = 1; i <= 5; i++) {
                    Ext.getCmp(i).setHtml("");
                    Ext.getCmp(i).setHtml(store.last().raw.obs[i - 1].display);
                }
            },
            scope: this
        });
    },
    showDoctorSummary: function (list, item, index) {
        if (!this.doctorSummary) {
            this.doctorSummary = Ext.create('Screener.view.DoctorSummary');
        }
        Ext.Viewport.add(this.doctorSummary);
        Ext.getCmp('doctorSummary').setHidden(false);
        this.getRemoveButton().disable();
        this.getAssignedPatientList(list, item, index);
    },
    //gets a list of all patients assigned to a doctor
    getAssignedPatientList: function (list, item, index) {
        pStore = Ext.create('Ext.data.Store', {
            fields: ['uuid', 'name', 'encuuid'],
            data: null
        });
        Ext.getCmp('assignedPatientList').setStore(pStore)
        store = Ext.getStore('assPatientStore')
        docStore = Ext.create('Screener.store.Doctors')
        docStore.on('load', function () {
            store.load();
            store.on('load', function () {
                var count = [];
                for (var j = 0; j < store.getData().items[0].getData().patients.length; j++) {
                    if (docStore.data.items[item].data.person != null) {
                        if (docStore.data.items[item].data.person.uuid == store.getData().items[0].getData().patients[j].encounters[0].provider) {
                            count.push({
                                uuid: store.getData().items[0].getData().patients[j].uuid,
                                name: store.getData().items[0].getData().patients[j].display,
                                encuuid: store.getData().items[0].getData().patients[j].encounters[0].uuid
                            });
                        }
                    }
                }
                pStore.setData(count);
                return pStore
            })
        })
    },
    //keeping track of which patient/doctor is currently selected
    //if both are selected, enable the ASSIGN button
    setCurrentPatient: function (list, index, target, record) {
        this.currentPatientIndex = index;
        if (this.getDoctorList().hasSelection()) {
            this.getAssignButton().enable();
        }
    },
    setCurrentDoctor: function (list, index, target, record) {
        this.currentDoctorIndex = index;
        if (this.getPatientList().hasSelection()) {
            this.getAssignButton().enable();
        }
    },
    //shows panel, allows us to choose what we want to sort by
    sortList: function () {
        if (!this.sortView) {
            this.sortView = Ext.create('Screener.view.Sort');
            Ext.Viewport.add(this.sortView);
        }
        this.getSortPanel().show();
    },
    sortByName: function () {
        Ext.getStore('patientStore').sort('display');
        this.setSortButtonUi('ListView #sortName', 'ListView #sortBMI', 'ListView #sortFIFO');
    },
    sortByFIFO: function () {
        Ext.getStore('patientStore').sort('time');
        this.setSortButtonUi('ListView #sortFIFO', 'ListView #sortName', 'ListView #sortBMI');
    },
    sortByBMI: function () {
        Ext.getStore('patientStore').sort('bmi');
        this.setSortButtonUi('ListView #sortBMI', 'ListView #sortFIFO', 'ListView #sortName');
    },
    //this method refreshes the patientList and also updates the patientWaitingTitle and bmi, encountertime locally in patient model 
    refreshList: function () {
        Ext.getStore('patientStore').load({
            scope: this,
            callback: function(records, operation, success){
                if(success){
                    this.updatePatientsWaitingTitle();
                    this.setComplaintBMITime(Ext.getStore('patientStore'));
                }
                else{
                    Ext.Msg.alert("Error", Util.getMessageLoadError());
                }
            }
        });
    },


    //if patient and doctor are both selected, removes patient from list, increases numpatients for doctor,
    //and adds patient to the patients() store in the doctor
    assignPatient: function () {
        var currentNumPatients = Ext.getStore('Doctors').getAt(this.currentDoctorIndex).get('numpatients') + 1;
        Ext.getStore('Doctors').getAt(this.currentDoctorIndex).set('numpatients', currentNumPatients);
        this.getPatientList().getSelection()[0].set('patientid', this.currentDoctorIndex);
        var patient = this.getPatientList().getSelection()[0].data.uuid;
        var provider = Ext.getStore('Doctors').getAt(this.currentDoctorIndex).data.person.uuid;
        Ext.getStore('patientStore').removeAt(this.currentPatientIndex);
        this.getPatientList().deselectAll();
        this.getDoctorList().deselectAll();
        this.getAssignButton().disable();
        // TODO: https://raxaemr.atlassian.net/browse/TODO-67#comment-12611
        // Need to add location to OpenMRS for waitingUuidlocation
        this.sendEncounterData(patient, localStorage.screenerUuidencountertype, localStorage.waitingUuidlocation, provider)
        this.countPatients();
    },
    // unassign a patient assigned to a doctor
    removePatient: function () {
        objectRef = this;
        var uuid = Ext.getCmp('assignedPatientList').getStore().getAt(objectRef.currentPatientIndex).getData().encuuid
        Ext.Ajax.request({
            url: HOST + '/ws/rest/v1/encounter/' + uuid + '?!purge',
            withCredentials: true,
            useDefaultXhrHeader: false,
            method: 'DELETE',
            headers: Util.getBasicAuthHeaders(),
            success: function () {
                Ext.getStore('patientStore').load()
                objectRef.showPatients()
            },
            failure: function() {
                Ext.Msg.alert("Error", Util.getMessageSyncError());
            }
        });
        this.getRemoveButton().disable();
        return uuid
    },
    // unassign all patients assigned to a doctor
    removeAllPatients: function () {
        objectRef = this;
        Ext.Msg.confirm("Confirmation", "Are you sure you want to remove all patients?", function (btn) {
            if (btn == 'yes') {
                for (i = 0; i < Ext.getCmp('assignedPatientList').getStore().getCount(); i++) {
                    var uuid = Ext.getCmp('assignedPatientList').getStore().getAt(i).getData().encuuid
                    Ext.Ajax.request({
                        url: HOST + '/ws/rest/v1/encounter/' + uuid + '?!purge',
                        withCredentials: true,
                        useDefaultXhrHeader: false,
                        method: 'DELETE',
                        headers: Util.getBasicAuthHeaders(),
                        failure: function() {
                            Ext.Msg.alert("Error", Util.getMessageSyncError());
                        }
                    });
                }
                Ext.getStore('patientStore').load()
                objectRef.showPatients()
            } else {}
        });
    },

    //opens the current doctor's waiting list
    expandCurrentDoctor: function (list, index, target, record) {
        this.currentDoctorIndex = index;
        this.getCurrentPatients().setStore(Ext.getStore('doctorStore').getAt(index).patients());
        this.getRemoveAllPatientsButton().enable();
    },
    //if a current patient is selected, allow us to remove it
    currentPatientsTapped: function (list, index, target, record) {
        console.log(index);
        this.currentPatientIndex = index;
        this.getRemovePatientButton().enable();
    },
    expandAssignedPatient: function (list, index, target, record) {
        this.currentPatientIndex = index;
        this.getRemoveButton().enable();
    },
    //helper function to remove a single patient
    removeAPatient: function (patient) {
        patient.set('doctorid', - 1);
        Ext.getStore('patientStore').add(patient);
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
            Ext.getStore('patientStore').load();
        }, this);
        return store;
    },

    // Create a SCREENER_VITALS encounter and attach vitals observations
    savePatientVitals: function () {
        var vpl = this.getVitalsPatientList().getComponent("patientList"); 
        var selectedPatient  = vpl.getSelection()[0];
        if ( ! selectedPatient) {
            Ext.Msg.alert("You must select a patient");
            return;
        }
        var patientUuid = selectedPatient.data.uuid;
        vpl.deselectAll();

        var providerPersonUuid = localStorage.loggedInUser;
        this.sendEncounterData(patientUuid, localStorage.screenervitalsUuidencountertype, "", providerPersonUuid);
        Ext.Msg.alert("Submitted patient vitals");
    },
    
    // Create a SCREENER_VITALS encounter and attach vitals observations
    savePatientVitals: function () {
        var vpl = this.getVitalsPatientList().getComponent("patientList"); 
        var selectedPatient  = vpl.getSelection()[0];
        if ( ! selectedPatient) {
            Ext.Msg.alert("You must select a patient");
            return;
        }
        var patientUuid = selectedPatient.data.uuid;
        vpl.deselectAll();

        var providerPersonUuid = localStorage.loggedInUser;
        this.sendEncounterData(patientUuid, localStorage.screenervitalsUuidencountertype, "", providerPersonUuid);
        Ext.Msg.alert("Submitted patient vitals");
    },

    drugSubmit: function () {
        objectRef = this;
        // changes the button text to 'Confirm' and 'Cancel'
        var MB = Ext.MessageBox;
        Ext.apply(MB, {
            YES: {
                text: 'Confirm',
                itemId: 'yes',
                ui: 'action'
            },
            NO: {
                text: 'Cancel',
                itemId: 'no'
            }
        });
        Ext.apply(MB, {
            YESNO: [MB.NO, MB.YES]
        });
        // on-click, launch MessageBox
        Ext.get('drugSubmitButton').on('click', function (e) {
            Ext.Msg.confirm("Confirmation", "Are you sure you want to submit your Pharmacy Order?", Ext.emptyFn);
        });
    },

    // TODO: Possible to get oldPage via application state?
    navigate: function(newPage, oldPage) {
        this.getView().setActiveItem(newPage);
        
    // Add back button to toolbar which points to old page
    },
    
    onDateChange: function() {
        var dob = Ext.getCmp('dob').getValue();
        if( dob !== "" && dob.length > 0 ) {
            var currentDate = new Date();
            var enteredDate = Ext.Date.parse(dob, "Y-n-j" , true);
            if(enteredDate === null || enteredDate === undefined) {
                Ext.getCmp('dob').reset();
                Ext.Msg.alert("Invalid date format","Should be in correct format and less then current date");
            } 
            else if(enteredDate > currentDate ) {
                Ext.getCmp('dob').reset();
                Ext.Msg.alert("Invalid date format","Should be in correct format and less then current date");
            }
        }
    },
    
    onAgeChange : function() {
        var patientAge = Ext.getCmp('patientAge').getValue();
        if ( patientAge !== "" && patientAge.length > 0) {
            if( Ext.isNumeric(patientAge) && patientAge < Util.OPEN_MRS_MAX_AGE && patientAge >= Util.OPEN_MRS_MIN_AGE ) {
            } else {
                Ext.getCmp('patientAge').reset();
                Ext.Msg.alert("Error" , 'Age must be an integer and in between 0 and 119');
            }
        }
    }
});
