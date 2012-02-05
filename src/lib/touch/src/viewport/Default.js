/*
 * This is the default viewport instance used when you use {@link Ext#setup} or {@link Ext#application}.
 * You can override any configurations in this call by setting the `viewport` property when calling
 * {@link Ext#setup}:
 *
 *     Ext.setup({
 *         viewport: {
 *             preventZooming: true,
 *             autoMaximize: false
 *         },
 *         onReady: function() {
 *             //...
 *         }
 *     });
 *
 * or when using {@link Ext#application}:
 *
 *     Ext.application({
 *         viewport: {
 *             preventZooming: true
 *         },
 *         launch: function() {
 *             //...
 *         }
 *     });
 *
 */
Ext.define('Ext.viewport.Default', {
    extend: 'Ext.Container',

    xtype: 'viewport',

    PORTRAIT: 'portrait',

    LANDSCAPE: 'landscape',

    requires: [
        'Ext.LoadMask'
    ],

// Move all the following members to another class
/** @class Ext.Viewport */

    /**
     * @event ready
     * Fires when the Viewport is in the DOM and ready
     * @param {Ext.Viewport} this
     */

    /**
     * @event maximize
     * Fires when the Viewport is maximized
     * @param {Ext.Viewport} this
     */

    /**
     * @event orientationchange
     * Fires when the Viewport orientation has changed
     * @param {Ext.Viewport} this
     * @param {String} newOrientation The new orientation
     * @param {Number} width The width of the Viewport
     * @param {Number} height The height of the Viewport
     */

    /**
     * @event resize
     * Fires when the Viewport is resized
     * @param {Ext.Viewport} this
     * @param {Number} width The width of the Viewport
     * @param {Number} height The height of the Viewport
     */

    config: {
        /**
         * @cfg {Boolean} autoMaximize
         * Whether or not to always automatically maximize the viewport on first load and all subsequent orientation changes.
         *
         * This is set to `false` by default for a number of reasons:
         *
         * - Orientation change performance is drastically reduced when this is enabled, on all devices.
         * - On some devices (mostly Android) this can sometimes cause issues when the default browser zoom setting is changed.
         * - When wrapping your phone in a native shell, you may get a blank screen.
         *
         * @accessor
         */
        autoMaximize: false,

        /**
         * @cfg {Boolean} preventPanning
         * Whether or not to always prevent default panning behavior of the
         * browser's viewport
         * @accessor
         */
        preventPanning: true,

        /**
         * @cfg {Boolean} preventZooming
         * Whether or not to always prevent default zooming feature of the
         * browser's viewport via finger gestures such as pinching and / or double-tapping.
         *
         * If this is set to `true`, `<a>` links will not work on any mobile devices. It also causes issues with the
         * {@link Ext.Map} component. So please be aware when setting this to true.
         * @accessor
         */
        preventZooming: false,

        /**
         * @hide
         */
        autoRender: true,

        /**
         * @cfg {Object/String} layout Configuration for this Container's layout. Example:
         *
         *    Ext.create('Ext.Container', {
         *        layout: {
         *            type: 'hbox',
         *            align: 'middle'
         *        },
         *        items: [
         *            {
         *                xtype: 'panel',
         *                flex: 1,
         *                style: 'background-color: red;'
         *            },
         *            {
         *                xtype: 'panel',
         *                flex: 2,
         *                style: 'background-color: green'
         *            }
         *        ]
         *    });
         *
         * See the layouts guide for more information
         *
         * Defaults to {@link Ext.layout.Card card}
         * @accessor
         */
        layout: 'card',

        /**
         * @cfg
         * @private
         */
        width: '100%',

        /**
         * @cfg
         * @private
         */
        height: '100%'
    },

    /**
     * @property {Boolean} isReady
     * True if the DOM is ready
     */
    isReady: false,

    isViewport: true,

    isMaximizing: false,

    id: 'ext-viewport',

    isInputRegex: /^(input|textarea|select)$/i,

    focusedElement: null,

    /**
     * @private
     */
    fullscreenItemCls: Ext.baseCSSPrefix + 'fullscreen',

    constructor: function(config) {
        var bind = Ext.Function.bind;

        this.activeShowByItems = {};
        this.activeShowByItemsCount = 0;

        this.doPreventPanning = bind(this.doPreventPanning, this);
        this.doPreventZooming = bind(this.doPreventZooming, this);

        this.maximizeOnEvents = ['ready', 'orientationchange'];

        this.orientation = this.determineOrientation();
        this.windowWidth = this.getWindowWidth();
        this.windowHeight = this.getWindowHeight();
        this.windowOuterHeight = this.getWindowOuterHeight();

        if (!this.stretchHeights) {
            this.stretchHeights = {};
        }

        this.callParent([config]);

        if (this.supportsOrientation()) {
            this.addWindowListener('orientationchange', bind(this.onOrientationChange, this));
        }
        else {
            this.addWindowListener('resize', bind(this.onResize, this));
        }

        document.addEventListener('focus', bind(this.onElementFocus, this), true);
        document.addEventListener('blur', bind(this.onElementBlur, this), true);

        Ext.onDocumentReady(this.onDomReady, this);

        this.on('ready', this.onReady, this, {single: true});

        this.getEventDispatcher().addListener('component', '*', 'fullscreen', 'onItemFullscreenChange', this);

        return this;
    },

    onDomReady: function() {
        this.isReady = true;
        this.fireEvent('ready', this);
    },

    onReady: function() {
        if (this.getAutoRender()) {
            this.render();
        }
    },

    onElementFocus: function(e) {
        this.focusedElement = e.target;
    },

    onElementBlur: function() {
        this.focusedElement = null;
    },

    render: function() {
        if (!this.rendered) {
            var body = Ext.getBody(),
                clsPrefix = Ext.baseCSSPrefix,
                classList = [],
                osEnv = Ext.os,
                osName = osEnv.name.toLowerCase(),
                osMajorVersion = osEnv.version.getMajor(),
                orientation = this.getOrientation();

            this.renderTo(body);

            // See https://sencha.jira.com/browse/TOUCH-1600
            classList.push(clsPrefix + osEnv.deviceType.toLowerCase());

            if (osEnv.is.iPad) {
                classList.push(clsPrefix + 'ipad');
            }

            classList.push(clsPrefix + osName);

            if (osMajorVersion) {
                classList.push(clsPrefix + osName + '-' + osMajorVersion);
            }

            if (osEnv.is.BlackBerry) {
                classList.push(clsPrefix + 'bb');
            }

            if (Ext.browser.is.Standalone) {
                classList.push(clsPrefix + 'standalone');
            }

            classList.push(clsPrefix + orientation);

            body.addCls(classList);
        }
    },

    applyAutoMaximize: function(autoMaximize) {
        if (autoMaximize) {
            this.on('ready', 'doAutoMaximizeOnReady', this, { single: true });
            this.on('orientationchange', 'doAutoMaximizeOnOrientationChange', this);
        }
        else {
            this.un('ready', 'doAutoMaximizeOnReady', this);
            this.un('orientationchange', 'doAutoMaximizeOnOrientationChange', this);
        }

        return autoMaximize;
    },

    applyPreventPanning: function(preventPanning) {
        if (preventPanning) {
            this.addWindowListener('touchmove', this.doPreventPanning, false);
        }
        else {
            this.removeWindowListener('touchmove', this.doPreventPanning, false);
        }

        return preventPanning;
    },

    applyPreventZooming: function(preventZooming) {
        if (preventZooming) {
            this.addWindowListener('touchstart', this.doPreventZooming, false);
        }
        else {
            this.removeWindowListener('touchstart', this.doPreventZooming, false);
        }

        return preventZooming;
    },

    doAutoMaximizeOnReady: function() {
        var controller = arguments[arguments.length - 1];

        controller.pause();

        this.isMaximizing = true;

        this.on('maximize', function() {
            this.isMaximizing = false;

            this.updateSize();

            controller.resume();

            this.fireEvent('ready', this);
        }, this, { single: true });

        this.maximize();
    },

    doAutoMaximizeOnOrientationChange: function() {
        var controller = arguments[arguments.length - 1],
            firingArguments = controller.firingArguments;

        controller.pause();

        this.isMaximizing = true;

        this.on('maximize', function() {
            this.isMaximizing = false;

            this.updateSize();

            firingArguments[1] = this.windowWidth;
            firingArguments[2] = this.windowHeight;

            controller.resume();
        }, this, { single: true });

        this.maximize();
    },

    doPreventPanning: function(e) {
        e.preventDefault();
    },

    doPreventZooming: function(e) {
        var target = e.target;

        if (target && target.nodeType === 1 && !this.isInputRegex.test(target.tagName)) {
            e.preventDefault();
        }
    },

    addWindowListener: function(eventName, fn, capturing) {
        window.addEventListener(eventName, fn, capturing);
    },

    removeWindowListener: function(eventName, fn, capturing) {
        window.removeEventListener(eventName, fn, capturing);
    },

    doAddListener: function(eventName, fn, scope, options) {
        if (eventName === 'ready' && this.isReady && !this.isMaximizing) {
            fn.call(scope);
            return this;
        }

        this.mixins.observable.doAddListener.apply(this, arguments);
    },

    addDispatcherListener: function(selector, name, fn, scope, options, order) {
        var dispatcher = this.getEventDispatcher();

        if (name === 'resize' && selector === this.getObservableId()) {
            return dispatcher.doAddListener(this.observableType, selector, name, fn, scope, options, order);
        }

        return this.callParent(arguments);
    },

    removeDispatcherListener: function(selector, name, fn, scope, order) {
        var dispatcher = this.getEventDispatcher();

        if (name === 'resize' && selector === this.getObservableId()) {
            return dispatcher.doRemoveListener(this.observableType, selector, name, fn, scope, order);
        }

        return this.callParent(arguments);
    },

    supportsOrientation: function() {
        return Ext.feature.has.Orientation;
    },

    onResize: function() {
        var oldWidth = this.windowWidth,
            oldHeight = this.windowHeight,
            width = this.getWindowWidth(),
            height = this.getWindowHeight(),
            currentOrientation = this.getOrientation(),
            newOrientation = this.determineOrientation();

        if (oldWidth !== width || oldHeight !== height) {
            this.fireResizeEvent(width, height);

            if (currentOrientation !== newOrientation) {
                this.fireOrientationChangeEvent(newOrientation, currentOrientation);
            }
        }
    },

    fireResizeEvent: function(width, height) {
        this.updateSize(width, height);
        this.fireEvent('resize', this, width, height);
    },

    onOrientationChange: function() {
        var currentOrientation = this.getOrientation(),
            newOrientation = this.determineOrientation();

        if (newOrientation !== currentOrientation) {
            this.fireOrientationChangeEvent(newOrientation, currentOrientation);
            this.fireResizeEvent(this.windowWidth, this.windowHeight);
        }
    },

    fireOrientationChangeEvent: function(newOrientation, oldOrientation) {
        var clsPrefix = Ext.baseCSSPrefix;
        Ext.getBody().replaceCls(clsPrefix + oldOrientation, clsPrefix + newOrientation);

        this.orientation = newOrientation;

        this.updateSize();
        this.fireEvent('orientationchange', this, newOrientation, this.windowWidth, this.windowHeight);
    },

    updateSize: function(width, height) {
        this.windowWidth = width !== undefined ? width : this.getWindowWidth();
        this.windowHeight = height !== undefined ? height : this.getWindowHeight();

        return this;
    },

    waitUntil: function(condition, onSatisfied, onTimeout, delay, timeoutDuration) {
        if (!delay) {
            delay = 50;
        }

        if (!timeoutDuration) {
            timeoutDuration = 2000;
        }

        var scope = this,
            elapse = 0;

        setTimeout(function repeat() {
            elapse += delay;

            if (condition.call(scope) === true) {
                if (onSatisfied) {
                    onSatisfied.call(scope);
                }
            }
            else {
                if (elapse >= timeoutDuration) {
                    if (onTimeout) {
                        onTimeout.call(scope);
                    }
                }
                else {
                    setTimeout(repeat, delay);
                }
            }
        }, delay);
    },

    maximize: function() {
        this.fireMaximizeEvent();
    },

    fireMaximizeEvent: function() {
        this.updateSize();
        this.fireEvent('maximize', this);
    },

    doSetHeight: function(height) {
        Ext.getBody().setHeight(height);

        this.callParent(arguments);
    },

    doSetWidth: function(width) {
        Ext.getBody().setWidth(width);

        this.callParent(arguments);
    },

    scrollToTop: function() {
        window.scrollTo(0, -1);
    },

    /**
     * Retrieves the document width.
     * @return {Number} width in pixels.
     */
    getWindowWidth: function() {
        return window.innerWidth;
    },

    /**
     * Retrieves the document height.
     * @return {Number} height in pixels.
     */
    getWindowHeight: function() {
        return window.innerHeight;
    },

    getWindowOuterHeight: function() {
        return window.outerHeight;
    },

    getWindowOrientation: function() {
        return window.orientation;
    },

    /**
     * Returns the current orientation.
     * @return {String} `portrait` or `landscape`
     */
    getOrientation: function() {
        return this.orientation;
    },

    getSize: function() {
        return {
            width: this.windowWidth,
            height: this.windowHeight
        };
    },

    determineOrientation: function() {
        var portrait = this.PORTRAIT,
            landscape = this.LANDSCAPE;

        if (this.supportsOrientation()) {
            if (this.getWindowOrientation() % 180 === 0) {
                return portrait;
            }

            return landscape;
        }
        else {
            if (this.getWindowHeight() >= this.getWindowWidth()) {
                return portrait;
            }

            return landscape;
        }
    },

    onItemFullscreenChange: function(item) {
        item.addCls(this.fullscreenItemCls);
        this.add(item);
    },

    keyboardHideField: null,

    /**
     * Convience method to hide the keyboard on devices, if it is visible.
     */
    hideKeyboard: function() {
        var me = this;

        if (Ext.os.is.iOS) {
            document.activeElement.blur();
            if (this.getAutoMaximize() && !this.isFullscreen()) {
                setTimeout(function() {
                    Ext.Viewport.scrollToTop();
                }, 50);
            }
        } else {
            if (!me.keyboardHideField) {
                me.keyboardHideField = document.createElement('input');
                me.keyboardHideField.setAttribute('type', 'text');
                me.keyboardHideField.setAttribute('style', 'position:absolute;top:-1000px');
                document.body.appendChild(me.keyboardHideField);
            }

            setTimeout(function() {
                me.keyboardHideField.focus();
                setTimeout(function() {
                    me.keyboardHideField.setAttribute('style', 'display:none;');
                }, 50);
            }, 50);
        }
    }
});
