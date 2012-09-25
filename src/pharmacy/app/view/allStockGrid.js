Ext.define('RaxaEmr.Pharmacy.view.allStockGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.allStockGrid',
    autoHeight: 250,
    width: 600,
    margin: '0 0 0 110',
    store: Ext.create('RaxaEmr.Pharmacy.store.StockList',{
        storeId: 'stockList'
    }),
    selModel : Ext.create('Ext.selection.CellModel', {
        listeners : {
            select : function(selectionModel, record, row) {
                //on select, go to drug details page
                Ext.getCmp('mainarea').getLayout().setActiveItem(RaxaEmr_Pharmacy_Controller_Vars.PHARM_PAGES.DRUGDETAILS.value);
                Ext.getCmp('drugDetails').initForDrug(record.data.drugName);
                selectionModel.deselectAll();                
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
        text: 'batch',
        dataIndex: 'batch',
        width: 80
    },
    {
        xtype: 'gridcolumn',
        text: 'Dispense Location',
        dataIndex: 'locationName',
        width: 120
    },        
    {
        xtype: 'actioncolumn',
        width: 22,
        items: [{
            icon: '../resources/img/edit.png',
            tooltip: 'Edit Inventory',
            handler: function(grid, rowIndex, colIndex) {
                var rec = grid.getStore().getAt(rowIndex);
                if(Ext.getCmp('inventoryEditor').isHidden()){
                    Ext.getCmp('inventoryEditor').show();
                    var x = Ext.getCmp('mainarea').getEl().getX() + (Ext.getCmp('mainarea').getWidth()-Ext.getCmp('inventoryEditor').getWidth())/2;
                    Ext.getCmp('inventoryEditor').setPosition(x, 100);
                    localStorage.setItem('currentInventory', rec.get('uuid'));
                    Ext.getCmp('inventoryEditor').initForInventory(rec.get('uuid'));
                }else{
                    Ext.getCmp('inventoryEditor').hide();
                }
            }
        }]
    }]
});
