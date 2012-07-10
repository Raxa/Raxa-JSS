Ext.define('RaxaEmr.Pharmacy.view.allStock', {
    extend: 'Ext.container.allStock',
    items:[{
        xtype: 'allStockPanel'
    },{
        xtype: 'allStockForm'
    },{
        xtype: 'allStockGrid'
    }]
    
})