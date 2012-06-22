Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Pharmacy',
    
    views: ['dispense', 'Viewport', 'GroupDrugs', 'Groups', 'Drugs', 'Alldrugs', 'main', 'add', 'add2'],
    controllers: ['dispense', 'controls'],
    models: ['dispense', 'alldrugsmodel', 'groupmodel', 'drugmodel',],
    stores: ['dispense', 'alldrugsstore', 'groupstore', 'drugstore',],
    
    launch: function() {
        Ext.create('RaxaEmr.Pharmacy.view.Viewport');
    }
});