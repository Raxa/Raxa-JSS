Ext.define('RaxaEmr.Pharmacy.view.mainview', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.mainviews',
    id: 'mainarea',
    layout: 'card',
    activeItem: 0,
    items: [{
        xtype: 'panel',
        layout: 'auto',
        autoScroll: true,
        items: [{
            xtype: 'groups'
        },{
            xtype: 'drug'
        },
        {
            dockedItems: [{
                dock: 'bottom',
                height: 40,
                items: [{
                    xtype: 'button',
                    text: 'Back',
                    action: 'back',
                    width: 60
                },{
                    xtype: 'button',
                    text: 'Save Changes',
                    action: 'save',
                    width: 120
                },{
                    xtype: 'button',
                    text: 'Assign',
                    action: 'assign',
                    width: 60
                }
                ]
            }
            ]
        }]
    },{
        xtype: 'unassigneddrugs'
    }]
});