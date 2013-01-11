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
//                only after loading in local storage
//                ,{
//                    property: 'stockLocationUuid',
//                    value: localStorage.stockLocation
//                }
                ]
            }),
            fieldLabel: 'Fill Requisition (optional)',
            valueField: 'uuid',
            displayField: 'description',
            width : '320px',
            hideTrigger: true,
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
        id: "issuedispenseLocationPicker",
        store: 'Locations',
        fieldLabel: 'Dispense Location',
        queryMode: 'local',
        hideTrigger: true,
        forceSelection: true,
        displayField: 'name',
        valueField: 'uuid',
        emptyText: 'Location'
    }]
});