/**
 * Copyright 2012, Raxa
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
Ext.define('RaxaEmr.controller.Session', {
    extend: 'Ext.app.Controller',
    config: {


        routes: {
            'Login': 'showLogin',
            'Dashboard': 'showDashboard'
        },

        refs: {
            passwordID: '#passwordID',
            userName: '#userName',
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
            passwordID: {
                action: 'doLogin'
            },
            userName: {
                action: 'doLogin'
            },
            signInButton: {
                tap: 'doLogin'
            }
        }
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
        Ext.getCmp('mainView').setMasked({
                xtype: 'loadmask',
                message: 'Loading'
            });
        var userInfoJson = Ext.decode(userInfo.responseText);
        if (userInfoJson.results.length !== 0) {
            Ext.Ajax.setTimeout(Util.getTimeoutLimit());
            Ext.Ajax.request({
                scope: this,
                url: HOST + '/ws/rest/v1/user/' + userInfoJson.results[0].uuid + '?v=full',
                method: 'GET',
                withCredentials: true,
                useDefaultXhrHeader: false,
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
                    for (j = 0; j < privilegesJson.roles.length; j++) {
                        if(privilegesJson.roles[j].name === 'Provider'){
                            localStorage.setItem('loggedInUser',privilegesJson.person.uuid);
                        }
                        if(privilegesJson.roles[j].name === 'System Developer'){
                            privilegesArray[i] = {
                                'name': 'all privileges',
                                'description': 'allprivileges'
                            };
                        }
                    }
                    localStorage.setItem("privileges", Ext.encode(privilegesArray));
                    //saving the provider uuid into localstorage
                    Util.getLoggedInProviderUuid();
                    this.loginSuccess();
                },
                failure: function () {
                    Ext.getCmp('mainView').setMasked(false);
                    Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.controller.session.alert'));
                }
            });
        } else {
            // showing modal alert and stop loading mask
            Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.controller.session.usernamealert'));
            this.launchAfterAJAX();
        }
    },

    // doLogin functions populates the views in the background while transferring
    // the view to dashboard
    doLogin: function () {
        var username = Ext.getCmp('userName').getValue();
        localStorage.setItem("username", username);

        if (username === "") {
            Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.controller.session.blankusername'));
            return;
        }

        var password = Ext.getCmp('passwordID').getValue();
        if (password === "") {
            Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.controller.session.blankpassword'));
            return;
        }

        //passing username & password to saveBasicAuthHeader which saves Authentication
        //header as Base64 encoded string of user:pass in localStore
        Util.saveBasicAuthHeader(username, password);

        // check for user name validity and privileges
        this.getUserPrivileges(username);
        //populating views with all the modules, sending a callback function
        //only run this as postuser
        if(localStorage.getItem("username")==="postuser"){
            //splash loading screen, mask on 'mainview'
            Ext.getCmp('mainView').setMasked({
                xtype: 'loadmask',
                message: 'Loading'
            });
            Startup.populateViews(Util.getModules(), this.launchAfterAJAX);            
        }
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
        Ext.Ajax.setTimeout(Util.getTimeoutLimit());
        Ext.Ajax.request({
            scope: this,
            withCredentials: true,
            useDefaultXhrHeader: false,
            url: HOST + '/ws/rest/v1/user?q=' + username,
            method: 'GET',
            headers: Util.getBasicAuthHeaders(),
            success: this.storeUserPrivileges,
            failure: function () {
                Ext.getCmp('mainView').setMasked(false);
                Ext.Msg.alert(Ext.i18n.appBundle.getMsg('RaxaEmr.controller.session.alert'));
            }
        });
    },

    /**
     * Called when login is successful for the given user, populates AppGrid with the user's modules
     */
    loginSuccess: function () {
        Startup.getResourceUuid();
        Startup.repeatUuidLoadingEverySec();
        var numAppsAvailable = this.addModulesToDashboard();
        //if only 1 app available, send to that page
        if (numAppsAvailable === 1) {
            window.location = userModules[0];
        }
        //if no apps available, alert the user
        else if (numAppsAvailable === 0) {
            Ext.Msg.alert("No Privileges Found", "Contact your system administrator");
        }
        //otherwise show the AppGrid
        else {
            window.location.hash = 'Dashboard';
            Ext.getCmp('mainView').setActiveItem(2);
        }
    },

    /**
     * Helper function to add all required modules into Dashboard
     */
    addModulesToDashboard: function(){
        var privileges = localStorage.getItem("privileges");
        var allModules = Util.getModules();
        var allApps = Util.getApps();
        var userModules = [];
        //starting at index=1 here, don't need app button for 'login'
        for (i = 1; i < allModules.length; i++) {
            //checking if user is allows to view the module
            if(privileges.indexOf('RaxaEmrView '+allModules[i])!==-1 || privileges.indexOf('all privileges')!==-1){
                userModules[userModules.length] = allModules[i];
            }
        }
        Ext.getCmp('appGrid').addModules(userModules);
        Ext.getCmp('smartApp').addApps(allApps);
        return userModules.length;
    },

    showDashboard: function () {
        this.addModulesToDashboard();
        window.location.hash = 'Dashboard';
        Ext.getCmp('mainView').setActiveItem(2);
    },

    //This function determines the login state
    //If already logged in, it redirects to the dashboard
    getLoginState: function () {
        var loginState = Ext.getCmp('mainView').getActiveItem()._activeItem;
        if (localStorage.getItem('basicAuthHeader')) {
            this.loginSuccess();
            Ext.getCmp('mainView').setActiveItem(2);
        }
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
            }, {
                xclass: 'RaxaEmr.view.AppCarousel'
            }]
        });
        this.getLoginState();
    },

    //once Util.populateViews() is done with AJAX GET calls, it calls this function
    //to start graphics, etc
    //views is the 2-d array of view urls (see Util.populateViews() for more info)
    launchAfterAJAX: function (views) {
        //remove loading mask
        Ext.getCmp('mainView').setMasked(false);
    }

});
