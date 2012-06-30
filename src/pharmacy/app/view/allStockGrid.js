Ext.define('RaxaEmr.Pharmacy.view.allStockGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.allStockGrid',
    height: 250,
    width: 743,
            columns: [
                {
                    xtype: 'rownumberer',
                    text: 'S.No',
                    width: 40
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Name of Drug',
                    width: 120
                },{
                    xtype: 'numbercolumn',
                    text: 'Stock Status',
                    width: 100
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Qty',
                    width: 100
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Qty expiring',
                    width: 100
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Days of Stock',
                    width: 100
                },
                {
                    xtype: 'datecolumn',
                    text: 'Order Due Date',
                    width: 120
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Qty orderdered',
                    width: 100
                }
            ]
});
