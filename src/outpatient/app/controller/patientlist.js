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
var loggedInDoc = '28cf4fec-7c1a-45e1-b15d-84194591f545';

var CONCEPT = {
	PATIENT_HISTORY : '67b97c07-69af-4338-8b24-ef2edd272427',
	PAST_MEDICATION_HISTORY : 'c278900e-df77-4467-9721-3d604d7e6a26',
	ALCOHOL_INTAKE : '69067a30-52c6-4769-8570-bf3e2d4cb127',
	TOBACCO_INTAKE : '879c5f69-0e6a-46d0-81e8-b8cf046afd0d',
	OTHER_HISTORY : '85c37437-3a9a-4db8-a8e2-9cb674b04a79',
	FAMILY_HISTORY : '6c887b36-b356-4650-9b76-40f4b9be5f18',
}

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
			adddruginlist: '#addDrugInList',
			submithistory: '#submit-history',
			submitdrugs : '#submitDrugs'
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
			adddruginlist: {
				tap : 'adddruginlist'
			},
			submithistory : {
				tap : 'submitHistory'
			},
			submitdrugs : {
				tap : 'submitdrugs'
			}
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
		var history = new Array();
		var obsdate = new Date();
		
		var tobaccoValue = Ext.getCmp('tobaccoField').getValue()+' '+Ext.getCmp('tobaccoRouteofIntake').getValue()+' '+Ext.getCmp('tobaccoFrequency').getValue()
		
		history.push({
			person: myRecord.data.uuid,
			obsDatetime: obsdate,
			concept : CONCEPT.PATIENT_HISTORY,
			value: Ext.getCmp('patientHistory').getValue()
		});
		
		history.push({
			person: myRecord.data.uuid,
			obsDatetime: obsdate,
			concept : CONCEPT.PAST_MEDICATION_HISTORY,
			value: Ext.getCmp('pastMedicalHistory').getValue()
		});
		
		history.push({
			person: myRecord.data.uuid,
			obsDatetime: obsdate,
			concept : CONCEPT.ALCOHOL_INTAKE,
			value: Ext.getCmp('alcoholField').getValue()
		});
		
		history.push({
			person: myRecord.data.uuid,
			obsDatetime: obsdate,
			concept : CONCEPT.TOBACCO_INTAKE,
			value: tobaccoValue
		});
		
		history.push({
			person: myRecord.data.uuid,
			obsDatetime: obsdate,
			concept : CONCEPT.OTHER_HISTORY,
			value: Ext.getCmp('otherHistory').getValue()
		});
		
		history.push({
			person: myRecord.data.uuid,
			obsDatetime: obsdate,
			concept : CONCEPT.FAMILY_HISTORY,
			value: Ext.getCmp('familyHistory').getValue()
		});
		
		var time = Util.Datetime(obsdate, Util.getUTCGMTdiff());
		
		var historyencounter = Ext.create('RaxaEmr.Outpatient.model.historyEncounter', {
			patient: myRecord.data.uuid,
			encounterType: localStorage.outUuidencountertype,
			encounterDatetime: time,
            provider: loggedInDoc,
			obs: history
		});
		
		var encounterStore = Ext.create('RaxaEmr.Outpatient.store.historyPost');
		encounterStore.add(historyencounter);
		encounterStore.sync();
		encounterStore.on('write', function () {
			Ext.Msg.alert('successfull');
		}, this);
	},
	
	sendEncounterData: function (uuid, encountertype, location, provider) {
        var currentDate = new Date();
        var jsonencounter = Ext.create('RaxaEmr.Outpatient.model.historyEncounter', {
            encounterDatetime: Util.Datetime(currentDate, Util.getUTCGMTdiff()),
            patient: uuid,
            encounterType: encountertype,
            provider: provider
        });
        var store = Ext.create('RaxaEmr.Outpatient.store.encounterpost');
        store.add(jsonencounter);
        store.sync();
        return store
    },
	
	adddruginlist :function(){
		druglist = Ext.getCmp('drugList');
		druglist.getStore().add({
			drugname: Ext.getCmp('drug-name').getValue(),
			strength: Ext.getCmp('drug-strength').getValue(),
			instruction: Ext.getCmp('drug-instruction').getValue(),
			frequency: Ext.getCmp('drug-frequency').getValue(),
			duration: Ext.getCmp('drug-duration').getValue()
		});
		Ext.getCmp('treatment-panel').setActiveItem(TREATMENT.SUMMERY)
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
