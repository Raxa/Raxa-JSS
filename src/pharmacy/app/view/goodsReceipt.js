Ext.define('RaxaEmr.Pharmacy.view.goodsReceipt', {
    extend: 'Ext.container.Container',
    id: 'goodsReceipt',
    autoScroll: true,
    alias: 'widget.goodsReceipt',
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