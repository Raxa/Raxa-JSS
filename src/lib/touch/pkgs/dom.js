/*

This file is part of Sencha Touch 2

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.EventManager
 *
 * This object is deprecated.
 *
 * @deprecated
 * @singleton
 */

//<deprecated product=touch since=2.0>
Ext.ns('Ext.core');
Ext.core.EventManager =
Ext.EventManager = {
    addListener: function(element, eventName, fn, scope, options) {
        //<debug warn>
        Ext.Logger.deprecate("Ext.EventManager.addListener is deprecated, use addListener() directly from an instance of Ext.Element instead", 2);
        //</debug>
        element.on(eventName, fn, scope, options);
    },

    removeListener: function(element, eventName, fn, scope) {
        //<debug warn>
        Ext.Logger.deprecate("Ext.EventManager.removeListener is deprecated, use removeListener() directly from an instance of Ext.Element instead", 2);
        //</debug>
        element.un(eventName, fn, scope);
    },

    removeAll: function(element){
        //<debug warn>
        Ext.Logger.deprecate("Ext.EventManager.removeAll is deprecated, use clearListeners() directly from an instance of Ext.Element instead", 3);
        //</debug>
        Ext.get(element).clearListeners();
    },

    onWindowResize: function(fn, scope, options) {
        //<debug warn>
        Ext.Logger.deprecate("Ext.EventManager.onWindowResize is deprecated, attach listener to Ext.Viewport instead, i.e: Ext.Viewport.on('resize', ...)", 2);
        //</debug>
        Ext.Viewport.on('resize', fn, scope, options);
    },

    onOrientationChange: function(fn, scope, options) {
        //<debug warn>
        Ext.Logger.deprecate("Ext.EventManager.onOrientationChange is deprecated, attach listener to Ext.Viewport instead, i.e: Ext.Viewport.on('orientationchange', ...)", 2);
        //</debug>
        Ext.Viewport.on('orientationchange', fn, scope, options);
    },

    unOrientationChange: function(fn, scope, options) {
        //<debug warn>
        Ext.Logger.deprecate("Ext.EventManager.unOrientationChange is deprecated, remove listener from Ext.Viewport instead, i.e: Ext.Viewport.un('orientationchange', ...)", 2);
        //</debug>
        Ext.Viewport.un('orientationchange', fn, scope, options);
    }
};

Ext.EventManager.on = Ext.EventManager.addListener;
Ext.EventManager.un = Ext.EventManager.removeListener;
//</deprecated>

/**
 * @class Ext
 *
 * Ext is the global namespace for the whole Sencha Touch framework. Every class, function and configuration for the
 * whole framework exists under this single global variable. The Ext singleton itself contains a set of useful helper
 * functions (like {@link #apply}, {@link #min} and others), but most of the framework that you use day to day exists
 * in specialized classes (for example {@link Ext.Panel}, {@link Ext.Carousel} and others).
 *
 * If you are new to Sencha Touch we recommend starting with the [Getting Started Guide][getting_started] to
 * get a feel for how the framework operates. After that, use the more focused guides on subjects like panels, forms and data
 * to broaden your understanding. The MVC guides take you through the process of building full applications using the
 * framework, and detail how to deploy them to production.
 *
 * The functions listed below are mostly utility functions used internally by many of the classes shipped in the
 * framework, but also often useful in your own apps.
 *
 * A method that is crucial to beginning your application is {@link #setup Ext.setup}. Please refer to it's documentation, or the
 * [Getting Started Guide][getting_started] as a reference on beginning your application.
 *
 *     Ext.setup({
 *         onReady: function() {
 *             Ext.Viewport.add({
 *                 xtype: 'component',
 *                 html: 'Hello world!'
 *             });
 *         }
 *     });
 *
 * [getting_started]: #!/guide/getting_started
 */
Ext.setVersion('touch', '2.0.0.pr4');

Ext.apply(Ext, {
    /**
     * The version of the framework
     * @type String
     */
    version: Ext.getVersion('touch'),

    /**
     * @private
     */
    idSeed: 0,

    /**
     * Repaints the whole page. This fixes frequently encountered painting issues in mobile Safari.
     */
    repaint: function() {
        var mask = Ext.getBody().createChild({
            cls: Ext.baseCSSPrefix + 'mask ' + Ext.baseCSSPrefix + 'mask-transparent'
        });
        setTimeout(function() {
            mask.remove();
        }, 0);
    },

    /**
     * Generates unique ids. If the element already has an id, it is unchanged
     * @param {Mixed} el (optional) The element to generate an id for
     * @param {String} prefix (optional) Id prefix (defaults "ext-gen")
     * @return {String} The generated Id.
     */
    id: function(el, prefix) {
        if (el && el.id) {
            return el.id;
        }

        el = Ext.getDom(el) || {};

        if (el === document || el === document.documentElement) {
            el.id = 'ext-application';
        }
        else if (el === document.body) {
            el.id = 'ext-viewport';
        }
        else if (el === window) {
            el.id = 'ext-window';
        }

        el.id = el.id || ((prefix || 'ext-element-') + (++Ext.idSeed));

        return el.id;
    },

    /**
     * Returns the current document body as an {@link Ext.Element}.
     * @return Ext.Element The document body
     */
    getBody: function() {
        if (!Ext.documentBodyElement) {
            if (!document.body) {
                throw new Error("[Ext.getBody] document.body does not exist at this point");
            }

            Ext.documentBodyElement = Ext.get(document.body);
        }

        return Ext.documentBodyElement;
    },

    /**
     * Returns the current document head as an {@link Ext.Element}.
     * @return Ext.Element The document head
     */
    getHead: function() {
        if (!Ext.documentHeadElement) {
            Ext.documentHeadElement = Ext.get(document.head || document.getElementsByTagName('head')[0]);
        }

        return Ext.documentHeadElement;
    },

    /**
     * Returns the current HTML document object as an {@link Ext.Element}.
     * @return Ext.Element The document
     */
    getDoc: function() {
        if (!Ext.documentElement) {
            Ext.documentElement = Ext.get(document);
        }

        return Ext.documentElement;
    },

    /**
     * This is shorthand reference to {@link Ext.ComponentMgr#get}.
     * Looks up an existing {@link Ext.Component Component} by {@link Ext.Component#getId id}
     * @param {String} id The component {@link Ext.Component#getId id}
     * @return Ext.Component The Component, <tt>undefined</tt> if not found, or <tt>null</tt> if a
     * Class was found.
    */
    getCmp: function(id) {
        return Ext.ComponentMgr.get(id);
    },

    /**
     * Copies a set of named properties fom the source object to the destination object.
     *
     * Example:
     *
     *     ImageComponent = Ext.extend(Ext.Component, {
     *         initComponent: function() {
     *             this.autoEl = { tag: 'img' };
     *             MyComponent.superclass.initComponent.apply(this, arguments);
     *             this.initialBox = Ext.copyTo({}, this.initialConfig, 'x,y,width,height');
     *         }
     *     });
     *
     * Important note: To borrow class prototype methods, use {@link Ext.Base#borrow} instead.
     *
     * @param {Object} dest The destination object.
     * @param {Object} source The source object.
     * @param {String/String[]} names Either an Array of property names, or a comma-delimited list
     * of property names to copy.
     * @param {Boolean} usePrototypeKeys (Optional) Defaults to false. Pass true to copy keys off of the prototype as well as the instance.
     * @return {Object} The modified object.
     */
    copyTo : function(dest, source, names, usePrototypeKeys) {
        if (typeof names == 'string') {
            names = names.split(/[,;\s]/);
        }
        Ext.each (names, function(name) {
            if (usePrototypeKeys || source.hasOwnProperty(name)) {
                dest[name] = source[name];
            }
        }, this);
        return dest;
    },

    /**
     * Attempts to destroy any objects passed to it by removing all event listeners, removing them from the
     * DOM (if applicable) and calling their destroy functions (if available).  This method is primarily
     * intended for arguments of type {@link Ext.Element} and {@link Ext.Component}, but any subclass of
     * {@link Ext.util.Observable} can be passed in.  Any number of elements and/or components can be
     * passed into this function in a single call as separate arguments.
     * @param {Mixed...} args An {@link Ext.Element}, {@link Ext.Component}, or an Array of either of these to destroy
     */
    destroy: function() {
        var ln = arguments.length,
            i, arg;

        for (i = 0; i < ln; i++) {
            arg = arguments[i];
            if (arg) {
                if (Ext.isArray(arg)) {
                    this.destroy.apply(this, arg);
                }
                else if (Ext.isFunction(arg.destroy)) {
                    arg.destroy();
                }
                else if (arg.dom) {
                    arg.remove();
                }
            }
        }
    },

     /**
      * Return the dom node for the passed String (id), dom node, or Ext.Element.
      * Here are some examples:
      * <pre><code>
// gets dom node based on id
var elDom = Ext.getDom('elId');
// gets dom node based on the dom node
var elDom1 = Ext.getDom(elDom);

// If we don&#39;t know if we are working with an
// Ext.Element or a dom node use Ext.getDom
function(el){
 var dom = Ext.getDom(el);
 // do something with the dom node
}
       </code></pre>
     * <b>Note</b>: the dom node to be found actually needs to exist (be rendered, etc)
     * when this method is called to be successful.
     * @param {Mixed} el
     * @return HTMLElement
     */
    getDom: function(el) {
        if (!el || !document) {
            return null;
        }

        return el.dom ? el.dom : (typeof el == 'string' ? document.getElementById(el) : el);
    },

    /**
     * <p>Removes this element from the document, removes all DOM event listeners, and deletes the cache reference.
     * All DOM event listeners are removed from this element.
     * @param {HTMLElement} node The node to remove
     */
    removeNode: function(node) {
        if (node && node.parentNode && node.tagName != 'BODY') {
            Ext.get(node).clearListeners();
            node.parentNode.removeChild(node);
            delete Ext.cache[node.id];
        }
    },

    /**
     * @private
     */
    defaultSetupConfig: {
        eventPublishers: {
            dom: {
                xclass: 'Ext.event.publisher.Dom'
            },
            touchGesture: {
                xclass: 'Ext.event.publisher.TouchGesture',
                recognizers: {
                    drag: {
                        xclass: 'Ext.event.recognizer.Drag'
                    },
                    tap: {
                        xclass: 'Ext.event.recognizer.Tap'
                    },
                    doubleTap: {
                        xclass: 'Ext.event.recognizer.DoubleTap'
                    },
                    longPress: {
                        xclass: 'Ext.event.recognizer.LongPress'
                    },
                    swipe: {
                        xclass: 'Ext.event.recognizer.HorizontalSwipe'
                    },
                    pinch: {
                        xclass: 'Ext.event.recognizer.Pinch'
                    },
                    rotate: {
                        xclass: 'Ext.event.recognizer.Rotate'
                    }
                }
            },
            componentDelegation: {
                xclass: 'Ext.event.publisher.ComponentDelegation'
            },
            componentPaint: {
                xclass: 'Ext.event.publisher.ComponentPaint'
            }
        },

        //<feature logger>
        logger: {
            enabled: true,
            xclass: 'Ext.log.Logger',
            minPriority: 'deprecate',
            writers: {
                console: {
                    xclass: 'Ext.log.writer.Console',
                    throwOnErrors: true,
                    formatter: {
                        xclass: 'Ext.log.formatter.Default'
                    }
                }
            }
        },
        //</feature>

        animator: {
            xclass: 'Ext.fx.Runner'
        },

        viewport: {
            xclass: 'Ext.viewport.Viewport'
        }
    },

    //<feature logger>
    log: function(msg) {
        return Ext.Logger.log(msg);
    },
    //</feature>

    /**
     * @private
     */
    isSetup: false,

    /**
     * @private
     */
    setupListeners: [],

    /**
     * @private
     */
    onSetup: function(fn, scope) {
        if (Ext.isSetup) {
            fn.call(scope);
        }
        else {
            Ext.setupListeners.push({
                fn: fn,
                scope: scope
            });
        }
    },

    /**
     * Ext.setup is used to launch a basic application. It handles creating an {@link Ext.Viewport} instance for you.
     *
     *     Ext.setup({
     *         onReady: function() {
     *             Ext.Viewport.add({
     *                 xtype: 'component',
     *                 html: 'Hello world!'
     *             });
     *         }
     *     });
     *
     * @param {Object} config An object with the following config options:
     *
     * @param {Function} config.onReady
     * A function to be called when the application is ready. Your application logic should be here. Please see the example above.
     *
     * @param {Object} config.viewport
     * An object to be used when creating the global {@link Ext.Viewport} instance. Please refer to the {@link Ext.Viewport}
     * documentation for more information.
     *
     *     Ext.setup({
     *         viewport: {
     *             layout: 'vbox'
     *         },
     *         onReady: function() {
     *             Ext.Viewport.add({
     *                 flex: 1,
     *                 html: 'top (flex: 1)'
     *             });
     *
     *             Ext.Viewport.add({
     *                 flex: 4,
     *                 html: 'bottom (flex: 4)'
     *             });
     *         }
     *     });
     *
     * @param {String/Object} config.icon
     * A icon configuration for this application. This will only apply to iOS applications which are saved to the homescreen.
     *
     * You can either pass a string which will be applied to all different sizes:
     *
     *     Ext.setup({
     *         icon: 'icon.png',
     *         onReady: function() {
     *             console.log('Launch...');
     *         }
     *     });
     *
     * Or an object which has a location for different sizes:
     *
     *     Ext.setup({
     *         icon: {
     *             '57': 'icon57.png',
     *             '77': 'icon77.png',
     *             '114': 'icon114.png'
     *         },
     *         onReady: function() {
     *             console.log('Launch...');
     *         }
     *     });
     *
     * @param {String} config.icon.57 The icon to be used on non-retna display devices (iPhone 3GS and below).
     * @param {String} config.icon.77 The icon to be used on the iPad.
     * @param {String} config.icon.114 The icon to be used on retna display devices (iPhone 4 and above).
     *
     * @param {Boolean} glossOnIcon
     * True to add a gloss effect to the icon.
     *
     * @param {String} statusBarStyle
     * The style of status bar to be shown on applications added to the iOS homescreen. Valid options are:
     *
     * * `default`
     * * `black`
     * * `black-translucent`
     *
     * @param {String[]} config.requires
     * An array of required classes for your application which will be automatically loaded if {@link Ext.Loader#enabled} is set
     * to `true`. Please refer to {@link Ext.Loader} and {@link Ext.Loader#require} for more information.
     *
     *     Ext.setup({
     *         requires: ['Ext.Button', 'Ext.tab.Panel'],
     *         onReady: function() {
     *             //...
     *         }
     *     });
     *
     * @param {Object} config.eventPublishers
     * Sencha Touch, by default, includes various {@link Ext.event.recognizer.Recognizer} subclasses to recognise events fired
     * in your application. The list of default recognisers can be found in the documentation for {@link Ext.event.recognizer.Recognizer}.
     *
     * To change the default recognisers, you can use the following syntax:
     *
     *     Ext.setup({
     *         eventPublishers: {
     *             touchGesture: {
     *                 recognizers: {
     *                     swipe: {
     *                         //this will include both vertical and horizontal swipe recognisers
     *                         xclass: 'Ext.event.recognizer.Swipe'
     *                     }
     *                 }
     *             }
     *         },
     *         onReady: function() {
     *             //...
     *         }
     *     });
     *
     * You can also disable recognizers using this syntax:
     *
     *     Ext.setup({
     *         eventPublishers: {
     *             touchGesture: {
     *                 recognizers: {
     *                     swipe: null,
     *                     pinch: null,
     *                     rotate: null
     *                 }
     *             }
     *         },
     *         onReady: function() {
     *             //...
     *         }
     *     });
     */
    setup: function(config) {
        var defaultSetupConfig = Ext.defaultSetupConfig,
            onReady = config.onReady || Ext.emptyFn,
            scope = config.scope,
            requires = Ext.Array.from(config.requires),
            extOnReady = Ext.onReady,
            icon = config.icon,
            callback, viewport, precomposed;

        Ext.setup = function() {
            throw new Error("Ext.setup has already been called before");
        };

        delete config.requires;
        delete config.onReady;
        delete config.scope;

        //TODO: Move Ext.dom.CompositeElementLite
        Ext.require(['Ext.event.Dispatcher', 'Ext.dom.CompositeElementLite']);

        callback = function() {
            var listeners = Ext.setupListeners,
                ln = listeners.length,
                i, listener;

            delete Ext.setupListeners;
            Ext.isSetup = true;

            for (i = 0; i < ln; i++) {
                listener = listeners[i];
                listener.fn.call(listener.scope);
            }

            Ext.onReady = extOnReady;
            Ext.onReady(onReady, scope);
        };

        Ext.onReady = function(fn, scope) {
            var origin = onReady;

            onReady = function() {
                origin();
                Ext.onReady(fn, scope);
            };
        };

        config = Ext.merge({}, defaultSetupConfig, config);

        Ext.onDocumentReady(function() {
            Ext.factoryConfig(config, function(data) {
                Ext.event.Dispatcher.getInstance().setPublishers(data.eventPublishers);

                if (data.logger) {
                    Ext.Logger = data.logger;
                }

                if (data.animator) {
                    Ext.Animator = data.animator;
                }

                if (data.viewport) {
                    Ext.Viewport = viewport = data.viewport;

                    //<deprecated product=touch since=2.0>
                    Ext.getOrientation = function() {
                        //<debug warn>
                        Ext.Logger.deprecate("Ext.getOrientation() is deprecated, use Ext.Viewport.getOrientation() instead", 2);
                        //</debug>
                        return viewport.getOrientation();
                    };
                    //</deprecated>

                    Ext.require(requires, function() {
                        Ext.Viewport.on('ready', callback, null, {single: true});
                    });
                }
                else {
                    Ext.require(requires, callback);
                }
            });
        });

        if (!document.body) {
            // Inject meta viewport tag
            document.write(
                '<meta id="extViewportMeta" ' +
                       'name="viewport" ' +
                       'content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />');
            document.write('<meta name="apple-mobile-web-app-capable" content="yes">');
            document.write('<meta name="apple-touch-fullscreen" content="yes">');
            
            if (Ext.os.is.iOS) {
                //status bar style
                if (Ext.isString(config.statusBarStyle)) {
                    document.write('<meta name="apple-mobile-web-app-status-bar-style" content="' + config.statusBarStyle + '">');
                }

                //startup screens
                if (config.tabletStartupScreen && Ext.os.is.iPad) {
                    document.write('<link rel="apple-touch-startup-image" href="' + config.tabletStartupScreen + '">');
                }

                if (config.phoneStartupScreen && !Ext.os.is.iPad) {
                    document.write('<link rel="apple-touch-startup-image" href="' + config.phoneStartupScreen + '">');
                }

                // icon
                if (Ext.isString(config.icon) || Ext.isString(config.phoneIcon) || Ext.isString(config.tabletIcon)) {
                    icon = {
                        '57': config.phoneIcon || config.tabletIcon || config.icon,
                        '72': config.tabletIcon || config.phoneIcon || config.icon,
                        '114': config.phoneIcon || config.tabletIcon || config.icon
                    };
                }
                
                precomposed = (config.glossOnIcon === false) ? '-precomposed' : '';

                if (Ext.os.is.iPad && icon['72']) {
                    document.write('<link rel="apple-touch-icon' + precomposed + '" sizes="72x72" href="' + icon['72'] + '">');
                }
                else if (!Ext.os.is.iPad) {
                    if (icon['57']) {
                        document.write('<link rel="apple-touch-icon' + precomposed + '" href="' + icon['57'] + '">');
                    }
                    if (icon['114']) {
                        document.write('<link rel="apple-touch-icon' + precomposed + '" sizes="114x114" href="' + icon['114'] + '">');
                    }
                }
            }
        }
    },

    /**
     * @member Ext
     * @method application
     *
     * Loads Ext.app.Application class and starts it up with given configuration after the page is ready.
     *
     *     Ext.application({
     *         launch: function() {
     *             alert('Application launched!');
     *         }
     *     });
     *
     * See {@link Ext.app.Application} for details.
     *
     * @param {Object} config An object with the following config options:
     *
     * @param {Function} config.launch
     * A function to be called when the application is ready. Your application logic should be here. Please see {@link Ext.app.Application}
     * for details.
     *
     * @param {Object} config.viewport
     * An object to be used when creating the global {@link Ext.Viewport} instance. Please refer to the {@link Ext.Viewport}
     * documentation for more information.
     *
     *     Ext.application({
     *         viewport: {
     *             layout: 'vbox'
     *         },
     *         launch: function() {
     *             Ext.Viewport.add({
     *                 flex: 1,
     *                 html: 'top (flex: 1)'
     *             });
     *
     *             Ext.Viewport.add({
     *                 flex: 4,
     *                 html: 'bottom (flex: 4)'
     *             });
     *         }
     *     });
     *
     * @param {String/Object} config.icon
     * A icon configuration for this application. This will only apply to iOS applications which are saved to the homescreen.
     *
     * You can either pass a string which will be applied to all different sizes:
     *
     *     Ext.setup({
     *         icon: 'icon.png',
     *         onReady: function() {
     *             console.log('Launch...');
     *         }
     *     });
     *
     * Or an object which has a location for different sizes:
     *
     *     Ext.setup({
     *         icon: {
     *             '57': 'icon57.png',
     *             '77': 'icon77.png',
     *             '114': 'icon114.png'
     *         },
     *         onReady: function() {
     *             console.log('Launch...');
     *         }
     *     });
     *
     * @param {String} config.icon.57 The icon to be used on non-retna display devices (iPhone 3GS and below).
     * @param {String} config.icon.77 The icon to be used on the iPad.
     * @param {String} config.icon.114 The icon to be used on retna display devices (iPhone 4 and above).
     *
     * @param {Boolean} glossOnIcon
     * True to add a gloss effect to the icon.
     *
     * @param {String} statusBarStyle
     * The style of status bar to be shown on applications added to the iOS homescreen. Valid options are:
     *
     * * `default`
     * * `black`
     * * `black-translucent`
     *
     * @param {String[]} config.requires
     * An array of required classes for your application which will be automatically loaded if {@link Ext.Loader#enabled} is set
     * to `true`. Please refer to {@link Ext.Loader} and {@link Ext.Loader#require} for more information.
     *
     *     Ext.application({
     *         requires: ['Ext.Button', 'Ext.tab.Panel'],
     *         launch: function() {
     *             //...
     *         }
     *     });
     *
     * @param {Object} config.eventPublishers
     * Sencha Touch, by default, includes various {@link Ext.event.recognizer.Recognizer} subclasses to recognise events fired
     * in your application. The list of default recognisers can be found in the documentation for {@link Ext.event.recognizer.Recognizer}.
     *
     * To change the default recognisers, you can use the following syntax:
     *
     *     Ext.application({
     *         eventPublishers: {
     *             touchGesture: {
     *                 recognizers: {
     *                     swipe: {
     *                         //this will include both vertical and horizontal swipe recognisers
     *                         xclass: 'Ext.event.recognizer.Swipe'
     *                     }
     *                 }
     *             }
     *         },
     *         launch: function() {
     *             //...
     *         }
     *     });
     *
     * You can also disable recognizers using this syntax:
     *
     *     Ext.application({
     *         eventPublishers: {
     *             touchGesture: {
     *                 recognizers: {
     *                     swipe: null,
     *                     pinch: null,
     *                     rotate: null
     *                 }
     *             }
     *         },
     *         launch: function() {
     *             //...
     *         }
     *     });
     */
    application: function(config) {
        var onReady,
            scope;

        if (!config) {
            config = {};
        }

        config.requires = Ext.Array.from(config.requires);
        config.requires.push('Ext.app.Application');

        onReady = config.onReady;
        scope = config.scope;

        config.onReady = function() {
            new Ext.app.Application(config);

            if (onReady) {
                onReady.call(scope);
            }
        };

        Ext.setup(config);

        //<deprecated product=touch since=2.0>
        /**
         * Restores compatibility for the old Ext.Router.draw syntax. This needs to be here because apps often include
         * routes.js just after app.js, so this is our only opportunity to hook this in. There is a small piece of code
         * inside Application's onDependenciesLoaded that sets up the other end of this
         */
        Ext.Router = {};

        var drawStack = [];

        /**
         * Application's onDependenciesLoaded has a deprecated-wrapped line that calls this. Basic idea is that once an
         * app has been instantiated we set that at Ext.Router's appInstance and then redirect any calls to
         * Ext.Router.draw to that app's Router. We keep a drawStack above so that we can call Ext.Router.draw one or
         * more times before the application is even instantiated and it will simply link it up once everything is
         * present.
         */
        Ext.Router.setAppInstance = function(app) {
            Ext.Router.appInstance = app;

            if (drawStack.length > 0) {
                Ext.each(drawStack, Ext.Router.draw);
            }
        };

        Ext.Router.draw = function(mapperFn) {
            Ext.Logger.deprecate(
                'Ext.Router.map is deprecated, please define your routes inline inside each Controller. ' +
                'Please see the 1.x -> 2.x migration guide for more details.'
            );

            var app = Ext.Router.appInstance,
                router;

            if (app) {
                router = app.getRouter();
                mapperFn(router);
            } else {
                drawStack.push(mapperFn);
            }
        };
        //</deprecated>
    },

    /**
     * @private
     * @param config
     * @param callback
     */
    factoryConfig: function(config, callback) {
        var isSimpleObject = Ext.isSimpleObject(config);

        if (isSimpleObject && config.xclass) {
            var className = config.xclass;

            delete config.xclass;

            Ext.require(className, function() {
                Ext.factoryConfig(config, function(cfg) {
                    callback(Ext.create(className, cfg));
                });
            });

            return;
        }

        var isArray = Ext.isArray(config),
            keys = [],
            key, value, i, ln;

        if (isSimpleObject || isArray) {
            if (isSimpleObject) {
                for (key in config) {
                    if (config.hasOwnProperty(key)) {
                        value = config[key];
                        if (Ext.isSimpleObject(value) || Ext.isArray(value)) {
                            keys.push(key);
                        }
                    }
                }
            }
            else {
                for (i = 0,ln = config.length; i < ln; i++) {
                    value = config[i];

                    if (Ext.isSimpleObject(value) || Ext.isArray(value)) {
                        keys.push(i);
                    }
                }
            }

            i = 0;
            ln = keys.length;

            if (ln === 0) {
                callback(config);
                return;
            }

            function fn(value) {
                config[key] = value;
                i++;
                factory();
            }

            function factory() {
                if (i >= ln) {
                    callback(config);
                    return;
                }

                key = keys[i];
                value = config[key];

                Ext.factoryConfig(value, fn);
            }

            factory();
            return;
        }

        callback(config);
    },

    /**
     * @private
     * @param config
     * @param classReference
     * @param instance
     */
    factory: function(config, classReference, instance, aliasNamespace) {
        var manager = Ext.ClassManager,
            newInstance;

        // If config is falsy or a valid instance, destroy the current instance
        // (if it exists) and replace with the new one
        if (!config || config.isInstance) {
            if (instance && instance !== config) {
                instance.destroy();
            }

            return config;
        }

        if (aliasNamespace) {
             // If config is a string value, treat is as an alias
            if (typeof config == 'string') {
                return manager.instantiateByAlias(aliasNamespace + '.' + config);
            }
            // Same if 'type' is given in config
            else if ('type' in config) {
                return manager.instantiateByAlias(aliasNamespace + '.' + config.type, config);
            }
        }
        else if (typeof config == 'string') {
            return Ext.getCmp(config);
        }

        if (config === true) {
            if (instance) {
                return instance;
            }
            else {
                return manager.instantiate(classReference);
            }
        }

        //<debug error>
        if (!Ext.isObject(config)) {
            Ext.Logger.error("Invalid config, must be a valid config object");
        }
        //</debug>

        if ('xtype' in config) {
            newInstance = manager.instantiateByAlias('widget.' + config.xtype, config);
        }

        if ('xclass' in config) {
            newInstance = manager.instantiate(config.xclass, config);
        }

        if (newInstance) {
            if (instance) {
                instance.destroy();
            }

            return newInstance;
        }

        if (instance) {
            return instance.setConfig(config);
        }

        return manager.instantiate(classReference, config);
    },

    /**
     * @private
     */
    deprecateClassMember: function(cls, oldName, newName, message) {
        return this.deprecateProperty(cls.prototype, oldName, newName, message);
    },

   /**
     * @private
     */
    deprecateClassMembers: function(cls, members) {
       var prototype = cls.prototype,
           oldName, newName;

       for (oldName in members) {
           if (members.hasOwnProperty(oldName)) {
               newName = members[oldName];

               this.deprecateProperty(prototype, oldName, newName);
           }
       }
    },

    /**
     * @private
     */
    deprecateProperty: function(object, oldName, newName, message) {
        if (!message) {
            message = "'" + oldName + "' is deprecated, please use '" + newName + "' instead";
        }

        Ext.Object.defineProperty(object, oldName, {
            get: function() {
                //<debug warn>
                Ext.Logger.deprecate(message, 1);
                //</debug>
                return this[newName];
            },
            set: function(value) {
                //<debug warn>
                Ext.Logger.deprecate(message, 1);
                //</debug>
                this[newName] = value;
            }
        });
    },

   /**
    * @private
    */
    deprecatePropertyValue: function(object, name, value, message) {
        Ext.Object.defineProperty(object, name, {
            get: function() {
                //<debug warn>
                Ext.Logger.deprecate(message, 1);
                //</debug>
                return value;
            }
        });
    },

    /**
     * @private
     */
    deprecateMethod: function(object, name, method, message) {
        object[name] = function() {
            //<debug warn>
            Ext.Logger.deprecate(message, 2);
            //</debug>
            return method.apply(this, arguments);
        };
    },

    /**
     * @private
     */
    deprecateClassMethod: function(cls, name, method, message) {
        var isLateBinding = typeof method == 'string',
            member;

        if (!message) {
            if (isLateBinding) {
                message = "'" + name + "()' is deprecated, please use '" + method + "()' instead";
            }
            else {
                message = "'" + name + "()' is deprecated.";
            }
        }

        if (isLateBinding) {
            member = function() {
                //<debug warn>
                Ext.Logger.deprecate(message, this);
                //</debug>

                return this[method].apply(this, arguments);
            };
        }
        else {
            member = function() {
                //<debug warn>
                Ext.Logger.deprecate(message, this);
                //</debug>

                return method.apply(this, arguments);
            };
        }

        cls.addMember(name, member);
    },

    /**
     * @private
     * @param cls
     */
    deprecateClassConfigDirectAccess: function(cls, data) {
        var prototype = cls.prototype,
            config = prototype.config;

        if (config) {
            Ext.Object.each(config, function(key) {
                if (!(key in prototype)) {
                    var capitalizedKey = Ext.String.capitalize(key),
                        getterName = 'get' + capitalizedKey,
                        setterName = 'set' + capitalizedKey;

                    function getter() {
                        //<debug warn>
                        Ext.Logger.deprecate("Access to config '" + key + "' directly is deprecated, please use " + getterName + "() instead", 1);
                        //</debug>

                        var fn = this[getterName];

                        //<debug error>
                        if (fn === getter.caller) {
                            throw new Error("Infinite recursion detected: accessing '" + key + "' config inside of " + getterName + "()");
                        }
                        //</debug>

                        return fn.apply(this, arguments);
                    }

                    function setter() {
                        //<debug warn>
                        Ext.Logger.deprecate("Setting config '" + key + "' value directly is deprecated, please use " + setterName + "() instead", 1);
                        //</debug>

                        var fn = this[setterName];

                        //<debug error>
                        if (fn === setter.caller) {
                            throw new Error("Infinite recursion detected: setting '" + key + "' config inside of " + setterName + "()");
                        }
                        //</debug>

                        return fn.apply(this, arguments);
                    }

                    if ('defineProperty' in Object) {
                        Object.defineProperty(object, oldName, {
                            get: getter,
                            set: setter
                        });
                    }
                    else {
                        object.__defineGetter__(oldName, getter);
                        object.__defineSetter__(oldName, setter);
                    }
                    Object.defineProperty(prototype, key, {
                        get: function getter() {
                            //<debug warn>
                            Ext.Logger.deprecate("Access to config '" + key + "' directly is deprecated, please use " + getterName + "() instead", 1);
                            //</debug>

                            var fn = this[getterName];

                            //<debug error>
                            if (fn === getter.caller) {
                                throw new Error("Infinite recursion detected: accessing '" + key + "' config inside of " + getterName + "()");
                            }
                            //</debug>

                            return fn.apply(this, arguments);
                        },

                        set: function setter() {
                            //<debug warn>
                            Ext.Logger.deprecate("Setting config '" + key + "' value directly is deprecated, please use " + setterName + "() instead", 1);
                            //</debug>

                            var fn = this[setterName];

                            //<debug error>
                            if (fn === setter.caller) {
                                throw new Error("Infinite recursion detected: setting '" + key + "' config inside of " + setterName + "()");
                            }
                            //</debug>

                            return fn.apply(this, arguments);
                        }
                    });

                }

                //<debug error>
                if (data && key in data && key in config) {
                    throw new Error("["+Ext.getClassName(cls)+"] Defining class property: '" + key + "' with an already existing config item with the same name. Move it inside the 'config' object instead.");
                }
                //</debug>
            });
        }
    },

    /**
     * True when the document is fully initialized and ready for action
     * @type Boolean
     */
    isReady : false,

    /**
     * @private
     */
    readyListeners: [],

    /**
     * @private
     */
    triggerReady: function() {
        var listeners = Ext.readyListeners,
            i, ln, listener;

        if (!Ext.isReady) {
            Ext.isReady = true;

            // We need to defer calling these methods until the browser is done executing
            // it's ready code. Other we can end up firing too early.
            // TODO Unless we can show that it won't work properly without this timer, this needs
            // to be taken out completely
//            Ext.Function.defer(function() {
            for (i = 0, ln = listeners.length; i < ln; i++) {
                listener = listeners[i];
                listener.fn.call(listener.scope);
            }
            delete Ext.readyListeners;
//            }, 1);
        }
    },

    /**
     * @private
     */
    onDocumentReady: function(fn, scope) {
        if (Ext.isReady) {
            fn.call(scope);
        }
        else {
            var triggerFn = Ext.triggerReady;

            Ext.readyListeners.push({
                fn: fn,
                scope: scope
            });

            if (Ext.browser.is.PhoneGap) {
                if (!Ext.readyListenerAttached) {
                    Ext.readyListenerAttached = true;
                    document.addEventListener('deviceready', triggerFn, false);
                }
            }
            else {
                if (document.readyState.match(/interactive|complete|loaded/) !== null) {
                    triggerFn();
                }
                else if (!Ext.readyListenerAttached) {
                    Ext.readyListenerAttached = true;
                    window.addEventListener('DOMContentLoaded', triggerFn, false);
                }
            }
        }
    },

    /**
     * @param {Function} callback The callback to execute
     * @param {Object} scope (optional) The scope to execute in
     * @param {Array} args (optional) The arguments to pass to the function
     * @param {Number} delay (optional) Pass a number to delay the call by a number of milliseconds.
     */
    callback: function(callback, scope, args, delay) {
        if (Ext.isFunction(callback)) {
            args = args || [];
            scope = scope || window;
            if (delay) {
                Ext.defer(callback, delay, scope, args);
            } else {
                callback.apply(scope, args);
            }
        }
    }
});

//<deprecated product=touch since=2.0>
/**
 * @member Ext.Function
 * @method createDelegate
 * @deprecated 2.0.0
 * createDelegate is deprecated, please use {@link Ext.Function#bind bind} instead
 */
Ext.deprecateMethod(Ext.Function, 'createDelegate', Ext.Function.bind, "Ext.createDelegate() is deprecated, please use Ext.Function.bind() instead");

/**
 * @member Ext
 * @method createInterceptor
 * @deprecated 2.0.0
 * createInterceptor is deprecated, please use {@link Ext.Function#createInterceptor createInterceptor} instead
 */
Ext.deprecateMethod(Ext, 'createInterceptor', Ext.Function.createInterceptor, "Ext.createInterceptor() is deprecated, " +
    "please use Ext.Function.createInterceptor() instead");
//</deprecated>

/**
 * Provides useful information about the current browser. Should not be manually instantiated unless for unit-testing;
 * access the global instance stored in Ext.browser instead. Example:
 *
 * <pre><code>
 * if (Ext.browser.is.IE) {
 *      // IE specific code here
 * }
 *
 * if (Ext.browser.is.WebKit) {
 *      // WebKit specific code here
 * }
 *
 * console.log("Version " + Ext.browser.version);
 * </code></pre>
 *
 * For a full list of supported values, refer to: {@link Ext.env.Browser#is}
 */
Ext.define('Ext.env.Browser', {
    requires: ['Ext.Version'],

    statics: {
        browserNames: {
            ie: 'IE',
            firefox: 'Firefox',
            safari: 'Safari',
            chrome: 'Chrome',
            opera: 'Opera',
            dolfin: 'Dolfin',
            webosbrowser: 'webOSBrowser',
            other: 'Other'
        },
        engineNames: {
            webkit: 'WebKit',
            gecko: 'Gecko',
            presto: 'Presto',
            trident: 'Trident',
            other: 'Other'
        },
        enginePrefixes: {
            webkit: 'AppleWebKit/',
            gecko: 'Gecko/',
            presto: 'Presto/',
            trident: 'Trident/'
        },
        browserPrefixes: {
            ie: 'MSIE ',
            firefox: 'Firefox/',
            chrome: 'Chrome/',
            safari: 'Version/',
            opera: 'Opera/',
            dolfin: 'Dolfin/',
            webosbrowser: 'wOSBrowser/'
        }
    },

    styleDashPrefixes: {
        WebKit: '-webkit-',
        Gecko: '-moz-',
        Trident: '-ms-',
        Presto: '-o-',
        Other: ''
    },

    stylePrefixes: {
        WebKit: 'Webkit',
        Gecko: 'Moz',
        Trident: 'ms',
        Presto: 'O',
        Other: ''
    },

    propertyPrefixes: {
        WebKit: 'webkit',
        Gecko: 'moz',
        Trident: 'ms',
        Presto: 'o',
        Other: ''
    },

    // scope: Ext.env.Browser.prototype

    /**
     * A "hybrid" property, can be either accessed as a method call, i.e:
     * <pre><code>
     * if (Ext.browser.is('IE')) { ... }
     * </code></pre>
     *
     * or as an object with boolean properties, i.e:
     * <pre><code>
     * if (Ext.browser.is.IE) { ... }
     * </code></pre>
     *
     * Versions can be conveniently checked as well. For example:
     * <pre><code>
     * if (Ext.browser.is.IE6) { ... } // Equivalent to (Ext.browser.is.IE && Ext.browser.version.equals(6))
     * </code></pre>
     *
     * Note that only {@link Ext.Version#getMajor major component}  and {@link Ext.Version#getShortVersion simplified}
     * value of the version are available via direct property checking.
     *
     * Supported values are: IE, Firefox, Safari, Chrome, Opera, WebKit, Gecko, Presto, Trident and Other
     *
     * @param {String} value The OS name to check
     * @return {Boolean}
     */
    is: Ext.emptyFn,

    /**
     * Read-only - the full name of the current browser
     * Possible values are: IE, Firefox, Safari, Chrome, Opera and Other
     * @type String
     */
    name: null,

    /**
     * Read-only, refer to {@link Ext.Version}
     * @type Ext.Version
     */
    version: null,

    /**
     * Read-only - the full name of the current browser's engine
     * Possible values are: WebKit, Gecko, Presto, Trident and Other
     * @type String
     */
    engineName: null,

    /**
     * Read-only, refer to {@link Ext.Version}
     * @type Ext.Version
     */
    engineVersion: null,

    setFlag: function(name, value) {
        if (typeof value == 'undefined') {
            value = true;
        }

        this.is[name] = value;
        this.is[name.toLowerCase()] = value;

        return this;
    },

    constructor: function(userAgent) {
        this.userAgent = userAgent;

        is = this.is = function(name) {
            return is[name] === true;
        };

        var statics = this.statics(),
            browserMatch = userAgent.match(new RegExp('((?:' + Ext.Object.getValues(statics.browserPrefixes).join(')|(?:') + '))([\\w\\._]+)')),
            engineMatch = userAgent.match(new RegExp('((?:' + Ext.Object.getValues(statics.enginePrefixes).join(')|(?:') + '))([\\w\\._]+)')),
            browserNames = statics.browserNames,
            browserName = browserNames.other,
            engineNames = statics.engineNames,
            engineName = engineNames.other,
            browserVersion = '',
            engineVersion = '',
            isWebView = false,
            is, i, name;

        if (browserMatch) {
            browserName = browserNames[Ext.Object.getKey(statics.browserPrefixes, browserMatch[1])];

            browserVersion = new Ext.Version(browserMatch[2]);
        }

        if (engineMatch) {
            engineName = engineNames[Ext.Object.getKey(statics.enginePrefixes, engineMatch[1])];
            engineVersion = new Ext.Version(engineMatch[2]);
        }

        Ext.apply(this, {
            engineName: engineName,
            engineVersion: engineVersion,
            name: browserName,
            version: browserVersion
        });

        this.setFlag(browserName);

        if (browserVersion) {
            this.setFlag(browserName + (browserVersion.getMajor() || ''));
            this.setFlag(browserName + browserVersion.getShortVersion());
        }

        for (i in browserNames) {
            if (browserNames.hasOwnProperty(i)) {
                name = browserNames[i];

                this.setFlag(name, browserName === name);
            }
        }

        this.setFlag(name);

        if (engineVersion) {
            this.setFlag(engineName + (engineVersion.getMajor() || ''));
            this.setFlag(engineName + engineVersion.getShortVersion());
        }

        for (i in engineNames) {
            if (engineNames.hasOwnProperty(i)) {
                name = engineNames[i];

                this.setFlag(name, engineName === name);
            }
        }

        this.setFlag('Standalone', !!navigator.standalone);

        if (typeof window.PhoneGap != 'undefined') {
            isWebView = true;
            this.setFlag('PhoneGap');
        }
        else if (!!window.isNK) {
            isWebView = true;
            this.setFlag('Sencha');
        }

        // Flag to check if it we are in the WebView
        this.setFlag('WebView', isWebView);

        this.isStrict = document.compatMode == "CSS1Compat";

        this.isSecure = /^https/i.test(window.location.protocol);

        return this;
    },

    getStyleDashPrefix: function() {
        return this.styleDashPrefixes[this.engineName];
    },

    getStylePrefix: function() {
        return this.stylePrefixes[this.engineName];
    },

    getVendorProperyName: function(name) {
        var prefix = this.propertyPrefixes[this.engineName];

        if (prefix.length > 0) {
            return prefix + Ext.String.capitalize(name);
        }

        return name;
    }

}, function() {
    var browserEnv = Ext.browser = new this(Ext.global.navigator.userAgent);

    //<deprecated product=touch since=2.0>
    var flags = browserEnv.is,
        name;

    if (!Ext.is) {
        Ext.is = {};
    }

    for (name in flags) {
        if (flags.hasOwnProperty(name)) {
            Ext.deprecatePropertyValue(Ext.is, name, flags[name], "Ext.is." + name + " is deprecated, please use Ext.browser.is." + name + " instead");
        }
    }

    Ext.deprecatePropertyValue(Ext, 'isSecure', browserEnv.isSecure, "Ext.isSecure is deprecated, please use Ext.browser.isSecure instead");
    Ext.deprecatePropertyValue(Ext, 'isStrict', browserEnv.isStrict, "Ext.isStrict is deprecated, please use Ext.browser.isStrict instead");
    Ext.deprecatePropertyValue(Ext, 'userAgent', browserEnv.userAgent, "Ext.userAgent is deprecated, please use Ext.browser.userAgent instead");
    //</deprecated>
});

/**
 * Provide useful information about the current operating system environment. Access the global instance stored in Ext.os. Example:
 * <pre><code>
 * if (Ext.os.is.Windows) {
 *      // Windows specific code here
 * }
 *
 * if (Ext.os.is.iOS) {
 *      // iPad, iPod, iPhone, etc.
 * }
 *
 * console.log("Version " + Ext.os.version);
 * </code></pre>
 *
 * For a full list of supported values, refer to: {@link Ext.env.OS#is}
 */
Ext.define('Ext.env.OS', {

    requires: ['Ext.Version'],

    statics: {
        names: {
            ios: 'iOS',
            android: 'Android',
            webos: 'webOS',
            blackberry: 'BlackBerry',
            rimTablet: 'RIMTablet',
            mac: 'MacOS',
            win: 'Windows',
            linux: 'Linux',
            bada: 'Bada',
            other: 'Other'
        },
        prefixes: {
            ios: 'i(?:Pad|Phone|Pod)(?:.*)CPU(?: iPhone)? OS ',
            android: 'Android ',
            blackberry: 'BlackBerry(?:.*)Version\/',
            rimTablet: 'RIM Tablet OS ',
            webos: '(?:webOS|hpwOS)\/',
            bada: 'Bada\/'
        }
    },

    /**
     * A "hybrid" property, can be either accessed as a method call, i.e:
     * <pre><code>
     * if (Ext.os.is('Android')) { ... }
     * </code></pre>
     *
     * or as an object with boolean properties, i.e:
     * <pre><code>
     * if (Ext.os.is.Android) { ... }
     * </code></pre>
     *
     * Versions can be conveniently checked as well. For example:
     * <pre><code>
     * if (Ext.os.is.Android2) { ... } // Equivalent to (Ext.os.is.Android && Ext.os.version.equals(2))
     *
     * if (Ext.os.is.iOS32) { ... } // Equivalent to (Ext.os.is.iOS && Ext.os.version.equals(3.2))
     * </code></pre>
     *
     * Note that only {@link Ext.Version#getMajor major component}  and {@link Ext.Version#getShortVersion simplified}
     * value of the version are available via direct property checking.
     *
     * Supported values are: iOS, iPad, iPhone, iPod, Android, WebOS, BlackBerry, Bada, MacOSX, Windows, Linux and Other
     *
     * @param {String} value The OS name to check
     * @return {Boolean}
     */
    is: Ext.emptyFn,

    /**
     * Read-only - the full name of the current operating system
     * Possible values are: iOS, Android, WebOS, BlackBerry, MacOSX, Windows, Linux and Other
     * @type String
     */
    name: null,

    /**
     * Read-only, refer to {@link Ext.Version}
     * @type Ext.Version
     */
    version: null,

    setFlag: function(name, value) {
        if (typeof value == 'undefined') {
            value = true;
        }

        this.is[name] = value;
        this.is[name.toLowerCase()] = value;

        return this;
    },

    constructor: function(userAgent, platform) {
        var statics = this.statics(),
            names = statics.names,
            prefixes = statics.prefixes,
            name,
            version = '',
            i, prefix, match, item, is;

        is = this.is = function(name) {
            return this.is[name] === true;
        };

        for (i in prefixes) {
            if (prefixes.hasOwnProperty(i)) {
                prefix = prefixes[i];

                match = userAgent.match(new RegExp('(?:'+prefix+')([^\\s;]+)'));

                if (match) {
                    name = names[i];
                    version = new Ext.Version(match[match.length - 1]);
                    break;
                }
            }
        }

        if (!name) {
            name = names[(userAgent.toLowerCase().match(/mac|win|linux/) || ['other'])[0]];
            version = new Ext.Version('');
        }

        Ext.apply(this, {
            name: name,
            version: version
        });

        if (platform) {
            this.setFlag(platform);
        }

        this.setFlag(name);

        if (version) {
            this.setFlag(name + (version.getMajor() || ''));
            this.setFlag(name + version.getShortVersion());
        }

        for (i in names) {
            if (names.hasOwnProperty(i)) {
                item = names[i];

                if (!is.hasOwnProperty(name)) {
                    this.setFlag(item, (name === item));
                }
            }
        }

        return this;
    }

}, function() {
    /**
     * @class Ext.is
     * @deprecated
     * Used to detect if the current browser supports a certain feature, and the type of the current browser.
     *
     * Please refer to the {@link Ext.env.Browser}, {@link Ext.env.OS} and {@link Ext.feature.has} classes instead.
     */
    var navigator = Ext.global.navigator,
        osEnv, osName, osVersion, deviceType;

    //<deprecated product=touch since=2.0>
    this.override('constructor', function() {
        this.callOverridden(arguments);

        var is = this.is;

        if (is.MacOS) {
            Ext.deprecatePropertyValue(is, 'Mac', true, "Ext.is.Mac is deprecated, please use Ext.os.is.MacOS instead");
            Ext.deprecatePropertyValue(is, 'mac', true, "Ext.is.Mac is deprecated, please use Ext.os.is.MacOS instead");
        }

        if (is.BlackBerry) {
            Ext.deprecatePropertyValue(is, 'Blackberry', true, "Ext.is.Blackberry is deprecated, please use Ext.os.is.BlackBerry instead");
        }

        return this;
    });
    //</deprecated>

    Ext.os = osEnv = new this(navigator.userAgent, navigator.platform);

    osName = osEnv.name;
    osVersion = osEnv.version;

    //<deprecated product=touch since=2.0>
    var flags = Ext.os.is,
        search = window.location.search.match(/deviceType=(Tablet|Phone)/),
        name;

    if (!Ext.is) {
        Ext.is = {};
    }

    for (name in flags) {
        if (flags.hasOwnProperty(name)) {
            Ext.deprecatePropertyValue(Ext.is, name, flags[name], "Ext.is." + name + " is deprecated, please use Ext.os.is." + name + " instead");
        }
    }
    //</deprecated>

    // Override deviceType by adding a get variable of deviceType. NEEDED FOR DOCS APP.
    // E.g: example/kitchen-sink.html?deviceType=Phone
    if (search && search[1]) {
        deviceType = search[1];
    } else {
        //TODO Clean me up, this is not nice
        if (/Windows|Linux|MacOS/.test(osName)) {
            deviceType = 'Desktop';
        }
        else if (osEnv.is.iPad || osEnv.is.Android3) {
            deviceType = 'Tablet';
        }
        else {
            deviceType = 'Phone';
        }
    }

    osEnv.setFlag(deviceType, true);
    osEnv.deviceType = deviceType;

});

/**
 * A class to detect if the current browser supports various features.
 *
 * Please refer to the documentation of {@link Ext.feature.has} on how to use it.
 *
 *     if (Ext.feature.has.Canvas) {
 *         // do some cool things with canvas here
 *     }
 */
Ext.define('Ext.env.Feature', {

    requires: ['Ext.env.Browser', 'Ext.env.OS'],

    constructor: function() {
        this.testElements = {};

        this.has = function(name) {
            return !!this.has[name];
        };

        return this;
    },

    getTestElement: function(tag, createNew) {
        if (tag === undefined) {
            tag = 'div';
        }
        else if (typeof tag !== 'string') {
            return tag;
        }

        if (createNew) {
            return document.createElement(tag);
        }

        if (!this.testElements[tag]) {
            this.testElements[tag] = document.createElement(tag);
        }

        return this.testElements[tag];
    },

    isStyleSupported: function(name, tag) {
        var elementStyle = this.getTestElement(tag).style,
            cName = Ext.String.capitalize(name);

        if (typeof elementStyle[name] !== 'undefined'
            || typeof elementStyle[Ext.browser.getStylePrefix(name) + cName] !== 'undefined') {
            return true;
        }

        return false;
    },

    isEventSupported: function(name, tag) {
        if (tag === undefined) {
            tag = window;
        }

        var element = this.getTestElement(tag),
            eventName = 'on' + name.toLowerCase(),
            isSupported = false;

        isSupported = (eventName in element);

        if (!isSupported) {
            if (element.setAttribute && element.removeAttribute) {
                element.setAttribute(eventName, '');
                isSupported = typeof element[eventName] === 'function';

                if (typeof element[eventName] !== 'undefined') {
                    element[eventName] = undefined;
                }

                element.removeAttribute(eventName);
            }
        }

        return isSupported;
    },

    getSupportedPropertyName: function(object, name) {
        var vendorName = Ext.browser.getVendorProperyName(name);

        if (vendorName in object) {
            return vendorName;
        }
        else if (name in object) {
            return name;
        }

        return null;
    },

    registerTest: Ext.Function.flexSetter(function(name, fn) {
        this.has[name] = fn.call(this);

        return this;
    })

}, function() {

    Ext.feature = new this;

    var has = Ext.feature.has;

    /**
     * @class Ext.feature.has
     * A simple class to verify if a browser feature exists or not on the current device.
     *
     *     if (Ext.feature.has.Canvas) {
     *         // do some cool things with canvas here
     *     }
     *
     * See the list of properties below too see which features are available for detection.
     */

    Ext.feature.registerTest({
        /**
         * @member Ext.feature.has
         * @property {Boolean} Canvas
         * True if the current device supports Canvas.
         */
        Canvas: function() {
            var element = this.getTestElement('canvas');
            return !!(element && element.getContext && element.getContext('2d'));
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} Svg
         * True if the current device supports SVG.
         */
        Svg: function() {
            var doc = document;

            return !!(doc.createElementNS && !!doc.createElementNS("http:/" + "/www.w3.org/2000/svg", "svg").createSVGRect);
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} Vml
         * True if the current device supports VML.
         */
        Vml: function() {
            var element = this.getTestElement(),
                ret = false;

            element.innerHTML = "<!--[if vml]><br><![endif]-->";
            ret = (element.childNodes.length === 1);
            element.innerHTML = "";

            return ret;
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} Touch
         * True if the current device supports touch events (`touchstart`).
         */
        Touch: function() {
            return this.isEventSupported('touchstart') && !(Ext.os && Ext.os.name.match(/Windows|MacOSX|Linux/));
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} Orientation
         * True if the current device supports different orientations.
         */
        Orientation: function() {
            return ('orientation' in window) && this.isEventSupported('orientationchange');
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} OrientationChange
         * True if the current device supports the `orientationchange` event.
         */
        OrientationChange: function() {
            return this.isEventSupported('orientationchange');
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} DeviceMotion
         * True if the current device supports the `devicemotion` event.
         */
        DeviceMotion: function() {
            return this.isEventSupported('devicemotion');
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} Geolocation
         * True if the current device supports Geolocation.
         */
        Geolocation: function() {
            return 'geolocation' in window.navigator;
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} SqlDatabase
         * True if the current device supports SQL Databases.
         */
        SqlDatabase: function() {
            return 'openDatabase' in window;
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} WebSockets
         */
        WebSockets: function() {
            return 'WebSocket' in window;
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} History
         */
        History: function() {
            return ('history' in window && 'pushState' in window.history);
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} CssTransforms
         * True if the current device supports CSS Transform animations.
         */
        CssTransforms: function() {
            return this.isStyleSupported('transform');
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} Css3dTransforms
         * True if the current device supports CSS 3D Transform animations.
         */
        Css3dTransforms: function() {
            //TODO Implement a better test for the buggy 3D Transform implementation in Android 2.x
            return this.has('CssTransforms') && this.isStyleSupported('perspective') && !Ext.os.is.Android2;
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} CssAnimations
         * True if the current device supports CSS Animations.
         */
        CssAnimations: function() {
            return this.isStyleSupported('animationName');
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} CssTransitions
         * True if the current device supports CSS Transitions.
         */
        CssTransitions: function() {
            return this.isStyleSupported('transitionProperty');
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} Audio
         * True if the current device supports the `<audio>` tag.
         */
        Audio: function() {
            return !!this.getTestElement('audio').canPlayType;
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} Video
         * True if the current device supports the `<video>` tag.
         */
        Video: function() {
            return !!this.getTestElement('video').canPlayType;
        }
    });

    //<deprecated product=touch since=2.0>
    /**
     * @class Ext.supports
     * @deprecated
     * Please use the {@link Ext.env.Browser}, {@link Ext.env.OS} and {@link Ext.feature.has} classes.
     */

    /**
     * @member Ext.supports
     * @property Transitions
     * @deprecated 2.0.0 Please use {@link Ext.feature.has#CssTransitions} instead
     */
    Ext.deprecatePropertyValue(has, 'Transitions', has.CssTransitions,
                          "Ext.supports.Transitions is deprecated, please use Ext.feature.has.CssTransitions instead");

    /**
     * @member Ext.supports
     * @property SVG
     * @deprecated 2.0.0 Please use {@link Ext.feature.has#Svg} instead
     */
    Ext.deprecatePropertyValue(has, 'SVG', has.Svg,
                          "Ext.supports.SVG is deprecated, please use Ext.feature.has.Svg instead");

    /**
     * @member Ext.supports
     * @property VML
     * @deprecated 2.0.0 Please use {@link Ext.feature.has#Vml} instead
     */
    Ext.deprecatePropertyValue(has, 'VML', has.Vml,
                          "Ext.supports.VML is deprecated, please use Ext.feature.has.Vml instead");

    /**
     * @member Ext.supports
     * @property AudioTag
     * @deprecated 2.0.0 Please use {@link Ext.feature.has#Audio} instead
     */
    Ext.deprecatePropertyValue(has, 'AudioTag', has.Audio,
                          "Ext.supports.AudioTag is deprecated, please use Ext.feature.has.Audio instead");

    /**
     * @member Ext.supports
     * @property GeoLocation
     * @deprecated 2.0.0 Please use {@link Ext.feature.has#Geolocation} instead
     */
    Ext.deprecatePropertyValue(has, 'GeoLocation', has.Geolocation,
                          "Ext.supports.GeoLocation is deprecated, please use Ext.feature.has.Geolocation instead");

    var name;

    if (!Ext.supports) {
        Ext.supports = {};
    }

    for (name in has) {
        if (has.hasOwnProperty(name)) {
            Ext.deprecatePropertyValue(Ext.supports, name, has[name], "Ext.supports." + name + " is deprecated, please use Ext.feature.has." + name + " instead");
        }
    }
    //</deprecated>
});

/**
 * @class Ext.dom.AbstractQuery
 * @private
 */
Ext.define('Ext.dom.AbstractQuery', {
    /**
     * Selects a group of elements.
     * @param {String} selector The selector/xpath query (can be a comma separated list of selectors)
     * @param {HTMLElement/String} [root] The start of the query (defaults to document).
     * @return {HTMLElement[]} An Array of DOM elements which match the selector. If there are
     * no matches, and empty Array is returned.
     */
    select: function(q, root) {
        var results = [],
            nodes,
            i,
            j,
            qlen,
            nlen;

        root = root || document;

        if (typeof root == 'string') {
            root = document.getElementById(root);
        }

        q = q.split(",");

        for (i = 0,qlen = q.length; i < qlen; i++) {
            if (typeof q[i] == 'string') {
                
                //support for node attribute selection
                if (typeof q[i][0] == '@') {
                    nodes = root.getAttributeNode(q[i].substring(1));
                    results.push(nodes);
                } else {
                    nodes = root.querySelectorAll(q[i]);

                    for (j = 0,nlen = nodes.length; j < nlen; j++) {
                        results.push(nodes[j]);
                    }
                }
            }
        }

        return results;
    },    

    /**
     * Selects a single element.
     * @param {String} selector The selector/xpath query
     * @param {HTMLElement/String} [root] The start of the query (defaults to document).
     * @return {HTMLElement} The DOM element which matched the selector.
     */
    selectNode: function(q, root) {
        return this.select(q, root)[0];
    },

    /**
     * Returns true if the passed element(s) match the passed simple selector (e.g. div.some-class or span:first-child)
     * @param {String/HTMLElement/Array} el An element id, element or array of elements
     * @param {String} selector The simple selector to test
     * @return {Boolean}
     */
    is: function(el, q) {
        if (typeof el == "string") {
            el = document.getElementById(el);
        }
        return this.select(q).indexOf(el) !== -1;
    }

});

/**
 * @class Ext.dom.AbstractHelper
 * Abstract base class for {@link Ext.dom.Helper}.
 * @private
 */
Ext.define('Ext.dom.AbstractHelper', {
    emptyTags : /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,
    confRe : /tag|children|cn|html$/i,
    endRe : /end/i,

    attribXlat: { cls : 'class', htmlFor : 'for' },

    generateMarkup: function(spec, buffer) {
        var me = this,
            attr,
            val,
            key,
            cn,
            tag,
            i;

        if (typeof spec == "string") {
            buffer.push(spec);
        } else if (Ext.isArray(spec)) {
            for (i=0; i < spec.length; i++) {
                if (spec[i]) {
                    me.generateMarkup(spec[i], buffer);
                }
            }
        } else {
            tag = spec.tag || 'div';
            buffer.push('<', tag);

            for (attr in spec) {
                if (spec.hasOwnProperty(attr)) {
                    val = spec[attr];
                    if (!me.confRe.test(attr)) {
                        if (typeof val == "object") {
                            buffer.push(' ', attr, '="');
                            for (key in val) {
                                if (val.hasOwnProperty(key)) {
                                    buffer.push(key, ':', val[key], ';');
                                }
                            }
                            buffer.push('"');
                        } else {
                            buffer.push(' ', me.attribXlat[attr] || attr, '="', val, '"');
                        }
                    }
                }
            }

            // Now either just close the tag or try to add children and close the tag.
            if (me.emptyTags.test(tag)) {
                buffer.push('/>');
            } else {
                buffer.push('>');
                if ((cn = spec.children || spec.cn)) {
                    me.generateMarkup(cn, buffer);
                } else if (spec.html) {
                    buffer.push(spec.html);
                }
                buffer.push('</', tag, '>');
            }
        }

        return buffer;
    },

    /**
     * Returns the markup for the passed Element(s) config.
     * @param {Object} spec The DOM object spec (and children)
     * @return {String}
     */
    markup: function(spec) {
        if (typeof spec == "string") {
            return spec;
        }

        var buf = this.generateMarkup(spec, []);
        return buf.join('');
    },

    /**
     * Applies a style specification to an element.
     * @param {String/HTMLElement} el The element to apply styles to
     * @param {String/Object/Function} styles A style specification string e.g. 'width:100px', or object in the form {width:'100px'}, or
     * a function which returns such a specification.
     */
    applyStyles: function(el, styles) {
        if (styles) {
            var i = 0,
                len,
                style;

            el = Ext.fly(el);
            if (typeof styles == 'function') {
                styles = styles.call();
            }
            if (typeof styles == 'string'){
                styles = Ext.util.Format.trim(styles).split(/\s*(?::|;)\s*/);
                for(len = styles.length; i < len;){
                    el.setStyle(styles[i++], styles[i++]);
                }
            } else if (Ext.isObject(styles)) {
                el.setStyle(styles);
            }
        }
    },

    /**
     * Inserts an HTML fragment into the DOM.
     * @param {String} where Where to insert the html in relation to el - beforeBegin, afterBegin, beforeEnd, afterEnd.
     *
     * For example take the following HTML: `<div>Contents</div>`
     *
     * Using different `where` values inserts element to the following places:
     *
     * - beforeBegin: `<HERE><div>Contents</div>`
     * - afterBegin: `<div><HERE>Contents</div>`
     * - beforeEnd: `<div>Contents<HERE></div>`
     * - afterEnd: `<div>Contents</div><HERE>`
     *
     * @param {HTMLElement/TextNode} el The context element
     * @param {String} html The HTML fragment
     * @return {HTMLElement} The new node
     */
    insertHtml: function(where, el, html) {
        var hash = {},
            hashVal,
            setStart,
            range,
            frag,
            rangeEl,
            rs;

        where = where.toLowerCase();

        // add these here because they are used in both branches of the condition.
        hash['beforebegin'] = ['BeforeBegin', 'previousSibling'];
        hash['afterend'] = ['AfterEnd', 'nextSibling'];

        range = el.ownerDocument.createRange();
        setStart = 'setStart' + (this.endRe.test(where) ? 'After' : 'Before');
        if (hash[where]) {
            range[setStart](el);
            frag = range.createContextualFragment(html);
            el.parentNode.insertBefore(frag, where == 'beforebegin' ? el : el.nextSibling);
            return el[(where == 'beforebegin' ? 'previous' : 'next') + 'Sibling'];
        }
        else {
            rangeEl = (where == 'afterbegin' ? 'first' : 'last') + 'Child';
            if (el.firstChild) {
                range[setStart](el[rangeEl]);
                frag = range.createContextualFragment(html);
                if (where == 'afterbegin') {
                    el.insertBefore(frag, el.firstChild);
                }
                else {
                    el.appendChild(frag);
                }
            }
            else {
                el.innerHTML = html;
            }
            return el[rangeEl];
        }

        throw 'Illegal insertion point -> "' + where + '"';
    },

    /**
     * Creates new DOM element(s) and inserts them before el.
     * @param {String/HTMLElement/Ext.Element} el The context element
     * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
     * @param {Boolean} [returnElement] true to return a Ext.Element
     * @return {HTMLElement/Ext.Element} The new node
     */
    insertBefore: function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'beforebegin');
    },

    /**
     * Creates new DOM element(s) and inserts them after el.
     * @param {String/HTMLElement/Ext.Element} el The context element
     * @param {Object} o The DOM object spec (and children)
     * @param {Boolean} [returnElement] true to return a Ext.Element
     * @return {HTMLElement/Ext.Element} The new node
     */
    insertAfter: function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'afterend', 'nextSibling');
    },

    /**
     * Creates new DOM element(s) and inserts them as the first child of el.
     * @param {String/HTMLElement/Ext.Element} el The context element
     * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
     * @param {Boolean} [returnElement] true to return a Ext.Element
     * @return {HTMLElement/Ext.Element} The new node
     */
    insertFirst: function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'afterbegin', 'firstChild');
    },

    /**
     * Creates new DOM element(s) and appends them to el.
     * @param {String/HTMLElement/Ext.Element} el The context element
     * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
     * @param {Boolean} [returnElement] true to return a Ext.Element
     * @return {HTMLElement/Ext.Element} The new node
     */
    append: function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'beforeend', '', true);
    },

    /**
     * Creates new DOM element(s) and overwrites the contents of el with them.
     * @param {String/HTMLElement/Ext.Element} el The context element
     * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
     * @param {Boolean} [returnElement] true to return a Ext.Element
     * @return {HTMLElement/Ext.Element} The new node
     */
    overwrite: function(el, o, returnElement) {
        el = Ext.getDom(el);
        el.innerHTML = this.markup(o);
        return returnElement ? Ext.get(el.firstChild) : el.firstChild;
    },

    doInsert: function(el, o, returnElement, pos, sibling, append) {
        var newNode = this.insertHtml(pos, Ext.getDom(el), this.markup(o));
        return returnElement ? Ext.get(newNode, true) : newNode;
    }

});

/**
 * @class Ext.dom.AbstractElement
 * @private
 */
(function() {

var document = window.document;

if (!Ext.cache){
    Ext.cache = {};
}

Ext.define('Ext.dom.AbstractElement', {

    inheritableStatics: {

        /**
         * Retrieves Ext.dom.Element objects. {@link Ext#get} is alias for {@link Ext.dom.Element#get}.
         *
         * **This method does not retrieve {@link Ext.Component Component}s.** This method retrieves Ext.dom.Element
         * objects which encapsulate DOM elements. To retrieve a Component by its ID, use {@link Ext.ComponentManager#get}.
         *
         * Uses simple caching to consistently return the same object. Automatically fixes if an object was recreated with
         * the same id via AJAX or DOM.
         *
         * @param {String/HTMLElement/Ext.Element} el The id of the node, a DOM Node or an existing Element.
         * @return {Ext.dom.Element} The Element object (or null if no matching element was found)
         * @static
         * @inheritable
         */
        get: function(el) {
            var me = this,
                El = Ext.dom.Element,
                extEl,
                dom,
                id;

            if (!el) {
                return null;
            }

            if (typeof el == "string") { // element id
                if (!(dom = document.getElementById(el))) {
                    return null;
                }

                if (Ext.cache[el] && Ext.cache[el].el) {
                    extEl = Ext.cache[el].el;
                    extEl.dom = dom;
                } else {
                    extEl = me.addToCache(new El(dom));
                }
                return extEl;
            } else if (el.tagName) { // dom element
                if (!(id = el.id)) {
                    id = Ext.id(el);
                }
                if (Ext.cache[id] && Ext.cache[id].el) {
                    extEl = Ext.cache[id].el;
                    extEl.dom = el;
                } else {
                    extEl = me.addToCache(new El(el));
                }
                return extEl;
            } else if (el instanceof me) {
                if (el != me.docEl) {
                    // refresh dom element in case no longer valid,
                    // catch case where it hasn't been appended
                    el.dom = document.getElementById(el.id) || el.dom;
                }
                return el;
            } else if (el.isComposite) {
                return el;
            } else if (Ext.isArray(el)) {
                return me.select(el);
            } else if (el == document) {
                // create a bogus element object representing the document object
                if (!me.docEl) {
                    me.docEl = Ext.Object.chain(El.prototype);
                    me.docEl.dom = document;
                    document.documentElement.id = me.docEl.id = Ext.id(document);
                }

                return me.docEl;
            }

            return null;
        },

        addToCache: function(el, id) {
            if (el) {
                id = id || el.id;
                Ext.cache[id] = {
                    el: el,
                    data: {},
                    events: {}
                };
            }
            return el;
        },

        // private method for getting and setting element data
        data: function(el, key, value) {
            el = this.get(el);
            if (!el) {
                return null;
            }
            var c = Ext.cache[el.id].data;
            if (!c) {
                c = Ext.cache[el.id].data = {};
            }
            if (arguments.length == 2) {
                return c[key];
            } else {
                return (c[key] = value);
            }
        },

        addMethods: function() {
            this.override.apply(this, arguments);
        },

        /**
         * @property
         * Visibility mode constant for use with {@link #setVisibilityMode}. Use visibility to hide element
         * @static
         */
        VISIBILITY: 1,

        /**
         * @property
         * Visibility mode constant for use with {@link #setVisibilityMode}. Use display to hide element
         * @static
         */
        DISPLAY: 2,

        /**
         * @property
         * Visibility mode constant for use with {@link #setVisibilityMode}. Use offsets to hide element
         * @static
         */
        OFFSETS: 3
    },

    constructor: function(element, forceNew) {
        var dom = typeof element == 'string'
                ? document.getElementById(element)
                : element,
            id;

        if (!dom) {
            return null;
        }

        id = dom.id;
        if (!forceNew && id && Ext.cache[id]) {
            // element object already exists
            return Ext.cache[id].el;
        }

        /**
         * @property {HTMLElement} dom
         * The DOM element
         */
        this.dom = dom;

        /**
         * @property {String} id
         * The DOM element ID
         */
        this.id = id || Ext.id(dom);
    },

    attach: function (dom) {
        this.dom = dom;
        this.id = dom.id;
        return this;
    },

    /**
     * Sets the passed attributes as attributes of this element (a style attribute can be a string, object or function)
     * @param {Object} o The object with the attributes
     * @param {Boolean} [useSet=true] false to override the default setAttribute to use expandos.
     * @return {Ext.dom.Element} this
     */
    set: function(o, useSet) {
         var el = this.dom,
             attr,
             value;

         for (attr in o) {
             if (o.hasOwnProperty(attr)) {
                 value = o[attr];
                 if (attr == 'style') {
                     this.applyStyles(value);
                 }
                 else if (attr == 'cls') {
                     el.className = value;
                 }
                 else if (useSet !== false) {
                     if (value === undefined) {
                         el.removeAttribute(attr);
                     } else {
                        el.setAttribute(attr, value);
                     }
                 }
                 else {
                     el[attr] = value;
                 }
             }
         }
         return this;
     },

    /**
     * @property {String} defaultUnit
     * The default unit to append to CSS values where a unit isn't provided.
     */
    defaultUnit: "px",

    /**
     * Returns true if this element matches the passed simple selector (e.g. div.some-class or span:first-child)
     * @param {String} selector The simple selector to test
     * @return {Boolean} True if this element matches the selector, else false
     */
    is: function(simpleSelector) {
        return Ext.DomQuery.is(this.dom, simpleSelector);
    },

    /**
     * Returns the value of the "value" attribute
     * @param {Boolean} asNumber true to parse the value as a number
     * @return {String/Number}
     */
    getValue: function(asNumber) {
        var val = this.dom.value;
        return asNumber ? parseInt(val, 10) : val;
    },

    /**
     * Removes this element's dom reference. Note that event and cache removal is handled at {@link Ext#removeNode
     * Ext.removeNode}
     */
    remove: function() {
        var me = this,
        dom = me.dom;

        if (dom) {
            delete me.dom;
            Ext.removeNode(dom);
        }
    },

    /**
     * Returns true if this element is an ancestor of the passed element
     * @param {HTMLElement/String} el The element to check
     * @return {Boolean} True if this element is an ancestor of el, else false
     */
    contains: function(el) {
        if (!el) {
            return false;
        }

        var me = this,
            dom = el.dom || el;

        // we need el-contains-itself logic here because isAncestor does not do that:
        return (dom === me.dom) || Ext.dom.AbstractElement.isAncestor(me.dom, dom);
    },

    /**
     * Returns the value of an attribute from the element's underlying DOM node.
     * @param {String} name The attribute name
     * @param {String} [namespace] The namespace in which to look for the attribute
     * @return {String} The attribute value
     */
    getAttribute: function(name, ns) {
        var dom = this.dom;
        return dom.getAttributeNS(ns, name) || dom.getAttribute(ns + ":" + name) || dom.getAttribute(name) || dom[name];
    },

    /**
     * Update the innerHTML of this element
     * @param {String} html The new HTML
     * @return {Ext.dom.Element} this
     */
    update: function(html) {
        if (this.dom) {
            this.dom.innerHTML = html;
        }
        return this;
    },


    /**
    * Set the innerHTML of this element
    * @param {String} html The new HTML
    * @return {Ext.Element} this
     */
    setHTML: function(html) {
        if(this.dom) {
            this.dom.innerHTML = html;
        }
        return this;
    },

    /**
     * Returns the innerHTML of an Element or an empty string if the element's
     * dom no longer exists.
     */
    getHTML: function() {
        return this.dom ? this.dom.innerHTML : '';
    },

    /**
     * Hide this element - Uses display mode to determine whether to use "display" or "visibility". See {@link #setVisible}.
     * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
     * @return {Ext.Element} this
     */
    hide: function() {
        this.setVisible(false);
        return this;
    },

    /**
    * Show this element - Uses display mode to determine whether to use "display" or "visibility". See {@link #setVisible}.
    * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
     * @return {Ext.Element} this
     */
    show: function() {
        this.setVisible(true);
        return this;
    },

    /**
     * Sets the visibility of the element (see details). If the visibilityMode is set to Element.DISPLAY, it will use
     * the display property to hide the element, otherwise it uses visibility. The default is to hide and show using the visibility property.
     * @param {Boolean} visible Whether the element is visible
     * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
     * @return {Ext.Element} this
     */
     setVisible: function(visible, animate) {
        var me = this,
            statics = me.self,
            mode = me.getVisibilityMode();

        switch (mode) {
            case statics.VISIBILITY:
                me.removeCls(['x-hidden-display', 'x-hidden-offsets']);
                me[visible ? 'removeCls' : 'addCls']('x-hidden-visibility');
            break;

            case statics.DISPLAY:
                me.removeCls(['x-hidden-visibility', 'x-hidden-offsets']);
                me[visible ? 'removeCls' : 'addCls']('x-hidden-display');
            break;

            case statics.OFFSETS:
                me.removeCls(['x-hidden-visibility', 'x-hidden-display']);
                me[visible ? 'removeCls' : 'addCls']('x-hidden-offsets');
            break;
        }

        return me;
    },

    getVisibilityMode: function() {
        var statics = this.self,
            dom = this.dom,
            mode = statics.data(dom, 'visibilityMode');

        if (mode === undefined) {
            statics.data(dom, 'visibilityMode', mode = statics.DISPLAY);
        }

        return mode;
    },

    /**
     * Use this to change the visisbiliy mode between {@link #VISIBILITY}, {@link #DISPLAY} or {@link #OFFSETS}.
     */
    setVisibilityMode: function(mode) {
        this.self.data(this.dom, 'visibilityMode', mode);
        return this;
    }
}, function() {
    var AbstractElement = this;

    /**
     * @member Ext
     * @method get
     * @alias Ext.dom.AbstractElement#get
     */
    Ext.get = function() {
        var El = Ext.dom.Element;
        return El.get.apply(El, arguments);
    };

    this.addStatics({
        Fly: new Ext.Class({
            extend: AbstractElement,

            constructor: function(dom) {
                this.dom = dom;
            }
        }),

        _flyweights: {},

        /**
         * Gets the globally shared flyweight Element, with the passed node as the active element. Do not store a reference
         * to this element - the dom node can be overwritten by other code. {@link Ext#fly} is alias for
         * {@link Ext.dom.AbstractElement#fly}.
         *
         * Use this to make one-time references to DOM elements which are not going to be accessed again either by
         * application code, or by Ext's classes. If accessing an element which will be processed regularly, then {@link
         * Ext#get Ext.get} will be more appropriate to take advantage of the caching provided by the Ext.dom.Element
         * class.
         *
         * @param {String/HTMLElement} el The dom node or id
         * @param {String} [named] Allows for creation of named reusable flyweights to prevent conflicts (e.g.
         * internally Ext uses "_global")
         * @return {Ext.dom.Element} The shared Element object (or null if no matching element was found)
         * @static
         */
        fly: function(el, named) {
            var ret = null,
                _flyweights = AbstractElement._flyweights;

            named = named || '_global';

            el = Ext.getDom(el);

            if (el) {
                ret = _flyweights[named] || (_flyweights[named] = new AbstractElement.Fly());
                ret.dom = el;
            }

            return ret;
        }
    });

    /**
     * @member Ext
     * @method fly
     * @alias Ext.dom.AbstractElement#fly
     */
    Ext.fly = function() {
        return AbstractElement.fly.apply(AbstractElement, arguments);
    };

    (function (proto) {
        /**
         * @method destroy
         * @member Ext.dom.AbstractElement
         * @alias Ext.dom.AbstractElement#remove
         */
        proto.destroy = proto.remove;

        /**
         * @method getById
         * @member Ext.dom.AbstractElement
         * @alias Ext.dom.AbstractElement#get
         */
        proto.getById = Ext.get;
    })(this.prototype);
});

})();

/**
 * @class Ext.dom.AbstractElement
 */
Ext.dom.AbstractElement.addInheritableStatics({
    unitRe: /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,
    camelRe: /(-[a-z])/gi,
    cssRe: /([a-z0-9-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi,
    opacityRe: /alpha\(opacity=(.*)\)/i,
    propertyCache: {},
    defaultUnit : "px",
    borders: {l: 'border-left-width', r: 'border-right-width', t: 'border-top-width', b: 'border-bottom-width'},
    paddings: {l: 'padding-left', r: 'padding-right', t: 'padding-top', b: 'padding-bottom'},
    margins: {l: 'margin-left', r: 'margin-right', t: 'margin-top', b: 'margin-bottom'},

    /**
     * Test if size has a unit, otherwise appends the passed unit string, or the default for this Element.
     * @param size {Object} The size to set
     * @param units {String} The units to append to a numeric size value
     * @private
     * @static
     */
    addUnits: function(size, units) {

        // Most common case first: Size is set to a number
        if (Ext.isNumber(size)) {
            return size + (units || this.defaultUnit || 'px');
        }

        // Size set to a value which means "auto"
        if (size === "" || size == "auto" || size === undefined || size === null) {
            return size || '';
        }

        // Otherwise, warn if it's not a valid CSS measurement
        if (!this.unitRe.test(size)) {
            //<debug>
            if (Ext.isDefined(Ext.global.console)) {
                Ext.global.console.warn("Warning, size detected as NaN on Element.addUnits.");
            }
            //</debug>
            return size || '';
        }
        return size;
    },

    /**
     * @static
     * @private
     */
    isAncestor: function(p, c) {
        var ret = false;

        p = Ext.getDom(p);
        c = Ext.getDom(c);
        if (p && c) {
            if (p.contains) {
                return p.contains(c);
            } else if (p.compareDocumentPosition) {
                return !!(p.compareDocumentPosition(c) & 16);
            } else {
                while ((c = c.parentNode)) {
                    ret = c == p || ret;
                }
            }
        }
        return ret;
    },

    /**
     * Parses a number or string representing margin sizes into an object. Supports CSS-style margin declarations
     * (e.g. 10, "10", "10 10", "10 10 10" and "10 10 10 10" are all valid options and would return the same result)
     * @static
     * @param {Number/String} box The encoded margins
     * @return {Object} An object with margin sizes for top, right, bottom and left
     */
    parseBox: function(box) {
        if (typeof box != 'string') {
            box = box.toString();
        }
        var parts  = box.split(' '),
            ln = parts.length;

        if (ln == 1) {
            parts[1] = parts[2] = parts[3] = parts[0];
        }
        else if (ln == 2) {
            parts[2] = parts[0];
            parts[3] = parts[1];
        }
        else if (ln == 3) {
            parts[3] = parts[1];
        }

        return {
            top   :parseFloat(parts[0]) || 0,
            right :parseFloat(parts[1]) || 0,
            bottom:parseFloat(parts[2]) || 0,
            left  :parseFloat(parts[3]) || 0
        };
    },

    /**
     * Parses a number or string representing margin sizes into an object. Supports CSS-style margin declarations
     * (e.g. 10, "10", "10 10", "10 10 10" and "10 10 10 10" are all valid options and would return the same result)
     * @static
     * @param {Number/String} box The encoded margins
     * @param {String} units The type of units to add
     * @return {String} An string with unitized (px if units is not specified) metrics for top, right, bottom and left
     */
    unitizeBox: function(box, units) {
        var A = this.addUnits,
            B = this.parseBox(box);

        return A(B.top, units) + ' ' +
               A(B.right, units) + ' ' +
               A(B.bottom, units) + ' ' +
               A(B.left, units);

    },

    // private
    camelReplaceFn: function(m, a) {
        return a.charAt(1).toUpperCase();
    },

    /**
     * Normalizes CSS property keys from dash delimited to camel case JavaScript Syntax.
     * For example:
     *
     * - border-width -> borderWidth
     * - padding-top -> paddingTop
     *
     * @static
     * @param {String} prop The property to normalize
     * @return {String} The normalized string
     */
    normalize: function(prop) {
        // TODO: Mobile optimization?
        if (prop == 'float') {
            prop = Ext.supports.Float ? 'cssFloat' : 'styleFloat';
        }
        return this.propertyCache[prop] || (this.propertyCache[prop] = prop.replace(this.camelRe, this.camelReplaceFn));
    },

    /**
     * Retrieves the document height
     * @static
     * @return {Number} documentHeight
     */
    getDocumentHeight: function() {
        return Math.max(!Ext.isStrict ? document.body.scrollHeight : document.documentElement.scrollHeight, this.getViewportHeight());
    },

    /**
     * Retrieves the document width
     * @static
     * @return {Number} documentWidth
     */
    getDocumentWidth: function() {
        return Math.max(!Ext.isStrict ? document.body.scrollWidth : document.documentElement.scrollWidth, this.getViewportWidth());
    },

    /**
     * Retrieves the viewport height of the window.
     * @static
     * @return {Number} viewportHeight
     */
    getViewportHeight: function(){
        return window.innerHeight;
    },

    /**
     * Retrieves the viewport width of the window.
     * @static
     * @return {Number} viewportWidth
     */
    getViewportWidth: function() {
        return window.innerWidth;
    },

    /**
     * Retrieves the viewport size of the window.
     * @static
     * @return {Object} object containing width and height properties
     */
    getViewSize: function() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    },

    /**
     * Retrieves the current orientation of the window. This is calculated by
     * determing if the height is greater than the width.
     * @static
     * @return {String} Orientation of window: 'portrait' or 'landscape'
     */
    getOrientation: function() {
        if (Ext.supports.OrientationChange) {
            return (window.orientation == 0) ? 'portrait' : 'landscape';
        }

        return (window.innerHeight > window.innerWidth) ? 'portrait' : 'landscape';
    },

    /**
     * Returns the top Element that is located at the passed coordinates
     * @static
     * @param {Number} x The x coordinate
     * @param {Number} y The y coordinate
     * @return {String} The found Element
     */
    fromPoint: function(x, y) {
        return Ext.get(document.elementFromPoint(x, y));
    },

    /**
     * Converts a CSS string into an object with a property for each style.
     *
     * The sample code below would return an object with 2 properties, one
     * for background-color and one for color.
     *
     *     var css = 'background-color: red;color: blue; ';
     *     console.log(Ext.dom.Element.parseStyles(css));
     *
     * @static
     * @param {String} styles A CSS string
     * @return {Object} styles
     */
    parseStyles: function(styles){
        var out = {},
            cssRe = this.cssRe,
            matches;

        if (styles) {
            // Since we're using the g flag on the regex, we need to set the lastIndex.
            // This automatically happens on some implementations, but not others, see:
            // http://stackoverflow.com/questions/2645273/javascript-regular-expression-literal-persists-between-function-calls
            // http://blog.stevenlevithan.com/archives/fixing-javascript-regexp
            cssRe.lastIndex = 0;
            while ((matches = cssRe.exec(styles))) {
                out[matches[1]] = matches[2];
            }
        }
        return out;
    }
});

//TODO Need serious cleanups
(function(){
    var doc = document,
        AbstractElement = Ext.dom.AbstractElement,
        activeElement = null,
        isCSS1 = doc.compatMode == "CSS1Compat",
        flyInstance,
        fly = function (el) {
            if (!flyInstance) {
                flyInstance = new AbstractElement.Fly();
            }
            flyInstance.attach(el);
            return flyInstance;
        };

    // If the browser does not support document.activeElement we need some assistance.
    // This covers old Safari 3.2 (4.0 added activeElement along with just about all
    // other browsers). We need this support to handle issues with old Safari.
    if (!('activeElement' in doc) && doc.addEventListener) {
        doc.addEventListener('focus',
            function (ev) {
                if (ev && ev.target) {
                    activeElement = (ev.target == doc) ? null : ev.target;
                }
            }, true);
    }

    /*
     * Helper function to create the function that will restore the selection.
     */
    function makeSelectionRestoreFn (activeEl, start, end) {
        return function () {
            activeEl.selectionStart = start;
            activeEl.selectionEnd = end;
        };
    }

    AbstractElement.addInheritableStatics({
        /**
         * Returns the active element in the DOM. If the browser supports activeElement
         * on the document, this is returned. If not, the focus is tracked and the active
         * element is maintained internally.
         * @return {HTMLElement} The active (focused) element in the document.
         */
        getActiveElement: function () {
            return doc.activeElement || activeElement;
        },

        /**
         * Creates a function to call to clean up problems with the work-around for the
         * WebKit RightMargin bug. The work-around is to add "display: 'inline-block'" to
         * the element before calling getComputedStyle and then to restore its original
         * display value. The problem with this is that it corrupts the selection of an
         * INPUT or TEXTAREA element (as in the "I-beam" goes away but ths focus remains).
         * To cleanup after this, we need to capture the selection of any such element and
         * then restore it after we have restored the display style.
         *
         * @param {Ext.dom.Element} target The top-most element being adjusted.
         * @private
         */
        getRightMarginFixCleaner: function (target) {
            var supports = Ext.supports,
                hasInputBug = supports.DisplayChangeInputSelectionBug,
                hasTextAreaBug = supports.DisplayChangeTextAreaSelectionBug;

            if (hasInputBug || hasTextAreaBug) {
                var activeEl = doc.activeElement || activeElement, // save a call
                    tag = activeEl && activeEl.tagName,
                    start,
                    end;

                if ((hasTextAreaBug && tag == 'TEXTAREA') ||
                    (hasInputBug && tag == 'INPUT' && activeEl.type == 'text')) {
                    if (Ext.dom.Element.isAncestor(target, activeEl)) {
                        start = activeEl.selectionStart;
                        end = activeEl.selectionEnd;

                        if (Ext.isNumber(start) && Ext.isNumber(end)) { // to be safe...
                            // We don't create the raw closure here inline because that
                            // will be costly even if we don't want to return it (nested
                            // function decls and exprs are often instantiated on entry
                            // regardless of whether execution ever reaches them):
                            return makeSelectionRestoreFn(activeEl, start, end);
                        }
                    }
                }
            }

            return Ext.emptyFn; // avoid special cases, just return a nop
        },

        getViewWidth: function(full) {
            return full ? Ext.dom.Element.getDocumentWidth() : Ext.dom.Element.getViewportWidth();
        },

        getViewHeight: function(full) {
            return full ? Ext.dom.Element.getDocumentHeight() : Ext.dom.Element.getViewportHeight();
        },

        getDocumentHeight: function() {
            return Math.max(!isCSS1 ? doc.body.scrollHeight : doc.documentElement.scrollHeight, Ext.dom.Element.getViewportHeight());
        },

        getDocumentWidth: function() {
            return Math.max(!isCSS1 ? doc.body.scrollWidth : doc.documentElement.scrollWidth, Ext.dom.Element.getViewportWidth());
        },

        getViewportHeight: function(){
            return Ext.isIE ?
                   (Ext.isStrict ? doc.documentElement.clientHeight : doc.body.clientHeight) :
                   self.innerHeight;
        },

        getViewportWidth: function() {
            return (!Ext.isStrict && !Ext.isOpera) ? doc.body.clientWidth :
                   Ext.isIE ? doc.documentElement.clientWidth : self.innerWidth;
        },

        getY: function(el) {
            return Ext.dom.Element.getXY(el)[1];
        },

        getX: function(el) {
            return Ext.dom.Element.getXY(el)[0];
        },

        getXY: function(el) {
            var p,
                pe,
                b,
                bt,
                bl,
                dbd,
                x = 0,
                y = 0,
                scroll,
                hasAbsolute,
                bd = (doc.body || doc.documentElement),
                ret = [0,0];

            el = Ext.getDom(el);

            if(el != bd){
                hasAbsolute = fly(el).isStyle("position", "absolute");

                if (el.getBoundingClientRect) {
                    b = el.getBoundingClientRect();
                    scroll = fly(document).getScroll();
                    ret = [Math.round(b.left + scroll.left), Math.round(b.top + scroll.top)];
                } else {
                    p = el;

                    while (p) {
                        pe = fly(p);
                        x += p.offsetLeft;
                        y += p.offsetTop;

                        hasAbsolute = hasAbsolute || pe.isStyle("position", "absolute");

                        if (Ext.isGecko) {
                            y += bt = parseInt(pe.getStyle("borderTopWidth"), 10) || 0;
                            x += bl = parseInt(pe.getStyle("borderLeftWidth"), 10) || 0;

                            if (p != el && !pe.isStyle('overflow','visible')) {
                                x += bl;
                                y += bt;
                            }
                        }
                        p = p.offsetParent;
                    }

                    if (Ext.isSafari && hasAbsolute) {
                        x -= bd.offsetLeft;
                        y -= bd.offsetTop;
                    }

                    if (Ext.isGecko && !hasAbsolute) {
                        dbd = fly(bd);
                        x += parseInt(dbd.getStyle("borderLeftWidth"), 10) || 0;
                        y += parseInt(dbd.getStyle("borderTopWidth"), 10) || 0;
                    }

                    p = el.parentNode;
                    while (p && p != bd) {
                        if (!Ext.isOpera || (p.tagName != 'TR' && !fly(p).isStyle("display", "inline"))) {
                            x -= p.scrollLeft;
                            y -= p.scrollTop;
                        }
                        p = p.parentNode;
                    }
                    ret = [x,y];
                }
            }
            return ret;
        },

        setXY: function(el, xy) {
            (el = Ext.fly(el, '_setXY')).position();

            var pts = el.translatePoints(xy),
                style = el.dom.style,
                pos;

            for (pos in pts) {
                if (!isNaN(pts[pos])) {
                    style[pos] = pts[pos] + "px";
                }
            }
        },

        setX: function(el, x) {
            Ext.dom.Element.setXY(el, [x, false]);
        },

        setY: function(el, y) {
            Ext.dom.Element.setXY(el, [false, y]);
        },

        /**
         * Serializes a DOM form into a url encoded string
         * @param {Object} form The form
         * @return {String} The url encoded form
         */
        serializeForm: function(form) {
            var fElements = form.elements || (document.forms[form] || Ext.getDom(form)).elements,
                hasSubmit = false,
                encoder = encodeURIComponent,
                name,
                data = '',
                type,
                hasValue;

            Ext.each(fElements, function(element){
                name = element.name;
                type = element.type;

                if (!element.disabled && name) {
                    if (/select-(one|multiple)/i.test(type)) {
                        Ext.each(element.options, function(opt){
                            if (opt.selected) {
                                hasValue = opt.hasAttribute ? opt.hasAttribute('value') : opt.getAttributeNode('value').specified;
                                data += Ext.String.format("{0}={1}&", encoder(name), encoder(hasValue ? opt.value : opt.text));
                            }
                        });
                    } else if (!(/file|undefined|reset|button/i.test(type))) {
                        if (!(/radio|checkbox/i.test(type) && !element.checked) && !(type == 'submit' && hasSubmit)) {
                            data += encoder(name) + '=' + encoder(element.value) + '&';
                            hasSubmit = /submit/i.test(type);
                        }
                    }
                }
            });
            return data.substr(0, data.length - 1);
        }
    });
})();

/**
 * @class Ext.dom.AbstractElement
 */
Ext.dom.AbstractElement.override({

    /**
     * Gets the x,y coordinates specified by the anchor position on the element.
     * @param {String} anchor (optional) The specified anchor position (defaults to "c").
     * @param {Boolean} local (optional) True to get the local (element top/left-relative) anchor position instead
     * of page coordinates
     * @param {Object} size (optional) An object containing the size to use for calculating anchor position
     * {width: (target width), height: (target height)} (defaults to the element's current size)
     * @return {Array} [x, y] An array containing the element's x and y coordinates
     */
    getAnchorXY: function(anchor, local, size) {
        //Passing a different size is useful for pre-calculating anchors,
        //especially for anchored animations that change the el size.
        anchor = (anchor || "tl").toLowerCase();
        size = size || {};

        var me = this,
            vp = me.dom == document.body || me.dom == document,
            width = size.width || vp ? window.innerWidth: me.getWidth(),
            height = size.height || vp ? window.innerHeight: me.getHeight(),
            xy,
            rnd = Math.round,
            myXY = me.getXY(),
            extraX = vp ? 0: !local ? myXY[0] : 0,
            extraY = vp ? 0: !local ? myXY[1] : 0,
            hash = {
                c: [rnd(width * 0.5), rnd(height * 0.5)],
                t: [rnd(width * 0.5), 0],
                l: [0, rnd(height * 0.5)],
                r: [width, rnd(height * 0.5)],
                b: [rnd(width * 0.5), height],
                tl: [0, 0],
                bl: [0, height],
                br: [width, height],
                tr: [width, 0]
            };

        xy = hash[anchor];
        return [xy[0] + extraX, xy[1] + extraY];
    },

    alignToRe: /^([a-z]+)-([a-z]+)(\?)?$/,

    /**
     * Gets the x,y coordinates to align this element with another element.
     * @param {Mixed} element The element to align to.
     * @param {String} position (optional, defaults to "tl-bl?") The position to align to.
     * @param {Array} offsets (optional) Offset the positioning by [x, y]
     * @return {Array} [x, y]
     */
    getAlignToXY: function(el, position, offsets, local) {
        local = !!local;
        el = Ext.get(el);

        //<debug>
        if (!el || !el.dom) {
            throw new Error("Element.alignToXY with an element that doesn't exist");
        }
        //</debug>
        offsets = offsets || [0, 0];

        if (!position || position == '?') {
            position = 'tl-bl?';
        }
        else if (! (/-/).test(position) && position !== "") {
            position = 'tl-' + position;
        }
        position = position.toLowerCase();

        var me = this,
            matches = position.match(this.alignToRe),
            dw = window.innerWidth,
            dh = window.innerHeight,
            p1 = "",
            p2 = "",
            a1,
            a2,
            x,
            y,
            swapX,
            swapY,
            p1x,
            p1y,
            p2x,
            p2y,
            width,
            height,
            region,
            constrain;

        if (!matches) {
            throw "Element.alignTo with an invalid alignment " + position;
        }

        p1 = matches[1];
        p2 = matches[2];
        constrain = !!matches[3];

        //Subtract the aligned el's internal xy from the target's offset xy
        //plus custom offset to get the aligned el's new offset xy
        a1 = me.getAnchorXY(p1, true);
        a2 = el.getAnchorXY(p2, local);

        x = a2[0] - a1[0] + offsets[0];
        y = a2[1] - a1[1] + offsets[1];

        if (constrain) {
            width = me.getWidth();
            height = me.getHeight();

            region = el.getPageBox();

            //If we are at a viewport boundary and the aligned el is anchored on a target border that is
            //perpendicular to the vp border, allow the aligned el to slide on that border,
            //otherwise swap the aligned el to the opposite border of the target.
            p1y = p1.charAt(0);
            p1x = p1.charAt(p1.length - 1);
            p2y = p2.charAt(0);
            p2x = p2.charAt(p2.length - 1);

            swapY = ((p1y == "t" && p2y == "b") || (p1y == "b" && p2y == "t"));
            swapX = ((p1x == "r" && p2x == "l") || (p1x == "l" && p2x == "r"));

            if (x + width > dw) {
                x = swapX ? region.left - width: dw - width;
            }
            if (x < 0) {
                x = swapX ? region.right: 0;
            }
            if (y + height > dh) {
                y = swapY ? region.top - height: dh - height;
            }
            if (y < 0) {
                y = swapY ? region.bottom: 0;
            }
        }

        return [x, y];
    },

    // private
    getAnchor: function(){
        var dom = this.dom;
            if (!dom) {
                return;
            }
            var anchor = this.self.data.call(this.self, dom, '_anchor');

        if(!anchor){
            anchor = this.self.data.call(this.self, dom, '_anchor', {});
        }
        return anchor;
    },

    // private ==>  used outside of core
    adjustForConstraints: function(xy, parent) {
        var vector = this.getConstrainVector(parent, xy);
        if (vector) {
            xy[0] += vector[0];
            xy[1] += vector[1];
        }
        return xy;
    }

});

/**
 * @class Ext.dom.AbstractElement
 */
Ext.dom.AbstractElement.addMethods({
    /**
     * Appends the passed element(s) to this element
     * @param {String/HTMLElement/Ext.dom.AbstractElement} el
     * The id of the node, a DOM Node or an existing Element.
     * @return {Ext.dom.AbstractElement} This element
     */
    appendChild: function(el) {
        return Ext.get(el).appendTo(this);
    },

    /**
     * Appends this element to the passed element
     * @param {String/HTMLElement/Ext.dom.AbstractElement} el The new parent element.
     * The id of the node, a DOM Node or an existing Element.
     * @return {Ext.dom.AbstractElement} This element
     */
    appendTo: function(el) {
        Ext.getDom(el).appendChild(this.dom);
        return this;
    },

    /**
     * Inserts this element before the passed element in the DOM
     * @param {String/HTMLElement/Ext.dom.AbstractElement} el The element before which this element will be inserted.
     * The id of the node, a DOM Node or an existing Element.
     * @return {Ext.dom.AbstractElement} This element
     */
    insertBefore: function(el) {
        el = Ext.getDom(el);
        el.parentNode.insertBefore(this.dom, el);
        return this;
    },

    /**
     * Inserts this element after the passed element in the DOM
     * @param {String/HTMLElement/Ext.dom.AbstractElement} el The element to insert after.
     * The id of the node, a DOM Node or an existing Element.
     * @return {Ext.dom.AbstractElement} This element
     */
    insertAfter: function(el) {
        el = Ext.getDom(el);
        el.parentNode.insertBefore(this.dom, el.nextSibling);
        return this;
    },

    /**
     * Inserts (or creates) an element (or DomHelper config) as the first child of this element
     * @param {String/HTMLElement/Ext.dom.AbstractElement/Object} el The id or element to insert or a DomHelper config
     * to create and insert
     * @return {Ext.dom.AbstractElement} The new child
     */
    insertFirst: function(el, returnDom) {
        el = el || {};
        if (el.nodeType || el.dom || typeof el == 'string') { // element
            el = Ext.getDom(el);
            this.dom.insertBefore(el, this.dom.firstChild);
            return !returnDom ? Ext.get(el) : el;
        }
        else { // dh config
            return this.createChild(el, this.dom.firstChild, returnDom);
        }
    },

    /**
     * Inserts (or creates) the passed element (or DomHelper config) as a sibling of this element
     * @param {String/HTMLElement/Ext.dom.AbstractElement/Object/Array} el The id, element to insert or a DomHelper config
     * to create and insert *or* an array of any of those.
     * @param {String} where (optional) 'before' or 'after' defaults to before
     * @param {Boolean} returnDom (optional) True to return the .;ll;l,raw DOM element instead of Ext.dom.AbstractElement
     * @return {Ext.dom.AbstractElement} The inserted Element. If an array is passed, the last inserted element is returned.
     */
    insertSibling: function(el, where, returnDom){
        var me = this, rt,
        isAfter = (where || 'before').toLowerCase() == 'after',
        insertEl;

        if(Ext.isArray(el)){
            insertEl = me;
            Ext.each(el, function(e) {
                rt = Ext.fly(insertEl, '_internal').insertSibling(e, where, returnDom);
                if(isAfter){
                    insertEl = rt;
                }
            });
            return rt;
        }

        el = el || {};

        if(el.nodeType || el.dom){
            rt = me.dom.parentNode.insertBefore(Ext.getDom(el), isAfter ? me.dom.nextSibling : me.dom);
            if (!returnDom) {
                rt = Ext.get(rt);
            }
        }else{
            if (isAfter && !me.dom.nextSibling) {
                rt = Ext.core.DomHelper.append(me.dom.parentNode, el, !returnDom);
            } else {
                rt = Ext.core.DomHelper[isAfter ? 'insertAfter' : 'insertBefore'](me.dom, el, !returnDom);
            }
        }
        return rt;
    },

    /**
     * Replaces the passed element with this element
     * @param {String/HTMLElement/Ext.dom.AbstractElement} el The element to replace.
     * The id of the node, a DOM Node or an existing Element.
     * @return {Ext.dom.AbstractElement} This element
     */
    replace: function(el) {
        el = Ext.get(el);
        this.insertBefore(el);
        el.remove();
        return this;
    },

    /**
     * Replaces this element with the passed element
     * @param {String/HTMLElement/Ext.dom.AbstractElement/Object} el The new element (id of the node, a DOM Node
     * or an existing Element) or a DomHelper config of an element to create
     * @return {Ext.dom.AbstractElement} This element
     */
    replaceWith: function(el){
        var me = this;

        if(el.nodeType || el.dom || typeof el == 'string'){
            el = Ext.get(el);
            me.dom.parentNode.insertBefore(el, me.dom);
        }else{
            el = Ext.core.DomHelper.insertBefore(me.dom, el);
        }

        delete Ext.cache[me.id];
        Ext.removeNode(me.dom);
        me.id = Ext.id(me.dom = el);
        Ext.dom.AbstractElement.addToCache(me.isFlyweight ? new Ext.dom.AbstractElement(me.dom) : me);
        return me;
    },

    /**
     * Creates the passed DomHelper config and appends it to this element or optionally inserts it before the passed child element.
     * @param {Object} config DomHelper element config object.  If no tag is specified (e.g., {tag:'input'}) then a div will be
     * automatically generated with the specified attributes.
     * @param {HTMLElement} insertBefore (optional) a child element of this element
     * @param {Boolean} returnDom (optional) true to return the dom node instead of creating an Element
     * @return {Ext.dom.AbstractElement} The new child element
     */
    createChild: function(config, insertBefore, returnDom) {
        config = config || {tag:'div'};
        if (insertBefore) {
            return Ext.core.DomHelper.insertBefore(insertBefore, config, returnDom !== true);
        }
        else {
            return Ext.core.DomHelper[!this.dom.firstChild ? 'insertFirst' : 'append'](this.dom, config,  returnDom !== true);
        }
    },

    /**
     * Creates and wraps this element with another element
     * @param {Object} config (optional) DomHelper element config object for the wrapper element or null for an empty div
     * @param {Boolean} returnDom (optional) True to return the raw DOM element instead of Ext.dom.AbstractElement
     * @return {HTMLElement/Ext.dom.AbstractElement} The newly created wrapper element
     */
    wrap: function(config, returnDom) {
        var newEl = Ext.core.DomHelper.insertBefore(this.dom, config || {tag: "div"}, !returnDom),
            d = newEl.dom || newEl;

        d.appendChild(this.dom);
        return newEl;
    },

    /**
     * Inserts an html fragment into this element
     * @param {String} where Where to insert the html in relation to this element - beforeBegin, afterBegin, beforeEnd, afterEnd.
     * See {@link Ext.dom.Helper#insertHtml} for details.
     * @param {String} html The HTML fragment
     * @param {Boolean} returnEl (optional) True to return an Ext.dom.AbstractElement (defaults to false)
     * @return {HTMLElement/Ext.dom.AbstractElement} The inserted node (or nearest related if more than 1 inserted)
     */
    insertHtml: function(where, html, returnEl) {
        var el = Ext.core.DomHelper.insertHtml(where, this.dom, html);
        return returnEl ? Ext.get(el) : el;
    }
});

/**
 * @class Ext.dom.AbstractElement
 */
(function(){

var Element = Ext.dom.AbstractElement;

Element.override({

    /**
      * Gets the current X position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
      * @return {Number} The X position of the element
      */
    getX: function(el) {
        return this.getXY(el)[0];
    },

    /**
      * Gets the current Y position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
      * @return {Number} The Y position of the element
      */
    getY: function(el) {
        return this.getXY(el)[1];
    },

    /**
      * Gets the current position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
      * @return {Array} The XY position of the element
      */

    getXY: function() {
        var webkitConvert = window.webkitConvertPointFromNodeToPage;
        if (webkitConvert) {
            return function() {
                var point = webkitConvert(this.dom, new WebKitPoint(0, 0));
                return [point.x, point.y];
            }
        }
        else return function() {
            var rect = this.dom.getBoundingClientRect(),
                rnd = Math.round;
            return [rnd(rect.left + window.pageXOffset), rnd(rect.top + window.pageYOffset)];
        }
    }(),

    /**
      * Returns the offsets of this element from the passed element. Both element must be part of the DOM tree and not have display:none to have page coordinates.
      * @param {Mixed} element The element to get the offsets from.
      * @return {Array} The XY page offsets (e.g. [100, -200])
      */
    getOffsetsTo: function(el){
        var o = this.getXY(),
            e = Ext.fly(el, '_internal').getXY();
        return [o[0]-e[0],o[1]-e[1]];
    },

    /**
     * Sets the X position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
     * @param {Number} The X position of the element
     * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
     * @return {Ext.dom.AbstractElement} this
     */
    setX: function(x){
        return this.setXY([x, this.getY()]);
    },

    /**
     * Sets the Y position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
     * @param {Number} The Y position of the element
     * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
     * @return {Ext.dom.AbstractElement} this
     */
    setY: function(y) {
        return this.setXY([this.getX(), y]);
    },

    /**
     * Sets the element's left position directly using CSS style (instead of {@link #setX}).
     * @param {String} left The left CSS property value
     * @return {Ext.dom.AbstractElement} this
     */
    setLeft: function(left) {
        this.setStyle('left', Element.addUnits(left));
        return this;
    },

    /**
     * Sets the element's top position directly using CSS style (instead of {@link #setY}).
     * @param {String} top The top CSS property value
     * @return {Ext.dom.AbstractElement} this
     */
    setTop: function(top) {
        this.setStyle('top', Element.addUnits(top));
        return this;
    },

    /**
     * Sets the element's CSS right style.
     * @param {String} right The right CSS property value
     * @return {Ext.dom.AbstractElement} this
     */
    setRight: function(right) {
        this.setStyle('right', Element.addUnits(right));
        return this;
    },

    /**
     * Sets the element's CSS bottom style.
     * @param {String} bottom The bottom CSS property value
     * @return {Ext.dom.AbstractElement} this
     */
    setBottom: function(bottom) {
        this.setStyle('bottom', Element.addUnits(bottom));
        return this;
    },

    /**
     * Sets the position of the element in page coordinates, regardless of how the element is positioned.
     * The element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
     * @param {Array} pos Contains X & Y [x, y] values for new position (coordinates are page-based)
     * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
     * @return {Ext.dom.AbstractElement} this
     */
    setXY: function(pos) {
        var me = this;

        if (arguments.length > 1) {
            pos = [pos, arguments[1]];
        }

        // me.position();
        var pts = me.translatePoints(pos),
                style = me.dom.style;

        for (pos in pts) {
            if (!pts.hasOwnProperty(pos)) {
                continue;
            }
            if (!isNaN(pts[pos])) style[pos] = pts[pos] + "px";
        }
        return me;
    },

    /**
     * Gets the left X coordinate
     * @param {Boolean} local True to get the local css position instead of page coordinate
     * @return {Number}
     */
    getLeft: function(local) {
        return parseInt(this.getStyle('left'), 10) || 0;
    },

    /**
     * Gets the right X coordinate of the element (element X position + element width)
     * @param {Boolean} local True to get the local css position instead of page coordinate
     * @return {Number}
     */
    getRight: function(local) {
        return parseInt(this.getStyle('right'), 10) || 0;
    },

    /**
     * Gets the top Y coordinate
     * @param {Boolean} local True to get the local css position instead of page coordinate
     * @return {Number}
     */
    getTop: function(local) {
        return parseInt(this.getStyle('top'), 10) || 0;
    },

    /**
     * Gets the bottom Y coordinate of the element (element Y position + element height)
     * @param {Boolean} local True to get the local css position instead of page coordinate
     * @return {Number}
     */
    getBottom: function(local) {
        return parseInt(this.getStyle('bottom'), 10) || 0;
    },

    /**
     * Translates the passed page coordinates into left/top css values for this element
     * @param {Number/Array} x The page x or an array containing [x, y]
     * @param {Number} y (optional) The page y, required if x is not an array
     * @return {Object} An object with left and top properties. e.g. {left: (value), top: (value)}
     */
    translatePoints: function(x, y) {
        y = isNaN(x[1]) ? y : x[1];
        x = isNaN(x[0]) ? x : x[0];
        var me = this,
            relative = me.isStyle('position', 'relative'),
            o = me.getXY(),
            l = parseInt(me.getStyle('left'), 10),
            t = parseInt(me.getStyle('top'), 10);

        l = !isNaN(l) ? l : (relative ? 0 : me.dom.offsetLeft);
        t = !isNaN(t) ? t : (relative ? 0 : me.dom.offsetTop);

        return {left: (x - o[0] + l), top: (y - o[1] + t)};
    },

    /**
     * Sets the element's box. Use getBox() on another element to get a box obj. If animate is true then width, height, x and y will be animated concurrently.
     * @param {Object} box The box to fill {x, y, width, height}
     * @param {Boolean} adjust (optional) Whether to adjust for box-model issues automatically
     * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
     * @return {Ext.dom.AbstractElement} this
     */
    setBox: function(box) {
        var me = this,
            width = box.width,
            height = box.height,
            top = box.top,
            left = box.left;

        if (left !== undefined) {
            me.setLeft(left);
        }
        if (top !== undefined) {
            me.setTop(top);
        }
        if (width !== undefined) {
            me.setWidth(width);
        }
        if (height !== undefined) {
            me.setHeight(height);
        }

        return this;
    },

    /**
     * Return an object defining the area of this Element which can be passed to {@link #setBox} to
     * set another Element's size/location to match this element.
     * @param {Boolean} contentBox (optional) If true a box for the content of the element is returned.
     * @param {Boolean} local (optional) If true the element's left and top are returned instead of page x/y.
     * @return {Object} box An object in the format<pre><code>
{
    x: &lt;Element's X position>,
    y: &lt;Element's Y position>,
    width: &lt;Element's width>,
    height: &lt;Element's height>,
    bottom: &lt;Element's lower bound>,
    right: &lt;Element's rightmost bound>
}
</code></pre>
     * The returned object may also be addressed as an Array where index 0 contains the X position
     * and index 1 contains the Y position. So the result may also be used for {@link #setXY}
     */
    getBox: function(contentBox, local) {
        var me = this,
            dom = me.dom,
            width = dom.offsetWidth,
            height = dom.offsetHeight,
            xy, box, l, r, t, b;

        if (!local) {
            xy = me.getXY();
        }
        else if (contentBox) {
            xy = [0,0];
        }
        else {
            xy = [parseInt(me.getStyle("left"), 10) || 0, parseInt(me.getStyle("top"), 10) || 0];
        }

        if (!contentBox) {
            box = {
                x: xy[0],
                y: xy[1],
                0: xy[0],
                1: xy[1],
                width: width,
                height: height
            };
        }
        else {
            l = me.getBorderWidth.call(me, "l") + me.getPadding.call(me, "l");
            r = me.getBorderWidth.call(me, "r") + me.getPadding.call(me, "r");
            t = me.getBorderWidth.call(me, "t") + me.getPadding.call(me, "t");
            b = me.getBorderWidth.call(me, "b") + me.getPadding.call(me, "b");
            box = {
                x: xy[0] + l,
                y: xy[1] + t,
                0: xy[0] + l,
                1: xy[1] + t,
                width: width - (l + r),
                height: height - (t + b)
            };
        }

        box.left = box.x;
        box.top = box.y;
        box.right = box.x + box.width;
        box.bottom = box.y + box.height;

        return box;
    },

    /**
     * Return an object defining the area of this Element which can be passed to {@link #setBox} to
     * set another Element's size/location to match this element.
     * @param {Boolean} asRegion(optional) If true an Ext.util.Region will be returned
     * @return {Object} box An object in the format<pre><code>
{
    x: &lt;Element's X position>,
    y: &lt;Element's Y position>,
    width: &lt;Element's width>,
    height: &lt;Element's height>,
    bottom: &lt;Element's lower bound>,
    right: &lt;Element's rightmost bound>
}
</code></pre>
     * The returned object may also be addressed as an Array where index 0 contains the X position
     * and index 1 contains the Y position. So the result may also be used for {@link #setXY}
     */
    getPageBox: function(getRegion) {
        var me = this,
            el = me.dom,
            w = el.offsetWidth,
            h = el.offsetHeight,
            xy = me.getXY(),
            t = xy[1],
            r = xy[0] + w,
            b = xy[1] + h,
            l = xy[0];

        if (!el) {
            return new Ext.util.Region();
        }

        if (getRegion) {
            return new Ext.util.Region(t, r, b, l);
        }
        else {
            return {
                left: l,
                top: t,
                width: w,
                height: h,
                right: r,
                bottom: b
            };
        }
    }
});

})();

/**
 * @class Ext.dom.AbstractElement
 */
(function(){
    // local style camelizing for speed
    var Element = Ext.dom.AbstractElement,
        view = document.defaultView,
        trimRe = /^\s+|\s+$/g,
        wordsRe = /\w/g,
        spacesRe = /\s+/,
        transparentRe = /^(?:transparent|(?:rgba[(](?:\s*\d+\s*[,]){3}\s*0\s*[)]))$/i,
        hasClassList = Ext.supports.ClassList,

        PADDING = 'padding',
        MARGIN = 'margin',
        BORDER = 'border',
        LEFT_SUFFIX = '-left',
        RIGHT_SUFFIX = '-right',
        TOP_SUFFIX = '-top',
        BOTTOM_SUFFIX = '-bottom',
        WIDTH = '-width',

        supportsTransparentColor = Ext.supports.TransparentColor,

        // special markup used throughout Ext when box wrapping elements
        borders = {l: BORDER + LEFT_SUFFIX + WIDTH, r: BORDER + RIGHT_SUFFIX + WIDTH, t: BORDER + TOP_SUFFIX + WIDTH, b: BORDER + BOTTOM_SUFFIX + WIDTH},
        paddings = {l: PADDING + LEFT_SUFFIX, r: PADDING + RIGHT_SUFFIX, t: PADDING + TOP_SUFFIX, b: PADDING + BOTTOM_SUFFIX},
        margins = {l: MARGIN + LEFT_SUFFIX, r: MARGIN + RIGHT_SUFFIX, t: MARGIN + TOP_SUFFIX, b: MARGIN + BOTTOM_SUFFIX};


    Element.override({

        /**
         * This shared object is keyed by style name (e.g., 'margin-left' or 'marginLeft'). The
         * values are objects with the following properties:
         *
         *  * `name` (String) : The actual name to be presented to the DOM. This is typically the value
         *      returned by {@link #normalize}.
         *  * `get` (Function) : A hook function that will perform the get on this style. These
         *      functions receive "(dom, el)" arguments. The `dom` parameter is the DOM Element
         *      from which to get ths tyle. The `el` argument (may be null) is the Ext.Element.
         *  * `set` (Function) : A hook function that will perform the set on this style. These
         *      functions receive "(dom, value, el)" arguments. The `dom` parameter is the DOM Element
         *      from which to get ths tyle. The `value` parameter is the new value for the style. The
         *      `el` argument (may be null) is the Ext.Element.
         *
         * The `this` pointer is the object that contains `get` or `set`, which means that
         * `this.name` can be accessed if needed. The hook functions are both optional.
         * @private
         * @markdown
         */
        styleHooks: {},

        // private
        addStyles: function(sides, styles){
            var totalSize = 0,
                sidesArr = sides.match(wordsRe),
                i = 0,
                len = sidesArr.length,
                side, size;
            for (; i < len; i++) {
                side = sidesArr[i];
                size = side && parseInt(this.getStyle(styles[side]), 10);
                if (size) {
                    totalSize += Math.abs(size);
                }
            }
            return totalSize;
        },

        /**
         * Adds one or more CSS classes to the element. Duplicate classes are automatically filtered out.
         * @param {String/String[]} className The CSS classes to add separated by space, or an array of classes
         * @return {Ext.dom.Element} this
         * @method
         */
        addCls: hasClassList ?
            function (className) {
                //<debug warn>
                if (String(className).indexOf('undefined') > -1) {
                    Ext.Logger.warn("called with an undefined className: " + className);
                }
                //</debug>
                var me = this,
                    dom = me.dom,
                    classList,
                    newCls,
                    i,
                    len,
                    cls;

                if (typeof(className) == 'string') {
                    // split string on spaces to make an array of className
                    className = className.replace(trimRe, '').split(spacesRe);
                }

                // the gain we have here is that we can skip parsing className and use the
                // classList.contains method, so now O(M) not O(M+N)
                if (dom && className && !!(len = className.length)) {
                    if (!dom.className) {
                        dom.className = className.join(' ');
                    } else {
                        classList = dom.classList;
                        for (i = 0; i < len; ++i) {
                            cls = className[i];
                            if (!classList.contains(cls)) {
                                if (newCls) {
                                    newCls.push(cls);
                                } else {
                                    newCls = dom.className.replace(trimRe, '');
                                    newCls = newCls ? [newCls, cls] : [cls];
                                }
                            }
                        }

                        if (newCls) {
                            dom.className = newCls.join(' '); // write to DOM once
                        }
                    }
                }
                return me;
            } :
            function(className) {
                //<debug warn>
                if (String(className).indexOf('undefined') > -1) {
                    Ext.Logger.warn("called with an undefined className: '" + className + "'");
                }
                //</debug>
                var me = this,
                    dom = me.dom,
                    changed,
                    elClasses,
                    currentClsMap,
                    i,
                    len,
                    cls;

                if (typeof(className) == 'string') {
                    // split string on spaces to make an array of className
                    className = className.replace(trimRe, '').split(spacesRe);
                }

                // performance notes:
                //  - if we have existing classes, make a map to avoid O(N) hasCls call
                //  - we don't ask if className is an array directly (isArray or Miller Device).
                //      It is either a string or an array, so we use typeof == string
                //  - time complexity is O(M+N) where previous was O(M*N)
                //      was  loop className[]   => O(M)
                //           call hasCls        => O(M*N)
                //
                // other notes:
                //  - we try to prevent spaces from proliferating when not needed
                //  - we don't trim incoming className(s); that is a logic error
                if (dom && className && className.length) {
                    elClasses = dom.className.replace(trimRe, '');
                    elClasses = elClasses ? elClasses.split(spacesRe) : null;

                    if (elClasses && !!(len = elClasses.length)) {
                        currentClsMap = {};
                        for (i = 0; i < len; ++i) {
                            currentClsMap[elClasses[i]] = 1;
                        }
                        // the current classes now with O(1) lookup

                        for (i = 0, len = className.length; i < len; ++i) {
                            cls = className[i];
                            if (!currentClsMap[cls]) {
                                elClasses.push(cls);
                                changed = true;
                            }
                        }
                    } else {
                        elClasses = className; // just use the new class name(s)
                        changed = true;
                    }

                    if (changed) {
                        dom.className = elClasses.join(' '); // write to DOM once
                    }
                }

                return me;
            },


        /**
         * Removes one or more CSS classes from the element.
         * @param {String/String[]} className The CSS classes to remove separated by space, or an array of classes
         * @return {Ext.dom.Element} this
         */
        removeCls: function(className) {
            var me = this,
                dom = me.dom,
                i,
                len,
                cls,
                elClasses,
                newCls,
                removeMap;

            if (typeof(className) == 'string') {
                // split string on spaces to make an array of className
                className = className.replace(trimRe, '').split(spacesRe);
            }

            // performance notes:
            //  - we don't ask if className is an array directly (isArray or Miller Device).
            //      It is either a string or an array, so we use typeof == string
            //  - time complexity is O(M+N) where previous was O(M*N*N)
            //      was  loop className[]        => O(M)
            //           call elClasses.indexOf  => O(M*N)
            //           call elClasses.splice   => O(M*N*N)
            //              + splice has a nasty bug in IE8 (see Array.js)
            if (dom && dom.className && className && !!(len = className.length)) {
                if (len == 1 && hasClassList) {
                    dom.classList.remove(className[0]); // one DOM write
                } else {
                    removeMap = {}; // the classes to remove with O(1) lookup
                    for (i = 0, len = className.length; i < len; ++i) {
                        removeMap[className[i]] = 1;
                    }

                    elClasses = dom.className.replace(trimRe, '').split(spacesRe);
                    newCls = [];
                    for (i = 0, len = elClasses.length; i < len; i++) {
                        cls = elClasses[i];
                        if (!removeMap[cls]) {
                            newCls.push(cls); // keeper (faster than indexOf/splice + no bugs)
                        }
                    }

                    dom.className = newCls.join(' '); // one DOM write
                }
            }

            return me;
        },

        /**
         * Adds one or more CSS classes to this element and removes the same class(es) from all siblings.
         * @param {String/String[]} className The CSS class to add, or an array of classes
         * @return {Ext.dom.Element} this
         */
        radioCls: function(className) {
            var cn = this.dom.parentNode.childNodes,
                v;
            className = Ext.isArray(className) ? className: [className];
            for (var i = 0, len = cn.length; i < len; i++) {
                v = cn[i];
                if (v && v.nodeType == 1) {
                    Ext.fly(v, '_internal').removeCls(className);
                }
            };
            return this.addCls(className);
        },

        /**
         * Toggles the specified CSS class on this element (removes it if it already exists, otherwise adds it).
         * @param {String} className The CSS class to toggle
         * @return {Ext.dom.Element} this
         * @method
         */
        toggleCls: hasClassList ?
            function (className) {
                var me = this,
                    dom = me.dom;

                if (dom) {
                    dom.classList.toggle(className.replace(trimRe, ''));
                }

                return me;
            } :
            function(className) {
                var me = this;
                return me.hasCls(className) ? me.removeCls(className) : me.addCls(className);
            },

        /**
         * Checks if the specified CSS class exists on this element's DOM node.
         * @param {String} className The CSS class to check for
         * @return {Boolean} True if the class exists, else false
         * @method
         */
        hasCls: hasClassList ?
            function (className) {
                var dom = this.dom;
                return dom ? dom.classList.contains(className) : false;
            } :
            function(className) {
                var dom = this.dom;
                return dom ? className && (' '+dom.className+' ').indexOf(' '+className+' ') != -1 : false;
            },

        /**
         * Replaces a CSS class on the element with another.  If the old name does not exist, the new name will simply be added.
         * @param {String} oldClassName The CSS class to replace
         * @param {String} newClassName The replacement CSS class
         * @return {Ext.dom.Element} this
         */
        replaceCls: function(oldClassName, newClassName){
            return this.removeCls(oldClassName).addCls(newClassName);
        },

        /**
         * Checks if the current value of a style is equal to a given value.
         * @param {String} style property whose value is returned.
         * @param {String} value to check against.
         * @return {Boolean} true for when the current value equals the given value.
         */
        isStyle: function(style, val) {
            return this.getStyle(style) == val;
        },

        /**
         * Normalizes currentStyle and computedStyle.
         * @param {String} prop The style property whose value is returned.
         * @return {String} The current value of the style property for this element.
         */
        getStyle: function(prop) {
            var me = this,
                dom = me.dom,
                hook = me.styleHooks[prop],
                cs, result;

            if (dom == document) {
                return null;
            }
            if (!hook) {
                me.styleHooks[prop] = hook = { name: Element.normalize(prop) };
            }
            if (hook.get) {
                return hook.get(dom, me);
            }

            cs = view.getComputedStyle(dom, '');

            // why the dom.style lookup? It is not true that "style == computedStyle" as
            // well as the fact that 0/false are valid answers...
            result = (cs && cs[hook.name]); // || dom.style[hook.name];

            // Webkit returns rgb values for transparent.
            if (!supportsTransparentColor && result == 'rgba(0, 0, 0, 0)') {
                result = 'transparent';
            }
            // TODO - we should use isTransparent to handle this. The above is not a very
            // reliable technique depending on the intent (e.g., rgba(255,0,0,0) is also transparent)

            return result;
        },

        /**
         * Returns true if the value of the given property is visually transparent. This
         * may be due to a 'transparent' style value or an rgba value with 0 in the alpha
         * component.
         * @param {String} prop The style property whose value is to be tested.
         * @return {Boolean} True if the style property is visually transparent.
         */
        isTransparent: function (prop) {
            var value = this.getStyle(prop);
            return value ? transparentRe.test(value) : false;
        },

        /**
         * Wrapper for setting style properties, also takes single object parameter of multiple styles.
         * @param {String/Object} property The style property to be set, or an object of multiple styles.
         * @param {String} [value] The value to apply to the given property, or null if an object was passed.
         * @return {Ext.dom.Element} this
         */
        setStyle: function(prop, value) {
            var me = this,
                dom = me.dom,
                hooks = me.styleHooks,
                style = dom.style,
                valueFrom = Ext.valueFrom,
                name = prop,
                hook;

            // we don't promote the 2-arg form to object-form to avoid the overhead...
            if (typeof name == 'string') {
                hook = hooks[name];
                if (!hook) {
                    hooks[name] = hook = { name: Element.normalize(name) };
                }
                value = valueFrom(value, '');
                if (hook.set) {
                    hook.set(dom, value, me);
                } else {
                    style[hook.name] = value;
                }
            } else {
                for (name in prop) {
                    if (prop.hasOwnProperty(name)) {
                        hook = hooks[name];
                        if (!hook) {
                            hooks[name] = hook = { name: Element.normalize(name) };
                        }
                        value = valueFrom(prop[name], '');
                        if (hook.set) {
                            hook.set(dom, value, me);
                        } else {
                            style[hook.name] = value;
                        }
                    }
                }
            }

            return me;
        },

        /**
         * Returns the offset height of the element
         * @param {Boolean} [contentHeight] true to get the height minus borders and padding
         * @return {Number} The element's height
         */
        getHeight: function(contentHeight) {
            var dom = this.dom,
                height = contentHeight ? (dom.clientHeight - this.getPadding("tb")) : dom.offsetHeight;
            return height > 0 ? height: 0;
        },

        /**
         * Returns the offset width of the element
         * @param {Boolean} [contentWidth] true to get the width minus borders and padding
         * @return {Number} The element's width
         */
        getWidth: function(contentWidth) {
            var dom = this.dom,
                width = contentWidth ? (dom.clientWidth - this.getPadding("lr")) : dom.offsetWidth;
            return width > 0 ? width: 0;
        },

        /**
         * Set the width of this Element.
         * @param {Number/String} width The new width. This may be one of:
         *
         * - A Number specifying the new width in this Element's {@link #defaultUnit}s (by default, pixels).
         * - A String used to set the CSS width style. Animation may **not** be used.
         *
         * @param {Boolean/Object} [animate] true for the default animation or a standard Element animation config object
         * @return {Ext.dom.Element} this
         */
        setWidth: function(width) {
            var me = this;
                me.dom.style.width = Element.addUnits(width);
            return me;
        },

        /**
         * Set the height of this Element.
         *
         *     // change the height to 200px and animate with default configuration
         *     Ext.fly('elementId').setHeight(200, true);
         *
         *     // change the height to 150px and animate with a custom configuration
         *     Ext.fly('elId').setHeight(150, {
         *         duration : .5, // animation will have a duration of .5 seconds
         *         // will change the content to "finished"
         *         callback: function(){ this.{@link #update}("finished"); }
         *     });
         *
         * @param {Number/String} height The new height. This may be one of:
         *
         * - A Number specifying the new height in this Element's {@link #defaultUnit}s (by default, pixels.)
         * - A String used to set the CSS height style. Animation may **not** be used.
         *
         * @param {Boolean/Object} [animate] true for the default animation or a standard Element animation config object
         * @return {Ext.dom.Element} this
         */
        setHeight: function(height) {
            var me = this;
                me.dom.style.height = Element.addUnits(height);
            return me;
        },

        /**
         * Gets the width of the border(s) for the specified side(s)
         * @param {String} side Can be t, l, r, b or any combination of those to add multiple values. For example,
         * passing `'lr'` would get the border **l**eft width + the border **r**ight width.
         * @return {Number} The width of the sides passed added together
         */
        getBorderWidth: function(side){
            return this.addStyles(side, borders);
        },

        /**
         * Gets the width of the padding(s) for the specified side(s)
         * @param {String} side Can be t, l, r, b or any combination of those to add multiple values. For example,
         * passing `'lr'` would get the padding **l**eft + the padding **r**ight.
         * @return {Number} The padding of the sides passed added together
         */
        getPadding: function(side){
            return this.addStyles(side, paddings);
        },

        margins : margins,

        /**
         * More flexible version of {@link #setStyle} for setting style properties.
         * @param {String/Object/Function} styles A style specification string, e.g. "width:100px", or object in the form {width:"100px"}, or
         * a function which returns such a specification.
         * @return {Ext.dom.Element} this
         */
        applyStyles: function(styles) {
            if (styles) {
                var i,
                    len,
                    dom = this.dom;

                if (typeof styles == 'function') {
                    styles = styles.call();
                }
                if (typeof styles == 'string') {
                    styles = Ext.util.Format.trim(styles).split(/\s*(?::|;)\s*/);
                    for (i = 0, len = styles.length; i < len;) {
                        dom.style[Element.normalize(styles[i++])] = styles[i++];
                    }
                }
                else if (typeof styles == 'object') {
                    this.setStyle(styles);
                }
            }
        },

        /**
         * Set the size of this Element. If animation is true, both width and height will be animated concurrently.
         * @param {Number/String} width The new width. This may be one of:
         *
         * - A Number specifying the new width in this Element's {@link #defaultUnit}s (by default, pixels).
         * - A String used to set the CSS width style. Animation may **not** be used.
         * - A size object in the format `{width: widthValue, height: heightValue}`.
         *
         * @param {Number/String} height The new height. This may be one of:
         *
         * - A Number specifying the new height in this Element's {@link #defaultUnit}s (by default, pixels).
         * - A String used to set the CSS height style. Animation may **not** be used.
         *
         * @param {Boolean/Object} [animate] true for the default animation or a standard Element animation config object
         * @return {Ext.dom.Element} this
         */
        setSize: function(width, height) {
            var me = this,
                style = me.dom.style;

            if (Ext.isObject(width)) {
                // in case of object from getSize()
                height = width.height;
                width = width.width;
            }

            style.width = Element.addUnits(width);
            style.height = Element.addUnits(height);
            return me;
        },

        /**
         * Returns the dimensions of the element available to lay content out in.
         *
         * If the element (or any ancestor element) has CSS style `display: none`, the dimensions will be zero.
         *
         * Example:
         *
         *     var vpSize = Ext.getBody().getViewSize();
         *
         *     // all Windows created afterwards will have a default value of 90% height and 95% width
         *     Ext.Window.override({
         *         width: vpSize.width * 0.9,
         *         height: vpSize.height * 0.95
         *     });
         *     // To handle window resizing you would have to hook onto onWindowResize.
         *
         * getViewSize utilizes clientHeight/clientWidth which excludes sizing of scrollbars.
         * To obtain the size including scrollbars, use getStyleSize
         *
         * Sizing of the document body is handled at the adapter level which handles special cases for IE and strict modes, etc.
         *
         * @return {Object} Object describing width and height.
         * @return {Number} return.width
         * @return {Number} return.height
         */
        getViewSize: function() {
            var doc = document,
                dom = this.dom;

            if (dom == doc || dom == doc.body) {
                return {
                    width: Element.getViewportWidth(),
                    height: Element.getViewportHeight()
                };
            }
            else {
                return {
                    width: dom.clientWidth,
                    height: dom.clientHeight
                };
            }
        },

        /**
         * Returns the size of the element.
         * @param {Boolean} [contentSize] true to get the width/size minus borders and padding
         * @return {Object} An object containing the element's size:
         * @return {Number} return.width
         * @return {Number} return.height
         */
        getSize: function(contentSize) {
            var dom = this.dom;
            return {
                width: Math.max(0, contentSize ? (dom.clientWidth - this.getPadding("lr")) : dom.offsetWidth),
                height: Math.max(0, contentSize ? (dom.clientHeight - this.getPadding("tb")) : dom.offsetHeight)
            };
        },

        /**
         * Forces the browser to repaint this element
         * @return {Ext.dom.Element} this
         */
        repaint: function(){
            var dom = this.dom;
            this.addCls(Ext.baseCSSPrefix + 'repaint');
            setTimeout(function(){
                Ext.fly(dom).removeCls(Ext.baseCSSPrefix + 'repaint');
            }, 1);
            return this;
        },

        /**
         * Returns an object with properties top, left, right and bottom representing the margins of this element unless sides is passed,
         * then it returns the calculated width of the sides (see getPadding)
         * @param {String} [sides] Any combination of l, r, t, b to get the sum of those sides
         * @return {Object/Number}
         */
        getMargin: function(side){
            var me = this,
                hash = {t:"top", l:"left", r:"right", b: "bottom"},
                o = {},
                key;

            if (!side) {
                for (key in me.margins){
                    o[hash[key]] = parseFloat(me.getStyle(me.margins[key])) || 0;
                }
                return o;
            } else {
                return me.addStyles.call(me, side, me.margins);
            }
        },

        /**
         * Puts a mask over this element to disable user interaction. Requires core.css.
         * This method can only be applied to elements which accept child nodes.
         * @param {String} [msg] A message to display in the mask
         * @param {String} [msgCls] A css class to apply to the msg element
         */
        mask: function(msg, msgCls, transparent) {
            var me = this,
                dom = me.dom,
                el = Ext.Element.data(dom, 'mask'),
                mask,
                size,
                cls = '';

            me.addCls('x-masked');
            if (me.getStyle("position") == "static") {
                me.addCls('x-masked-relative');
            }
            if (el) {
                el.remove();
            }
            if (Ext.isString(msgCls) && !Ext.isEmpty(msgCls)) {
                cls = ' ' + msgCls;
            }
            else {
                if (msgCls) {
                    cls = ' x-mask-gray';
                }
            }

            mask = me.createChild({
                cls: 'x-mask' + ((transparent !== false) ? '' : ' x-mask-gray'),
                html: msg ? ('<div class="' + (msgCls || 'x-mask-message') + '">' + msg + '</div>') : ''
            });

            size = me.getSize();

            Ext.Element.data(dom, 'mask', mask);

            if (dom === document.body) {
                size.height = window.innerHeight;
                if (me.orientationHandler) {
                    Ext.EventManager.unOrientationChange(me.orientationHandler, me);
                }

                me.orientationHandler = function() {
                    size = me.getSize();
                    size.height = window.innerHeight;
                    mask.setSize(size);
                };

                Ext.EventManager.onOrientationChange(me.orientationHandler, me);
            }
            mask.setSize(size);
            if (Ext.is.iPad) {
                Ext.repaint();
            }
        },

        /**
         * Removes a previously applied mask.
         */
        unmask: function() {
            var me = this,
                dom = me.dom,
                mask = Ext.Element.data(dom, 'mask');

            if (mask) {
                mask.remove();
                Ext.Element.data(dom, 'mask', undefined);
            }
            me.removeCls(['x-masked', 'x-masked-relative']);

            if (dom === document.body) {
                Ext.EventManager.unOrientationChange(me.orientationHandler, me);
                delete me.orientationHandler;
            }
        }
    });

    /**
     * Creates mappings for 'margin-before' to 'marginLeft' (etc.) given the output
     * map and an ordering pair (e.g., ['left', 'right']). The ordering pair is in
     * before/after order.
     */
    Element.populateStyleMap = function (map, order) {
        var baseStyles = ['margin-', 'padding-', 'border-width-'],
            beforeAfter = ['before', 'after'],
            index, style, name, i;

        for (index = baseStyles.length; index--; ) {
            for (i = 2; i--; ) {
                style = baseStyles[index] + beforeAfter[i]; // margin-before
                // ex: maps margin-before and marginBefore to marginLeft
                map[Element.normalize(style)] = map[style] = {
                    name: Element.normalize(baseStyles[index] + order[i])
                };
            }
        }
    };
})();

Ext.onReady(function () {
    var view = document.defaultView,
        Element = Ext.dom.AbstractElement,
        supports = Ext.supports;

    function fixRightMargin (dom) {
        var cs = view.getComputedStyle(dom, ''),
            result = cs ? cs.marginRight : null,
            style, display;

        // Ignore cases when the margin is correctly reported as 0, the bug only shows
        // numbers larger.
        if (result != '0px') {
            style = dom.style;
            display = style.display;
            style.display = 'inline-block';
            result = view.getComputedStyle(dom, null).marginRight;
            style.display = display;
        }

        return result;
    }

    function fixRightMarginAndInputFocus (dom) {
        var cs = view.getComputedStyle(dom, ''),
            result = cs ? cs.marginRight : null,
            style, cleaner, display;

        if (result != '0px') {
            style = dom.style;
            cleaner = Element.getRightMarginFixCleaner(dom);
            display = style.display;
            style.display = 'inline-block';
            result = view.getComputedStyle(dom, '').marginRight;
            style.display = display;
            cleaner();
        }

        return result;
    }

    var styleHooks = Element.prototype.styleHooks;

    // Populate the LTR flavors of margin-before et.al. (see Ext.rtl.AbstractElement):
    Element.populateStyleMap(styleHooks, ['left', 'right']);

    // Ext.supports needs to be initialized (we run very early in the onready sequence),
    // but it is OK to call Ext.supports.init() more times than necessary...
    if (supports.init) {
        supports.init();
    }

    // Fix bug caused by this: https://bugs.webkit.org/show_bug.cgi?id=13343
    if (!supports.RightMargin) {
        styleHooks['margin-right'] = styleHooks.marginRight = {
            name: 'marginRight',
            // TODO - Touch should use conditional compilation here or ensure that the
            //      underlying Ext.supports flags are set correctly...
            get: (supports.DisplayChangeInputSelectionBug || supports.DisplayChangeTextAreaSelectionBug) ?
                    fixRightMarginAndInputFocus : fixRightMargin
        };
    }
});

/**
 * @class Ext.dom.AbstractElement
 */
Ext.dom.AbstractElement.override({
    /**
     * Looks at this node and then at parent nodes for a match of the passed simple selector (e.g. div.some-class or span:first-child)
     * @param {String} selector The simple selector to test
     * @param {Number/String/HTMLElement/Ext.Element} maxDepth (optional)
     * The max depth to search as a number or element (defaults to 50 || document.body)
     * @param {Boolean} returnEl (optional) True to return a Ext.Element object instead of DOM node
     * @return {HTMLElement} The matching DOM node (or null if no match was found)
     */
    findParent: function(simpleSelector, maxDepth, returnEl) {
        var p = this.dom,
            b = document.body,
            depth = 0,
            stopEl;

        maxDepth = maxDepth || 50;
        if (isNaN(maxDepth)) {
            stopEl = Ext.getDom(maxDepth);
            maxDepth = Number.MAX_VALUE;
        }
        while (p && p.nodeType == 1 && depth < maxDepth && p != b && p != stopEl) {
            if (Ext.DomQuery.is(p, simpleSelector)) {
                return returnEl ? Ext.get(p) : p;
            }
            depth++;
            p = p.parentNode;
        }
        return null;
    },

    /**
     * Looks at parent nodes for a match of the passed simple selector (e.g. div.some-class or span:first-child)
     * @param {String} selector The simple selector to test
     * @param {Number/String/HTMLElement/Ext.Element} maxDepth (optional)
     * The max depth to search as a number or element (defaults to 10 || document.body)
     * @param {Boolean} returnEl (optional) True to return a Ext.Element object instead of DOM node
     * @return {HTMLElement} The matching DOM node (or null if no match was found)
     */
    findParentNode: function(simpleSelector, maxDepth, returnEl) {
        var p = Ext.fly(this.dom.parentNode, '_internal');
        return p ? p.findParent(simpleSelector, maxDepth, returnEl) : null;
    },

    /**
     * Walks up the dom looking for a parent node that matches the passed simple selector (e.g. div.some-class or span:first-child).
     * This is a shortcut for findParentNode() that always returns an Ext.dom.Element.
     * @param {String} selector The simple selector to test
     * @param {Number/String/HTMLElement/Ext.Element} maxDepth (optional)
     * The max depth to search as a number or element (defaults to 10 || document.body)
     * @return {Ext.dom.Element} The matching DOM node (or null if no match was found)
     */
    up: function(simpleSelector, maxDepth) {
        return this.findParentNode(simpleSelector, maxDepth, true);
    },

    /**
     * Creates a {@link Ext.CompositeElement} for child nodes based on the passed CSS selector (the selector should not contain an id).
     * @param {String} selector The CSS selector
     * @return {Ext.CompositeElement} The composite element
     */
    select: function(selector, composite) {
        return Ext.dom.Element.select(selector, this.dom, composite);
    },

    /**
     * Selects child nodes based on the passed CSS selector (the selector should not contain an id).
     * @param {String} selector The CSS selector
     * @return {HTMLElement[]} An array of the matched nodes
     */
    query: function(selector) {
        return Ext.DomQuery.select(selector, this.dom);
    },

    /**
     * Selects a single child at any depth below this element based on the passed CSS selector (the selector should not contain an id).
     * @param {String} selector The CSS selector
     * @param {Boolean} returnDom (optional) True to return the DOM node instead of Ext.dom.Element (defaults to false)
     * @return {HTMLElement/Ext.dom.Element} The child Ext.dom.Element (or DOM node if returnDom = true)
     */
    down: function(selector, returnDom) {
        var n = Ext.DomQuery.selectNode(selector, this.dom);
        return returnDom ? n : Ext.get(n);
    },

    /**
     * Selects a single *direct* child based on the passed CSS selector (the selector should not contain an id).
     * @param {String} selector The CSS selector
     * @param {Boolean} returnDom (optional) True to return the DOM node instead of Ext.dom.Element (defaults to false)
     * @return {HTMLElement/Ext.dom.Element} The child Ext.dom.Element (or DOM node if returnDom = true)
     */
    child: function(selector, returnDom) {
        var node,
            me = this,
            id;
        id = Ext.get(me).id;
        // Escape . or :
        id = id.replace(/[\.:]/g, "\\$0");
        node = Ext.DomQuery.selectNode('#' + id + " > " + selector, me.dom);
        return returnDom ? node : Ext.get(node);
    },

     /**
     * Gets the parent node for this element, optionally chaining up trying to match a selector
     * @param {String} selector (optional) Find a parent node that matches the passed simple selector
     * @param {Boolean} returnDom (optional) True to return a raw dom node instead of an Ext.dom.Element
     * @return {Ext.dom.Element/HTMLElement} The parent node or null
     */
    parent: function(selector, returnDom) {
        return this.matchNode('parentNode', 'parentNode', selector, returnDom);
    },

     /**
     * Gets the next sibling, skipping text nodes
     * @param {String} selector (optional) Find the next sibling that matches the passed simple selector
     * @param {Boolean} returnDom (optional) True to return a raw dom node instead of an Ext.dom.Element
     * @return {Ext.dom.Element/HTMLElement} The next sibling or null
     */
    next: function(selector, returnDom) {
        return this.matchNode('nextSibling', 'nextSibling', selector, returnDom);
    },

    /**
     * Gets the previous sibling, skipping text nodes
     * @param {String} selector (optional) Find the previous sibling that matches the passed simple selector
     * @param {Boolean} returnDom (optional) True to return a raw dom node instead of an Ext.dom.Element
     * @return {Ext.dom.Element/HTMLElement} The previous sibling or null
     */
    prev: function(selector, returnDom) {
        return this.matchNode('previousSibling', 'previousSibling', selector, returnDom);
    },


    /**
     * Gets the first child, skipping text nodes
     * @param {String} selector (optional) Find the next sibling that matches the passed simple selector
     * @param {Boolean} returnDom (optional) True to return a raw dom node instead of an Ext.dom.Element
     * @return {Ext.dom.Element/HTMLElement} The first child or null
     */
    first: function(selector, returnDom) {
        return this.matchNode('nextSibling', 'firstChild', selector, returnDom);
    },

    /**
     * Gets the last child, skipping text nodes
     * @param {String} selector (optional) Find the previous sibling that matches the passed simple selector
     * @param {Boolean} returnDom (optional) True to return a raw dom node instead of an Ext.dom.Element
     * @return {Ext.dom.Element/HTMLElement} The last child or null
     */
    last: function(selector, returnDom) {
        return this.matchNode('previousSibling', 'lastChild', selector, returnDom);
    },

    matchNode: function(dir, start, selector, returnDom) {
        if (!this.dom) {
            return null;
        }

        var n = this.dom[start];
        while (n) {
            if (n.nodeType == 1 && (!selector || Ext.DomQuery.is(n, selector))) {
                return !returnDom ? Ext.get(n) : n;
            }
            n = n[dir];
        }
        return null;
    },

    isAncestor: function(element) {
        return this.self.isAncestor.call(this.self, this.dom, element);
    }
});


