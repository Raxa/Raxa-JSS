/* 
 * This class provides util methods that are shared by the core, apps and modules
 */
if (localStorage.getItem("host") == null) {
    var HOST = 'http://raxaemr.jelastic.dogado.eu';
} else HOST = localStorage.getItem("host");

var username = 'admin';
var password = 'Hello123';

var Util = {
    /**
     *Returns the value of TimeoutLimit for login timeout 
     *@return timeoutLimit for timeout in login 
     */
    getTimeoutLimit: function() {
        return 5000;
    },
    
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
     * Verifies if username + password is valid on server and saves as Base4 encoded string of user:pass
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
        //TO DO:Add the line below instead the above one 
        //return ['login', 'screener', 'registration','opd','inpatient','pharmacy','radiology','laboratory','billing'];
    },

    /**
     *Generate six digit randomly generated Device Id  
     *Checks if any key with name "deviceId" is previously stored in localStorage, returns it if availaible
     *@return deviceId
     *
     */
    getDeviceId: function () {
        var deviceId;
        //Checks if localStorage already has deviceId stored in it        
        if (localStorage.getItem("deviceId") == null) {
            var randomNumber = [];
            for (var i = 0; i < 6; i++) {
                //generates random digit from 0 to 10
                randomNumber[i] = (Math.floor(Math.random() * 10));
            }
            deviceId = randomNumber.join('');
            localStorage.setItem("deviceId", deviceId);
            console.log('6-digit randomly generated Device Id: ' + deviceId + ' & is stored in localStorage');

        } else {
            // gets the value of deviceId if available in localStorage 
            deviceId = localStorage.getItem("deviceId");
            console.log('6-digit randomly generated Device Id that was stored in localStorage:' + deviceId);
        }
        return deviceId;
    }
}
