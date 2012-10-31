Ext.define('RaxaEmr.Pharmacy.view.goodsReceipt', {
    extend: 'Ext.panel.Panel',
    id: 'goodsReceipt',
    autoScroll: true,
    alias: 'widget.goodsReceipt',
    width: 780,
    title: 'Orders >> Update Stock',
    items:[{
        margin: '10 0 0 0',
        xtype: 'goodsReceiptText'
    },{
        xtype: 'goodsReceiptGrid'
    },{
        xtype: 'button',
        id: 'submitReceiptButton',
        text: 'Submit',
        action: 'submitReceipt',
        margin: 5
    }]
});