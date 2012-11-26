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
 
 //the view of history tab
 
// enum to change the panels of history tab
 
var HISTORY = {
    PERSONAL: 0,
    SOCIAL: 1
}

Ext.define('RaxaEmr.Outpatient.view.patient.history', {
    extend: 'Ext.Container',
    xtype: 'history-panel',
    id: 'history-panel',
    config: {
        layout: {
            type: 'card'
        },
        title: 'History',
        activeItem: 0,
        items: [{
            xtype: 'container',
            layout: {
                type: 'hbox'
            },
            scrollable: 'false',
            items: [{
                xtype: 'formpanel',
                id: 'patientHistoryPanel',
                scrollable: 'false',
                flex: 1,
                items: [{
                    xtype: 'fieldset',
                    width: '100%',
                    items: [{
                        xtype: 'textareafield',
                        id: 'patientHistory',
                        label: 'Patient History'
                    }, {
                        xtype: 'textareafield',
                        id: 'pastMedicalHistory',
                        label: 'Past Medical History',
                    }]
                }, {
                    xtype: 'button',
                    ui: 'forward',
                    text: 'Next',
                    id: 'next',
                    handler: function () {
                        Ext.getCmp('history-panel').setActiveItem(HISTORY.SOCIAL)// to swich the view to social history
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
                    id: 'labinfo',
                    icon: '../outpatient/resources/images/labhistory.png',
                    padding: '0 10 10 0'
                }, {
                    xtype: 'button',
                    docked: 'top',
                    height: 40,
                    id: 'medicationhistory',
                    margin: '10 20 0 0',
                    width: 40,
                    icon: '../outpatient/resources/images/medicationhistory.png',
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
                id: 'socialHistoryPanel',
                scrollable: 'false',
                items: [{
                    xtype: 'fieldset',
                    title: 'Social History',
                    items: [{
                        xtype: 'selectfield',
                        label: 'Alcohol',
                        valueField: 'alcoholFrequency',
                        displayField: 'title',
                        id: 'alcoholField',
                        store: {
                            data: [{
                                alcoholFrequency: '',
                                title: ''
                            }, {
                                alcoholFrequency: 'never',
                                title: 'None'
                            }, {
                                alcoholFrequency: 'daily',
                                title: 'Daily'
                            }, {
                                alcoholFrequency: 'occasional',
                                title: 'Occasional'
                            }, {
                                alcoholFrequency: 'experiencedWithdrawal',
                                title: 'Experienced Withdrawal'
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
                            label: 'Tobacco',
                            border: 0,
                            labelWidth: '56.25%',
                            flex: 16,
                            valueField: 'time',
                            displayField: 'title',
                            id: 'tobaccoField',
                            store: {
                                data: [{
                                    time: '',
                                    title: ''
                                }, {
                                    time: 'never',
                                    title: 'Never'
                                }, {
                                    time: 'present',
                                    title: 'Present'
                                }, {
                                    time: 'past',
                                    title: 'Past'
                                }]
                            }
                        }, {
                            xtype: 'selectfield',
                            border: 0,
                            flex: 7,
                            valueField: 'way',
                            id: 'tobaccoRouteofIntake',
                            displayField: 'title',
                            store: {
                                data: [{
                                    way: '',
                                    title: ''
                                }, {
                                    way: 'Neither',
                                    title: 'Neither'
                                }, {
                                    way: 'oral',
                                    title: 'Oral'
                                }, {
                                    way: 'smoking',
                                    title: 'Smoking'
                                }, {
                                    way: 'both',
                                    title: 'Both'
                                }]
                            }
                        }, {
                            xtype: 'selectfield',
                            border: 0,
                            flex: 7,
                            valueField: 'amount',
                            id: 'tobaccoFrequency',
                            displayField: 'title',
                            store: {
                                data: [{
                                    amount: '',
                                    title: ''
                                }, {
                                    amount: 'None',
                                    title: 'None'
                                }, {
                                    amount: 'occasional',
                                    title: 'Occasional'
                                }, {
                                    amount: 'heavy',
                                    title: 'Heavy'
                                }]
                            }
                        }]
                    }, {
                        xtype: 'textareafield',
                        id: 'otherHistory',
                        label: 'Other'
                    }]
                }, {
                    xtype: 'fieldset',
                    items: [{
                        xtype: 'textareafield',
                        id: 'familyHistory',
                        label: 'Family History'
                    }]
                }, {
                    xtype: 'container',
                    layout: {
                        pack: 'center',
                        type: 'hbox'
                    },
                    items: [{
                        xtype: 'button',
                        margin: '0 10 0 10',
                        ui: 'confirm',
                        text: 'Submit',
                        flex: 1,
                        id: 'submit-history'
                    }]
                }]
            }, {
                xtype: 'container',
                width: 60,
                items: [{
                    xtype: 'button',
                    docked: 'top',
                    height: 40,
                    id: 'medicationhistory2',
                    margin: '65 20 0 0',
                    width: 40,
                    icon: '../outpatient/resources/images/medicationhistory.png',
                    padding: '0 10 10 0',
                    handler: function () {
                        Ext.getCmp('medicationhistory').fireEvent('tap');// to swich the view to medication history
                    }
                }]
            }]
        }]
    }
});