Ext.define('RaxaEmr.Outpatient.view.Viewport', {
    extend: 'Ext.navigation.View',
    xtype: 'mainview',

    requires: ['RaxaEmr.Outpatient.view.patientlist', 'RaxaEmr.Outpatient.view.patient.more', ],

    config: {
        autoDestroy: false,
        fullscreen: true,
        items: [{
            xtype: 'patientlist'
        }]
    }
});