Ext.define('RaxaEmr.Pharmacy.view.goodReceiptGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.goodReceiptGrid',
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
                    text: 'Pharmacy Name'
                },
                {
                    xtype: 'numbercolumn',
                    text: 'P.O No.'
                },
                {
                    xtype: 'datecolumn',
                    text: 'Order Date'
                },
                {
                    xtype: 'numbercolumn',
                    text: 'No. of items'
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Total Qty'
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Value'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Status'
                },
                {
                    xtype: 'datecolumn',
                    text: 'Receipt Date'
                },
                {
                    xtype: 'numbercolumn',
                    text: 'Receipt No.'
                },
                {
                    xtype: 'gridcolumn',
                    text: 'Recipients Name' 
                }
            ],

    

});