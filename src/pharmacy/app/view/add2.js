Ext.define('RaxaEmr.Pharmacy2.view.add2', {
    extend: 'Ext.window.Window',
    alias : 'widget.add2group',

    title : 'Assign To Group',
    layout: 'fit',
    autoShow: true,
    resizable: false,
    initComponent: function() {
        this.items = [
        {
            xtype: 'form',
            items: [
            {
                xtype: 'textfield',
                readOnly: true,
                border: false,
                name : 'drugname',
                fieldLabel: 'Drug'
            },
            {
                xtype: 'combobox',
                name: 'field2',
                editable: false,
                emptyText: 'Group',
                store: 'allgroups',
                fieldLabel: 'Add To',
                displayField: 'groupname'
            }
            ]
        }
        ];
        this.buttons = [
        {
            text: 'Save',
            action: 'save'
        },
        {
            text: 'Cancel',
            scope: this,
            handler: this.close
        }];
        this.callParent(arguments);
    }
});