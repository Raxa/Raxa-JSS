Ext.define('RaxaEmr.Pharmacy.view.allStockForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.allStockForm',
    border: false,
    height: 50,
    width: 840,
    margin: '0 0 0 110',
    activeItem: 0,
    layout: {
        type: 'hbox'
    },
    bodyPadding: 10,
    items: [
    {
        margin: 5,
        xtype: 'combobox',
        width: 220,
        labelWidth: 80,
        fieldLabel: 'Your Location',
        store: Ext.create('RaxaEmr.Pharmacy.store.Locations',{
            storeId: 'currentLocations'
        }),
        displayField: 'display',
        emptyText: 'Location'
    },{
        margin: 5,
        xtype: 'button',
        width: 100,
        text: 'New Requisition',
        id: 'newRequisitionButton',
        action: 'newRequisition'
    },
    {
        margin: 5,
        xtype: 'button',
        width: 90,
        text: 'New Issue',
        id: 'newIssueButton',
        action: 'newIssue'
    },
    {
        margin: 5,
        xtype: 'button',
        width: 90,
        text: 'New Receipt',
        id: 'newReceiptButton',
        action: 'newReceipt'
    },
    {
        margin: 5,
        xtype: 'button',
        width: 90,
        text: 'New Drug',
        id: 'newDrugButton',
        action: 'newDrug'
    },
    {
        margin: 5,
        xtype: 'button',
        width: 90,
        text: 'New Drug Group',
        id: 'newDrugGroupButton',
        action: 'newDrugGroup'
    },
    ]
});