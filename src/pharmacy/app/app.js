Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Pharmacy2',
    
    views: ['groups', 'drugs', 'druglist', 'Home', 'add', 'add2'],
    controllers: ['main'],
    models: ['alldrugsmodel', 'drugmodel', 'groupmodel'],
    stores: ['AllDrugslist', 'allgroups', 'groupeddrugs'],
    
    launch: function() {
        Ext.create('RaxaEmr.Pharmacy2.view.Mainview');
    }
});