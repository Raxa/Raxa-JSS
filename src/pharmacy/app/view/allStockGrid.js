Ext.define('RaxaEmr.Pharmacy.view.allStockGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.allStockGrid',
    id: 'allStockGrid',   
    width: 780 - 2, // Total pixels - Border
    margin: '0 0 0 0',
    store: Ext.create('RaxaEmr.Pharmacy.store.StockList',{
        storeId: 'stockList',
        listeners: {
            load: function() {
                //we need a second store to get the supplier, as OpenMRS doesn't have it in the normal drug
                if(!Ext.getStore('drugInfos')){
                    var store = Ext.create('RaxaEmr.Pharmacy.store.DrugInfos',{
                        storeId: 'drugInfos',
                        listeners: {
                            load: function() {
                                Ext.getCmp('allStockGrid').updateFields();
                            }
                        }
                    });
                }
                else {
                    Ext.getCmp('allStockGrid').updateFields();
                }
            }
        }
        
    }),
    selModel : Ext.create('Ext.selection.CellModel', {
        listeners : {
            select : function(selectionModel, record, row) {
                //on select, go to drug details page
                Ext.getCmp('mainarea').getLayout().setActiveItem(RaxaEmr_Pharmacy_Controller_Vars.PHARM_PAGES.DRUGDETAILS.value);
                Ext.getCmp('drugDetails').initForDrug(record.data.drugUuid);
                selectionModel.deselectAll();
            },
            scope : this
        }
    }),
    columns: [
    {
        xtype: 'gridcolumn',
        text: 'Status',
        dataIndex: 'status',
        width: 60,
        style: {
                'background-color':'blue'
            }
    },
    {
        xtype: 'gridcolumn',
        text: 'Type',
        dataIndex: 'dosageForm',
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
        width: 60
    },
    {
        xtype: 'gridcolumn',
        text: 'Days',
        width: 45,
        dataIndex: 'months',
        useNull: true
    },
    {
        xtype: 'gridcolumn',
        text: 'Shelf',
        dataIndex: 'roomLocation',
        width: 50
    },
    {
        xtype: 'gridcolumn',
        text: 'batch',
        dataIndex: 'batch',
        width: 60
    },
    {
        xtype: 'gridcolumn',
        text: 'Dispense Location',
        dataIndex: 'locationName',
        width: 120
    },
    {
        xtype: 'gridcolumn',
        text: 'Supplier',
        dataIndex: 'supplier',
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
    }],
    
    updateFields: function() {
        var infoStore = Ext.getStore('drugInfos');
        var myStore = this.getStore();
        for(var i=0; i<myStore.data.items.length; i++){
            var item = myStore.data.items[i];
            var index = infoStore.find('drugUuid', item.data.drugUuid);
            if(index!==-1 && (item.data.supplier===null || item.data.supplier==="")){
                item.set("supplier", infoStore.getAt(index).data.description);
            }
            if(item.data.batch!==null && item.data.batch!=="" && item.data.quantity!==0){
                item.set("batchQuantity", item.data.batch+" ("+item.data.quantity+")");
            }
            else{
                item.set("batchQuantity", null);
            }
            if(item.data.expiryDate!==""){
                var daysLeft = Util.daysFromNow(item.data.expiryDate)
                if(daysLeft > 0) {
                item.set("months", daysLeft );
                } else {
                item.set("months", "exp" );    
                }
            } 
             else {
                item.set("months", null);
            }
        }
    },
   
   viewConfig: {
        getRowClass: function(record, rowIndex, rowParams, store) {
            if(Util.monthsFromNow((record.data.expiryDate)) <=  2 && Util.monthsFromNow((record.data.expiryDate)) >  0) {
            return 'pharmacyTwoMonths-color-grid .x-grid-cell ';
            }
            if(Util.monthsFromNow((record.data.expiryDate)) <=  0 ) {
            return 'pharmacyExpire-color-grid .x-grid-cell ';
            }
        }
    }
});
