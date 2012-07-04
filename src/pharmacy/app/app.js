Ext.Loader.setConfig({
    enabled: true
});

Ext.application({
    name: 'RaxaEmr.Pharmacy',
    
    views: ['Viewport', 'prescription', 'pharmacyTopbar', 'addFacility', 'goodsReceipt', 'listOfDrugs', 'newdrugform', 'pharmacyDetails', 
            'reports', 'addPatient', 'stockIssue', 'stockIssueGrid', 'goodReceiptGrid', 'goodReceipt', 'goodIssueText', 'goodIssuePop', 'goodIssue',
            'allStockPanel', 'allStockGrid', 'allStockForm', 'allStock', 'addDrug', 'allStock', 'prescribedDrugs'],
    
    controllers: ['prescription'],
    
    stores: ['orderStore'],
    
    launch: function() {
        Ext.create('RaxaEmr.Pharmacy.view.Viewport');
    }
});