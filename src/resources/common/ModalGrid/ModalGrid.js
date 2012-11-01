// Modal grid
// - Supports add, edit, and delete operations via pop-up
// - Grid itself is noneditable

// TODOS:
// - Review all of my this.up and similar methods. Getting context safely, reliably?
// - Allow customizing width of action column
// - abstract New and Edit into one modal form, which pulls record accordingly
// -fix "+" icon in top right
// -how to handle depedent, readOnly fields in modal dialog?
//     -> could include these in the pop-up, but they are disabled and update in relation to existing fields
// -add new should not add a row until saved wit valid data (currently, "cancel" returns to grid with new row added)
// -validation in modal dialog
// -fix icon resource paths .. can use default extjs icons?

Ext.define('Ext.ux.ModalGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ModalGrid',
    itemId: 'ModalGrid',

    // TODO: should be += in addition to user-specified tools, not override
    // how about using tools.push() in the initComponent function
    tools:[{
        type:'plus',
        tooltip: 'Add',
        handler: function(event, toolEl, panel) {
            var mf = this.up("ModalGrid").modalForm;
            var grid = this.up("ModalGrid");

            var gridModel = grid.store.getProxy().getModel();
            var blankItem = Ext.create(gridModel, {});
            var lastItem = grid.getStore().add(blankItem);    
            rec = grid.getStore().last();
            
            mf.getComponent("ModalGridFormPanel").form.reset();
            mf.getComponent("ModalGridFormPanel").loadRecord(rec);                    
            mf.show();
            
            // mf.isNew = true;
        },
    }], 

    // showModalForm: function(isNew, record) {
    //     console.log('show modal form');
    //     this.modalForm.show();
    // },

    // Initialize grid component, with support for modal dialogs
    initComponent:function () {
        // Save the scope
        var that = this;
        
        // Create modal form
        var mf = [];
        for (var i = 0; i < that.columns.length; i++) {
            mf.push({
                text : that.columns[i].text,    // Label
                editor : that.columns[i].editor, // xtype for data entry
                dataIndex : that.columns[i].dataIndex   // where to save the data    
            });
        }
        
        this.modalForm = Ext.create("Ext.ux.ModalGridEditor", {
            autogenerateFields: mf
        });
        
        // Remove editors for all columns in the grid. Can only be edited by modals
        for (var i = 0; i < this.columns.length; i++) {
            var col = this.columns[i];
            if (col.editor) {
                col.editor = null;
            }
        }
        
        // We've built the modal form, and removed editors from the grid...
        // So now let's create the "modal"ized grid
        this.callParent(arguments);

        // Add an additional ActionColumn, with Edit and Delete controls
        var column = Ext.create('Ext.grid.ActionColumn', {
            itemId: 'modalActionColumn',
            menuDisabled: true,
            items: [{
                icon: '../resources/img/edit.png',  // Use a URL in the icon config
                tooltip: 'Edit',
                handler: function(grid, rowIndex, colIndex) {
                    mf.isNew = false;
                    var rec = grid.getStore().getAt(rowIndex);    
                    that.modalForm.getComponent("ModalGridFormPanel").form.reset();
                    that.modalForm.getComponent("ModalGridFormPanel").loadRecord(rec);                    
                    that.modalForm.show();
                }
            }, {    
                icon: '../resources/img/delete.png',
                tooltip: 'Delete',
                handler: function(grid, rowIndex, colIndex) {
                    Ext.Msg.confirm("Delete", "Are you sure you want to delete?", function(btn) {
                        if (btn == "yes") {
                            // Delete record from store
                            var rec = grid.getStore().getAt(rowIndex);
                            grid.getStore().remove(rec);
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
    scrollable: true,
    modal: true,
    centered: true,
    itemId: 'ModalGridWindow',
    title: 'Edit Modal Grid',
    closeAction: 'hide',    // TODO: actually delete on hide? memory hog in background?
    initComponent:function () {
        this.callParent(arguments);

        // Dynamically generate fields and labels based on Grid
        var fields = this.autogenerateFields;
        var panel = Ext.create('Ext.form.Panel', {
            itemId: 'ModalGridFormPanel'
        });
        var that = this;
        
        Ext.iterate(fields, function (field) {
            // TODO: Be careful. I'm referencing instead of copying objects, so when I add a field label here it's affecting the original
            if (field.editor) {
                // Add label, if it exists
                if (field.text) {
                    field.editor.fieldLabel = field.text;
                }
                
                // Set name == dataIndex. Now we can pass the data from the grid by calling setValues()
                field.editor.name = field.dataIndex;

                // Add form component
                panel.add(field.editor);
            }
        });
        
        // Add cancel and save buttons
        panel.add({
            xtype: 'container',
            border: false,
            layout: {
                type: 'hbox',
            },
            items:[
            {
                xtype: 'button',
                text: 'Cancel',
                handler: function () {
                    console.log("Cancel");
                    this.hide();
                },
                scope: this
            },
            {
                xtype: 'button',
                text: 'Save',
                handler: function () {
                    var me = this.getComponent("ModalGridFormPanel").form;
                    var rec = me.getRecord();
                    var newValues = me.getValues();

                    // TODO: Validate all new values!

                    // iterate over valid keys in the dictionary, avoid items in prototype chain
                    // http://stackoverflow.com/questions/558981/iterating-through-list-of-keys-for-associative-array-in-json
                    var keys = [];
                    for (var key in newValues) {
                      if (newValues.hasOwnProperty(key)) {
                        keys.push(key);
                      }
                    }

                    // Update value for all items
                    for (var i = 0; i < keys.length; i ++) {
                        rec.set(keys[i], newValues[keys[i]]);
                    }

                    console.log("Save");
                    this.hide();
                },
                scope: this
            }]
        });
            
        panel.doLayout(false, true);
        this.add(panel);
        this.doLayout(false, true);
    }
});