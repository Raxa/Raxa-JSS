Ext.define('RaxaEmr.Outpatient.view.patient.treatment', {
    extend: 'Ext.Container',
    xtype: 'treatment-panel',
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
            items: [

            {
                xtype: 'formpanel',
                flex: 1,
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
                        xtype: 'selectfield',
                        label: 'Duration'
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
                    }]
                }, {
                    xtype: 'button',
                    ui: 'confirm',
                    text: 'Done',
                    handler: function () {
                        Ext.getCmp('treatment-panel').setActiveItem(1)
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
                    icon: '../outpatient/resources/images/10.png',
                    padding: '0 10 10 0'
                }, {
                    xtype: 'button',
                    docked: 'top',
                    height: 40,
                    margin: '10 20 0 0',
                    width: 40,
                    icon: '../outpatient/resources/images/14.png',
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
                    icon: '../outpatient/resources/images/10.png',
                    padding: '0 10 10 0'
                }, {
                    xtype: 'button',
                    docked: 'top',
                    height: 40,
                    margin: '10 20 0 0',
                    width: 40,
                    icon: '../outpatient/resources/images/14.png',
                    padding: '0 10 10 0'
                }]
            }]
        }]
    }
});