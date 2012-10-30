// Modal grid
// - Supports add, edit, and delete operations via pop-up
// - Grid itself is noneditable
Ext.define('Ext.ux.ModalGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ModalGrid',

    // to "add" new
    // Note that this should be += in addition to whatever user specifies for tools, rather than overriding
    tools:[
    {
        type:'plus',
        tooltip: 'Add',
        handler: function(event, toolEl, panel){
            Ext.create("Ext.ux.ModalGridEditor", {}).show();
        }
    }],

    // Add an additional action column
    // override create columns
    // columns: 
    initComponent:function () {
        console.log('initComponent')

        // Construct
        var me = this;
        console.log(arguments);
        this.callParent(arguments);

        // Add Column for edit and delete handlers
        var column = Ext.create('Ext.grid.ActionColumn', {
            width:50,
            menuDisabled: true,
            // sortable: false,
            // hideable: false,
            items: [{
                icon: '../resources/img/edit.png',  // Use a URL in the icon config
                tooltip: 'Edit',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    console.log("Edit " + rec.get('name'));
                    Ext.create("Ext.ux.ModalGridEditor", {}).show();
                    // Ext.create("Ext.Window", {
                    //     layout: 'fit',
                    //     width: 500,
                    //     height: 300,
                    //     modal: true,
                    //     closeAction: 'hide',    // TODO: actually delete on hide? memory hog in background?
                    //     items: new Ext.Panel({
                    //        items: [{xtype:'text', html: 'yoyo'}]//Your items here
                    //     })
                    // }).show();
                }
            }, {    
                icon: '../resources/img/delete.png',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    console.log("Terminate " + rec.get('name'));
                    Ext.Msg.confirm("Delete", "Are you sure you want to delete?", function(btn) {
                        if (btn == "yes") {
                            console.log('fake deleting...');    
                            // TODO: Actually delete the record
                       } else {
                            console.log('fake deleting (NOT!)...');    
                        }
                    });
                }
            }]
        });
        
        this.headerCt.insert(this.columns.length, column);
    },
});

Ext.define('Ext.ux.ModalGridEditor', {
    alias: 'widget.ModalGridEditor',
    extend: 'Ext.Window',
    layout: 'fit',
    width: 500,
    height: 300,
    modal: true,
    centered: true,
    title: 'Edit Modal Grid',
    closeAction: 'hide',    // TODO: actually delete on hide? memory hog in background?
    items: [{
        xtype:'panel', 
        layout: 'vbox',
        bodyPadding: 50,
        // TODO: Create fields dynamically from the associated model
        // TODO: For edit, fetch default values from the associated record in grid
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Example textfield',
        }, {
            xtype: 'panel',
            border: false,
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            items:[
                {
                xtype: 'button',
                text: 'Cancel',
                margin: '20 20 20 20',
                // action: 'cancelEditInventory',
                handler: function () {
                    console.log("cancel");
                }
            },
            {
                xtype: 'button',
                text: 'Save',
                margin: '20 20 20 20',
                // action: 'cancelEditInventory',
                handler: function () {
                    console.log("Save");
                }
            }]
        }]
    }]

    //populates inventory fields
    // init: function(record) {
    //     // TODO: Get values from UI in grid ... pass a record
    //     console.log("init")
    //     // var stock = Ext.getStore('stockList');
    //     // stock.clearFilter();
    //     // var inventory = stock.getAt(stock.find('uuid', uuid));
    //     // Ext.getCmp('inventoryEditorStatusPicker').setValue(inventory.data.status);
    //     // //Ext.getCmp('inventoryEditorDrugPicker').setRawValue(inventory.data.drugName);
    //     // Ext.getCmp('inventoryEditorDrugPicker').setValue(inventory.data.drug.uuid);
    //     // //Ext.getCmp('inventoryEditorLocationPicker').setRawValue(inventory.data.locationName);
    //     // Ext.getCmp('inventoryEditorLocationPicker').setValue(inventory.data.locationUuid);
    //     // Ext.getCmp('inventoryEditorQuantity').setValue(inventory.data.quantity);
    //     // Ext.getCmp('inventoryEditorBatch').setValue(inventory.data.batch);
    //     // if(inventory.data.expiryDate!==""){
    //     //     var date = new Date(inventory.data.expiryDate);
    //     //     Ext.getCmp('inventoryEditorExpiryDate').setValue(date);
    //     // }
    //     // Ext.getCmp('inventoryEditorRoomLocation').setValue(inventory.data.roomLocation);
    //     // Ext.getCmp('inventoryEditorSupplier').setValue(inventory.data.supplier);
    // }
});

Ext.create('Ext.data.Store', {
    storeId:'simpsonsStore',
    fields:['name', 'email', 'phone'],
    data:{'items':[
        { 'name': 'Lisa',  "email":"lisa@simpsons.com",  "phone":"555-111-1224"  },
        { 'name': 'Bart',  "email":"bart@simpsons.com",  "phone":"555-222-1234" },
        { 'name': 'Homer', "email":"home@simpsons.com",  "phone":"555-222-1244"  },
        { 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254"  }
    ]},
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'items'
        }
    }
});

Ext.define('RaxaEmr.Pharmacy.view.Viewport', {
    extend: 'Ext.container.Viewport',
    items:[
    {
        xtype: 'ModalGrid',
        title: 'Simpsons',
        store: Ext.data.StoreManager.lookup('simpsonsStore'),
        columns: [
            { text: 'Name',  dataIndex: 'name' },
            { text: 'Email', dataIndex: 'email', flex: 1 },
            { text: 'Phone', dataIndex: 'phone' }
        ],
        height: 200,
        width: 400,
        renderTo: Ext.getBody()
    }]
});