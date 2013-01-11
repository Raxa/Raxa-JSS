Ext.define('RaxaEmr.Pharmacy.view.allStockGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.allStockGrid',
    id: 'allStockGrid',   
    width: 780 - 2, // Total pixels - Border
    margin: '0 0 0 0',
    store: 'StockList',
    features: [Ext.create('Ext.grid.feature.Grouping',{
        startCollapsed: true,
        
        groupHeaderTpl: 
        [
        '{name}',
        '{[this.formatName(values)]}',
        {
            formatName: function(values) {
                var total = 0;
                var firstSupplier;
                var fewestMonths;
                        
                for(var i=0; i<values.children.length; i++){
                    total+=values.children[i].data.quantity;
                }
                return "total: "+total;
            }
        }
        ]
    })
    ],
    selModel : Ext.create('Ext.selection.RowModel', {
        listeners : {
            select : function(selectionModel, record, row) {
                //on select, go to drug details page
                selectionModel.deselectAll();
                Ext.getCmp('mainarea').getLayout().setActiveItem(RaxaEmr_Pharmacy_Controller_Vars.PHARM_PAGES.DRUGDETAILS.value);
                Ext.getCmp('drugDetails').initForDrug(record.data.drugUuid);
            },
            scope : this
        }
    }),
    columns: [
    {
        xtype: 'rownumberer'
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
        text: 'Status',
        dataIndex: 'status',
        width: 60
    },
    {
        xtype: 'gridcolumn',
        text: 'Type',
        dataIndex: 'dosageForm',
        width: 60
    },
    {
        xtype: 'gridcolumn',
        text: 'Days',
        width: 45,
        renderer: function(value){
            if(value <= 0){
                return '-';
            }
            return value;
        },
        dataIndex: 'days',
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
       
    viewConfig: {
        getRowClass: function(record, rowIndex, rowParams, store) {
            if(Util.daysFromNow((record.data.expiryDate)) <=  61 && Util.daysFromNow((record.data.expiryDate)) >  0) {
                return 'pharmacyTwoMonths-color-grid .x-grid-cell ';
            }
            if(Util.daysFromNow((record.data.expiryDate)) <=  0 ) {
                return 'pharmacyExpire-color-grid .x-grid-cell ';
            }
        }
    }
});
