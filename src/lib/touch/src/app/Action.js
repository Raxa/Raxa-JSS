/**
 * @author Ed Spencer
 * @private
 * 
 * Represents a single action as {@link Ext.app.Application#dispatch dispatched} by an Application. This is typically
 * generated as a result of a url change being matched by a Route, triggering Application's dispatch function.
 * 
 * This is a private class and its functionality and existence may change in the future. Use at your own risk.
 * 
 */
Ext.define('Ext.app.Action', {
    config: {
        /**
         * @cfg {Object} scope The scope in which the {@link #action} should be called
         */
        scope: null,
        
        /**
         * @cfg {Ext.app.Controller} controller The {@link Ext.app.Controller controller} whose {@link #action} should
         * be called
         */
        controller: null,
        
        /**
         * @cfg {String} action The name of the action on the {@link #controller} that should be called
         */
        action: null,
        
        /**
         * @cfg {Array} args The set of arguments that will be passed to the controller's {@link #action}
         */
        args: [],
        
        /**
         * @cfg {String} url The url that was decoded into the controller/action/args in this Action
         */
        url: undefined,
        data: {},
        title: null
    },
    
    constructor: function(config) {
        this.initConfig(config);
        
        this.getUrl();
    },
    
    run: function() {
        this.getController()[this.getActionName()].apply(this.getScope(), this.getArgs);
    },
    
    applyUrl: function(url) {
        if (url === null || url === undefined) {
            url = this.urlEncode();
        }
        
        return url;
    },
    
    urlEncode: function() {
        var controller = this.getController(),
            splits;
        
        if (controller instanceof Ext.app.Controller) {
            splits = controller.$className.split('.');
            controller = splits[splits.length - 1];
        }
        
        return controller + "/" + this.getAction();
    }
});