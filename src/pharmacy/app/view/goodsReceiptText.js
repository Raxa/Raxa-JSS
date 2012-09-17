Ext.define('RaxaEmr.Pharmacy.view.goodsReceiptText', {
    extend: 'Ext.container.Container',
    alias: 'widget.goodsReceiptText',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    autoScroll: true,
    items:[{
        margin: 5,
        xtype: 'combobox',
        width: 300,
        labelWidth: 90,
        id: "receiptLocationPicker",
        store: Ext.create('RaxaEmr.Pharmacy.store.Locations',{
            storeId: 'receiptLocations'
        }),
        fieldLabel: 'Receive new stock at:',
        displayField: 'display',
        emptyText: 'Location'
    },
    {
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items:[{
            border: false,
            xtype: 'panel',
            width: 500,
            bodyPadding: 10,
            layout: {
                type: 'vbox'
            },
            items: [{
                xtype: 'displayfield',
                width: 60,
                value: 'PO Details'
            },
            {
                layout: 'hbox',
                border: false,
                items:[{
                    xtype: 'radiofield',
                    boxLabel: 'PO No',
                    margin: '0 20 0 0'
                },
                {
                    xtype: 'combobox',
                    width: 400,
                    labelWidth: 90,
                    id: "receiptPurchaseOrderPicker",
                    store: Ext.create('RaxaEmr.Pharmacy.store.PurchaseOrders', {
                        storeId: 'stockIssues',
                        filters: [{
                            property: 'name',
                            value: /Stock Issue/
                        },{
                            property: 'received',
                            value: false
                        }
                        ]
                    }),
                    fieldLabel: 'Stock Issue(optional):',
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
                    emptyText: 'Stock Issue'
                }]
            },
            {
                xtype: 'radiofield',
                fieldLabel: '',
                boxLabel: 'Donation'
            },
            {
                xtype: 'textfield',
                width: 190,
                fieldLabel: 'Receipt No',
                labelWidth: 70
            },
            {
                xtype: 'datefield',
                width: 190,
                fieldLabel: 'Date',
                labelWidth: 70
            }]
        },
        {
            width: 100,
            xtype: 'panel',
            border: false,
            bodyPadding: 10,
            items: [
            {
                xtype: 'displayfield',
                fieldLabel: 'Vendor',
                anchor: '100%'
            },
            {
                xtype: 'displayfield',
                fieldLabel: 'Address',
                anchor: '100%'
            },
            {
                xtype: 'displayfield',
                anchor: '100%'
            },
            {
                xtype: 'displayfield',
                width: 283,
                fieldLabel: 'Person name',
                anchor: '100%'
            },
            {
                xtype: 'displayfield',
                fieldLabel: 'Contact',
                anchor: '100%'
            }
            ]
        }]
    }]
});