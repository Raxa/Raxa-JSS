/**
 * @author Ed Spencer
 *
 * Ext.app.Application defines the set of {@link Ext.data.Model Models}, {@link Ext.app.Controller Controllers},
 * {@link Ext.app.Profile Profiles}, {@link Ext.data.Store Stores} and {@link Ext.Component Views} that an application
 * consists of. It automatically loads all of those dependencies and can optionally specify a {@link #launch} function
 * that will be called when everthing is ready.
 *
 * Sample usage:
 *
 *     Ext.application({
 *         name: 'MyApp',
 *
 *         models: ['User', 'Group'],
 *         stores: ['Users'],
 *         controllers: ['Users'],
 *         views: ['Main', 'ShowUser'],
 *
 *         launch: function() {
 *             Ext.create('MyApp.view.Main');
 *         }
 *     });
 *
 * Creating an Application instance is the only time in Sencha Touch 2 that we don't use Ext.create to create the new
 * instance. Instead, the {@link Ext#application} function instantiates an Ext.app.Application internally,
 * automatically loading the Ext.app.Application class if it is not present on the page already and hooking in to
 * {@link Ext#onReady} before creating the instance itself. An alternative is to use Ext.create inside an Ext.onReady
 * callback, but Ext.application is preferred.
 *
 * ## Dependencies
 *
 * In our example above we defined Model, View, Controller and Store dependencies. Application follows a simple
 * convention when it comes to naming those classes - in each case we take the app {@link #name} ('MyApp' in this case)
 * and the name of the dependency (e.g. 'User' for the first defined Model dependency) and combine them to create
 * MyApp.model.User, MyApp.model.Group etc. In each case we use the singular form of the dependency type to create this
 * name - *model* instead of *models*, *controller* instead of *controllers*, etc.
 *
 * Based on these class names, the Application uses the class system's dynamic loading capabilities to automatically
 * load the classes specified. These map to files in your application that follow the same format - MyApp.model.User
 * would be found in app/model/User.js, MyApp.view.EditUser in app/view/EditUser.js and so on.
 *
 * The example above will load 6 files:
 *
 * * app/model/User.js
 * * app/model/Group.js
 * * app/store/Users.js
 * * app/controller/Users.js
 * * app/view/Main.js
 * * app/view/ShowUser.js
 *
 * ## Launching
 *
 * The final item in the example above is a launch function. This is called as soon as all of the dependencies have
 * been loaded and the Controllers instantiated. Usually this function is used to create the initial UI of your
 * application, check authentication or initialize any other application-launching behavior.
 *
 * ## Adding to Home Screen
 *
 * iOS devices allow your users to add your app to their home screen for easy access. iOS allows you to customize
 * several aspects of this, including the icon that will appear on the home screen and the startup image. These can be
 * specified in the Ext.application setup block:
 *
 *     Ext.application({
 *         name: 'MyApp',
 *
 *         {@link #icon}: 'resources/img/icon.png',
 *         {@link #glossOnIcon}: false,
 *         {@link #phoneStartupScreen}: 'resources/img/phone_startup.png',
 *         {@link #tabletStartupScreen}: 'resources/img/tablet_startup.png'
 *     });
 *
 * When the user adds your app to the home screen, your resources/img/icon.png file will be used as the application
 * icon. We also used the {@link #glossOnIcon} configuration to turn off the gloss effect that is automatically added
 * to icons in iOS. Finally we used the {@link #phoneStartupScreen} and {@link #tabletStartupScreen} configurations to
 * provide the images that will be displayed while your application is starting up. See also {@link #phoneIcon},
 * {@link #tabletIcon} and {@link #statusBarStyle}.
 *
 * ## Find out more
 *
 * If you are not already familiar with writing applications with Sencha Touch 2 we recommend reading the
 * <a href="#!/guide/apps_intro">intro to applications</a> guide, which lays out the core principles of writing apps
 * with Sencha Touch 2.
 */
Ext.define('Ext.app.Application', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.app.History',
        'Ext.app.Profile',
        'Ext.app.Router',
        'Ext.app.Action'
    ],

    config: {
        /**
         * @cfg {String/Object} icon Path to the .png image file to use when your app is added to the home screen on an
         * iOS device. When passed in as a String, the same icon will be used for both phone and tablet devices. To set
         * different icons for tablets and phones see the {@link #tabletIcon} and {@link #phoneIcon} configs.
         * @accessor
         */

        /**
         * @cfg {String} tabletIcon Path to the .png image file to use when your app is added to the home screen on an
         * iOS **tablet** device (iPad).
         * @accessor
         */

        /**
         * @cfg {String} phoneIcon Path to the .png image file to use when your app is added to the home screen on an
         * iOS **phone** device (iPhone or iPod).
         * @accessor
         */

        /**
         * @cfg {Boolean} glossOnIcon If set to false, the 'gloss' effect added to home screen {@link #icon icons} on
         * iOS devices will be removed.
         * @accessor
         */

        /**
         * @cfg {String} statusBarStyle Allows you to set the style of the status bar when your app is added to the
         * home screen on iOS devices. Defaults to 'black'. Alternative is to set to 'black-translucent', which turns
         * the status bar semi-transparent and overlaps the app content. This is usually not a good option for web apps
         * @accessor
         */

        /**
         * @cfg {String} phoneStartupScreen Path to the .png image file that will be displayed while the app is
         * starting up once it has been added to the home screen of an iOS phone device (iPhone or iPod). This .png
         * file should be 320px wide and 460px high.
         * @accessor
         */

        /**
         * @cfg {String} tabletStartupScreen Path to the .png image file that will be displayed while the app is
         * starting up once it has been added to the home screen of an iOS tablet device (iPad). This .png file should
         * be 768px wide and 1004px high.
         * @accessor
         */

        /**
         * @cfg {Array} profiles The set of profiles to load for this Application. Each profile is expected to
         * exist inside the *app/profile* directory and define a class following the convention
         * AppName.profile.ProfileName. For example, in the code below, the classes *AppName.profile.Phone*
         * and *AppName.profile.Tablet* will be loaded. Note that we are able to specify
         * either the full class name (as with *AppName.profile.Tablet*) or just the final part of the class name
         * and leave Application to automatically prepend *AppName.profile.’* to each:
         *
         *     profiles: [
         *         'Phone',
         *         'AppName.profile.Tablet',
         *         'SomeCustomNamespace.profile.Desktop'
         *     ]
         * @accessor
         */
        profiles: [],

        /**
         * @cfg {Array} stores The set of stores to load for this Application. Each store is expected to
         * exist inside the *app/store* directory and define a class following the convention
         * AppName.store.StoreName. For example, in the code below, the *AppName.store.Users* class will be loaded.
         * Note that we are able to specify either the full class name (as with *AppName.store.Groups*) or just the
         * final part of the class name and leave Application to automatically prepend *AppName.store.’* to each:
         *
         *     stores: [
         *         'Users',
         *         'AppName.store.Groups',
         *         'SomeCustomNamespace.store.Orders'
         *     ]
         * @accessor
         */
        stores: [],

        /**
         * @cfg {Array} controllers The set of controllers to load for this Application. Each controller is expected to
         * exist inside the *app/controller* directory and define a class following the convention
         * AppName.controller.ControllerName. For example, in the code below, the classes *AppName.controller.Users*,
         * *AppName.controller.Groups* and *AppName.controller.Products* will be loaded. Note that we are able to specify
         * either the full class name (as with *AppName.controller.Products*) or just the final part of the class name
         * and leave Application to automatically prepend *AppName.controller.’* to each:
         *
         *     controllers: [
         *         'Users',
         *         'Groups',
         *         'AppName.controller.Products',
         *         'SomeCustomNamespace.controller.Orders'
         *     ]
         * @accessor
         */
        controllers: [],

        /**
         * @cfg {Array} models The set of models to load for this Application. Each model is expected to exist inside the
         * *app/model* directory and define a class following the convention AppName.model.ModelName. For example, in the
         * code below, the classes *AppName.model.User*, *AppName.model.Group* and *AppName.model.Product* will be loaded.
         * Note that we are able to specify either the full class name (as with *AppName.model.Product*) or just the
         * final part of the class name and leave Application to automatically prepend *AppName.model.* to each:
         *
         *     models: [
         *         'User',
         *         'Group',
         *         'AppName.model.Product',
         *         'SomeCustomNamespace.model.Order'
         *     ]
         * @accessor
         */
        models: [],

        /**
         * @cfg {Array} views The set of views to load for this Application. Each view is expected to exist inside the
         * *app/view* directory and define a class following the convention AppName.view.ViewName. For example, in the
         * code below, the classes *AppName.view.Users*, *AppName.view.Groups* and *AppName.view.Products* will be loaded.
         * Note that we are able to specify either the full class name (as with *AppName.view.Products*) or just the
         * final part of the class name and leave Application to automatically prepend *AppName.view.* to each:
         *
         *     views: [
         *         'Users',
         *         'Groups',
         *         'AppName.view.Products',
         *         'SomeCustomNamespace.view.Orders'
         *     ]
         * @accessor
         */
        views: [],

        /**
         * @cfg {Ext.app.History} history The global {@link Ext.app.History History} instance attached to this
         * Application. Read only
         * @accessor
         */
        history: {},

        /**
         * @cfg {String} name The name of the Application. This should be a single word without spaces or periods
         * because it is used as the Application's global namespace. All classes in your application should be
         * namespaced undef the Application's name - for example if your application name is 'MyApp', your classes
         * should be named 'MyApp.model.User', 'MyApp.controller.Users', 'MyApp.view.Main' etc
         * @accessor
         */
        name: null,

        /**
         * @cfg {String} appFolder The path to the directory which contains all application's classes.
         * This path will be registered via {@link Ext.Loader#setPath} for the namespace specified in the {@link #name name} config.
         * Defaults to 'app'
         * @accessor
         */
        appFolder : 'app',

        /**
         * @cfg {Ext.app.Router} router The global {@link Ext.app.Router Router} instance attached to this Application.
         * Read only.
         * @accessor
         */
        router: {},

        /**
         * @cfg
         * @private
         * Used internally as the collection of instantiated controllers. Use {@link #getController} instead
         * @accessor
         */
        controllerInstances: [],

        /**
         * @cfg
         * @private
         * Used internally as the collection of instantiated profiles
         * @accessor
         */
        profileInstances: [],

        /**
         * @cfg {Ext.app.Profile} currentProfile The {@link Ext.app.Profile Profile} that is currently active for the
         * Application. This is set once, automatically by the Application before launch. Read only.
         * @accessor
         */
        currentProfile: null,

        /**
         * @cfg {Function} launch An optional function that will be called when the Application is ready to be
         * launched. This is normally used to render any initial UI required by your application
         * @accessor
         */
        launch: Ext.emptyFn,

        /**
         * @private
         * @cfg {Boolean} enableLoader Private config to disable loading of Profiles at application construct time.
         * This is used by Sencha's unit test suite to test Application.js in isolation and is likely to be removed
         * in favor of a more pleasing solution by the time you use it.
         * @accessor
         */
        enableLoader: true
    },

    /**
     * Constructs a new Application instance
     */
    constructor: function(config) {
        this.initConfig(config);

        //it's common to pass in functions to an application but because they are not predictable config names they
        //aren't ordinarily placed onto this so we need to do it manually
        for (var key in config) {
            this[key] = config[key];
        }

        // <deprecated product=touch since=2.0>
        if (config.autoCreateViewport) {
            console.log(
                '[Ext.app.Application] autoCreateViewport has been deprecated in Sencha Touch 2. Please implement a ' +
                'launch function on your Application instead and use Ext.create("MyApp.view.Main") to create your initial UI.'
            );
        }
        // </deprecated>

        if (this.getEnableLoader() !== false) {
            Ext.require(this.getProfiles(), this.onProfilesLoaded, this);
        }
    },

    /**
     * Dispatches a given {@link Ext.app.Action} to the relevant Controller instance. This is not usually called
     * directly by the developer, instead Sencha Touch's History support picks up on changes to the browser's url
     * and calls dispatch automatically.
     * @param {Ext.app.Action} action The action to dispatch
     * @param {Boolean} addToHistory True by default, sets the browser's url to the action's url
     */
    dispatch: function(action, addToHistory) {
        action = action || {};
        Ext.applyIf(action, {
            application: this
        });

        action = Ext.factory(action, Ext.app.Action);

        if (action) {
            var profile    = this.getCurrentProfile(),
                profileNS  = profile ? profile.getNamespace() : undefined,
                controller = this.getController(action.getController(), profileNS);

            if (controller) {
                if (addToHistory !== false) {
                    this.getHistory().add(action, true);
                }

                controller.execute(action);
            }
        }
    },

    /**
     * Redirects the browser to the given url. This only affects the url after the #. You can pass in either a String
     * or a Model instance - if a Model instance is defined its {@link Ext.data.Model#toUrl toUrl} function is called,
     * which returns a string representing the url for that model. Internally, this uses your application's
     * {@link Ext.app.Router Router} to decode the url into a matching controller action and then calls
     * {@link #dispatch}.
     * @param {String/Ext.data.Model} url The String url to redirect to
     */
    redirectTo: function(url) {
        if (Ext.data && Ext.data.Model && url instanceof Ext.data.Model) {
            var record = url;

            url = record.toUrl();
        }

        var decoded = this.getRouter().recognize(url);

        if (decoded) {
            decoded.url = url;
            if (record) {
                decoded.data = {};
                decoded.data.record = record;
            }
            return this.dispatch(decoded);
        }
    },

    /**
     * @private
     * (documented on Controller's control config)
     */
    control: function(selectors, controller) {
        //if the controller is not defined, use this instead (the application instance)
        controller = controller || this;

        var dispatcher = this.getEventDispatcher(),
            refs = (controller) ? controller.getRefs() : {},
            selector, eventName, listener, listeners, ref;

        for (selector in selectors) {
            if (selectors.hasOwnProperty(selector)) {
                listeners = selectors[selector];
                ref = refs[selector];

                //refs can be used in place of selectors
                if (ref) {
                    selector = ref.selector || ref;
                }
                for (eventName in listeners) {
                    listener = listeners[eventName];

                    if (Ext.isString(listener)) {
                        listener = controller[listener];
                    }

                    dispatcher.addListener('component', selector, eventName, listener, controller);
                }
            }
        }
    },

    /**
     * @private
     * Returns the Controller instance for the given controller name
     * @param {String} name The name of the Controller
     * @param {String} profileName Optional profile name. If passed, this is the same as calling
     * getController('profileName.controllerName')
     */
    getController: function(name, profileName) {
        var instances = this.getControllerInstances(),
            appName   = this.getName(),
            format    = Ext.String.format,
            topLevelName;

        if (name instanceof Ext.app.Controller) {
            return name;
        }

        if (instances[name]) {
            return instances[name];
        } else {
            topLevelName = format("{0}.controller.{1}", appName, name);
            profileName  = format("{0}.controller.{1}.{2}", appName, profileName, name);

            return instances[profileName] || instances[topLevelName];
        }
    },

    /**
     * @private
     * Callback that is invoked when all of the configured Profiles have been loaded. Detects the current profile and
     * gathers any additional dependencies from that profile, then loads all of those dependencies.
     */
    onProfilesLoaded: function() {
        var profiles  = this.getProfiles(),
            length    = profiles.length,
            instances = [],
            requires  = this.gatherDependencies(),
            current, i, profileDeps;

        for (i = 0; i < length; i++) {
            instances[i] = Ext.create(profiles[i], {
                application: this
            });

            /*
             * Note that we actually require all of the dependencies for all Profiles - this is so that we can produce
             * a single build file that will work on all defined Profiles. Although the other classes will be loaded,
             * the correct Profile will still be identified and the other classes ignored. While this feels somewhat
             * inefficient, the majority of the bulk of an application is likely to be the framework itself. The bigger
             * the app though, the bigger the effect of this inefficiency so ideally we will create a way to create and
             * load Profile-specific builds in a future release.
             */
            profileDeps = instances[i].getDependencies();
            requires = requires.concat(profileDeps.all);

            if (instances[i].isActive() && !current) {
                current = instances[i];

                this.setCurrentProfile(current);

                this.setControllers(this.getControllers().concat(profileDeps.controller));
                this.setModels(this.getModels().concat(profileDeps.model));
                this.setViews(this.getViews().concat(profileDeps.view));
                this.setStores(this.getStores().concat(profileDeps.store));
            }
        }

        this.setProfileInstances(instances);
        Ext.require(requires, this.loadControllerDependencies, this);
    },

    /**
     * @private
     * This is solely present for backwards compatibility with 1.x. In 1.x a Controller could specify additional
     * Models, Views and Stores to load. Here we look to see if any Controller is doing so and load them before
     * finalizing application bootup.
     */
    loadControllerDependencies: function() {
        var controllers = this.getControllers(),
            length = controllers.length,
            classes = [],
            name = this.getName(),
            format = Ext.String.format,
            controller, proto, i;

        for (i = 0; i < length; i++) {
            controller = Ext.ClassManager.classes[controllers[i]];
            proto = controller.prototype;

            Ext.each(proto.models, function(modelName) {
                classes.push(format('{0}.model.{1}', name, modelName));
            }, this);

            Ext.each(proto.views, function(viewName) {
                classes.push(format('{0}.view.{1}', name, viewName));
            }, this);

            Ext.each(proto.stores, function(storeName) {
                classes.push(format('{0}.store.{1}', name, storeName));
                this.setStores(this.getStores().concat([storeName]));
            }, this);
        }

        Ext.require(classes, this.onDependenciesLoaded, this);
    },

    /**
     * @private
     * Callback that is invoked when all of the Application + current Profile dependencies have been loaded.
     * Instantiates all of the controllers and stores then launches the app
     */
    onDependenciesLoaded: function() {
        var me = this,
            profile = this.getCurrentProfile(),
            launcher = this.getLaunch(),
            controllers, name;

        //<deprecated product=touch since=2.0>
        if (Ext.Router) {
            Ext.Router.setAppInstance(this);
        }
        //</deprecated>

        me.instantiateStores();
        me.instantiateControllers();
        controllers = this.getControllerInstances();

        if (profile) {
            profile.launch();
        }

        launcher.call(me);

        for (name in controllers) {
            controllers[name].launch(this);
        }

        me.redirectTo(window.location.hash.substr(1));
    },

    /**
     * @private
     * Gathers up all of the previously computed MVCS dependencies into a single array that we can pass to Ext.require
     */
    gatherDependencies: function() {
        var classes = this.getModels().concat(this.getViews()).concat(this.getControllers());

        Ext.each(this.getStores(), function(storeName) {
            if (Ext.isString(storeName)) {
                classes.push(storeName);
            }
        }, this);

        return classes;
    },

    /**
     * @private
     * Should be called after dependencies are loaded, instantiates all of the Stores specified in the {@link #stores}
     * config. For each item in the stores array we make sure the Store is instantiated. When strings are specified,
     * the corresponding app/store/StoreName.js was loaded so we now instantiate a MyApp.store.StoreName, giving it the
     * id StoreName.
     */
    instantiateStores: function() {
        var stores  = this.getStores(),
            length  = stores.length,
            store, storeClass, storeName, splits, i;

        for (i = 0; i < length; i++) {
            store = stores[i];

            if (Ext.data && Ext.data.Store && !(store instanceof Ext.data.Store)) {
                if (Ext.isString(store)) {
                    storeName = store;
                    storeClass = Ext.ClassManager.classes[store];

                    store = {
                        xclass: store
                    };

                    //we don't want to wipe out a configured storeId in the app's Store subclass so need
                    //to check for this first
                    if (storeClass.prototype.defaultConfig.storeId === undefined) {
                        splits = storeName.split('.');
                        store.id = splits[splits.length - 1];
                    }
                }

                stores[i] = Ext.factory(store, Ext.data.Store);
            }
        }

        this.setStores(stores);
    },

    /**
     * @private
     * Called once all of our controllers have been loaded
     */
    instantiateControllers: function() {
        var controllerNames = this.getControllers(),
            instances = {},
            length = controllerNames.length,
            name, i;

        for (i = 0; i < length; i++) {
            name = controllerNames[i];

            instances[name] = Ext.create(name, {
                application: this
            });

            instances[name].init();
        }

        return this.setControllerInstances(instances);
    },

    /**
     * @private
     * As a convenience developers can locally qualify controller names (e.g. 'MyController' vs
     * 'MyApp.controller.MyController'). This just makes sure everything ends up fully qualified
     */
    applyControllers: function(controllers) {
        var length  = controllers.length,
            appName = this.getName(),
            name, i;

        for (i = 0; i < length; i++) {
            name = controllers[i];

            if (!name.match('\\.')) {
                controllers[i] = appName + '.controller.' + name;
            }
        }

        return controllers;
    },

    /**
     * @private
     * As a convenience developers can locally qualify store names (e.g. 'MyStore' vs
     * 'MyApp.store.MyStore'). This just makes sure everything ends up fully qualified
     */
    applyStores: function(stores) {
        var length  = stores.length,
            appName = this.getName(),
            name, i;

        for (i = 0; i < length; i++) {
            name = stores[i];

            if (Ext.isString(name) && !name.match('\\.')) {
                stores[i] = appName + '.store.' + name;
            }
        }

        return stores;
    },

    /**
     * @private
     * As a convenience developers can locally qualify model names (e.g. 'MyModel' vs
     * 'MyApp.model.MyModel'). This just makes sure everything ends up fully qualified
     */
    applyModels: function(models) {
        var length  = models.length,
            appName = this.getName(),
            name, i;

        for (i = 0; i < length; i++) {
            name = models[i];

            if (Ext.isString(name) && !name.match('\\.')) {
                models[i] = appName + '.model.' + name;
            }
        }

        return models;
    },

    /**
     * @private
     * As a convenience developers can locally qualify view names (e.g. 'MyView' vs
     * 'MyApp.view.MyView'). This just makes sure everything ends up fully qualified
     */
    applyViews: function(views) {
        var length  = views.length,
            appName = this.getName(),
            name, i;

        for (i = 0; i < length; i++) {
            name = views[i];

            if (Ext.isString(name) && !name.match('\\.')) {
                views[i] = appName + '.view.' + name;
            }
        }

        return views;
    },

    /**
     * @private
     * As a convenience developers can locally qualify profile names (e.g. 'MyProfile' vs
     * 'MyApp.profile.MyProfile'). This just makes sure everything ends up fully qualified
     */
    applyProfiles: function(profiles) {
        var length  = profiles.length,
            appName = this.getName(),
            name, i;

        for (i = 0; i < length; i++) {
            name = profiles[i];

            if (Ext.isString(name) && !name.match('\\.')) {
                profiles[i] = appName + '.profile.' + name;
            }
        }

        return profiles;
    },

    /**
     * @private
     * Checks that the name configuration has any whitespace, and trims them if found.
     */
    applyName: function(name) {
        var oldName;
        if (name && name.match(/ /g)) {
            oldName = name;
            name = name.replace(/ /g, "");

            // <debug>
            Ext.Logger.warn('Attempting to create an application with a name which contains whitespace ("' + oldName + '"). Renamed to "' + name + '".');
            // </debug>
        }

        return name;
    },

    /**
     * @private
     * Makes sure the app namespace exists, sets the `app` property of the namespace to this application and sets its loading path
     */
    updateName: function(newName) {
        Ext.ClassManager.setNamespace(newName + '.app', this);
        Ext.Loader.setPath(newName, this.getAppFolder());
    },

    /**
     * @private
     */
    applyRouter: function(config) {
        return Ext.factory(config, Ext.app.Router, this.getRouter());
    },

    /**
     * @private
     */
    applyHistory: function(config) {
        var history = Ext.factory(config, Ext.app.History, this.getHistory());

        history.on('change', this.onHistoryChange, this);

        return history;
    },

    /**
     * @private
     */
    onHistoryChange: function(url) {
        this.dispatch(this.getRouter().recognize(url), false);
    }
}, function() {
    // <deprecated product=touch since=2.0>
    Ext.regApplication = function(config) {
        console.warn(
            '[Ext.app.Application] Ext.regApplication() is deprecated, please replace it with Ext.application()'
        );

        var appName = config.name,
            format  = Ext.String.format;

        Ext.ns(
            appName,
            format("{0}.controllers", appName),
            format("{0}.models", appName),
            format("{0}.views", appName)
        );

        Ext.application(config);
    };

    Ext.define('Ext.data.ProxyMgr', {
        singleton: true,

        registerType: function(name, cls) {
            console.warn(
                'Ext.data.ProxyMgr no longer exists - instead of calling Ext.data.ProxyMgr.registerType just update ' +
                'your custom Proxy class to set alias: "proxy.' + name + '"'
            );

            Ext.ClassManager.setAlias(cls, "proxy." + name);
        }
    });

    Ext.reg = function(alias, cls) {
        console.warn(
            'Ext.reg is deprecated, please set xtype: "' + alias + '" directly in your subclass instead'
        );

        Ext.ClassManager.setAlias(cls, alias);
    };

    // </deprecated>
});
