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
var TABS = {
    HISTORY: 0,
    EXAMINATION: 1,
    DIAGNOSIS: 2,
    TREATMENT: 3
}

Ext.define('RaxaEmr.Outpatient.view.patient.work', {
    extend: 'Ext.Container',
    xtype: 'work',
    requires: ['RaxaEmr.Outpatient.view.patient.history', 'RaxaEmr.Outpatient.view.patient.examination', 'RaxaEmr.Outpatient.view.patient.treatment', 'RaxaEmr.Outpatient.view.patient.diagnosis'],
    config: {
        layout: {
            type: 'hbox'
        },
        height: 490,
        items: [{
            xtype: 'tabpanel',
            border: '1 1 1 0',
            margin: '0 20 10 0',
            style: 'border:solid #aaaaaa;',
            flex: 1,
            id: 'maintabs',
            items: [{
                xtype: 'history-panel'
            }, {
                xtype: 'examination-panel'
            }, {
                xtype: 'diagnosis-panel'
            }, {
                xtype: 'treatment-panel'
            }],
            tabBar: {
                docked: 'top',
                hidden: true
            }
        }, {
            xtype: 'segmentedbutton',
            docked: 'left',
            margin: '0 0 0 15',
            width: 40,
            height: 480,
            layout: {
                type: 'vbox'
            },
            cls: 'x-segmentedbutton-vertical',
            items: [{
                xtype: 'button',
                width: 40,
                flex: 1,
                cls: 'x-button-vikas',
                icon: '../outpatient/resources/images/history.png',
                padding: '0 0 0 0',
                pressed: true,
                handler: function () {
                    Ext.getCmp('maintabs').setActiveItem(TABS.HISTORY)
                }
            }, {
                xtype: 'button',
                width: 40,
                flex: 1,
                id: 'examtabbutton',
                cls: 'x-button-vikas',
                icon: '../outpatient/resources/images/examination.png',
                padding: '0 0 0 0',
                handler: function () {
                    Ext.getCmp('maintabs').setActiveItem(TABS.EXAMINATION)
                }
            }, {
                xtype: 'button',
                width: 40,
                flex: 1,
                cls: 'x-button-vikas',
                icon: '../outpatient/resources/images/diagnosis.png',
                padding: '0 0 0 0',
                handler: function () {
                    Ext.getCmp('maintabs').setActiveItem(TABS.DIAGNOSIS)
                }
            }, {
                xtype: 'button',
                width: 40,
                flex: 1,
                cls: 'x-button-vikas',
                icon: '../outpatient/resources/images/treatment.png',
                padding: '0 0 0 0',
                handler: function () {
                    Ext.getCmp('maintabs').setActiveItem(TABS.TREATMENT)
                }
            }]
        }]
    }
});