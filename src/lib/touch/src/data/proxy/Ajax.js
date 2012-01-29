/**
 *
 */
Ext.define('Ext.data.proxy.Ajax', {
    extend: 'Ext.data.proxy.Server',

    requires: ['Ext.util.MixedCollection', 'Ext.Ajax'],
    alias: 'proxy.ajax',
    alternateClassName: ['Ext.data.HttpProxy', 'Ext.data.AjaxProxy'],

    config: {
        /**
         * @property {Object} actionMethods
         * Mapping of action name to HTTP request method. In the basic AjaxProxy these are set to 'GET' for 'read' actions
         * and 'POST' for 'create', 'update' and 'destroy' actions. The {@link Ext.data.proxy.Rest} maps these to the
         * correct RESTful methods.
         */
        actionMethods: {
            create : 'POST',
            read   : 'GET',
            update : 'POST',
            destroy: 'POST'
        },

        /**
         * @cfg {Object} headers
         * Any headers to add to the Ajax request. Defaults to undefined.
         */
        headers: {}
    },

    /**
     * An Ajax proxy knows its dealing with an XMLHttpRequest so return the responseText property from it
     * @protected
     * @param {XMLHttpRequest} response The server response
     * @return {String} The response text to be used by the reader
     */
    extractResponseData: function(response) {
        if (response && response.responseText) {
            return response.responseText;
        }
        return response;
    },

    /**
     * @ignore
     */
    doRequest: function(operation, callback, scope) {
        var writer  = this.getWriter(),
            request = this.buildRequest(operation);

        request.setConfig({
            headers       : this.getHeaders(),
            timeout       : this.getTimeout(),
            method        : this.getMethod(request),
            callback      : this.createRequestCallback(request, operation, callback, scope),
            scope         : this
        });

        // We now always have the writer prepare the request
        request = writer.write(request);

        Ext.Ajax.request(request.getCurrentConfig());

        return request;
    },

    /**
     * Returns the HTTP method name for a given request. By default this returns based on a lookup on
     * {@link #actionMethods}.
     * @param {Ext.data.Request} request The request object
     * @return {String} The HTTP method to use (should be one of 'GET', 'POST', 'PUT' or 'DELETE')
     */
    getMethod: function(request) {
        return this.getActionMethods()[request.getAction()];
    },

    /**
     * @private
     * TODO: This is currently identical to the JsonPProxy version except for the return function's signature. There is a lot
     * of code duplication inside the returned function so we need to find a way to DRY this up.
     * @param {Ext.data.Request} request The Request object
     * @param {Ext.data.Operation} operation The Operation being executed
     * @param {Function} callback The callback function to be called when the request completes. This is usually the callback
     * passed to doRequest
     * @param {Object} scope The scope in which to execute the callback function
     * @return {Function} The callback function
     */
    createRequestCallback: function(request, operation, callback, scope) {
        var me = this;

        return function(options, success, response) {
            me.processResponse(success, operation, request, response, callback, scope);
        };
    }
});