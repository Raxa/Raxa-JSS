Ext.define('Topbar.view.TopToolbar', {
    extend: 'Ext.Toolbar',
    alias: 'widget.topbar',

    config: {
        docked: 'top',
        width: '100%',
        scrollable: false,
        items: [{
            xtype: 'label',
            html: 'JSS',
            itemId: 'JSSLabel',
            margin: 5,
        }, {
            xtype: 'label',
            html: 'Welcome,',
            itemId: 'WelcomeLabel',
            margin: 5,
        }, {
            xtype: 'label',
            id: 'UsernameLabelID',
            itemId: 'UsernameLabel',
            margin: 5,
        }, {
            xtype: 'button',
            id: 'LogoutButtonID',
            itemId: 'LogoutButton',
            margin: 5,
            right: 0,
            top: '7%',
            ui: 'action',
            text: 'Logout'
        }],
        listeners: [{
            fn: 'onLogoutButtonIDTap',
            event: 'tap',
            delegate: '#LogoutButtonID'
        }]
    },

    onLogoutButtonIDTap: function (button, e, options) {
        var logconfirm = button.LogoutButtonID;
        if (!logconfirm) {
            logconfirm = button.LogoutButtonID = Ext.widget('LogoutConfirmPanelAlias');
        }
        logconfirm.showBy(button);
    }

});