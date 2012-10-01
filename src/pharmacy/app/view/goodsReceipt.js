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
        ui: 'raxa-orange-small',
        x: 500
    },
    {
        xtype: 'button',
        id: 'submitReceiptButton',
        width: 60,
        text: 'Submit',
        action: 'submitReceipt',
        ui: 'raxa-aqua-small',
        x: 600
    }]
});