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
Ext.define("Screener.controller.Application", {
    requires: ['Screener.store.Doctors', 'Screener.store.NewPatients', 'Screener.store.NewPersons', 'Screener.store.IdentifierType', 'Screener.store.Location', 'Screener.view.PharmacyForm', 'Screener.view.PatientListView'],
    models: ['Screener.model.Person'],
    extend: 'Ext.app.Controller',
    config: {
        //here we name the elements we need from the page
        refs: {
            view: 'mainView',
            topmenu: 'topmenu',
            navBar: '#navBar',
            patientView: 'patientView',
            patientSummary: 'patientSummary',
            doctorView: 'doctorView',
            labOrderForm: 'labOrderForm',
            pharmacyView: 'pharmacyView',
            labOrderView: 'labOrderView',
            pharmacyForm: 'pharmacyForm',
            newPatient: 'newPatient',
            sortPanel: 'sortPanel',
            patientList: '#patientList',
            doctorList: '#doctorList',
            expandDoctorList: '#expandDoctorList',
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
            sortButton: '#sortButton',
            drugSubmitButton: '#drugSubmitButton',
            addDrugFormButton: '#addDrugFormButton',
            addLabOrderButton: '#addLabOrderButton',
            removeDrugFormButton: '#removeDrugFormButton',
            sortByNameButton: '#sortByNameButton',
            sortByFIFOButton: '#sortByFIFOButton',
            sortByBMIButton: '#sortByBMIButton',
            removePatientButton: '#removePatientButton',
            removeAllPatientsButton: '#removeAllPatientsButton'
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
            sortButton: {
                tap: 'showSort'
            },
            drugSubmitButton: {
                tap: 'drugSubmit'
            },
            sortByNameButton: {
                tap: 'sortByName'
            },
            sortByFIFOButton: {
                tap: 'sortByFIFO'
            },
            sortByBMIButton: {
                tap: 'sortByBMI'
            },
            patientList: {
                itemtap: 'setCurrentPatient',
                itemtaphold: 'showPatientSummary'
            },
            doctorList: {
                itemtap: 'setCurrentDoctor'
            },
            expandDoctorList: {
                itemtap: 'expandCurrentDoctor'
            },
            currentPatients: {
                itemtap: 'currentPatientsTapped'
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
                /*function(){
                    this.drugsubmit(0)
                }*/
            }
        }
    },
    //adds the patient to the doctor using 'hasmany' association
    addToDoctor: function (patient) {
        doctorid = patient.get('doctorid');
        if (Ext.getStore('doctorStore').getAt(doctorid)) {
            //first we add the association to the patient model is linked to this doctor
            Ext.getStore('doctorStore').getAt(doctorid).patients().add(patient);
            //now we call function to increment number of patients
            Ext.getStore('doctorStore').getAt(doctorid).addPatient();
            Ext.getStore('patientStore').remove(patient);
        }
    },
    updatePatientsWaitingTitle: function () {
        Ext.getCmp('patientsWaiting').setTitle(Ext.getStore('patientStore').getCount() + ' Patients Waiting');
    },
    //called on startup
    init: function () {
        //Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", Ext.emptyFn);
        this.totalPatients = Ext.getStore('patientStore').getCount();
        Ext.getStore('patientStore').each(this.addToDoctor);
        form_num = 0;
        lab_num = 0;
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
    },
    ISODateString: function (d) {
        function pad(n) {
            return n < 10 ? '0' + n : n
        }
        return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + 'Z'
    },
    //function for posting the drug order
    /* steps - get the drugs form server using get call on drugs
     *       - get call on cencept to search for the concept related to drug with query as drug name selected
     *       - post the order with "concept", "patient", "drug", and most important "type" as "drugtype" */
    drugsubmit: function () {
        // one of the patient should be selected for posting drug order
        if (Ext.getCmp('patientList').getSelection()[0] != null) {
            concept = new Array();
            order = new Array();
            var k = 0,
                l = 0;
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
                // value of end date depending on the duration 
                var enddate
                if (Ext.getCmp('form' + i).getValues().duration == "1w") enddate = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate() + 7);
                if (Ext.getCmp('form' + i).getValues().duration == "1m") enddate = new Date(startdate.getFullYear(), startdate.getMonth() + 1, startdate.getDate());
                if (Ext.getCmp('form' + i).getValues().duration == "2m") enddate = new Date(startdate.getFullYear(), startdate.getMonth() + 2, startdate.getDate());
                // model for drug order is created here
                order.push({
                    patient: Ext.getCmp('patientList').getSelection()[0].getData().uuid,
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
                    if (k == form_num + 1) {
                        for (var j = 0; j <= form_num; j++) {
                            order[j].concept = concept[j].getAt(0).getData().uuid
                        }
                        var time = this.ISODateString(startdate)
                        // model for posting the encounter for given drug orders
                        var encounter = Ext.create('Screener.model.drugEncounter', {
                            patient: Ext.getCmp('patientList').getSelection()[0].getData().uuid,
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
    savePerson: function() {
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
        PatientStore.on('write', function () {}, this)
    },
    //function to show screen with patient list
    showPatients: function () {
        if (!this.patientView) {
            this.patientView = Ext.create('Screener.view.PatientView');
        }
        this.getDoctorList().deselectAll();
        this.getView().push(this.patientView);
    },
    //function to show screen with doctor list
    showDoctors: function () {
        if (!this.doctorView) {
            this.doctorView = Ext.create('Screener.view.DoctorView');
        }
        this.getExpandDoctorList().deselectAll();
        this.getView().push(this.doctorView);
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
    },
    // opens form for patient summary
    showPatientSummary: function () {
        if (!this.patientSummary) {
            this.patientSummary = Ext.create('Screener.view.PatientSummary');
        }
        Ext.Viewport.add(this.patientSummary);
        Ext.getCmp('patientSummary').setHidden(false);
    },
    //keeping track of which patient/doctor is currently selected
    //if both are selected, enable the ASSIGN button
    setCurrentPatient: function (list, index, target, record) {
        this.currentPatientIndex = index;
        if (this.patientView && this.getDoctorList().hasSelection()) {
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
    showSort: function () {
        if (!this.sortView) {
            this.sortView = Ext.create('Screener.view.Sort');
            Ext.Viewport.add(this.sortView);
        }
        this.getSortPanel().show();
    },
    sortByName: function () {
        Ext.getStore('patientStore').sort('lastname');
        this.getSortPanel().hide();
    },
    sortByFIFO: function () {
        Ext.getStore('patientStore').sort('id');
        this.getSortPanel().hide();
    },
    sortByBMI: function () {
        Ext.getStore('patientStore').sort('bmi');
        this.getSortPanel().hide();
    },
    //if patient and doctor are both selected, removes patient from list, increases numpatients for doctor,
    //and adds patient to the patients() store in the doctor
    assignPatient: function () {
        currentNumPatients = Ext.getStore('doctorStore').getAt(this.currentDoctorIndex).get('numpatients') + 1;
        Ext.getStore('doctorStore').getAt(this.currentDoctorIndex).set('numpatients', currentNumPatients);
        Ext.getStore('doctorStore').getAt(this.currentDoctorIndex).patients().add(Ext.getStore('patientStore').getAt(this.currentPatientIndex));
        Ext.getStore('patientStore').getAt(this.currentPatientIndex).set('patientid', this.currentDoctorIndex);
        Ext.getStore('patientStore').removeAt(this.currentPatientIndex);
        this.getPatientList().deselectAll();
        this.getDoctorList().deselectAll();
        this.getAssignButton().disable();

    },
    //opens the current doctor's waiting list
    expandCurrentDoctor: function (list, index, target, record) {
        this.currentDoctorIndex = index;
        this.getCurrentPatients().setStore(Ext.getStore('doctorStore').getAt(index).patients());
        this.getRemoveAllPatientsButton().enable();
    },
    //if a current patient is selected, allow us to remove it
    currentPatientsTapped: function (list, index, target, record) {
        this.currentPatientIndex = index;
        this.getRemovePatientButton().enable();
    },
    //removes one patient from the current doctor
    removePatient: function () {
        objectRef = this;
        Ext.Msg.confirm("Confirmation", "Are you sure you want to remove selected patient?", function (btn) {
            if (btn == 'yes') {
                objectRef.removeAPatient(Ext.getStore('doctorStore').getAt(objectRef.currentDoctorIndex).patients().getAt(objectRef.currentPatientIndex));
                numPatients = Ext.getStore('doctorStore').getAt(objectRef.currentDoctorIndex).get('numpatients');
                Ext.getStore('doctorStore').getAt(objectRef.currentDoctorIndex).set('numpatients', numPatients - 1);
                Ext.getStore('doctorStore').getAt(objectRef.currentDoctorIndex).patients().removeAt(objectRef.currentPatientIndex);
                objectRef.getRemovePatientButton().disable();
            } else {}
        });
    },
    //helper function to remove a single patient
    removeAPatient: function (patient) {
        patient.set('doctorid', -1);
        Ext.getStore('patientStore').add(patient);
    },
    //removes all patients from the current doctor
    removeAllPatients: function () {
        objectRef = this;
        Ext.Msg.confirm("Confirmation", "Are you sure you want to remove all patients?", function (btn) {
            if (btn == 'yes') {
                Ext.getStore('doctorStore').getAt(objectRef.currentDoctorIndex).patients().each(objectRef.removeAPatient);
                for (i = 0; i < Ext.getStore('doctorStore').getAt(objectRef.currentDoctorIndex).get('numpatients'); i++) {
                    Ext.getStore('doctorStore').getAt(objectRef.currentDoctorIndex).patients().removeAt(0);
                }
                Ext.getStore('doctorStore').getAt(objectRef.currentDoctorIndex).set('numpatients', 0);
            } else {

            }
        });
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