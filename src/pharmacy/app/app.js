Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'Pharmacy',
    appFolder: "app",
     autoCreateViewport: true,
      controllers: [
        'control'
    ]
});