Ext.define('RaxaEmr.Pharmacy.view.goodReceiptGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.goodReceiptGrid',
    height: 250,
    width: 743,
    layout: 'absolute',
    x: 110,
    columns: [
    {
        xtype: 'rownumberer',
        text: 'S.No',
        width: 30
    },
    {
        xtype: 'gridcolumn',
        text: 'Pharmacy Name',
        width: 120
    },
    {
        xtype: 'numbercolumn',
        text: 'P.O No.',
        width: 60
    },
    {
        xtype: 'datecolumn',
        text: 'Order Date',
        width: 80
    },
    {
        xtype: 'numbercolumn',
        text: 'No. of items',
        width: 60
    },
    {
        xtype: 'numbercolumn',
        text: 'Total Qty',
        width: 60
    },
    {
        xtype: 'numbercolumn',
        text: 'Value',
        width: 60
    },
    {
        xtype: 'gridcolumn',
        text: 'Status',
        width: 80
    },
    {
        xtype: 'datecolumn',
        text: 'Receipt Date',
        width: 60
    },
    {
        xtype: 'numbercolumn',
        text: 'Receipt No.',
        width: 60
    },
    {
        xtype: 'gridcolumn',
        text: 'Recipients Name' ,
        width: 100
    }]
});