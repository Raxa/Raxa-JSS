Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Pharmacy',
    
    views: ['Viewport', 'prescription', 'pharmacyTopbar', 'addFacility', 'goodsReceipt', 'listOfDrugs', 'pharmacyDetails', 'reports', 'addPatient', 'stockIssue', 'stockIssueGrid', 'goodsReceiptGrid', 'goodsReceiptText', 'goodsIssueText', 'goodsIssueGrid', 'goodsIssue', 'allStockPanel', 'allStockGrid', 'allStock', 'addDrug', 'allStock', 'prescribedDrugs', 'patientsGridPanel', 'requisition', 'DrugDetails', 'DrugDetailsText', 'DrugDetailsGrid', 'alertGrid', 'InventoryEditor', 'drugComboBox'],
    
    controllers: ['prescription'],
    
    stores: ['orderStore', 'Doctors', 'Identifiers', 'Locations', 'Patients', 'Persons', 'drugOrderPatient', 'drugOrderSearch', 'drugConcept', 'drugEncounter', 'allDrugs', 'PostLists', 'StockList', 'PurchaseOrders', 'RequisitionItems', 'Alerts', 'DrugInfos'],
    models: ['Address', 'Doctor', 'Identifier', 'Name', 'Patient', 'Person', 'drugOrderPatient', 'drugOrderSearch', 'drugOrder', 'drugEncounter', 'PostLists', 'DrugInventory', 'Location', 'LocationTag', 'PurchaseOrder', 'Alert', 'Provider', 'DrugInfo'],
    
    launch: function() {
        if(Util.checkModulePrivilege('pharmacy')&& Util.uuidLoadedSuccessfully()){
            Ext.create('RaxaEmr.Pharmacy.view.Viewport');
        }
    }
});