//main view to shift between the drugs list and groups view

Ext.define('RaxaEmr.Pharmacy.view.GroupDrugs', {
    extend: 'Ext.container.Container',
    alias: 'widget.groupdrugs',
    id: 'mainarea2',
    layout: 'card',
    width: 810,
    border: false,
    activeItem: 0,
    items: [{
        layout:{
            name: 'auto',
            pack: 'center'
        },
        border: false,
        items: [{
            xtype: 'groups'
        },{
            xtype: 'drugs'
        },{
            dockedItems:[{
                dock: 'bottom',
                border: false,
                height: 30,
                items:[{
                    xtype: 'button',
                    text: 'Back',
                    width: 50,
                    action: 'back'
                },{
                    xtype: 'button',
                    text: 'Save Changes',
                    width: 120,
                    action: 'save'
                },{
                    xtype: 'button',
                    text: 'Add To group',
                    width: 120,
                    action: 'group'
                },{
                    xtype: 'button',
                    text: 'Create New Group',
                    width: 120,
                    action: 'creategroup'
                }]
            }]
        }]
    },{
        xtype: 'alldrugs'
    }]
})