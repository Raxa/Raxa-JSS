/* 
 * This class provides util methods that are shared by the core, apps and modules
 */
if (localStorage.getItem("host") == null) {
    var HOST = 'http://raxaemr.jelastic.dogado.eu';
} else HOST = localStorage.getItem("host");

var username = 'admin';
var password =  'Hello123';

//convention for naming a module: if touch module is 'OPD' then extjs module is 'OPD' + EXTJSSUFFIX
var EXTJSSUFFIX = 'extjs4';

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
    	//always keep login at first position as its app path is different
        return ['login', 'screener', 'registration', 'registrationextjs4'];
    }
}
