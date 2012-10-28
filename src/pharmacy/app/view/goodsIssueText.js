Ext.define('RaxaEmr.Pharmacy.view.goodsIssueText', {
    extend: 'Ext.container.Container',
    alias: 'widget.goodsIssueText',
    width: 780,
    layout: {
        type: 'vbox'
    },
    items: [{
        xtype: 'container',
        border: false,
        layout: 'hbox',
        items: [{
            xtype: 'combobox',
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
                    },
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
        xtype: 'combobox',
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
        xtype: 'combobox',
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