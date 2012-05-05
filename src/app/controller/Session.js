Ext.define('RaxaEmr.controller.Session', {
    extend: 'Ext.app.Controller',
    config: {
        before: {
            showDashboard: 'doLogin'
        },

        routes: {
            'Login': 'showLogin',
            'Dashboard': 'showDashboard'
        },

        refs: {
            signInButton: '#signInButton',
            Registration: '#Registration',
            Screener: '#Screener',
            Inpatient: '#Inpatient',
            Outpatient: '#Outpatient',
            Pharmacy: '#Pharmacy',
            Billing: '#Billing',
            Radiology: '#Radiology',
            Laboratory: '#Laboratory',
            CHW: '#CHW'
        },

        control: {
            signInButton: {
                tap: 'doLogin'
            }
        }
    },

    showDashboard: function () {
        window.location.hash = 'Dashboard';
        Ext.getCmp('mainView').setActiveItem(1);
    },

    showLogin: function () {
        window.location.hash = 'Login';
        Ext.getCmp('mainView').setActiveItem(0);
    },

    doLogin: function () {
        //sending hard-coded modules, need to GET them as privileges from server
        var currentApps = ['Registration', 'Inpatient', 'Screener', 'Pharmacy', 'Outpatient', 'Laboratory', 'Radiology', 'Billing', 'CHW'];
        Ext.getCmp('appGrid').addModules(currentApps);
        this.showDashboard();
    },

    doLogout: function () {
        //called whenever any Button with action=logout is tapped
    },

    //on entry point for application, give control to Util.getViews()
    launch: function () {
        //splash loading screen
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading'
        });
        Ext.create('Ext.Container', {
            id: 'mainView',
            fullscreen: true,
            layout: 'card',
            items: [{
                xclass: 'RaxaEmr.view.Login'
            }, {
                xclass: 'RaxaEmr.view.Dashboard'
            }]
        });

		
	//passing username & password to saveBasicAuthHeader which saves Authentication
	//header as Base64 encoded string of user:pass in localStore
	Util.saveBasicAuthHeader(username,password);

        //populating views with all the modules, sending a callback function
        Startup.populateViews(Util.getModules(), this.launchAfterAJAX);
		
     
    },

    //once Util.populateViews() is done with AJAX GET calls, it calls this function
    //to start graphics, etc
    //views is the 2-d array of view urls (see Util.populateViews() for more info)
    launchAfterAJAX: function (views) {
        //remove loading mask
        Ext.Viewport.setMasked(false);

        Ext.Viewport.add(Ext.getCmp('mainView'));
        Ext.getCmp('mainView').setActiveItem(0);
    }

});
