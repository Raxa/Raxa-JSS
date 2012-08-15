Ext.define('Topbar.view.TopToolbar', {
    extend: 'Ext.Toolbar',
    alias: 'widget.topbar',

    config: {
        docked: 'top',
        width: '100%',
        scrollable: false,
        layout: {
            type: 'hbox',
            align: 'center',
        },
        items: [{
            xtype: 'label',
            html: 'JSS',
            itemId: 'JSSLabel',
            margin: 5,
	    id:'itembar',
 	

            listeners: [{
                fn: function (component, options) {
			  

                    if(Ext.getCmp('mainView')==null)
                    {
                       var username = localStorage.getItem("username");
                       if(username==null)
                       {
                           username='Guest';
                       }
                       this.parent.getComponent('UsernameLabel').setHtml(username);
                        var buttonUrlSettings = this.parent.add({
                            xtype: 'urlSettingsButton',
                            margin: 5,
                            right: 0,
                        });
                        if (buttonLogout) {
                            buttonLogout.hide();
                        }
                    }
                    else
                    {
                    if (Ext.getCmp('mainView').getActiveItem()._activeItem === 0) {
                        this.parent.getComponent('UsernameLabel').setHtml('Guest');
                        var buttonUrlSettings = this.parent.add({
                            xtype: 'urlSettingsButton',
                            margin: 5,
                            right: 0,
                        });
                        if (buttonLogout) {
                            buttonLogout.hide();
                        }
                    } else {
                        this.parent.getComponent('UsernameLabel').setHtml(localStorage.getItem('Username'));
                        var buttonLogout = this.parent.add({
                            xtype: 'button',
                            itemId: 'LogoutButton',
                            margin: 5,
                            right: 0,
                            ui: 'action',
                            text: 'Logout',
                        });
                        if (buttonUrlSettings) {
                            buttonUrlSettings.hide();
                        }
                        }
                    }
                },
                event: 'painted',
                buffer: 10
            }]
        }, {
            xtype: 'label',
            html: 'Welcome,',
            itemId: 'WelcomeLabel',
            margin: 5,
        }, {
            xtype: 'label',
            itemId: 'UsernameLabel',
            margin: 5,
        },
	

],
        listeners: [{
            fn: 'onLogoutButtonTap',
            event: 'tap',
            delegate: '#LogoutButton'
        }]
    },

    onLogoutButtonTap: function (button, e, options) {
        var logconfirm = button.LogoutButton;
        if (!logconfirm) {
            logconfirm = button.LogoutButton = Ext.widget('logoutConfirmPanel');
        }
        logconfirm.showBy(button);
    }

});
