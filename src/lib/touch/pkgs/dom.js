/*

This file is part of Sencha Touch 2

Copyright (c) 2012 Sencha Inc

Contact:  http://www.sencha.com/contact

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance with the Commercial Software License Agreement provided with the Software or, alternatively, in accordance with the terms contained in a written agreement between you and Sencha.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * @class Ext.EventManager
 *
 * This object has been deprecated in Sencha Touch 2.0.0. Please refer to the method documentation for specific alternatives.
 *
 * @deprecated 2.0.0
 * @singleton
 * @private
 */

//<deprecated product=touch since=2.0>
Ext.ns('Ext.core');
Ext.core.EventManager =
Ext.EventManager = {
    /**
     * Appends an event handler to an element.  The shorthand version {@link #on} is equivalent.  Typically you will
     * use {@link Ext.Element#addListener} directly on an Element in favor of calling this version.
     * @param {String/HTMLElement} el The html element or id to assign the event handler to.
     * @param {String} eventName The name of the event to listen for.
     * @param {Function} handler The handler function the event invokes. This function is passed
     * the following parameters:<ul>
     * <li>evt : EventObject<div class="sub-desc">The {@link Ext.EventObject EventObject} describing the event.</div></li>
     * <li>t : Element<div class="sub-desc">The {@link Ext.Element Element} which was the target of the event.
     * Note that this may be filtered by using the <tt>delegate</tt> option.</div></li>
     * <li>o : Object<div class="sub-desc">The options object from the addListener call.</div></li>
     * </ul>
     * @param {Object} scope (optional) The scope (<b><code>this</code></b> reference) in which the handler function is executed. <b>Defaults to the Element</b>.
     * @param {Object} options (optional) An object containing handler configuration properties.
     * This may contain any of the following properties:<ul>
     * <li>scope : Object<div class="sub-desc">The scope (<b><code>this</code></b> reference) in which the handler function is executed. <b>Defaults to the Element</b>.</div></li>
     * <li>delegate : String<div class="sub-desc">A simple selector to filter the target or look for a descendant of the target</div></li>
     * <li>stopEvent : Boolean<div class="sub-desc">True to stop the event. That is stop propagation, and prevent the default action.</div></li>
     * <li>preventDefault : Boolean<div class="sub-desc">True to prevent the default action</div></li>
     * <li>stopPropagation : Boolean<div class="sub-desc">True to prevent event propagation</div></li>
     * <li>normalized : Boolean<div class="sub-desc">False to pass a browser event to the handler function instead of an Ext.EventObject</div></li>
     * <li>delay : Number<div class="sub-desc">The number of milliseconds to delay the invocation of the handler after te event fires.</div></li>
     * <li>single : Boolean<div class="sub-desc">True to add a handler to handle just the next firing of the event, and then remove itself.</div></li>
     * <li>buffer : Number<div class="sub-desc">Causes the handler to be scheduled to run in an {@link Ext.util.DelayedTask} delayed
     * by the specified number of milliseconds. If the event fires again within that time, the original
     * handler is <em>not</em> invoked, but the new handler is scheduled in its place.</div></li>
     * <li>target : Element<div class="sub-desc">Only call the handler if the event was fired on the target Element, <i>not</i> if the event was bubbled up from a child node.</div></li>
     * </ul><br>
     * <p>See {@link Ext.Element#addListener} for examples of how to use these options.</p>
     * @deprecated 2.0.0 Please use {@link Ext.dom.Element#addListener addListener} on an instance of Ext.Element instead.
     */
    addListener: function(element, eventName, fn, scope, options) {
        //<debug warn>
        Ext.Logger.deprecate("Ext.EventManager.addListener is deprecated, use addListener() directly from an instance of Ext.Element instead", 2);
        //</debug>
        element.on(eventName, fn, scope, options);
    },

    /**
     * Removes an event handler from an element.  The shorthand version {@link #un} is equivalent.  Typically
     * you will use {@link Ext.Element#removeListener} directly on an Element in favor of calling this version.
     * @param {String/HTMLElement} el The id or html element from which to remove the listener.
     * @param {String} eventName The name of the event.
     * @param {Function} fn The handler function to remove. <b>This must be a reference to the function passed into the {@link #addListener} call.</b>
     * @param {Object} scope If a scope (<b><code>this</code></b> reference) was specified when the listener was added,
     * then this must refer to the same object.
     * @deprecated 2.0.0 Please use {@link Ext.dom.Element#removeListener removeListener} on an instance of Ext.Element instead.
     */
    removeListener: function(element, eventName, fn, scope) {
        //<debug warn>
        Ext.Logger.deprecate("Ext.EventManager.removeListener is deprecated, use removeListener() directly from an instance of Ext.Element instead", 2);
        //</debug>
        element.un(eventName, fn, scope);
    },

    /**
     * Removes all event handers from an element.  Typically you will use {@link Ext.Element#clearListeners}
     * directly on an Element in favor of calling this version.
     * @param {String/HTMLElement} el The id or html element from which to remove all event handlers.
     * @deprecated 2.0.0 Please use {@link Ext.dom.Element#clearListeners clearListeners} on an instance of Ext.Element instead.
     */
    removeAll: function(element){
        //<debug warn>
        Ext.Logger.deprecate("Ext.EventManager.removeAll is deprecated, use clearListeners() directly from an instance of Ext.Element instead", 3);
        //</debug>
        Ext.get(element).clearListeners();
    },

    /**
     * Adds a listener to be notified when the document is ready (before onload and before images are loaded).
     * @removed 2.0.0 Please use {@link Ext#onReady onReady}
     */
    onDocumentReady: function() {
        //<debug warn>
        Ext.Logger.deprecate("Ext.EventManager.onDocumentReady has been removed, please use Ext.onReady instead", 3);
        //</debug>
    },

    /**
     * Adds a listener to be notified when the browser window is resized and provides resize event buffering (50 milliseconds),
     * passes new viewport width and height to handlers.
     * @param {Function} fn      The handler function the window resize event invokes.
     * @param {Object}   scope   The scope (<code>this</code> reference) in which the handler function executes. Defaults to the browser window.
     * @param {Boolean}  options Options object as passed to {@link Ext.Element#addListener}
     * @deprecated 2.0.0 Please listen to the {@link Ext.Viewport#event-resize resize} on Ext.Viewport instead.
     */
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

/**
* Appends an event handler to an element.  Shorthand for {@link #addListener}.
* @param {String/HTMLElement} el The html element or id to assign the event handler to
* @param {String} eventName The name of the event to listen for.
* @param {Function} handler The handler function the event invokes.
* @param {Object} scope (optional) (<code>this</code> reference) in which the handler function executes. <b>Defaults to the Element</b>.
* @param {Object} options (optional) An object containing standard {@link #addListener} options
* @member Ext.EventManager
* @method on
* @deprecated 2.0.0 Please use {@link Ext.dom.Element#addListener addListener} on an instance of Ext.Element instead.
*/
Ext.EventManager.on = Ext.EventManager.addListener;

/**
 * Removes an event handler from an element.  Shorthand for {@link #removeListener}.
 * @param {String/HTMLElement} el The id or html element from which to remove the listener.
 * @param {String} eventName The name of the event.
 * @param {Function} fn The handler function to remove. <b>This must be a reference to the function passed into the {@link #on} call.</b>
 * @param {Object} scope If a scope (<b><code>this</code></b> reference) was specified when the listener was added,
 * then this must refer to the same object.
 * @member Ext.EventManager
 * @method un
 * @deprecated 2.0.0 Please use {@link Ext.dom.Element#removeListener removeListener} on an instance of Ext.Element instead.
 */
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
Ext.setVersion('touch', '2.0.0.rc2');

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
            mask.destroy();
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
     * intended for arguments of type {@link Ext.Element} and {@link Ext.Component}.
     * Any number of elements and/or components can be passed into this function in a single
     * call as separate arguments.
     * @param {Mixed...} args An {@link Ext.Element}, {@link Ext.Component}, or an Array of either of these to destroy
     */
    destroy: function() {
        var args = arguments,
            ln = args.length,
            i, item;

        for (i = 0; i < ln; i++) {
            item = args[i];

            if (item) {
                if (Ext.isArray(item)) {
                    this.destroy.apply(this, item);
                }
                else if (Ext.isFunction(item.destroy)) {
                    item.destroy();
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
            },
            componentSize: {
                xclass: 'Ext.event.publisher.ComponentSize'
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
     * @param {String} phoneStartupScreen
     * Sets the apple-touch-icon `<meta>` tag so your home screen application can have a startup screen on phones.
     * Please look here for more information: http://developer.apple.com/library/IOs/#documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
     *
     * @param {String} tabletStartupScreen
     * Sets the apple-touch-icon `<meta>` tag so your home screen application can have a startup screen on tablets.
     * Please look here for more information: http://developer.apple.com/library/IOs/#documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
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

        Ext.require(['Ext.event.Dispatcher', 'Ext.MessageBox']);

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

                    if (!scope) {
                        scope = viewport;
                    }

                    Ext.require(requires, function() {
                        Ext.Viewport.on('ready', callback, null, {single: true});
                    });
                }
                else {
                    Ext.require(requires, callback);
                }
            });
        });

        /*
         * Note: previously we only added these icon meta tags to iOS devices but as Android 2.1+ reads the same tags
         * we now add them if they're defined
         */
        if (!document.body) {
            var phoneIcon = config.phoneIcon,
                tabletIcon = config.tabletIcon,
                tabletStartupScreen = config.tabletStartupScreen,
                statusBarStyle = config.statusBarStyle,
                phoneStartupScreen = config.phoneStartupScreen,
                isIpad = Ext.os.is.iPad,
                retina = window.devicePixelRatio > 1 ? true : false;

            // Inject meta viewport tag
            document.write(
                '<meta id="extViewportMeta" ' +
                       'name="viewport" ' +
                       'content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">');
            document.write('<meta name="apple-mobile-web-app-capable" content="yes">');
            document.write('<meta name="apple-touch-fullscreen" content="yes">');

            //status bar style
            if (Ext.isString(statusBarStyle)) {
                document.write('<meta name="apple-mobile-web-app-status-bar-style" content="' + statusBarStyle + '">');
            }

            //startup screens
            if (tabletStartupScreen && isIpad) {
                document.write('<link rel="apple-touch-startup-image" href="' + tabletStartupScreen + '">');
            }

            if (phoneStartupScreen && !isIpad) {
                document.write('<link rel="apple-touch-startup-image" href="' + phoneStartupScreen + '">');
            }

            // icon
            if (Ext.isString(icon) || Ext.isString(phoneIcon) || Ext.isString(tabletIcon)) {
                icon = {
                    '57': phoneIcon || tabletIcon || icon,
                    '72': tabletIcon || phoneIcon || icon,
                    '114': phoneIcon || tabletIcon || icon
                };
            }

            precomposed = (config.glossOnIcon === false) ? '-precomposed' : '';

            if (icon) {
                var icon72 = icon['72'],
                    icon57 = icon['57'],
                    icon114 = icon['114'],
                    iconString = '<link rel="apple-touch-icon' + precomposed;

                // If we are on an iPad and we have a 72px icon defined, use it
                if (isIpad && (icon72 || icon57 || icon114)) {
                    document.write(iconString + '" sizes="72x72" href="' + (icon72 || icon114 || icon57) + '">');
                } else {
                    if (retina && (icon72 || icon114)) {
                        // Other wise, check if we are a retina device and we have a 114 icon
                        document.write(iconString + '" sizes="114x114" href="' + (icon114 || icon72) + '">');
                    } else {
                        // And resort to the default 57px icon
                        document.write(iconString + '" href="' + icon57 + '">');
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
     * @param {String} phoneStartupScreen
     * Sets the apple-touch-icon `<meta>` tag so your home screen application can have a startup screen on phones.
     * Please look here for more information: http://developer.apple.com/library/IOs/#documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
     *
     * @param {String} tabletStartupScreen
     * Sets the apple-touch-icon `<meta>` tag so your home screen application can have a startup screen on tablets.
     * Please look here for more information: http://developer.apple.com/library/IOs/#documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html
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
        var appName = config.name,
            onReady, scope;

        if (!config) {
            config = {};
        }

        if (!Ext.Loader.config.paths[appName]) {
            Ext.Loader.setPath(appName, config.appFolder || 'app');
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
    },

    /**
     * @private
     * @param config
     * @param callback
     * @member Ext
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
     * @member Ext
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
            else if (Ext.isObject(config) && 'type' in config) {
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
     * @member Ext
     */
    deprecateClassMember: function(cls, oldName, newName, message) {
        return this.deprecateProperty(cls.prototype, oldName, newName, message);
    },

    /**
     * @private
     * @member Ext
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
     * @member Ext
     */
    deprecateProperty: function(object, oldName, newName, message) {
        if (!message) {
            message = "'" + oldName + "' is deprecated";
        }
        if (newName) {
            message += ", please use '" + newName + "' instead";
        }

        if (newName) {
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
                },
                configurable: true
            });
        }
    },

    /**
     * @private
     * @member Ext
     */
    deprecatePropertyValue: function(object, name, value, message) {
        Ext.Object.defineProperty(object, name, {
            get: function() {
                //<debug warn>
                Ext.Logger.deprecate(message, 1);
                //</debug>
                return value;
            },
            configurable: true
        });
    },

    /**
     * @private
     * @member Ext
     */
    deprecateMethod: function(object, name, method, message) {
        object[name] = function() {
            //<debug warn>
            Ext.Logger.deprecate(message, 2);
            //</debug>
            if (method) {
                return method.apply(this, arguments);
            }
        };
    },

    /**
     * @private
     * @member Ext
     */
    deprecateClassMethod: function(cls, name, method, message) {
        if (typeof name != 'string') {
            var from, to;

            for (from in name) {
                if (name.hasOwnProperty(from)) {
                    to = name[from];
                    Ext.deprecateClassMethod(cls, from, to);
                }
            }
            return;
        }

        var isLateBinding = typeof method == 'string',
            member;

        if (!message) {
            message = "'" + name + "()' is deprecated, please use '" + (isLateBinding ? method : method.name) +
                "()' instead";
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

        if (name in cls.prototype) {
            Ext.Object.defineProperty(cls.prototype, name, {
                value: null,
                writable: true,
                configurable: true
            });
        }

        cls.addMember(name, member);
    },

    //<debug>
    /**
     * Useful snippet to show an exact, narrowed-down list of top-level Components that are not yet destroyed.
     * @private
     */
    showLeaks: function() {
        var map = Ext.ComponentManager.all.map,
            leaks = [],
            parent;

        Ext.Object.each(map, function(id, component) {
            while ((parent = component.getParent()) && map.hasOwnProperty(parent.getId())) {
                component = parent;
            }

            if (leaks.indexOf(component) === -1) {
                leaks.push(component);
            }
        });

        console.log(leaks);
    },
    //</debug>

    /**
     * True when the document is fully initialized and ready for action
     * @type Boolean
     * @member Ext
     */
    isReady : false,

    /**
     * @private
     * @member Ext
     */
    readyListeners: [],

    /**
     * @private
     * @member Ext
     */
    triggerReady: function() {
        var listeners = Ext.readyListeners,
            i, ln, listener;

        if (!Ext.isReady) {
            Ext.isReady = true;

            for (i = 0,ln = listeners.length; i < ln; i++) {
                listener = listeners[i];
                listener.fn.call(listener.scope);
            }
            delete Ext.readyListeners;
        }
    },

    /**
     * @private
     * @member Ext
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

            if (Ext.browser.is.PhoneGap && !Ext.os.is.Desktop) {
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
     * Calls function after specified delay, or right away when delay == 0.
     * @param {Function} callback The callback to execute
     * @param {Object} scope (optional) The scope to execute in
     * @param {Array} args (optional) The arguments to pass to the function
     * @param {Number} delay (optional) Pass a number to delay the call by a number of milliseconds.
     * @member Ext
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
Ext.deprecateMethod(Ext, 'getOrientation', function() {
    return Ext.Viewport.getOrientation();
}, "Ext.getOrientation() is deprecated, use Ext.Viewport.getOrientation() instead");

Ext.deprecateMethod(Ext, 'log', function(message) {
    return Ext.Logger.log(message);
}, "Ext.log() is deprecated, please use Ext.Logger.log() instead");

/**
 * @member Ext.Function
 * @method createDelegate
 * @inheritdoc Ext.Function#bind
 * @deprecated 2.0.0
 * Please use {@link Ext.Function#bind bind} instead
 */
Ext.deprecateMethod(Ext.Function, 'createDelegate', Ext.Function.bind, "Ext.createDelegate() is deprecated, please use Ext.Function.bind() instead");

/**
 * @member Ext
 * @method createInterceptor
 * @inheritdoc Ext.Function#createInterceptor
 * @deprecated 2.0.0
 * Please use {@link Ext.Function#createInterceptor createInterceptor} instead
 */
Ext.deprecateMethod(Ext, 'createInterceptor', Ext.Function.createInterceptor, "Ext.createInterceptor() is deprecated, " +
    "please use Ext.Function.createInterceptor() instead");

/**
 * @member Ext
 * @property {Boolean} SSL_SECURE_URL
 * URL to a blank file used by Ext when in secure mode for iframe src and onReady
 * src to prevent the IE insecure content warning.
 * @removed 2.0.0
 */
Ext.deprecateProperty(Ext, 'SSL_SECURE_URL', null, "Ext.SSL_SECURE_URL has been removed");

/**
 * @member Ext
 * @property {Boolean} enableGarbageCollector
 * True to automatically uncache orphaned Ext.Elements periodically.
 * @removed 2.0.0
 */
Ext.deprecateProperty(Ext, 'enableGarbageCollector', null, "Ext.enableGarbageCollector has been removed");

/**
 * @member Ext
 * @property {Boolean} enableListenerCollection
 * True to automatically purge event listeners during garbageCollection.
 * @removed 2.0.0
 */
Ext.deprecateProperty(Ext, 'enableListenerCollection', null, "Ext.enableListenerCollection has been removed");

/**
 * @member Ext
 * @property {Boolean} isSecure
 * True if the page is running over SSL.
 * @removed 2.0.0 Please use {@link Ext.env.Browser#isSecure} instead
 */
Ext.deprecateProperty(Ext, 'isSecure', null, "Ext.enableListenerCollection has been removed, please use Ext.env.Browser.isSecure instead");

/**
 * @member Ext
 * @method dispatch
 * Dispatches a request to a controller action.
 * @removed 2.0.0 Please use {@link Ext.app.Application#dispatch} instead
 */
Ext.deprecateMethod(Ext, 'dispatch', null, "Ext.dispatch() is deprecated, please use Ext.app.Application.dispatch() instead");

/**
 * @member Ext
 * @method getOrientation
 * Returns the current orientation of the mobile device.
 * @removed 2.0.0
 * Please use {@link Ext.Viewport#getOrientation getOrientation} instead
 */
Ext.deprecateMethod(Ext, 'getOrientation', null, "Ext.getOrientation() has been removed, " +
    "please use Ext.Viewport.getOrientation() instead");

/**
 * @member Ext
 * @method reg
 * Registers a new xtype.
 * @removed 2.0.0
 */
Ext.deprecateMethod(Ext, 'reg', null, "Ext.reg() has been removed");

/**
 * @member Ext
 * @method preg
 * Registers a new ptype.
 * @removed 2.0.0
 */
Ext.deprecateMethod(Ext, 'preg', null, "Ext.preg() has been removed");

/**
 * @member Ext
 * @method redirect
 * Dispatches a request to a controller action, adding to the History stack
 * and updating the page url as necessary.
 * @removed 2.0.0
 */
Ext.deprecateMethod(Ext, 'redirect', null, "Ext.redirect() has been removed");

/**
 * @member Ext
 * @method regApplication
 * Creates a new Application class from the specified config object.
 * @removed 2.0.0
 */
Ext.deprecateMethod(Ext, 'regApplication', null, "Ext.regApplication() has been removed");

/**
 * @member Ext
 * @method regController
 * Creates a new Controller class from the specified config object.
 * @removed 2.0.0
 */
Ext.deprecateMethod(Ext, 'regController', null, "Ext.regController() has been removed");

/**
 * @member Ext
 * @method regLayout
 * Registers new layout type.
 * @removed 2.0.0
 */
Ext.deprecateMethod(Ext, 'regLayout', null, "Ext.regLayout() has been removed");

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
            chromeMobile: 'ChromeMobile',
            silk: 'Silk',
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
            webosbrowser: 'wOSBrowser/',
            chromeMobile: 'CrMo/',
            silk: 'Silk/'
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
        /**
         * @property {String}
         * Browser User Agent string.
         */
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

        // Facebook changes the userAgent when you view a website within their iOS app. For some reason, the strip out information
        // about the browser, so we have to detect that and fake it...
        if (userAgent.match(/FB/) && browserName == "Other") {
            browserName = browserNames.safari;
            engineName = engineNames.webkit;
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

        /**
         * @property {Boolean}
         * True if browser is using strict mode.
         */
        this.isStrict = document.compatMode == "CSS1Compat";

        /**
         * @property {Boolean}
         * True if page is running over SSL.
         */
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
            Ext.deprecatePropertyValue(Ext.is, name, flags[name], "Ext.is." + name + " is deprecated, " +
                "please use Ext.browser.is." + name + " instead");
        }
    }

    Ext.deprecatePropertyValue(Ext, 'isStrict', browserEnv.isStrict, "Ext.isStrict is deprecated, " +
        "please use Ext.browser.isStrict instead");
    Ext.deprecatePropertyValue(Ext, 'userAgent', browserEnv.userAgent, "Ext.userAgent is deprecated, " +
        "please use Ext.browser.userAgent instead");
    //</deprecated>
});

/**
 * Provide useful information about the current operating system environment. Access the global instance stored in
 * Ext.os. Example:
 *
 *     if (Ext.os.is.Windows) {
 *          // Windows specific code here
 *     }
 *
 *     if (Ext.os.is.iOS) {
 *          // iPad, iPod, iPhone, etc.
 *     }
 *
 *     console.log("Version " + Ext.os.version);
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
            android: '(Android |HTC_|Silk/)', // Some HTC devices ship with an OSX userAgent by default,
                                        // so we need to add a direct check for HTC_
            blackberry: 'BlackBerry(?:.*)Version\/',
            rimTablet: 'RIM Tablet OS ',
            webos: '(?:webOS|hpwOS)\/',
            bada: 'Bada\/'
        }
    },

    /**
     * A "hybrid" property, can be either accessed as a method call, i.e:
     *
     *     if (Ext.os.is('Android')) { ... }
     *
     * or as an object with boolean properties, i.e:
     *
     *     if (Ext.os.is.Android) { ... }
     *
     * Versions can be conveniently checked as well. For example:
     *
     *     if (Ext.os.is.Android2) { ... } // Equivalent to (Ext.os.is.Android && Ext.os.version.equals(2))
     *
     *     if (Ext.os.is.iOS32) { ... } // Equivalent to (Ext.os.is.iOS && Ext.os.version.equals(3.2))
     *
     * Note that only {@link Ext.Version#getMajor major component} and {@link Ext.Version#getShortVersion simplified}
     * value of the version are available via direct property checking. Supported values are: iOS, iPad, iPhone, iPod,
     * Android, WebOS, BlackBerry, Bada, MacOSX, Windows, Linux and Other
     * @param {String} value The OS name to check
     * @return {Boolean}
     */
    is: Ext.emptyFn,

    /**
     * @property {String} [name=null]
     * Read-only - the full name of the current operating system Possible values are: iOS, Android, WebOS, BlackBerry,
     * MacOSX, Windows, Linux and Other
     */
    name: null,

    /**
     * @property {Ext.Version} [version=null]
     * Read-only, refer to {@link Ext.Version}
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

                    // This is here because some HTC android devices show an OSX Snow Leopard userAgent by default.
                    // And the Kindle Fire doesn't have any indicator of Android as the OS in its User Agent
                    if (match[1] && (match[1] == "HTC_" || match[1] == "Silk/")) {
                        version = new Ext.Version("2.3");
                    } else {
                        version = new Ext.Version(match[match.length - 1]);
                    }

                    break;
                }
            }
        }

        if (!name) {
            name = names[(userAgent.toLowerCase().match(/mac|win|linux/) || ['other'])[0]];
            version = new Ext.Version('');
        }

        this.name = name;
        this.version = version;

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

    var navigation = Ext.global.navigator,
        userAgent = navigation.userAgent,
        osEnv, osName, deviceType;

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

    Ext.os = osEnv = new this(userAgent, navigation.platform);

    osName = osEnv.name;

    var search = window.location.search.match(/deviceType=(Tablet|Phone)/),
        nativeDeviceType = window.deviceType;

    // Override deviceType by adding a get variable of deviceType. NEEDED FOR DOCS APP.
    // E.g: example/kitchen-sink.html?deviceType=Phone
    if (search && search[1]) {
        deviceType = search[1];
    }
    else if (nativeDeviceType === 'iPhone') {
        deviceType = 'Phone';
    }
    else if (nativeDeviceType === 'iPad') {
        deviceType = 'Tablet';
    }
    else {
        if (!osEnv.is.Android && !osEnv.is.iOS && /Windows|Linux|MacOS/.test(osName)) {
            deviceType = 'Desktop';
        }
        else if (osEnv.is.iPad || osEnv.is.Android3 || (osEnv.is.Android4 && userAgent.search(/mobile/i) == -1)) {
            deviceType = 'Tablet';
        }
        else {
            deviceType = 'Phone';
        }
    }

    osEnv.setFlag(deviceType, true);
    osEnv.deviceType = deviceType;

    //<deprecated product=touch since=2.0>
    var flags = Ext.os.is,
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

    /**
     * @class Ext.is
     * Used to detect if the current browser supports a certain feature, and the type of the current browser.
     * @deprecated 2.0.0
     * Please refer to the {@link Ext.env.Browser}, {@link Ext.env.OS} and {@link Ext.feature.has} classes instead.
     */
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
         * True if the current device supports WebSockets.
         */
        WebSockets: function() {
            return 'WebSocket' in window;
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} Range
         * True if the current device supports [DOM document fragments.][1]
         *
         * [1]: https://developer.mozilla.org/en/DOM/range
         */
        Range: function() {
            return !!document.createRange;
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} CreateContextualFragment
         * True if the current device supports HTML fragment parsing using [range.createContextualFragment()][1].
         *
         * [1]: https://developer.mozilla.org/en/DOM/range.createContextualFragment
         */
        CreateContextualFragment: function() {
            var range = !!document.createRange ? document.createRange() : false;
            return range && !!range.createContextualFragment;
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} History
         * True if the current device supports history management with [history.pushState()][1].
         *
         * [1]: https://developer.mozilla.org/en/DOM/Manipulating_the_browser_history#The_pushState().C2.A0method
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
            // See https://sencha.jira.com/browse/TOUCH-1544
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
        },

        /**
         * @member Ext.feature.has
         * @property {Boolean} ClassList
         * True if document environment supports the HTML5 classList API.
         */
        ClassList: function() {
            return "classList" in this.getTestElement();
        }
    });

    //<deprecated product=touch since=2.0>
    /**
     * @class Ext.supports
     * Determines information about features are supported in the current environment.
     * @deprecated 2.0.0
     * Please use the {@link Ext.env.Browser}, {@link Ext.env.OS} and {@link Ext.feature.has} classes.
     */

    /**
     * @member Ext.supports
     * @property Transitions
     * @inheritdoc Ext.feature.has#CssTransitions
     * @deprecated 2.0.0 Please use {@link Ext.feature.has#CssTransitions} instead
     */
    Ext.deprecatePropertyValue(has, 'Transitions', has.CssTransitions,
                          "Ext.supports.Transitions is deprecated, please use Ext.feature.has.CssTransitions instead");

    /**
     * @member Ext.supports
     * @property SVG
     * @inheritdoc Ext.feature.has#Svg
     * @deprecated 2.0.0 Please use {@link Ext.feature.has#Svg} instead
     */
    Ext.deprecatePropertyValue(has, 'SVG', has.Svg,
                          "Ext.supports.SVG is deprecated, please use Ext.feature.has.Svg instead");

    /**
     * @member Ext.supports
     * @property VML
     * @inheritdoc Ext.feature.has#Vml
     * @deprecated 2.0.0 Please use {@link Ext.feature.has#Vml} instead
     */
    Ext.deprecatePropertyValue(has, 'VML', has.Vml,
                          "Ext.supports.VML is deprecated, please use Ext.feature.has.Vml instead");

    /**
     * @member Ext.supports
     * @property AudioTag
     * @inheritdoc Ext.feature.has#Audio
     * @deprecated 2.0.0 Please use {@link Ext.feature.has#Audio} instead
     */
    Ext.deprecatePropertyValue(has, 'AudioTag', has.Audio,
                          "Ext.supports.AudioTag is deprecated, please use Ext.feature.has.Audio instead");

    /**
     * @member Ext.supports
     * @property GeoLocation
     * @inheritdoc Ext.feature.has#Geolocation
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
 * @class Ext.DomQuery
 * @alternateClassName Ext.dom.Query
 *
 * Provides functionality to select elements on the page based on a CSS selector. All selectors, attribute filters and
 * pseudos below can be combined infinitely in any order. For example "div.foo:nth-child(odd)[@foo=bar].bar:first"
 * would be a perfectly valid selector.
 *
 * ## Element Selectors:
 *
 * * \* any element
 * * E an element with the tag E
 * * E F All descendent elements of E that have the tag F
 * * E > F or E/F all direct children elements of E that have the tag F
 * * E + F all elements with the tag F that are immediately preceded by an element with the tag E
 * * E ~ F all elements with the tag F that are preceded by a sibling element with the tag E
 *
 * ## Attribute Selectors:
 *
 * The use of @ and quotes are optional. For example, div[@foo='bar'] is also a valid attribute selector.
 *
 * * E[foo] has an attribute "foo"
 * * E[foo=bar] has an attribute "foo" that equals "bar"
 * * E[foo^=bar] has an attribute "foo" that starts with "bar"
 * * E[foo$=bar] has an attribute "foo" that ends with "bar"
 * * E[foo*=bar] has an attribute "foo" that contains the substring "bar"
 * * E[foo%=2] has an attribute "foo" that is evenly divisible by 2
 * * E[foo!=bar] has an attribute "foo" that does not equal "bar"
 *
 * ## Pseudo Classes:
 *
 * * E:first-child E is the first child of its parent
 * * E:last-child E is the last child of its parent
 * * E:nth-child(n) E is the nth child of its parent (1 based as per the spec)
 * * E:nth-child(odd) E is an odd child of its parent
 * * E:nth-child(even) E is an even child of its parent
 * * E:only-child E is the only child of its parent
 * * E:checked E is an element that is has a checked attribute that is true (e.g. a radio or checkbox)
 * * E:first the first E in the resultset
 * * E:last the last E in the resultset
 * * E:nth(n) the nth E in the resultset (1 based)
 * * E:odd shortcut for :nth-child(odd)
 * * E:even shortcut for :nth-child(even)
 * * E:contains(foo) E's innerHTML contains the substring "foo"
 * * E:nodeValue(foo) E contains a textNode with a nodeValue that equals "foo"
 * * E:not(S) an E element that does not match simple selector S
 * * E:has(S) an E element that has a descendent that matches simple selector S
 * * E:next(S) an E element whose next sibling matches simple selector S
 * * E:prev(S) an E element whose previous sibling matches simple selector S
 * * E:any(S1|S2|S2) an E element which matches any of the simple selectors S1, S2 or S3//\\
 *
 * ## CSS Value Selectors:
 *
 * * E{display=none} css value "display" that equals "none"
 * * E{display^=none} css value "display" that starts with "none"
 * * E{display$=none} css value "display" that ends with "none"
 * * E{display*=none} css value "display" that contains the substring "none"
 * * E{display%=2} css value "display" that is evenly divisible by 2
 * * E{display!=none} css value "display" that does not equal "none"
 */
Ext.define('Ext.dom.Query', {
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
                if (q[i][0] == '@') {
                    nodes = root.getAttributeNode(q[i].substring(1));
                    results.push(nodes);
                }
                else {
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
    },

    isXml: function(el) {
        var docEl = (el ? el.ownerDocument || el : 0).documentElement;
        return docEl ? docEl.nodeName !== "HTML" : false;
    }

}, function() {
    Ext.ns('Ext.core');
    Ext.core.DomQuery = Ext.DomQuery = new this();
    Ext.query = Ext.Function.alias(Ext.DomQuery, 'select');
});

/**
 * @class Ext.DomHelper
 * @alternateClassName Ext.dom.Helper
 *
 * The DomHelper class provides a layer of abstraction from DOM and transparently supports creating elements via DOM or
 * using HTML fragments. It also has the ability to create HTML fragment templates from your DOM building code.
 *
 * ## DomHelper element specification object
 *
 * A specification object is used when creating elements. Attributes of this object are assumed to be element
 * attributes, except for 4 special attributes:
 *
 * * **tag**: The tag name of the element
 * * **children (or cn)**: An array of the same kind of element definition objects to be created and appended. These
 * can be nested as deep as you want.
 * * **cls**: The class attribute of the element. This will end up being either the "class" attribute on a HTML
 * fragment or className for a DOM node, depending on whether DomHelper is using fragments or DOM.
 * * **html**: The innerHTML for the element
 *
 * ## Insertion methods
 *
 * Commonly used insertion methods:
 *
 * * {@link #append}
 * * {@link #insertBefore}
 * * {@link #insertAfter}
 * * {@link #overwrite}
 * * {@link #insertHtml}
 *
 * ## Example
 *
 * This is an example, where an unordered list with 3 children items is appended to an existing element with id
 * 'my-div':
 *
 *     var dh = Ext.DomHelper; // create shorthand alias
 *     // specification object
 *     var spec = {
 *         id: 'my-ul',
 *         tag: 'ul',
 *         cls: 'my-list',
 *         // append children after creating
 *         children: [     // may also specify 'cn' instead of 'children'
 *             {tag: 'li', id: 'item0', html: 'List Item 0'},
 *             {tag: 'li', id: 'item1', html: 'List Item 1'},
 *             {tag: 'li', id: 'item2', html: 'List Item 2'}
 *         ]
 *     };
 *     var list = dh.append(
 *         'my-div', // the context element 'my-div' can either be the id or the actual node
 *         spec      // the specification object
 *     );
 *
 * Element creation specification parameters in this class may also be passed as an Array of specification objects.
 * This can be used to insert multiple sibling nodes into an existing container very efficiently. For example, to add
 * more list items to the example above:
 *
 *     dh.append('my-ul', [
 *         {tag: 'li', id: 'item3', html: 'List Item 3'},
 *         {tag: 'li', id: 'item4', html: 'List Item 4'}
 *     ]);
 *
 * ## Templating
 *
 * The real power is in the built-in templating. Instead of creating or appending any elements, createTemplate returns
 * a Template object which can be used over and over to insert new elements. Revisiting the example above, we could
 * utilize templating this time:
 *
 *     // create the node
 *     var list = dh.append('my-div', {tag: 'ul', cls: 'my-list'});
 *     // get template
 *     var tpl = dh.createTemplate({tag: 'li', id: 'item{0}', html: 'List Item {0}'});
 *
 *     for(var i = 0; i < 5; i++){
 *         tpl.append(list, i); // use template to append to the actual node
 *     }
 *
 * An example using a template:
 *
 *     var html = '"{0}" href="{1}" class="nav">{2}';
 *
 *     var tpl = new Ext.DomHelper.createTemplate(html);
 *     tpl.append('blog-roll', ['link1', 'http://www.tommymaintz.com/', "Tommy's Site"]);
 *     tpl.append('blog-roll', ['link2', 'http://www.avins.org/', "Jamie's Site"]);
 *
 * The same example using named parameters:
 *
 *     var html = '"{id}" href="{url}" class="nav">{text}';
 *
 *     var tpl = new Ext.DomHelper.createTemplate(html);
 *     tpl.append('blog-roll', {
 *         id: 'link1',
 *         url: 'http://www.tommymaintz.com/',
 *         text: "Tommy's Site"
 *     });
 *     tpl.append('blog-roll', {
 *         id: 'link2',
 *         url: 'http://www.avins.org/',
 *         text: "Jamie's Site"
 *     });
 *
 * ## Compiling Templates
 *
 * Templates are applied using regular expressions. The performance is great, but if you are adding a bunch of DOM
 * elements using the same template, you can increase performance even further by "compiling" the template. The way
 * "compile()" works is the template is parsed and broken up at the different variable points and a dynamic function is
 * created and eval'ed. The generated function performs string concatenation of these parts and the passed variables
 * instead of using regular expressions.
 *
 *     var html = '"{id}" href="{url}" class="nav">{text}';
 *
 *     var tpl = new Ext.DomHelper.createTemplate(html);
 *     tpl.compile();
 *
 *     //... use template like normal
 *
 * ## Performance Boost
 *
 * DomHelper will transparently create HTML fragments when it can. Using HTML fragments instead of DOM can
 * significantly boost performance.
 *
 * Element creation specification parameters may also be strings. If useDom is false, then the string is used as
 * innerHTML. If useDom is true, a string specification results in the creation of a text node. Usage:
 *
 *     Ext.DomHelper.useDom = true; // force it to use DOM; reduces performance
 *
 */
Ext.define('Ext.dom.Helper', {
    emptyTags : /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,
    confRe : /tag|children|cn|html|tpl|tplData$/i,
    endRe : /end/i,

    attribXlat: { cls : 'class', htmlFor : 'for' },

    closeTags: {},

    decamelizeName : function () {
        var camelCaseRe = /([a-z])([A-Z])/g,
            cache = {};

        function decamel (match, p1, p2) {
            return p1 + '-' + p2.toLowerCase();
        }

        return function (s) {
            return cache[s] || (cache[s] = s.replace(camelCaseRe, decamel));
        };
    }(),

    generateMarkup: function(spec, buffer) {
        var me = this,
            attr, val, tag, i, closeTags;

        if (typeof spec == "string") {
            buffer.push(spec);
        } else if (Ext.isArray(spec)) {
            for (i = 0; i < spec.length; i++) {
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
                            me.generateStyles(val, buffer).push('"');
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

                // Apply the tpl html, and cn specifications
                if ((val = spec.tpl)) {
                    val.applyOut(spec.tplData, buffer);
                }
                if ((val = spec.html)) {
                    buffer.push(val);
                }
                if ((val = spec.cn || spec.children)) {
                    me.generateMarkup(val, buffer);
                }

                // we generate a lot of close tags, so cache them rather than push 3 parts
                closeTags = me.closeTags;
                buffer.push(closeTags[tag] || (closeTags[tag] = '</' + tag + '>'));
            }
        }

        return buffer;
    },

    /**
     * Converts the styles from the given object to text. The styles are CSS style names
     * with their associated value.
     *
     * The basic form of this method returns a string:
     *
     *      var s = Ext.DomHelper.generateStyles({
     *          backgroundColor: 'red'
     *      });
     *
     *      // s = 'background-color:red;'
     *
     * Alternatively, this method can append to an output array.
     *
     *      var buf = [];
     *
     *      ...
     *
     *      Ext.DomHelper.generateStyles({
     *          backgroundColor: 'red'
     *      }, buf);
     *
     * In this case, the style text is pushed on to the array and the array is returned.
     *
     * @param {Object} styles The object describing the styles.
     * @param {String[]} [buffer] The output buffer.
     * @return {String/String[]} If buffer is passed, it is returned. Otherwise the style
     * string is returned.
     */
    generateStyles: function (styles, buffer) {
        var a = buffer || [],
            name;

        for (name in styles) {
            if (styles.hasOwnProperty(name)) {
                a.push(this.decamelizeName(name), ':', styles[name], ';');
            }
        }

        return buffer || a.join('');
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
        Ext.fly(el).applyStyles(styles);
    },

    /**
     * @private
     * Fix for browsers which no longer support createContextualFragment
     */
    createContextualFragment: function(html){
        var div = document.createElement("div"),
            fragment = document.createDocumentFragment(),
            i = 0,
            length, childNodes;

        div.innerHTML = html;
        childNodes = div.childNodes;
        length = childNodes.length;

        for (; i < length; i++) {
            fragment.appendChild(childNodes[i].cloneNode(true));
        }

        return fragment;
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
        var setStart, range, frag, rangeEl, isBeforeBegin, isAfterBegin;

        where = where.toLowerCase();

        if (Ext.isTextNode(el)) {
            if (where == 'afterbegin' ) {
                where = 'beforebegin';
            }
            else if (where == 'beforeend') {
                where = 'afterend';
            }
        }

        isBeforeBegin = where == 'beforebegin';
        isAfterBegin = where == 'afterbegin';

        range = Ext.feature.has.CreateContextualFragment ? el.ownerDocument.createRange() : undefined;
        setStart = 'setStart' + (this.endRe.test(where) ? 'After' : 'Before');

        if (isBeforeBegin || where == 'afterend') {
            if (range) {
                range[setStart](el);
                frag = range.createContextualFragment(html);
            }
            else {
                frag = this.createContextualFragment(html);
            }
            el.parentNode.insertBefore(frag, isBeforeBegin ? el : el.nextSibling);
            return el[(isBeforeBegin ? 'previous' : 'next') + 'Sibling'];
        }
        else {
            rangeEl = (isAfterBegin ? 'first' : 'last') + 'Child';
            if (el.firstChild) {
                if (range) {
                    range[setStart](el[rangeEl]);
                    frag = range.createContextualFragment(html);
                } else {
                    frag = this.createContextualFragment(html);
                }

                if (isAfterBegin) {
                    el.insertBefore(frag, el.firstChild);
                } else {
                    el.appendChild(frag);
                }
            } else {
                el.innerHTML = html;
            }
            return el[rangeEl];
        }
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
        return this.doInsert(el, o, returnElement, 'afterend');
    },

    /**
     * Creates new DOM element(s) and inserts them as the first child of el.
     * @param {String/HTMLElement/Ext.Element} el The context element
     * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
     * @param {Boolean} [returnElement] true to return a Ext.Element
     * @return {HTMLElement/Ext.Element} The new node
     */
    insertFirst: function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'afterbegin');
    },

    /**
     * Creates new DOM element(s) and appends them to el.
     * @param {String/HTMLElement/Ext.Element} el The context element
     * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
     * @param {Boolean} [returnElement] true to return a Ext.Element
     * @return {HTMLElement/Ext.Element} The new node
     */
    append: function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'beforeend');
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

    doInsert: function(el, o, returnElement, pos) {
        var newNode = this.insertHtml(pos, Ext.getDom(el), this.markup(o));
        return returnElement ? Ext.get(newNode, true) : newNode;
    },

    /**
     * Creates a new Ext.Template from the DOM object spec.
     * @param {Object} o The DOM object spec (and children)
     * @return {Ext.Template} The new template
     */
    createTemplate: function(o) {
        var html = this.markup(o);
        return new Ext.Template(html);
    }
}, function() {
    Ext.ns('Ext.core');
    Ext.core.DomHelper = Ext.DomHelper = new this;
});

/**
 * An Identifiable mixin.
 * @private
 */
Ext.define('Ext.mixin.Identifiable', {
    statics: {
        uniqueIds: {}
    },

    isIdentifiable: true,

    mixinId: 'identifiable',

    idCleanRegex: /\.|[^\w\-]/g,

    defaultIdPrefix: 'ext-',

    defaultIdSeparator: '-',

    getOptimizedId: function() {
        return this.id;
    },

    getUniqueId: function() {
        var id = this.id,
            prototype, separator, xtype, uniqueIds, prefix;

        if (!id) {
            prototype = this.self.prototype;
            separator = this.defaultIdSeparator;

            uniqueIds = Ext.mixin.Identifiable.uniqueIds;

            if (!prototype.hasOwnProperty('identifiablePrefix')) {
                xtype = this.xtype;

                if (xtype) {
                    prefix = this.defaultIdPrefix + xtype + separator;
                }
                else {
                    prefix = prototype.$className.replace(this.idCleanRegex, separator).toLowerCase() + separator;
                }

                prototype.identifiablePrefix = prefix;
            }

            prefix = this.identifiablePrefix;

            if (!uniqueIds.hasOwnProperty(prefix)) {
                uniqueIds[prefix] = 0;
            }

            id = this.id = prefix + (++uniqueIds[prefix]);
        }

        this.getUniqueId = this.getOptimizedId;

        return id;
    },

    setId: function(id) {
        this.id = id;
    },

    /**
     * Retrieves the id of this component. Will autogenerate an id if one has not already been set.
     * @return {String} id
     */
    getId: function() {
        var id = this.id;

        if (!id) {
            id = this.getUniqueId();
        }

        this.getId = this.getOptimizedId;

        return id;
    }
});

/**
 * Encapsulates a DOM element, adding simple DOM manipulation facilities, normalizing for browser differences.
 *
 * All instances of this class inherit the methods of Ext.Fx making visual effects easily available to all DOM elements.
 *
 * Note that the events documented in this class are not Ext events, they encapsulate browser events. To access the
 * underlying browser event, see Ext.EventObject.browserEvent. Some older browsers may not support the full range of
 * events. Which events are supported is beyond the control of Sencha Touch.
 *
 * ## Usage
 *
 *     // by id
 *     var el = Ext.get("my-div");
 *
 *     // by DOM element reference
 *     var el = Ext.get(myDivElement);
 *
 * ## Composite (Collections of) Elements
 *
 * For working with collections of Elements, see Ext.CompositeElement
 *
 * @mixins Ext.mixin.Observable
 */
Ext.define('Ext.dom.Element', {
    alternateClassName: 'Ext.Element',

    mixins: [
        'Ext.mixin.Identifiable'
    ],

    requires: [
        'Ext.dom.Query',
        'Ext.dom.Helper'
    ],

    observableType: 'element',

    xtype: 'element',

    statics: {
        CREATE_ATTRIBUTES: {
            style: 'style',
            className: 'className',
            cls: 'cls',
            classList: 'classList',
            text: 'text',
            hidden: 'hidden',
            html: 'html',
            children: 'children'
        },

        create: function(attributes, domNode) {
            var ATTRIBUTES = this.CREATE_ATTRIBUTES,
                element, elementStyle, tag, value, name, i, ln;

            if (!attributes) {
                attributes = {};
            }

            if (attributes.isElement) {
                return attributes.dom;
            }
            else if ('nodeType' in attributes) {
                return attributes;
            }

            if (typeof attributes == 'string') {
                return document.createTextNode(attributes);
            }

            tag = attributes.tag;

            if (!tag) {
                tag = 'div';
            }

            element = document.createElement(tag);
            elementStyle = element.style;

            for (name in attributes) {
                if (name != 'tag' && attributes.hasOwnProperty(name)) {
                    value = attributes[name];

                    switch (name) {
                        case ATTRIBUTES.style:
                                if (typeof value == 'string') {
                                    element.setAttribute(name, value);
                                }
                                else {
                                    for (i in value) {
                                        if (value.hasOwnProperty(i)) {
                                            elementStyle[i] = value[i];
                                        }
                                    }
                                }
                            break;

                        case ATTRIBUTES.className:
                        case ATTRIBUTES.cls:
                            element.className = value;
                            break;

                        case ATTRIBUTES.classList:
                            element.className = value.join(' ');
                            break;

                        case ATTRIBUTES.text:
                            element.textContent = value;
                            break;

                        case ATTRIBUTES.hidden:
                            if (value) {
                                element.style.display = 'none';
                            }
                            break;

                        case ATTRIBUTES.html:
                            element.innerHTML = value;
                            break;

                        case ATTRIBUTES.children:
                            for (i = 0,ln = value.length; i < ln; i++) {
                                element.appendChild(this.create(value[i], true));
                            }
                            break;

                        default:
                            element.setAttribute(name, value);
                    }
                }
            }

            if (domNode) {
                return element;
            }
            else {
                return this.get(element);
            }
        },

        documentElement: null,

        cache: {},

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
        get: function(element) {
            var cache = this.cache,
                instance, dom, id;

            if (!element) {
                return null;
            }

            if (typeof element == 'string') {
                if (cache.hasOwnProperty(element)) {
                    return cache[element];
                }

                if (!(dom = document.getElementById(element))) {
                    return null;
                }

                cache[element] = instance = new this(dom);

                return instance;
            }

            if ('tagName' in element) { // dom element
                id = element.id;

                if (cache.hasOwnProperty(id)) {
                    return cache[id];
                }

                instance = new this(element);
                cache[instance.getId()] = instance;

                return instance;
            }

            if (element.isElement) {
                return element;
            }

            if (element.isComposite) {
                return element;
            }

            if (Ext.isArray(element)) {
                return this.select(element);
            }

            if (element === document) {
                // create a bogus element object representing the document object
                if (!this.documentElement) {
                    this.documentElement = new this(document.documentElement);
                    this.documentElement.setId('ext-application');
                }

                return this.documentElement;
            }

            return null;
        },

        data: function(element, key, value) {
            var cache = Ext.cache,
                id, data;

            element = this.get(element);

            if (!element) {
                return null;
            }

            id = element.id;

            data = cache[id].data;

            if (!data) {
                cache[id].data = data = {};
            }

            if (arguments.length == 2) {
                return data[key];
            }
            else {
                return (data[key] = value);
            }
        }
    },

    isElement: true,

    constructor: function(dom) {
        if (typeof dom == 'string') {
            dom = document.getElementById(dom);
        }

        if (!dom) {
            throw new Error("Invalid domNode reference or an id of an existing domNode: " + dom);
        }

        /**
         * The DOM element
         * @property dom
         * @type HTMLElement
         */
        this.dom = dom;

        this.getUniqueId();
    },

    attach: function (dom) {
        this.dom = dom;
        this.id = dom.id;
        return this;
    },

    getUniqueId: function() {
        var id = this.id,
            dom;

        if (!id) {
            dom = this.dom;

            if (dom.id.length > 0) {
                this.id = id = dom.id;
            }
            else {
                dom.id = id = this.mixins.identifiable.getUniqueId.call(this);
            }

            this.self.cache[id] = this;
        }

        return id;
    },

    setId: function(id) {
        var currentId = this.id,
            cache = this.self.cache;

        if (currentId) {
            delete cache[currentId];
        }

        this.dom.id = id;

        /**
         * The DOM element ID
         * @property id
         * @type String
         */
        this.id = id;

        cache[id] = this;

        return this;
    },

    /**
     * Sets the innerHTML of this element.
     * @param {String} html The new HTML
     */
    setHtml: function(html) {
        this.dom.innerHTML = html;
    },

    /**
     * Returns the innerHTML of an Element.
     * @return {String}
     */
    getHtml: function() {
        return this.dom.innerHTML;
    },

    setText: function(text) {
        this.dom.textContent = text;
    },

    redraw: function() {
        var dom = this.dom,
            domStyle = dom.style;

        domStyle.display = 'none';
        dom.offsetHeight;
        domStyle.display = '';
    },

    isPainted: function() {
        return Boolean(this.dom.offsetParent);
    },

    /**
     * Sets the passed attributes as attributes of this element (a style attribute can be a string, object or function)
     * @param {Object} attributes The object with the attributes
     * @param {Boolean} [useSet=true] false to override the default setAttribute to use expandos.
     * @return {Ext.dom.Element} this
     */
    set: function(attributes, useSet) {
        var dom = this.dom,
            attribute, value;

        for (attribute in attributes) {
            if (attributes.hasOwnProperty(attribute)) {
                value = attributes[attribute];

                if (attribute == 'style') {
                    this.applyStyles(value);
                }
                else if (attribute == 'cls') {
                    dom.className = value;
                }
                else if (useSet !== false) {
                    if (value === undefined) {
                        dom.removeAttribute(attribute);
                    } else {
                        dom.setAttribute(attribute, value);
                    }
                }
                else {
                    dom[attribute] = value;
                }
            }
        }

        return this;
    },

    /**
     * Returns true if this element matches the passed simple selector (e.g. div.some-class or span:first-child)
     * @param {String} selector The simple selector to test
     * @return {Boolean} True if this element matches the selector, else false
     */
    is: function(selector) {
        return Ext.DomQuery.is(this.dom, selector);
    },

    /**
     * Returns the value of the "value" attribute
     * @param {Boolean} asNumber true to parse the value as a number
     * @return {String/Number}
     */
    getValue: function(asNumber) {
        var value = this.dom.value;

        return asNumber ? parseInt(value, 10) : value;
    },

    /**
     * Returns the value of an attribute from the element's underlying DOM node.
     * @param {String} name The attribute name
     * @param {String} [namespace] The namespace in which to look for the attribute
     * @return {String} The attribute value
     */
    getAttribute: function(name, namespace) {
        var dom = this.dom;

        return dom.getAttributeNS(namespace, name) || dom.getAttribute(namespace + ":" + name)
               || dom.getAttribute(name) || dom[name];
    },

    /**
     * Removes this element's dom reference. Note that event and cache removal is handled at {@link Ext#removeNode}
     */
    destroy: function() {
        this.isDestroyed = true;

        var cache = Ext.Element.cache,
            dom = this.dom;

        if (dom && dom.parentNode && dom.tagName != 'BODY') {
            dom.parentNode.removeChild(dom);
        }

        delete cache[this.id];
        delete this.dom;
    }

}, function(Element) {
    Ext.elements = Ext.cache = Element.cache;

    this.addStatics({
        Fly: new Ext.Class({
            extend: Element,

            constructor: function(dom) {
                this.dom = dom;
            }
        }),

        _flyweights: {},

        /**
         * Gets the globally shared flyweight Element, with the passed node as the active element. Do not store a reference
         * to this element - the dom node can be overwritten by other code. {@link Ext#fly} is alias for
         * {@link Ext.dom.Element#fly}.
         *
         * Use this to make one-time references to DOM elements which are not going to be accessed again either by
         * application code, or by Ext's classes. If accessing an element which will be processed regularly, then {@link
         * Ext#get Ext.get} will be more appropriate to take advantage of the caching provided by the Ext.dom.Element
         * class.
         *
         * @param {String/HTMLElement} element The dom node or id
         * @param {String} [named] Allows for creation of named reusable flyweights to prevent conflicts (e.g.
         * internally Ext uses "_global")
         * @return {Ext.dom.Element} The shared Element object (or null if no matching element was found)
         * @static
         */
        fly: function(element, named) {
            var fly = null,
                flyweights = Element._flyweights;

            named = named || '_global';

            element = Ext.getDom(element);

            if (element) {
                fly = flyweights[named] || (flyweights[named] = new Element.Fly());
                fly.dom = element;
                fly.isSynchronized = false;
            }

            return fly;
        }
    });

    /**
     * @member Ext
     * @method get
     * @alias Ext.dom.Element#get
     */
    Ext.get = function(element) {
        return Element.get.call(Element, element);
    };

    /**
     * @member Ext
     * @method fly
     * @alias Ext.dom.Element#fly
     */
    Ext.fly = function() {
        return Element.fly.apply(Element, arguments);
    };

    Ext.ClassManager.onCreated(function() {
        Element.mixin('observable', Ext.mixin.Observable);
    }, null, 'Ext.mixin.Observable');

    //<deprecated product=touch since=2.0>
    Ext.deprecateClassMethod(this, {
        /**
         * @member Ext.dom.Element
         * @method remove
         * @inheritdoc Ext.dom.Element#destroy
         * @deprecated 2.0.0 Please use {@link #destroy} instead.
         */
        remove: 'destroy',
        /**
         * @member Ext.dom.Element
         * @method setHTML
         * @inheritdoc Ext.dom.Element#setHtml
         * @deprecated 2.0.0 Please use {@link #setHtml} instead.
         */
        setHTML: 'setHtml',
        /**
         * @member Ext.dom.Element
         * @method update
         * @inheritdoc Ext.dom.Element#setHtml
         * @deprecated 2.0.0 Please use {@link #setHtml} instead.
         */
        update: 'setHtml',
        /**
         * @member Ext.dom.Element
         * @method getHTML
         * @inheritdoc Ext.dom.Element#getHtml
         * @deprecated 2.0.0 Please use {@link #getHtml} instead.
         */
        getHTML: 'getHtml',
        /**
         * @member Ext.dom.Element
         * @method purgeAllListeners
         * @inheritdoc Ext.dom.Element#clearListeners
         * @deprecated 2.0.0 Please use {@link #clearListeners} instead.
         */
        purgeAllListeners: 'clearListeners',
        /**
         * @member Ext.dom.Element
         * @method removeAllListeners
         * @inheritdoc Ext.dom.Element#clearListeners
         * @deprecated 2.0.0 Please use {@link #clearListeners} instead.
         */
        removeAllListeners: 'clearListeners'
    });

    /**
     * @member Ext.dom.Element
     * @method cssTranslate
     * Translates an element using CSS 3 in 2D.
     * @removed 2.0.0
     */
    Ext.deprecateMethod(Ext.dom.Element, 'cssTranslate', null, "Ext.dom.Element.cssTranslate() has been removed");

    /**
     * @member Ext.dom.Element
     * @method getOuterHeight
     * Retrieves the height of the element account for the top and bottom margins.
     * @removed 2.0.0
     */
    Ext.deprecateMethod(Ext.dom.Element, 'getOuterHeight', null, "Ext.dom.Element.getOuterHeight() has been removed");

    /**
     * @member Ext.dom.Element
     * @method getOuterWidth
     * Retrieves the width of the element accounting for the left and right margins.
     * @removed 2.0.0
     */
    Ext.deprecateMethod(Ext.dom.Element, 'getOuterWidth', null, "Ext.dom.Element.getOuterWidth() has been removed");

    /**
     * @member Ext.dom.Element
     * @method getScrollParent
     * Gets the Scroller instance of the first parent that has one.
     * @removed 2.0.0
     */
    Ext.deprecateMethod(Ext.dom.Element, 'getScrollParent', null, "Ext.dom.Element.getScrollParent() has been removed");

    /**
     * @member Ext.dom.Element
     * @method isDescendent
     * Determines if this element is a descendent of the passed in Element.
     * @removed 2.0.0
     */
    Ext.deprecateMethod(Ext.dom.Element, 'isDescendent', null, "Ext.dom.Element.isDescendent() has been removed");

    /**
     * @member Ext.dom.Element
     * @method mask
     * Puts a mask over this element to disable user interaction.
     * @removed 2.0.0
     */
    Ext.deprecateMethod(Ext.dom.Element, 'mask', null, "Ext.dom.Element.mask() has been removed");

    /**
     * @member Ext.dom.Element
     * @method setTopLeft
     * Sets the element's top and left positions directly using CSS style.
     * @removed 2.0.0
     */
    Ext.deprecateMethod(Ext.dom.Element, 'setTopLeft', null, "Ext.dom.Element.setTopLeft() has been removed");

    /**
     * @member Ext.dom.Element
     * @method unmask
     * Removes a previously applied mask.
     * @removed 2.0.0
     */
    Ext.deprecateMethod(Ext.dom.Element, 'unmask', null, "Ext.dom.Element.unmask() has been removed");
    //</deprecated>

});

/**
 * @class Ext.dom.Element
 */
Ext.dom.Element.addStatics({
    unitRe: /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,
    camelRe: /(-[a-z])/gi,
    cssRe: /([a-z0-9-]+)\s*:\s*([^;\s]+(?:\s*[^;\s]+)*);?/gi,
    opacityRe: /alpha\(opacity=(.*)\)/i,
    propertyCache: {},
    defaultUnit: "px",
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
            Ext.Logger.warn("Warning, size detected as NaN on Element.addUnits.");
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

        var parts = box.split(' '),
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
            top: parseFloat(parts[0]) || 0,
            right: parseFloat(parts[1]) || 0,
            bottom: parseFloat(parts[2]) || 0,
            left: parseFloat(parts[3]) || 0
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
        var a = this.addUnits,
            b = this.parseBox(box);

        return a(b.top, units) + ' ' +
            a(b.right, units) + ' ' +
            a(b.bottom, units) + ' ' +
            a(b.left, units);

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
//        if (prop == 'float') {
//            prop = Ext.supports.Float ? 'cssFloat' : 'styleFloat';
//        }
        return this.propertyCache[prop] || (this.propertyCache[prop] = prop.replace(this.camelRe, this.camelReplaceFn));
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
    parseStyles: function(styles) {
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

//<deprecated product=touch since=2.0>
Ext.dom.Element.addStatics({
    /**
     * Serializes a DOM form into a url encoded string
     * @deprecated 2.0.0 Please see {@link Ext.form.Panel#getValues} instead
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

        Ext.each(fElements, function(element) {
            name = element.name;
            type = element.type;

            if (!element.disabled && name) {
                if (/select-(one|multiple)/i.test(type)) {
                    Ext.each(element.options, function(opt) {
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
    },

    /**
     * Retrieves the document height
     * @deprecated 2.0.0 Please use {@link Ext.Viewport#getWindowHeight} instead
     * @static
     * @return {Number} documentHeight
     */
    getDocumentHeight: function() {
        //<debug warn>
        Ext.Logger.deprecate("Ext.Element.getDocumentHeight() is no longer supported. " +
            "Please use Ext.Viewport#getWindowHeight() instead", this);
        //</debug>
        return Math.max(!Ext.isStrict ? document.body.scrollHeight : document.documentElement.scrollHeight, this.getViewportHeight());
    },

    /**
     * Retrieves the document width
     * @deprecated 2.0.0 Please use {@link Ext.Viewport#getWindowWidth} instead
     * @static
     * @return {Number} documentWidth
     */
    getDocumentWidth: function() {
        //<debug warn>
        Ext.Logger.deprecate("Ext.Element.getDocumentWidth() is no longer supported. " +
            "Please use Ext.Viewport#getWindowWidth() instead", this);
        //</debug>
        return Math.max(!Ext.isStrict ? document.body.scrollWidth : document.documentElement.scrollWidth, this.getViewportWidth());
    },

    /**
     * Retrieves the viewport height of the window.
     * @deprecated 2.0.0 Please use {@link Ext.Viewport#getWindowHeight} instead
     * @static
     * @return {Number} viewportHeight
     */
    getViewportHeight: function() {
        //<debug warn>
        Ext.Logger.deprecate("Ext.Element.getDocumentHeight() is no longer supported. " +
            "Please use Ext.Viewport#getWindowHeight() instead", this);
        //</debug>
        return window.innerHeight;
    },

    /**
     * Retrieves the viewport width of the window.
     * @deprecated 2.0.0 Please use {@link Ext.Viewport#getWindowWidth} instead
     * @static
     * @return {Number} viewportWidth
     */
    getViewportWidth: function() {
        //<debug warn>
        Ext.Logger.deprecate("Ext.Element.getDocumentWidth() is no longer supported. " +
            "Please use Ext.Viewport#getWindowWidth() instead", this);
        //</debug>
        return window.innerWidth;
    },

    /**
     * Retrieves the viewport size of the window.
     * @deprecated 2.0.0 Please use {@link Ext.Viewport#getSize} instead
     * @static
     * @return {Object} object containing width and height properties
     */
    getViewSize: function() {
        //<debug warn>
        Ext.Logger.deprecate("Ext.Element.getViewSize() is no longer supported. " +
            "Please use Ext.Viewport#getSize() instead", this);
        //</debug>
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    },

    /**
     * Retrieves the current orientation of the window. This is calculated by
     * determing if the height is greater than the width.
     * @deprecated 2.0.0 Please use {@link Ext.Viewport#getOrientation} instead
     * @static
     * @return {String} Orientation of window: 'portrait' or 'landscape'
     */
    getOrientation: function() {
        //<debug warn>
        Ext.Logger.deprecate("Ext.Element.getOrientation() is no longer supported. " +
            "Please use Ext.Viewport#getOrientation() instead", this);
        //</debug>
        if (Ext.supports.OrientationChange) {
            return (window.orientation == 0) ? 'portrait' : 'landscape';
        }

        return (window.innerHeight > window.innerWidth) ? 'portrait' : 'landscape';
    }
});
//</deprecated>

/**
 * @class Ext.dom.Element
 */
//<deprecated product=touch since=2.0>
Ext.dom.Element.addMembers({
    /**
     * Gets the x,y coordinates specified by the anchor position on the element.
     *
     * @deprecated 2.0.0 This method is no longer available for Ext.Element. Please see {@link Ext.Component#showBy}
     * to do anchoring at Component level instead
     *
     * @param {String} anchor (optional) The specified anchor position (defaults to "c").
     * @param {Boolean} local (optional) True to get the local (element top/left-relative) anchor position instead
     * of page coordinates
     * @param {Object} size (optional) An object containing the size to use for calculating anchor position
     * {width: (target width), height: (target height)} (defaults to the element's current size)
     * @return {Array} [x, y] An array containing the element's x and y coordinates
     */
    getAnchorXY: function(anchor, local, size) {
        //<debug warn>
        Ext.Logger.deprecate("getAnchorXY() is no longer available for Ext.Element. Please see Ext.Component#showBy() " +
            "to do anchoring at Component level instead", this);
        //</debug>

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
        //<debug warn>
        Ext.Logger.deprecate("getAlignToXY() is no longer available for Ext.Element. Please see Ext.Component#showBy() " +
            "to do anchoring at Component level instead", this);
        //</debug>

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
//</deprecated>

/**
 * @class Ext.dom.Element
 */
Ext.dom.Element.addMembers({

    /**
     * Appends the passed element(s) to this element
     * @param {HTMLElement/Ext.dom.Element} element a DOM Node or an existing Element.
     * @return {Ext.dom.Element} This element
     */
    appendChild: function(element) {
        this.dom.appendChild(Ext.getDom(element));

        return this;
    },

    removeChild: function(element) {
        this.dom.removeChild(Ext.getDom(element));

        return this;
    },

    append: function() {
        this.appendChild.apply(this, arguments);
    },

    /**
     * Appends this element to the passed element
     * @param {String/HTMLElement/Ext.dom.Element} el The new parent element.
     * The id of the node, a DOM Node or an existing Element.
     * @return {Ext.dom.Element} This element
     */
    appendTo: function(el) {
        Ext.getDom(el).appendChild(this.dom);
        return this;
    },

    /**
     * Inserts this element before the passed element in the DOM
     * @param {String/HTMLElement/Ext.dom.Element} el The element before which this element will be inserted.
     * The id of the node, a DOM Node or an existing Element.
     * @return {Ext.dom.Element} This element
     */
    insertBefore: function(el) {
        el = Ext.getDom(el);
        el.parentNode.insertBefore(this.dom, el);
        return this;
    },

    /**
     * Inserts this element after the passed element in the DOM
     * @param {String/HTMLElement/Ext.dom.Element} el The element to insert after.
     * The id of the node, a DOM Node or an existing Element.
     * @return {Ext.dom.Element} This element
     */
    insertAfter: function(el) {
        el = Ext.getDom(el);
        el.parentNode.insertBefore(this.dom, el.nextSibling);
        return this;
    },


    /**
     * Inserts an element as the first child of this element
     * @param {String/HTMLElement/Ext.dom.Element} element The id or element to insert
     * @return {Ext.dom.Element} this
     */
    insertFirst: function(element) {
        var elementDom = Ext.getDom(element),
            dom = this.dom,
            firstChild = dom.firstChild;

        if (!firstChild) {
            dom.appendChild(elementDom);
        }
        else {
            dom.insertBefore(elementDom, firstChild);
        }

        return this;
    },

    /**
     * Inserts (or creates) the passed element (or DomHelper config) as a sibling of this element
     * @param {String/HTMLElement/Ext.dom.Element/Object/Array} el The id, element to insert or a DomHelper config
     * to create and insert *or* an array of any of those.
     * @param {String} where (optional) 'before' or 'after' defaults to before
     * @param {Boolean} returnDom (optional) True to return the raw DOM element instead of Ext.dom.Element
     * @return {Ext.dom.Element} The inserted Element. If an array is passed, the last inserted element is returned.
     */
    insertSibling: function(el, where, returnDom) {
        var me = this, rt,
            isAfter = (where || 'before').toLowerCase() == 'after',
            insertEl;

        if (Ext.isArray(el)) {
            insertEl = me;
            Ext.each(el, function(e) {
                rt = Ext.fly(insertEl, '_internal').insertSibling(e, where, returnDom);
                if (isAfter) {
                    insertEl = rt;
                }
            });
            return rt;
        }

        el = el || {};

        if (el.nodeType || el.dom) {
            rt = me.dom.parentNode.insertBefore(Ext.getDom(el), isAfter ? me.dom.nextSibling : me.dom);
            if (!returnDom) {
                rt = Ext.get(rt);
            }
        } else {
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
     * @param {String/HTMLElement/Ext.dom.Element} el The element to replace.
     * The id of the node, a DOM Node or an existing Element.
     * @return {Ext.dom.Element} This element
     */
    replace: function(el) {
        el = Ext.get(el);
        this.insertBefore(el);
        el.remove();
        return this;
    },

    /**
     * Replaces this element with the passed element
     * @param {String/HTMLElement/Ext.dom.Element/Object} el The new element (id of the node, a DOM Node
     * or an existing Element) or a DomHelper config of an element to create
     * @return {Ext.dom.Element} This element
     */
    replaceWith: function(el) {
        var me = this;

        if (el.nodeType || el.dom || typeof el == 'string') {
            el = Ext.get(el);
            me.dom.parentNode.insertBefore(el, me.dom);
        } else {
            el = Ext.core.DomHelper.insertBefore(me.dom, el);
        }

        delete Ext.cache[me.id];
        Ext.removeNode(me.dom);
        me.id = Ext.id(me.dom = el);
        Ext.dom.Element.addToCache(me.isFlyweight ? new Ext.dom.Element(me.dom) : me);
        return me;
    },

    /**
     * Creates the passed DomHelper config and appends it to this element or optionally inserts it before the passed child element.
     * @param {Object} config DomHelper element config object.  If no tag is specified (e.g., {tag:'input'}) then a div will be
     * automatically generated with the specified attributes.
     * @param {HTMLElement} insertBefore (optional) a child element of this element
     * @param {Boolean} returnDom (optional) true to return the dom node instead of creating an Element
     * @return {Ext.dom.Element} The new child element
     */
    createChild: function(config, insertBefore, returnDom) {
        config = config || {tag: 'div'};
        if (insertBefore) {
            return Ext.core.DomHelper.insertBefore(insertBefore, config, returnDom !== true);
        }
        else {
            return Ext.core.DomHelper[!this.dom.firstChild ? 'insertFirst' : 'append'](this.dom, config, returnDom !== true);
        }
    },

    /**
     * Creates and wraps this element with another element
     * @param {Object} config (optional) DomHelper element config object for the wrapper element or null for an empty div
     * @param {Boolean} domNode (optional) True to return the raw DOM element instead of Ext.dom.Element
     * @return {HTMLElement/Ext.dom.Element} The newly created wrapper element
     */
    wrap: function(config, domNode) {
        var dom = this.dom,
            wrapper = this.self.create(config, domNode),
            wrapperDom = (domNode) ? wrapper : wrapper.dom,
            parentNode = dom.parentNode;

        if (parentNode) {
            parentNode.insertBefore(wrapperDom, dom);
        }

        wrapperDom.appendChild(dom);

        return wrapper;
    },

    wrapAllChildren: function(config) {
        var dom = this.dom,
            children = dom.childNodes,
            wrapper = this.self.create(config),
            wrapperDom = wrapper.dom;

        while (children.length > 0) {
            wrapperDom.appendChild(dom.firstChild);
        }

        dom.appendChild(wrapperDom);

        return wrapper;
    },

    unwrapAllChildren: function() {
        var dom = this.dom,
            children = dom.childNodes,
            parentNode = dom.parentNode;

        if (parentNode) {
            while (children.length > 0) {
                parentNode.insertBefore(dom, dom.firstChild);
            }

            this.destroy();
        }
    },

    unwrap: function() {
        var dom = this.dom,
            parentNode = dom.parentNode,
            grandparentNode;

        if (parentNode) {
            grandparentNode = parentNode.parentNode;
            grandparentNode.insertBefore(dom, parentNode);
            grandparentNode.removeChild(parentNode);
        }
        else {
            grandparentNode = document.createDocumentFragment();
            grandparentNode.appendChild(dom);
        }

        return this;
    },

    /**
     * Inserts an html fragment into this element
     * @param {String} where Where to insert the html in relation to this element - beforeBegin, afterBegin, beforeEnd, afterEnd.
     * See {@link Ext.DomHelper#insertHtml} for details.
     * @param {String} html The HTML fragment
     * @param {Boolean} returnEl (optional) True to return an Ext.dom.Element (defaults to false)
     * @return {HTMLElement/Ext.dom.Element} The inserted node (or nearest related if more than 1 inserted)
     */
    insertHtml: function(where, html, returnEl) {
        var el = Ext.core.DomHelper.insertHtml(where, this.dom, html);
        return returnEl ? Ext.get(el) : el;
    }
});

/**
 * @class Ext.dom.Element
 */
Ext.dom.Element.override({

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
                round = Math.round;

            return [round(rect.left + window.pageXOffset), round(rect.top + window.pageYOffset)];
        }
    }(),

    /**
     * Returns the offsets of this element from the passed element. Both element must be part of the DOM tree
     * and not have display:none to have page coordinates.
     * @param {Mixed} element The element to get the offsets from.
     * @return {Array} The XY page offsets (e.g. [100, -200])
     */
    getOffsetsTo: function(el) {
        var o = this.getXY(),
            e = Ext.fly(el, '_internal').getXY();
        return [o[0] - e[0], o[1] - e[1]];
    },

    /**
     * Sets the X position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
     * @param {Number} The X position of the element
     * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
     * @return {Ext.dom.Element} this
     */
    setX: function(x) {
        return this.setXY([x, this.getY()]);
    },

    /**
     * Sets the Y position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
     * @param {Number} The Y position of the element
     * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
     * @return {Ext.dom.Element} this
     */
    setY: function(y) {
        return this.setXY([this.getX(), y]);
    },

    /**
     * Sets the position of the element in page coordinates, regardless of how the element is positioned.
     * The element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
     * @param {Array} pos Contains X & Y [x, y] values for new position (coordinates are page-based)
     * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
     * @return {Ext.dom.Element} this
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
     * @return {Number}
     */
    getLeft: function() {
        return parseInt(this.getStyle('left'), 10) || 0;
    },

    /**
     * Gets the right X coordinate of the element (element X position + element width)
     * @return {Number}
     */
    getRight: function() {
        return parseInt(this.getStyle('right'), 10) || 0;
    },

    /**
     * Gets the top Y coordinate
     * @return {Number}
     */
    getTop: function() {
        return parseInt(this.getStyle('top'), 10) || 0;
    },

    /**
     * Gets the bottom Y coordinate of the element (element Y position + element height)
     * @return {Number}
     */
    getBottom: function() {
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
     * Sets the element's box. Use getBox() on another element to get a box object.
     * @param {Object} box The box to fill, for example:
     *
     *      {
     *          left: ...,
     *          top: ...,
     *          width: ...,
     *          height: ...
     *      }
     *
     * @return {Ext.dom.Element} this
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
            xy = [0, 0];
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

/**
 * @class Ext.dom.Element
 */

Ext.dom.Element.addMembers({
    WIDTH: 'width',
    HEIGHT: 'height',
    MIN_WIDTH: 'min-width',
    MIN_HEIGHT: 'min-height',
    MAX_WIDTH: 'max-width',
    MAX_HEIGHT: 'max-height',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left',
    /**
     * @property VISIBILITY
     * Visibility mode constant for use with {@link #setVisibilityMode}. Use visibility to hide element
     */
    VISIBILITY: 1,

    /**
     * @property DISPLAY
     * Visibility mode constant for use with {@link #setVisibilityMode}. Use display to hide element
     */
    DISPLAY: 2,

    /**
     * @property OFFSETS
     * Visibility mode constant for use with {@link #setVisibilityMode}. Use offsets to hide element
     */
    OFFSETS: 3,

    SEPARATOR: '-',

    trimRe: /^\s+|\s+$/g,
    wordsRe: /\w/g,
    spacesRe: /\s+/,
    styleSplitRe: /\s*(?::|;)\s*/,
    transparentRe: /^(?:transparent|(?:rgba[(](?:\s*\d+\s*[,]){3}\s*0\s*[)]))$/i,
    classNameSplitRegex: /[\s]+/,

    borders: {
        t: 'border-top-width',
        r: 'border-right-width',
        b: 'border-bottom-width',
        l: 'border-left-width'
    },

    paddings: {
        t: 'padding-top',
        r: 'padding-right',
        b: 'padding-bottom',
        l: 'padding-left'
    },

    margins: {
        t: 'margin-top',
        r: 'margin-right',
        b: 'margin-bottom',
        l: 'margin-left'
    },

    /**
     * @property {String} defaultUnit
     * The default unit to append to CSS values where a unit isn't provided.
     */
    defaultUnit: "px",

    isSynchronized: false,

    /**
     * @private
     */
    synchronize: function() {
        var dom = this.dom,
            hasClassMap = {},
            className = dom.className,
            classList, i, ln, name;

        if (className.length > 0) {
            classList = dom.className.split(this.classNameSplitRegex);

            for (i = 0, ln = classList.length; i < ln; i++) {
                name = classList[i];
                hasClassMap[name] = true;
            }
        }
        else {
            classList = [];
        }

        this.classList = classList;

        this.hasClassMap = hasClassMap;

        this.isSynchronized = true;

        return this;
    },

    /**
     * Adds the given CSS class(es) to this Element
     * @param {String} names The CSS class(es) to add to this element
     * @param {String} prefix Optional prefix to prepend to each class
     * @param {String} suffix Optional suffix to append to each class
     */
    addCls: function(names, prefix, suffix) {
        if (!names) {
            return this;
        }

        if (!this.isSynchronized) {
            this.synchronize();
        }

        var dom = this.dom,
            map = this.hasClassMap,
            classList = this.classList,
            SEPARATOR = this.SEPARATOR,
            i, ln, name;

        prefix = prefix ? prefix + SEPARATOR : '';
        suffix = suffix ? SEPARATOR + suffix : '';

        if (typeof names == 'string') {
            names = names.split(this.spacesRe);
        }

        for (i = 0, ln = names.length; i < ln; i++) {
            name = prefix + names[i] + suffix;

            if (!map[name]) {
                map[name] = true;
                classList.push(name);
            }
        }

        dom.className = classList.join(' ');

        return this;
    },

    /**
     * Removes the given CSS class(es) from this Element
     * @param {String} names The CSS class(es) to remove from this element
     * @param {String} prefix Optional prefix to prepend to each class to be removed
     * @param {String} suffix Optional suffix to append to each class to be removed
     */
    removeCls: function(names, prefix, suffix) {
        if (!names) {
            return this;
        }

        if (!this.isSynchronized) {
            this.synchronize();
        }

        if (!suffix) {
            suffix = '';
        }

        var dom = this.dom,
            map = this.hasClassMap,
            classList = this.classList,
            SEPARATOR = this.SEPARATOR,
            i, ln, name;

        prefix = prefix ? prefix + SEPARATOR : '';
        suffix = suffix ? SEPARATOR + suffix : '';

        if (typeof names == 'string') {
            names = names.split(this.spacesRe);
        }

        for (i = 0, ln = names.length; i < ln; i++) {
            name = prefix + names[i] + suffix;

            if (map[name]) {
                delete map[name];
                Ext.Array.remove(classList, name);
            }
        }

        dom.className = classList.join(' ');

        return this;
    },

    /**
     * Replaces a CSS class on the element with another.  If the old name does not exist, the new name will simply be added.
     * @param {String} oldClassName The CSS class to replace
     * @param {String} newClassName The replacement CSS class
     * @return {Ext.dom.Element} this
     */
    replaceCls: function(oldName, newName, prefix, suffix) {
        return this.removeCls(oldName, prefix, suffix).addCls(newName, prefix, suffix);
    },

    /**
     * Checks if the specified CSS class exists on this element's DOM node.
     * @param {String} className The CSS class to check for
     * @return {Boolean} True if the class exists, else false
     */
    hasCls: function(name) {
        if (!this.isSynchronized) {
            this.synchronize();
        }

        return this.hasClassMap.hasOwnProperty(name);
    },

    /**
     * Toggles the specified CSS class on this element (removes it if it already exists, otherwise adds it).
     * @param {String} className The CSS class to toggle
     * @return {Ext.dom.Element} this
     */
    toggleCls: function(className) {
        return this.hasCls(className) ? this.removeCls(className) : this.addCls(className);
    },

    /**
     * Set the width of this Element.
     * @param {Number/String} width The new width.
     * @return {Ext.dom.Element} this
     */
    setWidth: function(width) {
        return this.setLengthValue(this.WIDTH, width);
    },

    /**
     * Set the height of this Element.
     * @param {Number/String} height The new height.
     * @return {Ext.dom.Element} this
     */
    setHeight: function(height) {
        return this.setLengthValue(this.HEIGHT, height);
    },

    /**
     * Set the size of this Element.
     *
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
     * @return {Ext.dom.Element} this
     */
    setSize: function(width, height) {
        if (Ext.isObject(width)) {
            // in case of object from getSize()
            height = width.height;
            width = width.width;
        }

        this.setWidth(width);
        this.setHeight(height);

        return this;
    },

    /**
     * Set the minimum width of this Element.
     * @param {Number/String} width The new minimum width.
     * @return {Ext.dom.Element} this
     */
    setMinWidth: function(width) {
        return this.setLengthValue(this.MIN_WIDTH, width);
    },

    /**
     * Set the minimum height of this Element.
     * @param {Number/String} height The new minimum height.
     * @return {Ext.dom.Element} this
     */
    setMinHeight: function(height) {
        return this.setLengthValue(this.MIN_HEIGHT, height);
    },

    /**
     * Set the maximum width of this Element.
     * @param {Number/String} width The new maximum width.
     * @return {Ext.dom.Element} this
     */
    setMaxWidth: function(width) {
        return this.setLengthValue(this.MAX_WIDTH, width);
    },

    /**
     * Set the maximum height of this Element.
     * @param {Number/String} height The new maximum height.
     * @return {Ext.dom.Element} this
     */
    setMaxHeight: function(height) {
        return this.setLengthValue(this.MAX_HEIGHT, height);
    },

    /**
     * Sets the element's top position directly using CSS style (instead of {@link #setY}).
     * @param {String} top The top CSS property value
     * @return {Ext.dom.Element} this
     */
    setTop: function(top) {
        return this.setLengthValue(this.TOP, top);
    },

    /**
     * Sets the element's CSS right style.
     * @param {String} right The right CSS property value
     * @return {Ext.dom.Element} this
     */
    setRight: function(right) {
        return this.setLengthValue(this.RIGHT, right);
    },

    /**
     * Sets the element's CSS bottom style.
     * @param {String} bottom The bottom CSS property value
     * @return {Ext.dom.Element} this
     */
    setBottom: function(bottom) {
        return this.setLengthValue(this.BOTTOM, bottom);
    },

    /**
     * Sets the element's left position directly using CSS style (instead of {@link #setX}).
     * @param {String} left The left CSS property value
     * @return {Ext.dom.Element} this
     */
    setLeft: function(left) {
        return this.setLengthValue(this.LEFT, left);
    },

    setMargin: function(margin) {
        var domStyle = this.dom.style;

        if (margin || margin === 0) {
            margin = this.self.unitizeBox((margin === true) ? 5 : margin);
            domStyle.setProperty('margin', margin, 'important');
        }
        else {
            domStyle.removeProperty('margin-top');
            domStyle.removeProperty('margin-right');
            domStyle.removeProperty('margin-bottom');
            domStyle.removeProperty('margin-left');
        }
    },

    setPadding: function(padding) {
        var domStyle = this.dom.style;

        if (padding || padding === 0) {
            padding = this.self.unitizeBox((padding === true) ? 5 : padding);
            domStyle.setProperty('padding', padding, 'important');
        }
        else {
            domStyle.removeProperty('padding-top');
            domStyle.removeProperty('padding-right');
            domStyle.removeProperty('padding-bottom');
            domStyle.removeProperty('padding-left');
        }
    },

    setBorder: function(border) {
        var domStyle = this.dom.style;

        if (border || border === 0) {
            border = this.self.unitizeBox((border === true) ? 1 : border);
            domStyle.setProperty('border-width', border, 'important');
        }
        else {
            domStyle.removeProperty('border-top-width');
            domStyle.removeProperty('border-right-width');
            domStyle.removeProperty('border-bottom-width');
            domStyle.removeProperty('border-left-width');
        }
    },

    setLengthValue: function(name, value) {
        var domStyle = this.dom.style;

        if (value === null) {
            domStyle.removeProperty(name);
            return this;
        }

        if (typeof value == 'number') {
            value = value + 'px';
        }

        domStyle.setProperty(name, value, 'important');
        return this;
    },

    /**
     * Sets the visibility of the element (see details). If the visibilityMode is set to Element.DISPLAY, it will use
     * the display property to hide the element, otherwise it uses visibility. The default is to hide and show using the visibility property.
     * @param {Boolean} visible Whether the element is visible
     * @return {Ext.Element} this
     */
    setVisible: function(visible) {
        var mode = this.getVisibilityMode(),
            method = visible ? 'removeCls' : 'addCls';

        switch (mode) {
            case this.VISIBILITY:
                this.removeCls(['x-hidden-display', 'x-hidden-offsets']);
                this[method]('x-hidden-visibility');
                break;

            case this.DISPLAY:
                this.removeCls(['x-hidden-visibility', 'x-hidden-offsets']);
                this[method]('x-hidden-display');
                break;

            case this.OFFSETS:
                this.removeCls(['x-hidden-visibility', 'x-hidden-display']);
                this[method]('x-hidden-offsets');
                break;
        }

        return this;
    },

    getVisibilityMode: function() {
        var dom = this.dom,
            mode = Ext.dom.Element.data(dom, 'visibilityMode');

        if (mode === undefined) {
            Ext.dom.Element.data(dom, 'visibilityMode', mode = this.DISPLAY);
        }

        return mode;
    },

    /**
     * Use this to change the visisbiliy mode between {@link #VISIBILITY}, {@link #DISPLAY} or {@link #OFFSETS}.
     */
    setVisibilityMode: function(mode) {
        this.self.data(this.dom, 'visibilityMode', mode);

        return this;
    },

    /**
     * Shows this element.
     * Uses display mode to determine whether to use "display" or "visibility". See {@link #setVisible}.
     */
    show: function() {
        var dom = this.dom;
        if (dom) {
            dom.style.removeProperty('display');
        }
    },

    /**
     * Hides this element.
     * Uses display mode to determine whether to use "display" or "visibility". See {@link #setVisible}.
     */
    hide: function() {
        var dom = this.dom,
            domStyle = dom.style,
            needsRedraw = Ext.os.is.iOS;

        if (domStyle.getPropertyValue('display') !== 'none') {
            // iOS sometimes has a long delay before redrawing elements with their CSS 'display' set to 'none'
            // This force a redraw to make sure the element is hidden instantly
            if (needsRedraw) {
                domStyle.setProperty('display', 'none', 'important');
                dom.offsetHeight;
                domStyle.removeProperty('display');
                dom.offsetHeight;
            }

            domStyle.setProperty('display', 'none', 'important');
        }

    },

    setVisibility: function(isVisible) {
        var domStyle = this.dom.style;

        if (isVisible) {
            domStyle.removeProperty('visibility');
        }
        else {
            domStyle.setProperty('visibility', 'hidden', 'important');
        }
    },

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
    addStyles: function(sides, styles) {
        var totalSize = 0,
            sidesArr = sides.match(this.wordsRe),
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
            me.styleHooks[prop] = hook = { name: this.self.normalize(prop) };
        }
        if (hook.get) {
            return hook.get(dom, me);
        }

        cs = window.getComputedStyle(dom, '');

        // why the dom.style lookup? It is not true that "style == computedStyle" as
        // well as the fact that 0/false are valid answers...
        result = (cs && cs[hook.name]); // || dom.style[hook.name];

        // Webkit returns rgb values for transparent, how does this work n IE9+
        //        if (!supportsTransparentColor && result == 'rgba(0, 0, 0, 0)') {
        //            result = 'transparent';
        //        }

        return result;
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
            name, hook;

        // we don't promote the 2-arg form to object-form to avoid the overhead...
        if (typeof prop == 'string') {
            hook = hooks[prop];

            if (!hook) {
                hooks[prop] = hook = { name: Ext.dom.Element.normalize(prop) };
            }
            value = valueFrom(value, '');

            if (hook.set) {
                hook.set(dom, value, me);
            } else {
                style[hook.name] = value;
            }
        }
        else {
            for (name in prop) {
                if (prop.hasOwnProperty(name)) {
                    hook = hooks[name];

                    if (!hook) {
                        hooks[name] = hook = { name: Ext.dom.Element.normalize(name) };
                    }

                    value = valueFrom(prop[name], '');

                    if (hook.set) {
                        hook.set(dom, value, me);
                    }
                    else {
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
        return height > 0 ? height : 0;
    },

    /**
     * Returns the offset width of the element
     * @param {Boolean} [contentWidth] true to get the width minus borders and padding
     * @return {Number} The element's width
     */
    getWidth: function(contentWidth) {
        var dom = this.dom,
            width = contentWidth ? (dom.clientWidth - this.getPadding("lr")) : dom.offsetWidth;
        return width > 0 ? width : 0;
    },

    /**
     * Gets the width of the border(s) for the specified side(s)
     * @param {String} side Can be t, l, r, b or any combination of those to add multiple values. For example,
     * passing `'lr'` would get the border **l**eft width + the border **r**ight width.
     * @return {Number} The width of the sides passed added together
     */
    getBorderWidth: function(side) {
        return this.addStyles(side, this.borders);
    },

    /**
     * Gets the width of the padding(s) for the specified side(s)
     * @param {String} side Can be t, l, r, b or any combination of those to add multiple values. For example,
     * passing `'lr'` would get the padding **l**eft + the padding **r**ight.
     * @return {Number} The padding of the sides passed added together
     */
    getPadding: function(side) {
        return this.addStyles(side, this.paddings);
    },

    /**
     * More flexible version of {@link #setStyle} for setting style properties.
     * @param {String/Object/Function} styles A style specification string, e.g. "width:100px", or object in the form {width:"100px"}, or
     * a function which returns such a specification.
     * @return {Ext.dom.Element} this
     */
    applyStyles: function(styles) {
        if (styles) {
            var dom = this.dom,
                styleType, i, len;

            if (typeof styles == 'function') {
                styles = styles.call();
            }
            styleType = typeof styles;
            if (styleType == 'string') {
                styles = Ext.util.Format.trim(styles).split(this.styleSplitRe);
                for (i = 0, len = styles.length; i < len;) {
                    dom.style[Ext.dom.Element.normalize(styles[i++])] = styles[i++];
                }
            }
            else if (styleType == 'object') {
                this.setStyle(styles);
            }
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
    repaint: function() {
        var dom = this.dom;
        this.addCls(Ext.baseCSSPrefix + 'repaint');
        setTimeout(function() {
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
    getMargin: function(side) {
        var me = this,
            hash = {t: "top", l: "left", r: "right", b: "bottom"},
            o = {},
            key;

        if (!side) {
            for (key in me.margins) {
                o[hash[key]] = parseFloat(me.getStyle(me.margins[key])) || 0;
            }
            return o;
        } else {
            return me.addStyles.call(me, side, me.margins);
        }
    }
});

//<deprecated product=touch since=2.0>
Ext.dom.Element.addMembers({
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
     * @deprecated 2.0.0
     * @return {Object} Object describing width and height.
     * @return {Number} return.width
     * @return {Number} return.height
     */
    getViewSize: function() {
        //<debug warn>
        Ext.Logger.deprecate("Ext.dom.Element.getViewSize() is deprecated", this);
        //</debug>

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
     * Returns true if the value of the given property is visually transparent. This
     * may be due to a 'transparent' style value or an rgba value with 0 in the alpha
     * component.
     * @deprecated 2.0.0
     * @param {String} prop The style property whose value is to be tested.
     * @return {Boolean} True if the style property is visually transparent.
     */
    isTransparent: function(prop) {
        //<debug warn>
        Ext.Logger.deprecate("Ext.dom.Element.isTransparent() is deprecated", this);
        //</debug>

        var value = this.getStyle(prop);

        return value ? this.transparentRe.test(value) : false;
    },


    /**
     * Adds one or more CSS classes to this element and removes the same class(es) from all siblings.
     * @deprecated 2.0.0
     * @param {String/String[]} className The CSS class to add, or an array of classes
     * @return {Ext.dom.Element} this
     */
    radioCls: function(className) {
        //<debug warn>
        Ext.Logger.deprecate("Ext.dom.Element.radioCls() is deprecated", this);
        //</debug>

        var cn = this.dom.parentNode.childNodes,
            v;
        className = Ext.isArray(className) ? className : [className];
        for (var i = 0, len = cn.length; i < len; i++) {
            v = cn[i];
            if (v && v.nodeType == 1) {
                Ext.fly(v, '_internal').removeCls(className);
            }
        }
        return this.addCls(className);
    }
});
//</deprecated>

/**
 * @class Ext.dom.Element
 */
Ext.dom.Element.addMembers({
    getParent: function() {
        return Ext.get(this.dom.parentNode);
    },

    getFirstChild: function() {
        return Ext.get(this.dom.firstElementChild);
    },

    /**
     * Returns true if this element is an ancestor of the passed element
     * @param {HTMLElement/String} element The element to check
     * @return {Boolean} True if this element is an ancestor of el, else false
     */
    contains: function(element) {
        if (!element) {
            return false;
        }

        var dom = Ext.getDom(element);

        // we need el-contains-itself logic here because isAncestor does not do that:
        return (dom === this.dom) || this.self.isAncestor(this.dom, dom);
    },

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

/**
 * This class encapsulates a *collection* of DOM elements, providing methods to filter members, or to perform collective
 * actions upon the whole set.
 *
 * Although they are not listed, this class supports all of the methods of {@link Ext.dom.Element} and
 * {@link Ext.Anim}. The methods from these classes will be performed on all the elements in this collection.
 *
 * Example:
 *
 *     var els = Ext.select("#some-el div.some-class");
 *     // or select directly from an existing element
 *     var el = Ext.get('some-el');
 *     el.select('div.some-class');
 *
 *     els.setWidth(100); // all elements become 100 width
 *     els.hide(true); // all elements fade out and hide
 *     // or
 *     els.setWidth(100).hide(true);
 */
Ext.define('Ext.dom.CompositeElementLite', {
    alternateClassName: ['Ext.CompositeElementLite', 'Ext.CompositeElement'],

    requires: ['Ext.dom.Element'],

    statics: {
        /**
         * @private
         * @static
         * Copies all of the functions from Ext.dom.Element's prototype onto CompositeElementLite's prototype.
         */
        importElementMethods: function() {

        }
    },

    constructor: function(elements, root) {
        /**
         * @property {HTMLElement[]} elements
         * The Array of DOM elements which this CompositeElement encapsulates. Read-only.
         *
         * This will not *usually* be accessed in developers' code, but developers wishing to augment the capabilities
         * of the CompositeElementLite class may use it when adding methods to the class.
         *
         * For example to add the `nextAll` method to the class to **add** all following siblings of selected elements,
         * the code would be
         *
         *     Ext.override(Ext.dom.CompositeElementLite, {
         *         nextAll: function() {
         *             var elements = this.elements, i, l = elements.length, n, r = [], ri = -1;
         *
         *             // Loop through all elements in this Composite, accumulating
         *             // an Array of all siblings.
         *             for (i = 0; i < l; i++) {
         *                 for (n = elements[i].nextSibling; n; n = n.nextSibling) {
         *                     r[++ri] = n;
         *                 }
         *             }
         *
         *             // Add all found siblings to this Composite
         *             return this.add(r);
         *         }
         *     });
         *
         */
        this.elements = [];
        this.add(elements, root);
        this.el = new Ext.dom.Element.Fly();
    },

    isComposite: true,

    // private
    getElement: function(el) {
        // Set the shared flyweight dom property to the current element
        return this.el.attach(el).synchronize();
    },

    // private
    transformElement: function(el) {
        return Ext.getDom(el);
    },

    /**
     * Returns the number of elements in this Composite.
     * @return {Number}
     */
    getCount: function() {
        return this.elements.length;
    },

    /**
     * Adds elements to this Composite object.
     * @param {HTMLElement[]/Ext.dom.CompositeElementLite} els Either an Array of DOM elements to add, or another Composite
     * object who's elements should be added.
     * @return {Ext.dom.CompositeElementLite} This Composite object.
     */
    add: function(els, root) {
        var elements = this.elements,
            i, ln;

        if (!els) {
            return this;
        }

        if (typeof els == "string") {
            els = Ext.dom.Element.selectorFunction(els, root);
        }
        else if (els.isComposite) {
            els = els.elements;
        }
        else if (!Ext.isIterable(els)) {
            els = [els];
        }

        for (i = 0, ln = els.length; i < ln; ++i) {
            elements.push(this.transformElement(els[i]));
        }

        return this;
    },

    invoke: function(fn, args) {
        var elements = this.elements,
            ln = elements.length,
            element,
            i;

        for (i = 0; i < ln; i++) {
            element = elements[i];

            if (element) {
                Ext.dom.Element.prototype[fn].apply(this.getElement(element), args);
            }
        }
        return this;
    },

    /**
     * Returns a flyweight Element of the dom element object at the specified index
     * @param {Number} index
     * @return {Ext.dom.Element}
     */
    item: function(index) {
        var el = this.elements[index],
            out = null;

        if (el) {
            out = this.getElement(el);
        }

        return out;
    },

    // fixes scope with flyweight
    addListener: function(eventName, handler, scope, opt) {
        var els = this.elements,
                len = els.length,
                i, e;

        for (i = 0; i < len; i++) {
            e = els[i];
            if (e) {
                Ext.EventManager.on(e, eventName, handler, scope || e, opt);
            }
        }
        return this;
    },
    /**
     * Calls the passed function for each element in this composite.
     * @param {Function} fn The function to call.
     * @param {Ext.dom.Element} fn.el The current Element in the iteration. **This is the flyweight
     * (shared) Ext.dom.Element instance, so if you require a a reference to the dom node, use el.dom.**
     * @param {Ext.dom.CompositeElementLite} fn.c This Composite object.
     * @param {Number} fn.index The zero-based index in the iteration.
     * @param {Object} [scope] The scope (this reference) in which the function is executed.
     * Defaults to the Element.
     * @return {Ext.dom.CompositeElementLite} this
     */
    each: function(fn, scope) {
        var me = this,
                els = me.elements,
                len = els.length,
                i, e;

        for (i = 0; i < len; i++) {
            e = els[i];
            if (e) {
                e = this.getElement(e);
                if (fn.call(scope || e, e, me, i) === false) {
                    break;
                }
            }
        }
        return me;
    },

    /**
     * Clears this Composite and adds the elements passed.
     * @param {HTMLElement[]/Ext.dom.CompositeElementLite} els Either an array of DOM elements, or another Composite from which
     * to fill this Composite.
     * @return {Ext.dom.CompositeElementLite} this
     */
    fill: function(els) {
        var me = this;
        me.elements = [];
        me.add(els);
        return me;
    },

    /**
     * Filters this composite to only elements that match the passed selector.
     * @param {String/Function} selector A string CSS selector or a comparison function. The comparison function will be
     * called with the following arguments:
     * @param {Ext.dom.Element} selector.el The current DOM element.
     * @param {Number} selector.index The current index within the collection.
     * @return {Ext.dom.CompositeElementLite} this
     */
    filter: function(selector) {
        var els = [],
                me = this,
                fn = Ext.isFunction(selector) ? selector
                        : function(el) {
                    return el.is(selector);
                };

        me.each(function(el, self, i) {
            if (fn(el, i) !== false) {
                els[els.length] = me.transformElement(el);
            }
        });

        me.elements = els;
        return me;
    },

    /**
     * Find the index of the passed element within the composite collection.
     * @param {String/HTMLElement/Ext.Element/Number} el The id of an element, or an Ext.dom.Element, or an HtmlElement
     * to find within the composite collection.
     * @return {Number} The index of the passed Ext.dom.Element in the composite collection, or -1 if not found.
     */
    indexOf: function(el) {
        return Ext.Array.indexOf(this.elements, this.transformElement(el));
    },

    /**
     * Replaces the specified element with the passed element.
     * @param {String/HTMLElement/Ext.Element/Number} el The id of an element, the Element itself, the index of the
     * element in this composite to replace.
     * @param {String/Ext.Element} replacement The id of an element or the Element itself.
     * @param {Boolean} [domReplace] True to remove and replace the element in the document too.
     * @return {Ext.dom.CompositeElementLite} this
     */
    replaceElement: function(el, replacement, domReplace) {
        var index = !isNaN(el) ? el : this.indexOf(el),
                d;
        if (index > -1) {
            replacement = Ext.getDom(replacement);
            if (domReplace) {
                d = this.elements[index];
                d.parentNode.insertBefore(replacement, d);
                Ext.removeNode(d);
            }
            Ext.Array.splice(this.elements, index, 1, replacement);
        }
        return this;
    },

    /**
     * Removes all elements.
     */
    clear: function() {
        this.elements = [];
    },

    addElements: function(els, root) {
        if (!els) {
            return this;
        }

        if (typeof els == "string") {
            els = Ext.dom.Element.selectorFunction(els, root);
        }

        var yels = this.elements;

        Ext.each(els, function(e) {
            yels.push(Ext.get(e));
        });

        return this;
    },

    /**
     * Returns the first Element
     * @return {Ext.dom.Element}
     */
    first: function() {
        return this.item(0);
    },

    /**
     * Returns the last Element
     * @return {Ext.dom.Element}
     */
    last: function() {
        return this.item(this.getCount() - 1);
    },

    /**
     * Returns true if this composite contains the passed element
     * @param {String/HTMLElement/Ext.Element/Number} el The id of an element, or an Ext.Element, or an HtmlElement to
     * find within the composite collection.
     * @return {Boolean}
     */
    contains: function(el) {
        return this.indexOf(el) != -1;
    },

    /**
     * Removes the specified element(s).
     * @param {String/HTMLElement/Ext.Element/Number} el The id of an element, the Element itself, the index of the
     * element in this composite or an array of any of those.
     * @param {Boolean} [removeDom] True to also remove the element from the document
     * @return {Ext.dom.CompositeElementLite} this
     */
    removeElement: function(keys, removeDom) {
        var me = this,
                elements = this.elements,
                el;

        Ext.each(keys, function(val) {
            if ((el = (elements[val] || elements[val = me.indexOf(val)]))) {
                if (removeDom) {
                    if (el.dom) {
                        el.remove();
                    }
                    else {
                        Ext.removeNode(el);
                    }
                }
                Ext.Array.erase(elements, val, 1);
            }
        });

        return this;
    }

}, function() {
    var Element = Ext.dom.Element,
        elementPrototype = Element.prototype,
        prototype = this.prototype,
        name;

    for (name in elementPrototype) {
        if (typeof elementPrototype[name] == 'function'){
            (function(key) {
                prototype[key] = prototype[key] || function() {
                    return this.invoke(key, arguments);
                };
            }).call(prototype, name);
        }
    }

    prototype.on = prototype.addListener;

    if (Ext.DomQuery){
        Element.selectorFunction = Ext.DomQuery.select;
    }

    /**
     * Selects elements based on the passed CSS selector to enable {@link Ext.Element Element} methods
     * to be applied to many related elements in one statement through the returned
     * {@link Ext.dom.CompositeElementLite CompositeElementLite} object.
     * @param {String/HTMLElement[]} selector The CSS selector or an array of elements
     * @param {HTMLElement/String} [root] The root element of the query or id of the root
     * @return {Ext.dom.CompositeElementLite}
     * @member Ext.dom.Element
     * @method select
     */
   Element.select = function(selector, root) {
        var elements;

        if (typeof selector == "string") {
            elements = Element.selectorFunction(selector, root);
        }
        else if (selector.length !== undefined) {
            elements = selector;
        }
        else {
            //<debug>
            throw new Error("[Ext.select] Invalid selector specified: " + selector);
            //</debug>
        }

        return new Ext.CompositeElementLite(elements);
    };

    /**
     * @member Ext
     * @method select
     * @alias Ext.dom.Element#select
     */
    Ext.select = function() {
        return Element.select.apply(Element, arguments);
    };
});


