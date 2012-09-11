PHARMACYTOPBARHEIGHT = 65;

Ext.define('RaxaEmr.Pharmacy.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: 'RaxaEmr.Pharmacy.view.pharmacyTopbar',
    autoScroll: true,
    width: 960,
    layout: {
        type: 'vbox',
        align: 'center'
    },
    items:[{
        xtype: 'pharmacytopbar',
        id: 'pharmacytopbar'
    },{
        xtype: 'panel',
        id: 'alertPanel',
        floating: true,
        //dock: 'right',
        x: 500,
        y: 65,
        width: 300,
        height: 300,
        hidden: true,
        //scroll: false,
        //layout: 'absolute',
        items: [{
            xtype: 'alertGrid'
        }]
    },{
        autoScroll: true,
        layout: 'auto',
        width:960,
        items:[{
            layout: 'card',
            id: 'mainarea',
            activeItem: 0,
            items:[{
                xtype: 'prescription'
            },{
                xtype: 'goodsIssue'
            },{
                xtype: 'reports'
            },{
                xtype: 'drugGroups'
            },{
                xtype: 'allStock'
            },{
                xtype: 'requisition'
            },{
                xtype: 'goodsReceipt'
            },{
                xtype: 'drugDetails'
            }]
        }]
    }]
})