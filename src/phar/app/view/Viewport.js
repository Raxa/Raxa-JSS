Ext.define('Registration.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: {
        align: 'stretch',
        pack: 'center',
        type: 'hbox',
        border: 0
    },

    requires: ['Registration.view.Home', 'Registration.view.RegistrationPart1', 'Registration.view.RegistrationPart2', 'Ext.tab.*', 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.state.*', 'Ext.form.*', ],

    initComponent: function () {
        this.items = {
            dockedItems: [{
                dock: 'bottom',
                xtype: 'toolbar',
                height: 40,
                items: [{
                    xtype: 'tbspacer',
                    width: 280
                }, {
                    xtype: 'image',
                    height: 35,
                    width: 40,
                    src: '../resources/img/icon.png'
                }]
            }],
            width: 600,
            id: 'mainarea',
            activeItem: 0,
            layout: {
                type: 'card'
            },
            region: 'center',
            items: [{
                xtype: 'home'
            }, {
                xtype: 'registrationpart1'
            }, {
                xtype: 'registrationpart2'
            }]
        };
        this.callParent();
    }
});