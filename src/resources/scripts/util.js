/* 
 * This class provides util methods that are shared by the core, apps and modules
 */
var Util = {
    /**
     * Returns the Basic Authentication header that is a Base64 encoded string of user:pass
     * @return Authorization: Basic xxxx
     */
    getBasicAuthHeader: function (username, password) {
        return "Authorization: Basic " + window.btoa(username + ":" + password);
    },

    /**
     * Returns the Accept type header for JSON as a string
     * @return Accept: application/json
     */
    getJsonAcceptType: function () {
        return "Accept: application/json";
    },

    /**
     * Returns the Content-Type type for JSON header as a string
     * @return Content-Type: application/json
     */
    getJsonContentType: function () {
        return "Content-Type: application/json";
    }
}