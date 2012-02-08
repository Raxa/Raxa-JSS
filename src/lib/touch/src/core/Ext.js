/**
 * @class Ext
 * @singleton
 */
(function() {
    var global = this,
        objectPrototype = Object.prototype,
        toString = Object.prototype.toString,
        enumerables = true,
        enumerablesTest = { toString: 1 },
        i;

    if (typeof Ext === 'undefined') {
        global.Ext = {};
    }

    Ext.global = global;

    for (i in enumerablesTest) {
        enumerables = null;
    }

    if (enumerables) {
        enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable',
                       'toLocaleString', 'toString', 'constructor'];
    }

    /**
     * An array containing extra enumerables for old browsers
     * @type Array
     * @hide
     */
    Ext.enumerables = enumerables;

    /**
     * Copies all the properties of config to the specified object.
     * Note that if recursive merging and cloning without referencing the original objects / arrays is needed, use
     * {@link Ext.Object#merge} instead.
     * @param {Object} object The receiver of the properties
     * @param {Object} config The source of the properties
     * @param {Object} defaults A different object that will also be applied for default values
     * @return {Object} returns obj
     */
    Ext.apply = function(object, config, defaults) {
        if (defaults) {
            Ext.apply(object, defaults);
        }

        if (object && config && typeof config === 'object') {
            var i, j, k;

            for (i in config) {
                object[i] = config[i];
            }

            if (enumerables) {
                for (j = enumerables.length; j--;) {
                    k = enumerables[j];
                    if (config.hasOwnProperty(k)) {
                        object[k] = config[k];
                    }
                }
            }
        }

        return object;
    };

    Ext.buildSettings = Ext.apply({
        baseCSSPrefix: 'x-',
        scopeResetCSS: false
    }, Ext.buildSettings || {});

    Ext.apply(Ext, {
        /**
         * A reusable empty function
         */
        emptyFn: function() {},

        baseCSSPrefix: Ext.buildSettings.baseCSSPrefix,

        /**
         * Copies all the properties of config to object if they don't already exist.
         * @function
         * @param {Object} object The receiver of the properties
         * @param {Object} config The source of the properties
         * @return {Object} returns obj
         */
        applyIf: function(object, config) {
            var property;

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
         * Iterates either an array or an object. This method delegates to
         * {@link Ext.Array#each Ext.Array.each} if the given value is iterable, and {@link Ext.Object#each Ext.Object.each} otherwise.
         *
         * @param {Object/Array} object The object or array to be iterated.
         * @param {Function} fn The function to be called for each iteration. See and {@link Ext.Array#each Ext.Array.each} and
         * {@link Ext.Object#each Ext.Object.each} for detailed lists of arguments passed to this function depending on the given object
         * type that is being iterated.
         * @param {Object} scope (Optional) The scope (`this` reference) in which the specified function is executed.
         * Defaults to the object being iterated itself.
         * @markdown
         */
        iterate: function(object, fn, scope) {
            if (Ext.isEmpty(object)) {
                return;
            }

            if (scope === undefined) {
                scope = object;
            }

            if (Ext.isIterable(object)) {
                Ext.Array.each.call(Ext.Array, object, fn, scope);
            }
            else {
                Ext.Object.each.call(Ext.Object, object, fn, scope);
            }
        }
    });

    Ext.apply(Ext, {

        /**
         * This method deprecated. Use {@link Ext#define Ext.define} instead.
         * @method
         * @param {Function} superclass
         * @param {Object} overrides
         * @return {Function} The subclass constructor from the <tt>overrides</tt> parameter, or a generated one if not provided.
         * @deprecated 2.0.0 Use {@link Ext#define Ext.define} instead
         */
        extend: function() {
            // inline overrides
            var objectConstructor = objectPrototype.constructor,
                inlineOverrides = function(o) {
                for (var m in o) {
                    if (!o.hasOwnProperty(m)) {
                        continue;
                    }
                    this[m] = o[m];
                }
            };

            return function(subclass, superclass, overrides) {
                // First we check if the user passed in just the superClass with overrides
                if (Ext.isObject(superclass)) {
                    overrides = superclass;
                    superclass = subclass;
                    subclass = overrides.constructor !== objectConstructor ? overrides.constructor: function() {
                        superclass.apply(this, arguments);
                    };
                }

                //<debug>
                if (!superclass) {
                    Ext.Logger.error('Attempting to extend from a class which has not been loaded on the page.');
                }
                //</debug>

                // We create a new temporary class
                var F = function() {},
                    subclassProto, superclassProto = superclass.prototype;

                F.prototype = superclassProto;
                subclassProto = subclass.prototype = new F();
                subclassProto.constructor = subclass;
                subclass.superclass = superclassProto;

                if (superclassProto.constructor === objectConstructor) {
                    superclassProto.constructor = superclass;
                }

                subclass.override = function(overrides) {
                    Ext.override(subclass, overrides);
                };

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
         * Proxy to {@link Ext.Base#override}. Please refer {@link Ext.Base#override} for further details.

    Ext.define('My.cool.Class', {
        sayHi: function() {
            alert('Hi!');
        }
    }

    Ext.override(My.cool.Class, {
        sayHi: function() {
            alert('About to say...');

            this.callOverridden();
        }
    });

    var cool = new My.cool.Class();
    cool.sayHi(); // alerts 'About to say...'
                  // alerts 'Hi!'

         * Please note that `this.callOverridden()` only works if the class was previously
         * created with {@link Ext#define)
         *
         * @param {Object} cls The class to override
         * @param {Object} overrides The list of functions to add to origClass. This should be specified as an object literal
         * containing one or more methods.
         * @method override
         * @markdown
         */
        override: function(cls, overrides) {
            if (cls.prototype.$className) {
                return cls.override(overrides);
            }
            else {
                Ext.apply(cls.prototype, overrides);
            }
        }
    });

    // A full set of static methods to do type checking
    Ext.apply(Ext, {

        /**
         * Returns the given value itself if it's not empty, as described in {@link Ext#isEmpty}; returns the default
         * value (second argument) otherwise.
         *
         * @param {Mixed} value The value to test
         * @param {Mixed} defaultValue The value to return if the original value is empty
         * @param {Boolean} allowBlank (optional) true to allow zero length strings to qualify as non-empty (defaults to false)
         * @return {Mixed} value, if non-empty, else defaultValue
         */
        valueFrom: function(value, defaultValue, allowBlank){
            return Ext.isEmpty(value, allowBlank) ? defaultValue : value;
        },

        /**
         * Returns the type of the given variable in string format. List of possible values are:
         *
         * - `undefined`: If the given value is `undefined`
         * - `null`: If the given value is `null`
         * - `string`: If the given value is a string
         * - `number`: If the given value is a number
         * - `boolean`: If the given value is a boolean value
         * - `date`: If the given value is a `Date` object
         * - `function`: If the given value is a function reference
         * - `object`: If the given value is an object
         * - `array`: If the given value is an array
         * - `regexp`: If the given value is a regular expression
         * - `element`: If the given value is a DOM Element
         * - `textnode`: If the given value is a DOM text node and contains something other than whitespace
         * - `whitespace`: If the given value is a DOM text node and contains only whitespace
         *
         * @param {Mixed} value
         * @return {String}
         * @markdown
         */
        typeOf: function(value) {
            if (value === null) {
                return 'null';
            }

            var type = typeof value;

            if (type === 'undefined' || type === 'string' || type === 'number' || type === 'boolean') {
                return type;
            }

            var typeToString = toString.call(value);

            switch(typeToString) {
                case '[object Array]':
                    return 'array';
                case '[object Date]':
                    return 'date';
                case '[object Boolean]':
                    return 'boolean';
                case '[object Number]':
                    return 'number';
                case '[object RegExp]':
                    return 'regexp';
            }

            if (type === 'function') {
                return 'function';
            }

            if (type === 'object') {
                if (value.nodeType !== undefined) {
                    if (value.nodeType === 3) {
                        return (/\S/).test(value.nodeValue) ? 'textnode' : 'whitespace';
                    }
                    else {
                        return 'element';
                    }
                }

                return 'object';
            }

            //<debug error>
            Ext.Logger.error('Failed to determine the type of the specified value "' + value + '". This is most likely a bug.');
            //</debug>
        },

        /**
         * Returns true if the passed value is empty, false otherwise. The value is deemed to be empty if it is either:
         *
         * - `null`
         * - `undefined`
         * - a zero-length array
         * - a zero-length string (Unless the `allowEmptyString` parameter is set to `true`)
         *
         * @param {Mixed} value The value to test
         * @param {Boolean} allowEmptyString (optional) true to allow empty strings (defaults to false)
         * @return {Boolean}
         * @markdown
         */
        isEmpty: function(value, allowEmptyString) {
            return (value === null) || (value === undefined) || (!allowEmptyString ? value === '' : false) || (Ext.isArray(value) && value.length === 0);
        },

        /**
         * Returns true if the passed value is a JavaScript Array, false otherwise.
         *
         * @param {Mixed} target The target to test
         * @return {Boolean}
         * @method
         */
        isArray: ('isArray' in Array) ? Array.isArray: function(value) {
            return toString.call(value) === '[object Array]';
        },

        /**
         * Returns true if the passed value is a JavaScript Date object, false otherwise.
         * @param {Object} object The object to test
         * @return {Boolean}
         */
        isDate: function(value) {
            return toString.call(value) === '[object Date]';
        },

        /**
         * Returns true if the passed value is a JavaScript Object, false otherwise.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         * @method
         */
        isObject: (toString.call(null) === '[object Object]') ?
        function(value) {
            return value !== null && value !== undefined && toString.call(value) === '[object Object]' && value.nodeType === undefined;
        } :
        function(value) {
            return toString.call(value) === '[object Object]';
        },

        /**
         * Returns true if the passed value is a JavaScript 'primitive', a string, number or boolean.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isPrimitive: function(value) {
            var type = typeof value;

            return type === 'string' || type === 'number' || type === 'boolean';
        },

        /**
         * Returns true if the passed value is a JavaScript Function, false otherwise.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         * @method
         */
        isFunction:
        // Safari 3.x and 4.x returns 'function' for typeof <NodeList>, hence we need to fall back to using
        // Object.prorotype.toString (slower)
        (typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function') ? function(value) {
            return toString.call(value) === '[object Function]';
        }: function(value) {
            return typeof value === 'function';
        },

        /**
         * Returns true if the passed value is a number. Returns false for non-finite numbers.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isNumber: function(value) {
            return typeof value === 'number' && isFinite(value);
        },

        /**
         * Validates that a value is numeric.
         * @param {Mixed} value Examples: 1, '1', '2.34'
         * @return {Boolean} True if numeric, false otherwise
         */
        isNumeric: function(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        },

        /**
         * Returns true if the passed value is a string.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isString: function(value) {
            return typeof value === 'string';
        },

        /**
         * Returns true if the passed value is a boolean.
         *
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isBoolean: function(value) {
            return typeof value === 'boolean';
        },

        /**
         * Returns true if the passed value is an HTMLElement
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isElement: function(value) {
            return value ? value.nodeType === 1 : false;
        },

        /**
         * Returns true if the passed value is a TextNode
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isTextNode: function(value) {
            return value ? value.nodeName === "#text" : false;
        },

        /**
         * Returns true if the passed value is defined.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isDefined: function(value) {
            return typeof value !== 'undefined';
        },

        /**
         * Returns true if the passed value is iterable, false otherwise
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isIterable: function(value) {
            return (value && typeof value !== 'string') ? value.length !== undefined : false;
        }
    });

    Ext.apply(Ext, {

        /**
         * Clone almost any type of variable including array, object, DOM nodes and Date without keeping the old reference
         * @param {Mixed} item The variable to clone
         * @return {Mixed} clone
         */
        clone: function(item) {
            if (item === null || item === undefined) {
                return item;
            }

            // DOM nodes
            if (item.nodeType && item.cloneNode) {
                return item.cloneNode(true);
            }

            var type = toString.call(item);

            // Date
            if (type === '[object Date]') {
                return new Date(item.getTime());
            }

            var i, j, k, clone, key;

            // Array
            if (type === '[object Array]') {
                i = item.length;

                clone = [];

                while (i--) {
                    clone[i] = Ext.clone(item[i]);
                }
            }
            // Object
            else if (type === '[object Object]' && item.constructor === Object) {
                clone = {};

                for (key in item) {
                    clone[key] = Ext.clone(item[key]);
                }

                if (enumerables) {
                    for (j = enumerables.length; j--;) {
                        k = enumerables[j];
                        clone[k] = item[k];
                    }
                }
            }

            return clone || item;
        },

        /**
         * @private
         * Generate a unique reference of Ext in the global scope, useful for sandboxing
         */
        getUniqueGlobalNamespace: function() {
            var uniqueGlobalNamespace = this.uniqueGlobalNamespace;

            if (uniqueGlobalNamespace === undefined) {
                var i = 0;

                do {
                    uniqueGlobalNamespace = 'ExtSandbox' + (++i);
                } while (Ext.global[uniqueGlobalNamespace] !== undefined);

                Ext.global[uniqueGlobalNamespace] = Ext;
                this.uniqueGlobalNamespace = uniqueGlobalNamespace;
            }

            return uniqueGlobalNamespace;
        },

        /**
         * @private
         */
        functionFactory: function() {
            var args = Array.prototype.slice.call(arguments);

            if (args.length > 0) {
                args[args.length - 1] = 'var Ext=window.' + this.getUniqueGlobalNamespace() + ';' +
                    args[args.length - 1];
            }

            return Function.prototype.constructor.apply(Function.prototype, args);
        }
    });

    /**
     * Old alias to {@link Ext#typeOf}
     * @deprecated 2.0.0 Use {@link Ext#typeOf} instead
     * @method
     */
    Ext.type = Ext.typeOf;

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
    emptyFn: function() {},

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
    override: function(origclass, overrides) {
        Ext.apply(origclass.prototype, overrides);
    },

    /**
     * Convert certain characters (&, <, >, and ') to their HTML character equivalents for literal display in web pages.
     * @param {String} value The string to encode
     * @return {String} The encoded text
     */
    htmlEncode: function(value) {
        return Ext.util.Format.htmlEncode(value);
    },

    /**
     * Convert certain characters (&, <, >, and ') from their HTML character equivalents.
     * @param {String} value The string to decode
     * @return {String} The decoded text
     */
    htmlDecode: function(value) {
         return Ext.util.Format.htmlDecode(value);
    },

    /**
     * Appends content to the query string of a URL, handling logic for whether to place
     * a question mark or ampersand.
     * @param {String} url The URL to append to.
     * @param {String} s The content to append to the URL.
     * @return (String) The resulting URL
     */
    urlAppend: function(url, s) {
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
     toArray: function(array, start, end) {
        return Array.prototype.slice.call(array, start || 0, end || array.length);
     },

    /**
     * Returns the current document body as an {@link Ext.Element}.
     * @return Ext.Element The document body
     */
    getBody: function() {
        return Ext.get(document.body || false);
    },

    /**
     * Returns the current document head as an {@link Ext.Element}.
     * @return Ext.Element The document head
     */
    getHead: function() {
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
    getDoc: function() {
        return Ext.get(document);
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
     * Returns the current orientation of the mobile device
     * @return {String} Either 'portrait' or 'landscape'
     */
    getOrientation: function() {
        return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
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
    }
});
