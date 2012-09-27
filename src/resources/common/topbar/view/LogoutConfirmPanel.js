Ext.define('Topbar.view.LogoutConfirmPanel', {
    extend: 'Ext.Panel',
    alias: 'widget.logoutConfirmPanel',

    config: {
        height: 100,
        itemId: 'LogoutConfirmPanel',
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
            itemId: 'LogoutConfrimLabel',
        }, {
            xtype: 'actionsheet',
            itemId: 'LogoutConfirmActionSheet',
            layout: {
                align: 'start',
                pack: 'center',
                type: 'hbox'
            },
            modal: false,
            items: [{
                xtype: 'button',
                itemId: 'LogoutConfirmYes',
                minWidth: 80,
                ui: 'confirm',
                text: 'Yes'
            }, {
                xtype: 'spacer',
            }, {
                xtype: 'button',
                itemId: 'LogoutConfirmNo',
                minWidth: 80,
                ui: 'decline',
                text: 'No'
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
