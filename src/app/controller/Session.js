Ext.define('RaxaEmr.controller.Session', {
    extend: 'Ext.app.Controller',
    config: {
        before: {
            showDashboard: 'loginSuccess'
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

    /**
     * For a given userInfo containing the uuid for a user, stores their associated
     * privileges in localStorage
     * @param userInfo: contains a link to the full information listing of a user
     */
    storeUserPrivileges: function (userInfo) {
        var userInfoJson = Ext.decode(userInfo.responseText);
        if (userInfoJson.results.length !== 0) {
            Ext.Ajax.request({
            	scope:this,
                url: userInfoJson.results[0].links[0].uri + '?v=full',
                method: 'GET',
                headers: Util.getBasicAuthHeaders(),
                success: function (response) {
                    var privilegesJson = Ext.decode(response.responseText);
                    //only adding necessary fields for localStorage
                    var privilegesArray = [];
                    for (i = 0; i < privilegesJson.privileges.length; i++) {
                        privilegesArray[i] = {
                            'name': privilegesJson.privileges[i].name,
                            'description': privilegesJson.privileges[i].description
                        };
                    }
                    localStorage.setItem("privileges", Ext.encode(privilegesArray));
                    console.log(localStorage.getItem("privileges"));
                    this.loginSuccess();
                }
            });
        } else {
            // showing modal alert and stop loading mask
            Ext.Msg.alert("Invalid user name");
            this.launchAfterAJAX();
        }
    },

    // doLogin functions populates the views in the background while transferring
    // the view to dashboard
    doLogin: function() {
        var name = Ext.getCmp('userName').getValue();
        if (name === "") {
            return;
        }

        //passing username & password to saveBasicAuthHeader which saves Authentication
        //header as Base64 encoded string of user:pass in localStore
        Util.saveBasicAuthHeader(username, password);

        //splash loading screen, mask on 'mainview'
        Ext.getCmp('mainView').setMasked({
            xtype: 'loadmask',
            message: 'Loading'
        });

        // check for user name validity and privileges
        this.getUserPrivileges(name);

        //populating views with all the modules, sending a callback function
        Startup.populateViews(Util.getModules(), this.launchAfterAJAX);
    },

    // Add the dashboard components to the appGrid view
    loginSuccess: function () {
        //TODO: GET modules as privileges from server
        var currentApps = ['Registration', 'Inpatient', 'Screener', 'Pharmacy', 'Outpatient', 'Laboratory', 'Radiology', 'Billing', 'CHW'];
        Ext.getCmp('appGrid').addModules(currentApps);
        this.showDashboard();
    },

    /**
     * Stores the privilege name+url in localStorage for the given userInfo uuid
     * Privileges are stored in the form of a Json string corresponding to:
     * [ { 'name': 'Screener PatientView', 'description': 'screener/#PatientView' }
     *   { 'name': 'Login Dashboard', 'description': '../scr/#Dashboard' }
     *   ...
     * ]
     * To retrieve the string, use localStorage.getItem("privileges")
     * @param username: user with associated privileges
     */
    getUserPrivileges: function (username) {
        Ext.Ajax.request({
        	scope: this,
            url: HOST + '/ws/rest/v1/user?q=' + username,
            method: 'GET',
            headers: Util.getBasicAuthHeaders(),
            success: this.storeUserPrivileges
        });
    },

    doLogout: function () {
        //called whenever any Button with action=logout is tapped
    },

    //on entry point for application, give control to Util.getViews()
    launch: function () {
        Ext.create('Ext.Container', {
            id: 'mainView',
            fullscreen: true,
            layout: 'card',
            items: [{
                xclass: 'RaxaEmr.view.Login'
            }, {
                xclass: 'RaxaEmr.view.AppGrid'
            }]
        });
    },

    //once Util.populateViews() is done with AJAX GET calls, it calls this function
    //to start graphics, etc
    //views is the 2-d array of view urls (see Util.populateViews() for more info)
    launchAfterAJAX: function (views) {
        //remove loading mask
        Ext.getCmp('mainView').setMasked(false);
    }

});
