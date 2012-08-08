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
            deletecomlain: '#deleteComlain',
            addduration: '#addDuration',
            saveduration: '#saveDuration',
        },

        control: {
            main: {
                push: 'onMainPush',
                pop: 'onMainPop'
            },
            contacts: {
                itemtap: 'onContactSelect'
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
                clearicontap: 'onSearchClearIconTap',
                keyup: 'onSearchKeyUp'
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

        }
    },
	
	init: function () {
        this.getpatientlist();
    },
	
	getpatientlist: function () {
        var d = new Date();
        var list_regEncounter = Ext.create('RaxaEmr.Outpatient.model.PostList', {
            name: "Registration Encounter",
            description: "Patients encountered Registration" + "startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d),
            searchQuery: "?encounterType=" + localStorage.regUuidencountertype + "&startDate=" + Util.Datetime(d, 24) + "&endDate=" + Util.Datetime(d)
        });
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
        //this.createRegList(list_regEncounter, list_scrEncounter);
        var k = 0;
        this.createList(list_regEncounter, list_scrEncounter, list_outEncounter, k);

    },
	
	createList: function (list_reg, list_scr, list_out, k) {
        var store_reg = Ext.create('RaxaEmr.Outpatient.store.PostLists');
        var store_scr = Ext.create('RaxaEmr.Outpatient.store.PostLists');
        var store_out = Ext.create('RaxaEmr.Outpatient.store.PostLists')
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
	
	finalPatientList: function (store_regEncounter, store_scrEncounter, store_outEncounter) {
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
		// alert(myRecord.data.uuid);
		// this.submitHistory();
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
        if (!this.obj1) {
            this.obj1 = Ext.create(obj);
        }
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
    },

    sortBy: function (obj) {
        store = this.getContact().getStore();
        store.setSorters(obj);
        store.load();
    },

    sortByName: function () {
        this.sortBy('firstName');
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

    onSearchKeyUp: function (field) {

        var value = field.getValue();
        var store = this.getContact().getStore();

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
                    var didMatch = record.get('display').match(search) || record.get('uuid').match(search);
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

    onSearchClearIconTap: function () {
        store = this.getContact().getStore();
        store.clearFilter();
    },
	
	submitHistory: function(){
		this.sendEncounterData('6c19634f-fa41-4981-bbde-c057f53ea6c8',localStorage.screenerUuidencountertype,localStorage.waitingUuidlocation,'659426c5-e3fd-4748-8277-603de376dc0e');
	},
	
	sendEncounterData: function (uuid, encountertype, location, provider) {
        var currentDate = new Date();
        var jsonencounter = Ext.create('RaxaEmr.Outpatient.model.encounterpost', {
            encounterDatetime: Util.Datetime(currentDate, Util.getUTCGMTdiff()),
            patient: uuid,
            encounterType: encountertype,
            //location: location,
            provider: provider
        });
        var store = Ext.create('RaxaEmr.Outpatient.store.encounterpost');
        store.add(jsonencounter);
        store.sync();
        return store
    },
});
