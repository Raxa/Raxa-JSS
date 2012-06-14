Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Pharmacy2',
    
    views: ['groups', 'drugs', 'druglist', 'Home', 'add', 'add2','dispense', 'Viewport'],
    controllers: ['main','dispense'],
    models: ['alldrugsmodel', 'drugmodel', 'groupmodel'],
    stores: ['AllDrugslist', 'allgroups', 'groupeddrugs','dispense'],
    
    launch: function() {
        Ext.create('RaxaEmr.Pharmacy2.view.Mainview');
    }
});