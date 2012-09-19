Ext.define('RaxaEmr.Pharmacy.view.allStockGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.allStockGrid',
    autoHeight: 250,
    width: 600,
    margin: '0 0 0 110',
    store: Ext.create('RaxaEmr.Pharmacy.store.StockList',{
        storeId: 'stockList'
    }),
    selModel : Ext.create('Ext.selection.RowModel', {
        listeners : {
            select : function(rowModel, record, rowIndex) {
                //on select, go to drug details page
                Ext.getCmp('mainarea').getLayout().setActiveItem(RaxaEmr_Pharmacy_Controller_Vars.PHARM_PAGES.DRUGDETAILS.value);
                Ext.getCmp('drugDetails').initForDrug(record.data.drugName);
            },
            scope : this
        }  
    }),    
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
        text: 'Qty',
        dataIndex: 'quantity',
        width: 80
    },
    {
        xtype: 'gridcolumn',
        text: 'Days',
        width: 60,
        dataIndex: 'days',
        useNull: true
    },
    {
        xtype: 'gridcolumn',
        text: 'Shelf',
        dataIndex: 'roomLocation',
        width: 100
    },
    {
        xtype: 'gridcolumn',
        text: 'Dispense Location',
        dataIndex: 'locationName',
        width: 120
    }]
});
