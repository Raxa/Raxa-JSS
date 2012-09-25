Ext.define('RaxaEmr.Pharmacy.view.DrugDetailsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.drugDetailsGrid',
    height: 250,
    width: 600,
    layout: {
        type: 'absolute'
    },
    x: 110,
    store: Ext.getStore('stockList'),
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
    }],
    initForDrug: function(drugName){
        Ext.getStore('stockList').clearFilter();
        Ext.getStore('stockList').filter(function(record){
            return record.get('drugName')===drugName;
        });
    }
});

