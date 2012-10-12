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
 
 //examination tab view
 
Ext.define('RaxaEmr.Outpatient.view.patient.examination', {
    extend: 'Ext.Container',
    xtype: 'examination-panel',
    requires: ['RaxaEmr.Outpatient.view.patient.examinationlist', 'RaxaEmr.Outpatient.view.patient.signlist'],
    id: 'examination-panel',
    config: {
        layout: {
            type: 'card'
        },
        title: 'Examination',
        activeItem: 0,
        items: [{
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
                        id: 'signFilter',
                        hidden: true,
                        border: '0 0 1 0',
                        style: 'border:solid #DADADA;',
                        valueField: 'filterBy',
                        displayField: 'title',
                        store: {
                            data: [{
                                filterBy: 'all',
                                title: 'All',
                            }]
                        }
                    }, {
                        xtype: 'searchfield',
                        id: 'signfilterbysearchfield',
                    }]
                }, {
                    xtype: 'Sign-List',
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
                        xtype: 'Examination-List'
                    }, {
                        xtype: 'actionsheet',
                        id: 'durationPicker',
                        hidden: true,
                        items: [{
                            xtype: 'formpanel',
                            height: 100,
                            width: '100%',
                            items: [{
                                xtype: 'numberfield',
                                label: 'Duration',
                                id: 'durationfield'
                            }]
                        }, {
                            xtype: 'toolbar',
                            docked: 'top',
                            items: [{
                                xtype: 'button',
                                text: 'Save',
                                id: 'saveDuration'
                            }, {
                                xtype: 'spacer'
                            }, {
                                xtype: 'button',
                                text: 'Cancel',
                                handler: function () {
                                    Ext.getCmp('durationPicker').setHidden(true);// to hide the duration picker field
                                }
                            }]
                        }]
                    }]
                }]
            }]
        }]
    }
});
