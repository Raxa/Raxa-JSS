Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Pharmacy',    
    models: ['Drug'],
    views: ['Viewport','DrugDetails'],
    controllers: ['Drugs'],
    store: ['Drugs'],
   autoCreateViewport: true
    }
);