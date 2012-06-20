Ext.define('RaxaEmr.Outpatient.view.Viewport', {
    extend: 'Ext.navigation.View',
    xtype: 'mainview',

    requires: ['RaxaEmr.Outpatient.view.patientlist', 'RaxaEmr.Outpatient.view.patient.more', 'RaxaEmr.Outpatient.view.patient.labresulthistorypanel', 'RaxaEmr.Outpatient.view.patient.refertodocpanel', 'RaxaEmr.Outpatient.view.patient.medicationhistorypanel'],

    config: {
        autoDestroy: false,
        fullscreen: true,
        navigationBar: {
            items: [{
                xtype: 'button',
                id: 'confirmmedicationhistory',
                text: 'Done',
                ui: 'confirm',
                align: 'right',
                hidden: true
            }, {
                xtype: 'button',
                id: 'confirmlabresulthistory',
                text: 'Done',
                ui: 'confirm',
                align: 'right',
                hidden: true
            }, {
                xtype: 'button',
                id: 'confirmrefertodoc',
                text: 'Done',
                ui: 'confirm',
                align: 'right',
                hidden: true
            }, ]
        },
        items: [{
            xtype: 'patientlist'
        }]
    }
});