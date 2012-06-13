Ext.Loader.setPath({
    'Ext.ux.touch.grid': '../lib/touch/Ext.ux.touch.grid'
});

Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Outpatient',

    models: ['patientlist', 'Grid'],
    stores: ['patientlist', 'Grid'],
    views: ['Viewport'],
    controllers: ['patientlist'],

    launch: function () {
        Ext.create('RaxaEmr.Outpatient.view.Viewport');
    }
});