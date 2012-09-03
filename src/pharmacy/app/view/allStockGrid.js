Ext.define('RaxaEmr.Pharmacy.view.allStockGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.allStockGrid',
    height: 250,
    width: 600,
    layout: {
        type: 'absolute'
    },
    x: 110,
    store: Ext.create('RaxaEmr.Pharmacy.store.StockList'),
    columns: [
    {
        xtype: 'rownumberer',
        text: 'S.No',
        width: 40
    },{
        xtype: 'gridcolumn',
        text: 'Status',
        dataIndex: 'status',
        width: 60
    },
    {
        xtype: 'gridcolumn',
        text: 'Name',
        dataIndex: 'drugName',
        width: 120
    },
    {
        xtype: 'gridcolumn',
        text: 'Type',
        width: 80
    },
    {
        xtype: 'numbercolumn',
        text: 'Qty',
        dataIndex: 'quantity',
        width: 80
    },
    {
        xtype: 'numbercolumn',
        text: 'Days',
        width: 60
    },
    {
        xtype: 'gridcolumn',
        text: 'Location',
        dataIndex: 'locationName',
        width: 100
    }]
});
