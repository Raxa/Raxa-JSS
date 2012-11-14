Ext.define('RaxaEmr.Pharmacy.view.Inventory', {
    extend: 'Ext.container.Container',
    requires: ['RaxaEmr.Pharmacy.view.inventoryNavBar', 'RaxaEmr.Pharmacy.view.requisition'],
    alias: 'widget.Inventory',
    layout: {
        type: 'hbox'
    },
    items: [{
        // Left Navigation
        xtype: 'inventoryNavBar'
    }, {
        // Main Page body
        id: 'inventoryMainArea',
        xtype: 'container',
        layout: 'card',
        activeItem: 0,
        items: [{
            xtype: 'allStock'
        }, {
            xtype: 'requisition'
        }, {
            xtype: 'goodsIssue'
        }, {
            xtype: 'goodsReceipt'
        }]
    }]
});