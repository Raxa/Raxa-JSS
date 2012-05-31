Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Pharmacy',
    appFolder: "app",
    autoCreateViewport: true,
    controllers: ['RaxaEmr.Pharmacy.controller.control']
});