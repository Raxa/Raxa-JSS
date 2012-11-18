Ext.define('RaxaEmr.Pharmacy.view.goodsReceiptText', {
    extend: 'Ext.container.Container',
    alias: 'widget.goodsReceiptText',
    layout: {
        type: 'vbox'
    },
    autoScroll: true,
    items: [
    {
        margin: 5,
        xtype: 'combobox',
        id: "receiptPurchaseOrderPicker",
        store: Ext.create('RaxaEmr.Pharmacy.store.PurchaseOrders', {
            storeId: 'stockIssues',
            filters: [{
                property: 'name',
                value: /Stock Issue/
            }, {
                property: 'received',
                value: false
            }]
        }),
        fieldLabel: 'Stock Issue (optional)',
        valueField: 'uuid',
        displayField: 'description',
        listeners: {
            'focus': {
                fn: function(comboField) {
                    comboField.doQuery(comboField.allQuery, true);
                    comboField.expand();
                },
                scope: this
            }
        },
        emptyText: 'Stock Issue'
    }]
});