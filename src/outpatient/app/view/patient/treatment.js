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
    SUMMERY: 2
}

Ext.define('RaxaEmr.Outpatient.view.patient.treatment', {
    extend: 'Ext.Container',
    xtype: 'treatment-panel',
    requires: ['RaxaEmr.Outpatient.view.patient.drugpanel', 'RaxaEmr.Outpatient.view.patient.treatmentsummery', 'Screener.store.druglist', 'Screener.model.druglist'],
    id: 'treatment-panel',
    config: {
        layout: {
            type: 'card'
        },
        title: 'Treatment',
        activeItem: 0,
        items: [{
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'formpanel',
                flex: 1,
                id: 'drugaddform',
                scrollable: 'false',
                items: [{
                    xtype: 'fieldset',
                    width: '100%',
                    items: [{
                        xtype: 'selectfield',
                        label: 'Treatment Type',
                        valueField: 'value',
                        displayField: 'title',
                        store: {
                            data: [{
                                value: '',
                                title: '',
                            }, {
                                value: 'Pharmaceutical',
                                title: 'Pharmaceutical',
                            }]
                        }
                    }, {
                        xtype: 'selectfield',
                        label: 'Name of Drug',
                        id: 'drug-name',
                        valueField: 'text',
                    }, {
                        xtype: 'selectfield',
                        label: 'Strength',
                        id: 'drug-strength',
                        valueField: 'value',
                        displayField: 'title',
                        store: {
                            data: [{
                                value: '',
                                title: '',
                            }, {
                                value: '100',
                                title: '100mg'
                            }, {
                                value: '200',
                                title: '200mg'
                            }, {
                                value: '500',
                                title: '500mg'
                            }]
                        }
                    }, {
                        xtype: 'fieldset',
                        baseCls: 'x-form-fieldset-mod',
                        margin: '0 0 0 0',
                        layout: {
                            type: 'hbox'
                        },
                        items: [{
                            xtype: 'selectfield',
                            label: 'Frequency',
                            border: 0,
                            labelWidth: '46.1538%',
                            flex: 13,
                            id: 'drug-frequency',
                            valueField: 'value',
                            displayField: 'title',
                            store: {
                                data: [{
                                    value: '',
                                    title: '',
                                }, {
                                    value: '1',
                                    title: 'Once Daily'
                                }, {
                                    value: '2',
                                    title: 'Twice Daily'
                                }, {
                                    value: '3',
                                    title: 'Thrice Daily'
                                }]
                            }
                        }, {
                            xtype: 'selectfield',
                            border: 0,
                            flex: 7,
                            id: 'drug-instruction',
                            valueField: 'value',
                            displayField: 'title',
                            store: {
                                data: [{
                                    value: '',
                                    title: '',
                                }, {
                                    value: 'Empty Stomach',
                                    title: 'Empty Stomach',
                                }, {
                                    value: 'With Meals',
                                    title: 'With Meals',
                                }, {
                                    value: 'After Meals',
                                    title: 'After Meals',
                                }]
                            }
                        }]
                    }, {
                        xtype: 'textfield',
                        id: 'drug-duration',
                        label: 'Duration (days)',
                    }]
                }, {
                    xtype: 'button',
                    ui: 'confirm',
                    text: 'Done',
                    id: 'addDrugInList'
                }]
            }, {
                xtype: 'container',
                width: 60,
                items: [{
                    xtype: 'button',
                    docked: 'top',
                    height: 40,
                    margin: '20 20 0 0',
                    width: 40,
                    icon: '../outpatient/resources/images/add.png',
                    padding: '0 10 10 0',
                    handler: function() {
                        Ext.getCmp('addDrugInList').fireEvent('tap');
                        Ext.getCmp('treatment-panel').setActiveItem(TREATMENT.ADD); // to add more than one treatment
                        Ext.getCmp('drugaddform').reset();
                    }
                }, {
                    xtype: 'button',
                    docked: 'top',
                    height: 40,
                    margin: '10 20 0 0',
                    width: 40,
                    icon: '../outpatient/resources/images/problemlist.png',
                    padding: '0 10 10 0'
                }]
            }]
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                margin: '20 20 20 20',
                items: [{
                    xtype: 'Drug-Panel',
                    height: 258
                }, {
                    xtype: 'button',
                    ui: 'confirm',
                    text: 'Done',
                    margin: '20 0 0 0',
                    handler: function() {
                        Ext.getCmp('treatment-panel').setActiveItem(TREATMENT.SUMMERY) //switch to tratment summery list
                    }
                }]
            }, {
                xtype: 'container',
                width: 60,
                items: [{
                    xtype: 'button',
                    docked: 'top',
                    height: 40,
                    margin: '20 20 0 0',
                    width: 40,
                    icon: '../outpatient/resources/images/add.png',
                    padding: '0 10 10 0',
                    handler: function() {
                        Ext.getCmp('treatment-panel').setActiveItem(TREATMENT.ADD); // to add more than one treatment
                        Ext.getCmp('drugaddform').reset();
                    }
                }, {
                    xtype: 'button',
                    docked: 'top',
                    height: 40,
                    margin: '10 20 0 0',
                    width: 40,
                    icon: '../outpatient/resources/images/problemlist.png',
                    padding: '0 10 10 0'
                }]
            }]
        }, {
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            items: [{
                xtype: 'container',
                flex: 1,
                margin: '20 20 20 20',
                items: [{
                    xtype: 'container',
                    margin: '0 0 20 0',
                    border: '1 1 1 1',
                    style: 'border:solid #DADADA;',
                    height: 265,
                    layout: {
                        type: 'fit'
                    },
                    items: [{
                        xtype: 'Treatment-Summery'
                    }]
                }, {
                    xtype: 'formpanel',
                    height: 100,
                    layout: {
                        pack: 'center',
                        type: 'hbox'
                    },
                    scrollable: 'false',
                    items: [{
                        xtype: 'fieldset',
                        height: 75,
                        margin: '-17 20 0 -17',
                        layout: {
                            type: 'hbox'
                        },
                        flex: 1,
                        items: [{
                            xtype: 'datepickerfield',
                            label: 'Follow Up',
                            value: new Date(),
                            flex: 1
                        }]
                    }, {
                        xtype: 'fieldset',
                        height: 75,
                        margin: '-17 -17 0 0',
                        layout: {
                            type: 'hbox'
                        },
                        flex: 1,
                        items: [{
                            xtype: 'textareafield',
                            label: 'Plans for Treatment',
                            flex: 1
                        }]
                    }]
                }, {
                    xtype: 'button',
                    ui: 'confirm',
                    id: 'submitDrugs',
                    text: 'Done'
                }]
            }, {
                xtype: 'container',
                width: 60,
                items: [{
                    xtype: 'button',
                    docked: 'top',
                    height: 40,
                    margin: '20 20 0 0',
                    width: 40,
                    icon: '../outpatient/resources/images/add.png',
                    padding: '0 10 10 0',
                    handler: function() {
                        Ext.getCmp('treatment-panel').setActiveItem(TREATMENT.ADD); // to add more than one treatment
                        Ext.getCmp('drugaddform').reset();
                    }
                }, {
                    xtype: 'button',
                    docked: 'top',
                    height: 40,
                    margin: '10 20 0 0',
                    width: 40,
                    icon: '../outpatient/resources/images/problemlist.png',
                    padding: '0 10 10 0'
                }]
            }]
        }]
    }
});