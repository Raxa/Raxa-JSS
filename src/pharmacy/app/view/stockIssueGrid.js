Ext.define('RaxaEmr.Pharmacy.view.stockIssueGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.stockIssueGrid',
    height: 250,
    width: 760,
    layout: {
        type: 'absolute'
    },
    x: 400,
    columns: [
    {
        xtype: 'gridcolumn',
        text: 'Facility Name',
        width: 120
    },
    {
        xtype: 'datecolumn',
        format: 'd/m/y',
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
    }]
});