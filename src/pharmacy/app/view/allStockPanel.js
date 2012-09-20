Ext.define('RaxaEmr.Pharmacy.view.allStockPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.allStockPanel',
    id: 'allStockPanel',
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
        id: 'availableStockButton',
        width: 150,
        height: 80,
        text: 'Available Stock',
        action: 'showAvailableStock'
    },{
        xtype: 'button',
        id: 'expiringStockButton',
        width: 150,
        height: 80,
        text: 'Expiring Stock',
        action: 'showExpiringStock'
    },{
        xtype: 'button',
        id: 'lowStockButton',
        width: 150,
        height: 80,
        text: 'Low Stock',
        action: 'showStockOut'
    },{
        xtype: 'button',
        id: 'allOrdersButton',
        width: 150,
        height: 80,
        text: 'All Orders',
        action: 'showAllOrders'
    }
    ]
});