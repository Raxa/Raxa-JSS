Ext.define('RaxaEmr.Pharmacy.view.goodsReceipt', {
    extend: 'Ext.container.Container',
    id: 'goodsReceipt',
    autoScroll: true,
    alias: 'widget.goodsReceipt',
    items:[,{
        xtype: 'goodsReceiptText',
        x : 110
    },{
        xtype: 'goodsReceiptGrid',
        x : 110
    },{
        xtype: 'button',
        text: 'Cancel',
        action: 'cancelReceipt',
        x: 500
    },
    {
        xtype: 'button',
        id: 'submitReceiptButton',
        width: 60,
        text: 'Submit',
        action: 'submitReceipt',
        x: 600
    }]
});