/**
 * @author Ed Spencer
 * @private
 * 
 * The Router is an ordered set of route definitions that decode a url into a controller function to execute. Each 
 * route defines a type of url to match, along with the controller function to call if it is matched. The Router is
 * usually managed exclusively by an {@link Ext.app.Application Application}, which also uses a 
 * {@link Ext.app.History History} instance to find out when the browser's url has changed.
 * 
 * Routes are almost always defined inside a {@link Ext.app.Controller Controller}, as opposed to on the Router itself.
 * End-developers should not usually need to interact directly with the Router as the Application and Controller 
 * classes manage everything automatically. See the {@link Ext.app.Controller Controller documentation} for more 
 * information on specifying routes.
 */
Ext.define('Ext.app.Router', {
    requires: ['Ext.app.Route'],
    
    config: {
        /**
         * @cfg {Array} routes The set of routes contained within this Router. Read only
         */
        routes: [],
        
        /**
         * @cfg {Object} defaults Default configuration options for each Route connected to this Router.
         */
        defaults: {
            action: 'index'
        }
    },
    
    constructor: function(config) {
        this.initConfig(config);
    },
    
    /**
     * Connects a url-based route to a controller/action pair plus additional params
     * @param {String} url The url to recognize
     */
    connect: function(url, params) {
        params = Ext.apply({url: url}, params || {}, this.getDefaults());
        var route = Ext.create('Ext.app.Route', params);
        
        this.getRoutes().push(route);
        
        return route;
    },
    
    /**
     * Recognizes a url string connected to the Router, return the controller/action pair plus any additional
     * config associated with it
     * @param {String} url The url to recognize
     * @return {Object/undefined} If the url was recognized, the controller and action to call, else undefined
     */
    recognize: function(url) {
        var routes = this.getRoutes(),
            length = routes.length,
            i, result;
        
        for (i = 0; i < length; i++) {
            result = routes[i].recognize(url);
            
            if (result != undefined) {
                return result;
            }
        }
        
        return undefined;
    },
    
    /**
     * Convenience method which just calls the supplied function with the Router instance. Example usage:
<pre><code>
Ext.Router.draw(function(map) {
    map.connect('activate/:token', {controller: 'users', action: 'activate'});
    map.connect('home',            {controller: 'index', action: 'home'});
});
</code></pre>
     * @param {Function} fn The fn to call
     */
    draw: function(fn) {
        fn.call(this, this);
    },
    
    /**
     * @private
     */
    clear: function() {
        this.setRoutes([]);
    }
});