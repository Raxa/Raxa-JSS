/**
 * @author Ed Spencer
 * @class Ext.util.Router
 * @extends Ext.util.Observable
 * 
 * <p>See {@link Ext.Router}.</p>
 */
Ext.util.Router = Ext.extend(Ext.util.Observable, {
    
    constructor: function(config) {
        config = config || {};

        Ext.apply(this, config, {
            defaults: {
                action: 'index'
            }
        });
        
        this.routes = [];

        Ext.util.Router.superclass.constructor.call(this, config);
    },
    
    /**
     * Connects a url-based route to a controller/action pair plus additional params
     * @param {String} url The url to recognize
     */
    connect: function(url, params) {
        params = Ext.apply({url: url}, params || {}, this.defaults);
        var route = new Ext.util.Route(params);
        
        this.routes.push(route);
        
        return route;
    },
    
    /**
     * Recognizes a url string connected to the Router, return the controller/action pair associated with it
     * @param {String} url The url to recognize
     * @return {Object/undefined} If the url was recognized, the controller and action to call, else undefined
     */
    recognize: function(url) {
        var routes = this.routes,
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
    }
});

/**
 * @author Ed Spencer
 * @class Ext.Router
 * @extends Ext.util.Observable
 * <p>The Router is used to map urls to {@link Ext.Controller controller}/action pairs. It can be used whenever an 
 * application wishes to provide history and deep linking support. Every {@link Ext.Application} can set up Routes
 * using the default {@link Ext.Router} instance, supplying application-specific routes like this:</p>
 * 
<pre><code>
//Note the # in the url examples below
Ext.Router.draw(function(map) {
    //maps the url http://mydomain.com/#dashboard to the home controller's index action
    map.connect('dashboard', {controller: 'home', action: 'index'});

    //fallback route - would match routes like http://mydomain.com/#users/list to the 'users' controller's
    //'list' action
    map.connect(':controller/:action');
});
</code></pre>
 * 
 * <p>The Router is concerned only with the segment of the url after the hash (#) character. This segment is parsed
 * by the {@link Ext.Dispatcher Dispatcher} and passed to the Router's {@link #recognize} method. Most of the time you
 * will not need to modify any of the behavior of the Router - it is all handled internally by the application 
 * architecture.</p>
 * 
 * @singleton
 */
Ext.Router = new Ext.util.Router();
