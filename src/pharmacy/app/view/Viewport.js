PHARMACYTOPBARHEIGHT = 65;

Ext.define('RaxaEmr.Pharmacy.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: 'RaxaEmr.Pharmacy.view.pharmacyTopbar',
    autoScroll: true,
    width: 960,
    autoHeight: 800,
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
        x: 500,
        y: 65,
        width: 300,
        height: 200,
        hidden: true,
        items: [{
            xtype: 'alertGrid'
        }]
    },{
        xtype: 'addDrug'
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