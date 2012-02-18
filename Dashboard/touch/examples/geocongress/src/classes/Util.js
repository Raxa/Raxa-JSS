/**
 * @class Geo.Util
 * @extends Object
 * @singleton
 */
Geo.Util = {
    /**
     * Prompts the user with a confirmation dialog before opening a url.
     * @param {String} url
     */
    openUrl: function(url) {
        Ext.Msg.confirm('External Link', 'This link will open in an external browser window. Would you like to continue?', 
            function() {
                window.open(url, "_new");
            }
        );
    }
};