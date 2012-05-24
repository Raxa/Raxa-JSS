Ext.define('RaxaEmr.Pharmacy.view.add', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.Add',
    
    height: 100,
    width: 180,
    autoShow: true,
    layout: 'fit',
    title: 'User Assign',
    
    items: [{
        xtype: 'form',
        items: [{
            xtype: 'textfield',
            name: 'name',
            fieldLabel: 'Drug'
        },{
            xtype: 'textfield',
            name: 'group',
            fieldLabel: 'Group'
        }]
    },{
        xtype: 'button',
        text: 'Save',
        action: 'save'
    },{
        xtype: 'button',
        text: 'Cancel',
        scope: this,
        handler: this.close
    }]
});