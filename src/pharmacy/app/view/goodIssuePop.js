Ext.define('RaxaEmr.Pharmacy.view.goodIssuePop', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.goodIssuePop',
    height: 250,
    width: 743,
    columns: [
    {
        xtype: 'rownumberer',
        text: 'S.N0',
        width: 50
                    
    },
    {
        xtype: 'gridcolumn',
        text: 'Name of Drug',
        width: 170
    },
    {
        xtype: 'numbercolumn',
        text: 'Qty',
        width: 170
    },
    {
        xtype: 'gridcolumn',
        text: 'Batch No.',
        width: 170
    },
    {
        xtype: 'datecolumn',
        text: 'Expiry Date',
        width: 180
    }]
});