Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Pharmacy',
    

    views: ['Viewport', 'prescription', 'pharmacyTopbar', 'addFacility', 'goodsReceipt', 'listOfDrugs', 'newdrugform', 'pharmacyDetails', 
            'reports', 'addPatient', 'stockIssue', 'stockIssueGrid', 'goodReceiptGrid', 'goodReceipt', 'goodIssueText', 'goodIssuePop', 'goodIssue', 'allStockPanel', 'allStockGrid', 'allStockForm', 'allStock', 'addDrug', 'allStock', 'prescribedDrugs', 'patientsGridPanel', 'requisition'],
    
    controllers: ['prescription'],
    
    stores: ['orderStore', 'Doctors', 'Identifiers', 'Locations', 'Patients', 'Persons', 'drugOrderPatient', 'drugOrderSearch', 'drugConcept', 'drugEncounter', 'allDrugs', 'PostLists', 'StockList', 'PurchaseOrders', 'RequisitionItems'],
    models: ['Address', 'Doctor', 'Identifier', 'Name', 'Patient', 'Person', 'drugOrderPatient', 'drugOrderSearch', 'drugOrder', 'drugEncounter', 'PostLists', 'DrugInventory', 'Location', 'LocationTag', 'PurchaseOrder'],
    
    launch: function() {
        if(Util.checkModulePrivilege('pharmacy')){
            Ext.create('RaxaEmr.Pharmacy.view.Viewport');
        }
    }
});