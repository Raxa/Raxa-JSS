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