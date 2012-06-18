Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Pharmacy',    
    models: ['Drug','dispense'],
    views: ['Viewport','DrugDetails','dispense'],
    controllers: ['Drugs','dispense'],
    store: ['Drugs','dispense'],
   autoCreateViewport: true
    }
);