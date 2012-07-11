Ext.define('RaxaEmr.Pharmacy.view.allStock', {
    extend: 'Ext.container.Container',
    alias: 'widget.allStock',
    layout: {
        type: 'auto'
    },
    items:[{
        xtype: 'allStockPanel'
    },{
        xtype: 'allStockForm'
    },{
        layout: 'card',
        width: 850,
        border: false,
        activeItem: 0,
        id: 'stocklayoutarea',
        items:[{
            xtype: 'allStockGrid'
        },{
            xtype: 'stockIssueGrid'
        },{
            xtype: 'goodReceiptGrid'
        }]
    }]
})