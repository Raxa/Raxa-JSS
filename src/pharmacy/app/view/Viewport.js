Ext.define('RaxaEmr.Pharmacy.view.Viewport', {
    extend: 'Ext.container.Viewport',
    autoScroll: true,
    layout: {
        type: 'auto',
        align: 'stretch'
    },
    items:[{
        xtype: 'pharmacytopbar'
    },{
        layout: 'card',
        id: 'mainarea',
        activeItem: 0,
        items:[{
            xtype: 'prescription'
        },{
            xtype: 'goodsdetails'
        },{
            xtype: 'reports'
        },{
            xtype: 'drugGroups'
        }]
    }]
})