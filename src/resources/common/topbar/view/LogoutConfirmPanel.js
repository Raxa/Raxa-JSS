Ext.define('Topbar.view.LogoutConfirmPanel', {
    extend: 'Ext.Panel',
    // extend: 'Ext.Container',
    // TODO: set bg color and border for better consistency with OPD?

    alias: 'widget.logoutConfirmPanel',

    config: {
        // height: 100,
        itemId: 'LogoutConfirmPanel',
        left: 0,
        top: 0,
        width: 200,
        padding: 10,
        hideOnMaskTap: true,
        layout: {
            align: 'center',
            type: 'vbox'
        },
        modal: true,
        scrollable: false,
        items: [{
            xtype: 'label',
            html: 'Logout: Are you sure?',
            itemId: 'LogoutConfrimLabel',
        }, {
            xtype: 'container',
            itemId: 'LogoutConfirmActionSheet',
            layout: {
                align: 'start',
                pack: 'center',
                type: 'hbox'
            },
            items: [{
                xtype: 'button',
                itemId: 'LogoutConfirmYes',
                minWidth: 80,
                ui: 'confirm',
                text: 'Yes',
            }, {
                xtype: 'spacer',
                width: 10,
            }, {
                xtype: 'button',
                itemId: 'LogoutConfirmNo',
                minWidth: 80,
                ui: 'decline',
                text: 'No',
            }]
        }],
        listeners: [{
            fn: 'onLogoutConfirmYesTap',
            event: 'tap',
            delegate: '#LogoutConfirmYes'
        }, {
            fn: 'onLogoutConfirmNoTap',
            event: 'tap',
            delegate: '#LogoutConfirmNo'
        }]
    },

    onLogoutConfirmYesTap: function (button, e, options) {
        Util.logoutUser();
        location.reload();
    },

    onLogoutConfirmNoTap: function (button, e, options) {
        var logconfirm = this.parent.getComponent('LogoutConfirmPanel');
        logconfirm.hide();
    }

});
