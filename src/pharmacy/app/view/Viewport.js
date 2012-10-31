Ext.define('RaxaEmr.Pharmacy.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: ['RaxaEmr.Pharmacy.view.pharmacyTopbar','RaxaEmr.Pharmacy.view.Inventory'],
    autoScroll: true,
    width: 960,
    autoHeight: 800,
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items:[{
        xtype: 'pharmacyTopBar',
        id: 'pharmacyTopBar'
    },{
        xtype: 'panel',
        id: 'alertPanel',
        floating: true,
        x: 500,
        y: 65,
        width: 300,
        height: 200,
        hidden: true,
        items: [{
            xtype: 'alertGrid'
        }],
        listeners:{
            'afterrender': function() {
                this.mon(Ext.getBody(), 'click', this.checkCloseClick, this);
            }
        },
            
        checkCloseClick: function (event) {
            var cx = event.getX(), cy = event.getY(),
            box = this.getBox();
            if (cx < box.x || cx > box.x + box.width || cy > box.y + box.height) {
                Ext.getCmp('alertPanel').hide();
            }
        }

    },{
        xtype: 'inventoryEditor',
        floating: true,
        x: 100,
        y: 100,
        hidden: true
    },{
        xtype: 'addDrug'
    },{
        autoScroll: true,
        layout: 'auto',
        width:960,
        items:[{
            layout: 'card',
            id: 'mainarea',
            activeItem: 3,
            items:[{
                xtype: 'prescription'
            },{
                xtype: 'reports'
            },{
                xtype: 'drugGroups'
            },{
                xtype: 'Inventory'
            },{
                xtype: 'drugDetails'
            }]
        }]
    }]
})