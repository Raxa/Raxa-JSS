Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Pharmacy',
    

    views: ['Viewport', 'prescription', 'pharmacyTopbar', 'addFacility', 'goodsReceipt', 'listOfDrugs', 'newdrugform', 'pharmacyDetails', 
            'reports', 'addPatient', 'stockIssue', 'stockIssueGrid', 'goodsReceiptGrid', 'goodsReceiptText', 'goodsIssueText', 'goodsIssueGrid', 'goodsIssue', 'allStockPanel', 'allStockGrid', 'allStockForm', 'allStock', 'addDrug', 'allStock', 'prescribedDrugs', 'patientsGridPanel', 'requisition', 'DrugDetails', 'DrugDetailsText', 'DrugDetailsGrid', 'alertGrid'],
    
    controllers: ['prescription'],
    
    stores: ['orderStore', 'Doctors', 'Identifiers', 'Locations', 'Patients', 'Persons', 'drugOrderPatient', 'drugOrderSearch', 'drugConcept', 'drugEncounter', 'allDrugs', 'PostLists', 'StockList', 'PurchaseOrders', 'RequisitionItems', 'Alerts'],
    models: ['Address', 'Doctor', 'Identifier', 'Name', 'Patient', 'Person', 'drugOrderPatient', 'drugOrderSearch', 'drugOrder', 'drugEncounter', 'PostLists', 'DrugInventory', 'Location', 'LocationTag', 'PurchaseOrder', 'Alert', 'Provider'],
    
    launch: function() {
        if(Util.checkModulePrivilege('pharmacy')){
            Ext.create('RaxaEmr.Pharmacy.view.Viewport');
        }
    }
});