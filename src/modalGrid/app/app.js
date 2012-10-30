Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Pharmacy',
    views: ['Viewport', 'allStockGrid'],
    // controllers: ['Main'],
    // stores: ['orderStore', 'Doctors', 'Identifiers', 'Locations', 'Patients', 'Persons', 'drugOrderPatient', 'drugOrderSearch', 'drugConcept', 'drugEncounter', 'allDrugs', 'PostLists', 'StockList', 'PurchaseOrders', 'RequisitionItems', 'Alerts', 'DrugInfos'],
    // models: ['Address', 'Doctor', 'Identifier', 'Name', 'Patient', 'Person', 'drugOrderPatient', 'drugOrderSearch', 'drugOrder', 'drugEncounter', 'PostLists', 'DrugInventory', 'Location', 'LocationTag', 'PurchaseOrder', 'Alert', 'Provider', 'DrugInfo'],
    
    launch: function() {
        Ext.create('RaxaEmr.Pharmacy.view.Viewport');
    }
});