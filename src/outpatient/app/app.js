Ext.Loader.setPath({
    'Ext.ux.touch.grid': '../lib/touch/Ext.ux.touch.grid'
});

Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Outpatient',

    models: ['patientlist', 'Grid', 'medicationhistory', 'refertodoc', 'labresulthistory', 'drugpanel'],
    stores: ['patientlist', 'Grid', 'medicationhistory', 'refertodoc', 'labresulthistory', 'drugpanel'],
    views: ['Viewport'],
    controllers: ['patientlist'],

    launch: function () {
        Ext.create('RaxaEmr.Outpatient.view.Viewport');
    }
});