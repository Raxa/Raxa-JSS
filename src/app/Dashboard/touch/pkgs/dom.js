/**
 * @class Ext.Element
 * <p>Encapsulates a DOM element, adding simple DOM manipulation facilities, normalizing for browser differences.</p>
 * <p>All instances of this class inherit the methods of {@link Ext.Fx} making visual effects easily available to all DOM elements.</p>
 * <p>Note that the events documented in this class are not Ext events, they encapsulate browser events. To
 * access the underlying browser event, see {@link Ext.EventObject#browserEvent}. Some older
 * browsers may not support the full range of events. Which events are supported is beyond the control of ExtJs.</p>
 * Usage:<br>
<pre><code>
// by id
var el = Ext.get("my-div");

// by DOM element reference
var el = Ext.get(myDivElement);
</code></pre>
 * <b>Animations</b><br />
 * <p>When an element is manipulated, by default there is no animation.</p>
 * <pre><code>
var el = Ext.get("my-div");

// no animation
el.setWidth(100);
 * </code></pre>
 * <p>Many of the functions for manipulating an element have an optional "animate" parameter.  This
 * parameter can be specified as boolean (<tt>true</tt>) for default animation effects.</p>
 * <pre><code>
// default animation
el.setWidth(100, true);
 * </code></pre>
 *
 * <p>To configure the effects, an object literal with animation options to use as the Element animation
 * configuration object can also be specified. Note that the supported Element animation configuration
 * options are a subset of the {@link Ext.Fx} animation options specific to Fx effects.  The supported
 * Element animation configuration options are:</p>
<pre>
Option    Default   Description
--------- --------  ---------------------------------------------
{@link Ext.Fx#duration duration}  .35       The duration of the animation in seconds
{@link Ext.Fx#easing easing}    easeOut   The easing method
{@link Ext.Fx#callback callback}  none      A function to execute when the anim completes
{@link Ext.Fx#scope scope}     this      The scope (this) of the callback function
</pre>
 *
 * <pre><code>
// Element animation options object
var opt = {
    {@link Ext.Fx#duration duration}: 1,
    {@link Ext.Fx#easing easing}: 'elasticIn',
    {@link Ext.Fx#callback callback}: this.foo,
    {@link Ext.Fx#scope scope}: this
};
// animation with some options set
el.setWidth(100, opt);
 * </code></pre>
 * <p>The Element animation object being used for the animation will be set on the options
 * object as "anim", which allows you to stop or manipulate the animation. Here is an example:</p>
 * <pre><code>
// using the "anim" property to get the Anim object
if(opt.anim.isAnimated()){
    opt.anim.stop();
}
 * </code></pre>
 * <p>Also see the <tt>{@link #animate}</tt> method for another animation technique.</p>
 * <p><b> Composite (Collections of) Elements</b></p>
 * <p>For working with collections of Elements, see {@link Ext.CompositeElement}</p>
 * @constructor Create a new Element directly.
 * @param {String/HTMLElement} element
 * @param {Boolean} forceNew (optional) By default the constructor checks to see if there is already an instance of this element in the cache and if there is it returns the same instance. This will skip that check (useful for extending this class).
 */

(function() {
var El = Ext.Element = Ext.extend(Object, {
    /**
     * The default unit to append to CSS values where a unit isn't provided (defaults to px).
     * @type String
     */
    defaultUnit : "px",

    constructor : function(element, forceNew) {
        var dom = typeof element == 'string'
                ? document.getElementById(element)
                : element,
            id;

        if (!dom) {
            return null;
        }

        id = dom.id;
        if (!forceNew && id && Ext.cache[id]) {
            return Ext.cache[id].el;
        }

        /**
         * The DOM element
         * @type HTMLElement
         */
        this.dom = dom;

        /**
         * The DOM element ID
         * @type String
         */
        this.id = id || Ext.id(dom);
        return this;
    },

    /**
     * Sets the passed attributes as attributes of this element (a style attribute can be a string, object or function)
     * @param {Object} o The object with the attributes
     * @param {Boolean} useSet (optional) false to override the default setAttribute to use expandos.
     * @return {Ext.Element} this
     */
    set : function(o, useSet) {
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
                    el.setAttribute(attr, value);
                }
                else {
                    el[attr] = value;
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
    is : function(simpleSelector) {
        return Ext.DomQuery.is(this.dom, simpleSelector);
    },

    /**
     * Returns the value of the "value" attribute
     * @param {Boolean} asNumber true to parse the value as a number
     * @return {String/Number}
     */
    getValue : function(asNumber){
        var val = this.dom.value;
        return asNumber ? parseInt(val, 10) : val;
    },

    /**
     * Appends an event handler to this element.  The shorthand version {@link #on} is equivalent.
     * @param {String} eventName The name of event to handle.
     * @param {Function} fn The handler function the event invokes. This function is passed
     * the following parameters:<ul>
     * <li><b>evt</b> : EventObject<div class="sub-desc">The {@link Ext.EventObject EventObject} describing the event.</div></li>
     * <li><b>el</b> : HtmlElement<div class="sub-desc">The DOM element which was the target of the event.
     * Note that this may be filtered by using the <tt>delegate</tt> option.</div></li>
     * <li><b>o</b> : Object<div class="sub-desc">The options object from the addListener call.</div></li>
     * </ul>
     * @param {Object} scope (optional) The scope (<code><b>this</b></code> reference) in which the handler function is executed.
     * <b>If omitted, defaults to this Element.</b>.
     * @param {Object} options (optional) An object containing handler configuration properties.
     * This may contain any of the following properties:<ul>
     * <li><b>scope</b> Object : <div class="sub-desc">The scope (<code><b>this</b></code> reference) in which the handler function is executed.
     * <b>If omitted, defaults to this Element.</b></div></li>
     * <li><b>delegate</b> String: <div class="sub-desc">A simple selector to filter the target or look for a descendant of the target. See below for additional details.</div></li>
     * <li><b>stopEvent</b> Boolean: <div class="sub-desc">True to stop the event. That is stop propagation, and prevent the default action.</div></li>
     * <li><b>preventDefault</b> Boolean: <div class="sub-desc">True to prevent the default action</div></li>
     * <li><b>stopPropagation</b> Boolean: <div class="sub-desc">True to prevent event propagation</div></li>
     * <li><b>normalized</b> Boolean: <div class="sub-desc">False to pass a browser event to the handler function instead of an Ext.EventObject</div></li>
     * <li><b>target</b> Ext.Element: <div class="sub-desc">Only call the handler if the event was fired on the target Element, <i>not</i> if the event was bubbled up from a child node.</div></li>
     * <li><b>delay</b> Number: <div class="sub-desc">The number of milliseconds to delay the invocation of the handler after the event fires.</div></li>
     * <li><b>single</b> Boolean: <div class="sub-desc">True to add a handler to handle just the next firing of the event, and then remove itself.</div></li>
     * <li><b>buffer</b> Number: <div class="sub-desc">Causes the handler to be scheduled to run in an {@link Ext.util.DelayedTask} delayed
     * by the specified number of milliseconds. If the event fires again within that time, the original
     * handler is <em>not</em> invoked, but the new handler is scheduled in its place.</div></li>
     * </ul><br>
     * <p>
     * <b>Combining Options</b><br>
     * In the following examples, the shorthand form {@link #on} is used rather than the more verbose
     * addListener.  The two are equivalent.  Using the options argument, it is possible to combine different
     * types of listeners:<br>
     * <br>
     * A delayed, one-time listener that auto stops the event and adds a custom argument (forumId) to the
     * options object. The options object is available as the third parameter in the handler function.<div style="margin: 5px 20px 20px;">
     * Code:<pre><code>
el.on('tap', this.onTap, this, {
    single: true,
    delay: 100,
    stopEvent : true
});</code></pre></p>
     * <p>
     * <b>Attaching multiple handlers in 1 call</b><br>
     * The method also allows for a single argument to be passed which is a config object containing properties
     * which specify multiple handlers.</p>
     * <p>
     * Code:<pre><code>
el.on({
    'tap' : {
        fn: this.onTap,
        scope: this
    },
    'doubletap' : {
        fn: this.onDoubleTap,
        scope: this
    },
    'swipe' : {
        fn: this.onSwipe,
        scope: this
    }
});</code></pre>
     * <p>
     * Or a shorthand syntax:<br>
     * Code:<pre><code></p>
el.on({
    'tap' : this.onTap,
    'doubletap' : this.onDoubleTap,
    'swipe' : this.onSwipe,
    scope: this
});
     * </code></pre></p>
     * <p><b>delegate</b></p>
     * <p>This is a configuration option that you can pass along when registering a handler for
     * an event to assist with event delegation. Event delegation is a technique that is used to
     * reduce memory consumption and prevent exposure to memory-leaks. By registering an event
     * for a container element as opposed to each element within a container. By setting this
     * configuration option to a simple selector, the target element will be filtered to look for
     * a descendant of the target.
     * For example:<pre><code>
// using this markup:
&lt;div id='elId'>
    &lt;p id='p1'>paragraph one&lt;/p>
    &lt;p id='p2' class='clickable'>paragraph two&lt;/p>
    &lt;p id='p3'>paragraph three&lt;/p>
&lt;/div>
// utilize event delegation to registering just one handler on the container element:
el = Ext.get('elId');
el.on(
    'tap',
    function(e,t) {
        // handle click
        console.info(t.id); // 'p2'
    },
    this,
    {
        // filter the target element to be a descendant with the class 'tappable'
        delegate: '.tappable'
    }
);
     * </code></pre></p>
     * @return {Ext.Element} this
     */
    addListener : function(eventName, fn, scope, options){
        Ext.EventManager.on(this.dom,  eventName, fn, scope || this, options);
        return this;
    },

    /**
     * Removes an event handler from this element.  The shorthand version {@link #un} is equivalent.
     * <b>Note</b>: if a <i>scope</i> was explicitly specified when {@link #addListener adding} the
     * listener, the same scope must be specified here.
     * Example:
     * <pre><code>
el.removeListener('tap', this.handlerFn);
// or
el.un('tap', this.handlerFn);
</code></pre>
     * @param {String} eventName The name of the event from which to remove the handler.
     * @param {Function} fn The handler function to remove. <b>This must be a reference to the function passed into the {@link #addListener} call.</b>
     * @param {Object} scope If a scope (<b><code>this</code></b> reference) was specified when the listener was added,
     * then this must refer to the same object.
     * @return {Ext.Element} this
     */
    removeListener : function(eventName, fn, scope) {
        Ext.EventManager.un(this.dom, eventName, fn, scope);
        return this;
    },

    /**
     * Removes all previous added listeners from this element
     * @return {Ext.Element} this
     */
    removeAllListeners : function(){
        Ext.EventManager.removeAll(this.dom);
        return this;
    },

    /**
     * Recursively removes all previous added listeners from this element and its children
     * @return {Ext.Element} this
     */
    purgeAllListeners : function() {
        Ext.EventManager.purgeElement(this, true);
        return this;
    },

    /**
     * <p>Removes this element's dom reference.  Note that event and cache removal is handled at {@link Ext#removeNode}</p>
     */
    remove : function() {
        var me = this,
            dom = me.dom;

        if (dom) {
            delete me.dom;
            Ext.removeNode(dom);
        }
    },

    isAncestor : function(c) {
        var p = this.dom;
        c = Ext.getDom(c);
        if (p && c) {
            return p.contains(c);
        }
        return false;
    },

    /**
     * Determines if this element is a descendent of the passed in Element.
     * @param {Mixed} element An Ext.Element, HTMLElement or string linking to an id of an Element.
     * @returns {Boolean}
     */
    isDescendent : function(p) {
        return Ext.fly(p, '_internal').isAncestor(this);
    },

    /**
     * Returns true if this element is an ancestor of the passed element
     * @param {HTMLElement/String} el The element to check
     * @return {Boolean} True if this element is an ancestor of el, else false
     */
    contains : function(el) {
        return !el ? false : this.isAncestor(el);
    },

    /**
     * Returns the value of an attribute from the element's underlying DOM node.
     * @param {String} name The attribute name
     * @param {String} namespace (optional) The namespace in which to look for the attribute
     * @return {String} The attribute value
     */
    getAttribute : function(name, ns) {
        var d = this.dom;
        return d.getAttributeNS(ns, name) || d.getAttribute(ns + ":" + name) || d.getAttribute(name) || d[name];
    },

    /**
    * Set the innerHTML of this element
    * @param {String} html The new HTML
    * @return {Ext.Element} this
     */
    setHTML : function(html) {
        if(this.dom) {
            this.dom.innerHTML = html;
        }
        return this;
    },

    /**
     * Returns the innerHTML of an Element or an empty string if the element's
     * dom no longer exists.
     */
    getHTML : function() {
        return this.dom ? this.dom.innerHTML : '';
    },

    /**
     * Hide this element - Uses display mode to determine whether to use "display" or "visibility". See {@link #setVisible}.
     * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
     * @return {Ext.Element} this
     */
    hide : function() {
        this.setVisible(false);
        return this;
    },

    /**
    * Show this element - Uses display mode to determine whether to use "display" or "visibility". See {@link #setVisible}.
    * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
     * @return {Ext.Element} this
     */
    show : function() {
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
     setVisible : function(visible, animate) {
        var me = this,
            dom = me.dom,
            mode = this.getVisibilityMode();

        switch (mode) {
            case El.VISIBILITY:
                this.removeCls(['x-hidden-display', 'x-hidden-offsets']);
                this[visible ? 'removeCls' : 'addCls']('x-hidden-visibility');
            break;

            case El.DISPLAY:
                this.removeCls(['x-hidden-visibility', 'x-hidden-offsets']);
                this[visible ? 'removeCls' : 'addCls']('x-hidden-display');
            break;

            case El.OFFSETS:
                this.removeCls(['x-hidden-visibility', 'x-hidden-display']);
                this[visible ? 'removeCls' : 'addCls']('x-hidden-offsets');
            break;
        }

        return me;
    },

    getVisibilityMode: function() {
        var dom = this.dom,
            mode = El.data(dom, 'visibilityMode');

        if (mode === undefined) {
            El.data(dom, 'visibilityMode', mode = El.DISPLAY);
        }

        return mode;
    },

    setVisibilityMode : function(mode) {
        El.data(this.dom, 'visibilityMode', mode);
        return this;
    }
});

var Elp = El.prototype;

/**
 * Visibility mode constant for use with {@link #setVisibilityMode}. Use visibility to hide element
 * @static
 * @type Number
 */
El.VISIBILITY = 1;
/**
 * Visibility mode constant for use with {@link #setVisibilityMode}. Use display to hide element
 * @static
 * @type Number
 */
El.DISPLAY = 2;
/**
 * Visibility mode constant for use with {@link #setVisibilityMode}. Use offsets to hide element
 * @static
 * @type Number
 */
El.OFFSETS = 3;


El.addMethods = function(o){
   Ext.apply(Elp, o);
};


Elp.on = Elp.addListener;
Elp.un = Elp.removeListener;

// Alias for people used to Ext JS and Ext Core
Elp.update = Elp.setHTML;

/**
 * Retrieves Ext.Element objects.
 * <p><b>This method does not retrieve {@link Ext.Component Component}s.</b> This method
 * retrieves Ext.Element objects which encapsulate DOM elements. To retrieve a Component by
 * its ID, use {@link Ext.ComponentMgr#get}.</p>
 * <p>Uses simple caching to consistently return the same object. Automatically fixes if an
 * object was recreated with the same id via AJAX or DOM.</p>
 * @param {Mixed} el The id of the node, a DOM Node or an existing Element.
 * @return {Element} The Element object (or null if no matching element was found)
 * @static
 * @member Ext.Element
 * @method get
 */
El.get = function(el){
    var extEl,
        dom,
        id;

    if(!el){
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
            extEl = El.addToCache(new El(dom));
        }
        return extEl;
    } else if (el.tagName) { // dom element
        if(!(id = el.id)){
            id = Ext.id(el);
        }
        if (Ext.cache[id] && Ext.cache[id].el) {
            extEl = Ext.cache[id].el;
            extEl.dom = el;
        } else {
            extEl = El.addToCache(new El(el));
        }
        return extEl;
    } else if (el instanceof El) {
        if(el != El.docEl){
            // refresh dom element in case no longer valid,
            // catch case where it hasn't been appended
            el.dom = document.getElementById(el.id) || el.dom;
        }
        return el;
    } else if(el.isComposite) {
        return el;
    } else if(Ext.isArray(el)) {
        return El.select(el);
    } else if(el == document) {
        // create a bogus element object representing the document object
        if(!El.docEl){
            var F = function(){};
            F.prototype = Elp;
            El.docEl = new F();
            El.docEl.dom = document;
            El.docEl.id = Ext.id(document);
        }
        return El.docEl;
    }
    return null;
};

// private
El.addToCache = function(el, id){
    id = id || el.id;
    Ext.cache[id] = {
        el:  el,
        data: {},
        events: {}
    };
    return el;
};

// private method for getting and setting element data
El.data = function(el, key, value) {
    el = El.get(el);
    if (!el) {
        return null;
    }
    var c = Ext.cache[el.id].data;
    if (arguments.length == 2) {
        return c[key];
    }
    else {
        return (c[key] = value);
    }
};

// private
// Garbage collection - uncache elements/purge listeners on orphaned elements
// so we don't hold a reference and cause the browser to retain them
El.garbageCollect = function() {
    if (!Ext.enableGarbageCollector) {
        clearInterval(El.collectorThreadId);
    }
    else {
        var id,
            dom,
            EC = Ext.cache;

        for (id in EC) {
            if (!EC.hasOwnProperty(id)) {
                continue;
            }
            if(EC[id].skipGarbageCollection){
                continue;
            }
            dom = EC[id].el.dom;
            if(!dom || !dom.parentNode || (!dom.offsetParent && !document.getElementById(id))){
                if(Ext.enableListenerCollection){
                    Ext.EventManager.removeAll(dom);
                }
                delete EC[id];
            }
        }
    }
};
//El.collectorThreadId = setInterval(El.garbageCollect, 20000);

// dom is optional
El.Flyweight = function(dom) {
    this.dom = dom;
};

var F = function(){};
F.prototype = Elp;

El.Flyweight.prototype = new F;
El.Flyweight.prototype.isFlyweight = true;

El._flyweights = {};

/**
 * <p>Gets the globally shared flyweight Element, with the passed node as the active element. Do not store a reference to this element -
 * the dom node can be overwritten by other code. Shorthand of {@link Ext.Element#fly}</p>
 * <p>Use this to make one-time references to DOM elements which are not going to be accessed again either by
 * application code, or by Ext's classes. If accessing an element which will be processed regularly, then {@link Ext#get}
 * will be more appropriate to take advantage of the caching provided by the Ext.Element class.</p>
 * @param {String/HTMLElement} el The dom node or id
 * @param {String} named (optional) Allows for creation of named reusable flyweights to prevent conflicts
 * (e.g. internally Ext uses "_global")
 * @return {Element} The shared Element object (or null if no matching element was found)
 * @member Ext.Element
 * @method fly
 */
El.fly = function(el, named) {
    var ret = null;
    named = named || '_global';

    el = Ext.getDom(el);
    if (el) {
        (El._flyweights[named] = El._flyweights[named] || new El.Flyweight()).dom = el;
        ret = El._flyweights[named];
    }

    return ret;
};

/**
 * Retrieves Ext.Element objects.
 * <p><b>This method does not retrieve {@link Ext.Component Component}s.</b> This method
 * retrieves Ext.Element objects which encapsulate DOM elements. To retrieve a Component by
 * its ID, use {@link Ext.ComponentMgr#get}.</p>
 * <p>Uses simple caching to consistently return the same object. Automatically fixes if an
 * object was recreated with the same id via AJAX or DOM.</p>
 * Shorthand of {@link Ext.Element#get}
 * @param {Mixed} el The id of the node, a DOM Node or an existing Element.
 * @return {Element} The Element object (or null if no matching element was found)
 * @member Ext
 * @method get
 */
Ext.get = El.get;

/**
 * <p>Gets the globally shared flyweight Element, with the passed node as the active element. Do not store a reference to this element -
 * the dom node can be overwritten by other code. Shorthand of {@link Ext.Element#fly}</p>
 * <p>Use this to make one-time references to DOM elements which are not going to be accessed again either by
 * application code, or by Ext's classes. If accessing an element which will be processed regularly, then {@link Ext#get}
 * will be more appropriate to take advantage of the caching provided by the Ext.Element class.</p>
 * @param {String/HTMLElement} el The dom node or id
 * @param {String} named (optional) Allows for creation of named reusable flyweights to prevent conflicts
 * (e.g. internally Ext uses "_global")
 * @return {Element} The shared Element object (or null if no matching element was found)
 * @member Ext
 * @method fly
 */
Ext.fly = El.fly;

/*Ext.EventManager.on(window, 'unload', function(){
    delete Ext.cache;
    delete El._flyweights;
});*/

})();

/**
 * @class Ext.Element
 */
Ext.applyIf(Ext.Element, {
    unitRe: /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,
    camelRe: /(-[a-z])/gi,
    opacityRe: /alpha\(opacity=(.*)\)/i,
    propertyCache: {},
    defaultUnit : "px",
    borders: {l: 'border-left-width', r: 'border-right-width', t: 'border-top-width', b: 'border-bottom-width'},
    paddings: {l: 'padding-left', r: 'padding-right', t: 'padding-top', b: 'padding-bottom'},
    margins: {l: 'margin-left', r: 'margin-right', t: 'margin-top', b: 'margin-bottom'},

    addUnits : function(size, units) {
        if (size === "" || size == "auto" || size === null || size === undefined) {
            size = size || '';
        }
        else if (!isNaN(size) || !this.unitRe.test(size)) {
            size = size + (units || this.defaultUnit || 'px');
        }
        return size;
    },

    /**
     * Parses a number or string representing margin sizes into an object. Supports CSS-style margin declarations
     * (e.g. 10, "10", "10 10", "10 10 10" and "10 10 10 10" are all valid options and would return the same result)
     * @param {Number|String} box The encoded margins
     * @return {Object} An object with margin sizes for top, right, bottom and left
     */
    parseBox : function(box) {
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
     * @param {Number|String} box The encoded margins
     * @param {String} units The type of units to add
     * @return {String} An string with unitized (px if units is not specified) metrics for top, right, bottom and left
     */
    unitizeBox : function(box, units) {
        var A = this.addUnits,
            B = this.parseBox(box);
            
        return A(B.top, units) + ' ' +
               A(B.right, units) + ' ' +
               A(B.bottom, units) + ' ' +
               A(B.left, units);
        
    },

    // private
    camelReplaceFn : function(m, a) {
        return a.charAt(1).toUpperCase();
    },

    /**
     * Normalizes CSS property keys from dash delimited to camel case JavaScript Syntax.
     * For example:
     * <ul>
     *  <li>border-width -> borderWidth</li>
     *  <li>padding-top -> paddingTop</li>
     * </ul>
     */
    normalize : function(prop) {
        return this.propertyCache[prop] || (this.propertyCache[prop] = prop == 'float' ? 'cssFloat' : prop.replace(this.camelRe, this.camelReplaceFn));
    },

    /**
     * Retrieves the document height
     * @returns {Number} documentHeight
     */
    getDocumentHeight: function() {
        return Math.max(!Ext.isStrict ? document.body.scrollHeight : document.documentElement.scrollHeight, this.getViewportHeight());
    },

    /**
     * Retrieves the document width
     * @returns {Number} documentWidth
     */
    getDocumentWidth: function() {
        return Math.max(!Ext.isStrict ? document.body.scrollWidth : document.documentElement.scrollWidth, this.getViewportWidth());
    },

    /**
     * Retrieves the viewport height of the window.
     * @returns {Number} viewportHeight
     */
    getViewportHeight: function(){
        return window.innerHeight;
    },

    /**
     * Retrieves the viewport width of the window.
     * @returns {Number} viewportWidth
     */
    getViewportWidth : function() {
        return window.innerWidth;
    },

    /**
     * Retrieves the viewport size of the window.
     * @returns {Object} object containing width and height properties
     */
    getViewSize : function() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    },

    /**
     * Retrieves the current orientation of the window. This is calculated by
     * determing if the height is greater than the width.
     * @returns {String} Orientation of window: 'portrait' or 'landscape'
     */
    getOrientation : function() {
        if (Ext.supports.OrientationChange) {
            return (window.orientation == 0) ? 'portrait' : 'landscape';
        }
        
        return (window.innerHeight > window.innerWidth) ? 'portrait' : 'landscape';
    },

    /**
     * Returns the top Element that is located at the passed coordinates
     * Function description
     * @param {Number} x The x coordinate
     * @param {Number} y The y coordinate
     * @return {String} The found Element
     */
    fromPoint: function(x, y) {
        return Ext.get(document.elementFromPoint(x, y));
    }
});

/**
 * @class Ext.Element
 */
Ext.applyIf(Ext.Element, {
    
    /**
     * Returns the calculated CSS 2D transform offset values (translate x and y)
     * @static
     * @param {Ext.Element/Element} el the element
     * @return {Ext.util.Offset} instance of Ext.util.Offset, with x and y properties
     */
    getComputedTransformOffset: function(el) {
        if (el instanceof Ext.Element)
            el = el.dom;
            
        var transform = window.getComputedStyle(el).webkitTransform,
            cssMatrix = transform != 'none' ? new WebKitCSSMatrix(transform) : new WebKitCSSMatrix();

        if (typeof cssMatrix.m41 != 'undefined') {
            return new Ext.util.Offset(cssMatrix.m41, cssMatrix.m42);
        } else if (typeof cssMatrix.d != 'undefined') {
            return new Ext.util.Offset(cssMatrix.d, cssMatrix.e);
        }

        return new Ext.util.Offset(0, 0);
    },

    /**
     * Transform an element using CSS 3
     * @static
     * @param {Ext.Element/Element} el the element
     * @param {Object} transforms an object with all transformation to be applied. The keys are transformation method names,
     * the values are arrays of params or a single number if there's only one param e.g:
     *
     * {
     *      translate: [0, 1, 2],
     *      scale: 0.5,
     *      skew: -25,
     *      rotate: 7
     * }
     */
    cssTransform: function(el, transforms) {
        if (el instanceof Ext.Element)
            el = el.dom;

        var m = new WebKitCSSMatrix();

        Ext.iterate(transforms, function(n, v) {
            v = Ext.isArray(v) ? v : [v];
            m = m[n].apply(m, v);
        });

        // To enable hardware accelerated transforms on iOS (v3 only, fixed in v4?) we have to build the string manually
        // Other than that simply apply the matrix works perfectly on the rest of devices including Androids & Blackberry
        if (Ext.supports.CSS3DTransform) {
            el.style.webkitTransform = 'matrix3d(' +
                                            m.m11+', '+m.m12+', '+m.m13+', '+m.m14+', '+
                                            m.m21+', '+m.m22+', '+m.m23+', '+m.m24+', '+
                                            m.m31+', '+m.m32+', '+m.m33+', '+m.m34+', '+
                                            m.m41+', '+m.m42+', '+m.m43+', '+m.m44+
                                       ')';
        } else {
            el.style.webkitTransform = m;
        }
    },

    /**
     * Translate an element using CSS 3 in 2D. This is supposed to be faster than cssTransform when we only need to translate
     * an element without reserving its original matrix
     * @param {Ext.Element/Element} el the element
     * @param {Ext.util.Offset/Object} offset The new offset with format
     *
     * {
     *      x: offsetX,
     *      y: offsetY
     * }
     */
    cssTranslate: function(el, offset) {
        if (el instanceof Ext.Element)
            el = el.dom;

        if (Ext.supports.CSS3DTransform) {
            el.style.webkitTransform = 'translate3d('+offset.x+'px, '+offset.y+'px, 0px)';
        } else {
            el.style.webkitTransform = 'translate('+offset.x+'px, '+offset.y+'px)';
        }
    }

});

/**
 * @class Ext.Element
 */
Ext.Element.addMethods({
    /**
      * Gets the current Y position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
      * @return {Number} The Y position of the element
      */
    getY : function(el) {
        return this.getXY(el)[1];
    },

    /**
      * Gets the current X position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
      * @return {Number} The X position of the element
      */
    getX : function(el) {
        return this.getXY(el)[0];
    },

    /**
      * Gets the current position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
      * @return {Array} The XY position of the element
      */
    getXY : function() {
        // @FEATUREDETECT
        var point = window.webkitConvertPointFromNodeToPage(this.dom, new WebKitPoint(0, 0));
        return [point.x, point.y];
    },

    /**
      * Returns the offsets of this element from the passed element. Both element must be part of the DOM tree and not have display:none to have page coordinates.
      * @param {Mixed} element The element to get the offsets from.
      * @return {Array} The XY page offsets (e.g. [100, -200])
      */
    getOffsetsTo : function(el){
        var o = this.getXY(),
            e = Ext.fly(el, '_internal').getXY();
        return [o[0]-e[0],o[1]-e[1]];
    },

    /**
     * Sets the position of the element in page coordinates, regardless of how the element is positioned.
     * The element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
     * @param {Array} pos Contains X & Y [x, y] values for new position (coordinates are page-based)
     * @return {Ext.Element} this
     */
    setXY : function(pos) {
        var me = this;

        if(arguments.length > 1) {
            pos = [pos, arguments[1]];
        }

        // me.position();
        var pts = me.translatePoints(pos),
            style = me.dom.style;

        for (pos in pts) {
            if (!pts.hasOwnProperty(pos)) {
                continue;
            }
            if(!isNaN(pts[pos])) style[pos] = pts[pos] + "px";
        }
        return me;
    },

    /**
     * Sets the X position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
     * @param {Number} The X position of the element
     * @return {Ext.Element} this
     */
    setX : function(x){
        return this.setXY([x, this.getY()]);
    },

    /**
     * Sets the Y position of the element based on page coordinates.  Element must be part of the DOM tree to have page coordinates (display:none or elements not appended return false).
     * @param {Number} The Y position of the element
     * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
     * @return {Ext.Element} this
     */
    setY : function(y) {
        return this.setXY([this.getX(), y]);
    },

    /**
     * Sets the element's left position directly using CSS style (instead of {@link #setX}).
     * @param {String} left The left CSS property value
     * @return {Ext.Element} this
     */
    setLeft : function(left) {
        this.setStyle('left', Ext.Element.addUnits(left));
        return this;
    },

    /**
     * Sets the element's top position directly using CSS style (instead of {@link #setY}).
     * @param {String} top The top CSS property value
     * @return {Ext.Element} this
     */
    setTop : function(top) {
        this.setStyle('top', Ext.Element.addUnits(top));
        return this;
    },

    /**
     * Sets the element's top and left positions directly using CSS style (instead of {@link #setXY})
     * @param {String} top The top CSS property value
     * @param {String} left The left CSS property value
     */
    setTopLeft: function(top, left) {
        var addUnits = Ext.Element.addUnits;

        this.setStyle('top', addUnits(top));
        this.setStyle('left', addUnits(left));

        return this;
    },

    /**
     * Sets the element's CSS right style.
     * @param {String} right The right CSS property value
     * @return {Ext.Element} this
     */
    setRight : function(right) {
        this.setStyle('right', Ext.Element.addUnits(right));
        return this;
    },

    /**
     * Sets the element's CSS bottom style.
     * @param {String} bottom The bottom CSS property value
     * @return {Ext.Element} this
     */
    setBottom : function(bottom) {
        this.setStyle('bottom', Ext.Element.addUnits(bottom));
        return this;
    },

    /**
     * Gets the left X coordinate
     * @param {Boolean} local True to get the local css position instead of page coordinate
     * @return {Number}
     */
    getLeft : function(local) {
        return parseInt(this.getStyle('left'), 10) || 0;
    },

    /**
     * Gets the right X coordinate of the element (element X position + element width)
     * @param {Boolean} local True to get the local css position instead of page coordinate
     * @return {Number}
     */
    getRight : function(local) {
        return parseInt(this.getStyle('right'), 10) || 0;
    },

    /**
     * Gets the top Y coordinate
     * @param {Boolean} local True to get the local css position instead of page coordinate
     * @return {Number}
     */
    getTop : function(local) {
        return parseInt(this.getStyle('top'), 10) || 0;
    },

    /**
     * Gets the bottom Y coordinate of the element (element Y position + element height)
     * @param {Boolean} local True to get the local css position instead of page coordinate
     * @return {Number}
     */
    getBottom : function(local) {
        return parseInt(this.getStyle('bottom'), 10) || 0;
    },

    /**
     * Sets the element's box. Use getBox() on another element to get a box obj. If animate is true then width, height, x and y will be animated concurrently.
     * @param {Object} box The box to fill {x, y, width, height}
     * @return {Ext.Element} this
     */
    setBox : function(left, top, width, height) {
        var undefined;
        if (Ext.isObject(left)) {
            width = left.width;
            height = left.height;
            top = left.top;
            left = left.left;
        }
        
        if (left !== undefined) {
            this.setLeft(left);
        }
        if (top !== undefined) {
            this.setTop(top);
        }
        if (width !== undefined) {
            this.setWidth(width);
        }
        if (height !== undefined) {
            this.setHeight(height);
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
    getBox : function(contentBox, local) {
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
    getPageBox : function(getRegion) {
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
    },

    /**
     * Translates the passed page coordinates into left/top css values for this element
     * @param {Number/Array} x The page x or an array containing [x, y]
     * @param {Number} y (optional) The page y, required if x is not an array
     * @return {Object} An object with left and top properties. e.g. {left: (value), top: (value)}
     */
    translatePoints : function(x, y) {
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
    }
});

(function() {
    /**
     * @class Ext.Element
     */
    Ext.Element.classReCache = {};
    var El = Ext.Element,
        view = document.defaultView;

    El.addMethods({
        marginRightRe: /marginRight/i,
        trimRe: /^\s+|\s+$/g,
        spacesRe: /\s+/,

        /**
         * Adds one or more CSS classes to the element. Duplicate classes are automatically filtered out.
         * @param {String/Array} className The CSS class to add, or an array of classes
         * @return {Ext.Element} this
         */
        addCls: function(className) {
            var me = this,
                i,
                len,
                v,
                cls = [];

            if (!Ext.isArray(className)) {
                if (className && !this.hasCls(className)) {
                    me.dom.className += " " + className;
                }
            }
            else {
                for (i = 0, len = className.length; i < len; i++) {
                    v = className[i];
                    if (v && !me.hasCls(v)) {
                        cls.push(v);
                    }
                }
                if (cls.length) {
                    me.dom.className += " " + cls.join(" ");
                }
            }
            return me;
        },
        
        //<debug>
        addClass : function() {
            throw new Error("Component: addClass has been deprecated. Please use addCls.");
        },
        //</debug>

        /**
         * Removes one or more CSS classes from the element.
         * @param {String/Array} className The CSS class to remove, or an array of classes
         * @return {Ext.Element} this
         */
        removeCls: function(className) {
            var me = this,
                i,
                idx,
                len,
                cls,
                elClasses;
            if (!Ext.isArray(className)) {
                className = [className];
            }
            if (me.dom && me.dom.className) {
                elClasses = me.dom.className.replace(this.trimRe, '').split(this.spacesRe);
                for (i = 0, len = className.length; i < len; i++) {
                    cls = className[i];
                    if (typeof cls == 'string') {
                        cls = cls.replace(this.trimRe, '');
                        idx = elClasses.indexOf(cls);
                        if (idx != -1) {
                            elClasses.splice(idx, 1);
                        }
                    }
                }
                me.dom.className = elClasses.join(" ");
            }
            return me;
        },
        
        //<debug>
        removeClass : function() {
            throw new Error("Component: removeClass has been deprecated. Please use removeCls.");
        },
        //</debug>

        /**
         * Puts a mask over this element to disable user interaction.
         * This method can only be applied to elements which accept child nodes.
         * @param {String} msg (optional) A message to display in the mask. This can be html.
         * @param {String} msgCls (optional) A css class to apply to the msg element
         * @param {Boolean} transparent (optional) False to show make the mask gray with opacity. (defaults to true)
         * @return {Element} The mask element
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
        },

        /**
         * Adds one or more CSS classes to this element and removes the same class(es) from all siblings.
         * @param {String/Array} className The CSS class to add, or an array of classes
         * @return {Ext.Element} this
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
        
        //<debug>
        radioClass : function() {
            throw new Error("Component: radioClass has been deprecated. Please use radioCls.");
        },
        //</debug>

        /**
         * Toggles the specified CSS class on this element (removes it if it already exists, otherwise adds it).
         * @param {String} className The CSS class to toggle
         * @return {Ext.Element} this
         */
        toggleCls: function(className) {
            return this.hasCls(className) ? this.removeCls(className) : this.addCls(className);
        },
        
        //<debug>
        toggleClass : function() {
            throw new Error("Component: toggleClass has been deprecated. Please use toggleCls.");
        },
        //</debug>

        /**
         * Checks if the specified CSS class exists on this element's DOM node.
         * @param {String} className The CSS class to check for
         * @return {Boolean} True if the class exists, else false
         */
        hasCls: function(className) {
            return className && (' ' + this.dom.className + ' ').indexOf(' ' + className + ' ') != -1;
        },
        
        //<debug>
        hasClass : function() {
            throw new Error("Element: hasClass has been deprecated. Please use hasCls.");
            return this.hasCls.apply(this, arguments);
        },
        //</debug>

        /**
         * Replaces a CSS class on the element with another.  If the old name does not exist, the new name will simply be added.
         * @param {String} oldClassName The CSS class to replace
         * @param {String} newClassName The replacement CSS class
         * @return {Ext.Element} this
         */
        replaceCls: function(oldClassName, newClassName) {
            return this.removeCls(oldClassName).addCls(newClassName);
        },
        
        //<debug>
        replaceClass : function() {
            throw new Error("Component: replaceClass has been deprecated. Please use replaceCls.");
        },
        //</debug>

        isStyle: function(style, val) {
            return this.getStyle(style) == val;
        },

        /**
         * Normalizes currentStyle and computedStyle.
         * @param {String} property The style property whose value is returned.
         * @return {String} The current value of the style property for this element.
         */
        getStyle: function(prop) {
            var dom = this.dom,
                result,
                display,
                cs,
                platform = Ext.is,
                style = dom.style;

            prop = El.normalize(prop);
            cs = (view) ? view.getComputedStyle(dom, '') : dom.currentStyle;
            result = (cs) ? cs[prop] : null;

            // Fix bug caused by this: https://bugs.webkit.org/show_bug.cgi?id=13343
            if (result && !platform.correctRightMargin &&
                    this.marginRightRe.test(prop) &&
                    style.position != 'absolute' &&
                    result != '0px') {
                display = style.display;
                style.display = 'inline-block';
                result = view.getComputedStyle(dom, null)[prop];
                style.display = display;
            }

            result || (result = style[prop]);

            // Webkit returns rgb values for transparent.
            if (!platform.correctTransparentColor && result == 'rgba(0, 0, 0, 0)') {
                result = 'transparent';
            }

            return result;
        },

        /**
         * Wrapper for setting style properties, also takes single object parameter of multiple styles.
         * @param {String/Object} property The style property to be set, or an object of multiple styles.
         * @param {String} value (optional) The value to apply to the given property, or null if an object was passed.
         * @return {Ext.Element} this
         */
        setStyle: function(prop, value) {
            var tmp,
                style;

            if (typeof prop == 'string') {
                tmp = {};
                tmp[prop] = value;
                prop = tmp;
            }

            for (style in prop) {
                if (prop.hasOwnProperty(style)) {
                    this.dom.style[El.normalize(style)] = prop[style];
                }
            }

            return this;
        },

        /**
         * Applies a style specification to an element.
         * @param {String/HTMLElement} el The element to apply styles to
         * @param {String/Object/Function} styles A style specification string e.g. 'width:100px', or object in the form {width:'100px'}, or
         * a function which returns such a specification.
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
                        dom.style[El.normalize(styles[i++])] = styles[i++];
                    }
                }
                else if (typeof styles == 'object') {
                    this.setStyle(styles);
                }
            }
        },

        /**
         * Returns the offset height of the element
         * @param {Boolean} contentHeight (optional) true to get the height minus borders and padding
         * @return {Number} The element's height
         */
        getHeight: function(contentHeight) {
            var dom = this.dom,
                height = contentHeight ? (dom.clientHeight - this.getPadding("tb")) : dom.offsetHeight;
            return height > 0 ? height: 0;
        },

        /**
         * Returns the offset width of the element
         * @param {Boolean} contentWidth (optional) true to get the width minus borders and padding
         * @return {Number} The element's width
         */
        getWidth: function(contentWidth) {
            var dom = this.dom,
                width = contentWidth ? (dom.clientWidth - this.getPadding("lr")) : dom.offsetWidth;
            return width > 0 ? width: 0;
        },

        /**
         * Set the width of this Element.
         * @param {Mixed} width The new width. This may be one of:<div class="mdetail-params"><ul>
         * <li>A Number specifying the new width in this Element's {@link #defaultUnit}s (by default, pixels).</li>
         * <li>A String used to set the CSS width style. Animation may <b>not</b> be used.
         * </ul></div>
         * @return {Ext.Element} this
         */
        setWidth: function(width) {
            var me = this;
                me.dom.style.width = El.addUnits(width);
            return me;
        },

        /**
         * Set the height of this Element.
         * <pre><code>
        // change the height to 200px and animate with default configuration
        Ext.fly('elementId').setHeight(200, true);

        // change the height to 150px and animate with a custom configuration
        Ext.fly('elId').setHeight(150, {
        duration : .5, // animation will have a duration of .5 seconds
        // will change the content to "finished"
        callback: function(){ this.{@link #update}("finished"); }
        });
         * </code></pre>
         * @param {Mixed} height The new height. This may be one of:<div class="mdetail-params"><ul>
         * <li>A Number specifying the new height in this Element's {@link #defaultUnit}s (by default, pixels.)</li>
         * <li>A String used to set the CSS height style. Animation may <b>not</b> be used.</li>
         * </ul></div>
         * @return {Ext.Element} this
         */
        setHeight: function(height) {
            var me = this;
                me.dom.style.height = El.addUnits(height);
            return me;
        },

        /**
         * Set the size of this Element. If animation is true, both width and height will be animated concurrently.
         * @param {Mixed} width The new width. This may be one of:<div class="mdetail-params"><ul>
         * <li>A Number specifying the new width in this Element's {@link #defaultUnit}s (by default, pixels).</li>
         * <li>A String used to set the CSS width style. Animation may <b>not</b> be used.
         * <li>A size object in the format <code>{width: widthValue, height: heightValue}</code>.</li>
         * </ul></div>
         * @param {Mixed} height The new height. This may be one of:<div class="mdetail-params"><ul>
         * <li>A Number specifying the new height in this Element's {@link #defaultUnit}s (by default, pixels).</li>
         * <li>A String used to set the CSS height style. Animation may <b>not</b> be used.</li>
         * </ul></div>
         * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
         * @return {Ext.Element} this
         */
        setSize: function(width, height) {
            var me = this,
                style = me.dom.style;

            if (Ext.isObject(width)) {
                // in case of object from getSize()
                height = width.height;
                width = width.width;
            }

            style.width = El.addUnits(width);
            style.height = El.addUnits(height);
            return me;
        },

        /**
         * Gets the width of the border(s) for the specified side(s)
         * @param {String} side Can be t, l, r, b or any combination of those to add multiple values. For example,
         * passing <tt>'lr'</tt> would get the border <b><u>l</u></b>eft width + the border <b><u>r</u></b>ight width.
         * @return {Number} The width of the sides passed added together
         */
        getBorderWidth: function(side) {
            return this.sumStyles(side, El.borders);
        },

        /**
         * Gets the size of the padding(s) for the specified side(s)
         * @param {String} side Can be t, l, r, b or any combination of those to add multiple values. For example,
         * passing <tt>'lr'</tt> would get the padding <b><u>l</u></b>eft + the padding <b><u>r</u></b>ight.
         * @return {Number} The padding of the sides passed added together
         */
        getPadding: function(side) {
            return this.sumStyles(side, El.paddings);
        },

        /**
         * Gets the size of the margins(s) for the specified side(s)
         * @param {String} side Can be t, l, r, b or any combination of those to add multiple values. For example,
         * passing <tt>'lr'</tt> would get the margin <b><u>l</u></b>eft + the margin <b><u>r</u></b>ight.
         * @return {Number} The margin of the sides passed added together
         */
        getMargin: function(side) {
            return this.sumStyles(side, El.margins);
        },

        /**
         * <p>Returns the dimensions of the element available to lay content out in.<p>
         * <p>If the element (or any ancestor element) has CSS style <code>display : none</code>, the dimensions will be zero.</p>
         */
        getViewSize: function() {
            var doc = document,
                dom = this.dom;

            if (dom == doc || dom == doc.body) {
                return {
                    width: El.getViewportWidth(),
                    height: El.getViewportHeight()
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
         * @param {Boolean} contentSize (optional) true to get the width/size minus borders and padding
         * @return {Object} An object containing the element's size {width: (element width), height: (element height)}
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
         * @return {Ext.Element} this
         */
        repaint: function() {
            var dom = this.dom;
                this.addCls("x-repaint");
            dom.style.background = 'transparent none';
            setTimeout(function() {
                dom.style.background = null;
                Ext.get(dom).removeCls("x-repaint");
            },
            1);
            return this;
        },

        /**
         * Retrieves the width of the element accounting for the left and right
         * margins.
         */
        getOuterWidth: function() {
            return this.getWidth() + this.getMargin('lr');
        },

        /**
         * Retrieves the height of the element account for the top and bottom
         * margins.
         */
        getOuterHeight: function() {
            return this.getHeight() + this.getMargin('tb');
        },

        // private
        sumStyles: function(sides, styles) {
            var val = 0,
                m = sides.match(/\w/g),
                len = m.length,
                s,
                i;

            for (i = 0; i < len; i++) {
                s = m[i] && parseFloat(this.getStyle(styles[m[i]])) || 0;
                if (s) {
                    val += Math.abs(s);
                }
            }
            return val;
        }
    });
})();
/**
 * @class Ext.Element
 */
Ext.Element.addMethods({
    /**
     * Looks at this node and then at parent nodes for a match of the passed simple selector (e.g. div.some-class or span:first-child)
     * @param {String} selector The simple selector to test
     * @param {Number/Mixed} maxDepth (optional) The max depth to search as a number or element (defaults to 50 || document.body)
     * @param {Boolean} returnEl (optional) True to return a Ext.Element object instead of DOM node
     * @return {HTMLElement} The matching DOM node (or null if no match was found)
     */
    findParent : function(simpleSelector, maxDepth, returnEl) {
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
     * @param {Number/Mixed} maxDepth (optional) The max depth to
            search as a number or element (defaults to 10 || document.body)
     * @param {Boolean} returnEl (optional) True to return a Ext.Element object instead of DOM node
     * @return {HTMLElement} The matching DOM node (or null if no match was found)
     */
    findParentNode : function(simpleSelector, maxDepth, returnEl) {
        var p = Ext.fly(this.dom.parentNode, '_internal');
        return p ? p.findParent(simpleSelector, maxDepth, returnEl) : null;
    },

    /**
     * Walks up the dom looking for a parent node that matches the passed simple selector (e.g. div.some-class or span:first-child).
     * This is a shortcut for findParentNode() that always returns an Ext.Element.
     * @param {String} selector The simple selector to test
     * @param {Number/Mixed} maxDepth (optional) The max depth to
            search as a number or element (defaults to 10 || document.body)
     * @return {Ext.Element} The matching DOM node (or null if no match was found)
     */
    up : function(simpleSelector, maxDepth) {
        return this.findParentNode(simpleSelector, maxDepth, true);
    },

    /**
     * Creates a {@link Ext.CompositeElement} for child nodes based on the passed CSS selector (the selector should not contain an id).
     * @param {String} selector The CSS selector
     * @return {CompositeElement/CompositeElement} The composite element
     */
    select : function(selector, composite) {
        return Ext.Element.select(selector, this.dom, composite);
    },

    /**
     * Selects child nodes based on the passed CSS selector (the selector should not contain an id).
     * @param {String} selector The CSS selector
     * @return {Array} An array of the matched nodes
     */
    query : function(selector) {
        return Ext.DomQuery.select(selector, this.dom);
    },

    /**
     * Selects a single child at any depth below this element based on the passed CSS selector (the selector should not contain an id).
     * @param {String} selector The CSS selector
     * @param {Boolean} returnDom (optional) True to return the DOM node instead of Ext.Element (defaults to false)
     * @return {HTMLElement/Ext.Element} The child Ext.Element (or DOM node if returnDom = true)
     */
    down : function(selector, returnDom) {
        var n = Ext.DomQuery.selectNode(selector, this.dom);
        return returnDom ? n : Ext.get(n);
    },

    /**
     * Selects a single *direct* child based on the passed CSS selector (the selector should not contain an id).
     * @param {String} selector The CSS selector
     * @param {Boolean} returnDom (optional) True to return the DOM node instead of Ext.Element (defaults to false)
     * @return {HTMLElement/Ext.Element} The child Ext.Element (or DOM node if returnDom = true)
     */
    child : function(selector, returnDom) {
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
     * @param {Boolean} returnDom (optional) True to return a raw dom node instead of an Ext.Element
     * @return {Ext.Element/HTMLElement} The parent node or null
     */
    parent : function(selector, returnDom) {
        return this.matchNode('parentNode', 'parentNode', selector, returnDom);
    },

     /**
     * Gets the next sibling, skipping text nodes
     * @param {String} selector (optional) Find the next sibling that matches the passed simple selector
     * @param {Boolean} returnDom (optional) True to return a raw dom node instead of an Ext.Element
     * @return {Ext.Element/HTMLElement} The next sibling or null
     */
    next : function(selector, returnDom) {
        return this.matchNode('nextSibling', 'nextSibling', selector, returnDom);
    },

    /**
     * Gets the previous sibling, skipping text nodes
     * @param {String} selector (optional) Find the previous sibling that matches the passed simple selector
     * @param {Boolean} returnDom (optional) True to return a raw dom node instead of an Ext.Element
     * @return {Ext.Element/HTMLElement} The previous sibling or null
     */
    prev : function(selector, returnDom) {
        return this.matchNode('previousSibling', 'previousSibling', selector, returnDom);
    },


    /**
     * Gets the first child, skipping text nodes
     * @param {String} selector (optional) Find the next sibling that matches the passed simple selector
     * @param {Boolean} returnDom (optional) True to return a raw dom node instead of an Ext.Element
     * @return {Ext.Element/HTMLElement} The first child or null
     */
    first : function(selector, returnDom) {
        return this.matchNode('nextSibling', 'firstChild', selector, returnDom);
    },

    /**
     * Gets the last child, skipping text nodes
     * @param {String} selector (optional) Find the previous sibling that matches the passed simple selector
     * @param {Boolean} returnDom (optional) True to return a raw dom node instead of an Ext.Element
     * @return {Ext.Element/HTMLElement} The last child or null
     */
    last : function(selector, returnDom) {
        return this.matchNode('previousSibling', 'lastChild', selector, returnDom);
    },

    matchNode : function(dir, start, selector, returnDom) {
        if (!this.dom)
            return null;
        
        var n = this.dom[start];
        while (n) {
            if (n.nodeType == 1 && (!selector || Ext.DomQuery.is(n, selector))) {
                return !returnDom ? Ext.get(n) : n;
            }
            n = n[dir];
        }
        return null;
    }
});

/**
 * @class Ext.Element
 */
Ext.Element.addMethods({
    /**
     * Gets the Scroller instance of the first parent that has one.
     * @return {Ext.util.Scroller/null} The first parent scroller
     */
    getScrollParent : function() {
        var parent = this.dom, scroller;
        while (parent && parent != document.body) {
            if (parent.id && (scroller = Ext.ScrollManager.get(parent.id))) {
                return scroller;
            }
            parent = parent.parentNode;
        }
        return null;
    }
});

/**
 * @class Ext.Element
 */
Ext.Element.addMethods({
    /**
     * Appends the passed element(s) to this element
     * @param {String/HTMLElement/Array/Element/CompositeElement} el
     * @return {Ext.Element} this
     */
    appendChild : function(el) {
        return Ext.get(el).appendTo(this);
    },

    /**
     * Appends this element to the passed element
     * @param {Mixed} el The new parent element
     * @return {Ext.Element} this
     */
    appendTo : function(el) {
        Ext.getDom(el).appendChild(this.dom);
        return this;
    },

    /**
     * Inserts this element before the passed element in the DOM
     * @param {Mixed} el The element before which this element will be inserted
     * @return {Ext.Element} this
     */
    insertBefore : function(el) {
        el = Ext.getDom(el);
        el.parentNode.insertBefore(this.dom, el);
        return this;
    },

    /**
     * Inserts this element after the passed element in the DOM
     * @param {Mixed} el The element to insert after
     * @return {Ext.Element} this
     */
    insertAfter : function(el) {
        el = Ext.getDom(el);
        el.parentNode.insertBefore(this.dom, el.nextSibling);
        return this;
    },

    /**
     * Inserts (or creates) an element (or DomHelper config) as the first child of this element
     * @param {Mixed/Object} el The id or element to insert or a DomHelper config to create and insert
     * @return {Ext.Element} The new child
     */
    insertFirst : function(el, returnDom) {
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
     * @param {Mixed/Object/Array} el The id, element to insert or a DomHelper config to create and insert *or* an array of any of those.
     * @param {String} where (optional) 'before' or 'after' defaults to before
     * @param {Boolean} returnDom (optional) True to return the .;ll;l,raw DOM element instead of Ext.Element
     * @return {Ext.Element} The inserted Element. If an array is passed, the last inserted element is returned.
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
                rt = Ext.DomHelper.append(me.dom.parentNode, el, !returnDom);
            } else {
                rt = Ext.DomHelper[isAfter ? 'insertAfter' : 'insertBefore'](me.dom, el, !returnDom);
            }
        }
        return rt;
    },

    /**
     * Replaces the passed element with this element
     * @param {Mixed} el The element to replace
     * @return {Ext.Element} this
     */
    replace : function(el) {
        el = Ext.get(el);
        this.insertBefore(el);
        el.remove();
        return this;
    },
    
    /**
     * Replaces this element with the passed element
     * @param {Mixed/Object} el The new element or a DomHelper config of an element to create
     * @return {Ext.Element} this
     */
    replaceWith: function(el){
        var me = this;
            
        if(el.nodeType || el.dom || typeof el == 'string'){
            el = Ext.get(el);
            me.dom.parentNode.insertBefore(el, me.dom);
        }else{
            el = Ext.DomHelper.insertBefore(me.dom, el);
        }
        
        delete Ext.cache[me.id];
        Ext.removeNode(me.dom);      
        me.id = Ext.id(me.dom = el);
        Ext.Element.addToCache(me.isFlyweight ? new Ext.Element(me.dom) : me);     
        return me;
    },
    
    /**
     * Creates the passed DomHelper config and appends it to this element or optionally inserts it before the passed child element.
     * @param {Object} config DomHelper element config object.  If no tag is specified (e.g., {tag:'input'}) then a div will be
     * automatically generated with the specified attributes.
     * @param {HTMLElement} insertBefore (optional) a child element of this element
     * @param {Boolean} returnDom (optional) true to return the dom node instead of creating an Element
     * @return {Ext.Element} The new child element
     */
    createChild : function(config, insertBefore, returnDom) {
        config = config || {tag:'div'};
        if (insertBefore) {
            return Ext.DomHelper.insertBefore(insertBefore, config, returnDom !== true);
        }
        else {
            return Ext.DomHelper[!this.dom.firstChild ? 'overwrite' : 'append'](this.dom, config,  returnDom !== true);
        }
    },

    /**
     * Creates and wraps this element with another element
     * @param {Object} config (optional) DomHelper element config object for the wrapper element or null for an empty div
     * @param {Boolean} returnDom (optional) True to return the raw DOM element instead of Ext.Element
     * @return {HTMLElement/Element} The newly created wrapper element
     */
    wrap : function(config, returnDom) {
        var newEl = Ext.DomHelper.insertBefore(this.dom, config || {tag: "div"}, !returnDom);
        newEl.dom ? newEl.dom.appendChild(this.dom) : newEl.appendChild(this.dom);
        return newEl;
    },

    /**
     * Inserts an html fragment into this element
     * @param {String} where Where to insert the html in relation to this element - beforeBegin, afterBegin, beforeEnd, afterEnd.
     * @param {String} html The HTML fragment
     * @param {Boolean} returnEl (optional) True to return an Ext.Element (defaults to false)
     * @return {HTMLElement/Ext.Element} The inserted node (or nearest related if more than 1 inserted)
     */
    insertHtml : function(where, html, returnEl) {
        var el = Ext.DomHelper.insertHtml(where, this.dom, html);
        return returnEl ? Ext.get(el) : el;
    }
});

/**
 * @class Ext.Element
 */
Ext.Element.addMethods({
    /**
     * Gets the x,y coordinates specified by the anchor position on the element.
     * @param {String} anchor (optional) The specified anchor position (defaults to "c").  See {@link #alignTo}
     * for details on supported anchor positions.
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

    /**
     * Gets the x,y coordinates to align this element with another element. See {@link #alignTo} for more info on the
     * supported position values.
     * @param {Mixed} element The element to align to.
     * @param {String} position (optional, defaults to "tl-bl?") The position to align to.
     * @param {Array} offsets (optional) Offset the positioning by [x, y]
     * @return {Array} [x, y]
     */
    getAlignToXY: function(el, position, offsets) {
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
            matches = position.match(/^([a-z]+)-([a-z]+)(\?)?$/),
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
        a2 = el.getAnchorXY(p2, false);

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
    }

    /*
     * Anchors an element to another element and realigns it when the window is resized.
     * @param {Mixed} element The element to align to.
     * @param {String} position The position to align to.
     * @param {Array} offsets (optional) Offset the positioning by [x, y]
     * @param {Boolean/Object} animate (optional) True for the default animation or a standard Element animation config object
     * @param {Boolean/Number} monitorScroll (optional) True to monitor body scroll and reposition. If this parameter
     * is a number, it is used as the buffer delay (defaults to 50ms).
     * @param {Function} callback The function to call after the animation finishes
     * @return {Ext.Element} this
     */
    // anchorTo : function(el, alignment, offsets, animate, monitorScroll, callback){
    //      var me = this,
    //         dom = me.dom,
    //         scroll = !Ext.isEmpty(monitorScroll),
    //         action = function(){
    //             Ext.fly(dom).alignTo(el, alignment, offsets, animate);
    //             Ext.callback(callback, Ext.fly(dom));
    //         },
    //         anchor = this.getAnchor();
    //
    //     // previous listener anchor, remove it
    //     this.removeAnchor();
    //     Ext.apply(anchor, {
    //         fn: action,
    //         scroll: scroll
    //     });
    //
    //     Ext.EventManager.onWindowResize(action, null);
    //
    //     if(scroll){
    //         Ext.EventManager.on(window, 'scroll', action, null,
    //             {buffer: !isNaN(monitorScroll) ? monitorScroll : 50});
    //     }
    //     action.call(me); // align immediately
    //     return me;
    // },
    /*
     * Remove any anchor to this element. See {@link #anchorTo}.
     * @return {Ext.Element} this
     */
    // removeAnchor : function(){
    //     var me = this,
    //         anchor = this.getAnchor();
    //
    //     if(anchor && anchor.fn){
    //         Ext.EventManager.removeResizeListener(anchor.fn);
    //         if(anchor.scroll){
    //             Ext.EventManager.un(window, 'scroll', anchor.fn);
    //         }
    //         delete anchor.fn;
    //     }
    //     return me;
    // },
    //
    // // private
    // getAnchor : function(){
    //     var data = Ext.Element.data,
    //         dom = this.dom;
    //         if (!dom) {
    //             return;
    //         }
    //         var anchor = data(dom, '_anchor');
    //
    //     if(!anchor){
    //         anchor = data(dom, '_anchor', {});
    //     }
    //     return anchor;
    // },
    /*
     * Aligns this element with another element relative to the specified anchor points. If the other element is the
     * document it aligns it to the viewport.
     * The position parameter is optional, and can be specified in any one of the following formats:
     * <ul>
     *   <li><b>Blank</b>: Defaults to aligning the element's top-left corner to the target's bottom-left corner ("tl-bl").</li>
     *   <li><b>One anchor (deprecated)</b>: The passed anchor position is used as the target element's anchor point.
     *       The element being aligned will position its top-left corner (tl) to that point.  <i>This method has been
     *       deprecated in favor of the newer two anchor syntax below</i>.</li>
     *   <li><b>Two anchors</b>: If two values from the table below are passed separated by a dash, the first value is used as the
     *       element's anchor point, and the second value is used as the target's anchor point.</li>
     * </ul>
     * In addition to the anchor points, the position parameter also supports the "?" character.  If "?" is passed at the end of
     * the position string, the element will attempt to align as specified, but the position will be adjusted to constrain to
     * the viewport if necessary.  Note that the element being aligned might be swapped to align to a different position than
     * that specified in order to enforce the viewport constraints.
     * Following are all of the supported anchor positions:
<pre>
Value  Description
-----  -----------------------------
tl     The top left corner (default)
t      The center of the top edge
tr     The top right corner
l      The center of the left edge
c      In the center of the element
r      The center of the right edge
bl     The bottom left corner
b      The center of the bottom edge
br     The bottom right corner
</pre>
Example Usage:
<pre><code>
// align el to other-el using the default positioning ("tl-bl", non-constrained)
el.alignTo("other-el");

// align the top left corner of el with the top right corner of other-el (constrained to viewport)
el.alignTo("other-el", "tr?");

// align the bottom right corner of el with the center left edge of other-el
el.alignTo("other-el", "br-l?");

// align the center of el with the bottom left corner of other-el and
// adjust the x position by -6 pixels (and the y position by 0)
el.alignTo("other-el", "c-bl", [-6, 0]);
</code></pre>
     * @param {Mixed} element The element to align to.
     * @param {String} position (optional, defaults to "tl-bl?") The position to align to.
     * @param {Array} offsets (optional) Offset the positioning by [x, y]
     * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
     * @return {Ext.Element} this
     */
    // alignTo : function(element, position, offsets, animate){
    //      var me = this;
    //     return me.setXY(me.getAlignToXY(element, position, offsets),
    //                      me.preanim && !!animate ? me.preanim(arguments, 3) : false);
    // },
    //
    // // private ==>  used outside of core
    // adjustForConstraints : function(xy, parent, offsets){
    //     return this.getConstrainToXY(parent || document, false, offsets, xy) ||  xy;
    // },
    //
    // // private ==>  used outside of core
    // getConstrainToXY : function(el, local, offsets, proposedXY){
    //      var os = {top:0, left:0, bottom:0, right: 0};
    //
    //     return function(el, local, offsets, proposedXY){
    //         el = Ext.get(el);
    //         offsets = offsets ? Ext.applyIf(offsets, os) : os;
    //
    //         var vw, vh, vx = 0, vy = 0;
    //         if(el.dom == document.body || el.dom == document){
    //             vw =Ext.lib.Dom.getViewWidth();
    //             vh = Ext.lib.Dom.getViewHeight();
    //         }else{
    //             vw = el.dom.clientWidth;
    //             vh = el.dom.clientHeight;
    //             if(!local){
    //                 var vxy = el.getXY();
    //                 vx = vxy[0];
    //                 vy = vxy[1];
    //             }
    //         }
    //
    //         var s = el.getScroll();
    //
    //         vx += offsets.left + s.left;
    //         vy += offsets.top + s.top;
    //
    //         vw -= offsets.right;
    //         vh -= offsets.bottom;
    //
    //         var vr = vx + vw,
    //             vb = vy + vh,
    //             xy = proposedXY || (!local ? this.getXY() : [this.getLeft(true), this.getTop(true)]),
    //             x = xy[0], y = xy[1],
    //             offset = this.getConstrainOffset(),
    //             w = this.dom.offsetWidth + offset,
    //             h = this.dom.offsetHeight + offset;
    //
    //         // only move it if it needs it
    //         var moved = false;
    //
    //         // first validate right/bottom
    //         if((x + w) > vr){
    //             x = vr - w;
    //             moved = true;
    //         }
    //         if((y + h) > vb){
    //             y = vb - h;
    //             moved = true;
    //         }
    //         // then make sure top/left isn't negative
    //         if(x < vx){
    //             x = vx;
    //             moved = true;
    //         }
    //         if(y < vy){
    //             y = vy;
    //             moved = true;
    //         }
    //         return moved ? [x, y] : false;
    //     };
    // }(),
    //
    // // private, used internally
    // getConstrainOffset : function(){
    //     return 0;
    // },
    //
    // /**
    // * Calculates the x, y to center this element on the screen
    // * @return {Array} The x, y values [x, y]
    // */
    // getCenterXY : function(){
    //     return this.getAlignToXY(document, 'c-c');
    // },
    //
    // /**
    // * Centers the Element in either the viewport, or another Element.
    // * @param {Mixed} centerIn (optional) The element in which to center the element.
    // */
    // center : function(centerIn) {
    //     return this.alignTo(centerIn || document, 'c-c');
    // }
});

/**
 * @class Ext.CompositeElement
 * <p>This class encapsulates a <i>collection</i> of DOM elements, providing methods to filter
 * members, or to perform collective actions upon the whole set.</p>
 *
 * Example:<pre><code>
var els = Ext.select("#some-el div.some-class");
// or select directly from an existing element
var el = Ext.get('some-el');
el.select('div.some-class');

els.setWidth(100); // all elements become 100 width
els.hide(true); // all elements fade out and hide
// or
els.setWidth(100).hide(true);
</code>
 */
Ext.CompositeElement = function(els, root) {
    /**
     * <p>The Array of DOM elements which this CompositeElement encapsulates. Read-only.</p>
     * <p>This will not <i>usually</i> be accessed in developers' code, but developers wishing
     * to augment the capabilities of the CompositeElement class may use it when adding
     * methods to the class.</p>
     * <p>For example to add the <code>nextAll</code> method to the class to <b>add</b> all
     * following siblings of selected elements, the code would be</p><code><pre>
Ext.override(Ext.CompositeElement, {
    nextAll: function() {
        var els = this.elements, i, l = els.length, n, r = [], ri = -1;

//      Loop through all elements in this Composite, accumulating
//      an Array of all siblings.
        for (i = 0; i < l; i++) {
            for (n = els[i].nextSibling; n; n = n.nextSibling) {
                r[++ri] = n;
            }
        }

//      Add all found siblings to this Composite
        return this.add(r);
    }
});</pre></code>
     * @type Array
     * @property elements
     */
    this.elements = [];
    this.add(els, root);
    this.el = new Ext.Element.Flyweight();
};

Ext.CompositeElement.prototype = {
    isComposite: true,

    // private
    getElement : function(el) {
        // Set the shared flyweight dom property to the current element
        var e = this.el;
        e.dom = el;
        e.id = el.id;
        return e;
    },

    // private
    transformElement : function(el) {
        return Ext.getDom(el);
    },

    /**
     * Returns the number of elements in this Composite.
     * @return Number
     */
    getCount : function() {
        return this.elements.length;
    },

    /**
     * Adds elements to this Composite object.
     * @param {Mixed} els Either an Array of DOM elements to add, or another Composite object who's elements should be added.
     * @return {CompositeElement} This Composite object.
     */
    add : function(els, root) {
        var me = this,
            elements = me.elements;
        if (!els) {
            return this;
        }
        if (typeof els == 'string') {
            els = Ext.Element.selectorFunction(els, root);
        }
        else if (els.isComposite) {
            els = els.elements;
        }
        else if (!Ext.isIterable(els)) {
            els = [els];
        }

        for (var i = 0, len = els.length; i < len; ++i) {
            elements.push(me.transformElement(els[i]));
        }

        return me;
    },

    invoke : function(fn, args) {
        var me = this,
            els = me.elements,
            len = els.length,
            e,
            i;

        for (i = 0; i < len; i++) {
            e = els[i];
            if (e) {
                Ext.Element.prototype[fn].apply(me.getElement(e), args);
            }
        }
        return me;
    },
    /**
     * Returns a flyweight Element of the dom element object at the specified index
     * @param {Number} index
     * @return {Ext.Element}
     */
    item : function(index) {
        var me = this,
            el = me.elements[index],
            out = null;

        if (el){
            out = me.getElement(el);
        }
        return out;
    },

    // fixes scope with flyweight
    addListener : function(eventName, handler, scope, opt) {
        var els = this.elements,
            len = els.length,
            i, e;

        for (i = 0; i<len; i++) {
            e = els[i];
            if (e) {
                Ext.EventManager.on(e, eventName, handler, scope || e, opt);
            }
        }
        return this;
    },

    /**
     * <p>Calls the passed function for each element in this composite.</p>
     * @param {Function} fn The function to call. The function is passed the following parameters:<ul>
     * <li><b>el</b> : Element<div class="sub-desc">The current Element in the iteration.
     * <b>This is the flyweight (shared) Ext.Element instance, so if you require a
     * a reference to the dom node, use el.dom.</b></div></li>
     * <li><b>c</b> : Composite<div class="sub-desc">This Composite object.</div></li>
     * <li><b>idx</b> : Number<div class="sub-desc">The zero-based index in the iteration.</div></li>
     * </ul>
     * @param {Object} scope (optional) The scope (<i>this</i> reference) in which the function is executed. (defaults to the Element)
     * @return {CompositeElement} this
     */
    each : function(fn, scope) {
        var me = this,
            els = me.elements,
            len = els.length,
            i, e;

        for (i = 0; i<len; i++) {
            e = els[i];
            if (e) {
                e = this.getElement(e);
                if(fn.call(scope || e, e, me, i)){
                    break;
                }
            }
        }
        return me;
    },

    /**
    * Clears this Composite and adds the elements passed.
    * @param {Mixed} els Either an array of DOM elements, or another Composite from which to fill this Composite.
    * @return {CompositeElement} this
    */
    fill : function(els) {
        var me = this;
        me.elements = [];
        me.add(els);
        return me;
    },

    /**
     * Filters this composite to only elements that match the passed selector.
     * @param {String/Function} selector A string CSS selector or a comparison function.
     * The comparison function will be called with the following arguments:<ul>
     * <li><code>el</code> : Ext.Element<div class="sub-desc">The current DOM element.</div></li>
     * <li><code>index</code> : Number<div class="sub-desc">The current index within the collection.</div></li>
     * </ul>
     * @return {CompositeElement} this
     */
    filter : function(selector) {
        var els = [],
            me = this,
            elements = me.elements,
            fn = Ext.isFunction(selector) ? selector
                : function(el){
                    return el.is(selector);
                };

        me.each(function(el, self, i){
            if(fn(el, i) !== false){
                els[els.length] = me.transformElement(el);
            }
        });
        me.elements = els;
        return me;
    },

    /**
     * Returns the first Element
     * @return {Ext.Element}
     */
    first : function() {
        return this.item(0);
    },

    /**
     * Returns the last Element
     * @return {Ext.Element}
     */
    last : function() {
        return this.item(this.getCount()-1);
    },

    /**
     * Returns true if this composite contains the passed element
     * @param {Mixed} el The id of an element, or an Ext.Element, or an HtmlElement to find within the composite collection.
     * @return Boolean
     */
    contains : function(el) {
        return this.indexOf(el) != -1;
    },

    /**
     * Find the index of the passed element within the composite collection.
     * @param {Mixed} el The id of an element, or an Ext.Element, or an HtmlElement to find within the composite collection.
     * @return Number The index of the passed Ext.Element in the composite collection, or -1 if not found.
     */
    indexOf : function(el) {
        return this.elements.indexOf(this.transformElement(el));
    },

    /**
     * Removes all elements.
     */
    clear : function() {
        this.elements = [];
    }
};

Ext.CompositeElement.prototype.on = Ext.CompositeElement.prototype.addListener;

(function(){
var fnName,
    ElProto = Ext.Element.prototype,
    CelProto = Ext.CompositeElement.prototype;

for (fnName in ElProto) {
    if (Ext.isFunction(ElProto[fnName])) {
        (function(fnName) {
            CelProto[fnName] = CelProto[fnName] || function(){
                return this.invoke(fnName, arguments);
            };
        }).call(CelProto, fnName);

    }
}
})();

if(Ext.DomQuery) {
    Ext.Element.selectorFunction = Ext.DomQuery.select;
}

/**
 * Selects elements based on the passed CSS selector to enable {@link Ext.Element Element} methods
 * to be applied to many related elements in one statement through the returned {@link Ext.CompositeElement CompositeElement} or
 * {@link Ext.CompositeElement CompositeElement} object.
 * @param {String/Array} selector The CSS selector or an array of elements
 * @param {HTMLElement/String} root (optional) The root element of the query or id of the root
 * @return {CompositeElement}
 * @member Ext.Element
 * @method select
 */
Ext.Element.select = function(selector, root, composite) {
    var els;
    composite = (composite === false) ? false : true;
    if (typeof selector == "string") {
        els = Ext.Element.selectorFunction(selector, root);
    } else if (selector.length !== undefined) {
        els = selector;
    } else {
        throw new Error("Invalid selector");
    }
    return composite ? new Ext.CompositeElement(els) : els;
};
/**
 * Selects elements based on the passed CSS selector to enable {@link Ext.Element Element} methods
 * to be applied to many related elements in one statement through the returned {@link Ext.CompositeElement CompositeElement} or
 * {@link Ext.CompositeElement CompositeElement} object.
 * @param {String/Array} selector The CSS selector or an array of elements
 * @param {HTMLElement/String} root (optional) The root element of the query or id of the root
 * @return {CompositeElement}
 * @member Ext
 * @method select
 */
Ext.select = Ext.Element.select;

// Backwards compatibility with desktop
Ext.CompositeElementLite = Ext.CompositeElement;

/**
 * @class Ext.CompositeElementLite
 */
Ext.apply(Ext.CompositeElementLite.prototype, {
    addElements : function(els, root){
        if(!els){
            return this;
        }
        if(typeof els == "string"){
            els = Ext.Element.selectorFunction(els, root);
        }
        var yels = this.elements;
        Ext.each(els, function(e) {
            yels.push(Ext.get(e));
        });
        return this;
    },

    /**
    * Removes the specified element(s).
    * @param {Mixed} el The id of an element, the Element itself, the index of the element in this composite
    * or an array of any of those.
    * @param {Boolean} removeDom (optional) True to also remove the element from the document
    * @return {CompositeElement} this
    */
    removeElement : function(keys, removeDom){
        var me = this,
            els = this.elements,
            el;
        Ext.each(keys, function(val){
            if ((el = (els[val] || els[val = me.indexOf(val)]))) {
                if(removeDom){
                    if(el.dom){
                        el.remove();
                    }else{
                        Ext.removeNode(el);
                    }
                }
                els.splice(val, 1);
            }
        });
        return this;
    },

    /**
    * Replaces the specified element with the passed element.
    * @param {Mixed} el The id of an element, the Element itself, the index of the element in this composite
    * to replace.
    * @param {Mixed} replacement The id of an element or the Element itself.
    * @param {Boolean} domReplace (Optional) True to remove and replace the element in the document too.
    * @return {CompositeElement} this
    */
    replaceElement : function(el, replacement, domReplace){
        var index = !isNaN(el) ? el : this.indexOf(el),
            d;
        if(index > -1){
            replacement = Ext.getDom(replacement);
            if(domReplace){
                d = this.elements[index];
                d.parentNode.insertBefore(replacement, d);
                Ext.removeNode(d);
            }
            this.elements.splice(index, 1, replacement);
        }
        return this;
    }
});

/**
 * @class Ext.DomHelper
 * <p>The DomHelper class provides a layer of abstraction from DOM and transparently supports creating
 * elements via DOM or using HTML fragments. It also has the ability to create HTML fragment templates
 * from your DOM building code.</p>
 *
 * <p><b><u>DomHelper element specification object</u></b></p>
 * <p>A specification object is used when creating elements. Attributes of this object
 * are assumed to be element attributes, except for 4 special attributes:
 * <div class="mdetail-params"><ul>
 * <li><b><tt>tag</tt></b> : <div class="sub-desc">The tag name of the element</div></li>
 * <li><b><tt>children</tt></b> : or <tt>cn</tt><div class="sub-desc">An array of the
 * same kind of element definition objects to be created and appended. These can be nested
 * as deep as you want.</div></li>
 * <li><b><tt>cls</tt></b> : <div class="sub-desc">The class attribute of the element.
 * This will end up being either the "class" attribute on a HTML fragment or className
 * for a DOM node, depending on whether DomHelper is using fragments or DOM.</div></li>
 * <li><b><tt>html</tt></b> : <div class="sub-desc">The innerHTML for the element</div></li>
 * </ul></div></p>
 *
 * <p><b><u>Insertion methods</u></b></p>
 * <p>Commonly used insertion methods:
 * <div class="mdetail-params"><ul>
 * <li><b><tt>{@link #append}</tt></b> : <div class="sub-desc"></div></li>
 * <li><b><tt>{@link #insertBefore}</tt></b> : <div class="sub-desc"></div></li>
 * <li><b><tt>{@link #insertAfter}</tt></b> : <div class="sub-desc"></div></li>
 * <li><b><tt>{@link #overwrite}</tt></b> : <div class="sub-desc"></div></li>
 * <li><b><tt>{@link #createTemplate}</tt></b> : <div class="sub-desc"></div></li>
 * <li><b><tt>{@link #insertHtml}</tt></b> : <div class="sub-desc"></div></li>
 * </ul></div></p>
 *
 * <p><b><u>Example</u></b></p>
 * <p>This is an example, where an unordered list with 3 children items is appended to an existing
 * element with id <tt>'my-div'</tt>:<br>
 <pre><code>
var dh = Ext.DomHelper; // create shorthand alias
// specification object
var spec = {
    id: 'my-ul',
    tag: 'ul',
    cls: 'my-list',
    // append children after creating
    children: [     // may also specify 'cn' instead of 'children'
        {tag: 'li', id: 'item0', html: 'List Item 0'},
        {tag: 'li', id: 'item1', html: 'List Item 1'},
        {tag: 'li', id: 'item2', html: 'List Item 2'}
    ]
};
var list = dh.append(
    'my-div', // the context element 'my-div' can either be the id or the actual node
    spec      // the specification object
);
 </code></pre></p>
 * <p>Element creation specification parameters in this class may also be passed as an Array of
 * specification objects. This can be used to insert multiple sibling nodes into an existing
 * container very efficiently. For example, to add more list items to the example above:<pre><code>
dh.append('my-ul', [
    {tag: 'li', id: 'item3', html: 'List Item 3'},
    {tag: 'li', id: 'item4', html: 'List Item 4'}
]);
 * </code></pre></p>
 *
 * <p><b><u>Templating</u></b></p>
 * <p>The real power is in the built-in templating. Instead of creating or appending any elements,
 * <tt>{@link #createTemplate}</tt> returns a Template object which can be used over and over to
 * insert new elements. Revisiting the example above, we could utilize templating this time:
 * <pre><code>
// create the node
var list = dh.append('my-div', {tag: 'ul', cls: 'my-list'});
// get template
var tpl = dh.createTemplate({tag: 'li', id: 'item{0}', html: 'List Item {0}'});

for(var i = 0; i < 5, i++){
    tpl.append(list, [i]); // use template to append to the actual node
}
 * </code></pre></p>
 * <p>An example using a template:<pre><code>
var html = '<a id="{0}" href="{1}" class="nav">{2}</a>';

var tpl = new Ext.DomHelper.createTemplate(html);
tpl.append('blog-roll', ['link1', 'http://www.tommymaintz.com/', "Tommy&#39;s Site"]);
tpl.append('blog-roll', ['link2', 'http://www.avins.org/', "Jamie&#39;s Site"]);
 * </code></pre></p>
 *
 * <p>The same example using named parameters:<pre><code>
var html = '<a id="{id}" href="{url}" class="nav">{text}</a>';

var tpl = new Ext.DomHelper.createTemplate(html);
tpl.append('blog-roll', {
    id: 'link1',
    url: 'http://www.tommymaintz.com/',
    text: "Tommy&#39;s Site"
});
tpl.append('blog-roll', {
    id: 'link2',
    url: 'http://www.avins.org/',
    text: "Jamie&#39;s Site"
});
 * </code></pre></p>
 *
 * <p><b><u>Compiling Templates</u></b></p>
 * <p>Templates are applied using regular expressions. The performance is great, but if
 * you are adding a bunch of DOM elements using the same template, you can increase
 * performance even further by {@link Ext.Template#compile "compiling"} the template.
 * The way "{@link Ext.Template#compile compile()}" works is the template is parsed and
 * broken up at the different variable points and a dynamic function is created and eval'ed.
 * The generated function performs string concatenation of these parts and the passed
 * variables instead of using regular expressions.
 * <pre><code>
var html = '<a id="{id}" href="{url}" class="nav">{text}</a>';

var tpl = new Ext.DomHelper.createTemplate(html);
tpl.compile();

//... use template like normal
 * </code></pre></p>
 *
 * <p><b><u>Performance Boost</u></b></p>
 * <p>DomHelper will transparently create HTML fragments when it can. Using HTML fragments instead
 * of DOM can significantly boost performance.</p>
 * <p>Element creation specification parameters may also be strings. If {@link #useDom} is <tt>false</tt>,
 * then the string is used as innerHTML. If {@link #useDom} is <tt>true</tt>, a string specification
 * results in the creation of a text node. Usage:</p>
 * <pre><code>
Ext.DomHelper.useDom = true; // force it to use DOM; reduces performance
 * </code></pre>
 * @singleton
 */
Ext.DomHelper = {
    emptyTags : /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,
    confRe : /tag|children|cn|html$/i,
    endRe : /end/i,

    /**
     * Returns the markup for the passed Element(s) config.
     * @param {Object} o The DOM object spec (and children)
     * @return {String}
     */
    markup : function(o) {
        var b = '',
            attr,
            val,
            key,
            keyVal,
            cn;

        if (typeof o == "string") {
            b = o;
        }
        else if (Ext.isArray(o)) {
            for (var i=0; i < o.length; i++) {
                if (o[i]) {
                    b += this.markup(o[i]);
                }
            };
        }
        else {
            b += '<' + (o.tag = o.tag || 'div');
            for (attr in o) {
                if (!o.hasOwnProperty(attr)) {
                    continue;
                }
                val = o[attr];
                if (!this.confRe.test(attr)) {
                    if (typeof val == "object") {
                        b += ' ' + attr + '="';
                        for (key in val) {
                            if (!val.hasOwnProperty(key)) {
                                continue;
                            }
                            b += key + ':' + val[key] + ';';
                        };
                        b += '"';
                    }
                    else {
                        b += ' ' + ({cls : 'class', htmlFor : 'for'}[attr] || attr) + '="' + val + '"';
                    }
                }
            };

            // Now either just close the tag or try to add children and close the tag.
            if (this.emptyTags.test(o.tag)) {
                b += '/>';
            }
            else {
                b += '>';
                if ((cn = o.children || o.cn)) {
                    b += this.markup(cn);
                }
                else if (o.html) {
                    b += o.html;
                }
                b += '</' + o.tag + '>';
            }
        }
        return b;
    },

    /**
     * Applies a style specification to an element.
     * @param {String/HTMLElement} el The element to apply styles to
     * @param {String/Object/Function} styles A style specification string e.g. 'width:100px', or object in the form {width:'100px'}, or
     * a function which returns such a specification.
     */
    applyStyles : function(el, styles) {
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
     * @param {HTMLElement} el The context element
     * @param {String} html The HTML fragment
     * @return {HTMLElement} The new node
     */
    insertHtml : function(where, el, html) {
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
     * @param {Mixed} el The context element
     * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
     * @param {Boolean} returnElement (optional) true to return a Ext.Element
     * @return {HTMLElement/Ext.Element} The new node
     */
    insertBefore : function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'beforebegin');
    },

    /**
     * Creates new DOM element(s) and inserts them after el.
     * @param {Mixed} el The context element
     * @param {Object} o The DOM object spec (and children)
     * @param {Boolean} returnElement (optional) true to return a Ext.Element
     * @return {HTMLElement/Ext.Element} The new node
     */
    insertAfter : function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'afterend', 'nextSibling');
    },

    /**
     * Creates new DOM element(s) and inserts them as the first child of el.
     * @param {Mixed} el The context element
     * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
     * @param {Boolean} returnElement (optional) true to return a Ext.Element
     * @return {HTMLElement/Ext.Element} The new node
     */
    insertFirst : function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'afterbegin', 'firstChild');
    },

    /**
     * Creates new DOM element(s) and appends them to el.
     * @param {Mixed} el The context element
     * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
     * @param {Boolean} returnElement (optional) true to return a Ext.Element
     * @return {HTMLElement/Ext.Element} The new node
     */
    append : function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'beforeend', '', true);
    },

    /**
     * Creates new DOM element(s) and overwrites the contents of el with them.
     * @param {Mixed} el The context element
     * @param {Object/String} o The DOM object spec (and children) or raw HTML blob
     * @param {Boolean} returnElement (optional) true to return a Ext.Element
     * @return {HTMLElement/Ext.Element} The new node
     */
    overwrite : function(el, o, returnElement) {
        el = Ext.getDom(el);
        el.innerHTML = this.markup(o);
        return returnElement ? Ext.get(el.firstChild) : el.firstChild;
    },

    doInsert : function(el, o, returnElement, pos, sibling, append) {
        var newNode = this.insertHtml(pos, Ext.getDom(el), this.markup(o));
        return returnElement ? Ext.get(newNode, true) : newNode;
    }
};

/**
 * @class Ext.DomQuery
 * Provides functionality to select elements on the page based on a CSS selector.
 *
<p>
All selectors, attribute filters and pseudos below can be combined infinitely in any order. For example "div.foo:nth-child(odd)[@foo=bar].bar:first" would be a perfectly valid selector.
</p>
<h4>Element Selectors:</h4>
<ul class="list">
    <li> <b>*</b> any element</li>
    <li> <b>E</b> an element with the tag E</li>
    <li> <b>E F</b> All descendent elements of E that have the tag F</li>
    <li> <b>E > F</b> or <b>E/F</b> all direct children elements of E that have the tag F</li>
    <li> <b>E + F</b> all elements with the tag F that are immediately preceded by an element with the tag E</li>
    <li> <b>E ~ F</b> all elements with the tag F that are preceded by a sibling element with the tag E</li>
</ul>
<h4>Attribute Selectors:</h4>
<p>The use of &#64; and quotes are optional. For example, div[&#64;foo='bar'] is also a valid attribute selector.</p>
<ul class="list">
    <li> <b>E[foo]</b> has an attribute "foo"</li>
    <li> <b>E[foo=bar]</b> has an attribute "foo" that equals "bar"</li>
    <li> <b>E[foo^=bar]</b> has an attribute "foo" that starts with "bar"</li>
    <li> <b>E[foo$=bar]</b> has an attribute "foo" that ends with "bar"</li>
    <li> <b>E[foo*=bar]</b> has an attribute "foo" that contains the substring "bar"</li>
    <li> <b>E[foo%=2]</b> has an attribute "foo" that is evenly divisible by 2</li>
    <li> <b>E[foo!=bar]</b> has an attribute "foo" that does not equal "bar"</li>
</ul>
<h4>Pseudo Classes:</h4>
<ul class="list">
    <li> <b>E:first-child</b> E is the first child of its parent</li>
    <li> <b>E:last-child</b> E is the last child of its parent</li>
    <li> <b>E:nth-child(<i>n</i>)</b> E is the <i>n</i>th child of its parent (1 based as per the spec)</li>
    <li> <b>E:nth-child(odd)</b> E is an odd child of its parent</li>
    <li> <b>E:nth-child(even)</b> E is an even child of its parent</li>
    <li> <b>E:only-child</b> E is the only child of its parent</li>
    <li> <b>E:checked</b> E is an element that is has a checked attribute that is true (e.g. a radio or checkbox) </li>
    <li> <b>E:first</b> the first E in the resultset</li>
    <li> <b>E:last</b> the last E in the resultset</li>
    <li> <b>E:nth(<i>n</i>)</b> the <i>n</i>th E in the resultset (1 based)</li>
    <li> <b>E:odd</b> shortcut for :nth-child(odd)</li>
    <li> <b>E:even</b> shortcut for :nth-child(even)</li>
    <li> <b>E:contains(foo)</b> E's innerHTML contains the substring "foo"</li>
    <li> <b>E:nodeValue(foo)</b> E contains a textNode with a nodeValue that equals "foo"</li>
    <li> <b>E:not(S)</b> an E element that does not match simple selector S</li>
    <li> <b>E:has(S)</b> an E element that has a descendent that matches simple selector S</li>
    <li> <b>E:next(S)</b> an E element whose next sibling matches simple selector S</li>
    <li> <b>E:prev(S)</b> an E element whose previous sibling matches simple selector S</li>
    <li> <b>E:any(S1|S2|S2)</b> an E element which matches any of the simple selectors S1, S2 or S3//\\</li>
</ul>
<h4>CSS Value Selectors:</h4>
<ul class="list">
    <li> <b>E{display=none}</b> css value "display" that equals "none"</li>
    <li> <b>E{display^=none}</b> css value "display" that starts with "none"</li>
    <li> <b>E{display$=none}</b> css value "display" that ends with "none"</li>
    <li> <b>E{display*=none}</b> css value "display" that contains the substring "none"</li>
    <li> <b>E{display%=2}</b> css value "display" that is evenly divisible by 2</li>
    <li> <b>E{display!=none}</b> css value "display" that does not equal "none"</li>
</ul>
 * @singleton
 */
Ext.DomQuery = {
    /**
     * Selects a group of elements.
     * @param {String} selector The selector/xpath query (can be a comma separated list of selectors)
     * @param {Node/String} root (optional) The start of the query (defaults to document).
     * @return {Array} An Array of DOM elements which match the selector. If there are
     * no matches, and empty Array is returned.
     */
    select : function(q, root) {
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
        for (i = 0, qlen = q.length; i < qlen; i++) {
            if (typeof q[i] == 'string') {
                nodes = root.querySelectorAll(q[i]);

                for (j = 0, nlen = nodes.length; j < nlen; j++) {
                    results.push(nodes[j]);
                }
            }
        }

        return results;
    },

    /**
     * Selects a single element.
     * @param {String} selector The selector/xpath query
     * @param {Node} root (optional) The start of the query (defaults to document).
     * @return {HtmlElement} The DOM element which matched the selector.
     */
    selectNode : function(q, root) {
        return Ext.DomQuery.select(q, root)[0];
    },

    /**
     * Returns true if the passed element(s) match the passed simple selector (e.g. div.some-class or span:first-child)
     * @param {String/HTMLElement/Array} el An element id, element or array of elements
     * @param {String} selector The simple selector to test
     * @return {Boolean}
     */
    is : function(el, q) {
        if (typeof el == "string") {
            el = document.getElementById(el);
        }
        return Ext.DomQuery.select(q).indexOf(el) !== -1;
    }
};

Ext.Element.selectorFunction = Ext.DomQuery.select;
Ext.query = Ext.DomQuery.select;

/**
 * @class Ext.Anim
 * @extends Object
 * <p>Ext.Anim is used to excute animations defined in {@link Ext.anims}. The {@link #run} method can take any of the 
 * properties defined below.</p>
 * 
 * <h2>Example usage:</h2>
 * <code><pre>
Ext.Anim.run(this, 'fade', {
    out: false,
    autoClear: true
});
 * </pre></code>
 * 
 * <p>Animations are disabled on Android and Blackberry by default using the {@link #disableAnimations} property.</p>
 * @singleton
 */
Ext.Anim = Ext.extend(Object, {
    isAnim: true,
    
    /**
     * @cfg {Boolean} disableAnimations
     * True to disable animations. By default, animations are disabled on Android and Blackberry
     */
    disableAnimations: false,
//    disableAnimations: (!Ext.is.iOS || Ext.is.Blackberry) ? true : false,

    defaultConfig: {
        /**
         * @cfg {Object} from
         * An object of CSS values which the animation begins with. If you define a CSS property here, you must also 
         * define it in the {@link #to} config.
         */
        from: {},

        /**
         * @cfg {Object} to
         * An object of CSS values which the animation ends with. If you define a CSS property here, you must also 
         * define it in the {@link #from} config.
         */
        to: {},

        /**
         * @cfg {Number} duration
         * Time in milliseconds for the animation to last. 
         * (Defaults to 250).
         */
        duration: 250,

        /**
         * @cfg {Number} delay Time to delay before starting the animation. 
         * (Defaults to 0).
         */
        delay: 0,

        /**
         * @cfg {String} easing
         * Valid values are 'ease', 'linear', ease-in', 'ease-out', 'ease-in-out' or a cubic-bezier curve as defined by CSS. 
         * (Defaults to 'ease-in-out').
         */
        easing: 'ease-in-out',

        /**
         * @cfg {Boolean} autoClear
         * True to remove all custom CSS defined in the {@link #to} config when the animation is over. 
         * (Defaults to true).
         */
        autoClear: true,

        /**
         * @cfg {Boolean} out
         * True if you want the animation to slide out of the screen. 
         * (Defaults to true).
         */
        out: true,

        /**
         * @cfg {String} direction
         * Valid values are 'left', 'right', 'up', 'down' and null. 
         * (Defaults to null).
         */
        direction: null,

        /**
         * @cfg {Boolean} reverse
         * True to reverse the animation direction. For example, if the animation direction was set to 'left', it would 
         * then use 'right'. 
         * (Defaults to false).
         */
        reverse: false
    },

    /**
     * @cfg {Function} before
     * Code to execute before starting the animation.
     */

    /**
     * @cfg {Scope} scope
     * Scope to run the {@link before} function in.
     */

    opposites: {
        'left': 'right',
        'right': 'left',
        'up': 'down',
        'down': 'up'
    },

    constructor: function(config) {
        config = Ext.apply({}, config || {}, this.defaultConfig);
        this.config = config;

        Ext.Anim.superclass.constructor.call(this);

        this.running = {};
    },

    initConfig : function(el, runConfig) {
        var me = this,
            runtime = {},
            config = Ext.apply({}, runConfig || {}, me.config);

        config.el = el = Ext.get(el);

        if (config.reverse && me.opposites[config.direction]) {
            config.direction = me.opposites[config.direction];
        }

        if (me.config.before) {
            me.config.before.call(config, el, config);
        }

        if (runConfig.before) {
            runConfig.before.call(config.scope || config, el, config);
        }

        return config;
    },
    
    run: function(el, config) {
        el = Ext.get(el);
        config = config || {};


        var me = this,
            style = el.dom.style,
            property,
            after = config.after;

        if (me.running[el.id]) {
            me.onTransitionEnd(null, el, {
                config: config,
                after: after
            });
        }

        config = this.initConfig(el, config);

        if (this.disableAnimations) {
            for (property in config.to) {
                if (!config.to.hasOwnProperty(property)) {
                    continue;
                }
                style[property] = config.to[property];
            }
            this.onTransitionEnd(null, el, {
                config: config,
                after: after
            });
            return me;
        }

        el.un('webkitTransitionEnd', me.onTransitionEnd, me);

        style.webkitTransitionDuration = '0ms';
        for (property in config.from) {
            if (!config.from.hasOwnProperty(property)) {
                continue;
            }
            style[property] = config.from[property];
        }

        setTimeout(function() {
            // If this element has been destroyed since the timeout started, do nothing
            if (!el.dom) {
                return;
            }
            
            // If this is a 3d animation we have to set the perspective on the parent
            if (config.is3d === true) {
                el.parent().setStyle({
                    // TODO: Ability to set this with 3dConfig
                    '-webkit-perspective': '1200',
                    '-webkit-transform-style': 'preserve-3d'
                });
            }

            style.webkitTransitionDuration = config.duration + 'ms';
            style.webkitTransitionProperty = 'all';
            style.webkitTransitionTimingFunction = config.easing;

            // Bind our listener that fires after the animation ends
            el.on('webkitTransitionEnd', me.onTransitionEnd, me, {
                config: config,
                after: after
            });

            for (property in config.to) {
                if (!config.to.hasOwnProperty(property)) {
                    continue;
                }
                style[property] = config.to[property];
            }
        }, config.delay || 5);

        me.running[el.id] = config;
        return me;
    },

    onTransitionEnd: function(ev, el, o) {
        el = Ext.get(el);

        if (this.running[el.id] === undefined) {
            return;
        }

        var style = el.dom.style,
            config = o.config,
            property,
            me = this;
            
        el.un('webkitTransitionEnd', me.onTransitionEnd, me);

        if (config.autoClear) {
            for (property in config.to) {
                if (!config.to.hasOwnProperty(property)) {
                    continue;
                }
                style[property] = '';
            }
        }

        style.webkitTransitionDuration = null;
        style.webkitTransitionProperty = null;
        style.webkitTransitionTimingFunction = null;

        if (config.is3d) {
            el.parent().setStyle({
                '-webkit-perspective': '',
                '-webkit-transform-style': ''
            });
        }

        if (me.config.after) {
            me.config.after.call(config, el, config);
        }

        if (o.after) {
            o.after.call(config.scope || me, el, config);
        }

        delete me.running[el.id];
    }
});

Ext.Anim.seed = 1000;

/**
 * Used to run an animation on a specific element. Use the config argument to customize the animation
 * @param {Ext.Element/Element} el The element to animate
 * @param {String} anim The animation type, defined in {@link #Ext.anims}
 * @param {Object} config The config object for the animation
 * @method run
 */
Ext.Anim.run = function(el, anim, config) {
    if (el.isComponent) {
        el = el.el;
    }

    config = config || {};

    if (anim.isAnim) {
        anim.run(el, config);
    }
    else {
        if (Ext.isObject(anim)) {
            if (config.before && anim.before) {
                config.before = Ext.createInterceptor(config.before, anim.before, anim.scope);
            }
            if (config.after && anim.after) {
                config.after = Ext.createInterceptor(config.after, anim.after, anim.scope);
            }
            config = Ext.apply({}, config, anim);
            anim = anim.type;
        }

        if (!Ext.anims[anim]) {
            throw anim + ' is not a valid animation type.';
        }
        else {
            // add el check to make sure dom exists.
            if (el && el.dom) {
                Ext.anims[anim].run(el, config);
            }

        }
    }
};

/**
 * @class Ext.anims
 * <p>Defines different types of animations. <strong>flip, cube, wipe</strong> animations do not work on Android.</p>
 * <p>Please refer to {@link Ext.Anim} on how to use animations.</p>
 * @singleton
 */
Ext.anims = {
    /**
     * Fade Animation
     */
    fade: new Ext.Anim({
        before: function(el) {
            var fromOpacity = 1,
                toOpacity = 1,
                curZ = el.getStyle('z-index') == 'auto' ? 0 : el.getStyle('z-index'),
                zIndex = curZ;

            if (this.out) {
                toOpacity = 0;
            } else {
                zIndex = curZ + 1;
                fromOpacity = 0;
            }

            this.from = {
                'opacity': fromOpacity,
                'z-index': zIndex
            };
            this.to = {
                'opacity': toOpacity,
                'z-index': zIndex
            };
        }
    }),

    /**
     * Slide Animation
     */
    slide: new Ext.Anim({
        direction: 'left',
        cover: false,
        reveal: false,

        before: function(el) {
            var curZ = el.getStyle('z-index') == 'auto' ? 0 : el.getStyle('z-index'),
                zIndex = curZ + 1,
                toX = 0,
                toY = 0,
                fromX = 0,
                fromY = 0,
                elH = el.getHeight(),
                elW = el.getWidth();

            if (this.direction == 'left' || this.direction == 'right') {
                if (this.out == true) {
                    toX = -elW;
                }
                else {
                    fromX = elW;
                }
            }
            else if (this.direction == 'up' || this.direction == 'down') {
                if (this.out == true) {
                    toY = -elH;
                }
                else {
                    fromY = elH;
                }
            }

            if (this.direction == 'right' || this.direction == 'down') {
                toY *= -1;
                toX *= -1;
                fromY *= -1;
                fromX *= -1;
            }

            if (this.cover && this.out) {
                toX = 0;
                toY = 0;
                zIndex = curZ;
            }
            else if (this.reveal && !this.out) {
                fromX = 0;
                fromY = 0;
                zIndex = curZ;
            }

            this.from = {
                '-webkit-transform': 'translate3d(' + fromX + 'px, ' + fromY + 'px, 0)',
                'z-index': zIndex,
                'opacity': 0.99
            };
            this.to = {
                '-webkit-transform': 'translate3d(' + toX + 'px, ' + toY + 'px, 0)',
                'z-index': zIndex,
                'opacity': 1
            };
        }
    }),

    /**
     * Pop Animation
     */
    pop: new Ext.Anim({
        scaleOnExit: true,
        before: function(el) {
            var fromScale = 1,
                toScale = 1,
                fromOpacity = 1,
                toOpacity = 1,
                curZ = el.getStyle('z-index') == 'auto' ? 0 : el.getStyle('z-index'),
                fromZ = curZ,
                toZ = curZ;

            if (!this.out) {
                fromScale = 0.01;
                fromZ = curZ + 1;
                toZ = curZ + 1;
                fromOpacity = 0;
            }
            else {
                if (this.scaleOnExit) {
                    toScale = 0.01;
                    toOpacity = 0;
                } else {
                    toOpacity = 0.8;
                }
            }

            this.from = {
                '-webkit-transform': 'scale(' + fromScale + ')',
                '-webkit-transform-origin': '50% 50%',
                'opacity': fromOpacity,
                'z-index': fromZ
            };

            this.to = {
                '-webkit-transform': 'scale(' + toScale + ')',
                '-webkit-transform-origin': '50% 50%',
                'opacity': toOpacity,
                'z-index': toZ
            };
        }
    })
};
/**
 * @class Ext.anims
 */
Ext.apply(Ext.anims, {
    /**
     * Flip Animation
     */
    flip: new Ext.Anim({
        is3d: true,
        direction: 'left',
        before: function(el) {
            var rotateProp = 'Y',
                fromScale = 1,
                toScale = 1,
                fromRotate = 0,
                toRotate = 0;

            if (this.out) {
                toRotate = -180;
                toScale = 0.8;
            }
            else {
                fromRotate = 180;
                fromScale = 0.8;
            }

            if (this.direction == 'up' || this.direction == 'down') {
                rotateProp = 'X';
            }

            if (this.direction == 'right' || this.direction == 'left') {
                toRotate *= -1;
                fromRotate *= -1;
            }

            this.from = {
                '-webkit-transform': 'rotate' + rotateProp + '(' + fromRotate + 'deg) scale(' + fromScale + ')',
                '-webkit-backface-visibility': 'hidden'
            };
            this.to = {
                '-webkit-transform': 'rotate' + rotateProp + '(' + toRotate + 'deg) scale(' + toScale + ')',
                '-webkit-backface-visibility': 'hidden'
            };
        }
    }),
    
    /**
     * Cube Animation
     */
    cube: new Ext.Anim({
        is3d: true,
        direction: 'left',
        style: 'outer',
        before: function(el) {
            var origin = '0% 0%',
                fromRotate = 0,
                toRotate = 0,
                rotateProp = 'Y',
                fromZ = 0,
                toZ = 0,
                fromOpacity = 1,
                toOpacity = 1,
                zDepth,
                elW = el.getWidth(),
                elH = el.getHeight(),
                showTranslateZ = true,
                fromTranslate = ' translateX(0)',
                toTranslate = '';

            if (this.direction == 'left' || this.direction == 'right') {
                if (this.out) {
                    origin = '100% 100%';
                    toZ = elW;
                    toOpacity = 0.5;
                    toRotate = -90;
                } else {
                    origin = '0% 0%';
                    fromZ = elW;
                    fromOpacity = 0.5;
                    fromRotate = 90;
                }
            } else if (this.direction == 'up' || this.direction == 'down') {
                rotateProp = 'X';
                if (this.out) {
                    origin = '100% 100%';
                    toZ = elH;
                    toRotate = 90;
                } else {
                    origin = '0% 0%';
                    fromZ = elH;
                    fromRotate = -90;
                }
            }

            if (this.direction == 'down' || this.direction == 'right') {
                fromRotate *= -1;
                toRotate *= -1;
                origin = (origin == '0% 0%') ? '100% 100%': '0% 0%';
            }

            if (this.style == 'inner') {
                fromZ *= -1;
                toZ *= -1;
                fromRotate *= -1;
                toRotate *= -1;

                if (!this.out) {
                    toTranslate = ' translateX(0px)';
                    origin = '0% 50%';
                } else {
                    toTranslate = fromTranslate;
                    origin = '100% 50%';
                }
            }

            this.from = {
                '-webkit-transform': 'rotate' + rotateProp + '(' + fromRotate + 'deg)' + (showTranslateZ ? ' translateZ(' + fromZ + 'px)': '') + fromTranslate,
                '-webkit-transform-origin': origin
            };
            this.to = {
                '-webkit-transform': 'rotate' + rotateProp + '(' + toRotate + 'deg) translateZ(' + toZ + 'px)' + toTranslate,
                '-webkit-transform-origin': origin
            };
        },
        duration: 250
    }),
    
    
    /**
     * Wipe Animation.
     * <p>Because of the amount of calculations involved, this animation is best used on small display
     * changes or specifically for phone environments. Does not currently accept any parameters.</p>
     */
    wipe: new Ext.Anim({
        before: function(el) {
            var curZ = el.getStyle('z-index'),
                mask = '',
                toSize = '100%',
                fromSize = '100%';

            if (!this.out) {
                zIndex = curZ + 1;
                mask = '-webkit-gradient(linear, left bottom, right bottom, from(transparent), to(#000), color-stop(66%, #000), color-stop(33%, transparent))';
                toSize = el.getHeight() * 100 + 'px';
                fromSize = el.getHeight();

                this.from = {
                    '-webkit-mask-image': mask,
                    '-webkit-mask-size': el.getWidth() * 3 + 'px ' + el.getHeight() + 'px',
                    'z-index': zIndex,
                    '-webkit-mask-position-x': 0
                };
                this.to = {
                    '-webkit-mask-image': mask,
                    '-webkit-mask-size': el.getWidth() * 3 + 'px ' + el.getHeight() + 'px',
                    'z-index': zIndex,
                    '-webkit-mask-position-x': -el.getWidth() * 2 + 'px'
                };
            }
        },
        duration: 500
    })
});
