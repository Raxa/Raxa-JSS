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
    DRUGPANEL: 1
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
        activeItem: 1,
        items: [{
            xtype: 'drug-panel'
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
                    handler: function () {}
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
