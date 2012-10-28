Ext.define('RaxaEmr.Pharmacy.view.goodsReceipt', {
    extend: 'Ext.panel.Panel',
    id: 'goodsReceipt',
    autoScroll: true,
    alias: 'widget.goodsReceipt',
    width: 780,
    title: 'Orders >> Update Stock',
    items:[{
        xtype: 'goodsReceiptText'
    },{
        xtype: 'goodsReceiptGrid'
    },{
        xtype: 'button',
        text: 'Cancel',
        action: 'cancelReceipt'
    },
    {
        xtype: 'button',
        id: 'submitReceiptButton',
        text: 'Submit',
        action: 'submitReceipt'
    }]
});