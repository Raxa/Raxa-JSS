/**
 * @class Ext
 * Ext core utilities and functions.
 * @singleton
 */
if (typeof Ext === "undefined") {
    Ext = {};
}

/**
 * Copies all the properties of config to obj.
 * @param {Object} object The receiver of the properties
 * @param {Object} config The source of the properties
 * @param {Object} defaults A different object that will also be applied for default values
 * @return {Object} returns obj
 * @member Ext apply
 */
Ext.apply = (function() {
    // IE doesn't recognize that toString (and valueOf) method as explicit one but it "thinks" that's a native one.
    for(var key in {valueOf:1}) {
        return function(object, config, defaults) {
            // no "this" reference for friendly out of scope calls
            if (defaults) {
                Ext.apply(object, defaults);
            }
            if (object && config && typeof config === 'object') {
                for (var key in config) {
                    object[key] = config[key];
                }
            }
            return object;
        };
    }
    return function(object, config, defaults) {
        // no "this" reference for friendly out of scope calls
        if (defaults) {
            Ext.apply(object, defaults);
        }
        if (object && config && typeof config === 'object') {
            for (var key in config) {
                object[key] = config[key];
            }
            if (config.toString !== Object.prototype.toString) {
                object.toString = config.toString;
            }
            if (config.valueOf !== Object.prototype.valueOf) {
                object.valueOf = config.valueOf;
            }
        }
        return object;
    };
})();

Ext.apply(Ext, {
    platformVersion: '1.0',
    platformVersionDetail: {
        major: 1,
        minor: 0,
        patch: 3
    },
    userAgent: navigator.userAgent.toLowerCase(),
    cache: {},
    idSeed: 1000,
    BLANK_IMAGE_URL : 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
    isStrict: document.compatMode == "CSS1Compat",

    windowId: 'ext-window',
    documentId: 'ext-document',

    /**
    * A reusable empty function
    * @property
    * @type Function
    */
    emptyFn : function() {},

    /**
     * True if the page is running over SSL
     * @type Boolean
     */
    isSecure : /^https/i.test(window.location.protocol),

    /**
     * True when the document is fully initialized and ready for action
     * @type Boolean
     */
    isReady : false,

    /**
     * True to automatically uncache orphaned Ext.Elements periodically (defaults to true)
     * @type Boolean
     */
    enableGarbageCollector : true,

    /**
     * True to automatically purge event listeners during garbageCollection (defaults to true).
     * @type Boolean
     */
    enableListenerCollection : true,

    /**
     * Copies all the properties of config to obj if they don't already exist.
     * @param {Object} obj The receiver of the properties
     * @param {Object} config The source of the properties
     * @return {Object} returns obj
     */
    applyIf : function(object, config) {
        var property, undefined;

        if (object) {
            for (property in config) {
                if (object[property] === undefined) {
                    object[property] = config[property];
                }
            }
        }

        return object;
    },

    /**
     * Repaints the whole page. This fixes frequently encountered painting issues in mobile Safari.
     */
    repaint : function() {
        var mask = Ext.getBody().createChild({
            cls: 'x-mask x-mask-transparent'
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
    id : function(el, prefix) {
        el = Ext.getDom(el) || {};
        if (el === document) {
            el.id = this.documentId;
        }
        else if (el === window) {
            el.id = this.windowId;
        }
        el.id = el.id || ((prefix || 'ext-gen') + (++Ext.idSeed));
        return el.id;
    },

    /**
     * <p>Extends one class to create a subclass and optionally overrides members with the passed literal. This method
     * also adds the function "override()" to the subclass that can be used to override members of the class.</p>
     * For example, to create a subclass of Ext GridPanel:
     * <pre><code>
MyGridPanel = Ext.extend(Ext.grid.GridPanel, {
constructor: function(config) {

//      Create configuration for this Grid.
    var store = new Ext.data.Store({...});
    var colModel = new Ext.grid.ColumnModel({...});

//      Create a new config object containing our computed properties
//      *plus* whatever was in the config parameter.
    config = Ext.apply({
        store: store,
        colModel: colModel
    }, config);

    MyGridPanel.superclass.constructor.call(this, config);

//      Your postprocessing here
},

yourMethod: function() {
    // etc.
}
});
       </code></pre>
     *
     * <p>This function also supports a 3-argument call in which the subclass's constructor is
     * passed as an argument. In this form, the parameters are as follows:</p>
     * <div class="mdetail-params"><ul>
     * <li><code>subclass</code> : Function <div class="sub-desc">The subclass constructor.</div></li>
     * <li><code>superclass</code> : Function <div class="sub-desc">The constructor of class being extended</div></li>
     * <li><code>overrides</code> : Object <div class="sub-desc">A literal with members which are copied into the subclass's
     * prototype, and are therefore shared among all instances of the new class.</div></li>
     * </ul></div>
     *
     * @param {Function} superclass The constructor of class being extended.
     * @param {Object} overrides <p>A literal with members which are copied into the subclass's
     * prototype, and are therefore shared between all instances of the new class.</p>
     * <p>This may contain a special member named <tt><b>constructor</b></tt>. This is used
     * to define the constructor of the new class, and is returned. If this property is
     * <i>not</i> specified, a constructor is generated and returned which just calls the
     * superclass's constructor passing on its parameters.</p>
     * <p><b>It is essential that you call the superclass constructor in any provided constructor. See example code.</b></p>
     * @return {Function} The subclass constructor from the <code>overrides</code> parameter, or a generated one if not provided.
     */
    extend : function() {
        // inline overrides
        var inlineOverrides = function(o){
            for (var m in o) {
                if (!o.hasOwnProperty(m)) {
                    continue;
                }
                this[m] = o[m];
            }
        };

        var objectConstructor = Object.prototype.constructor;

        return function(subclass, superclass, overrides){
            // First we check if the user passed in just the superClass with overrides
            if (Ext.isObject(superclass)) {
                overrides = superclass;
                superclass = subclass;
                subclass = overrides.constructor != objectConstructor
                    ? overrides.constructor
                    : function(){ superclass.apply(this, arguments); };
            }

            if (!superclass) {
                throw "Attempting to extend from a class which has not been loaded on the page.";
            }

            // We create a new temporary class
            var F = function(){},
                subclassProto,
                superclassProto = superclass.prototype;

            F.prototype = superclassProto;
            subclassProto = subclass.prototype = new F();
            subclassProto.constructor = subclass;
            subclass.superclass = superclassProto;

            if(superclassProto.constructor == objectConstructor){
                superclassProto.constructor = superclass;
            }

            subclass.override = function(overrides){
                Ext.override(subclass, overrides);
            };

            subclassProto.superclass = subclassProto.supr = (function(){
                return superclassProto;
            });

            subclassProto.override = inlineOverrides;
            subclassProto.proto = subclassProto;

            subclass.override(overrides);
            subclass.extend = function(o) {
                return Ext.extend(subclass, o);
            };

            return subclass;
        };
    }(),

    /**
     * Adds a list of functions to the prototype of an existing class, overwriting any existing methods with the same name.
     * Usage:<pre><code>
Ext.override(MyClass, {
newMethod1: function(){
    // etc.
},
newMethod2: function(foo){
    // etc.
}
});
       </code></pre>
     * @param {Object} origclass The class to override
     * @param {Object} overrides The list of functions to add to origClass.  This should be specified as an object literal
     * containing one or more methods.
     * @method override
     */
    override : function(origclass, overrides) {
        Ext.apply(origclass.prototype, overrides);
    },

    /**
     * Creates namespaces to be used for scoping variables and classes so that they are not global.
     * Specifying the last node of a namespace implicitly creates all other nodes. Usage:
     * <pre><code>
Ext.namespace('Company', 'Company.data');
Ext.namespace('Company.data'); // equivalent and preferable to above syntax
Company.Widget = function() { ... }
Company.data.CustomStore = function(config) { ... }
       </code></pre>
     * @param {String} namespace1
     * @param {String} namespace2
     * @param {String} etc
     * @return {Object} The namespace object. (If multiple arguments are passed, this will be the last namespace created)
     * @method namespace
     */
    namespace : function() {
        var ln = arguments.length,
            i, value, split, x, xln, parts, object;

        for (i = 0; i < ln; i++) {
            value = arguments[i];
            parts = value.split(".");
            if (window.Ext) {
                object = window[parts[0]] = Object(window[parts[0]]);
            } else {
                object = arguments.callee.caller.arguments[0];
            }
            for (x = 1, xln = parts.length; x < xln; x++) {
                object = object[parts[x]] = Object(object[parts[x]]);
            }
        }
        return object;
    },

    /**
     * Takes an object and converts it to an encoded URL. e.g. Ext.urlEncode({foo: 1, bar: 2}); would return "foo=1&bar=2".  Optionally,
     * property values can be arrays, instead of keys and the resulting string that's returned will contain a name/value pair for each array value.
     * @param {Object} o The object to encode
     * @param {String} pre (optional) A prefix to add to the url encoded string
     * @return {String}
     */
    urlEncode : function(o, pre) {
        var empty,
            buf = [],
            e = encodeURIComponent;

        Ext.iterate(o, function(key, item){
            empty = Ext.isEmpty(item);
            Ext.each(empty ? key : item, function(val){
                buf.push('&', e(key), '=', (!Ext.isEmpty(val) && (val != key || !empty)) ? (Ext.isDate(val) ? Ext.encode(val).replace(/"/g, '') : e(val)) : '');
            });
        });

        if(!pre){
            buf.shift();
            pre = '';
        }

        return pre + buf.join('');
    },

    /**
     * Takes an encoded URL and and converts it to an object. Example:
     * <pre><code>
Ext.urlDecode("foo=1&bar=2"); // returns {foo: "1", bar: "2"}
Ext.urlDecode("foo=1&bar=2&bar=3&bar=4", false); // returns {foo: "1", bar: ["2", "3", "4"]}
       </code></pre>
     * @param {String} string
     * @param {Boolean} overwrite (optional) Items of the same name will overwrite previous values instead of creating an an array (Defaults to false).
     * @return {Object} A literal with members
     */
    urlDecode : function(string, overwrite) {
        if (Ext.isEmpty(string)) {
            return {};
        }

        var obj = {},
            pairs = string.split('&'),
            d = decodeURIComponent,
            name,
            value;

        Ext.each(pairs, function(pair) {
            pair = pair.split('=');
            name = d(pair[0]);
            value = d(pair[1]);
            obj[name] = overwrite || !obj[name] ? value : [].concat(obj[name]).concat(value);
        });

        return obj;
    },

    /**
     * Convert certain characters (&, <, >, and ') to their HTML character equivalents for literal display in web pages.
     * @param {String} value The string to encode
     * @return {String} The encoded text
     */
    htmlEncode : function(value) {
        return Ext.util.Format.htmlEncode(value);
    },

    /**
     * Convert certain characters (&, <, >, and ') from their HTML character equivalents.
     * @param {String} value The string to decode
     * @return {String} The decoded text
     */
    htmlDecode : function(value) {
         return Ext.util.Format.htmlDecode(value);
    },

    /**
     * Appends content to the query string of a URL, handling logic for whether to place
     * a question mark or ampersand.
     * @param {String} url The URL to append to.
     * @param {String} s The content to append to the URL.
     * @return (String) The resulting URL
     */
    urlAppend : function(url, s) {
        if (!Ext.isEmpty(s)) {
            return url + (url.indexOf('?') === -1 ? '?' : '&') + s;
        }
        return url;
    },

    /**
     * Converts any iterable (numeric indices and a length property) into a true array
     * Don't use this on strings. IE doesn't support "abc"[0] which this implementation depends on.
     * For strings, use this instead: "abc".match(/./g) => [a,b,c];
     * @param {Iterable} array the iterable object to be turned into a true Array.
     * @param {Number} start a number that specifies where to start the selection.
     * @param {Number} end a number that specifies where to end the selection.
     * @return (Array) array
     */
     toArray : function(array, start, end) {
        return Array.prototype.slice.call(array, start || 0, end || array.length);
     },

     /**
      * Iterates an array calling the supplied function.
      * @param {Array/NodeList/Mixed} array The array to be iterated. If this
      * argument is not really an array, the supplied function is called once.
      * @param {Function} fn The function to be called with each item. If the
      * supplied function returns false, iteration stops and this method returns
      * the current <code>index</code>. This function is called with
      * the following arguments:
      * <div class="mdetail-params"><ul>
      * <li><code>item</code> : <i>Mixed</i>
      * <div class="sub-desc">The item at the current <code>index</code>
      * in the passed <code>array</code></div></li>
      * <li><code>index</code> : <i>Number</i>
      * <div class="sub-desc">The current index within the array</div></li>
      * <li><code>allItems</code> : <i>Array</i>
      * <div class="sub-desc">The <code>array</code> passed as the first
      * argument to <code>Ext.each</code>.</div></li>
      * </ul></div>
      * @param {Object} scope The scope (<code>this</code> reference) in which the specified function is executed.
      * Defaults to the <code>item</code> at the current <code>index</code>util
      * within the passed <code>array</code>.
      * @return See description for the fn parameter.
      */
     each : function(array, fn, scope) {
         if (Ext.isEmpty(array, true)) {
             return 0;
         }
         if (!Ext.isIterable(array) || Ext.isPrimitive(array)) {
             array = [array];
         }
         for (var i = 0, len = array.length; i < len; i++) {
             if (fn.call(scope || array[i], array[i], i, array) === false) {
                 return i;
             }
         }
         return true;
     },

     /**
      * Iterates either the elements in an array, or each of the properties in an object.
      * <b>Note</b>: If you are only iterating arrays, it is better to call {@link #each}.
      * @param {Object/Array} object The object or array to be iterated
      * @param {Function} fn The function to be called for each iteration.
      * The iteration will stop if the supplied function returns false, or
      * all array elements / object properties have been covered. The signature
      * varies depending on the type of object being interated:
      * <div class="mdetail-params"><ul>
      * <li>Arrays : <tt>(Object item, Number index, Array allItems)</tt>
      * <div class="sub-desc">
      * When iterating an array, the supplied function is called with each item.</div></li>
      * <li>Objects : <tt>(String key, Object value, Object)</tt>
      * <div class="sub-desc">
      * When iterating an object, the supplied function is called with each key-value pair in
      * the object, and the iterated object</div></li>
      * </ul></divutil>
      * @param {Object} scope The scope (<code>this</code> reference) in which the specified function is executed. Defaults to
      * the <code>object</code> being iterated.
      */
     iterate : function(obj, fn, scope) {
         if (Ext.isEmpty(obj)) {
             return;
         }
         if (Ext.isIterable(obj)) {
             Ext.each(obj, fn, scope);
             return;
         }
         else if (Ext.isObject(obj)) {
             for (var prop in obj) {
                 if (obj.hasOwnProperty(prop)) {
                     if (fn.call(scope || obj, prop, obj[prop], obj) === false) {
                         return;
                     }
                 }
             }
         }
     },

    /**
     * Plucks the value of a property from each item in the Array
     *
// Example:
Ext.pluck(Ext.query("p"), "className"); // [el1.className, el2.className, ..., elN.className]
     *
     * @param {Array|NodeList} arr The Array of items to pluck the value from.
     * @param {String} prop The property name to pluck from each element.
     * @return {Array} The value from each item in the Array.
     */
    pluck : function(arr, prop) {
        var ret = [];
        Ext.each(arr, function(v) {
            ret.push(v[prop]);
        });
        return ret;
    },

    /**
     * Returns the current document body as an {@link Ext.Element}.
     * @return Ext.Element The document body
     */
    getBody : function() {
        return Ext.get(document.body || false);
    },

    /**
     * Returns the current document head as an {@link Ext.Element}.
     * @return Ext.Element The document head
     */
    getHead : function() {
        var head;

        return function() {
            if (head == undefined) {
                head = Ext.get(DOC.getElementsByTagName("head")[0]);
            }

            return head;
        };
    }(),

    /**
     * Returns the current HTML document object as an {@link Ext.Element}.
     * @return Ext.Element The document
     */
    getDoc : function() {
        return Ext.get(document);
    },

    /**
     * This is shorthand reference to {@link Ext.ComponentMgr#get}.
     * Looks up an existing {@link Ext.Component Component} by {@link Ext.Component#id id}
     * @param {String} id The component {@link Ext.Component#id id}
     * @return Ext.Component The Component, <tt>undefined</tt> if not found, or <tt>null</tt> if a
     * Class was found.
    */
    getCmp : function(id) {
        return Ext.ComponentMgr.get(id);
    },

    /**
     * Returns the current orientation of the mobile device
     * @return {String} Either 'portrait' or 'landscape'
     */
    getOrientation: function() {
        return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    },

    isIterable : function(v) {
        if (!v) {
            return false;
        }
        //check for array or arguments
        if (Ext.isArray(v) || v.callee) {
            return true;
        }
        //check for node list type
        if (/NodeList|HTMLCollection/.test(Object.prototype.toString.call(v))) {
            return true;
        }

        //NodeList has an item and length property
        //IXMLDOMNodeList has nextNode method, needs to be checked first.
        return ((typeof v.nextNode != 'undefined' || v.item) && Ext.isNumber(v.length)) || false;
    },

    /**
     * Utility method for validating that a value is numeric, returning the specified default value if it is not.
     * @param {Mixed} value Should be a number, but any type will be handled appropriately
     * @param {Number} defaultValue The value to return if the original value is non-numeric
     * @return {Number} Value, if numeric, else defaultValue
     */
    num : function(v, defaultValue) {
        v = Number(Ext.isEmpty(v) || Ext.isArray(v) || typeof v == 'boolean' || (typeof v == 'string' && Ext.util.Format.trim(v).length == 0) ? NaN : v);
        return isNaN(v) ? defaultValue : v;
    },

    /**
     * <p>Returns true if the passed value is empty.</p>
     * <p>The value is deemed to be empty if it is<div class="mdetail-params"><ul>
     * <li>null</li>
     * <li>undefined</li>
     * <li>an empty array</li>
     * <li>a zero length string (Unless the <tt>allowBlank</tt> parameter is <tt>true</tt>)</li>
     * </ul></div>
     * @param {Mixed} value The value to test
     * @param {Boolean} allowBlank (optional) true to allow empty strings (defaults to false)
     * @return {Boolean}
     */
    isEmpty : function(value, allowBlank) {
        var isNull       = value == null,
            emptyArray   = (Ext.isArray(value) && !value.length),
            blankAllowed = !allowBlank ? value === '' : false;

        return isNull || emptyArray || blankAllowed;
    },

    /**
     * Returns true if the passed value is a JavaScript array, otherwise false.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isArray : function(v) {
        return Object.prototype.toString.apply(v) === '[object Array]';
    },

    /**
     * Returns true if the passed object is a JavaScript date object, otherwise false.
     * @param {Object} object The object to test
     * @return {Boolean}
     */
    isDate : function(v) {
        return Object.prototype.toString.apply(v) === '[object Date]';
    },

    /**
     * Returns true if the passed value is a JavaScript Object, otherwise false.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isObject : function(v) {
        return !!v && !v.tagName && Object.prototype.toString.call(v) === '[object Object]';
    },

    /**
     * Returns true if the passed value is a JavaScript 'primitive', a string, number or boolean.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isPrimitive : function(v) {
        return Ext.isString(v) || Ext.isNumber(v) || Ext.isBoolean(v);
    },

    /**
     * Returns true if the passed value is a JavaScript Function, otherwise false.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isFunction : function(v) {
        return Object.prototype.toString.apply(v) === '[object Function]';
    },

    /**
     * Returns true if the passed value is a number. Returns false for non-finite numbers.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isNumber : function(v) {
        return Object.prototype.toString.apply(v) === '[object Number]' && isFinite(v);
    },

    /**
     * Returns true if the passed value is a string.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isString : function(v) {
        return typeof v === 'string';
    },

    /**util
     * Returns true if the passed value is a boolean.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isBoolean : function(v) {
        return Object.prototype.toString.apply(v) === '[object Boolean]';
    },

    /**
     * Returns true if the passed value is an HTMLElement
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isElement : function(v) {
        return v ? !!v.tagName : false;
    },

    /**
     * Returns true if the passed value is not undefined.
     * @param {Mixed} value The value to test
     * @return {Boolean}
     */
    isDefined : function(v){
        return typeof v !== 'undefined';
    },

    /**
     * Attempts to destroy any objects passed to it by removing all event listeners, removing them from the
     * DOM (if applicable) and calling their destroy functions (if available).  This method is primarily
     * intended for arguments of type {@link Ext.Element} and {@link Ext.Component}, but any subclass of
     * {@link Ext.util.Observable} can be passed in.  Any number of elements and/or components can be
     * passed into this function in a single call as separate arguments.
     * @param {Object...} args An {@link Ext.Element}, {@link Ext.Component}, or an Array of either of these to destroy
     */
    destroy : function() {
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
    }
});

/**
 * URL to a blank file used by Ext when in secure mode for iframe src and onReady src to prevent
 * the IE insecure content warning (<tt>'about:blank'</tt>, except for IE in secure mode, which is <tt>'javascript:""'</tt>).
 * @type String
 */
Ext.SSL_SECURE_URL = Ext.isSecure && 'about:blank';

Ext.ns = Ext.namespace;

Ext.ns(
    'Ext.util',
    'Ext.data',
    'Ext.list',
    'Ext.form',
    'Ext.menu',
    'Ext.state',
    'Ext.layout',
    'Ext.app',
    'Ext.ux',
    'Ext.plugins',
    'Ext.direct',
    'Ext.lib',
    'Ext.gesture'
);

/**
 * @class Ext.util.Observable
 * Base class that provides a common interface for publishing events. Subclasses are expected to
 * to have a property "events" with all the events defined, and, optionally, a property "listeners"
 * with configured listeners defined.<br>
 * For example:
 * <pre><code>
Employee = Ext.extend(Ext.util.Observable, {
    constructor: function(config){
        this.name = config.name;
        this.addEvents({
            "fired" : true,
            "quit" : true
        });

        // Copy configured listeners into *this* object so that the base class&#39;s
        // constructor will add them.
        this.listeners = config.listeners;

        // Call our superclass constructor to complete construction process.
        Employee.superclass.constructor.call(this, config)
    }
});
</code></pre>
 * This could then be used like this:<pre><code>
var newEmployee = new Employee({
    name: employeeName,
    listeners: {
        quit: function() {
            // By default, "this" will be the object that fired the event.
            alert(this.name + " has quit!");
        }
    }
});
</code></pre>
 */

Ext.util.Observable = Ext.extend(Object, {
    /**
    * @cfg {Object} listeners (optional) <p>A config object containing one or more event handlers to be added to this
    * object during initialization.  This should be a valid listeners config object as specified in the
    * {@link #addListener} example for attaching multiple handlers at once.</p>
    * <br><p><b><u>DOM events from ExtJs {@link Ext.Component Components}</u></b></p>
    * <br><p>While <i>some</i> ExtJs Component classes export selected DOM events (e.g. "click", "mouseover" etc), this
    * is usually only done when extra value can be added. For example the {@link Ext.DataView DataView}'s
    * <b><code>{@link Ext.DataView#click click}</code></b> event passing the node clicked on. To access DOM
    * events directly from a child element of a Component, we need to specify the <code>element</code> option to
    * identify the Component property to add a DOM listener to:
    * <pre><code>
new Ext.Panel({
    width: 400,
    height: 200,
    dockedItems: [{
        xtype: 'toolbar'
    }],
    listeners: {
        click: {
            element: 'el', //bind to the underlying el property on the panel
            fn: function(){ console.log('click el'); }
        },
        dblclick: {
            element: 'body', //bind to the underlying body property on the panel
            fn: function(){ console.log('dblclick body'); }
        }
    }
});
</code></pre>
    * </p>
    */
    // @private
    isObservable: true,

    constructor: function(config) {
        var me = this;

        Ext.apply(me, config);
        if (me.listeners) {
            me.on(me.listeners);
            delete me.listeners;
        }
        me.events = me.events || {};

        if (this.bubbleEvents) {
            this.enableBubble(this.bubbleEvents);
        }
    },

    // @private
    eventOptionsRe : /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate|element|vertical|horizontal)$/,

    /**
     * <p>Adds listeners to any Observable object (or Element) which are automatically removed when this Component
     * is destroyed.
     * @param {Observable|Element} item The item to which to add a listener/listeners.
     * @param {Object|String} ename The event name, or an object containing event name properties.
     * @param {Function} fn Optional. If the <code>ename</code> parameter was an event name, this
     * is the handler function.
     * @param {Object} scope Optional. If the <code>ename</code> parameter was an event name, this
     * is the scope (<code>this</code> reference) in which the handler function is executed.
     * @param {Object} opt Optional. If the <code>ename</code> parameter was an event name, this
     * is the {@link Ext.util.Observable#addListener addListener} options.
     */
    addManagedListener : function(item, ename, fn, scope, options) {
        var me = this,
            managedListeners = me.managedListeners = me.managedListeners || [],
            config;

        if (Ext.isObject(ename)) {
            options = ename;
            for (ename in options) {
                if (!options.hasOwnProperty(ename)) {
                    continue;
                }
                config = options[ename];
                if (!me.eventOptionsRe.test(ename)) {
                    me.addManagedListener(item, ename, config.fn || config, config.scope || options.scope, config.fn ? config : options);
                }
            }
        }
        else {
            managedListeners.push({
                item: item,
                ename: ename,
                fn: fn,
                scope: scope,
                options: options
            });

            item.on(ename, fn, scope, options);
        }
    },

    /**
     * Removes listeners that were added by the {@link #mon} method.
     * @param {Observable|Element} item The item from which to remove a listener/listeners.
     * @param {Object|String} ename The event name, or an object containing event name properties.
     * @param {Function} fn Optional. If the <code>ename</code> parameter was an event name, this
     * is the handler function.
     * @param {Object} scope Optional. If the <code>ename</code> parameter was an event name, this
     * is the scope (<code>this</code> reference) in which the handler function is executed.
     */
     removeManagedListener : function(item, ename, fn, scope) {
        var me = this,
            o,
            config,
            managedListeners,
            managedListener,
            length,
            i;

        if (Ext.isObject(ename)) {
            o = ename;
            for (ename in o) {
                if (!o.hasOwnProperty(ename)) {
                    continue;
                }
                config = o[ename];
                if (!me.eventOptionsRe.test(ename)) {
                    me.removeManagedListener(item, ename, config.fn || config, config.scope || o.scope);
                }
            }
        }

        managedListeners = this.managedListeners ? this.managedListeners.slice() : [];
        length = managedListeners.length;

        for (i = 0; i < length; i++) {
            managedListener = managedListeners[i];
            if (managedListener.item === item && managedListener.ename === ename && (!fn || managedListener.fn === fn) && (!scope || managedListener.scope === scope)) {
                this.managedListeners.remove(managedListener);
                item.un(managedListener.ename, managedListener.fn, managedListener.scope);
            }
        }
    },

    /**
     * <p>Fires the specified event with the passed parameters (minus the event name).</p>
     * <p>An event may be set to bubble up an Observable parent hierarchy (See {@link Ext.Component#getBubbleTarget})
     * by calling {@link #enableBubble}.</p>
     * @param {String} eventName The name of the event to fire.
     * @param {Object...} args Variable number of parameters are passed to handlers.
     * @return {Boolean} returns false if any of the handlers return false otherwise it returns true.
     */
    fireEvent: function() {
        var me = this,
            a = Ext.toArray(arguments),
            ename = a[0].toLowerCase(),
            ret = true,
            ev = me.events[ename],
            queue = me.eventQueue,
            parent;

        if (me.eventsSuspended === true) {
            if (queue) {
                queue.push(a);
            }
            return false;
        }
        else if (ev && Ext.isObject(ev) && ev.bubble) {
            if (ev.fire.apply(ev, a.slice(1)) === false) {
                return false;
            }
            parent = me.getBubbleTarget && me.getBubbleTarget();
            if (parent && parent.isObservable) {
                if (!parent.events[ename] || !Ext.isObject(parent.events[ename]) || !parent.events[ename].bubble) {
                    parent.enableBubble(ename);
                }
                return parent.fireEvent.apply(parent, a);
            }
        }
        else if (ev && Ext.isObject(ev)) {
            a.shift();
            ret = ev.fire.apply(ev, a);
        }
        return ret;
    },

    /**
     * Appends an event handler to this object.
     * @param {String}   eventName The name of the event to listen for. May also be an object who's property names are event names. See 
     * @param {Function} handler The method the event invokes.
     * @param {Object}   scope (optional) The scope (<code><b>this</b></code> reference) in which the handler function is executed.
     * <b>If omitted, defaults to the object which fired the event.</b>
     * @param {Object}   options (optional) An object containing handler configuration.
     * properties. This may contain any of the following properties:<ul>
     * <li><b>scope</b> : Object<div class="sub-desc">The scope (<code><b>this</b></code> reference) in which the handler function is executed.
     * <b>If omitted, defaults to the object which fired the event.</b></div></li>
     * <li><b>delay</b> : Number<div class="sub-desc">The number of milliseconds to delay the invocation of the handler after the event fires.</div></li>
     * <li><b>single</b> : Boolean<div class="sub-desc">True to add a handler to handle just the next firing of the event, and then remove itself.</div></li>
     * <li><b>buffer</b> : Number<div class="sub-desc">Causes the handler to be scheduled to run in an {@link Ext.util.DelayedTask} delayed
     * by the specified number of milliseconds. If the event fires again within that time, the original
     * handler is <em>not</em> invoked, but the new handler is scheduled in its place.</div></li>
     * <li><b>target</b> : Observable<div class="sub-desc">Only call the handler if the event was fired on the target Observable, <i>not</i>
     * if the event was bubbled up from a child Observable.</div></li>
     * <li><b>element</b> : String<div class="sub-desc"><b>This option is only valid for listeners bound to {@link Ext.Component Components}.</b>
     * The name of a Component property which references an element to add a listener to.
     * <p>This option is useful during Component construction to add DOM event listeners to elements of {@link Ext.Component Components} which
     * will exist only after the Component is rendered. For example, to add a click listener to a Panel's body:<pre><code>
new Ext.Panel({
    title: 'The title',
    listeners: {
        click: this.handlePanelClick,
        element: 'body'
    }
});
</code></pre></p>
     * <p>When added in this way, the options available are the options applicable to {@link Ext.Element#addListener}</p></div></li>
     * </ul><br>
     * <p>
     * <b>Combining Options</b><br>
     * Using the options argument, it is possible to combine different types of listeners:<br>
     * <br>
     * A delayed, one-time listener.
     * <pre><code>
myPanel.on('hide', this.handleClick, this, {
single: true,
delay: 100
});</code></pre>
     * <p>
     * <b>Attaching multiple handlers in 1 call</b><br>
     * The method also allows for a single argument to be passed which is a config object containing properties
     * which specify multiple events. For example:<pre><code>
myGridPanel.on({
    cellClick: this.onCellClick,
    mouseover: this.onMouseOver,
    mouseout: this.onMouseOut,
    scope: this // Important. Ensure "this" is correct during handler execution
});
</code></pre>.
     * <p>
     */
    addListener: function(ename, fn, scope, o) {
        var me = this,
            config,
            ev;

        if (Ext.isObject(ename)) {
            o = ename;
            for (ename in o) {
                if (!o.hasOwnProperty(ename)) {
                    continue;
                }
                config = o[ename];
                if (!me.eventOptionsRe.test(ename)) {
                    me.addListener(ename, config.fn || config, config.scope || o.scope, config.fn ? config : o);
                }
            }
        }
        else {
            ename = ename.toLowerCase();
            me.events[ename] = me.events[ename] || true;
            ev = me.events[ename] || true;
            if (Ext.isBoolean(ev)) {
                me.events[ename] = ev = new Ext.util.Event(me, ename);
            }
            ev.addListener(fn, scope, Ext.isObject(o) ? o: {});
        }
    },

    /**
     * Removes an event handler.
     * @param {String}   eventName The type of event the handler was associated with.
     * @param {Function} handler   The handler to remove. <b>This must be a reference to the function passed into the {@link #addListener} call.</b>
     * @param {Object}   scope     (optional) The scope originally specified for the handler.
     */
    removeListener: function(ename, fn, scope) {
        var me = this,
            config,
            ev;

        if (Ext.isObject(ename)) {
            var o = ename;
            for (ename in o) {
                if (!o.hasOwnProperty(ename)) {
                    continue;
                }
                config = o[ename];
                if (!me.eventOptionsRe.test(ename)) {
                    me.removeListener(ename, config.fn || config, config.scope || o.scope);
                }
            }
        }
        else {
            ename = ename.toLowerCase();
            ev = me.events[ename];
            if (ev.isEvent) {
                ev.removeListener(fn, scope);
            }
        }
    },

    /**
     * Removes all listeners for this object including the managed listeners
     */
    clearListeners: function() {
        var events = this.events,
            ev,
            key;

        for (key in events) {
            if (!events.hasOwnProperty(key)) {
                continue;
            }
            ev = events[key];
            if (ev.isEvent) {
                ev.clearListeners();
            }
        }

        this.clearManagedListeners();
    },

    //<debug>
    purgeListeners : function() {
        console.warn('MixedCollection: purgeListeners has been deprecated. Please use clearListeners.');
        return this.clearListeners.apply(this, arguments);
    },
    //</debug>

    /**
     * Removes all managed listeners for this object.
     */
    clearManagedListeners : function() {
        var managedListeners = this.managedListeners || [],
            ln = managedListeners.length,
            i, managedListener;

        for (i = 0; i < ln; i++) {
            managedListener = managedListeners[i];
            managedListener.item.un(managedListener.ename, managedListener.fn, managedListener.scope);
        }

        this.managedListener = [];
    },

    //<debug>
    purgeManagedListeners : function() {
        console.warn('MixedCollection: purgeManagedListeners has been deprecated. Please use clearManagedListeners.');
        return this.clearManagedListeners.apply(this, arguments);
    },
    //</debug>

    /**
     * Adds the specified events to the list of events which this Observable may fire.
     * @param {Object|String} o Either an object with event names as properties with a value of <code>true</code>
     * or the first event name string if multiple event names are being passed as separate parameters.
     * @param {string} Optional. Event name if multiple event names are being passed as separate parameters.
     * Usage:<pre><code>
this.addEvents('storeloaded', 'storecleared');
</code></pre>
     */
    addEvents: function(o) {
        var me = this;
            me.events = me.events || {};
        if (Ext.isString(o)) {
            var a = arguments,
            i = a.length;
            while (i--) {
                me.events[a[i]] = me.events[a[i]] || true;
            }
        } else {
            Ext.applyIf(me.events, o);
        }
    },

    /**
     * Checks to see if this object has any listeners for a specified event
     * @param {String} eventName The name of the event to check for
     * @return {Boolean} True if the event is being listened for, else false
     */
    hasListener: function(ename) {
        var e = this.events[ename];
        return e.isEvent === true && e.listeners.length > 0;
    },

    /**
     * Suspend the firing of all events. (see {@link #resumeEvents})
     * @param {Boolean} queueSuspended Pass as true to queue up suspended events to be fired
     * after the {@link #resumeEvents} call instead of discarding all suspended events;
     */
    suspendEvents: function(queueSuspended) {
        this.eventsSuspended = true;
        if (queueSuspended && !this.eventQueue) {
            this.eventQueue = [];
        }
    },

    /**
     * Resume firing events. (see {@link #suspendEvents})
     * If events were suspended using the <tt><b>queueSuspended</b></tt> parameter, then all
     * events fired during event suspension will be sent to any listeners now.
     */
    resumeEvents: function() {
        var me = this,
            queued = me.eventQueue || [];

        me.eventsSuspended = false;
        delete me.eventQueue;

        Ext.each(queued,
        function(e) {
            me.fireEvent.apply(me, e);
        });
    },

    /**
     * Relays selected events from the specified Observable as if the events were fired by <tt><b>this</b></tt>.
     * @param {Object} o The Observable whose events this object is to relay.
     * @param {Array} events Array of event names to relay.
     */
    relayEvents : function(origin, events, prefix) {
        prefix = prefix || '';
        var me = this,
            len = events.length,
            i, ename;

        function createHandler(ename){
            return function(){
                return me.fireEvent.apply(me, [prefix + ename].concat(Array.prototype.slice.call(arguments, 0, -1)));
            };
        }

        for(i = 0, len = events.length; i < len; i++){
            ename = events[i].substr(prefix.length);
            me.events[ename] = me.events[ename] || true;
            origin.on(ename, createHandler(ename), me);
        }
    },

    /**
     * <p>Enables events fired by this Observable to bubble up an owner hierarchy by calling
     * <code>this.getBubbleTarget()</code> if present. There is no implementation in the Observable base class.</p>
     * <p>This is commonly used by Ext.Components to bubble events to owner Containers. See {@link Ext.Component.getBubbleTarget}. The default
     * implementation in Ext.Component returns the Component's immediate owner. But if a known target is required, this can be overridden to
     * access the required target more quickly.</p>
     * <p>Example:</p><pre><code>
Ext.override(Ext.form.Field, {
//  Add functionality to Field&#39;s initComponent to enable the change event to bubble
initComponent : Ext.createSequence(Ext.form.Field.prototype.initComponent, function() {
    this.enableBubble('change');
}),

//  We know that we want Field&#39;s events to bubble directly to the FormPanel.
getBubbleTarget : function() {
    if (!this.formPanel) {
        this.formPanel = this.findParentByType('form');
    }
    return this.formPanel;
}
});

var myForm = new Ext.formPanel({
title: 'User Details',
items: [{
    ...
}],
listeners: {
    change: function() {
        // Title goes red if form has been modified.
        myForm.header.setStyle('color', 'red');
    }
}
});
</code></pre>
     * @param {String/Array} events The event name to bubble, or an Array of event names.
     */
    enableBubble: function(events) {
        var me = this;
        if (!Ext.isEmpty(events)) {
            events = Ext.isArray(events) ? events: Ext.toArray(arguments);
            Ext.each(events,
            function(ename) {
                ename = ename.toLowerCase();
                var ce = me.events[ename] || true;
                if (Ext.isBoolean(ce)) {
                    ce = new Ext.util.Event(me, ename);
                    me.events[ename] = ce;
                }
                ce.bubble = true;
            });
        }
    }
});

Ext.override(Ext.util.Observable, {
    /**
     * Appends an event handler to this object (shorthand for {@link #addListener}.)
     * @param {String}   eventName     The type of event to listen for
     * @param {Function} handler       The method the event invokes
     * @param {Object}   scope         (optional) The scope (<code><b>this</b></code> reference) in which the handler function is executed.
     * <b>If omitted, defaults to the object which fired the event.</b>
     * @param {Object}   options       (optional) An object containing handler configuration.
     * @method
     */
    on: Ext.util.Observable.prototype.addListener,
    /**
     * Removes an event handler (shorthand for {@link #removeListener}.)
     * @param {String}   eventName     The type of event the handler was associated with.
     * @param {Function} handler       The handler to remove. <b>This must be a reference to the function passed into the {@link #addListener} call.</b>
     * @param {Object}   scope         (optional) The scope originally specified for the handler.
     * @method
     */
    un: Ext.util.Observable.prototype.removeListener,

    mon: Ext.util.Observable.prototype.addManagedListener,
    mun: Ext.util.Observable.prototype.removeManagedListener
});

/**
 * Removes <b>all</b> added captures from the Observable.
 * @param {Observable} o The Observable to release
 * @static
 */
Ext.util.Observable.releaseCapture = function(o) {
    o.fireEvent = Ext.util.Observable.prototype.fireEvent;
};

/**
 * Starts capture on the specified Observable. All events will be passed
 * to the supplied function with the event name + standard signature of the event
 * <b>before</b> the event is fired. If the supplied function returns false,
 * the event will not fire.
 * @param {Observable} o The Observable to capture events from.
 * @param {Function} fn The function to call when an event is fired.
 * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the Observable firing the event.
 * @static
 */
Ext.util.Observable.capture = function(o, fn, scope) {
    o.fireEvent = Ext.createInterceptor(o.fireEvent, fn, scope);
};

/**
 * Sets observability on the passed class constructor.<p>
 * <p>This makes any event fired on any instance of the passed class also fire a single event through
 * the <i>class</i> allowing for central handling of events on many instances at once.</p>
 * <p>Usage:</p><pre><code>
Ext.util.Observable.observe(Ext.data.Connection);
Ext.data.Connection.on('beforerequest', function(con, options) {
    console.log('Ajax request made to ' + options.url);
});</code></pre>
 * @param {Function} c The class constructor to make observable.
 * @param {Object} listeners An object containing a series of listeners to add. See {@link #addListener}.
 * @static
 */
Ext.util.Observable.observe = function(cls, listeners) {
    if (cls) {
        if (!cls.isObservable) {
            Ext.applyIf(cls, new Ext.util.Observable());
            Ext.util.Observable.capture(cls.prototype, cls.fireEvent, cls);
        }
        if (typeof listeners == 'object') {
            cls.on(listeners);
        }
        return cls;
    }
};

//deprecated, will be removed in 5.0
Ext.util.Observable.observeClass = Ext.util.Observable.observe;

Ext.util.Event = Ext.extend(Object, (function() {
    function createBuffered(handler, listener, o, scope) {
        listener.task = new Ext.util.DelayedTask();
        return function() {
            listener.task.delay(o.buffer, handler, scope, Ext.toArray(arguments));
        };
    };

    function createDelayed(handler, listener, o, scope) {
        return function() {
            var task = new Ext.util.DelayedTask();
            if (!listener.tasks) {
                listener.tasks = [];
            }
            listener.tasks.push(task);
            task.delay(o.delay || 10, handler, scope, Ext.toArray(arguments));
        };
    };

    function createSingle(handler, listener, o, scope) {
        return function() {
            listener.ev.removeListener(listener.fn, scope);
            return handler.apply(scope, arguments);
        };
    };

    return {
        isEvent: true,

        constructor: function(observable, name) {
            this.name = name;
            this.observable = observable;
            this.listeners = [];
        },

        addListener: function(fn, scope, options) {
            var me = this,
                listener;
                scope = scope || me.observable;

            if (!me.isListening(fn, scope)) {
                listener = me.createListener(fn, scope, options);
                if (me.firing) {
                    // if we are currently firing this event, don't disturb the listener loop
                    me.listeners = me.listeners.slice(0);
                }
                me.listeners.push(listener);
            }
        },

        createListener: function(fn, scope, o) {
            o = o || {};
            scope = scope || this.observable;

            var listener = {
                    fn: fn,
                    scope: scope,
                    o: o,
                    ev: this
                },
                handler = fn;

            if (o.delay) {
                handler = createDelayed(handler, listener, o, scope);
            }
            if (o.buffer) {
                handler = createBuffered(handler, listener, o, scope);
            }
            if (o.single) {
                handler = createSingle(handler, listener, o, scope);
            }

            listener.fireFn = handler;
            return listener;
        },

        findListener: function(fn, scope) {
            var listeners = this.listeners,
            i = listeners.length,
            listener,
            s;

            while (i--) {
                listener = listeners[i];
                if (listener) {
                    s = listener.scope;
                    if (listener.fn == fn && (s == scope || s == this.observable)) {
                        return i;
                    }
                }
            }

            return - 1;
        },

        isListening: function(fn, scope) {
            return this.findListener(fn, scope) !== -1;
        },

        removeListener: function(fn, scope) {
            var me = this,
                index,
                listener,
                k;
            index = me.findListener(fn, scope);
            if (index != -1) {
                listener = me.listeners[index];

                if (me.firing) {
                    me.listeners = me.listeners.slice(0);
                }

                // cancel and remove a buffered handler that hasn't fired yet
                if (listener.task) {
                    listener.task.cancel();
                    delete listener.task;
                }

                // cancel and remove all delayed handlers that haven't fired yet
                k = listener.tasks && listener.tasks.length;
                if (k) {
                    while (k--) {
                        listener.tasks[k].cancel();
                    }
                    delete listener.tasks;
                }

                // remove this listener from the listeners array
                me.listeners.splice(index, 1);
                return true;
            }

            return false;
        },

        // Iterate to stop any buffered/delayed events
        clearListeners: function() {
            var listeners = this.listeners,
                i = listeners.length;

            while (i--) {
                this.removeListener(listeners[i].fn, listeners[i].scope);
            }
        },

        fire: function() {
            var me = this,
                listeners = me.listeners,
                count = listeners.length,
                i,
                args,
                listener;

            if (count > 0) {
                me.firing = true;
                for (i = 0; i < count; i++) {
                    listener = listeners[i];
                    args = arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
                    if (listener.o) {
                        args.push(listener.o);
                    }
                    if (listener && listener.fireFn.apply(listener.scope || me.observable, args) === false) {
                        return (me.firing = false);
                    }
                }
            }
            me.firing = false;
            return true;
        }
    };
})());

/**
 * @class Ext.util.Stateful
 * @extends Ext.util.Observable
 * Represents any object whose data can be saved by a {@link Ext.data.Proxy Proxy}. Ext.Model
 * and Ext.View both inherit from this class as both can save state (Models save field state, 
 * Views save configuration)
 */
Ext.util.Stateful = Ext.extend(Ext.util.Observable, {
    
    /**
     * Internal flag used to track whether or not the model instance is currently being edited. Read-only
     * @property editing
     * @type Boolean
     */
    editing : false,
    
    /**
     * Readonly flag - true if this Record has been modified.
     * @type Boolean
     */
    dirty : false,
    
    /**
     * @cfg {String} persistanceProperty The property on this Persistable object that its data is saved to.
     * Defaults to 'data' (e.g. all persistable data resides in this.data.)
     */
    persistanceProperty: 'data',
    
    constructor: function(config) {
        Ext.applyIf(this, {
            data: {}
        });        
        
        /**
         * Key: value pairs of all fields whose values have changed
         * @property modified
         * @type Object
         */
        this.modified = {};
        
        this[this.persistanceProperty] = {};
        
        Ext.util.Stateful.superclass.constructor.call(this, config);
    },
    
    /**
     * Returns the value of the given field
     * @param {String} fieldName The field to fetch the value for
     * @return {Mixed} The value
     */
    get: function(field) {
        return this[this.persistanceProperty][field];
    },
    
    /**
     * Sets the given field to the given value, marks the instance as dirty
     * @param {String|Object} fieldName The field to set, or an object containing key/value pairs
     * @param {Mixed} value The value to set
     */
    set: function(fieldName, value) {
        var me = this,
            fields = me.fields,
            modified = me.modified,
            convertFields = [],
            field, key, i;
        
        /*
         * If we're passed an object, iterate over that object. NOTE: we pull out fields with a convert function and
         * set those last so that all other possible data is set before the convert function is called
         */
        if (arguments.length == 1 && Ext.isObject(fieldName)) {
            for (key in fieldName) {
                if (!fieldName.hasOwnProperty(key)) {
                    continue;
                }
                
                //here we check for the custom convert function. Note that if a field doesn't have a convert function,
                //we default it to its type's convert function, so we have to check that here. This feels rather dirty.
                field = fields.get(key);
                if (field && field.convert !== field.type.convert) {
                    convertFields.push(key);
                    continue;
                }
                
                me.set(key, fieldName[key]);
            }
            
            for (i = 0; i < convertFields.length; i++) {
                field = convertFields[i];
                me.set(field, fieldName[field]);
            }
            
        } else {
            if (fields) {
                field = fields.get(fieldName);
                
                if (field && field.convert) {
                    value = field.convert(value, me);
                }
            }
            
            me[me.persistanceProperty][fieldName] = value;

            if (field && field.persist && !me.isEqual(currentValue, value)) {
                if (me.isModified(fieldName)) {
                    if (me.isEqual(modified[fieldName], value)) {
                        // the original value in me.modified equals the new value, so the
                        // field is no longer modified
                        delete modified[fieldName];
                        // we might have removed the last modified field, so check to see if
                        // there are any modified fields remaining and correct me.dirty:
                        me.dirty = false;
                        for (key in modified) {
                            if (modified.hasOwnProperty(key)){
                                me.dirty = true;
                                break;
                            }
                        }
                    }
                } else {
                    me.dirty = true;
                    modified[fieldName] = currentValue;
                }
            }

            if (!me.editing) {
                me.afterEdit();
            }
        }
    },
    
    /**
     * Gets a hash of only the fields that have been modified since this Model was created or commited.
     * @return Object
     */
    getChanges : function(){
        var modified = this.modified,
            changes  = {},
            field;
            
        for (field in modified) {
            if (modified.hasOwnProperty(field)){
                changes[field] = this[this.persistanceProperty][field];
            }
        }
        
        return changes;
    },
    
    /**
     * Returns <tt>true</tt> if the passed field name has been <code>{@link #modified}</code>
     * since the load or last commit.
     * @param {String} fieldName {@link Ext.data.Field#name}
     * @return {Boolean}
     */
    isModified : function(fieldName) {
        return !!(this.modified && this.modified.hasOwnProperty(fieldName));
    },
    
    /**
     * <p>Marks this <b>Record</b> as <code>{@link #dirty}</code>.  This method
     * is used interally when adding <code>{@link #phantom}</code> records to a
     * {@link Ext.data.Store#writer writer enabled store}.</p>
     * <br><p>Marking a record <code>{@link #dirty}</code> causes the phantom to
     * be returned by {@link Ext.data.Store#getModifiedRecords} where it will
     * have a create action composed for it during {@link Ext.data.Store#save store save}
     * operations.</p>
     */
    setDirty : function() {
        this.dirty = true;
        
        if (!this.modified) {
            this.modified = {};
        }
        
        this.fields.each(function(field) {
            this.modified[field.name] = this[this.persistanceProperty][field.name];
        }, this);
    },
    
    //<debug>
    markDirty : function() {
        throw new Error("Stateful: markDirty has been deprecated. Please use setDirty.");
    },
    //</debug>
    
    /**
     * Usually called by the {@link Ext.data.Store} to which this model instance has been {@link #join joined}.
     * Rejects all changes made to the model instance since either creation, or the last commit operation.
     * Modified fields are reverted to their original values.
     * <p>Developers should subscribe to the {@link Ext.data.Store#update} event
     * to have their code notified of reject operations.</p>
     * @param {Boolean} silent (optional) True to skip notification of the owning
     * store of the change (defaults to false)
     */
    reject : function(silent) {
        var modified = this.modified,
            field;
            
        for (field in modified) {
            if (!modified.hasOwnProperty(field)) {
                continue;
            }
            if (typeof modified[field] != "function") {
                this[this.persistanceProperty][field] = modified[field];
            }
        }
        
        this.dirty = false;
        this.editing = false;
        delete this.modified;
        
        if (silent !== true) {
            this.afterReject();
        }
    },
    
    /**
     * Usually called by the {@link Ext.data.Store} which owns the model instance.
     * Commits all changes made to the instance since either creation or the last commit operation.
     * <p>Developers should subscribe to the {@link Ext.data.Store#update} event
     * to have their code notified of commit operations.</p>
     * @param {Boolean} silent (optional) True to skip notification of the owning
     * store of the change (defaults to false)
     */
    commit : function(silent) {
        this.dirty = false;
        this.editing = false;
        
        delete this.modified;
        
        if (silent !== true) {
            this.afterCommit();
        }
    },
    
    /**
     * Creates a copy (clone) of this Model instance.
     * @param {String} id (optional) A new id, defaults to the id
     * of the instance being copied. See <code>{@link #id}</code>. 
     * To generate a phantom instance with a new id use:<pre><code>
var rec = record.copy(); // clone the record
Ext.data.Model.id(rec); // automatically generate a unique sequential id
     * </code></pre>
     * @return {Record}
     */
    copy : function(newId) {
        return new this.constructor(Ext.apply({}, this[this.persistanceProperty]), newId || this.internalId);
    }
});
/**
 * @class Ext.util.HashMap
 * @extends Ext.util.Observable
 * <p>A simple unordered dictionary implementation to store key/value pairs.</p>
 * 
 * @cfg {Function} keyFn A function that is used to retrieve a default key for a passed object.
 * A default is provided that returns the <b>id</b> property on the object. This function is only used
 * if the add method is called with a single argument.
 * 
 * @constructor
 * @param {Object} config The configuration options
 */
Ext.util.HashMap = Ext.extend(Ext.util.Observable, {
    constructor: function(config) {
        this.addEvents(
            /**
             * @event add
             * Fires when a new item is added to the hash
             * @param {Ext.util.HashMap} this.
             * @param {String} key The key of the added item.
             * @param {Object} value The value of the added item.
             */
            'add',
            /**
             * @event clear
             * Fires when the hash is cleared.
             * @param {Ext.util.HashMap} this.
             */
            'clear',
            /**
             * @event remove
             * Fires when an item is removed from the hash.
             * @param {Ext.util.HashMap} this.
             * @param {String} key The key of the removed item.
             * @param {Object} value The value of the removed item.
             */
            'remove',
            /**
             * @event replace
             * Fires when an item is replaced in the hash.
             * @param {Ext.util.HashMap} this.
             * @param {String} key The key of the replaced item.
             * @param {Object} value The new value for the item.
             * @param {Object} old The old value for the item.
             */
            'replace'
        );
        
        Ext.util.HashMap.superclass.constructor.call(this, config);
        
        this.clear(true);
    },

    /**
     * Gets the number of items in the hash.
     * @return {Number} The number of items in the hash.
     */
    getCount: function() {
        return this.length;
    },
    
    /**
     * Implementation for being able to extract the key from an object if only
     * a single argument is passed.
     * @private
     * @param {String} key The key
     * @param {Object} value The value
     * @return {Array} [key, value]
     */
    getData: function(key, value) {
        // if we have no value, it means we need to get the key from the object
        if (value === undefined) {
            value = key;
            key = this.getKey(value);
        }
        
        return [key, value];
    },
    
    /**
     * Extracts the key from an object. This is a default implementation, it may be overridden
     * @private
     * @param {Object} o The object to get the key from
     * @return {String} The key to use.
     */
    getKey: function(o) {
        return o.id;    
    },

    /**
     * Add a new item to the hash. An exception will be thrown if the key already exists.
     * @param {String} key The key of the new item.
     * @param {Object} value The value of the new item.
     * @return {Object} The value of the new item added.
     */
    add: function(key, value) {
        var me = this,
            data;
            
        if (me.containsKey(key)) {
            throw new Error('This key already exists in the HashMap');
        }
        
        data = this.getData(key, value);
        key = data[0];
        value = data[1];
        me.map[key] = value;
        ++me.length;
        me.fireEvent('add', me, key, value);
        return value;
    },

    /**
     * Replaces an item in the hash. If the key doesn't exist, the
     * {@link #add} method will be used.
     * @param {String} key The key of the item.
     * @param {Object} value The new value for the item.
     * @return {Object} The new value of the item.
     */
    replace: function(key, value) {
        var me = this,
            map = me.map,
            old;
            
        if (!me.containsKey(key)) {
            me.add(key, value);
        }
        old = map[key];
        map[key] = value;
        me.fireEvent('replace', me, key, value, old);
        return value;
    },

    /**
     * Remove an item from the hash.
     * @param {Object} o The value of the item to remove.
     * @return {Boolean} True if the item was successfully removed.
     */
    remove: function(o) {
        var key = this.findKey(o);
        if (key !== undefined) {
            return this.removeByKey(key);
        }
        return false;
    },

    /**
     * Remove an item from the hash.
     * @param {String} key The key to remove.
     * @return {Boolean} True if the item was successfully removed.
     */
    removeByKey: function(key) {
        var me = this,
            value;
            
        if (me.containsKey(key)) {
            value = me.map[key];
            delete me.map[key];
            --me.length;
            me.fireEvent('remove', me, key, value);
            return true;
        }
        return false;
    },

    /**
     * Retrieves an item with a particular key.
     * @param {String} key The key to lookup.
     * @return {Object} The value at that key. If it doesn't exist, <tt>undefined</tt> is returned.
     */
    get: function(key) {
        return this.map[key];
    },

    /**
     * Removes all items from the hash.
     * @return {Ext.util.HashMap} this
     */
    clear: function(/* private */ initial) {
        var me = this;
        me.map = {};
        me.length = 0;
        if (initial !== true) {
            me.fireEvent('clear', me);
        }
        return me;
    },

    /**
     * Checks whether a key exists in the hash.
     * @param {String} key The key to check for.
     * @return {Boolean} True if they key exists in the hash.
     */
    containsKey: function(key) {
        return this.map[key] !== undefined;
    },

    /**
     * Checks whether a value exists in the hash.
     * @param {Object} value The value to check for.
     * @return {Boolean} True if the value exists in the dictionary.
     */
    contains: function(value) {
        return this.containsKey(this.findKey(value));
    },

    /**
     * Return all of the keys in the hash.
     * @return {Array} An array of keys.
     */
    getKeys: function() {
        return this.getArray(true);
    },

    /**
     * Return all of the values in the hash.
     * @return {Array} An array of values.
     */
    getValues: function() {
        return this.getArray(false);
    },

    /**
     * Gets either the keys/values in an array from the hash.
     * @private
     * @param {Boolean} isKey True to extract the keys, otherwise, the value
     * @return {Array} An array of either keys/values from the hash.
     */
    getArray: function(isKey) {
        var arr = [],
            key,
            map = this.map;
        for (key in map) {
            if (map.hasOwnProperty(key)) {
                arr.push(isKey ? key: map[key]);
            }
        }
        return arr;
    },

    /**
     * Executes the specified function once for each item in the hash.
     * Returning false from the function will cease iteration.
     * 
     * The paramaters passed to the function are:
     * <div class="mdetail-params"><ul>
     * <li><b>key</b> : String<p class="sub-desc">The key of the item</p></li>
     * <li><b>value</b> : Number<p class="sub-desc">The value of the item</p></li>
     * <li><b>length</b> : Number<p class="sub-desc">The total number of items in the hash</p></li>
     * </ul></div>
     * @param {Function} fn The function to execute.
     * @param {Object} scope The scope to execute in. Defaults to <tt>this</tt>.
     * @return {Ext.util.HashMap} this
     */
    each: function(fn, scope) { 
        // copy items so they may be removed during iteration.
        var items = Ext.apply({}, this.map),
            key,
            length = this.length;

        scope = scope || this;
        for (key in items) {
            if (items.hasOwnProperty(key)) {
                if (fn.call(scope, key, items[key], length) === false) {
                    break;
                }
            }
        }
        return this;
    },

    /**
     * Performs a shallow copy on this hash.
     * @return {Ext.util.HashMap} The new hash object.
     */
    clone: function() {
        var hash = new Ext.util.HashMap(),
            map = this.map,
            key;
            
        hash.suspendEvents();
        for (key in map) {
            if (map.hasOwnProperty(key)) {
                hash.add(key, map[key]);
            }
        }
        hash.resumeEvents();
        return hash;
    },

    /**
     * @private
     * Find the key for a value.
     * @param {Object} value The value to find.
     * @return {Object} The value of the item. Returns <tt>undefined</tt> if not found.
     */
    findKey: function(value) {
        var key,
            map = this.map;

        for (key in map) {
            if (map.hasOwnProperty(key) && map[key] === value) {
                return key;
            }
        }
        return undefined;
    }
});
/**
 * @class Ext.util.MixedCollection
 * @extends Ext.util.Observable
 * A Collection class that maintains both numeric indexes and keys and exposes events.
 * @constructor
 * @param {Boolean} allowFunctions Specify <tt>true</tt> if the {@link #addAll}
 * function should add function references to the collection. Defaults to
 * <tt>false</tt>.
 * @param {Function} keyFn A function that can accept an item of the type(s) stored in this MixedCollection
 * and return the key value for that item.  This is used when available to look up the key on items that
 * were passed without an explicit key parameter to a MixedCollection method.  Passing this parameter is
 * equivalent to providing an implementation for the {@link #getKey} method.
 */
Ext.util.MixedCollection = function(allowFunctions, keyFn) {
    this.items = [];
    this.map = {};
    this.keys = [];
    this.length = 0;
    this.addEvents(
        /**
         * @event clear
         * Fires when the collection is cleared.
         */
        'clear',
        /**
         * @event add
         * Fires when an item is added to the collection.
         * @param {Number} index The index at which the item was added.
         * @param {Object} o The item added.
         * @param {String} key The key associated with the added item.
         */
        'add',
        /**
         * @event replace
         * Fires when an item is replaced in the collection.
         * @param {String} key he key associated with the new added.
         * @param {Object} old The item being replaced.
         * @param {Object} new The new item.
         */
        'replace',
        /**
         * @event remove
         * Fires when an item is removed from the collection.
         * @param {Object} o The item being removed.
         * @param {String} key (optional) The key associated with the removed item.
         */
        'remove',
        'sort'
    );
    this.allowFunctions = allowFunctions === true;
    if (keyFn) {
        this.getKey = keyFn;
    }
    Ext.util.MixedCollection.superclass.constructor.call(this);
};

Ext.extend(Ext.util.MixedCollection, Ext.util.Observable, {

    /**
     * @cfg {Boolean} allowFunctions Specify <tt>true</tt> if the {@link #addAll}
     * function should add function references to the collection. Defaults to
     * <tt>false</tt>.
     */
    allowFunctions : false,

    /**
     * Adds an item to the collection. Fires the {@link #add} event when complete.
     * @param {String} key <p>The key to associate with the item, or the new item.</p>
     * <p>If a {@link #getKey} implementation was specified for this MixedCollection,
     * or if the key of the stored items is in a property called <tt><b>id</b></tt>,
     * the MixedCollection will be able to <i>derive</i> the key for the new item.
     * In this case just pass the new item in this parameter.</p>
     * @param {Object} o The item to add.
     * @return {Object} The item added.
     */
    add : function(key, obj){
        var myObj = obj, myKey = key;
        if(arguments.length == 1){
            myObj = myKey;
            myKey = this.getKey(myObj);
        }
        if(typeof myKey != 'undefined' && myKey !== null){
            var old = this.map[myKey];
            if(typeof old != 'undefined'){
                return this.replace(myKey, myObj);
            }
            this.map[myKey] = myObj;
        }
        this.length++;
        this.items.push(myObj);
        this.keys.push(myKey);
        this.fireEvent('add', this.length-1, myObj, myKey);
        return myObj;
    },

    /**
      * MixedCollection has a generic way to fetch keys if you implement getKey.  The default implementation
      * simply returns <b><code>item.id</code></b> but you can provide your own implementation
      * to return a different value as in the following examples:<pre><code>
// normal way
var mc = new Ext.util.MixedCollection();
mc.add(someEl.dom.id, someEl);
mc.add(otherEl.dom.id, otherEl);
//and so on

// using getKey
var mc = new Ext.util.MixedCollection();
mc.getKey = function(el){
   return el.dom.id;
};
mc.add(someEl);
mc.add(otherEl);

// or via the constructor
var mc = new Ext.util.MixedCollection(false, function(el){
   return el.dom.id;
});
mc.add(someEl);
mc.add(otherEl);
     * </code></pre>
     * @param {Object} item The item for which to find the key.
     * @return {Object} The key for the passed item.
     */
    getKey : function(o){
         return o.id;
    },

    /**
     * Replaces an item in the collection. Fires the {@link #replace} event when complete.
     * @param {String} key <p>The key associated with the item to replace, or the replacement item.</p>
     * <p>If you supplied a {@link #getKey} implementation for this MixedCollection, or if the key
     * of your stored items is in a property called <tt><b>id</b></tt>, then the MixedCollection
     * will be able to <i>derive</i> the key of the replacement item. If you want to replace an item
     * with one having the same key value, then just pass the replacement item in this parameter.</p>
     * @param o {Object} o (optional) If the first parameter passed was a key, the item to associate
     * with that key.
     * @return {Object}  The new item.
     */
    replace : function(key, o){
        if(arguments.length == 1){
            o = arguments[0];
            key = this.getKey(o);
        }
        var old = this.map[key];
        if(typeof key == 'undefined' || key === null || typeof old == 'undefined'){
             return this.add(key, o);
        }
        var index = this.indexOfKey(key);
        this.items[index] = o;
        this.map[key] = o;
        this.fireEvent('replace', key, old, o);
        return o;
    },

    /**
     * Adds all elements of an Array or an Object to the collection.
     * @param {Object/Array} objs An Object containing properties which will be added
     * to the collection, or an Array of values, each of which are added to the collection.
     * Functions references will be added to the collection if <code>{@link #allowFunctions}</code>
     * has been set to <tt>true</tt>.
     */
    addAll : function(objs){
        if(arguments.length > 1 || Ext.isArray(objs)){
            var args = arguments.length > 1 ? arguments : objs;
            for(var i = 0, len = args.length; i < len; i++){
                this.add(args[i]);
            }
        }else{
            for(var key in objs){
                if (!objs.hasOwnProperty(key)) {
                    continue;
                }
                if(this.allowFunctions || typeof objs[key] != 'function'){
                    this.add(key, objs[key]);
                }
            }
        }
    },

    /**
     * Executes the specified function once for every item in the collection, passing the following arguments:
     * <div class="mdetail-params"><ul>
     * <li><b>item</b> : Mixed<p class="sub-desc">The collection item</p></li>
     * <li><b>index</b> : Number<p class="sub-desc">The item's index</p></li>
     * <li><b>length</b> : Number<p class="sub-desc">The total number of items in the collection</p></li>
     * </ul></div>
     * The function should return a boolean value. Returning false from the function will stop the iteration.
     * @param {Function} fn The function to execute for each item.
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the current item in the iteration.
     */
    each : function(fn, scope){
        var items = [].concat(this.items); // each safe for removal
        for(var i = 0, len = items.length; i < len; i++){
            if(fn.call(scope || items[i], items[i], i, len) === false){
                break;
            }
        }
    },

    /**
     * Executes the specified function once for every key in the collection, passing each
     * key, and its associated item as the first two parameters.
     * @param {Function} fn The function to execute for each item.
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the browser window.
     */
    eachKey : function(fn, scope){
        for(var i = 0, len = this.keys.length; i < len; i++){
            fn.call(scope || window, this.keys[i], this.items[i], i, len);
        }
    },

    /**
     * Returns the first item in the collection which elicits a true return value from the
     * passed selection function.
     * @param {Function} fn The selection function to execute for each item.
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the browser window.
     * @return {Object} The first item in the collection which returned true from the selection function.
     */
    findBy : function(fn, scope) {
        for(var i = 0, len = this.items.length; i < len; i++){
            if(fn.call(scope || window, this.items[i], this.keys[i])){
                return this.items[i];
            }
        }
        return null;
    },
    
    //<deprecated since="0.99">
    find : function() {
        throw new Error("[Ext.util.MixedCollection] Stateful: find has been deprecated. Please use findBy.");
    },
    //</deprecated>

    /**
     * Inserts an item at the specified index in the collection. Fires the {@link #add} event when complete.
     * @param {Number} index The index to insert the item at.
     * @param {String} key The key to associate with the new item, or the item itself.
     * @param {Object} o (optional) If the second parameter was a key, the new item.
     * @return {Object} The item inserted.
     */
    insert : function(index, key, obj){
        var myKey = key, myObj = obj;
        if(arguments.length == 2){
            myObj = myKey;
            myKey = this.getKey(myObj);
        }
        if(this.containsKey(myKey)){
            this.suspendEvents();
            this.removeByKey(myKey);
            this.resumeEvents();
        }
        if(index >= this.length){
            return this.add(myKey, myObj);
        }
        this.length++;
        this.items.splice(index, 0, myObj);
        if(typeof myKey != 'undefined' && myKey !== null){
            this.map[myKey] = myObj;
        }
        this.keys.splice(index, 0, myKey);
        this.fireEvent('add', index, myObj, myKey);
        return myObj;
    },

    /**
     * Remove an item from the collection.
     * @param {Object} o The item to remove.
     * @return {Object} The item removed or false if no item was removed.
     */
    remove : function(o){
        return this.removeAt(this.indexOf(o));
    },

    /**
     * Remove all items in the passed array from the collection.
     * @param {Array} items An array of items to be removed.
     * @return {Ext.util.MixedCollection} this object
     */
    removeAll : function(items){
        Ext.each(items || [], function(item) {
            this.remove(item);
        }, this);

        return this;
    },

    /**
     * Remove an item from a specified index in the collection. Fires the {@link #remove} event when complete.
     * @param {Number} index The index within the collection of the item to remove.
     * @return {Object} The item removed or false if no item was removed.
     */
    removeAt : function(index){
        if(index < this.length && index >= 0){
            this.length--;
            var o = this.items[index];
            this.items.splice(index, 1);
            var key = this.keys[index];
            if(typeof key != 'undefined'){
                delete this.map[key];
            }
            this.keys.splice(index, 1);
            this.fireEvent('remove', o, key);
            return o;
        }
        return false;
    },

    /**
     * Removed an item associated with the passed key fom the collection.
     * @param {String} key The key of the item to remove.
     * @return {Object} The item removed or false if no item was removed.
     */
    removeByKey : function(key){
        return this.removeAt(this.indexOfKey(key));
    },
    
    //<debug>
    removeKey : function() {
        console.warn('MixedCollection: removeKey has been deprecated. Please use removeByKey.');
        return this.removeByKey.apply(this, arguments);
    },
    //</debug>

    /**
     * Returns the number of items in the collection.
     * @return {Number} the number of items in the collection.
     */
    getCount : function(){
        return this.length;
    },

    /**
     * Returns index within the collection of the passed Object.
     * @param {Object} o The item to find the index of.
     * @return {Number} index of the item. Returns -1 if not found.
     */
    indexOf : function(o){
        return this.items.indexOf(o);
    },

    /**
     * Returns index within the collection of the passed key.
     * @param {String} key The key to find the index of.
     * @return {Number} index of the key.
     */
    indexOfKey : function(key){
        return this.keys.indexOf(key);
    },

    /**
     * Returns the item associated with the passed key OR index.
     * Key has priority over index.  This is the equivalent
     * of calling {@link #key} first, then if nothing matched calling {@link #getAt}.
     * @param {String/Number} key The key or index of the item.
     * @return {Object} If the item is found, returns the item.  If the item was not found, returns <tt>undefined</tt>.
     * If an item was found, but is a Class, returns <tt>null</tt>.
     */
    get : function(key) {
        var mk = this.map[key],
            item = mk !== undefined ? mk : (typeof key == 'number') ? this.items[key] : undefined;
        return typeof item != 'function' || this.allowFunctions ? item : null; // for prototype!
    },
    
    //<debug>
    item : function() {
        console.warn('MixedCollection: item has been deprecated. Please use get.');
        return this.get.apply(this, arguments);
    },
    //</debug>

    /**
     * Returns the item at the specified index.
     * @param {Number} index The index of the item.
     * @return {Object} The item at the specified index.
     */
    getAt : function(index) {
        return this.items[index];
    },

    //<debug>
    itemAt : function() {
        console.warn('MixedCollection: itemAt has been deprecated. Please use getAt.');
        return this.getAt.apply(this, arguments);
    },
    //</debug>
    
    /**
     * Returns the item associated with the passed key.
     * @param {String/Number} key The key of the item.
     * @return {Object} The item associated with the passed key.
     */
    getByKey : function(key) {
        return this.map[key];
    },

    //<debug>
    key : function() {
        console.warn('MixedCollection: key has been deprecated. Please use getByKey.');
        return this.getByKey.apply(this, arguments);
    },
    //</debug>
    
    /**
     * Returns true if the collection contains the passed Object as an item.
     * @param {Object} o  The Object to look for in the collection.
     * @return {Boolean} True if the collection contains the Object as an item.
     */
    contains : function(o){
        return this.indexOf(o) != -1;
    },

    /**
     * Returns true if the collection contains the passed Object as a key.
     * @param {String} key The key to look for in the collection.
     * @return {Boolean} True if the collection contains the Object as a key.
     */
    containsKey : function(key){
        return typeof this.map[key] != 'undefined';
    },

    /**
     * Removes all items from the collection.  Fires the {@link #clear} event when complete.
     */
    clear : function(){
        this.length = 0;
        this.items = [];
        this.keys = [];
        this.map = {};
        this.fireEvent('clear');
    },

    /**
     * Returns the first item in the collection.
     * @return {Object} the first item in the collection..
     */
    first : function() {
        return this.items[0];
    },

    /**
     * Returns the last item in the collection.
     * @return {Object} the last item in the collection..
     */
    last : function() {
        return this.items[this.length-1];
    },

    /**
     * @private
     * Performs the actual sorting based on a direction and a sorting function. Internally,
     * this creates a temporary array of all items in the MixedCollection, sorts it and then writes
     * the sorted array data back into this.items and this.keys
     * @param {String} property Property to sort by ('key', 'value', or 'index')
     * @param {String} dir (optional) Direction to sort 'ASC' or 'DESC'. Defaults to 'ASC'.
     * @param {Function} fn (optional) Comparison function that defines the sort order.
     * Defaults to sorting by numeric value.
     */
    _sort : function(property, dir, fn){
        var i, len,
            dsc   = String(dir).toUpperCase() == 'DESC' ? -1 : 1,

            //this is a temporary array used to apply the sorting function
            c     = [],
            keys  = this.keys,
            items = this.items;

        //default to a simple sorter function if one is not provided
        fn = fn || function(a, b) {
            return a - b;
        };

        //copy all the items into a temporary array, which we will sort
        for(i = 0, len = items.length; i < len; i++){
            c[c.length] = {
                key  : keys[i],
                value: items[i],
                index: i
            };
        }

        //sort the temporary array
        c.sort(function(a, b){
            var v = fn(a[property], b[property]) * dsc;
            if(v === 0){
                v = (a.index < b.index ? -1 : 1);
            }
            return v;
        });

        //copy the temporary array back into the main this.items and this.keys objects
        for(i = 0, len = c.length; i < len; i++){
            items[i] = c[i].value;
            keys[i]  = c[i].key;
        }

        this.fireEvent('sort', this);
    },

    /**
     * Sorts this collection by <b>item</b> value with the passed comparison function.
     * @param {Array/String} property Set of {@link Ext.util.Sorter} objects to sort by, or a property of each item
     * in the collection to sort on if using the 2 argument form
     * @param {String} direction Optional direction (used in the 2 argument signature of this method). Defaults to "ASC"
     */
    sort : function(property, direction) {
        //in case we were passed an array of sorters
        var sorters = property;
        
        //support for the simple case of sorting by property/direction
        if (Ext.isString(property)) {
            sorters = [new Ext.util.Sorter({
                property : property,
                direction: direction || "ASC"
            })];
        } else if (property instanceof Ext.util.Sorter) {
            sorters = [property];
        } else if (Ext.isObject(property)) {
            sorters = [new Ext.util.Sorter(property)];
        }
        
        var length = sorters.length;
        
        if (length == 0) {
            return;
        }
                
        //construct an amalgamated sorter function which combines all of the Sorters passed
        var sorterFn = function(r1, r2) {
            var result = sorters[0].sort(r1, r2),
                length = sorters.length,
                i;
            
                //if we have more than one sorter, OR any additional sorter functions together
                for (i = 1; i < length; i++) {
                    result = result || sorters[i].sort.call(this, r1, r2);
                }                
           
            return result;
        };
        
        this.sortBy(sorterFn);
    },
    
    /**
     * Sorts the collection by a single sorter function
     * @param {Function} sorterFn The function to sort by
     */
    sortBy: function(sorterFn) {
        var items  = this.items,
            keys   = this.keys,
            length = items.length,
            temp   = [],
            i;
        
        //first we create a copy of the items array so that we can sort it
        for (i = 0; i < length; i++) {
            temp[i] = {
                key  : keys[i],
                value: items[i],
                index: i
            };
        }
        
        temp.sort(function(a, b) {
            var v = sorterFn(a.value, b.value);
            if (v === 0) {
                v = (a.index < b.index ? -1 : 1);
            }
            
            return v;
        });
        
        //copy the temporary array back into the main this.items and this.keys objects
        for (i = 0; i < length; i++) {
            items[i] = temp[i].value;
            keys[i]  = temp[i].key;
        }
        
        this.fireEvent('sort', this);
    },

    /**
     * Reorders each of the items based on a mapping from old index to new index. Internally this
     * just translates into a sort. The 'sort' event is fired whenever reordering has occured.
     * @param {Object} mapping Mapping from old item index to new item index
     */
    reorder: function(mapping) {
        this.suspendEvents();

        var items = this.items,
            index = 0,
            length = items.length,
            order = [],
            remaining = [],
            oldIndex;

        //object of {oldPosition: newPosition} reversed to {newPosition: oldPosition}
        for (oldIndex in mapping) {
            order[mapping[oldIndex]] = items[oldIndex];
        }

        for (index = 0; index < length; index++) {
            if (mapping[index] == undefined) {
                remaining.push(items[index]);
            }
        }

        for (index = 0; index < length; index++) {
            if (order[index] == undefined) {
                order[index] = remaining.shift();
            }
        }

        this.clear();
        this.addAll(order);

        this.resumeEvents();
        this.fireEvent('sort', this);
    },

    /**
     * Sorts this collection by <b>key</b>s.
     * @param {String} direction (optional) 'ASC' or 'DESC'. Defaults to 'ASC'.
     * @param {Function} fn (optional) Comparison function that defines the sort order.
     * Defaults to sorting by case insensitive string.
     */
    sortByKey : function(dir, fn){
        this._sort('key', dir, fn || function(a, b){
            var v1 = String(a).toUpperCase(), v2 = String(b).toUpperCase();
            return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
        });
    },
    
    //<debug>
    keySort : function() {
        console.warn('MixedCollection: keySort has been deprecated. Please use sortByKey.');
        return this.sortByKey.apply(this, arguments);
    },
    //</debug>
    

    /**
     * Returns a range of items in this collection
     * @param {Number} startIndex (optional) The starting index. Defaults to 0.
     * @param {Number} endIndex (optional) The ending index. Defaults to the last item.
     * @return {Array} An array of items
     */
    getRange : function(start, end){
        var items = this.items;
        if(items.length < 1){
            return [];
        }
        start = start || 0;
        end = Math.min(typeof end == 'undefined' ? this.length-1 : end, this.length-1);
        var i, r = [];
        if(start <= end){
            for(i = start; i <= end; i++) {
                r[r.length] = items[i];
            }
        }else{
            for(i = start; i >= end; i--) {
                r[r.length] = items[i];
            }
        }
        return r;
    },

    /**
     * <p>Filters the objects in this collection by a set of {@link Ext.util.Filter Filter}s, or by a single
     * property/value pair with optional parameters for substring matching and case sensitivity. See
     * {@link Ext.util.Filter Filter} for an example of using Filter objects (preferred). Alternatively, 
     * MixedCollection can be easily filtered by property like this:</p>
<pre><code>
//create a simple store with a few people defined
var people = new Ext.util.MixedCollection();
people.addAll([
    {id: 1, age: 25, name: 'Ed'},
    {id: 2, age: 24, name: 'Tommy'},
    {id: 3, age: 24, name: 'Arne'},
    {id: 4, age: 26, name: 'Aaron'}
]);

//a new MixedCollection containing only the items where age == 24
var middleAged = people.filter('age', 24);
</code></pre>
     * 
     * 
     * @param {Array/String} property A property on your objects, or an array of {@link Ext.util.Filter Filter} objects
     * @param {String/RegExp} value Either string that the property values
     * should start with or a RegExp to test against the property
     * @param {Boolean} anyMatch (optional) True to match any part of the string, not just the beginning
     * @param {Boolean} caseSensitive (optional) True for case sensitive comparison (defaults to False).
     * @return {MixedCollection} The new filtered collection
     */
    filter : function(property, value, anyMatch, caseSensitive) {
        var filters = [];
        
        //support for the simple case of filtering by property/value
        if (Ext.isString(property)) {
            filters.push(new Ext.util.Filter({
                property     : property,
                value        : value,
                anyMatch     : anyMatch,
                caseSensitive: caseSensitive
            }));
        } else if (Ext.isArray(property) || property instanceof Ext.util.Filter) {
            filters = filters.concat(property);
        }
        
        //at this point we have an array of zero or more Ext.util.Filter objects to filter with,
        //so here we construct a function that combines these filters by ANDing them together
        var filterFn = function(record) {
            var isMatch = true,
                length = filters.length,
                i;

            for (i = 0; i < length; i++) {
                var filter = filters[i],
                    fn     = filter.filterFn,
                    scope  = filter.scope;

                isMatch = isMatch && fn.call(scope, record);
            }

            return isMatch;
        };
        
        return this.filterBy(filterFn);
    },

    /**
     * Filter by a function. Returns a <i>new</i> collection that has been filtered.
     * The passed function will be called with each object in the collection.
     * If the function returns true, the value is included otherwise it is filtered.
     * @param {Function} fn The function to be called, it will receive the args o (the object), k (the key)
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to this MixedCollection.
     * @return {MixedCollection} The new filtered collection
     */
    filterBy : function(fn, scope) {
        var newMC  = new Ext.util.MixedCollection(),
            keys   = this.keys, 
            items  = this.items,
            length = items.length,
            i;
            
        newMC.getKey = this.getKey;
        
        for (i = 0; i < length; i++) {
            if (fn.call(scope||this, items[i], keys[i])) {
                newMC.add(keys[i], items[i]);
            }
        }
        
        return newMC;
    },

    /**
     * Finds the index of the first matching object in this collection by a specific property/value.
     * @param {String} property The name of a property on your objects.
     * @param {String/RegExp} value A string that the property values
     * should start with or a RegExp to test against the property.
     * @param {Number} start (optional) The index to start searching at (defaults to 0).
     * @param {Boolean} anyMatch (optional) True to match any part of the string, not just the beginning.
     * @param {Boolean} caseSensitive (optional) True for case sensitive comparison.
     * @return {Number} The matched index or -1
     */
    findIndex : function(property, value, start, anyMatch, caseSensitive){
        if(Ext.isEmpty(value, false)){
            return -1;
        }
        value = this.createValueMatcher(value, anyMatch, caseSensitive);
        return this.findIndexBy(function(o){
            return o && value.test(o[property]);
        }, null, start);
    },

    /**
     * Find the index of the first matching object in this collection by a function.
     * If the function returns <i>true</i> it is considered a match.
     * @param {Function} fn The function to be called, it will receive the args o (the object), k (the key).
     * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to this MixedCollection.
     * @param {Number} start (optional) The index to start searching at (defaults to 0).
     * @return {Number} The matched index or -1
     */
    findIndexBy : function(fn, scope, start){
        var k = this.keys, it = this.items;
        for(var i = (start||0), len = it.length; i < len; i++){
            if(fn.call(scope||this, it[i], k[i])){
                return i;
            }
        }
        return -1;
    },

    /**
     * Returns a regular expression based on the given value and matching options. This is used internally for finding and filtering,
     * and by Ext.data.Store#filter
     * @private
     * @param {String} value The value to create the regex for. This is escaped using Ext.escapeRe
     * @param {Boolean} anyMatch True to allow any match - no regex start/end line anchors will be added. Defaults to false
     * @param {Boolean} caseSensitive True to make the regex case sensitive (adds 'i' switch to regex). Defaults to false.
     * @param {Boolean} exactMatch True to force exact match (^ and $ characters added to the regex). Defaults to false. Ignored if anyMatch is true.
     */
    createValueMatcher : function(value, anyMatch, caseSensitive, exactMatch) {
        if (!value.exec) { // not a regex
            var er = Ext.util.Format.escapeRegex;
            value = String(value);

            if (anyMatch === true) {
                value = er(value);
            } else {
                value = '^' + er(value);
                if (exactMatch === true) {
                    value += '$';
                }
            }
            value = new RegExp(value, caseSensitive ? '' : 'i');
         }
         return value;
    },

    /**
     * Creates a shallow copy of this collection
     * @return {MixedCollection}
     */
    clone : function(){
        var r = new Ext.util.MixedCollection();
        var k = this.keys, it = this.items;
        for(var i = 0, len = it.length; i < len; i++){
            r.add(k[i], it[i]);
        }
        r.getKey = this.getKey;
        return r;
    }
});
/*
 * This method calls {@link #item item()}.
 * Returns the item associated with the passed key OR index. Key has priority
 * over index.  This is the equivalent of calling {@link #key} first, then if
 * nothing matched calling {@link #getAt}.
 * @param {String/Number} key The key or index of the item.
 * @return {Object} If the item is found, returns the item.  If the item was
 * not found, returns <tt>undefined</tt>. If an item was found, but is a Class,
 * returns <tt>null</tt>.
 */
// Ext.util.MixedCollection.prototype.get = Ext.util.MixedCollection.prototype.item;

/**
 * @class Ext.AbstractManager
 * @extends Object
 * @ignore
 * Base Manager class - extended by ComponentMgr and PluginMgr
 */
Ext.AbstractManager = Ext.extend(Object, {
    typeName: 'type',

    constructor: function(config) {
        Ext.apply(this, config || {});

        /**
         * Contains all of the items currently managed
         * @property all
         * @type Ext.util.MixedCollection
         */
        this.all = new Ext.util.HashMap();

        this.types = {};
    },

    /**
     * Returns a component by {@link Ext.Component#id id}.
     * For additional details see {@link Ext.util.MixedCollection#get}.
     * @param {String} id The component {@link Ext.Component#id id}
     * @return Ext.Component The Component, <code>undefined</code> if not found, or <code>null</code> if a
     * Class was found.
     */
    get : function(id) {
        return this.all.get(id);
    },

    /**
     * Registers an item to be managed
     * @param {Mixed} item The item to register
     */
    register: function(item) {
        this.all.add(item);
    },

    /**
     * Unregisters a component by removing it from this manager
     * @param {Mixed} item The item to unregister
     */
    unregister: function(item) {
        this.all.remove(item);
    },

    /**
     * <p>Registers a new Component constructor, keyed by a new
     * {@link Ext.Component#xtype}.</p>
     * <p>Use this method (or its alias {@link Ext#reg Ext.reg}) to register new
     * subclasses of {@link Ext.Component} so that lazy instantiation may be used when specifying
     * child Components.
     * see {@link Ext.Container#items}</p>
     * @param {String} xtype The mnemonic string by which the Component class may be looked up.
     * @param {Constructor} cls The new Component class.
     */
    registerType : function(type, cls) {
        this.types[type] = cls;
        cls[this.typeName] = type;
    },

    /**
     * Checks if a Component type is registered.
     * @param {Ext.Component} xtype The mnemonic string by which the Component class may be looked up
     * @return {Boolean} Whether the type is registered.
     */
    isRegistered : function(type){
        return this.types[type] !== undefined;
    },

    /**
     * Creates and returns an instance of whatever this manager manages, based on the supplied type and config object
     * @param {Object} config The config object
     * @param {String} defaultType If no type is discovered in the config object, we fall back to this type
     * @return {Mixed} The instance of whatever this manager is managing
     */
    create: function(config, defaultType) {
        var type        = config[this.typeName] || config.type || defaultType,
            Constructor = this.types[type];

        if (Constructor == undefined) {
            throw new Error(Ext.util.Format.format("The '{0}' type has not been registered with this manager", type));
        }

        return new Constructor(config);
    },

    /**
     * Registers a function that will be called when a Component with the specified id is added to the manager. This will happen on instantiation.
     * @param {String} id The component {@link Ext.Component#id id}
     * @param {Function} fn The callback function
     * @param {Object} scope The scope (<code>this</code> reference) in which the callback is executed. Defaults to the Component.
     */
    onAvailable : function(id, fn, scope){
        var all = this.all;

        all.on("add", function(index, o){
            if (o.id == id) {
                fn.call(scope || o, o);
                all.un("add", fn, scope);
            }
        });
    },
    
    /**
     * Executes the specified function once for each item in the collection.
     * Returning false from the function will cease iteration.
     * 
     * The paramaters passed to the function are:
     * <div class="mdetail-params"><ul>
     * <li><b>key</b> : String<p class="sub-desc">The key of the item</p></li>
     * <li><b>value</b> : Number<p class="sub-desc">The value of the item</p></li>
     * <li><b>length</b> : Number<p class="sub-desc">The total number of items in the collection</p></li>
     * </ul></div>
     * @param {Object} fn The function to execute.
     * @param {Object} scope The scope to execute in. Defaults to <tt>this</tt>.
     */
    each: function(fn, scope){
        this.all.each(fn, scope || this);    
    },
    
    /**
     * Gets the number of items in the collection.
     * @return {Number} The number of items in the collection.
     */
    getCount: function(){
        return this.all.getCount();
    }
});

/**
 * @class Ext.util.DelayedTask
 * <p> The DelayedTask class provides a convenient way to "buffer" the execution of a method,
 * performing setTimeout where a new timeout cancels the old timeout. When called, the
 * task will wait the specified time period before executing. If durng that time period,
 * the task is called again, the original call will be cancelled. This continues so that
 * the function is only called a single time for each iteration.</p>
 * <p>This method is especially useful for things like detecting whether a user has finished
 * typing in a text field. An example would be performing validation on a keypress. You can
 * use this class to buffer the keypress events for a certain number of milliseconds, and
 * perform only if they stop for that amount of time.  Usage:</p><pre><code>
var task = new Ext.util.DelayedTask(function(){
    alert(Ext.getDom('myInputField').value.length);
});
// Wait 500ms before calling our function. If the user presses another key
// during that 500ms, it will be cancelled and we'll wait another 500ms.
Ext.get('myInputField').on('keypress', function(){
    task.{@link #delay}(500);
});
 * </code></pre>
 * <p>Note that we are using a DelayedTask here to illustrate a point. The configuration
 * option <tt>buffer</tt> for {@link Ext.util.Observable#addListener addListener/on} will
 * also setup a delayed task for you to buffer events.</p>
 * @constructor The parameters to this constructor serve as defaults and are not required.
 * @param {Function} fn (optional) The default function to call.
 * @param {Object} scope (optional) The default scope (The <code><b>this</b></code> reference) in which the
 * function is called. If not specified, <code>this</code> will refer to the browser window.
 * @param {Array} args (optional) The default Array of arguments.
 */
Ext.util.DelayedTask = function(fn, scope, args) {
    var me = this,
        id,
        call = function() {
            clearInterval(id);
            id = null;
            fn.apply(scope, args || []);
        };

    /**
     * Cancels any pending timeout and queues a new one
     * @param {Number} delay The milliseconds to delay
     * @param {Function} newFn (optional) Overrides function passed to constructor
     * @param {Object} newScope (optional) Overrides scope passed to constructor. Remember that if no scope
     * is specified, <code>this</code> will refer to the browser window.
     * @param {Array} newArgs (optional) Overrides args passed to constructor
     */
    this.delay = function(delay, newFn, newScope, newArgs) {
        me.cancel();
        fn = newFn || fn;
        scope = newScope || scope;
        args = newArgs || args;
        id = setInterval(call, delay);
    };

    /**
     * Cancel the last queued timeout
     */
    this.cancel = function(){
        if (id) {
            clearInterval(id);
            id = null;
        }
    };
};
/**
 * @class Ext.util.GeoLocation
 * @extends Ext.util.Observable
 *
 * Provides a cross browser class for retrieving location information.<br/>
 * <br/>
 * Based on the <a href="http://dev.w3.org/geo/api/spec-source.html">Geolocation API Specification</a>.<br/>
 * If the browser does not implement that specification (Internet Explorer 6-8), it can fallback on Google Gears
 * as long as the browser has it installed, and the following javascript file from google is included on the page:
 * <pre><code>&lt;script type="text/javascript" src="http://code.google.com/apis/gears/gears_init.js"&gt;&lt;/script&gt;</code></pre>
 * <br/>
 * Note: Location implementations are only required to return timestamp, longitude, latitude, and accuracy.<br/>
 * Other properties (altitude, altitudeAccuracy, heading, speed) can be null or sporadically returned.<br/>
 * <br/>
 * When instantiated, by default this class immediately begins tracking location information, 
 * firing a {@link #locationupdate} event when new location information is available.  To disable this 
 * location tracking (which may be battery intensive on mobile devices), set {@link #autoUpdate} to false.<br/>
 * When this is done, only calls to {@link #updateLocation} will trigger a location retrieval.<br/>
 * <br/>
 * A {@link #locationerror} event is raised when an error occurs retrieving the location, either due to a user
 * denying the application access to it, or the browser not supporting it.<br/>
 * <br/>
 * The below code shows a GeoLocation making a single retrieval of location information.
 * <pre><code>
var geo = new Ext.util.GeoLocation({
    autoUpdate: false,
    listeners: {
        locationupdate: function (geo) {
            alert('New latitude: ' + geo.latitude);
        },
        locationerror: function (   geo,
                                    bTimeout, 
                                    bPermissionDenied, 
                                    bLocationUnavailable, 
                                    message) {
            if(bTimeout){
                alert('Timeout occurred.');
            }
            else{
                alert('Error occurred.');
            }
        }
    }
});
geo.updateLocation();</code></pre>
 */
Ext.util.GeoLocation = Ext.extend(Ext.util.Observable, {
    /**
     * @cfg {Boolean} autoUpdate
     * Defaults to true.<br/>
     * When set to true, continually monitor the location of the device
     * (beginning immediately) and fire {@link #locationupdate}/{@link #locationerror} events.<br/>
     * <br/>
     * When using google gears, if the user denies access or another error occurs, this will be reset to false.
     */
    autoUpdate: true,

    //Position interface
    /**
     * Read-only property representing the last retrieved 
     * geographical coordinate specified in degrees.
     * @type Number
     */
    latitude: null,
    /**
     * Read-only property representing the last retrieved 
     * geographical coordinate specified in degrees.
     * @type Number
     */
    longitude: null,
    /**
     * Read-only property representing the last retrieved 
     * accuracy level of the latitude and longitude coordinates, 
     * specified in meters.<br/>
     * This will always be a non-negative number.<br/>
     * This corresponds to a 95% confidence level.
     * @type Number
     */
    accuracy: null,
    /**
     * Read-only property representing the last retrieved 
     * height of the position, specified in meters above the ellipsoid
     * <a href="http://dev.w3.org/geo/api/spec-source.html#ref-wgs">[WGS84]</a>.
     * @type Number/null
     */
    altitude: null,
    /**
     * Read-only property representing the last retrieved 
     * accuracy level of the altitude coordinate, specified in meters.<br/>
     * If altitude is not null then this will be a non-negative number.
     * Otherwise this returns null.<br/>
     * This corresponds to a 95% confidence level.
     * @type Number/null
     */
    altitudeAccuracy: null,
    /**
     * Read-only property representing the last retrieved 
     * direction of travel of the hosting device, 
     * specified in non-negative degrees between 0 and 359, 
     * counting clockwise relative to the true north.<br/>
     * If speed is 0 (device is stationary), then this returns NaN
     * @type Number/null
     */
    heading: null,
    /**
     * Read-only property representing the last retrieved 
     * current ground speed of the device, specified in meters per second.<br/>
     * If this feature is unsupported by the device, this returns null.<br/>
     * If the device is stationary, this returns 0, 
     * otherwise it returns a non-negative number.
     * @type Number/null
     */
    speed: null,
    /**
     * Read-only property representing when the last retrieved 
     * positioning information was acquired by the device.
     * @type Date
     */
    timestamp: null,

    //PositionOptions interface
    /**
     * @cfg {Boolean} allowHighAccuracy
     * Defaults to false.<br/>
     * When set to true, provide a hint that the application would like to receive 
     * the best possible results. This may result in slower response times or increased power consumption. 
     * The user might also deny this capability, or the device might not be able to provide more accurate 
     * results than if this option was set to false.
     */
    allowHighAccuracy: false,
    
    /**
     * @cfg {Number} timeout
     * Defaults to Infinity.<br/>
     * The maximum number of milliseconds allowed to elapse between a location update operation
     * and the corresponding {@link #locationupdate} event being raised.  If a location was not successfully
     * acquired before the given timeout elapses (and no other internal errors have occurred in this interval),
     * then a {@link #locationerror} event will be raised indicating a timeout as the cause.<br/>
     * Note that the time that is spent obtaining the user permission is <b>not</b> included in the period 
     * covered by the timeout.  The timeout attribute only applies to the location acquisition operation.<br/>
     * In the case of calling updateLocation, the {@link #locationerror} event will be raised only once.<br/>
     * If {@link #autoUpdate} is set to true, the {@link #locationerror} event could be raised repeatedly.
     * The first timeout is relative to the moment {@link #autoUpdate} was set to true 
     * (or this {@link Ext.util.GeoLocation} was initialized with the {@link #autoUpdate} config option set to true).
     * Subsequent timeouts are relative to the moment when the device determines that it's position has changed.
     */
    timeout: Infinity,
    /**
     * @cfg {Number} maximumAge
     * Defaults to 0.<br/>
     * This option indicates that the application is willing to accept cached location information whose age 
     * is no greater than the specified time in milliseconds. If maximumAge is set to 0, an attempt to retrieve 
     * new location information is made immediately.<br/>
     * Setting the maximumAge to Infinity returns a cached position regardless of its age.<br/>
     * If the device does not have cached location information available whose age is no 
     * greater than the specified maximumAge, then it must acquire new location information.<br/>
     * For example, if location information no older than 10 minutes is required, set this property to 600000.
     */
    maximumAge: 0,
    /**
     * Changes the {@link #maximumAge} option and restarts any active 
     * location monitoring with the updated setting.
     * @param {Number} maximumAge The value to set the maximumAge option to.
     */
    setMaximumAge: function(maximumAge) {
        this.maximumAge = maximumAge;
        this.setAutoUpdate(this.autoUpdate);
    },
    /**
     * Changes the {@link #timeout} option and restarts any active 
     * location monitoring with the updated setting.
     * @param {Number} timeout The value to set the timeout option to.
     */
    setTimeout: function(timeout) {
        this.timeout = timeout;
        this.setAutoUpdate(this.autoUpdate);
    },
    /**
     * Changes the {@link #allowHighAccuracy} option and restarts any active 
     * location monitoring with the updated setting.
     * @param {Number} allowHighAccuracy The value to set the allowHighAccuracy option to.
     */
    setAllowHighAccuracy: function(allowHighAccuracy) {
        this.allowHighAccuracy = allowHighAccuracy;
        this.setAutoUpdate(this.autoUpdate);
    },
    
    //<deprecated since=0.99>
    setEnableHighAccuracy : function() {
        console.warn("GeoLocation: setEnableHighAccuracy has been deprecated. Please use setAllowHighAccuracy.");
        return this.setAllowHighAccuracy.apply(this, arguments);
    },
    //</deprecated>

    // private Object geolocation provider
    provider : null,
    // private Number tracking current watchPosition
    watchOperation : null,

    constructor : function(config) {
        Ext.apply(this, config);
        
        //<deprecated since=0.99>
        if (Ext.isDefined(this.enableHighAccuracy)) {
            console.warn("GeoLocation: enableHighAccuracy has been removed. Please use allowHighAccuracy.");
            this.allowHighAccuracy = this.enableHighAccuracy;
        }
        //</deprecated>

        this.coords = this; //@deprecated

        if (Ext.supports.GeoLocation) {
            this.provider = this.provider || 
                (navigator.geolocation ? navigator.geolocation : 
                (window.google || {}).gears ? google.gears.factory.create('beta.geolocation') : null);           
        }
        
        this.addEvents(
            /**
             * @private
             * @event update
             * @param {Ext.util.GeoLocation/False} coords
             * Will return false if geolocation fails (disabled, denied access, timed out).
             * @param {Ext.util.GeoLocation} this
             * @deprecated
             */
            'update',
            /**
             * @event locationerror
             * Raised when a location retrieval operation failed.<br/>
             * In the case of calling updateLocation, this event will be raised only once.<br/>
             * If {@link #autoUpdate} is set to true, this event could be raised repeatedly.
             * The first error is relative to the moment {@link #autoUpdate} was set to true 
             * (or this {@link Ext.util.GeoLocation} was initialized with the {@link #autoUpdate} config option set to true).
             * Subsequent errors are relative to the moment when the device determines that it's position has changed.
             * @param {Ext.util.GeoLocation} this
             * @param {Boolean} timeout
             * Boolean indicating a timeout occurred
             * @param {Boolean} permissionDenied
             * Boolean indicating the user denied the location request
             * @param {Boolean} locationUnavailable
             * Boolean indicating that the location of the device could not be determined.<br/>
             * For instance, one or more of the location providers used in the location acquisition 
             * process reported an internal error that caused the process to fail entirely.
             * @param {String} message
             * An error message describing the details of the error encountered.<br/>
             * This attribute is primarily intended for debugging and should not be used 
             * directly in an application user interface.
             */
            'locationerror',
            /**
             * @event locationupdate
             * Raised when a location retrieval operation has been completed successfully.
             * @param {Ext.util.GeoLocation} this
             * Retrieve the current location information from the GeoLocation object by using the read-only 
             * properties latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, and speed.
             */
            'locationupdate'
        );

        Ext.util.GeoLocation.superclass.constructor.call(this);

        if(this.autoUpdate){
            var me = this;
            setTimeout(function(){
                me.setAutoUpdate(me.autoUpdate);
            }, 0);
        }
    },

    /**
     * Enabled/disables the auto-retrieval of the location information.<br/>
     * If called with autoUpdate=true, it will execute an immediate location update
     * and continue monitoring for location updates.<br/>
     * If autoUpdate=false, any current location change monitoring will be disabled.
     * @param {Boolean} autoUpdate Whether to start/stop location monitoring.
     * @return {Boolean} If enabling autoUpdate, returns false if the location tracking 
     * cannot begin due to an error supporting geolocation.
     * A locationerror event is also fired.
     */
    setAutoUpdate : function(autoUpdate) {
        if (this.watchOperation !== null) {
            this.provider.clearWatch(this.watchOperation);
            this.watchOperation = null;
        }
        if (!autoUpdate) {
            return true;
        }
        if (!Ext.supports.GeoLocation) {
            this.fireEvent('locationerror', this, false, false, true, null);
            return false;
        }
        try{
            this.watchOperation = this.provider.watchPosition(
                Ext.createDelegate(this.fireUpdate, this), 
                Ext.createDelegate(this.fireError, this), 
                this.parseOptions());
        }
        catch(e){
            this.autoUpdate = false;
            this.fireEvent('locationerror', this, false, false, true, e.message);
            return false;
        }
        return true;
    },

    /**
     * Executes a onetime location update operation, 
     * raising either a {@link #locationupdate} or {@link #locationerror} event.<br/>
     * Does not interfere with or restart ongoing location monitoring.
     * @param {Function} callback
     * A callback method to be called when the location retrieval has been completed.<br/>
     * Will be called on both success and failure.<br/>
     * The method will be passed one parameter, {@link Ext.GeoLocation} (<b>this</b> reference),
     * set to null on failure.
     * <pre><code>
geo.updateLocation(function (geo) {
    alert('Latitude: ' + (geo != null ? geo.latitude : 'failed'));
});
</code></pre>
     * @param {Object} scope (optional)
     * (optional) The scope (<b>this</b> reference) in which the handler function is executed.
     * <b>If omitted, defaults to the object which fired the event.</b>
     * <!--positonOptions undocumented param, see W3C spec-->
     */
    updateLocation : function(callback, scope, positionOptions) {
        var me = this;

        var failFunction = function(message, error){
            if(error){
                me.fireError(error);
            }
            else{
                me.fireEvent('locationerror', me, false, false, true, message);
            }
            if(callback){
                callback.call(scope || me, null, me); //last parameter for legacy purposes
            }
            me.fireEvent('update', false, me); //legacy, deprecated
        };

        if (!Ext.supports.GeoLocation) {
            setTimeout(function() {
                failFunction(null);
            }, 0);
            return;
        }

        try{
            this.provider.getCurrentPosition(
                //success callback
                function(position){
                    me.fireUpdate(position);
                    if(callback){
                        callback.call(scope || me, me, me); //last parameter for legacy purposes
                    }
                    me.fireEvent('update', me, me); //legacy, deprecated
                },
                //error callback
                function(error){
                    failFunction(null, error);
                },
                positionOptions ? positionOptions : this.parseOptions());
        }
        catch(e){
            setTimeout(function(){
                failFunction(e.message);
            }, 0);
        }
    },

    // private
    fireUpdate: function(position){
        this.timestamp = position.timestamp;
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.accuracy = position.coords.accuracy;
        this.altitude = position.coords.altitude;
        this.altitudeAccuracy = position.coords.altitudeAccuracy;
        
        //google doesn't provide these two
        this.heading = typeof position.coords.heading == 'undefined' ? null : position.coords.heading;
        this.speed = typeof position.coords.speed == 'undefined' ? null : position.coords.speed;
        this.fireEvent('locationupdate', this);
    },
    fireError: function(error){
        this.fireEvent('locationerror', this,
            error.code == error.TIMEOUT, 
            error.code == error.PERMISSION_DENIED, 
            error.code == error.POSITION_UNAVAILABLE,
            error.message == undefined ? null : error.message);
    },
    parseOptions: function(){
        var ret = { 
            maximumAge: this.maximumAge, 
            allowHighAccuracy: this.allowHighAccuracy
        };
        //Google doesn't like Infinity
        if(this.timeout !== Infinity){
            ret.timeout = this.timeout;
        }
        return ret;
    },

    /**
     * @private
     * Returns cached coordinates, and updates if there are no cached coords yet.
     * @deprecated
     */
    getLocation : function(callback, scope) {
        var me = this;
        if(this.latitude !== null){
            callback.call(scope || me, me, me);
        }
        else {
            me.updateLocation(callback, scope);
        }
    }
});
/**
 * @class Ext.util.Region
 * @extends Object
 *
 * Represents a rectangular region and provides a number of utility methods
 * to compare regions.
 */
Ext.util.Region = Ext.extend(Object, {
    /**
     * @constructor
     * @param {Number} top Top
     * @param {Number} right Right
     * @param {Number} bottom Bottom
     * @param {Number} left Left
     */
    constructor : function(t, r, b, l) {
        var me = this;
        me.top = t;
        me[1] = t;
        me.right = r;
        me.bottom = b;
        me.left = l;
        me[0] = l;
    },

    /**
     * Checks if this region completely contains the region that is passed in.
     * @param {Ext.util.Region} region
     */
    contains : function(region) {
        var me = this;
        return (region.left >= me.left &&
                region.right <= me.right &&
                region.top >= me.top &&
                region.bottom <= me.bottom);

    },

    /**
     * Checks if this region intersects the region passed in.
     * @param {Ext.util.Region} region
     * @return {Ext.util.Region/Boolean} Returns the intersected region or false if there is no intersection.
     */
    intersect : function(region) {
        var me = this,
            t = Math.max(me.top, region.top),
            r = Math.min(me.right, region.right),
            b = Math.min(me.bottom, region.bottom),
            l = Math.max(me.left, region.left);

        if (b > t && r > l) {
            return new Ext.util.Region(t, r, b, l);
        }
        else {
            return false;
        }
    },

    /**
     * Returns the smallest region that contains the current AND targetRegion.
     * @param {Ext.util.Region} region
     */
    union : function(region) {
        var me = this,
            t = Math.min(me.top, region.top),
            r = Math.max(me.right, region.right),
            b = Math.max(me.bottom, region.bottom),
            l = Math.min(me.left, region.left);

        return new Ext.util.Region(t, r, b, l);
    },

    /**
     * Modifies the current region to be constrained to the targetRegion.
     * @param {Ext.util.Region} targetRegion
     */
    constrainTo : function(r) {
        var me = this,
            constrain = Ext.util.Numbers.constrain;
        me.top = constrain(me.top, r.top, r.bottom);
        me.bottom = constrain(me.bottom, r.top, r.bottom);
        me.left = constrain(me.left, r.left, r.right);
        me.right = constrain(me.right, r.left, r.right);
        return me;
    },

    /**
     * Modifies the current region to be adjusted by offsets.
     * @param {Number} top top offset
     * @param {Number} right right offset
     * @param {Number} bottom bottom offset
     * @param {Number} left left offset
     */
    adjust : function(t, r, b, l) {
        var me = this;
        me.top += t;
        me.left += l;
        me.right += r;
        me.bottom += b;
        return me;
    },

    /**
     * Get the offset amount of a point outside the region
     * @param {String} axis optional
     * @param {Ext.util.Point} p the point
     * @return {Ext.util.Offset}
     */
    getOutOfBoundOffset: function(axis, p) {
        if (!Ext.isObject(axis)) {
            if (axis == 'x') {
                return this.getOutOfBoundOffsetX(p);
            } else {
                return this.getOutOfBoundOffsetY(p);
            }
        } else {
            p = axis;
            var d = new Ext.util.Offset();
                d.x = this.getOutOfBoundOffsetX(p.x);
                d.y = this.getOutOfBoundOffsetY(p.y);
            return d;
        }

    },

    /**
     * Get the offset amount on the x-axis
     * @param {Number} p the offset
     * @return {Number}
     */
    getOutOfBoundOffsetX: function(p) {
        if (p <= this.left) {
            return this.left - p;
        } else if (p >= this.right) {
            return this.right - p;
        }

        return 0;
    },

    /**
     * Get the offset amount on the y-axis
     * @param {Number} p the offset
     * @return {Number}
     */
    getOutOfBoundOffsetY: function(p) {
        if (p <= this.top) {
            return this.top - p;
        } else if (p >= this.bottom) {
            return this.bottom - p;
        }

        return 0;
    },

    /**
     * Check whether the point / offset is out of bound
     * @param {String} axis optional
     * @param {Ext.util.Point/Number} p the point / offset
     * @return {Boolean}
     */
    isOutOfBound: function(axis, p) {
        if (!Ext.isObject(axis)) {
            if (axis == 'x') {
                return this.isOutOfBoundX(p);
            } else {
                return this.isOutOfBoundY(p);
            }
        } else {
            p = axis;
            return (this.isOutOfBoundX(p.x) || this.isOutOfBoundY(p.y));
        }
    },

    /**
     * Check whether the offset is out of bound in the x-axis
     * @param {Number} p the offset
     * @return {Boolean}
     */
    isOutOfBoundX: function(p) {
        return (p < this.left || p > this.right);
    },

    /**
     * Check whether the offset is out of bound in the y-axis
     * @param {Number} p the offset
     * @return {Boolean}
     */
    isOutOfBoundY: function(p) {
        return (p < this.top || p > this.bottom);
    },

    /*
     * Restrict a point within the region by a certain factor.
     * @param {String} axis Optional
     * @param {Ext.util.Point/Ext.util.Offset/Object} p
     * @param {Number} factor
     * @return {Ext.util.Point/Ext.util.Offset/Object/Number}
     */
    restrict: function(axis, p, factor) {
        if (Ext.isObject(axis)) {
            var newP;

            factor = p;
            p = axis;

            if (p.copy) {
                newP = p.copy();
            }
            else {
                newP = {
                    x: p.x,
                    y: p.y
                };
            }

            newP.x = this.restrictX(p.x, factor);
            newP.y = this.restrictY(p.y, factor);
            return newP;
        } else {
            if (axis == 'x') {
                return this.restrictX(p, factor);
            } else {
                return this.restrictY(p, factor);
            }
        }
    },

    /*
     * Restrict an offset within the region by a certain factor, on the x-axis
     * @param {Number} p
     * @param {Number} factor The factor, optional, defaults to 1
     * @return
     */
    restrictX : function(p, factor) {
        if (!factor) {
            factor = 1;
        }

        if (p <= this.left) {
            p -= (p - this.left) * factor;
        }
        else if (p >= this.right) {
            p -= (p - this.right) * factor;
        }
        return p;
    },

    /*
     * Restrict an offset within the region by a certain factor, on the y-axis
     * @param {Number} p
     * @param {Number} factor The factor, optional, defaults to 1
     */
    restrictY : function(p, factor) {
        if (!factor) {
            factor = 1;
        }

        if (p <= this.top) {
            p -= (p - this.top) * factor;
        }
        else if (p >= this.bottom) {
            p -= (p - this.bottom) * factor;
        }
        return p;
    },

    /*
     * Get the width / height of this region
     * @return {Object} an object with width and height properties
     */
    getSize: function() {
        return {
            width: this.right - this.left,
            height: this.bottom - this.top
        };
    },

    /**
     * Copy a new instance
     * @return {Ext.util.Region}
     */
    copy: function() {
        return new Ext.util.Region(this.top, this.right, this.bottom, this.left);
    },

    /**
     * Dump this to an eye-friendly string, great for debugging
     * @return {String}
     */
    toString: function() {
        return "Region[" + this.top + "," + this.right + "," + this.bottom + "," + this.left + "]";
    },


    /**
     * Translate this region by the given offset amount
     * @param {Ext.util.Offset/Object} offset
     * @return {Ext.util.Region} this This Region
     */
    translateBy: function(offset) {
        this.left += offset.x;
        this.right += offset.x;
        this.top += offset.y;
        this.bottom += offset.y;

        return this;
    },

    /**
     * Round all the properties of this region
     * @return {Ext.util.Region} this This Region
     */
    round: function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);

        return this;
    },

    /**
     * Check whether this region is equivalent to the given region
     * @param {Ext.util.Region} region The region to compare with
     * @return {Boolean}
     */
    equals: function(region) {
        return (this.top == region.top && this.right == region.right && this.bottom == region.bottom && this.left == region.left)
    }
});

/**
 * @static
 * @param {Mixed} el A string, DomElement or Ext.Element representing an element
 * on the page.
 * @returns {Ext.util.Region} region
 * Retrieves an Ext.util.Region for a particular element.
 */
Ext.util.Region.getRegion = function(el) {
    return Ext.fly(el).getPageBox(true);
};

/**
 * @static
 * @param {Object} o An object with top, right, bottom, left properties
 * @return {Ext.util.Region} region The region constructed based on the passed object
 */
Ext.util.Region.from = function(o) {
    return new Ext.util.Region(o.top, o.right, o.bottom, o.left);
};
/**
 * @class Ext.util.Point
 * @extends Object
 *
 * Represents a 2D point with x and y properties, useful for comparison and instantiation
 * from an event:
 * <pre><code>
 * var point = Ext.util.Point.fromEvent(e);
 * </code></pre>
 */

Ext.util.Point = Ext.extend(Object, {
    constructor: function(x, y) {
        this.x = (x != null && !isNaN(x)) ? x : 0;
        this.y = (y != null && !isNaN(y)) ? y : 0;

        return this;
    },

    /**
     * Copy a new instance of this point
     * @return {Ext.util.Point} the new point
     */
    copy: function() {
        return new Ext.util.Point(this.x, this.y);
    },

    /**
     * Copy the x and y values of another point / object to this point itself
     * @param {}
     * @return {Ext.util.Point} this This point
     */
    copyFrom: function(p) {
        this.x = p.x;
        this.y = p.y;

        return this;
    },

    /**
     * Returns a human-eye-friendly string that represents this point,
     * useful for debugging
     * @return {String}
     */
    toString: function() {
        return "Point[" + this.x + "," + this.y + "]";
    },

    /**
     * Compare this point and another point
     * @param {Ext.util.Point/Object} The point to compare with, either an instance
     * of Ext.util.Point or an object with x and y properties
     * @return {Boolean} Returns whether they are equivalent
     */
    equals: function(p) {
        return (this.x == p.x && this.y == p.y);
    },

    /**
     * Whether the given point is not away from this point within the given threshold amount
     * @param {Ext.util.Point/Object} The point to check with, either an instance
     * of Ext.util.Point or an object with x and y properties
     * @param {Object/Number} threshold Can be either an object with x and y properties or a number
     * @return {Boolean}
     */
    isWithin: function(p, threshold) {
        if (!Ext.isObject(threshold)) {
            threshold = {x: threshold};
            threshold.y = threshold.x;
        }

        return (this.x <= p.x + threshold.x && this.x >= p.x - threshold.x &&
                this.y <= p.y + threshold.y && this.y >= p.y - threshold.y);
    },

    /**
     * Translate this point by the given amounts
     * @param {Number} x Amount to translate in the x-axis
     * @param {Number} y Amount to translate in the y-axis
     * @return {Boolean}
     */
    translate: function(x, y) {
        if (x != null && !isNaN(x))
            this.x += x;

        if (y != null && !isNaN(y))
            this.y += y;
    },

    /**
     * Compare this point with another point when the x and y values of both points are rounded. E.g:
     * [100.3,199.8] will equals to [100, 200]
     * @param {Ext.util.Point/Object} The point to compare with, either an instance
     * of Ext.util.Point or an object with x and y properties
     * @return {Boolean}
     */
    roundedEquals: function(p) {
        return (Math.round(this.x) == Math.round(p.x) && Math.round(this.y) == Math.round(p.y));
    }
});

/**
 * Returns a new instance of Ext.util.Point base on the pageX / pageY values of the given event
 * @static
 * @param {Event} e The event
 * @returns Ext.util.Point
 */
Ext.util.Point.fromEvent = function(e) {
    var a = (e.changedTouches && e.changedTouches.length > 0) ? e.changedTouches[0] : e;
    return new Ext.util.Point(a.pageX, a.pageY);
};
Ext.util.Offset = Ext.extend(Object, {
    constructor: function(x, y) {
        this.x = (x != null && !isNaN(x)) ? x : 0;
        this.y = (y != null && !isNaN(y)) ? y : 0;

        return this;
    },

    copy: function() {
        return new Ext.util.Offset(this.x, this.y);
    },

    copyFrom: function(p) {
        this.x = p.x;
        this.y = p.y;
    },

    toString: function() {
        return "Offset[" + this.x + "," + this.y + "]";
    },

    equals: function(offset) {
        if(!(offset instanceof Ext.util.Offset))
            throw new Error('offset must be an instance of Ext.util.Offset');

        return (this.x == offset.x && this.y == offset.y);
    },

    round: function(to) {
        if (!isNaN(to)) {
            var factor = Math.pow(10, to);
            this.x = Math.round(this.x * factor) / factor;
            this.y = Math.round(this.y * factor) / factor;
        } else {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
        }
    },

    isZero: function() {
        return this.x == 0 && this.y == 0;
    }
});

Ext.util.Offset.fromObject = function(obj) {
    return new Ext.util.Offset(obj.x, obj.y);
};
/**
 * @class Ext.Template
 * <p>Represents an HTML fragment template. Templates may be {@link #compile precompiled}
 * for greater performance.</p>
 * An instance of this class may be created by passing to the constructor either
 * a single argument, or multiple arguments:
 * <div class="mdetail-params"><ul>
 * <li><b>single argument</b> : String/Array
 * <div class="sub-desc">
 * The single argument may be either a String or an Array:<ul>
 * <li><tt>String</tt> : </li><pre><code>
var t = new Ext.Template("&lt;div>Hello {0}.&lt;/div>");
t.{@link #append}('some-element', ['foo']);
   </code></pre>
 * <li><tt>Array</tt> : </li>
 * An Array will be combined with <code>join('')</code>.
<pre><code>
var t = new Ext.Template([
    '&lt;div name="{id}"&gt;',
        '&lt;span class="{cls}"&gt;{name:trim} {value:ellipsis(10)}&lt;/span&gt;',
    '&lt;/div&gt;',
]);
t.{@link #compile}();
t.{@link #append}('some-element', {id: 'myid', cls: 'myclass', name: 'foo', value: 'bar'});
   </code></pre>
 * </ul></div></li>
 * <li><b>multiple arguments</b> : String, Object, Array, ...
 * <div class="sub-desc">
 * Multiple arguments will be combined with <code>join('')</code>.
 * <pre><code>
var t = new Ext.Template(
    '&lt;div name="{id}"&gt;',
        '&lt;span class="{cls}"&gt;{name} {value}&lt;/span&gt;',
    '&lt;/div&gt;',
    // a configuration object:
    {
        compiled: true,      // {@link #compile} immediately
    }
);
   </code></pre>
 * <p><b>Notes</b>:</p>
 * <div class="mdetail-params"><ul>
 * <li>Formatting and <code>disableFormats</code> are not applicable for Sencha Touch.</li>
 * <li>For a list of available format functions, see {@link Ext.util.Format}.</li>
 * <li><code>disableFormats</code> reduces <code>{@link #apply}</code> time
 * when no formatting is required.</li>
 * </ul></div>
 * </div></li>
 * </ul></div>
 * @param {Mixed} config
 */
Ext.Template = Ext.extend(Object, {
    constructor: function(html) {
        var me = this,
            args = arguments,
            buffer = [],
            value, i, length;
            
        me.initialConfig = {};

        if (Ext.isArray(html)) {
            html = html.join("");
        }
        else if (args.length > 1) {
            for (i = 0, length = args.length; i < length; i++) {
                value = args[i];
                if (typeof value == 'object') {
                    Ext.apply(me.initialConfig, value);
                    Ext.apply(me, value);
                } else {
                    buffer.push(value);
                }
            }
            html = buffer.join('');
        }

        // @private
        me.html = html;
        
        if (me.compiled) {
            me.compile();
        }
    },
    isTemplate: true,  
    /**
     * @cfg {Boolean} disableFormats true to disable format functions in the template. If the template doesn't contain format functions, setting 
     * disableFormats to true will reduce apply time (defaults to false)
     */
    disableFormats: false,
    
    re: /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,      
    /**
     * Returns an HTML fragment of this template with the specified values applied.
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @return {String} The HTML fragment
     * @hide repeat doc
     */
    applyTemplate: function(values) {
        var me = this,
            useFormat = me.disableFormats !== true,
            fm = Ext.util.Format,
            tpl = me;

        if (me.compiled) {
            return me.compiled(values);
        }
        function fn(m, name, format, args) {
            if (format && useFormat) {
                if (args) {
                    args = [values[name]].concat(new Function('return ['+ args +'];')());
                } else {
                    args = [values[name]];
                }
                if (format.substr(0, 5) == "this.") {
                    return tpl[format.substr(5)].apply(tpl, args);
                }
                else {
                    return fm[format].apply(fm, args);
                }
            }
            else {
                return values[name] !== undefined ? values[name] : "";
            }
        }
        return me.html.replace(me.re, fn);
    },

    /**
     * Sets the HTML used as the template and optionally compiles it.
     * @param {String} html
     * @param {Boolean} compile (optional) True to compile the template (defaults to undefined)
     * @return {Ext.Template} this
     */
    set: function(html, compile) {
        var me = this;
        me.html = html;
        me.compiled = null;
        return compile ? me.compile() : me;
    },
    
    compileARe: /\\/g,
    compileBRe: /(\r\n|\n)/g,
    compileCRe: /'/g,
    /**
     * Compiles the template into an internal function, eliminating the RegEx overhead.
     * @return {Ext.Template} this
     * @hide repeat doc
     */
    compile: function() {
        var me = this,
            fm = Ext.util.Format,
            useFormat = me.disableFormats !== true,
            body, bodyReturn;

        function fn(m, name, format, args) {
            if (format && useFormat) {
                args = args ? ',' + args: "";
                if (format.substr(0, 5) != "this.") {
                    format = "fm." + format + '(';
                }
                else {
                    format = 'this.' + format.substr(5) + '(';
                }
            }
            else {
                args = '';
                format = "(values['" + name + "'] == undefined ? '' : ";
            }
            return "'," + format + "values['" + name + "']" + args + ") ,'";
        }

        bodyReturn = me.html.replace(me.compileARe, '\\\\').replace(me.compileBRe, '\\n').replace(me.compileCRe, "\\'").replace(me.re, fn);
        body = "this.compiled = function(values){ return ['" + bodyReturn + "'].join('');};";
        eval(body);
        return me;
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) as the first child of el.
     * @param {Mixed} el The context element
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Ext.Element (defaults to undefined)
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    insertFirst: function(el, values, returnElement) {
        return this.doInsert('afterBegin', el, values, returnElement);
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) before el.
     * @param {Mixed} el The context element
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Ext.Element (defaults to undefined)
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    insertBefore: function(el, values, returnElement) {
        return this.doInsert('beforeBegin', el, values, returnElement);
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) after el.
     * @param {Mixed} el The context element
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Ext.Element (defaults to undefined)
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    insertAfter: function(el, values, returnElement) {
        return this.doInsert('afterEnd', el, values, returnElement);
    },

    /**
     * Applies the supplied <code>values</code> to the template and appends
     * the new node(s) to the specified <code>el</code>.
     * <p>For example usage {@link #Template see the constructor}.</p>
     * @param {Mixed} el The context element
     * @param {Object/Array} values
     * The template values. Can be an array if the params are numeric (i.e. <code>{0}</code>)
     * or an object (i.e. <code>{foo: 'bar'}</code>).
     * @param {Boolean} returnElement (optional) true to return an Ext.Element (defaults to undefined)
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    append: function(el, values, returnElement) {
        return this.doInsert('beforeEnd', el, values, returnElement);
    },

    doInsert: function(where, el, values, returnEl) {
        el = Ext.getDom(el);
        var newNode = Ext.DomHelper.insertHtml(where, el, this.applyTemplate(values));
        return returnEl ? Ext.get(newNode, true) : newNode;
    },

    /**
     * Applies the supplied values to the template and overwrites the content of el with the new node(s).
     * @param {Mixed} el The context element
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Ext.Element (defaults to undefined)
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    overwrite: function(el, values, returnElement) {
        el = Ext.getDom(el);
        el.innerHTML = this.applyTemplate(values);
        return returnElement ? Ext.get(el.firstChild, true) : el.firstChild;
    }
});
/**
 * Alias for {@link #applyTemplate}
 * Returns an HTML fragment of this template with the specified <code>values</code> applied.
 * @param {Object/Array} values
 * The template values. Can be an array if the params are numeric (i.e. <code>{0}</code>)
 * or an object (i.e. <code>{foo: 'bar'}</code>).
 * @return {String} The HTML fragment
 * @member Ext.Template
 * @method apply
 */
Ext.Template.prototype.apply = Ext.Template.prototype.applyTemplate;

/**
 * Creates a template from the passed element's value (<i>display:none</i> textarea, preferred) or innerHTML.
 * @param {String/HTMLElement} el A DOM element or its id
 * @param {Object} config A configuration object
 * @return {Ext.Template} The created template
 * @static
 */
Ext.Template.from = function(el, config) {
    el = Ext.getDom(el);
    return new Ext.Template(el.value || el.innerHTML, config || '');
};

/**
 * @class Ext.XTemplate
 * @extends Ext.Template
 * <p>A template class that supports advanced functionality like:<div class="mdetail-params"><ul>
 * <li>Autofilling arrays using templates and sub-templates</li>
 * <li>Conditional processing with basic comparison operators</li>
 * <li>Basic math function support</li>
 * <li>Execute arbitrary inline code with special built-in template variables</li>
 * <li>Custom member functions</li>
 * <li>Many special tags and built-in operators that aren't defined as part of
 * the API, but are supported in the templates that can be created</li>
 * </ul></div></p>
 * <p>XTemplate provides the templating mechanism built into:<div class="mdetail-params"><ul>
 * <li>{@link Ext.DataView}</li>
 * </ul></div></p>
 *
 * The {@link Ext.Template} describes
 * the acceptable parameters to pass to the constructor. The following
 * examples demonstrate all of the supported features.</p>
 *
 * <div class="mdetail-params"><ul>
 *
 * <li><b><u>Sample Data</u></b>
 * <div class="sub-desc">
 * <p>This is the data object used for reference in each code example:</p>
 * <pre><code>
var data = {
name: 'Tommy Maintz',
title: 'Lead Developer',
company: 'Ext JS, Inc',
email: 'tommy@extjs.com',
address: '5 Cups Drive',
city: 'Palo Alto',
state: 'CA',
zip: '44102',
drinks: ['Coffee', 'Soda', 'Water'],
kids: [{
        name: 'Joshua',
        age:3
    },{
        name: 'Matthew',
        age:2
    },{
        name: 'Solomon',
        age:0
}]
};
 </code></pre>
 * </div>
 * </li>
 *
 *
 * <li><b><u>Auto filling of arrays</u></b>
 * <div class="sub-desc">
 * <p>The <b><tt>tpl</tt></b> tag and the <b><tt>for</tt></b> operator are used
 * to process the provided data object:
 * <ul>
 * <li>If the value specified in <tt>for</tt> is an array, it will auto-fill,
 * repeating the template block inside the <tt>tpl</tt> tag for each item in the
 * array.</li>
 * <li>If <tt>for="."</tt> is specified, the data object provided is examined.</li>
 * <li>While processing an array, the special variable <tt>{#}</tt>
 * will provide the current array index + 1 (starts at 1, not 0).</li>
 * </ul>
 * </p>
 * <pre><code>
&lt;tpl <b>for</b>=".">...&lt;/tpl>       // loop through array at root node
&lt;tpl <b>for</b>="foo">...&lt;/tpl>     // loop through array at foo node
&lt;tpl <b>for</b>="foo.bar">...&lt;/tpl> // loop through array at foo.bar node
 </code></pre>
 * Using the sample data above:
 * <pre><code>
var tpl = new Ext.XTemplate(
    '&lt;p>Kids: ',
    '&lt;tpl <b>for</b>=".">',       // process the data.kids node
        '&lt;p>{#}. {name}&lt;/p>',  // use current array index to autonumber
    '&lt;/tpl>&lt;/p>'
);
tpl.overwrite(panel.body, data.kids); // pass the kids property of the data object
 </code></pre>
 * <p>An example illustrating how the <b><tt>for</tt></b> property can be leveraged
 * to access specified members of the provided data object to populate the template:</p>
 * <pre><code>
var tpl = new Ext.XTemplate(
    '&lt;p>Name: {name}&lt;/p>',
    '&lt;p>Title: {title}&lt;/p>',
    '&lt;p>Company: {company}&lt;/p>',
    '&lt;p>Kids: ',
    '&lt;tpl <b>for="kids"</b>>',     // interrogate the kids property within the data
        '&lt;p>{name}&lt;/p>',
    '&lt;/tpl>&lt;/p>'
);
tpl.overwrite(panel.body, data);  // pass the root node of the data object
 </code></pre>
 * <p>Flat arrays that contain values (and not objects) can be auto-rendered
 * using the special <b><tt>{.}</tt></b> variable inside a loop.  This variable
 * will represent the value of the array at the current index:</p>
 * <pre><code>
var tpl = new Ext.XTemplate(
    '&lt;p>{name}\&#39;s favorite beverages:&lt;/p>',
    '&lt;tpl for="drinks">',
        '&lt;div> - {.}&lt;/div>',
    '&lt;/tpl>'
);
tpl.overwrite(panel.body, data);
 </code></pre>
 * <p>When processing a sub-template, for example while looping through a child array,
 * you can access the parent object's members via the <b><tt>parent</tt></b> object:</p>
 * <pre><code>
var tpl = new Ext.XTemplate(
    '&lt;p>Name: {name}&lt;/p>',
    '&lt;p>Kids: ',
    '&lt;tpl for="kids">',
        '&lt;tpl if="age &amp;gt; 1">',
            '&lt;p>{name}&lt;/p>',
            '&lt;p>Dad: {<b>parent</b>.name}&lt;/p>',
        '&lt;/tpl>',
    '&lt;/tpl>&lt;/p>'
);
tpl.overwrite(panel.body, data);
 </code></pre>
 * </div>
 * </li>
 *
 *
 * <li><b><u>Conditional processing with basic comparison operators</u></b>
 * <div class="sub-desc">
 * <p>The <b><tt>tpl</tt></b> tag and the <b><tt>if</tt></b> operator are used
 * to provide conditional checks for deciding whether or not to render specific
 * parts of the template. Notes:<div class="sub-desc"><ul>
 * <li>Double quotes must be encoded if used within the conditional</li>
 * <li>There is no <tt>else</tt> operator &mdash; if needed, two opposite
 * <tt>if</tt> statements should be used.</li>
 * </ul></div>
 * <pre><code>
&lt;tpl if="age &gt; 1 &amp;&amp; age &lt; 10">Child&lt;/tpl>
&lt;tpl if="age >= 10 && age < 18">Teenager&lt;/tpl>
&lt;tpl <b>if</b>="this.isGirl(name)">...&lt;/tpl>
&lt;tpl <b>if</b>="id==\'download\'">...&lt;/tpl>
&lt;tpl <b>if</b>="needsIcon">&lt;img src="{icon}" class="{iconCls}"/>&lt;/tpl>
// no good:
&lt;tpl if="name == "Tommy"">Hello&lt;/tpl>
// encode &#34; if it is part of the condition, e.g.
&lt;tpl if="name == &#38;quot;Tommy&#38;quot;">Hello&lt;/tpl>
 * </code></pre>
 * Using the sample data above:
 * <pre><code>
var tpl = new Ext.XTemplate(
    '&lt;p>Name: {name}&lt;/p>',
    '&lt;p>Kids: ',
    '&lt;tpl for="kids">',
        '&lt;tpl if="age &amp;gt; 1">',
            '&lt;p>{name}&lt;/p>',
        '&lt;/tpl>',
    '&lt;/tpl>&lt;/p>'
);
tpl.overwrite(panel.body, data);
 </code></pre>
 * </div>
 * </li>
 *
 *
 * <li><b><u>Basic math support</u></b>
 * <div class="sub-desc">
 * <p>The following basic math operators may be applied directly on numeric
 * data values:</p><pre>
 * + - * /
 * </pre>
 * For example:
 * <pre><code>
var tpl = new Ext.XTemplate(
    '&lt;p>Name: {name}&lt;/p>',
    '&lt;p>Kids: ',
    '&lt;tpl for="kids">',
        '&lt;tpl if="age &amp;gt; 1">',  // <-- Note that the &gt; is encoded
            '&lt;p>{#}: {name}&lt;/p>',  // <-- Auto-number each item
            '&lt;p>In 5 Years: {age+5}&lt;/p>',  // <-- Basic math
            '&lt;p>Dad: {parent.name}&lt;/p>',
        '&lt;/tpl>',
    '&lt;/tpl>&lt;/p>'
);
tpl.overwrite(panel.body, data);
 </code></pre>
 * </div>
 * </li>
 *
 *
 * <li><b><u>Execute arbitrary inline code with special built-in template variables</u></b>
 * <div class="sub-desc">
 * <p>Anything between <code>{[ ... ]}</code> is considered code to be executed
 * in the scope of the template. There are some special variables available in that code:
 * <ul>
 * <li><b><tt>values</tt></b>: The values in the current scope. If you are using
 * scope changing sub-templates, you can change what <tt>values</tt> is.</li>
 * <li><b><tt>parent</tt></b>: The scope (values) of the ancestor template.</li>
 * <li><b><tt>xindex</tt></b>: If you are in a looping template, the index of the
 * loop you are in (1-based).</li>
 * <li><b><tt>xcount</tt></b>: If you are in a looping template, the total length
 * of the array you are looping.</li>
 * </ul>
 * This example demonstrates basic row striping using an inline code block and the
 * <tt>xindex</tt> variable:</p>
 * <pre><code>
var tpl = new Ext.XTemplate(
    '&lt;p>Name: {name}&lt;/p>',
    '&lt;p>Company: {[values.company.toUpperCase() + ", " + values.title]}&lt;/p>',
    '&lt;p>Kids: ',
    '&lt;tpl for="kids">',
        '&lt;div class="{[xindex % 2 === 0 ? "even" : "odd"]}">',
        '{name}',
        '&lt;/div>',
    '&lt;/tpl>&lt;/p>'
 );
tpl.overwrite(panel.body, data);
 </code></pre>
 * </div>
 * </li>
 *
 * <li><b><u>Template member functions</u></b>
 * <div class="sub-desc">
 * <p>One or more member functions can be specified in a configuration
 * object passed into the XTemplate constructor for more complex processing:</p>
 * <pre><code>
var tpl = new Ext.XTemplate(
    '&lt;p>Name: {name}&lt;/p>',
    '&lt;p>Kids: ',
    '&lt;tpl for="kids">',
        '&lt;tpl if="this.isGirl(name)">',
            '&lt;p>Girl: {name} - {age}&lt;/p>',
        '&lt;/tpl>',
         // use opposite if statement to simulate 'else' processing:
        '&lt;tpl if="this.isGirl(name) == false">',
            '&lt;p>Boy: {name} - {age}&lt;/p>',
        '&lt;/tpl>',
        '&lt;tpl if="this.isBaby(age)">',
            '&lt;p>{name} is a baby!&lt;/p>',
        '&lt;/tpl>',
    '&lt;/tpl>&lt;/p>',
    {
        // XTemplate configuration:
        compiled: true,
        // member functions:
        isGirl: function(name){
           return name == 'Sara Grace';
        },
        isBaby: function(age){
           return age < 1;
        }
    }
);
tpl.overwrite(panel.body, data);
 </code></pre>
 * </div>
 * </li>
 *
 * </ul></div>
 *
 * @param {Mixed} config
 */

Ext.XTemplate = Ext.extend(Ext.Template, {
    argsRe: /<tpl\b[^>]*>((?:(?=([^<]+))\2|<(?!tpl\b[^>]*>))*?)<\/tpl>/,
    nameRe: /^<tpl\b[^>]*?for="(.*?)"/,
    ifRe: /^<tpl\b[^>]*?if="(.*?)"/,
    execRe: /^<tpl\b[^>]*?exec="(.*?)"/,
    constructor: function() {
        Ext.XTemplate.superclass.constructor.apply(this, arguments);

        var me = this,
            html = me.html,
            argsRe = me.argsRe,
            nameRe = me.nameRe,
            ifRe = me.ifRe,
            execRe = me.execRe,
            id = 0,
            tpls = [],
            VALUES = 'values',
            PARENT = 'parent',
            XINDEX = 'xindex',
            XCOUNT = 'xcount',
            RETURN = 'return ',
            WITHVALUES = 'with(values){ ',
            m, matchName, matchIf, matchExec, exp, fn, exec, name, i;

        html = ['<tpl>', html, '</tpl>'].join('');

        while ((m = html.match(argsRe))) {
            exp = null;
            fn = null;
            exec = null;
            matchName = m[0].match(nameRe);
            matchIf = m[0].match(ifRe);
            matchExec = m[0].match(execRe);

            exp = matchIf ? matchIf[1] : null;
            if (exp) {
                fn = new Function(VALUES, PARENT, XINDEX, XCOUNT, WITHVALUES + 'try{' + RETURN + Ext.util.Format.htmlDecode(exp) + ';}catch(e){return;}}');
            }

            exp = matchExec ? matchExec[1] : null;
            if (exp) {
                exec = new Function(VALUES, PARENT, XINDEX, XCOUNT, WITHVALUES + Ext.util.Format.htmlDecode(exp) + ';}');
            }
            
            name = matchName ? matchName[1] : null;
            if (name) {
                if (name === '.') {
                    name = VALUES;
                } else if (name === '..') {
                    name = PARENT;
                }
                name = new Function(VALUES, PARENT, 'try{' + WITHVALUES + RETURN + name + ';}}catch(e){return;}');
            }

            tpls.push({
                id: id,
                target: name,
                exec: exec,
                test: fn,
                body: m[1] || ''
            });

            html = html.replace(m[0], '{xtpl' + id + '}');
            id = id + 1;
        }

        for (i = tpls.length - 1; i >= 0; --i) {
            me.compileTpl(tpls[i]);
        }
        me.master = tpls[tpls.length - 1];
        me.tpls = tpls;
    },

    // @private
    applySubTemplate: function(id, values, parent, xindex, xcount) {
        var me = this, t = me.tpls[id];
        return t.compiled.call(me, values, parent, xindex, xcount);
    },
    /**
     * @cfg {RegExp} codeRe The regular expression used to match code variables (default: matches <tt>{[expression]}</tt>).
     */
    codeRe: /\{\[((?:\\\]|.|\n)*?)\]\}/g,

    re: /\{([\w-\.\#]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\/]\s?[\d\.\+\-\*\/\(\)]+)?\}/g,

    // @private
    compileTpl: function(tpl) {
        var fm = Ext.util.Format,
            me = this,
            useFormat = me.disableFormats !== true,
            body, bodyReturn, evaluatedFn;

        function fn(m, name, format, args, math) {
            var v;
            // name is what is inside the {}
            // Name begins with xtpl, use a Sub Template
            if (name.substr(0, 4) == 'xtpl') {
                return "',this.applySubTemplate(" + name.substr(4) + ", values, parent, xindex, xcount),'";
            }
            // name = "." - Just use the values object.
            if (name == '.') {
                v = 'typeof values == "string" ? values : ""';
            }

            // name = "#" - Use the xindex
            else if (name == '#') {
                v = 'xindex';
            }
            else if (name.substr(0, 7) == "parent.") {
                v = name;
            }
            // name has a . in it - Use object literal notation, starting from values
            else if (name.indexOf('.') != -1) {
                v = "values." + name;
            }

            // name is a property of values
            else {
                v = "values['" + name + "']";
            }
            if (math) {
                v = '(' + v + math + ')';
            }
            if (format && useFormat) {
                args = args ? ',' + args : "";
                if (format.substr(0, 5) != "this.") {
                    format = "fm." + format + '(';
                }
                else {
                    format = 'this.' + format.substr(5) + '(';
                }
            }
            else {
                args = '';
                format = "(" + v + " === undefined ? '' : ";
            }
            return "'," + format + v + args + "),'";
        }

        function codeFn(m, code) {
            // Single quotes get escaped when the template is compiled, however we want to undo this when running code.
            return "',(" + code.replace(me.compileARe, "'") + "),'";
        }
        
        bodyReturn = tpl.body.replace(me.compileBRe, '\\n').replace(me.compileCRe, "\\'").replace(me.re, fn).replace(me.codeRe, codeFn);
        body = "evaluatedFn = function(values, parent, xindex, xcount){return ['" + bodyReturn + "'].join('');};";
        eval(body);
                        
        tpl.compiled = function(values, parent, xindex, xcount) {
            var vs, 
                length,
                buffer,
                i;
                
            if (tpl.test && !tpl.test.call(me, values, parent, xindex, xcount)) {
                return '';
            } 
                           
            vs = tpl.target ? tpl.target.call(me, values, parent) : values;
            if (!vs) {
               return '';
            }
   
            parent = tpl.target ? values : parent;
            if (tpl.target && Ext.isArray(vs)) {
                buffer = [], length = vs.length;
                if (tpl.exec) {
                    for (i = 0; i < length; i++) {
                        buffer[buffer.length] = evaluatedFn.call(me, vs[i], parent, i + 1, length);
                        tpl.exec.call(me, vs[i], parent, i + 1, length);
                    }
                } else {
                    for (i = 0; i < length; i++) {
                        buffer[buffer.length] = evaluatedFn.call(me, vs[i], parent, i + 1, length);
                    }
                }
                return buffer.join('');
            }
                
            if (tpl.exec) {
                tpl.exec.call(me, vs, parent, xindex, xcount);
            }
            return evaluatedFn.call(me, vs, parent, xindex, xcount);
        }
                
        return this;
    },

    /**
     * Returns an HTML fragment of this template with the specified values applied.
     * @param {Object} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @return {String} The HTML fragment
     */
    applyTemplate: function(values) {
        return this.master.compiled.call(this, values, {}, 1, 1);
    },

    /**
     * Compile the template to a function for optimized performance.  Recommended if the template will be used frequently.
     * @return {Function} The compiled function
     */
    compile: function() {
        return this;
    }
});
/**
 * Alias for {@link #applyTemplate}
 * Returns an HTML fragment of this template with the specified values applied.
 * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
 * @return {String} The HTML fragment
 * @member Ext.XTemplate
 * @method apply
 */
Ext.XTemplate.prototype.apply = Ext.XTemplate.prototype.applyTemplate;

/**
 * Creates a template from the passed element's value (<i>display:none</i> textarea, preferred) or innerHTML.
 * @param {String/HTMLElement} el A DOM element or its id
 * @return {Ext.Template} The created template
 * @static
 */
Ext.XTemplate.from = function(el, config) {
    el = Ext.getDom(el);
    return new Ext.XTemplate(el.value || el.innerHTML, config || {});
};


/**
 * @class Ext.util.Sorter
 * @extends Object
 * Represents a single sorter that can be applied to a Store
 */
Ext.util.Sorter = Ext.extend(Object, {
    /**
     * @cfg {String} property The property to sort by. Required unless {@link #sorter} is provided
     */
    
    /**
     * @cfg {Function} sorterFn A specific sorter function to execute. Can be passed instead of {@link #property}
     */
    
    /**
     * @cfg {String} root Optional root property. This is mostly useful when sorting a Store, in which case we set the
     * root to 'data' to make the filter pull the {@link #property} out of the data object of each item
     */
    
    /**
     * @cfg {String} direction The direction to sort by. Defaults to ASC
     */
    direction: "ASC",
    
    constructor: function(config) {
        Ext.apply(this, config);
        
        if (this.property == undefined && this.sorterFn == undefined) {
            throw "A Sorter requires either a property or a sorter function";
        }
        
        this.sort = this.createSortFunction(this.sorterFn || this.defaultSorterFn);
    },
    
    /**
     * @private
     * Creates and returns a function which sorts an array by the given property and direction
     * @return {Function} A function which sorts by the property/direction combination provided
     */
    createSortFunction: function(sorterFn) {
        var me        = this,
            property  = me.property,
            direction = me.direction,
            modifier  = direction.toUpperCase() == "DESC" ? -1 : 1;
        
        //create a comparison function. Takes 2 objects, returns 1 if object 1 is greater,
        //-1 if object 2 is greater or 0 if they are equal
        return function(o1, o2) {
            return modifier * sorterFn.call(me, o1, o2);
        };
    },
    
    /**
     * @private
     * Basic default sorter function that just compares the defined property of each object
     */
    defaultSorterFn: function(o1, o2) {
        var v1 = this.getRoot(o1)[this.property],
            v2 = this.getRoot(o2)[this.property];

        return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
    },
    
    /**
     * @private
     * Returns the root property of the given item, based on the configured {@link #root} property
     * @param {Object} item The item
     * @return {Object} The root property of the object
     */
    getRoot: function(item) {
        return this.root == undefined ? item : item[this.root];
    }
});
/**
 * @class Ext.util.Filter
 * @extends Object
 * <p>Represents a filter that can be applied to a {@link Ext.data.MixedCollection MixedCollection}. Can either simply
 * filter on a property/value pair or pass in a filter function with custom logic. Filters are always used in the context
 * of MixedCollections, though {@link Ext.data.Store Store}s frequently create them when filtering and searching on their
 * records. Example usage:</p>
<pre><code>
//set up a fictional MixedCollection containing a few people to filter on
var allNames = new Ext.util.MixedCollection();
allNames.addAll([
    {id: 1, name: 'Ed',    age: 25},
    {id: 2, name: 'Jamie', age: 37},
    {id: 3, name: 'Abe',   age: 32},
    {id: 4, name: 'Aaron', age: 26},
    {id: 5, name: 'David', age: 32}
]);

var ageFilter = new Ext.util.Filter({
    property: 'age',
    value   : 32
});

var longNameFilter = new Ext.util.Filter({
    filterFn: function(item) {
        return item.name.length > 4;
    }
});

//a new MixedCollection with the 3 names longer than 4 characters
var longNames = allNames.filter(longNameFilter);

//a new MixedCollection with the 2 people of age 24:
var youngFolk = allNames.filter(ageFilter);
</code></pre>
 * @constructor
 * @param {Object} config Config object
 */
Ext.util.Filter = Ext.extend(Object, {
    /**
     * @cfg {String} property The property to filter on. Required unless a {@link #filter} is passed
     */
    
    /**
     * @cfg {Function} filterFn A custom filter function which is passed each item in the {@link Ext.util.MixedCollection} 
     * in turn. Should return true to accept each item or false to reject it
     */
    
    /**
     * @cfg {Boolean} anyMatch True to allow any match - no regex start/end line anchors will be added. Defaults to false
     */
    anyMatch: false,
    
    /**
     * @cfg {Boolean} exactMatch True to force exact match (^ and $ characters added to the regex). Defaults to false.
     * Ignored if anyMatch is true.
     */
    exactMatch: false,
    
    /**
     * @cfg {Boolean} caseSensitive True to make the regex case sensitive (adds 'i' switch to regex). Defaults to false.
     */
    caseSensitive: false,
    
    /**
     * @cfg {String} root Optional root property. This is mostly useful when filtering a Store, in which case we set the
     * root to 'data' to make the filter pull the {@link #property} out of the data object of each item
     */
    
    constructor: function(config) {
        Ext.apply(this, config);
        
        //we're aliasing filter to filterFn mostly for API cleanliness reasons, despite the fact it dirties the code here.
        //Ext.util.Sorter takes a sorterFn property but allows .sort to be called - we do the same here
        this.filter = this.filter || this.filterFn;
        
        if (this.filter == undefined) {
            if (this.property == undefined || this.value == undefined) {
                // Commented this out temporarily because it stops us using string ids in models. TODO: Remove this once
                // Model has been updated to allow string ids
                
                // throw "A Filter requires either a property or a filterFn to be set";
            } else {
                this.filter = this.createFilterFn();
            }
            
            this.filterFn = this.filter;
        }
    },
    
    /**
     * @private
     * Creates a filter function for the configured property/value/anyMatch/caseSensitive options for this Filter
     */
    createFilterFn: function() {
        var me       = this,
            matcher  = me.createValueMatcher(),
            property = me.property;
        
        return function(item) {
            return matcher.test(me.getRoot.call(me, item)[property]);
        };
    },
    
    /**
     * @private
     * Returns the root property of the given item, based on the configured {@link #root} property
     * @param {Object} item The item
     * @return {Object} The root property of the object
     */
    getRoot: function(item) {
        return this.root == undefined ? item : item[this.root];
    },
    
    /**
     * @private
     * Returns a regular expression based on the given value and matching options
     */
    createValueMatcher : function() {
        var me            = this,
            value         = me.value,
            anyMatch      = me.anyMatch,
            exactMatch    = me.exactMatch,
            caseSensitive = me.caseSensitive,
            escapeRe      = Ext.util.Format.escapeRegex;
        
        if (!value.exec) { // not a regex
            value = String(value);

            if (anyMatch === true) {
                value = escapeRe(value);
            } else {
                value = '^' + escapeRe(value);
                if (exactMatch === true) {
                    value += '$';
                }
            }
            value = new RegExp(value, caseSensitive ? '' : 'i');
         }
         
         return value;
    }
});
/**
 * @class Ext.util.Functions
 * @singleton
 */
Ext.util.Functions = {
    /**
     * Creates an interceptor function. The passed function is called before the original one. If it returns false,
     * the original one is not called. The resulting function returns the results of the original function.
     * The passed function is called with the parameters of the original function. Example usage:
     * <pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

sayHi('Fred'); // alerts "Hi, Fred"

// create a new function that validates input without
// directly modifying the original function:
var sayHiToFriend = Ext.createInterceptor(sayHi, function(name){
    return name == 'Brian';
});

sayHiToFriend('Fred');  // no alert
sayHiToFriend('Brian'); // alerts "Hi, Brian"
       </code></pre>
     * @param {Function} origFn The original function.
     * @param {Function} newFn The function to call before the original
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the passed function is executed.
     * <b>If omitted, defaults to the scope in which the original function is called or the browser window.</b>
     * @param {Mixed} returnValue (optional) The value to return if the passed function return false (defaults to null).
     * @return {Function} The new function
     */
    createInterceptor: function(origFn, newFn, scope, returnValue) { 
        var method = origFn;
        if (!Ext.isFunction(newFn)) {
            return origFn;
        }
        else {
            return function() {
                var me = this,
                    args = arguments;
                newFn.target = me;
                newFn.method = origFn;
                return (newFn.apply(scope || me || window, args) !== false) ?
                        origFn.apply(me || window, args) :
                        returnValue || null;
            };
        }
    },

    /**
     * Creates a delegate (callback) that sets the scope to obj.
     * Call directly on any function. Example: <code>Ext.createDelegate(this.myFunction, this, [arg1, arg2])</code>
     * Will create a function that is automatically scoped to obj so that the <tt>this</tt> variable inside the
     * callback points to obj. Example usage:
     * <pre><code>
var sayHi = function(name){
    // Note this use of "this.text" here.  This function expects to
    // execute within a scope that contains a text property.  In this
    // example, the "this" variable is pointing to the btn object that
    // was passed in createDelegate below.
    alert('Hi, ' + name + '. You clicked the "' + this.text + '" button.');
}

var btn = new Ext.Button({
    text: 'Say Hi',
    renderTo: Ext.getBody()
});

// This callback will execute in the scope of the
// button instance. Clicking the button alerts
// "Hi, Fred. You clicked the "Say Hi" button."
btn.on('click', Ext.createDelegate(sayHi, btn, ['Fred']));
       </code></pre>
     * @param {Function} fn The function to delegate.
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
     * <b>If omitted, defaults to the browser window.</b>
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Function} The new function
     */
    createDelegate: function(fn, obj, args, appendArgs) {
        if (!Ext.isFunction(fn)) {
            return fn;
        }
        return function() {
            var callArgs = args || arguments;
            if (appendArgs === true) {
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }
            else if (Ext.isNumber(appendArgs)) {
                callArgs = Array.prototype.slice.call(arguments, 0);
                // copy arguments first
                var applyArgs = [appendArgs, 0].concat(args);
                // create method call params
                Array.prototype.splice.apply(callArgs, applyArgs);
                // splice them in
            }
            return fn.apply(obj || window, callArgs);
        };
    },

    /**
     * Calls this function after the number of millseconds specified, optionally in a specific scope. Example usage:
     * <pre><code>
var sayHi = function(name){
    alert('Hi, ' + name);
}

// executes immediately:
sayHi('Fred');

// executes after 2 seconds:
Ext.defer(sayHi, 2000, this, ['Fred']);

// this syntax is sometimes useful for deferring
// execution of an anonymous function:
Ext.defer(function(){
    alert('Anonymous');
}, 100);
       </code></pre>
     * @param {Function} fn The function to defer.
     * @param {Number} millis The number of milliseconds for the setTimeout call (if less than or equal to 0 the function is executed immediately)
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
     * <b>If omitted, defaults to the browser window.</b>
     * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
     * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
     * if a number the args are inserted at the specified position
     * @return {Number} The timeout id that can be used with clearTimeout
     */
    defer: function(fn, millis, obj, args, appendArgs) {
        fn = Ext.util.Functions.createDelegate(fn, obj, args, appendArgs);
        if (millis > 0) {
            return setTimeout(fn, millis);
        }
        fn();
        return 0;
    },


    /**
     * Create a combined function call sequence of the original function + the passed function.
     * The resulting function returns the results of the original function.
     * The passed fcn is called with the parameters of the original function. Example usage:
     * 

var sayHi = function(name){
    alert('Hi, ' + name);
}

sayHi('Fred'); // alerts "Hi, Fred"

var sayGoodbye = Ext.createSequence(sayHi, function(name){
    alert('Bye, ' + name);
});

sayGoodbye('Fred'); // both alerts show

     * @param {Function} origFn The original function.
     * @param {Function} newFn The function to sequence
     * @param {Object} scope (optional) The scope (this reference) in which the passed function is executed.
     * If omitted, defaults to the scope in which the original function is called or the browser window.
     * @return {Function} The new function
     */
    createSequence: function(origFn, newFn, scope) {
        if (!Ext.isFunction(newFn)) {
            return origFn;
        }
        else {
            return function() {
                var retval = origFn.apply(this || window, arguments);
                newFn.apply(scope || this || window, arguments);
                return retval;
            };
        }
    }
};

/**
 * Shorthand for {@link Ext.util.Functions#defer}   
 * @param {Function} fn The function to defer.
 * @param {Number} millis The number of milliseconds for the setTimeout call (if less than or equal to 0 the function is executed immediately)
 * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
 * <b>If omitted, defaults to the browser window.</b>
 * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
 * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
 * if a number the args are inserted at the specified position
 * @return {Number} The timeout id that can be used with clearTimeout
 * @member Ext
 * @method defer
 */

Ext.defer = Ext.util.Functions.defer;

/**
 * Shorthand for {@link Ext.util.Functions#createInterceptor}   
 * @param {Function} origFn The original function.
 * @param {Function} newFn The function to call before the original
 * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the passed function is executed.
 * <b>If omitted, defaults to the scope in which the original function is called or the browser window.</b>
 * @return {Function} The new function
 * @member Ext
 * @method defer
 */

Ext.createInterceptor = Ext.util.Functions.createInterceptor;

/**
 * Shorthand for {@link Ext.util.Functions#createSequence}
 * @param {Function} origFn The original function.
 * @param {Function} newFn The function to sequence
 * @param {Object} scope (optional) The scope (this reference) in which the passed function is executed.
 * If omitted, defaults to the scope in which the original function is called or the browser window.
 * @return {Function} The new function
 * @member Ext
 * @method defer
 */

Ext.createSequence = Ext.util.Functions.createSequence;

/**
 * Shorthand for {@link Ext.util.Functions#createDelegate}
 * @param {Function} fn The function to delegate.
 * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the function is executed.
 * <b>If omitted, defaults to the browser window.</b>
 * @param {Array} args (optional) Overrides arguments for the call. (Defaults to the arguments passed by the caller)
 * @param {Boolean/Number} appendArgs (optional) if True args are appended to call args instead of overriding,
 * if a number the args are inserted at the specified position
 * @return {Function} The new function
 * @member Ext
 * @method defer
 */
Ext.createDelegate = Ext.util.Functions.createDelegate;

/**
 * @class Ext.util.Date
 * @singleton
 */

Ext.util.Date = {
    /**
     * Returns the number of milliseconds between two dates
     * @param {Date} dateA
     * @param {Date} dateB (optional) Defaults to now
     * @return {Number} The diff in milliseconds
     */
    getElapsed: function(dateA, dateB) {
        return Math.abs(dateA - (dateB || new Date));
    }
};
/**
 * @class Ext.util.Numbers
 * @singleton
 */

Ext.util.Numbers = {
    
    // detect toFixed implementation bug in IE
    toFixedBroken: (0.9).toFixed() != 1,
    
    /**
     * Checks whether or not the current number is within a desired range.  If the number is already within the
     * range it is returned, otherwise the min or max value is returned depending on which side of the range is
     * exceeded.  Note that this method returns the constrained value but does not change the current number.
     * @param {Number} number The number to check
     * @param {Number} min The minimum number in the range
     * @param {Number} max The maximum number in the range
     * @return {Number} The constrained value if outside the range, otherwise the current value
     */
    constrain : function(number, min, max) {
        number = parseFloat(number);
        if (!isNaN(min)) {
            number = Math.max(number, min);
        }
        if (!isNaN(max)) {
            number = Math.min(number, max);
        }
        return number;
    },
    
    /**
     * Formats a number using fixed-point notation
     * @param {Number} value The number to format
     * @param {Number} precision The number of digits to show after the decimal point
     */
    toFixed : function(value, precision) {
        if(Ext.util.Numbers.toFixedBroken) {
            precision = precision || 0;
            var pow = Math.pow(10, precision);
            return Math.round(value * pow) / pow;
        }
        return value.toFixed(precision);
    }
};

/**
 * @class Ext.util.Format
 * Reusable data formatting functions
 * @singleton
 */
Ext.util.Format = {
    defaultDateFormat: 'm/d/Y',
    escapeRe: /('|\\)/g,
    trimRe: /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g,
    formatRe: /\{(\d+)\}/g,
    escapeRegexRe: /([-.*+?^${}()|[\]\/\\])/g,
    
    /**
     * Truncate a string and add an ellipsis ('...') to the end if it exceeds the specified length
     * @param {String} value The string to truncate
     * @param {Number} length The maximum length to allow before truncating
     * @param {Boolean} word True to try to find a common word break
     * @return {String} The converted text
     */
    ellipsis: function(value, len, word) {
        if (value && value.length > len) {
            if (word) {
                var vs = value.substr(0, len - 2),
                index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'));
                if (index != -1 && index >= (len - 15)) {
                    return vs.substr(0, index) + "...";
                }
            } 
            return value.substr(0, len - 3) + "...";
        }
        return value;
    },

    /**
     * Escapes the passed string for use in a regular expression
     * @param {String} str
     * @return {String}
     */
    escapeRegex : function(s) {
        return s.replace(Ext.util.Format.escapeRegexRe, "\\$1");
    },

    /**
     * Escapes the passed string for ' and \
     * @param {String} string The string to escape
     * @return {String} The escaped string
     */
    escape : function(string) {
        return string.replace(Ext.util.Format.escapeRe, "\\$1");
    },

    /**
     * Utility function that allows you to easily switch a string between two alternating values.  The passed value
     * is compared to the current string, and if they are equal, the other value that was passed in is returned.  If
     * they are already different, the first value passed in is returned.  Note that this method returns the new value
     * but does not change the current string.
     * <pre><code>
    // alternate sort directions
    sort = Ext.util.Format.toggle(sort, 'ASC', 'DESC');

    // instead of conditional logic:
    sort = (sort == 'ASC' ? 'DESC' : 'ASC');
       </code></pre>
     * @param {String} string The current string
     * @param {String} value The value to compare to the current string
     * @param {String} other The new value to use if the string already equals the first value passed in
     * @return {String} The new value
     */
    toggle : function(string, value, other) {
        return string == value ? other : value;
    },

    /**
     * Trims whitespace from either end of a string, leaving spaces within the string intact.  Example:
     * <pre><code>
    var s = '  foo bar  ';
    alert('-' + s + '-');         //alerts "- foo bar -"
    alert('-' + Ext.util.Format.trim(s) + '-');  //alerts "-foo bar-"
       </code></pre>
     * @param {String} string The string to escape
     * @return {String} The trimmed string
     */
    trim : function(string) {
        return string.replace(Ext.util.Format.trimRe, "");
    },

    /**
     * Pads the left side of a string with a specified character.  This is especially useful
     * for normalizing number and date strings.  Example usage:
     *
     * <pre><code>
var s = Ext.util.Format.leftPad('123', 5, '0');
// s now contains the string: '00123'
       </code></pre>
     * @param {String} string The original string
     * @param {Number} size The total length of the output string
     * @param {String} char (optional) The character with which to pad the original string (defaults to empty string " ")
     * @return {String} The padded string
     */
    leftPad : function (val, size, ch) {
        var result = String(val);
        ch = ch || " ";
        while (result.length < size) {
            result = ch + result;
        }
        return result;
    },

    /**
     * Allows you to define a tokenized string and pass an arbitrary number of arguments to replace the tokens.  Each
     * token must be unique, and must increment in the format {0}, {1}, etc.  Example usage:
     * <pre><code>
var cls = 'my-class', text = 'Some text';
var s = Ext.util.Format.format('&lt;div class="{0}">{1}&lt;/div>', cls, text);
// s now contains the string: '&lt;div class="my-class">Some text&lt;/div>'
       </code></pre>
     * @param {String} string The tokenized string to be formatted
     * @param {String} value1 The value to replace token {0}
     * @param {String} value2 Etc...
     * @return {String} The formatted string
     */
    format : function (format) {
        var args = Ext.toArray(arguments, 1);
        return format.replace(Ext.util.Format.formatRe, function(m, i) {
            return args[i];
        });
    },

    /**
     * Convert certain characters (&, <, >, and ') to their HTML character equivalents for literal display in web pages.
     * @param {String} value The string to encode
     * @return {String} The encoded text
     */
    htmlEncode: function(value) {
        return ! value ? value: String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    },

    /**
     * Convert certain characters (&, <, >, and ') from their HTML character equivalents.
     * @param {String} value The string to decode
     * @return {String} The decoded text
     */
    htmlDecode: function(value) {
        return ! value ? value: String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
    },

    /**
     * Parse a value into a formatted date using the specified format pattern.
     * @param {String/Date} value The value to format (Strings must conform to the format expected by the javascript 
     * Date object's <a href="http://www.w3schools.com/jsref/jsref_parse.asp">parse()</a> method)
     * @param {String} format (optional) Any valid date format string (defaults to 'm/d/Y')
     * @return {String} The formatted date string
     */
    date: function(v, format) {
        if (!v) {
            return "";
        }
        if (!Ext.isDate(v)) {
            v = new Date(Date.parse(v));
        }
        return v.dateFormat(format || Ext.util.Format.defaultDateFormat);
    }
};

/**
 * @class Ext.LoadMask
 * A simple utility class for generically masking elements while loading data.  If the {@link #store}
 * config option is specified, the masking will be automatically synchronized with the store's loading
 * process and the mask element will be cached for reuse.
 * <p>Example usage:</p>
 *<pre><code>
// Basic mask:
var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
myMask.show();
</code></pre>
 * @constructor
 * Create a new LoadMask
 * @param {Mixed} el The element or DOM node, or its id
 * @param {Object} config The config object
 */
Ext.LoadMask = Ext.extend(Ext.util.Observable, {
    /**
     * @cfg {Ext.data.Store} store
     * Optional Store to which the mask is bound. The mask is displayed when a load request is issued, and
     * hidden on either load sucess, or load fail.
     */

    /**
     * @cfg {String} msg
     * The text to display in a centered loading message box (defaults to 'Loading...')
     */
    msg : 'Loading...',
    /**
     * @cfg {String} msgCls
     * The CSS class to apply to the loading message element (defaults to "x-mask-loading")
     */
    msgCls : 'x-mask-loading',

    /**
     * Read-only. True if the mask is currently disabled so that it will not be displayed (defaults to false)
     * @type Boolean
     */
    disabled: false,

    constructor : function(el, config) {
        this.el = Ext.get(el);
        Ext.apply(this, config);

        this.addEvents('show', 'hide');
        if (this.store) {
            this.bindStore(this.store, true);
        }
        Ext.LoadMask.superclass.constructor.call(this);
    },

    /**
     * Changes the data store bound to this LoadMask.
     * @param {Store} store The store to bind to this LoadMask
     */
    bindStore : function(store, initial) {
        if (!initial && this.store) {
            this.mun(this.store, {
                scope: this,
                beforeload: this.onBeforeLoad,
                load: this.onLoad,
                exception: this.onLoad
            });
            if(!store) {
                this.store = null;
            }
        }
        if (store) {
            store = Ext.StoreMgr.lookup(store);
            this.mon(store, {
                scope: this,
                beforeload: this.onBeforeLoad,
                load: this.onLoad,
                exception: this.onLoad
            });

        }
        this.store = store;
        if (store && store.isLoading()) {
            this.onBeforeLoad();
        }
    },

    /**
     * Disables the mask to prevent it from being displayed
     */
    disable : function() {
       this.disabled = true;
    },

    /**
     * Enables the mask so that it can be displayed
     */
    enable : function() {
        this.disabled = false;
    },

    /**
     * Method to determine whether this LoadMask is currently disabled.
     * @return {Boolean} the disabled state of this LoadMask.
     */
    isDisabled : function() {
        return this.disabled;
    },

    // private
    onLoad : function() {
        this.el.unmask();
        this.fireEvent('hide', this, this.el, this.store);
    },

    // private
    onBeforeLoad : function() {
        if (!this.disabled) {
            this.el.mask(Ext.LoadingSpinner + '<div class="x-loading-msg">' + this.msg + '</div>', this.msgCls, false);
            this.fireEvent('show', this, this.el, this.store);
        }
    },

    /**
     * Show this LoadMask over the configured Element.
     */
    show: function() {
        this.onBeforeLoad();
    },

    /**
     * Hide this LoadMask.
     */
    hide: function() {
        this.onLoad();
    },

    // private
    destroy : function() {
        this.hide();
        this.clearListeners();
    }
});

Ext.LoadingSpinner = '<div class="x-loading-spinner"><span class="x-loading-top"></span><span class="x-loading-right"></span><span class="x-loading-bottom"></span><span class="x-loading-left"></span></div>';

