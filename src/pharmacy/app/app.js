Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Pharmacy',
    
    views: ['Viewport', 'prescription', 'pharmacyTopbar', 'addFacility', 'goodsReceipt', 'listOfDrugs', 'newdrugform', 'pharmacyDetails', 'reports'],
    controllers: ['prescription'],
    
    launch: function() {
        Ext.create('RaxaEmr.Pharmacy.view.Viewport');
    }
});