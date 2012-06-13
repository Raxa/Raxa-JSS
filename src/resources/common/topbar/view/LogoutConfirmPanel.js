Ext.define('Topbar.view.LogoutConfirmPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.LogoutConfirmPanelAlias',

    config: {
        height: 100,
        id: 'LogoutConfirmPanelID',
        left: 0,
        top: 0,
        width: 200,
        hideOnMaskTap: true,
        layout: {
            align: 'center',
            type: 'vbox'
        },
        modal: true,
        scrollable: false,
        items: [{
            xtype: 'label',
            html: 'Are you sure?',
            id: 'LogoutConfirmLabelID',
            itemId: 'LogoutConfrimLabel',
        }, {
            xtype: 'actionsheet',
            id: 'LogoutConfirmActionSheetID',
            itemId: 'LogoutConfirmActionSheet',
            layout: {
                align: 'start',
                pack: 'center',
                type: 'hbox'
            },
            modal: false,
            items: [{
                xtype: 'button',
                id: 'LogoutConfirmYesID',
                itemId: 'LogoutConfirmYes',
                minWidth: 80,
                ui: 'confirm',
                text: 'Yes'
            }, {
                xtype: 'button',
                id: 'LogoutConfirmNoID',
                itemId: 'LogoutConfirmNo',
                minWidth: 80,
                ui: 'decline',
                text: 'No'
            }]
        }],
        listeners: [{
            fn: 'onLogoutConfirmYesIDTap',
            event: 'tap',
            delegate: '#LogoutConfirmYesID'
        }, {
            fn: 'onLogoutConfirmNoIDTap',
            event: 'tap',
            delegate: '#LogoutConfirmNoID'
        }]
    },

    onLogoutConfirmYesIDTap: function (button, e, options) {
        Util.logoutUser();
        var logconfirm = Ext.getCmp('LogoutConfirmPanelID');
        logconfirm.hide();
    },

    onLogoutConfirmNoIDTap: function (button, e, options) {
        var logconfirm = Ext.getCmp('LogoutConfirmPanelID');
        logconfirm.hide();
    }

});