Ext.define('RaxaEmr.Pharmacy.view.stockIssue', {
    extend: 'Ext.container.Container',
    id: 'stockIssue',
    autoScroll: true,
    alias: 'widget.stockIssue',
     items:[{
        xtype: 'allStockPanel',
        x : 400
    },{
        xtype: 'allStockForm',
        x : 400
    },{
        xtype: 'stockIssueGrid',
        x : 400
    }]
});