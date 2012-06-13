Ext.define('RaxaEmr.Outpatient.view.patient.work', {
    extend: 'Ext.Container',
    xtype: 'work',
    requires: ['RaxaEmr.Outpatient.view.patient.history', 'RaxaEmr.Outpatient.view.patient.treatment', 'RaxaEmr.Outpatient.view.patient.diagnosis'],
    config: {
        layout: {
            type: 'fit'
        },
        items: [{
            xtype: 'tabpanel',
            id: 'main-tabs',
            items: [{
                xtype: 'history-panel'
            }, {
                xtype: 'container',
                title: 'Examination'
            }, {
                xtype: 'diagnosis-panel'
            }, {
                xtype: 'treatment-panel'
            }]
        }]
    }
});