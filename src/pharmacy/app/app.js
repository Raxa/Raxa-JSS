Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Pharmacy',
    views: ['dispense', 'Viewport'],
    stores: ['dispense'],
    autoCreateViewport: true,
    controllers: ['dispense']
});