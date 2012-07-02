//window created when a new group is to be created
var states = Ext.create('Ext.data.Store', {
    fields: ['type'],
    readOnly: true,
    data : [ 
        {"type": '1A'},
        {"type": '1B'},
        {"type": '1C'},
        {"type": '1D'},
        {"type": '2B'},
        {"type": '2C'},
        {"type": '3D'}
    ]
});

Ext.define('RaxaEmr.Pharmacy.view.add', {
    extend: 'Ext.window.Window',
    alias : 'widget.addgroup',

    title : 'Create New Group',
    layout: 'fit',
    autoShow: true,
    resizable: false,
    modal: true,
    initComponent: function() {
        this.items = [
        {
            xtype: 'form',
            items: [
            {
                xtype: 'textfield',
                name : 'groupname',
                fieldLabel: 'Group Name'
            },
            {
                xtype: 'combobox',
                name: 'regimen',
                editable: false,
                emptyText: 'Regimen',
                fieldLabel: 'Regimen',
                store: states,
                displayField: 'type'
            }
            ]
        }
        ];
        this.buttons = [
        {
            text: 'Save',
            action: 'savegroup'
        },
        {
            text: 'Cancel',
            scope:  this,
            handler: this.close
        }];
        this.callParent(arguments);
    }
});