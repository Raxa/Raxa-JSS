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
var myRecord;
var loggedInDoc = '74eab850-7853-40e0-a79a-67cd72447eda';

var opd_observations = new Array();

Ext.define('RaxaEmr.Outpatient.controller.patientlist', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            main: 'mainview',
            contacts: 'patientlist',
            contact: '#contact',
            name: '#name',
            docname: '#docname',
            urgency: '#urgency',
            lastvisit: '#lastvisit',
            mainTabs: '#maintabs',
            medicationHistory: '#medicationhistory',
            refToDocButton: '#reftodocbutton',
            confirmLabResultHistoryButton: '#confirmlabresulthistory',
            confirmMedicationHistoryButton: '#confirmmedicationhistory',
            confirmReferToDocButton: '#confirmrefertodoc',
            cheifcomplain: '#cheifComplain',
            labinfo: '#labinfo',
            examlist: '#examList',
            signlist: '#signList',
            deletecomlain: '#deleteComlain',
            addduration: '#addDuration',
            saveduration: '#saveDuration',
            adddruginlist: '#addDrugInList',
            submithistory: '#submit-history',
            submitdrugs: '#submitDrugs',
            adddiagnosis: '#addDiagnosis',
            submitdiagnosis: '#submitDiagnosis',
            labordersearchfield: '#labordersearchfield',
            medicationhistorysearchfield: '#medicationhistorysearchfield',
            medicationhistorysortbydrugname: '#medicationhistorysortbydrugname',
            medicationhistorysortbydrugreaction: '#medicationhistorysortbydrugreaction',
            reftodocsearchfield: '#reftodocsearchfield',
            reftodocsortbydocname: '#reftodocsortbydocname',
            reftodocsortbyopdno: '#reftodocsortbyopdno',
            signfilterbysearchfield: '#signfilterbysearchfield',
        },

        control: {
            main: {
                push: 'onMainPush',
                pop: 'onMainPop'
            },
            contacts: {
                itemtap: 'onContactSelect'
            },
            signlist: {
                itemtap: 'onSignListSelect'
            },
            examlist: {
                itemtap: 'onExamListSelect'
            },
            name: {
                tap: 'sortByName'
            },
            docname: {
                tap: 'sortByDocName'
            },
            urgency: {
                tap: 'sortByUrgency'
            },
            lastvisit: {
                tap: 'sortByLastVisit'
            },
            medicationhistorysortbydrugname: {
                tap: 'medicationHistorySortByDrugName'
            },
            medicationhistorysortbydrugreaction: {
                tap: 'medicationHistorySortByDrugReaction'
            },
            reftodocsortbydocname: {
                tap: 'refToDocSortByDocName'
            },
            reftodocsortbyopdno: {
                tap: 'refToDocSortByOpdno'
            },
            medicationHistory: {
                tap: 'medicationHistoryAction'
            },
            refToDocButton: {
                tap: 'refToDocButton'
            },
            labinfo: {
                tap: 'labInfoAction'
            },
            searchfield: {
                clearicontap: 'patientListOnSearchClearIconTap',
                keyup: 'patientListOnSearchKeyUp'
            },
            labordersearchfield: {
                clearicontap: 'labOrderOnSearchClearIconTap',
                keyup: 'labOrderOnSearchKeyUp'
            },
            medicationhistorysearchfield: {
                clearicontap: 'medicationHistoryOnSearchClearIconTap',
                keyup: 'medicationHistoryOnSearchKeyUp'
            },
            reftodocsearchfield: {
                clearicontap: 'refToDocOnSearchClearIconTap',
                keyup: 'refToDocOnSearchKeyUp'
            },
            signfilterbysearchfield: {
                clearicontap: 'signFilterByOnSearchClearIconTap',
                keyup: 'signFilterByOnSearchKeyUp'
            },
            cheifcomplain: {
                change: 'addChiefComplain',
            },
            deletecomlain: {
                tap: 'deleteComplain',
            },
            saveduration: {
                tap: 'saveduration',
            },
            addduration: {
                tap: 'addduration',
            },
            adddruginlist: {
                tap: 'adddruginlist'
            },
            submithistory: {
                tap: 'submitHistory'
            },
            submitdrugs: {
                tap: 'submitdrugs'
            },
            adddiagnosis: {
                tap: 'addDiagnosis'
            },
            submitdiagnosis: {
                tap: 'submitDiagnosis'
            }
        }
    },

    init: function () {
        this.getpatientlist();
        // alert(localStorage.cardiologicaldiagnosisUuidconcept);
    },

    getpatientlist: function () {
        var d = new Date();
        var list_scrEncounter = Ext.create('RaxaEmr.Outpatient.model.PostList', {
            name: "Screener Encounter",
            description: "Patients encountered Screener on " + "startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d),
            searchQuery: "?encounterType=" + localStorage.screenerUuidencountertype + "&startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d)

        });
        var list_outEncounter = Ext.create('RaxaEmr.Outpatient.model.PostList', {
            name: "Outpatient Encounter",
            description: "Patients encountered Outpatient on " + "startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d),
            searchQuery: "?encounterType=" + localStorage.outUuidencountertype + "&startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d)

        });
        var k = 0;
        this.createList(list_scrEncounter, list_outEncounter, k);

    },

    createList: function (list_scr, list_out, k) {
        var store_scr = Ext.create('RaxaEmr.Outpatient.store.PostLists');
        var store_out = Ext.create('RaxaEmr.Outpatient.store.PostLists');
        store_scr.add(list_scr);
        store_out.add(list_out);
        store_scr.sync();
        store_out.sync();
        store_scr.on('write', function () {
            k = k + 1;
            if (k == 2) {
                this.finalPatientList(store_scr, store_out);
            }
        }, this);
        store_out.on('write', function () {
            k = k + 1;
            if (k == 2) {
                this.finalPatientList(store_scr, store_out);
            }
        }, this);
    },

    finalPatientList: function (store_scrEncounter, store_outEncounter) {
        var store_patientList = Ext.create('RaxaEmr.Outpatient.store.PatientsList', {
            storeId: 'patientStore'
        });
        store_patientList.getProxy().setUrl(this.getPatientListUrl(store_scrEncounter.getData().getAt(0).getData().uuid, store_outEncounter.getData().getAt(0).getData().uuid, localStorage.screenerUuidencountertype));
        store_patientList.load();
        store_patientList.on('load', function () {}, this);
        Ext.getCmp('contact').setStore(store_patientList);
        return store_patientList;
    },

    getPatientListUrl: function (scr_UUID, out_UUID, encountertype) {
        return (HOST + '/ws/rest/v1/raxacore/patientlist' + '?inList=' + scr_UUID + '&notInList=' + out_UUID + '&encounterType=' + encountertype);
    },

    onMainPush: function (view, item) {

        if (item.xtype == "contact-show") {
            this.getContacts().deselectAll();
        }

    },

    onMainPop: function (view, item) {
        this.buttonHide('confirmlabresulthistory');
        this.buttonHide('confirmmedicationhistory');
        this.buttonHide('confirmrefertodoc');
    },

    onContactSelect: function (list, index, node, record) {

        if (!this.showContact) {
            this.showContact = Ext.create('RaxaEmr.Outpatient.view.patient.more');
        }

        this.showContact.setRecord(record);
        this.getMain().push(this.showContact);
        myRecord = record;
    },

    addChiefComplain: function () {
        var combo = Ext.getCmp('cheifComplain');
        examlist = Ext.getCmp('examList');
        examlist.getStore().add({
            complain: combo.getValue(),
            id: combo.getValue()
        });
        Ext.getCmp('maintabs').setActiveItem(TABS.EXAMINATION);
    },

    onExamListSelect: function (list, index, node, record) {
        Ext.getCmp('deleteComlain').setHidden(false);
        Ext.getCmp('addDuration').setHidden(false);
    },

    deleteComplain: function () {
        var examlist = Ext.getCmp('examList');
        selectedRecord = examlist.getSelection();
        examlist.getStore().remove(selectedRecord);
    },

    addduration: function () {
        this.getMain().push(Ext.getCmp('durationPicker'));
        Ext.getCmp('durationPicker').setHidden(false);
    },

    saveduration: function () {
        var duration = Ext.getCmp('durationfield').getValue();
        var examlist = Ext.getCmp('examList');
        var selectedRecord = examlist.getSelection();
        var duration = Ext.getCmp('durationfield').getValue();
        var listdata = selectedRecord[0].set('duration', ' : ' + duration + ' days');
        Ext.getCmp('durationPicker').setHidden(true);
        Ext.getCmp('durationfield').reset();
    },

    buttonAction: function (obj, obj2) {
        this.obj1 = Ext.create(obj);
        this.obj1.setRecord(myRecord);
        this.getMain().push(this.obj1);
        this.buttonShow(obj2);
    },

    buttonShow: function (obj) {
        var button = Ext.getCmp(obj);

        if (!button.isHidden()) {
            return;
        }

        button.setHidden(false);
    },

    buttonHide: function (obj) {
        var button = Ext.getCmp(obj);

        if (button.isHidden()) {
            return;
        }

        button.setHidden(true);
    },

    labInfoAction: function () {
        this.buttonAction('RaxaEmr.Outpatient.view.patient.labresulthistorypanel', 'confirmlabresulthistory');
    },

    medicationHistoryAction: function () {
        this.buttonAction('RaxaEmr.Outpatient.view.patient.medicationhistorypanel', 'confirmmedicationhistory');
    },

    refToDocButton: function () {
        this.buttonAction('RaxaEmr.Outpatient.view.patient.refertodocpanel', 'confirmrefertodoc');
        var docList = Ext.create('Screener.store.Doctors', {
            storeId: 'docStore'
        });
        docList.load();
        Ext.getCmp('refToDocPanel').setStore(docList);
    },

    sortBy: function (obj, listStore) {
        listStore.setSorters(obj);
        listStore.load();
    },

    sortByName: function () {
        this.sortBy('display', this.getContact().getStore());
    },

    sortByDocName: function () {
        this.sortBy('nameofdoc');
    },

    sortByUrgency: function () {
        this.sortBy('urgency');
    },

    sortByLastVisit: function () {
        this.sortBy('lastvisit');
    },

    medicationHistorySortByDrugName: function () {
        this.sortBy('drugname', Ext.getCmp('medicationhistorygrid').getStore());
    },

    medicationHistorySortByDrugReaction: function () {
        this.sortBy('drugreaction', Ext.getCmp('medicationhistorygrid').getStore());
    },

    refToDocSortByDocName: function () {
        this.sortBy('display', Ext.getCmp('refToDocPanel').getStore());
    },

    refToDocSortByOpdno: function () {
        this.sortBy('uuid', Ext.getCmp('refToDocPanel').getStore());
    },

    onSearchKeyUp: function (listStore, field, value1, value2) {

        var value = field.getValue();
        var store = listStore;

        store.clearFilter();

        if (value) {
            var searches = value.split(' ');
            var regexps = [];
            var i;

            for (i = 0; i < searches.length; i++) {
                if (!searches[i]) continue;
                regexps.push(new RegExp(searches[i], 'i'));
            }

            store.filter(function (record) {
                var matched = [];

                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i];
                    var didMatch = record.get(value1).match(search) || record.get(value2).match(search);
                    matched.push(didMatch);
                }

                if (regexps.length > 1 && matched.indexOf(false) != -1) {
                    return false;
                } else {
                    return matched[0];
                }
            });
        }
    },

    onSearchClearIconTap: function (listStore) {
        listStore.clearFilter();
    },

    patientListOnSearchKeyUp: function (field) {
        this.onSearchKeyUp(this.getContact().getStore(), field, 'display', 'uuid');
    },

    patientListOnSearchClearIconTap: function () {
        this.onSearchClearIconTap(this.getContact().getStore());
    },

    medicationHistoryOnSearchKeyUp: function (field) {
        this.onSearchKeyUp(Ext.getCmp('medicationhistorygrid').getStore(), field, 'drugname', 'drugreaction');
    },

    medicationHistoryOnSearchClearIconTap: function () {
        this.onSearchClearIconTap(Ext.getCmp('medicationhistorygrid').getStore());
    },

    labOrderOnSearchKeyUp: function (field) {
        this.onSearchKeyUp(Ext.getCmp('labResultHistoryList').getStore(), field, 'laborderno', 'specimenid');
    },

    labOrderOnSearchClearIconTap: function () {
        this.onSearchClearIconTap(Ext.getCmp('labResultHistoryList').getStore());
    },

    refToDocOnSearchKeyUp: function (field) {
        this.onSearchKeyUp(Ext.getCmp('refToDocPanel').getStore(), field, 'display', 'uuid');
    },

    refToDocOnSearchClearIconTap: function () {
        this.onSearchClearIconTap(Ext.getCmp('refToDocPanel').getStore());
    },

    onSignListSelect: function (list, index, node, record) {
        var sign = record.data.sign;
        list.getStore().remove(record);
        examlist = Ext.getCmp('examList');
        examlist.getStore().add({
            complain: sign,
            id: sign,
        });
    },

    signFilter: function () {
        var value = Ext.getCmp('signFilter').getValue();
        var store = Ext.getCmp('signList').getStore();

        if (value) {
            var searches = value.split(' ');
            var regexps = [];
            var i;

            for (i = 0; i < searches.length; i++) {
                if (!searches[i]) continue;
                regexps.push(new RegExp(searches[i], 'i'));
            }

            store.filter(function (record) {
                var matched = [];

                for (i = 0; i < regexps.length; i++) {
                    var search = regexps[i];
                    var didMatch = record.get('type').match(search);
                    matched.push(didMatch);
                }

                if (regexps.length > 1 && matched.indexOf(false) != -1) {
                    return false;
                } else {
                    return matched[0];
                }
            });
        }
    },

    signFilterByOnSearchKeyUp: function (field) {
        Ext.getCmp('signList').setHidden(false);
        Ext.getCmp('signList').getStore().load();
        this.onSearchKeyUp(Ext.getCmp('signList').getStore(), field, 'sign', 'type');
        this.signFilter();
    },

    signFilterByOnSearchClearIconTap: function () {
        this.onSearchClearIconTap(Ext.getCmp('signList').getStore());
    },

    submitOpdEncounter: function () {
        var obsdate = new Date();
        var time = Util.Datetime(obsdate, Util.getUTCGMTdiff());

        var opdencounter = Ext.create('RaxaEmr.Outpatient.model.opdEncounter', {
            patient: myRecord.data.uuid,
            encounterType: localStorage.outUuidencountertype,
            encounterDatetime: time,
            provider: loggedInDoc,
            obs: opd_observations
        });

        var encounterStore = Ext.create('RaxaEmr.Outpatient.store.opdEncounterPost');
        encounterStore.add(opdencounter);
        encounterStore.sync();
        encounterStore.on('write', function () {
            Ext.Msg.alert('successfull');
        }, this);
    },

    addObservation: function (concept, value) {
        var obsdate = new Date();
        opd_observations.push({
            person: myRecord.data.uuid,
            obsDatetime: obsdate,
            concept: concept,
            value: value
        });
    },

    submitHistory: function () {
        var obsdate = new Date();
        var tobaccoValue = Ext.getCmp('tobaccoField').getValue() + ' ' + Ext.getCmp('tobaccoRouteofIntake').getValue() + ' ' + Ext.getCmp('tobaccoFrequency').getValue()

        this.addObservation(localStorage.patientHistoryUuidconcept, Ext.getCmp('patientHistory').getValue());
        this.addObservation(localStorage.pastMedicationHistoryUuidconcept, Ext.getCmp('pastMedicalHistory').getValue());
        this.addObservation(localStorage.alcoholIntakeUuidconcept, Ext.getCmp('alcoholField').getValue());
        this.addObservation(localStorage.tobaccoIntakeUuidconcept, tobaccoValue);
        this.addObservation(localStorage.otherHistoryUuidconcept, Ext.getCmp('otherHistory').getValue());
        this.addObservation(localStorage.familyHistoryUuidconcept, Ext.getCmp('familyHistory').getValue());

        Ext.getCmp('patientHistoryPanel').reset();
        Ext.getCmp('socialHistoryPanel').reset();
    },

    submitExamination: function () {
        var obsdate = new Date();
        var examlist = Ext.getCmp('examList').getStore();
        var prob_num = examlist.getCount();
        for (i = 0; i < prob_num; i++) {
            this.addObservation(localStorage.examlistUuidconcept, examlist.getAt(i).data.complain + examlist.getAt(i).data.duration);
        }
    },

    addDiagnosis: function () {
        var obsdate = new Date();
        var conceptType;
        var diagnosis_category = Ext.getCmp('diagnosisCategory').getValue();
        if (diagnosis_category == 'Neuro') {
            conceptType = localStorage.neurologicalDiagnosisUuidconcept;
        } else if (diagnosis_category == 'Cardio') {
            conceptType = localStorage.cadiologicalDiagnosisUuidconcept;
        }
        this.addObservation(conceptType, Ext.getCmp('diagnosisField').getValue() + ' : ' + Ext.getCmp('diagnosisNotes').getValue());
        Ext.getCmp('diagnosisForm').reset();
    },

    submitDiagnosis: function () {
        this.addDiagnosis();
        this.submitExamination();
        this.submitOpdEncounter();
    },

    adddruginlist: function () {
        druglist = Ext.getCmp('drugList');
        druglist.getStore().add({
            drugname: Ext.getCmp('drug-name').getValue(),
            strength: Ext.getCmp('drug-strength').getValue(),
            instruction: Ext.getCmp('drug-instruction').getValue(),
            frequency: Ext.getCmp('drug-frequency').getValue(),
            duration: Ext.getCmp('drug-duration').getValue()
        });
        Ext.getCmp('treatment-panel').setActiveItem(TREATMENT.DRUGPANEL)
    },

    submitdrugs: function () {
        concept = new Array();
        order = new Array();
        var k = 0,
            l = 0;
        var druglist = Ext.getCmp('drugList').getStore();
        var drug_num = Ext.getCmp('drugList').getStore().getCount();
        drug_num = drug_num - 1;
        for (i = 0; i <= drug_num; i++) {
            // value of Url for get call is made here using name of drug
            var Url = HOST + '/ws/rest/v1/concept?q='
            Url = Url + 'd4t-30'
            concept.push(Ext.create('RaxaEmr.Outpatient.store.drugConcept'))
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
            var enddate = new Date(startdate.getFullYear(), startdate.getMonth(), startdate.getDate() + druglist.getAt(i).data.duration);
            // model for drug order is created here
            order.push({
                patient: myRecord.data.uuid,
                drug: druglist.getAt(i).data.drug,
                startDate: startdate,
                autoExpireDate: enddate,
                dose: druglist.getAt(i).data.strength,
                quantity: druglist.getAt(i).data.duration,
                frequency: druglist.getAt(i).data.frequency,
                instructions: druglist.getAt(i).data.instruction,
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
                if (k == drug_num + 1) {
                    for (var j = 0; j <= drug_num; j++) {
                        order[j].concept = concept[j].getAt(0).data.uuid
                    }
                    var time = Util.Datetime(startdate, Util.getUTCGMTdiff());
                    // model for posting the encounter for given drug orders
                    var encounter = Ext.create('RaxaEmr.Outpatient.model.drugEncounter', {
                        patient: myRecord.data.uuid,
                        // this is the encounter for the prescription encounterType
                        encounterType: localStorage.prescriptionUuidencountertype,
                        encounterDatetime: time,
                        orders: order
                    })
                    var encounterStore = Ext.create('RaxaEmr.Outpatient.store.drugEncounter')
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
    },
});