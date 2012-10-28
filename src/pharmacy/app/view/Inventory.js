Ext.define('RaxaEmr.Pharmacy.view.Inventory', {
    extend: 'Ext.container.Container',
    requires: ['RaxaEmr.Pharmacy.view.inventoryNavBar'],
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
        items: [{
            xtype: 'allStock'
        },{
            xtype: 'text',
            html: 'yo'
        }]
    }]
});