Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Screener',

    autoCreateViewport: true,

    models: ['DocsList', 'MapDocsList', 'MapPatientsList'],
    stores: ['DocsList', 'MapDocsList', 'MapPatientsList'],
    controllers: ['DocList', 'MapDocsList', 'MapPatientsList']

});