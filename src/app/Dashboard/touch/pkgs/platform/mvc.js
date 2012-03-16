/**
 * @class Ext.History
 * @extends Ext.util.Observable
 * @ignore
 * @private
 * 
 * Mobile-optimized port of Ext.History. Note - iPad on iOS < 4.2 does not have HTML5 History support so we still
 * have to poll for changes.
 */
Ext.History = new Ext.util.Observable({
    constructor: function() {
        Ext.History.superclass.constructor.call(this, config);
        
        this.addEvents(
            /**
             * @event change
             */
            'change'
        );
    },
    
    /**
     * @private
     * Initializes event listeners
     */
    init: function() {
        var me = this;
        
        me.setToken(window.location.hash);
        
        if (Ext.supports.History) {
            window.addEventListener('hashchange', this.onChange);
        } else {
            setInterval(function() {
                var newToken = me.cleanToken(window.location.hash),
                    oldToken = me.getToken();
                
                if (newToken != oldToken) {
                    me.onChange();
                }
            }, 50);
        }
    },
    
    /**
     * @private
     * Event listener for the hashchange event
     */
    onChange: function() {
        var me       = Ext.History,
            newToken = me.cleanToken(window.location.hash);
        
        if (me.token != newToken) {
            me.fireEvent('change', newToken);
        }
        
        me.setToken(newToken);
    },
    
    /**
     * Sets a new token, stripping of the leading # if present. Does not fire the 'change' event
     * @param {String} token The new token
     * @return {String} The cleaned token
     */
    setToken: function(token) {
        return this.token = this.cleanToken(token);
    },
    
    /**
     * @private
     * Cleans a token by stripping off the leading # if it is present
     * @param {String} token The unclean token
     * @return {String} The clean token
     */
    cleanToken: function(token) {
        return token[0] == '#' ? token.substr(1) : token;
    },
    
    /**
     * Returns the current history token
     * @return {String} The current token
     */
    getToken: function() {
        return this.token;
    },
    
    /**
     * Adds a token to the history stack by updation the address bar hash
     * @param {String} token The new token
     */
    add: function(token) {
        window.location.hash = this.setToken(token);
        
        if (!Ext.supports.History) {
            this.onChange();
        }
    }
});
/**
 * @author Ed Spencer
 * @class Ext.ControllerManager
 * @extends Ext.AbstractManager
 * @singleton
 * 
 * <p>Keeps track of all of the registered controllers. This should very rarely need to be used by developers. This 
 * is simply an {@link Ext.AbstractManager AbstractManager} with a custom {@link #register} function which sets up
 * the controller and its linked {@link Ext.Application application}.</p>
 */
Ext.ControllerManager = new Ext.AbstractManager({
    register: function(id, options) {
        options.id = id;
        
        Ext.applyIf(options, {
            application: Ext.ApplicationManager.currentApplication
        });
        
        var controller = new Ext.Controller(options);
        
        if (controller.init) {
            controller.init();
        }
        
        this.all.add(controller);
        
        return controller;
    }
});

/**
 * Shorthand for {@link Ext.ControllerMgr#register}
 * Creates a new Controller class from the specified config object. See {@link Ext.Controller} for full examples.
 * 
 * @param {Object} config A configuration object for the Controller you wish to create.
 * @return {Ext.Controller} The newly registered Controller
 * @member Ext
 * @method regController
 */
Ext.regController = function() {
    return Ext.ControllerManager.register.apply(Ext.ControllerManager, arguments);
};
/**
 * @author Ed Spencer
 * @class Ext.Controller
 * @extends Ext.util.Observable
 * 
 * @constructor
 */
Ext.Controller = Ext.extend(Ext.util.Observable, {
    constructor: function(config) {
        this.addEvents(
            /**
             * @event instance-created
             * Fired when a new model instance has been successfully created by this controller
             * @param {Ext.data.Model} instance The newly-created model instance
             */
            'instance-created',
            
            /**
             * @event instance-creation-failed
             * Fired when an attempt at saving a new instance failed
             * @param {Ext.data.Model} instance The instance that could not be saved
             * @param {Object} errors The set of errors (if any) that caused the failure
             */
            'instance-creation-failed',
            
            /**
             * @event instance-updated
             * Fired when an existing model instance has been successfully updated by this controller
             * @param {Ext.data.Model} instance The instance that was updated
             */
            'instance-updated',
            
            /**
             * @event instance-update-failed
             * Fired when an update to existing model instance could not be successfully completed
             * @param {Ext.data.Model} instance The instance that could not be updated
             * @param {Object} errors The set of errors (if any) that caused the failure
             */
            'instance-update-failed',
            
            /**
             * @event instance-destroyed
             * Fired when an existing instance has been successfully destroyed by this controller
             * @param {Ext.data.Model} instance The instance that was destroyed
             */
            'instance-destroyed',
            
            /**
             * @event instance-destruction-failed
             * Fired when an existing instance could not be destroyed
             * @param {Ext.data.Model} instance The instance that could not be destroyed
             * @param {Object} errors The set of errors (if any) that caused the failure
             */
            'instance-destruction-failed'
        );
        
        Ext.Controller.superclass.constructor.call(this, config);
        
        Ext.apply(this, config || {});
        
        if (typeof this.model == 'string') {
            this.model = Ext.ModelMgr.getModel(this.model);
        }
    },
    
    index: function() {
        this.render('index', {
            listeners: {
                scope  : this,
                edit   : this.edit,
                build  : this.build,
                create : this.onCreateInstance,
                destroy: this.onDestroyInstance
            }
        });
    },
    
    /**
     * Renders the edit form for a given model instance
     * @param {Ext.data.Model} instance The instance to edit
     */
    edit: function(instance) {
        var view = this.render('edit', {
            listeners: this.getEditListeners()
        });
        
        view.loadModel(instance);
    },
    
    /**
     * Callback automatically tied to the index view's 'build' event. By default this just renders the registered
     * 'build' view
     */
    build: function() {
        this.render('build', {
            listeners: this.getBuildListeners()
        });
    },
    
    /**
     * Saves a phantom Model instance via its configured Proxy. Fires the 'instance-created' event if successful,
     * the 'instance-creation-failed' event if not.
     * @param {Object} data The data to create the instance from
     * @param {Object} options Optional options object containing callbacks for success and failure plus optional scope
     */
    create: function(data, options) {
        options = options || {};
        
        var model     = this.getModel(),
            instance  = new model(data),
            successCb = options.success,
            failureCb = options.failure,
            scope     = options.scope || this;
        
        instance.save({
            scope  : this,
            success: function(instance) {
                if (typeof successCb == 'function') {
                    successCb.call(scope, instance);
                }
                
                this.fireEvent('instance-created', instance);
            },
            failure: function(instance, errors) {                
                if (typeof failureCb == 'function') {
                    failureCb.call(scope, instance, errors);
                }
                
                this.fireEvent('instance-creation-failed', instance, errors);
            }
        });
    },
    
    /**
     * Updates an existing model instance by applying optional updates to it and attempting to save
     * @param {Ext.data.Model} instance The existing instance
     * @param {Object} updates Optional additional updates to apply to the instance before saving
     * @param {Object} options success and failure callback functions
     */
    update: function(instance, updates, options) {
        options = options || {};
        
        var successCb = options.success,
            failureCb = options.failure,
            scope     = options.scope || this;
        
        if (Ext.isObject(updates)) {
            instance.set(updates);
        }
        
        instance.save({
            scope  : this,
            success: function(instance) {
                if (typeof successCb == 'function') {
                    successCb.call(scope, instance);
                }
                
                this.fireEvent('instance-updated', instance);
            },
            failure: function(instance, errors) {
                if (typeof failureCb == 'function') {
                    failureCb.call(scope, instance, errors);
                }
                
                this.fireEvent('instance-update-failed', instance, errors);
            }
        });
    },
    
    /**
     * Destroys one or more existing, previously saved model instances
     * @param {Ext.data.Model} instance The model instance to destroy
     * @param {Object} options success and failure callbacks
     */
    destroy: function(instance, options) {
        options = options || {};
        
        var successCb = options.success,
            failureCb = options.failure,
            scope     = options.scope || this;
        
        instance.destroy({
            scope  : this,
            success: function(instance) {
                if (typeof successCb == 'function') {
                    successCb.call(scope, instance);
                }
                
                this.fireEvent('instance-destroyed', instance);
            },
            failure: function(instance, errors) {
                if (typeof failureCb == 'function') {
                    failureCb.call(scope, instance, errors);
                }
                
                this.fireEvent('instance-destruction-failed', instance, errors);
            }
        });
    },
    
    /**
     * Returns the listeners to attach to the view rendered by the {@link #build} action. By default this returns listeners
     * for save and cancel, but this can be overridden
     * @return {Object} listeners
     */
    getBuildListeners: function() {
        return {
            scope : this,
            save  : this.onCreateInstance,
            cancel: this.onCancelBuild
        };
    },
    
    /**
     * Returns the listeners to attach to the view rendered by the {@link #edit} action. By default this returns listeners
     * for save and cancel, but this can be overridden
     * @return {Object} listeners
     */
    getEditListeners: function() {
        return {
            scope : this,
            save  : this.onUpdateInstance,
            cancel: this.onCancelEdit
        };
    },
    
    /**
     * Handler for the 'cancel' event fired by an {@link #edit} view. By default this just closes the view
     * @param {Ext.Component} view The edit form
     */
    onCancelEdit: function(view) {
        return this.closeView(view);
    },
    
    /**
     * Handler for the 'cancel' event fired by an {@link #build} view. By default this just closes the view
     * @param {Ext.Component} view The build form
     */
    onCancelBuild: function(view) {
        return this.closeView(view);
    },
    
    /**
     * Callback automatically tied to the index view's 'create' event. By default this just calls the controller's
     * create function with the data and some basic callbacks to handle errors or show success. Can be overridden
     * to provide custom behavior
     * @param {Ext.View} view The view instance that fired the event
     */
    onCreateInstance: function(view) {
        this.create(view.getValues(), {
            scope  : this,
            success: function(instance) {
                this.closeView(view);
            },
            failure: function(instance, errors) {
                console.log('fail');
            }
        });
    },
    
    /**
     * Callback automatically tied to the index view's 'update' event. By default this just calls the controller's
     * update function with the data and some basic callbacks to handle errors or show success. Can be overridden
     * to provide custom behavior
     * @param {Ext.Component} view The view instance that fired the event
     */
    onUpdateInstance: function(view) {
        this.update(view.getRecord(), view.getValues(), {
            scope  : this,
            success: function(instance) {
                this.closeView(view);
            },
            failure: function(instance, errors) {
                
            }
        });
    },
    
    /**
     * Callback automatically tied to the index view's 'destroy' event. By default that just calls the controller's
     * destroy function with the model instance and some basic callbacks to handle errors or show success. Can be
     * overridden to provide custom behavior.
     * @param {Ext.data.Model} instance The instance to destroy
     * @param {Ext.View} view The view instance that fired the event
     */
    onDestroyInstance: function(instance, view) {
        this.destroy(instance, {
            scope  : this,
            success: function(instance) {
                
            },
            failure: function(instance, errors) {
                
            }
        });
    },
    
    /**
     * Sets the default container that components rendered using {@link #render} will be added to.
     * In many applications there is a fixed navigation panel and a content panel - the content
     * panel would usually form the render target in this type of setup.
     * @param {Ext.Container} target The container to add rendered components to
     */
    setRenderTarget: function(target) {
        /**
         * @property renderTarget
         * @type Ext.Container
         * The current {@link #setRenderTarget render target}. Read only
         */
        Ext.Controller.renderTarget = target;
    },
    
    /**
     * Renders a given view based on a registered name
     * @param {String} viewName The name of the view to render
     * @param {Object} config Optional config object
     * @return {Ext.View} The view instance
     */
    render: function(config, target) {
        var Controller  = Ext.Controller,
            application = this.application,
            profile     = application ? application.currentProfile : undefined,
            profileTarget, view;
        
        Ext.applyIf(config, {
            profile: profile
        });
        
        view = Ext.ComponentMgr.create(config);
        
        if (target !== false) {
            //give the current Ext.Profile a chance to set the target
            profileTarget = profile ? profile.getRenderTarget(config, application) : target;
            
            if (target == undefined) {
                target = profileTarget || (application ? application.defaultTarget : undefined);
            }

            if (typeof target == 'string') {
                target = Ext.getCmp(target);
            }

            if (target != undefined && target.add) {
                if (profile) {
                    profile.beforeLayout(view, target, application);
                }
                
                target.add(view);

                if (target.layout && target.layout.setActiveItem) {
                    target.layout.setActiveItem(view);
                }

                target.doComponentLayout();
                
                if (profile) {
                    profile.afterLayout(view, target, application);
                }
            }
        }
        
        return view;
    },
    
    /**
     * This function allows you to add listeners to a view
     * in a convenient way
     */    
    control : function(view, actions, itemName) {
        if (!view || !view.isView) {
            throw 'Trying to control a view that doesnt exist';
        }

        var item = itemName ? view.refs[itemName] : view,
            key, value, name, child, listener;
    
        if (!item) {
            throw "No item called " + itemName + " found inside the " + view.name + " view.";
        }        
    	
        for (key in actions) {
            value = actions[key];
    	
            // If it is an object, it can either be a listener with a handler defined
            // in which case the key is the event name, or it can be an object containing
            // listener(s), in which case key will be the items name
            if (Ext.isObject(value) && !value.fn) {
                this.control(view, value, key);
            }
            else {
                // Now hopefully we can be sure that key is an event name. We will loop over all
                // child items and enable bubbling for this event
                if (item.refs) {
                    for (name in item.refs) {
                        child = item.refs[name];
                        if (child.isObservable && child.events[key]) {
                            child.enableBubble(key);
                        }
                    }
                }
    
                if (!value.fn) {
                    listener = {};
                    listener[key] = value;
                    listener.scope = this;
                }
                else {
                    listener = value;
                    if (listener.scope === undefined) {
                        listener.scope = this;
                    }
                }

                // Finally we bind the listener on this item
                item.addListener(listener);
            }
        }

        return view;
    },
    
    /**
     * Returns the constructor for the model type linked to this controller
     * @return {Ext.data.Model} The model constructor
     */
    getModel: function() {
        return Ext.ModelMgr.getModel(this.model);
    },
    
    /**
     * @private
     * Used internally whenever we want to remove a component from its parent container. See onCancelEdit and onCancelBuild
     * @param {Ext.Component} view The component to close
     */
    closeView: function(view) {
        var ownerCt = view.ownerCt;
        
        if (ownerCt) {
            ownerCt.remove(view);
            ownerCt.doLayout();
            ownerCt.setActiveItem(ownerCt.items.last());
        }
    }
});
/**
 * @author Ed Spencer
 * @class Ext.util.Dispatcher
 * @extends Ext.util.Observable
 * 
 * <p>The Dispatcher class is used to send requests through to a controller action. Usually, only a single Dispatcher
 * is required on the page, and by default a single instance is already created - {@link Ext.Dispatcher}. See the
 * {@link Ext.Dispatcher Dispatcher docs} for details on how this works.</p>
 * 
 * @constructor
 */
Ext.util.Dispatcher = Ext.extend(Ext.util.Observable, {
    
    constructor: function(config) {
        this.addEvents(
            /**
             * @event before-dispatch
             * Fires before an interaction is dispatched. Return false from any listen to cancel the dispatch
             * @param {Ext.Interaction} interaction The Interaction about to be dispatched
             */
            'before-dispatch',
            
            /**
             * @event dispatch
             * Fired once an Interaction has been dispatched
             * @param {Ext.Interaction} interaction The Interaction that was just dispatched
             */
            'dispatch'
        );
        
        Ext.util.Dispatcher.superclass.constructor.call(this, config);
    },
    
    /**
     * Dispatches a single interaction to a controller/action pair
     * @param {Object} options Options representing at least the controller and action to dispatch to
     */
    dispatch: function(options) {
        var interaction = new Ext.Interaction(options),
            controller  = interaction.controller,
            action      = interaction.action,
            History     = Ext.History;
        
        if (this.fireEvent('before-dispatch', interaction) !== false) {
            if (History && options.historyUrl) {
                History.suspendEvents(false);
                History.add(options.historyUrl);
                Ext.defer(History.resumeEvents, 100, History);
            }
            
            if (controller && action) {
                controller[action].call(controller, interaction);
                interaction.dispatched = true;
            }
            
            this.fireEvent('dispatch', interaction);
        }
    },
    
    /**
     * Dispatches to a controller/action pair, adding a new url to the History stack
     */
    redirect: function(options) {
        if (options instanceof Ext.data.Model) {
            //compose a route for the model
            
        } else if (typeof options == 'string') {
            //use router
            var route = Ext.Router.recognize(options);
            
            if (route) {
                return this.dispatch(route);
            }
        }
        return null;
    },
    
    /**
     * Convenience method which returns a function that calls Ext.Dispatcher.redirect. Useful when setting
     * up several listeners that should redirect, e.g.:
<pre><code>
myComponent.on({
    homeTap : Ext.Dispatcher.createRedirect('home'),
    inboxTap: Ext.Dispatcher.createRedirect('inbox'),
});
</code></pre>
     * @param {String/Object} url The url to create the redirect function for
     * @return {Function} The redirect function
     */
    createRedirect: function(url) {
        return function() {
            Ext.Dispatcher.redirect(url);
        };
    }
});

/**
 * @class Ext.Dispatcher
 * @extends Ext.util.Dispatcher
 * 
 * <p>The Dispatcher is responsible for sending requests through to a specific {@link Ext.Controller controller} 
 * action. It is usually invoked either by a UI event handler calling {@link Ext#dispatch}, or by the 
 * {@link Ext.Router Router} recognizing a change in the page url.</p>
 * 
 * <p>Ext.Dispatcher is the default instance of {@link Ext.util.Dispatcher} that is automatically created for every
 * application. Usually it is the only instance that you will need.</p>
 * 
 * <p>Let's say we have an application that manages instances of a Contact model using a contacts controller:</p>
 * 
<pre><code>
Ext.regModel('Contact', {
    fields: ['id', 'name', 'email']
});

//the controller has a single action - list - which just loads the Contacts and logs them to the console
Ext.regController('contacts', {
    list: function() {
        new Ext.data.Store({
            model: 'Contact',
            autoLoad: {
                callback: function(contacts) {
                    console.log(contacts);
                }
            }
        });
    }
});
</code></pre>
 * 
 * <p>We can easily dispatch to the contacts controller's list action from anywhere in our app:</p>
 * 
<pre><code>
Ext.dispatch({
    controller: 'contacts',
    action    : 'list',
    
    historyUrl: 'contacts/list',
    
    anotherOption: 'some value'
});
</code></pre>
 * 
 * <p>The Dispatcher finds the contacts controller and calls its list action. We also passed in a couple of additional
 * options to dispatch - historyUrl and anotherOption. 'historyUrl' is a special parameter which automatically changes
 * the browser's url when passed. For example, if your application is being served from http://yourapp.com, dispatching
 * with the options we passed above would update the url to http://yourapp.com/#contacts/list, as well as calling the 
 * controller action as before.</p>
 * 
 * <p>We also passed a second configuration into dispatch - anotherOption. We can access this inside our controller 
 * action like this:</p>
 * 
<pre><code>
Ext.regController('contacts', {
    list: function(options) {
        console.log(options.anotherOption); // 'some value'
    }
});
</code></pre>
 * 
 * <p>We can pass anything in to Ext.dispatch and have it come through to our controller action. Internally, all of the
 * options that we pass to dispatch are rolled into an {@link Ext.Interaction}. Interaction is a very simple class that
 * represents a single request into the application - typically the controller and action names plus any additional 
 * information like the Model instance that a particular action is concerned with.</p>
 * 
 * @singleton
 */
Ext.Dispatcher = new Ext.util.Dispatcher();

/**
 * Shorthand for {@link Ext.Dispatcher#dispatch}. Dispatches a request to a controller action
 * 
 * @member Ext
 * @method dispatch
 */
Ext.dispatch = function() {
    return Ext.Dispatcher.dispatch.apply(Ext.Dispatcher, arguments);
};

/**
 * Shorthand for {@link Ext.Dispatcher#redirect}. Dispatches a request to a controller action, adding to the History
 * stack and updating the page url as necessary.
 * 
 * @member Ext
 * @method redirect
 */
Ext.redirect = function() {
    return Ext.Dispatcher.redirect.apply(Ext.Dispatcher, arguments);
};

Ext.createRedirect = Ext.Dispatcher.createRedirect;
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

/**
 * @author Ed Spencer
 * @class Ext.util.Route
 * @extends Object
 * @ignore
 * <p>Represents a mapping between a url and a controller/action pair. May also contain additional params</p>
 */
Ext.util.Route = Ext.extend(Object, {
    /**
     * @cfg {String} url The url string to match. Required.
     */
    
    constructor: function(config) {
        Ext.apply(this, config, {
            conditions: {}
        });
        
        /*
         * The regular expression we use to match a segment of a route mapping
         * this will recognise segments starting with a colon,
         * e.g. on 'namespace/:controller/:action', :controller and :action will be recognised
         */
        this.paramMatchingRegex = new RegExp(/:([0-9A-Za-z\_]*)/g);
        
        /*
         * Converts a route string into an array of symbols starting with a colon. e.g.
         * ":controller/:action/:id" => [':controller', ':action', ':id']
         */
        this.paramsInMatchString = this.url.match(this.paramMatchingRegex) || [];
        
        this.matcherRegex = this.createMatcherRegex(this.url);
    },
    
    /**
     * Attempts to recognize a given url string and return controller/action pair for it
     * @param {String} url The url to recognize
     * @return {Object} The matched data, or false if no match
     */
    recognize: function(url) {
        if (this.recognizes(url)) {
            var matches = this.matchesFor(url);
            
            return Ext.applyIf(matches, {
                controller: this.controller,
                action    : this.action,
                historyUrl: url
            });
        }
    },
    
    /**
     * Returns true if this Route matches the given url string
     * @param {String} url The url to test
     * @return {Boolean} True if this Route recognizes the url
     */
    recognizes: function(url) {
        return this.matcherRegex.test(url);
    },
    
    /**
     * @private
     * Returns a hash of matching url segments for the given url.
     * @param {String} url The url to extract matches for
     * @return {Object} matching url segments
     */
    matchesFor: function(url) {
        var params = {},
            keys   = this.paramsInMatchString,
            values = url.match(this.matcherRegex),
            length = keys.length,
            i;
        
        //first value is the entire match so reject
        values.shift();

        for (i = 0; i < length; i++) {
            params[keys[i].replace(":", "")] = values[i];
        }

        return params;
    },
    
    /**
     * Constructs a url for the given config object by replacing wildcard placeholders in the Route's url
     * @param {Object} config The config object
     * @return {String} The constructed url
     */
    urlFor: function(config) {
        
    },
    
    /**
     * @private
     * Takes the configured url string including wildcards and returns a regex that can be used to match
     * against a url
     * @param {String} url The url string
     * @return {RegExp} The matcher regex
     */
    createMatcherRegex: function(url) {
        /**
         * Converts a route string into an array of symbols starting with a colon. e.g.
         * ":controller/:action/:id" => [':controller', ':action', ':id']
         */
        var paramsInMatchString = this.paramsInMatchString,
            length = paramsInMatchString.length,
            i, cond, matcher;
        
        for (i = 0; i < length; i++) {
            cond    = this.conditions[paramsInMatchString[i]];
            matcher = Ext.util.Format.format("({0})", cond || "[%a-zA-Z0-9\\_\\s,]+");

            url = url.replace(new RegExp(paramsInMatchString[i]), matcher);
        }

        //we want to match the whole string, so include the anchors
        return new RegExp("^" + url + "$");
    }
});
/**
 * @author Ed Spencer
 * @class Ext.Interaction
 * @extends Ext.util.Observable
 * 
 * <p>Interactions are very simple objects that represent an action performed by specific {@link Ext.Controller} 
 * action. The must consist of the {@link #controller} and {@link #action} to be called, but can contain any other
 * data too. See {@link Ext.Dispatcher} for more details on how Interactions fit into the application ecosystem.</p>
 * 
 * <p>Interactions are an internal representation that most developers will not have much direct use for. They 
 * help provide a normalized API for controller actions - each action should simply be set up to receive an Interaction
 * object. Because Interaction objects are always created when dispatching to a controller action, it is possible to 
 * store the Interaction objects that were created in a session to perform simple analytics on how the application 
 * is used. This is not built into the framework at the moment, but is left open for custom development if needed.</p>
 * 
 * @constructor
 * @param {Object} config Options object containing at least a controller/action pair
 */
Ext.Interaction = Ext.extend(Ext.util.Observable, {
    /**
     * @cfg {String} controller The controller to dispatch to
     */
    controller: '',
    
    /**
     * @cfg {String} action The controller action to invoke
     */
    action: '',
    
    /**
     * @cfg {Array} args Any arguments to pass to the action
     */
    
    /**
     * @cfg {Object} scope Optional scope to execute the controller action in
     */
    
    /**
     * True if this Interaction has already been dispatched
     * @property dispatched
     * @type Boolean
     */
    dispatched: false,
    
    constructor: function(config) {
        Ext.Interaction.superclass.constructor.apply(this, arguments);
        
        config = config || {};
              
        Ext.applyIf(config, {
            scope: this
        });
        
        Ext.apply(this, config);
        
        if (typeof this.controller == 'string') {
            this.controller = Ext.ControllerManager.get(this.controller);
        }
    }
});
/**
 * @author Ed Spencer
 * @class Ext.Application
 * @extends Ext.util.Observable
 *
 * <p>Represents a Sencha Application. Most Applications consist of at least the application's name and a launch
 * function:</p>
 *
<pre><code>
new Ext.Application({
    name: 'MyApp',

    launch: function() {
        this.viewport = new Ext.Panel({
            fullscreen: true,

            id    : 'mainPanel',
            layout: 'card',
            items : [
                {
                    html: 'Welcome to My App!'
                }
            ]
        });
    }
});
</code></pre>
 *
 * <p>Instantiating a new application automatically creates a global variable using the configured {@link #name}
 * property and sets up namespaces for views, stores, models and controllers within the app:</p>
 *
<pre><code>
//this code is run internally automatically when creating the app
{@link Ext.ns}('MyApp', 'MyApp.views', 'MyApp.stores', 'MyApp.models', 'MyApp.controllers');
</code></pre>
 *
 * <p>The launch function usually creates the Application's Viewport and runs any actions the Application needs to
 * perform when it boots up. The launch function is only expected to be run once.</p>
 *
 * <p><u>Routes and history support</u></p>
 *
 * <p>Sencha Applications provide in-app deep linking and history support, allowing your users both to use the back
 * button inside your application and to refresh the page and come back to the same screen even after navigating.
 * In-app history support relies on the Routing engine, which maps urls to controller/action pairs. Here's an example
 * route definition:</p>
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
 * <p>If you generated your Sencha app using the Sencha Command application generator script, you'll see this file is
 * already present in your application's app/routes.js file. History-driven apps can specify the {@link #defaultUrl}
 * configuration option, which will dispatch to that url if no url is currently set:</p>
 *
<pre><code>
new Ext.Application({
    name: 'MyApp',
    defaultUrl: 'dashboard'
});
</code></pre>
 *
 * <p><u>Application profiles</u></p>
 *
 * <p>Applications support multiple app profiles and reconfigure itself accordingly. Here we set up an Application
 * with 3 profiles - one if the device is a phone, one for tablets in landscape orientation and one for tablets in
 * portrait orientation:</p>
 *
<pre><code>
new Ext.Application({
    name: 'MyApp',

    profiles: {
        phone: function() {
            return Ext.is.Phone;
        },
        tabletPortrait: function() {
            return Ext.is.Tablet && Ext.orientation == 'portrait';
        },
        tabletLandscape: function() {
            return Ext.is.Tablet && Ext.orientation == 'landscape';
        }
    }
});
</code></pre>
 *
 * <p>When the Application checks its list of profiles, the first function that returns true becomes the current profile.
 * The Application will normally automatically detect when a profile change has occurred (e.g. if a tablet is rotated
 * from portrait to landscape mode) and fire the {@link #profilechange} event. It will also by default inform all
 * {@link Ext.Component Components} on the page that the current profile has changed by calling their
 * {@link Ext.Component#setProfile setProfile} functions. The setProfile function is left as an empty function for you
 * to implement if your component needs to react to different device/application profiles.</p>
 *
 * <p>The current profile can be found using {@link #getProfile}. If the Application does not correctly detect device
 * profile changes, calling the {@link #determineProfile} function will force it to re-check.</p>
 */
Ext.Application = Ext.extend(Ext.util.Observable, {
    /**
     * @cfg {String} name The name of the Application. This should be the same as the single global variable that the
     * application uses, and should not contain spaces
     */

    /**
     * @cfg {Object} scope The scope to execute the {@link #launch} function in. Defaults to the Application
     * instance.
     */
    scope: undefined,

    /**
     * @cfg {Boolean} useHistory True to automatically set up Ext.History support (defaults to true)
     */
    useHistory: true,

    /**
     * @cfg {String} defaultUrl When the app is first loaded, this url will be redirected to. Defaults to undefined
     */

    /**
     * @cfg {Boolean} autoUpdateComponentProfiles If true, automatically calls {@link Ext.Component#setProfile} on
     * all components whenever a application/device profile change is detected (defaults to true)
     */
    autoUpdateComponentProfiles: true,

    /**
     * @cfg {Boolean} setProfilesOnLaunch If true, determines the current application profile on launch and calls
     * {@link #updateComponentProfiles}. Defaults to true
     */
    setProfilesOnLaunch: true,

    /**
     * @cfg {Object} profiles A set of named profile specifications that this application supports. See the intro
     * docs for an example
     */

    constructor: function(config) {
        this.addEvents(
            /**
             * @event launch
             * Fires when the application is launched
             * @param {Ext.Application} app The Application instance
             */
            'launch',

            /**
             * @event beforeprofilechange
             * Fires when a change in Application profile has been detected, but before any action is taken to
             * update the application's components about the change. Return false from any listener to cancel the
             * automatic updating of application components (see {@link #autoUpdateComponentProfiles})
             * @param {String} profile The name of the new profile
             * @param {String} oldProfile The name of the old profile (may be undefined)
             */
            'beforeprofilechange',

            /**
             * @event profilechange
             * Fires when a change in Applicatino profile has been detected and the application's components have
             * already been informed. Listeners can perform additional processing here if required
             * @param {String} profile The name of the new profile
             * @param {String} oldProfile The name of the old profile (may be undefined)
             */
            'profilechange'
        );

        Ext.Application.superclass.constructor.call(this, config);

        this.bindReady();

        var name = this.name;

        if (name) {
            window[name] = this;

            Ext.ns(
                name,
                name + ".views",
                name + ".stores",
                name + ".models",
                name + ".controllers"
            );
        }

        if (Ext.addMetaTags) {
            Ext.addMetaTags(config);
        }
    },

    /**
     * @private
     * We bind this outside the constructor so that we can cancel it in the test environment
     */
    bindReady : function() {
        Ext.onReady(this.onReady, this);
    },

    /**
     * Called automatically when the page has completely loaded. This is an empty function that should be
     * overridden by each application that needs to take action on page load
     * @property launch
     * @type Function
     * @param {String} profile The detected {@link #profiles application profile}
     * @return {Boolean} By default, the Application will dispatch to the configured startup controller and
     * action immediately after running the launch function. Return false to prevent this behavior.
     */
    launch: Ext.emptyFn,

    /**
     * @cfg {Boolean/String} useLoadMask True to automatically remove an application loading mask when the
     * DOM is ready. If set to true, this expects a div called "loading-mask" to be present in the body.
     * Pass the id of some other DOM node if using a custom loading mask element. Defaults to false.
     */
    useLoadMask: false,

    /**
     * @cfg {Number} loadMaskFadeDuration The number of milliseconds the load mask takes to fade out. Defaults to 1000
     */
    loadMaskFadeDuration: 1000,

    /**
     * @cfg {Number} loadMaskRemoveDuration The number of milliseconds until the load mask is removed after starting the
     * {@link #loadMaskFadeDuration fadeout}. Defaults to 1050.
     */
    loadMaskRemoveDuration: 1050,

    /**
     * @cfg {Boolean} autoInitViewport Will automatically set up the application to work in full screen mode by calling
     * {@link Ext.Viewport#init} if true (defaults to true)
     */
    autoInitViewport: true,

    /**
     * Dispatches to a given controller/action combo with optional arguments.
     * @param {Object} options Object containing strings referencing the controller and action to dispatch
     * to, plus optional args array
     * @return {Boolean} True if the controller and action were found and dispatched to, false otherwise
     */
    dispatch: function(options) {
        return Ext.dispatch(options);
    },

    /**
     * @private
     * Initializes the loading mask, called automatically by onReady if {@link #useLoadMask} is configured
     */
    initLoadMask: function() {
        var useLoadMask = this.useLoadMask,
            defaultId   = 'loading-mask',
            loadMaskId  = typeof useLoadMask == 'string' ? useLoadMask : defaultId;

        if (useLoadMask) {
            if (loadMaskId == defaultId) {
                Ext.getBody().createChild({id: defaultId});
            }

            var loadingMask  = Ext.get('loading-mask'),
                fadeDuration = this.loadMaskFadeDuration,
                hideDuration = this.loadMaskRemoveDuration;

            Ext.defer(function() {
                loadingMask.addCls('fadeout');

                Ext.defer(function() {
                    loadingMask.remove();
                }, hideDuration);
            }, fadeDuration);
        }
    },

    /**
     * @private
     */
    onBeforeLaunch: function() {
        var History    = Ext.History,
            useHistory = History && this.useHistory,
            profile    = this.determineProfile(true);

        if (useHistory) {
            this.historyForm = Ext.getBody().createChild({
                id    : 'history-form',
                cls   : 'x-hide-display',
                style : 'display: none;',
                tag   : 'form',
                action: '#',
                children: [
                    {
                        tag: 'div',
                        children: [
                            {
                                tag : 'input',
                                id  : History.fieldId,
                                type: 'hidden'
                            },
                            {
                                tag: 'iframe',
                                id : History.iframeId
                            }
                        ]
                    }
                ]
            });

            History.init();
            History.on('change', this.onHistoryChange, this);

            var token = History.getToken();

            if (this.launch.call(this.scope || this, profile) !== false) {
                Ext.redirect(token || this.defaultUrl || {controller: 'application', action: 'index'});
            }
        } else {
            this.launch.call(this.scope || this, profile);
        }

        this.launched = true;

        this.fireEvent('launch', this);

        if (this.setProfilesOnLaunch) {
            this.updateComponentProfiles(profile);
        }
    },

    /**
     * @private
     * Called when the DOM is ready. Calls the application-specific launch function and dispatches to the
     * first controller/action combo
     */
    onReady: function() {
        if (this.useLoadMask) {
            this.initLoadMask();
        }

        Ext.EventManager.onOrientationChange(this.determineProfile, this);

        if (this.autoInitViewport) {
            Ext.Viewport.init(this.onBeforeLaunch, this);
        } else {
            this.onBeforeLaunch();
        }

        return this;
    },

    /**
     * Calls each configured {@link #profile} function, marking the first one that returns true as the current
     * application profile. Fires the 'beforeprofilechange' and 'profilechange' events if the profile has changed
     * @param {Boolean} silent If true, the events profilechange event is not fired
     */
    determineProfile: function(silent) {
        var currentProfile = this.currentProfile,
            profiles       = this.profiles,
            name;

        for (name in profiles) {
            if (profiles[name]() === true) {
                if (name != currentProfile && this.fireEvent('beforeprofilechange', name, currentProfile) !== false) {
                    if (this.autoUpdateComponentProfiles) {
                        this.updateComponentProfiles(name);
                    }

                    if (silent !== true) {
                        this.fireEvent('profilechange', name, currentProfile);
                    }
                }

                this.currentProfile = name;
                break;
            }
        }

        return this.currentProfile;
    },

    /**
     * @private
     * Sets the profile on every component on the page. Will probably refactor this to something less hacky.
     * @param {String} profile The new profile name
     */
    updateComponentProfiles: function(profile) {
        Ext.ComponentMgr.each(function(key, component){
            if (component.setProfile) {
                component.setProfile(profile);
            }
        });
    },

    /**
     * Gets the name of the currently-detected application profile
     * @return {String} The profile name
     */
    getProfile: function() {
        return this.currentProfile;
    },

    /**
     * @private
     */
    onHistoryChange: function(token) {
        return Ext.redirect(token);
    }
});
/**
 * @class Ext.ApplicationManager
 * @extends Ext.AbstractManager
 * @singleton
 * @ignore
 */
Ext.ApplicationManager = new Ext.AbstractManager({
    register: function(name, options) {
        if (Ext.isObject(name)) {
            options = name;
        } else {
            options.name = name;
        }
        
        var application = new Ext.Application(options);
        
        this.all.add(application);
        
        this.currentApplication = application;
        
        return application;
    }
});

/**
 * Shorthand for {@link Ext.ApplicationManager#register}
 * Creates a new Application class from the specified config object. See {@link Ext.Application} for full examples.
 * 
 * @param {Object} config A configuration object for the Model you wish to create.
 * @return {Ext.Application} The newly created Application
 * @member Ext
 * @method regApplication
 */
Ext.regApplication = function() {
    return Ext.ApplicationManager.register.apply(Ext.ApplicationManager, arguments);
};
