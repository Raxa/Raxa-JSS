Ext.define('RaxaEmr.Pharmacy.view.goodsIssueText', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.goodsIssueText',
    height: 250,
    width: 743,
    layout: {
        type: 'vbox'
    },
    items: [
    {
        xtype: 'displayfield',
        value: 'New Stock Issue',
    },
    {
        margin: 5,
        xtype: 'combobox',
        width: 400,
        labelWidth: 90,
        id: "issuePurchaseOrderPicker",
        store: Ext.create('RaxaEmr.Pharmacy.store.PurchaseOrders', {
            storeId: 'fillRequisitions',
            filters: [{
                property: 'name',
                value: /Pharmacy Requisition/
            },{
                property: 'received',
                value: false
            }
            //            ,{
            //                property: 'stocklocation',
            //                value: localStorage.getItem('currentLocation')
            //            }
            ]
        }),
        fieldLabel: 'Fill Requisition (optional):',
        displayField: 'description',
        emptyText: 'Requisition'
    },
    {
        margin: 5,
        xtype: 'combobox',
        width: 190,
        labelWidth: 90,
        id: "issueDispenseLocationPicker",
        store: Ext.create('RaxaEmr.Pharmacy.store.Locations', {
            storeId: 'issueDispenseLocations'
        }),
        fieldLabel: 'Dispense Location:',
        displayField: 'display',
        emptyText: 'Location'
    },
    {
        xtype: 'displayfield',
        value: 'Display Field',
        fieldLabel: 'Label',
        x: 340,
        y: 140
    }]
});