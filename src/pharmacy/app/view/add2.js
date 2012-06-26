//window opened when u want to assigna drug to a group
Ext.define('RaxaEmr.Pharmacy.view.add2', {
    extend: 'Ext.window.Window',
    alias : 'widget.add2group',

    title : 'Assign To Group',
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
                readOnly: true,
                border: false,
                name : 'drugname',
                fieldLabel: 'Drug'
            },
            {
                xtype: 'combobox',
                name: 'field2',
                emptyText: 'Group',
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