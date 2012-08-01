Ext.define('RaxaEmr.Pharmacy.view.goodReceipt', {
    extend: 'Ext.container.Container',
    id: 'goodReceipt',
    autoScroll: true,
    alias: 'widget.goodReceipt',
    items:[{
        xtype: 'allStockPanel',
        x : 400
    },{
        xtype: 'allStockForm',
        x : 400
    },{
        xtype: 'goodReceiptGrid',
        x : 400
    }]
});