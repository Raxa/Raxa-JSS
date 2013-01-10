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
//view of treatment tab
//enum for switching the panels in the treatment tab
var TREATMENT = {
    ADD: 0,
    DRUGPANEL: 1,
    
}

Ext.define('RaxaEmr.Outpatient.view.patient.treatment', {
    extend: 'Ext.Container',
    xtype: 'treatment-panel',
    requires: ['RaxaEmr.Outpatient.view.patient.drugpanel', 'RaxaEmr.Outpatient.view.patient.treatmentsummery', 'Screener.store.druglist', 'Screener.model.druglist', 'RaxaEmr.Outpatient.view.patient.druglist', 'RaxaEmr.Outpatient.view.patient.drugform', 'RaxaEmr.Outpatient.view.patient.DrugGrid'],
    id: 'treatment-panel',

    config: {
        layout: {
            type: 'card'
        },
        title: 'Treatment',
        activeItem: 0,
        items: [{
            xtype: 'drug-panel'
        }, {
            xtype: 'draw-panel'
        }, {
            xtype: 'container',
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'button',
                    height: 40,
                    margin: '20 20 0 0',
                    width: '150',
                    icon: '../outpatient/resources/images/add.png',
                    text: 'Add Drugs',
                    padding: '0 10 10 0',
                    handler: function () {

                        Ext.getCmp('drugForm').setHidden(false);
                        Ext.getCmp('drugaddform').reset();
                        Ext.getCmp('treatment-panel').setActiveItem(TREATMENT.ADD); // to add more than one treatment
                    }
                }, {
                    xtype: 'spacer',
                    width: '0%'
                }, {
                    xtype: 'button',
                    ui: 'confirm',
                    height: 40,
                    margin: '20 20 0 0',
                    width: '150',
                    text: 'Confirm Drug Order',
                    padding: '0 10 10 0',
                    handler: function () {
						//Loads the drug order from drugpanel store and POST encounter with order inside it
                        drugOrderInDrugPanel = Ext.getStore('drugpanel');
                        drugListStore = Ext.getStore('druglist')
                        order = [];
                        for (var i = 0; i < drugOrderInDrugPanel.data.length; i++) {
                            for (var j = 0; j < drugListStore.data.length; j++) {
                                if (drugOrderInDrugPanel.data.items[i].data.drugname == drugListStore.data.items[j].data.drug) {
                                    var druguuid = drugListStore.data.items[i].data.uuid;
                                    break;
                                }
                            }

                            concept = new Array();

                            var duration = drugOrderInDrugPanel.data.items[i].data.duration;
                            var strength = drugOrderInDrugPanel.data.items[i].data.strength;
                            var quantity = drugOrderInDrugPanel.data.items[i].data.duration;
                            var frequency = drugOrderInDrugPanel.data.items[i].data.frequency;
                            var instruction = drugOrderInDrugPanel.data.items[i].data.instruction;

                            Ext.Ajax.request({
                                url: HOST + '/ws/rest/v1/concept?q=' + drugOrderInDrugPanel.data.items[i].data.drugname,
                                method: 'GET',
                                disableCaching: false,
                                headers: Util.getBasicAuthHeaders(),
                                failure: function (response) {
                                    console.log('GET call on concept failed with response status' + response.status);
                                },
                                success: function (response) {
                                    console.log('GET call on concept was successful with response status' + response.status);

                                    var JSONResult = JSON.parse(response.responseText);

                                    var currentdate = new Date();
                                    var startdate = Util.Datetime(startdate, Util.getUTCGMTdiff())
                                    order.push({
                                        patient: Ext.getCmp('contact').selected.items[0].data.uuid,
                                        drug: druguuid,
                                        startDate: currentdate,
                                        autoExpireDate: new Date(currentdate.getFullYear(), currentdate.getMonth(), currentdate.getDate() + duration),
                                        dose: strength,
                                        quantity: duration,
                                        frequency: frequency,
                                        instructions: instruction,
                                        // type should be "drugorder" in order to post a drug order
                                        type: 'drugorder',
                                        concept: JSONResult.results[0].uuid
                                    });
                                }
                            });
                        }

                        var currentdate = new Date();
                        var time = Util.Datetime(currentdate, Util.getUTCGMTdiff());

                        // model for posting the encounter for given drug orders
                        var encounter = Ext.create('RaxaEmr.Outpatient.model.drugEncounter', {
                            patient: Ext.getCmp('contact').selected.items[0].data.uuid,

                            // this is the encounter for the prescription encounterType
                            encounterType: localStorage.outUuidencountertype,
                            encounterDatetime: time,
                            provider: localStorage.loggedInUser,
                            orders: order
                        });

                        var encounterStore = Ext.create('RaxaEmr.Outpatient.store.drugEncounter')
                        encounterStore.add(encounter)
                        // make post call for encounter
                        encounterStore.sync()

                        var i = 0;
                        var j = 0;
                        var k = 0;
                    }
                }]
            }, {
                xtype: 'drug-grid',
                id: 'orderedDrugGrid',
                height: 250,
                border: 10,
            }, ]
        }]
    }
});
