/* 
 * This class provides util methods that are shared by the core, apps and modules
 */
if (localStorage.getItem("host") == null) {
    var HOST = 'http://raxaemr.jelastic.servint.net/openmrs';
} else HOST = localStorage.getItem("host");

var Util = {
    /**
     * Returns all the headers required for Basic Authenticated REST calls
     * @return headers object that includes Authorization, Accept and Content-Type
     */
    getBasicAuthHeaders: function () {
        var headers = {
            "Authorization": localStorage.getItem("basicAuthHeader"),
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        return headers;
    },
    
    /**
     * Logout the current user. Ends the current session
     */
    logoutUser: function () {
        Ext.Ajax.request({
            url: HOST + '/ws/rest/v1/session',
            withCredentials: true,
            useDefaultXhrHeader: false,
            method: 'DELETE',
            success: function () {
                // do nothing
            }
        });
    },
    
    /**
     * Saves the Basic Authentication header to Localstorage
     * Verifies if username + password is valid on server and saves as Base64 encoded string of user:pass
     */
    saveBasicAuthHeader: function (username, password) {
        Util.logoutUser(); // Delete existing logged in sessions
        // Check login and save to localStorage if valid
        Ext.Ajax.request({
            url: HOST + '/ws/rest/v1/session',
            withCredentials: true,
            useDefaultXhrHeader: false,
            headers: {
                "Accept": "application/json",
                "Authorization": "Basic " + window.btoa(username + ":" + password)
            },
            success: function (response) {
                var authenticated = Ext.decode(response.responseText).authenticated;
                if (authenticated) {
                    localStorage.setItem("basicAuthHeader", "Basic " + window.btoa(username + ":" + password));
                } else {
                    localStorage.removeItem("basicAuthHeader");
                }
            }
        });
    },

    /**
     * Returns all the modules in Raxa
     * @return [ 'login', 'screener', ....]
     */
    getModules: function () {
        return ['login', 'screener', 'registration', 'registrationextjs4'];
    },


    /**
     * Helper function to add to xml response, when we get an app.js file,
     * look for all the views declared
     * When all GET calls received, returns control to RaxaEmr.controller.Session
     * @param {} i: index of the current xml request
     * @param {} views: storing all the views as a string
     * @param {} modules: all the raxa modules
     * @return {} the function to call when we receive the app.js file
     */
    getViewRequestHandler: function (getRequest, views, module) {
        //we return an error code (for Jasmine testing)
        errCode = 'noErrors';
        //decrement calls left if we received a response from server
        getCallsLeft--;
        // if we have received GET response success, find views
        // first, get the line in app.js that defines views
        str = getRequest.responseText.match(/views:[\s\S]*?\]/g);
        // if we have views defined in our file, extract all views
        if (str) {
            viewStrings = str[0].substring(5).match(/\b(\w)+\b/g);
            for (j = 0; j < viewStrings.length; j++) {
                currIndex = views.length;
                views[currIndex] = [];
                views[currIndex][0] = module + ' ' + viewStrings[j];
                views[currIndex][1] = module + '/#' + viewStrings[j];
            }
        }
        // if no views are defined in current app.js, return error string
        else {
            errCode = 'noViewsDefined';
            console.log(module + ' does not define any views');
        }

        return errCode;
    },

    /**
     * for each of the modules defined in Util.getModules(), create a GET
     * request and send to server for the app/app.js file
     * @param currModuleAddr: the relative address for the current module
     * @param module: the name of the current module
     * @param views: 2-d array for storing view names+URLs
     * @param callback: function to be called after AJAX is done
     */
    createViewGetRequest: function (currModuleAddr, module, views, callback) {
        console.log(getCallsLeft);
        Ext.Ajax.request({
            url: currModuleAddr + '/app/app.js',
            method: 'GET',
            success: function (response) {
                Util.getViewRequestHandler(response, views, module);
                if (getCallsLeft === 0) {
                    callback(views);
                }
            },
            failure: function (response) {
                // if we don't have GET response success, return error string
                console.log(module + ' does not have app/app.js file');
                getCallsLeft--;
                if (getCallsLeft === 0) {
                    callback(views);
                }
                return 'noAppFile';
            }
        });
    },

    /**
     * Calls back into RaxaEmr.controller with a 2-d array of view urls
     * Uses getModules array, searches all the modules' app.js files for views
     * views has [x][0] = 'name', [x][1] = 'url'
     * Example: views[8][0] = 'login Dashboard', views[8][1] = "login/#Dashboard"
     * @param modules: all the current modules of raxa
     * @param callback: function to be called after AJAX GETs are finished, 
     * the callback function should take in views as parameter
=     */
    populateViews: function (modules, callback) {
        //2-d array of view names + urls
        views = [];
        //keeping track of how many GETs left to receive
        getCallsLeft = modules.length;
        //adding url for home page (relative URL is blank)
        views[0] = [];
        views[0][0] = 'home Page';
        views[0][1] = '';
        currModuleAddr = '';
        for (i = 0; i < modules.length; i++) {
            if (i === 0) {
                currModuleAddr = '../src'
            } else {
                currModuleAddr = modules[i];
                //adding url for bare app i.e. screener/index.html
                currIndex = views.length;
                views[currIndex] = [];
                views[currIndex][0] = modules[i];
                views[currIndex][1] = modules[i];
            }
            //create AJAX get request for each app/app.js file
            Util.createViewGetRequest(currModuleAddr, modules[i], views, callback);
        }
    }
}