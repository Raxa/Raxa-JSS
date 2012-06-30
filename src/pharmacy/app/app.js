Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Pharmacy',
    
    views: ['dispense', 'Viewport', 'mainview', 'Groups', 'groupedDrugs', 'alldrugs', 'add', 'add2', 'prescription', 'pharmacyTopbar'],
    controllers: ['dispense', 'main', 'prescription'],
    models: ['dispense', 'alldrugsmodel', 'groupmodel', 'drugmodel',],
    stores: ['dispense', 'alldrugsstore', 'groupstore', 'drugstore',], 
    
    launch: function() {
        Ext.create('RaxaEmr.Pharmacy.view.Viewport');
    }
});