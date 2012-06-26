Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Pharmacy',
    views: ['prescription', 'Viewport'],
    autoCreateViewport: true,
    controllers: ['prescription']
});