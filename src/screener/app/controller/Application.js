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
/**
 * This class listens for the user input and makes changes to the doctor/patient
 * lists as necessary.
 */
var form_num, lab_num;
var patientUpdate = {
    updatePatientsWaitingTitle: function () {
        var patientsTitles = Ext.ComponentQuery.query('ListView #patientsWaiting');
        var patientWaitNumber = Ext.getStore('patientStore').getCount();
        var i;
        for (i = 0; i < patientsTitles.length; i++) {
            patientsTitles[i].setTitle(patientWaitNumber + ' Patients Waiting');
        }
    },
    setBMITime: function (store_patientList) {
        var i;
        for (i = 0; i < store_patientList.getCount(); i++) {
            store_patientList.getAt(i).getData().time = store_patientList.getAt(i).getData().encounters[store_patientList.getAt(i).getData().encounters.length - 1].encounterDatetime;
            if (store_patientList.getAt(i).getData().encounters[store_patientList.getAt(i).getData().encounters.length - 1].obs.length != 0) {
                store_patientList.getAt(i).getData().bmi = store_patientList.getAt(i).getData().encounters[store_patientList.getAt(i).getData().encounters.length - 1].obs[patientUpdate.getObsBMI(store_patientList.getAt(i).getData().encounters[store_patientList.getAt(i).getData().encounters.length - 1].obs)].value;
            }
        }
        Ext.getStore('patientStore').sort('display');
    },
    getObsBMI: function (obs) {
        var i;
        //console.log(obs)
        for (i = 0; i < obs.length; i++) {
            if (obs[i].display.indexOf('BODY MASS INDEX') != -1) {
                ind = i;
                return i;
            }
        }
    },
    setSortButtonUi: function (string1_decline, string2_normal, string3_normal) {
        this.setCompQuery(string1_decline,'decline');
        this.setCompQuery(string2_normal,'normal');
        this.setCompQuery(string3_normal,'normal');
    },
    setCompQuery : function (string1,uiType) {
        var i;
        for (i = 0; i < Ext.ComponentQuery.query(string1).length; i++) {
            Ext.ComponentQuery.query(string1)[i].setUi(uiType);
        }
    }
		

};
Ext.define("Screener.controller.Application", {
    requires: ['Screener.store.Doctors', 'Screener.store.NewPatients', 'Screener.store.PatientList', 'Screener.store.NewPersons', 'Screener.store.IdentifierType', 'Screener.store.Location', 'Screener.view.PharmacyForm', 'Screener.view.PatientListView', 'Screener.view.PharmacyForm', 'Screener.view.PatientListView', 'Screener.store.AssignedPatientList'],
    models: ['Screener.model.Person', 'Screener.mosel.PostList', 'Screener.mosel.Patients'],
    extend: 'Ext.app.Controller',
    config: {
        //here we name the elements we need from the page
        refs: {
            view: 'mainView',
            topmenu: 'topmenu',
            navBar: '#navBar',
            patientView: 'patientView',
            patientSummary: 'patientSummary',
            doctorSummary: 'doctorSummary',
            labOrderForm: 'labOrderForm',
            pharmacyView: 'pharmacyView',
            labOrderView: 'labOrderView',
            pharmacyForm: 'pharmacyForm',
            newPatient: 'newPatient',
            sortPanel: 'sortPanel',
            patientList: '#patientList',
            doctorList: '#doctorList',
            expandDoctorList: '#expandDoctorList',
            assignedPatientList: '#assignedPatientList',
            currentPatients: '#currentPatients',
            doctorStore: 'doctorStore',
            "'form'+form_num": 'form' + form_num,
            formid: '#formid',
            addPatientButton: '#addPatientButton',
            showPatientsButton: '#showPatientsButton',
            showPharmacyButton: '#showPharmacyButton',
            showLabButton: '#showLabButton',
            showDoctorsButton: '#showDoctorsButton',
            savePatientButton: '#savePatientButton',
            assignButton: '#assignButton',
            removeButton: '#removeButton',
            sortButton: '#sortButton',
            refreshButton: '#refreshButton',
            drugSubmitButton: '#drugSubmitButton',
            addDrugFormButton: '#addDrugFormButton',
            addLabOrderButton: '#addLabOrderButton',
            removeDrugFormButton: '#removeDrugFormButton',
            sortByNameButton: '#sortByNameButton',
            sortByFIFOButton: '#sortByFIFOButton',
            sortByBMIButton: '#sortByBMIButton',
            removePatientButton: '#removePatientButton',
            removeAllPatientsButton: '#removeAllPatientsButton',
            patientListView: '#patientListViewId',
            PatientsWaiting: '#patientsWaiting'
        },
        //now we define all our listening methods
        control: {
            addDrugFormButton: {
                tap: 'addDrugForm'
            },
            addLabOrderButton: {
                tap: 'addLabOrder'
            },
            addPatientButton: {
                tap: 'addPerson'
            },
            showPatientsButton: {
                tap: 'showPatients'
            },
            savePatientButton: {
                tap: 'savePerson'
            },
            showDoctorsButton: {
                tap: 'showDoctors'
            },
            showPharmacyButton: {
                tap: 'showPharmacy'
            },
            showLabButton: {
                tap: 'showLab'
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
            drugSubmitButton: {
                tap: 'drugSubmit'
            },
            'patientListView button[action=sortByName]': {
                tap: 'sortByName'
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
            },
            drugSubmitButton: {
                tap: 'drugsubmit'

            }
        }
    },

    //called on startup
    init: function () {
        form_num = 0;
        lab_num = 0;
        this.getpatientlist();

    },

    // Creates an instance of PostList model for posting Registration and Screener List
    getpatientlist: function () {
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
        //this.createRegList(list_regEncounter, list_scrEncounter);
        var k = 0;
        this.createList(list_regEncounter, list_scrEncounter, list_outEncounter, k);

    },
    // Creates two different List of Patients Registered and Patients Screened within last 24 hours
    createList: function (list_reg, list_scr, list_out, k) {
        var store_reg = Ext.create('Screener.store.PostLists');
        var store_scr = Ext.create('Screener.store.PostLists');
        var store_out = Ext.create('Screener.store.PostLists')
        store_reg.add(list_reg);
        store_scr.add(list_scr);
        store_out.add(list_out);
        store_reg.sync();
        store_scr.sync();
        store_out.sync();
        store_reg.on('write', function () {
            k = k + 1;
            if (k == 3) {
                this.finalPatientList(store_reg, store_scr, store_out);
            }
        }, this);
        store_scr.on('write', function () {
            k = k + 1;
            if (k == 3) {
                this.finalPatientList(store_reg, store_scr, store_out);
            }
        }, this);
        store_out.on('write', function () {
            k = k + 1;
            if (k == 3) {
                this.finalPatientList(store_reg, store_scr, store_out);
            }
        }, this);
        var a = [store_reg, store_scr, store_out];
        return a;
    },

    // Creates List of Patients registered but not screened in last 24 hours
    finalPatientList: function (store_regEncounter, store_scrEncounter, store_outEncounter) {
        var store_patientList = Ext.create('Screener.store.PatientList', {
            storeId: 'patientStore'
        });
        var store_assPatientList = Ext.create('Screener.store.AssignedPatientList', {
            storeId: 'assPatientStore'
        })
        // Setting the url dynamically for store to store patients list
        store_patientList.getProxy().setUrl(this.getPatientListUrl(store_regEncounter.getData().getAt(0).getData().uuid, store_scrEncounter.getData().getAt(0).getData().uuid, localStorage.regUuidencountertype));
        store_assPatientList.getProxy().setUrl(this.getPatientListUrl(store_scrEncounter.getData().getAt(0).getData().uuid, store_outEncounter.getData().getAt(0).getData().uuid, localStorage.screenerUuidencountertype));
        store_patientList.load();
        store_assPatientList.load();
        store_patientList.on('load', function () {
            Ext.getCmp('loadMask').setHidden(true);
            patientUpdate.setBMITime(store_patientList);
            store_patientList.each(function (record) {
                record.set('image', '../resources/pic.gif');
            });
        }, this);
        setInterval('patientUpdate.updatePatientsWaitingTitle()', Util.getUiTime());
        setInterval('Ext.getStore(\'patientStore\').load()', Util.getUiTime());
        return store_patientList;
    },
    // returns dynamically changed URL for getting patientList
    getPatientListUrl: function (reg_UUID, scr_UUID, encountertype) {
        return (HOST + '/ws/rest/v1/raxacore/patientlist' + '?inList=' + reg_UUID + '&notInList=' + scr_UUID + '&encounterType=' + encountertype);
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
    removeDrugForm: function () {
        if (form_num > 0) {
            Ext.getCmp('form' + form_num).remove({
                autoDestroy: true
            });
            Ext.getCmp('form' + form_num).hide();
            form_num--;
        }
        store.getData().getAt(0).getData().uuid
    },
    //function for posting the drug order
    /* steps - get the drugs form server using get call on drugs
     *       - get call on cencept to search for the concept related to drug with query as drug name selected
     *       - post the order with "concept", "patient", "drug", and most important "type" as "drugtype" */
    drugsubmit: function () {
        // one of the patient should be selected for posting drug order
        if (this.getPatientList().getSelection()[0] != null) {
            //this is the array of stores for getting the drugs concept uuid
            concept = new Array();
            // this is the array of object for drug orders
            order = new Array();
            var k = 0;
            for (i = 0; i <= form_num; i++) {
                // value of Url for get call is made here using name of drug
                var Url = HOST + '/ws/rest/v1/concept?q='
                Url = Url + Ext.getCmp('form' + i).getAt(0).getAt(0)._value.data.text
                concept.push(Ext.create('Screener.store.drugConcept'))
                // setting up the proxy for store with the above Url
                concept[i].setProxy({
                    type: 'rest',
                    url: Url,
                    headers: Util.getBasicAuthHeaders(),
                    reader: {
                        type: 'json',
                        rootProperty: 'results'
                    }
                })
                var startdate = new Date()
                // setting up value of end date depending on the duration 
                var enddate
                if (Ext.getCmp('form' + i).getValues().duration == "1w") enddate = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate() + 7);
                if (Ext.getCmp('form' + i).getValues().duration == "1m") enddate = new Date(startdate.getFullYear(), startdate.getMonth() + 1, startdate.getDate());
                if (Ext.getCmp('form' + i).getValues().duration == "2m") enddate = new Date(startdate.getFullYear(), startdate.getMonth() + 2, startdate.getDate());
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
                })
                if (order[i].instructions == "") order[i].instructions = "-"
                // here it makes the get call for concept of related drug
                concept[i].load();
                // added a counter k which increment as a concept load successfully, after all the concept are loaded
                // value of k should be equal to the no. of drug forms
                concept[i].on('load', function () {
                    k = k + 1;
                    // value of k is compared with the no of drug forms
                    // if value of k = no. of form we make the post call for  prescrition encounter with drug  orders
                    if (k == form_num + 1) {
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
                            Ext.Msg.alert('successfull')
                        //Note- if we want add a TIMEOUT it shown added somewhere here
                        }, this)

                    }
                }, this);
            }
        } else Ext.Msg.alert("please select a patient")
    },
    addLabOrder: function () {
        lab_num++;
        var endOfForm = 6;
        this.getLabOrderForm().insert(endOfForm, {
            xtype: 'labStore',
            id: 'lab' + lab_num,
            width: '350px',
            height: '70px'
        });
    },
    //opens form for creating new patient
    addPerson: function () {
        if (!this.newPatient) {
            this.newPatient = Ext.create('Screener.view.NewPatient');
            Ext.Viewport.add(this.newPatient);
        }
        //set new FIFO id so patients come and go in the queue!
        //this.getFormid().setValue(this.totalPatients);
        this.newPatient.show();
    },
    //adds new person to the NewPersons store
    savePerson: function () {
        var formp = Ext.getCmp('newPatient').saveForm();

        if (formp.givenname && formp.familyname && formp.choice) {
            var person = Ext.create('Screener.model.Person', {
                gender: formp.choice,
                names: [{
                    givenName: formp.givenname,
                    familyName: formp.familyname
                }]
            });
            var store = Ext.create('Screener.store.NewPersons');
            store.add(person);
            store.sync();
            store.on('write', function () {
                this.getidentifierstype(store.getData().getAt(0).getData().uuid)
            }, this);
            Ext.getCmp('newPatient').hide();
            Ext.getCmp('newPatient').reset();
            return store;
        }
    },
    // get IdentifierType using IdentifierType store 
    getidentifierstype: function (personUuid) {
        var identifiers = Ext.create('Screener.store.IdentifierType')
        identifiers.load();
        identifiers.on('load', function () {
            this.getlocation(personUuid, identifiers.getAt(0).getData().uuid)
        }, this);
    },
    // get Location using Location store
    getlocation: function (personUuid, identifierType) {
        var locations = Ext.create('Screener.store.Location')
        locations.load();
        locations.on('load', function () {
            this.makePatient(personUuid, identifierType, locations.getAt(0).getData().uuid)
        }, this)
    },
    // creates a new patient using NewPatients store 
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
            this.sendEncounterData(personUuid, localStorage.regUuidencountertype, localStorage.screenerUuidlocation, localStorage.loggedInUser)
        }, this)
    },

    //function to show screen with patient list
    showPatients: function () {
        if (Ext.getCmp('doctorSummary')) {
            Ext.getCmp('doctorSummary').hide();
        }
        if (!this.patientView) {
            this.patientView = Ext.create('Screener.view.PatientView');
        }
        // this.getDoctorList().deselectAll();
        this.getView().push(this.patientView);
        patientUpdate.updatePatientsWaitingTitle();
        this.countPatients();
    },
    // counts number of patients assigned to a doctor   
    countPatients: function () {
        //store = Ext.create('Screener.store.AssignedPatientList');
        store = Ext.getStore('assPatientStore')
        docStore = Ext.create('Screener.store.Doctors')
        docStore.on('load', function () {
            store.load();
            store.on('load', function () {
                for (var i = 0; i < docStore.getData().length; i++) {
                    var count = 0;
                    for (var j = 0; j < store.getData().items[0].getData().patients.length; j++) {
                        if (docStore.data.items[i].data.person != null) {
                            if (docStore.data.items[i].data.person.uuid == store.getData().items[0].getData().patients[j].encounters[0].provider) {
                                count = count + 1;
                            }
                        }
                    }
                    docStore.getAt(i).getData().numpatients = count
                }
                Ext.getCmp('doctorList').setStore(docStore)
                return docStore
            })
        })
    },
    //function to show screen with pharmacy list
    showPharmacy: function () {
        if (!this.pharmacyView) {
            this.pharmacyView = Ext.create('Screener.view.PharmacyView');
            form_num = 0;
        }
        this.getView().push(this.pharmacyView);
        while (form_num > 0) {
            Ext.getCmp('form' + form_num).remove({
                autoDestroy: true
            });
            Ext.getCmp('form' + form_num).hide();
            form_num--;
        }
        patientUpdate.updatePatientsWaitingTitle();
    },
    showLab: function () {
        if (!this.labOrderView) {
            this.labOrderView = Ext.create('Screener.view.LabOrderView');
        }
        this.getView().push(this.labOrderView);
        while (lab_num > 0) {
            Ext.getCmp('lab' + lab_num).remove({
                autoDestroy: true
            });
            Ext.getCmp('lab' + lab_num).hide();
            lab_num--;
        }
        patientUpdate.updatePatientsWaitingTitle();
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
                // the operation object contains all of the details of the load operation
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
        patientUpdate.setSortButtonUi('ListView #sortName', 'ListView #sortBMI', 'ListView #sortFIFO');
    },
    sortByFIFO: function () {
        Ext.getStore('patientStore').sort('time');
        patientUpdate.setSortButtonUi('ListView #sortFIFO', 'ListView #sortName', 'ListView #sortBMI');
    },
    sortByBMI: function () {
        Ext.getStore('patientStore').sort('bmi');
        patientUpdate.setSortButtonUi('ListView #sortBMI', 'ListView #sortFIFO', 'ListView #sortName');
    },
    refreshList: function () {
        Ext.getStore('patientStore').load();
        Ext.getStore('patientStore').on('load', function () {
            patientUpdate.updatePatientsWaitingTitle();
            patientUpdate.setBMITime(Ext.getStore('patientStore'));
        });
    },


    //if patient and doctor are both selected, removes patient from list, increases numpatients for doctor,
    //and adds patient to the patients() store in the doctor
    assignPatient: function () {
        var currentNumPatients = Ext.getStore('Doctors').getAt(this.currentDoctorIndex).get('numpatients') + 1;
        Ext.getStore('Doctors').getAt(this.currentDoctorIndex).set('numpatients', currentNumPatients);
        this.getPatientList().getSelection()[0].set('patientid', this.currentDoctorIndex);
        var patient = this.getPatientList().getSelection()[0].data.uuid
        var provider = Ext.getStore('Doctors').getAt(this.currentDoctorIndex).data.person.uuid
        Ext.getStore('patientStore').removeAt(this.currentPatientIndex);
        this.getPatientList().deselectAll();
        this.getDoctorList().deselectAll();
        this.getAssignButton().disable();
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
                        headers: Util.getBasicAuthHeaders()
                    });
                }
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

    sendEncounterData: function (uuid, encountertype, location, provider) {
        //funciton to get the date in required format of the openMRS, since the default extjs4 format is not accepted
        var currentDate = new Date();
        // creates the encounter json object
        var jsonencounter = Ext.create('Screener.model.encounterpost', {
            encounterDatetime: Util.Datetime(currentDate, Util.getUTCGMTdiff()),
            patient: uuid, //you will get the uuid from ticket 144...pass it here
            encounterType: encountertype,
            //location: location,
            provider: provider
        });
        // the 3 fields "encounterDatetime, patient, encounterType" are obligatory fields rest are optional
        var store = Ext.create('Screener.store.encounterpost');
        store.add(jsonencounter);
        store.sync();
        store.on('write', function () {
            Ext.getStore('patientStore').load();
        }, this)
        return store
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
    }
});
