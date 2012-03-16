/**
 * @class Ext.ComponentMgr
 * @extends Ext.AbstractManager
 * <p>Provides a registry of all Components (instances of {@link Ext.Component} or any subclass
 * thereof) on a page so that they can be easily accessed by {@link Ext.Component component}
 * {@link Ext.Component#id id} (see {@link #get}, or the convenience method {@link Ext#getCmp Ext.getCmp}).</p>
 * <p>This object also provides a registry of available Component <i>classes</i>
 * indexed by a mnemonic code known as the Component's {@link Ext.Component#xtype xtype}.
 * The <code>{@link Ext.Component#xtype xtype}</code> provides a way to avoid instantiating child Components
 * when creating a full, nested config object for a complete Ext page.</p>
 * <p>A child Component may be specified simply as a <i>config object</i>
 * as long as the correct <code>{@link Ext.Component#xtype xtype}</code> is specified so that if and when the Component
 * needs rendering, the correct type can be looked up for lazy instantiation.</p>
 * <p>For a list of all available <code>{@link Ext.Component#xtype xtypes}</code>, see {@link Ext.Component}.</p>
 * @singleton
 */
Ext.ComponentMgr = new Ext.AbstractManager({
    typeName: 'xtype',

    /**
     * Creates a new Component from the specified config object using the
     * config object's {@link Ext.component#xtype xtype} to determine the class to instantiate.
     * @param {Object} config A configuration object for the Component you wish to create.
     * @param {Constructor} defaultType The constructor to provide the default Component type if
     * the config object does not contain a <code>xtype</code>. (Optional if the config contains a <code>xtype</code>).
     * @return {Ext.Component} The newly instantiated Component.
     */
    create : function(config, defaultType){
        if (config.isComponent) {
            return config;
        } else {
            var type = config.xtype || defaultType,
                Class = this.types[type];
            if (!Class) {
                throw "Attempting to create a component with an xtype that has not been registered: " + type
            }
            return new Class(config);
        }
        return config.render ? config : new (config);
    },

    registerType : function(type, cls) {
        this.types[type] = cls;
        cls[this.typeName] = type;
        cls.prototype[this.typeName] = type;
    }
});

/**
 * Shorthand for {@link Ext.ComponentMgr#registerType}
 * @param {String} xtype The {@link Ext.component#xtype mnemonic string} by which the Component class
 * may be looked up.
 * @param {Constructor} cls The new Component class.
 * @member Ext
 * @method reg
 */
Ext.reg = function() {
    return Ext.ComponentMgr.registerType.apply(Ext.ComponentMgr, arguments);
}; // this will be called a lot internally, shorthand to keep the bytes down

/**
 * Shorthand for {@link Ext.ComponentMgr#create}
 * Creates a new Component from the specified config object using the
 * config object's {@link Ext.component#xtype xtype} to determine the class to instantiate.
 * @param {Object} config A configuration object for the Component you wish to create.
 * @param {Constructor} defaultType The constructor to provide the default Component type if
 * the config object does not contain a <code>xtype</code>. (Optional if the config contains a <code>xtype</code>).
 * @return {Ext.Component} The newly instantiated Component.
 * @member Ext
 * @method create
 */
Ext.create = function() {
    return Ext.ComponentMgr.create.apply(Ext.ComponentMgr, arguments);
};

/**
 * @class Ext.ComponentQuery
 * @extends Object
 *
 * Provides searching of Components within Ext.ComponentMgr (globally) or a specific
 * Ext.Container on the document with a similar syntax to a CSS selector.
 *
 * Xtypes can be retrieved by their name with an optional . prefix
<ul>
    <li>component or .component</li>
    <li>gridpanel or .gridpanel</li>
</ul>
 *
 * An itemId or id must be prefixed with a #.
<ul>
    <li>#myContainer</li>
</ul>
 *
 *
 * Attributes must be wrapped in brackets
<ul>
    <li>component[autoScroll]</li>
    <li>panel[title="Test"]</li>
</ul>
 *
 * Member expressions from candidate Components may be tested. If the expression returns a <i>truthy</i> value,
 * the candidate Component will be included in the query:<pre><code>
var disabledFields = myFormPanel.query("{isDisabled()}");
</code></pre>
 *
 * Pseudo classes may be used to filter results in the same way as in {@link Ext.DomQuery DomQuery}:<code><pre>
// Function receives array and returns a filtered array.
Ext.ComponentQuery.pseudos.invalid = function(items) {
    var i = 0, l = items.length, c, result = [];
    for (; i < l; i++) {
        if (!(c = items[i]).isValid()) {
            result.push(c);
        }
    }
    return result;
};

var invalidFields = myFormPanel.query('field:invalid');
if (invalidFields.length) {
    invalidFields[0].getEl().scrollIntoView(myFormPanel.body);
    for (var i = 0, l = invalidFields.length; i < l; i++) {
        invalidFields[i].getEl().frame("red");
    }
}
</pre></code>
 *
 * Queries return an array of components.
 * Here are some example queries.
<pre><code>
    // retrieve all Ext.Panel's on the document by xtype
    var panelsArray = Ext.ComponentQuery.query('.panel');

    // retrieve all Ext.Panels within the container with an id myCt
    var panelsWithinmyCt = Ext.ComponentQuery.query('#myCt .panel');

    // retrieve all direct children which are Ext.Panels within myCt
    var directChildPanel = Ext.ComponentQuery.query('#myCt > .panel');

    // retrieve all gridpanels and listviews
    var gridsAndLists = Ext.ComponentQuery.query('gridpanel, listview');
</code></pre>
 * @singleton
 */
Ext.ComponentQuery = new function() {
    var cq = this,

        // A function source code pattern with a placeholder which accepts an expression which yields a truth value when applied
        // as a member on each item in the passed array.
        filterFnPattern = [
            'var r = [],',
                'i = 0,',
                'it = arguments[0],',
                'l = it.length,',
                'c;',
            'for (; i < l; i++) {',
                'c = it[i].{0};',
                'if (c) {',
                   'r.push(c);',
                '}',
            '}',
            'return r;'
        ].join(''),

        filterItems = function(items, operation) {
            // Argument list for the operation is [ itemsArray, operationArg1, operationArg2...]
            // The operation's method loops over each item in the candidate array and
            // returns an array of items which match its criteria
            return operation.method.apply(this, [ items ].concat(operation.args));
        },

        getItems = function(items, mode) {
            var result = [],
                i,
                ln = items.length,
                candidate,
                deep = mode != '>';
            for (i = 0; i < ln; i++) {
                candidate = items[i];
                if (candidate.getRefItems) {
                    result = result.concat(candidate.getRefItems(deep));
                }
            }
            return result;
        },

        getAncestors = function(items) {
            var result = [],
                i,
                ln = items.length,
                candidate;
            for (i = 0; i < ln; i++) {
                candidate = items[i];
                while (!!(candidate = candidate.ownerCt)) {
                    result.push(candidate);
                }
            }
            return result;
        },

        // Filters the passed candidate array and returns only items which match the passed xtype
        filterByXType = function(items, xtype, shallow) {
            if (xtype == '*') {
                return items.slice();
            }
            else {
                var result = [],
                    i,
                    ln = items.length,
                    candidate;
                for (i = 0; i < ln; i++) {
                    candidate = items[i];
                    if (candidate.isXType(xtype, shallow)) {
                        result.push(candidate);
                    }
                }
                return result;
            }
        },

        // Filters the passed candidate array and returns only items which have the passed className
        filterByClassName = function(items, className) {
            var result = [],
                i,
                ln = items.length,
                candidate;
            for (i = 0; i < ln; i++) {
                candidate = items[i];
                if (candidate.el ? candidate.el.hasCls(className) : candidate.initCls().contains(className)) {
                    result.push(candidate);
                }
            }
            return result;
        },

        // Filters the passed candidate array and returns only items which have the specified property match
        filterByAttribute = function(items, property, operator, value) {
            var result = [],
                i,
                ln = items.length,
                candidate;
            for (i = 0; i < ln; i++) {
                candidate = items[i];
                if ((value === undefined) ? !!candidate[property] : (candidate[property] == value)) {
                    result.push(candidate);
                }
            }
            return result;
        },

        // Filters the passed candidate array and returns only items which have the specified itemId or id
        filterById = function(items, id) {
            var result = [],
                i,
                ln = items.length,
                candidate;
            for (i = 0; i < ln; i++) {
                candidate = items[i];
                if (candidate.getItemId() == id) {
                    result.push(candidate);
                }
            }
            return result;
        },

        // Filters the passed candidate array and returns only items which the named pseudo class matcher filters in
        filterByPseudo = function(items, name, value) {
            return cq.pseudos[name](items, value);
        },

        // Determines leading mode
        // > for direct child, and ^ to switch to ownerCt axis
        modeRe = /^(\s?([>\^])\s?|\s|$)/,

        // Matches a token with possibly (true|false) appended for the "shallow" parameter
        // or {memberExpression}
        tokenRe = /^(?:(#)?([\w-]+|\*)(?:\((true|false)\))?)|(?:\{([^\}]+)\})/,

        matchers = [{
            // Checks for .xtype with possibly (true|false) appended for the "shallow" parameter
            re: /^\.([\w-]+)(?:\((true|false)\))?/,
            method: filterByXType
        },{
            // checks for [attribute=value]
            re: /^(?:[\[\{](?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
            method: filterByAttribute
        }, {
            // checks for #cmpItemId
            re: /^#([\w-]+)/,
            method: filterById
        }, {
            re: /^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
            method: filterByPseudo
        }];

    /**
     * @class Ext.ComponentQuery.Query
     * @extends Object
     * @private
     */
    cq.Query = Ext.extend(Object, {
        constructor: function(cfg) {
            cfg = cfg || {};
            Ext.apply(this, cfg);
        },

        execute : function(root) {
            var operations = this.operations,
                ln = operations.length,
                operation, i,
                workingItems;

            // no root, use all Components in the document
            if (!root) {
		workingItems = Ext.ComponentMgr.all.getArray();
            }

            // We are going to loop over our operations and take care of them
            // one by one.
            for (i = 0; i < ln; i++) {
                operation = operations[i];

                // The mode operation requires some custom handling.
                // All other operations essentially filter down our current
                // working items, while mode replaces our current working
                // items by getting children from each one of our current
                // working items. The type of mode determines the type of
                // children we get. (e.g. > only gets direct children)
                if (operation.mode == '^') {
                    workingItems = getAncestors(workingItems || [root]);
                }
                else if (operation.mode) {
                    workingItems = getItems(workingItems || [root], operation.mode);
                }
                else {
                    workingItems = filterItems(workingItems || getItems([root]), operation);
                }

                // If this is the last operation, it means our current working
                // items are the final matched items. Thus return them!
                if (i == ln -1) {
                    return workingItems;
                }
            }
            return [];
        },

        is: function(component) {
            var operations = this.operations,
                ln = operations.length,
                i,
                workingItems = Ext.isArray(component) ? component : [ component ];

            // Filter the Component array by each operation in turn.
            // Quit immediately if the results are ever filtered to zero length
            for (i = 0; i < ln && workingItems.length; i++) {
                workingItems = filterItems(workingItems, operations[i]);
            }
            return workingItems.length != 0;
        }
    });

    Ext.apply(this, {

        // private cache of selectors and matching ComponentQuery.Query objects
        cache: {},

        // private cache of pseudo class filter functions
        pseudos: {},

        /**
         * <p>Returns an array of matched Components from within the passed root Container.</p>
         * <p>This method filters returned Components in a similar way to how CSS selector based DOM
         * queries work using a textual selector string.</p>
         * <p>See class summary for details.</p>
         * @param selector The selector string to filter returned Components
         * @param root The Container within which to perform the query. If omitted, all Components
         * within the document are included in the search.
         * @returns {Array} The matched Components.
         */
        query: function(selector, root) {
            var selectors = selector.split(','),
                ln = selectors.length,
                i, query, results = [],
                noDupResults = [], dupMatcher = {}, resultsLn, cmp;

            for (i = 0; i < ln; i++) {
                selector = Ext.util.Format.trim(selectors[i]);
                query = this.cache[selector];
                if (!query) {
                    this.cache[selector] = query = this.parse(selector);
                }
                results = results.concat(query.execute(root));
            }

            // multiple selectors, potential to find duplicates
            // lets filter them out.
            if (ln > 1) {
                resultsLn = results.length;
                for (i = 0; i < resultsLn; i++) {
                    cmp = results[i];
                    if (!dupMatcher[cmp.id]) {
                        noDupResults.push(cmp);
                        dupMatcher[cmp.id] = true;
                    }
                }
                results = noDupResults;
            }
            return results;
        },

        /**
         * Tests whether the passed Component matches the selector string.
         * @param component The Components to test
         * @param selector The selector string to test against.
         * @returns {Boolean} True if the Component matches the selector.
         */
        is: function(component, selector) {
            if (!selector) {
                return true;
            }
            var query = this.cache[selector];
            if (!query) {
                this.cache[selector] = query = this.parse(selector);
            }
            return query.is(component);
        },

        parse: function(selector) {
            var operations = [],
                ln = matchers.length,
                lastSelector,
                tokenMatch,
                matchedChar,
                modeMatch,
                selectorMatch,
                args,
                i, matcher;

            // We are going to parse the beginning of the selector over and
            // over again, slicing off the selector any portions we converted into an
            // operation, until it is an empty string.
            while (selector && lastSelector != selector) {
                lastSelector = selector;

                // First we check if we are dealing with a token like #, * or an xtype
                tokenMatch = selector.match(tokenRe);

                if (tokenMatch) {
                    matchedChar = tokenMatch[1];

                    // If the token is prefixed with a # we push a filterById operation to our stack
                    if (matchedChar == '#') {
                        operations.push({
                            method: filterById,
                            args: [Ext.util.Format.trim(tokenMatch[2])]
                        });
                    }
                    // If the token is prefixed with a . we push a filterByClassName operation to our stack
                    // Not enabled yet. just needs \. adding to the tokenRe prefix
                    else if (matchedChar == '.') {
                        operations.push({
                            method: filterByClassName,
                            args: [Ext.util.Format.trim(tokenMatch[2])]
                        });
                    }
                    // If the token is an expression, eg {isHidden()} we push a generated function operation to our stack
                    else if (tokenMatch[4]) {
                        operations.push({
                            method: new Function(Ext.util.Format.format(filterFnPattern, tokenMatch[4])),
                            args: []
                        });
                    }
                    // If the token is a * or an xtype string, we push a filterByXType
                    // operation to the stack.
                    else {
                        operations.push({
                            method: filterByXType,
                            args: [Ext.util.Format.trim(tokenMatch[2]), Boolean(tokenMatch[3])]
                        });
                    }

                    // Now we slice of the part we just converted into an operation
                    selector = selector.replace(tokenMatch[0], '');
                }

                // If the next part of the query is not a space or > or ^, it means we
                // are going to check for more things that our current selection
                // has to comply to.
                while (!(modeMatch = selector.match(modeRe))) {
                    // Lets loop over each type of matcher and execute it
                    // on our current selector.
                    for (i = 0; selector && i < ln; i++) {
                        matcher = matchers[i];
                        selectorMatch = selector.match(matcher.re);

                        // If we have a match, add an operation with the method
                        // associated with this matcher, and pass the regular
                        // expression matches are arguments to the operation.
                        if (selectorMatch) {
                            operations.push({
                                method: matcher.method,
                                args: selectorMatch.splice(1)
                            });
                            selector = selector.replace(selectorMatch[0], '');
                            break; // Break on match
                        }
                        // Exhausted all matches: It's an error
                        if (i == (ln - 1)) {
                            throw "Invalid ComponentQuery selector: \"" + arguments[0] + "\"";
                        }
                    }
                }

                // Now we are going to check for a mode change. This means a space
                // or a > to determine if we are going to select all the children
                // of the currently matched items, or a ^ if we are going to use the
                // ownerCt axis as the candidate source.
                if (modeMatch[1]) { // Assignment, and test for truthiness!
                    operations.push({
                        mode: modeMatch[2]||modeMatch[1]
                    });
                    selector = selector.replace(modeMatch[0], '');
                }
            }

            //  Now that we have all our operations in an array, we are going
            // to create a new Query using these operations.
            return new cq.Query({
                operations: operations
            });
        }
    });
};

/**
 * @class Ext.PluginMgr
 * @extends Ext.AbstractManager
 * <p>Provides a registry of available Plugin <i>classes</i> indexed by a mnemonic code known as the Plugin's ptype.
 * The <code>{@link Ext.Component#xtype xtype}</code> provides a way to avoid instantiating child Components
 * when creating a full, nested config object for a complete Ext page.</p>
 * <p>A child Component may be specified simply as a <i>config object</i>
 * as long as the correct <code>{@link Ext.Component#xtype xtype}</code> is specified so that if and when the Component
 * needs rendering, the correct type can be looked up for lazy instantiation.</p>
 * <p>For a list of all available <code>{@link Ext.Component#xtype xtypes}</code>, see {@link Ext.Component}.</p>
 * @singleton
 */
Ext.PluginMgr = new Ext.AbstractManager({
    typeName: 'ptype',

    /**
     * Creates a new Plugin from the specified config object using the
     * config object's {@link Ext.component#ptype ptype} to determine the class to instantiate.
     * @param {Object} config A configuration object for the Plugin you wish to create.
     * @param {Constructor} defaultType The constructor to provide the default Plugin type if
     * the config object does not contain a <code>ptype</code>. (Optional if the config contains a <code>ptype</code>).
     * @return {Ext.Component} The newly instantiated Plugin.
     */
    create : function(config, defaultType){
        var PluginCls = this.types[config.ptype || defaultType];
        if (PluginCls.init) {
            return PluginCls;
        } else {
            return new PluginCls(config);
        }
    },

    /**
     * Returns all plugins registered with the given type. Here, 'type' refers to the type of plugin, not its ptype.
     * @param {String} type The type to search for
     * @param {Boolean} defaultsOnly True to only return plugins of this type where the plugin's isDefault property is truthy
     * @return {Array} All matching plugins
     */
    findByType: function(type, defaultsOnly) {
        var matches = [],
            types   = this.types;

        for (var name in types) {
            if (!types.hasOwnProperty(name)) {
                continue;
            }
            var item = types[name];

            if (item.type == type && (!defaultsOnly || (defaultsOnly === true && item.isDefault))) {
                matches.push(item);
            }
        }

        return matches;
    }
});

/**
 * Shorthand for {@link Ext.PluginMgr#registerType}
 * @param {String} ptype The {@link Ext.component#ptype mnemonic string} by which the Plugin class
 * may be looked up.
 * @param {Constructor} cls The new Plugin class.
 * @member Ext
 * @method preg
 */
Ext.preg = function() {
    return Ext.PluginMgr.registerType.apply(Ext.PluginMgr, arguments);
};

/**
 * @class Ext.EventManager
 * Registers event handlers that want to receive a normalized EventObject instead of the standard browser event and provides
 * several useful events directly.
 * See {@link Ext.EventObject} for more details on normalized event objects.
 * @singleton
 */
Ext.EventManager = {
    optionsRe: /^(?:capture|scope|delay|buffer|single|stopEvent|disableLocking|preventDefault|stopPropagation|normalized|args|delegate|horizontal|vertical|dragThreshold|holdThreshold|doubleTapThreshold|cancelThreshold|singleTapThreshold|fireClickEvent)$/,
    touchRe: /^(?:pinch|pinchstart|pinchend|tap|singletap|doubletap|swipe|swipeleft|swiperight|drag|dragstart|dragend|touchdown|touchstart|touchmove|touchend|taphold|tapstart|tapcancel)$/i,

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
    */
    addListener : function(element, eventName, fn, scope, o){
        // handle our listener config object syntax
        if (Ext.isObject(eventName)) {
            this.handleListenerConfig(element, eventName);
            return;
        }

        var dom = Ext.getDom(element);

        // if the element doesnt exist throw an error
        if (!dom){
            throw "Error listening for \"" + eventName + '\". Element "' + element + '" doesn\'t exist.';
        }

        if (!fn) {
            throw 'Error listening for "' + eventName + '". No handler function specified';
        }

        var touch = this.touchRe.test(eventName);

        // create the wrapper function
        var wrap = this.createListenerWrap(dom, eventName, fn, scope, o, touch);

        // add all required data into the event cache
        this.getEventListenerCache(dom, eventName).push({
            fn: fn,
            wrap: wrap,
            scope: scope
        });

        if (touch) {
            Ext.gesture.Manager.addEventListener(dom, eventName, wrap, o);
        }
        else {
            // now add the event listener to the actual element!
            o = o || {};
            dom.addEventListener(eventName, wrap, o.capture || false);
        }
    },

    /**
    * Removes an event handler from an element.  The shorthand version {@link #un} is equivalent.  Typically
    * you will use {@link Ext.Element#removeListener} directly on an Element in favor of calling this version.
    * @param {String/HTMLElement} el The id or html element from which to remove the listener.
    * @param {String} eventName The name of the event.
    * @param {Function} fn The handler function to remove. <b>This must be a reference to the function passed into the {@link #addListener} call.</b>
    * @param {Object} scope If a scope (<b><code>this</code></b> reference) was specified when the listener was added,
    * then this must refer to the same object.
    */
    removeListener : function(element, eventName, fn, scope) {
        // handle our listener config object syntax
        if (Ext.isObject(eventName)) {
            this.handleListenerConfig(element, eventName, true);
            return;
        }

        var dom = Ext.getDom(element),
            cache = this.getEventListenerCache(dom, eventName),
            i = cache.length, j,
            listener, wrap, tasks;

        while (i--) {
            listener = cache[i];

            if (listener && (!fn || listener.fn == fn) && (!scope || listener.scope === scope)) {
                wrap = listener.wrap;

                // clear buffered calls
                if (wrap.task) {
                    clearTimeout(wrap.task);
                    delete wrap.task;
                }

                // clear delayed calls
                j = wrap.tasks && wrap.tasks.length;
                if (j) {
                    while (j--) {
                        clearTimeout(wrap.tasks[j]);
                    }
                    delete wrap.tasks;
                }

                if (this.touchRe.test(eventName)) {
                    Ext.gesture.Manager.removeEventListener(dom, eventName, wrap);
                }
                else {
                    // now add the event listener to the actual element!
                    dom.removeEventListener(eventName, wrap, false);
                }

                // remove listener from cache
                cache.splice(i, 1);
            }
        }
    },

    /**
    * Removes all event handers from an element.  Typically you will use {@link Ext.Element#removeAllListeners}
    * directly on an Element in favor of calling this version.
    * @param {String/HTMLElement} el The id or html element from which to remove all event handlers.
    */
    removeAll : function(element){
        var dom = Ext.getDom(element),
            cache = this.getElementEventCache(dom),
            ev;

        for (ev in cache) {
            if (!cache.hasOwnProperty(ev)) {
                continue;
            }
            this.removeListener(dom, ev);
        }
        Ext.cache[dom.id].events = {};
    },

    purgeElement : function(element, recurse, eventName) {
        var dom = Ext.getDom(element),
            i = 0, len;

        if(eventName) {
            this.removeListener(dom, eventName);
        }
        else {
            this.removeAll(dom);
        }

        if(recurse && dom && dom.childNodes) {
            for(len = element.childNodes.length; i < len; i++) {
                this.purgeElement(element.childNodes[i], recurse, eventName);
            }
        }
    },

    handleListenerConfig : function(element, config, remove) {
        var key, value;

        // loop over all the keys in the object
        for (key in config) {
            if (!config.hasOwnProperty(key)) {
                continue;
            }
            // if the key is something else then an event option
            if (!this.optionsRe.test(key)) {
                value = config[key];
                // if the value is a function it must be something like click: function(){}, scope: this
                // which means that there might be multiple event listeners with shared options
                if (Ext.isFunction(value)) {
                    // shared options
                    this[(remove ? 'remove' : 'add') + 'Listener'](element, key, value, config.scope, config);
                }
                // if its not a function, it must be an object like click: {fn: function(){}, scope: this}
                else {
                    // individual options
                    this[(remove ? 'remove' : 'add') + 'Listener'](element, key, config.fn, config.scope, config);
                }
            }
        }
    },

    getId : function(element) {
        // if we bind listeners to either the document or the window
        // we have to put them in their own id cache since they both
        // can't get id's on the actual element
        var skip = false,
            id;

        element = Ext.getDom(element);

        if (element === document || element === window) {
            skip = true;
        }

        id = Ext.id(element);

        if (!Ext.cache[id]){
            Ext.Element.addToCache(new Ext.Element(element), id);
            if(skip){
                Ext.cache[id].skipGarbageCollection = true;
            }
        }
        return id;
    },

    // private
    createListenerWrap : function(dom, ename, fn, scope, o, touch) {
        o = !Ext.isObject(o) ? {} : o;

        var f = ["if(!window.Ext) {return;}"];
        
        if (touch) {
            f.push('e = new Ext.TouchEventObjectImpl(e, args);');
        }
        else {
            if(o.buffer || o.delay) {
                f.push('e = new Ext.EventObjectImpl(e);');
            } else {
                f.push('e = Ext.EventObject.setEvent(e);');
            }
        }

        if (o.delegate) {
            f.push('var t = e.getTarget("' + o.delegate + '", this);');
            f.push('if(!t) {return;}');
        } else {
            f.push('var t = e.target;');
        }

        if (o.target) {
            f.push('if(e.target !== o.target) {return;}');
        }

        if(o.stopEvent) {
            f.push('e.stopEvent();');
        } else {
            if(o.preventDefault) {
                f.push('e.preventDefault();');
            }
            if(o.stopPropagation) {
                f.push('e.stopPropagation();');
            }
        }

        if(o.normalized === false) {
            f.push('e = e.browserEvent;');
        }

        if(o.buffer) {
            f.push('(wrap.task && clearTimeout(wrap.task));');
            f.push('wrap.task = setTimeout(function(){');
        }

        if(o.delay) {
            f.push('wrap.tasks = wrap.tasks || [];');
            f.push('wrap.tasks.push(setTimeout(function(){');
        }

        // finally call the actual handler fn
        f.push('fn.call(scope || dom, e, t, o);');

        if(o.single) {
            f.push('Ext.EventManager.removeListener(dom, ename, fn, scope);');
        }

        if(o.delay) {
            f.push('}, ' + o.delay + '));');
        }

        if(o.buffer) {
            f.push('}, ' + o.buffer + ');');
        }

        var gen = new Function('e', 'o', 'fn', 'scope', 'ename', 'dom', 'wrap', 'args', f.join("\n"));

        return function(e, args) {
            gen.call(dom, e, o, fn, scope, ename, dom, arguments.callee, args);
        };
    },

    getEventListenerCache : function(element, eventName) {
        var eventCache = this.getElementEventCache(element);
        return eventCache[eventName] || (eventCache[eventName] = []);
    },

    getElementEventCache : function(element) {
        var elementCache = Ext.cache[this.getId(element)];
        return elementCache.events || (elementCache.events = {});
    },

    /**
    * Adds a listener to be notified when the document is ready (before onload and before images are loaded). Can be
    * accessed shorthanded as Ext.onReady().
    * @param {Function} fn The method the event invokes.
    * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the handler function executes. Defaults to the browser window.
    * @param {boolean} options (optional) Options object as passed to {@link Ext.Element#addListener}. It is recommended that the options
    * <code>{single: true}</code> be used so that the handler is removed on first invocation.
    */
    onDocumentReady : function(fn, scope, options){
        var me = this,
            readyEvent = me.readyEvent,
            intervalId;

        if(Ext.isReady){ // if it already fired
            readyEvent || (readyEvent = new Ext.util.Event());
            readyEvent.addListener(fn, scope, options);
            readyEvent.fire();
            readyEvent.listeners = []; // clearListeners no longer compatible.  Force single: true?
        }
        else {
            if(!readyEvent) {
                readyEvent = me.readyEvent = new Ext.util.Event();

                // the method that will actually fire the event and clean up any listeners and intervals
                var fireReady = function() {
                    Ext.isReady = true;

                    //document.removeEventListener('DOMContentLoaded', arguments.callee, false);
                    window.removeEventListener('load', arguments.callee, false);

                    // remove interval if there is one
                    if (intervalId) {
                        clearInterval(intervalId);
                    }
                    
                    // Put this in a timeout to give the browser a chance to hide address
                    // bars or do other things that would screw up viewport measurements
                    setTimeout(function() {
                        Ext.supports.init();
                        //Ext.TouchEventManager.init();
                        Ext.gesture.Manager.init();
                        Ext.orientation = Ext.Element.getOrientation();
                                                
                        // fire the ready event!!
                        readyEvent.fire({
                            orientation: Ext.orientation,
                            width: Ext.Element.getViewportWidth(),
                            height: Ext.Element.getViewportHeight()
                        });
                        readyEvent.listeners = [];                        
                    }, 50);
                };

                // for browsers that support DOMContentLoaded
                //document.addEventListener('DOMContentLoaded', fireReady, false);

                // // even though newer versions support DOMContentLoaded, we have to be sure
                intervalId = setInterval(function(){
                    if(/loaded|complete/.test(document.readyState)) {
                        clearInterval(intervalId);
                        intervalId = null;
                        fireReady();
                    }
                }, 10);

                // final fallback method
                window.addEventListener('load', fireReady, false);
            }

            options = options || {};
            options.delay = options.delay || 1;
            readyEvent.addListener(fn, scope, options);
        }
    },

    /**
     * Adds a listener to be notified when the browser window is resized and provides resize event buffering (50 milliseconds),
     * passes new viewport width and height to handlers.
     * @param {Function} fn      The handler function the window resize event invokes.
     * @param {Object}   scope   The scope (<code>this</code> reference) in which the handler function executes. Defaults to the browser window.
     * @param {boolean}  options Options object as passed to {@link Ext.Element#addListener}
     */
    onWindowResize : function(fn, scope, options) {
        var me = this,
            resizeEvent = me.resizeEvent;

        if(!resizeEvent){
            me.resizeEvent = resizeEvent = new Ext.util.Event();
            var onResize = function() {
                resizeEvent.fire(Ext.Element.getViewportWidth(), Ext.Element.getViewportHeight());
            };
            this.addListener(window, 'resize', onResize, this);
        }

        resizeEvent.addListener(fn, scope, options);
    },

    onOrientationChange : function(fn, scope, options) {
        var me = this,
            orientationEvent = me.orientationEvent;

        if (!orientationEvent) {
            me.orientationEvent = orientationEvent = new Ext.util.Event();
            
            var onOrientationChange = function(viewport, size) {
                Ext.orientation = Ext.Viewport.getOrientation();

                orientationEvent.fire(Ext.orientation, size.width, size.height);
            };

            Ext.Viewport.on('resize', onOrientationChange, this);
        }

        orientationEvent.addListener(fn, scope, options);
    },
    
    unOrientationChange : function(fn, scope, options) {
        var me = this,
            orientationEvent = me.orientationEvent;
        
        if (orientationEvent) {
            orientationEvent.removeListener(fn, scope, options);
        }
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
 */
Ext.EventManager.un = Ext.EventManager.removeListener;

/**
  * Adds a listener to be notified when the document is ready (before onload and before images are loaded). Shorthand of {@link Ext.EventManager#onDocumentReady}.
  * @param {Function} fn The method the event invokes.
  * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the handler function executes. Defaults to the browser window.
  * @param {boolean} options (optional) Options object as passed to {@link Ext.Element#addListener}. It is recommended that the options
  * <code>{single: true}</code> be used so that the handler is removed on first invocation.
  * @member Ext
  * @method onReady
 */
Ext.onReady = Ext.EventManager.onDocumentReady;

Ext.EventObjectImpl = Ext.extend(Object, {
    constructor : function(e) {
        if (e) {
            this.setEvent(e.browserEvent || e);
        }
    },

    /** @private */
    setEvent : function(e){
        var me = this;
        if (e == me || (e && e.browserEvent)){ // already wrapped
            return e;
        }
        me.browserEvent = e;
        if(e) {
            me.type = e.type;

            // cache the target for the delayed and or buffered events
            var node = e.target;
            me.target = node && node.nodeType == 3 ? node.parentNode : node;

            // same for XY
            me.xy = [e.pageX, e.pageY];
            me.timestamp = e.timeStamp;
        } else {
            me.target = null;
            me.xy = [0, 0];
        }
        return me;
    },

    /**
     * Stop the event (preventDefault and stopPropagation)
     */
    stopEvent : function(){
        this.stopPropagation();
        this.preventDefault();
    },

    /**
     * Prevents the browsers default handling of the event.
     */
    preventDefault : function(){
        if(this.browserEvent) {
            this.browserEvent.preventDefault();
        }
    },

    /**
     * Cancels bubbling of the event.
     */
    stopPropagation : function() {
        if(this.browserEvent) {
            this.browserEvent.stopPropagation();
        }
    },

    /**
     * Gets the x coordinate of the event.
     * @return {Number}
     */
    getPageX : function(){
        return this.xy[0];
    },

    /**
     * Gets the y coordinate of the event.
     * @return {Number}
     */
    getPageY : function(){
        return this.xy[1];
    },

    /**
     * Gets the page coordinates of the event.
     * @return {Array} The xy values like [x, y]
     */
    getXY : function(){
        return this.xy;
    },

    /**
     * Gets the target for the event.
     * @param {String} selector (optional) A simple selector to filter the target or look for an ancestor of the target
     * @param {Number/Mixed} maxDepth (optional) The max depth to
            search as a number or element (defaults to 10 || document.body)
     * @param {Boolean} returnEl (optional) True to return a Ext.Element object instead of DOM node
     * @return {HTMLelement}
     */
    getTarget : function(selector, maxDepth, returnEl) {
        return selector ? Ext.fly(this.target).findParent(selector, maxDepth, returnEl) : (returnEl ? Ext.get(this.target) : this.target);
    },

    getTime : function() {
        return this.timestamp;
    }
});

/**
 * @class Ext.EventObject
 * Just as {@link Ext.Element} wraps around a native DOM node, Ext.EventObject
 * wraps the browser's native event-object normalizing cross-browser differences,
 * such as which mouse button is clicked, keys pressed, mechanisms to stop
 * event-propagation along with a method to prevent default actions from taking place.
 * <p>For example:</p>
 * <pre><code>
function handleClick(e, t){ // e is not a standard event object, it is a Ext.EventObject
    e.preventDefault();
    var target = e.getTarget(); // same as t (the target HTMLElement)
    ...
}
var myDiv = {@link Ext#get Ext.get}("myDiv");  // get reference to an {@link Ext.Element}
myDiv.on(         // 'on' is shorthand for addListener
    "click",      // perform an action on click of myDiv
    handleClick   // reference to the action handler
);
// other methods to do the same:
Ext.EventManager.on("myDiv", 'click', handleClick);
Ext.EventManager.addListener("myDiv", 'click', handleClick);
 </code></pre>
 * @singleton
 */
Ext.EventObject = new Ext.EventObjectImpl();
/**
 * @class Ext.is
 * 
 * Determines information about the current platform the application is running on.
 * 
 * @singleton
 */
Ext.is = {

    init: function(navigator) {
        var me = this,
            platforms = me.platforms,
            ln = platforms.length,
            i, platform;

        navigator = navigator || window.navigator;

        for (i = 0; i < ln; i++) {
            platform = platforms[i];
            me[platform.identity] = platform.regex.test(navigator[platform.property]);
        }

        /**
         * @property Desktop True if the browser is running on a desktop machine
         * @type {Boolean}
         */
        me.Desktop = me.Mac || me.Windows || (me.Linux && !me.Android);
        /**
         * @property iOS True if the browser is running on iOS
         * @type {Boolean}
         */
        me.iOS = me.iPhone || me.iPad || me.iPod;

        /**
         * @property Standalone Detects when application has been saved to homescreen.
         * @type {Boolean}
         */
        me.Standalone = !!navigator.standalone;

        /**
         * @property androidVersion Returns Android OS version information.
         * @type {Boolean}
         */
        i = me.Android && (/Android\s(\d+\.\d+)/.exec(navigator.userAgent));
        if (i) {
            me.AndroidVersion = i[1];
            me.AndroidMajorVersion = parseInt(i[1], 10);
        }
        /**
         * @property Tablet True if the browser is running on a tablet (iPad)
         */
        me.Tablet = me.iPad || (me.Android && me.AndroidMajorVersion === 3);

        /**
         * @property Phone True if the browser is running on a phone.
         * @type {Boolean}
         */
        me.Phone = !me.Desktop && !me.Tablet;

        /**
         * @property MultiTouch Returns multitouch availability.
         * @type {Boolean}
         */
        me.MultiTouch = !me.Blackberry && !me.Desktop && !(me.Android && me.AndroidVersion < 3);
    },

    /**
     * @property iPhone True when the browser is running on a iPhone
     * @type {Boolean}
     */
    platforms: [{
        property: 'platform',
        regex: /iPhone/i,
        identity: 'iPhone'
    },

    /**
     * @property iPod True when the browser is running on a iPod
     * @type {Boolean}
     */
    {
        property: 'platform',
        regex: /iPod/i,
        identity: 'iPod'
    },

    /**
     * @property iPad True when the browser is running on a iPad
     * @type {Boolean}
     */
    {
        property: 'userAgent',
        regex: /iPad/i,
        identity: 'iPad'
    },

    /**
     * @property Blackberry True when the browser is running on a Blackberry
     * @type {Boolean}
     */
    {
        property: 'userAgent',
        regex: /Blackberry/i,
        identity: 'Blackberry'
    },

    /**
     * @property Android True when the browser is running on an Android device
     * @type {Boolean}
     */
    {
        property: 'userAgent',
        regex: /Android/i,
        identity: 'Android'
    },

    /**
     * @property Mac True when the browser is running on a Mac
     * @type {Boolean}
     */
    {
        property: 'platform',
        regex: /Mac/i,
        identity: 'Mac'
    },

    /**
     * @property Windows True when the browser is running on Windows
     * @type {Boolean}
     */
    {
        property: 'platform',
        regex: /Win/i,
        identity: 'Windows'
    },

    /**
     * @property Linux True when the browser is running on Linux
     * @type {Boolean}
     */
    {
        property: 'platform',
        regex: /Linux/i,
        identity: 'Linux'
    }]
};

Ext.is.init();

/**
 * @class Ext.supports
 *
 * Determines information about features are supported in the current environment
 * 
 * @singleton
 */
Ext.supports = {
    init: function() {
        var doc = document,
            div = doc.createElement('div'),
            tests = this.tests,
            ln = tests.length,
            i, test;

        div.innerHTML = ['<div style="height:30px;width:50px;">', '<div style="height:20px;width:20px;"></div>', '</div>', '<div style="float:left; background-color:transparent;"></div>'].join('');

        doc.body.appendChild(div);

        for (i = 0; i < ln; i++) {
            test = tests[i];
            this[test.identity] = test.fn.call(this, doc, div);
        }

        doc.body.removeChild(div);
    },

    /**
     * @property OrientationChange True if the device supports orientation change
     * @type {Boolean}
     */
    OrientationChange: ((typeof window.orientation != 'undefined') && ('onorientationchange' in window)),

    /**
     * @property DeviceMotion True if the device supports device motion (acceleration and rotation rate)
     * @type {Boolean}
     */
    DeviceMotion: ('ondevicemotion' in window),

    /**
     * @property Touch True if the device supports touch
     * @type {Boolean}
     */
    // is.Desktop is needed due to the bug in Chrome 5.0.375, Safari 3.1.2
    // and Safari 4.0 (they all have 'ontouchstart' in the window object).
    Touch: ('ontouchstart' in window) && (!Ext.is.Desktop),

    tests: [
    /**
     * @property Transitions True if the device supports CSS3 Transitions
     * @type {Boolean}
     */
    {
        identity: 'Transitions',
        fn: function(doc, div) {
            var prefix = ['webkit', 'Moz', 'o', 'ms', 'khtml'],
                TE = 'TransitionEnd',
                transitionEndName = [
            prefix[0] + TE, 'transitionend', //Moz bucks the prefixing convention
            prefix[2] + TE, prefix[3] + TE, prefix[4] + TE],
                ln = prefix.length,
                i = 0,
                out = false;
            div = Ext.get(div);
            for (; i < ln; i++) {
                if (div.getStyle(prefix[i] + "TransitionProperty")) {
                    Ext.supports.CSS3Prefix = prefix[i];
                    Ext.supports.CSS3TransitionEnd = transitionEndName[i];
                    out = true;
                    break;
                }
            }
            return out;
        }
    },

    /**
     * @property RightMargin True if the device supports right margin
     * @type {Boolean}
     */
    {
        identity: 'RightMargin',
        fn: function(doc, div, view) {
            view = doc.defaultView;
            return ! (view && view.getComputedStyle(div.firstChild.firstChild, null).marginRight != '0px');
        }
    },

    /**
     * @property TransparentColor True if the device supports transparent color
     * @type {Boolean}
     */
    {
        identity: 'TransparentColor',
        fn: function(doc, div, view) {
            view = doc.defaultView;
            return ! (view && view.getComputedStyle(div.lastChild, null).backgroundColor != 'transparent');
        }
    },

    /**
     * @property SVG True if the device supports SVG
     * @type {Boolean}
     */
    {
        identity: 'SVG',
        fn: function(doc) {
            return !!doc.createElementNS && !!doc.createElementNS("http:/" + "/www.w3.org/2000/svg", "svg").createSVGRect;
        }
    },

    /**
     * @property Canvas True if the device supports Canvas
     * @type {Boolean}
     */
    {
        identity: 'Canvas',
        fn: function(doc) {
            return !!doc.createElement('canvas').getContext;
        }
    },

    /**
     * @property VML True if the device supports VML
     * @type {Boolean}
     */
    {
        identity: 'VML',
        fn: function(doc) {
            var d = doc.createElement("div");
            d.innerHTML = "<!--[if vml]><br><br><![endif]-->";
            return (d.childNodes.length == 2);
        }
    },

    /**
     * @property Float True if the device supports CSS float
     * @type {Boolean}
     */
    {
        identity: 'Float',
        fn: function(doc, div) {
            return !!div.lastChild.style.cssFloat;
        }
    },

    /**
     * @property AudioTag True if the device supports the HTML5 audio tag
     * @type {Boolean}
     */
    {
        identity: 'AudioTag',
        fn: function(doc) {
            return !!doc.createElement('audio').canPlayType;
        }
    },

    /**
     * @property History True if the device supports HTML5 history
     * @type {Boolean}
     */
    {
        identity: 'History',
        fn: function() {
            return !! (window.history && history.pushState);
        }
    },

    /**
     * @property CSS3DTransform True if the device supports CSS3DTransform
     * @type {Boolean}
     */
    {
        identity: 'CSS3DTransform',
        fn: function() {
            return (typeof WebKitCSSMatrix != 'undefined' && new WebKitCSSMatrix().hasOwnProperty('m41'));
        }
    },

    /**
     * @property CSS3LinearGradient True if the device supports CSS3 linear gradients
     * @type {Boolean}
     */
    {
        identity: 'CSS3LinearGradient',
        fn: function(doc, div) {
            var property = 'background-image:',
                webkit = '-webkit-gradient(linear, left top, right bottom, from(black), to(white))',
                w3c = 'linear-gradient(left top, black, white)',
                moz = '-moz-' + w3c,
                options = [property + webkit, property + w3c, property + moz];

            div.style.cssText = options.join(';');

            return ("" + div.style.backgroundImage).indexOf('gradient') !== -1;
        }
    },

    /**
     * @property CSS3BorderRadius True if the device supports CSS3 border radius
     * @type {Boolean}
     */
    {
        identity: 'CSS3BorderRadius',
        fn: function(doc, div) {
            var domPrefixes = ['borderRadius', 'BorderRadius', 'MozBorderRadius', 'WebkitBorderRadius', 'OBorderRadius', 'KhtmlBorderRadius'],
                pass = false,
                i;

            for (i = 0; i < domPrefixes.length; i++) {
                if (document.body.style[domPrefixes[i]] !== undefined) {
                    return pass = true;
                }
            }

            return pass;
        }
    },

    /**
     * @property GeoLocation True if the device supports GeoLocation
     * @type {Boolean}
     */
    {
        identity: 'GeoLocation',
        fn: function() {
            return (typeof navigator != 'undefined' && typeof navigator.geolocation != 'undefined') || (typeof google != 'undefined' && typeof google.gears != 'undefined');
        }
    }]
};

