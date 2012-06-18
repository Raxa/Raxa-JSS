Ext.define('RaxaEmr.Outpatient.view.patient.diagnosis', {
    extend: 'Ext.Container',
    xtype: 'diagnosis-panel',
    id: 'diagnosis-panel',
    config: {
        layout: {
            type: 'hbox'
        },
        title: 'Diagnosis',
        items: [{
            xtype: 'formpanel',
            flex: 1,
            items: [{
                xtype: 'fieldset',
                items: [{
                    xtype: 'selectfield',
                    label: 'Diagnosis Category',
                    valueField: 'diagnosisCategory',
                    displayField: 'title',
                    store: {
                        data: [{
                            diagnosisCategory: 'anatomy',
                            title: 'Anatomy'
                        }, {
                            diagnosisCategory: 'physiology',
                            title: 'physiology'
                        }, {
                            diagnosisCategory: 'pathology',
                            title: 'pathology'
                        }, {
                            diagnosisCategory: 'psychology',
                            title: 'psychology'
                        }, {
                            diagnosisCategory: 'humanHemeostatic',
                            title: 'Human Hemeostatic'
                        }, {
                            diagnosisCategory: 'other',
                            title: 'Other'
                        }]
                    }
                }, {
                    xtype: 'selectfield',
                    label: 'Diagnosis'
                }, {
                    xtype: 'textareafield',
                    label: 'Notes'
                }]
            }, {
                xtype: 'container',
                layout: {
                    pack: 'center',
                    type: 'hbox'
                },
                items: [{
                    xtype: 'button',
                    ui: 'decline',
                    text: 'Cancel',
                    flex: 1
                }, {
                    xtype: 'button',
                    margin: '0 10 0 10',
                    text: 'Clear',
                    flex: 1
                }, {
                    xtype: 'button',
                    ui: 'confirm',
                    text: 'Done',
                    flex: 1
                }]
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
                icon: '../outpatient/resources/images/9.png',
                padding: '0 10 10 0'
            }, {
                xtype: 'button',
                docked: 'top',
                height: 40,
                margin: '10 20 0 0',
                width: 40,
                icon: '../outpatient/resources/images/10.png',
                padding: '0 10 10 0'
            }]
        }]
    }
});