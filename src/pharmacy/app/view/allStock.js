Ext.define('RaxaEmr.Pharmacy.view.allStock', {
    extend: 'Ext.container.Container',
    alias: 'widget.allStock',
    layout: {
        type: 'auto'
    },
    items:[{
        xtype: 'allStockForm'
    },{
        xtype: 'allStockPanel'
    },{
        layout: 'card',
        width: 850,
        border: false,
        activeItem: 0,
        id: 'stocklayoutarea',
        //one stock grid here, then use filter to change it
        items:[{
            xtype: 'allStockGrid',
            id: 'allStockGrid'
        },{
            xtype: 'stockIssueGrid'
        }]
    }]
})