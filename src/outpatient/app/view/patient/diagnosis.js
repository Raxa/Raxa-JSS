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

Ext.define('RaxaEmr.Outpatient.view.patient.diagnosis', {
    extend: 'Ext.Container',
    xtype: 'diagnosis-panel',
    requires: ['RaxaEmr.Outpatient.view.patient.diagnosedlist','RaxaEmr.Outpatient.view.patient.diagnosislist'],
    id: 'diagnosis-panel',
    config: {
        layout: {
            type: 'vbox'
        },
        title: 'Diagnosis',
        items: [
{
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                layout: {
                    type: 'vbox'
                },
                items: [{
                    xtype: 'formpanel',
                    border: '0 0 1 0',
                    padding: '0 0 0 0',
                    style: 'border:solid #DADADA;',
                    scrollable: false,
                    height: 93,
                    items: [{
                        xtype: 'selectfield',
                        label: 'Search In',
                        id: 'diagnosisFilter',
                        border: '0 0 1 0',
                        style: 'border:solid #DADADA;',
                        valueField: 'filterBy',
                        displayField: 'title',
                        store: {
                            data: [{
                                filterBy: '',
                                title: '',
                            }, {
                                filterBy: 'all',
                                title: 'All',
                            }]
                        }
                    }, {
                        xtype: 'searchfield',
                        id: 'diagnosisfilterbysearchfield',
                    }]
                }, {
                    xtype: 'Diagnosis-List',
                    flex: 1,
                }]
            }, {
                xtype: 'container',
                flex: 1,
                items: [{
                    xtype: 'container',
                    margin: '0 0 20 0',
                    border: '0 0 0 3',
                    style: 'border:solid #DADADA;',
                    height: 576,
                    layout: {
                        type: 'fit'
                    },
                    items: [{
                        xtype: 'Diagnosed-List',
                    }]
                }]
            }]
        }, {// side buttons for refer to doc nad to add another diagnosis
            xtype: 'container',
            width: 60,
            items: [{
                xtype: 'button',
                docked: 'top',
                height: 40,
                id: 'reftodocbutton',
                margin: '20 20 0 0',
                width: 40,
                icon: '../outpatient/resources/images/doclist.png',
                padding: '0 10 10 0'
            }, {
                xtype: 'button',
                docked: 'top',
                height: 40,
		id : 'addDiagnosis',
                margin: '10 20 0 0',
                width: 40,
                icon: '../outpatient/resources/images/add.png',
                padding: '0 10 10 0'
            }]
        }]
    }
});
