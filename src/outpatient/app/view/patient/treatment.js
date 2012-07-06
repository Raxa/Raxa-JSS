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

var TREATMENT = {
    ADD : 0,
    INSTRUCTIONS : 1,
    DRUGPANEL : 2,
    SUMMERY : 3
}

Ext.define('RaxaEmr.Outpatient.view.patient.treatment', {
    extend: 'Ext.Container',
    xtype: 'treatment-panel',
    requires: ['RaxaEmr.Outpatient.view.patient.drugpanel', 'RaxaEmr.Outpatient.view.patient.treatmentsummery'],
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
                scrollable: 'false',
                items: [{
                    xtype: 'fieldset',
                    width: '100%',
                    items: [{
                        xtype: 'selectfield',
                        label: 'Treatment Type'
                    }, {
                        xtype: 'selectfield',
                        label: 'Name of Drug'
                    }, {
                        xtype: 'selectfield',
                        label: 'Strength'
                    }, {
                        xtype: 'fieldset',
                        baseCls: 'x-form-fieldset-mod',
                        margin: '0 0 0 0',
                        layout: {
                            type: 'hbox'
                        },
                        items: [{
                            xtype: 'selectfield',
                            label: 'Dosage',
                            border: 0,
                            labelWidth: '46.1538%',
                            flex: 13,
                            valueField: 'value',
                            displayField: 'title',
                            store: {
                                data: [{
                                    value: 'onceDaily',
                                    title: 'Once Daily'
                                }, {
                                    value: 'twiceDaily',
                                    title: 'Twice Daily'
                                }, {
                                    value: 'thriceDaily',
                                    title: 'Thrice Daily'
                                }]
                            }
                        }, {
                            xtype: 'selectfield',
                            border: 0,
                            flex: 7,
                            valueField: 'value',
                            displayField: 'title',
                            store: {
                                data: [{
                                    value: 'emptyStomach',
                                    title: 'EmptyStomach'
                                }, {
                                    value: 'afterFood',
                                    title: 'After Food'
                                }]
                            }
                        }]
                    }, {
                        xtype: 'selectfield',
                        label: 'Duration'
                    }]
                }, {
                    xtype: 'button',
                    ui: 'confirm',
                    text: 'Done',
                    handler: function () {
                        Ext.getCmp('treatment-panel').setActiveItem(TREATMENT.INSTRUCTIONS)
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
                    padding: '0 10 10 0'
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
                xtype: 'formpanel',
                flex: 1,
                items: [{
                    xtype: 'fieldset',
                    items: [{
                        xtype: 'selectfield',
                        label: 'Treatment'
                    }, {
                        xtype: 'textareafield',
                        label: 'Instructions'
                    }, {
                        xtype: 'togglefield',
                        label: 'Admit'
                    }]
                }, {
                    xtype: 'button',
                    ui: 'confirm',
                    text: 'Done',
                    handler: function () {
                        Ext.getCmp('treatment-panel').setActiveItem(TREATMENT.DRUGPANEL)
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
                    padding: '0 10 10 0'
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
                    handler: function () {
                        Ext.getCmp('treatment-panel').setActiveItem(TREATMENT.SUMMERY)
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
                    padding: '0 10 10 0'
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
                            placeHolder: 'mm/dd/yyyy',
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
                    text: 'Done',
                    handler: function () {}
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
                    padding: '0 10 10 0'
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