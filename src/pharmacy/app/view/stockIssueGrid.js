Ext.define('RaxaEmr.Pharmacy.view.stockIssueGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.stockIssueGrid',
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
                    text: 'Facility Name',
                    width: 120
                },
                {
                    xtype: 'datecolumn',
                    text: 'Issue Date',
                    width: 120
                },
                {
                    xtype: 'numbercolumn',
                    text: 'No. of items',
                    width: 120
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Total Qty',
                    width: 120
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Person Name',
                    width: 120
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Status',
                    width: 120
                }
            ]


});