// Modal grid
// - Supports add, edit, and delete operations via pop-up
// - Grid itself is noneditable
Ext.define('Ext.ux.ModalGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ModalGrid',
    itemId: 'modal-grid',
    // to "add" new
    // Note that this should be += in addition to whatever user specifies for tools, rather than overriding
    
    tools:[{
        type:'plus',
        tooltip: 'Add',
        handler: function(event, toolEl, panel) {
            gloEvent = event;
            gloTool = toolEl;
            // toolEl.up('ModalGrid')
            console.log(this);
            console.log(panel);
            gloP = panel;
            // panel.showModalForm();
        },
        // TODO: fix scope issues so can call "show modal form"
        // http://jsfiddle.net/chaoszcat/sHrGH/
        scope: this
    }], 

    showModalForm: function() {
        console.log('show modal form');
        this.modalForm.show();
    },
    
    // TODO: formFields:
    //  // with all theirs special handlers, like autocomplete, and relationships among the fields
    //

    // Add an additional action column, with edit and delete handlers
    initComponent:function () {
        

        gloModalGrid = this;
        // Create modal form
        var mf = [];
        var that = this;
        for (var i = 0; i < that.columns.length; i++) {
            console.log(i);
            mf.push({
                text : that.columns[i].text,    // Label
                editor : that.columns[i].editor, // xtype for data entry
                dataIndex : that.columns[i].dataIndex   // where to save the data    
            });
        }
        console.log(mf);
        this.modalForm = Ext.create("Ext.ux.ModalGridEditor", {
            // autogenerateFields: that.store.model.getFields()
            autogenerateFields: mf
        });
        
        this.callParent(arguments);

        // Add Column for edit and delete handlers
        // var that = this
        var column = Ext.create('Ext.grid.ActionColumn', {
            // width:50,
            menuDisabled: true,
            items: [{
                icon: '../resources/img/edit.png',  // Use a URL in the icon config
                tooltip: 'Edit',
                handler: function(grid, rowIndex, colIndex) {
                    // <<NEW>> vs EDIT
                    gloGrid = grid;
                    var isNew = false;
                    var rec;
                    if (isNew) {
                        var gridModel = grid.store.getProxy().getModel();
                        var blankItem = Ext.create(gridModel, {});
                        var lastItem = grid.getStore().add(blankItem);    
                        rec = grid.getStore().last();
                    } else {
                        rec = grid.getStore().getAt(rowIndex);    
                    }
                    
                    // TODO: This is failing to load vales for DATE field
                    // TODO: Determine how to "Save" values from modal popup
                    that.modalForm.getComponent("ModalGridFormPanel").form.reset();
                    that.modalForm.getComponent("ModalGridFormPanel").loadRecord(rec);                    
                    that.modalForm.show();
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
                            grid.getStore().remove(rec);
                       } else {
                            console.log('fake deleting (NOT!)...');    
                        
}                    });
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
    title: 'Edit Modal Grid',
    closeAction: 'hide',    // TODO: actually delete on hide? memory hog in background?
    initComponent:function () {
        this.callParent(arguments);

        // Dynamically generate fields and labels based on Grid
        console.log(this.autogenerateFields);
        var fields = this.autogenerateFields;
        var panel = Ext.create('Ext.form.Panel', {
            itemId: 'ModalGridFormPanel'
        });
        var that = this;
        
        Ext.iterate(fields, function (field) {
            // TODO: Be careful. I'm referencing instead of copying objects, so when I add a field label here it's affecting the original
            if (field.editor) {
                console.log(field.editor);

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
                    console.log("cancel");
                }
            },
            {
                xtype: 'button',
                text: 'Save',
                handler: function () {
                    // TODO: Get the context better?
                    var me = this.getComponent("ModalGridFormPanel").form;
                    var rec = me.getRecord();
                    var newValues = me.getValues();

                    // iterate over valid keys in the dictionary, avoid items in prototype chain
                    // http://stackoverflow.com/questions/558981/iterating-through-list-of-keys-for-associative-array-in-json
                    var keys = [];
                    for (var key in newValues) {
                      if (newValues.hasOwnProperty(key)) {
                        keys.push(key);
                      }
                    }

                    for (var i = 0; i < keys.length; i ++) {
                        rec.set(keys[i], newValues[keys[i]]);
                    }

                    console.log("Save");
                },
                scope: this
            }]
        });
            
        panel.doLayout(false, true);
        this.add(panel);
        this.doLayout(false, true);
    },
    // getXtypeForField: function(field) {
    //     var fieldXtype = 'textfield';
    //     try {
    //         var type = field.type.type;
    //         switch (type) {
    //             case 'auto':
    //                 fieldXtype = 'textfield';
    //                 break;
    //             // case '':
    //             //     break;
    //             // default:
    //             //     break;
    //         }

    //     } catch (e) {
    //         console.log(e);
    //         console.log("exception in getXtypeForField");
    //     }

    //     return {
    //         xtype: fieldXtype, 
    //         name: field, 
    //         // label: field,
    //         fieldLabel: field.name
    //     };
    // },
    
    //populates inventory fields
    init: function(record) {
        console.log("init")
    }
});