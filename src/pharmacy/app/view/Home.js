Ext.define('RaxaEmr.Pharmacy2.view.Home', {
    extend: 'Ext.container.Container',
    alias: 'widget.home',
    id: 'mainarea',
    layout: 'card',
    width: 810,
    border: false,
    activeItem: 0,
    items: [{
        layout: 'auto',
        border: false,
        items: [{
            xtype: 'groupgrid'
        },{
            xtype: 'druggrid'
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
                    action: 'create'
                }]
            }]
        }]
    },{
        xtype: 'alldrugs'
    }]
})