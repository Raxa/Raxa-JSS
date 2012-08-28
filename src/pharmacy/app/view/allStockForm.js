Ext.define('RaxaEmr.Pharmacy.view.allStockForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.allStockForm',
    border: false,
    height: 50,
    width: 840,
    x:110,
    activeItem: 0,
    layout: {
        type: 'hbox'
    },
    bodyPadding: 10,
    items: [
    {
        margin: 5,
        xtype: 'combobox',
        width: 190,
        labelWidth: 60,
        fieldLabel: 'Group by',
        emptyText: 'Location',
    },{
        margin: 5,
        xtype: 'button',
        width: 100,
        text: 'New Requisition',
        id: 'newrequisitionbutton',
        action: 'newRequisition'
    },
    {
        margin: 5,
        xtype: 'button',
        width: 90,
        text: 'New Issue',
        id: 'newissuebutton',
        action: 'newIssue'
    },
    {
        margin: 5,
        xtype: 'button',
        width: 90,
        text: 'New Reciept',
        id: 'newreceiptbutton',
        action: 'newReceipt'
    },
    {
        margin: 5,
        xtype: 'button',
        width: 90,
        text: 'New Drug',
        id: 'newdrugbutton',
        action: 'newDrug'
    },
    {
        margin: 5,
        xtype: 'button',
        width: 90,
        text: 'New Drug Group',
        id: 'newdruggroupbutton',
        action: 'newDrugGroup'
    },
    ]
});