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
    
    // Add an additional action column, with edit and delete handlers
    initComponent:function () {
        this.callParent(arguments);

        // Create modal form
        var that = this;
        this.modalForm = Ext.create("Ext.ux.ModalGridEditor", {
            autogenerateFields: that.store.model.getFields()
        });
        
        // Add Column for edit and delete handlers
        // var that = this
        var column = Ext.create('Ext.grid.ActionColumn', {
            // width:50,
            menuDisabled: true,
            items: [{
                icon: '../resources/img/edit.png',  // Use a URL in the icon config
                tooltip: 'Edit',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    console.log("Edit " + rec.get('name'));
                    console.log(rec);
                    console.log(that.modalForm);
                    gloMoFo = that.modalForm;
                    //that.modalForm.formPanel.setRecord()
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
    scrollable: true,
    modal: true,
    centered: true,
    title: 'Edit Modal Grid',
    closeAction: 'hide',    // TODO: actually delete on hide? memory hog in background?
    initComponent:function () {
        this.callParent(arguments);

        // Dynamically generate fields based on the model
        console.log(this.autogenerateFields);
        var fields = this.autogenerateFields;
        var panel = Ext.create('Ext.form.Panel', {
            itemId: 'ModalGridFormPanel'
        });
        var that = this;
        
        Ext.iterate(fields, function (field) {
            // skip id field, or fields not shown in UI
            // TODO: this is risky, investigate if there's a better way to grab just user created, UI-visible fields
            if (field.name != 'id') {
                var cmp = that.getXtypeForField(field);
                panel.add(cmp);
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
                    console.log("Save");
                }
            }]
        });
            
        panel.doLayout(false, true);
        this.add(panel);
        this.doLayout(false, true);
    },
    getXtypeForField: function(field) {
        var fieldXtype = 'textfield';
        try {
            var type = field.type.type;
            switch (type) {
                case 'auto':
                    fieldXtype = 'textfield';
                    break;
                // case '':
                //     break;
                // default:
                //     break;
            }

        } catch (e) {
            console.log(e);
            console.log("exception in getXtypeForField");
        }

        return {
            xtype: fieldXtype, 
            name: field, 
            // label: field,
            fieldLabel: field.name
        };
    },
    
    //populates inventory fields
    init: function(record) {
        console.log("init")
    }
});