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
                scrollable: 'false',
                flex: 1,
                items: [{
                    xtype: 'fieldset',
                    width: '100%',
                    items: [{
                        xtype: 'textareafield',
                        label: 'Patient History'
                    }, {
                        xtype: 'textareafield',
                        label: 'Past Medical History',
                    }]
                }, {
                    xtype: 'button',
                    ui: 'forward',
                    text: 'Next',
                    id: 'next',
                    handler: function () {
                        Ext.getCmp('history-panel').setActiveItem(HISTORY.SOCIAL)
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
                scrollable: 'false',
                items: [{
                    xtype: 'fieldset',
                    title: 'Social History',
                    items: [{
                        xtype: 'selectfield',
                        label: 'Alcohol',
                        valueField: 'alcoholFrequency',
                        displayField: 'title',
                        store: {
                            data: [{
                                alcoholFrequency: '',
                                title: ''
                            }, {
                                alcoholFrequency: 'none',
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
                        label: 'Other'
                    }]
                }, {
                    xtype: 'fieldset',
                    items: [{
                        xtype: 'textareafield',
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
                        text: 'Back',
                        flex: 1,
                        handler: function () {
                            Ext.getCmp('history-panel').setActiveItem(HISTORY.PERSONAL)
                        }
                               /*}, {*/
                           /*xtype: 'button',*/
                           /*ui: 'confirm',*/
                           /*margin: '0 10 0 10',*/
                           /*text: 'OK',*/
                           /*id: 'submit-history',*/
                           /*flex: 1*/
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
                        // TODO: Should redirect to medication history, not social history
                        Ext.getCmp('working-area').setActiveItem(HISTORY.SOCIAL)
                    }
                }]
            }]
        }]
    }
});
