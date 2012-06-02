Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Pharmacy',

        
    models: ['User'],
    views: ['Viewport','DrugDetails'],
    controllers: ['Users'],
    store: ['Users'],

   autoCreateViewport: true


    }
    

        
);