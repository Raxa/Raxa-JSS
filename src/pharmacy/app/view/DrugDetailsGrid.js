Ext.define('RaxaEmr.Pharmacy.view.DrugDetailsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.drugDetailsGrid',
    height: 250,
    width: 600,
    layout: {
        type: 'absolute'
    },
    x: 110,
    store: 'StockList',
    columns: [
    {
        xtype: 'rownumberer'
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
        width: 80,
        minValue: 0
    },
    {
        xtype: 'gridcolumn',
        text: 'Months',
        dataIndex: 'months',
        width: 60
    },
    {
        xtype: 'gridcolumn',
        text: 'Location',
        dataIndex: 'locationName',
        width: 100
    }],
    initForDrug: function(drugUuid){
        Ext.getStore('StockList').clearFilter();
        Ext.getStore('StockList').filter(function(record){
            return record.get('drugUuid')===drugUuid;
        });
    }
});