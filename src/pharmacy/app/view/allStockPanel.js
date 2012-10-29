Ext.define('RaxaEmr.Pharmacy.view.allStockPanel', {
    extend: 'Ext.container.Container',
    alias: 'widget.allStockPanel',
    id: 'allStockPanel',
    border: false,
    width: 760,
    layout: {
        type: 'hbox'
    },
    margin: '10 0 10 0',
    items: [
    {
        xtype: 'button',
        id: 'availableStockButton',
        margin: '0 10 0 0',
        text: 'Available Stock',
        action: 'showAvailableStock',
        pressed: true
    },{
        xtype: 'button',
        id: 'expiringStockButton',
        margin: '0 10 0 0',
        text: 'Expiring Stock',
        action: 'showExpiringStock'
    },{
        xtype: 'button',
        id: 'lowStockButton',
        margin: '0 10 0 0',
        text: 'Low Stock',
        action: 'showStockOut'
    },{
        xtype: 'button',
        id: 'allOrdersButton',
        margin: '0 10 0 0',
        text: 'All Orders',
        action: 'showAllOrders'
    }],
});