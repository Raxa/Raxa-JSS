Ext.define('RaxaEmr.Screener.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: {
        align: 'stretch',
        pack: 'center',
        type: 'hbox'
    },

    requires: ['RaxaEmr.Screener.view.Home', 'RaxaEmr.Screener.view.NewPatientsForm', 'RaxaEmr.Screener.view.DocListPanel', 'RaxaEmr.Screener.view.MapDocPanel', 'Ext.tab.*', 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.state.*', 'Ext.form.*', ],

    initComponent: function () {
        this.items = {
            dockedItems: [{
                xtype: 'toolbar',
                height: 40,
                dock: 'top',
                items: [{
                    xtype: 'image',
                    height: 35,
                    width: 40,
                    src: '../resources/img/icon.png'
                }, {
                    xtype: 'tbfill'
                }, {
                    xtype: 'button',
                    width: 60,
                    text: 'Help'
                }, {
                    xtype: 'tbseparator'
                }, {
                    xtype: 'button',
                    text: 'Preferences'
                }, {
                    xtype: 'tbseparator'
                }, {
                    xtype: 'tbtext',
                    text: 'Vikas Singh'
                }, {
                    xtype: 'tbseparator'
                }, {
                    xtype: 'button',
                    width: 60,
                    text: 'Sign Out'
                }]
            }, {
                dock: 'bottom',
                xtype: 'toolbar',
                height: 40,
                items: [{
                    xtype: 'tbspacer',
                    width: 380
                }, {
                    xtype: 'image',
                    height: 35,
                    width: 40,
                    src: '../resources/img/icon.png'
                }]
            }],
            width: 800,
            id: 'mainregarea',
            activeItem: 0,
            layout: {
                type: 'card'
            },
            margin: '2 0 2 0',
            region: 'center',
            items: [{
                xtype: 'home'
            }, {
                xtype: 'newpatientsform'
            }, {
                xtype: 'mapdocpanel'
            }, {
                xtype: 'doclistpanel'
            }]
        };
        this.callParent();
    }
});