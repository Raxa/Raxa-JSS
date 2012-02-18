/**
 * @class Ext
 */
Ext.apply(Ext, {
    /**
     * The version of the framework
     * @type String
     */
    version : '1.1.1',
    versionDetail : {
        major : 1,
        minor : 1,
        patch : 1
    },
    
    /**
     * Sets up a page for use on a mobile device.
     * @param {Object} config
     *
     * Valid configurations are:
     * <ul>
     *  <li>fullscreen - Boolean - Sets an appropriate meta tag for Apple devices to run in full-screen mode.</li>
     *  <li>tabletStartupScreen - String - Startup screen to be used on an iPad. The image must be 768x1004 and in portrait orientation.</li>
     *  <li>phoneStartupScreen - String - Startup screen to be used on an iPhone or iPod touch. The image must be 320x460 and in 
     *  portrait orientation.</li>
     *  <li>icon - Default icon to use. This will automatically apply to both tablets and phones. These should be 72x72.</li>
     *  <li>tabletIcon - String - An icon for only tablets. (This config supersedes icon.) These should be 72x72.</li>
     *  <li>phoneIcon - String - An icon for only phones. (This config supersedes icon.) These should be 57x57.</li>
     *  <li>glossOnIcon - Boolean - Add gloss on icon on iPhone, iPad and iPod Touch</li>
     *  <li>statusBarStyle - String - Sets the status bar style for fullscreen iPhone OS web apps. Valid options are default, black, 
     *  or black-translucent.</li>
     *  <li>onReady - Function - Function to be run when the DOM is ready.<li>
     *  <li>scope - Scope - Scope for the onReady configuraiton to be run in.</li>
     * </ul>
     */
    setup: function(config) {
        if (config && typeof config == 'object') {
            if (config.addMetaTags !== false) {
                this.addMetaTags(config);
            }

            if (Ext.isFunction(config.onReady)) {
                var me = this;

                Ext.onReady(function() {
                    var args = arguments;

                    if (config.fullscreen !== false) {
                        Ext.Viewport.init(function() {
                            config.onReady.apply(me, args);
                        });
                    }
                    else {
                        config.onReady.apply(this, args);
                    }
                }, config.scope);
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
    getDom : function(el) {
        if (!el || !document) {
            return null;
        }

        return el.dom ? el.dom : (typeof el == 'string' ? document.getElementById(el) : el);
    },
    
    /**
     * <p>Removes this element from the document, removes all DOM event listeners, and deletes the cache reference.
     * All DOM event listeners are removed from this element. If {@link Ext#enableNestedListenerRemoval} is
     * <code>true</code>, then DOM event listeners are also removed from all child nodes. The body node
     * will be ignored if passed in.</p>
     * @param {HTMLElement} node The node to remove
     */
    removeNode : function(node) {
        if (node && node.parentNode && node.tagName != 'BODY') {
            Ext.EventManager.removeAll(node);
            node.parentNode.removeChild(node);
            delete Ext.cache[node.id];
        }
    },
    
    /**
     * @private
     * Creates meta tags for a given config object. This is usually just called internally from Ext.setup - see
     * that method for full usage. Extracted into its own function so that Ext.Application and other classes can
     * call it without invoking all of the logic inside Ext.setup.
     * @param {Object} config The meta tag configuration object
     */
    addMetaTags: function(config) {
        if (!Ext.isObject(config)) {
            return;
        }
        
        var head = Ext.get(document.getElementsByTagName('head')[0]),
            tag, precomposed;

        /*
         * The viewport meta tag. This disables user scaling. This is supported
         * on most Android phones and all iOS devices and will probably be supported
         * on most future devices (like Blackberry, Palm etc).
         */
        if (!Ext.is.Desktop) {
            tag = Ext.get(document.createElement('meta'));
            tag.set({
                name: 'viewport',
                content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0;'
            });
            head.appendChild(tag);                    
        }
        
        /*
         * We want to check now for iOS specific meta tags. Unfortunately most
         * of these are not supported on devices other then iOS.
         */
        if (Ext.is.iOS) {
            /*
             * On iOS, if you save to home screen, you can decide if you want
             * to launch the app fullscreen (without address bar). You can also
             * change the styling of the status bar at the top of the screen.
             */                
            if (config.fullscreen !== false) {
                tag = Ext.get(document.createElement('meta'));
                tag.set({
                    name: 'apple-mobile-web-app-capable',
                    content: 'yes'
                });
                head.appendChild(tag);

                if (Ext.isString(config.statusBarStyle)) {
                    tag = Ext.get(document.createElement('meta'));
                    tag.set({
                        name: 'apple-mobile-web-app-status-bar-style',
                        content: config.statusBarStyle
                    });
                    head.appendChild(tag);
                }
            }
            
            /*
             * iOS allows you to specify a startup screen. This is displayed during
             * the startup of your app if you save to your homescreen. Since we could
             * be dealing with an iPad or iPhone/iPod, we have a tablet startup screen
             * and a phone startup screen.
             */
            if (config.tabletStartupScreen && Ext.is.iPad) {
                tag = Ext.get(document.createElement('link'));
                tag.set({
                    rel: 'apple-touch-startup-image',
                    href: config.tabletStartupScreen
                }); 
                head.appendChild(tag);                  
            }
            
            if (config.phoneStartupScreen && !Ext.is.iPad) {
                tag = Ext.get(document.createElement('link'));
                tag.set({
                    rel: 'apple-touch-startup-image',
                    href: config.phoneStartupScreen
                });
                head.appendChild(tag);
            }
            
            /*
             * On iOS you can specify the icon used when you save the app to your
             * homescreen. You can set an icon that will be used for both iPads
             * and iPhone/iPod, or you can specify specific icons for both.
             */
            if (config.icon) {
                config.phoneIcon = config.tabletIcon = config.icon;
            }
            
            precomposed = (config.glossOnIcon === false) ? '-precomposed' : '';
            if (Ext.is.iPad && Ext.isString(config.tabletIcon)) {
                tag = Ext.get(document.createElement('link'));
                tag.set({
                    rel: 'apple-touch-icon' + precomposed,
                    href: config.tabletIcon
                });
                head.appendChild(tag);
            } 
            else if (!Ext.is.iPad && Ext.isString(config.phoneIcon)) {
                tag = Ext.get(document.createElement('link'));
                tag.set({
                    rel: 'apple-touch-icon' + precomposed,
                    href: config.phoneIcon
                });
                head.appendChild(tag);
            }
        }
    }
});

//Initialize doc classes and feature detections
(function() {
    var initExt = function() {
        // find the body element
        var bd = Ext.getBody(),
            cls = [];
        if (!bd) {
            return false;
        }
        var Is = Ext.is; 
        if (Is.Phone) {
            cls.push('x-phone');
        }
        else if (Is.Tablet) {
            cls.push('x-tablet');
        }
        else if (Is.Desktop) {
            cls.push('x-desktop');
        }
        if (Is.iPad) {
            cls.push('x-ipad');
        }
        if (Is.iOS) {
            cls.push('x-ios');
        }
        if (Is.Android) {
            cls.push('x-android', 'x-android-' + Is.AndroidMajorVersion);
        }
        if (Is.Blackberry) {
            cls.push('x-bb');
        }
        if (Is.Standalone) {
            cls.push('x-standalone');
        }
        if (cls.length) {
            bd.addCls(cls);
        }
        return true;
    };

    if (!initExt()) {
        Ext.onReady(initExt);
    }
})();

/**
 * @class Ext.Viewport
 * @singleton
 * @ignore
 * @private
 *
 * Handles viewport sizing for the whole application
 */

Ext.Viewport = new (Ext.extend(Ext.util.Observable, {
    constructor: function() {
        var me = this;

        this.addEvents(
            'orientationchange',
            'resize'
        );

        this.stretchSizes = {};

        if (Ext.supports.OrientationChange) {
            window.addEventListener('orientationchange', Ext.createDelegate(me.onOrientationChange, me), false);
        }
        else {
            window.addEventListener('resize', Ext.createDelegate(me.onResize, me), false);
        }

        if (!Ext.desktop) {
            document.addEventListener('touchstart', Ext.createDelegate(me.onTouchStartCapturing, me), true);
        }
    },

    init: function(fn, scope) {
        var me = this,
            stretchSize = Math.max(window.innerHeight, window.innerWidth) * 2,
            body = Ext.getBody();

        me.updateOrientation();

        this.initialHeight = window.innerHeight;
        this.initialOrientation = this.orientation;

        body.setHeight(stretchSize);

        Ext.gesture.Manager.freeze();

        this.scrollToTop();
        // These 2 timers here are ugly but it's the only way to
        // make address bar hiding works on all the devices we have
        // including the new Galaxy Tab
        setTimeout(function() {
            me.scrollToTop();
            setTimeout(function() {
                me.scrollToTop();
                me.initialHeight = Math.max(me.initialHeight, window.innerHeight);

                if (fn) {
                    fn.apply(scope || window);
                }

                me.updateBodySize();

                Ext.gesture.Manager.thaw();
            }, 500);
        }, 500);

    },

    scrollToTop: function() {
        if (Ext.is.iOS) {
            if (Ext.is.Phone) {
                document.body.scrollTop = document.body.scrollHeight;
            }
        }
        else if (Ext.is.Blackberry) {
            window.scrollTo(0, 1000);
        }
        else {
            window.scrollTo(0, 1);
        }
    },

    updateBodySize: function() {
        Ext.getBody().setSize(window.innerWidth, window.innerHeight);
    },

    updateOrientation: function() {
        this.lastSize = this.getSize();
        this.orientation = this.getOrientation();
    },

    onTouchStartCapturing: function(e) {
        if (!Ext.currentlyFocusedField && Ext.is.iOS) {
            this.scrollToTop();
        }
    },

    onOrientationChange: function() {
        var me = this,
            body = Ext.getBody();

        if (!Ext.is.Phone) {
            body.setHeight(body.getWidth());

            this.updateOrientation();

            this.fireEvent('orientationchange', this, this.orientation);
            me.scrollToTop();
            me.updateBodySize();
            me.fireResizeEvent();
            Ext.repaint();

            return;
        }

        Ext.gesture.Manager.freeze();

        body.setHeight(body.getWidth());

        this.updateOrientation();

        this.fireEvent('orientationchange', this, this.orientation);

        setTimeout(function() {
            me.scrollToTop();

            setTimeout(function() {
                me.updateBodySize();
                me.fireResizeEvent();

                Ext.gesture.Manager.thaw();

                Ext.repaint();
            }, 200);
        }, 200);
    },

    fireResizeEvent: function() {
        var me = this;

        if (!Ext.is.iOS) {
            if (this.resizeEventTimer) {
                clearTimeout(this.resizeEventTimer);
            }

            this.resizeEventTimer = setTimeout(function() {
                me.fireEvent('resize', me, me.getSize());
            }, 500);
        } else {
            me.fireEvent('resize', me, me.getSize());
        }
    },

    onResize: function() {
        if (this.orientation != this.getOrientation()) {
            this.onOrientationChange();
        } else {
            var size = this.getSize();

            if (!Ext.is.iOS && !Ext.is.Desktop) {
                if ((size.width == this.lastSize.width && size.height > this.lastSize.height) ||
                    (size.height == this.lastSize.height && size.width > this.lastSize.width)) {
                    this.fireEvent('resize', this, size);
                }
            } else {
                this.fireEvent('resize', this, size);
            }
        }
    },

    getSize: function() {
        var size = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        if (!Ext.is.Desktop) {
            size.height = (this.orientation == this.initialOrientation) ?
                            Math.max(this.initialHeight, size.height) :
                            size.height;
        }

        return size;
    },

    getOffset: function() {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        };
    },

    getOrientation: function() {
        var me = this,
            size = me.getSize(),
            androidTablet, orientation;

        if (window.hasOwnProperty('orientation')) {
            orientation = window.orientation;
            // Android 3 oientation is off 90 degrees from every other device on the planet...
            androidTablet = Ext.is.Android && Ext.is.AndroidMajorVersion === 3;
            if (orientation % 180 === 0) {
                return androidTablet ? 'landscape' : 'portrait';
            }
            else {
                return androidTablet ? 'portrait' : 'landscape';
            }
        }
        else {
            if (!Ext.is.iOS && !Ext.is.Desktop) {
                if ((size.width == me.lastSize.width && size.height < me.lastSize.height) ||
                    (size.height == me.lastSize.height && size.width < me.lastSize.width)) {
                    return me.orientation;
                }
            }

            return (window.innerHeight > window.innerWidth) ? 'portrait' : 'landscape';
        }

    }

}));

/**
 * @class Ext.util.TapRepeater
 * @extends Ext.util.Observable
 *
 * A wrapper class which can be applied to any element. Fires a "tap" event while
 * touching the device. The interval between firings may be specified in the config but
 * defaults to 20 milliseconds.
 *
 * @constructor
 * @param {Mixed} el The element to listen on
 * @param {Object} config
 */
Ext.util.TapRepeater = Ext.extend(Ext.util.Observable, {

    constructor: function(el, config) {
        this.el = Ext.get(el);

        Ext.apply(this, config);

        this.addEvents(
        /**
         * @event touchstart
         * Fires when the touch is started.
         * @param {Ext.util.TapRepeater} this
         * @param {Ext.EventObject} e
         */
        "touchstart",
        /**
         * @event tap
         * Fires on a specified interval during the time the element is pressed.
         * @param {Ext.util.TapRepeater} this
         * @param {Ext.EventObject} e
         */
        "tap",
        /**
         * @event touchend
         * Fires when the touch is ended.
         * @param {Ext.util.TapRepeater} this
         * @param {Ext.EventObject} e
         */
        "touchend"
        );

        this.el.on({
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            scope: this
        });

        if (this.preventDefault || this.stopDefault) {
            this.el.on('tap', this.eventOptions, this);
        }

        Ext.util.TapRepeater.superclass.constructor.call(this);
    },

    interval: 10,
    delay: 250,
    preventDefault: true,
    stopDefault: false,
    timer: 0,

    // @private
    eventOptions: function(e) {
        if (this.preventDefault) {
            e.preventDefault();
        }
        if (this.stopDefault) {
            e.stopEvent();
        }
    },

    // @private
    destroy: function() {
        Ext.destroy(this.el);
        this.clearListeners();
    },

    // @private
    onTouchStart: function(e) {
        clearTimeout(this.timer);
        if (this.pressClass) {
            this.el.addCls(this.pressClass);
        }
        this.tapStartTime = new Date();

        this.fireEvent("touchstart", this, e);
        this.fireEvent("tap", this, e);

        // Do not honor delay or interval if acceleration wanted.
        if (this.accelerate) {
            this.delay = 400;
        }
        this.timer = Ext.defer(this.tap, this.delay || this.interval, this, [e]);
    },

    // @private
    tap: function(e) {
        this.fireEvent("tap", this, e);
        this.timer = Ext.defer(this.tap, this.accelerate ? this.easeOutExpo(Ext.util.Date.getElapsed(this.tapStartTime),
            400,
            -390,
            12000) : this.interval, this, [e]);
    },

    // Easing calculation
    // @private
    easeOutExpo: function(t, b, c, d) {
        return (t == d) ? b + c : c * ( - Math.pow(2, -10 * t / d) + 1) + b;
    },

    // @private
    onTouchEnd: function(e) {
        clearTimeout(this.timer);
        this.el.removeCls(this.pressClass);
        this.fireEvent("touchend", this, e);
    }
});

/*
    http://www.JSON.org/json2.js
    2010-03-20

    Public Domain.

    NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

    See http://www.JSON.org/js.html


    This code should be minified before deployment.
    See http://javascript.crockford.com/jsmin.html

    USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
    NOT CONTROL.


    This file creates a global JSON object containing two methods: stringify
    and parse.

        JSON.stringify(value, replacer, space)
            value       any JavaScript value, usually an object or array.

            replacer    an optional parameter that determines how object
                        values are stringified for objects. It can be a
                        function or an array of strings.

            space       an optional parameter that specifies the indentation
                        of nested structures. If it is omitted, the text will
                        be packed without extra whitespace. If it is a number,
                        it will specify the number of spaces to indent at each
                        level. If it is a string (such as '\t' or '&nbsp;'),
                        it contains the characters used to indent at each level.

            This method produces a JSON text from a JavaScript value.

            When an object value is found, if the object contains a toJSON
            method, its toJSON method will be called and the result will be
            stringified. A toJSON method does not serialize: it returns the
            value represented by the name/value pair that should be serialized,
            or undefined if nothing should be serialized. The toJSON method
            will be passed the key associated with the value, and this will be
            bound to the value

            For example, this would serialize Dates as ISO strings.

                Date.prototype.toJSON = function (key) {
                    function f(n) {
                        // Format integers to have at least two digits.
                        return n < 10 ? '0' + n : n;
                    }

                    return this.getUTCFullYear()   + '-' +
                         f(this.getUTCMonth() + 1) + '-' +
                         f(this.getUTCDate())      + 'T' +
                         f(this.getUTCHours())     + ':' +
                         f(this.getUTCMinutes())   + ':' +
                         f(this.getUTCSeconds())   + 'Z';
                };

            You can provide an optional replacer method. It will be passed the
            key and value of each member, with this bound to the containing
            object. The value that is returned from your method will be
            serialized. If your method returns undefined, then the member will
            be excluded from the serialization.

            If the replacer parameter is an array of strings, then it will be
            used to select the members to be serialized. It filters the results
            such that only members with keys listed in the replacer array are
            stringified.

            Values that do not have JSON representations, such as undefined or
            functions, will not be serialized. Such values in objects will be
            dropped; in arrays they will be replaced with null. You can use
            a replacer function to replace those with JSON values.
            JSON.stringify(undefined) returns undefined.

            The optional space parameter produces a stringification of the
            value that is filled with line breaks and indentation to make it
            easier to read.

            If the space parameter is a non-empty string, then that string will
            be used for indentation. If the space parameter is a number, then
            the indentation will be that many spaces.

            Example:

            text = JSON.stringify(['e', {pluribus: 'unum'}]);
            // text is '["e",{"pluribus":"unum"}]'


            text = JSON.stringify(['e', {pluribus: 'unum'}], null, '\t');
            // text is '[\n\t"e",\n\t{\n\t\t"pluribus": "unum"\n\t}\n]'

            text = JSON.stringify([new Date()], function (key, value) {
                return this[key] instanceof Date ?
                    'Date(' + this[key] + ')' : value;
            });
            // text is '["Date(---current time---)"]'


        JSON.parse(text, reviver)
            This method parses a JSON text to produce an object or array.
            It can throw a SyntaxError exception.

            The optional reviver parameter is a function that can filter and
            transform the results. It receives each of the keys and values,
            and its return value is used instead of the original value.
            If it returns what it received, then the structure is not modified.
            If it returns undefined then the member is deleted.

            Example:

            // Parse the text. Values that look like ISO date strings will
            // be converted to Date objects.

            myData = JSON.parse(text, function (key, value) {
                var a;
                if (typeof value === 'string') {
                    a =
/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.exec(value);
                    if (a) {
                        return new Date(Date.UTC(+a[1], +a[2] - 1, +a[3], +a[4],
                            +a[5], +a[6]));
                    }
                }
                return value;
            });

            myData = JSON.parse('["Date(09/09/2001)"]', function (key, value) {
                var d;
                if (typeof value === 'string' &&
                        value.slice(0, 5) === 'Date(' &&
                        value.slice(-1) === ')') {
                    d = new Date(value.slice(5, -1));
                    if (d) {
                        return d;
                    }
                }
                return value;
            });


    This is a reference implementation. You are free to copy, modify, or
    redistribute.
*/

/*jslint evil: true, strict: false */

/*members "", "\b", "\t", "\n", "\f", "\r", "\"", JSON, "\\", apply,
    call, charCodeAt, getUTCDate, getUTCFullYear, getUTCHours,
    getUTCMinutes, getUTCMonth, getUTCSeconds, hasOwnProperty, join,
    lastIndex, length, parse, prototype, push, replace, slice, stringify,
    test, toJSON, toString, valueOf
*/


// Create a JSON object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.

if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        // Format integers to have at least two digits.
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    // table of character substitutions
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {

// Produce a string from holder[key].

        var i,          // The loop counter.
            k,          // The member key.
            v,          // The member value.
            length,
            mind = gap,
            partial,
            value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }

// What happens next depends on the value's type.

        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

            return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

        case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

            if (!value) {
                return 'null';
            }

// Make an array to hold the partial results of stringifying this object value.

            gap += indent;
            partial = [];

// Is the value an array?

            if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }

// If the replacer is an array, use it to select the members to be stringified.

            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {

// Otherwise, iterate through all of the keys in the object.

                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
        return v;
    }

// If the JSON object does not yet have a stringify method, give it one.

    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

            var i;
            gap = '';
            indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }

// If the space parameter is a string, it will be used as the indent string.

            } else if (typeof space === 'string') {
                indent = space;
            }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

            return str('', {'': value});
        };
    }


// If the JSON object does not yet have a parse method, give it one.

    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {

// The parse method takes a text and an optional reviver function, and returns
// a JavaScript value if the text is a valid JSON text.

            var j;

            function walk(holder, key) {

// The walk method is used to recursively walk the resulting structure so
// that modifications can be made.

                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }


// Parsing happens in four stages. In the first stage, we replace certain
// Unicode characters with escape sequences. JavaScript handles many characters
// incorrectly, either silently deleting them, or treating them as line endings.

            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }

// In the second stage, we run the text against regular expressions that look
// for non-JSON patterns. We are especially concerned with '()' and 'new'
// because they can cause invocation, and '=' because it can cause mutation.
// But just to be safe, we want to reject all unexpected forms.

// We split the second stage into 4 regexp operations in order to work around
// crippling inefficiencies in IE's and Safari's regexp engines. First we
// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
// replace all simple value tokens with ']' characters. Third, we delete all
// open brackets that follow a colon or comma or that begin the text. Finally,
// we look to see that the remaining characters are only whitespace or ']' or
// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

// In the third stage we use the eval function to compile the text into a
// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
// in JavaScript: it can begin a block or an object literal. We wrap the text
// in parens to eliminate the ambiguity.

                j = eval('(' + text + ')');

// In the optional fourth stage, we recursively walk the new structure, passing
// each name/value pair to a reviver function for possible transformation.

                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }

// If the text is not JSON parseable, then a SyntaxError is thrown.

            throw new SyntaxError('JSON.parse');
        };
    }
}());

/**
 * @class Ext.util.JSON
 * Modified version of Douglas Crockford"s json.js that doesn"t
 * mess with the Object prototype
 * http://www.json.org/js.html
 * @singleton
 */
Ext.util.JSON = {
    encode : function(o) {
        return JSON.stringify(o);
    },

    decode : function(s) {
        return JSON.parse(s);
    }
};

/**
 * Shorthand for {@link Ext.util.JSON#encode}
 * @param {Mixed} o The variable to encode
 * @return {String} The JSON string
 * @member Ext
 * @method encode
 */
Ext.encode = Ext.util.JSON.encode;
/**
 * Shorthand for {@link Ext.util.JSON#decode}
 * @param {String} json The JSON string
 * @param {Boolean} safe (optional) Whether to return null or throw an exception if the JSON is invalid.
 * @return {Object} The resulting object
 * @member Ext
 * @method decode
 */
Ext.decode = Ext.util.JSON.decode;
/**
 * @class Ext.util.JSONP
 *
 * Provides functionality to make cross-domain requests with JSONP (JSON with Padding).
 * http://en.wikipedia.org/wiki/JSON#JSONP
 * <p>
 * <b>Note that if you are retrieving data from a page that is in a domain that is NOT the same as the originating domain
 * of the running page, you must use this class, because of the same origin policy.</b><br>
 * <p>
 * The content passed back from a server resource requested by a JSONP request<b>must</b> be executable JavaScript
 * source code because it is used as the source inside a &lt;script> tag.<br>
 * <p>
 * In order for the browser to process the returned data, the server must wrap the data object
 * with a call to a callback function, the name of which is passed as a parameter callbackKey
 * Below is a Java example for a servlet which returns data for either a ScriptTagProxy, or an HttpProxy
 * depending on whether the callback name was passed:
 * <p>
 * <pre><code>
boolean scriptTag = false;
String cb = request.getParameter("callback");
if (cb != null) {
    scriptTag = true;
    response.setContentType("text/javascript");
} else {
    response.setContentType("application/x-json");
}
Writer out = response.getWriter();
if (scriptTag) {
    out.write(cb + "(");
}
out.print(dataBlock.toJsonString());
if (scriptTag) {
    out.write(");");
}
</code></pre>
 * <p>Below is a PHP example to do the same thing:</p><pre><code>
$callback = $_REQUEST['callback'];

// Create the output object.
$output = array('a' => 'Apple', 'b' => 'Banana');

//start output
if ($callback) {
    header('Content-Type: text/javascript');
    echo $callback . '(' . json_encode($output) . ');';
} else {
    header('Content-Type: application/x-json');
    echo json_encode($output);
}
</code></pre>
 * <p>Below is the ASP.Net code to do the same thing:</p><pre><code>
String jsonString = "{success: true}";
String cb = Request.Params.Get("callback");
String responseString = "";
if (!String.IsNullOrEmpty(cb)) {
    responseString = cb + "(" + jsonString + ")";
} else {
    responseString = jsonString;
}
Response.Write(responseString);
</code></pre>
 * @singleton
 */
Ext.util.JSONP = {

    /**
     * Read-only queue
     * @type Array
     */
    queue: [],

    /**
     * Read-only current executing request
     * @type Object
     */
    current: null,

    /**
     * Make a cross-domain request using JSONP.
     * @param {Object} config
     * Valid configurations are:
     * <ul>
     *  <li>url - {String} - Url to request data from. (required) </li>
     *  <li>params - {Object} - A set of key/value pairs to be url encoded and passed as GET parameters in the request.</li>
     *  <li>callbackKey - {String} - Key specified by the server-side provider.</li>
     *  <li>callback - {Function} - Will be passed a single argument of the result of the request.</li>
     *  <li>scope - {Scope} - Scope to execute your callback in.</li>
     * </ul>
     */
    request : function(o) {
        o = o || {};
        if (!o.url) {
            return;
        }

        var me = this;
        o.params = o.params || {};
        if (o.callbackKey) {
            o.params[o.callbackKey] = 'Ext.util.JSONP.callback';
        }
        var params = Ext.urlEncode(o.params);

        var script = document.createElement('script');
        script.type = 'text/javascript';

        this.queue.push({
            url: o.url,
            script: script,
            callback: o.callback || function(){},
            scope: o.scope || window,
            params: params || null
        });

        if (!this.current) {
            this.next();
        }
    },

    // private
    next : function() {
        this.current = null;
        if (this.queue.length) {
            this.current = this.queue.shift();
            this.current.script.src = this.current.url + (this.current.params ? ('?' + this.current.params) : '');
            document.getElementsByTagName('head')[0].appendChild(this.current.script);
        }
    },

    // @private
    callback: function(json) {
        this.current.callback.call(this.current.scope, json);
        document.getElementsByTagName('head')[0].removeChild(this.current.script);
        this.next();
    }
};

/**
 * @class Ext.util.Draggable
 * @extends Ext.util.Observable
 * A core util class to bring Draggable behavior to any DOM element, acts as a base class for Scroller and Sortable
 * @constructor
 * @param {Mixed} el The element you want to make draggable.
 * @param {Object} config The configuration object for this Draggable.
 */
Ext.util.Draggable = Ext.extend(Ext.util.Observable, {
    baseCls: 'x-draggable',

    draggingCls: 'x-dragging',

    proxyCls: 'x-draggable-proxy',

    // @private
    outOfBoundRestrictFactor: 1,

    /**
     * @cfg {String} direction
     * Possible values: 'vertical', 'horizontal', or 'both'
     * Defaults to 'both'
     */
    direction: 'both',

    fps: Ext.is.Blackberry ? 25 : ((Ext.is.iOS || Ext.is.Desktop) ? 80 : 50),

    /**
     * @cfg {Element/Mixed} constrain Can be either a DOM element, an instance of Ext.Element, 'parent' or null for no constrain
     */
    constrain: window,

    /**
     * The amount of pixels you have to move before the drag operation starts.
     * Defaults to 0
     * @type Number
     */
    threshold: 0,

    /**
     * @cfg {Number} delay
     * How many milliseconds a user must hold the draggable before starting a
     * drag operation. Defaults to 0 or immediate.
     */
    delay: 0,

    /**
     * @cfg {String} cancelSelector
     * A simple CSS selector that represents elements within the draggable
     * that should NOT initiate a drag.
     */
    cancelSelector: null,

    /**
     * @cfg {Boolean} disabled
     * Whether or not the draggable behavior is disabled on instantiation
     * Defaults to false
     */
    disabled: false,

    /**
     * @cfg {Boolean} revert
     * Whether or not the element or it's proxy will be reverted back (with animation)
     * when it's not dropped and held by a Droppable
     */
    revert: false,

    /**
     * @cfg {String} group
     * Draggable and Droppable objects can participate in a group which are
     * capable of interacting. Defaults to 'base'
     */
    group: 'base',

    /**
     * @cfg {Ext.Element/Element/String} eventTarget
     * The element to actually bind touch events to, the only string accepted is 'parent'
     * for convenience.
     * Defaults to this class' element itself
     */

    /**
     * @cfg {Boolean} useCssTransform
     * Whether or not to translate the element using CSS Transform (much faster) instead of
     * left and top properties, defaults to true
     */
    useCssTransform: true,

    // not implemented yet.
    grid: null,
    snap: null,
    proxy: null,
    stack: false,

    /**
     * How long animations for this draggable take by default when using setOffset with animate being true.
     * Defaults to 300.
     * @type Number
     */
    animationDuration: 300,

    /**
     * Whether or not to automatically re-calculate the Scroller's and its container's size on every
     * touchstart.
     * Defaults to true
     * @type Boolean
     */
    updateBoundaryOnTouchStart: true,

    // Properties
    /**
     * Read-only Property representing the region that the Draggable
     * is constrained to.
     * @type Ext.util.Region
     */
    offsetBoundary: null,

    /**
     * Read-only Property representing whether or not the Draggable is currently
     * dragging or not.
     * @type Boolean
     */
    dragging: false,

    /**
     * Read-only value representing whether the Draggable can be moved vertically.
     * This is automatically calculated by Draggable by the direction configuration.
     * @type Boolean
     */
    vertical: false,

    /**
     * Read-only value representing whether the Draggable can be moved horizontally.
     * This is automatically calculated by Draggable by the direction configuration.
     * @type Boolean
     */
    horizontal: false,

    // @private
    monitorOrientation: true,

    constructor: function(el, config) {
        this.el = Ext.get(el);
        this.id = el.id;

        config = config || {};

        Ext.apply(this, config);

        this.addEvents(
            /**
             * @event offsetchange
             * @param {Ext.Draggable} this
             * @param {Ext.util.Offset} offset
             */
            'offsetchange',

            'offsetboundaryupdate'
        );

        Ext.util.Draggable.superclass.constructor.call(this, config);

        if (this.eventTarget === 'parent') {
            this.eventTarget = this.el.parent();
        } else {
            this.eventTarget = (this.eventTarget) ? Ext.get(this.eventTarget) : this.el;
        }

        if (this.direction == 'both') {
            this.horizontal = true;
            this.vertical = true;
        }
        else if (this.direction == 'horizontal') {
            this.horizontal = true;
        }
        else {
            this.vertical = true;
        }

        this.el.addCls(this.baseCls);

        if (this.proxy) {
            this.getProxyEl().addCls(this.proxyCls);
        }

        this.startEventName = (this.delay > 0) ? 'taphold' : 'dragstart';
        this.dragOptions = (this.delay > 0) ? {holdThreshold: this.delay} : {
            direction: this.direction,
            dragThreshold: this.threshold
        };

        this.container = window;

        if (this.constrain) {
            if (this.constrain === 'parent') {
                this.container = this.el.parent();
            }
            else if (this.constrain !== window) {
                this.container = Ext.get(this.constrain);
            }
        }

        this.offset = new Ext.util.Offset();

        this.linearAnimation = {
            x: new Ext.util.Draggable.Animation.Linear(),
            y: new Ext.util.Draggable.Animation.Linear()
        };

        this.updateBoundary(true);
        this.setDragging(false);

        if (!this.disabled) {
            this.enable();
        }

        return this;
    },

    /**
     * Enable the Draggable.
     * @return {Ext.util.Draggable} this This Draggable instance
     */
    enable: function() {
        return this.setEnabled(true);
    },

    /**
     * Disable the Draggable.
     * @return {Ext.util.Draggable} this This Draggable instance
     */
    disable: function() {
        return this.setEnabled(false);
    },

    /**
     * Combined method to disable or enable the Draggable. This method is called by the enable and
     * disable methods.
     * @param {Boolean} enabled True to enable, false to disable. Defaults to false.
     * @return {Ext.util.Draggable} this This Draggable instance
     */
    setEnabled: function(enabled) {
        this.eventTarget[enabled ? 'on' : 'un'](this.startEventName, this.onStart, this, this.dragOptions);
        this.eventTarget[enabled ? 'on' : 'un']('drag', this.onDrag, this, this.dragOptions);
        this.eventTarget[enabled ? 'on' : 'un']('dragend', this.onDragEnd, this, this.dragOptions);
        this.eventTarget[enabled ? 'on' : 'un']('touchstart', this.onTouchStart, this);

        if (enabled) {
            Ext.EventManager.onOrientationChange(this.onOrientationChange, this);
        } else {
            Ext.EventManager.orientationEvent.removeListener(this.onOrientationChange, this);
        }

        this.disabled = !enabled;

        return this;
    },

    /**
     * Change the Draggable to use css transforms instead of style offsets
     * or the other way around.
     * @param {Boolean} useCssTransform True to use css transforms instead of style offsets.
     * @return {Ext.util.Draggable} this This Draggable instance
     * @public
     */
    setUseCssTransform: function(useCssTransform) {
        if (typeof useCssTransform == 'undefined') {
            useCssTransform = true;
        }

        if (useCssTransform != this.useCssTransform) {
            this.useCssTransform = useCssTransform;

            var resetOffset = new Ext.util.Offset();

            if (useCssTransform == false) {
                this.setStyleOffset(this.offset);
                this.setTransformOffset(resetOffset, true);
            } else {
                this.setTransformOffset(this.offset);
                this.setStyleOffset(resetOffset);
            }
        }

        return this;
    },

    /**
     * Sets the offset of this Draggable relatively to its original offset.
     * @param {Ext.util.Offset/Object} offset An object or Ext.util.Offset instance containing the
     * x and y coordinates.
     * @param {Boolean/Number} animate Whether or not to animate the setting of the offset. True
     * to use the default animationDuration, a number to specify the duration for this operation.
     * @return {Ext.util.Draggable} this This Draggable instance
     */
    setOffset: function(offset, animate) {
        if (!this.horizontal) {
            offset.x = 0;
        }

        if (!this.vertical) {
            offset.y = 0;
        }

        if (!(offset instanceof Ext.util.Offset)) {
            offset = Ext.util.Offset.fromObject(offset);
        }

        offset.round();

        if (!this.offset.equals(offset)) {
            if (animate) {
                this.startAnimation(offset, animate);
            }
            else {
                this.offset = offset;
                this.region = new Ext.util.Region(
                    this.initialRegion.top + offset.y,
                    this.initialRegion.right + offset.x,
                    this.initialRegion.bottom + offset.y,
                    this.initialRegion.left + offset.x
                );

                if (this.useCssTransform) {
                    this.setTransformOffset(offset);
                }
                else {
                    this.setStyleOffset(offset);
                }

                this.fireEvent('offsetchange', this, this.offset);
            }
        }


        return this;
    },

    /**
     * Internal method that sets the transform of the proxyEl.
     * @param {Ext.util.Offset/Object} offset An object or Ext.util.Offset instance containing the
     * x and y coordinates for the transform.
     * @return {Ext.util.Draggable} this This Draggable instance
     * @private
     */
    setTransformOffset: function(offset, clean) {
//        Ext.Element.cssTransform(this.getProxyEl(), {translate: [offset.x, offset.y]});
        // Temporarily use this instead of Ext.Element.cssTransform to save some CPU
        if (clean) {
            this.getProxyEl().dom.style.webkitTransform = '';
        } else {
            Ext.Element.cssTranslate(this.getProxyEl(), offset);
        }

        return this;
    },

    /**
     * Internal method that sets the left and top of the proxyEl.
     * @param {Ext.util.Offset/Object} offset An object or Ext.util.Offset instance containing the
     * x and y coordinates.
     * @return {Ext.util.Draggable} this This Draggable instance
     * @private
     */
    setStyleOffset: function(offset) {
        var el = this.getProxyEl();

        el.dom.style.left = offset.x + 'px';
        el.dom.style.top = offset.y + 'px';

        return this;
    },

    /**
     * Internal method that sets the offset of the Draggable using an animation
     * @param {Ext.util.Offset/Object} offset An object or Ext.util.Offset instance containing the
     * x and y coordinates for the transform.
     * @param {Boolean/Number} animate Whether or not to animate the setting of the offset. True
     * to use the default animationDuration, a number to specify the duration for this operation.
     * @return {Ext.util.Draggable} this This Draggable instance
     * @private
     */
    startAnimation: function(offset, animate) {
        var me = this;

        this.stopAnimation();

        var currentTime = Date.now();
        animate = Ext.isNumber(animate) ? animate : this.animationDuration;

        this.linearAnimation.x.set({
            startOffset: this.offset.x,
            endOffset: offset.x,
            startTime: currentTime,
            duration: animate
        });

        this.linearAnimation.y.set({
            startOffset: this.offset.y,
            endOffset: offset.y,
            startTime: currentTime,
            duration: animate
        });

        this.isAnimating = true;

        this.animationTimer = setInterval(function(){
            me.handleAnimationFrame();
        }, this.getFrameDuration());
        return this;
    },

    // @private
    getFrameDuration: function() {
        return 1000 / this.fps;
    },

    /**
     * Internal method that stops the current offset animation
     * @private
     */
    stopAnimation: function() {
        if (this.isAnimating) {
            clearInterval(this.animationTimer);
            this.isAnimating = false;
            this.setDragging(false);
        }

        return this;
    },

    /**
     * Internal method that handles a frame of the offset animation.
     * @private
     */
    handleAnimationFrame: function() {
        if (!this.isAnimating) {
            return;
        }

        var newOffset = new Ext.util.Offset();
        newOffset.x = this.linearAnimation.x.getOffset();
        newOffset.y = this.linearAnimation.y.getOffset();

        this.setOffset(newOffset);

        if ((newOffset.x === this.linearAnimation.x.endOffset) && (newOffset.y === this.linearAnimation.y.endOffset)) {
            this.stopAnimation();
        }
    },

    /**
     * Returns the current offset relative to the original location of this Draggable.
     * @return {Ext.util.Offset} offset An Ext.util.Offset instance containing the offset.
     */
    getOffset: function() {
        var offset = this.offset.copy();
        offset.y = -offset.y;
        offset.x = -offset.x;
        return offset;
    },

    /**
     * Updates the boundary information for this Draggable. This method shouldn't
     * have to be called by the developer and is mostly used for internal purposes.
     * Might be useful when creating subclasses of Draggable.
     * @param {Boolean} init Whether or not this is happing during instantiation, which we need
     * to apply the transform / style to the DOM element
     * @return {Ext.util.Draggable} this This Draggable instance
     * @private
     */
    updateBoundary: function(init) {
        var offsetBoundary;

        if (typeof init == 'undefined')
            init = false;

        this.size = {
            width: this.el.dom.scrollWidth,
            height: this.el.dom.scrollHeight
        };

        if (this.container === window) {
            this.containerBox = {
                left: 0,
                top: 0,
                right: this.container.innerWidth,
                bottom: this.container.innerHeight,
                width: this.container.innerWidth,
                height: this.container.innerHeight
            };
        }
        else {
            this.containerBox = this.container.getPageBox();
        }

        var elXY = this.el.getXY();

        this.elBox = {
            left: elXY[0] - this.offset.x,
            top: elXY[1] - this.offset.y,
            width: this.size.width,
            height: this.size.height
        };

        this.elBox.bottom = this.elBox.top + this.elBox.height;
        this.elBox.right = this.elBox.left + this.elBox.width;

        this.initialRegion = this.region = new Ext.util.Region(
            elXY[1], elXY[0] + this.elBox.width, elXY[1] + this.elBox.height, elXY[0]
        );

        var top = 0,
            right = 0,
            bottom = 0,
            left = 0;

        if (this.elBox.left < this.containerBox.left) {
            right += this.containerBox.left - this.elBox.left;
        }
        else {
            left -= this.elBox.left - this.containerBox.left;
        }

        if (this.elBox.right > this.containerBox.right) {
            left -= this.elBox.right - this.containerBox.right;
        }
        else {
            right += this.containerBox.right - this.elBox.right;
        }

        if (this.elBox.top < this.containerBox.top) {
            bottom += this.containerBox.top - this.elBox.top;
        }
        else {
            top -= this.elBox.top - this.containerBox.top;
        }

        if (this.elBox.bottom > this.containerBox.bottom) {
            top -= this.elBox.bottom - this.containerBox.bottom;
        }
        else {
            bottom += this.containerBox.bottom - this.elBox.bottom;
        }

        offsetBoundary = new Ext.util.Region(top, right, bottom, left).round();

        if (this.offsetBoundary && this.offsetBoundary.equals(offsetBoundary)) {
            return this;
        }

        this.offsetBoundary = offsetBoundary;

        this.fireEvent('offsetboundaryupdate', this, this.offsetBoundary);

        var currentComputedOffset;

        if (this.useCssTransform) {
            currentComputedOffset = Ext.Element.getComputedTransformOffset(this.getProxyEl());
//        } else {
//            currentComputedOffset = new Ext.util.Offset(this.getProxyEl().getLeft(), this.getProxyEl().getTop());

            if (!this.offset.equals(currentComputedOffset) || init) {
                this.setOffset(currentComputedOffset);
            }
        }

        return this;
    },

    // @private
    onTouchStart: function() {

    },

    /**
     * Fires when the Drag operation starts. Internal use only.
     * @param {Event} e The event object for the drag operation
     * @private
     */
    onStart: function(e) {
        if (this.updateBoundaryOnTouchStart) {
            this.updateBoundary();
        }

        this.stopAnimation();

        this.setDragging(true);
        this.startTouchPoint = new Ext.util.Point(e.startX, e.startY);

        this.startOffset = this.offset.copy();

        this.fireEvent('dragstart', this, e);

        return true;
    },

    /**
     * Gets the new offset from a touch offset.
     * @param {Ext.util.Offset} touchPoint The touch offset instance.
     * @private
     */
    getNewOffsetFromTouchPoint: function(touchPoint) {
        var xDelta = touchPoint.x - this.startTouchPoint.x,
            yDelta = touchPoint.y - this.startTouchPoint.y,
            newOffset = this.offset.copy();

        if(xDelta == 0 && yDelta == 0) {
            return newOffset;
        }

        if (this.horizontal)
            newOffset.x = this.startOffset.x + xDelta;

        if (this.vertical)
            newOffset.y = this.startOffset.y + yDelta;

        return newOffset;
    },

    /**
     * Fires when a drag events happens. Internal use only.
     * @param {Event} e The event object for the drag event
     * @private
     */
    onDrag: function(e) {
        if (!this.dragging) {
            return;
        }

        this.lastTouchPoint = Ext.util.Point.fromEvent(e);
        var newOffset = this.getNewOffsetFromTouchPoint(this.lastTouchPoint);

        if (this.offsetBoundary != null) {
            newOffset = this.offsetBoundary.restrict(newOffset, this.outOfBoundRestrictFactor);
        }

        this.setOffset(newOffset);

        this.fireEvent('drag', this, e);

        // This 'return true' here is to let sub-classes determine whether
        // there's an interuption return before that
        return true;
    },

    /**
     * Fires when a dragend event happens. Internal use only.
     * @param {Event} e The event object for the dragend event
     * @private
     */
    onDragEnd: function(e) {
        if (this.dragging) {
            this.fireEvent('beforedragend', this, e);

            if (this.revert && !this.cancelRevert) {
                this.setOffset(this.startOffset, true);
            } else {
                this.setDragging(false);
            }

            this.fireEvent('dragend', this, e);
        }

        // This 'return true' here is to let sub-classes determine whether
        // there's an interuption return before that
        return true;
    },

    /**
     * Fires when the orientation changes. Internal use only.
     * @private
     */
    onOrientationChange: function() {
        this.updateBoundary();
    },

    /**
     * Sets the dragging flag and adds a dragging class to the element.
     * @param {Boolean} dragging True to enable dragging, false to disable.
     * @private
     */
    setDragging: function(dragging) {
        if (dragging) {
            if (!this.dragging) {
                this.dragging = true;
                this.getProxyEl().addCls(this.draggingCls);
            }
        } else {
            if (this.dragging) {
                this.dragging = false;
                this.getProxyEl().removeCls(this.draggingCls);
            }
        }

        return this;
    },

    /**
     * Returns the element thats is being visually dragged.
     * @returns {Ext.Element} proxy The proxy element.
     */
    getProxyEl: function() {
        return this.proxy || this.el;
    },

    /**
     * Destroys this Draggable instance.
     */
    destroy: function() {
        this.el.removeCls(this.baseCls);
        this.getProxyEl().removeCls(this.proxyCls);
        this.clearListeners();
        this.disable();
    },

    /**
     * This method will reset the initial region of the Draggable.
     * @private
     */
    reset: function() {
        this.startOffset = new Ext.util.Offset(0, 0);
        this.setOffset(this.startOffset);

        var oldInitialRegion = this.initialRegion.copy();

        this.updateBoundary();
        this.initialRegion = this.region = this.getProxyEl().getPageBox(true);
        this.startTouchPoint.x += this.initialRegion.left - oldInitialRegion.left;
        this.startTouchPoint.y += this.initialRegion.top - oldInitialRegion.top;
    },

    /**
     * Use this to move the draggable to a coordinate on the screen.
     * @param {Number} x the vertical coordinate in pixels
     * @param {Number} y the horizontal coordinate in pixels
     * @return {Ext.util.Draggable} this This Draggable instance
     */
    moveTo: function(x, y) {
        this.setOffset(new Ext.util.Offset(x - this.initialRegion.left, y - this.initialRegion.top));
        return this;
    },

    /**
     * Method to determine whether this Draggable is currently dragging.
     * @return {Boolean}
     */
    isDragging: function() {
        return this.dragging;
    },

    /**
     * Method to determine whether this Draggable can be dragged on the y-axis
     * @return {Boolean}
     */
    isVertical : function() {
        return this.vertical;
    },

    /**
     * Method to determine whether this Draggable can be dragged on the x-axis
     * @return {Boolean}
     */
    isHorizontal : function() {
        return this.horizontal;
    }
});

Ext.util.Draggable.Animation = {};

/**
 * @class Ext.util.Draggable.Animation.Abstract
 * @extends Object
 *
 * Provides the abstract methods for a Draggable animation.
 * @private
 * @ignore
 */
Ext.util.Draggable.Animation.Abstract = Ext.extend(Object, {
    /**
     * @cfg {Number} startTime The time the Animation started
     * @private
     */
    startTime: null,

    /**
     * @cfg {Object/Ext.util.Offset} startOffset Object containing the x and y coordinates the
     * Draggable had when the Animation started.
     * @private
     */
    startOffset: 0,

    /**
     * The constructor for an Abstract animation. Applies the config to the Animation.
     * @param {Object} config Object containing the configuration for this Animation.
     * @private
     */
    constructor: function(config) {
        config = config || {};

        this.set(config);

        if (!this.startTime)
            this.startTime = Date.now();
    },

    /**
     * Sets a config value for this Animation.
     * @param {String} name The name of this configuration
     * @param {Mixed} value The value for this configuration
     */
    set: function(name, value) {
        if (Ext.isObject(name)) {
            Ext.apply(this, name);
        }
        else {
            this[name] = value;
        }

        return this;
    },

    /**
     * This method will return the offset of the coordinate that is being animated for any
     * given offset in time based on a different set of variables. Usually these variables are
     * a combination of the startOffset, endOffset, startTime and duration.
     * @return {Number} The offset for the coordinate that is being animated
     */
    getOffset: Ext.emptyFn
});

/**
 * @class Ext.util.Draggable.Animation.Linear
 * @extends Ext.util.Draggable.Animation.Abstract
 *
 * A linear animation that is being used by Draggable's setOffset by default.
 * @private
 * @ignore
 */
Ext.util.Draggable.Animation.Linear = Ext.extend(Ext.util.Draggable.Animation.Abstract, {
    /**
     * @cfg {Number} duration The duration of this animation in milliseconds.
     */
    duration: 0,

    /**
     * @cfg {Object/Ext.util.Offset} endOffset Object containing the x and y coordinates the
     * Draggable is animating to.
     * @private
     */
    endOffset: 0,

    getOffset : function() {
        var distance = this.endOffset - this.startOffset,
            deltaTime = Date.now() - this.startTime,
            omegaTime = Math.min(1, (deltaTime / this.duration));

        return this.startOffset + (omegaTime * distance);
    }
});

/**
 * @class Ext.util.Droppable
 * @extends Ext.util.Observable
 * 
 * @constructor
 */
Ext.util.Droppable = Ext.extend(Ext.util.Observable, {
    baseCls: 'x-droppable',
    /**
     * @cfg {String} activeCls
     * The CSS added to a Droppable when a Draggable in the same group is being
     * dragged. Defaults to 'x-drop-active'.
     */
    activeCls: 'x-drop-active',
    /**
     * @cfg {String} invalidCls
     * The CSS class to add to the droppable when dragging a draggable that is
     * not in the same group. Defaults to 'x-drop-invalid'.
     */
    invalidCls: 'x-drop-invalid',
    /**
     * @cfg {String} hoverCls
     * The CSS class to add to the droppable when hovering over a valid drop. (Defaults to 'x-drop-hover')
     */
    hoverCls: 'x-drop-hover',

    /**
     * @cfg {String} validDropMode
     * Determines when a drop is considered 'valid' whether it simply need to
     * intersect the region or if it needs to be contained within the region.
     * Valid values are: 'intersects' or 'contains'
     */
    validDropMode: 'intersect',

    /**
     * @cfg {Boolean} disabled
     */
    disabled: false,

    /**
     * @cfg {String} group
     * Draggable and Droppable objects can participate in a group which are
     * capable of interacting. Defaults to 'base'
     */
    group: 'base',

    // not yet implemented
    tolerance: null,


    // @private
    monitoring: false,
    
    /**
     * @constructor
     * @param el {Mixed} String, HtmlElement or Ext.Element representing an
     * element on the page.
     * @param config {Object} Configuration options for this class.
     */
    constructor : function(el, config) {
        config = config || {};
        Ext.apply(this, config);

        this.addEvents(
            /**
             * @event dropactivate
             * @param {Ext.Droppable} this
             * @param {Ext.Draggable} draggable
             * @param {Ext.EventObject} e
             */
            'dropactivate',

            /**
             * @event dropdeactivate
             * @param {Ext.Droppable} this
             * @param {Ext.Draggable} draggable
             * @param {Ext.EventObject} e
             */
            'dropdeactivate',

            /**
             * @event dropenter
             * @param {Ext.Droppable} this
             * @param {Ext.Draggable} draggable
             * @param {Ext.EventObject} e
             */
            'dropenter',

            /**
             * @event dropleave
             * @param {Ext.Droppable} this
             * @param {Ext.Draggable} draggable
             * @param {Ext.EventObject} e
             */
            'dropleave',

            /**
             * @event drop
             * @param {Ext.Droppable} this
             * @param {Ext.Draggable} draggable
             * @param {Ext.EventObject} e
             */
            'drop'
        );

        this.el = Ext.get(el);
        Ext.util.Droppable.superclass.constructor.call(this);

        if (!this.disabled) {
            this.enable();
        }

        this.el.addCls(this.baseCls);
    },

    // @private
    onDragStart : function(draggable, e) {
        if (draggable.group === this.group) {
            this.monitoring = true;
            this.el.addCls(this.activeCls);
            this.region = this.el.getPageBox(true);

            draggable.on({
                drag: this.onDrag,
                beforedragend: this.onBeforeDragEnd,
                dragend: this.onDragEnd,
                scope: this
            });

            if (this.isDragOver(draggable)) {
                this.setCanDrop(true, draggable, e);
            }

            this.fireEvent('dropactivate', this, draggable, e);
        }
        else {
            draggable.on({
                dragend: function() {
                    this.el.removeCls(this.invalidCls);
                },
                scope: this,
                single: true
            });
            this.el.addCls(this.invalidCls);
        }
    },

    // @private
    isDragOver : function(draggable, region) {
        return this.region[this.validDropMode](draggable.region);
    },

    // @private
    onDrag : function(draggable, e) {
        this.setCanDrop(this.isDragOver(draggable), draggable, e);
    },

    // @private
    setCanDrop : function(canDrop, draggable, e) {
        if (canDrop && !this.canDrop) {
            this.canDrop = true;
            this.el.addCls(this.hoverCls);
            this.fireEvent('dropenter', this, draggable, e);
        }
        else if (!canDrop && this.canDrop) {
            this.canDrop = false;
            this.el.removeCls(this.hoverCls);
            this.fireEvent('dropleave', this, draggable, e);
        }
    },

    // @private
    onBeforeDragEnd: function(draggable, e) {
        draggable.cancelRevert = this.canDrop;
    },

    // @private
    onDragEnd : function(draggable, e) {
        this.monitoring = false;
        this.el.removeCls(this.activeCls);

        draggable.un({
            drag: this.onDrag,
            beforedragend: this.onBeforeDragEnd,
            dragend: this.onDragEnd,
            scope: this
        });


        if (this.canDrop) {
            this.canDrop = false;
            this.el.removeCls(this.hoverCls);
            this.fireEvent('drop', this, draggable, e);
        }

        this.fireEvent('dropdeactivate', this, draggable, e);
    },

    /**
     * Enable the Droppable target.
     * This is invoked immediately after constructing a Droppable if the
     * disabled parameter is NOT set to true.
     */
    enable : function() {
        if (!this.mgr) {
            this.mgr = Ext.util.Observable.observe(Ext.util.Draggable);
        }
        this.mgr.on({
            dragstart: this.onDragStart,
            scope: this
        });
        this.disabled = false;
    },

    /**
     * Disable the Droppable target.
     */
    disable : function() {
        this.mgr.un({
            dragstart: this.onDragStart,
            scope: this
        });
        this.disabled = true;
    },
    
    /**
     * Method to determine whether this Component is currently disabled.
     * @return {Boolean} the disabled state of this Component.
     */
    isDisabled : function() {
        return this.disabled;
    },
    
    /**
     * Method to determine whether this Droppable is currently monitoring drag operations of Draggables.
     * @return {Boolean} the monitoring state of this Droppable
     */
    isMonitoring : function() {
        return this.monitoring;
    }
});

(function(){

Ext.ScrollManager = new Ext.AbstractManager();

/**
 * @class Ext.util.ScrollView
 * @extends Ext.util.Observable
 *
 * A wrapper class around {@link Ext.util.Scroller Ext.util.Scroller} and {@link Ext.util.Scroller.Indicator Ext.util.Scroller.Indicator}
 * that listens to scroll events and control the scroll indicators
 */
Ext.util.ScrollView = Ext.extend(Ext.util.Observable, {

    /**
     * @cfg {Boolean/String} useIndicators
     * Whether or not to use indicators. Can be either: <ul>
     * <li>{Boolean} true to display both directions, false otherwise</li>
     * <li>{String} 'vertical' or 'horizontal' to display for that specific direction only</li>
     * Defaults to true
     */
    useIndicators: true,

    /**
     * @cfg {Object} indicatorConfig
     * A valid config object for {@link Ext.util.Scroller.Indicator Ext.util.Scroller.Indicator}
     */
    indicatorConfig: {},

    /**
     * @cfg {Number} indicatorMargin
     * The margin value for the indicator relatively to the container.
     * Defaults to <tt>4</tt>
     */
    indicatorMargin: 4,

    constructor: function(el, config) {
        var indicators = [],
            directions = ['vertical', 'horizontal'];

        Ext.util.ScrollView.superclass.constructor.call(this);

        ['useIndicators', 'indicatorConfig', 'indicatorMargin'].forEach(function(c) {
            if (config.hasOwnProperty(c)) {
                this[c] = config[c];
                delete config[c];
            }
        }, this);

        config.scrollView = this;
        this.scroller = new Ext.util.Scroller(el, config);

        if (this.useIndicators === true) {
            directions.forEach(function(d) {
                if (this.scroller[d]) {
                    indicators.push(d);
                }
            }, this);
        } else if (directions.indexOf(this.useIndicators) !== -1) {
            indicators.push(this.useIndicators);
        }

        this.indicators = {};
        this.indicatorOffsetExtras = {};

        indicators.forEach(function(i) {
            this.indicators[i] = new Ext.util.Scroller.Indicator(this.scroller.container, Ext.apply({}, this.indicatorConfig, {type: i}));
        }, this);

        this.mon(this.scroller, {
            scrollstart: this.onScrollStart,
            scrollend: this.onScrollEnd,
            scroll: this.onScroll,
            scope: this
        });
    },

    // @private
    onScrollStart: function() {
        this.showIndicators();
    },

    // @private
    onScrollEnd: function() {
        this.hideIndicators();
    },

    // @private
    onScroll: function(scroller) {
        if (scroller.offsetBoundary == null || (!this.indicators.vertical && !this.indicators.horizontal))
            return;

        var sizeAxis,
            offsetAxis,
            offsetMark,
            boundary = scroller.offsetBoundary,
            offset = scroller.offset;

        this.containerSize = scroller.containerBox;
        this.scrollerSize = scroller.size;
        this.outOfBoundOffset = boundary.getOutOfBoundOffset(offset);
        this.restrictedOffset = boundary.restrict(offset);
        this.boundarySize = boundary.getSize();

        if (!this.indicatorSizes) {
            this.indicatorSizes = {vertical: 0, horizontal: 0};
        }

        if (!this.indicatorOffsets) {
            this.indicatorOffsets = {vertical: 0, horizontal: 0};
        }

        Ext.iterate(this.indicators, function(axis, indicator) {
            sizeAxis = (axis == 'vertical') ? 'height' : 'width';
            offsetAxis = (axis == 'vertical') ? 'y' : 'x';
            offsetMark = (axis == 'vertical') ? 'bottom' : 'right';

            if (this.scrollerSize[sizeAxis] < this.containerSize[sizeAxis]) {
                this.indicatorSizes[axis] = this.containerSize[sizeAxis] * (this.scrollerSize[sizeAxis] / this.containerSize[sizeAxis]);
            }
            else {
                this.indicatorSizes[axis] = this.containerSize[sizeAxis] * (this.containerSize[sizeAxis] / this.scrollerSize[sizeAxis]);
            }
            this.indicatorSizes[axis] -= Math.abs(this.outOfBoundOffset[offsetAxis]);
            this.indicatorSizes[axis] = Math.max(this.indicatorMargin * 4, this.indicatorSizes[axis]);

            if (this.boundarySize[sizeAxis] != 0) {
                this.indicatorOffsets[axis] = (((boundary[offsetMark] - this.restrictedOffset[offsetAxis]) / this.boundarySize[sizeAxis])
                                              * (this.containerSize[sizeAxis] - this.indicatorSizes[axis]));
            } else if (offset[offsetAxis] < boundary[offsetMark]) {
                this.indicatorOffsets[axis] = this.containerSize[sizeAxis] - this.indicatorSizes[axis];
            } else {
                this.indicatorOffsets[axis] = 0;
            }

            indicator.setOffset(this.indicatorOffsetExtras[axis] + this.indicatorOffsets[axis] + this.indicatorMargin);
            indicator.setSize(this.indicatorSizes[axis] - (this.indicatorMargin * 2));
        }, this);
    },

    /*
     * Show the indicators if they are enabled; called automatically when the Scroller starts moving
     * @return {Ext.util.ScrollView} this This ScrollView
     */
    showIndicators : function() {
        Ext.iterate(this.indicators, function(axis, indicator) {
            indicator.show();
            this.indicatorOffsetExtras[axis] = indicator.el.dom.parentNode[axis === 'vertical' ? 'scrollTop' : 'scrollLeft'];
        }, this);

        return this;
    },

     /*
     * Hide the indicators if they are enabled; called automatically when the scrolling ends
     * @return {Ext.util.ScrollView} this This ScrollView
     */
    hideIndicators : function() {
        Ext.iterate(this.indicators, function(axis, indicator) {
            indicator.hide();
        }, this);
    },

    // Inherited docs
    destroy: function() {
        this.scroller.destroy();

        if (this.indicators) {
            Ext.iterate(this.indicators, function(axis, indicator) {
                indicator.destroy();
            }, this);
        }

        return Ext.util.ScrollView.superclass.destroy.apply(this, arguments);
    }
});

/**
 * @class Ext.util.Scroller
 * @extends Ext.util.Draggable
 *
 * Provide the native scrolling experience on iDevices for any DOM element
 */
Ext.util.Scroller = Ext.extend(Ext.util.Draggable, {
    // Inherited
    baseCls: '',

    // Inherited
    draggingCls: '',

    // Inherited
    direction: 'both',

    // Inherited
    constrain: 'parent',

    /**
     * @cfg {Number} outOfBoundRestrictFactor
     * Determines the offset ratio when the scroller is pulled / pushed out of bound (when it's not decelerating)
     * A value of 0.5 means 1px allowed for every 2px. Defaults to 0.5
     */
    outOfBoundRestrictFactor: 0.5,

    /**
     * @cfg {Number} acceleration
     * A higher acceleration gives the scroller more initial velocity. Defaults to 30
     */
    acceleration: 20,

    /**
     * @cfg {Number} fps
     * The desired fps of the deceleration. Defaults to 70.
     */
    // Inherited

    autoAdjustFps: false,

    /**
     * @cfg {Number} friction
     * The friction of the scroller.
     * By raising this value the length that momentum scrolls becomes shorter. This value is best kept
     * between 0 and 1. The default value is 0.5
     */
    friction: 0.5,

    /**
     * @cfg {Number} startMomentumResetTime
     * The time duration in ms to reset the start time of momentum
     * Defaults to 350
     */
    startMomentumResetTime: 350,

    /**
     * @cfg {Number} springTension
     * The tension of the spring that is attached to the scroller when it bounces.
     * By raising this value the bounce becomes shorter. This value is best kept
     * between 0 and 1. The default value is 0.3
     */
    springTension: 0.3,

    /**
     * @cfg {Number} minVelocityForAnimation
     * The minimum velocity to keep animating. Defaults to 1 (1px per second)
     */
    minVelocityForAnimation: 1,

    /**
     * @cfg {Boolean/String} bounces
     * Enable bouncing during scrolling past the bounds. Defaults to true. (Which is 'both').
     * You can also specify 'vertical', 'horizontal', or 'both'
     */
    bounces: true,

    /**
     * @cfg {Boolean} momentum
     * Whether or not to enable scrolling momentum. Defaults to true
     */
    momentum: true,

    cancelRevert: true,

    threshold: 5,

    constructor: function(el, config) {
        el = Ext.get(el);

        var scroller = Ext.ScrollManager.get(el.id);
        if (scroller) {
            return Ext.apply(scroller, config);
        }

        Ext.util.Scroller.superclass.constructor.apply(this, arguments);

        this.addEvents(
            /**
             * @event scrollstart
             * @param {Ext.util.Scroller} this
             * @param {Ext.EventObject} e
             */
            'scrollstart',
            /**
             * @event scroll
             * @param {Ext.util.Scroller} this
             * @param {Object} offsets An object containing the x and y offsets for the scroller.
             */
            'scroll',
            /**
             * @event scrollend
             * @param {Ext.util.Scroller} this
             * @param {Object} offsets An object containing the x and y offsets for the scroller.
             */
            'scrollend',
            /**
             * @event bouncestart
             * @param {Ext.util.Scroller} this
             * @param {Object} info Object containing information regarding the bounce
             */
             'bouncestart',
             /**
              * @event bouncestart
              * @param {Ext.util.Scroller} this
              * @param {Object} info Object containing information regarding the bounce
              */
             'bounceend'
        );

        this.on({
            dragstart: this.onDragStart,
            offsetchange: this.onOffsetChange,
            scope: this
        });

        Ext.ScrollManager.register(this);

        this.el.addCls('x-scroller');
        this.container.addCls('x-scroller-parent');

        if (this.bounces !== false) {
            var both = this.bounces === 'both' || this.bounces === true,
                horizontal = both || this.bounces === 'horizontal',
                vertical = both || this.bounces === 'vertical';

            this.bounces = {
                x: horizontal,
                y: vertical
            };
        }

        this.theta = Math.log(1 - (this.friction / 10));
        this.bouncingVelocityFactor = this.springTension * Math.E;
        this.bouncingTimeFactor = ((1 / this.springTension) * this.acceleration);

        if (!this.decelerationAnimation) {
            this.decelerationAnimation = {};
        }

        if (!this.bouncingAnimation) {
            this.bouncingAnimation = {};
        }

        ['x', 'y'].forEach(function(a) {
            if (!this.decelerationAnimation[a]) {
                this.decelerationAnimation[a] = new Ext.util.Scroller.Animation.Deceleration({
                    acceleration: this.acceleration,
                    theta: this.theta
                });
            }

            if (!this.bouncingAnimation[a]) {
                this.bouncingAnimation[a] = new Ext.util.Scroller.Animation.Bouncing({
                    acceleration: this.acceleration,
                    springTension: this.springTension
                });
            }
        }, this);

        return this;
    },

    // Inherited docs
    updateBoundary: function(animate) {
        Ext.util.Scroller.superclass.updateBoundary.apply(this, arguments);

        this.snapToBoundary(animate);

        return this;
    },

    // Inherited docs
    onOffsetChange: function(scroller, offset) {
        this.fireEvent('scroll', scroller, {
            x: -offset.x,
            y: -offset.y
        });
    },

    // @private
    onTouchStart: function(e) {
        Ext.util.Scroller.superclass.onTouchStart.apply(this, arguments);

        this.stopMomentumAnimation();
    },

    // @private
    onDragStart: function(e) {
        this.fireEvent('scrollstart', this, e);
    },

    // @private
    setStartTime: function(e) {
        this.startTime = e.time;
        this.originalStartTime = (e.event.originalTimeStamp) ? e.event.originalTimeStamp : e.time;
    },

    // @private
    onStart: function(e) {
        if (Ext.util.Scroller.superclass.onStart.apply(this, arguments) !== true)
            return;

        this.setStartTime(e);
        this.lastEventTime = e.time;
        this.startTimeOffset = this.offset.copy();
        this.isScrolling = true;

        //<debug>
        this.momentumAnimationFramesHandled = 0;
        //</debug>
    },

    // @private
    onDrag: function(e) {
        if (Ext.util.Scroller.superclass.onDrag.apply(this, arguments) !== true)
            return;

        this.lastEventTime = e.time;

        if (this.lastEventTime - this.startTime > this.startMomentumResetTime) {
            this.setStartTime(e);
            this.startTimeOffset = this.offset.copy();
        }
    },

    // @private
    onDragEnd: function(e) {
        if (Ext.util.Scroller.superclass.onDragEnd.apply(this, arguments) !== true)
            return;

        if (!this.startMomentumAnimation(e)) {
            this.fireScrollEndEvent();
        }
    },

    // @private
    onOrientationChange: function() {
        Ext.util.Scroller.superclass.onOrientationChange.apply(this, arguments);

        this.snapToBoundary();
    },

    // @private
    fireScrollEndEvent: function() {
        this.isScrolling = false;
        this.isMomentumAnimating = false;
        this.snapToBoundary();
        this.fireEvent('scrollend', this, this.getOffset());

        this.snapToSlot();
    },


    //<debug>
    /*
     * Get the last actual fps performed by this Scroller. Useful for benchmarking
     * @return {Number} The actual fps
     */
    getLastActualFps: function() {
        var duration = (this.momentumAnimationEndTime - this.momentumAnimationStartTime - this.momentumAnimationProcessingTime) / 1000;
        return this.momentumAnimationFramesHandled / duration;
    },
    //</debug>

    /*
     * Similar to {@link Ext.util.Scroller#setOffset setOffset}, but will stop any existing animation
     * @param {Object} pos The new scroll position, e.g {x: 100, y: 200}
     * @param {Number/Boolean} animate Whether or not to animate while changing the scroll position.
     * If it's a number, will be treated as the duration in ms
     * @return {Ext.util.Scroller} this This Scroller
     */
    scrollTo: function(pos, animate) {
        this.stopMomentumAnimation();

        var newOffset = this.offsetBoundary.restrict(new Ext.util.Offset(-pos.x, -pos.y));

        this.setOffset(newOffset, animate);

        return this;
    },

    /*
     * Change the scroll offset by the given amount
     * @param {Ext.util.Offset/Object} offset The amount to scroll by, e.g {x: 100, y: 200}
     * @param {Number/Boolean} animate Whether or not to animate while changing the scroll position.
     * If it's a number, will be treated as the duration in ms
     * @return {Ext.util.Scroller} this This Scroller
     */
    scrollBy: function(offset, animate) {
        this.stopMomentumAnimation();

        var newOffset = this.offset.copy();
        newOffset.x += offset.x;
        newOffset.y += offset.y;

        this.setOffset(newOffset, animate);

        return this;
    },

    // @private
    setSnap: function(snap) {
        this.snap = snap;
    },

    /*
     * Snap this scrollable content back to the container's boundary, if it's currently out of bound
     * @return {Ext.util.Scroller} this This Scroller
     */
    snapToBoundary: function(animate) {
        var offset = this.offsetBoundary.restrict(this.offset);
        this.setOffset(offset, animate);

        return this;
    },

    snapToSlot: function() {
        var offset = this.offsetBoundary.restrict(this.offset);
        offset.round();

        if (this.snap) {
            if (this.snap === true) {
                this.snap = {
                    x: 50,
                    y: 50
                };
            }
            else if (Ext.isNumber(this.snap)) {
                this.snap = {
                    x: this.snap,
                    y: this.snap
                };
            }
            if (this.snap.y) {
                offset.y = Math.round(offset.y / this.snap.y) * this.snap.y;
            }
            if (this.snap.x) {
                offset.x = Math.round(offset.x / this.snap.x) * this.snap.x;
            }

            if (!this.offset.equals(offset)) {
                this.scrollTo({x: -offset.x, y: -offset.y}, this.snapDuration);
            }
        }
    },

    // @private
    startMomentumAnimation: function(e) {
        var me = this,
            originalTime = (e.event.originalTimeStamp) ? e.event.originalTimeStamp : e.time,
            duration = Math.max(40, originalTime - this.originalStartTime);

        this.fireEvent('beforemomentumanimationstart');

        if (
            (!this.momentum || !(duration <= this.startMomentumResetTime)) &&
            !this.offsetBoundary.isOutOfBound(this.offset)
        ) {
            return false;
        }

        // Determine the duration of the momentum
        var minVelocity = this.minVelocityForAnimation,
            currentVelocity,
            currentOffset = this.offset.copy(),
            restrictedOffset,
            acceleration = (duration / this.acceleration);

        this.isBouncing = {x: false, y: false};
        this.isDecelerating = {x: false, y: false};
        this.momentumAnimationStartTime = e.time;
        this.momentumAnimationProcessingTime = 0;
        this.bouncingData = {x: null, y: null};

        // Determine the deceleration velocity
        this.momentumAnimationStartVelocity = {
            x: (this.offset.x - this.startTimeOffset.x) / acceleration,
            y: (this.offset.y - this.startTimeOffset.y) / acceleration
        };

        this.momentumAnimationStartOffset = currentOffset;

        ['x', 'y'].forEach(function(axis) {

            this.isDecelerating[axis] = (Math.abs(this.momentumAnimationStartVelocity[axis]) > minVelocity);

            if (this.bounces && this.bounces[axis]) {
                restrictedOffset = this.offsetBoundary.restrict(axis, currentOffset[axis]);

                if (restrictedOffset !== currentOffset[axis]) {
                    currentVelocity = (currentOffset[axis] - restrictedOffset) * this.bouncingVelocityFactor;

                    this.bouncingData[axis] = {
                        axis: axis,
                        offset: restrictedOffset,
                        time: this.momentumAnimationStartTime,
                        velocity: currentVelocity
                    };

                    this.isBouncing[axis] = true;
                    this.isDecelerating[axis] = false;

                    this.fireEvent('bouncestart', this, this.bouncingData[axis]);

                    this.bouncingAnimation[axis].set({
                        startTime: this.bouncingData[axis].time - this.bouncingTimeFactor,
                        startOffset: this.bouncingData[axis].offset,
                        startVelocity: this.bouncingData[axis].velocity
                    });
                }
            }

            if (this.isDecelerating[axis]) {
                this.decelerationAnimation[axis].set({
                    startVelocity: this.momentumAnimationStartVelocity[axis],
                    startOffset: this.momentumAnimationStartOffset[axis],
                    startTime: this.momentumAnimationStartTime
                });
            }
        }, this);

        if (this.isDecelerating.x || this.isDecelerating.y || this.isBouncing.x || this.isBouncing.y) {
            this.isMomentumAnimating = true;
            this.momentumAnimationFramesHandled = 0;
            this.fireEvent('momentumanimationstart');

            me.handleMomentumAnimationFrame();
            this.momentumAnimationTimer = setInterval(function() {
                me.handleMomentumAnimationFrame();
            }, this.getFrameDuration());
            return true;
        }

        return false;
    },

    // @private
    stopMomentumAnimation: function() {
        if (this.isMomentumAnimating) {
            if (this.momentumAnimationTimer) {
                clearInterval(this.momentumAnimationTimer);
            }
            this.momentumAnimationEndTime = Date.now();

            //<debug>
            var lastFps = this.getLastActualFps();

            if (!this.maxFps || lastFps > this.maxFps) {
                this.maxFps = lastFps;
            }

            if (this.autoAdjustFps) {
                this.fps = this.maxFps;
            }
            //</debug>

            this.isDecelerating = {};
            this.isBouncing = {};

            this.fireEvent('momentumanimationend');
            this.fireScrollEndEvent();

        }

        return this;
    },

    /**
     * @private
     */
    handleMomentumAnimationFrame : function() {
        if (!this.isMomentumAnimating) {
            return;
        }

        var currentTime = Date.now(),
            newOffset = this.offset.copy(),
            offsetBoundary = this.offsetBoundary,
            currentVelocity,
            restrictedOffset,
            outOfBoundDistance;

        ['x', 'y'].forEach(function(axis) {
            if (this.isDecelerating[axis]) {
                newOffset[axis] = this.decelerationAnimation[axis].getOffset();
                currentVelocity = this.momentumAnimationStartVelocity[axis] * this.decelerationAnimation[axis].getFrictionFactor();
                outOfBoundDistance = offsetBoundary.getOutOfBoundOffset(axis, newOffset[axis]);

                // If the new offset is out of boundary, we are going to start a bounce
                if (outOfBoundDistance !== 0) {
                    restrictedOffset = offsetBoundary.restrict(axis, newOffset[axis]);

                    if (this.bounces && this.bounces[axis]) {
                        this.bouncingData[axis] = {
                            axis: axis,
                            offset: restrictedOffset,
                            time: currentTime,
                            velocity: currentVelocity
                        };

                        this.fireEvent('bouncestart', this, this.bouncingData[axis]);

                        this.bouncingAnimation[axis].set({
                            startTime: this.bouncingData[axis].time,
                            startOffset: this.bouncingData[axis].offset,
                            startVelocity: this.bouncingData[axis].velocity
                        });
                        this.isBouncing[axis] = true;
                    }

                    this.isDecelerating[axis] = false;
                }
                else if (Math.abs(currentVelocity) <= 1) {
                    this.isDecelerating[axis] = false;
                }
            }
            else if (this.isBouncing[axis]) {
                newOffset[axis] = this.bouncingAnimation[axis].getOffset();
                restrictedOffset = offsetBoundary.restrict(axis, newOffset[axis]);

                if (Math.abs(newOffset[axis] - restrictedOffset) <= 1) {
                    this.isBouncing[axis] = false;
                    this.fireEvent('bounceend', this, {axis: axis});
                    newOffset[axis] = restrictedOffset;
                }
            }
        }, this);

        if (!this.isDecelerating.x && !this.isDecelerating.y && !this.isBouncing.x && !this.isBouncing.y) {
            this.stopMomentumAnimation();
            return;
        }

        //<debug>
        this.momentumAnimationFramesHandled++;
        this.momentumAnimationProcessingTime += Date.now() - currentTime;
        //</debug>

        this.setOffset(newOffset);
    },

    // Inherited docs
    destroy: function() {
        Ext.ScrollManager.unregister(this);
        return Ext.util.Scroller.superclass.destroy.apply(this, arguments);
    }
});

Ext.util.Scroller.Animation = {};

Ext.util.Scroller.Animation.Deceleration = Ext.extend(Ext.util.Draggable.Animation.Abstract, {
    acceleration: 30,
    theta: null,
    startVelocity: null,

    getOffset: function() {
        return this.startOffset - this.startVelocity * (1 - this.getFrictionFactor()) / this.theta;
    },

    getFrictionFactor : function() {
        var deltaTime = Date.now() - this.startTime;

        return Math.exp(deltaTime / this.acceleration * this.theta);
    }
});

Ext.util.Scroller.Animation.Bouncing = Ext.extend(Ext.util.Draggable.Animation.Abstract, {
    springTension: 0.3,
    acceleration: 30,
    startVelocity: null,

    getOffset: function() {
        var deltaTime = (Date.now() - this.startTime),
            powTime = (deltaTime / this.acceleration) * Math.pow(Math.E, -this.springTension * (deltaTime / this.acceleration));

        return this.startOffset + (this.startVelocity * powTime);
    }
});

/**
 * @class Ext.util.Indicator
 * @extends Object
 *
 * Represent the Scroll Indicator to be used in a {@link Ext.util.ScrollView ScrollView}
 */
Ext.util.Scroller.Indicator = Ext.extend(Object, {
    baseCls: 'x-scrollbar',

    ui: 'dark',

    /**
     * @cfg {String} type
     * The type of this Indicator, valid values are 'vertical' or 'horizontal'
     */
    type: 'horizontal',

    constructor: function(container, config) {
        this.container = container;

        Ext.apply(this, config);

        this.el = this.container.createChild({
            cls: [this.baseCls, this.baseCls + '-' + this.type, this.baseCls + '-' + this.ui].join(' ')
        });

        this.offset = new Ext.util.Offset();

        this.hide();
    },

    /*
     * Hide this Indicator
     * @return {Ext.util.Scroller.Indicator} this This Indicator
     */
    hide: function() {
        var me = this;

        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
        }

        this.hideTimer = setTimeout(function() {
            me.el.setStyle('opacity', 0);
        }, 100);

        return this;
    },

    /*
     * Show this Indicator
     * @return {Ext.util.Scroller.Indicator} this This Indicator
     */
    show: function() {
        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
        }

        this.el.setStyle('opacity', 1);

        return this;
    },

    /*
     * Set the visibility of this Indicator, a wrapper function for
     * {@link Ext.util.Scroller.Indicator#show show} and {@link Ext.util.Scroller.Indicator#show hide}
     * @param {Boolean} isVisible True to show this Indicator, false to hide
     * @return {Ext.util.Scroller.Indicator} this This Indicator
     */
    setVisibility: function(isVisible) {
        return this[isVisible ? 'show' : 'hide']();
    },

    /*
     * Adjust the size of this Indicator, will change the height if {@link Ext.util.Scroller.Indicator#type type}
     * is 'vertical', and width for 'horizontal'
     * @param {Number} size The new size to change to
     * @return {Ext.util.Scroller.Indicator} this This Indicator
     */
    setSize: function(size) {
        if (this.size && size > this.size) {
            size = Math.round(size);
        }

        // this.el.setStyle(height) is cleaner here but let's save some little performance...
        this.el.dom.style[(this.type == 'horizontal') ? 'width' : 'height'] = size + 'px';

        this.size = size;

        return this;
    },

    /*
     * Set the offset position of this Indicator, relative to its container
     * @param {Number} offset The new offset
     * @return {Ext.util.Scroller.Indicator} this This Indicator
     */
    setOffset: function(offset) {
        if (this.type == 'vertical') {
            this.offset.y = offset;
        } else {
            this.offset.x = offset;
        }

        if (!Ext.is.iOS && !Ext.is.Desktop) {
            if (this.type == 'vertical') {
                this.el.dom.style.top = this.offset.y + 'px';
            } else {
                this.el.dom.style.left = this.offset.x + 'px';
            }
        } else {
            Ext.Element.cssTranslate(this.el, this.offset);
        }

        return this;
    }

});

})();

/**
 * @class Ext.util.Sortable
 * @extends Ext.util.Observable
 * @constructor
 * @param {Mixed} el
 * @param {Object} config
 */
Ext.util.Sortable = Ext.extend(Ext.util.Observable, {
    baseCls: 'x-sortable',

    /**
     * @cfg {String} direction
     * Possible values: 'vertical', 'horizontal'
     * Defaults to 'vertical'
     */
    direction: 'vertical',

    /**
     * @cfg {String} cancelSelector
     * A simple CSS selector that represents elements within the draggable
     * that should NOT initiate a drag.
     */
    cancelSelector: null,

    // not yet implemented
    //indicator: true,
    //proxy: true,
    //tolerance: null,

    /**
     * @cfg {Element/Boolean} constrain
     * An Element to constrain the Sortable dragging to. Defaults to <tt>window</tt>.
     * If <tt>true</tt> is specified, the dragging will be constrained to the element
     * of the sortable.
     */
    constrain: window,
    /**
     * @cfg {String} group
     * Draggable and Droppable objects can participate in a group which are
     * capable of interacting. Defaults to 'base'
     */
    group: 'base',

    /**
     * @cfg {Boolean} revert
     * This should NOT be changed.
     * @private
     */
    revert: true,

    /**
     * @cfg {String} itemSelector
     * A simple CSS selector that represents individual items within the Sortable.
     */
    itemSelector: null,

    /**
     * @cfg {String} handleSelector
     * A simple CSS selector to indicate what is the handle to drag the Sortable.
     */
    handleSelector: null,

    /**
     * @cfg {Boolean} disabled
     * Passing in true will disable this Sortable.
     */
    disabled: false,

    /**
     * @cfg {Number} delay
     * How many milliseconds a user must hold the draggable before starting a
     * drag operation. Defaults to 0 or immediate.
     * @private
     */
    delay: 0,

    // Properties

    /**
     * Read-only property that indicates whether a Sortable is currently sorting.
     * @type Boolean
     * @private
     */
    sorting: false,

    /**
     * Read-only value representing whether the Draggable can be moved vertically.
     * This is automatically calculated by Draggable by the direction configuration.
     * @type Boolean
     * @private
     */
    vertical: false,

    /**
     * Read-only value representing whether the Draggable can be moved horizontally.
     * This is automatically calculated by Draggable by the direction configuration.
     * @type Boolean
     * @private
     */
    vertical: false,
    
    constructor : function(el, config) {
        config = config || {};
        Ext.apply(this, config);

        this.addEvents(
            /**
             * @event sortstart
             * @param {Ext.Sortable} this
             * @param {Ext.EventObject} e
             */
            'sortstart',
            /**
             * @event sortend
             * @param {Ext.Sortable} this
             * @param {Ext.EventObject} e
             */
            'sortend',
            /**
             * @event sortchange
             * @param {Ext.Sortable} this
             * @param {Ext.Element} el The Element being dragged.
             * @param {Number} index The index of the element after the sort change.
             */
            'sortchange'

            // not yet implemented.
            // 'sortupdate',
            // 'sortreceive',
            // 'sortremove',
            // 'sortenter',
            // 'sortleave',
            // 'sortactivate',
            // 'sortdeactivate'
        );

        this.el = Ext.get(el);
        Ext.util.Sortable.superclass.constructor.call(this);

        if (this.direction == 'horizontal') {
            this.horizontal = true;
        }
        else if (this.direction == 'vertical') {
            this.vertical = true;
        }
        else {
            this.horizontal = this.vertical = true;
        }

        this.el.addCls(this.baseCls);
        this.startEventName = (this.delay > 0) ? 'taphold' : 'tapstart';
        if (!this.disabled) {
            this.enable();
        }
    },

    // @private
    onStart : function(e, t) {
        if (this.cancelSelector && e.getTarget(this.cancelSelector)) {
            return;
        }
        if (this.handleSelector && !e.getTarget(this.handleSelector)) {
            return;
        }
        
        if (!this.sorting) {
            this.onSortStart(e, t);
        }
    },

    // @private
    onSortStart : function(e, t) {
        this.sorting = true;
        var draggable = new Ext.util.Draggable(t, {
            threshold: 0,
            revert: this.revert,
            direction: this.direction,
            constrain: this.constrain === true ? this.el : this.constrain,
            animationDuration: 100
        });
        draggable.on({
            drag: this.onDrag,
            dragend: this.onDragEnd,
            scope: this
        });
        
        this.dragEl = t;
        this.calculateBoxes();

        if (!draggable.dragging) {
            draggable.onStart(e);
        }
        
        this.fireEvent('sortstart', this, e);
    },

    // @private
    calculateBoxes : function() {
        this.items = [];
        var els = this.el.select(this.itemSelector, false),
            ln = els.length, i, item, el, box;

        for (i = 0; i < ln; i++) {
            el = els[i];
            if (el != this.dragEl) {
                item = Ext.fly(el).getPageBox(true);
                item.el = el;
                this.items.push(item);
            }
        }
    },

    // @private
    onDrag : function(draggable, e) {
        var items = this.items,
            ln = items.length,
            region = draggable.region,
            sortChange = false,
            i, intersect, overlap, item;
            
        for (i = 0; i < ln; i++) {
            item = items[i];
            intersect = region.intersect(item);
            if (intersect) {
                if (this.vertical && Math.abs(intersect.top - intersect.bottom) > (region.bottom - region.top) / 2) {
                    if (region.bottom > item.top && item.top > region.top) {
                        draggable.el.insertAfter(item.el);
                    }
                    else {
                        draggable.el.insertBefore(item.el);
                    }
                    sortChange = true;
                }
                else if (this.horizontal && Math.abs(intersect.left - intersect.right) > (region.right - region.left) / 2) {
                    if (region.right > item.left && item.left > region.left) {
                        draggable.el.insertAfter(item.el);
                    }
                    else {
                        draggable.el.insertBefore(item.el);
                    }
                    sortChange = true;
                }

                if (sortChange) {
                    // We reset the draggable (initializes all the new start values)
                    draggable.reset();

                    // Move the draggable to its current location (since the transform is now
                    // different)
                    draggable.moveTo(region.left, region.top);

                    // Finally lets recalculate all the items boxes
                    this.calculateBoxes();
                    this.fireEvent('sortchange', this, draggable.el, this.el.select(this.itemSelector, false).indexOf(draggable.el.dom));
                    return;
                }
            }
        }
    },

    // @private
    onDragEnd : function(draggable, e) {
        draggable.destroy();
        this.sorting = false;
        this.fireEvent('sortend', this, draggable, e);
    },

    /**
     * Enables sorting for this Sortable.
     * This method is invoked immediately after construction of a Sortable unless
     * the disabled configuration is set to true.
     */
    enable : function() {
        this.el.on(this.startEventName, this.onStart, this, {delegate: this.itemSelector, holdThreshold: this.delay});
        this.disabled = false;
    },

    /**
     * Disables sorting for this Sortable.
     */
    disable : function() {
        this.el.un(this.startEventName, this.onStart, this);
        this.disabled = true;
    },
    
    /**
     * Method to determine whether this Sortable is currently disabled.
     * @return {Boolean} the disabled state of this Sortable.
     */
    isDisabled : function() {
        return this.disabled;
    },
    
    /**
     * Method to determine whether this Sortable is currently sorting.
     * @return {Boolean} the sorting state of this Sortable.
     */
    isSorting : function() {
        return this.sorting;
    },
    
    /**
     * Method to determine whether this Sortable is currently disabled.
     * @return {Boolean} the disabled state of this Sortable.
     */
    isVertical : function() {
        return this.vertical;
    },
    
    /**
     * Method to determine whether this Sortable is currently sorting.
     * @return {Boolean} the sorting state of this Sortable.
     */
    isHorizontal : function() {
        return this.horizontal;
    }    
});
/**
 * @class Date
 *
 * The date parsing and formatting syntax contains a subset of
 * <a href="http://www.php.net/date">PHP's date() function</a>, and the formats that are
 * supported will provide results equivalent to their PHP versions.
 *
 * The following is a list of all currently supported formats:
 * <pre>
Format  Description                                                               Example returned values
------  -----------------------------------------------------------------------   -----------------------
  d     Day of the month, 2 digits with leading zeros                             01 to 31
  D     A short textual representation of the day of the week                     Mon to Sun
  j     Day of the month without leading zeros                                    1 to 31
  l     A full textual representation of the day of the week                      Sunday to Saturday
  N     ISO-8601 numeric representation of the day of the week                    1 (for Monday) through 7 (for Sunday)
  S     English ordinal suffix for the day of the month, 2 characters             st, nd, rd or th. Works well with j
  w     Numeric representation of the day of the week                             0 (for Sunday) to 6 (for Saturday)
  z     The day of the year (starting from 0)                                     0 to 364 (365 in leap years)
  W     ISO-8601 week number of year, weeks starting on Monday                    01 to 53
  F     A full textual representation of a month, such as January or March        January to December
  m     Numeric representation of a month, with leading zeros                     01 to 12
  M     A short textual representation of a month                                 Jan to Dec
  n     Numeric representation of a month, without leading zeros                  1 to 12
  t     Number of days in the given month                                         28 to 31
  L     Whether it's a leap year                                                  1 if it is a leap year, 0 otherwise.
  o     ISO-8601 year number (identical to (Y), but if the ISO week number (W)    Examples: 1998 or 2004
        belongs to the previous or next year, that year is used instead)
  Y     A full numeric representation of a year, 4 digits                         Examples: 1999 or 2003
  y     A two digit representation of a year                                      Examples: 99 or 03
  a     Lowercase Ante meridiem and Post meridiem                                 am or pm
  A     Uppercase Ante meridiem and Post meridiem                                 AM or PM
  g     12-hour format of an hour without leading zeros                           1 to 12
  G     24-hour format of an hour without leading zeros                           0 to 23
  h     12-hour format of an hour with leading zeros                              01 to 12
  H     24-hour format of an hour with leading zeros                              00 to 23
  i     Minutes, with leading zeros                                               00 to 59
  s     Seconds, with leading zeros                                               00 to 59
  u     Decimal fraction of a second                                              Examples:
        (minimum 1 digit, arbitrary number of digits allowed)                     001 (i.e. 0.001s) or
                                                                                  100 (i.e. 0.100s) or
                                                                                  999 (i.e. 0.999s) or
                                                                                  999876543210 (i.e. 0.999876543210s)
  O     Difference to Greenwich time (GMT) in hours and minutes                   Example: +1030
  P     Difference to Greenwich time (GMT) with colon between hours and minutes   Example: -08:00
  T     Timezone abbreviation of the machine running the code                     Examples: EST, MDT, PDT ...
  Z     Timezone offset in seconds (negative if west of UTC, positive if east)    -43200 to 50400
  c     ISO 8601 date
        Notes:                                                                    Examples:
        1) If unspecified, the month / day defaults to the current month / day,   1991 or
           the time defaults to midnight, while the timezone defaults to the      1992-10 or
           browser's timezone. If a time is specified, it must include both hours 1993-09-20 or
           and minutes. The "T" delimiter, seconds, milliseconds and timezone     1994-08-19T16:20+01:00 or
           are optional.                                                          1995-07-18T17:21:28-02:00 or
        2) The decimal fraction of a second, if specified, must contain at        1996-06-17T18:22:29.98765+03:00 or
           least 1 digit (there is no limit to the maximum number                 1997-05-16T19:23:30,12345-0400 or
           of digits allowed), and may be delimited by either a '.' or a ','      1998-04-15T20:24:31.2468Z or
        Refer to the examples on the right for the various levels of              1999-03-14T20:24:32Z or
        date-time granularity which are supported, or see                         2000-02-13T21:25:33
        http://www.w3.org/TR/NOTE-datetime for more info.                         2001-01-12 22:26:34
  U     Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)                1193432466 or -2138434463
  M$    Microsoft AJAX serialized dates                                           \/Date(1238606590509)\/ (i.e. UTC milliseconds since epoch) or
                                                                                  \/Date(1238606590509+0800)\/
</pre>
 *
 * Example usage (note that you must escape format specifiers with '\\' to render them as character literals):
 * <pre><code>
// Sample date:
// 'Wed Jan 10 2007 15:05:01 GMT-0600 (Central Standard Time)'

var dt = new Date('1/10/2007 03:05:01 PM GMT-0600');
document.write(dt.format('Y-m-d'));                           // 2007-01-10
document.write(dt.format('F j, Y, g:i a'));                   // January 10, 2007, 3:05 pm
document.write(dt.format('l, \\t\\he jS \\of F Y h:i:s A'));  // Wednesday, the 10th of January 2007 03:05:01 PM
</code></pre>
 *
 * Here are some standard date/time patterns that you might find helpful.  They
 * are not part of the source of Date.js, but to use them you can simply copy this
 * block of code into any script that is included after Date.js and they will also become
 * globally available on the Date object.  Feel free to add or remove patterns as needed in your code.
 * <pre><code>
Date.patterns = {
    ISO8601Long:"Y-m-d H:i:s",
    ISO8601Short:"Y-m-d",
    ShortDate: "n/j/Y",
    LongDate: "l, F d, Y",
    FullDateTime: "l, F d, Y g:i:s A",
    MonthDay: "F d",
    ShortTime: "g:i A",
    LongTime: "g:i:s A",
    SortableDateTime: "Y-m-d\\TH:i:s",
    UniversalSortableDateTime: "Y-m-d H:i:sO",
    YearMonth: "F, Y"
};
</code></pre>
 *
 * Example usage:
 * <pre><code>
var dt = new Date();
document.write(dt.format(Date.patterns.ShortDate));
</code></pre>
 * <p>Developer-written, custom formats may be used by supplying both a formatting and a parsing function
 * which perform to specialized requirements. The functions are stored in {@link #parseFunctions} and {@link #formatFunctions}.</p>
 */

/*
 * Most of the date-formatting functions below are the excellent work of Baron Schwartz.
 * (see http://www.xaprb.com/blog/2005/12/12/javascript-closures-for-runtime-efficiency/)
 * They generate precompiled functions from format patterns instead of parsing and
 * processing each pattern every time a date is formatted. These functions are available
 * on every Date object.
 */

 (function() {

    /**
 * Global flag which determines if strict date parsing should be used.
 * Strict date parsing will not roll-over invalid dates, which is the
 * default behaviour of javascript Date objects.
 * (see {@link #parseDate} for more information)
 * Defaults to <tt>false</tt>.
 * @static
 * @type Boolean
*/
    Date.useStrict = false;


    // create private copy of Ext's Ext.util.Format.format() method
    // - to remove unnecessary dependency
    // - to resolve namespace conflict with M$-Ajax's implementation
    function xf(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/\{(\d+)\}/g,
        function(m, i) {
            return args[i];
        });
    }


    // private
    Date.formatCodeToRegex = function(character, currentGroup) {
        // Note: currentGroup - position in regex result array (see notes for Date.parseCodes below)
        var p = Date.parseCodes[character];

        if (p) {
            p = typeof p == 'function' ? p() : p;
            Date.parseCodes[character] = p;
            // reassign function result to prevent repeated execution
        }

        return p ? Ext.applyIf({
            c: p.c ? xf(p.c, currentGroup || "{0}") : p.c
        },
        p) : {
            g: 0,
            c: null,
            s: Ext.util.Format.escapeRegex(character)
            // treat unrecognised characters as literals
        };
    };

    // private shorthand for Date.formatCodeToRegex since we'll be using it fairly often
    var $f = Date.formatCodeToRegex;

    Ext.apply(Date, {
        /**
     * <p>An object hash in which each property is a date parsing function. The property name is the
     * format string which that function parses.</p>
     * <p>This object is automatically populated with date parsing functions as
     * date formats are requested for Ext standard formatting strings.</p>
     * <p>Custom parsing functions may be inserted into this object, keyed by a name which from then on
     * may be used as a format string to {@link #parseDate}.<p>
     * <p>Example:</p><pre><code>
Date.parseFunctions['x-date-format'] = myDateParser;
</code></pre>
     * <p>A parsing function should return a Date object, and is passed the following parameters:<div class="mdetail-params"><ul>
     * <li><code>date</code> : String<div class="sub-desc">The date string to parse.</div></li>
     * <li><code>strict</code> : Boolean<div class="sub-desc">True to validate date strings while parsing
     * (i.e. prevent javascript Date "rollover") (The default must be false).
     * Invalid date strings should return null when parsed.</div></li>
     * </ul></div></p>
     * <p>To enable Dates to also be <i>formatted</i> according to that format, a corresponding
     * formatting function must be placed into the {@link #formatFunctions} property.
     * @property parseFunctions
     * @static
     * @type Object
     */
        parseFunctions: {
            "M$": function(input, strict) {
                // note: the timezone offset is ignored since the M$ Ajax server sends
                // a UTC milliseconds-since-Unix-epoch value (negative values are allowed)
                var re = new RegExp('\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/');
                var r = (input || '').match(re);
                return r ? new Date(((r[1] || '') + r[2]) * 1) : null;
            }
        },
        parseRegexes: [],

        /**
     * <p>An object hash in which each property is a date formatting function. The property name is the
     * format string which corresponds to the produced formatted date string.</p>
     * <p>This object is automatically populated with date formatting functions as
     * date formats are requested for Ext standard formatting strings.</p>
     * <p>Custom formatting functions may be inserted into this object, keyed by a name which from then on
     * may be used as a format string to {@link #format}. Example:</p><pre><code>
Date.formatFunctions['x-date-format'] = myDateFormatter;
</code></pre>
     * <p>A formatting function should return a string representation of the passed Date object, and is passed the following parameters:<div class="mdetail-params"><ul>
     * <li><code>date</code> : Date<div class="sub-desc">The Date to format.</div></li>
     * </ul></div></p>
     * <p>To enable date strings to also be <i>parsed</i> according to that format, a corresponding
     * parsing function must be placed into the {@link #parseFunctions} property.
     * @property formatFunctions
     * @static
     * @type Object
     */
        formatFunctions: {
            "M$": function() {
                // UTC milliseconds since Unix epoch (M$-AJAX serialized date format (MRSF))
                return '\\/Date(' + this.getTime() + ')\\/';
            }
        },

        y2kYear: 50,

        /**
     * Date interval constant
     * @static
     * @type String
     */
        MILLI: "ms",

        /**
     * Date interval constant
     * @static
     * @type String
     */
        SECOND: "s",

        /**
     * Date interval constant
     * @static
     * @type String
     */
        MINUTE: "mi",

        /** Date interval constant
     * @static
     * @type String
     */
        HOUR: "h",

        /**
     * Date interval constant
     * @static
     * @type String
     */
        DAY: "d",

        /**
     * Date interval constant
     * @static
     * @type String
     */
        MONTH: "mo",

        /**
     * Date interval constant
     * @static
     * @type String
     */
        YEAR: "y",

        /**
     * <p>An object hash containing default date values used during date parsing.</p>
     * <p>The following properties are available:<div class="mdetail-params"><ul>
     * <li><code>y</code> : Number<div class="sub-desc">The default year value. (defaults to undefined)</div></li>
     * <li><code>m</code> : Number<div class="sub-desc">The default 1-based month value. (defaults to undefined)</div></li>
     * <li><code>d</code> : Number<div class="sub-desc">The default day value. (defaults to undefined)</div></li>
     * <li><code>h</code> : Number<div class="sub-desc">The default hour value. (defaults to undefined)</div></li>
     * <li><code>i</code> : Number<div class="sub-desc">The default minute value. (defaults to undefined)</div></li>
     * <li><code>s</code> : Number<div class="sub-desc">The default second value. (defaults to undefined)</div></li>
     * <li><code>ms</code> : Number<div class="sub-desc">The default millisecond value. (defaults to undefined)</div></li>
     * </ul></div></p>
     * <p>Override these properties to customize the default date values used by the {@link #parseDate} method.</p>
     * <p><b>Note: In countries which experience Daylight Saving Time (i.e. DST), the <tt>h</tt>, <tt>i</tt>, <tt>s</tt>
     * and <tt>ms</tt> properties may coincide with the exact time in which DST takes effect.
     * It is the responsiblity of the developer to account for this.</b></p>
     * Example Usage:
     * <pre><code>
// set default day value to the first day of the month
Date.defaults.d = 1;

// parse a February date string containing only year and month values.
// setting the default day value to 1 prevents weird date rollover issues
// when attempting to parse the following date string on, for example, March 31st 2009.
Date.parseDate('2009-02', 'Y-m'); // returns a Date object representing February 1st 2009
</code></pre>
     * @property defaults
     * @static
     * @type Object
     */
        defaults: {},

        /**
     * An array of textual day names.
     * Override these values for international dates.
     * Example:
     * <pre><code>
Date.dayNames = [
    'SundayInYourLang',
    'MondayInYourLang',
    ...
];
</code></pre>
     * @type Array
     * @static
     */
        dayNames: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
        ],

        /**
     * An array of textual month names.
     * Override these values for international dates.
     * Example:
     * <pre><code>
Date.monthNames = [
    'JanInYourLang',
    'FebInYourLang',
    ...
];
</code></pre>
     * @type Array
     * @static
     */
        monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
        ],

        /**
     * An object hash of zero-based javascript month numbers (with short month names as keys. note: keys are case-sensitive).
     * Override these values for international dates.
     * Example:
     * <pre><code>
Date.monthNumbers = {
    'ShortJanNameInYourLang':0,
    'ShortFebNameInYourLang':1,
    ...
};
</code></pre>
     * @type Object
     * @static
     */
        monthNumbers: {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dec: 11
        },

        /**
     * Get the short month name for the given month number.
     * Override this function for international dates.
     * @param {Number} month A zero-based javascript month number.
     * @return {String} The short month name.
     * @static
     */
        getShortMonthName: function(month) {
            return Date.monthNames[month].substring(0, 3);
        },

        /**
     * Get the short day name for the given day number.
     * Override this function for international dates.
     * @param {Number} day A zero-based javascript day number.
     * @return {String} The short day name.
     * @static
     */
        getShortDayName: function(day) {
            return Date.dayNames[day].substring(0, 3);
        },

        /**
     * Get the zero-based javascript month number for the given short/full month name.
     * Override this function for international dates.
     * @param {String} name The short/full month name.
     * @return {Number} The zero-based javascript month number.
     * @static
     */
        getMonthNumber: function(name) {
            // handle camel casing for english month names (since the keys for the Date.monthNumbers hash are case sensitive)
            return Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        },

        /**
     * The base format-code to formatting-function hashmap used by the {@link #format} method.
     * Formatting functions are strings (or functions which return strings) which
     * will return the appropriate value when evaluated in the context of the Date object
     * from which the {@link #format} method is called.
     * Add to / override these mappings for custom date formatting.
     * Note: Date.format() treats characters as literals if an appropriate mapping cannot be found.
     * Example:
     * <pre><code>
Date.formatCodes.x = "Ext.util.Format.leftPad(this.getDate(), 2, '0')";
(new Date()).format("X"); // returns the current day of the month
</code></pre>
     * @type Object
     * @static
     */
        formatCodes: {
            d: "Ext.util.Format.leftPad(this.getDate(), 2, '0')",
            D: "Date.getShortDayName(this.getDay())",
            // get localised short day name
            j: "this.getDate()",
            l: "Date.dayNames[this.getDay()]",
            N: "(this.getDay() ? this.getDay() : 7)",
            S: "this.getSuffix()",
            w: "this.getDay()",
            z: "this.getDayOfYear()",
            W: "Ext.util.Format.leftPad(this.getWeekOfYear(), 2, '0')",
            F: "Date.monthNames[this.getMonth()]",
            m: "Ext.util.Format.leftPad(this.getMonth() + 1, 2, '0')",
            M: "Date.getShortMonthName(this.getMonth())",
            // get localised short month name
            n: "(this.getMonth() + 1)",
            t: "this.getDaysInMonth()",
            L: "(this.isLeapYear() ? 1 : 0)",
            o: "(this.getFullYear() + (this.getWeekOfYear() == 1 && this.getMonth() > 0 ? +1 : (this.getWeekOfYear() >= 52 && this.getMonth() < 11 ? -1 : 0)))",
            Y: "this.getFullYear()",
            y: "('' + this.getFullYear()).substring(2, 4)",
            a: "(this.getHours() < 12 ? 'am' : 'pm')",
            A: "(this.getHours() < 12 ? 'AM' : 'PM')",
            g: "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
            G: "this.getHours()",
            h: "Ext.util.Format.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",
            H: "Ext.util.Format.leftPad(this.getHours(), 2, '0')",
            i: "Ext.util.Format.leftPad(this.getMinutes(), 2, '0')",
            s: "Ext.util.Format.leftPad(this.getSeconds(), 2, '0')",
            u: "Ext.util.Format.leftPad(this.getMilliseconds(), 3, '0')",
            O: "this.getGMTOffset()",
            P: "this.getGMTOffset(true)",
            T: "this.getTimezone()",
            Z: "(this.getTimezoneOffset() * -60)",

            c: function() {
                // ISO-8601 -- GMT format
                for (var c = "Y-m-dTH:i:sP", code = [], i = 0, l = c.length; i < l; ++i) {
                    var e = c.charAt(i);
                    code.push(e == "T" ? "'T'": Date.getFormatCode(e));
                    // treat T as a character literal
                }
                return code.join(" + ");
            },
            /*
        c: function() { // ISO-8601 -- UTC format
            return [
              "this.getUTCFullYear()", "'-'",
              "Ext.util.Format.leftPad(this.getUTCMonth() + 1, 2, '0')", "'-'",
              "Ext.util.Format.leftPad(this.getUTCDate(), 2, '0')",
              "'T'",
              "Ext.util.Format.leftPad(this.getUTCHours(), 2, '0')", "':'",
              "Ext.util.Format.leftPad(this.getUTCMinutes(), 2, '0')", "':'",
              "Ext.util.Format.leftPad(this.getUTCSeconds(), 2, '0')",
              "'Z'"
            ].join(" + ");
        },
        */

            U: "Math.round(this.getTime() / 1000)"
        },

        /**
     * Checks if the passed Date parameters will cause a javascript Date "rollover".
     * @param {Number} year 4-digit year
     * @param {Number} month 1-based month-of-year
     * @param {Number} day Day of month
     * @param {Number} hour (optional) Hour
     * @param {Number} minute (optional) Minute
     * @param {Number} second (optional) Second
     * @param {Number} millisecond (optional) Millisecond
     * @return {Boolean} true if the passed parameters do not cause a Date "rollover", false otherwise.
     * @static
     */
        isValid: function(y, m, d, h, i, s, ms) {
            // setup defaults
            h = h || 0;
            i = i || 0;
            s = s || 0;
            ms = ms || 0;

            var dt = new Date(y, m - 1, d, h, i, s, ms);

            return y == dt.getFullYear() &&
            m == dt.getMonth() + 1 &&
            d == dt.getDate() &&
            h == dt.getHours() &&
            i == dt.getMinutes() &&
            s == dt.getSeconds() &&
            ms == dt.getMilliseconds();
        },

        /**
     * Parses the passed string using the specified date format.
     * Note that this function expects normal calendar dates, meaning that months are 1-based (i.e. 1 = January).
     * The {@link #defaults} hash will be used for any date value (i.e. year, month, day, hour, minute, second or millisecond)
     * which cannot be found in the passed string. If a corresponding default date value has not been specified in the {@link #defaults} hash,
     * the current date's year, month, day or DST-adjusted zero-hour time value will be used instead.
     * Keep in mind that the input date string must precisely match the specified format string
     * in order for the parse operation to be successful (failed parse operations return a null value).
     * <p>Example:</p><pre><code>
//dt = Fri May 25 2007 (current date)
var dt = new Date();

//dt = Thu May 25 2006 (today&#39;s month/day in 2006)
dt = Date.parseDate("2006", "Y");

//dt = Sun Jan 15 2006 (all date parts specified)
dt = Date.parseDate("2006-01-15", "Y-m-d");

//dt = Sun Jan 15 2006 15:20:01
dt = Date.parseDate("2006-01-15 3:20:01 PM", "Y-m-d g:i:s A");

// attempt to parse Sun Feb 29 2006 03:20:01 in strict mode
dt = Date.parseDate("2006-02-29 03:20:01", "Y-m-d H:i:s", true); // returns null
</code></pre>
     * @param {String} input The raw date string.
     * @param {String} format The expected date string format.
     * @param {Boolean} strict (optional) True to validate date strings while parsing (i.e. prevents javascript Date "rollover")
                        (defaults to false). Invalid date strings will return null when parsed.
     * @return {Date} The parsed Date.
     * @static
     */
        parseDate: function(input, format, strict) {
            var p = Date.parseFunctions;
            if (p[format] == null) {
                Date.createParser(format);
            }
            return p[format](input, Ext.isDefined(strict) ? strict: Date.useStrict);
        },

        // private
        getFormatCode: function(character) {
            var f = Date.formatCodes[character];

            if (f) {
                f = typeof f == 'function' ? f() : f;
                Date.formatCodes[character] = f;
                // reassign function result to prevent repeated execution
            }

            // note: unknown characters are treated as literals
            return f || ("'" + Ext.util.Format.escape(character) + "'");
        },

        // private
        createFormat: function(format) {
            var code = [],
            special = false,
            ch = '';

            for (var i = 0; i < format.length; ++i) {
                ch = format.charAt(i);
                if (!special && ch == "\\") {
                    special = true;
                } else if (special) {
                    special = false;
                    code.push("'" + Ext.util.Format.escape(ch) + "'");
                } else {
                    code.push(Date.getFormatCode(ch));
                }
            }
            Date.formatFunctions[format] = new Function("return " + code.join('+'));
        },

        // private
        createParser: function() {
            var code = [
            "var dt, y, m, d, h, i, s, ms, o, z, zz, u, v,",
            "def = Date.defaults,",
            "results = String(input).match(Date.parseRegexes[{0}]);",
            // either null, or an array of matched strings
            "if(results){",
            "{1}",

            "if(u != null){",
            // i.e. unix time is defined
            "v = new Date(u * 1000);",
            // give top priority to UNIX time
            "}else{",
            // create Date object representing midnight of the current day;
            // this will provide us with our date defaults
            // (note: clearTime() handles Daylight Saving Time automatically)
            "dt = (new Date()).clearTime();",

            // date calculations (note: these calculations create a dependency on Ext.num())
            "y = Ext.num(y, Ext.num(def.y, dt.getFullYear()));",
            "m = Ext.num(m, Ext.num(def.m - 1, dt.getMonth()));",
            "d = Ext.num(d, Ext.num(def.d, dt.getDate()));",

            // time calculations (note: these calculations create a dependency on Ext.num())
            "h  = Ext.num(h, Ext.num(def.h, dt.getHours()));",
            "i  = Ext.num(i, Ext.num(def.i, dt.getMinutes()));",
            "s  = Ext.num(s, Ext.num(def.s, dt.getSeconds()));",
            "ms = Ext.num(ms, Ext.num(def.ms, dt.getMilliseconds()));",

            "if(z >= 0 && y >= 0){",
            // both the year and zero-based day of year are defined and >= 0.
            // these 2 values alone provide sufficient info to create a full date object
            // create Date object representing January 1st for the given year
            "v = new Date(y, 0, 1, h, i, s, ms);",

            // then add day of year, checking for Date "rollover" if necessary
            "v = !strict? v : (strict === true && (z <= 364 || (v.isLeapYear() && z <= 365))? v.add(Date.DAY, z) : null);",
            "}else if(strict === true && !Date.isValid(y, m + 1, d, h, i, s, ms)){",
            // check for Date "rollover"
            "v = null;",
            // invalid date, so return null
            "}else{",
            // plain old Date object
            "v = new Date(y, m, d, h, i, s, ms);",
            "}",
            "}",
            "}",

            "if(v){",
            // favour UTC offset over GMT offset
            "if(zz != null){",
            // reset to UTC, then add offset
            "v = v.add(Date.SECOND, -v.getTimezoneOffset() * 60 - zz);",
            "}else if(o){",
            // reset to GMT, then add offset
            "v = v.add(Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));",
            "}",
            "}",

            "return v;"
            ].join('\n');

            return function(format) {
                var regexNum = Date.parseRegexes.length,
                currentGroup = 1,
                calc = [],
                regex = [],
                special = false,
                ch = "",
                i = 0,
                obj,
                last;

                for (; i < format.length; ++i) {
                    ch = format.charAt(i);
                    if (!special && ch == "\\") {
                        special = true;
                    } else if (special) {
                        special = false;
                        regex.push(Ext.util.Format.escape(ch));
                    } else {
                        obj = $f(ch, currentGroup);
                        currentGroup += obj.g;
                        regex.push(obj.s);
                        if (obj.g && obj.c) {
                            if (obj.last) {
                                last = obj;
                            } else {
                                calc.push(obj.c);
                            }
                        }
                    }
                }
                
                if (last) {
                    calc.push(last);
                }

                Date.parseRegexes[regexNum] = new RegExp("^" + regex.join('') + "$");
                Date.parseFunctions[format] = new Function("input", "strict", xf(code, regexNum, calc.join('')));
            };
        }(),

        // private
        parseCodes: {
            /*
         * Notes:
         * g = {Number} calculation group (0 or 1. only group 1 contributes to date calculations.)
         * c = {String} calculation method (required for group 1. null for group 0. {0} = currentGroup - position in regex result array)
         * s = {String} regex pattern. all matches are stored in results[], and are accessible by the calculation mapped to 'c'
         */
            d: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})"
                // day of month with leading zeroes (01 - 31)
            },
            j: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,2})"
                // day of month without leading zeroes (1 - 31)
            },
            D: function() {
                for (var a = [], i = 0; i < 7; a.push(Date.getShortDayName(i)), ++i);
                // get localised short day names
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + a.join("|") + ")"
                };
            },
            l: function() {
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + Date.dayNames.join("|") + ")"
                };
            },
            N: {
                g: 0,
                c: null,
                s: "[1-7]"
                // ISO-8601 day number (1 (monday) - 7 (sunday))
            },
            S: {
                g: 0,
                c: null,
                s: "(?:st|nd|rd|th)"
            },
            w: {
                g: 0,
                c: null,
                s: "[0-6]"
                // javascript day number (0 (sunday) - 6 (saturday))
            },
            z: {
                g: 1,
                c: "z = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,3})"
                // day of the year (0 - 364 (365 in leap years))
            },
            W: {
                g: 0,
                c: null,
                s: "(?:\\d{2})"
                // ISO-8601 week number (with leading zero)
            },
            F: function() {
                return {
                    g: 1,
                    c: "m = parseInt(Date.getMonthNumber(results[{0}]), 10);\n",
                    // get localised month number
                    s: "(" + Date.monthNames.join("|") + ")"
                };
            },
            M: function() {
                for (var a = [], i = 0; i < 12; a.push(Date.getShortMonthName(i)), ++i);
                // get localised short month names
                return Ext.applyIf({
                    s: "(" + a.join("|") + ")"
                },
                $f("F"));
            },
            m: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(\\d{2})"
                // month number with leading zeros (01 - 12)
            },
            n: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(\\d{1,2})"
                // month number without leading zeros (1 - 12)
            },
            t: {
                g: 0,
                c: null,
                s: "(?:\\d{2})"
                // no. of days in the month (28 - 31)
            },
            L: {
                g: 0,
                c: null,
                s: "(?:1|0)"
            },
            o: function() {
                return $f("Y");
            },
            Y: {
                g: 1,
                c: "y = parseInt(results[{0}], 10);\n",
                s: "(\\d{4})"
                // 4-digit year
            },
            y: {
                g: 1,
                c: "var ty = parseInt(results[{0}], 10);\n"
                + "y = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",
                // 2-digit year
                s: "(\\d{1,2})"
            },
            a: function(){
                return $f("A");
            },
            A: {
                // We need to calculate the hour before we apply AM/PM when parsing
                calcLast: true,
                g: 1,
                c: "if (results[{0}] == 'AM') {\n"
                    + "if (!h || h == 12) { h = 0; }\n"
                    + "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
                s: "(AM|PM)"
            },
            g: function() {
                return $f("G");
            },
            G: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,2})"
                // 24-hr format of an hour without leading zeroes (0 - 23)
            },
            h: function() {
                return $f("H");
            },
            H: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})"
                //  24-hr format of an hour with leading zeroes (00 - 23)
            },
            i: {
                g: 1,
                c: "i = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})"
                // minutes with leading zeros (00 - 59)
            },
            s: {
                g: 1,
                c: "s = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})"
                // seconds with leading zeros (00 - 59)
            },
            u: {
                g: 1,
                c: "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
                s: "(\\d+)"
                // decimal fraction of a second (minimum = 1 digit, maximum = unlimited)
            },
            O: {
                g: 1,
                c: [
                "o = results[{0}];",
                "var sn = o.substring(0,1),",
                // get + / - sign
                "hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),",
                // get hours (performs minutes-to-hour conversion also, just in case)
                "mn = o.substring(3,5) % 60;",
                // get minutes
                "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.util.Format.leftPad(hr, 2, '0') + Ext.util.Format.leftPad(mn, 2, '0')) : null;\n"
                // -12hrs <= GMT offset <= 14hrs
                ].join("\n"),
                s: "([+\-]\\d{4})"
                // GMT offset in hrs and mins
            },
            P: {
                g: 1,
                c: [
                "o = results[{0}];",
                "var sn = o.substring(0,1),",
                // get + / - sign
                "hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),",
                // get hours (performs minutes-to-hour conversion also, just in case)
                "mn = o.substring(4,6) % 60;",
                // get minutes
                "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.util.Format.leftPad(hr, 2, '0') + Ext.util.Format.leftPad(mn, 2, '0')) : null;\n"
                // -12hrs <= GMT offset <= 14hrs
                ].join("\n"),
                s: "([+\-]\\d{2}:\\d{2})"
                // GMT offset in hrs and mins (with colon separator)
            },
            T: {
                g: 0,
                c: null,
                s: "[A-Z]{1,4}"
                // timezone abbrev. may be between 1 - 4 chars
            },
            Z: {
                g: 1,
                c: "zz = results[{0}] * 1;\n"
                // -43200 <= UTC offset <= 50400
                + "zz = (-43200 <= zz && zz <= 50400)? zz : null;\n",
                s: "([+\-]?\\d{1,5})"
                // leading '+' sign is optional for UTC offset
            },
            c: function() {
                var calc = [],
                arr = [
                $f("Y", 1),
                // year
                $f("m", 2),
                // month
                $f("d", 3),
                // day
                $f("h", 4),
                // hour
                $f("i", 5),
                // minute
                $f("s", 6),
                // second
                {
                    c: "ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"
                },
                // decimal fraction of a second (minimum = 1 digit, maximum = unlimited)
                {
                    c: [
                    // allow either "Z" (i.e. UTC) or "-0530" or "+08:00" (i.e. UTC offset) timezone delimiters. assumes local timezone if no timezone is specified
                    "if(results[8]) {",
                    // timezone specified
                    "if(results[8] == 'Z'){",
                    "zz = 0;",
                    // UTC
                    "}else if (results[8].indexOf(':') > -1){",
                    $f("P", 8).c,
                    // timezone offset with colon separator
                    "}else{",
                    $f("O", 8).c,
                    // timezone offset without colon separator
                    "}",
                    "}"
                    ].join('\n')
                }
                ];

                for (var i = 0, l = arr.length; i < l; ++i) {
                    calc.push(arr[i].c);
                }

                return {
                    g: 1,
                    c: calc.join(""),
                    s: [
                    arr[0].s,
                    // year (required)
                    "(?:", "-", arr[1].s,
                    // month (optional)
                    "(?:", "-", arr[2].s,
                    // day (optional)
                    "(?:",
                    "(?:T| )?",
                    // time delimiter -- either a "T" or a single blank space
                    arr[3].s, ":", arr[4].s,
                    // hour AND minute, delimited by a single colon (optional). MUST be preceded by either a "T" or a single blank space
                    "(?::", arr[5].s, ")?",
                    // seconds (optional)
                    "(?:(?:\\.|,)(\\d+))?",
                    // decimal fraction of a second (e.g. ",12345" or ".98765") (optional)
                    "(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?",
                    // "Z" (UTC) or "-0530" (UTC offset without colon delimiter) or "+08:00" (UTC offset with colon delimiter) (optional)
                    ")?",
                    ")?",
                    ")?"
                    ].join("")
                };
            },
            U: {
                g: 1,
                c: "u = parseInt(results[{0}], 10);\n",
                s: "(-?\\d+)"
                // leading minus sign indicates seconds before UNIX epoch
            }
        }
    });

} ());

Ext.apply(Date.prototype, {
    // private
    dateFormat: function(format) {
        if (Date.formatFunctions[format] == null) {
            Date.createFormat(format);
        }
        return Date.formatFunctions[format].call(this);
    },

    /**
     * Get the timezone abbreviation of the current date (equivalent to the format specifier 'T').
     *
     * Note: The date string returned by the javascript Date object's toString() method varies
     * between browsers (e.g. FF vs IE) and system region settings (e.g. IE in Asia vs IE in America).
     * For a given date string e.g. "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)",
     * getTimezone() first tries to get the timezone abbreviation from between a pair of parentheses
     * (which may or may not be present), failing which it proceeds to get the timezone abbreviation
     * from the GMT offset portion of the date string.
     * @return {String} The abbreviated timezone name (e.g. 'CST', 'PDT', 'EDT', 'MPST' ...).
     */
    getTimezone: function() {
        // the following list shows the differences between date strings from different browsers on a WinXP SP2 machine from an Asian locale:
        //
        // Opera  : "Thu, 25 Oct 2007 22:53:45 GMT+0800" -- shortest (weirdest) date string of the lot
        // Safari : "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)" -- value in parentheses always gives the correct timezone (same as FF)
        // FF     : "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)" -- value in parentheses always gives the correct timezone
        // IE     : "Thu Oct 25 22:54:35 UTC+0800 2007" -- (Asian system setting) look for 3-4 letter timezone abbrev
        // IE     : "Thu Oct 25 17:06:37 PDT 2007" -- (American system setting) look for 3-4 letter timezone abbrev
        //
        // this crazy regex attempts to guess the correct timezone abbreviation despite these differences.
        // step 1: (?:\((.*)\) -- find timezone in parentheses
        // step 2: ([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?) -- if nothing was found in step 1, find timezone from timezone offset portion of date string
        // step 3: remove all non uppercase characters found in step 1 and 2
        return this.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "");
    },

    /**
     * Get the offset from GMT of the current date (equivalent to the format specifier 'O').
     * @param {Boolean} colon (optional) true to separate the hours and minutes with a colon (defaults to false).
     * @return {String} The 4-character offset string prefixed with + or - (e.g. '-0600').
     */
    getGMTOffset: function(colon) {
        return (this.getTimezoneOffset() > 0 ? "-": "+")
        + Ext.util.Format.leftPad(Math.floor(Math.abs(this.getTimezoneOffset()) / 60), 2, "0")
        + (colon ? ":": "")
        + Ext.util.Format.leftPad(Math.abs(this.getTimezoneOffset() % 60), 2, "0");
    },

    /**
     * Get the numeric day number of the year, adjusted for leap year.
     * @return {Number} 0 to 364 (365 in leap years).
     */
    getDayOfYear: function() {
        var num = 0,
        d = this.clone(),
        m = this.getMonth(),
        i;

        for (i = 0, d.setDate(1), d.setMonth(0); i < m; d.setMonth(++i)) {
            num += d.getDaysInMonth();
        }
        return num + this.getDate() - 1;
    },

    /**
     * Get the numeric ISO-8601 week number of the year.
     * (equivalent to the format specifier 'W', but without a leading zero).
     * @return {Number} 1 to 53
     */
    getWeekOfYear: function() {
        // adapted from http://www.merlyn.demon.co.uk/weekcalc.htm
        var ms1d = 864e5,
        // milliseconds in a day
        ms7d = 7 * ms1d;
        // milliseconds in a week
        return function() {
            // return a closure so constants get calculated only once
            var DC3 = Date.UTC(this.getFullYear(), this.getMonth(), this.getDate() + 3) / ms1d,
            // an Absolute Day Number
            AWN = Math.floor(DC3 / 7),
            // an Absolute Week Number
            Wyr = new Date(AWN * ms7d).getUTCFullYear();

            return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1;
        };
    }(),

    /**
     * Checks if the current date falls within a leap year.
     * @return {Boolean} True if the current date falls within a leap year, false otherwise.
     */
    isLeapYear: function() {
        var year = this.getFullYear();
        return !! ((year & 3) == 0 && (year % 100 || (year % 400 == 0 && year)));
    },

    /**
     * Get the first day of the current month, adjusted for leap year.  The returned value
     * is the numeric day index within the week (0-6) which can be used in conjunction with
     * the {@link #monthNames} array to retrieve the textual day name.
     * Example:
     * <pre><code>
var dt = new Date('1/10/2007');
document.write(Date.dayNames[dt.getFirstDayOfMonth()]); //output: 'Monday'
</code></pre>
     * @return {Number} The day number (0-6).
     */
    getFirstDayOfMonth: function() {
        var day = (this.getDay() - (this.getDate() - 1)) % 7;
        return (day < 0) ? (day + 7) : day;
    },

    /**
     * Get the last day of the current month, adjusted for leap year.  The returned value
     * is the numeric day index within the week (0-6) which can be used in conjunction with
     * the {@link #monthNames} array to retrieve the textual day name.
     * Example:
     * <pre><code>
var dt = new Date('1/10/2007');
document.write(Date.dayNames[dt.getLastDayOfMonth()]); //output: 'Wednesday'
</code></pre>
     * @return {Number} The day number (0-6).
     */
    getLastDayOfMonth: function() {
        return this.getLastDateOfMonth().getDay();
    },


    /**
     * Get the date of the first day of the month in which this date resides.
     * @return {Date}
     */
    getFirstDateOfMonth: function() {
        return new Date(this.getFullYear(), this.getMonth(), 1);
    },

    /**
     * Get the date of the last day of the month in which this date resides.
     * @return {Date}
     */
    getLastDateOfMonth: function() {
        return new Date(this.getFullYear(), this.getMonth(), this.getDaysInMonth());
    },

    /**
     * Get the number of days in the current month, adjusted for leap year.
     * @return {Number} The number of days in the month.
     */
    getDaysInMonth: function() {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        return function() {
            // return a closure for efficiency
            var m = this.getMonth();

            return m == 1 && this.isLeapYear() ? 29: daysInMonth[m];
        };
    }(),

    /**
     * Get the English ordinal suffix of the current day (equivalent to the format specifier 'S').
     * @return {String} 'st, 'nd', 'rd' or 'th'.
     */
    getSuffix: function() {
        switch (this.getDate()) {
        case 1:
        case 21:
        case 31:
            return "st";
        case 2:
        case 22:
            return "nd";
        case 3:
        case 23:
            return "rd";
        default:
            return "th";
        }
    },

    /**
     * Creates and returns a new Date instance with the exact same date value as the called instance.
     * Dates are copied and passed by reference, so if a copied date variable is modified later, the original
     * variable will also be changed.  When the intention is to create a new variable that will not
     * modify the original instance, you should create a clone.
     *
     * Example of correctly cloning a date:
     * <pre><code>
//wrong way:
var orig = new Date('10/1/2006');
var copy = orig;
copy.setDate(5);
document.write(orig);  //returns 'Thu Oct 05 2006'!

//correct way:
var orig = new Date('10/1/2006');
var copy = orig.clone();
copy.setDate(5);
document.write(orig);  //returns 'Thu Oct 01 2006'
</code></pre>
     * @return {Date} The new Date instance.
     */
    clone: function() {
        return new Date(this.getTime());
    },

    /**
     * Checks if the current date is affected by Daylight Saving Time (DST).
     * @return {Boolean} True if the current date is affected by DST.
     */
    isDST: function() {
        // adapted from http://extjs.com/forum/showthread.php?p=247172#post247172
        // courtesy of @geoffrey.mcgill
        return new Date(this.getFullYear(), 0, 1).getTimezoneOffset() != this.getTimezoneOffset();
    },

    /**
     * Attempts to clear all time information from this Date by setting the time to midnight of the same day,
     * automatically adjusting for Daylight Saving Time (DST) where applicable.
     * (note: DST timezone information for the browser's host operating system is assumed to be up-to-date)
     * @param {Boolean} clone true to create a clone of this date, clear the time and return it (defaults to false).
     * @return {Date} this or the clone.
     */
    clearTime: function(clone) {
        if (clone) {
            return this.clone().clearTime();
        }

        // get current date before clearing time
        var d = this.getDate();

        // clear time
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);

        if (this.getDate() != d) {
            // account for DST (i.e. day of month changed when setting hour = 0)
            // note: DST adjustments are assumed to occur in multiples of 1 hour (this is almost always the case)
            // refer to http://www.timeanddate.com/time/aboutdst.html for the (rare) exceptions to this rule
            // increment hour until cloned date == current date
            for (var hr = 1, c = this.add(Date.HOUR, hr); c.getDate() != d; hr++, c = this.add(Date.HOUR, hr));

            this.setDate(d);
            this.setHours(c.getHours());
        }

        return this;
    },

    /**
     * Provides a convenient method for performing basic date arithmetic. This method
     * does not modify the Date instance being called - it creates and returns
     * a new Date instance containing the resulting date value.
     *
     * Examples:
     * <pre><code>
// Basic usage:
var dt = new Date('10/29/2006').add(Date.DAY, 5);
document.write(dt); //returns 'Fri Nov 03 2006 00:00:00'

// Negative values will be subtracted:
var dt2 = new Date('10/1/2006').add(Date.DAY, -5);
document.write(dt2); //returns 'Tue Sep 26 2006 00:00:00'

// You can even chain several calls together in one line:
var dt3 = new Date('10/1/2006').add(Date.DAY, 5).add(Date.HOUR, 8).add(Date.MINUTE, -30);
document.write(dt3); //returns 'Fri Oct 06 2006 07:30:00'
</code></pre>
     *
     * @param {String} interval A valid date interval enum value.
     * @param {Number} value The amount to add to the current date.
     * @return {Date} The new Date instance.
     */
    add: function(interval, value) {
        var d = this.clone();
        if (!interval || value === 0) return d;

        switch (interval.toLowerCase()) {
        case Date.MILLI:
            d.setMilliseconds(this.getMilliseconds() + value);
            break;
        case Date.SECOND:
            d.setSeconds(this.getSeconds() + value);
            break;
        case Date.MINUTE:
            d.setMinutes(this.getMinutes() + value);
            break;
        case Date.HOUR:
            d.setHours(this.getHours() + value);
            break;
        case Date.DAY:
            d.setDate(this.getDate() + value);
            break;
        case Date.MONTH:
            var day = this.getDate();
            if (day > 28) {
                day = Math.min(day, this.getFirstDateOfMonth().add('mo', value).getLastDateOfMonth().getDate());
            }
            d.setDate(day);
            d.setMonth(this.getMonth() + value);
            break;
        case Date.YEAR:
            d.setFullYear(this.getFullYear() + value);
            break;
        }
        return d;
    },

    /**
     * Checks if this date falls on or between the given start and end dates.
     * @param {Date} start Start date
     * @param {Date} end End date
     * @return {Boolean} true if this date falls on or between the given start and end dates.
     */
    between: function(start, end) {
        var t = this.getTime();
        return start.getTime() <= t && t <= end.getTime();
    }
});


/**
 * Formats a date given the supplied format string.
 * @param {String} format The format string.
 * @return {String} The formatted date.
 * @method format
 */
Date.prototype.format = Date.prototype.dateFormat;

/* Some basic Date tests... (requires Firebug)

Date.parseDate('', 'c'); // call Date.parseDate() once to force computation of regex string so we can console.log() it
console.log('Insane Regex for "c" format: %o', Date.parseCodes.c.s); // view the insane regex for the "c" format specifier

// standard tests
console.group('Standard Date.parseDate() Tests');
    console.log('Date.parseDate("2009-01-05T11:38:56", "c")               = %o', Date.parseDate("2009-01-05T11:38:56", "c")); // assumes browser's timezone setting
    console.log('Date.parseDate("2009-02-04T12:37:55.001000", "c")        = %o', Date.parseDate("2009-02-04T12:37:55.001000", "c")); // assumes browser's timezone setting
    console.log('Date.parseDate("2009-03-03T13:36:54,101000Z", "c")       = %o', Date.parseDate("2009-03-03T13:36:54,101000Z", "c")); // UTC
    console.log('Date.parseDate("2009-04-02T14:35:53.901000-0530", "c")   = %o', Date.parseDate("2009-04-02T14:35:53.901000-0530", "c")); // GMT-0530
    console.log('Date.parseDate("2009-05-01T15:34:52,9876000+08:00", "c") = %o', Date.parseDate("2009-05-01T15:34:52,987600+08:00", "c")); // GMT+08:00
console.groupEnd();

// ISO-8601 format as specified in http://www.w3.org/TR/NOTE-datetime
// -- accepts ALL 6 levels of date-time granularity
console.group('ISO-8601 Granularity Test (see http://www.w3.org/TR/NOTE-datetime)');
    console.log('Date.parseDate("1997", "c")                              = %o', Date.parseDate("1997", "c")); // YYYY (e.g. 1997)
    console.log('Date.parseDate("1997-07", "c")                           = %o', Date.parseDate("1997-07", "c")); // YYYY-MM (e.g. 1997-07)
    console.log('Date.parseDate("1997-07-16", "c")                        = %o', Date.parseDate("1997-07-16", "c")); // YYYY-MM-DD (e.g. 1997-07-16)
    console.log('Date.parseDate("1997-07-16T19:20+01:00", "c")            = %o', Date.parseDate("1997-07-16T19:20+01:00", "c")); // YYYY-MM-DDThh:mmTZD (e.g. 1997-07-16T19:20+01:00)
    console.log('Date.parseDate("1997-07-16T19:20:30+01:00", "c")         = %o', Date.parseDate("1997-07-16T19:20:30+01:00", "c")); // YYYY-MM-DDThh:mm:ssTZD (e.g. 1997-07-16T19:20:30+01:00)
    console.log('Date.parseDate("1997-07-16T19:20:30.45+01:00", "c")      = %o', Date.parseDate("1997-07-16T19:20:30.45+01:00", "c")); // YYYY-MM-DDThh:mm:ss.sTZD (e.g. 1997-07-16T19:20:30.45+01:00)
    console.log('Date.parseDate("1997-07-16 19:20:30.45+01:00", "c")      = %o', Date.parseDate("1997-07-16 19:20:30.45+01:00", "c")); // YYYY-MM-DD hh:mm:ss.sTZD (e.g. 1997-07-16T19:20:30.45+01:00)
    console.log('Date.parseDate("1997-13-16T19:20:30.45+01:00", "c", true)= %o', Date.parseDate("1997-13-16T19:20:30.45+01:00", "c", true)); // strict date parsing with invalid month value
console.groupEnd();

*/

/**
 * @class Ext.data.Connection
 * @extends Ext.util.Observable
 */
Ext.data.Connection = Ext.extend(Ext.util.Observable, {
    method: 'post',
    url: null,

    /**
     * @cfg {Boolean} disableCaching (Optional) True to add a unique cache-buster param to GET requests. (defaults to true)
     * @type Boolean
     */
    disableCaching: true,

    /**
     * @cfg {String} disableCachingParam (Optional) Change the parameter which is sent went disabling caching
     * through a cache buster. Defaults to '_dc'
     * @type String
     */
    disableCachingParam: '_dc',

    /**
     * @cfg {Number} timeout (Optional) The timeout in milliseconds to be used for requests. (defaults to 30000)
     */
    timeout : 30000,

    useDefaultHeader : true,
    defaultPostHeader : 'application/x-www-form-urlencoded; charset=UTF-8',
    useDefaultXhrHeader : true,
    defaultXhrHeader : 'XMLHttpRequest',

    constructor : function(config) {
        config = config || {};
        Ext.apply(this, config);

        this.addEvents(
            /**
             * @event beforerequest
             * Fires before a network request is made to retrieve a data object.
             * @param {Connection} conn This Connection object.
             * @param {Object} options The options config object passed to the {@link #request} method.
             */
            'beforerequest',
            /**
             * @event requestcomplete
             * Fires if the request was successfully completed.
             * @param {Connection} conn This Connection object.
             * @param {Object} response The XHR object containing the response data.
             * See <a href="http://www.w3.org/TR/XMLHttpRequest/">The XMLHttpRequest Object</a>
             * for details.
             * @param {Object} options The options config object passed to the {@link #request} method.
             */
            'requestcomplete',
            /**
             * @event requestexception
             * Fires if an error HTTP status was returned from the server.
             * See <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html">HTTP Status Code Definitions</a>
             * for details of HTTP status codes.
             * @param {Connection} conn This Connection object.
             * @param {Object} response The XHR object containing the response data.
             * See <a href="http://www.w3.org/TR/XMLHttpRequest/">The XMLHttpRequest Object</a>
             * for details.
             * @param {Object} options The options config object passed to the {@link #request} method.
             */
            'requestexception'
        );
        this.requests = {};
        Ext.data.Connection.superclass.constructor.call(this);
    },

    /**
     * <p>Sends an HTTP request to a remote server.</p>
     * <p><b>Important:</b> Ajax server requests are asynchronous, and this call will
     * return before the response has been received. Process any returned data
     * in a callback function.</p>
     * <pre><code>
Ext.Ajax.request({
url: 'ajax_demo/sample.json',
success: function(response, opts) {
  var obj = Ext.decode(response.responseText);
  console.dir(obj);
},
failure: function(response, opts) {
  console.log('server-side failure with status code ' + response.status);
}
});
     * </code></pre>
     * <p>To execute a callback function in the correct scope, use the <tt>scope</tt> option.</p>
     * @param {Object} options An object which may contain the following properties:<ul>
     * <li><b>url</b> : String/Function (Optional)<div class="sub-desc">The URL to
     * which to send the request, or a function to call which returns a URL string. The scope of the
     * function is specified by the <tt>scope</tt> option. Defaults to the configured
     * <tt>{@link #url}</tt>.</div></li>
     * <li><b>params</b> : Object/String/Function (Optional)<div class="sub-desc">
     * An object containing properties which are used as parameters to the
     * request, a url encoded string or a function to call to get either. The scope of the function
     * is specified by the <tt>scope</tt> option.</div></li>
     * <li><b>method</b> : String (Optional)<div class="sub-desc">The HTTP method to use
     * for the request. Defaults to the configured method, or if no method was configured,
     * "GET" if no parameters are being sent, and "POST" if parameters are being sent.  Note that
     * the method name is case-sensitive and should be all caps.</div></li>
     * <li><b>callback</b> : Function (Optional)<div class="sub-desc">The
     * function to be called upon receipt of the HTTP response. The callback is
     * called regardless of success or failure and is passed the following
     * parameters:<ul>
     * <li><b>options</b> : Object<div class="sub-desc">The parameter to the request call.</div></li>
     * <li><b>success</b> : Boolean<div class="sub-desc">True if the request succeeded.</div></li>
     * <li><b>response</b> : Object<div class="sub-desc">The XMLHttpRequest object containing the response data.
     * See <a href="http://www.w3.org/TR/XMLHttpRequest/">http://www.w3.org/TR/XMLHttpRequest/</a> for details about
     * accessing elements of the response.</div></li>
     * </ul></div></li>
     * <li><a id="request-option-success"></a><b>success</b> : Function (Optional)<div class="sub-desc">The function
     * to be called upon success of the request. The callback is passed the following
     * parameters:<ul>
     * <li><b>response</b> : Object<div class="sub-desc">The XMLHttpRequest object containing the response data.</div></li>
     * <li><b>options</b> : Object<div class="sub-desc">The parameter to the request call.</div></li>
     * </ul></div></li>
     * <li><b>failure</b> : Function (Optional)<div class="sub-desc">The function
     * to be called upon failure of the request. The callback is passed the
     * following parameters:<ul>
     * <li><b>response</b> : Object<div class="sub-desc">The XMLHttpRequest object containing the response data.</div></li>
     * <li><b>options</b> : Object<div class="sub-desc">The parameter to the request call.</div></li>
     * </ul></div></li>
     * <li><b>scope</b> : Object (Optional)<div class="sub-desc">The scope in
     * which to execute the callbacks: The "this" object for the callback function. If the <tt>url</tt>, or <tt>params</tt> options were
     * specified as functions from which to draw values, then this also serves as the scope for those function calls.
     * Defaults to the browser window.</div></li>
     * <li><b>timeout</b> : Number (Optional)<div class="sub-desc">The timeout in milliseconds to be used for this request. Defaults to 30 seconds.</div></li>
     * <li><b>form</b> : Element/HTMLElement/String (Optional)<div class="sub-desc">The <tt>&lt;form&gt;</tt>
     * Element or the id of the <tt>&lt;form&gt;</tt> to pull parameters from.</div></li>
     * <li><a id="request-option-isUpload"></a><b>isUpload</b> : Boolean (Optional)<div class="sub-desc"><b>Only meaningful when used
     * with the <tt>form</tt> option</b>.
     * <p>True if the form object is a file upload (will be set automatically if the form was
     * configured with <b><tt>enctype</tt></b> "multipart/form-data").</p>
     * <p>File uploads are not performed using normal "Ajax" techniques, that is they are <b>not</b>
     * performed using XMLHttpRequests. Instead the form is submitted in the standard manner with the
     * DOM <tt>&lt;form></tt> element temporarily modified to have its
     * <a href="http://www.w3.org/TR/REC-html40/present/frames.html#adef-target">target</a> set to refer
     * to a dynamically generated, hidden <tt>&lt;iframe></tt> which is inserted into the document
     * but removed after the return data has been gathered.</p>
     * <p>The server response is parsed by the browser to create the document for the IFRAME. If the
     * server is using JSON to send the return object, then the
     * <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.17">Content-Type</a> header
     * must be set to "text/html" in order to tell the browser to insert the text unchanged into the document body.</p>
     * <p>The response text is retrieved from the document, and a fake XMLHttpRequest object
     * is created containing a <tt>responseText</tt> property in order to conform to the
     * requirements of event handlers and callbacks.</p>
     * <p>Be aware that file upload packets are sent with the content type <a href="http://www.faqs.org/rfcs/rfc2388.html">multipart/form</a>
     * and some server technologies (notably JEE) may require some custom processing in order to
     * retrieve parameter names and parameter values from the packet content.</p>
     * </div></li>
     * <li><b>headers</b> : Object (Optional)<div class="sub-desc">Request
     * headers to set for the request.</div></li>
     * <li><b>xmlData</b> : Object (Optional)<div class="sub-desc">XML document
     * to use for the post. Note: This will be used instead of params for the post
     * data. Any params will be appended to the URL.</div></li>
     * <li><b>jsonData</b> : Object/String (Optional)<div class="sub-desc">JSON
     * data to use as the post. Note: This will be used instead of params for the post
     * data. Any params will be appended to the URL.</div></li>
     * <li><b>disableCaching</b> : Boolean (Optional)<div class="sub-desc">True
     * to add a unique cache-buster param to GET requests.</div></li>
     * </ul></p>
     * <p>The options object may also contain any other property which might be needed to perform
     * postprocessing in a callback because it is passed to callback functions.</p>
     * @return {Object} request The request object. This may be used
     * to cancel the request.
     */
    request : function(o) {
        var me = this;
        if (me.fireEvent('beforerequest', me, o) !== false) {
            var params      = o.params,
                url         = o.url || me.url,
                urlParams   = o.urlParams,
                extraParams = me.extraParams,
                request, data, headers,
                method, key, xhr;

            // allow params to be a method that returns the params object
            if (Ext.isFunction(params)) {
                params = params.call(o.scope || window, o);
            }

            // allow url to be a method that returns the actual url
            if (Ext.isFunction(url)) {
                url = url.call(o.scope || window, o);
            }

            // check for xml or json data, and make sure json data is encoded
            data = o.rawData || o.xmlData || o.jsonData || null;
            if (o.jsonData && !Ext.isPrimitive(o.jsonData)) {
                data = Ext.encode(data);
            }
            
            // make sure params are a url encoded string and include any extraParams if specified
            params = Ext.urlEncode(extraParams, Ext.isObject(params) ? Ext.urlEncode(params) : params);
            
            urlParams = Ext.isObject(urlParams) ? Ext.urlEncode(urlParams) : urlParams;

            // decide the proper method for this request
            method = (o.method || ((params || data) ? 'POST' : 'GET')).toUpperCase();

            // if the method is get append date to prevent caching
            if (method === 'GET' && o.disableCaching !== false && me.disableCaching) {
                url = Ext.urlAppend(url, o.disableCachingParam || me.disableCachingParam + '=' + (new Date().getTime()));
            }

            // if the method is get or there is json/xml data append the params to the url
            if ((method == 'GET' || data) && params){
                url = Ext.urlAppend(url, params);
                params = null;
            }

            // allow params to be forced into the url
            if (urlParams) {
                url = Ext.urlAppend(url, urlParams);
            }

            // if autoabort is set, cancel the current transactions
            if (o.autoAbort === true || me.autoAbort) {
                me.abort();
            }

            // create a connection object
            xhr = this.getXhrInstance();

            // open the request
            xhr.open(method.toUpperCase(), url, true);

            // create all the headers
            headers = Ext.apply({}, o.headers || {}, me.defaultHeaders || {});
            if (!headers['Content-Type'] && (data || params)) {
                var contentType = me.defaultPostHeader,
                    jsonData    = o.jsonData,
                    xmlData     = o.xmlData;
                
                if (data) {
                    if (o.rawData) {
                        contentType = 'text/plain';
                    } else {
                        if (xmlData && Ext.isDefined(xmlData)) {
                            contentType = 'text/xml';
                        } else if (jsonData && Ext.isDefined(jsonData)) {
                            contentType = 'application/json';
                        }
                    }
                }
                headers['Content-Type'] = contentType;
            }
            if (me.useDefaultXhrHeader && !headers['X-Requested-With']) {
                headers['X-Requested-With'] = me.defaultXhrHeader;
            }
            // set up all the request headers on the xhr object
            for (key in headers) {
                if (headers.hasOwnProperty(key)) {
                    try {
                        xhr.setRequestHeader(key, headers[key]);
                    }
                    catch(e) {
                        me.fireEvent('exception', key, headers[key]);
                    }                    
                }
            }

            // create the transaction object
            request = {
                id: ++Ext.data.Connection.requestId,
                xhr: xhr,
                headers: headers,
                options: o,
                timeout: setTimeout(function() {
                    request.timedout = true;
                    me.abort(request);
                }, o.timeout || me.timeout)
            };
            me.requests[request.id] = request;

            // bind our statechange listener
            xhr.onreadystatechange = Ext.createDelegate(me.onStateChange, me, [request]);

            // start the request!
            xhr.send(data || params || null);
            return request;
        } else {
            return o.callback ? o.callback.apply(o.scope, [o, undefined, undefined]) : null;
        }
    },

    getXhrInstance : function() {
        return new XMLHttpRequest();
    },
    
    /**
     * Determine whether this object has a request outstanding.
     * @param {Object} request (Optional) defaults to the last transaction
     * @return {Boolean} True if there is an outstanding request.
     */
    isLoading : function(r) {
        // if there is a connection and readyState is not 0 or 4
        return r && !{0:true, 4:true}[r.xhr.readyState];
    },

    /**
     * Aborts any outstanding request.
     * @param {Object} request (Optional) defaults to the last request
     */
    abort : function(request) {
        if (request && this.isLoading(request)) {
            if (!request.timedout) {
                request.aborted = true;
            }
            // Will fire an onreadystatechange event
            request.xhr.abort();
        }
        else if (!request) {
            var id;
            for(id in this.requests) {
                if (!this.requests.hasOwnProperty(id)) {
                    continue;
                }
                this.abort(this.requests[id]);
            }
        }
    },

    // private
    onStateChange : function(r) {
        if (r.xhr.readyState == 4) {
            clearTimeout(r.timeout);
            delete r.timeout;
            this.onComplete(r);
        }
    },

    // private
    onComplete : function(r) {
        var status = r.xhr.status,
            options = r.options,
            success = true,
            response;

        if ((status >= 200 && status < 300) || status == 304) {
            response = this.createResponse(r);
            this.fireEvent('requestcomplete', this, response, options);
            if (options.success) {
                if (!options.scope) {
                    options.success(response, options);
                }
                else {
                    options.success.call(options.scope, response, options);
                }
            }
        }
        else {
            success = false;
            switch (status) {
                case 12002:
                case 12029:
                case 12030:
                case 12031:
                case 12152:
                case 13030:
                    response = this.createException(r);
                    break;
                default:
                    response = this.createResponse(r);
            }
            this.fireEvent('requestexception', this, response, options);
            if (options.failure) {
                if (!options.scope) {
                    options.failure(response, options);
                }
                else {
                    options.failure.call(options.scope, response, options);
                }
            }
        }

        if (options.callback) {
            if (!options.scope) {
                options.callback(options, success, response);
            }
            else {
                options.callback.call(options.scope, options, success, response);
            }
        }
        
        delete this.requests[r.id];
    },

    // private
    createResponse : function(r) {
        var xhr = r.xhr,
            headers = {},
            lines = xhr.getAllResponseHeaders().replace(/\r\n/g, '\n').split('\n'),
            count = lines.length,
            line, index, key, value;

        while (count--) {
            line = lines[count];
            index = line.indexOf(':');
            if(index >= 0) {
                key = line.substr(0, index).toLowerCase();
                if (line.charAt(index + 1) == ' ') {
                    ++index;
                }
                headers[key] = line.substr(index + 1);
            }
        }

        delete r.xhr;

        return {
            request: r,
            requestId : r.id,
            status : xhr.status,
            statusText : xhr.statusText,
            getResponseHeader : function(header){ return headers[header.toLowerCase()]; },
            getAllResponseHeaders : function(){ return headers; },
            responseText : xhr.responseText,
            responseXML : xhr.responseXML
        };
    },

    // private
    createException : function(r) {
        return {
            request : r,
            requestId : r.id,
            status : r.aborted ? -1 : 0,
            statusText : r.aborted ? 'transaction aborted' : 'communication failure',
            aborted: r.aborted,
            timedout: r.timedout
        };
    }
});

Ext.data.Connection.requestId = 0;

/**
 * @class Ext.Ajax
 * @extends Ext.data.Connection
 * A singleton instance of an {@link Ext.data.Connection}.
 * @singleton
 */
Ext.Ajax = new Ext.data.Connection({
    /**
     * @cfg {String} url @hide
     */
    /**
     * @cfg {Object} extraParams @hide
     */
    /**
     * @cfg {Object} defaultHeaders @hide
     */
    /**
     * @cfg {String} method (Optional) @hide
     */
    /**
     * @cfg {Number} timeout (Optional) @hide
     */
    /**
     * @cfg {Boolean} autoAbort (Optional) @hide
     */

    /**
     * @cfg {Boolean} disableCaching (Optional) @hide
     */

    /**
     * @property  disableCaching
     * True to add a unique cache-buster param to GET requests. (defaults to true)
     * @type Boolean
     */
    /**
     * @property  url
     * The default URL to be used for requests to the server. (defaults to undefined)
     * If the server receives all requests through one URL, setting this once is easier than
     * entering it on every request.
     * @type String
     */
    /**
     * @property  extraParams
     * An object containing properties which are used as extra parameters to each request made
     * by this object (defaults to undefined). Session information and other data that you need
     * to pass with each request are commonly put here.
     * @type Object
     */
    /**
     * @property  defaultHeaders
     * An object containing request headers which are added to each request made by this object
     * (defaults to undefined).
     * @type Object
     */
    /**
     * @property  method
     * The default HTTP method to be used for requests. Note that this is case-sensitive and
     * should be all caps (defaults to undefined; if not set but params are present will use
     * <tt>"POST"</tt>, otherwise will use <tt>"GET"</tt>.)
     * @type String
     */
    /**
     * @property  timeout
     * The timeout in milliseconds to be used for requests. (defaults to 30000)
     * @type Number
     */

    /**
     * @property  autoAbort
     * Whether a new request should abort any pending requests. (defaults to false)
     * @type Boolean
     */
    autoAbort : false
});

// This class is still experimental, docs will be added at a later time
Ext.util.EventSimulator = Ext.extend(Object, {

    supportedEvents: {
        touch: ['touchstart', 'touchmove', 'touchend', 'gesturestart', 'gesturechange', 'gestureend'],
        mouse: ['mousedown', 'mousemove', 'mouseup', 'click']
    },

    getEventTypeByName: function(name) {
        var ret = null;

        Ext.iterate(this.supportedEvents, function(type, events) {
            if (events.indexOf(name) != -1)
                ret = type;
        });

        return ret;
    },

    fire: function(type, target, options) {
        type = type.toLowerCase();

        if (arguments.length == 2) {
            options = target;
            target = document;
        }

        switch(this.getEventTypeByName(type)) {
            case 'touch':
                this.fireTouchEvent.call(this, type, target, options);
                break;

            case 'mouse':
                this.fireMouseEvent.call(this, type, target, options);
                break;

            default:
                throw new Error("Event type " + type + " is currently not supported");
        }

        return this;
    },

    createEvent: function(data, serializable) {

    },

    createEventData: function(event, serializable) {
        switch (this.getEventTypeByName(event.type)) {
            case 'touch':
                return this.createTouchEventData(event.type, event.target, event, serializable);
                break;

            case 'mouse':
                return this.createMouseEventData(event.type, event.target, event, serializable);
                break;

            default:
                throw new Error("Event type " + event.type + " is currently not supported");
        }
    },

    /* Touch events ========================================================================== */

    fireTouchEvent: function(type, target, options) {
        var touchEventData = this.createTouchEventData(type, target, options);

        var touchEvent = this.createTouchEvent(type, touchEventData);
        touchEvent.isSimulated = true;

        return target.dispatchEvent(touchEvent);
    },

    createTouchEventData: function(type, target, options, serializable) {
        var touchEventData = {
            type: type,
            timeStamp: Date.now(),
            bubbles: true,
            cancelable: true,
            detail: 1, // Not sure what this does in "touch" event.
            screenX: 0,
            screenY: 0,
            pageX: 0,
            pageY: 0,
            clientX: 0,
            clientY: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            scale: 1,
            rotation: 0
        };

        if (!serializable) {
            touchEventData.target = target;
            touchEventData.view = document.defaultView;
        }

        if (options) {
            Ext.iterate(touchEventData, function(key, value) {
                if (options.hasOwnProperty(key)) {
                    touchEventData[key] = options[key];
                }
            });
        }
        
        ['touches', 'targetTouches', 'changedTouches'].forEach(function(touchListName) {
            if (options.hasOwnProperty(touchListName)) {
                touchEventData[touchListName] = this.createTouchList(options[touchListName], target, serializable);
            }
            else {
                touchEventData[touchListName] = this.createTouchList(touchEventData, target, serializable);
            }
        }, this);

        return touchEventData;
    },

    createTouchEvent: function(type, data) {
        if (typeof type != 'string') {
            data = type;
            type = type.type;
        }

        var touchEvent = document.createEvent('TouchEvent');

        if (touchEvent.initTouchEvent.length == 9) {
            touchEvent.initTouchEvent(data.touches, data.targetTouches, data.changedTouches,
                type, data.view, data.screenX, data.screenY, data.clientX, data.clientY);

        } else {
            touchEvent.initTouchEvent(type, data.bubbles, data.cancelable, data.view,
                data.detail, data.screenX, data.screenY, data.pageX, data.pageY, data.ctrlKey,
                data.altKey, data.shiftKey, data.metaKey, data.touches, data.targetTouches,
                data.changedTouches, data.scale, data.rotation);
        }

        return touchEvent;
    },

    createTouch: function(target, options, serializable) {
		if (!document.createTouch || serializable) {
			return {
                pageX: options.pageX,
                pageY: options.pageY,
                clientX: options.pageX,
                clientY: options.pageY,
                screenX: options.pageX,
                screenY: options.pageY,
                identifier: +options.identifier || 0
            };
		}
		
        return document.createTouch(
            document.defaultView,
            target,
            +options.identifier || 0,
            +options.pageX || 0,
            +options.pageY || 0,
            +options.screenX || 0,
            +options.screenY || 0);
    },

    createTouchList: function(data, target, serializable) {
        var touch,
            touches = [];

        if (Ext.isObject(data) && typeof data.target != 'undefined') {
            data = [data];
        }

        if (data) {
            for (var i = 0; i < data.length; i++) {
                if (!serializable && !data[i].target) {
                    data[i].target = target;
                }

                touch = this.createTouch(data[i].target, data[i], serializable);
                touches.push(touch);
            }
        }

		if (!document.createTouchList || serializable) {
			return touches;
		}
		
        return document.createTouchList.apply(document, touches);
    },

    /* Mouse events ======================================================================================= */

    fireMouseEvent: function(type, target, options) {
        var eventData = this.createMouseEventData(type, target, options);

        var event = this.createMouseEvent(type, eventData);
        event.isSimulated = true;
        event.originalTimeStamp = eventData.timeStamp;
        
        return target.dispatchEvent(event);
    },

    createMouseEventData: function(type, target, options, serializable) {
        var mouseEventData = {
            type: type,
            timeStamp: Date.now(),
            bubbles: true, // all mouse events bubble
            cancelable: (type != 'mousemove'), // mousemove is the only event type that can't be cancelled
            detail: 1, // number of mouse clicks must be at least one
            screenX: 0,
            screenY: 0,
            pageX: 0,
            pageY: 0,
            clientX: 0,
            clientY: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            button: 0,
            relatedTarget: null
        }, 
        coordProperties = ['screen', 'client', 'page'],
        coords = {
            x: 0,
            y: 0
        };
        
        if (!serializable) {
            mouseEventData.target = target;
            mouseEventData.view = window;
        }

        if (options) {
            Ext.iterate(mouseEventData, function(key, value) {
                if (options.hasOwnProperty(key)) {
                    mouseEventData[key] = options[key];
                }
            });
        }

        coordProperties.forEach(function(p) {
            if (mouseEventData[p + 'X'] != 0) {
                coords.x = mouseEventData[p + 'X']
            }

            if (mouseEventData[p + 'Y'] != 0) {
                coords.y = mouseEventData[p + 'Y']
            }
        });

        coordProperties.forEach(function(p) {
            if (mouseEventData[p + 'X'] == 0 && coords.x != 0) {
                mouseEventData[p + 'X'] = coords.x;
            }

            if (mouseEventData[p + 'Y'] == 0 && coords.y != 0) {
                mouseEventData[p + 'Y'] = coords.y;
            }
        });

        return mouseEventData;
    },

    createMouseEvent: function(type, data) {
        var mouseEvent = document.createEvent('MouseEvents');

        mouseEvent.initMouseEvent(
            type, data.bubbles, data.cancelable, data.view, data.detail,
            data.screenX, data.screenY, data.clientX, data.clientY,
            data.ctrlKey, data.altKey, data.shiftKey, data.metaKey,
            data.button, data.relatedTarget);

        return mouseEvent;
    }

});
// This class is still experimental, docs will be added at a later time
Ext.util.EventRecorder = Ext.extend(Ext.util.Observable, {

    eventCollection: null,

    currentEventSetName: null,

    constructor: function() {
        this.addEvents(
            'replaystart',
            'beforecalculatetarget',
            'beforefire',
            'afterfire',
            'aftercalculatetarget',
            'replayend',
            'interrupted'
        );

        this.eventSets = {};
        this.interruptedIndexes = {};

        return this;
    },

    getEventSet: function(name) {
        if (typeof name != 'string') {
            if (this.currentEventSetName == null)
                throw new Error('No EventSet is currently used');

            name = this.currentEventSetName;
        }

        if (typeof this.eventSets[name] == 'undefined') {
            this.eventSets[name] = [];
        }
        return this.eventSets[name];
    },

    start: function(name) {
        this.currentEventSetName = name;
    },

    record: function(name, event) {
        if (typeof name != 'string') {
            // Not being recorded since either it's not started or is already ended
            if (this.currentEventSetName == null)
                return;

            event = name;
            name = this.currentEventSetName;
        }

        var eventData = this.getEventSimulator().createEventData(event, true);

        this.getEventSet(name).push(eventData);
    },

    setEventSet: function(name, events) {
        this.eventSets[name] = events;
    },

    erase: function(name) {
        // Empty the array
        this.getEventSet(name).length = 0;
    },

    stopReplay: function() {
        this.interruptFlag = true;
    },

    resumeReplay: function(name) {
        var index = this.interruptedIndexes[name] || 0;
        this.replay(name, index);
    },

    replay: function(name, startIndex) {
        var simulator = this.getEventSimulator(),
            events = this.getEventSet(name),
            numEvents,
            delay = 0,
            index = 0,
            event,
            point,
            target,
            reserveTargetEvents = ['touchmove', 'touchend', 'mousemove', 'mouseup'],
            me = this;

        if (typeof startIndex == 'undefined') {
            startIndex = 0;
        }

        index = startIndex;
        
        numEvents = events.length;

        this.interruptFlag = false;

        if (numEvents > 0) {
            this.fireEvent('replaystart', name, startIndex);
            setTimeout(function() {
                event = events[index];
                
                if (event) {

                    if (reserveTargetEvents.indexOf(event.type) === -1) {
                        me.fireEvent('beforecalculatetarget', event.type, event);
                        point = Ext.util.Point.fromEvent(event);
                        target = document.elementFromPoint(point.x, point.y);
                        me.fireEvent('aftercalculatetarget', event.type, target, event);
                    }
                    
                    if (target) {
                        if (me.interruptFlag === true) {
                            me.interruptFlag = false;
                            me.interruptedIndexes[name] = index;
                            me.fireEvent('interrupted', index);
                            me.fireEvent('replayend', name, true);
                            return;
                        }
                        me.fireEvent('beforefire', event.type, target, event);
                        simulator.fire(event.type, target, event);
                        me.fireEvent('afterfire', event.type, target, event);
                    }

                    if (++index < numEvents) {
                        setTimeout(arguments.callee, events[index].timeStamp - event.timeStamp);
                    } else {
                        me.fireEvent('replayend', name, false);
                    }
                }
            }, delay);
        }
    },

    end: function() {
        this.currentEventSetName = null;
    },

    getEventSimulator: function() {
        if (!this._eventSimulator) {
            this._eventSimulator = new Ext.util.EventSimulator();
        }

        return this._eventSimulator;
    },

    setEventSimulator: function(eventSimulator) {
        if (!(eventSimulator instanceof Ext.util.EventSimulator))
            throw new Error('eventSimulator must be an instance of Ext.util.EventSimulator');

        this._eventSimulator = eventSimulator;
    },

    // TODO
    save: function(name) {

    }
});
