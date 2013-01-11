Ext.define('RaxaEmr.Pharmacy.view.InventoryEditor', {
    extend: 'Ext.form.Panel',
    id: 'inventoryEditor',
    alias: 'widget.inventoryEditor',
    height: 400,
    width: 400,
    modal: true,
    centered: true,
    title: 'Edit Inventory',
    layout: 'vbox',
    bodyPadding: 50,
    items: [
    {
        xtype: 'combobox',
        id: 'inventoryEditorStatusPicker',
        fieldLabel: 'Status',
        store: Ext.create('Ext.data.Store', {
            fields: ['status'],
            data : [
                {"status": RaxaEmr_Pharmacy_Controller_Vars.STOCK_STATUS.AVAILABLE},
                {"status": RaxaEmr_Pharmacy_Controller_Vars.STOCK_STATUS.ORDERED},
                {"status": RaxaEmr_Pharmacy_Controller_Vars.STOCK_STATUS.SENT},
                {"status": RaxaEmr_Pharmacy_Controller_Vars.STOCK_STATUS.OUT},
            ]
        }),
        displayField: 'status'
    },
    {
        xtype: 'combobox',
        id: 'inventoryEditorDrugPicker',
        fieldLabel: 'Drug',
        store: 'allDrugs',
        displayField: 'text',
        valueField: 'uuid'
    },
    {
        xtype: 'combobox',
        id: 'inventoryEditorLocationPicker',
        fieldLabel: 'Location',
        store: 'Locations',
        displayField: 'name',
        valueField: 'uuid',
        emptyText: 'Not Received Yet'
    },
    {
        xtype: 'textfield',
        fieldLabel: 'Quantity',
        id: 'inventoryEditorQuantity'
    },
    {
        xtype: 'textfield',
        fieldLabel: 'Batch',
        id: 'inventoryEditorBatch'
    },
    {
        xtype: 'datefield',
        fieldLabel: 'Expiry Date',
        format: 'd/m/y',
        id: 'inventoryEditorExpiryDate',
        emptyText: 'dd/mm/yy'
    },
    {
        xtype: 'textfield',
        fieldLabel: 'Shelf',
        id: 'inventoryEditorRoomLocation'
    },
    {
        xtype: 'textfield',
        fieldLabel: 'Supplier',
        id: 'inventoryEditorSupplier'
    },
    {
        xtype: 'panel',
        border: false,
        layout: {
            type: 'hbox',
            pack: 'end'
        },
        items:[
            {
            xtype: 'button',
            margin: '20 20 20 20',
            text: 'Cancel',
            action: 'cancelEditInventory',
            x: 500
        },
        {
            xtype: 'button',
            margin: '20 20 20 20',
            width: 60,
            text: 'Save',
            id: 'updateInventoryButton',
            action: 'updateInventory',
            x: 600
        }
        ]
    }],

    //populates inventory fields
    initForInventory: function(uuid) {
        var stock = Ext.getStore('StockList');
        stock.clearFilter();
        var inventory = stock.getAt(stock.find('uuid', uuid));
        Ext.getCmp('inventoryEditorStatusPicker').setValue(inventory.data.status);
        //Ext.getCmp('inventoryEditorDrugPicker').setRawValue(inventory.data.drugName);
        Ext.getCmp('inventoryEditorDrugPicker').setValue(inventory.data.drug.uuid);
        //Ext.getCmp('inventoryEditorLocationPicker').setRawValue(inventory.data.locationName);
        Ext.getCmp('inventoryEditorLocationPicker').setValue(inventory.data.locationUuid);
        Ext.getCmp('inventoryEditorQuantity').setValue(inventory.data.quantity);
        Ext.getCmp('inventoryEditorBatch').setValue(inventory.data.batch);
        if(inventory.data.expiryDate!==""){
            var date = new Date(inventory.data.expiryDate);
            Ext.getCmp('inventoryEditorExpiryDate').setValue(date);
        }
        Ext.getCmp('inventoryEditorRoomLocation').setValue(inventory.data.roomLocation);
        Ext.getCmp('inventoryEditorSupplier').setValue(inventory.data.supplier);
    }
});