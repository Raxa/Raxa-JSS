// Page to navigate Back to. Updated by setBackButtonTargetPage()
var backButtonPageId = -1;

Ext.define('Topbar.view.TopToolbar', {
	extend: 'Ext.Toolbar',
	alias: 'widget.topbar',
	id: 'topbar',

	config: {
		docked: 'top',
		width: '100%',
		scrollable: false,
		layout: {
			type: 'hbox',
			align: 'center',
		},
		items: [
            {
			xtype: 'label',
            /*html: 'JSS',*/
			itemId: 'JSSLabel',
			margin: 5,
            /*hidden: true,*/
			listeners: [{
				fn: function(component, options) {

					if (Ext.getCmp('mainView') == null) {
						var username = localStorage.getItem("username");
						if (username == null) {
							username = 'Guest';
						}
						//this.parent.getComponent('UsernameLabel').setHtml(username);
						var buttonUrlSettings = this.parent.add({
							xtype: 'urlSettingsButton',
							margin: 5,
							right: 0,
						});
						if (buttonLogout) {
							buttonLogout.hide();
						}
					}
					else {
						if (Ext.getCmp('mainView').getActiveItem()._activeItem === 0) {
							//this.parent.getComponent('UsernameLabel').setHtml('Guest');
							var buttonUrlSettings = this.parent.add({
								xtype: 'urlSettingsButton',
								margin: 5,
								right: 0,
							});
							if (buttonLogout) {
								buttonLogout.hide();
							}
						} else {
							/*this.parent.getComponent('UsernameLabel').setHtml(localStorage.getItem('Username'));*/
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
		},
		/*{*/
		/*xtype: 'label',*/
		/*html: 'Welcome,',*/
		/*itemId: 'WelcomeLabel',*/
		/*margin: 5,*/
		/*},*/
		/*{*/
		/*xtype: 'label',*/
		/*itemId: 'UsernameLabel',*/
		/*margin: 5,*/
		/*},*/
		{
			xtype: 'button',
			text: 'Back',
			id: 'topbarBackButton',
            hidden: true,
			/*hidden: true,*/
			handler: function(button, e, options) {
				if (backButtonPageId >= 0) {
					// TODO: This was built for Screener. Need to handle mainView across different modules
					// TODO: Add sliding animation
					// http://miamicoder.com/2012/how-to-create-a-sencha-touch-2-app-part-3/
					/*Ext.getCmp('mainView').animateActiveItem(backButtonPageId, {*/
					/*type: 'slide',*/
					/*direction: 'left'*/
					/*});*/
					Ext.getCmp('mainView').setActiveItem(backButtonPageId);
                    
                    // By default can only use back button once, and view must
                    // re-add it for it to be visible/useable
                    backButtonPageId = -1;
                    this.hide();
				}
			}
		}],

		listeners: [{
			fn: 'onLogoutButtonTap',
			event: 'tap',
			delegate: '#LogoutButton'
		}]
	},
        
        initialize: function () {
        this.add( {
            xtype: 'selectfield',
            id: 'topbarSelectfield',
            centered: true ,
            selected : true,
            value : " ",
            options: 
            Util.getSelectModules(),
            listeners: {
                change: function () {
                    console.log("inside change function");
                    var url = window.location.href;
                    if(url.indexOf("Dashboard") < 0)
                    {
                        if(Ext.getCmp('topbarSelectfield').getValue() == 'login') {
                            window.location = '../' ;
                        } else
                        {
                            var currentUrl = window.location.href;
                            if(currentUrl.indexOf(Ext.getCmp('topbarSelectfield').getValue()) < 0) {
                                window.location = '../'+Ext.getCmp('topbarSelectfield').getValue();
                            }
                        }
                    } else {
                        window.location = Ext.getCmp('topbarSelectfield').getValue();
                    }
                    if(Ext.getCmp('topbarSelectfield').getValue() == 'patientfacing') {
                        window.location = "http://patient-facing.github.com"; 
                    } 
                }
            }
        }     
        )
    },

	onLogoutButtonTap: function(button, e, options) {
		var logconfirm = button.LogoutButton;
		if (!logconfirm) {
			logconfirm = button.LogoutButton = Ext.widget('logoutConfirmPanel');
		}
		logconfirm.showBy(button);
	},

	setBackButtonTargetPage: function(itemId) {
		bb = Ext.getCmp("topbarBackButton");
		if (itemId < 0) {
			backButtonPageId = - 1;
			bb.hide();
		}
		else {
			backButtonPageId = itemId;
			bb.show();
		}
	}
});

