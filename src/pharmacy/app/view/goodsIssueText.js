Ext.define('RaxaEmr.Pharmacy.view.goodsIssueText', {
    extend: 'Ext.container.Container',
    alias: 'widget.goodsIssueText',
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
//        store: Ext.create('RaxaEmr.Pharmacy.store.Locations',{
//            storeId: 'issueStockLocations'
//        }),
         store: 'Locations',
        fieldLabel: 'Stock Location',
        queryMode: 'local',
        hideTrigger: true,
        forceSelection: true,
        displayField: 'display',
        valueField: 'uuid',
        emptyText: 'Location'
    },
    {
        xtype: 'combobox',
        id: "issuedispenseLocationPicker",
//        store: Ext.create('RaxaEmr.Pharmacy.store.Locations', {
//            storeId: 'issuedispenseLocations'
//        }),
        store: 'Locations',
        fieldLabel: 'Dispense Location',
        queryMode: 'local',
        hideTrigger: true,
        forceSelection: true,
        displayField: 'display',
        valueField: 'uuid',
        emptyText: 'Location'
    }]
});