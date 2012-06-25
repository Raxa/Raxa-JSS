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
                        label: 'Family History'
                    }]
                }, {
                    xtype: 'button',
                    ui: 'forward',
                    text: 'Next',
                    id: 'next',
                    handler: function () {
                        Ext.getCmp('history-panel').setActiveItem(1)
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
                    icon: '../outpatient/resources/images/1.png',
                    padding: '0 10 10 0'
                }, {
                    xtype: 'button',
                    docked: 'top',
                    height: 40,
                    id: 'medication-history',
                    margin: '10 20 0 0',
                    width: 40,
                    icon: '../outpatient/resources/images/4.png',
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
                        label: 'Alcohol Frequency',
                        valueField: 'alcoholFrequency',
                        displayField: 'title',
                        store: {
                            data: [{
                                alcoholFrequency: 'daily',
                                title: 'Daily'
                            }, {
                                alcoholFrequency: 'occasional',
                                title: 'Occasional'
                            }, {
                                alcoholFrequency: 'experiencedWithdrawal',
                                title: 'Experienced Withdrawal'
                            }, {
                                alcoholFrequency: 'none',
                                title: 'None'
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
                                    time: 'past',
                                    title: 'Past'
                                }, {
                                    time: 'present',
                                    title: 'Present'
                                }, {
                                    time: 'never',
                                    title: 'Never'
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
                                    amount: 'heavy',
                                    title: 'Heavy'
                                }, {
                                    amount: 'occasional',
                                    title: 'Occasional'
                                }]
                            }
                        }]
                    }, {
                        xtype: 'textareafield',
                        label: 'Others'
                    }]
                }, {
                    xtype: 'fieldset',
                    items: [{
                        xtype: 'textareafield',
                        label: 'Family History'
                    }]
                }, {
                    xtype: 'button',
                    ui: 'confirm',
                    text: 'OK',
                    id: 'submit-history'
                }]
            }, {
                xtype: 'container',
                width: 60,
                items: [{
                    xtype: 'button',
                    docked: 'top',
                    height: 40,
                    margin: '65 20 0 0',
                    width: 40,
                    icon: '../outpatient/resources/images/4.png',
                    padding: '0 10 10 0',
                    handler: function () {
                        Ext.getCmp('working-area').setActiveItem(1)
                    }
                }]
            }]
        }]
    }
});