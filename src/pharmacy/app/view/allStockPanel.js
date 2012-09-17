Ext.define('RaxaEmr.Pharmacy.view.allStockPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.allStockPanel',
    border: false,
    height: 100,
    width: 840,
    layout: {
        type: 'hbox'
    },
    margin: '20 0 0 110',
    items: [
    {
        xtype: 'button',
        width: 150,
        height: 80,
        text: 'Stock Analysis',
        action: 'showAllStock'
    },{
        xtype: 'button',
        width: 150,
        height: 80,
        text: 'Expiring Stock',
        action: 'showExpiringStock'
    },{
        xtype: 'button',
        width: 150,
        height: 80,
        text: 'Stock Out',
        action: 'showStockOut'
    },{
        xtype: 'button',
        width: 150,
        height: 80,
        text: 'All Orders',
        action: 'showAllOrders'
    }
    ]
});