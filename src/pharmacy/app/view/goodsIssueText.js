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
        xtype: 'panel',
        border: false,
        margin: 5,
        layout: 'hbox',
        items: [{
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
                ]
            }),
            fieldLabel: 'Fill Requisition (optional)',
            valueField: 'uuid',
            displayField: 'description',
            listeners: {
                'focus': {
                    fn: function (comboField) {
                        comboField.doQuery(comboField.allQuery, true);
                        comboField.expand();
                    }
                    , 
                    scope: this
                }
            },
            emptyText: 'Requisition'
        },{
            xtype: 'button',
            margin: 5,
            height: 22,
            width: 22,
            icon: '../resources/img/delete.png',
            tooltip: 'Cancel',
            action: 'cancelIssuePurchaseOrder'
        }]
    },
    {
        margin: 5,
        xtype: 'combobox',
        width: 300,
        labelWidth: 90,
        id: "issueStockLocationPicker",
        store: Ext.create('RaxaEmr.Pharmacy.store.Locations',{
            storeId: 'issueStockLocations'
        }),
        fieldLabel: 'Stock Location',
        displayField: 'display',
        valueField: 'uuid',
        emptyText: 'Location'
    },
    {
        margin: 5,
        xtype: 'combobox',
        width: 300,
        labelWidth: 90,
        id: "issuedispenseLocationPicker",
        store: Ext.create('RaxaEmr.Pharmacy.store.Locations', {
            storeId: 'issuedispenseLocations'
        }),
        fieldLabel: 'Dispense Location',
        displayField: 'display',
        valueField: 'uuid',
        emptyText: 'Location'
    }]
});