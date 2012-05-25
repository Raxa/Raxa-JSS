Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Outpatient',

    models: ['patientlist'],
    stores: ['patientlist'],
    views: ['Viewport'],
    controllers: ['patientlist'],

    launch: function () {
        Ext.create('RaxaEmr.Outpatient.view.Viewport');
    }
});